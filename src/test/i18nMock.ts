import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

i18n.use(initReactI18next).init({
  lng: 'en-US',
  fallbackLng: 'en-US',
  ns: ['common', 'artists', 'albums', 'favorites'],
  defaultNS: 'common',
  resources: {
    'en-US': {
      common: {},
      artists: {},
      albums: {},
      favorites: {},
    },
  },
  interpolation: { escapeValue: false },
})

export default i18n
