const icons = {
  dashboard:'<rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/>',
  inbound:'<path d="M12 3v12m0 0 4-4m-4 4-4-4"/><path d="M5 19h14"/>', outbound:'<path d="M12 21V9m0 0 4 4m-4-4-4 4"/><path d="M5 5h14"/>',
  boxes:'<path d="m12 2 4.5 2.5L12 7 7.5 4.5 12 2Z"/><path d="m16.5 4.5 4 2.3-4.5 2.6L12 7"/><path d="m7.5 4.5-4 2.3L8 9.4 12 7"/><path d="M8 9.4v5.2l4 2.3 4-2.3V9.4"/><path d="m8 14.6-4.5 2.6 4.5 2.6 4-2.3m4-2.9 4.5 2.6-4.5 2.6-4-2.3"/>',
  database:'<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5"/><path d="M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6"/>',
  network:'<circle cx="12" cy="5" r="2.5"/><circle cx="5" cy="18" r="2.5"/><circle cx="19" cy="18" r="2.5"/><path d="m10.8 7.2-4.5 8.4m6.9-8.4 4.5 8.4M7.5 18h9"/>', sparkles:'<path d="m12 3 1.3 3.7L17 8l-3.7 1.3L12 13l-1.3-3.7L7 8l3.7-1.3L12 3Z"/><path d="m19 14 .8 2.2L22 17l-2.2.8L19 20l-.8-2.2L16 17l2.2-.8L19 14ZM5 13l.8 2.2L8 16l-2.2.8L5 19l-.8-2.2L2 16l2.2-.8L5 13Z"/>', brain:'<path d="M9.5 4.5A3 3 0 0 0 4 6v.5A3.5 3.5 0 0 0 4.5 13 3 3 0 0 0 9 17.5V20m5.5-15.5A3 3 0 0 1 20 6v.5a3.5 3.5 0 0 1-.5 6.5 3 3 0 0 1-4.5 4.5V20M9.5 4.5A3 3 0 0 1 12 6a3 3 0 0 1 2.5-1.5M9 10a3 3 0 0 0 3-3v13m3-10a3 3 0 0 1-3-3"/>', wifi:'<path d="M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0M12 20h.01M2 9a15 15 0 0 1 20 0"/>', target:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>', arrowRight:'<path d="M5 12h14m-5-5 5 5-5 5"/>',
  user:'<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 3.6-7 8-7s8 3 8 7"/>', lock:'<rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>', eye:'<path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z"/><circle cx="12" cy="12" r="2.5"/>',
  login:'<path d="M10 17l5-5-5-5"/><path d="M15 12H3"/><path d="M14 3h5a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-5"/>', logout:'<path d="m14 8 4 4-4 4"/><path d="M18 12H7"/><path d="M11 4H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h6"/>',
  shield:'<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/>', bell:'<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/><path d="M10 21h4"/>',
  package:'<path d="m21 8-9-5-9 5 9 5 9-5Z"/><path d="m3 8 9 5 9-5v9l-9 5-9-5V8Z"/><path d="M12 13v9"/>', alert:'<path d="M10.3 3.5 2.2 18a2 2 0 0 0 1.8 3h16a2 2 0 0 0 1.8-3L13.7 3.5a2 2 0 0 0-3.4 0Z"/><path d="M12 9v4m0 4h.01"/>',
  hospital:'<path d="M3 21h18M5 21V5h14v16M9 8h6M12 5v6M8 14h2m4 0h2m-8 3h2m4 0h2"/>', activity:'<path d="M3 12h4l2-7 4 14 2-7h6"/>',
  clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>', search:'<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>', plus:'<path d="M12 5v14M5 12h14"/>', download:'<path d="M12 3v12m0 0 4-4m-4 4-4-4M4 21h16"/>',
  chevron:'<path d="m9 18 6-6-6-6"/>', check:'<path d="m5 12 4 4L19 6"/>', trash:'<path d="M4 7h16M9 7V4h6v3m3 0-1 14H7L6 7m4 4v6m4-6v6"/>', info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v5m0-8h.01"/>', close:'<path d="m6 6 12 12M18 6 6 18"/>', plug:'<path d="m12 22 3-3-2-2 5-5-6-6-5 5-2-2-3 3 10 10Z"/><path d="m10 8 3 3"/>', file:'<path d="M5 3h9l5 5v13H5V3Z"/><path d="M14 3v5h5M8 13h8m-8 4h8"/>',
  edit:'<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>',
  ban:'<circle cx="12" cy="12" r="10"/><path d="m4.93 4.93 14.14 14.14"/>',
  refresh:'<path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M3 21v-5h5"/>',
  gear:'<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>',
  print:'<polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/>',
  award:'<circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>',
  paperclip:'<path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"/>',
  upload:'<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>'
};

const icon = (name, label='') => `<svg class="icon" viewBox="0 0 24 24" aria-hidden="${!label}">${label ? `<title>${label}</title>` : ''}${icons[name] || icons.info}</svg>`;
document.querySelectorAll('[data-icon]').forEach(el => el.innerHTML = icon(el.dataset.icon));

const state = {
  user: null,
  csrf: null,
  items: [],
  categories: [],
  facilities: [],
  route: 'dashboard',
  draft: [],
  pollingTimer: null,
  stockSort: { field: 'name', order: 'asc' },
  stockPage: 1,
  stockLimit: 50,
  txnSort: { field: 'date', order: 'desc' },
  txnPage: 1,
  txnLimit: 20
};

const $ = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => [...root.querySelectorAll(s)];
const fmt = new Intl.NumberFormat('th-TH');
const dateFmt = new Intl.DateTimeFormat('th-TH', { day: 'numeric', month: 'short', year: '2-digit' });
const routeTitles = {
  dashboard: 'ภาพรวมคลัง',
  province: 'ภาพรวมสต็อกทั้งจังหวัด',
  mapping: 'AI Mapping Studio',
  inbound: 'รับเข้าคลัง',
  outbound: 'เบิกจ่ายออกจากคลัง',
  stock: 'รายการคงคลัง',
  data: 'ข้อมูลและการเชื่อมต่อ'
};

/* ── Network & API Layer with Timeout & Retry ── */
async function api(url, options = {}, retries = 1) {
  const opts = { ...options, headers: { 'Content-Type': 'application/json', ...(options.headers || {}) } };
  if (state.csrf && opts.method && opts.method !== 'GET') opts.headers['X-CSRF-Token'] = state.csrf;
  
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 15000);
  opts.signal = controller.signal;

  try {
    const res = await fetch(url, opts);
    clearTimeout(timeoutId);
    const content = res.headers.get('content-type') || '';
    const data = content.includes('json') ? await res.json() : await res.text();
    if (!res.ok) {
      if (res.status === 401 && url !== '/api/login') showLogin();
      const err = new Error(data?.error?.message || 'ไม่สามารถดำเนินการได้');
      err.data = data;
      err.status = res.status;
      throw err;
    }
    return data;
  } catch (err) {
    clearTimeout(timeoutId);
    if (retries > 0 && err.name !== 'AbortError' && (!err.status || err.status >= 500)) {
      await new Promise(r => setTimeout(r, 600));
      return api(url, options, retries - 1);
    }
    if (err.name === 'AbortError') {
      const timeoutErr = new Error('การเชื่อมต่อหมดเวลา (Timeout) กรุณาลองใหม่อีกครั้ง');
      timeoutErr.status = 408;
      throw timeoutErr;
    }
    throw err;
  }
}

/* ── Utilities ── */
function esc(value = '') { return String(value ?? '').replace(/[&<>'"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[c])); }
function fdate(value) { return value ? dateFmt.format(new Date(`${value}T00:00:00`)) : 'ไม่ระบุ'; }
function today() { return new Date().toISOString().slice(0, 10); }

function toast(message, type = 'success') {
  const el = document.createElement('div');
  el.className = `toast ${type}`;
  el.innerHTML = `<span>${icon(type === 'success' ? 'check' : 'alert')}</span><strong>${esc(message)}</strong>`;
  $('#toast-region').append(el);
  setTimeout(() => el.remove(), 3600);
}

function statusLabel(status) {
  return ({
    normal: 'พร้อมใช้',
    low: 'ต่ำกว่าจุดเตือน',
    expiring: 'ใกล้หมดอายุ',
    expired: 'หมดอายุ',
    ready: 'พร้อมใช้',
    design: 'รอเชื่อมต่อ',
    pending: 'พร้อมตรวจ',
    review: 'ต้องทบทวน',
    approved: 'อนุมัติแล้ว',
    rejected: 'ปฏิเสธแล้ว',
    posted: 'บันทึกแล้ว',
    voided: 'ยกเลิกแล้ว',
    executed: 'ดำเนินการแล้ว'
  })[status] || status;
}

function setLoading() {
  $('#main-content').innerHTML = `<div class="grid kpi-grid">${'<div class="skeleton"></div>'.repeat(4)}</div><div class="skeleton skeleton-large"></div>`;
}

function pageHead(iconName, tone, title, subtitle, actions = '') {
  return `<div class="page-head"><div class="page-title-wrap"><div class="page-icon ${tone}">${icon(iconName)}</div><div class="page-title"><h1>${title}</h1><p>${subtitle}</p></div></div><div class="page-actions">${actions}</div></div>`;
}

function announce(text) {
  const el = $('#route-announcer');
  if (el) el.textContent = text;
}

function debounce(fn, wait = 300) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), wait);
  };
}

/* ── Accessible Modal Manager with Keyboard Trap & Escape ── */
let lastFocusedElement = null;

function openModal(html, setupFn) {
  lastFocusedElement = document.activeElement;
  const root = $('#modal-root');
  root.innerHTML = html;

  const backdrop = $('.modal-backdrop', root);
  const modal = $('.modal', root) || $('.confirm-dialog', root);
  
  // Close handlers
  $$('[data-close]', root).forEach(b => b.addEventListener('click', closeModal));
  if (backdrop) backdrop.addEventListener('click', e => { if (e.target === e.currentTarget) closeModal(); });

  // Escape key handler
  const keyHandler = e => {
    if (e.key === 'Escape') {
      e.preventDefault();
      closeModal();
    } else if (e.key === 'Tab') {
      // Focus trap inside modal
      const focusables = modal ? modal.querySelectorAll('button:not(:disabled), [href], input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex="-1"])') : [];
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        last.focus();
        e.preventDefault();
      } else if (!e.shiftKey && document.activeElement === last) {
        first.focus();
        e.preventDefault();
      }
    }
  };
  document.addEventListener('keydown', keyHandler);
  root._keyHandler = keyHandler;

  if (setupFn) setupFn(modal);
  
  // Focus first control
  const firstInput = modal ? modal.querySelector('input:not([type=hidden]), select, textarea, button.primary') : null;
  if (firstInput) setTimeout(() => firstInput.focus(), 60);
}

function closeModal() {
  const root = $('#modal-root');
  if (root._keyHandler) {
    document.removeEventListener('keydown', root._keyHandler);
    delete root._keyHandler;
  }
  root.innerHTML = '';
  if (lastFocusedElement) {
    lastFocusedElement.focus();
    lastFocusedElement = null;
  }
}

/* ── Reusable Confirmation Dialog ── */
function confirmModal({ title, message, confirmText = 'ยืนยัน', cancelText = 'ยกเลิก', danger = false, iconName = 'alert' }) {
  return new Promise(resolve => {
    const html = `
      <div class="modal-backdrop" role="presentation">
        <div class="modal confirm-dialog" role="dialog" aria-modal="true" aria-labelledby="confirm-title">
          <div class="confirm-icon ${danger ? 'danger' : 'warning'}">${icon(iconName)}</div>
          <h3 id="confirm-title">${esc(title)}</h3>
          <p>${esc(message)}</p>
          <div class="dialog-actions">
            <button class="button secondary" type="button" id="confirm-cancel">${esc(cancelText)}</button>
            <button class="button ${danger ? 'danger' : 'primary'}" type="button" id="confirm-ok">${esc(confirmText)}</button>
          </div>
        </div>
      </div>`;
    openModal(html, modal => {
      $('#confirm-ok', modal).addEventListener('click', () => { closeModal(); resolve(true); });
      $('#confirm-cancel', modal).addEventListener('click', () => { closeModal(); resolve(false); });
    });
  });
}

/* ── Pagination Component Renderer ── */
function renderPagination(meta, onPageChange) {
  if (!meta || meta.totalPages <= 1) return '';
  const { page, totalPages, total, limit } = meta;
  const start = (page - 1) * limit + 1;
  const end = Math.min(total, page * limit);

  let pages = [];
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= page - 1 && i <= page + 1)) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== '...') {
      pages.push('...');
    }
  }

  const html = `
    <div class="pagination-bar">
      <span class="pagination-info">แสดง ${fmt.format(start)}-${fmt.format(end)} จากทั้งหมด ${fmt.format(total)} รายการ</span>
      <div class="pagination-controls">
        <button class="page-btn" ${page <= 1 ? 'disabled' : ''} data-page="${page - 1}" aria-label="หน้าก่อนหน้า">‹</button>
        ${pages.map(p => p === '...' ? `<span class="page-dots">…</span>` : `<button class="page-btn ${p === page ? 'active' : ''}" data-page="${p}">${p}</button>`).join('')}
        <button class="page-btn" ${page >= totalPages ? 'disabled' : ''} data-page="${page + 1}" aria-label="หน้าถัดไป">›</button>
      </div>
    </div>`;

  setTimeout(() => {
    $$('.pagination-controls .page-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const p = Number(btn.dataset.page);
        if (p && p !== page && p >= 1 && p <= totalPages) onPageChange(p);
      });
    });
  }, 0);

  return html;
}

/* ── Offline Network Listeners ── */
window.addEventListener('online', () => {
  const banner = $('#offline-banner');
  if (banner) banner.hidden = true;
  toast('เชื่อมต่ออินเทอร์เน็ตแล้ว', 'success');
});
window.addEventListener('offline', () => {
  const banner = $('#offline-banner');
  if (banner) banner.hidden = false;
  toast('ไม่มีการเชื่อมต่อเครือข่าย', 'error');
});

/* ── Polling Manager ── */
function startPolling(fn, intervalMs = 60000) {
  stopPolling();
  state.pollingTimer = setInterval(() => {
    if (navigator.onLine !== false && state.user) fn();
  }, intervalMs);
}
function stopPolling() {
  if (state.pollingTimer) {
    clearInterval(state.pollingTimer);
    state.pollingTimer = null;
  }
}

/* ── App Initialization & Auth ── */
async function init() {
  try {
    const s = await api('/api/session');
    state.user = s.user;
    state.csrf = s.csrf;
    showApp();
  } catch {
    showLogin();
  }
}

function showLogin() {
  stopPolling();
  state.user = null;
  $('#app-view').hidden = true;
  $('#login-view').hidden = false;
  setTimeout(() => $('#username')?.focus(), 50);
}

function showApp() {
  $('#login-view').hidden = true;
  $('#app-view').hidden = false;
  $('#profile-name').textContent = state.user?.name || 'ผู้ดูแลคลัง';
  route();
}

$('#login-form').addEventListener('submit', async e => {
  e.preventDefault();
  const btn = e.submitter;
  const err = $('#login-error');
  err.textContent = '';
  btn.disabled = true;
  btn.lastElementChild.textContent = 'กำลังเข้าสู่ระบบ…';
  try {
    const data = await api('/api/login', {
      method: 'POST',
      body: JSON.stringify({ username: $('#username').value.trim(), password: $('#password').value })
    });
    state.user = data.user;
    state.csrf = data.csrf;
    showApp();
  } catch (ex) {
    err.textContent = ex.message;
    $('#password').focus();
  } finally {
    btn.disabled = false;
    btn.lastElementChild.textContent = 'เข้าสู่ระบบ';
  }
});

$('#toggle-password').addEventListener('click', () => {
  const p = $('#password');
  p.type = p.type === 'password' ? 'text' : 'password';
});

$('#logout-button').addEventListener('click', async () => {
  try { await api('/api/logout', { method: 'POST', body: '{}' }); } finally { showLogin(); }
});

$('#alerts-button').addEventListener('click', () => { location.hash = 'stock?status=expiring'; });
window.addEventListener('hashchange', route);

async function loadItems() {
  const data = await api('/api/items');
  state.items = data.items;
  state.categories = data.categories;
}

/* ── SPA Router ── */
async function route() {
  if (!state.user) return;
  stopPolling();
  const raw = (location.hash.slice(1) || 'dashboard');
  const [name, query = ''] = raw.split('?');
  state.route = ['dashboard', 'province', 'mapping', 'inbound', 'outbound', 'stock', 'data'].includes(name) ? name : 'dashboard';
  
  $$('[data-route]').forEach(a => a.classList.toggle('active', a.dataset.route === state.route));
  document.title = `${routeTitles[state.route]} | Stock Logistics Sisaket`;
  announce(`เปิดหน้า ${routeTitles[state.route]}`);
  setLoading();

  try {
    if (!state.items.length) await loadItems();
    if (state.route === 'dashboard') await dashboard();
    else if (state.route === 'province') await provincePage();
    else if (state.route === 'mapping') await mappingPage();
    else if (state.route === 'inbound') await transactionPage('inbound');
    else if (state.route === 'outbound') await transactionPage('outbound');
    else if (state.route === 'stock') await stockPage(new URLSearchParams(query));
    else if (state.route === 'data') await dataPage();
    $('#main-content').focus({ preventScroll: true });
  } catch (ex) {
    $('#main-content').innerHTML = `
      <div class="card">
        <div class="notice warning">${icon('alert')}<div><strong>โหลดข้อมูลไม่สำเร็จ</strong><br>${esc(ex.message)}</div></div>
        <button class="button secondary" onclick="location.reload()">ลองใหม่</button>
      </div>`;
  }
}

/* ══════════════════════════════════════════════════════════════
   1. DASHBOARD VIEW
   ══════════════════════════════════════════════════════════════ */
