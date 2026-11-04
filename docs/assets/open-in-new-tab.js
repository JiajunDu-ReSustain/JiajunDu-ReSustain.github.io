/**
 * Open external links and PDF downloads in a new tab
 * - Absolute links to other sites (DOIs, CNKI, Google Scholar, ...) -> new tab
 * - Links to *.pdf files (paper downloads, even on this site) -> new tab
 * - Internal navigation (navbar, language switcher) stays in the same tab
 */

(function() {
  'use strict';

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyNewTab);
  } else {
    applyNewTab();
  }

  function applyNewTab() {
    document.querySelectorAll('a[href]').forEach(function(a) {
      if (shouldOpenInNewTab(a)) {
        a.setAttribute('target', '_blank');
        a.setAttribute('rel', 'noopener noreferrer');
      }
    });
  }

  function shouldOpenInNewTab(a) {
    const href = a.getAttribute('href');
    if (!href || href.startsWith('#')) return false;
    if (href.startsWith('mailto:') || href.startsWith('javascript:')) return false;

    try {
      const url = new URL(href, window.location.href);
      if (url.origin !== window.location.origin) return true;
      return /\.pdf(\?|#|$)/i.test(url.pathname);
    } catch (e) {
      return false;
    }
  }
})();
