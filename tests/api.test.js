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
      attachment: { name: 'invoice-101.pdf', size: 1024, type: 'application/pdf', data: 'data:application/pdf;base64,JVBERi0xLjQK...' },
      items: [{ itemId: 'itm-004', qty: 2, lot: 'TEST-LOT', expiry: '2030-12-31' }]
    })
  });
  assert.equal(res.status, 201);
  const created = await res.json();
  assert.equal(created.transaction.attachment.name, 'invoice-101.pdf');
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

test('GET /api/items supports pagination and sorting', async () => {
  const res = await fetch(`${base}/api/items?page=1&limit=5&sort=name&order=asc`, {
    headers: { cookie }
  });
  assert.equal(res.status, 200);
  const data = await res.json();
  assert.equal(data.items.length, 5);
  assert.equal(data.meta.page, 1);
  assert.equal(data.meta.limit, 5);
  assert.equal(data.meta.total, 23);
  assert.equal(data.meta.totalPages, 5);
});

test('GET /api/items/:id returns item detail and related transactions', async () => {
  const res = await fetch(`${base}/api/items/itm-001`, { headers: { cookie } });
  assert.equal(res.status, 200);
  const data = await res.json();
  assert.equal(data.item.id, 'itm-001');
  assert.ok(Array.isArray(data.transactions));
});

test('PUT /api/items/:id updates item details and logs audit', async () => {
  const createRes = await fetch(`${base}/api/items`, {
    method: 'POST',
    headers: { cookie, 'X-CSRF-Token': csrf, 'Content-Type': 'application/json' },
    body: JSON.stringify({ code: 'NEW-EDIT-1', name: 'ยาก่อนแก้', category: 'ยา', unit: 'ขวด' })
  });
  assert.equal(createRes.status, 201);
  const created = (await createRes.json()).item;

  const updateRes = await fetch(`${base}/api/items/${created.id}`, {
    method: 'PUT',
    headers: { cookie, 'X-CSRF-Token': csrf, 'Content-Type': 'application/json' },
    body: JSON.stringify({ code: 'NEW-EDIT-1', name: 'ยาหลังแก้', category: 'ยา', unit: 'กล่อง', minQty: 15 })
  });
  assert.equal(updateRes.status, 200);
  const updated = (await updateRes.json()).item;
  assert.equal(updated.name, 'ยาหลังแก้');
  assert.equal(updated.unit, 'กล่อง');
  assert.equal(updated.minQty, 15);
});

test('DELETE /api/items/:id soft-deletes an item when qty is 0', async () => {
  const createRes = await fetch(`${base}/api/items`, {
    method: 'POST',
    headers: { cookie, 'X-CSRF-Token': csrf, 'Content-Type': 'application/json' },
    body: JSON.stringify({ code: 'DEL-TEST-1', name: 'ยารอลบ', category: 'ยา', unit: 'ขวด' })
  });
  const created = (await createRes.json()).item;

  const delRes = await fetch(`${base}/api/items/${created.id}`, {
    method: 'DELETE',
    headers: { cookie, 'X-CSRF-Token': csrf }
  });
  assert.equal(delRes.status, 200);

  const getRes = await fetch(`${base}/api/items/${created.id}`, { headers: { cookie } });
  assert.equal(getRes.status, 200);
  assert.equal((await getRes.json()).item.active, false);
});

test('GET /api/transactions supports pagination and sorting', async () => {
  const res = await fetch(`${base}/api/transactions?page=1&limit=2&sort=date&order=desc`, {
    headers: { cookie }
  });
  assert.equal(res.status, 200);
  const data = await res.json();
  assert.equal(data.transactions.length, 2);
  assert.equal(data.meta.page, 1);
  assert.equal(data.meta.limit, 2);
  assert.ok(data.meta.total >= 5);
});

test('GET /api/transactions/:id returns transaction detail with item names', async () => {
  const listRes = await fetch(`${base}/api/transactions`, { headers: { cookie } });
  const txns = (await listRes.json()).transactions;
  const firstTxn = txns[0];

  const res = await fetch(`${base}/api/transactions/${firstTxn.id}`, { headers: { cookie } });
  assert.equal(res.status, 200);
  const data = await res.json();
  assert.equal(data.transaction.id, firstTxn.id);
  assert.ok(data.transaction.items[0].item);
});