async function dashboard() {
  const d = await api('/api/dashboard');
  $('#alert-count').textContent = d.kpis.expiring + d.kpis.low;
  const max = Math.max(1, ...d.activity.flatMap(x => [x.inbound, x.outbound]));

  $('#main-content').innerHTML = `
    <section class="dashboard-hero reveal">
      <div class="dashboard-hero-copy">
        <div class="hero-badge">${icon('activity')} SISAKET SMART STOCK <span>LIVE OPERATIONS</span></div>
        <h1>ศูนย์บัญชาการ<br><em>คลังยาอัจฉริยะ</em></h1>
        <p>เห็นสถานะเวชภัณฑ์ การเคลื่อนไหว และความเสี่ยงสำคัญจาก <strong>${esc(d.meta.warehouse)}</strong> ในมุมมองเดียว พร้อมขยายการเชื่อมต่อทั้งจังหวัด</p>
        <div class="hero-actions">
          <a class="button smart-primary" href="#inbound">${icon('plus')} บันทึกรับเข้า</a>
          <a class="button glass" href="/api/export/inventory.csv">${icon('download')} ส่งออกข้อมูล</a>
        </div>
        <div class="hero-meta">
          <span><b class="live-dot"></b> ระบบคลังพร้อมใช้งาน</span>
          <span>${icon('shield')} ตรวจสอบย้อนหลังได้</span>
          <span>${icon('database')} อ้างอิงข้อมูล Excel</span>
        </div>
      </div>
      <div class="stock-visual" aria-label="ภาพรวมสุขภาพคลัง">
        <div class="stock-orbit orbit-a"></div><div class="stock-orbit orbit-b"></div>
        <div class="stock-core">${icon('boxes')}<strong>${fmt.format(d.kpis.itemLines)}</strong><small>รายการคงคลัง</small></div>
        <span class="stock-node n-a">AI</span><span class="stock-node n-b">22</span><span class="stock-node n-c">API</span>
        <div class="visual-readout"><b>${fmt.format(d.kpis.low + d.kpis.expiring)}</b><span>รายการต้องดูแล</span></div>
      </div>
    </section>
    ${pageHead('dashboard', '', 'ภาพรวมการปฏิบัติงาน', `${esc(d.meta.warehouse)} · อัปเดตจากข้อมูล Excel ต้นฉบับ`, `<a class="button secondary" href="#province">${icon('network')} ดูทั้งจังหวัด</a><a class="button primary" href="#mapping">${icon('sparkles')} AI Mapping</a>`)}
    <div class="grid kpi-grid">
      ${kpi('package', '', 'รายการคงคลัง', fmt.format(d.kpis.itemLines), 'รายการที่ใช้งาน')}
      ${kpi('alert', 'orange', 'ต่ำกว่าจุดเตือน', fmt.format(d.kpis.low), 'ควรพิจารณาจัดหา')}
      ${kpi('clock', 'red', 'ใกล้หมดอายุ', fmt.format(d.kpis.expiring), 'ภายใน 180 วัน')}
      ${kpi('hospital', 'blue', 'หน่วยงานในระบบ', fmt.format(d.kpis.facilities), 'ปลายทางเบิกจ่าย')}
    </div>
    ${d.alerts.length ? `
      <section class="alert-banner">
        <div class="card-head">
          <div class="alert-title"><span>${icon('alert')}</span><div><h2>รายการที่ต้องจัดการ</h2><p>เรียงตามความเร่งด่วนจากวันหมดอายุและระดับคงคลัง</p></div></div>
          <div style="display:flex;gap:8px;align-items:center;">
            <button type="button" class="button smart-primary small" id="btn-open-expiry-email">${icon('mail')} ส่งอีเมลแจ้งเตือน 6 เดือน</button>
            <a class="text-link" href="#stock?status=expiring">ดูทั้งหมด ${icon('chevron')}</a>
          </div>
        </div>
        <div class="alert-list">${d.alerts.slice(0, 3).map(alertCard).join('')}</div>
      </section>` : ''}
    <div class="grid content-grid">
      <section class="card">
        <div class="card-head">
          <div><h2>แนวโน้มการเคลื่อนไหว 6 เดือน</h2><p>จำนวนรวมเชิงปริมาณจากรายการรับเข้าและเบิกจ่าย (หน่วยอาจต่างกัน)</p></div>
          <div class="chart-legend"><span>รับเข้า</span><span>เบิกจ่าย</span></div>
        </div>
        <div class="chart" aria-label="กราฟแท่งแนวโน้มการเคลื่อนไหว 6 เดือน">${d.activity.map(x => `
          <div class="chart-group">
            <div class="bar inbound h-${Math.round(x.inbound / max * 10)}" title="รับเข้า ${fmt.format(x.inbound)}" aria-label="${x.month}: รับเข้า ${fmt.format(x.inbound)}"></div>
            <div class="bar outbound h-${Math.round(x.outbound / max * 10)}" title="เบิกจ่าย ${fmt.format(x.outbound)}" aria-label="${x.month}: เบิกจ่าย ${fmt.format(x.outbound)}"></div>
            <label>${x.month.slice(5)}/${x.month.slice(2, 4)}</label>
          </div>`).join('')}</div>
      </section>
      <section class="card">
        <div class="card-head"><div><h2>กิจกรรมล่าสุด</h2><p>ประวัติการเคลื่อนไหวที่บันทึกแล้ว</p></div></div>
        <div class="timeline">${d.recent.map(timelineRow).join('') || '<div class="empty-inline">ยังไม่มีกิจกรรม</div>'}</div>
      </section>
    </div>`;

  $('#btn-open-expiry-email')?.addEventListener('click', () => {
    openExpiryAlertEmailModal();
  });

  // Start auto-refresh polling every 60s
  startPolling(dashboard, 60000);
}

function kpi(iconName, tone, label, value, note) {
  return `<article class="kpi-card ${tone || 'green'}"><div class="kpi-icon ${tone}">${icon(iconName)}</div><div class="kpi-meta"><small>${label}</small><strong>${value}</strong><div><em>${note}</em></div></div><span class="kpi-arc" aria-hidden="true"></span></article>`;
}
function alertCard(i) {
  return `<div class="alert-item"><div><strong title="${esc(i.name)}">${esc(i.name)}</strong><small>${i.status === 'low' ? `คงเหลือ ${fmt.format(i.qty)} ${esc(i.unit)}` : `หมดอายุ ${fdate(i.expiry)}`}</small></div><span class="status ${i.status}">${statusLabel(i.status)}</span></div>`;
}
function timelineRow(t) {
  return `<div class="timeline-row"><div class="timeline-icon ${t.type}">${icon(t.type === 'inbound' ? 'inbound' : 'outbound')}</div><div><strong>${t.type === 'inbound' ? 'รับเข้าจาก' : 'เบิกจ่ายให้'} ${esc(t.facility)}</strong><small>${esc(t.refNo)} · ${t.items.length} รายการ</small></div><time>${fdate(t.date)}</time></div>`;
}

/* ══════════════════════════════════════════════════════════════
   2. PROVINCE & SMART REBALANCING VIEW
   ══════════════════════════════════════════════════════════════ */
function pctClass(value) { return `pct-${Math.max(0, Math.min(100, Math.round(Number(value || 0) / 5) * 5))}`; }
function syncLabel(status) { return ({ online: 'เชื่อมต่อแล้ว', delayed: 'ข้อมูลล่าช้า', offline: 'ออฟไลน์' })[status] || status; }
function riskClass(score) { return score < 70 ? 'critical' : score < 85 ? 'watch' : 'healthy'; }

async function provincePage() {
  const d = await api('/api/province/overview');
  $('#alert-count').textContent = d.summary.openMappings + d.summary.offline;

  $('#main-content').innerHTML = `
    <section class="smart-hero reveal">
      <div class="hero-glow glow-a"></div><div class="hero-glow glow-b"></div>
      <div class="hero-copy">
        <div class="hero-badge">${icon('wifi')} PROVINCIAL COMMAND CENTER <span>DEMO NETWORK</span></div>
        <h1>มองเห็นสต็อกทั้งจังหวัด<br><em>ก่อนที่ของจะขาด</em></h1>
        <p>รวมสัญญาณจาก ${fmt.format(d.summary.hospitals)} โรงพยาบาล ตรวจความพร้อมแบบข้ามคลัง และค้นหาโอกาสโยกสต็อกในหน้าจอเดียว</p>
        <div class="hero-actions">
          <a class="button smart-primary" href="#mapping">${icon('sparkles')} เปิด AI Mapping</a>
          <button class="button glass" id="refresh-network">${icon('refresh')} ซิงก์สถานะใหม่</button>
        </div>
        <div class="hero-meta">
          <span><b class="live-dot"></b> ${fmt.format(d.summary.online)} แห่งออนไลน์</span>
          <span>อัปเดต ${new Date(d.generatedAt).toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' })} น.</span>
          <span>ข้อมูลเครือข่ายจำลองเพื่อออกแบบระบบ</span>
        </div>
      </div>
      <div class="network-orb" aria-label="สถานะเครือข่ายโรงพยาบาล">
        <div class="orb-ring ring-one"></div><div class="orb-ring ring-two"></div>
        <div class="orb-core">${icon('network')}<strong>${d.summary.hospitals}</strong><small>โรงพยาบาล</small></div>
        ${d.hospitals.slice(0, 12).map((h, i) => `<span class="orb-node node-${i + 1} ${h.syncStatus}" title="${esc(h.name)}" data-hsp-id="${h.id}"></span>`).join('')}
      </div>
    </section>
    <div class="grid smart-kpis reveal delay-1">
      ${smartKpi('hospital', 'blue', 'โรงพยาบาลในเครือข่าย', d.summary.hospitals, `${d.summary.online} online · ${d.summary.delayed} delayed`)}
      ${smartKpi('target', 'green', 'ความพร้อมใช้งาน', `${d.summary.readiness}%`, 'ค่าเฉลี่ยทั้งจังหวัด')}
      ${smartKpi('alert', 'orange', 'รายการต่ำกว่าจุดเตือน', d.summary.lowStock, 'รวมทุกโรงพยาบาล')}
      ${smartKpi('sparkles', 'purple', 'รอ AI Mapping', d.summary.openMappings, 'ต้องยืนยันโดยมนุษย์')}
    </div>
    <div class="grid province-panels reveal delay-2">
      <section class="card network-card">
        <div class="card-head">
          <div><h2>เครือข่ายการซิงก์</h2><p>สถานะแต่ละโรงพยาบาลตามรอบเชื่อมต่อ (คลิกเพื่อดูรายละเอียด)</p></div>
          <div class="sync-legend"><span class="online">ออนไลน์</span><span class="delayed">ล่าช้า</span><span class="offline">ออฟไลน์</span></div>
        </div>
        <div class="network-matrix">
          ${d.hospitals.map(h => `<div class="network-node ${h.syncStatus}" title="${esc(h.name)}" data-hsp-id="${h.id}" style="cursor:pointer"><span>${esc(h.district.slice(0, 2))}</span><b></b><small>${esc(h.district)}</small></div>`).join('')}
        </div>
        <div class="system-strip">${d.systemCounts.map(s => `<span>${icon('database')} ${esc(s.name)} <b>${s.count}</b></span>`).join('')}</div>
      </section>
      <section class="card transfer-panel">
        <div class="card-head"><div><h2>Smart Rebalancing</h2><p>ข้อเสนอโยกสต็อกข้ามโรงพยาบาล</p></div><span class="ai-chip">${icon('sparkles')} AI INSIGHT</span></div>
        <div class="transfer-list">${d.rebalancing.map(transferCard).join('') || '<div class="empty-inline">ไม่มีข้อเสนอการโยกย้ายในขณะนี้</div>'}</div>
      </section>
    </div>
    <section class="card table-card reveal delay-3">
      <div class="table-tools">
        <div class="table-heading"><h2>สุขภาพสต็อกทุกโรงพยาบาล</h2><p>คลิกแถวเพื่อดูรายงานเชิงลึก</p></div>
        <label class="search">${icon('search')}<input id="hospital-search" placeholder="ค้นหาโรงพยาบาลหรืออำเภอ" aria-label="ค้นหาโรงพยาบาล"></label>
        <select id="sync-filter" class="filter-select" aria-label="กรองสถานะซิงก์">
          <option value="all">ทุกสถานะ</option>
          <option value="online">ออนไลน์</option>
          <option value="delayed">ข้อมูลล่าช้า</option>
          <option value="offline">ออฟไลน์</option>
        </select>
      </div>
      <div id="hospital-table"></div>
    </section>`;

  const update = () => {
    const q = $('#hospital-search').value.trim().toLowerCase();
    const s = $('#sync-filter').value;
    const filtered = d.hospitals.filter(h => (!q || `${h.name} ${h.district}`.toLowerCase().includes(q)) && (s === 'all' || h.syncStatus === s));
    renderHospitalTable(filtered);
  };

  $('#hospital-search').addEventListener('input', debounce(update, 200));
  $('#sync-filter').addEventListener('change', update);
  update();

  // Rebalancing Action listeners
  $$('.rebalance-exec').forEach(btn => {
    btn.addEventListener('click', async e => {
      e.stopPropagation();
      const rebId = btn.dataset.id;
      const ok = await confirmModal({
        title: 'ยืนยันการอนุมัติโยกสต็อก',
        message: 'ระบบจะสร้างบันทึกการส่งมอบระหว่างโรงพยาบาลและอัปเดต Audit trail ต้องการดำเนินการหรือไม่?',
        confirmText: 'อนุมัติการโยกย้าย',
        iconName: 'check'
      });
      if (ok) {
        try {
          await api(`/api/rebalancing/${rebId}/execute`, { method: 'POST', body: '{}' });
          toast('อนุมัติการโยกสต็อกและบันทึก Audit แล้ว');
          await provincePage();
        } catch (ex) {
          toast(ex.message, 'error');
        }
      }
    });
  });

  $$('.rebalance-reject').forEach(btn => {
    btn.addEventListener('click', async e => {
      e.stopPropagation();
      const rebId = btn.dataset.id;
      const ok = await confirmModal({
        title: 'ปฏิเสธข้อเสนอโยกสต็อก',
        message: 'ระบบจะบันทึกการปฏิเสธข้อเสนอนี้ ต้องการดำเนินการหรือไม่?',
        confirmText: 'ปฏิเสธข้อเสนอ',
        danger: true,
        iconName: 'ban'
      });
      if (ok) {
        try {
          await api(`/api/rebalancing/${rebId}/reject`, { method: 'POST', body: '{}' });
          toast('ปฏิเสธข้อเสนอโยกสต็อกแล้ว');
          await provincePage();
        } catch (ex) {
          toast(ex.message, 'error');
        }
      }
    });
  });

  // Drill-down on Hospital click
  $$('[data-hsp-id]').forEach(el => {
    el.addEventListener('click', () => openHospitalDetail(el.dataset.hspId));
  });

  $('#refresh-network').addEventListener('click', async e => {
    e.currentTarget.disabled = true;
    e.currentTarget.innerHTML = `${icon('refresh')} กำลังซิงก์…`;
    await new Promise(r => setTimeout(r, 400));
    toast('อัปเดตสถานะเครือข่ายเรียบร้อย');
    await provincePage();
  });

  startPolling(provincePage, 90000);
}

function smartKpi(iconName, tone, label, value, note) {
  return `<article class="smart-kpi"><div class="smart-kpi-icon ${tone}">${icon(iconName)}</div><div><small>${label}</small><strong>${typeof value === 'number' ? fmt.format(value) : esc(value)}</strong><p>${note}</p></div><span class="kpi-spark ${tone}"></span></article>`;
}

function transferCard(row) {
  const isPending = !row.status || row.status === 'pending';
  return `
    <article class="transfer-card ${row.urgency}">
      <div class="transfer-item">
        <span>${icon('package')}</span>
        <div><strong>${esc(row.item?.name || row.itemId)}</strong><small>${esc(row.reason)}</small></div>
        <b>${fmt.format(row.qty)} ${esc(row.unit)}</b>
      </div>
      <div class="transfer-route">
        <span>${esc(row.from?.district || '-')}</span>${icon('arrowRight')}<span>${esc(row.to?.district || '-')}</span>
      </div>
      ${isPending ? `
        <div style="display:flex;gap:8px;margin-top:10px;justify-content:flex-end;">
          <button class="button secondary small rebalance-reject" data-id="${row.id}" type="button">ปฏิเสธ</button>
          <button class="button primary small rebalance-exec" data-id="${row.id}" type="button">${icon('check')} อนุมัติโยกย้าย</button>
        </div>` : `
        <div style="margin-top:8px;font-size:11px;color:var(--muted);text-align:right;">
          <span class="status ${row.status === 'executed' ? 'normal' : 'expired'}">${statusLabel(row.status)}</span>
        </div>`}
    </article>`;
}

function renderHospitalTable(rows) {
  $('#hospital-table').innerHTML = `
    <div class="table-wrap">
      <table class="hospital-table">
        <thead>
          <tr>
            <th>โรงพยาบาล</th><th>ระบบเชื่อมต่อ</th><th>ซิงก์ล่าสุด</th><th>ความพร้อม</th>
            <th class="number">รายการคลัง</th><th class="number">ต่ำกว่าจุดเตือน</th>
            <th class="number">ยังไม่แมป</th><th>Stock health</th>
          </tr>
        </thead>
        <tbody>
          ${rows.length ? rows.map(h => `
            <tr class="row-clickable" data-hsp-id="${h.id}">
              <td>
                <div class="hospital-cell">
                  <span class="hospital-logo ${riskClass(h.stockScore)}">${esc(h.district.slice(0, 1))}</span>
                  <div><strong>${esc(h.name)}</strong><small>${esc(h.level)} · อ.${esc(h.district)}</small></div>
                </div>
              </td>
              <td><span class="system-badge">${esc(h.system)}</span></td>
              <td><span class="sync-state ${h.syncStatus}"><b></b>${syncLabel(h.syncStatus)}</span><small>${fmt.format(h.lastSyncMinutes)} นาทีที่แล้ว</small></td>
              <td><div class="mini-progress"><span class="${pctClass(h.readiness)}"></span></div><small>${h.readiness}% ready</small></td>
              <td class="number">${fmt.format(h.itemLines)}</td>
              <td class="number"><strong class="risk-number">${fmt.format(h.lowStock)}</strong></td>
              <td class="number">${fmt.format(h.unmapped)}</td>
              <td><span class="health-score ${riskClass(h.stockScore)}">${h.stockScore}</span></td>
            </tr>`).join('') : `<tr><td colspan="8" class="table-empty">ไม่พบโรงพยาบาลที่ตรงกับตัวกรอง</td></tr>`}
        </tbody>
      </table>
    </div>`;

  $$('.hospital-table tr.row-clickable').forEach(tr => {
    tr.addEventListener('click', () => openHospitalDetail(tr.dataset.hspId));
  });
}

