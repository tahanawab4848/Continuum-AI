// Continuum — Content Script v5
// Single responsibility: extract the visible conversation transcript, in order, correctly.
'use strict';

// ── Platform detection ────────────────────────────────────────────────────────
function detectPlatform() {
  const h = location.hostname;
  if (h.includes('chatgpt.com') || h.includes('openai.com')) return 'ChatGPT';
  if (h.includes('claude.ai'))          return 'Claude';
  if (h.includes('gemini.google.com')) return 'Gemini';
  if (h.includes('groq.com'))           return 'Groq';
  if (h.includes('perplexity.ai'))      return 'Perplexity';
  if (h.includes('mistral.ai'))         return 'Mistral';
  if (h.includes('deepseek.com'))       return 'DeepSeek';
  if (h.includes('poe.com'))            return 'Poe';
  if (h.includes('you.com'))            return 'You.com';
  if (h.includes('character.ai'))       return 'Character.AI';
  if (h.includes('huggingface.co'))     return 'HuggingFace';
  if (h.includes('copilot.microsoft'))  return 'Copilot';
  if (h.includes('bing.com'))           return 'Bing';
  return 'AI Chat';
}

// ── Helpers ───────────────────────────────────────────────────────────────────
const getText = el => {
  let text = (el?.innerText || el?.textContent || '').trim();
  
  // Blind Attachment Warnings
  const hasImage = el.querySelector('img, [style*="background-image"]');
  const hasFile = el.querySelector('[class*="file-"], [class*="attachment"], [aria-label*="file"]');
  
  if (hasImage) text += '\n\n[System Note: The User attached an image here. You cannot see it. Rely on text context.]';
  else if (hasFile && text.length < 50) text += '\n\n[System Note: The User attached a file here. You cannot see the raw file. Rely on text context.]';
  
  return text;
};

// True if an element is actually rendered on screen (not a hidden branch)
const isVisible = el =>
  !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length) &&
  getComputedStyle(el).visibility !== 'hidden' &&
  getComputedStyle(el).display !== 'none';

// DOM order comparator
const domOrder = (a, b) =>
  a.el.compareDocumentPosition(b.el) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1;

// Strip UI noise: copy buttons, timestamps, avatars, action menus
const NOISE = /^(copy|share|edit|delete|regenerate|retry|like|dislike|thumbs|report|flag|new chat|sign in|sign out|log in|settings|help|privacy|terms|loading|generating|thinking|typing|please wait)$/i;
const isNoise = t => NOISE.test(t.trim()) || t.trim().length < 2;

// ── Extraction strategies ─────────────────────────────────────────────────────

// Strategy 1: ChatGPT — uses `data-message-author-role` attribute (most reliable)
function extractChatGPT() {
  const els = document.querySelectorAll('[data-message-author-role]');
  if (!els.length) return null;
  const msgs = [];
  els.forEach(el => {
    if (!isVisible(el)) return;
    const role = el.getAttribute('data-message-author-role'); // 'user' | 'assistant'
    const text = getText(el);
    if (!isNoise(text)) msgs.push({ role, text, el });
  });
  return msgs.length ? msgs : null;
}

// Strategy 2: Claude — uses data-testid turn markers
function extractClaude() {
  const h = [...document.querySelectorAll('[data-testid="human-turn"]')].filter(isVisible);
  const a = [...document.querySelectorAll('[data-testid="assistant-turn"]')].filter(isVisible);
  if (!h.length && !a.length) return null;
  const all = [
    ...h.map(el => ({ role: 'user', el, text: getText(el) })),
    ...a.map(el => ({ role: 'assistant', el, text: getText(el) }))
  ].filter(m => !isNoise(m.text));
  return all.length ? all.sort(domOrder) : null;
}

// Strategy 3: Gemini
function extractGemini() {
  const u = [...document.querySelectorAll('.user-query-text, user-query, .query-text')].filter(isVisible);
  const a = [...document.querySelectorAll('.model-response-text, model-response, .response-content')].filter(isVisible);
  if (!u.length && !a.length) return null;
  const all = [
    ...u.map(el => ({ role: 'user', el, text: getText(el) })),
    ...a.map(el => ({ role: 'assistant', el, text: getText(el) }))
  ].filter(m => !isNoise(m.text));
  return all.length ? all.sort(domOrder) : null;
}

