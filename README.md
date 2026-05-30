# 🧠 AI Context OS v3 - Intelligent Context Engine

## Overview
AI Context OS is an advanced Chrome extension that intelligently extracts, analyzes, and transforms **ANY AI conversation** into precise, actionable context that can be seamlessly continued across any AI platform.

**Works with 20+ AI platforms:** ChatGPT, Claude, Gemini, Groq, Perplexity, HuggingFace, Cohere, Mistral, DeepSeek, Poe, You.com, Bing, Ollama, and many more!

## 🚀 Key Features

### 1. **Intelligent Context Analysis**
- **Intent Detection**: Automatically identifies conversation purpose (debugging, learning, coding, design, etc.)
- **Technical Term Extraction**: Recognizes programming languages, frameworks, and databases
- **Code Block Extraction**: Isolates and preserves all code snippets with language detection
- **Task Extraction**: Identifies action items and TODO items from conversation
- **Decision Tracking**: Captures key decisions made during the conversation

### 2. **Precision Context Generation**
- **Executive Summary**: Concise overview of conversation focus
- **Complexity Analysis**: Rates conversation complexity (Low/Medium/High/Very High)
- **Metrics Dashboard**: Shows message count, average length, and conversation flow
- **Multi-AI Optimization**: Generates tailored prompts for ChatGPT, Groq, Claude, Gemini, and Llama

