const test = require('node:test');
const assert = require('node:assert/strict');
const seed = require('../data/seed.json');
const { suggestMappingsWithAI } = require('../server');

test('AI mapping uses structured Responses output and keeps candidates constrained', async () => {
  const originalFetch = global.fetch;
  const originalKey = process.env.OPENAI_API_KEY;
  const originalModel = process.env.OPENAI_MODEL;
  let requestBody;
  process.env.OPENAI_API_KEY = 'test-api-key';
  process.env.OPENAI_MODEL = 'test-model';
  global.fetch = async (_url, options) => {
    requestBody = JSON.parse(options.body);
    return new Response(JSON.stringify({
      output_text: JSON.stringify({
        suggestions: [{
          itemId: seed.items[0].id,
          confidence: 0.98,
          reasons: ['ชื่อและหน่วยตรงกับรายการกลาง']
        }]
      })
    }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  };

  try {
    const result = await suggestMappingsWithAI({
      sourceCode: seed.items[0].code,
      sourceName: seed.items[0].name,
      unit: seed.items[0].unit
    }, seed.items, { safetyIdentifier: 'test-user-hash' });

    assert.equal(result.mode, 'openai-rerank');
    assert.equal(result.suggestions[0].itemId, seed.items[0].id);
    assert.equal(requestBody.model, 'test-model');
    assert.equal(requestBody.store, false);
    assert.equal(requestBody.safety_identifier, 'test-user-hash');
    assert.equal(requestBody.text.format.type, 'json_schema');
    assert.ok(requestBody.text.format.schema.properties.suggestions.items.properties.itemId.enum.includes(seed.items[0].id));
  } finally {
    global.fetch = originalFetch;
    if (originalKey === undefined) delete process.env.OPENAI_API_KEY;
    else process.env.OPENAI_API_KEY = originalKey;
    if (originalModel === undefined) delete process.env.OPENAI_MODEL;
    else process.env.OPENAI_MODEL = originalModel;
  }
});

test('AI mapping routes AQ keys to Gemini structured output without exposing the key', async () => {
  const originalFetch = global.fetch;
  const originalStockKey = process.env.STOCK_AI_API_KEY;
  const originalGeminiModel = process.env.GEMINI_MODEL;
  let requestUrl;
  let requestOptions;
  process.env.STOCK_AI_API_KEY = 'AQ.test-key';
  process.env.GEMINI_MODEL = 'gemini-test-model';
  global.fetch = async (url, options) => {
    requestUrl = url;
    requestOptions = options;
    return new Response(JSON.stringify({
      candidates: [{
        content: {
          parts: [{
            text: JSON.stringify({
              suggestions: [{
                itemId: seed.items[0].id,
                confidence: 0.97,
                reasons: ['ชื่อรายการและหน่วยตรงกัน']
              }]
            })
          }]
        }
      }]
    }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  };

  try {
    const result = await suggestMappingsWithAI({
      sourceCode: seed.items[0].code,
      sourceName: seed.items[0].name,
      unit: seed.items[0].unit
    }, seed.items);

    const body = JSON.parse(requestOptions.body);
    assert.equal(result.mode, 'gemini-rerank');
    assert.equal(result.model, 'gemini-test-model');
    assert.match(requestUrl, /generativelanguage\.googleapis\.com/);
    assert.equal(requestOptions.headers['x-goog-api-key'], 'AQ.test-key');
    assert.equal(body.generationConfig.responseMimeType, 'application/json');
    assert.equal(body.generationConfig.responseJsonSchema.properties.suggestions.type, 'array');
    assert.ok(!requestOptions.body.includes('AQ.test-key'));
  } finally {
    global.fetch = originalFetch;
    if (originalStockKey === undefined) delete process.env.STOCK_AI_API_KEY;
    else process.env.STOCK_AI_API_KEY = originalStockKey;
    if (originalGeminiModel === undefined) delete process.env.GEMINI_MODEL;
    else process.env.GEMINI_MODEL = originalGeminiModel;
  }
});
