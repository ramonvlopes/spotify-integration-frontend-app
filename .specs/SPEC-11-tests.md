# SPEC-11 — Tests (Vitest + React Testing Library)

## Goal
Ensure every functional unit of the app has automated unit tests. Coverage must include: components, containers, hooks, reducers, services helpers, utils, and Zod schemas.

---

## Setup (from SPEC-01)
- `vitest` with `jsdom` environment
- `@testing-library/react`, `@testing-library/jest-dom`, `@testing-library/user-event`
- `src/test/setup.ts` importing `@testing-library/jest-dom`
- `src/test/utils.tsx` — custom `render` wrapper that includes all Providers (QueryClient, AppProvider, SearchProvider, Router, i18n, ToastContainer)

---

## Test File Naming & Location
Each test file lives alongside its source file:
```
Button/
  Button.tsx
  Button.test.tsx
```

For hooks, utils, reducers:
```
hooks/useDebounce.ts
hooks/useDebounce.test.ts
```

---

## What to Test

### Components
For each component in SPEC-07, at minimum:

| Component | Tests |
|-----------|-------|
| `Button` | renders label; shows spinner when `isLoading`; is disabled when `disabled` |
| `Input` | renders with label; shows error message; calls onChange |
| `Badge` | renders label; applies correct variant class |
| `ArtistCard` | renders name; calls onClick with id; shows genres |
| `LoadingSpinner` | renders; applies fullPage overlay |
| `ErrorState` | renders message; calls onRetry |
| `EmptyState` | renders message |
| `Pagination` | disables prev on page 1; disables next on last page; calls onPageChange |
| `Table` | renders columns and rows; shows skeleton when loading; shows empty message |
| `PopularityBar` | renders with correct width % |
| `LanguageSwitcher` | renders PT and EN options; calls language change |

---

### Hooks

| Hook | Tests |
|------|-------|
| `useDebounce` | returns initial value immediately; returns debounced value after delay; cancels on unmount |
| `usePagination` | derives totalPages correctly; goNext increments; goPrevious decrements; goToPage sets page |
| `useLocalStorage` | reads initial value; writes and reads back; handles invalid JSON |

---

### Reducers

| Reducer | Tests |
|---------|-------|
| `appReducer` | SET_LANGUAGE changes language; SET_SEARCH_TYPE changes type; unknown action returns state unchanged |
| `searchReducer` | SET_QUERY updates query; SET_PAGE updates page; RESET_SEARCH resets to initial; SET_SEARCH_TYPE clears query and resets page |

---

### Services / Utils

| Unit | Tests |
|------|-------|
| `token.ts` — `isTokenExpired` | returns true when `expiresAt < Date.now()`; returns false when valid |
| `commons/helpers/formatDuration` | converts ms to mm:ss correctly (e.g., 200000ms → "3:20") |
| `commons/helpers/formatFollowers` | formats 1234567 → "1.2M"; 12345 → "12.3K"; 999 → "999" |
| `commons/helpers/formatDate` | formats ISO date to locale-aware readable string |
| `FavoritesForm schema` | valid data passes; empty strings fail; < 2 chars fails with correct message |

---

### Containers (Integration-style unit tests)

Mock the service layer and React Query for container tests.

| Container | Tests |
|-----------|-------|
| `SearchBar` | typing debounces and dispatches SET_QUERY; toggling mode dispatches SET_SEARCH_TYPE |
| `ArtistGrid` | shows skeletons while loading; shows artist cards when data arrives; shows EmptyState when empty; shows ErrorState on error |
| `ArtistDetailHeader` | renders artist name and genres when data loads; shows spinner while loading |
| `TopTracksSection` | renders track rows with correct duration format |
| `FavoritesForm` | shows validation errors on empty submit; calls localStorage on valid submit; resets form after submit |
| `FavoritesList` | renders items from localStorage; shows EmptyState when empty |

---

## Mocking Strategy

### Axios / Services
Use `vi.mock('@/services/artists/artists')` to mock service functions.

### React Query
Wrap tests in a `QueryClient` with `retry: false` and `gcTime: 0` to prevent test interference.

### localStorage
Use `vi.stubGlobal('localStorage', { getItem: vi.fn(), setItem: vi.fn(), ... })` or the built-in jsdom localStorage.

### i18n
Configure i18next in test mode with a simple key-as-value fallback so tests don't depend on translation strings.

---

## Coverage Targets
- Statements: > 80%
- Branches: > 75%
- Functions: > 80%

Run with: `npm run test:coverage`

---

## Acceptance Criteria
- [ ] `npm run test` passes with zero failures
- [ ] All component smoke tests pass
- [ ] All reducer tests cover every action type
- [ ] All hook tests use `renderHook` from RTL
- [ ] Helper/util tests are pure (no React, no mocks needed)
- [ ] Container tests mock service layer
- [ ] `npm run test:coverage` shows > 80% statement coverage
