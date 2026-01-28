# Privacy Policy for Gemini Shared Gems Manager

**Last Updated: January 28, 2026**

Your privacy is important to us. This Privacy Policy explains how the **Gemini Shared Gems Manager** Chrome extension handles your data.

## 1. Data Collection
We do **not** collect, store, or transmit any personal information, browsing history, or user data to our own servers or any third parties.

## 2. Google Drive Data Access
The extension requires access to your Google Drive metadata to function. Specifically:
*   **What we access**: We only query for files with the MIME type `application/vnd.google-gemini.gem` that have been shared with you.
*   **Scope of access**: We use the `https://www.googleapis.com/auth/drive.metadata.readonly` scope. This allows the extension to see the names and IDs of your Gems but **not** their content or your other private files.
*   **Purpose**: This access is solely used to display your Shared Gems in the Gemini sidebar for easy navigation.

## 3. Data Storage
*   **Local Storage**: The list of your Shared Gems (names and IDs) is cached locally in your browser's `chrome.storage.local`.
*   **Data Persistence**: This data stays on your local device and is never uploaded to any external server. You can clear this data at any time by uninstalling the extension or clearing your browser data.

## 4. Third-Party Services
The extension communicates directly with Google APIs to fetch your Gems. This communication is subject to [Google's Privacy Policy](https://policies.google.com/privacy). We do not use any other third-party analytics or tracking services.

## 5. Changes to This Policy
We may update this Privacy Policy from time to time. Any changes will be reflected by the "Last Updated" date at the top of this document.

## 6. Contact
If you have any questions about this Privacy Policy, please contact the developer via the Chrome Web Store support page.