test('POST /api/transactions/:id/void reverts inventory and marks status as voided', async () => {
  const targetItemRes = await fetch(`${base}/api/items/itm-002`, { headers: { cookie } });
  const initialQty = (await targetItemRes.json()).item.qty;

  // Inbound 50
  const inRes = await fetch(`${base}/api/transactions`, {
    method: 'POST',
    headers: { cookie, 'X-CSRF-Token': csrf, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      type: 'inbound',
      facility: 'ผู้ส่งมอบทดสอบ',
      date: '2026-08-26',
      items: [{ itemId: 'itm-002', qty: 50 }]
    })
  });
  assert.equal(inRes.status, 201);
  const inTxn = (await inRes.json()).transaction;

  // Verify stock increased
  const checkRes1 = await fetch(`${base}/api/items/itm-002`, { headers: { cookie } });
  assert.equal((await checkRes1.json()).item.qty, initialQty + 50);

  // Void inbound
  const voidRes = await fetch(`${base}/api/transactions/${inTxn.id}/void`, {
    method: 'POST',
    headers: { cookie, 'X-CSRF-Token': csrf, 'Content-Type': 'application/json' },
    body: JSON.stringify({ reason: 'บันทึกผิดพลาด' })
  });
  assert.equal(voidRes.status, 200);
  assert.equal((await voidRes.json()).transaction.status, 'voided');

  // Verify stock reverted back
  const checkRes2 = await fetch(`${base}/api/items/itm-002`, { headers: { cookie } });
  assert.equal((await checkRes2.json()).item.qty, initialQty);
});

test('GET /api/province/hospitals/:id returns hospital detail with mappings and rebalancing', async () => {
  const res = await fetch(`${base}/api/province/hospitals/hsp-001`, { headers: { cookie } });
  assert.equal(res.status, 200);
  const data = await res.json();
  assert.equal(data.hospital.id, 'hsp-001');
  assert.ok(Array.isArray(data.mappings));
  assert.ok(Array.isArray(data.rebalancing));
});

test('POST /api/rebalancing/:id/execute approves rebalancing', async () => {
  const res = await fetch(`${base}/api/rebalancing/reb-001/execute`, {
    method: 'POST',
    headers: { cookie, 'X-CSRF-Token': csrf, 'Content-Type': 'application/json' }
  });
  assert.equal(res.status, 200);
  const data = await res.json();
  assert.equal(data.rebalancing.status, 'executed');
});

test('POST /api/rebalancing/:id/reject rejects rebalancing', async () => {
  const res = await fetch(`${base}/api/rebalancing/reb-002/reject`, {
    method: 'POST',
    headers: { cookie, 'X-CSRF-Token': csrf, 'Content-Type': 'application/json' }
  });
  assert.equal(res.status, 200);
  const data = await res.json();
  assert.equal(data.rebalancing.status, 'rejected');
});

test('advanced mapping features: levenshtein, dosage parsing, category bonus, and feedback loop', async () => {
  const { levenshtein, parseDosage, scoreCandidate, learnFromDecision } = require('../lib/mapping-engine');
  
  // Levenshtein
  assert.equal(levenshtein('paracetamol', 'paracetamol'), 0);
  assert.equal(levenshtein('gpo', 'gpa'), 1);

  // Dosage parsing
  assert.deepEqual(parseDosage('PARA 500mg GPO'), { value: 500, unit: 'mg' });
  assert.deepEqual(parseDosage('Alcohol 70% 450ml'), { value: 70, unit: '%' });

  // Category bonus
  const source = { sourceName: 'ถุงมือตรวจโรค ไซส์ M', unit: 'กล่อง' };
  const item1 = { id: 'itm-1', name: 'Glove Nitrile M', unit: 'กล่อง', category: 'เวชภัณฑ์', active: true };
  const scoreMatching = scoreCandidate(source, item1, { sourceCategory: 'เวชภัณฑ์' });
  const scoreMismatch = scoreCandidate(source, item1, { sourceCategory: 'ยา' });
  assert.ok(scoreMatching.confidence > scoreMismatch.confidence);

  // Feedback loop
  const pcmSource = { sourceName: 'PCM 500 GPO TEST', unit: 'กล่อง' };
  const pcmItem = { id: 'itm-pcm-test', name: 'Paracetamol 500 mg', unit: 'กล่อง', active: true };
  const scoreBefore = scoreCandidate(pcmSource, pcmItem);
  learnFromDecision({ sourceName: 'PCM 500 GPO TEST', itemId: 'itm-pcm-test', status: 'approved' });
  const scoreAfter = scoreCandidate(pcmSource, pcmItem);
  assert.ok(scoreAfter.confidence > scoreBefore.confidence);
  assert.ok(scoreAfter.reasons.some(r => r.includes('เคยจับคู่รายการนี้แล้ว')));
});

