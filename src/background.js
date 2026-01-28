// background.js

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'FETCH_GEMS') {
    handleGemFetch(request.interactive).then(sendResponse);
    return true; // Keep message channel open for async response
  }
});

// Watch for tab updates to handle SPA navigation changes
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.url && tab.url.includes('gemini.google.com')) {
    chrome.tabs.sendMessage(tabId, {
      action: 'URL_CHANGED',
      url: changeInfo.url
    }).catch(() => {
      // Ignore errors when sending to tabs where content script isn't ready
    });
  }
});


async function handleGemFetch(interactive) {
  try {
    const token = await getAuthToken(interactive);
    if (!token) {

      return { success: false, error: 'auth_needed' };
    }



    // Query for Gemini Gems (MIME type specific to Gems)
    const q = "mimeType='application/vnd.google-gemini.gem' and sharedWithMe = true and trashed = false";
    const fields = "files(id, name, webViewLink, owners)";

    const response = await fetch(
      `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(q)}&fields=${encodeURIComponent(fields)}&pageSize=50`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (!response.ok) {
      console.error('[Gemini Gems Manager] API error:', response.status);
      throw new Error('API request failed');
    }

    const data = await response.json();



    // Save to storage so content script can read it
    await chrome.storage.local.set({
      sharedGems: data.files || [],
      lastUpdated: Date.now()
    });

    return { success: true, count: data.files ? data.files.length : 0 };

  } catch (error) {
    console.error("[Gemini Gems Manager] Fetch Error:", error);
    return { success: false, error: error.message };
  }
}

function getAuthToken(interactive) {
  return new Promise((resolve) => {
    chrome.identity.getAuthToken({ interactive }, (token) => {
      if (chrome.runtime.lastError || !token) {
        resolve(null);
      } else {
        resolve(token);
      }
    });
  });
}
