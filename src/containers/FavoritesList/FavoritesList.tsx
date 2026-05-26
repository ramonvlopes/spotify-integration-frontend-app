import { useTranslation } from 'react-i18next'
import { FavoriteItem } from '@/components/FavoriteItem'
import { EmptyState } from '@/components/EmptyState'
import { HeartIcon } from '@/commons/icons'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { FAVORITES_STORAGE_KEY } from '@/commons/constants/favorites.constants'
import type { FavoriteTrack } from '@/commons/constants/favorites.constants'

export function FavoritesList() {
  const { t } = useTranslation('favorites')
  const [favorites, setFavorites] = useLocalStorage<FavoriteTrack[]>(FAVORITES_STORAGE_KEY, [])

  const handleRemove = (id: string) => {
    setFavorites(favorites.filter((f) => f.id !== id))
  }

  if (favorites.length === 0) {
    return <EmptyState message={t('noFavorites')} icon={<HeartIcon />} />
  }

  return (
    <div className="flex flex-col gap-3">
      {favorites.map((favorite) => (
        <FavoriteItem key={favorite.id} favorite={favorite} onRemove={handleRemove} />
      ))}
    </div>
  )
}
