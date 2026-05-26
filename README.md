# Spotify Explorer

A modern frontend application to explore Spotify artists, view their top tracks and discography, and manage a personal favorites list.

---

## Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | React 18 + TypeScript |
| Build tool | Vite |
| Styling | Tailwind CSS |
| State management | Context API + useReducer |
| Server state | React Query (TanStack Query v5) |
| HTTP client | Axios |
| Forms | React Hook Form + Zod |
| i18n | react-i18next (PT-BR + EN-US) |
| Charts | Recharts |
| Icons | react-icons (abstracted via `commons/icons`) |
| Notifications | react-toastify |
| Testing | Vitest + React Testing Library |
| Linting | ESLint + Prettier |
| Deploy | Firebase Hosting |

---

## Features

- **Artist search** — search by artist name or album name with 500ms debounce
- **Paginated grid** — 20 artists per page, card-based layout (no tables)
- **Artist detail** — hero image, genres, followers, popularity bar, Spotify link
- **Top tracks** — paginated table with album art, name, and duration
- **Popularity chart** — Recharts bar chart of top tracks by popularity score
- **Discography** — paginated album grid; click any album to expand its track list inline
- **Favorites** — form to save favorite tracks (artist + track + album) to localStorage; full CRUD
- **i18n** — switch between Portuguese (PT-BR) and English (EN-US) at runtime
- **Error handling** — all API errors surfaced via react-toastify toast notifications

---

## Known Limitations

### Spotify Development Mode — API limit cap

Spotify's Web API enforces a **maximum `limit` of 10** for apps running in development mode (unverified apps). This means pages display up to 10 items instead of 20. This is a Spotify platform restriction and does not affect production-approved apps.

To remove this restriction, the Spotify app would need to request **Extended Quota Mode** in the Developer Dashboard, which requires Spotify's manual approval.

---

## Authentication Strategy

This app uses the **OAuth 2.0 Client Credentials** flow. A machine-to-machine token is fetched on the client using the `VITE_SPOTIFY_CLIENT_ID` and `VITE_SPOTIFY_CLIENT_SECRET` environment variables. This means **users do not need to log in with a Spotify account** to use the app.

> **Important note for reviewers:** This flow was chosen intentionally to allow evaluators to open and navigate the app without any Spotify account configuration. In a production application, the **Authorization Code + PKCE** flow would be preferred — it requires only the Client ID (no secret) and is therefore safe for public client-side deployments.

---

## Getting Started

### Prerequisites

- Node.js 18+
- A [Spotify Developer](https://developer.spotify.com/dashboard) account

### 1. Create a Spotify App

1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Click **Create app**
3. Fill in any name and description
4. Set Redirect URI to `http://localhost:5173/callback`
5. Select **Web API**
6. Copy the **Client ID** and **Client Secret**

### 2. Clone and install

```bash
git clone https://github.com/ramonvlopes/spotify-integration-frontend-app.git
cd spotify-integration-frontend-app
npm install
```

### 3. Configure environment variables

```bash
cp .env.example .env
```

Edit `.env` and fill in your credentials:

```
VITE_SPOTIFY_CLIENT_ID=your_client_id_here
VITE_SPOTIFY_CLIENT_SECRET=your_client_secret_here
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

---

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | TypeScript check + production build |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint (zero warnings allowed) |
| `npm run lint:fix` | Auto-fix ESLint issues |
| `npm run format` | Format with Prettier |
| `npm run test` | Run tests in watch mode |
| `npm run test:coverage` | Run tests with coverage report |
| `npm run deploy` | Build and deploy to Firebase Hosting |

---

## Project Structure

```
src/
├── components/     # Stateless presentational components
├── containers/     # Stateful components (data-fetching, logic)
├── screens/        # Top-level page components (one per route)
├── commons/
│   ├── constants/  # App-wide static values and query keys
│   ├── helpers/    # Pure domain transformation functions
│   ├── utils/      # Pure generic utility functions
│   └── icons/      # Icon abstraction layer (see icons/README.md)
├── context/        # React Context + useReducer global state
├── hooks/          # Reusable custom hooks
├── i18n/           # i18next configuration and locale JSON files
├── services/
│   ├── core/       # Axios instance, interceptors, token management
│   ├── auth/       # Spotify token endpoint
│   ├── artists/    # Artist search and detail endpoints
│   └── albums/     # Album detail and track endpoints
└── test/           # Test utilities, setup, and i18n mock
```

Each folder contains its own `README.md` with detailed documentation in English and Portuguese.

---

## Testing

```bash
npm run test          # watch mode
npm run test:coverage # single run with coverage
```

Tests cover: helpers, context reducers, custom hooks, Zod schemas, and all shared components.

---

## Deploy

### Firebase Hosting

1. Install Firebase CLI:
   ```bash
   npm install -g firebase-tools
   ```
2. Login:
   ```bash
   firebase login
   ```
3. Update `.firebaserc` with your Firebase project ID
4. Create `.env` from `.env.example` with your Spotify credentials
5. Deploy:
   ```bash
   npm run deploy
   ```

> The `rewrites` rule in `firebase.json` ensures client-side routing works correctly on Firebase — all paths serve `index.html` and React Router handles navigation.

---

## Code Standards

- **File size limit:** 200 lines maximum per file
- **No inline comments** in source code
- **Pre-commit hook** (Husky + lint-staged): ESLint runs on every staged `.ts`/`.tsx` file before commit
- **Zero ESLint warnings** enforced via `--max-warnings 0`

---

## License

MIT
