// Content script for the Gemini Gems extension
// This script runs on all web pages to enable interaction with page content

(function() {
  'use strict';

  // Listen for messages from the popup or background
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'getPageInfo') {
      const pageInfo = {
        title: document.title,
        url: window.location.href,
        selectedText: window.getSelection().toString(),
        favicon: getFaviconUrl()
      };
      sendResponse(pageInfo);
    }
  });

  // Function to get the page's favicon URL
  function getFaviconUrl() {
    let favicon = document.querySelector("link[rel*='icon']");
    return favicon ? favicon.href : '/favicon.ico';
  }

  // Highlight capability: you can add more advanced features here
  console.log('Gemini Gems content script loaded on:', window.location.href);
})();
