# i18n

## English

Internationalization configuration using `react-i18next`. Supports PT-BR (Brazilian Portuguese) and EN-US (American English).

### Structure
```
i18n/
  index.ts              ← i18next initialization and configuration
  locales/
    en-US/
      common.json       ← shared strings (pagination, errors, actions)
      artists.json      ← artist-related strings
      albums.json       ← album-related strings
      favorites.json    ← favorites form and list strings
    pt-BR/
      common.json
      artists.json
      albums.json
      favorites.json
```

### Usage
```tsx
import { useTranslation } from 'react-i18next'

function MyComponent() {
  const { t } = useTranslation('artists')
  return <h1>{t('title')}</h1>
}
```

### Language detection
The app auto-detects the browser language on first load. The selected language is persisted in localStorage via the `LanguageDetector` plugin.

---

## Português

Configuração de internacionalização usando `react-i18next`. Suporta PT-BR (Português Brasileiro) e EN-US (Inglês Americano).

### Uso
```tsx
import { useTranslation } from 'react-i18next'

function MyComponent() {
  const { t } = useTranslation('artists')
  return <h1>{t('title')}</h1>
}
```
