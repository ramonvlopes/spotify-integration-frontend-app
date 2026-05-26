import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import enCommon from './locales/en-US/common.json'
import enArtists from './locales/en-US/artists.json'
import enAlbums from './locales/en-US/albums.json'
import enFavorites from './locales/en-US/favorites.json'

import ptCommon from './locales/pt-BR/common.json'
import ptArtists from './locales/pt-BR/artists.json'
import ptAlbums from './locales/pt-BR/albums.json'
import ptFavorites from './locales/pt-BR/favorites.json'

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    defaultNS: 'common',
    fallbackLng: 'en-US',
    interpolation: {
      escapeValue: false,
    },
    resources: {
      'en-US': {
        common: enCommon,
        artists: enArtists,
        albums: enAlbums,
        favorites: enFavorites,
      },
      'pt-BR': {
        common: ptCommon,
        artists: ptArtists,
        albums: ptAlbums,
        favorites: ptFavorites,
      },
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  })

export default i18n
