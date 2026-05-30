# 🌍 Universal AI Platform Support - AI Context OS v3.1

## Overview

**AI Context OS v3.1** now works with **ALL AI agent websites** - not just ChatGPT. The extension uses intelligent detection and multiple extraction strategies to work across any AI platform.

---

## 🎯 Supported Platforms

### Major AI Platforms
- ✅ **ChatGPT** (chat.openai.com, chatgpt.com)
- ✅ **Claude** (claude.ai)
- ✅ **Google Gemini** (gemini.google.com)
- ✅ **Groq** (groq.com)
- ✅ **Perplexity** (perplexity.ai)
- ✅ **HuggingFace** (huggingface.co)
- ✅ **Cohere** (cohere.com)
- ✅ **Replicate** (replicate.com)
- ✅ **Together AI** (together.ai)
- ✅ **Mistral** (mistral.ai)
- ✅ **DeepSeek** (deepseek.com)
- ✅ **Poe** (poe.com)
- ✅ **You.com** (you.com)
- ✅ **Bing Chat** (bing.com)
- ✅ **Ollama** (local)
- ✅ **Llama.cpp** (local)
- ✅ **Vicuna** (lmsys.org)
- ✅ **Gradio Apps** (gradio.app)
- ✅ **HuggingFace Spaces** (huggingface.co/spaces)

### And Many More!
The extension works with any website that has AI conversations, including:
- Custom AI implementations
- Local LLM interfaces
- Research platforms
- Enterprise AI tools
- Open-source AI frontends

---

## 🔧 How It Works

### Platform Detection
The extension automatically detects which AI platform you're using:

```javascript
function detectPlatform() {
  const hostname = window.location.hostname;
  
  if (hostname.includes('openai.com')) return 'ChatGPT';
  if (hostname.includes('claude.ai')) return 'Claude';
  if (hostname.includes('gemini.google.com')) return 'Gemini';
  // ... and more
}
```

### Multi-Strategy Message Extraction

The extension uses **3 intelligent strategies** to extract messages:

#### Strategy 1: DOM Selectors
Tries 30+ common CSS selectors used by different platforms:
- `div[data-message-author-role]` (ChatGPT)
- `div[data-testid='message']` (Claude)
- `div[data-message-id]` (Gemini)
- Generic: `article`, `div.message`, `div.chat`, etc.

#### Strategy 2: Fallback Text Extraction
If no messages found, extracts visible page text:
```javascript
const bodyText = document.body.innerText;
if (bodyText && bodyText.length > 50) {
  messages.push(bodyText);
}
```

#### Strategy 3: Input/Output Pairs
Looks for input fields and output containers:
```javascript
const inputs = document.querySelectorAll('input[type="text"], textarea');
const outputs = document.querySelectorAll('[role="status"], [role="log"]');
```

### Smart Cleaning
Removes:
- Duplicate messages
- UI elements (buttons, menus)
- Loading indicators
- Common noise patterns

---

## 📊 Platform-Specific Features

### ChatGPT
- ✅ Full message extraction
- ✅ Code block detection
- ✅ Conversation history
- ✅ Multi-turn support

### Claude
- ✅ Message extraction
- ✅ Code preservation
- ✅ Long context support
- ✅ Artifact detection

### Gemini
- ✅ Conversation extraction
- ✅ Multi-turn support
- ✅ Code block handling
- ✅ Image context (text only)

### Groq
- ✅ Fast response extraction
- ✅ Model selection tracking
- ✅ API response parsing
- ✅ Performance metrics

### Perplexity
- ✅ Search results extraction
- ✅ Source tracking
- ✅ Citation preservation
- ✅ Multi-source context

### Local Platforms (Ollama, Llama.cpp)
- ✅ Local model detection
- ✅ Conversation history
- ✅ Model info extraction
- ✅ Performance tracking

---

## 🚀 Usage Across Platforms

### Same Process for All Platforms

1. **Open any AI website**
   ```
   ChatGPT, Claude, Gemini, Groq, etc.
   ```

2. **Have a conversation**
   ```
   Ask questions, get responses
   ```

3. **Click extension icon**
   ```
   🧠 AI Context OS appears
   ```

