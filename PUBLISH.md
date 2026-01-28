# Publishing to Chrome Web Store

This guide explains how to publish and update the **Gemini Shared Gems Manager** in the Chrome Web Store.

## Option 1: Manual Upload (Initial Publication)

Use this method for your very first upload to create the extension entry in the developer dashboard.

### 1. Create the Bundle
Run the release command to build and package the extension:
```bash
pnpm release
```
This will create a `bundle.zip` file in the project root.

### 2. Upload to Developer Console
1. Log in to the [Chrome Web Store Developer Console](https://chrome.google.com/webstore/devconsole/).
2. Click **+ New Item**.
3. Upload the `bundle.zip` file.

### 3. Store Listing & Metadata
*   **Screenshots**: Take at least one screenshot of the extension in action within Gemini.
*   **Privacy Policy URL**: You will need to provide a URL to the privacy policy. You can host the `PRIVACY_POLICY.md` content on a personal website or as a GitHub Gist.
*   **Description**: A professional description of how the tool integrates with Gemini.
*   **Category**: `Productivity`.
*   **Icon**: Use `assets/icon.png`.
*   **Permissions Justification**:
    *   `identity`: Needed to fetch your Gems from Google Drive.
    *   `storage`: Needed to save your Gems list locally so it loads instantly.
    *   `tabs`: Needed to highlight the current Gem you are viewing in the Sidebar.

---

## Option 2: Automated Publishing (Recommended for Updates)

Once the initial item is created, you can push updates directly from your terminal.

### 1. Obtain API Credentials
You need 4 pieces of information from the [Google Cloud Console](https://console.cloud.google.com/):
1.  **Extension ID**: Found in the URL of your item in the Chrome Developer Console.
2.  **Client ID**: Created under "Credentials" -> "OAuth 2.0 Client IDs".
3.  **Client Secret**: Associated with the Client ID.
4.  **Refresh Token**: Obtained by authorizing the Client ID with the `https://www.googleapis.com/auth/chromewebstore` scope.

### 2. Configure Environment
Copy the example environment file and enter your credentials:
```bash
cp .env.example .env
```

### 3. Deploy
Whenever you are ready to push a new version:
1.  Update the version number in `manifest.json`.
2.  Build and Zip: `pnpm release`
3.  Upload: `export $(cat .env | xargs) && pnpm upload`

> **Note**: The upload script sends the bundle to the **draft** stage. You still need to manually click "Submit for Review" in the dashboard to go live.
