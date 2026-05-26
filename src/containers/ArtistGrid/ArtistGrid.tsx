import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { ArtistCard } from '@/components/ArtistCard'
import { Skeleton } from '@/components/Skeleton'
import { EmptyState } from '@/components/EmptyState'
import { ErrorState } from '@/components/ErrorState'
import { FeaturedArtists } from '@/containers/FeaturedArtists'
import { searchArtists, searchArtistsByAlbum } from '@/services/artists'
import { QUERY_KEYS } from '@/commons/constants'
import { useSearchContext } from '@/context/SearchContext'
import type { ArtistGridProps } from './ArtistGrid.types'

const PAGE_SIZE = 10

export function ArtistGrid({ onTotalChange }: ArtistGridProps) {
  const { t } = useTranslation('artists')
  const navigate = useNavigate()
  const { state } = useSearchContext()
  const { query, searchType, currentPage } = state
  const offset = (currentPage - 1) * PAGE_SIZE

  const enabled = query.trim().length > 0

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey:
      searchType === 'artist'
        ? QUERY_KEYS.SEARCH_ARTISTS(query, currentPage)
        : QUERY_KEYS.SEARCH_BY_ALBUM(query, currentPage),
    queryFn: () =>
      searchType === 'artist'
        ? searchArtists({ query, limit: PAGE_SIZE, offset })
        : searchArtistsByAlbum({ album: query, limit: PAGE_SIZE, offset }),
    enabled,
    staleTime: 1000 * 60 * 5,
  })

  useEffect(() => {
    onTotalChange?.(data?.total ?? 0)
  }, [data?.total, onTotalChange])

  if (!enabled) {
    return <FeaturedArtists />
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {Array.from({ length: PAGE_SIZE }).map((_, i) => (
          <div key={i} className="rounded-xl overflow-hidden bg-surface border border-border">
            <Skeleton className="aspect-square w-full" />
            <div className="p-3 flex flex-col gap-2">
              <Skeleton height="14px" width="80%" />
              <Skeleton height="12px" width="60%" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (isError) {
    return <ErrorState onRetry={() => refetch()} />
  }

  if (!data?.items?.length) {
    return <EmptyState message={t('noArtists')} />
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {data.items.map((artist) => (
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
  )
}