// Strategy 4: Generic — data-role / data-author / data-sender attributes
function extractDataAttrs() {
  const els = document.querySelectorAll('[data-role],[data-author],[data-sender],[data-message-role]');
  if (!els.length) return null;
  const msgs = [];
  els.forEach(el => {
    if (!isVisible(el)) return;
    const raw = (
      el.getAttribute('data-role') || el.getAttribute('data-author') ||
      el.getAttribute('data-sender') || el.getAttribute('data-message-role') || ''
    ).toLowerCase();
    const role = raw.includes('user') || raw.includes('human') ? 'user'
               : raw.includes('assistant') || raw.includes('bot') || raw.includes('ai') ? 'assistant'
               : null;
    if (!role) return;
    const text = getText(el);
    if (!isNoise(text)) msgs.push({ role, text, el });
  });
  return msgs.length ? msgs : null;
}

// Strategy 5: Generic — class name heuristics
function extractClassNames() {
  const USER_SELS = [
    '[class*="user-message"]','[class*="human-message"]','[class*="user-turn"]',
    '[class*="human-turn"]','[class*="user-bubble"]','[class*="from-user"]',
    '[class*="HumanMessage"]','[class*="UserMessage"]','[class*="message-user"]'
  ];
  const AI_SELS = [
    '[class*="assistant-message"]','[class*="bot-message"]','[class*="ai-message"]',
    '[class*="assistant-turn"]','[class*="bot-turn"]','[class*="ai-turn"]',
    '[class*="from-assistant"]','[class*="AssistantMessage"]','[class*="BotMessage"]',
    '[class*="response-message"]','[class*="model-message"]'
  ];
  const collect = (sels, role) =>
    sels.flatMap(s => [...document.querySelectorAll(s)].filter(isVisible).map(el => ({ role, el, text: getText(el) })));
  const all = [...collect(USER_SELS, 'user'), ...collect(AI_SELS, 'assistant')]
    .filter(m => !isNoise(m.text));
  return all.length ? all.sort(domOrder) : null;
}

// Strategy 6: Aria articles (Bing, Copilot, others)
function extractAria() {
  const els = document.querySelectorAll('article[aria-label],[role="article"]');
  if (!els.length) return null;
  const msgs = [];
  els.forEach(el => {
    if (!isVisible(el)) return;
    const label = (el.getAttribute('aria-label') || '').toLowerCase();
    const role = label.includes('user') || label.includes('you') ? 'user'
               : label.includes('assistant') || label.includes('copilot') || label.includes('ai') ? 'assistant'
               : null;
    if (!role) return;
    const text = getText(el);
    if (!isNoise(text)) msgs.push({ role, text, el });
  });
  return msgs.length ? msgs : null;
}

const STRATEGIES = [extractChatGPT, extractClaude, extractGemini, extractDataAttrs, extractClassNames, extractAria];

// ── Deduplication ─────────────────────────────────────────────────────────────
// Use DOM element identity as the primary key to avoid over-deduplication
function dedupe(msgs) {
  const seenEls  = new Set();
  const seenKeys = new Set();
  return msgs
    .filter(m => {
      if (m.el) {
        if (seenEls.has(m.el)) return false;
        seenEls.add(m.el);
        return true;
      }
      const key = m.text.substring(0, 120);
      if (seenKeys.has(key)) return false;
      seenKeys.add(key);
      return true;
    })
    .map(({ role, text }) => ({ role, text })); // strip the `el` reference
}

// ── Main extraction ───────────────────────────────────────────────────────────
function extractConversation() {
  for (const strategy of STRATEGIES) {
    try {
      const result = strategy();
      if (!result?.length) continue;
      const clean = dedupe(result);
      if (clean.length > 0) {
        
        // ── Claude Artifact / ChatGPT Canvas Extraction ──
        const artifactEl = document.querySelector('.font-claude-message, [data-testid="artifact-content"], .canvas-content, [data-testid="canvas"]');
        if (artifactEl && isVisible(artifactEl)) {
          clean.push({
            role: 'assistant',
            text: `[System Note: The assistant updated the Artifact/Canvas side-panel with the following content:]\n\n${getText(artifactEl)}`
          });
        }

        console.log(`[Continuum] "${strategy.name}" → ${clean.length} msgs`);
        return clean;
      }
    } catch (e) {
      console.warn(`[Continuum] "${strategy.name}" failed:`, e.message);
    }
  }
  return [];
}

// ── Message listener ──────────────────────────────────────────────────────────
chrome.runtime.onMessage.addListener((req, _sender, sendResponse) => {
  if (req.action !== 'EXTRACT') return;
  try {
    const platform = detectPlatform();
    const messages = extractConversation();
    console.log(`[Continuum] ${platform}: ${messages.length} messages extracted`);
    sendResponse({ ok: true, platform, messages });
  } catch (err) {
    console.error('[Continuum]', err);
    sendResponse({ ok: false, error: err.message, platform: detectPlatform(), messages: [] });
  }
});