async function openHospitalDetail(hspId) {
  try {
    const d = await api(`/api/province/hospitals/${hspId}`);
    const h = d.hospital;
    const html = `
      <div class="modal-backdrop" role="presentation">
        <div class="modal modal-large" role="dialog" aria-modal="true" aria-labelledby="modal-hsp-title">
          <div class="modal-head">
            <div>
              <h2 id="modal-hsp-title">${esc(h.name)}</h2>
              <p>${esc(h.level)} · อำเภอ${esc(h.district)} · จังหวัดศรีสะเกษ</p>
            </div>
            <button class="icon-button" type="button" data-close aria-label="ปิด">${icon('close')}</button>
          </div>
          <div class="modal-body">
            <div class="grid summary-grid">
              ${kpi('hospital', 'blue', 'ระบบหลัก', esc(h.system), `ซิงก์เมื่อ ${h.lastSyncMinutes} นาทีที่แล้ว`)}
              ${kpi('target', 'green', 'ความพร้อม', `${h.readiness}%`, 'อัตราความพร้อมข้อมูล')}
              ${kpi('alert', 'orange', 'จุดเตือนขาด', fmt.format(h.lowStock), `จาก ${fmt.format(h.itemLines)} รายการ`)}
              ${kpi('sparkles', 'purple', 'ยังไม่แมป', fmt.format(h.unmapped), 'รอจับคู่รหัสกลาง')}
            </div>
            ${d.mappings.length ? `
              <div style="margin-top:20px;">
                <h3 style="font-size:15px;margin-bottom:10px;">รายการ Mapping ที่เกี่ยวข้อง (${d.mappings.length})</h3>
                <div class="table-wrap">
                  <table>
                    <thead><tr><th>รหัสต้นทาง</th><th>ชื่อยา/เวชภัณฑ์</th><th>หน่วย</th><th>สถานะ</th></tr></thead>
                    <tbody>${d.mappings.map(m => `<tr><td><code>${esc(m.sourceCode)}</code></td><td><strong>${esc(m.sourceName)}</strong></td><td>${esc(m.unit)}</td><td><span class="status ${m.status}">${statusLabel(m.status)}</span></td></tr>`).join('')}</tbody>
                  </table>
                </div>
              </div>` : ''}
          </div>
          <div class="modal-foot">
            <button class="button secondary" type="button" data-close>ปิด</button>
            <a class="button primary" href="#mapping">${icon('sparkles')} จัดการ AI Mapping</a>
          </div>
        </div>
      </div>`;
    openModal(html);
  } catch (ex) {
    toast(ex.message, 'error');
  }
}

/* ══════════════════════════════════════════════════════════════
   3. AI MAPPING STUDIO VIEW
   ══════════════════════════════════════════════════════════════ */
async function mappingPage(status = 'open') {
  const d = await api(`/api/ai/mappings?status=${status}`);
  const open = d.counts.pending + d.counts.review;

  $('#main-content').innerHTML = `
    <section class="ai-hero reveal">
      <div class="ai-copy">
        <div class="hero-badge">${icon('sparkles')} SMART ITEM INTELLIGENCE</div>
        <h1>AI Mapping Studio</h1>
        <p>ทำความเข้าใจชื่อยา รหัส และหน่วยที่ต่างกันจากแต่ละโรงพยาบาล แล้วเสนอรหัสกลางพร้อมเหตุผลที่ตรวจสอบได้</p>
        <div class="ai-guard">${icon('shield')} AI เสนอ · เภสัชกรตัดสินใจ · ระบบบันทึก Audit ทุกครั้ง</div>
      </div>
      <div class="brain-stage" aria-hidden="true">
        <div class="brain-halo halo-one"></div><div class="brain-halo halo-two"></div>
        <div class="brain-core">${icon('brain')}</div>
        <i class="data-particle p1"></i><i class="data-particle p2"></i><i class="data-particle p3"></i>
      </div>
      <div class="ai-stats">
        <span><b>${open}</b>รอตรวจ</span>
        <span><b>${d.counts.approved}</b>อนุมัติแล้ว</span>
        <span><b>100%</b>Human control</span>
      </div>
    </section>
    <div class="grid mapping-layout reveal delay-1">
      <section class="mapping-queue">
        <div class="mapping-toolbar">
          <div><h2>คิวรอตรวจสอบ</h2><p>${fmt.format(d.mappings.length)} รายการ · เรียงตามความมั่นใจ</p></div>
          <select id="mapping-filter" class="filter-select">
            <option value="open">งานที่เปิดอยู่</option>
            <option value="all">ทั้งหมด</option>
            <option value="pending">พร้อมตรวจ</option>
            <option value="review">ต้องทบทวน</option>
            <option value="approved">อนุมัติแล้ว</option>
            <option value="rejected">ปฏิเสธแล้ว</option>
          </select>
        </div>
        <div id="mapping-list" class="mapping-list">
          ${d.mappings.length ? d.mappings.map(mappingCard).join('') : `
            <div class="card empty-ai">${icon('sparkles')}<h3>ไม่มีงานในคิวนี้</h3><p>ลองเลือกสถานะอื่น หรือทดสอบรายการใหม่ด้านขวา</p></div>`}
        </div>
      </section>
      <aside class="mapping-aside">
        <form id="ai-suggest-form" class="card ai-lab">
          <div class="lab-head"><span>${icon('brain')}</span><div><h2>ทดลอง AI Mapping</h2><p>วิเคราะห์แบบไม่บันทึกลง master</p></div></div>
          <label class="field compact"><span>โรงพยาบาล <b class="required">*</b></span>
            <select class="control" name="hospitalId" required>
              <option value="">— เลือกโรงพยาบาล —</option>
              ${d.hospitals.map(h => `<option value="${h.id}">${esc(h.name)}</option>`).join('')}
            </select>
          </label>
          <label class="field compact"><span>หมวดหมู่ (ถ้ามี)</span>
            <select class="control" name="category">
              <option value="">— ทุกหมวดหมู่ —</option>
              ${state.categories.map(c => `<option value="${esc(c)}">${esc(c)}</option>`).join('')}
            </select>
          </label>
          <label class="field compact"><span>รหัสจากระบบต้นทาง</span><input class="control" name="sourceCode" placeholder="เช่น PCM500-GPO"></label>
          <label class="field compact"><span>ชื่อจากระบบต้นทาง <b class="required">*</b></span><input class="control" name="sourceName" required minlength="3" placeholder="เช่น PARA 500 GPO 50x10"></label>
          <label class="field compact"><span>หน่วย <b class="required">*</b></span><input class="control" name="unit" required placeholder="กล่อง / ขวด / แผง"></label>
          <button class="button ai-button wide" type="submit">${icon('sparkles')} วิเคราะห์ด้วย AI</button>
          <p class="engine-note"><b></b> Engine: ${esc(d.engine.mode)}<br>ผลลัพธ์ต้องได้รับการยืนยันก่อนใช้งาน</p>
        </form>
        <div id="ai-suggest-results" class="suggest-results"></div>
      </aside>
    </div>`;

  $('#mapping-filter').value = status;
  $('#mapping-filter').addEventListener('change', e => mappingPage(e.target.value));
  $$('.mapping-decision').forEach(btn => btn.addEventListener('click', () => decideMapping(btn.dataset.id, btn.dataset.decision)));
  $('#ai-suggest-form').addEventListener('submit', submitMappingSuggest);
}

function mappingCard(m) {
  const isOpen = ['pending', 'review'].includes(m.status);
  return `
    <article class="mapping-card">
      <div class="mapping-top">
        <div class="source-system">
          <span>${icon('database')}</span>
          <div>
            <small>${esc(m.hospital?.name || m.hospitalId)} · ${esc(m.sourceSystem)}</small>
            <strong>${esc(m.sourceName)}</strong>
            <code>${esc(m.sourceCode)} · ${esc(m.unit)}</code>
          </div>
        </div>
        <div class="confidence ${m.confidence >= .95 ? 'high' : m.confidence >= .9 ? 'good' : 'review'}">
          <b>${Math.round(m.confidence * 100)}%</b><span>confidence</span>
        </div>
      </div>
      <div class="mapping-flow">
        <div class="flow-label">AI SUGGESTION</div>
        <div class="mapped-item">
          <span class="ai-mark">${icon('sparkles')}</span>
          <div>
            <small>รายการกลางที่แนะนำ</small>
            <strong>${esc(m.suggestedItem?.name || '-')}</strong>
            <code>${esc(m.suggestedItem?.code || '')} · ${esc(m.suggestedItem?.unit || '')}</code>
          </div>
          <span class="status ${m.status}">${statusLabel(m.status)}</span>
        </div>
        <div class="confidence-bar"><span class="${pctClass(m.confidence * 100)}"></span></div>
        <ul class="reason-list">${m.reasons.map(r => `<li>${icon('check')}${esc(r)}</li>`).join('')}</ul>
      </div>
      ${isOpen ? `
        <div class="mapping-actions">
          <label class="field compact mapping-choice"><span>ยืนยันรายการกลาง</span>
            <select class="control mapping-select" data-id="${m.id}">
              ${state.items.map(i => `<option value="${i.id}" ${i.id === m.suggestedItemId ? 'selected' : ''}>${esc(i.code)} · ${esc(i.name)}</option>`).join('')}
            </select>
          </label>
          <button class="button secondary mapping-decision" data-id="${m.id}" data-decision="reject">ส่งกลับ</button>
          <button class="button ai-button mapping-decision" data-id="${m.id}" data-decision="approve">${icon('check')} อนุมัติ Mapping</button>
        </div>` : `
        <div class="mapping-reviewed">${icon('shield')} ตรวจสอบแล้ว ${m.reviewedAt ? new Date(m.reviewedAt).toLocaleString('th-TH', { dateStyle: 'medium', timeStyle: 'short' }) : ''}</div>`}
    </article>`;
}

async function decideMapping(id, decision) {
  const button = $(`.mapping-decision[data-id="${id}"][data-decision="${decision}"]`);
  if (button) button.disabled = true;
  try {
    const itemId = $(`.mapping-select[data-id="${id}"]`)?.value;
    await api(`/api/ai/mappings/${id}/decision`, {
      method: 'POST',
      body: JSON.stringify({ decision, itemId })
    });
    toast(decision === 'approve' ? 'อนุมัติ Mapping และบันทึก Audit แล้ว' : 'ส่งรายการกลับเพื่อตรวจสอบแล้ว');
    await mappingPage($('#mapping-filter')?.value || 'open');
  } catch (ex) {
    toast(ex.message, 'error');
    if (button) button.disabled = false;
  }
}

async function submitMappingSuggest(e) {
  e.preventDefault();
  const btn = e.submitter;
  btn.disabled = true;
  btn.innerHTML = `${icon('sparkles')} กำลังวิเคราะห์…`;
  const input = Object.fromEntries(new FormData(e.currentTarget));
  try {
    const d = await api('/api/ai/mappings/suggest', {
      method: 'POST',
      body: JSON.stringify(input)
    });
    const engineLabel = d.engine?.mode?.endsWith('-rerank')
      ? `AI ${esc(d.engine.model || '')} · ต้องให้เจ้าหน้าที่ตรวจยืนยัน`
      : 'โหมดสำรองภายในเครื่อง · ต้องให้เจ้าหน้าที่ตรวจยืนยัน';
    $('#ai-suggest-results').innerHTML = `
      <div class="suggest-head">
        <span>${icon('sparkles')}</span>
        <div><strong>พบ ${d.suggestions.length} รายการใกล้เคียง</strong><small>${esc(d.source.sourceName)} · ${engineLabel}</small></div>
      </div>
      ${d.suggestions.map((s, i) => `
        <article class="suggest-card ${i === 0 ? 'best' : ''}">
          <div>
            <small>${i === 0 ? 'BEST MATCH' : `ALTERNATIVE ${i}`}</small>
            <strong>${esc(s.item.name)}</strong>
            <code>${esc(s.item.code)} · ${esc(s.item.unit)}</code>
          </div>
          <b>${Math.round(s.confidence * 100)}%</b>
          <div class="confidence-bar"><span class="${pctClass(s.confidence * 100)}"></span></div>
          <p>${esc(s.reasons.join(' · '))}</p>
        </article>`).join('')}`;
  } catch (ex) {
    toast(ex.message, 'error');
  } finally {
    btn.disabled = false;
    btn.innerHTML = `${icon('sparkles')} วิเคราะห์ด้วย AI`;
  }
}

/* ══════════════════════════════════════════════════════════════
   4. TRANSACTIONS (INBOUND & OUTBOUND) VIEW
   ══════════════════════════════════════════════════════════════ */
async function transactionPage(type) {
  state.draft = [];
  state.selectedBill = null;
  const inbound = type === 'inbound';
  const d = await api(`/api/transactions?type=${type}&limit=30`);
  state.facilities = d.facilities;

  $('#main-content').innerHTML = `
    ${pageHead(inbound ? 'inbound' : 'outbound', inbound ? '' : 'orange', inbound ? 'รับเข้าคลัง' : 'เบิกจ่ายออกจากคลัง', inbound ? 'บันทึกแหล่งที่มา ล็อต และวันหมดอายุให้ตรวจสอบย้อนหลังได้' : 'ตัดสต็อกแบบตรวจจำนวนคงเหลือก่อนยืนยัน', `<button class="button secondary" id="clear-form">ล้างแบบฟอร์ม</button>`)}
    <div class="notice ${inbound ? '' : 'warning'}">${icon(inbound ? 'info' : 'alert')}<div><strong>${inbound ? 'หลักการรับเข้า' : 'ระบบป้องกันสต็อกติดลบ'}</strong><br>${inbound ? 'ข้อมูลล็อตและวันหมดอายุจะอัปเดตบนรายการคงคลัง' : 'หากจำนวนไม่พอ ระบบจะยกเลิกทั้งเอกสารและไม่ตัดยอดบางส่วน'}</div></div>
    <form id="transaction-form" class="card form-card" novalidate>
      <div class="form-section">
        <div class="section-title ${inbound ? '' : 'orange'}"><span>${icon('file')}</span><h2>ข้อมูลเอกสาร</h2></div>
        <div class="form-grid">
          <label class="field compact">
            <div class="field-header">
              <span>${inbound ? 'ผู้ส่งมอบ / แหล่งที่มา' : 'หน่วยงานผู้เบิก'} <b class="required">*</b></span>
              <button type="button" class="manage-btn-pill" id="manage-facilities-btn">${icon('gear')} จัดการ</button>
            </div>
            <input class="control" name="facility" id="tx-facility" list="facilities-list" required placeholder="ระบุหรือเลือกหน่วยงาน">
            <datalist id="facilities-list">${d.facilities.map(x => `<option value="${esc(x)}">`).join('')}</datalist>
          </label>
          <label class="field compact">
            <span>วันที่ทำรายการ <b class="required">*</b></span>
            <input class="control" type="date" name="date" value="${today()}" required>
          </label>
          <label class="field compact">
            <span>เลขที่อ้างอิง</span>
            <input class="control" name="refNo" placeholder="สร้างอัตโนมัติหากเว้นว่าง">
          </label>
          <label class="field compact">
            <span>หมายเหตุ</span>
            <input class="control" name="note" placeholder="รายละเอียดเพิ่มเติม">
          </label>
          <div class="field compact file-upload-field">
            <span>แนบบิล / ใบส่งของ <span style="font-weight:normal;color:var(--muted);font-size:11px;">(ไม่บังคับ)</span></span>
            <div class="file-upload-input-wrap">
              <input type="file" id="bill-file-input" accept="image/*,application/pdf" style="display:none!important;position:absolute!important;width:0!important;height:0!important;opacity:0!important;pointer-events:none!important;" tabindex="-1">
              <button type="button" class="button secondary small file-pick-btn" id="btn-pick-bill">
                ${icon('paperclip')} แนบไฟล์บิล...
              </button>
              <div id="bill-file-badge" class="bill-file-badge" style="display:none;">
                <span class="file-icon">${icon('file')}</span>
                <span class="file-name" id="bill-file-name"></span>
                <button type="button" class="icon-button danger btn-remove-file" id="btn-remove-bill" title="ลบไฟล์แนบ" aria-label="ลบไฟล์แนบ">${icon('close')}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="form-section">
        <div class="section-title ${inbound ? '' : 'orange'}"><span>${icon('package')}</span><h2>เพิ่มรายการ${inbound ? 'รับเข้า' : 'เบิกจ่าย'}</h2></div>
        <div class="line-entry">
          <label class="field compact item-select">
            <div class="field-header">
              <span>รายการ <b class="required">*</b></span>
              <button type="button" class="manage-btn-pill" id="manage-items-btn">${icon('gear')} จัดการ</button>
            </div>
            <select class="control" id="line-item">
              <option value="">— เลือกรายการ —</option>
              ${state.items.map(i => `<option value="${i.id}">${esc(i.name)} · คงเหลือ ${fmt.format(i.qty)} ${esc(i.unit)}</option>`).join('')}
            </select>
          </label>
          <label class="field compact">
            <span>จำนวน <b class="required">*</b></span>
            <input class="control" id="line-qty" type="number" min="0.01" step="0.01" placeholder="0">
          </label>
          <label class="field compact">
            <span>ล็อต</span>
            <input class="control" id="line-lot" placeholder="Lot no.">
          </label>
          <label class="field compact">
            <span>วันหมดอายุ</span>
            <input class="control" id="line-expiry" type="date">
          </label>
          <button class="button ${inbound ? 'primary' : 'orange'} add-line" type="button" id="add-line">${icon('plus')} เพิ่ม</button>
        </div>
        <div id="draft-lines" class="draft-table"></div>
      </div>
      <div class="form-footer">
        <button class="button secondary" type="button" id="cancel-draft">ยกเลิก</button>
        <button class="button ${inbound ? 'primary' : 'orange'}" type="submit">${icon('check')} ยืนยัน${inbound ? 'รับเข้า' : 'เบิกจ่าย'}</button>
      </div>
    </form>
    <section class="card">
      <div class="card-head">
        <div><h2>สรุปรายการ${inbound ? 'รับเข้า' : 'เบิกจ่าย'}ล่าสุด</h2><p>คลิกการ์ดเพื่อดูรายละเอียดหรือยกเลิกเอกสาร</p></div>
      </div>
      <div id="transaction-list-container">
        <!-- populated dynamically -->
        <div style="padding: 20px; text-align: center; color: var(--muted);">กำลังโหลดรายการ...</div>
      </div>
    </section>`;

  renderDraft(type);
  $('#add-line').addEventListener('click', () => addDraft(type));
  $('#line-item').addEventListener('change', syncLineDefaults);
  $('#transaction-form').addEventListener('submit', e => submitTransaction(e, type));
  $('#clear-form').addEventListener('click', () => clearTransactionForm(type));
  $('#cancel-draft').addEventListener('click', () => { state.draft = []; renderDraft(type); });

  // Bill File Attachment Handlers
  const billFileInput = $('#bill-file-input');
  const btnPickBill = $('#btn-pick-bill');
  const billBadge = $('#bill-file-badge');
  const billFileName = $('#bill-file-name');
  const btnRemoveBill = $('#btn-remove-bill');

  btnPickBill?.addEventListener('click', () => billFileInput?.click());
  billFileInput?.addEventListener('change', e => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      toast('ขนาดไฟล์ต้องไม่เกิน 10MB', 'error');
      billFileInput.value = '';
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      state.selectedBill = {
        name: file.name,
        size: file.size,
        type: file.type || 'application/octet-stream',
        data: reader.result
      };
      if (billFileName) billFileName.textContent = `${file.name} (${Math.round(file.size / 1024)} KB)`;
      if (billBadge) billBadge.style.display = 'inline-flex';
      if (btnPickBill) btnPickBill.style.display = 'none';
      toast(`แนบไฟล์ "${file.name}" เรียบร้อย`);
    };
    reader.readAsDataURL(file);
  });

  btnRemoveBill?.addEventListener('click', () => {
    state.selectedBill = null;
    if (billFileInput) billFileInput.value = '';
    if (billBadge) billBadge.style.display = 'none';
    if (btnPickBill) btnPickBill.style.display = 'inline-flex';
    toast('ลบไฟล์แนบเรียบร้อย');
  });

  $('#manage-facilities-btn').addEventListener('click', () => openFacilitiesModal(type));
  $('#manage-items-btn').addEventListener('click', () => {
    openItemModal(newItem => {
      const lineItem = $('#line-item');
      if (lineItem) {
        lineItem.innerHTML = `<option value="">— เลือกรายการ —</option>${state.items.map(i => `<option value="${i.id}">${esc(i.name)} · คงเหลือ ${fmt.format(i.qty)} ${esc(i.unit)}</option>`).join('')}`;
        lineItem.value = newItem.id;
        syncLineDefaults();
      }
    });
  });

  loadTxPage(type, 1);
}

