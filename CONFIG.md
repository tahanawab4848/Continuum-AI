# ⚙️ Configuration Guide - AI Context OS v3

## Advanced Configuration

### 1. Groq API Setup

#### Get Your API Key
1. Visit https://console.groq.com
2. Sign up (free account)
3. Navigate to API Keys
4. Create new API key
5. Copy the key

#### Add to Extension
**File:** `popup.js`

Find this line (around line 50):
```javascript
"Authorization": "Bearer YOUR_GROQ_API_KEY",
```

Replace with:
```javascript
"Authorization": "Bearer gsk_YOUR_ACTUAL_KEY_HERE",
```

Example:
```javascript
"Authorization": "Bearer gsk_abc123def456ghi789jkl",
```

#### Verify Setup
1. Go to chrome://extensions/
2. Click refresh icon on extension
3. Open ChatGPT
4. Export context
5. Should see "🚀 Generating intelligent context..." message

### 2. Customize AI Engine

#### Modify Intent Detection
**File:** `ai-engine.js` (Line ~40)

Current intents:
```javascript
const intents = {
  'debugging': ['error', 'bug', 'fix', 'broken', 'not working', 'issue', 'problem'],
  'learning': ['how to', 'explain', 'teach', 'understand', 'learn', 'tutorial'],
  'coding': ['code', 'function', 'class', 'implement', 'write', 'script'],
  // ... more intents
};
```

Add custom intent:
```javascript
'devops': ['docker', 'kubernetes', 'deploy', 'ci/cd', 'pipeline', 'infrastructure'],
```

#### Add New Technologies
**File:** `ai-engine.js` (Line ~60)

Add to languages array:
```javascript
const languages = ['Python', 'JavaScript', 'TypeScript', 'Java', 'C++', 'Go', 'Rust', 'PHP', 'Ruby', 'Swift', 'Kotlin', 'SQL', 'Scala'];
```

Add to frameworks array:
```javascript
const frameworks = ['React', 'Vue', 'Angular', 'Django', 'Flask', 'Express', 'FastAPI', 'Spring', 'Node.js', 'Next.js', 'Svelte', 'Nuxt', 'Remix', 'SvelteKit'];
```

Add to databases array:
```javascript
const databases = ['PostgreSQL', 'MongoDB', 'MySQL', 'Redis', 'Firebase', 'DynamoDB', 'Elasticsearch', 'Cassandra', 'Neo4j'];
```

### 3. Customize UI

#### Change Color Scheme
**File:** `style.css`

