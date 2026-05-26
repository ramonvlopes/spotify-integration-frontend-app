import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { Table } from '@/components/Table'
import type { TableColumn } from '@/components/Table'
import { Pagination } from '@/components/Pagination'
import { formatDuration } from '@/commons/helpers/formatDuration'
import { getAlbumTracks } from '@/services/albums'
import { QUERY_KEYS } from '@/commons/constants'
import type { AlbumTrack } from '@/services/albums/albums.types'

const PAGE_SIZE = 10

interface AlbumTracksListProps {
  albumId: string
}

export function AlbumTracksList({ albumId }: AlbumTracksListProps) {
  const { t } = useTranslation('albums')
  const [page, setPage] = useState(1)
  const offset = (page - 1) * PAGE_SIZE

  const { data, isLoading } = useQuery({
    queryKey: QUERY_KEYS.ALBUM_TRACKS(albumId, page),
    queryFn: () => getAlbumTracks({ albumId, limit: PAGE_SIZE, offset }),
  })

  const totalPages = Math.ceil((data?.total ?? 0) / PAGE_SIZE)

  const columns: TableColumn<AlbumTrack>[] = [
    {
      key: 'num',
      header: t('trackNumber'),
      width: '48px',
      render: (track) => <span className="text-text-secondary">{track.track_number}</span>,
    },
    {
      key: 'name',
      header: 'Track',
      render: (track) => <span className="text-text-primary">{track.name}</span>,
    },
    {
      key: 'duration',
      header: t('duration'),
      width: '80px',
      render: (track) => (
        <span className="text-text-secondary">{formatDuration(track.duration_ms)}</span>
      ),
    },
  ]

  return (
    <div className="mt-2">
      <Table
        columns={columns}
        data={data?.items ?? []}
        isLoading={isLoading}
        emptyMessage={t('noTracks')}
        keyExtractor={(track) => track.id}
      />
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
        isLoading={isLoading}
      />
    </div>
  )
}
