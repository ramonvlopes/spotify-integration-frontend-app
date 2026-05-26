# SPEC-12 — Firebase Hosting Deploy

## Goal
Configure Firebase Hosting so the app can be deployed with a single command. The build output from Vite (`dist/`) is served as a single-page app.

---

## Prerequisites
- Firebase CLI: `npm install -g firebase-tools`
- A Firebase project created at console.firebase.google.com
- `firebase login` authenticated

---

## Files to Create

### `firebase.json`
```json
{
  "hosting": {
    "public": "dist",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

The `rewrites` rule is required for client-side routing (react-router) — all paths serve `index.html` and the router handles them.

### `.firebaserc`
```json
{
  "projects": {
    "default": "<your-firebase-project-id>"
  }
}
```

> `.firebaserc` is committed (project ID is not a secret). `.env` is never committed.

---

## `package.json` Scripts to Add
```json
{
  "deploy": "npm run build && firebase deploy --only hosting"
}
```

---

## Environment Variables on Firebase
Since Vite embeds `VITE_*` variables at build time, the CI/CD or manual deploy must have the env vars set before running `npm run build`.

**Manual deploy flow:**
1. Create `.env` locally from `.env.example`
2. Fill in `VITE_SPOTIFY_CLIENT_ID` and `VITE_SPOTIFY_CLIENT_SECRET`
3. Run `npm run deploy`

**README must document this clearly.**

---

## README Section (for root README.md)
The root `README.md` must include:

```markdown
## Deploy

### Firebase Hosting
The app is deployed on Firebase Hosting.

To deploy manually:
1. Install Firebase CLI: `npm install -g firebase-tools`
2. Login: `firebase login`
3. Create `.env` from `.env.example` and fill in your Spotify credentials
4. Run: `npm run deploy`
```

---

## Acceptance Criteria
- [ ] `firebase.json` is committed with correct SPA rewrite rule
- [ ] `.firebaserc` is committed with the project ID
- [ ] `npm run deploy` builds and deploys successfully
- [ ] Deployed app loads at the Firebase Hosting URL
- [ ] Client-side navigation works (refreshing a deep route like `/artists/:id` doesn't 404)
- [ ] `.env` is in `.gitignore` (credentials never committed)
