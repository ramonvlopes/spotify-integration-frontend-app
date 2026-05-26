# SPEC-04 — Services: Endpoint Layers (Artists & Albums)

## Goal
Implement the domain-specific service files for the Spotify endpoints the app needs, following the established pattern: one folder per entity with `entity.ts`, `entity.types.ts`, `entity.constants.ts`.

---

## Spotify Endpoints Used

| Endpoint | Method | Description |
|----------|--------|-------------|
| `GET /search?q={q}&type=artist` | GET | Search artists by name |
| `GET /search?q=album:{album}&type=artist` | GET | Search artists by album |
| `GET /artists/{id}` | GET | Get artist details |
| `GET /artists/{id}/top-tracks?market=BR` | GET | Get artist top tracks |
| `GET /artists/{id}/albums?limit=20&offset=N` | GET | Get artist albums (paginated) |
| `GET /albums/{id}` | GET | Get album details |
| `GET /albums/{id}/tracks?limit=20&offset=N` | GET | Get album tracks (paginated) |

---

## Artists Service

### `src/services/artists/artists.types.ts`
```ts
export interface ArtistImage { url: string; height: number; width: number }
export interface Artist {
  id: string
  name: string
  images: ArtistImage[]
  followers: { total: number }
  genres: string[]
  popularity: number
  external_urls: { spotify: string }
}
export interface Track {
  id: string
  name: string
  duration_ms: number
  preview_url: string | null
  album: { name: string; images: ArtistImage[] }
  external_urls: { spotify: string }
}
export interface Album {
  id: string
  name: string
  album_type: string
  release_date: string
  images: ArtistImage[]
  total_tracks: number
  external_urls: { spotify: string }
}
export interface SpotifyPaginatedResponse<T> {
  items: T[]
  total: number
  limit: number
  offset: number
}
export interface SearchArtistsParams {
  query: string
  limit?: number
  offset?: number
}
export interface SearchByAlbumParams {
  album: string
  limit?: number
  offset?: number
}
export interface GetArtistAlbumsParams {
  artistId: string
  limit?: number
  offset?: number
}
```

### `src/services/artists/artists.constants.ts`
```ts
export const ARTISTS_ENDPOINTS = {
  SEARCH: '/search',
  ARTIST: (id: string) => `/artists/${id}`,
  TOP_TRACKS: (id: string) => `/artists/${id}/top-tracks`,
  ALBUMS: (id: string) => `/artists/${id}/albums`,
} as const

export const SEARCH_DEFAULT_LIMIT = 20
export const ALBUMS_DEFAULT_LIMIT = 20
export const TOP_TRACKS_MARKET = 'BR'
```

### `src/services/artists/artists.ts`
Functions to implement:
1. `searchArtists(params: SearchArtistsParams): Promise<SpotifyPaginatedResponse<Artist>>`
   - GET `/search?q={query}&type=artist&limit={limit}&offset={offset}`
   - Returns `response.data.artists`

2. `searchArtistsByAlbum(params: SearchByAlbumParams): Promise<SpotifyPaginatedResponse<Artist>>`
   - GET `/search?q=album:{album}&type=artist&limit={limit}&offset={offset}`
   - Returns `response.data.artists`

3. `getArtistById(id: string): Promise<Artist>`
   - GET `/artists/{id}`

4. `getArtistTopTracks(artistId: string): Promise<Track[]>`
   - GET `/artists/{id}/top-tracks?market=BR`
   - Returns `response.data.tracks`

5. `getArtistAlbums(params: GetArtistAlbumsParams): Promise<SpotifyPaginatedResponse<Album>>`
   - GET `/artists/{id}/albums?limit={limit}&offset={offset}`

**Max lines: ~80**

---

## Albums Service

### `src/services/albums/albums.types.ts`
```ts
export interface AlbumTrack {
  id: string
  name: string
  duration_ms: number
  track_number: number
  preview_url: string | null
  external_urls: { spotify: string }
  artists: Array<{ id: string; name: string }>
}
export interface AlbumDetail {
  id: string
  name: string
  album_type: string
  release_date: string
  images: Array<{ url: string; height: number; width: number }>
  total_tracks: number
  genres: string[]
  label: string
  popularity: number
  artists: Array<{ id: string; name: string }>
  external_urls: { spotify: string }
}
export interface GetAlbumTracksParams {
  albumId: string
  limit?: number
  offset?: number
}
```

### `src/services/albums/albums.constants.ts`
```ts
export const ALBUMS_ENDPOINTS = {
  ALBUM: (id: string) => `/albums/${id}`,
  TRACKS: (id: string) => `/albums/${id}/tracks`,
} as const

export const ALBUM_TRACKS_DEFAULT_LIMIT = 20
```

### `src/services/albums/albums.ts`
1. `getAlbumById(id: string): Promise<AlbumDetail>`
2. `getAlbumTracks(params: GetAlbumTracksParams): Promise<SpotifyPaginatedResponse<AlbumTrack>>`

**Max lines: ~40**

---

## React Query Keys

### `src/commons/constants/queryKeys.ts`
```ts
export const QUERY_KEYS = {
  SEARCH_ARTISTS: (query: string, page: number) => ['artists', 'search', query, page],
  SEARCH_BY_ALBUM: (album: string, page: number) => ['artists', 'album', album, page],
  ARTIST: (id: string) => ['artist', id],
  ARTIST_TOP_TRACKS: (id: string) => ['artist', id, 'top-tracks'],
  ARTIST_ALBUMS: (id: string, page: number) => ['artist', id, 'albums', page],
  ALBUM: (id: string) => ['album', id],
  ALBUM_TRACKS: (id: string, page: number) => ['album', id, 'tracks', page],
} as const
```

---

## Acceptance Criteria
- [ ] `searchArtists` returns paginated artists from Spotify
- [ ] `searchArtistsByAlbum` filters by album name
- [ ] `getArtistById` returns full artist object
- [ ] `getArtistTopTracks` returns array of up to 10 tracks
- [ ] `getArtistAlbums` returns paginated albums
- [ ] `getAlbumById` returns album details
- [ ] `getAlbumTracks` returns paginated tracks
- [ ] All functions use the `api` Axios instance from `core/api.ts`
- [ ] All files stay under 200 lines
