// content.js
import './styles.css';

let hasInjected = false;
let currentSortOrder = 'none'; // 'none', 'asc', 'desc'




// Watch for changes to the DOM to catch the sidebar loading and re-renders
const observer = new MutationObserver((mutations) => {
  // Check if our element is still in the DOM
  if (!document.getElementById('shared-gems-root')) {
    hasInjected = false; // Reset state if element is gone
    window.requestAnimationFrame(() => attemptInjection());
  }
});

observer.observe(document.body, { childList: true, subtree: true });

function attemptInjection(retryCount = 0) {
  // If already exists, don't do anything
  if (document.getElementById('shared-gems-root')) return;

  // 2. Target specific .gems-list-container class as requested
  const container = document.querySelector('.gems-list-container');
  if (!container) {
    if (retryCount < 3) {

      setTimeout(() => attemptInjection(retryCount + 1), 500);
    }
    return;
  }


  injectUI(container, 'after');
}

function injectUI(targetElement, method) {
  if (document.getElementById('shared-gems-root')) return;

  const container = document.createElement('div');
  container.id = 'shared-gems-root';

  // Header
  const header = document.createElement('div');
  header.className = 'gemini-shared-header';

  const headerText = document.createElement('span');
  headerText.className = 'gemini-shared-header-text';
  headerText.innerText = 'Shared Gems';

  header.appendChild(headerText);

  // Header Actions
  const actionsContainer = document.createElement('div');
  actionsContainer.className = 'gemini-header-actions';

  // Sort Button
  const sortBtn = document.createElement('button');
  sortBtn.className = 'gemini-sort-btn';
  sortBtn.title = 'Sort Gems';
  const updateSortIcon = () => {
    let svg = '';
    if (currentSortOrder === 'asc') {
      svg = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5h10M11 9h7M11 13h4M3 17l3 3 3-3M6 18V4"></path></svg>';
    } else if (currentSortOrder === 'desc') {
      svg = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5h10M11 9h7M11 13h4M3 7l3-3 3 3M6 20V6"></path></svg>';
    } else {
      svg = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5h10M11 9h7M11 13h4M3 8l3-3 3 3M3 16l3 3 3-3"></path></svg>';
    }
    sortBtn.innerHTML = svg;
    sortBtn.classList.toggle('active', currentSortOrder !== 'none');
  };

  sortBtn.onclick = () => {
    if (currentSortOrder === 'none') currentSortOrder = 'asc';
    else if (currentSortOrder === 'asc') currentSortOrder = 'desc';
    else currentSortOrder = 'none';

    updateSortIcon();
    checkDataAndRender(); // Re-render with new sort
  };
  updateSortIcon();
  actionsContainer.appendChild(sortBtn);

  // Refresh Button
  const refreshBtn = document.createElement('button');
  refreshBtn.className = 'gemini-refresh-btn';
  refreshBtn.title = 'Refresh Shared Gems';
  refreshBtn.innerHTML = `
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M23 4v6h-6"></path>
      <path d="M1 20v-6h6"></path>
      <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
    </svg>
  `;

  refreshBtn.onclick = () => {
    if (refreshBtn.classList.contains('spinning')) return;
    refreshBtn.classList.add('spinning');
    chrome.runtime.sendMessage({ action: 'FETCH_GEMS', interactive: false }, (res) => {
      refreshBtn.classList.remove('spinning');
      if (res && res.success) {
        checkDataAndRender();
      }
    });
  };

  actionsContainer.appendChild(refreshBtn);
  header.appendChild(actionsContainer);



  // List Container
  const list = document.createElement('div');
  list.id = 'shared-gems-list';

  container.appendChild(header);
  container.appendChild(list);

  try {
    if (method === 'after' && targetElement.nextSibling) {
      targetElement.parentNode.insertBefore(container, targetElement.nextSibling);
    } else if (method === 'after') {
      targetElement.parentNode.appendChild(container); // It was the last element
    } else {
      targetElement.appendChild(container);
    }

    console.log(`[Gemini Gems Manager] UI injected via ${method}`);
    hasInjected = true;
    checkDataAndRender();
  } catch (e) {
    console.error('[Gemini Gems Manager] Injection failed:', e);
  }
}

