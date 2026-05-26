# SPEC-10 — Favorites Form & Favorites Screen

## Goal
Build a form to register favorite tracks (artist name + track name + album name), validated with Zod + React Hook Form, persisted to localStorage. Display the saved list on a dedicated screen.

---

## Route
`/favorites`

---

## Screen Composition

```
FavoritesScreen
├── Header (reused)
├── FavoritesForm (container)
│   ├── Input (artist name)
│   ├── Input (track name)
│   ├── Input (album name)
│   └── Button (save)
└── FavoritesList (container)
    ├── FavoriteItem × N
    └── EmptyState (if no favorites)
```

---

## Zod Schema

### `src/containers/FavoritesForm/FavoritesForm.schema.ts`
```ts
import { z } from 'zod'

export const favoritesSchema = z.object({
  artistName: z.string().min(2, { message: 'validation.minLength' }).max(100),
  trackName: z.string().min(2, { message: 'validation.minLength' }).max(100),
  albumName: z.string().min(2, { message: 'validation.minLength' }).max(100),
})

export type FavoritesFormData = z.infer<typeof favoritesSchema>
```

---

## Custom Hook

### `src/hooks/useLocalStorage.ts`
```ts
function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void]
```
- Reads initial value from `localStorage.getItem(key)` (JSON.parse)
- Setter: calls `localStorage.setItem(key, JSON.stringify(value))` and updates state
- Handles JSON parse errors gracefully (falls back to `initialValue`)

**Max lines: ~40**

---

## Favorite Item Type

### `src/commons/constants/favorites.constants.ts`
```ts
export const FAVORITES_STORAGE_KEY = 'spotify-explorer:favorites'
```

### Shared type (in `commons` or `containers/FavoritesForm`):
```ts
export interface FavoriteTrack {
  id: string          // crypto.randomUUID()
  artistName: string
  trackName: string
  albumName: string
  createdAt: string   // ISO string
}
```

---

## Containers to Build

### `FavoritesForm/`
**Files:** `FavoritesForm.tsx`, `FavoritesForm.schema.ts`, `FavoritesForm.types.ts`, `index.ts`

**Behavior:**
- `useForm<FavoritesFormData>({ resolver: zodResolver(favoritesSchema) })`
- On valid submit: creates a `FavoriteTrack` object, prepends to existing favorites in localStorage, resets form, shows `toast.success` with i18n message
- On invalid: shows inline validation error messages under each field (from Zod)
- Visual feedback: each field border turns red on error, green on valid value
- Submit button: `isLoading` state while saving (brief 300ms artificial delay for UX)

**Max lines: 120**

---

### `FavoritesList/`
**Files:** `FavoritesList.tsx`, `FavoritesList.types.ts`, `index.ts`

**Behavior:**
- Reads favorites from localStorage via `useLocalStorage`
- Renders a list of `FavoriteItem` components
- Shows `EmptyState` when list is empty

**Max lines: 60**

---

### `FavoriteItem/`
**File:** `src/components/FavoriteItem/`

**Props:**
```ts
interface FavoriteItemProps {
  favorite: FavoriteTrack
  onRemove: (id: string) => void
}
```
**Design:** Dark card row with artist name, track name (emphasized), album name, creation date, and a delete icon button on the right.

**Max lines: 50**

---

## Navigation
- A "Favorites" link in the `Header` component (star icon from `commons/icons`)
- Accessible from any page via the persistent header

---

## Acceptance Criteria
- [ ] Form renders with 3 fields: artist, track, album
- [ ] Submitting with empty fields shows Zod validation errors
- [ ] Submitting with fields < 2 chars shows min-length error
- [ ] Valid submit adds item to localStorage and shows toast.success
- [ ] After submit, form resets to empty
- [ ] Saved favorites persist after page refresh
- [ ] Delete button removes item from localStorage and list
- [ ] FavoritesList shows EmptyState when no items exist
- [ ] `useLocalStorage` hook has unit tests
- [ ] `FavoritesForm` schema validation has unit tests
- [ ] `FavoritesForm` container has unit tests (submit, validation feedback)
