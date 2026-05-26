import { createContext, useContext, useCallback } from 'react'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import type { FavoritesContextValue, FavoriteArtist, FavoriteAlbum } from './FavoritesContext.types'

const ARTISTS_KEY = 'spotify-explorer:favorite-artists'
const ALBUMS_KEY = 'spotify-explorer:favorite-albums'

const FavoritesContext = createContext<FavoritesContextValue | null>(null)

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favoriteArtists, setFavoriteArtists] = useLocalStorage<FavoriteArtist[]>(ARTISTS_KEY, [])
  const [favoriteAlbums, setFavoriteAlbums] = useLocalStorage<FavoriteAlbum[]>(ALBUMS_KEY, [])

  const isArtistFavorited = useCallback(
    (id: string) => favoriteArtists.some((a) => a.id === id),
    [favoriteArtists],
  )

  const isAlbumFavorited = useCallback(
    (id: string) => favoriteAlbums.some((a) => a.id === id),
    [favoriteAlbums],
  )

  const toggleArtist = useCallback(
    (artist: Omit<FavoriteArtist, 'createdAt'>) => {
      if (isArtistFavorited(artist.id)) {
        setFavoriteArtists((prev) => prev.filter((a) => a.id !== artist.id))
      } else {
        setFavoriteArtists((prev) => [{ ...artist, createdAt: new Date().toISOString() }, ...prev])
      }
    },
    [isArtistFavorited, setFavoriteArtists],
  )

  const toggleAlbum = useCallback(
    (album: Omit<FavoriteAlbum, 'createdAt'>) => {
      if (isAlbumFavorited(album.id)) {
        setFavoriteAlbums((prev) => prev.filter((a) => a.id !== album.id))
      } else {
        setFavoriteAlbums((prev) => [{ ...album, createdAt: new Date().toISOString() }, ...prev])
      }
    },
    [isAlbumFavorited, setFavoriteAlbums],
  )

  const hasFavorites = favoriteArtists.length > 0 || favoriteAlbums.length > 0

  return (
    <FavoritesContext.Provider
      value={{
        favoriteArtists,
        favoriteAlbums,
        toggleArtist,
        toggleAlbum,
        isArtistFavorited,
        isAlbumFavorited,
        hasFavorites,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useFavorites(): FavoritesContextValue {
  const ctx = useContext(FavoritesContext)
  if (!ctx) throw new Error('useFavorites must be used within FavoritesProvider')
  return ctx
}
