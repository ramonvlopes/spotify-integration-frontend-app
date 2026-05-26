import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { ArtistCard } from '@/components/ArtistCard'
import { AlbumCard } from '@/components/AlbumCard'
import { Skeleton } from '@/components/Skeleton'
import { EmptyState } from '@/components/EmptyState'
import { ErrorState } from '@/components/ErrorState'
import { SearchIcon } from '@/commons/icons'
import { searchArtists } from '@/services/artists'
import { searchAlbums } from '@/services/albums'
import { QUERY_KEYS } from '@/commons/constants'
import { useSearchContext } from '@/context/SearchContext'
import type { ArtistGridProps } from './ArtistGrid.types'

const PAGE_SIZE = 10
const GHOST_COUNT = 5

function GhostCard({ widths }: { widths: [string, string] }) {
  return (
    <div className="rounded-2xl overflow-hidden bg-surface border border-white/[0.07]">
      <div className="aspect-square w-full bg-white/[0.04]" />
      <div className="p-3.5 flex flex-col gap-2">
        <div className="h-3.5 rounded bg-white/[0.08]" style={{ width: widths[0] }} />
        <div className="h-3 rounded bg-white/[0.05]" style={{ width: widths[1] }} />
      </div>
    </div>
  )
}

const GHOST_WIDTHS: Array<[string, string]> = [
  ['75%', '50%'],
  ['60%', '40%'],
  ['80%', '55%'],
  ['65%', '45%'],
  ['70%', '48%'],
]

export function ArtistGrid({ onTotalChange }: ArtistGridProps) {
  const { t } = useTranslation('artists')
  const navigate = useNavigate()
  const { state } = useSearchContext()
  const { query, searchType, currentPage } = state
  const offset = (currentPage - 1) * PAGE_SIZE
  const enabled = query.trim().length > 0

  const artistQuery = useQuery({
    queryKey: QUERY_KEYS.SEARCH_ARTISTS(query, currentPage),
    queryFn: () => searchArtists({ query, limit: PAGE_SIZE, offset }),
    enabled: enabled && searchType === 'artist',
    staleTime: 1000 * 60 * 5,
  })

  const albumQuery = useQuery({
    queryKey: QUERY_KEYS.SEARCH_ALBUMS(query, currentPage),
    queryFn: () => searchAlbums({ query, limit: PAGE_SIZE, offset }),
    enabled: enabled && searchType === 'album',
    staleTime: 1000 * 60 * 5,
  })

  const data = searchType === 'artist' ? artistQuery.data : albumQuery.data
  const isLoading = searchType === 'artist' ? artistQuery.isLoading : albumQuery.isLoading
  const isError = searchType === 'artist' ? artistQuery.isError : albumQuery.isError
  const refetch = searchType === 'artist' ? artistQuery.refetch : albumQuery.refetch

  useEffect(() => {
    onTotalChange?.(data?.total ?? 0)
  }, [data?.total, onTotalChange])

  if (!enabled) {
    return (
      <div className="flex flex-col gap-6">
        <div className="flex flex-col items-center gap-4 py-10 text-center">
          <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
            <SearchIcon className="text-primary text-xl" />
          </div>
          <div className="flex flex-col gap-1.5">
            <p className="font-display font-semibold text-text-primary">{t('searchToDiscover')}</p>
            <p className="text-text-secondary text-sm max-w-xs">{t('searchPrompt')}</p>
          </div>
        </div>
        <div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 opacity-[0.13] pointer-events-none select-none"
          aria-hidden="true"
        >
          {Array.from({ length: GHOST_COUNT }).map((_, i) => (
            <GhostCard key={i} widths={GHOST_WIDTHS[i]} />
          ))}
        </div>
      </div>
    )
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

  if (isError) return <ErrorState onRetry={() => refetch()} />
  if (!data?.items?.length) return <EmptyState message={t('noArtists')} />

  if (searchType === 'album') {
    const albums = albumQuery.data?.items ?? []
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {albums.map((album) => (
          <AlbumCard
            key={album.id}
            album={album}
            onClick={() => {
              const artistId = album.artists?.[0]?.id
              if (artistId) navigate(`/artists/${artistId}`)
            }}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {(artistQuery.data?.items ?? []).map((artist) => (
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
