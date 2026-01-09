/**
 * Language Switcher for Bilingual Quarto Site
 * Automatically detects current language and generates switch link
 * Works with /zh/ and /en/ directory structure
 */

(function() {
  'use strict';
  
  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLanguageSwitcher);
  } else {
    initLanguageSwitcher();
  }
  
  function initLanguageSwitcher() {
    // Get current URL path
    const currentPath = window.location.pathname;
    
    // Detect current language from path
    let currentLang = 'en';
    let targetLang = 'zh';
    let targetLangLabel = '中文';
    
    if (currentPath.includes('/zh/')) {
      currentLang = 'zh';
      targetLang = 'en';
      targetLangLabel = 'EN';
    }
    
    // Generate target URL
    const targetUrl = generateTargetUrl(currentPath, currentLang, targetLang);
    
    // Create or update language switcher link
    createLanguageSwitcher(targetUrl, targetLangLabel);
  }
  
  function generateTargetUrl(currentPath, currentLang, targetLang) {
    // Extract the base path and page name
    const langPattern = new RegExp(`\\/${currentLang}\\/`, 'g');
    
    // If current path contains the language directory
    if (langPattern.test(currentPath)) {
      // Replace language in path
      const targetPath = currentPath.replace(`/${currentLang}/`, `/${targetLang}/`);
      return targetPath;
    }
    
    // Fallback: go to target language homepage
    // Get the base URL (repository name for GitHub Pages)
    const pathParts = currentPath.split('/').filter(p => p);
    
    // For GitHub Pages with repo name in path
    if (pathParts.length > 0) {
      const firstPart = pathParts[0];
      // Check if first part is a repo name (not a language code or file)
      if (firstPart !== 'zh' && firstPart !== 'en' && !firstPart.includes('.html')) {
        return `/${firstPart}/${targetLang}/`;
      }
    }
    
    return `/${targetLang}/`;
  }
  
  function createLanguageSwitcher(targetUrl, label) {
    // Find the navbar
    const navbar = document.querySelector('.navbar-nav');
    if (!navbar) {
      console.warn('Navbar not found, language switcher not added');
      return;
    }
    
    // Check if language switcher already exists
    let langSwitcher = document.getElementById('language-switcher');
    
    if (!langSwitcher) {
      // Create new language switcher element
      langSwitcher = document.createElement('li');
      langSwitcher.className = 'nav-item';
      langSwitcher.id = 'language-switcher';
      
      const link = document.createElement('a');
      link.className = 'nav-link';
      link.href = targetUrl;
      link.textContent = label;
      link.title = `Switch to ${label === 'EN' ? 'English' : 'Chinese'}`;
      link.style.fontWeight = 'bold';
      
      langSwitcher.appendChild(link);
      
      // Add to navbar (try to add to the right side if exists, otherwise append)
      const navbarRight = navbar.querySelector('.navbar-nav.ms-auto') || navbar;
      navbarRight.appendChild(langSwitcher);
    } else {
      // Update existing switcher
      const link = langSwitcher.querySelector('a');
      if (link) {
        link.href = targetUrl;
        link.textContent = label;
        link.title = `Switch to ${label === 'EN' ? 'English' : 'Chinese'}`;
      }
    }
  }
})();