Primary color (purple gradient):
```css
.primary {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

Change to blue:
```css
.primary {
    background: linear-gradient(135deg, #4a90d9 0%, #357abd 100%);
}
```

Change to green:
```css
.primary {
    background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
}
```

#### Modify Popup Width
**File:** `style.css` (Line 1)

Current:
```css
body {
    width: 350px;
}
```

Change to:
```css
body {
    width: 450px;  /* Wider popup */
}
```

#### Change Font
**File:** `style.css` (Line 3)

Current:
```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
```

Change to:
```css
font-family: 'Courier New', monospace;  /* Monospace */
```

### 4. Customize Output Format

#### Modify Summary Template
**File:** `popup.js` (Line ~250)

Current:
```javascript
let output = `📦 PROJECT CONTEXT PACK
======================
${tags}

🧠 EXECUTIVE SUMMARY:
${structured.summary}
...
```

Customize sections, emojis, or format as needed.

#### Add Custom Sections
Add to `generateIntelligentContext()` function:

```javascript
💼 BUSINESS CONTEXT:
${structured.intents.includes('startup') ? 'Startup-focused discussion' : 'General context'}

🔐 SECURITY CONSIDERATIONS:
${text.includes('security') ? 'Security discussed' : 'No security concerns mentioned'}
```

### 5. Customize Tags

#### Add New Tags
**File:** `popup.html` (Line ~30)

Current:
```html
<button class="tag-btn" data-tag="#coding">#coding</button>
<button class="tag-btn" data-tag="#study">#study</button>
<button class="tag-btn" data-tag="#startup">#startup</button>
<button class="tag-btn" data-tag="#debugging">#debugging</button>
```

Add new tags:
```html
<button class="tag-btn" data-tag="#devops">#devops</button>
<button class="tag-btn" data-tag="#security">#security</button>
<button class="tag-btn" data-tag="#performance">#performance</button>
<button class="tag-btn" data-tag="#documentation">#documentation</button>
```

### 6. Customize Analytics

#### Change Productivity Calculation
**File:** `popup.js` (Line ~120)

Current:
```javascript
calculateProductivity() {
    const sessions = this.tracks.sessions;
    if (sessions.length === 0) return 0;

    const recent = sessions.slice(-10);
    const avgChats = recent.reduce((acc, s) => acc + s.chats, 0) / recent.length;
    const avgDuration = recent.reduce((acc, s) => acc + s.duration, 0) / recent.length;

    const chatsPerMinute = avgChats / (avgDuration / 60000);
    return Math.min(100, Math.round(chatsPerMinute * 10));
}
```

Modify multiplier:
```javascript
return Math.min(100, Math.round(chatsPerMinute * 20));  // More aggressive scoring
```

### 7. Customize Content Extraction

#### Add New Selectors
**File:** `content.js` (Line ~10)

Current:
```javascript
let selectors = [
    "div[data-message-author-role]",
    "div.text-base",
    "div.markdown",
    "article",
    "div[role='article']"
];
```

Add new selector:
```javascript
let selectors = [
    "div[data-message-author-role]",
    "div.text-base",
    "div.markdown",
    "article",
    "div[role='article']",
    "div.message-container",  // New selector
    "div.chat-message"         // Another option
];
```

### 8. Advanced: Custom AI Models

#### Add New AI Platform
**File:** `ai-engine.js` (Line ~200)

Current:
```javascript
return {
    chatgpt: `...`,
    groq: `...`,
    claude: `...`,
    gemini: `...`,
    llama: `...`
};
```

Add new model:
```javascript
return {
    chatgpt: `...`,
    groq: `...`,
    claude: `...`,
    gemini: `...`,
    llama: `...`,
    mistral: `Task: ${summary}\n\nContinue with Mistral optimization:\n${context}`
};
```

### 9. Performance Optimization

#### Reduce Analysis Depth
**File:** `ai-engine.js` (Line ~40)

Limit intent detection:
```javascript
// Only check first 5 intents instead of all
const intents = Object.entries(intents).slice(0, 5);
```

#### Limit Task Extraction
**File:** `ai-engine.js` (Line ~100)

Current:
```javascript
return [...new Set(tasks)]; // All tasks
```

Change to:
```javascript
return [...new Set(tasks)].slice(0, 5); // Top 5 tasks only
```

### 10. Storage Management

#### Clear Old Sessions
**File:** `popup.js` (Line ~30)

Current:
```javascript
if (this.tracks.sessions.length > 100) {
    this.tracks.sessions = this.tracks.sessions.slice(-100);
}
```

Change to:
```javascript
if (this.tracks.sessions.length > 50) {  // Keep only 50 sessions
    this.tracks.sessions = this.tracks.sessions.slice(-50);
}
```

## Environment Variables

Create `.env` file (optional):
```
GROQ_API_KEY=gsk_your_key_here
ENABLE_ANALYTICS=true
MAX_SESSIONS=100
POPUP_WIDTH=350
```

## Debugging

### Enable Console Logging
**File:** `popup.js`

Add at top:
```javascript
const DEBUG = true;

function log(...args) {
    if (DEBUG) console.log(...args);
}
```

Use throughout:
```javascript
log("Analyzing context...", structuredData);
```

### Check Extension Errors
1. Go to chrome://extensions/
2. Find your extension
3. Click "Inspect views (popup)"
4. Check Console tab for errors

### Monitor Storage
In DevTools Console:
```javascript
chrome.storage.local.get(null, (items) => {
    console.log("Storage:", items);
});
```

## Backup & Restore

### Export All Data
```javascript
chrome.storage.local.get(null, (items) => {
    const json = JSON.stringify(items, null, 2);
    console.log(json);
    // Copy and save to file
});
```

### Import Data
```javascript
const data = { /* your exported data */ };
chrome.storage.local.set(data);
```

## Testing

### Test Intent Detection
```javascript
const test = AIEngine.detectIntent([
    "I have a bug in my React component",
    "The error is: Cannot read properties of undefined"
]);
console.log(test); // Should show ['debugging', 'coding']
```

### Test Code Extraction
```javascript
const test = AIEngine.extractCode(`
    \`\`\`python
    def hello():
        print("world")
    \`\`\`
`);
console.log(test); // Should extract code block
```

## Performance Metrics

Monitor performance:
```javascript
console.time("Export");
// ... export code ...
console.timeEnd("Export");
```

## Troubleshooting Configuration

### Changes Not Applied
1. Save file
2. Go to chrome://extensions/
3. Click refresh icon
4. Reload ChatGPT page

### API Key Not Working
1. Verify key format: `gsk_...`
2. Check Groq console for active key
3. Ensure internet connection
4. Check browser console for errors

### UI Not Updating
1. Clear Chrome cache
2. Hard refresh (Ctrl+Shift+R)
3. Reload extension
4. Restart Chrome

---

**Need help?** Check README.md or SETUP.md for more information.