4. **Click "Intelligent Export"**
   ```
   Extension detects platform automatically
   ```

5. **View analyzed context**
   ```
   Platform name shown in output
   ```

6. **Export or continue**
   ```
   Copy, download, or save
   ```

---

## 🔍 Platform Detection in Action

When you export, the extension shows:

```
🧠 Analyzing ChatGPT conversation...
🚀 Generating intelligent context from ChatGPT...

📦 PROJECT CONTEXT PACK
======================

Platform: ChatGPT
Messages: 15
Complexity: High
```

Or for Claude:

```
🧠 Analyzing Claude conversation...
🚀 Generating intelligent context from Claude...

📦 PROJECT CONTEXT PACK
======================

Platform: Claude
Messages: 12
Complexity: Medium
```

---

## 💡 Smart Features Across All Platforms

### Intent Detection
Works on all platforms:
- Debugging
- Learning
- Coding
- Design
- Documentation
- Optimization
- Testing

### Technology Recognition
Detects across all platforms:
- 18+ Programming languages
- 18+ Frameworks
- 9+ Databases
- Tools and libraries

### Code Extraction
Works on all platforms:
- Language detection
- Multiple blocks
- Formatting preservation
- Syntax highlighting

### Task Extraction
Identifies on all platforms:
- TODO items
- Action items
- Next steps
- Pending tasks

### Decision Tracking
Captures on all platforms:
- Architecture decisions
- Technology choices
- Implementation approaches
- Best practices

---

## 🔄 Multi-AI Continuation

Export from one platform, continue in another:

### Example Workflow

1. **Start on ChatGPT**
   ```
   Ask: "Build a Python calculator"
   Get: Full implementation
   ```

2. **Export context**
   ```
   Click "🧠 Intelligent Export"
   Get: Structured context
   ```

3. **Continue in Claude**
   ```
   Click "Claude" button
   Paste in Claude
   Continue with deep analysis
   ```

4. **Then try Gemini**
   ```
   Click "Gemini" button
   Paste in Gemini
   Get different perspective
   ```

5. **Finally use Groq**
   ```
   Click "Groq" button
   Paste in Groq
   Get fast iteration
   ```

---

## 🛠️ Customization for New Platforms

### Add Custom Platform Detection

Edit `content.js`:

```javascript
function detectPlatform() {
  const hostname = window.location.hostname;
  
  // Add your platform
  if (hostname.includes('myai.com')) return 'My AI Platform';
  
  return 'Unknown AI Platform';
}
```

### Add Custom Selectors

Edit `content.js`:

```javascript
const selectors = [
  // Your custom selectors
  "div.my-message-class",
  "div[data-my-message-id]",
  "div.my-chat-container",
  // ... existing selectors
];
```

### Add Custom Cleaning Rules

Edit `content.js`:

```javascript
const excludePatterns = [
  'My Custom UI Element',
  'My Loading Text',
  'My Button Label',
  // ... existing patterns
];
```

---

## 📈 Analytics Across Platforms

Track usage across all platforms:

```
📊 Analytics
═══════════════════════════════════════════════════════════════════════════

Exports:      25
Chats:        150
Sessions:     25
Productivity: 85%

Breakdown by Platform:
• ChatGPT:    12 exports
• Claude:     8 exports
• Gemini:     3 exports
• Groq:       2 exports
```

---

## 🔐 Security & Privacy

### All Platforms
- ✅ Local processing only
- ✅ No data sent to external servers
- ✅ No tracking
- ✅ User data privacy
- ✅ Optional Groq API (user-controlled)

### Platform-Specific
- ✅ Respects platform terms of service
- ✅ No API abuse
- ✅ No automated scraping
- ✅ Manual export only

---

## 🐛 Troubleshooting Multi-Platform

### Platform Not Detected

**Problem:** Extension shows "Unknown AI Platform"

**Solution:**
1. Check if platform is in supported list
2. Refresh the page
3. Reload extension
4. Check browser console for errors

### Messages Not Extracted

**Problem:** "No messages found"

**Solution:**
1. Start a conversation first
2. Scroll to load all messages
3. Make sure messages are visible
4. Try different platform
5. Check if UI has changed

### Partial Extraction