async function loadTxPage(type, page) {
  const container = $('#transaction-list-container');
  if (!container) return;
  try {
    const d = await api(`/api/transactions?type=${type}&limit=9&page=${page}`);
    container.innerHTML = `
      <div class="transaction-list">
        ${d.transactions && d.transactions.length ? d.transactions.map(t => transactionCard(t, type)).join('') : '<div class="empty-inline">ยังไม่มีรายการ</div>'}
      </div>
      ${d.meta ? renderPagination(d.meta, p => loadTxPage(type, p)) : ''}
    `;
    $$('.transaction-card', container).forEach(card => {
      card.addEventListener('click', () => openTransactionDetail(card.dataset.id, type));
    });
  } catch (err) {
    console.error('loadTxPage error:', err);
    container.innerHTML = `<div class="empty-inline">เกิดข้อผิดพลาดในการโหลดข้อมูล (${esc(err.message || 'ไม่ทราบสาเหตุ')})</div>`;
  }
}

async function openFacilitiesModal(type, onChanged) {
  try {
    const d = await api('/api/facilities');
    state.facilities = d.facilities;
  } catch (err) {
    // fallback to current
  }

  function renderList() {
    return state.facilities.length
      ? state.facilities.map(f => {
          const fname = typeof f === 'string' ? f : (f.name || '');
          const faddr = typeof f === 'object' ? (f.address || '') : '';
          const fphone = typeof f === 'object' ? (f.phone || '') : '';
          return `
            <div class="fac-item-card">
              <div class="fac-item-info">
                <strong>${esc(fname)}</strong>
                ${(faddr || fphone) ? `<div class="fac-meta-line">${faddr ? `📍 ${esc(faddr)} ` : ''}${fphone ? `📞 โทร. ${esc(fphone)}` : ''}</div>` : '<div class="fac-meta-line" style="color:var(--muted); font-style:italic;">ยังไม่ได้ระบุที่อยู่/เบอร์โทร</div>'}
              </div>
              <button type="button" class="icon-button danger btn-del-facility" data-name="${esc(fname)}" aria-label="ลบ">${icon('trash')}</button>
            </div>`;
        }).join('')
      : '<div class="empty-inline">ยังไม่มีรายชื่อหน่วยงาน</div>';
  }

  const html = `
    <div class="modal-backdrop" role="presentation">
      <div class="modal" style="width:min(680px, 96vw);" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <div class="modal-head">
          <h2 id="modal-title">${icon('gear')} จัดการรายชื่อผู้ส่งมอบ / หน่วยงาน</h2>
          <button class="icon-button" type="button" data-close aria-label="ปิด">${icon('close')}</button>
        </div>
        <div class="modal-body">
          <p style="font-size:13px;color:var(--muted);margin-bottom:12px;">กำหนดรายชื่อหน่วยงาน พร้อมที่อยู่และหมายเลขโทรศัพท์ เพื่อดึงมาใช้ในใบรับของโดยอัตโนมัติ</p>
          <form id="add-facility-form" class="fac-form-grid">
            <div>
              <label style="font-size:12px;font-weight:600;display:block;margin-bottom:4px;">ชื่อผู้ส่งมอบ / หน่วยงาน <b class="required">*</b></label>
              <input class="control" id="new-facility-name" required placeholder="พิมพ์ชื่อผู้ส่งมอบ / หน่วยงานใหม่..." minlength="2" maxlength="120">
            </div>
            <div class="fac-form-row">
              <div>
                <label style="font-size:12px;font-weight:600;display:block;margin-bottom:4px;">ที่อยู่ที่สามารถติดต่อได้</label>
                <input class="control" id="new-facility-address" placeholder="เช่น 123 ถ.กสิกรรม ต.เมืองใต้ อ.เมือง จ.ศรีสะเกษ">
              </div>
              <div>
                <label style="font-size:12px;font-weight:600;display:block;margin-bottom:4px;">หมายเลขโทรศัพท์</label>
                <input class="control" id="new-facility-phone" placeholder="เช่น 045-123456, 081-2345678">
              </div>
            </div>
            <div style="text-align:right;">
              <button class="button primary" type="submit">${icon('plus')} เพิ่ม / บันทึกข้อมูลหน่วยงาน</button>
            </div>
          </form>
          <div id="facility-manage-error" class="form-error modal-error" style="margin-top:6px;"></div>
          <h3 style="font-size:14px;margin-top:16px;margin-bottom:8px;">รายชื่อปัจจุบัน (<span id="fac-count">${state.facilities.length}</span>)</h3>
          <div id="facilities-manage-list" class="master-manage-list" style="max-height:260px;overflow-y:auto;">
            ${renderList()}
          </div>
        </div>
        <div class="modal-foot">
          <button class="button secondary" type="button" data-close>ปิด</button>
        </div>
      </div>
    </div>`;

  openModal(html, modal => {
    const bindEvents = () => {
      $$('.btn-del-facility', modal).forEach(btn => {
        btn.addEventListener('click', async () => {
          const fname = btn.dataset.name;
          const ok = await confirmModal({
            title: 'ยืนยันการลบรายชื่อ',
            message: `ต้องการลบ "${fname}" ออกจากรายชื่อหน่วยงานหรือไม่?`,
            confirmText: 'ลบรายชื่อ',
            danger: true,
            iconName: 'trash'
          });
          if (ok) {
            try {
              const res = await api(`/api/facilities/${encodeURIComponent(fname)}`, { method: 'DELETE' });
              state.facilities = res.facilities;
              $('#facilities-manage-list', modal).innerHTML = renderList();
              $('#fac-count', modal).textContent = state.facilities.length;
              updateTransactionFacilitiesDatalist();
              if (onChanged) onChanged(state.facilities);
              toast(`ลบ "${fname}" เรียบร้อย`);
              bindEvents();
            } catch (ex) {
              toast(ex.message, 'error');
            }
          }
        });
      });
    };

    $('#add-facility-form', modal).addEventListener('submit', async e => {
      e.preventDefault();
      const nameInput = $('#new-facility-name', modal);
      const addrInput = $('#new-facility-address', modal);
      const phoneInput = $('#new-facility-phone', modal);
      const name = nameInput.value.trim();
      const address = addrInput.value.trim();
      const phone = phoneInput.value.trim();
      if (!name) return;
      try {
        const res = await api('/api/facilities', {
          method: 'POST',
          body: JSON.stringify({ name, address, phone })
        });
        state.facilities = res.facilities;
        nameInput.value = '';
        addrInput.value = '';
        phoneInput.value = '';
        $('#facilities-manage-list', modal).innerHTML = renderList();
        $('#fac-count', modal).textContent = state.facilities.length;
        updateTransactionFacilitiesDatalist(name);
        if (onChanged) onChanged(state.facilities);
        toast(`บันทึกข้อมูล "${name}" เรียบร้อย`);
        bindEvents();
      } catch (ex) {
        $('#facility-manage-error', modal).textContent = ex.message;
      }
    });

    bindEvents();
  });
}

function updateTransactionFacilitiesDatalist(selectedName = '') {
  const datalist = $('#facilities-list');
  if (datalist) {
    datalist.innerHTML = state.facilities.map(x => {
      const name = typeof x === 'string' ? x : (x.name || '');
      return `<option value="${esc(name)}">`;
    }).join('');
  }
  const input = $('#tx-facility');
  if (input && selectedName) {
    input.value = selectedName;
  }
}

function syncLineDefaults() {
  const i = state.items.find(x => x.id === $('#line-item').value);
  if (!i) return;
  $('#line-lot').value = i.lot || '';
  $('#line-expiry').value = i.expiry || '';
}

function addDraft(type) {
  const item = state.items.find(i => i.id === $('#line-item').value);
  const qty = Number($('#line-qty').value);
  if (!item || !qty || qty <= 0) return toast('เลือกรายการและระบุจำนวนให้ถูกต้อง', 'error');
  if (type === 'outbound' && qty > item.qty) return toast(`คงเหลือไม่พอ: ${fmt.format(item.qty)} ${item.unit}`, 'error');
  const exists = state.draft.find(x => x.itemId === item.id);
  if (exists) exists.qty += qty;
  else state.draft.push({ itemId: item.id, qty, lot: $('#line-lot').value.trim(), expiry: $('#line-expiry').value || null });
  renderDraft(type);
  $('#line-item').value = '';
  $('#line-qty').value = '';
  $('#line-lot').value = '';
  $('#line-expiry').value = '';
  $('#line-item').focus();
}

function renderDraft(type) {
  const root = $('#draft-lines');
  if (!root) return;
  if (!state.draft.length) {
    root.innerHTML = `<div class="empty-inline">${icon('package')}ยังไม่มีรายการ กรอกข้อมูลด้านบนแล้วกด “เพิ่ม”</div>`;
    return;
  }
  root.innerHTML = `
    <div class="table-wrap">
      <table>
        <thead><tr><th>#</th><th>รายการ</th><th>ล็อต</th><th>วันหมดอายุ</th><th class="number">จำนวน</th><th></th></tr></thead>
        <tbody>
          ${state.draft.map((r, n) => {
            const i = state.items.find(x => x.id === r.itemId);
            return `
              <tr>
                <td>${n + 1}</td>
                <td><strong>${esc(i.name)}</strong><small>${esc(i.code)} · คงเหลือ ${fmt.format(i.qty)} ${esc(i.unit)}</small></td>
                <td>${esc(r.lot || '-')}</td>
                <td>${fdate(r.expiry)}</td>
                <td class="number"><span class="stock-number">${fmt.format(r.qty)}</span> ${esc(i.unit)}</td>
                <td><button class="icon-button remove-line" type="button" data-index="${n}" aria-label="ลบรายการ">${icon('trash')}</button></td>
              </tr>`;
          }).join('')}
        </tbody>
      </table>
    </div>`;
  $$('.remove-line', root).forEach(b => b.addEventListener('click', () => { state.draft.splice(Number(b.dataset.index), 1); renderDraft(type); }));
}

async function submitTransaction(e, type) {
  e.preventDefault();
  if (!state.draft.length) return toast('เพิ่มอย่างน้อย 1 รายการก่อนยืนยัน', 'error');
  const fd = new FormData(e.currentTarget);
  const btn = e.submitter;
  btn.disabled = true;
  try {
    await api('/api/transactions', {
      method: 'POST',
      body: JSON.stringify({
        type,
        facility: fd.get('facility'),
        date: fd.get('date'),
        refNo: fd.get('refNo'),
        note: fd.get('note'),
        attachment: state.selectedBill || undefined,
        items: state.draft
      })
    });
    toast(type === 'inbound' ? 'บันทึกรับเข้าเรียบร้อย' : 'บันทึกเบิกจ่ายเรียบร้อย');
    state.items = [];
    await loadItems();
    await transactionPage(type);
  } catch (ex) {
    toast(ex.message, 'error');
  } finally {
    btn.disabled = false;
  }
}

function clearTransactionForm(type) {
  state.draft = [];
  state.selectedBill = null;
  $('#transaction-form').reset();
  $('#transaction-form [name=date]').value = today();
  const billFileInput = $('#bill-file-input');
  if (billFileInput) billFileInput.value = '';
  const billBadge = $('#bill-file-badge');
  if (billBadge) billBadge.style.display = 'none';
  const btnPickBill = $('#btn-pick-bill');
  if (btnPickBill) btnPickBill.style.display = 'inline-flex';
  renderDraft(type);
}

function transactionCard(t, type) {
  const isVoided = t.status === 'voided';
  return `
    <article class="transaction-card" data-id="${t.id}" style="cursor:pointer;opacity:${isVoided ? '0.6' : '1'}">
      <div class="top">
        <strong>${esc(t.refNo)}</strong>
        <span class="status ${isVoided ? 'expired' : 'normal'}">${statusLabel(t.status)}</span>
      </div>
      <p>${esc(t.facility)}</p>
      <div class="bottom" style="margin-top: 12px; display: flex; justify-content: space-between; align-items: flex-end;">
        <div>
          <span style="display:block; margin-bottom:4px; font-size:12px; font-weight:500; color: ${t.memoDone ? 'var(--primary)' : 'var(--orange)'};">
            ${t.memoDone ? '● ทำบันทึกข้อความแล้ว' : '● รอทำบันทึกข้อความ'}
          </span>
          <span style="font-size:12px; color:var(--muted);">${fmt.format(t.lineCount)} รายการ · ${fmt.format(t.totalQty)} หน่วยรวม</span>
        </div>
        <time style="font-size:12px; color:var(--muted);">${fdate(t.date)}</time>
      </div>
    </article>`;
}

function thaiFullDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  const thMonths = ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'];
  const day = d.getDate();
  const month = thMonths[d.getMonth()];
  const year = d.getFullYear() + 543;
  return `${day} ${month} พ.ศ. ${year}`;
}

function officialDocumentFontCss() {
  const fontBase = `${window.location.origin}/fonts`;
  return `
    @font-face { font-family: 'TH Sarabun New'; src: url('${fontBase}/THSarabunNew-Regular.ttf') format('truetype'); font-weight: 400; font-style: normal; font-display: block; }
    @font-face { font-family: 'TH Sarabun New'; src: url('${fontBase}/THSarabunNew-Bold.ttf') format('truetype'); font-weight: 700; font-style: normal; font-display: block; }
    @font-face { font-family: 'TH Sarabun New'; src: url('${fontBase}/THSarabunNew-Italic.ttf') format('truetype'); font-weight: 400; font-style: italic; font-display: block; }
    @font-face { font-family: 'TH Sarabun New'; src: url('${fontBase}/THSarabunNew-BoldItalic.ttf') format('truetype'); font-weight: 700; font-style: italic; font-display: block; }
  `;
}

function prepareOfficialPrintWindow(printWindow) {
  const button = printWindow.document.getElementById('print-document-btn');
  if (!button) return;
  const ready = printWindow.document.fonts?.ready || Promise.resolve();
  ready.finally(() => {
    button.disabled = false;
    button.textContent = button.dataset.readyLabel;
  });
  button.addEventListener('click', () => printWindow.print());
}

