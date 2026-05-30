// Test PromptEngine from ai-engine.js
const fs = require('fs');
const path = require('path');
const enginePath = path.join(__dirname, 'ai-engine.js');
const { PromptEngine } = require('./ai-engine.js');
// Sample messages
const msgs = [
  {role: 'user', text: 'I get an error when running my Python script.'},
  {role: 'assistant', text: 'Can you share the error message?'},
  {role: 'user', text: 'Here is the traceback: ...'},
];
console.log('Detected Tech:', PromptEngine.detectTech(msgs));
console.log('Detected Intent:', PromptEngine.detectIntent(msgs));
console.log('Prompt Built:\n', PromptEngine.buildPrompt(msgs, 'ChatGPT'));