### 3. **Project Management**
- **Save/Load Projects**: Store multiple conversation contexts locally
- **Tag System**: Organize projects with custom tags (#coding, #study, #startup, #debugging)
- **JSON Export**: Export structured data with all analysis
- **TXT Export**: Download plain text for easy sharing

### 4. **Analytics & Productivity**
- **Export Tracking**: Monitor total exports and chats processed
- **Session Analytics**: Track conversation duration and complexity
- **Productivity Score**: Calculate efficiency based on chats per minute
- **Historical Data**: Keep last 100 sessions for trend analysis

### 5. **Multi-AI Continuation**
- **ChatGPT**: Optimized for detailed explanations
- **Groq**: Fast iteration mode
- **Claude**: Deep analysis and reasoning
- **Gemini**: Practical examples
- **Llama**: Efficient processing

## 📊 How It Works

### Step 1: Extract
- Opens ChatGPT conversation
- Intelligently scrapes all messages
- Cleans and deduplicates content

### Step 2: Analyze
- Detects conversation intent
- Extracts code, tasks, and decisions
- Identifies technologies used
- Calculates complexity metrics

### Step 3: Generate
- Creates structured output
- Generates executive summary
- Produces multi-AI optimized prompts
- Packages everything for export

### Step 4: Continue
- Copy prompt to any AI platform
- Maintain full context
- Continue work seamlessly

## 🎯 Use Cases

### 1. **Debugging Sessions**
- Extract error context
- Identify solutions discussed
- Continue debugging in different AI
- Track debugging decisions

### 2. **Learning & Tutorials**
- Capture learning objectives
- Extract code examples
- Identify key concepts
- Generate study guides

### 3. **Project Development**
- Track architecture decisions
- Extract code snippets
- Identify tech stack
- Monitor progress

### 4. **Code Review**
- Capture feedback
- Extract improvement suggestions
- Track decisions
- Generate action items

## 🔧 Installation

1. **Download Extension**
   - Clone or download the extension folder

2. **Load in Chrome**
   - Go to `chrome://extensions/`
   - Enable "Developer Mode" (top right)
   - Click "Load unpacked"
   - Select the `ai-context-exporter` folder

3. **Configure (Optional)**
   - Add Groq API key for AI compression
   - Replace `YOUR_GROQ_API_KEY` in `popup.js`

## 📖 Usage Guide

### Basic Export
1. Have a conversation on ChatGPT
2. Click extension icon
3. Click "🧠 Intelligent Export"
4. View analyzed context
5. Copy, download, or save

### Save Project
1. Enter project name
2. Select tags
3. Click "💾 Save Project"
4. Access from "Saved Projects" section

### Continue in Another AI
1. Export context
2. Click desired AI button (ChatGPT/Groq/Claude)
3. Prompt copied to clipboard
4. Paste in target AI platform

### Export Formats
- **TXT**: Plain text for sharing
- **JSON**: Structured data with analysis
- **Copy**: Direct clipboard copy

## 🧠 AI Engine Capabilities

### Intent Detection
Identifies conversation purpose:
- Debugging
- Learning
- Coding
- Design
- Documentation
- Optimization
- Testing

### Technical Recognition
Detects:
- Programming languages (Python, JavaScript, TypeScript, etc.)
- Frameworks (React, Vue, Django, etc.)
- Databases (PostgreSQL, MongoDB, etc.)
- Tools and libraries

### Task Extraction
Finds:
- TODO items
- Action items
- Next steps
- Pending tasks

### Decision Tracking
Captures:
- Architecture decisions
- Technology choices
- Implementation approaches
- Best practices

## 📊 Analytics

### Tracked Metrics
- **Exports**: Total number of exports
- **Chats**: Total messages processed
- **Sessions**: Number of export sessions
- **Productivity**: Chats per minute efficiency

### Productivity Score
Calculated as:
```
Score = (Avg Chats per Session / Avg Duration) × 10
Max: 100%
```

## 🔐 Privacy & Security

- **Local Storage**: All data stored locally in Chrome
- **No Cloud Sync**: Optional (can be added)
- **No Tracking**: No external analytics
- **API Key**: Optional, only for Groq compression

## 🚀 Advanced Features

### Groq API Integration
For AI-powered compression:
1. Get Groq API key from https://console.groq.com
2. Replace `YOUR_GROQ_API_KEY` in popup.js
3. Extension will use Groq for intelligent compression

### Structured Output
JSON export includes:
```json
{
  "project": "Project Name",
  "tags": ["#coding", "#debugging"],
  "exportedAt": "2024-01-01T12:00:00Z",
  "context": "Full context text",
  "structured": {
    "summary": "...",
    "intents": ["debugging", "coding"],
    "technologies": ["Python", "React"],
    "tasks": ["..."],
    "decisions": ["..."],
    "codeBlocks": [...],
    "flow": {...}
  }
}
```

## 🐛 Troubleshooting

### Extension Not Showing
- Refresh ChatGPT page
- Reload extension in chrome://extensions/
- Check manifest.json is valid

### No Messages Extracted
- Ensure you're on ChatGPT (chat.openai.com or chatgpt.com)
- Start a conversation first
- ChatGPT UI may have changed - check console for errors

### API Not Working
- Verify Groq API key is correct
- Check internet connection
- Extension falls back to local processing

### Storage Issues
- Clear Chrome cache
- Check available storage space
- Reset analytics if needed

## 📈 Future Enhancements

- Cloud sync with Google login
- Team collaboration features
- AI workflow automation
- Multi-model routing
- Auto project generator
- Browser history integration
- Conversation search
- Advanced filtering

## 💡 Tips & Tricks

1. **Tag Organization**: Use consistent tags for easy filtering
2. **Project Naming**: Use descriptive names with dates
3. **Regular Exports**: Export frequently to capture progress
4. **Multi-AI Testing**: Test same context in different AIs
5. **Analytics Review**: Check productivity score weekly

## 🤝 Support

For issues or suggestions:
1. Check troubleshooting section
2. Review console errors (Inspect popup)
3. Verify ChatGPT page is supported
4. Check extension permissions

## 📄 License

MIT License - Free to use and modify

## 🎉 Version History

### v3.0 (Current)
- Intelligent AI Engine
- Advanced context analysis
- Multi-AI optimization
- Structured output
- Enhanced analytics

### v2.0
- Project management
- Tag system
- JSON export
- Analytics dashboard

### v1.0
- Basic context export
- Copy functionality
- Simple UI

---

**Made with 🧠 for AI enthusiasts and developers**
