import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { AlbumCard } from '@/components/AlbumCard'
import { Skeleton } from '@/components/Skeleton'
import { Pagination } from '@/components/Pagination'
import { ErrorState } from '@/components/ErrorState'
import { Modal } from '@/components/Modal'
import { getArtistAlbums } from '@/services/artists'
import { QUERY_KEYS } from '@/commons/constants'
import { AlbumTracksList } from './AlbumTracksList'
import type { AlbumSectionProps } from './AlbumSection.types'

const PAGE_SIZE = 10

export function AlbumSection({ artistId }: AlbumSectionProps) {
  const { t } = useTranslation('artists')
  const [page, setPage] = useState(1)
  const [selectedAlbum, setSelectedAlbum] = useState<{ id: string; name: string } | null>(null)

  const { data, isLoading, isError } = useQuery({
    queryKey: QUERY_KEYS.ARTIST_ALBUMS(artistId, page),
    queryFn: () => getArtistAlbums({ artistId, limit: PAGE_SIZE, offset: (page - 1) * PAGE_SIZE }),
  })

  const totalPages = Math.ceil((data?.total ?? 0) / PAGE_SIZE)

  if (isError) return <ErrorState />

  return (
    <section>
      <h2 className="text-xl font-bold text-text-primary mb-4">{t('discography')}</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {isLoading &&
          Array.from({ length: PAGE_SIZE }).map((_, i) => (
            <div key={i} className="rounded-xl overflow-hidden bg-surface border border-border">
              <Skeleton className="aspect-square w-full" />
              <div className="p-3 flex flex-col gap-2">
                <Skeleton height="14px" width="80%" />
                <Skeleton height="12px" width="50%" />
              </div>
            </div>
          ))}
        {!isLoading &&
          data?.items.map((album) => (
            <AlbumCard
              key={album.id}
              album={album}
              onClick={(id) => {
                const found = data?.items.find((a) => a.id === id)
                setSelectedAlbum(found ? { id: found.id, name: found.name } : null)
              }}
            />
          ))}
      </div>
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
        isLoading={isLoading}
      />
      <Modal
        isOpen={!!selectedAlbum}
        onClose={() => setSelectedAlbum(null)}
        title={selectedAlbum?.name ?? ''}
      >
        {selectedAlbum && <AlbumTracksList albumId={selectedAlbum.id} />}
      </Modal>
    </section>
  )
}
