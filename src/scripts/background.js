// Background service worker for the Gemini Gems extension

// Initialize extension on install
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    // Open welcome page on first install
    chrome.tabs.create({ url: 'src/pages/welcome.html' });
  }
});

// Listen for messages from content scripts and popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'saveGem') {
    chrome.storage.local.get('gems', (result) => {
      const gems = result.gems || [];
      gems.unshift(request.gem);
      chrome.storage.local.set({ gems: gems.slice(0, 100) });
      sendResponse({ success: true });
    });
    return true; // Keep the message channel open for async response
  }

  if (request.action === 'getGems') {
    chrome.storage.local.get('gems', (result) => {
      sendResponse({ gems: result.gems || [] });
    });
    return true;
  }
});

// Context menu for saving selections
chrome.contextMenus.create({
  id: 'saveGem',
  title: 'Save as Gem',
  contexts: ['selection']
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'saveGem') {
    const gem = {
      id: Date.now(),
      title: tab.title,
      url: tab.url,
      selectedText: info.selectionText,
      timestamp: new Date().toLocaleString()
    };

    chrome.storage.local.get('gems', (result) => {
      const gems = result.gems || [];
      gems.unshift(gem);
      chrome.storage.local.set({ gems: gems.slice(0, 100) });
    });
  }
});
