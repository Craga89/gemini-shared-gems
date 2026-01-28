# Gemini Shared Gems Manager

A sleek Google Chrome extension that seamlessly integrates your shared Google Gemini Gems directly into the Gemini sidebar. No more switching tabs to find the Gems your team or friends have shared with you.

![Extension Preview](assets/icon-128.png)

## 🚀 Features

- **Sidebar Integration**: Adds a "Shared Gems" section directly into the Google Gemini sidebar, matching the native UI style perfectly.
- **Drive Sync**: Securely fetches Gems shared with you from Google Drive using the Official Google Drive API.
- **Advanced Navigation**: Uses client-side routing (SPA-friendly) to navigate between Gems without full page reloads.
- **Smart Sorting**: Built-in sorting (A-Z, Z-A) to help you find your Gems quickly.
- **Manual Refresh**: Instantly sync the latest shared Gems with a dedicated refresh button.
- **Theme Support**: Full support for both Gemini's Light and Dark modes.

## 🛠️ Technical Stack

- **Framework**: Vite + CRXJS (Chrome Extension Refresh)
- **Language**: JavaScript (Content Scripts, Background Service Worker)
- **API**: Google Drive v3 API (Metadata scope only)
- **Styling**: Vanilla CSS with Gemini System Tokens

## 📦 Installation

### Development Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/Craga89/gemini-shared-gems.git
   cd gemini-shared-gems
   ```
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Start the development server:
   ```bash
   pnpm dev
   ```
4. Load in Chrome:
   - Go to `chrome://extensions/`
   - Enable **Developer mode**
   - Click **Load unpacked**
   - Select the `dist` folder created by Vite.

## 🚢 Production & Publishing

See [PUBLISH.md](./PUBLISH.md) for detailed instructions on how to build, bundle, and publish the extension to the Chrome Web Store.

### Quick Commands

- `pnpm build`: Build the extension for production.
- `pnpm release`: Build and package into `bundle.zip` for store upload.
- `pnpm upload`: (Setup required) Push the update to the Chrome Web Store.

## 🛡️ Privacy

We take your privacy seriously. **Gemini Shared Gems Manager** does not collect or transmit your data. It only communicates with Google Drive APIs to fetch your Gem metadata and stores it locally on your device. See [PRIVACY_POLICY.md](./PRIVACY_POLICY.md) for more details.

## 📄 License

This project is licensed under the ISC License.
