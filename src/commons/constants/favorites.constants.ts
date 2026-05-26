export const FAVORITES_STORAGE_KEY = 'spotify-explorer:favorites'

export interface FavoriteTrack {
  id: string
  artistName: string
  trackName: string
  albumName: string
  createdAt: string
}
