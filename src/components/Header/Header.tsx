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
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-background/60 border-b border-white/[0.06]">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/[0.03] via-transparent to-accent/[0.03] pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center group-hover:bg-primary/20 group-hover:shadow-glow-green-sm transition-all duration-300">
            <MusicIcon className="text-primary text-sm" />
          </div>
          <span className="font-display font-bold text-lg text-gradient tracking-tight">
            {t('appName')}
          </span>
        </Link>
        <div className="flex items-center gap-2">
          {hasFavorites ? (
            <Link
              to="/favorites"
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-white/[0.08] bg-white/[0.04] hover:border-primary/40 hover:bg-primary/[0.08] hover:shadow-glow-green-sm transition-all duration-200 text-sm text-text-secondary hover:text-primary"
            >
              <HeartIcon className="text-primary" />
              <span className="hidden sm:inline font-medium">{t('favorites')}</span>
            </Link>
          ) : (
            <Tooltip message={t('favoritesDisabledTooltip')}>
              <div
                aria-disabled="true"
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-white/[0.04] bg-white/[0.02] text-sm text-text-secondary/30 cursor-not-allowed select-none"
              >
                <HeartIcon />
                <span className="hidden sm:inline font-medium">{t('favorites')}</span>
              </div>
            </Tooltip>
          )}
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  )
}
