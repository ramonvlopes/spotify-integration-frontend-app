# SPEC-07 — Shared Components (Presentational)

## Goal
Build the reusable UI building blocks that the containers and screens will compose. All components are stateless and receive everything via props.

---

## Visual Theme Reference
All components must use the custom Tailwind palette from SPEC-01:
- Background: `bg-background` (#0A0A0F)
- Surface: `bg-surface` (#12121A)
- Surface alt: `bg-surface-alt` (#1A1A26)
- Border: `border-border` (#2A2A3E)
- Primary: `text-primary` / `bg-primary` (#1DB954 — Spotify green)
- Accent: `text-accent` / `bg-accent` (#6C63FF)
- Text primary: `text-text-primary`
- Text secondary: `text-text-secondary`

---

## Components to Build

### `Button/`
**Props:** `variant: 'primary' | 'secondary' | 'ghost'`, `size: 'sm' | 'md' | 'lg'`, `isLoading?: boolean`, `disabled?`, standard button props
**Behavior:** Shows spinner icon when `isLoading=true`

---

### `Input/`
**Props:** `label?: string`, `error?: string`, `leftIcon?: ReactNode`, standard input props
**Behavior:** Renders error message below input in red; left icon slot for search icon

---

### `Badge/`
**Props:** `label: string`, `variant: 'genre' | 'type' | 'default'`
**Use:** Display artist genres, album types

---

### `ArtistCard/`
**Props:**
```ts
interface ArtistCardProps {
  id: string
  name: string
  imageUrl: string | undefined
  genres: string[]
  followers: number
  popularity: number
  onClick: (id: string) => void
}
```
**Design:** Dark card with artist image (aspect-square, object-cover), name, top 2 genres as badges, follower count. Hover: subtle scale + border glow effect (Tailwind `transition`, `hover:scale-[1.02]`, `hover:border-primary/50`).

---

### `LoadingSpinner/`
**Props:** `size?: 'sm' | 'md' | 'lg'`, `fullPage?: boolean`
**Behavior:** When `fullPage=true`, centers spinner in the viewport with an overlay

---

### `ErrorState/`
**Props:** `message?: string`, `onRetry?: () => void`
**Design:** Centered error icon + message + optional retry button

---

### `EmptyState/`
**Props:** `message: string`, `icon?: ReactNode`
**Design:** Centered icon + message, used for "no results found" states

---

### `Pagination/`
**Props:**
```ts
interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  isLoading?: boolean
}
```
**Design:** Previous / Next buttons + "Page X of Y" label. Buttons disabled at boundaries and when loading.

---

### `Table/`
**Props:**
```ts
interface Column<T> { key: string; header: string; render: (row: T) => ReactNode; width?: string }
interface TableProps<T> { columns: Column<T>[]; data: T[]; isLoading?: boolean; emptyMessage?: string }
```
**Design:** Dark themed table, zebra rows (`bg-surface` / `bg-surface-alt`), sticky header. When `isLoading`, shows skeleton rows (4 rows of animated pulse divs).

---

### `TrackRow/`
**Props:** `track: Track`, `index: number`
**Use:** Rendered inside Table for top tracks / album tracks. Shows index, name, album art thumbnail, duration (formatted mm:ss).

---

### `AlbumCard/`
**Props:** `album: Album`, `onClick: (id: string) => void`
**Design:** Smaller card for album grid/list view. Image, name, year, track count.

---

### `LanguageSwitcher/`
**Props:** none (reads/writes via `useAppContext` + `i18next`)
**Design:** Toggle pill: `PT | EN`, active language highlighted in primary green

---

### `PopularityBar/`
**Props:** `value: number` (0–100)
**Design:** A thin bar with gradient fill from `accent` to `primary`, percentage label beside it. Animated fill on mount.

---

### `Skeleton/`
**Props:** `width?: string`, `height?: string`, `rounded?: boolean`
**Use:** Building block for loading skeletons across the app

---

## Acceptance Criteria
- [ ] Each component folder has `index.ts`, `ComponentName.tsx`, and `.types.ts` if props are non-trivial
- [ ] No component exceeds 200 lines
- [ ] No component imports from `services/` or `context/`
- [ ] All components have unit tests (render smoke test + key behavior)
- [ ] `Table` renders skeleton rows when `isLoading=true`
- [ ] `ArtistCard` calls `onClick` with the artist id when clicked
- [ ] `Pagination` disables previous on page 1 and next on last page
