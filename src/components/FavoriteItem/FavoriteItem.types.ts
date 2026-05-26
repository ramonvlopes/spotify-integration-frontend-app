import type { FavoriteTrack } from '@/commons/constants/favorites.constants'

export interface FavoriteItemProps {
  favorite: FavoriteTrack
  onRemove: (id: string) => void
}
