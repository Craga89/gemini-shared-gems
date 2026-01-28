<!-- Use this file to provide workspace-specific custom instructions to Copilot. -->

## Chrome Extension Setup Checklist

- [x] Project structure created with directories for src/popup, src/scripts, and assets
- [x] manifest.json configured with Chrome Extension Manifest V3
- [x] Popup UI created (popup.html, popup.css, popup.js)
- [x] Background service worker implemented (background.js)
- [x] Content script created (content-script.js)
- [x] README.md documentation completed
- [x] Project ready for development and testing

## Project Overview

**Gemini Gems** - A Chrome extension for capturing and organizing useful AI insights and web content.

### Key Features
- Capture page content with one click
- Context menu integration for selected text
- Local storage of up to 100 gems
- Modern popup interface with recent gems display
- Manifest V3 compliant

### Installation Instructions

1. Open `chrome://extensions/` in Chrome
2. Enable **Developer mode** (top-right toggle)
3. Click **Load unpacked**
4. Select the `chrome-ext-gemini-gems` folder
5. The extension appears in your toolbar

### Development Commands

- **Reload extension**: Click the refresh icon on `chrome://extensions/`
- **Test popup**: Click the extension icon in the toolbar
- **Debug**: Right-click the extension icon → Inspect popup/service worker
- **Clear storage**: Right-click extension → Remove, then reload

### File Descriptions

- `manifest.json` - Defines extension configuration, permissions, UI elements
- `src/popup/popup.html` - Popup window markup with gem list and action buttons
- `src/popup/popup.css` - Popup styling with gradient background theme
- `src/popup/popup.js` - Popup logic: load/save gems, button handlers
- `src/scripts/background.js` - Service worker: message handling, context menus, storage
- `src/scripts/content-script.js` - Page injection: get page info, handle selections

### Next Steps for Development

1. Create icon files (16x16, 48x48, 128x128 PNG) in `assets/` folder
2. Implement options page for settings
3. Add more advanced gem capture features
4. Test on multiple websites
5. Prepare for Chrome Web Store submission

---

**Status**: Project scaffold complete and ready for feature development.
