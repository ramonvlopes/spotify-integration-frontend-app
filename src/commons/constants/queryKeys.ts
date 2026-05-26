export const QUERY_KEYS = {
  SEARCH_ARTISTS: (query: string, page: number) => ['artists', 'search', query, page] as const,
  SEARCH_BY_ALBUM: (album: string, page: number) => ['artists', 'album', album, page] as const,
  ARTIST: (id: string) => ['artist', id] as const,
  ARTIST_TOP_TRACKS: (id: string) => ['artist', id, 'top-tracks'] as const,
  ARTIST_ALBUMS: (id: string, page: number) => ['artist', id, 'albums', page] as const,
  ARTIST_ALBUMS_CHART: (id: string) => ['artist', id, 'albums', 'chart'] as const,
  ARTIST_LATEST_ALBUM: (id: string) => ['artist', id, 'albums', 'latest'] as const,
  ALBUM: (id: string) => ['album', id] as const,
  ALBUM_TRACKS: (id: string, page: number) => ['album', id, 'tracks', page] as const,
  FEATURED_ARTISTS: () => ['artists', 'featured'] as const,
  SEARCH_ALBUMS: (query: string, page: number) => ['albums', 'search', query, page] as const,
  FEATURED_ALBUMS: () => ['albums', 'featured'] as const,
} as const
