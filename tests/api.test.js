const test = require('node:test');
const assert = require('node:assert/strict');
const fsp = require('node:fs/promises');
const { createServer, ensureDb, DB_FILE, SEED_FILE } = require('../server');
const { normalize, suggestMappings } = require('../lib/mapping-engine');
const seed = require('../data/seed.json');

let server;
let base;
let cookie;
let csrf;

test.before(async () => {
  await ensureDb();
  await fsp.copyFile(SEED_FILE, DB_FILE);
  server = createServer();
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  base = `http://127.0.0.1:${server.address().port}`;
});

test.after(async () => {
  await new Promise(resolve => server.close(resolve));
  await fsp.copyFile(SEED_FILE, DB_FILE);
});

test('health endpoint is public', async () => {
  const res = await fetch(`${base}/api/health`);
  assert.equal(res.status, 200);
  assert.equal((await res.json()).ok, true);
});

test('inventory fails closed without a session', async () => {
  const res = await fetch(`${base}/api/items`);
  assert.equal(res.status, 401);
  assert.equal((await res.json()).error.code, 'UNAUTHENTICATED');
});

test('login creates a session and dashboard reflects the imported workbook', async () => {
  const res = await fetch(`${base}/api/login`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: 'admin', password: 'stock2569' })
  });
  assert.equal(res.status, 200);
  cookie = res.headers.get('set-cookie').split(';')[0];
  const payload = await res.json();
  csrf = payload.csrf;
  const dashboard = await fetch(`${base}/api/dashboard`, { headers: { cookie } });
  assert.equal(dashboard.status, 200);
  assert.equal((await dashboard.json()).kpis.itemLines, 23);
});

test('mutations reject a missing CSRF token', async () => {
  const res = await fetch(`${base}/api/items`, {
    method: 'POST', headers: { cookie, 'Content-Type': 'application/json' },
    body: JSON.stringify({ code: 'TEST-1', name: 'ทดสอบ', category: 'ยา', unit: 'กล่อง' })
  });
  assert.equal(res.status, 403);
  assert.equal((await res.json()).error.code, 'CSRF_INVALID');
});

test('mapping engine normalizes aliases and ranks the correct master item first', () => {
  assert.equal(normalize('พารา 500 GPO'), 'paracetamol 500 gpo');
  const suggestions = suggestMappings({
    sourceName: 'PARA 500 TAB GPO 50x10', sourceCode: 'MED-PARA-GPO', unit: 'กล่อง'
  }, seed.items, 3);
  assert.equal(suggestions[0].itemId, 'itm-009');
  assert.ok(suggestions[0].confidence > suggestions[1].confidence);
  assert.ok(suggestions[0].reasons.some(reason => reason.includes('หน่วยตรงกัน')));
});

test('provincial overview aggregates all 22 demo hospitals', async () => {
  const res = await fetch(`${base}/api/province/overview`, { headers: { cookie } });
  assert.equal(res.status, 200);
  const payload = await res.json();
  assert.equal(payload.demoNetwork, true);
  assert.equal(payload.summary.hospitals, 22);
  assert.equal(payload.summary.online, 18);
  assert.equal(payload.hospitals.length, 22);
  assert.equal(payload.rebalancing.length, 3);
});

test('AI suggestion is deterministic and always requires human approval', async () => {
  const res = await fetch(`${base}/api/ai/mappings/suggest`, {
    method: 'POST', headers: { cookie, 'Content-Type': 'application/json', 'X-CSRF-Token': csrf },
    body: JSON.stringify({
      hospitalId: 'hsp-001', sourceCode: 'ALC70-YW-450',
      sourceName: 'ALCOHOL 70% 450ML เยาวราช', unit: 'ลัง'
    })
  });
  assert.equal(res.status, 200);
  const payload = await res.json();
  assert.equal(payload.engine.requiresHumanApproval, true);
  assert.equal(payload.suggestions[0].itemId, 'itm-013');
  assert.equal(payload.suggestions.length, 3);
});

test('mapping approval persists an audit decision and rejects duplicate review', async () => {
  const approve = await fetch(`${base}/api/ai/mappings/map-001/decision`, {
    method: 'POST', headers: { cookie, 'Content-Type': 'application/json', 'X-CSRF-Token': csrf },
    body: JSON.stringify({ decision: 'approve', itemId: 'itm-009' })
  });
  assert.equal(approve.status, 200);
  const approved = await approve.json();
  assert.equal(approved.mapping.status, 'approved');
  assert.equal(approved.mapping.decidedItemId, 'itm-009');

  const duplicate = await fetch(`${base}/api/ai/mappings/map-001/decision`, {
    method: 'POST', headers: { cookie, 'Content-Type': 'application/json', 'X-CSRF-Token': csrf },
    body: JSON.stringify({ decision: 'approve', itemId: 'itm-009' })
  });
  assert.equal(duplicate.status, 409);
  assert.equal((await duplicate.json()).error.code, 'ALREADY_REVIEWED');
});

test('outbound transaction prevents negative stock atomically', async () => {
  const res = await fetch(`${base}/api/transactions`, {
    method: 'POST', headers: { cookie, 'Content-Type': 'application/json', 'X-CSRF-Token': csrf },
    body: JSON.stringify({
      type: 'outbound', date: '2026-08-24', facility: 'รพ.ทดสอบ',
      items: [{ itemId: 'itm-004', qty: 9999 }]
    })
  });
  assert.equal(res.status, 409);
  assert.equal((await res.json()).error.code, 'INSUFFICIENT_STOCK');
  const items = await fetch(`${base}/api/items`, { headers: { cookie } }).then(r => r.json());
  assert.equal(items.items.find(i => i.id === 'itm-004').qty, 3);
});

test('valid inbound transaction persists and updates stock', async () => {
  const res = await fetch(`${base}/api/transactions`, {
    method: 'POST', headers: { cookie, 'Content-Type': 'application/json', 'X-CSRF-Token': csrf },
    body: JSON.stringify({
      type: 'inbound', date: '2026-08-24', facility: 'องค์การเภสัชกรรม', refNo: 'TEST-IN-001',
      items: [{ itemId: 'itm-004', qty: 2, lot: 'TEST-LOT', expiry: '2030-12-31' }]
    })
  });
  assert.equal(res.status, 201);
  const items = await fetch(`${base}/api/items`, { headers: { cookie } }).then(r => r.json());
  const item = items.items.find(i => i.id === 'itm-004');
  assert.equal(item.qty, 5);
  assert.equal(item.lot, 'TEST-LOT');
  assert.equal(item.expiry, '2030-12-31');
});

test('CSV export includes source traceability', async () => {
  const res = await fetch(`${base}/api/export/inventory.csv`, { headers: { cookie } });
  assert.equal(res.status, 200);
  const csv = await res.text();
  assert.match(csv, /source_sheet/);
  assert.match(csv, /คงคลังปัจจุบัน/);
});
