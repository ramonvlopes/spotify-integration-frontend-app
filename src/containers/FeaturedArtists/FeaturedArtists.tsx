import { useQueries } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArtistCard } from '@/components/ArtistCard'
import { Skeleton } from '@/components/Skeleton'
import { getArtistById, FEATURED_ARTIST_IDS } from '@/services/artists'
import { QUERY_KEYS } from '@/commons/constants'

export function FeaturedArtists() {
  const { t } = useTranslation('artists')
  const navigate = useNavigate()

  const results = useQueries({
    queries: FEATURED_ARTIST_IDS.map((id) => ({
      queryKey: QUERY_KEYS.ARTIST(id),
      queryFn: () => getArtistById(id),
      staleTime: 1000 * 60 * 10,
    })),
  })

  const isLoading = results.some((r) => r.isLoading)
  const artists = results.flatMap((r) => (r.data ? [r.data] : []))

  return (
    <section>
      <h2 className="text-lg font-semibold text-text-secondary mb-4">{t('featuredArtists')}</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {isLoading &&
          Array.from({ length: FEATURED_ARTIST_IDS.length }).map((_, i) => (
            <div key={i} className="rounded-xl overflow-hidden bg-surface border border-border">
              <Skeleton className="aspect-square w-full" />
              <div className="p-3 flex flex-col gap-2">
                <Skeleton height="14px" width="80%" />
                <Skeleton height="12px" width="60%" />
              </div>
            </div>
          ))}
        {!isLoading &&
          artists.map((artist) => (
            <ArtistCard
              key={artist.id}
              id={artist.id}
              name={artist.name}
              imageUrl={artist.images?.[0]?.url}
              genres={artist.genres}
              followers={artist.followers?.total}
              popularity={artist.popularity}
              onClick={(id) => navigate(`/artists/${id}`)}
            />
          ))}
      </div>
    </section>
  )
}
