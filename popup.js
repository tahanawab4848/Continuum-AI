// AI Context Bridge — Popup v5
'use strict';

// ── DOM refs ──────────────────────────────────────────────────────────────────
const $          = id => document.getElementById(id);
const extractBtn = $('extractBtn');
const badge      = $('platformBadge');
const statusWrap = $('statusWrap');
const statusIcon = $('statusIcon');
const statusText = $('statusText');
const statsBar   = $('statsBar');
const outputWrap = $('outputWrap');
const output     = $('output');
const charCount  = $('charCount');
const actionBar  = $('actionBar');
const targetWrap = $('targetWrap');
const copyBtn    = $('copyBtn');
const clearBtn   = $('clearBtn');
const saveForm   = $('saveForm');
const saveBtn    = $('saveBtn');
const sessionList= $('sessionList');
const savedCount = $('savedCount');

// ── State ─────────────────────────────────────────────────────────────────────
let currentPrompt = '';
let currentMeta   = null;

// ── Helpers ───────────────────────────────────────────────────────────────────
const show = (...els) => els.forEach(el => el.classList.remove('hidden'));
const hide = (...els) => els.forEach(el => el.classList.add('hidden'));

function setStatus(icon, text, cls = '') {
  show(statusWrap);
  statusIcon.textContent = icon;
  statusText.textContent = text;
  statusWrap.className = `status-wrap ${cls}`.trim();
}

function setBadge(name) {
  badge.textContent = name || '—';
  badge.className   = (name && name !== '—') ? 'badge live' : 'badge';
}

function fmtCount(n) {
  if (n < 1000) return String(n);
  return (n / 1000).toFixed(1) + 'k';
}

const sGet = keys => new Promise(r => chrome.storage.local.get(keys, r));
const sSet = obj  => new Promise(r => chrome.storage.local.set(obj, r));
const sDel = key  => new Promise(r => chrome.storage.local.remove(key, r));

const sendMsg = (tabId, msg) => new Promise(resolve =>
  chrome.tabs.sendMessage(tabId, msg, r => resolve(chrome.runtime.lastError ? null : r))
);

// ── Extract button ─────────────────────────────────────────────────────────────
extractBtn.addEventListener('click', async () => {
  extractBtn.disabled = true;
  hide(statusWrap, statsBar, outputWrap, actionBar, targetWrap);
  setStatus('⚡', 'Connecting to page…', 'busy');

  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    // Inject content script if not already there (handles newly opened tabs)
    try {
      await chrome.scripting.executeScript({ target: { tabId: tab.id }, files: ['content.js'] });
    } catch (_) { /* already injected — safe to ignore */ }

    const resp = await sendMsg(tab.id, { action: 'EXTRACT' });

    // ── Connection failure ──
    if (!resp) {
      setStatus('❌', 'Cannot reach this page. Refresh the tab (F5) and try again.', 'err');
      return;
    }

    setBadge(resp.platform);

    // ── No messages found ──
    if (!resp.ok || !resp.messages?.length) {
      setStatus('⚠️', `No conversation found on ${resp.platform}. Open a chat, scroll to load all messages, then try again.`, 'err');
      return;
    }

    const msgs = resp.messages;
    const userCount = msgs.filter(m => m.role === 'user').length;
    const aiCount   = msgs.filter(m => m.role === 'assistant').length;

    setStatus('🧠', `Building prompt from ${msgs.length} messages…`, 'busy');

    // Build the continuation prompt
    const prompt = PromptEngine.buildPrompt(msgs, resp.platform);
    const intent = PromptEngine.detectIntent(msgs);
    const tech   = PromptEngine.detectTech(msgs);

    currentPrompt = prompt;
    currentMeta   = { platform: resp.platform, userCount, aiCount, intent, tech, total: msgs.length };

    // Show stats bar
    $('statTurns').textContent  = `${userCount}u / ${aiCount}ai`;
    $('statIntent').textContent = intent;
    $('statTech').textContent   = tech.slice(0, 3).join(', ') || 'no tech detected';
    show(statsBar);

    // Show output
    output.value = prompt;
    charCount.textContent = `${fmtCount(prompt.length)} chars`;
    show(outputWrap);

    // Show actions
    show(actionBar, targetWrap);
    show(saveForm);

    setStatus('✓', `${msgs.length} messages captured from ${resp.platform}`, 'ok');

    loadSessions();

  } catch (err) {
    console.error('[AI Context Bridge]', err);
    setStatus('❌', `Error: ${err.message}`, 'err');
  } finally {
    extractBtn.disabled = false;
  }
});

// ── Copy button ───────────────────────────────────────────────────────────────
copyBtn.addEventListener('click', async () => {
  if (!currentPrompt) return;
  await navigator.clipboard.writeText(currentPrompt);
  copyBtn.textContent = '✓ Copied!';
  copyBtn.classList.add('copied');
  setTimeout(() => {
    copyBtn.innerHTML = '<span>📋</span> Copy Prompt';
    copyBtn.classList.remove('copied');
  }, 2000);
});

// ── Clear button ──────────────────────────────────────────────────────────────
clearBtn.addEventListener('click', () => {
  currentPrompt = '';
  currentMeta   = null;
  output.value  = '';
  hide(outputWrap, actionBar, targetWrap, saveForm, statsBar, statusWrap);
  setBadge(null);
});

// ── Save session ──────────────────────────────────────────────────────────────
saveBtn.addEventListener('click', async () => {
  if (!currentPrompt) return;
  const rawName = $('sessionName').value.trim();
  const name    = rawName || `${currentMeta?.platform || 'Session'} · ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  await sSet({
    [`session::${Date.now()}`]: {
      name,
      prompt:   currentPrompt,
      meta:     currentMeta,
      savedAt:  new Date().toISOString()
    }
  });
  $('sessionName').value = '';
  loadSessions();
});

// ── Load sessions ─────────────────────────────────────────────────────────────
async function loadSessions() {
  const all   = await sGet(null);
  const keys  = Object.keys(all).filter(k => k.startsWith('session::'))
    .sort((a, b) => b.localeCompare(a)); // newest first

  savedCount.textContent = keys.length;
  sessionList.innerHTML  = '';

  if (!keys.length) {
    sessionList.innerHTML = '<div class="empty-msg">No saved sessions yet</div>';
    return;
  }

  keys.forEach(key => {
    const s   = all[key];
    const div = document.createElement('div');
    div.className = 'session-item';
    const date = new Date(s.savedAt).toLocaleDateString([], { month: 'short', day: 'numeric' });
    div.innerHTML = `
      <div class="session-name" title="${s.name}">${s.name}</div>
      <div class="session-meta">${s.meta?.platform || ''} · ${date}</div>
      <div class="session-del" data-key="${key}" title="Delete">✕</div>`;
    div.querySelector('.session-name').addEventListener('click', () => {
      currentPrompt    = s.prompt;
      currentMeta      = s.meta;
      output.value     = s.prompt;
      charCount.textContent = `${fmtCount(s.prompt.length)} chars`;
      setBadge(s.meta?.platform || '—');
      show(outputWrap, actionBar, targetWrap);
      setStatus('📂', `Loaded: ${s.name}`, 'ok');
    });
    div.querySelector('.session-del').addEventListener('click', async e => {
      e.stopPropagation();
      await sDel(key);
      loadSessions();
    });
    sessionList.appendChild(div);
  });
}

// ── Init ──────────────────────────────────────────────────────────────────────
loadSessions();
