# SPEC-02 — Folder Structure & READMEs

## Goal
Create the full `src/` directory tree and place a bilingual README.md inside each major folder explaining its purpose, organization, and usage examples.

---

## Directory Tree to Create

```
src/
├── components/
│   └── README.md
├── containers/
│   └── README.md
├── screens/
│   └── README.md
├── commons/
│   ├── constants/
│   ├── helpers/
│   ├── utils/
│   ├── icons/
│   │   └── README.md
│   └── README.md
├── i18n/
│   ├── locales/
│   │   ├── en-US/
│   │   └── pt-BR/
│   └── README.md
├── hooks/
│   └── README.md
├── services/
│   ├── core/
│   ├── auth/
│   ├── artists/
│   ├── albums/
│   └── README.md
├── context/
│   └── README.md
└── test/
    └── setup.ts
```

---

## README Contents per Folder

### `src/components/README.md`
**Purpose:** Stateless, presentational (dumb) components. They receive data and callbacks via props, have no direct API or global state knowledge.

**Rule:** A component in this folder must not import from `services/`, `context/`, or `hooks/` that fetch data. It may import from `commons/`.

**Structure per component:**
```
ComponentName/
  index.ts              ← re-exports default
  ComponentName.tsx     ← JSX
  ComponentName.types.ts   ← Props interface (if non-trivial)
  ComponentName.constants.ts ← static values (if needed)
```

**Example:** `Button`, `Badge`, `ArtistCard`, `Pagination`, `LoadingSpinner`

---

### `src/containers/README.md`
**Purpose:** Stateful (smart) components. They connect to hooks, context, React Query, and pass data down to presentational components.

**Rule:** Containers orchestrate data and logic; they must delegate rendering to components or screens.

**Structure:** Same CamelCase folder pattern as components.

**Example:** `ArtistGrid`, `SearchBar`, `ArtistDetailHeader`, `FavoritesForm`

---

### `src/screens/README.md`
**Purpose:** Top-level page components, one per route. They compose containers and components into a full page layout.

**Rule:** Screens are thin — they define layout and pass route params. Business logic lives in containers.

**Structure:** Same CamelCase folder pattern.

**Example:** `ArtistListScreen`, `ArtistDetailScreen`, `FavoritesScreen`

---

### `src/commons/README.md`
**Purpose:** Shared, framework-agnostic utilities. Divided into:
- `constants/` — app-wide static values (routes, query keys, pagination defaults)
- `helpers/` — pure functions for domain transformations (format duration, format followers)
- `utils/` — pure functions for generic operations (debounce, localStorage wrapper)
- `icons/` — icon abstraction layer (see `icons/README.md`)

**Rule:** Nothing in `commons/` may import React or any app-specific module.

---

### `src/commons/icons/README.md`
**Purpose:** Single source of truth for all icons used in the application.

**Why this exists:** All icons are re-exported from this folder. If the icon library (`react-icons`) needs to be swapped for another (e.g., `lucide-react`, `phosphor-react`), only this folder needs to change — no search-and-replace across the codebase.

**Rule:** Never import directly from `react-icons` outside of this folder.

**Usage:**
```tsx
import { SearchIcon, MusicIcon } from '@/commons/icons'
```

**Structure:**
```
icons/
  index.ts       ← re-exports all icons
  music.icons.ts ← music-domain icons
  ui.icons.ts    ← general UI icons (search, close, chevron...)
  nav.icons.ts   ← navigation icons
```

---

### `src/i18n/README.md`
**Purpose:** Internationalization configuration using `react-i18next`. Supports PT-BR and EN-US.

**Structure:**
```
i18n/
  index.ts                  ← i18next initialization
  locales/
    en-US/
      common.json           ← shared strings
      artists.json
      albums.json
      favorites.json
    pt-BR/
      common.json
      artists.json
      albums.json
      favorites.json
```

**Usage:**
```tsx
import { useTranslation } from 'react-i18next'
const { t } = useTranslation('artists')
return <h1>{t('title')}</h1>
```

---

### `src/hooks/README.md`
**Purpose:** Custom React hooks that encapsulate reusable stateful logic.

**Rule:** Hooks in this folder must be generic and reusable. Hooks that are tightly coupled to a single container live alongside that container.

**Naming:** Always prefixed with `use`.

**Example:** `useDebounce`, `useLocalStorage`, `usePagination`

---

### `src/services/README.md`
**Purpose:** All HTTP communication with the Spotify API, organized by domain entity.

**Structure:**
```
services/
  core/
    api.ts              ← Axios instance creation
    interceptors.ts     ← request & response interceptors
    token.ts            ← Client Credentials token management
  auth/
    auth.ts             ← token fetch endpoint
    auth.constants.ts
    auth.types.ts
  artists/
    artists.ts          ← search, getById, getTopTracks, getAlbums
    artists.constants.ts
    artists.types.ts
  albums/
    albums.ts           ← getById, getTracks
    albums.constants.ts
    albums.types.ts
```

**Usage:**
```ts
import { searchArtists } from '@/services/artists/artists'
const results = await searchArtists({ query: 'Beatles', limit: 20 })
```

---

### `src/context/README.md`
**Purpose:** Global state management using React Context + useReducer, as required by the tech spec.

**When to use context vs React Query:** React Query owns server state (cached API data). Context owns client state (UI preferences: language, active filters, pagination state not tied to a URL).

**Structure per context:**
```
ContextName/
  ContextName.context.ts    ← createContext + Provider
  ContextName.reducer.ts    ← reducer function
  ContextName.actions.ts    ← action type constants
  ContextName.types.ts      ← State and Action types
  index.ts
```

---

## Acceptance Criteria
- [ ] All folders exist under `src/`
- [ ] Every listed folder has a `README.md`
- [ ] All READMEs are written in both English and Portuguese (two sections)
- [ ] No placeholder or empty files beyond what's described here
