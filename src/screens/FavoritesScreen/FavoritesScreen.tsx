import { useTranslation } from 'react-i18next'
import { Header } from '@/components/Header'
import { FavoritesForm } from '@/containers/FavoritesForm'
import { FavoritesList } from '@/containers/FavoritesList'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { FAVORITES_STORAGE_KEY } from '@/commons/constants/favorites.constants'
import type { FavoriteTrack } from '@/commons/constants/favorites.constants'

export function FavoritesScreen() {
  const { t } = useTranslation('favorites')
  const [favorites, setFavorites] = useLocalStorage<FavoriteTrack[]>(FAVORITES_STORAGE_KEY, [])

  const handleAdd = (data: { artistName: string; trackName: string; albumName: string }) => {
    const newFavorite: FavoriteTrack = {
      id: crypto.randomUUID(),
      ...data,
      createdAt: new Date().toISOString(),
    }
    setFavorites([newFavorite, ...favorites])
  }

  const handleRemove = (id: string) => {
    setFavorites(favorites.filter((f) => f.id !== id))
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-3xl mx-auto px-4 py-8 flex flex-col gap-8">
        <h1 className="text-2xl font-bold text-text-primary">{t('title')}</h1>
        <FavoritesForm onAdd={handleAdd} />
        <FavoritesList favorites={favorites} onRemove={handleRemove} />
      </main>
    </div>
  )
}
