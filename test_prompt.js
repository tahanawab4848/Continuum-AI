// Test PromptEngine from ai-engine.js
const fs = require('fs');
const path = require('path');
const enginePath = path.join(__dirname, 'ai-engine.js');
const PromptEngine = require('./ai-engine.js');
// Sample messages
const msgs = [
  {role: 'user', text: 'McKinsey.Org Forward Program... as a CS student should i do it'},
  {role: 'assistant', text: "That's an excellent and practical question. The short answer is: Probably not, unless you have a specific, non-traditional career goal.\n\nHere is a detailed breakdown..."},
  {role: 'user', text: 'mercor is waht?'},
  {role: 'assistant', text: "It sounds like you might be asking about Mercor (spelled M-E-R-C-O-R), which is a different organization from McKinsey.org...\n\n### What is Mercor?\nMercor is an AI-driven talent marketplace and recruiting platform..."}
];
console.log('Detected Tech:', PromptEngine.detectTech(msgs));
console.log('Detected Domain:', PromptEngine.detectDomain(msgs));
console.log('Prompt Built:\n', PromptEngine.buildPrompt(msgs, 'ChatGPT'));
