export const ALBUMS_ENDPOINTS = {
  ALBUM: (id: string) => `/albums/${id}`,
  TRACKS: (id: string) => `/albums/${id}/tracks`,
} as const

export const ALBUM_TRACKS_DEFAULT_LIMIT = 20
