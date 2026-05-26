# SPEC-05 — Internationalization (i18n)

## Goal
Set up `react-i18next` with PT-BR and EN-US translation namespaces. Every user-visible string in the app must use the translation system — no hardcoded UI text.

---

## Files to Create

### `src/i18n/index.ts`
- Initialize `i18next` with:
  - `defaultNS: 'common'`
  - `fallbackLng: 'en-US'`
  - Plugin: `LanguageDetector` — auto-detect from browser
  - `interpolation: { escapeValue: false }`
  - Resources: import all JSON files statically

**Max lines: ~50**

### `src/i18n/locales/en-US/common.json`
```json
{
  "appName": "Spotify Explorer",
  "loading": "Loading...",
  "error": "Something went wrong",
  "noResults": "No results found",
  "search": "Search",
  "back": "Back",
  "seeOnSpotify": "See on Spotify",
  "language": "Language",
  "pagination": {
    "previous": "Previous",
    "next": "Next",
    "page": "Page {{current}} of {{total}}"
  }
}
```

### `src/i18n/locales/en-US/artists.json`
```json
{
  "title": "Artists",
  "searchByName": "Search by artist name",
  "searchByAlbum": "Search by album",
  "filterType": "Filter type",
  "followers": "{{count}} followers",
  "genres": "Genres",
  "popularity": "Popularity",
  "topTracks": "Top Tracks",
  "discography": "Discography",
  "noArtists": "No artists found. Try a different search."
}
```

### `src/i18n/locales/en-US/albums.json`
```json
{
  "tracks": "Tracks",
  "releaseDate": "Release date",
  "totalTracks": "{{count}} tracks",
  "label": "Label",
  "duration": "Duration",
  "trackNumber": "#",
  "noTracks": "No tracks available."
}
```

### `src/i18n/locales/en-US/favorites.json`
```json
{
  "title": "My Favorites",
  "addFavorite": "Add Favorite",
  "artistName": "Artist name",
  "trackName": "Track name",
  "albumName": "Album name",
  "save": "Save",
  "noFavorites": "You haven't added any favorites yet.",
  "remove": "Remove",
  "added": "Added to favorites!",
  "validation": {
    "artistRequired": "Artist name is required",
    "trackRequired": "Track name is required",
    "albumRequired": "Album name is required",
    "minLength": "Must be at least {{min}} characters"
  }
}
```

### PT-BR equivalents
Mirror the exact same JSON structure for `pt-BR/`:
- `common.json`, `artists.json`, `albums.json`, `favorites.json`
- All values translated to Brazilian Portuguese

---

## Language Switcher
- A `LanguageSwitcher` component in `src/components/LanguageSwitcher/`
- Uses `i18next.changeLanguage('en-US' | 'pt-BR')`
- Displays as a toggle: `PT | EN`
- Persists selection via `localStorage` (i18next `LanguageDetector` handles this automatically)

---

## Usage Convention
```tsx
import { useTranslation } from 'react-i18next'

function ArtistListScreen() {
  const { t } = useTranslation('artists')
  return <h1>{t('title')}</h1>
}
```

---

## Acceptance Criteria
- [ ] App boots in PT-BR if browser is configured to pt-BR, EN-US otherwise
- [ ] Clicking the language toggle switches all UI strings immediately without reload
- [ ] Selected language persists across page refreshes
- [ ] All user-visible strings come from translation files (no hardcoded UI text)
- [ ] Both `en-US` and `pt-BR` have the same set of keys (no missing translations)
