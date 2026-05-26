import { useTranslation } from 'react-i18next'
import { TrashIcon, MusicIcon } from '@/commons/icons'
import { formatDate } from '@/commons/helpers/formatDate'
import type { FavoriteItemProps } from './FavoriteItem.types'

export function FavoriteItem({ favorite, onRemove }: FavoriteItemProps) {
  const { t, i18n } = useTranslation('favorites')
  return (
    <div className="flex items-center justify-between gap-4 bg-surface border border-border rounded-xl p-4 hover:border-primary/30 transition-colors">
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-10 h-10 rounded-lg bg-surface-alt flex items-center justify-center flex-shrink-0">
          <MusicIcon className="text-primary" />
        </div>
        <div className="min-w-0">
          <p className="font-medium text-text-primary truncate">{favorite.trackName}</p>
          <p className="text-sm text-text-secondary truncate">
            {favorite.artistName} · {favorite.albumName}
          </p>
          <p className="text-xs text-text-secondary/60 mt-0.5">
            {t('addedAt', { date: formatDate(favorite.createdAt, i18n.language) })}
          </p>
        </div>
      </div>
      <button
        onClick={() => onRemove(favorite.id)}
        className="flex-shrink-0 p-2 rounded-lg text-text-secondary hover:text-red-400 hover:bg-red-400/10 transition-colors"
        aria-label={t('remove')}
      >
        <TrashIcon />
      </button>
    </div>
  )
}
