import { useTranslation } from 'react-i18next'
import { FavoriteItem } from '@/components/FavoriteItem'
import { EmptyState } from '@/components/EmptyState'
import { HeartIcon } from '@/commons/icons'
import type { FavoriteTrack } from '@/commons/constants/favorites.constants'

interface FavoritesListProps {
  favorites: FavoriteTrack[]
  onRemove: (id: string) => void
}

export function FavoritesList({ favorites, onRemove }: FavoritesListProps) {
  const { t } = useTranslation('favorites')

  if (favorites.length === 0) {
    return <EmptyState message={t('noFavorites')} icon={<HeartIcon />} />
  }

  return (
    <div className="flex flex-col gap-3">
      {favorites.map((favorite) => (
        <FavoriteItem key={favorite.id} favorite={favorite} onRemove={onRemove} />
      ))}
    </div>
  )
}
