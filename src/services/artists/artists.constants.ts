export const ARTISTS_ENDPOINTS = {
  SEARCH: '/search',
  ARTIST: (id: string) => `/artists/${id}`,
  ARTISTS_BATCH: '/artists',
  TOP_TRACKS: (id: string) => `/artists/${id}/top-tracks`,
  ALBUMS: (id: string) => `/artists/${id}/albums`,
} as const

export const SEARCH_DEFAULT_LIMIT = 10
export const ALBUMS_DEFAULT_LIMIT = 10
export const TOP_TRACKS_MARKET = 'BR'
