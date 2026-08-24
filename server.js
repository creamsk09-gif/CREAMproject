const http = require('node:http');
const fs = require('node:fs');
const fsp = require('node:fs/promises');
const path = require('node:path');
const crypto = require('node:crypto');
const { suggestMappings } = require('./lib/mapping-engine');

const ROOT = __dirname;
const PUBLIC = path.join(ROOT, 'public');
const DATA_DIR = path.join(ROOT, 'data');
const DB_FILE = path.join(DATA_DIR, 'db.json');
const SEED_FILE = path.join(DATA_DIR, 'seed.json');
const sessions = new Map();
const MAX_BODY = 1_000_000;

const mime = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8', '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.ico': 'image/x-icon'
};

async function ensureDb() {
  await fsp.mkdir(DATA_DIR, { recursive: true });
  if (!fs.existsSync(DB_FILE)) return fsp.copyFile(SEED_FILE, DB_FILE);
  const [db, seed] = await Promise.all([
    fsp.readFile(DB_FILE, 'utf8').then(JSON.parse),
    fsp.readFile(SEED_FILE, 'utf8').then(JSON.parse)
  ]);
  let changed = false;
  for (const key of ['hospitalNetwork', 'mappingQueue', 'rebalancing']) {
    if (!Array.isArray(db[key])) { db[key] = seed[key]; changed = true; }
  }
  if (changed) await writeDb(db);
}

async function readDb() {
  await ensureDb();
  return JSON.parse(await fsp.readFile(DB_FILE, 'utf8'));
}

async function writeDb(db) {
  const tmp = `${DB_FILE}.${process.pid}.tmp`;
  await fsp.writeFile(tmp, JSON.stringify(db, null, 2), 'utf8');
  await fsp.rename(tmp, DB_FILE);
}

function json(res, status, data, extra = {}) {
  res.writeHead(status, { 'Content-Type': mime['.json'], 'Cache-Control': 'no-store', ...extra });
  res.end(JSON.stringify(data));
}

function error(res, status, code, message, fields) {
  json(res, status, { error: { code, message, ...(fields ? { fields } : {}) } });
}

async function body(req) {
  let raw = '';
  for await (const chunk of req) {
    raw += chunk;
    if (Buffer.byteLength(raw) > MAX_BODY) throw Object.assign(new Error('payload too large'), { status: 413 });
  }
  if (!raw) return {};
  try { return JSON.parse(raw); } catch { throw Object.assign(new Error('invalid json'), { status: 400 }); }
}

function cookies(req) {
  return Object.fromEntries((req.headers.cookie || '').split(';').filter(Boolean).map(v => {
    const i = v.indexOf('='); return [v.slice(0, i).trim(), decodeURIComponent(v.slice(i + 1))];
  }));
}

function session(req) {
  const sid = cookies(req).stock_session;
  const found = sid && sessions.get(sid);
  if (!found || found.expiresAt < Date.now()) { if (sid) sessions.delete(sid); return null; }
  found.expiresAt = Date.now() + 8 * 60 * 60 * 1000;
  return found;
}

function requireAuth(req, res, mutate = false) {
  const s = session(req);
  if (!s) { error(res, 401, 'UNAUTHENTICATED', 'กรุณาเข้าสู่ระบบ'); return null; }
  if (mutate && req.headers['x-csrf-token'] !== s.csrf) {
    error(res, 403, 'CSRF_INVALID', 'โทเคนความปลอดภัยไม่ถูกต้อง กรุณาโหลดหน้าใหม่'); return null;
  }
  return s;
}

function daysUntil(date) {
  if (!date) return Infinity;
  const today = new Date(); today.setHours(0, 0, 0, 0);
  return Math.ceil((new Date(`${date}T00:00:00`) - today) / 86400000);
}

function itemStatus(item) {
  const days = daysUntil(item.expiry);
  if (days < 0) return 'expired';
  if (days <= 180) return 'expiring';
  if (item.qty <= item.minQty) return 'low';
  return 'normal';
}

function enrich(item) { return { ...item, status: itemStatus(item), daysToExpiry: daysUntil(item.expiry) }; }

function enrichMapping(mapping, db) {
  const hospital = db.hospitalNetwork.find(h => h.id === mapping.hospitalId);
  const suggestedItem = db.items.find(i => i.id === mapping.suggestedItemId);
  const decidedItem = db.items.find(i => i.id === mapping.decidedItemId);
  return { ...mapping, hospital: hospital ? { id: hospital.id, name: hospital.name, system: hospital.system } : null, suggestedItem: suggestedItem ? { id: suggestedItem.id, code: suggestedItem.code, name: suggestedItem.name, unit: suggestedItem.unit } : null, decidedItem: decidedItem ? { id: decidedItem.id, code: decidedItem.code, name: decidedItem.name, unit: decidedItem.unit } : null };
}