test('GET /api/facilities, POST /api/facilities, and DELETE /api/facilities/:name manage facilities list', async () => {
  // GET facilities
  const getRes = await fetch(`${base}/api/facilities`, { headers: { cookie } });
  assert.equal(getRes.status, 200);
  const initialData = await getRes.json();
  assert.ok(Array.isArray(initialData.facilities));
  const initialCount = initialData.facilities.length;

  // POST new facility with address and phone
  const addRes = await fetch(`${base}/api/facilities`, {
    method: 'POST',
    headers: { cookie, 'X-CSRF-Token': csrf, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'บริษัท ทดสอบเวชภัณฑ์ จำกัด',
      address: '99/1 ถ.กสิกรรม ต.เมืองใต้ อ.เมือง จ.ศรีสะเกษ',
      phone: '045-999999'
    })
  });
  assert.equal(addRes.status, 201);
  const afterAddData = await addRes.json();
  assert.equal(afterAddData.facilities.length, initialCount + 1);
  const added = afterAddData.facilities.find(f => (f.name || f) === 'บริษัท ทดสอบเวชภัณฑ์ จำกัด');
  assert.ok(added);
  assert.equal(added.address, '99/1 ถ.กสิกรรม ต.เมืองใต้ อ.เมือง จ.ศรีสะเกษ');
  assert.equal(added.phone, '045-999999');

  // DELETE facility
  const delRes = await fetch(`${base}/api/facilities/${encodeURIComponent('บริษัท ทดสอบเวชภัณฑ์ จำกัด')}`, {
    method: 'DELETE',
    headers: { cookie, 'X-CSRF-Token': csrf }
  });
  assert.equal(delRes.status, 200);
  const afterDelData = await delRes.json();
  assert.equal(afterDelData.facilities.length, initialCount);
  assert.ok(!afterDelData.facilities.some(f => (f.name || f) === 'บริษัท ทดสอบเวชภัณฑ์ จำกัด'));
});

test('POST /api/transactions/:id/memo updates memo status', async () => {
  const txnsRes = await fetch(`${base}/api/transactions`, { headers: { cookie } });
  const txns = (await txnsRes.json()).transactions;
  const targetTxn = txns[0];

  const updateRes = await fetch(`${base}/api/transactions/${targetTxn.id}/memo`, {
    method: 'POST',
    headers: { cookie, 'X-CSRF-Token': csrf, 'Content-Type': 'application/json' },
    body: JSON.stringify({ memoDone: true })
  });
  assert.equal(updateRes.status, 200);
  const data = await updateRes.json();
  assert.equal(data.transaction.memoDone, true);

  const detailRes = await fetch(`${base}/api/transactions/${targetTxn.id}`, { headers: { cookie } });
  assert.equal((await detailRes.json()).transaction.memoDone, true);
});

test('POST /api/logout clears session', async () => {
  const res = await fetch(`${base}/api/logout`, {
    method: 'POST',
    headers: { cookie, 'Content-Type': 'application/json' }
  });
  assert.equal(res.status, 200);
  assert.equal((await res.json()).ok, true);

  // Subsequent call should fail
  const check = await fetch(`${base}/api/session`, { headers: { cookie } });
  assert.equal(check.status, 401);
});

