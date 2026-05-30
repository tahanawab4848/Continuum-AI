// AI Context Bridge — Prompt Engine v5
// Single responsibility: turn a raw transcript into a perfect continuation prompt.
'use strict';

const PromptEngine = {

  // ── Detect programming languages & frameworks actually mentioned ─────────────
  detectTech(msgs) {
    const text = msgs.map(m => m.text).join('\n');
    const found = [];
    const terms = {
      // Languages — strict word boundaries only
      'Python':     /\bPython\b/i,
      'JavaScript': /\bJavaScript\b|\bJS\b/,
      'TypeScript': /\bTypeScript\b|\bTS\b/,
      'Java':       /\bJava\b(?!Script)/,
      'C#':         /\bC#\b/,
      'C\+\+':      /\bC\+\+\b/,
      'Go':         /\bGolang\b|\bGo\b(?=\s+(?:language|program|code|module|package|func|import))/i,
      'Rust':       /\bRust\b/i,
      'PHP':        /\bPHP\b/i,
      'Swift':      /\bSwift\b/i,
      'Kotlin':     /\bKotlin\b/i,
      'Ruby':       /\bRuby\b/i,
      'Bash':       /\bBash\b|\bShell\b/i,
      // Frameworks
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
      // DBs & Tools
      'PostgreSQL':  /\bPostgres(?:QL)?\b/i,
      'MongoDB':     /\bMongoDB\b/i,
      'MySQL':       /\bMySQL\b/i,
      'Redis':       /\bRedis\b/i,
      'Docker':      /\bDocker\b/i,
      'Kubernetes':  /\bKubernetes\b|\bk8s\b/i,
      'AWS':         /\bAWS\b/,
      'Firebase':    /\bFirebase\b/i,
    };
    for (const [name, re] of Object.entries(terms)) {
      if (re.test(text)) found.push(name);
    }
    return found;
  },

  // ── Detect what the user is primarily trying to do ───────────────────────────
  detectIntent(msgs) {
    const userText = msgs.filter(m => m.role === 'user').map(m => m.text.toLowerCase()).join(' ');
    if (/\berror\b|\bbug\b|\bfix\b|\bnot working\b|\bcrash\b|\bfails?\b|\btraceback\b/.test(userText)) return 'debugging';
    if (/\bbuild\b|\bcreate\b|\bimplement\b|\bwrite\b|\bgenerate\b|\bmake\b/.test(userText)) return 'coding';
    if (/\bhow to\b|\bwhat is\b|\bexplain\b|\bunderstand\b|\blearn\b/.test(userText)) return 'learning';
    if (/\boptimize\b|\brefactor\b|\bperformance\b|\bspeed\b|\befficient\b/.test(userText)) return 'optimization';
    if (/\btest\b|\bunit test\b|\bmock\b|\bcoverage\b/.test(userText)) return 'testing';
    if (/\bdeploy\b|\bci\/cd\b|\bpipeline\b|\binfra\b|\bserver\b/.test(userText)) return 'devops';
    return 'general';
  },

  // ── Build the final prompt ───────────────────────────────────────────────────
  // Output is ONLY the raw conversation so the target AI reads it like a live chat.
  buildPrompt(msgs, platform) {
    if (!msgs.length) return '';

    // Pure turn-by-turn transcript — full text, zero truncation
    return msgs.map(m => {
      const label = m.role === 'user' ? 'Human' : 'Assistant';
      return `${label}: ${m.text}`;
    }).join('\n\n') + '\n\nAssistant:';
  }
};

// Export PromptEngine for Node.js usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = PromptEngine;
}
