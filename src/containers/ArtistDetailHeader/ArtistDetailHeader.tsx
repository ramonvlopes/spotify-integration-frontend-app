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
      <div className="w-full h-64 bg-surface rounded-3xl flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (isError || !artist) return <ErrorState />

  const imageUrl = artist.images?.[0]?.url

  return (
    <div className="relative w-full rounded-3xl overflow-hidden bg-surface min-h-[280px]">
      {imageUrl && (
        <div className="absolute inset-0">
          <img
            src={imageUrl}
            alt={artist.name}
            className="w-full h-full object-cover opacity-25 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-transparent" />
        </div>
      )}
      {!imageUrl && (
        <div className="absolute inset-0 flex items-center justify-center">
          <MusicIcon className="text-9xl text-text-secondary/10" />
        </div>
      )}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="relative z-10 p-6 md:p-10 flex flex-col gap-5 justify-end">
        <div className="flex flex-col gap-3">
          <h1 className="font-display text-4xl md:text-6xl font-bold text-text-primary tracking-tight leading-none">
            {artist.name}
          </h1>
          {artist.genres && artist.genres.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {artist.genres.slice(0, 4).map((genre) => (
                <Badge key={genre} label={genre} variant="genre" />
              ))}
            </div>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-4">
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
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border backdrop-blur-sm text-sm font-medium transition-all duration-200 ${
              isArtistFavorited(artist.id)
                ? 'text-red-400 border-red-500/30 bg-red-500/10 shadow-[0_0_15px_rgba(239,68,68,0.2)]'
                : 'text-text-secondary border-white/[0.1] bg-white/[0.04] hover:border-red-500/30 hover:text-red-400'
            }`}
          >
            {isArtistFavorited(artist.id) ? <HeartIcon /> : <HeartOutlineIcon />}
            <span>
              {isArtistFavorited(artist.id)
                ? tCommon('removeFromFavorites')
                : tCommon('addToFavorites')}
            </span>
          </button>
          {artist.followers?.total !== undefined && (
            <span className="text-text-secondary text-sm">
              {t('followers', { total: formatFollowers(artist.followers.total) })}
            </span>
          )}
          {artist.popularity !== undefined && (
            <div className="flex items-center gap-3 min-w-[160px]">
              <span className="text-text-secondary text-sm">{t('popularity')}</span>
              <div className="flex-1">
                <PopularityBar value={artist.popularity} />
              </div>
            </div>
          )}
          {artist.external_urls?.spotify && (
            <a
              href={artist.external_urls.spotify}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-primary/30 bg-primary/10 text-primary text-sm hover:bg-primary/20 hover:shadow-glow-green-sm transition-all duration-200"
            >
              <ExternalLinkIcon />
              {tCommon('seeOnSpotify')}
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
