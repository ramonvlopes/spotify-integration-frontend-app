# SPEC-08 — Artist List Screen

## Goal
Build the main screen: a grid of artist cards with search by name or album, 20 items per page, and pagination. No tables — cards only.

---

## Route
`/` (root)

---

## Screen Composition

```
ArtistListScreen
├── Header (app title + LanguageSwitcher)
├── SearchBar (container)
├── ArtistGrid (container)
│   ├── ArtistCard × 20
│   └── EmptyState (if no results)
└── Pagination (component)
```

---

## Containers to Build

### `SearchBar/`
**File:** `src/containers/SearchBar/SearchBar.tsx`

**Behavior:**
- Renders an `Input` with a search icon
- Renders a toggle to switch between `'artist'` | `'album'` search modes
- Dispatches `SET_QUERY`, `SET_SEARCH_TYPE`, and `RESET_SEARCH` (reset page to 1 on new query) to `SearchContext`
- Debounce: 500ms using `useDebounce` hook before updating context

**Files:**
- `SearchBar.tsx`
- `SearchBar.types.ts`
- `index.ts`

**Max lines per file: 80**

---

### `ArtistGrid/`
**File:** `src/containers/ArtistGrid/ArtistGrid.tsx`

**Behavior:**
- Reads `query`, `searchType`, `currentPage` from `SearchContext`
- Uses React Query:
  - If `searchType === 'artist'`: `useQuery(QUERY_KEYS.SEARCH_ARTISTS(query, page), () => searchArtists(...))`
  - If `searchType === 'album'`: `useQuery(QUERY_KEYS.SEARCH_BY_ALBUM(album, page), () => searchArtistsByAlbum(...))`
- When `query` is empty: shows default state (search prompt message)
- When loading: shows grid of 20 `Skeleton` cards
- When error: shows `ErrorState` with retry button
- When empty: shows `EmptyState`
- When data: renders `ArtistCard` grid

**Grid layout:** `grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4`

**Navigation:** On `ArtistCard` click → `navigate('/artists/:id')`

**Files:**
- `ArtistGrid.tsx`
- `ArtistGrid.types.ts`
- `index.ts`

**Max lines: 120**

---

## Custom Hooks

### `src/hooks/useDebounce.ts`
```ts
function useDebounce<T>(value: T, delay: number): T
```
- Returns debounced value using `useState` + `useEffect` with cleanup

### `src/hooks/usePagination.ts`
```ts
interface UsePaginationResult {
  currentPage: number
  totalPages: number
  goToPage: (page: number) => void
  goNext: () => void
  goPrevious: () => void
}
function usePagination(total: number, limit: number): UsePaginationResult
```
- Reads/writes page via `SearchContext`
- Derives `totalPages = Math.ceil(total / limit)`

---

## Screen File

### `src/screens/ArtistListScreen/ArtistListScreen.tsx`
- Renders layout: sticky header, search bar, grid, pagination
- Reads `total` from query result and passes to `Pagination`
- Background: futuristic gradient — subtle radial glow from the top (CSS via Tailwind arbitrary values)

**Max lines: 80**

---

## Header Component
### `src/components/Header/`
**Props:** none (self-contained)
- App logo/icon (music note icon from `commons/icons`)
- App name: "Spotify Explorer"
- `LanguageSwitcher` on the right
- Sticky top, backdrop blur: `sticky top-0 backdrop-blur-md bg-background/80 border-b border-border z-10`

---

## Acceptance Criteria
- [ ] Typing in the search input (debounced 500ms) triggers a Spotify API call
- [ ] Toggling between artist/album search modes clears the current results and reruns the search
- [ ] 20 items per page are displayed
- [ ] Pagination controls navigate between pages
- [ ] Clicking an artist card navigates to `/artists/:id`
- [ ] Loading state shows 20 skeleton cards
- [ ] Empty state shows a message when no results are found
- [ ] Error state shows a retry button
- [ ] `useDebounce` hook has unit tests
- [ ] `usePagination` hook has unit tests
- [ ] `ArtistGrid` container has unit tests
- [ ] `SearchBar` container has unit tests
