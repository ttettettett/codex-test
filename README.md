# App Hosting Smoke Test

Minimal Next.js app for Firebase App Hosting.
On merge to `main`, App Hosting should build and deploy automatically.

- Shows `NEXT_PUBLIC_SITE_NAME` value on the home page.

## Firestore smoke
- Uses Anonymous Auth; Firestore Security Rules require `request.auth != null`.
- Page: /db → add & list documents in `items` collection.
