import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { AlbumCard } from '@/components/AlbumCard'
import { Skeleton } from '@/components/Skeleton'
import { EmptyState } from '@/components/EmptyState'
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

  const { data: albums = [], isLoading } = useQuery({
    queryKey: QUERY_KEYS.FEATURED_ALBUMS(),
    queryFn: async ({ signal }) => {
      const results = []
      for (const id of FEATURED_ALBUM_IDS) {
        if (signal?.aborted) break
        try {
          const album = await getAlbumById(id)
          results.push(album)
        } catch {
          // skip individual failures and continue
        }
        if (!signal?.aborted) {
          await new Promise<void>((resolve) => {
            const timer = setTimeout(resolve, 300)
            signal?.addEventListener('abort', () => clearTimeout(timer), { once: true })
          })
        }
      }
      if (results.length === 0) throw new Error('rate_limited')
      return results
    },
    staleTime: 1000 * 60 * 10,
    retry: 1,
    retryDelay: 30_000,
  })

  const allFailed = !isLoading && albums.length === 0

  return (
    <section className="flex flex-col gap-5">
      <div className="flex items-center gap-3">
        <h2 className="font-display font-bold text-xl text-gradient-violet">
          {t('featuredAlbums')}
        </h2>
        <div className="flex-1 h-px bg-gradient-to-r from-accent/20 to-transparent" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {isLoading &&
          Array.from({ length: FEATURED_ALBUM_IDS.length }).map((_, i) => (
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
          albums.map((album) => (
            <AlbumCard
              key={album.id}
              album={album}
              onClick={(albumId) => {
                const artistId = album.id === albumId ? album.artists?.[0]?.id : undefined
                if (artistId) navigate(`/artists/${artistId}`)
              }}
            />
          ))}
      </div>
      {allFailed && <EmptyState message={t('searchPrompt')} />}
    </section>
  )
}
