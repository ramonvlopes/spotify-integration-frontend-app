import { DiscIcon, HeartIcon } from '@/commons/icons'
import { useFavorites } from '@/context/FavoritesContext'
import type { FavoriteAlbum } from '@/context/FavoritesContext'

interface FavoriteAlbumCardProps {
  album: FavoriteAlbum
}

export function FavoriteAlbumCard({ album }: FavoriteAlbumCardProps) {
  const { toggleAlbum } = useFavorites()
  const year = album.releaseDate?.split('-')[0] ?? ''

  return (
    <div className="group relative w-full bg-surface border border-border rounded-xl overflow-hidden">
      <div className="relative aspect-square overflow-hidden bg-surface-alt">
        {album.imageUrl ? (
          <img src={album.imageUrl} alt={album.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <DiscIcon className="text-3xl text-text-secondary" />
          </div>
        )}
        <button
          onClick={() => toggleAlbum(album)}
          aria-label="Remover dos favoritos"
          className="absolute top-2 right-2 p-1.5 rounded-full text-red-500 bg-background/70
                     opacity-0 group-hover:opacity-100 hover:scale-110 transition-all duration-200
                     focus:outline-none focus:opacity-100"
        >
          <HeartIcon />
        </button>
      </div>
      <div className="p-3">
        <h4 className="font-medium text-text-primary text-sm truncate">{album.name}</h4>
        <p className="text-xs text-text-secondary mt-1">
          {year}
          {album.totalTracks ? ` · ${album.totalTracks} tracks` : ''}
        </p>
      </div>
    </div>
  )
}
