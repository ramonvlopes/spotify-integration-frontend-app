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
    <div className="group relative w-full bg-surface/80 border border-white/[0.07] rounded-2xl overflow-hidden hover:border-accent/30 hover:shadow-[0_8px_40px_rgba(0,0,0,0.8),0_0_0_1px_rgba(124,58,237,0.2)] transition-all duration-300 backdrop-blur-sm">
      <div className="relative aspect-square overflow-hidden bg-surface-alt">
        {album.imageUrl ? (
          <img
            src={album.imageUrl}
            alt={album.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <DiscIcon className="text-4xl text-text-secondary/30" />
          </div>
        )}
        <button
          onClick={() => toggleAlbum(album)}
          aria-label="Remover dos favoritos"
          className="absolute top-2 right-2 p-1.5 rounded-full text-red-400 bg-black/60 border border-red-500/30 shadow-[0_0_10px_rgba(239,68,68,0.3)] opacity-0 group-hover:opacity-100 hover:scale-110 transition-all duration-200 focus:outline-none focus:opacity-100 backdrop-blur-md"
        >
          <HeartIcon />
        </button>
      </div>
      <div className="p-3.5">
        <h4 className="font-display font-semibold text-text-primary text-sm truncate leading-tight">
          {album.name}
        </h4>
        <p className="text-xs text-text-secondary mt-1">
          {year}
          {album.totalTracks ? ` · ${album.totalTracks} tracks` : ''}
        </p>
      </div>
    </div>
  )
}
