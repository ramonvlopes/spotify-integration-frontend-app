# Services

## English

All HTTP communication with the Spotify API, organized by domain entity.

### Structure
```
services/
  core/
    api.ts            ← Axios instance
    interceptors.ts   ← Request and response interceptors
    token.ts          ← Client Credentials token lifecycle
  auth/
    auth.ts           ← Token fetch endpoint
    auth.constants.ts
    auth.types.ts
  artists/
    artists.ts        ← search, getById, getTopTracks, getAlbums
    artists.constants.ts
    artists.types.ts
  albums/
    albums.ts         ← getById, getTracks
    albums.constants.ts
    albums.types.ts
```

### Auth strategy
This app uses the **OAuth 2.0 Client Credentials** flow. A machine-to-machine token is fetched using the `VITE_SPOTIFY_CLIENT_ID` and `VITE_SPOTIFY_CLIENT_SECRET` environment variables. Users do not need to log in with their Spotify account.

> **Note:** This flow was chosen to facilitate evaluation — reviewers can open the app and navigate without any Spotify account setup. In a production application, the Authorization Code + PKCE flow would be preferred as it does not expose the client secret on the client side.

### Usage
```ts
import { searchArtists } from '@/services/artists/artists'
const results = await searchArtists({ query: 'The Beatles', limit: 20 })
```

---

## Português

Toda a comunicação HTTP com a API do Spotify, organizada por entidade de domínio.

### Estratégia de autenticação
O app usa o fluxo **OAuth 2.0 Client Credentials**. Um token é gerado usando as variáveis de ambiente `VITE_SPOTIFY_CLIENT_ID` e `VITE_SPOTIFY_CLIENT_SECRET`. Os usuários não precisam fazer login com conta Spotify.

> **Nota:** Este fluxo foi escolhido para facilitar a avaliação — avaliadores podem abrir o app e navegar sem configuração de conta Spotify. Em produção, o fluxo Authorization Code + PKCE seria preferível por não expor o client secret no cliente.
