# 🏗️ Architecture - AI Context OS v3

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                     CHROME EXTENSION                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │              POPUP (User Interface)                      │   │
│  │  ┌────────────────────────────────────────────────────┐  │   │
│  │  │ popup.html - Layout & Structure                   │  │   │
│  │  │ style.css - Styling & Theming                     │  │   │
│  │  │ popup.js - Event Handling & Logic                 │  │   │
│  │  └────────────────────────────────────────────────────┘  │   │
│  └──────────────────────────────────────────────────────────┘   │
│                              ↓                                    │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │           AI ENGINE (Intelligence Layer)                │   │
│  │  ┌────────────────────────────────────────────────────┐  │   │
│  │  │ ai-engine.js - Advanced Analysis                  │  │   │
│  │  │ • Intent Detection                                │  │   │
│  │  │ • Technical Recognition                           │  │   │
│  │  │ • Code Extraction                                 │  │   │
│  │  │ • Task Extraction                                 │  │   │
│  │  │ • Decision Tracking                               │  │   │
│  │  │ • Complexity Analysis                             │  │   │
│  │  └────────────────────────────────────────────────────┘  │   │
│  └──────────────────────────────────────────────────────────┘   │
│                              ↓                                    │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │         CONTENT SCRIPT (Data Extraction)               │   │
│  │  ┌────────────────────────────────────────────────────┐  │   │
│  │  │ content.js - ChatGPT Message Scraper              │  │   │
│  │  │ • DOM Parsing                                     │  │   │
│  │  │ • Message Extraction                              │  │   │
│  │  │ • Data Cleaning                                   │  │   │
│  │  │ • Metadata Extraction                             │  │   │
│  │  └────────────────────────────────────────────────────┘  │   │
│  └──────────────────────────────────────────────────────────┘   │
│                              ↓                                    │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │         STORAGE LAYER (Data Persistence)              │   │
│  │  ┌────────────────────────────────────────────────────┐  │   │
│  │  │ Chrome Local Storage                              │  │   │
│  │  │ • Projects                                        │  │   │
│  │  │ • Analytics                                       │  │   │
│  │  │ • Settings                                        │  │   │
│  │  └────────────────────────────────────────────────────┘  │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                    EXTERNAL SERVICES                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │              GROQ API (Optional)                         │   │
│  │  • AI-powered compression                              │   │
│  │  • Intelligent analysis                                │   │
│  │  • Model: Llama 3 8B                                   │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

## Data Flow

```
ChatGPT Conversation
        ↓
   [Extract]
   content.js scrapes messages
        ↓
   [Clean]
   Remove duplicates, normalize
        ↓
   [Analyze]
   AI Engine processes data
        ↓
   [Generate]
   Create structured output
        ↓
   [Export]
   TXT / JSON / Clipboard
        ↓
   [Continue]
   Use in other AI platforms
```

## Component Interaction

```
┌─────────────────────────────────────────────────────────────┐
│                    USER INTERACTION                         │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│ popup.js                                                    │
│ • Handles button clicks                                    │
│ • Manages UI state                                         │
│ • Coordinates components                                   │
└─────────────────────────────────────────────────────────────┘
                          ↓
        ┌─────────────────┼─────────────────┐
        ↓                 ↓                 ↓
   [Extract]         [Analyze]         [Store]
   content.js        ai-engine.js      storage
        ↓                 ↓                 ↓
   Messages          Structured        Projects
   Metadata          Data              Analytics
        ↓                 ↓                 ↓
        └─────────────────┼─────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│ Output Generation                                           │
│ • Format selection (TXT/JSON)                              │
│ • Multi-AI optimization                                    │
│ • Display in UI                                            │
└─────────────────────────────────────────────────────────────┘
                          ↓
        ┌─────────────────┼─────────────────┐
        ↓                 ↓                 ↓
    [Copy]            [Download]        [Save]
    Clipboard         File System       Storage
```

## File Structure

```
ai-context-exporter/
│
├── manifest.json
│   └── Extension configuration
│       • Permissions
│       • Host permissions
│       • Content scripts
│
├── popup.html
│   └── User interface layout
│       • Input fields
│       • Buttons
│       • Display areas
│
├── popup.js
│   └── Main application logic
│       • Event handlers
│       • Analytics
│       • Project management
│       • Export functions
│
├── ai-engine.js
│   └── Intelligence engine
│       • Intent detection
│       • Technical recognition
│       • Code extraction
│       • Task extraction
│       • Analysis functions
│
├── content.js
│   └── ChatGPT integration
│       • Message extraction
│       • DOM parsing
│       • Data cleaning
│       • Metadata extraction
│
├── style.css
│   └── User interface styling
│       • Colors & themes
│       • Layout
│       • Animations
│
├── background.js
│   └── Background tasks
│       • Storage management
│       • Cross-tab communication
│
└── Documentation
    ├── README.md - Full documentation
    ├── SETUP.md - Quick start
    ├── CONFIG.md - Configuration
    ├── FEATURES.md - Feature list
    └── ARCHITECTURE.md - This file
```

