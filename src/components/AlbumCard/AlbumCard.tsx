import { useTranslation } from 'react-i18next'
import { DiscIcon, HeartIcon, HeartOutlineIcon } from '@/commons/icons'
import { useFavorites } from '@/context/FavoritesContext'
import type { AlbumCardProps } from './AlbumCard.types'

export function AlbumCard({ album, onClick }: AlbumCardProps) {
  const { t } = useTranslation()
  const { isAlbumFavorited, toggleAlbum } = useFavorites()
  const year = album.release_date?.split('-')[0] ?? ''
  const imageUrl = album.images?.[0]?.url
  const favorited = isAlbumFavorited(album.id)

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation()
    toggleAlbum({
      id: album.id,
      name: album.name,
      imageUrl,
      releaseDate: album.release_date,
      totalTracks: album.total_tracks,
    })
  }

  return (
    <button
      onClick={() => onClick(album.id)}
      className="group w-full text-left relative bg-surface/80 border border-white/[0.07] rounded-2xl overflow-hidden hover:border-accent/30 hover:shadow-[0_8px_40px_rgba(0,0,0,0.8),0_0_0_1px_rgba(124,58,237,0.2)] transition-all duration-300 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-accent/30 backdrop-blur-sm"
    >
      <div className="absolute inset-0 bg-gradient-card opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      <div className="relative aspect-square overflow-hidden bg-surface-alt">
        {imageUrl ? (
          <>
            <img
              src={imageUrl}
              alt={album.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <DiscIcon className="text-4xl text-text-secondary/30" />
          </div>
        )}
        <button
          onClick={handleFavorite}
          aria-label={favorited ? t('removeFromFavorites') : t('addToFavorites')}
          className={`absolute top-2 right-2 p-1.5 rounded-full backdrop-blur-md transition-all duration-200
            ${
              favorited
                ? 'text-red-400 bg-black/60 border border-red-500/30 opacity-100 shadow-[0_0_10px_rgba(239,68,68,0.3)]'
                : 'text-white/80 bg-black/40 border border-white/10 opacity-0 group-hover:opacity-100'
            } hover:scale-110 focus:outline-none focus:opacity-100`}
        >
          {favorited ? <HeartIcon /> : <HeartOutlineIcon />}
        </button>
      </div>
      <div className="p-3.5">
        <h4 className="font-display font-semibold text-text-primary text-sm truncate leading-tight">
          {album.name}
        </h4>
        <p className="text-xs text-text-secondary mt-1">
          {year} · {album.total_tracks} tracks
        </p>
      </div>
    </button>
  )
}
