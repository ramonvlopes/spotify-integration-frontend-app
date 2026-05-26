import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { Table } from '@/components/Table'
import type { TableColumn } from '@/components/Table'
import { ErrorState } from '@/components/ErrorState'
import { formatDuration } from '@/commons/helpers/formatDuration'
import { getArtistTopTracks } from '@/services/artists'
import { QUERY_KEYS } from '@/commons/constants'
import type { Track } from '@/services/artists/artists.types'
import type { TopTracksSectionProps } from './TopTracksSection.types'

export function TopTracksSection({ artistId }: TopTracksSectionProps) {
  const { t } = useTranslation('artists')
  const { t: tAlbums } = useTranslation('albums')
  const {
    data: tracks,
    isLoading,
    isError,
  } = useQuery({
    queryKey: QUERY_KEYS.ARTIST_TOP_TRACKS(artistId),
    queryFn: () => getArtistTopTracks(artistId),
  })

  if (isError) return <ErrorState />

  const columns: TableColumn<Track>[] = [
    {
      key: 'index',
      header: tAlbums('trackNumber'),
      width: '48px',
      render: (_, index) => <span className="text-text-secondary">{index + 1}</span>,
    },
    {
      key: 'name',
      header: 'Track',
      render: (track) => (
        <div className="flex items-center gap-3">
          {track.album.images?.[0]?.url && (
            <img
              src={track.album.images[0].url}
              alt={track.album.name}
              className="w-8 h-8 rounded object-cover"
            />
          )}
          <div>
            <p className="font-medium text-text-primary">{track.name}</p>
            <p className="text-xs text-text-secondary">{track.album.name}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'duration',
      header: tAlbums('duration'),
      width: '80px',
      render: (track) => (
        <span className="text-text-secondary">{formatDuration(track.duration_ms)}</span>
      ),
    },
  ]

  return (
    <section>
      <h2 className="text-xl font-bold text-text-primary mb-4">{t('topTracks')}</h2>
      <Table
        columns={columns}
        data={tracks ?? []}
        isLoading={isLoading}
        emptyMessage="No tracks available"
        keyExtractor={(track) => track.id}
      />
    </section>
  )
}
