export interface ArtistImage {
  url: string
  height: number
  width: number
}

export interface Artist {
  id: string
  name: string
  images: ArtistImage[]
  followers?: { total: number }
  genres?: string[]
  popularity?: number
  external_urls: { spotify: string }
}

export interface Track {
  id: string
  name: string
  duration_ms: number
  preview_url: string | null
  album: { name: string; images: ArtistImage[] }
  external_urls: { spotify: string }
  popularity: number
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
