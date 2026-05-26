import { useTranslation } from 'react-i18next'
import { GlobeIcon } from '@/commons/icons'

export function LanguageSwitcher() {
  const { i18n } = useTranslation()
  const currentLang = i18n.language

  const toggle = () => {
    i18n.changeLanguage(currentLang === 'pt-BR' ? 'en-US' : 'pt-BR')
  }

  return (
    <button
      onClick={toggle}
      className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border bg-surface hover:bg-surface-alt transition-colors text-sm text-text-secondary hover:text-text-primary"
    >
      <GlobeIcon />
      <span>{currentLang === 'pt-BR' ? 'PT' : 'EN'}</span>
    </button>
  )
}
