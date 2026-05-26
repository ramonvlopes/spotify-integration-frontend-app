import type { ArtistImage } from '../artists/artists.types'

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
  images: ArtistImage[]
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
