import { useQueries } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArtistCard } from '@/components/ArtistCard'
import { Skeleton } from '@/components/Skeleton'
import { EmptyState } from '@/components/EmptyState'
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
      retry: false,
    })),
  })

  const isLoading = results.some((r) => r.isLoading)
  const artists = results.flatMap((r) => (r.data ? [r.data] : []))
  const allFailed = !isLoading && artists.length === 0

  return (
    <section className="flex flex-col gap-5">
      <div className="flex items-center gap-3">
        <h2 className="font-display font-bold text-xl text-gradient">{t('featuredArtists')}</h2>
        <div className="flex-1 h-px bg-gradient-to-r from-primary/20 to-transparent" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {isLoading &&
          Array.from({ length: FEATURED_ARTIST_IDS.length }).map((_, i) => (
            <div
              key={i}
              className="rounded-2xl overflow-hidden bg-surface border border-white/[0.07]"
            >
              <Skeleton className="aspect-square w-full" />
              <div className="p-3.5 flex flex-col gap-2">
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
      {allFailed && <EmptyState message={t('searchPrompt')} />}
    </section>
  )
}