## Data Structures

### Message Object
```javascript
{
  text: "string",
  author: "user|assistant",
  timestamp: "number",
  hasCode: "boolean"
}
```

### Structured Data Object
```javascript
{
  summary: "string",
  intents: ["string"],
  technologies: ["string"],
  tasks: ["string"],
  decisions: ["string"],
  codeBlocks: [
    {
      code: "string",
      language: "string"
    }
  ],
  flow: {
    messageCount: "number",
    averageLength: "number",
    hasCode: "boolean",
    hasQuestions: "boolean",
    complexity: "string"
  },
  timestamp: "ISO string"
}
```

### Project Object
```javascript
{
  name: "string",
  content: "string",
  tags: ["string"],
  savedAt: "ISO string",
  structured: "Structured Data Object"
}
```

### Analytics Object
```javascript
{
  exports: "number",
  totalChatsProcessed: "number",
  sessions: [
    {
      timestamp: "number",
      duration: "number",
      chats: "number"
    }
  ]
}
```

## Processing Pipeline

```
Step 1: EXTRACTION
├── Query ChatGPT DOM
├── Extract messages
├── Clean data
└── Extract metadata

Step 2: ANALYSIS
├── Detect intent
├── Extract technologies
├── Extract code blocks
├── Extract tasks
├── Extract decisions
└── Calculate complexity

Step 3: GENERATION
├── Create summary
├── Format output
├── Generate AI prompts
└── Prepare export

Step 4: STORAGE
├── Save to Chrome storage
├── Update analytics
├── Cache results
└── Manage history

Step 5: OUTPUT
├── Display in UI
├── Enable export options
├── Provide continue buttons
└── Track metrics
```

## API Integration

### Groq API Flow
```
User Input
    ↓
Check API Key
    ↓
Format Request
    ├── Model: llama3-8b-8192
    ├── Messages: [system, user]
    └── Temperature: 0.3
    ↓
Send to Groq
    ↓
Parse Response
    ↓
Display Result
    ↓
Fallback to Local (if error)
```

## Error Handling

```
Try Extract
├── Success → Continue
└── Error
    ├── Log error
    ├── Show user message
    └── Suggest fixes

Try Analyze
├── Success → Continue
└── Error
    ├── Use defaults
    └── Continue with partial data

Try API Call
├── Success → Use result
└── Error
    ├── Log error
    └── Fallback to local processing
```

## Performance Optimization

```
Extraction: < 1 second
├── DOM query optimization
├── Efficient filtering
└── Minimal DOM traversal

Analysis: < 2 seconds
├── Regex pattern matching
├── Set-based deduplication
└── Efficient string operations

Generation: < 1 second
├── Template-based output
├── Cached calculations
└── Minimal re-computation

Total: < 4 seconds
```

## Security Architecture

```
User Data
    ↓
Local Processing
├── No external transmission
├── No cloud storage
└── User-controlled
    ↓
Optional API
├── User-provided key
├── HTTPS only
└── No data logging
    ↓
Storage
├── Chrome local storage
├── Encrypted by browser
└── User-controlled
```

## Scalability

```
Single Conversation
├── 10-100 messages
├── < 1 second processing
└── < 1 MB storage

Multiple Projects
├── 100+ projects
├── Efficient indexing
└── < 50 MB storage

Long-term Usage
├── 1000+ sessions
├── Automatic cleanup
└── Optimized queries
```

## Extension Lifecycle

```
Installation
    ↓
Load manifest.json
    ↓
Register content script
    ↓
Initialize storage
    ↓
Ready for use
    ↓
User opens ChatGPT
    ↓
Content script injected
    ↓
User clicks extension
    ↓
Popup opens
    ↓
User exports context
    ↓
Process and display
    ↓
User exports/saves
    ↓
Store in Chrome storage
```

## Browser APIs Used

```
chrome.tabs
├── Query active tab
└── Send messages

chrome.runtime
├── Message passing
└── Extension communication

chrome.storage
├── Local storage
├── Get/Set data
└── Persistent storage

DOM APIs
├── querySelector
├── querySelectorAll
└── innerText

Clipboard API
├── Copy to clipboard
└── Paste from clipboard

File API
├── Create blobs
├── Download files
└── Handle exports
```

## Deployment Architecture

```
Development
├── Local testing
├── Chrome dev mode
└── Console debugging

Production
├── Chrome Web Store
├── Auto-updates
└── User installation

User Environment
├── Chrome browser
├── ChatGPT website
└── Local storage
```

---

**Architecture designed for:**
- ✅ Performance
- ✅ Scalability
- ✅ Maintainability
- ✅ Security
- ✅ User Privacy
