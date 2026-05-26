import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Header } from '@/components/Header'
import { ArtistCard } from '@/components/ArtistCard'
import { EmptyState } from '@/components/EmptyState'
import { HeartIcon } from '@/commons/icons'
import { useFavorites } from '@/context/FavoritesContext'
import { FavoriteAlbumCard } from './FavoriteAlbumCard'

export function FavoritesScreen() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { favoriteArtists, favoriteAlbums, hasFavorites } = useFavorites()

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-8 flex flex-col gap-10">
        <h1 className="text-2xl font-bold text-text-primary">{t('favorites')}</h1>
        {!hasFavorites && <EmptyState message={t('noFavorites')} icon={<HeartIcon />} />}
        {favoriteArtists.length > 0 && (
          <section>
            <h2 className="text-lg font-semibold text-text-secondary mb-4">
              {t('favoriteArtists')}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {favoriteArtists.map((artist) => (
                <ArtistCard
                  key={artist.id}
                  id={artist.id}
                  name={artist.name}
                  imageUrl={artist.imageUrl}
                  genres={artist.genres}
                  followers={artist.followers}
                  popularity={artist.popularity}
                  onClick={(id) => navigate(`/artists/${id}`)}
                />
              ))}
            </div>
          </section>
        )}
        {favoriteAlbums.length > 0 && (
          <section>
            <h2 className="text-lg font-semibold text-text-secondary mb-4">
              {t('favoriteAlbums')}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {favoriteAlbums.map((album) => (
                <FavoriteAlbumCard key={album.id} album={album} />
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  )
}
