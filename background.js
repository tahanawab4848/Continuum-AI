// Continuum-AI — Service Worker v5
'use strict';

chrome.runtime.onInstalled.addListener(({ reason }) => {
  if (reason === 'install') {
    console.log('[Continuum-AI] Installed.');
  }
});
