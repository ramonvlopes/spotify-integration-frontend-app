export const ARTISTS_ENDPOINTS = {
  SEARCH: '/search',
  ARTIST: (id: string) => `/artists/${id}`,
  TOP_TRACKS: (id: string) => `/artists/${id}/top-tracks`,
  ALBUMS: (id: string) => `/artists/${id}/albums`,
} as const

export const FEATURED_ARTIST_IDS = [
  '1Xyo4u8uXC1ZmMpatF05PJ',
  '3TVXtAsR1Inumwj472S9r4',
  '4q3ewBCX7sLwd24euuV69X',
  '06HL4z0CvFAxyc27GXpf02',
  '2YZyLoL8N0Wb9xBt1NhZWg',
  '6vWDO969PvNqNYHIOW5v0m',
  '6eUKZXaKkcviH0Ku9w2n3V',
  '7dGJo4pcD2V6oG8kP0tJRR',
  '29CQLw9uLWsl8Qkz9holfr',
  '246dkjvS1zLTtiykXe5h60',
] as const

export const SEARCH_DEFAULT_LIMIT = 10
export const ALBUMS_DEFAULT_LIMIT = 10
export const TOP_TRACKS_MARKET = 'BR'
