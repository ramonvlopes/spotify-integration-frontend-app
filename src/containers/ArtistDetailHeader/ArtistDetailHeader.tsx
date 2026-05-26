import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { ExternalLinkIcon, HeartIcon, HeartOutlineIcon, MusicIcon } from '@/commons/icons'
import { Badge } from '@/components/Badge'
import { PopularityBar } from '@/components/PopularityBar'
import { LoadingSpinner } from '@/components/LoadingSpinner'
import { ErrorState } from '@/components/ErrorState'
import { formatFollowers } from '@/commons/helpers/formatFollowers'
import { getArtistById } from '@/services/artists'
import { QUERY_KEYS } from '@/commons/constants'
import { useFavorites } from '@/context/FavoritesContext'
import type { ArtistDetailHeaderProps } from './ArtistDetailHeader.types'

export function ArtistDetailHeader({ artistId }: ArtistDetailHeaderProps) {
  const { t } = useTranslation('artists')
  const { t: tCommon } = useTranslation()
  const { isArtistFavorited, toggleArtist } = useFavorites()
  const {
    data: artist,
    isLoading,
    isError,
  } = useQuery({
    queryKey: QUERY_KEYS.ARTIST(artistId),
    queryFn: () => getArtistById(artistId),
  })

  if (isLoading) {
    return (
      <div className="w-full h-64 bg-surface rounded-2xl flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (isError || !artist) return <ErrorState />

  const imageUrl = artist.images?.[0]?.url

  return (
    <div className="relative w-full rounded-2xl overflow-hidden bg-surface">
      {imageUrl && (
        <div className="absolute inset-0">
          <img src={imageUrl} alt={artist.name} className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/60 to-transparent" />
        </div>
      )}
      {!imageUrl && (
        <div className="absolute inset-0 flex items-center justify-center">
          <MusicIcon className="text-8xl text-text-secondary opacity-20" />
        </div>
      )}
      <div className="relative z-10 p-6 md:p-8 flex flex-col gap-4 min-h-[200px] justify-end">
        <h1 className="text-3xl md:text-5xl font-bold text-text-primary">{artist.name}</h1>
        {artist.genres && artist.genres.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {artist.genres.slice(0, 4).map((genre) => (
              <Badge key={genre} label={genre} variant="genre" />
            ))}
          </div>
        )}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <button
            onClick={() =>
              toggleArtist({
                id: artist.id,
                name: artist.name,
                imageUrl: artist.images?.[0]?.url,
                genres: artist.genres,
                followers: artist.followers?.total,
                popularity: artist.popularity,
              })
            }
            aria-label={
              isArtistFavorited(artist.id)
                ? tCommon('removeFromFavorites')
                : tCommon('addToFavorites')
            }
            className={`flex items-center gap-1.5 text-sm transition-colors ${
              isArtistFavorited(artist.id)
                ? 'text-red-500'
                : 'text-text-secondary hover:text-red-400'
            }`}
          >
            {isArtistFavorited(artist.id) ? <HeartIcon /> : <HeartOutlineIcon />}
          </button>
          {artist.followers?.total !== undefined && (
            <span className="text-text-secondary text-sm">
              {t('followers', { total: formatFollowers(artist.followers.total) })}
            </span>
          )}
          {artist.popularity !== undefined && (
            <div className="sm:flex-1 max-w-xs">
              <div className="flex items-center gap-2 text-sm text-text-secondary mb-1">
                <span>{t('popularity')}</span>
              </div>
              <PopularityBar value={artist.popularity} />
            </div>
          )}
          <a
            href={artist.external_urls.spotify}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
          >
            <ExternalLinkIcon />
            {tCommon('seeOnSpotify')}
          </a>
        </div>
      </div>
    </div>
  )
}