function csvCell(value) { return `"${String(value ?? '').replaceAll('"', '""')}"`; }

async function api(req, res, url) {
  if (req.method === 'GET' && url.pathname === '/api/health') return json(res, 200, { ok: true, service: 'stock-logistics-sisaket' });
  if (req.method === 'POST' && url.pathname === '/api/login') {
    const input = await body(req);
    const user = process.env.STOCK_DEMO_USERNAME || 'admin';
    const pass = process.env.STOCK_DEMO_PASSWORD || 'stock2569';
    if (input.username !== user || input.password !== pass) return error(res, 401, 'LOGIN_FAILED', 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
    const sid = crypto.randomBytes(24).toString('hex');
    const csrf = crypto.randomBytes(18).toString('hex');
    sessions.set(sid, { user: { id: 'usr-admin', name: 'เภสัชกรผู้ดูแลคลัง', role: 'admin' }, csrf, expiresAt: Date.now() + 8 * 60 * 60 * 1000 });
    return json(res, 200, { user: sessions.get(sid).user, csrf }, { 'Set-Cookie': `stock_session=${sid}; HttpOnly; SameSite=Strict; Path=/; Max-Age=28800` });
  }
  if (req.method === 'POST' && url.pathname === '/api/logout') {
    const sid = cookies(req).stock_session; if (sid) sessions.delete(sid);
    return json(res, 200, { ok: true }, { 'Set-Cookie': 'stock_session=; HttpOnly; SameSite=Strict; Path=/; Max-Age=0' });
  }
  const s = requireAuth(req, res, ['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method));
  if (!s) return;

  if (req.method === 'GET' && url.pathname === '/api/session') return json(res, 200, { user: s.user, csrf: s.csrf });
  const db = await readDb();

  if (req.method === 'GET' && url.pathname === '/api/dashboard') {
    const items = db.items.filter(i => i.active).map(enrich);
    const counts = items.reduce((a, i) => (a[i.status]++, a), { normal: 0, low: 0, expiring: 0, expired: 0 });
    const activity = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date(); d.setDate(1); d.setMonth(d.getMonth() - i);
      const key = d.toISOString().slice(0, 7);
      const monthTx = db.transactions.filter(t => t.date?.startsWith(key));
      activity.push({ month: key, inbound: monthTx.filter(t => t.type === 'inbound').reduce((n, t) => n + t.items.reduce((x, y) => x + y.qty, 0), 0), outbound: monthTx.filter(t => t.type === 'outbound').reduce((n, t) => n + t.items.reduce((x, y) => x + y.qty, 0), 0) });
    }
    return json(res, 200, { meta: db.meta, kpis: { itemLines: items.length, low: counts.low, expiring: counts.expiring + counts.expired, facilities: db.facilities.length }, alerts: items.filter(i => ['expired', 'expiring', 'low'].includes(i.status)).sort((a, b) => a.daysToExpiry - b.daysToExpiry).slice(0, 8), activity, recent: db.transactions.slice(-5).reverse() });
  }

  if (req.method === 'GET' && url.pathname === '/api/province/overview') {
    const hospitals = db.hospitalNetwork || [];
    const online = hospitals.filter(h => h.syncStatus === 'online').length;
    const delayed = hospitals.filter(h => h.syncStatus === 'delayed').length;
    const offline = hospitals.filter(h => h.syncStatus === 'offline').length;
    const average = key => hospitals.length ? Math.round(hospitals.reduce((sum, h) => sum + h[key], 0) / hospitals.length) : 0;
    const mappings = db.mappingQueue || [];
    const openMappings = mappings.filter(m => ['pending', 'review'].includes(m.status)).length;
    const rebalancing = (db.rebalancing || []).map(row => ({
      ...row,
      item: db.items.find(i => i.id === row.itemId),
      from: hospitals.find(h => h.id === row.fromHospitalId),
      to: hospitals.find(h => h.id === row.toHospitalId)
    }));
    const systemCounts = Object.entries(hospitals.reduce((acc, h) => (acc[h.system] = (acc[h.system] || 0) + 1, acc), {})).map(([name, count]) => ({ name, count }));
    return json(res, 200, {
      generatedAt: new Date().toISOString(),
      demoNetwork: true,
      summary: { hospitals: hospitals.length, online, delayed, offline, readiness: average('readiness'), stockScore: average('stockScore'), itemLines: hospitals.reduce((sum, h) => sum + h.itemLines, 0), lowStock: hospitals.reduce((sum, h) => sum + h.lowStock, 0), expiring: hospitals.reduce((sum, h) => sum + h.expiring, 0), openMappings },
      hospitals: [...hospitals].sort((a, b) => a.stockScore - b.stockScore || a.name.localeCompare(b.name, 'th')),
      rebalancing,
      systemCounts,
      syncTrend: [82, 86, 89, 92, 94, 96, Math.round((online / Math.max(1, hospitals.length)) * 100)]
    });
  }

  if (req.method === 'GET' && url.pathname === '/api/ai/mappings') {
    const status = url.searchParams.get('status') || 'open';
    const allowed = ['open', 'all', 'pending', 'review', 'approved', 'rejected'];
    if (!allowed.includes(status)) return error(res, 422, 'VALIDATION_FAILED', 'ตัวกรองสถานะไม่ถูกต้อง');
    let mappings = db.mappingQueue || [];
    if (status === 'open') mappings = mappings.filter(m => ['pending', 'review'].includes(m.status));
    else if (status !== 'all') mappings = mappings.filter(m => m.status === status);
    mappings = mappings.map(m => enrichMapping(m, db)).sort((a, b) => b.confidence - a.confidence || a.id.localeCompare(b.id));
    const counts = (db.mappingQueue || []).reduce((acc, m) => (acc[m.status] = (acc[m.status] || 0) + 1, acc), { pending: 0, review: 0, approved: 0, rejected: 0 });
    return json(res, 200, { engine: { mode: 'hybrid-deterministic-fallback', requiresHumanApproval: true, version: '1.0' }, counts, mappings, hospitals: db.hospitalNetwork.map(h => ({ id: h.id, name: h.name, system: h.system })) });
  }

  if (req.method === 'POST' && url.pathname === '/api/ai/mappings/suggest') {
    const input = await body(req);
    const sourceName = String(input.sourceName || '').trim();
    const sourceCode = String(input.sourceCode || '').trim();
    const unit = String(input.unit || '').trim();
    const hospital = db.hospitalNetwork.find(h => h.id === input.hospitalId);
    if (!hospital || sourceName.length < 3 || sourceName.length > 240 || unit.length < 1 || unit.length > 40) return error(res, 422, 'VALIDATION_FAILED', 'เลือกโรงพยาบาล และกรอกชื่อกับหน่วยให้ถูกต้อง');
    const suggestions = suggestMappings({ sourceName, sourceCode, unit }, db.items, 3).map(result => ({ ...result, item: db.items.find(i => i.id === result.itemId) }));
    return json(res, 200, { engine: { mode: 'hybrid-deterministic-fallback', requiresHumanApproval: true }, source: { hospitalId: hospital.id, hospitalName: hospital.name, sourceCode, sourceName, unit }, suggestions });
  }

  const decisionMatch = url.pathname.match(/^\/api\/ai\/mappings\/([^/]+)\/decision$/);
  if (req.method === 'POST' && decisionMatch) {
    if (s.user.role !== 'admin') return error(res, 403, 'FORBIDDEN', 'เฉพาะผู้ดูแลที่ได้รับมอบหมายเท่านั้น');
    const input = await body(req);
    const mapping = (db.mappingQueue || []).find(m => m.id === decisionMatch[1]);
    if (!mapping) return error(res, 404, 'NOT_FOUND', 'ไม่พบงาน mapping');
    if (!['pending', 'review'].includes(mapping.status)) return error(res, 409, 'ALREADY_REVIEWED', 'งาน mapping นี้ถูกพิจารณาแล้ว');
    if (!['approve', 'reject'].includes(input.decision)) return error(res, 422, 'VALIDATION_FAILED', 'คำตัดสินไม่ถูกต้อง');
    let decidedItem = null;
    if (input.decision === 'approve') {
      decidedItem = db.items.find(i => i.id === (input.itemId || mapping.suggestedItemId) && i.active);
      if (!decidedItem) return error(res, 422, 'VALIDATION_FAILED', 'ไม่พบรายการกลางที่ต้องการผูก');
      mapping.status = 'approved';
      mapping.decidedItemId = decidedItem.id;
    } else {
      mapping.status = 'rejected';
      mapping.decidedItemId = null;
    }
    mapping.reviewedBy = s.user.id;
    mapping.reviewedAt = new Date().toISOString();
    mapping.reviewNote = String(input.note || '').trim().slice(0, 300);
    db.audit.push({ id: `aud-${crypto.randomUUID()}`, action: input.decision === 'approve' ? 'MAPPING_APPROVE' : 'MAPPING_REJECT', entity: 'item-mapping', entityId: mapping.id, user: s.user.id, at: mapping.reviewedAt, detail: `${mapping.sourceCode} ${input.decision === 'approve' ? `→ ${decidedItem.code}` : 'ถูกปฏิเสธ'}` });
    await writeDb(db);
    return json(res, 200, { mapping: enrichMapping(mapping, db) });
  }

  if (req.method === 'GET' && url.pathname === '/api/items') {
    const q = (url.searchParams.get('q') || '').trim().toLowerCase();
    const status = url.searchParams.get('status') || 'all';
    const category = url.searchParams.get('category') || 'all';
    let rows = db.items.filter(i => i.active).map(enrich);
    if (q) rows = rows.filter(i => `${i.code} ${i.name} ${i.lot}`.toLowerCase().includes(q));
    if (status !== 'all') rows = rows.filter(i => i.status === status);
    if (category !== 'all') rows = rows.filter(i => i.category === category);
    rows.sort((a, b) => a.name.localeCompare(b.name, 'th'));
    return json(res, 200, { items: rows, categories: [...new Set(db.items.map(i => i.category))].sort() });
  }

  if (req.method === 'POST' && url.pathname === '/api/items') {
    const input = await body(req);
    const required = ['code', 'name', 'category', 'unit'];
    const missing = required.filter(k => !String(input[k] || '').trim());
    if (missing.length) return error(res, 422, 'VALIDATION_FAILED', 'กรอกข้อมูลจำเป็นให้ครบ', Object.fromEntries(missing.map(k => [k, 'จำเป็น'])));
    if (db.items.some(i => i.code.toLowerCase() === input.code.trim().toLowerCase())) return error(res, 409, 'DUPLICATE_CODE', 'รหัสรายการนี้มีอยู่แล้ว');
    const item = { id: `itm-${crypto.randomUUID()}`, code: input.code.trim(), name: input.name.trim(), category: input.category.trim(), qty: 0, unit: input.unit.trim(), package: String(input.package || '').trim(), minQty: Math.max(0, Number(input.minQty) || 0), expiry: null, lot: '', location: String(input.location || '').trim(), sourceRow: null, active: true };
    db.items.push(item);
    db.audit.push({ id: `aud-${crypto.randomUUID()}`, action: 'CREATE', entity: 'item', entityId: item.id, user: s.user.id, at: new Date().toISOString(), detail: `สร้างรายการ ${item.code}` });
    await writeDb(db);
    return json(res, 201, { item: enrich(item) });
  }

  if (req.method === 'GET' && url.pathname === '/api/transactions') {
    const type = url.searchParams.get('type');
    const rows = db.transactions.filter(t => !type || t.type === type).map(t => ({ ...t, lineCount: t.items.length, totalQty: t.items.reduce((n, i) => n + i.qty, 0) })).sort((a, b) => b.date.localeCompare(a.date));
    return json(res, 200, { transactions: rows, facilities: db.facilities });
  }

  if (req.method === 'POST' && url.pathname === '/api/transactions') {
    const input = await body(req);
    if (!['inbound', 'outbound'].includes(input.type)) return error(res, 422, 'VALIDATION_FAILED', 'ประเภทรายการไม่ถูกต้อง');
    if (!input.date || !input.facility || !Array.isArray(input.items) || input.items.length === 0) return error(res, 422, 'VALIDATION_FAILED', 'กรอกวันที่ หน่วยงาน และอย่างน้อย 1 รายการ');
    const normalized = [];
    for (const row of input.items) {
      const item = db.items.find(i => i.id === row.itemId && i.active);
      const qty = Number(row.qty);
      if (!item || !Number.isFinite(qty) || qty <= 0) return error(res, 422, 'VALIDATION_FAILED', 'รายการหรือจำนวนไม่ถูกต้อง');
      if (input.type === 'outbound' && item.qty < qty) return error(res, 409, 'INSUFFICIENT_STOCK', `${item.name} คงเหลือ ${item.qty} ${item.unit} ไม่พอเบิก ${qty} ${item.unit}`);
      normalized.push({ item, qty, lot: String(row.lot || item.lot || '').trim(), expiry: row.expiry || item.expiry || null });
    }
    for (const row of normalized) {
      row.item.qty += input.type === 'inbound' ? row.qty : -row.qty;
      if (input.type === 'inbound') { row.item.lot = row.lot || row.item.lot; row.item.expiry = row.expiry || row.item.expiry; }
    }
    const txn = { id: `txn-${crypto.randomUUID()}`, type: input.type, refNo: String(input.refNo || '').trim() || `${input.type === 'inbound' ? 'IN' : 'OUT'}-${Date.now()}`, facility: String(input.facility).trim(), date: input.date, status: 'posted', items: normalized.map(r => ({ itemId: r.item.id, qty: r.qty, lot: r.lot, expiry: r.expiry })), note: String(input.note || '').trim(), createdBy: s.user.id, createdAt: new Date().toISOString() };
    db.transactions.push(txn);
    db.audit.push({ id: `aud-${crypto.randomUUID()}`, action: input.type === 'inbound' ? 'RECEIVE' : 'ISSUE', entity: 'transaction', entityId: txn.id, user: s.user.id, at: txn.createdAt, detail: `${txn.refNo} ${txn.items.length} รายการ` });
    await writeDb(db);
    return json(res, 201, { transaction: txn });
  }

  if (req.method === 'GET' && url.pathname === '/api/master-data') return json(res, 200, { facilities: db.facilities, integrations: db.integrations, meta: db.meta, audit: db.audit.slice(-12).reverse() });

  if (req.method === 'GET' && url.pathname === '/api/v1/stock') return json(res, 200, { apiVersion: '1.0', generatedAt: new Date().toISOString(), warehouse: db.meta.warehouse, data: db.items.filter(i => i.active).map(enrich) });

  if (req.method === 'GET' && url.pathname === '/api/export/inventory.csv') {
    const headers = ['code','name','category','quantity','unit','lot','expiry','location','status','source_sheet','source_row'];
    const lines = [headers.map(csvCell).join(','), ...db.items.filter(i => i.active).map(i => [i.code,i.name,i.category,i.qty,i.unit,i.lot,i.expiry,i.location,itemStatus(i),db.meta.sourceSheet,i.sourceRow].map(csvCell).join(','))];
    res.writeHead(200, { 'Content-Type': 'text/csv; charset=utf-8', 'Content-Disposition': 'attachment; filename="stock-logistics-sisaket.csv"' });
    return res.end(`\ufeff${lines.join('\r\n')}`);
  }

  return error(res, 404, 'NOT_FOUND', 'ไม่พบ API ที่ร้องขอ');
}

async function serveStatic(req, res, url) {
  let relative = decodeURIComponent(url.pathname === '/' ? '/index.html' : url.pathname);
  const target = path.normalize(path.join(PUBLIC, relative));
  if (!target.startsWith(PUBLIC)) return error(res, 403, 'FORBIDDEN', 'ไม่อนุญาต');
  try {
    const stat = await fsp.stat(target);
    if (!stat.isFile()) throw new Error('not file');
    res.writeHead(200, { 'Content-Type': mime[path.extname(target)] || 'application/octet-stream', 'Cache-Control': 'no-cache' });
    fs.createReadStream(target).pipe(res);
  } catch { error(res, 404, 'NOT_FOUND', 'ไม่พบไฟล์'); }
}

function createServer() {
  return http.createServer(async (req, res) => {
    const requestId = crypto.randomUUID();
    res.setHeader('X-Request-Id', requestId);
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Referrer-Policy', 'same-origin');
    res.setHeader('Content-Security-Policy', "default-src 'self'; style-src 'self'; script-src 'self'; img-src 'self' data:; connect-src 'self'; frame-ancestors 'none'");
    try {
      const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
      if (url.pathname.startsWith('/api/')) await api(req, res, url);
      else await serveStatic(req, res, url);
    } catch (e) {
      console.error(`[${requestId}]`, e.message);
      if (!res.headersSent) error(res, e.status || 500, e.status === 400 ? 'INVALID_JSON' : 'INTERNAL_ERROR', e.status === 400 ? 'รูปแบบข้อมูลไม่ถูกต้อง' : 'ระบบขัดข้อง กรุณาลองใหม่');
      else res.end();
    }
  });
}

if (require.main === module) {
  const port = Number(process.env.PORT) || 4173;
  ensureDb().then(() => createServer().listen(port, '127.0.0.1', () => console.log(`Stock Logistics Sisaket: http://127.0.0.1:${port}`)));
}

module.exports = { createServer, ensureDb, DB_FILE, SEED_FILE };
