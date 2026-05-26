import { useQueries } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { AlbumCard } from '@/components/AlbumCard'
import { Skeleton } from '@/components/Skeleton'
import { getAlbumById } from '@/services/albums'
import { QUERY_KEYS } from '@/commons/constants'

const FEATURED_ALBUM_IDS = [
  '2ANVost0y2y52ema1E9xAZ',
  '4LH4d3cOWNNsVw41Gqt2kv',
  '6trNtQUgC8cgbWcqoMYkOR',
  '3RQQmkQEvNCY4prGKE6oc5',
  '1NAmidJlEaVgA3MpcPFYGq',
  '5zi7WsKlIiUXv09tbGLKsE',
  '0FZK97MXMm5mUQ8mtudjuK',
  '3T4tUhGYeRNVUGevb0wThu',
  '2dIGnmEIy1WZIcZCFSj6i8',
  '4yP0hdKOZPNshxUOjY0cZj',
]

export function FeaturedAlbums() {
  const { t } = useTranslation('artists')
  const navigate = useNavigate()

  const results = useQueries({
    queries: FEATURED_ALBUM_IDS.map((id) => ({
      queryKey: QUERY_KEYS.ALBUM(id),
      queryFn: () => getAlbumById(id),
      staleTime: 1000 * 60 * 10,
    })),
  })

  const isLoading = results.some((r) => r.isLoading)
  const albums = results.flatMap((r) => (r.data ? [r.data] : []))

  return (
    <section>
      <h2 className="text-lg font-semibold text-text-secondary mb-4">{t('featuredAlbums')}</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {isLoading &&
          Array.from({ length: FEATURED_ALBUM_IDS.length }).map((_, i) => (
            <div key={i} className="rounded-xl overflow-hidden bg-surface border border-border">
              <Skeleton className="aspect-square w-full" />
              <div className="p-3 flex flex-col gap-2">
                <Skeleton height="14px" width="80%" />
                <Skeleton height="12px" width="60%" />
              </div>
            </div>
          ))}
        {!isLoading &&
          albums.map((album) => (
            <AlbumCard
              key={album.id}
              album={album}
              onClick={(albumId) => {
                const found = results.find((r) => r.data?.id === albumId)?.data
                const artistId = found?.artists?.[0]?.id
                if (artistId) navigate(`/artists/${artistId}`)
              }}
            />
          ))}
      </div>
    </section>
  )
}
