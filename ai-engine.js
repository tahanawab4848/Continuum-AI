// AI Context Bridge — Prompt Engine v5
// Single responsibility: turn a raw transcript into a perfect continuation prompt.
'use strict';

const PromptEngine = {

  // ── Detect programming languages & frameworks ─────────────
  detectTech(msgs) {
    const text = msgs.map(m => m.text).join('\n');
    const found = [];
    const terms = {
      'Python':     /\bPython\b/i,
      'JavaScript': /\bJavaScript\b|\bJS\b/,
      'TypeScript': /\bTypeScript\b|\bTS\b/,
      'Java':       /\bJava\b(?!Script)/,
      'C#':         /\bC#(?![\w\+])/,
      'C++':        /\bC\+\+(?![\w\+])/,
      'Go':         /\bGolang\b|\bGo\b(?=\s+(?:language|program|code|module|package|func|import))/i,
      'Rust':       /\bRust\b/i,
      'PHP':        /\bPHP\b/i,
      'Swift':      /\bSwift\b/i,
      'Kotlin':     /\bKotlin\b/i,
      'Ruby':       /\bRuby\b/i,
      'Bash':       /\bBash\b|\bShell\b/i,
      'React':      /\bReact\b/,
      'Vue':        /\bVue\.?js\b/i,
      'Angular':    /\bAngular\b/,
      'Django':     /\bDjango\b/i,
      'Flask':      /\bFlask\b/i,
      'FastAPI':    /\bFastAPI\b/i,
      'Express':    /\bExpress\.?js\b/i,
      'Next.js':    /\bNext\.js\b/i,
      'Spring':     /\bSpring\b/,
      'Node.js':    /\bNode\.?js\b/i,
      'PostgreSQL': /\bPostgres(?:QL)?\b/i,
      'MongoDB':    /\bMongoDB\b/i,
      'MySQL':      /\bMySQL\b/i,
      'Redis':      /\bRedis\b/i,
      'Docker':     /\bDocker\b/i,
      'Kubernetes': /\bKubernetes\b|\bk8s\b/i,
      'AWS':        /\bAWS\b/,
      'Firebase':   /\bFirebase\b/i,
    };
    for (const [name, re] of Object.entries(terms)) {
      if (re.test(text)) found.push(name);
    }
    return found;
  },

  // ── Detect conversation domain (Versatility Upgrade) ────────────
  detectDomain(msgs) {
    // Focus on the last few messages for the most current intent
    const recentText = msgs.slice(-4).map(m => m.text.toLowerCase()).join(' ');
    
    // Non-coding domains
    if (/\b(chapter|story|character|plot|poem|essay|novel|fiction|creative|script)\b/.test(recentText)) return 'creative writing';
    if (/\b(csv|dataset|excel|spreadsheet|dataframe|pandas|statistics|chart|graph)\b/.test(recentText)) return 'data analysis';
    if (/\b(translate|translation|language|spanish|french|german|grammar)\b/.test(recentText)) return 'translation';
    if (/\b(roleplay|act as|persona|pretend you are|adventure)\b/.test(recentText)) return 'roleplay';
    if (/\b(brainstorm|ideas|suggestions|list some|come up with)\b/.test(recentText)) return 'brainstorming';
    
    // Technical domains
    if (/\b(error|bug|fix|not working|crash|traceback|exception|failed)\b/.test(recentText)) return 'debugging';
    if (/\b(deploy|ci\/cd|server|aws|docker|kubernetes|pipeline|hosting)\b/.test(recentText)) return 'devops';
    if (/\b(test|unit test|mock|jest|pytest|coverage)\b/.test(recentText)) return 'testing';
    if (/\b(function|component|api|database|code|script|html|css|repository)\b/.test(recentText)) return 'software development';
    
    return 'general discussion';
  },

  // ── Advanced Intelligence Heuristics ───────────────────────────
  
  detectFiles(msgs) {
    const text = msgs.map(m => m.text).join('\n');
    const fileRegex = /(?:^|\s)((?:\.\/|\/|[a-zA-Z0-9_-]+\/)*[a-zA-Z0-9_-]+\.(?:js|ts|jsx|tsx|py|html|css|json|java|go|rs|php|yml|yaml|md|cpp|c|h|csv|xlsx|pdf))(?=\s|$|[.,:;])/g;
    const files = new Set();
    let match;
    while ((match = fileRegex.exec(text)) !== null) {
      if (match[1].length > 3) files.add(match[1]);
    }
    return [...files].slice(0, 15); // limit to avoid massive lists
  },

  detectCutoff(msgs) {
    if (!msgs.length) return false;
    const lastMsg = msgs[msgs.length - 1];
    if (lastMsg.role === 'assistant') {
      const ticks = (lastMsg.text.match(/```/g) || []).length;
      return ticks % 2 !== 0; // Odd number of triple backticks means a code block was opened but never closed!
    }
    return false;
  },

  detectPendingErrors(msgs) {
    const lastMsgs = msgs.slice(-2).map(m => m.text).join('\n');
    return /(?:error|exception|traceback|failed|fatal|warn|not defined|syntaxerror|typeerror|referenceerror):?/i.test(lastMsgs);
  },

  // ── Build the final prompt ───────────────────────────────────────────────────
  buildPrompt(msgs, platform, options = {}) {
    if (!msgs.length) return '';

    const tech = this.detectTech(msgs);
    const domain = this.detectDomain(msgs);
    const files = this.detectFiles(msgs);
    const isCutoff = this.detectCutoff(msgs);
    const hasErrors = this.detectPendingErrors(msgs);
    const prevAI = platform || 'another AI';
    
    const contextFlags = [];
    if (tech.length && domain.includes('develop') || domain === 'debugging') contextFlags.push(`Tech Stack: ${tech.join(', ')}`);
    if (files.length) contextFlags.push(`Active Files: ${files.join(', ')}`);
    if (hasErrors && domain !== 'creative writing') contextFlags.push(`Status: PENDING ERRORS DETECTED`);
    
    // Tailor the Context Mastery directive to the domain
    let masteryDirective = `1. CONTEXT MASTERY: Carefully analyze the transcript below to understand the ongoing discussion and advice provided so far.`;
    if (domain === 'software development' || domain === 'debugging' || domain === 'devops' || domain === 'testing') {
      masteryDirective = `1. CONTEXT MASTERY: Carefully analyze the transcript below to understand the architecture, code already implemented, and technical goals.`;
    } else if (domain === 'creative writing') {
      masteryDirective = `1. CONTEXT MASTERY: Carefully analyze the transcript below to understand the tone, characters, plot progression, and creative direction.`;
    } else if (domain === 'data analysis') {
      masteryDirective = `1. CONTEXT MASTERY: Carefully analyze the transcript below to understand the dataset structure, analytical goals, and insights drawn so far.`;
    } else if (domain === 'roleplay') {
      masteryDirective = `1. CONTEXT MASTERY: Carefully analyze the transcript below to perfectly adopt the exact persona, tone, and world-rules established.`;
    }

    if (options.strict) {
      masteryDirective = `1. STRICT MODE: You must ONLY output code or direct answers. Do not write any pleasantries or introductory text.`;
    }

    const preamble = [
      `*** SYSTEM CONTEXT: SEAMLESS SESSION CONTINUATION ***`,
      `You are taking over an interrupted ${domain} session from ${prevAI}.`,
      contextFlags.length > 0 ? `\n[WORKSPACE MEMORY]` : '',
      ...contextFlags.map(f => `- ${f}`),
      ``,
      `YOUR DIRECTIVES:`,
      masteryDirective,
      `2. FLAWLESS CONTINUATION: DO NOT restart the conversation or project. Pick up exactly where the transcript ends.`,
      isCutoff ? `3. CRITICAL CUTOFF RECOVERY: The previous assistant hit a length limit and was CUT OFF mid-generation. Your FIRST task is to provide the exact remainder of the cut-off text/code without any preamble.` : `3. SYNCHRONIZATION: Begin your response by stating your precise understanding of the current state and the immediate next step.`,
      hasErrors && domain !== 'creative writing' ? `4. ERROR RESOLUTION: Focus your attention on fixing the pending errors mentioned at the end of the transcript before continuing with new features.` : `4. EXECUTION: Proceed immediately to provide the next required step or answer the final prompt.`,
      ``,
      `--- BEGIN PREVIOUS TRANSCRIPT ---`
    ].filter(line => line !== '').join('\n');

    let transcriptMsgs = msgs;
    let compressionNote = '';

    // Smart Token Compression
    if (options.compress && msgs.length > 20) {
      const omitted = msgs.length - 15;
      transcriptMsgs = [msgs[0], ...msgs.slice(-15)]; // Keep first msg for context, and last 15
      compressionNote = `\n[System Note: Smart Token Compression enabled. ${omitted} older messages have been omitted to preserve your context limits. The conversation started with the first message below, and jumps to the final 15 turns.]\n\n`;
    }

    const transcript = compressionNote + transcriptMsgs.map(m => {
      const label = m.role === 'user' ? 'User' : 'Previous Assistant';
      return `${label}:\n${m.text}`;
    }).join('\n\n');

    // Determine explicit next steps based on who spoke last
    const lastRole = msgs[msgs.length - 1].role;
    let nextStepInstruction = '';
    
    if (isCutoff || options.strict) {
      nextStepInstruction = `[System: CRITICAL - Resume output EXACTLY where they stopped. Do not write introductory text. Start immediately with the continuation.]`;
    } else if (lastRole === 'user') {
      nextStepInstruction = `[System: You are now fully synchronized. Please respond directly to the User's final message above to continue the task.]`;
    } else {
      nextStepInstruction = `[System: You are now fully synchronized. The previous assistant just finished responding. Briefly summarize the current state and explicitly ask the User how they would like to proceed next.]`;
    }

    const postamble = [
      `--- END PREVIOUS TRANSCRIPT ---`,
      ``,
      nextStepInstruction,
      ``,
      `New Assistant:`
    ].join('\n');

    return `${preamble}\n\n${transcript}\n\n${postamble}`;
  }
};

// Export PromptEngine for Node.js usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = PromptEngine;
}