function printMemoDocument(t) {
  const isInbound = t.type === 'inbound';
  const docTitle = isInbound ? 'รายงานการรับมอบยาและเวชภัณฑ์เข้าคลังกลาง' : 'ขออนุมัติเบิกจ่ายยาและเวชภัณฑ์ออกจากคลังกลาง';
  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    alert('กรุณาอนุญาตป๊อปอัป (Popup) เพื่อพิมพ์เอกสาร');
    return;
  }

  const itemsRows = t.items.map((line, idx) => `
    <tr>
      <td style="text-align:center;">${idx + 1}</td>
      <td><strong>${esc(line.item?.name || line.itemId)}</strong><br><small style="color:#555;">รหัส: ${esc(line.item?.code || '-')}</small></td>
      <td style="text-align:center;">${esc(line.lot || '-')}</td>
      <td style="text-align:center;">${fdate(line.expiry)}</td>
      <td style="text-align:right;"><strong>${fmt.format(line.qty)}</strong></td>
      <td style="text-align:center;">${esc(line.item?.unit || 'หน่วย')}</td>
    </tr>
  `).join('');

  const html = `
<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="UTF-8">
  <title>บันทึกข้อความ - ${esc(t.refNo)}</title>
  <style>
    ${officialDocumentFontCss()}
    @page { size: A4 portrait; margin: 20mm 20mm 20mm 25mm; }
    * { box-sizing: border-box; }
    html { background: #e5e7eb; }
    body {
      font-family: 'TH Sarabun New', sans-serif;
      font-size: 16pt;
      line-height: 1.18;
      color: #000;
      background: #fff;
      margin: 0;
      min-height: 257mm;
    }
    .memo-header {
      display: flex;
      align-items: center;
      position: relative;
      margin-bottom: 8mm;
      border-bottom: 1.5pt solid #000;
      padding-bottom: 2mm;
    }
    .garuda {
      width: 15mm;
      height: 15mm;
      object-fit: contain;
      margin-right: 6mm;
    }
    .memo-title {
      font-size: 29pt;
      font-weight: 700;
      letter-spacing: .5pt;
      line-height: 1;
      margin: 0;
    }
    .meta-table {
      width: 100%;
      margin-bottom: 4mm;
      border-collapse: collapse;
      font-size: 16pt;
    }
    .meta-table td {
      padding: 1mm 0;
      vertical-align: top;
    }
    .body-p {
      text-indent: 2.5cm;
      margin: 3mm 0;
      text-align: justify;
      orphans: 3;
      widows: 3;
    }
    table.data-table {
      width: 100%;
      border-collapse: collapse;
      margin: 4mm 0;
      font-size: 16pt;
      page-break-inside: auto;
    }
    table.data-table th, table.data-table td {
      border: .75pt solid #000;
      padding: 1.2mm 1.8mm;
      line-height: 1.08;
    }
    table.data-table th {
      background: #f5f5f5;
      text-align: center;
      font-weight: bold;
    }
    table.data-table thead { display: table-header-group; }
    table.data-table tr { page-break-inside: avoid; }
    table.data-table small { font-size: 14pt; }
    .signature-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10mm;
      margin-top: 10mm;
      page-break-inside: avoid;
    }
    .sign-box {
      text-align: center;
    }
    .sign-line {
      margin-top: 12mm;
      display: inline-block;
      width: 58mm;
      border-bottom: .75pt dotted #000;
    }
    .no-print-bar {
      background: #f1f5f9;
      padding: 12px;
      text-align: center;
      border-bottom: 1px solid #cbd5e1;
      margin-bottom: 20px;
    }
    .print-btn {
      background: #2563eb;
      color: #fff;
      border: none;
      padding: 8px 20px;
      font-size: 15px;
      font-weight: bold;
      border-radius: 6px;
      cursor: pointer;
    }
    .print-btn:disabled { opacity: .55; cursor: wait; }
    @media screen {
      body { width: 210mm; margin: 12mm auto; padding: 20mm 20mm 20mm 25mm; box-shadow: 0 12px 36px rgba(15,23,42,.18); }
      .no-print-bar { margin: -20mm -20mm 10mm -25mm; }
    }
    @media print {
      .no-print-bar { display: none !important; }
      html, body { background: #fff !important; }
      body { width: auto; min-height: 0; padding: 0 !important; print-color-adjust: exact; -webkit-print-color-adjust: exact; }
    }
  </style>
</head>
<body>
  <div class="no-print-bar">
    <button class="print-btn" id="print-document-btn" data-ready-label="พิมพ์ / บันทึกเป็น PDF" disabled>กำลังเตรียมฟอนต์ TH Sarabun New...</button>
  </div>

  <div class="memo-header">
    <img class="garuda" src="${window.location.origin}/garuda.svg" alt="ตราครุฑ">
    <h1 class="memo-title">บันทึกข้อความ</h1>
  </div>

  <table class="meta-table">
    <tr>
      <td style="width: 55%;"><strong>ส่วนราชการ:</strong> สำนักงานสาธารณสุขจังหวัดศรีสะเกษ ฝ่ายเภสัชกรรม</td>
      <td><strong>โทร:</strong> ๐ ๔๕๖๑ ๒๗๖๐</td>
    </tr>
    <tr>
      <td><strong>ที่:</strong> สสจ.ศก. / ${esc(t.refNo)}</td>
      <td><strong>วันที่:</strong> ${thaiFullDate(t.date)}</td>
    </tr>
    <tr>
      <td colspan="2"><strong>เรื่อง:</strong> ${esc(docTitle)}</td>
    </tr>
  </table>

  <p><strong>เรียน:</strong> นายแพทย์สาธารณสุขจังหวัดศรีสะเกษ</p>

  <p class="body-p">
    ตามที่ฝ่ายเภสัชกรรมและคุ้มครองผู้บริโภค สำนักงานสาธารณสุขจังหวัดศรีสะเกษ ได้ดำเนินการ${isInbound ? 'ตรวจรับมอบยาและเวชภัณฑ์จาก <strong>' + esc(t.facility) + '</strong> เข้าสู่คลังกลาง' : 'จัดเตรียมยาและเวชภัณฑ์เพื่อส่งมอบ/เบิกจ่ายให้แก่ <strong>' + esc(t.facility) + '</strong>'} ตามความประสงค์การบริหารจัดการคลังระดับจังหวัดนั้น
  </p>

  <p class="body-p">
    บัดนี้ เจ้าหน้าที่คลังยาและเวชภัณฑ์ได้ทำการตรวจสอบความถูกต้องของรายการ ล็อต จำนวน และวันหมดอายุเรียบร้อยแล้ว จึงขอรายงานสรุปรายละเอียดดังตารางรายการต่อไปนี้:
  </p>

  <table class="data-table">
    <thead>
      <tr>
        <th style="width: 40px;">ลำดับ</th>
        <th>รายการยาและเวชภัณฑ์</th>
        <th style="width: 100px;">ล็อต (Lot)</th>
        <th style="width: 110px;">วันหมดอายุ</th>
        <th style="width: 90px;">จำนวน</th>
        <th style="width: 80px;">หน่วย</th>
      </tr>
    </thead>
    <tbody>
      ${itemsRows}
    </tbody>
  </table>

  <p class="body-p">
    จึงเรียนมาเพื่อโปรดทราบและพิจารณา${isInbound ? 'ลงนามรับทราบผลการตรวจรับยาและเวชภัณฑ์ดังกล่าว' : 'อนุมัติการเบิกจ่ายยาและเวชภัณฑ์ต่อไป'}
  </p>

  <div class="signature-grid">
    <div class="sign-box">
      <p>ลงชื่อ <span class="sign-line"></span></p>
      <p>(........................................................)</p>
      <p>ตำแหน่ง เภสัชกรปฏิบัติการ / เจ้าหน้าที่ผู้รับผิดชอบ</p>
    </div>
    <div class="sign-box">
      <p>คำสั่ง / ข้อสั่งการ</p>
      <p>[ / ] ทราบ / อนุมัติ &nbsp;&nbsp;&nbsp; [ &nbsp; ] อื่นๆ ....................</p>
      <p>ลงชื่อ <span class="sign-line"></span></p>
      <p>(........................................................)</p>
      <p>นายแพทย์สาธารณสุขจังหวัดศรีสะเกษ</p>
    </div>
  </div>
</body>
</html>`;

  printWindow.document.open();
  printWindow.document.write(html);
  printWindow.document.close();
  prepareOfficialPrintWindow(printWindow);
}

function printThankYouDocument(t) {
  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    alert('กรุณาอนุญาตป๊อปอัป (Popup) เพื่อพิมพ์เอกสาร');
    return;
  }

  const itemsRows = t.items.map((line, idx) => `
    <tr>
      <td style="text-align:center;">${idx + 1}</td>
      <td><strong>${esc(line.item?.name || line.itemId)}</strong></td>
      <td style="text-align:center;">${esc(line.lot || '-')}</td>
      <td style="text-align:right;"><strong>${fmt.format(line.qty)}</strong></td>
      <td style="text-align:center;">${esc(line.item?.unit || 'หน่วย')}</td>
    </tr>
  `).join('');

  const html = `
<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="UTF-8">
  <title>หนังสือขอบคุณ - ${esc(t.facility)}</title>
  <style>
    ${officialDocumentFontCss()}
    @page { size: A4 portrait; margin: 25mm 20mm 20mm 25mm; }
    * { box-sizing: border-box; }
    html { background: #e5e7eb; }
    body {
      font-family: 'TH Sarabun New', sans-serif;
      font-size: 16pt;
      line-height: 1.18;
      color: #000;
      background: #fff;
      margin: 0;
      min-height: 252mm;
    }
    .gov-letter-header {
      text-align: center;
      margin-bottom: 6mm;
    }
    .garuda {
      width: 30mm;
      height: 30mm;
      object-fit: contain;
      margin-bottom: 2mm;
    }
    .gov-letter-head-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 4mm;
      font-size: 16pt;
    }
    .gov-letter-head-table td {
      vertical-align: top;
      padding: 1mm 0;
    }
    .body-p {
      text-indent: 2.5cm;
      margin: 3mm 0;
      text-align: justify;
      orphans: 3;
      widows: 3;
    }
    table.data-table {
      width: 100%;
      border-collapse: collapse;
      margin: 4mm 0;
      font-size: 16pt;
    }
    table.data-table th, table.data-table td {
      border: .75pt solid #000;
      padding: 1.2mm 1.8mm;
      line-height: 1.08;
    }
    table.data-table th {
      background: #f5f5f5;
      text-align: center;
      font-weight: bold;
    }
    table.data-table thead { display: table-header-group; }
    table.data-table tr { page-break-inside: avoid; }
    .signature-container {
      margin-top: 12mm;
      float: right;
      width: 85mm;
      text-align: center;
      page-break-inside: avoid;
    }
    .sign-line {
      margin-top: 12mm;
      display: inline-block;
      width: 55mm;
      border-bottom: .75pt dotted #000;
    }
    .no-print-bar {
      background: #f1f5f9;
      padding: 12px;
      text-align: center;
      border-bottom: 1px solid #cbd5e1;
      margin-bottom: 20px;
    }
    .print-btn {
      background: #059669;
      color: #fff;
      border: none;
      padding: 8px 20px;
      font-size: 15px;
      font-weight: bold;
      border-radius: 6px;
      cursor: pointer;
    }
    .print-btn:disabled { opacity: .55; cursor: wait; }
    @media screen {
      body { width: 210mm; margin: 12mm auto; padding: 25mm 20mm 20mm 25mm; box-shadow: 0 12px 36px rgba(15,23,42,.18); }
      .no-print-bar { margin: -25mm -20mm 10mm -25mm; }
    }
    @media print {
      .no-print-bar { display: none !important; }
      html, body { background: #fff !important; }
      body { width: auto; min-height: 0; padding: 0 !important; print-color-adjust: exact; -webkit-print-color-adjust: exact; }
    }
  </style>
</head>
<body>
  <div class="no-print-bar">
    <button class="print-btn" id="print-document-btn" data-ready-label="พิมพ์ / บันทึกเป็น PDF" disabled>กำลังเตรียมฟอนต์ TH Sarabun New...</button>
  </div>

  <div class="gov-letter-header">
    <img class="garuda" src="${window.location.origin}/garuda.svg" alt="ตราครุฑ">
  </div>

  <table class="gov-letter-head-table">
    <tr>
      <td style="width: 50%;">ที่ ศก ๐๐๓๒ / ${esc(t.refNo)}</td>
      <td style="text-align: right;">สำนักงานสาธารณสุขจังหวัดศรีสะเกษ<br>ถนนกสิกรรม ศก ๓๓๐๐๐</td>
    </tr>
    <tr>
      <td colspan="2" style="text-align: center; padding-top: 15px;">
        ${thaiFullDate(t.date)}
      </td>
    </tr>
  </table>

  <p><strong>เรื่อง:</strong> ขอขอบคุณสำหรับการสนับสนุนยาและเวชภัณฑ์</p>
  <p><strong>เรียน:</strong> ผู้บริหาร / ผู้มีอุปการคุณ <strong>${esc(t.facility)}</strong></p>

  <p class="body-p">
    ตามที่ท่านและหน่วยงานได้มอบความอนุเคราะห์ สนับสนุนยาและเวชภัณฑ์ให้แก่สำนักงานสาธารณสุขจังหวัดศรีสะเกษ เพื่อนำไปใช้ประโยชน์ในภารกิจการดูแลสุขภาพและรักษาพยาบาลประชาชนในพื้นที่จังหวัดศรีสะเกษนั้น
  </p>

  <p class="body-p">
    สำนักงานสาธารณสุขจังหวัดศรีสะเกษ ขอขอบพระคุณท่านและคณะเป็นอย่างยิ่ง สำหรับความอนุเคราะห์และไมตรีจิตอันดียิ่งในครั้งนี้ โดยมีรายการยาและเวชภัณฑ์ที่ได้รับมอบดังนี้:
  </p>

  <table class="data-table">
    <thead>
      <tr>
        <th style="width: 40px;">ลำดับ</th>
        <th>รายการ</th>
        <th style="width: 120px;">ล็อต</th>
        <th style="width: 100px;">จำนวน</th>
        <th style="width: 90px;">หน่วย</th>
      </tr>
    </thead>
    <tbody>
      ${itemsRows}
    </tbody>
  </table>

  <p class="body-p">
    ในโอกาสนี้ ขออัญเชิญคุณพระศรีรัตนตรัย พระพุทธศรีโพธิ์นายก และสิ่งศักดิ์สิทธิ์ทั้งหลายในสากลโลก ได้โปรดดลบันดาลประทานพรให้ท่าน คณะผู้บริหาร และบุคลากรทุกท่าน ประสบแต่ความสุข ความเจริญ ด้วยจตุรพิธพรชัย มีสุขภาพพลานามัยที่สมบูรณ์แข็งแรง และสัมฤทธิผลในสิ่งอันพึงปรารถนาทุกประการเทอญ
  </p>

  <p class="body-p" style="margin-top: 30px;">ขอแสดงความนับถืออย่างยิ่ง</p>

  <div class="signature-container">
    <p>ลงชื่อ <span class="sign-line"></span></p>
    <p>(........................................................)</p>
    <p>นายแพทย์สาธารณสุขจังหวัดศรีสะเกษ</p>
  </div>
</body>
</html>`;

  printWindow.document.open();
  printWindow.document.write(html);
  printWindow.document.close();
  prepareOfficialPrintWindow(printWindow);
}

