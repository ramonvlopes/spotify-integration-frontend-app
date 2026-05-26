export interface FavoriteArtist {
  id: string
  name: string
  imageUrl?: string
  genres?: string[]
  followers?: number
  popularity?: number
  createdAt: string
}

export interface FavoriteAlbum {
  id: string
  name: string
  imageUrl?: string
  releaseDate?: string
  totalTracks?: number
  createdAt: string
}

export interface FavoritesContextValue {
  favoriteArtists: FavoriteArtist[]
  favoriteAlbums: FavoriteAlbum[]
  toggleArtist: (artist: Omit<FavoriteArtist, 'createdAt'>) => void
  toggleAlbum: (album: Omit<FavoriteAlbum, 'createdAt'>) => void
  isArtistFavorited: (id: string) => boolean
  isAlbumFavorited: (id: string) => boolean
  hasFavorites: boolean
}