**Problem:** Only some messages extracted

**Solution:**
1. Scroll to load all messages
2. Wait for page to fully load
3. Try refreshing
4. Check if messages are in expected format

### Platform-Specific Issues

**ChatGPT:** Refresh page, reload extension
**Claude:** Wait for full load, scroll to bottom
**Gemini:** May need to scroll, check visibility
**Local (Ollama):** Ensure server is running

---

## 🌟 Best Practices

### For All Platforms

1. **Start conversations first**
   - Have at least 5-10 exchanges
   - More context = better analysis

2. **Scroll to load messages**
   - Some platforms lazy-load
   - Scroll to bottom before export

3. **Wait for full load**
   - Let page fully render
   - Wait for responses to complete

4. **Use descriptive names**
   - "Python Calculator - ChatGPT - Jan 2024"
   - "Claude Analysis - Architecture Design"

5. **Tag by platform**
   - #chatgpt, #claude, #gemini
   - #local, #groq, #perplexity

6. **Export frequently**
   - Capture progress
   - Build history
   - Track across platforms

---

## 📚 Platform-Specific Guides

### ChatGPT
- Works best with long conversations
- Preserves code blocks perfectly
- Handles multi-turn well

### Claude
- Great for deep analysis
- Preserves artifacts
- Long context support

### Gemini
- Good for multi-modal context
- Handles images (text extracted)
- Fast processing

### Groq
- Fastest extraction
- Best for quick iterations
- Minimal overhead

### Local (Ollama/Llama.cpp)
- Works offline
- No API needed
- Full privacy

---

## 🚀 Advanced Usage

### Cross-Platform Workflow

```
1. ChatGPT: Initial brainstorm
   ↓
2. Claude: Deep analysis
   ↓
3. Gemini: Alternative perspective
   ↓
4. Groq: Fast iteration
   ↓
5. Combine insights
```

### Platform Comparison

```
Same question on different platforms:
• ChatGPT: Detailed, step-by-step
• Claude: Analytical, thorough
• Gemini: Creative, diverse
• Groq: Fast, concise
```

### Multi-Platform Projects

```
Save projects from each platform:
• #chatgpt-brainstorm
• #claude-analysis
• #gemini-creative
• #groq-iteration
```

---

## 📊 Supported Selectors

The extension tries 30+ selectors:

```javascript
// ChatGPT
"div[data-message-author-role]"
"div.text-base"
"div.markdown"

// Claude
"div[data-testid='message']"
"div.message"

// Gemini
"div[data-message-id]"
"div.message-container"

// Generic
"article"
"div[role='article']"
"div.conversation"
"div.chat"
"div.messages"
// ... and 20+ more
```

---

## 🎯 Version History

### v3.1 (Current)
- ✅ Universal platform support
- ✅ Platform detection
- ✅ Multi-strategy extraction
- ✅ 20+ platforms supported

### v3.0
- Intelligent AI Engine
- Advanced analysis
- Multi-AI optimization

### v2.0
- Project management
- Tag system
- Analytics

### v1.0
- Basic export
- Copy functionality

---

## 🔮 Future Enhancements

- [ ] More platform detection
- [ ] Custom selector UI
- [ ] Platform-specific optimizations
- [ ] Cross-platform sync
- [ ] Platform comparison tools
- [ ] Automated platform detection
- [ ] Platform-specific templates

---

## 📞 Support

### For Platform Issues
1. Check UNIVERSAL_SUPPORT.md (this file)
2. Check troubleshooting section
3. Check browser console for errors
4. Try different platform
5. Reload extension

### For New Platforms
1. Check if platform is supported
2. Try generic selectors
3. Check browser console
4. Report platform for future support

---

## 🎉 Summary

**AI Context OS v3.1** is now truly universal:

✅ Works with 20+ AI platforms
✅ Automatic platform detection
✅ Multi-strategy extraction
✅ Same features across all platforms
✅ Cross-platform continuation
✅ Privacy-first design
✅ Production-ready

**Use it anywhere, continue everywhere!**

---

**Version:** 3.1
**Status:** ✅ Universal Support
**Platforms:** 20+
**Quality:** Production-Ready

Built with 🧠 for all AI enthusiasts