function getSignatories() {
  try {
    const raw = localStorage.getItem('ssk_personnel_list');
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  return [
    { id: '1', name: 'นายแพทย์ทนง วีระแสงพงษ์', position: 'นายแพทย์สาธารณสุขจังหวัดศรีสะเกษ' },
    { id: '2', name: 'ภก.เด่นชัย ปัญญาดี', position: 'หัวหน้ากลุ่มงานเภสัชกรรมและคุ้มครองผู้บริโภค' },
    { id: '3', name: 'ภญ.วิภาวดี มีสุข', position: 'เภสัชกรชำนาญการ' },
    { id: '4', name: 'นายสมศักดิ์ คลังดี', position: 'เจ้าพนักงานพัสดุชำนาญงาน' },
    { id: '5', name: 'นางสาวสุดารัตน์ ใจงาม', position: 'เจ้าหน้าที่คลังเวชภัณฑ์' }
  ];
}

function saveSignatories(list) {
  try {
    localStorage.setItem('ssk_personnel_list', JSON.stringify(list));
  } catch (e) {}
}

function openManageSignatoriesModal(onChanged) {
  let list = getSignatories();
  function renderList() {
    const container = $('#personnel-items-container');
    if (!container) return;
    container.innerHTML = list.map((p, idx) => `
      <div class="personnel-item">
        <div>
          <strong>${esc(p.name)}</strong>
          <small>${esc(p.position || 'ไม่ระบุตำแหน่ง')}</small>
        </div>
        <button type="button" class="icon-button danger btn-del-person" data-index="${idx}" title="ลบรายชื่อ" aria-label="ลบรายชื่อ">${icon('close')}</button>
      </div>
    `).join('') || '<div class="empty-inline" style="padding:15px;">ยังไม่มีรายชื่อบุคลากร</div>';

    $$('.btn-del-person', container).forEach(b => {
      b.addEventListener('click', () => {
        list.splice(Number(b.dataset.index), 1);
        saveSignatories(list);
        renderList();
        if (typeof onChanged === 'function') onChanged(list);
      });
    });
  }

  const html = `
    <div class="modal-backdrop" role="presentation">
      <div class="modal" style="width:min(540px, 96vw);" role="dialog" aria-modal="true" aria-labelledby="manage-sign-title">
        <div class="modal-head">
          <h2 id="manage-sign-title">${icon('gear')} จัดการรายชื่อผู้ลงนาม / บุคลากร</h2>
          <button class="icon-button" type="button" data-close aria-label="ปิด">${icon('close')}</button>
        </div>
        <div class="modal-body">
          <p style="font-size:12px;color:var(--muted);margin-bottom:14px;">เพิ่มหรือลบรายชื่อบุคลากรเพื่อใช้เลือกเป็นผู้ลงนามในเอกสารราชการต่างๆ</p>
          <div style="display:grid;grid-template-columns:1fr 1fr auto;gap:8px;align-items:end;margin-bottom:14px;">
            <label class="field compact" style="margin:0;">
              <span>ชื่อ-นามสกุล <b class="required">*</b></span>
              <input class="control" id="new-person-name" placeholder="เช่น ภก.สมชาย ใจดี">
            </label>
            <label class="field compact" style="margin:0;">
              <span>ตำแหน่ง <b class="required">*</b></span>
              <input class="control" id="new-person-pos" placeholder="เช่น เภสัชกรชำนาญการ">
            </label>
            <button type="button" class="button primary small" id="btn-add-person" style="height:42px;">${icon('plus')} เพิ่ม</button>
          </div>
          <div class="personnel-list" id="personnel-items-container"></div>
        </div>
        <div class="modal-foot">
          <button class="button primary small" type="button" data-close>เสร็จสิ้น</button>
        </div>
      </div>
    </div>`;

  openModal(html, modal => {
    renderList();
    const nameInp = $('#new-person-name', modal);
    const posInp = $('#new-person-pos', modal);
    $('#btn-add-person', modal)?.addEventListener('click', () => {
      const name = nameInp.value.trim();
      const pos = posInp.value.trim();
      if (!name) return toast('กรุณาระบุชื่อ-นามสกุล', 'error');
      list.push({ id: 'p-' + Date.now(), name, position: pos });
      saveSignatories(list);
      nameInp.value = '';
      posInp.value = '';
      renderList();
      if (typeof onChanged === 'function') onChanged(list);
      toast(`เพิ่มรายชื่อ "${name}" เรียบร้อย`);
    });
  });
}

async function openGoodsReceiptPromptModal(t) {
  if (!state.facilities?.length) {
    try {
      const d = await api('/api/facilities');
      state.facilities = d.facilities;
    } catch (e) {}
  }
  let personnel = getSignatories();
  const isInbound = t.type === 'inbound';
  const docTitle = isInbound ? 'พิมพ์ใบรับของ' : 'พิมพ์ใบจ่ายของ / ใบเบิกจ่าย';

  function getFacInfo() {
    const facObj = (state.facilities || []).find(f => {
      const name = typeof f === 'string' ? f : (f.name || '');
      return name.toLowerCase() === (t.facility || '').toLowerCase();
    });
    return {
      name: (typeof facObj === 'string' ? facObj : facObj?.name) || t.facility || '',
      address: (typeof facObj === 'object' ? facObj?.address : '') || '',
      phone: (typeof facObj === 'object' ? facObj?.phone : '') || ''
    };
  }

  let facInfo = getFacInfo();

  function renderDatalist() {
    return `<datalist id="signatories-name-list">
      ${personnel.map(p => `<option value="${esc(p.name)}">`).join('')}
    </datalist>`;
  }

  const html = `
    <div class="modal-backdrop" role="presentation">
      <div class="modal" style="width:min(740px, 96vw);" role="dialog" aria-modal="true" aria-labelledby="receipt-prompt-title">
        <div class="modal-head">
          <div>
            <h2 id="receipt-prompt-title">${icon('file')} ${docTitle}</h2>
            <p style="font-size:12px;color:var(--muted);margin-top:2px;">เอกสาร ${esc(t.refNo)} · ดึงข้อมูลที่อยู่และเบอร์โทรจากฐานข้อมูลหน่วยงานอัตโนมัติ</p>
          </div>
          <button class="icon-button" type="button" data-close aria-label="ปิด">${icon('close')}</button>
        </div>
        <form id="receipt-prompt-form">
          <div class="modal-body">
            <div class="section-title" style="margin-bottom:8px;">
              <span>${icon('file')}</span>
              <h2>ข้อมูล${isInbound ? 'ผู้สนับสนุน / บริจาค (ผู้ส่งมอบ / แหล่งที่มา)' : 'หน่วยงานผู้เบิก'}</h2>
            </div>
            
            <div class="facility-summary-card">
              <div class="fac-summary-name">
                <span>🏢 <strong id="prompt-fac-name">${esc(facInfo.name)}</strong></span>
                <button type="button" class="manage-btn-pill" id="btn-manage-fac-prompt">${icon('gear')} จัดการข้อมูลหน่วยงาน</button>
              </div>
              <div class="fac-summary-detail">
                <div><strong>ที่อยู่:</strong> <span id="prompt-fac-address">${esc(facInfo.address || '— (ยังไม่ได้ระบุที่อยู่)')}</span></div>
                <div><strong>หมายเลขโทรศัพท์:</strong> <span id="prompt-fac-phone">${esc(facInfo.phone || '— (ยังไม่ได้ระบุเบอร์โทร)')}</span></div>
              </div>
            </div>
            <input type="hidden" name="donorName" id="hidden-donor-name" value="${esc(facInfo.name)}">
            <input type="hidden" name="donorAddress" id="hidden-donor-address" value="${esc(facInfo.address)}">
            <input type="hidden" name="donorPhone" id="hidden-donor-phone" value="${esc(facInfo.phone)}">

            <div class="signatories-box">
              <div class="signatories-head">
                <h3>${icon('award')} ข้อมูลผู้ลงนาม 4 ฝ่าย</h3>
                <button type="button" class="manage-btn-pill" id="btn-manage-sign-prompt">${icon('gear')} จัดการรายชื่อ</button>
              </div>
              <div id="datalist-container">${renderDatalist()}</div>
              
              <div class="signatories-grid">
                <div class="sign-role-card">
                  <span class="role-title">1. ผู้ตรวจสอบก่อนส่งมอบ</span>
                  <label class="field compact" style="margin:0;">
                    <span>ชื่อ-นามสกุล</span>
                    <input class="control sign-name-input" name="checkerSendName" list="signatories-name-list" placeholder="พิมพ์หรือเลือกชื่อ...">
                  </label>
                  <label class="field compact" style="margin:0;">
                    <span>ตำแหน่ง</span>
                    <input class="control sign-pos-input" name="checkerSendPos" placeholder="ระบุตำแหน่ง...">
                  </label>
                </div>

                <div class="sign-role-card">
                  <span class="role-title">2. ผู้ตรวจสอบก่อนรับ</span>
                  <label class="field compact" style="margin:0;">
                    <span>ชื่อ-นามสกุล</span>
                    <input class="control sign-name-input" name="checkerRecvName" list="signatories-name-list" placeholder="พิมพ์หรือเลือกชื่อ...">
                  </label>
                  <label class="field compact" style="margin:0;">
                    <span>ตำแหน่ง</span>
                    <input class="control sign-pos-input" name="checkerRecvPos" placeholder="ระบุตำแหน่ง...">
                  </label>
                </div>

                <div class="sign-role-card">
                  <span class="role-title">3. ผู้ส่งมอบ</span>
                  <label class="field compact" style="margin:0;">
                    <span>ชื่อ-นามสกุล</span>
                    <input class="control sign-name-input" name="senderName" list="signatories-name-list" placeholder="พิมพ์หรือเลือกชื่อ...">
                  </label>
                  <label class="field compact" style="margin:0;">
                    <span>ตำแหน่ง</span>
                    <input class="control sign-pos-input" name="senderPos" placeholder="ระบุตำแหน่ง...">
                  </label>
                </div>

                <div class="sign-role-card">
                  <span class="role-title">4. ผู้รับ</span>
                  <label class="field compact" style="margin:0;">
                    <span>ชื่อ-นามสกุล</span>
                    <input class="control sign-name-input" name="receiverName" list="signatories-name-list" placeholder="พิมพ์หรือเลือกชื่อ...">
                  </label>
                  <label class="field compact" style="margin:0;">
                    <span>ตำแหน่ง</span>
                    <input class="control sign-pos-input" name="receiverPos" placeholder="ระบุตำแหน่ง...">
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-foot" style="display:flex;justify-content:space-between;align-items:center;">
            <button class="button secondary small" type="button" data-close>ยกเลิก</button>
            <button class="button receipt-btn" type="submit">${icon('print')} ยืนยันและพิมพ์${isInbound ? 'ใบรับของ' : 'ใบจ่ายของ'}</button>
          </div>
        </form>
      </div>
    </div>`;

  openModal(html, modal => {
    function setupNamePosAutofill() {
      $$('.sign-name-input', modal).forEach(nameInp => {
        nameInp.addEventListener('input', () => {
          const matched = personnel.find(p => p.name === nameInp.value.trim());
          if (matched) {
            const card = nameInp.closest('.sign-role-card');
            const posInp = card?.querySelector('.sign-pos-input');
            if (posInp) posInp.value = matched.position || '';
          }
        });
      });
    }

    setupNamePosAutofill();

    $('#btn-manage-fac-prompt', modal)?.addEventListener('click', () => {
      openFacilitiesModal(null, () => {
        facInfo = getFacInfo();
        const nameEl = $('#prompt-fac-name', modal);
        const addrEl = $('#prompt-fac-address', modal);
        const phoneEl = $('#prompt-fac-phone', modal);
        const hidName = $('#hidden-donor-name', modal);
        const hidAddr = $('#hidden-donor-address', modal);
        const hidPhone = $('#hidden-donor-phone', modal);
        if (nameEl) nameEl.textContent = facInfo.name;
        if (addrEl) addrEl.textContent = facInfo.address || '— (ยังไม่ได้ระบุที่อยู่)';
        if (phoneEl) phoneEl.textContent = facInfo.phone || '— (ยังไม่ได้ระบุเบอร์โทร)';
        if (hidName) hidName.value = facInfo.name;
        if (hidAddr) hidAddr.value = facInfo.address;
        if (hidPhone) hidPhone.value = facInfo.phone;
      });
    });

    $('#btn-manage-sign-prompt', modal)?.addEventListener('click', () => {
      openManageSignatoriesModal(updatedList => {
        personnel = updatedList;
        const dlContainer = $('#datalist-container', modal);
        if (dlContainer) dlContainer.innerHTML = renderDatalist();
        setupNamePosAutofill();
      });
    });

    $('#receipt-prompt-form', modal)?.addEventListener('submit', e => {
      e.preventDefault();
      const fd = new FormData(e.currentTarget);
      const meta = {
        donorName: fd.get('donorName'),
        donorAddress: fd.get('donorAddress'),
        donorPhone: fd.get('donorPhone'),
        checkerSendName: fd.get('checkerSendName'),
        checkerSendPos: fd.get('checkerSendPos'),
        checkerRecvName: fd.get('checkerRecvName'),
        checkerRecvPos: fd.get('checkerRecvPos'),
        senderName: fd.get('senderName'),
        senderPos: fd.get('senderPos'),
        receiverName: fd.get('receiverName'),
        receiverPos: fd.get('receiverPos')
      };
      closeModal();
      printGoodsReceiptDocument(t, meta);
    });
  });
}

function toThaiNum(val) {
  if (val === null || val === undefined) return '';
  const thDigits = ['๐', '๑', '๒', '๓', '๔', '๕', '๖', '๗', '๘', '๙'];
  return String(val).replace(/[0-9]/g, d => thDigits[d]);
}

function printGoodsReceiptDocument(t, meta = {}) {
  const isInbound = t.type === 'inbound';
  const docTitle = isInbound ? 'ใบรับของ' : 'ใบส่งมอบ / ใบจ่ายของ';
  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    alert('กรุณาอนุญาตป๊อปอัป (Popup) เพื่อพิมพ์เอกสาร');
    return;
  }

  const d = new Date(t.date || today());
  const thMonths = ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'];
  const day = d.getDate();
  const month = thMonths[d.getMonth()];
  const year = d.getFullYear() + 543;

  const minRows = Math.max(7, t.items.length);
  let rowsHtml = '';
  for (let i = 0; i < minRows; i++) {
    const line = t.items[i];
    if (line) {
      rowsHtml += `
        <tr>
          <td style="text-align: center; height: 9mm;">${toThaiNum(i + 1)}</td>
          <td style="padding: 1.5mm 3mm; text-align: left;">${toThaiNum(esc(line.item?.name || line.itemId))}</td>
          <td style="text-align: center;">${toThaiNum(esc(line.item?.unit || 'หน่วย'))}</td>
          <td style="text-align: center;">${toThaiNum(fmt.format(line.qty))}</td>
        </tr>`;
    } else {
      rowsHtml += `
        <tr>
          <td style="text-align: center; height: 9mm;">${toThaiNum(i + 1)}</td>
          <td></td>
          <td></td>
          <td></td>
        </tr>`;
    }
  }

  const html = `
<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="UTF-8">
  <title>${esc(docTitle)} - ${toThaiNum(esc(t.refNo))}</title>
  <style>
    ${officialDocumentFontCss()}
    @page {
      size: A4 portrait;
      margin: 16mm 18mm 16mm 18mm;
    }
    * { box-sizing: border-box; }
    html { background: #e5e7eb; }
    body {
      font-family: 'TH Sarabun New', Sarabun, sans-serif;
      font-size: 16pt;
      line-height: 1.25;
      color: #000;
      background: #fff;
      margin: 0;
      min-height: 265mm;
    }
    .doc-main-title {
      text-align: center;
      font-size: 22pt;
      font-weight: bold;
      margin: 0 0 3mm 0;
    }
    .doc-gov-head {
      text-align: right;
      font-size: 16pt;
      line-height: 1.35;
      margin-bottom: 4mm;
    }
    .donor-info-block {
      font-size: 16pt;
      line-height: 1.45;
      margin-bottom: 4mm;
    }
    .donor-info-row {
      margin-bottom: 1.5mm;
      word-break: break-word;
    }
    .donor-label {
      display: inline-block;
      min-width: 175px;
    }
    .data-table {
      width: 100%;
      border-collapse: collapse;
      margin: 3mm 0 2mm 0;
      font-size: 16pt;
    }
    .data-table th, .data-table td {
      border: 1pt solid #000;
      line-height: 1.15;
    }
    .data-table th {
      background: #fff;
      text-align: center;
      font-weight: bold;
      padding: 2mm 1mm;
    }
    .data-table thead { display: table-header-group; }
    .data-table tr { page-break-inside: avoid; }
    .summary-wrap {
      display: flex;
      justify-content: flex-end;
      margin: 3mm 0 4mm 0;
    }
    .summary-text-block {
      text-align: left;
      font-size: 16pt;
      line-height: 1.45;
      display: inline-block;
    }
    .sign-table {
      width: 100%;
      border-collapse: collapse;
      border: none !important;
      margin-top: 3mm;
      page-break-inside: avoid;
    }
    .sign-table td {
      border: none !important;
      padding: 1mm 1mm;
      vertical-align: top;
      width: 50%;
      font-size: 15pt;
      line-height: 1.3;
    }
    .sign-line-box {
      display: flex;
      align-items: baseline;
      white-space: nowrap;
    }
    .sign-prefix {
      width: 9.5mm;
      flex-shrink: 0;
    }
    .sign-dots {
      width: 42mm;
      border-bottom: 1pt dotted #000;
      margin: 0 3px;
      flex-shrink: 0;
      display: inline-block;
      height: 12pt;
    }
    .sign-role-label {
      white-space: nowrap;
      flex-shrink: 0;
    }
    .sign-name-wrap {
      width: 42mm;
      margin-left: calc(9.5mm + 3px);
      display: flex;
      justify-content: center;
      margin-top: 1.2mm;
    }
    .sign-name-sub {
      white-space: nowrap;
      text-align: center;
    }
    .sign-pos-sub {
      margin-left: 0;
      margin-top: 1.2mm;
      word-break: break-word;
    }
    .no-print-bar {
      background: #f1f5f9;
      padding: 12px;
      text-align: center;
      border-bottom: 1px solid #cbd5e1;
      margin-bottom: 20px;
    }
    .print-btn {
      background: #2563eb;
      color: #fff;
      border: none;
      padding: 8px 24px;
      font-size: 15px;
      font-weight: bold;
      border-radius: 6px;
      cursor: pointer;
    }
    .print-btn:disabled { opacity: .55; cursor: wait; }
    @media screen {
      body {
        width: 210mm;
        margin: 12mm auto;
        padding: 18mm 18mm 18mm 18mm;
        box-shadow: 0 12px 36px rgba(15,23,42,.18);
      }
      .no-print-bar { margin: -18mm -18mm 12mm -18mm; }
    }
    @media print {
      .no-print-bar { display: none !important; }
      html, body { background: #fff !important; }
      body { width: auto; min-height: 0; padding: 0 !important; print-color-adjust: exact; -webkit-print-color-adjust: exact; }
    }
  </style>
</head>
<body>
  <div class="no-print-bar">
    <button class="print-btn" id="print-document-btn" data-ready-label="พิมพ์ / บันทึกเป็น PDF" disabled>กำลังเตรียมฟอนต์ TH Sarabun New...</button>
  </div>

  <div class="doc-main-title">${esc(docTitle)}</div>

  <div class="doc-gov-head">
    <div>ส่วนราชการ สำนักงานสาธารณสุขจังหวัดศรีสะเกษ</div>
    <div>วันที่ ${toThaiNum(day)} เดือน ${month} พ.ศ. ${toThaiNum(year)}</div>
  </div>

  <div class="donor-info-block">
    <div class="donor-info-row"><span class="donor-label">ชื่อผู้สนับสนุน/บริจาค</span> ${toThaiNum(esc(meta.donorName || t.facility || ''))}</div>
    <div class="donor-info-row"><span class="donor-label">ที่อยู่ที่สามารถติดต่อได้</span> ${toThaiNum(esc(meta.donorAddress || '—'))}</div>
    <div class="donor-info-row"><span class="donor-label">หมายเลขโทรศัพท์</span> ${toThaiNum(esc(meta.donorPhone || '—'))}</div>
  </div>

  <table class="data-table">
    <thead>
      <tr>
        <th style="width: 60px;">ลำดับ</th>
        <th>รายการ</th>
        <th style="width: 120px;">หน่วยนับ</th>
        <th style="width: 130px;">จำนวนที่มอบ</th>
      </tr>
    </thead>
    <tbody>
      ${rowsHtml}
    </tbody>
  </table>

  <div class="summary-wrap">
    <div class="summary-text-block">
      <div>รวมจำนวน........${toThaiNum(t.items.length)}........รายการ</div>
      <div>ได้รับของถูกต้องและครบถ้วนตามรายการแล้ว</div>
    </div>
  </div>

  <table class="sign-table">
    <tr>
      <td>
        <div class="sign-line-box">
          <span class="sign-prefix">ลงชื่อ</span>
          <span class="sign-dots"></span>
          <span class="sign-role-label">ผู้ตรวจสอบก่อนส่งมอบ</span>
        </div>
        <div class="sign-name-wrap">
          <div class="sign-name-sub">( ${toThaiNum(esc(meta.checkerSendName ? meta.checkerSendName : '...................................................'))} )</div>
        </div>
        <div class="sign-pos-sub">ตำแหน่ง ${toThaiNum(esc(meta.checkerSendPos ? meta.checkerSendPos : '...................................................'))}</div>
      </td>
      <td>
        <div class="sign-line-box">
          <span class="sign-prefix">ลงชื่อ</span>
          <span class="sign-dots"></span>
          <span class="sign-role-label">ผู้ตรวจสอบก่อนรับ</span>
        </div>
        <div class="sign-name-wrap">
          <div class="sign-name-sub">( ${toThaiNum(esc(meta.checkerRecvName ? meta.checkerRecvName : '...................................................'))} )</div>
        </div>
        <div class="sign-pos-sub">ตำแหน่ง ${toThaiNum(esc(meta.checkerRecvPos ? meta.checkerRecvPos : '...................................................'))}</div>
      </td>
    </tr>
    <tr>
      <td style="padding-top: 6mm;">
        <div class="sign-line-box">
          <span class="sign-prefix">ลงชื่อ</span>
          <span class="sign-dots"></span>
          <span class="sign-role-label">ผู้ส่งมอบ</span>
        </div>
        <div class="sign-name-wrap">
          <div class="sign-name-sub">( ${toThaiNum(esc(meta.senderName ? meta.senderName : '...................................................'))} )</div>
        </div>
        <div class="sign-pos-sub">ตำแหน่ง ${toThaiNum(esc(meta.senderPos ? meta.senderPos : '...................................................'))}</div>
      </td>
      <td style="padding-top: 6mm;">
        <div class="sign-line-box">
          <span class="sign-prefix">ลงชื่อ</span>
          <span class="sign-dots"></span>
          <span class="sign-role-label">ผู้รับ</span>
        </div>
        <div class="sign-name-wrap">
          <div class="sign-name-sub">( ${toThaiNum(esc(meta.receiverName ? meta.receiverName : '...................................................'))} )</div>
        </div>
        <div class="sign-pos-sub">ตำแหน่ง ${toThaiNum(esc(meta.receiverPos ? meta.receiverPos : '...................................................'))}</div>
      </td>
    </tr>
  </table>
</body>
</html>`;

  printWindow.document.open();
  printWindow.document.write(html);
  printWindow.document.close();
  prepareOfficialPrintWindow(printWindow);
}

