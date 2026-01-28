# Gemini Gems Chrome Extension

A Chrome extension for discovering, capturing, and organizing useful Gemini AI insights and web content.

## Features

- **Capture Gems**: Save interesting content from web pages with one click
- **Quick Access**: View recently saved gems in the popup
- **Context Menu**: Right-click on selected text to save as a gem
- **Storage**: Automatically stores up to 100 gems in browser storage
- **Clean UI**: Modern, responsive popup interface

## Project Structure

```
chrome-ext-gemini-gems/
├── manifest.json              # Extension configuration (Manifest V3)
├── src/
│   ├── popup/
│   │   ├── popup.html        # Popup UI markup
│   │   ├── popup.css         # Popup styling
│   │   └── popup.js          # Popup logic and event handlers
│   └── scripts/
│       ├── background.js     # Service worker (V3)
│       └── content-script.js # Content script for page injection
├── assets/                    # Icons and images (placeholder directory)
└── README.md                  # This file
```

## Installation

### Development Mode

1. Open Chrome and go to `chrome://extensions/`
2. Enable **Developer mode** (toggle in top-right corner)
3. Click **Load unpacked**
4. Navigate to and select the `chrome-ext-gemini-gems` folder
5. The extension will appear in your Chrome toolbar

### Production Build

To prepare for Chrome Web Store submission, create a `.crx` file:
1. Go to `chrome://extensions/`
2. Click the menu (⋮) next to the extension
3. Select **Pack extension**
4. Choose the project folder

## Usage

### Capture a Gem

1. Click the **Gemini Gems** icon in the Chrome toolbar
2. Click **Capture Gem** to save the current page
3. View recently saved gems in the popup

### Context Menu

- Right-click any selected text on a webpage
- Choose **Save as Gem** from the context menu
- The selected text is saved along with the page info

### View Saved Gems

- Click the extension icon to see the 5 most recent gems
- All gems are stored locally in your browser

## Development

### Key Files

- **manifest.json**: Defines extension permissions, UI, and scripts
- **background.js**: Service worker handling storage, context menus, and messaging
- **popup.js**: Manages the popup UI and gem loading
- **content-script.js**: Injects scripts into web pages for interaction

### Extending the Extension

To add new features:

1. Update permissions in `manifest.json` if accessing new APIs
2. Add logic to `background.js` for background operations
3. Modify `popup.html/css/js` for UI changes
4. Update `content-script.js` for page interaction

### Chrome Extension APIs Used

- `chrome.tabs`: Access current tab information
- `chrome.storage.local`: Save and retrieve gems
- `chrome.contextMenus`: Context menu integration
- `chrome.runtime.onMessage`: Message passing between scripts

## Testing

1. Load the extension in Chrome via `chrome://extensions/`
2. Make changes to files
3. Click the refresh icon next to the extension to reload
4. Test functionality in the popup and on web pages

## Browser Compatibility

- Chrome 88+ (Manifest V3 support)
- Chromium-based browsers (Edge, Brave, etc.)

## Future Enhancements

- [ ] Options page for customization
- [ ] Export gems to JSON/CSV
- [ ] Sync with cloud storage
- [ ] Tags and search functionality
- [ ] Categories for organizing gems
- [ ] Share gems via links
- [ ] Dark mode support

## License

MIT License - Feel free to modify and distribute

## Support

For issues or feature requests, create an issue in the project repository.
