# SPEC-01 — Project Setup

## Goal
Bootstrap the Vite + React + TypeScript project with all required tooling configured and ready for development.

---

## Dependencies to Install

### Core
```
react react-dom
typescript
vite @vitejs/plugin-react
```

### Styling
```
tailwindcss postcss autoprefixer
```

### Data fetching & state
```
axios
@tanstack/react-query
```

### Forms & validation
```
react-hook-form
zod @hookform/resolvers
```

### i18n
```
react-i18next i18next i18next-browser-languagedetector
```

### UI / Feedback
```
react-toastify
react-icons
recharts
```

### Dev tooling
```
eslint @eslint/js
eslint-plugin-react eslint-plugin-react-hooks
eslint-plugin-react-refresh
@typescript-eslint/eslint-plugin @typescript-eslint/parser
prettier eslint-config-prettier eslint-plugin-prettier
```

### Testing
```
vitest @vitest/coverage-v8
@testing-library/react @testing-library/jest-dom @testing-library/user-event
jsdom
```

---

## Files to Create / Modify

### `vite.config.ts`
- Plugin: `@vitejs/plugin-react`
- Path alias: `@` → `src/`
- Test config: `environment: 'jsdom'`, `globals: true`, `setupFiles: ['src/test/setup.ts']`

### `tsconfig.json`
- `strict: true`
- `baseUrl: "."`, `paths: { "@/*": ["src/*"] }`
- `jsx: "react-jsx"`

### `tailwind.config.ts`
- Content: `["./index.html", "./src/**/*.{ts,tsx}"]`
- Extend theme with futuristic color palette:
  - `primary`: `#1DB954` (Spotify green)
  - `background`: `#0A0A0F`
  - `surface`: `#12121A`
  - `surface-alt`: `#1A1A26`
  - `border`: `#2A2A3E`
  - `text-primary`: `#FFFFFF`
  - `text-secondary`: `#A0A0B8`
  - `accent`: `#6C63FF`

### `postcss.config.ts`
- Plugins: `tailwindcss`, `autoprefixer`

### `.eslintrc.cjs`
- Parser: `@typescript-eslint/parser`
- Extends: `eslint:recommended`, `plugin:@typescript-eslint/recommended`, `plugin:react-hooks/recommended`, `prettier`
- Rules: `react/react-in-jsx-scope: off`, `prettier/prettier: error`
- `no-unused-vars: error`

### `.prettierrc`
```json
{
  "semi": false,
  "singleQuote": true,
  "trailingComma": "all",
  "printWidth": 100,
  "tabWidth": 2
}
```

### `.env.example`
```
VITE_SPOTIFY_CLIENT_ID=your_client_id_here
VITE_SPOTIFY_CLIENT_SECRET=your_client_secret_here
```

### `.gitignore`
- `.env` (never commit credentials)
- `node_modules`, `dist`, `.firebase`

### `src/test/setup.ts`
- Import `@testing-library/jest-dom`

### `package.json` scripts
```json
{
  "dev": "vite",
  "build": "tsc && vite build",
  "preview": "vite preview",
  "lint": "eslint src --ext .ts,.tsx --max-warnings 0",
  "lint:fix": "eslint src --ext .ts,.tsx --fix",
  "test": "vitest",
  "test:coverage": "vitest run --coverage",
  "format": "prettier --write src"
}
```

### `.husky` + `lint-staged` (pre-commit hook)
- On commit: run `eslint` on staged `.ts/.tsx` files
- Install: `husky`, `lint-staged`

---

## Acceptance Criteria
- [ ] `npm run dev` starts the app on `localhost:5173`
- [ ] `npm run lint` passes with zero warnings
- [ ] `npm run test` runs and exits cleanly
- [ ] `npm run build` compiles without errors
- [ ] Tailwind classes apply correctly in a smoke-test component
- [ ] Path alias `@/` resolves in both runtime and IDE