function checkDataAndRender() {
  chrome.storage.local.get(['sharedGems', 'lastUpdated'], (result) => {
    const now = Date.now();
    const lastUpdated = result.lastUpdated || 0;
    const fiveMinutesAgo = now - (5 * 60 * 1000);

    if (!result.sharedGems || lastUpdated < fiveMinutesAgo) {
      chrome.runtime.sendMessage({ action: 'FETCH_GEMS', interactive: false }, (res) => {
        if (res && res.success) {
          setTimeout(() => checkDataAndRender(), 500);
        } else {
          if (!result.sharedGems) renderConnectButton();
          else renderList(result.sharedGems);
        }

      });
    } else {
      renderList(result.sharedGems);
    }
  });
}

function renderConnectButton() {
  const container = document.getElementById('shared-gems-list');
  if (!container) return;

  container.innerHTML = '';
  const btn = document.createElement('button');
  btn.className = 'gemini-connect-btn';
  btn.innerText = 'Sync from Drive';
  btn.onclick = () => {
    btn.innerText = 'Syncing...';
    chrome.runtime.sendMessage({ action: 'FETCH_GEMS', interactive: true }, (res) => {
      if (res && res.success) checkDataAndRender();
      else btn.innerText = 'Retry Sync';
    });
  };
  container.appendChild(btn);
}

function renderList(gems) {
  const container = document.getElementById('shared-gems-list');
  if (!container) return;

  container.innerHTML = '';

  if (gems.length === 0) {
    container.innerHTML = '<div style="padding:16px; color:#555; font-size:13px; text-align:center;">No shared gems found</div>';
    return;
  }

  // Sort gems if needed
  let sortedGems = [...gems];
  if (currentSortOrder === 'asc') {
    sortedGems.sort((a, b) => a.name.localeCompare(b.name));
  } else if (currentSortOrder === 'desc') {
    sortedGems.sort((a, b) => b.name.localeCompare(a.name));
  }

  sortedGems.forEach(gem => {

    const a = document.createElement('a');

    // Construct internal navigation URL.
    // gem.webViewLink is typically https://drive.google.com/file/d/GEM_ID/view...
    // We need to extract the ID and format it as /app/gem/GEM_ID
    let gemId = gem.id;

    // Fallback: try to extract ID from link if simple ID is missing or seems wrong
    if (!gemId && gem.webViewLink) {
      const match = gem.webViewLink.match(/\/d\/([a-zA-Z0-9_-]+)/);
      if (match) gemId = match[1];
    }

    const internalUrl = `/gem/${gemId}`;
    a.href = internalUrl;
    a.className = 'gemini-gem-item';

    // Check if active
    if (window.location.pathname.includes(gemId)) {
      a.classList.add('active');
    }

    // Handle SPA navigation
    a.onclick = (e) => {
      e.preventDefault();
      if (window.location.pathname !== internalUrl) {
        history.pushState({}, '', internalUrl);
        // Dispatching popstate helps the SPA (Gemini) notice the URL change
        // and also triggers our locationchange listener via the injected script
        window.dispatchEvent(new PopStateEvent('popstate'));
      }
    };
    const text = document.createElement('span');
    text.className = 'gemini-gem-text';
    text.innerText = gem.name;

    a.appendChild(text);
    container.appendChild(a);

  });
}

chrome.storage.onChanged.addListener((changes) => {
  if (changes.sharedGems) {
    renderList(changes.sharedGems.newValue);
  }
});


// Listen for URL changes from background script
function onUrlChange() {
  const gems = document.querySelectorAll('.gemini-gem-item');
  const currentPath = window.location.pathname;

  gems.forEach(a => {
    // Extract gemId from href (e.g., /gem/XYZ)
    const gemId = a.getAttribute('href').split('/').pop();
    if (currentPath.includes(gemId)) {
      a.classList.add('active');
    } else {
      a.classList.remove('active');
    }
  });
}

chrome.runtime.onMessage.addListener((message) => {
  if (message.action === 'URL_CHANGED') {
    onUrlChange();
  }
});