function openBillPreviewModal(att, refNo) {
  if (!att || !att.data) return;
  const isPdf = (att.type && att.type.includes('pdf')) || att.data.startsWith('data:application/pdf');
  const isImage = (att.type && att.type.startsWith('image/')) || att.data.startsWith('data:image/');

  const content = isImage
    ? `<div style="text-align:center;padding:16px;max-height:70vh;overflow:auto;background:#0b1523;border-radius:12px;">
         <img src="${att.data}" alt="บิลแนบ ${esc(att.name)}" style="max-width:100%;height:auto;border-radius:8px;box-shadow:0 8px 30px rgba(0,0,0,0.5);">
       </div>`
    : isPdf
    ? `<div style="height:70vh;border-radius:12px;overflow:hidden;border:1px solid var(--line);">
         <iframe src="${att.data}" style="width:100%;height:100%;border:0;" title="เอกสารบิล PDF"></iframe>
       </div>`
    : `<div class="notice" style="margin-top:10px;">${icon('info')} ไฟล์นี้ไม่สามารถแสดงตัวอย่างได้โดยตรง (${esc(att.name)}) กรุณากดปุ่มดาวน์โหลดไฟล์ด้านล่าง</div>`;

  const html = `
    <div class="modal-backdrop" role="presentation">
      <div class="modal" style="width:min(900px, 96vw);" role="dialog" aria-modal="true" aria-labelledby="bill-modal-title">
        <div class="modal-head">
          <div>
            <h2 id="bill-modal-title">${icon('file')} ${esc(att.name)}</h2>
            <p style="font-size:12px;color:var(--muted);margin-top:2px;">เอกสารอ้างอิง ${esc(refNo || '-')} · ขนาด ${Math.round((att.size || 0) / 1024)} KB</p>
          </div>
          <button class="icon-button" type="button" data-close aria-label="ปิด">${icon('close')}</button>
        </div>
        <div class="modal-body">
          ${content}
        </div>
        <div class="modal-foot" style="display:flex;justify-content:space-between;align-items:center;">
          <a href="${att.data}" download="${esc(att.name)}" class="button secondary small" style="display:inline-flex;align-items:center;gap:6px;">
            ${icon('download')} ดาวน์โหลดไฟล์บิล
          </a>
          <button class="button primary small" type="button" data-close>ปิดหน้าต่าง</button>
        </div>
      </div>
    </div>`;

  openModal(html);
}

async function openTransactionDetail(txnId, pageType) {
  try {
    const d = await api(`/api/transactions/${txnId}`);
    const t = d.transaction;
    const isVoided = t.status === 'voided';
    const isInbound = t.type === 'inbound';

    const html = `
      <div class="modal-backdrop" role="presentation">
        <div class="modal modal-large" role="dialog" aria-modal="true" aria-labelledby="txn-detail-title">
          <div class="modal-head">
            <div>
              <h2 id="txn-detail-title">เอกสาร ${esc(t.refNo)}</h2>
              <p>${isInbound ? 'รับเข้าจาก' : 'เบิกจ่ายให้'} ${esc(t.facility)} · ${fdate(t.date)}</p>
            </div>
            <button class="icon-button" type="button" data-close aria-label="ปิด">${icon('close')}</button>
          </div>
          <div class="modal-body">
            <!-- Memo Bar (Image 2) -->
            <div class="doc-memo-bar">
              <div class="doc-memo-status-group">
                <label class="doc-memo-checkbox-label">
                  <input type="checkbox" id="memo-status-chk" ${t.memoDone ? 'checked' : ''}>
                  <strong>ทำบันทึกข้อความแล้ว</strong>
                </label>
                <span id="memo-status-badge" class="doc-memo-badge ${t.memoDone ? 'done' : 'pending'}">
                  ${t.memoDone ? `${icon('check')} ทำบันทึกข้อความแล้ว (สำเร็จ)` : `${icon('clock')} ยังไม่ได้ทำบันทึกข้อความ`}
                </span>
              </div>
              <button type="button" class="button print-memo-btn" id="print-memo-btn">
                ${icon('print')} พิมพ์ใบบันทึกข้อความ
              </button>
            </div>

            <div class="meta-list" style="margin-bottom:16px;">
              <div class="meta-row"><span>ประเภท</span><strong>${isInbound ? 'รับเข้าคลัง' : 'เบิกจ่ายออกจากคลัง'}</strong></div>
              <div class="meta-row"><span>สถานะ</span><span class="status ${isVoided ? 'expired' : 'normal'}">${statusLabel(t.status)}</span></div>
              <div class="meta-row"><span>วันที่ทำรายการ</span><strong>${fdate(t.date)}</strong></div>
              ${t.note ? `<div class="meta-row"><span>หมายเหตุ</span><strong>${esc(t.note)}</strong></div>` : ''}
              ${t.attachment ? `
                <div class="meta-row">
                  <span>บิล / เอกสารแนบ</span>
                  <div class="doc-attachment-view">
                    <span class="attachment-pill">
                      ${icon('paperclip')} <strong>${esc(t.attachment.name)}</strong> <small style="color:var(--muted)">(${Math.round((t.attachment.size || 0) / 1024)} KB)</small>
                    </span>
                    <button type="button" class="button small secondary view-bill-btn" id="view-attached-bill-btn">
                      ${icon('eye')} ดูไฟล์บิล
                    </button>
                  </div>
                </div>` : ''}
              ${isVoided ? `<div class="meta-row"><span>เหตุผลที่ยกเลิก</span><strong style="color:#dc2626">${esc(t.voidReason || 'ไม่ระบุ')} (โดย ${esc(t.voidedBy)})</strong></div>` : ''}
            </div>
            <div class="table-wrap">
              <table>
                <thead><tr><th>#</th><th>รายการ</th><th>ล็อต</th><th>วันหมดอายุ</th><th class="number">จำนวน</th></tr></thead>
                <tbody>
                  ${t.items.map((line, idx) => `
                    <tr>
                      <td>${idx + 1}</td>
                      <td><strong>${esc(line.item?.name || line.itemId)}</strong><small>${esc(line.item?.code || '')}</small></td>
                      <td>${esc(line.lot || '-')}</td>
                      <td>${fdate(line.expiry)}</td>
                      <td class="number"><span class="stock-number">${fmt.format(line.qty)}</span> ${esc(line.item?.unit || '')}</td>
                    </tr>`).join('')}
                </tbody>
              </table>
            </div>
          </div>
          <div class="modal-foot" style="display:flex;justify-content:space-between;align-items:center;">
            <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;">
              ${isInbound ? `<button class="button thankyou-btn" type="button" id="print-thankyou-btn">${icon('award')} พิมพ์หนังสือขอบคุณ</button>` : ''}
              <button class="button receipt-btn" type="button" id="print-receipt-btn">${icon('file')} ${isInbound ? 'พิมพ์ใบรับของ' : 'พิมพ์ใบจ่ายของ'}</button>
            </div>
            <div style="display:flex;gap:8px;align-items:center;">
              ${!isVoided ? `<button class="button danger" type="button" id="void-txn-btn">${icon('ban')} ยกเลิกเอกสารนี้</button>` : ''}
              <button class="button secondary" type="button" data-close>ปิด</button>
            </div>
          </div>
        </div>
      </div>`;

    openModal(html, modal => {
      // View Attached Bill
      if (t.attachment) {
        $('#view-attached-bill-btn', modal)?.addEventListener('click', () => {
          openBillPreviewModal(t.attachment, t.refNo);
        });
      }

      // Toggle Memo Checkbox
      const memoChk = $('#memo-status-chk', modal);
      const memoBadge = $('#memo-status-badge', modal);
      if (memoChk) {
        memoChk.addEventListener('change', async () => {
          const isDone = memoChk.checked;
          try {
            await api(`/api/transactions/${txnId}/memo`, {
              method: 'POST',
              body: JSON.stringify({ memoDone: isDone })
            });
            t.memoDone = isDone;
            if (memoBadge) {
              memoBadge.className = `doc-memo-badge ${isDone ? 'done' : 'pending'}`;
              memoBadge.innerHTML = isDone
                ? `${icon('check')} ทำบันทึกข้อความแล้ว (สำเร็จ)`
                : `${icon('clock')} ยังไม่ได้ทำบันทึกข้อความ`;
            }
            toast(isDone ? 'บันทึกทำข้อความแล้ว (สำเร็จ)' : 'ยกเลิกสถานะทำบันทึกข้อความ');
          } catch (ex) {
            toast(ex.message, 'error');
            memoChk.checked = !isDone;
          }
        });
      }

      // Print Memo Button
      $('#print-memo-btn', modal)?.addEventListener('click', () => {
        printMemoDocument(t);
      });

      // Print Thank You Button
      $('#print-thankyou-btn', modal)?.addEventListener('click', () => {
        printThankYouDocument(t);
      });

      // Print Goods Receipt / Delivery Note Button (Opens Prompt Modal for Extra Info)
      $('#print-receipt-btn', modal)?.addEventListener('click', () => {
        openGoodsReceiptPromptModal(t);
      });

      // Void Transaction
      const voidBtn = $('#void-txn-btn', modal);
      if (voidBtn) {
        voidBtn.addEventListener('click', async () => {
          const reason = prompt('กรุณาระบุเหตุผลการยกเลิกเอกสาร:');
          if (reason === null) return;
          try {
            await api(`/api/transactions/${txnId}/void`, {
              method: 'POST',
              body: JSON.stringify({ reason: reason.trim() || 'ยกเลิกรายการ' })
            });
            toast('ยกเลิกเอกสารและปรับปรุงยอดสต็อกแล้ว');
            closeModal();
            state.items = [];
            await loadItems();
            if (pageType) await transactionPage(pageType);
            else route();
          } catch (ex) {
            toast(ex.message, 'error');
          }
        });
      }
    });
  } catch (ex) {
    toast(ex.message, 'error');
  }
}

async function openExpiryAlertEmailModal() {
  try {
    const previewData = await api('/api/notifications/expiry-preview?days=180');
    const items = previewData.items || [];
    const sender = previewData.sender || 'cream.sk09@gmail.com';
    const recipient = previewData.recipient || 'lew0994733933@gmail.com';
    const totalQty = items.reduce((sum, i) => sum + (Number(i.qty) || 0), 0);

    const itemsRows = items.length ? items.map((i, idx) => `
      <tr>
        <td style="text-align:center;">${idx + 1}</td>
        <td><strong>${esc(i.name)}</strong><small style="display:block;color:var(--muted);font-size:11px;">รหัส: ${esc(i.code || '-')} | ${esc(i.category || '-')}</small></td>
        <td style="text-align:center;"><strong>${esc(i.lot || '-')}</strong></td>
        <td style="text-align:right;"><strong>${fmt.format(i.qty)}</strong> <small style="color:var(--muted);">${esc(i.unit || '')}</small></td>
        <td style="text-align:center;">${fdate(i.expiry)}</td>
        <td style="text-align:center;"><span class="status ${i.daysToExpiry < 0 ? 'expired' : 'expiring'}">${i.daysToExpiry < 0 ? `หมดอายุ (${Math.abs(i.daysToExpiry)} วัน)` : `เหลือ ${i.daysToExpiry} วัน`}</span></td>
      </tr>
    `).join('') : `<tr><td colspan="6" style="text-align:center;padding:24px;color:var(--muted);">ไม่พบรายการยาที่ใกล้หมดอายุภายใน 6 เดือน</td></tr>`;

    const html = `
      <div class="modal-backdrop" role="presentation">
        <div class="modal" style="width:min(860px, 96vw);" role="dialog" aria-modal="true" aria-labelledby="expiry-email-title">
          <div class="modal-head">
            <div>
              <h2 id="expiry-email-title">${icon('mail')} ส่งอีเมลแจ้งเตือนยาใกล้หมดอายุ 6 เดือน</h2>
              <p style="font-size:12px;color:var(--muted);margin-top:2px;">ส่งสรุปข้อมูลรายการยา ล็อต จำนวน และวันหมดอายุ ไปยังผู้รับผิดชอบทางอีเมล</p>
            </div>
            <button class="icon-button" type="button" data-close aria-label="ปิด">${icon('close')}</button>
          </div>
          <form id="expiry-email-form">
            <div class="modal-body">
              <div class="grid" style="grid-template-columns: 1fr 1fr; gap:12px; margin-bottom: 14px;">
                <label class="field compact" style="margin:0;">
                  <span>อีเมลผู้ส่ง (Sender) <b class="required">*</b></span>
                  <input class="control" name="sender" value="${esc(sender)}" required>
                </label>
                <label class="field compact" style="margin:0;">
                  <span>อีเมลผู้รับ (Recipient) <b class="required">*</b></span>
                  <input class="control" name="recipient" value="${esc(recipient)}" required>
                </label>
              </div>

              <div class="grid" style="grid-template-columns: 1fr 1fr 1fr; gap: 10px; margin-bottom: 14px;">
                <div class="kpi-card orange" style="padding:10px 14px;">
                  <small style="color:var(--muted);font-size:11.5px;font-weight:600;">เกณฑ์เฝ้าระวัง</small>
                  <strong style="font-size:15px;margin-top:2px;">ภายใน 6 เดือน (180 วัน)</strong>
                </div>
                <div class="kpi-card red" style="padding:10px 14px;">
                  <small style="color:var(--muted);font-size:11.5px;font-weight:600;">จำนวนรายการยา</small>
                  <strong style="font-size:15px;margin-top:2px;">${fmt.format(items.length)} รายการ</strong>
                </div>
                <div class="kpi-card blue" style="padding:10px 14px;">
                  <small style="color:var(--muted);font-size:11.5px;font-weight:600;">ยอดรวมเวชภัณฑ์</small>
                  <strong style="font-size:15px;margin-top:2px;">${fmt.format(totalQty)} ชิ้น/หน่วย</strong>
                </div>
              </div>

              <div class="section-title" style="margin: 14px 0 8px 0;">
                <span>${icon('list')}</span>
                <h2>รายละเอียดรายการยาที่จะส่งในอีเมล (${items.length} รายการ)</h2>
              </div>
              <div class="table-wrap" style="max-height: 280px; overflow-y: auto; border: 1px solid var(--line); border-radius: 8px;">
                <table class="data-table">
                  <thead>
                    <tr>
                      <th style="width:45px;text-align:center;">ลำดับ</th>
                      <th>รายการยา / เวชภัณฑ์</th>
                      <th style="width:95px;text-align:center;">ล็อต (Lot)</th>
                      <th style="width:105px;text-align:right;">จำนวน</th>
                      <th style="width:105px;text-align:center;">วันหมดอายุ</th>
                      <th style="width:125px;text-align:center;">สถานะ</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${itemsRows}
                  </tbody>
                </table>
              </div>
            </div>
            <div class="modal-foot" style="display:flex;justify-content:space-between;align-items:center;">
              <button class="button secondary small" type="button" data-close>ปิด</button>
              <button class="button primary" id="btn-submit-send-email" type="submit" ${items.length === 0 ? 'disabled' : ''}>${icon('mail')} ส่งอีเมลแจ้งเตือนทันที</button>
            </div>
          </form>
        </div>
      </div>`;

    openModal(html, modal => {
      $('#expiry-email-form', modal)?.addEventListener('submit', async e => {
        e.preventDefault();
        const submitBtn = $('#btn-submit-send-email', modal);
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.innerHTML = `${icon('loader')} กำลังส่งอีเมล...`;
        }
        const fd = new FormData(e.currentTarget);
        const sMail = fd.get('sender') || sender;
        const rMail = fd.get('recipient') || recipient;

        try {
          const res = await api('/api/notifications/expiry-alert', {
            method: 'POST',
            body: JSON.stringify({ sender: sMail, recipient: rMail, thresholdDays: 180 })
          });
          closeModal();
          toast(`ส่งอีเมลแจ้งเตือน ${res.items?.length || items.length} รายการไปยัง ${rMail} เรียบร้อย!`);
        } catch (ex) {
          toast(ex.message || 'เกิดข้อผิดพลาดในการส่งอีเมล', 'error');
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = `${icon('mail')} ส่งอีเมลแจ้งเตือนทันที`;
          }
        }
      });
    });
  } catch (ex) {
    toast(ex.message, 'error');
  }
}

/* ══════════════════════════════════════════════════════════════
   5. STOCK INVENTORY VIEW WITH PAGINATION & CRUD
   ══════════════════════════════════════════════════════════════ */
async function stockPage(params = new URLSearchParams()) {
  const preset = params.get('status') || 'all';
  const q = params.get('q') || '';
  const cat = params.get('category') || 'all';
  const page = parseInt(params.get('page')) || state.stockPage || 1;

  const data = await api(`/api/items?q=${encodeURIComponent(q)}&status=${preset}&category=${encodeURIComponent(cat)}&sort=${state.stockSort.field}&order=${state.stockSort.order}&page=${page}&limit=${state.stockLimit}`);
  state.items = data.items;
  state.categories = data.categories;

  $('#main-content').innerHTML = `
    ${pageHead('boxes', 'purple', 'รายการคงคลัง', 'ค้นหา ติดตามจุดสั่งซื้อ และตรวจวันหมดอายุ (คลิกแถวเพื่อดูรายละเอียด/แก้ไข)', `<button type="button" class="button smart-primary" id="btn-stock-expiry-email">${icon('mail')} ส่งอีเมลแจ้งเตือน 6 เดือน</button><a class="button secondary" href="/api/export/inventory.csv">${icon('download')} ส่งออก CSV</a><a class="button primary" href="#inbound">${icon('plus')} รับเข้า</a>`)}
    <div class="grid summary-grid">
      ${kpi('package', '', 'พร้อมใช้งาน', fmt.format(data.items.filter(i => i.status === 'normal').length), 'รายการในหน้านี้')}
      ${kpi('alert', 'orange', 'ต่ำกว่าจุดเตือน', fmt.format(data.items.filter(i => i.status === 'low').length), 'รายการในหน้านี้')}
      ${kpi('clock', 'red', 'หมดอายุใน 180 วัน', fmt.format(data.items.filter(i => ['expiring', 'expired'].includes(i.status)).length), 'รายการในหน้านี้')}
    </div>
    <section class="card table-card">
      <div class="table-tools">
        <label class="search">${icon('search')}<input id="stock-search" value="${esc(q)}" placeholder="ค้นหาชื่อ รหัส หรือเลขล็อต" aria-label="ค้นหารายการ"></label>
        <select id="status-filter" class="filter-select" aria-label="กรองสถานะ">
          <option value="all">ทุกสถานะ</option>
          <option value="normal">พร้อมใช้</option>
          <option value="low">ต่ำกว่าจุดเตือน</option>
          <option value="expiring">ใกล้หมดอายุ</option>
          <option value="expired">หมดอายุ</option>
        </select>
        <select id="category-filter" class="filter-select" aria-label="กรองหมวดหมู่">
          <option value="all">ทุกหมวดหมู่</option>
          ${data.categories.map(c => `<option value="${esc(c)}">${esc(c)}</option>`).join('')}
        </select>
        <span class="source-badge">แหล่งข้อมูล: คงคลังปัจจุบัน</span>
      </div>
      <div id="stock-table"></div>
      <div id="stock-pagination"></div>
    </section>`;

  $('#status-filter').value = preset;
  $('#category-filter').value = cat;

  const reloadStock = (newPage = 1) => {
    state.stockPage = newPage;
    const query = new URLSearchParams();
    const queryStr = $('#stock-search').value.trim();
    if (queryStr) query.set('q', queryStr);
    if ($('#status-filter').value !== 'all') query.set('status', $('#status-filter').value);
    if ($('#category-filter').value !== 'all') query.set('category', $('#category-filter').value);
    if (newPage > 1) query.set('page', newPage);
    stockPage(query);
  };

  $('#stock-search').addEventListener('input', debounce(() => reloadStock(1), 350));
  $('#status-filter').addEventListener('change', () => reloadStock(1));
  $('#category-filter').addEventListener('change', () => reloadStock(1));
  $('#btn-stock-expiry-email')?.addEventListener('click', () => openExpiryAlertEmailModal());

  renderStockTable(data.items, data.meta, reloadStock);
}

