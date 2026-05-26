import { useTranslation } from 'react-i18next'
import { MusicIcon, HeartIcon, HeartOutlineIcon } from '@/commons/icons'
import { Badge } from '@/components/Badge'
import { PopularityBar } from '@/components/PopularityBar'
import { formatFollowers } from '@/commons/helpers/formatFollowers'
import { useFavorites } from '@/context/FavoritesContext'
import type { ArtistCardProps } from './ArtistCard.types'

export function ArtistCard({
  id,
  name,
  imageUrl,
  genres,
  followers,
  popularity,
  onClick,
}: ArtistCardProps) {
  const { t } = useTranslation()
  const { isArtistFavorited, toggleArtist } = useFavorites()
  const favorited = isArtistFavorited(id)

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation()
    toggleArtist({ id, name, imageUrl, genres, followers, popularity })
  }

  return (
    <button
      onClick={() => onClick(id)}
      className="group w-full text-left relative bg-surface/80 border border-white/[0.07] rounded-2xl overflow-hidden hover:border-primary/30 hover:shadow-card-hover transition-all duration-300 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-primary/30 backdrop-blur-sm"
    >
      <div className="absolute inset-0 bg-gradient-card opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      <div className="relative aspect-square overflow-hidden bg-surface-alt">
        {imageUrl ? (
          <>
            <img
              src={imageUrl}
              alt={name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <MusicIcon className="text-5xl text-text-secondary/30" />
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
      <div className="p-3.5 flex flex-col gap-2">
        <h3 className="font-display font-semibold text-text-primary text-sm truncate leading-tight">
          {name}
        </h3>
        {genres && genres.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {genres.slice(0, 2).map((genre) => (
              <Badge key={genre} label={genre} variant="genre" />
            ))}
          </div>
        )}
        {followers !== undefined && (
          <p className="text-xs text-text-secondary">{formatFollowers(followers)} followers</p>
        )}
        {popularity !== undefined && <PopularityBar value={popularity} />}
      </div>
    </button>
  )
}
