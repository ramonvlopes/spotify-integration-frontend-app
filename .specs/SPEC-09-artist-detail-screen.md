# SPEC-09 — Artist Detail Screen

## Goal
Build the detail page for a selected artist. Shows artist info, a chart, top tracks, and a paginated table of albums with the ability to drill into album tracks.

---

## Route
`/artists/:id`

---

## Screen Composition

```
ArtistDetailScreen
├── BackButton
├── ArtistDetailHeader (container)
│   ├── Artist image (large, with gradient overlay)
│   ├── Artist name + verified badge
│   ├── Genres (Badge list)
│   ├── Followers count
│   ├── PopularityBar
│   └── "See on Spotify" link
├── PopularityChart (container) ← Recharts
├── TopTracksSection (container)
│   └── Table (top 10 tracks, not paginated)
└── AlbumSection (container)
    ├── AlbumCard list (paginated, 20/page)
    └── AlbumTracksModal or AlbumTracksTable (on album click)
```

---

## Containers to Build

### `ArtistDetailHeader/`
**File:** `src/containers/ArtistDetailHeader/`

**Behavior:**
- Receives `artistId` from route param
- Uses `useQuery(QUERY_KEYS.ARTIST(id), () => getArtistById(id))`
- Renders artist hero section
- Large background image with a dark gradient overlay at the bottom for text legibility
- Design: full-width hero, `h-64 md:h-80`, image behind a `bg-gradient-to-t from-background to-transparent`

**Max lines: 100**

---

### `PopularityChart/`
**File:** `src/containers/PopularityChart/`

**Chart type:** `RadarChart` or `RadialBarChart` from Recharts
- **RadarChart** with metrics: Popularity, Follower score (normalized), Genre diversity
- OR a simpler `BarChart` comparing the artist's top 5 tracks by their individual popularity values

**Decision:** Use a `BarChart` with the top tracks' names on X axis and their popularity on Y axis. This is more meaningful data-driven content from the API.

**Data source:** Re-uses top tracks data (already fetched)

**Styling:**
- Chart background: transparent
- Bar fill: `#1DB954` (primary green) with `#6C63FF` (accent) for hover
- Tooltip: dark themed with `bg-surface` background
- Grid: subtle `#2A2A3E` lines

**Files:**
- `PopularityChart.tsx`
- `PopularityChart.types.ts`
- `index.ts`

**Max lines: 100**

---

### `TopTracksSection/`
**File:** `src/containers/TopTracksSection/`

**Behavior:**
- Uses `useQuery(QUERY_KEYS.ARTIST_TOP_TRACKS(id), () => getArtistTopTracks(id))`
- Renders `Table` component with columns: `#`, `Track`, `Album`, `Duration`
- Shows loading skeleton while fetching
- Not paginated (Spotify returns max 10 top tracks)

**Max lines: 80**

---

### `AlbumSection/`
**File:** `src/containers/AlbumSection/`

**Behavior:**
- Uses `useQuery(QUERY_KEYS.ARTIST_ALBUMS(id, page), () => getArtistAlbums(...))`
- Renders a grid of `AlbumCard` components (same pagination pattern as artist list)
- On album card click: fetches album tracks and shows them in an inline expandable row or a dedicated sub-route

**Implementation choice:** Inline expand (no modal, no extra route) — clicking an album toggles a `Table` of its tracks below the card. Simpler UX, no routing complexity.

**State:** `expandedAlbumId: string | null` in local component state

**Max lines (split if needed):**
- `AlbumSection.tsx` — layout + pagination logic
- `AlbumTracksList.tsx` — the expandable tracks table

---

## Routing Setup

### `src/screens/ArtistDetailScreen/ArtistDetailScreen.tsx`
- Reads `:id` from `useParams()`
- Composes all containers above in a layout
- `BackButton` at the top: `navigate(-1)` or `navigate('/')`

---

## Router Setup (`src/App.tsx` or `src/router.tsx`)

```tsx
const router = createBrowserRouter([
  { path: '/', element: <ArtistListScreen /> },
  { path: '/artists/:id', element: <ArtistDetailScreen /> },
  { path: '/favorites', element: <FavoritesScreen /> },
])
```

Use `react-router-dom` v6 (`createBrowserRouter`).

---

## Acceptance Criteria
- [ ] Navigating to `/artists/:id` shows that artist's data
- [ ] Artist hero image is displayed with gradient overlay
- [ ] Genres are rendered as badges
- [ ] Follower count is formatted (e.g., "1.2M followers")
- [ ] `PopularityBar` shows the artist's popularity score
- [ ] Top 10 tracks are listed in a `Table` with duration formatted as mm:ss
- [ ] Albums are paginated 20 per page
- [ ] Clicking an album expands a tracks table inline
- [ ] Recharts `BarChart` renders with top track popularity data
- [ ] All containers have unit tests
- [ ] Follower formatter utility (`commons/helpers`) has unit tests
