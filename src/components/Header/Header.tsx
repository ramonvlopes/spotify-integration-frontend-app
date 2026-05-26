import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { MusicIcon, HeartIcon } from '@/commons/icons'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { Tooltip } from '@/components/Tooltip'
import { useFavorites } from '@/context/FavoritesContext'

export function Header() {
  const { t } = useTranslation()
  const { hasFavorites } = useFavorites()

  return (
    <header className="sticky top-0 z-10 backdrop-blur-md bg-background/80 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 text-primary font-bold text-lg hover:opacity-80 transition-opacity"
        >
          <MusicIcon />
          <span>{t('appName')}</span>
        </Link>
        <div className="flex items-center gap-3">
          {hasFavorites ? (
            <Link
              to="/favorites"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-surface hover:bg-surface-alt transition-colors text-sm text-text-secondary hover:text-text-primary"
            >
              <HeartIcon />
              <span className="hidden sm:inline">{t('favorites')}</span>
            </Link>
          ) : (
            <Tooltip message={t('favoritesDisabledTooltip')}>
              <div
                aria-disabled="true"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border/40 bg-surface/40 text-sm text-text-secondary/40 cursor-not-allowed select-none"
              >
                <HeartIcon />
                <span className="hidden sm:inline">{t('favorites')}</span>
              </div>
            </Tooltip>
          )}
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  )
}
