import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { Table } from '@/components/Table'
import type { TableColumn } from '@/components/Table'
import { ErrorState } from '@/components/ErrorState'
import { LoadingSpinner } from '@/components/LoadingSpinner'
import { formatDuration } from '@/commons/helpers/formatDuration'
import { getArtistAlbums } from '@/services/artists'
import { getAlbumTracks } from '@/services/albums'
import { QUERY_KEYS } from '@/commons/constants'
import type { AlbumTrack } from '@/services/albums/albums.types'
import type { TopTracksSectionProps } from './TopTracksSection.types'

export function TopTracksSection({ artistId }: TopTracksSectionProps) {
  const { t } = useTranslation('artists')
  const { t: tAlbums } = useTranslation('albums')

  const { data: albumsData, isLoading: albumsLoading } = useQuery({
    queryKey: QUERY_KEYS.ARTIST_ALBUMS(artistId, 1),
    queryFn: () => getArtistAlbums({ artistId, limit: 1, offset: 0 }),
  })

  const latestAlbum = albumsData?.items?.[0]

  const {
    data: tracksData,
    isLoading: tracksLoading,
    isError,
  } = useQuery({
    queryKey: latestAlbum ? QUERY_KEYS.ALBUM_TRACKS(latestAlbum.id, 1) : ['skip'],
    queryFn: () => getAlbumTracks({ albumId: latestAlbum!.id, limit: 10, offset: 0 }),
    enabled: !!latestAlbum,
  })

  if (albumsLoading || tracksLoading) {
    return (
      <section>
        <h2 className="text-xl font-bold text-text-primary mb-4">{t('topTracks')}</h2>
        <div className="flex justify-center py-8">
          <LoadingSpinner />
        </div>
      </section>
    )
  }

  if (isError || !latestAlbum) return <ErrorState />

  const columns: TableColumn<AlbumTrack>[] = [
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
        <div>
          <p className="font-medium text-text-primary">{track.name}</p>
          <p className="text-xs text-text-secondary">{latestAlbum.name}</p>
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
        data={tracksData?.items ?? []}
        isLoading={false}
        emptyMessage={tAlbums('noTracks')}
        keyExtractor={(track) => track.id}
      />
    </section>
  )
}
