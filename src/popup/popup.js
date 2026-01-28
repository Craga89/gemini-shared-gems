// Popup script for the Gemini Gems extension

document.addEventListener('DOMContentLoaded', () => {
  const captureBtn = document.getElementById('captureBtn');
  const openOptionsBtn = document.getElementById('openOptionsBtn');
  const gemsList = document.getElementById('gemsList');

  // Load saved gems from storage
  loadGems();

  // Capture current page content as a "gem"
  captureBtn.addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs[0];
      const gem = {
        id: Date.now(),
        title: tab.title,
        url: tab.url,
        timestamp: new Date().toLocaleString()
      };

      // Save gem to storage
      chrome.storage.local.get('gems', (result) => {
        const gems = result.gems || [];
        gems.unshift(gem);
        chrome.storage.local.set({ gems: gems.slice(0, 50) }); // Keep last 50
        loadGems();
      });
    });
  });

  // Open options page
  openOptionsBtn.addEventListener('click', () => {
    chrome.runtime.openOptionsPage();
  });

  // Load and display gems
  function loadGems() {
    chrome.storage.local.get('gems', (result) => {
      const gems = result.gems || [];
      gemsList.innerHTML = '';

      if (gems.length === 0) {
        gemsList.innerHTML = '<li class="placeholder">No gems saved yet. Start exploring!</li>';
        return;
      }

      gems.slice(0, 5).forEach((gem) => {
        const li = document.createElement('li');
        li.innerHTML = `
          <strong>${gem.title}</strong><br>
          <small>${gem.timestamp}</small>
        `;
        gemsList.appendChild(li);
      });
    });
  }
});