test('GET /api/notifications/expiry-preview and POST /api/notifications/expiry-alert support a validated recipient', async () => {
  // Login again to get active session
  const loginRes = await fetch(`${base}/api/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: 'admin', password: 'stock2569' })
  });
  assert.equal(loginRes.status, 200);
  cookie = loginRes.headers.get('set-cookie').split(';')[0];
  const loginData = await loginRes.json();
  csrf = loginData.csrf;
  const newCookie = cookie;
  const newCsrf = csrf;

  // 1. GET preview
  const recipient = 'alerts@example.test';
  const previewRes = await fetch(`${base}/api/notifications/expiry-preview?days=180&recipient=${encodeURIComponent(recipient)}`, {
    headers: { cookie: newCookie }
  });
  assert.equal(previewRes.status, 200);
  const previewData = await previewRes.json();
  assert.equal(previewData.sender, 'cream.sk09@gmail.com');
  assert.equal(previewData.recipient, recipient);
  assert.equal(previewData.thresholdDays, 180);
  assert.ok(Array.isArray(previewData.items));
  assert.ok(previewData.previewHtml.includes('cream.sk09@gmail.com'));
  assert.ok(previewData.previewHtml.includes(recipient));

  // 2. POST send alert
  const sendRes = await fetch(`${base}/api/notifications/expiry-alert`, {
    method: 'POST',
    headers: { cookie: newCookie, 'X-CSRF-Token': newCsrf, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      sender: 'cream.sk09@gmail.com',
      recipient,
      thresholdDays: 180
    })
  });
  assert.equal(sendRes.status, 200);
  const sendData = await sendRes.json();
  assert.equal(sendData.ok, true);
  assert.equal(sendData.result.sender, 'cream.sk09@gmail.com');
  assert.equal(sendData.result.recipient, recipient);
  assert.ok(sendData.result.subject.includes('แจ้งเตือนด่วน'));

  // 3. GET history
  const historyRes = await fetch(`${base}/api/notifications/history`, {
    headers: { cookie: newCookie }
  });
  assert.equal(historyRes.status, 200);
  const historyData = await historyRes.json();
  assert.ok(Array.isArray(historyData.emailLogs));
  assert.ok(historyData.emailLogs.some(l => l.recipient === recipient));

  const invalidRecipient = await fetch(`${base}/api/notifications/expiry-alert`, {
    method: 'POST',
    headers: { cookie: newCookie, 'X-CSRF-Token': newCsrf, 'Content-Type': 'application/json' },
    body: JSON.stringify({ recipient: 'alerts@example.test\r\nBcc: attacker@example.test', sender: 'cream.sk09@gmail.com' })
  });
  assert.equal(invalidRecipient.status, 400);
  assert.equal((await invalidRecipient.json()).error.code, 'INVALID_EMAIL');
});

/* ── Procurement Plan & YoY Analytics Tests ── */
test('GET /api/procurement/categories returns 14 categories and 3 groups', async () => {
  const res = await fetch(`${base}/api/procurement/categories`, { headers: { cookie } });
  assert.equal(res.status, 200);
  const data = await res.json();
  assert.equal(data.categories.length, 14);
  assert.equal(data.groups.length, 3);
  assert.ok(data.categories.some(c => c.id === 'drugEd'));
  assert.ok(data.categories.some(c => c.id === 'dental'));
  assert.ok(data.categories.some(c => c.id === 'herbalEd'));
});

test('GET /api/procurement/plans returns seeded plans for 22 hospitals', async () => {
  const res = await fetch(`${base}/api/procurement/plans?year=2569`, { headers: { cookie } });
  assert.equal(res.status, 200);
  const data = await res.json();
  assert.equal(data.plans.length, 22);

  const khukhan = data.plans.find(p => p.hospitalId === 'hsp-004');
  assert.ok(khukhan);
  assert.equal(khukhan.hospitalName, 'ขุขันธ์');
  assert.equal(khukhan.categories.dental.count, 417);
  assert.equal(khukhan.categories.dental.value, 1782452.70);
  assert.equal(khukhan.tracking.score, 3);
});

test('GET /api/procurement/compare calculates YoY analytics and hospital rankings', async () => {
  const res = await fetch(`${base}/api/procurement/compare?currentYear=2569&previousYear=2568`, { headers: { cookie } });
  assert.equal(res.status, 200);
  const data = await res.json();
  assert.equal(data.ok, true);
  assert.equal(data.currentYear, 2569);
  assert.equal(data.previousYear, 2568);
  assert.ok(data.summary.currentTotalValue > 500000000);
  assert.equal(data.categoryComparison.length, 14);
  assert.equal(data.hospitalRanking.length, 22);
  assert.equal(data.summary.submission.total, 22);
  assert.equal(data.summary.submission.submitted, 21);
});

test('POST /api/procurement/plans saves and updates plan with CSRF verification', async () => {
  // Reject without CSRF
  const rejectRes = await fetch(`${base}/api/procurement/plans`, {
    method: 'POST',
    headers: { cookie, 'Content-Type': 'application/json' },
    body: JSON.stringify({ hospitalId: 'hsp-004', fiscalYear: 2569 })
  });
  assert.equal(rejectRes.status, 403);

  // Valid mutation
  const updateRes = await fetch(`${base}/api/procurement/plans`, {
    method: 'POST',
    headers: { cookie, 'X-CSRF-Token': csrf, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      hospitalId: 'hsp-004',
      hospitalName: 'โรงพยาบาลขุขันธ์',
      fiscalYear: 2569,
      categories: {
        dental: { count: 500, value: 2000000.00 },
        drugEd: { count: 450, value: 45000000.00 }
      },
      tracking: {
        planSubmission: 'ส่ง',
        maintenancePlan: 'เรียบร้อย',
        scorePeriod: 'oct_nov',
        score: 3,
        secPass: true,
        fileDown: true,
        returned: true
      }
    })
  });
  assert.equal(updateRes.status, 200);
  const updateData = await updateRes.json();
  assert.equal(updateData.ok, true);
  assert.equal(updateData.plan.totalValue, 47000000.00);
  assert.equal(updateData.plan.totalItems, 950);
});

test('GET /api/export/procurement.csv exports UTF-8 CSV with BOM for Excel', async () => {
  const res = await fetch(`${base}/api/export/procurement.csv?year=2569`, { headers: { cookie } });
  assert.equal(res.status, 200);
  assert.ok(res.headers.get('content-type').includes('text/csv'));
  const buf = Buffer.from(await res.arrayBuffer());
  assert.equal(buf[0], 0xEF);
  assert.equal(buf[1], 0xBB);
  assert.equal(buf[2], 0xBF);
  const text = buf.toString('utf8');
  assert.ok(text.includes('ลำดับ,ชื่อโรงพยาบาล'));
  assert.ok(text.includes('รวมทั้งจังหวัดศรีสะเกษ'));
  assert.ok(text.includes('ขุขันธ์'));
});

test('POST /api/procurement/reset restores default PDF seed dataset', async () => {
  const res = await fetch(`${base}/api/procurement/reset`, {
    method: 'POST',
    headers: { cookie, 'X-CSRF-Token': csrf, 'Content-Type': 'application/json' },
    body: JSON.stringify({})
  });
  assert.equal(res.status, 200);
  const data = await res.json();
  assert.equal(data.ok, true);

  const plansRes = await fetch(`${base}/api/procurement/plans?year=2569`, { headers: { cookie } });
  const plansData = await plansRes.json();
  const khukhan = plansData.plans.find(p => p.hospitalId === 'hsp-004');
  assert.equal(khukhan.categories.dental.value, 1782452.70);
});

test('POST /api/procurement/years creates new fiscal year plans for all 22 hospitals', async () => {
  const res = await fetch(`${base}/api/procurement/years`, {
    method: 'POST',
    headers: { cookie, 'X-CSRF-Token': csrf, 'Content-Type': 'application/json' },
    body: JSON.stringify({ year: 2570, cloneFrom: 2569 })
  });
  assert.equal(res.status, 200);
  const data = await res.json();
  assert.equal(data.ok, true);
  assert.equal(data.year, 2570);
  assert.ok(data.years.includes(2570));

  const plansRes = await fetch(`${base}/api/procurement/plans?year=2570`, { headers: { cookie } });
  const plansData = await plansRes.json();
  assert.equal(plansData.plans.length, 22);
  assert.ok(plansData.years.includes(2570));
});