function renderStockTable(items, meta, onPageChange) {
  const sf = state.stockSort.field;
  const so = state.stockSort.order;
  const sortInd = f => sf === f ? `<span class="sort-indicator">${so === 'asc' ? '▲' : '▼'}</span>` : `<span class="sort-indicator">⇅</span>`;

  $('#stock-table').innerHTML = `
    <div class="table-wrap stock-table-wrap">
      <table class="stock-table">
        <thead>
          <tr>
            <th class="sortable ${sf === 'name' ? 'active' : ''}" data-sort="name">รายการ ${sortInd('name')}</th>
            <th class="sortable ${sf === 'category' ? 'active' : ''}" data-sort="category">หมวดหมู่ ${sortInd('category')}</th>
            <th class="sortable ${sf === 'lot' ? 'active' : ''}" data-sort="lot">ล็อต ${sortInd('lot')}</th>
            <th class="sortable ${sf === 'expiry' ? 'active' : ''}" data-sort="expiry">วันหมดอายุ ${sortInd('expiry')}</th>
            <th class="number sortable ${sf === 'minQty' ? 'active' : ''}" data-sort="minQty">จุดเตือน ${sortInd('minQty')}</th>
            <th class="number sortable ${sf === 'qty' ? 'active' : ''}" data-sort="qty">คงเหลือ ${sortInd('qty')}</th>
            <th class="sortable ${sf === 'status' ? 'active' : ''}" data-sort="status">สถานะ ${sortInd('status')}</th>
          </tr>
        </thead>
        <tbody>
          ${items.length ? items.map(i => `
            <tr class="row-clickable" data-item-id="${i.id}">
              <td data-label="รายการ">
                <div class="item-cell">
                  <span class="item-avatar">${esc(i.code.slice(0, 3))}</span>
                  <div><strong>${esc(i.name)}</strong><small>${esc(i.code)} · ${esc(i.package || 'ไม่ระบุบรรจุภัณฑ์')}</small></div>
                </div>
              </td>
              <td data-label="หมวดหมู่">${esc(i.category)}</td>
              <td data-label="ล็อต"><strong>${esc(i.lot || '-')}</strong></td>
              <td data-label="วันหมดอายุ"><strong>${fdate(i.expiry)}</strong><small>${Number.isFinite(i.daysToExpiry) ? `${fmt.format(i.daysToExpiry)} วัน` : 'ไม่มีวันหมดอายุ'}</small></td>
              <td data-label="จุดเตือน" class="number">${fmt.format(i.minQty)}</td>
              <td data-label="คงเหลือ" class="number"><span class="stock-number">${fmt.format(i.qty)}</span> ${esc(i.unit)}</td>
              <td data-label="สถานะ"><span class="status ${i.status}">${statusLabel(i.status)}</span></td>
            </tr>`).join('') : `<tr><td colspan="7" class="table-empty">${icon('search')}<br>ไม่พบรายการที่ตรงกับตัวกรอง</td></tr>`}
        </tbody>
      </table>
    </div>`;

  if (meta) {
    $('#stock-pagination').innerHTML = renderPagination(meta, onPageChange);
  }

  // Header Sort Click
  $$('#stock-table th.sortable').forEach(th => {
    th.addEventListener('click', () => {
      const field = th.dataset.sort;
      if (state.stockSort.field === field) {
        state.stockSort.order = state.stockSort.order === 'asc' ? 'desc' : 'asc';
      } else {
        state.stockSort.field = field;
        state.stockSort.order = 'asc';
      }
      onPageChange(1);
    });
  });

  // Row Click -> Open Item Detail
  $$('#stock-table tr.row-clickable').forEach(tr => {
    tr.addEventListener('click', () => openItemDetail(tr.dataset.itemId));
  });
}

async function openItemDetail(itemId) {
  try {
    const d = await api(`/api/items/${itemId}`);
    const item = d.item;
    const txns = d.transactions || [];

    const html = `
      <div class="modal-backdrop" role="presentation">
        <div class="modal modal-large" role="dialog" aria-modal="true" aria-labelledby="item-detail-title">
          <div class="modal-head">
            <div>
              <h2 id="item-detail-title">${esc(item.name)}</h2>
              <p>รหัส: ${esc(item.code)} · หมวดหมู่: ${esc(item.category)}</p>
            </div>
            <button class="icon-button" type="button" data-close aria-label="ปิด">${icon('close')}</button>
          </div>
          <div class="modal-body">
            <div class="grid summary-grid">
              ${kpi('package', '', 'คงเหลือ', `${fmt.format(item.qty)} ${esc(item.unit)}`, `สถานะ: ${statusLabel(item.status)}`)}
              ${kpi('alert', item.qty <= item.minQty ? 'orange' : '', 'จุดเตือนสั่งซื้อ', fmt.format(item.minQty), 'หน่วยเตือน')}
              ${kpi('clock', item.daysToExpiry <= 180 ? 'red' : '', 'วันหมดอายุ', fdate(item.expiry), `${Number.isFinite(item.daysToExpiry) ? `${item.daysToExpiry} วัน` : '-'}`)}
              ${kpi('boxes', 'blue', 'ล็อต', esc(item.lot || '-'), esc(item.package || 'บรรจุภัณฑ์'))}
            </div>
            <div style="margin-top:20px;">
              <h3 style="font-size:15px;margin-bottom:10px;">ประวัติการเคลื่อนไหว (${txns.length} รายการ)</h3>
              ${txns.length ? `
                <div class="table-wrap">
                  <table>
                    <thead><tr><th>วันที่</th><th>ประเภท</th><th>เลขที่อ้างอิง</th><th>หน่วยงาน</th><th class="number">จำนวน</th></tr></thead>
                    <tbody>
                      ${txns.map(t => {
                        const line = t.items.find(l => l.itemId === item.id) || {};
                        return `
                          <tr style="cursor:pointer;" onclick="closeModal();openTransactionDetail('${t.id}')">
                            <td>${fdate(t.date)}</td>
                            <td><span class="status ${t.type === 'inbound' ? 'normal' : 'low'}">${t.type === 'inbound' ? 'รับเข้า' : 'เบิกจ่าย'}</span></td>
                            <td><strong>${esc(t.refNo)}</strong></td>
                            <td>${esc(t.facility)}</td>
                            <td class="number"><span class="stock-number">${fmt.format(line.qty || 0)}</span> ${esc(item.unit)}</td>
                          </tr>`;
                      }).join('')}
                    </tbody>
                  </table>
                </div>` : '<div class="empty-inline">ยังไม่มีประวัติการรับเข้า/เบิกจ่ายสำหรับรายการนี้</div>'}
            </div>
          </div>
          <div class="modal-foot">
            <button class="button secondary" type="button" data-close>ปิด</button>
            <button class="button danger" type="button" id="delete-item-btn" ${item.qty > 0 ? 'disabled title="ต้องมียอดคงเหลือ 0 ถึงจะลบได้"' : ''}>${icon('trash')} ลบรายการ</button>
            <button class="button primary" type="button" id="edit-item-btn">${icon('edit')} แก้ไขข้อมูล</button>
          </div>
        </div>
      </div>`;

    openModal(html, modal => {
      $('#edit-item-btn', modal)?.addEventListener('click', () => {
        closeModal();
        openItemEditModal(item);
      });
      $('#delete-item-btn', modal)?.addEventListener('click', async () => {
        const ok = await confirmModal({
          title: `ยืนยันการลบรายการ ${item.name}`,
          message: `รายการ ${item.code} จะถูกปิดการใช้งานและไม่แสดงในระบบอีกต่อไป ต้องการดำเนินการหรือไม่?`,
          confirmText: 'ลบรายการนี้',
          danger: true,
          iconName: 'trash'
        });
        if (ok) {
          try {
            await api(`/api/items/${item.id}`, { method: 'DELETE' });
            toast(`ลบรายการ ${item.name} เรียบร้อยแล้ว`);
            closeModal();
            state.items = [];
            await loadItems();
            route();
          } catch (ex) {
            toast(ex.message, 'error');
          }
        }
      });
    });
  } catch (ex) {
    toast(ex.message, 'error');
  }
}

function openItemEditModal(item) {
  const html = `
    <div class="modal-backdrop" role="presentation">
      <form class="modal" id="item-edit-form" role="dialog" aria-modal="true" aria-labelledby="modal-edit-title">
        <div class="modal-head">
          <h2 id="modal-edit-title">แก้ไขรายการ ${esc(item.code)}</h2>
          <button class="icon-button" type="button" data-close aria-label="ปิด">${icon('close')}</button>
        </div>
        <div class="modal-body">
          <div class="form-grid two">
            <label class="field compact"><span>รหัสรายการ <b class="required">*</b></span><input class="control" name="code" value="${esc(item.code)}" required></label>
            <label class="field compact"><span>ชื่อรายการ <b class="required">*</b></span><input class="control" name="name" value="${esc(item.name)}" required></label>
            <label class="field compact"><span>หมวดหมู่ <b class="required">*</b></span><input class="control" name="category" list="category-list" value="${esc(item.category)}" required><datalist id="category-list">${state.categories.map(x => `<option value="${esc(x)}">`).join('')}</datalist></label>
            <label class="field compact"><span>หน่วย <b class="required">*</b></span><input class="control" name="unit" value="${esc(item.unit)}" required></label>
            <label class="field compact"><span>รูปแบบบรรจุ</span><input class="control" name="package" value="${esc(item.package || '')}"></label>
            <label class="field compact"><span>จุดเตือนคงคลัง</span><input class="control" name="minQty" type="number" min="0" value="${item.minQty}"></label>
            <label class="field compact"><span>ล็อต</span><input class="control" name="lot" value="${esc(item.lot || '')}"></label>
            <label class="field compact"><span>วันหมดอายุ</span><input class="control" name="expiry" type="date" value="${item.expiry || ''}"></label>
          </div>
          <div id="item-edit-error" class="form-error modal-error"></div>
        </div>
        <div class="modal-foot">
          <button class="button secondary" type="button" data-close>ยกเลิก</button>
          <button class="button primary" type="submit">${icon('check')} บันทึกการแก้ไข</button>
        </div>
      </form>
    </div>`;

  openModal(html, modal => {
    $('#item-edit-form', modal).addEventListener('submit', async e => {
      e.preventDefault();
      const btn = e.submitter;
      btn.disabled = true;
      const obj = Object.fromEntries(new FormData(e.currentTarget));
      try {
        await api(`/api/items/${item.id}`, { method: 'PUT', body: JSON.stringify(obj) });
        toast('บันทึกการแก้ไขรายการเรียบร้อย');
        closeModal();
        state.items = [];
        await loadItems();
        route();
      } catch (ex) {
        $('#item-edit-error').textContent = ex.message;
      } finally {
        btn.disabled = false;
      }
    });
  });
}

/* ══════════════════════════════════════════════════════════════
   6. DATA & INTEGRATION VIEW
   ══════════════════════════════════════════════════════════════ */
async function dataPage() {
  const d = await api('/api/master-data');

  $('#main-content').innerHTML = `
    ${pageHead('database', '', 'ข้อมูลและการเชื่อมต่อ', 'จัดการรายการกลาง พร้อมจุดเชื่อมต่อสำหรับระบบโรงพยาบาล', `<a class="button secondary" href="/api/v1/stock" target="_blank">${icon('plug')} ดู REST API</a><button class="button primary" id="new-item">${icon('plus')} เพิ่มรายการกลาง</button>`)}
    <div class="notice">${icon('info')}<div><strong>รองรับด้วย Integration Layer</strong><br>การเชื่อม HIS/HOSxP/ERP จริงต้องทำ data mapping และทดสอบกับ interface ของแต่ละโรงพยาบาลก่อน ไม่ควรเชื่อมฐานข้อมูลผลิตจริงโดยตรง</div></div>
    <div class="grid split-grid">
      <section class="card">
        <div class="card-head"><div><h2>ช่องทางเชื่อมต่อ</h2><p>มาตรฐานกลางสำหรับแลกเปลี่ยนข้อมูล</p></div></div>
        <div class="integration-grid">
          ${d.integrations.map(x => `
            <article class="integration-card">
              <div class="integration-logo">${icon(x.id === 'int-csv' ? 'file' : 'plug')}</div>
              <div>
                <h3>${esc(x.name)}</h3>
                <p>${esc(x.kind)} · ${esc(x.detail)}</p>
                <span class="status ${x.status}">${statusLabel(x.status)}</span>
              </div>
            </article>`).join('')}
        </div>
      </section>
      <section class="card">
        <div class="card-head"><div><h2>ข้อมูลระบบ</h2><p>แหล่งที่มาและขอบเขตต้นแบบ</p></div></div>
        <div class="meta-list">
          <div class="meta-row"><span>หน่วยงาน</span><strong>${esc(d.meta.organization)}</strong></div>
          <div class="meta-row"><span>คลัง</span><strong>${esc(d.meta.warehouse)}</strong></div>
          <div class="meta-row"><span>ไฟล์ต้นทาง</span><strong>${esc(d.meta.sourceWorkbook)}</strong></div>
          <div class="meta-row"><span>ชีตหลัก</span><strong>${esc(d.meta.sourceSheet)}</strong></div>
          <div class="meta-row"><span>รายการที่นำเข้า</span><strong>${fmt.format(state.items.length)} รายการ</strong></div>
        </div>
      </section>
    </div>
    <section class="card spaced-card">
      <div class="card-head"><div><h2>บันทึกตรวจสอบย้อนหลัง (Audit Trail)</h2><p>กิจกรรมสำคัญในระบบถูกเก็บแบบ append-only</p></div></div>
      <div class="audit-list">
        ${d.audit.map(a => `
          <div class="audit-row">
            <span>${icon('activity')}</span>
            <div><strong>${esc(a.detail)}</strong><small>${esc(a.action)} · ${esc(a.user)}</small></div>
            <time>${new Date(a.at).toLocaleString('th-TH', { dateStyle: 'medium', timeStyle: 'short' })}</time>
          </div>`).join('')}
      </div>
    </section>`;

  $('#new-item').addEventListener('click', () => openItemModal());
}

function openItemModal(onSuccess) {
  const html = `
    <div class="modal-backdrop" role="presentation">
      <form class="modal" id="item-form" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <div class="modal-head">
          <h2 id="modal-title">เพิ่มรายการกลาง</h2>
          <button class="icon-button" type="button" data-close aria-label="ปิด">${icon('close')}</button>
        </div>
        <div class="modal-body">
          <div class="notice warning">${icon('info')}<div>รายการใหม่จะเริ่มต้นที่ยอด 0 กรุณาใช้เมนูรับเข้าเพื่อเพิ่มจำนวนและล็อต</div></div>
          <div class="form-grid two">
            <label class="field compact"><span>รหัสรายการ <b class="required">*</b></span><input class="control" name="code" required placeholder="เช่น PCM-GPO-500"></label>
            <label class="field compact"><span>ชื่อรายการ <b class="required">*</b></span><input class="control" name="name" required placeholder="ชื่อยา/เวชภัณฑ์"></label>
            <label class="field compact"><span>หมวดหมู่ <b class="required">*</b></span><input class="control" name="category" list="category-list" required placeholder="ระบุหรือเลือกหมวด"><datalist id="category-list">${state.categories.map(x => `<option value="${esc(x)}">`).join('')}</datalist></label>
            <label class="field compact"><span>หน่วย <b class="required">*</b></span><input class="control" name="unit" required placeholder="กล่อง / ขวด / ชุด"></label>
            <label class="field compact"><span>รูปแบบบรรจุ</span><input class="control" name="package" placeholder="เช่น 50x10"></label>
            <label class="field compact"><span>จุดเตือนคงคลัง</span><input class="control" name="minQty" type="number" min="0" value="0"></label>
          </div>
          <div id="item-error" class="form-error modal-error"></div>
        </div>
        <div class="modal-foot">
          <button class="button secondary" type="button" data-close>ยกเลิก</button>
          <button class="button primary" type="submit">${icon('check')} บันทึกรายการ</button>
        </div>
      </form>
    </div>`;

  openModal(html, modal => {
    $('#item-form', modal).addEventListener('submit', async e => {
      e.preventDefault();
      const btn = e.submitter;
      btn.disabled = true;
      const obj = Object.fromEntries(new FormData(e.currentTarget));
      try {
        const res = await api('/api/items', { method: 'POST', body: JSON.stringify(obj) });
        toast('เพิ่มรายการกลางเรียบร้อย');
        closeModal();
        state.items = [];
        await loadItems();
        if (typeof onSuccess === 'function') {
          onSuccess(res.item);
        } else if (state.route === 'data') {
          await dataPage();
        }
      } catch (ex) {
        $('#item-error').textContent = ex.message;
      } finally {
        btn.disabled = false;
      }
    });
  });
}

init();

