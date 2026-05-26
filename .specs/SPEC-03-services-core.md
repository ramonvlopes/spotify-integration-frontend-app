# SPEC-03 — Services: Core (Axios + Interceptors + Auth Token)

## Goal
Build the HTTP foundation: a configured Axios instance, request/response interceptors, and the Client Credentials token lifecycle.

---

## Auth Strategy: Spotify Client Credentials

The application uses the **OAuth 2.0 Client Credentials** flow. A machine-to-machine token is fetched using `VITE_SPOTIFY_CLIENT_ID` and `VITE_SPOTIFY_CLIENT_SECRET` from `.env`. This means users do not need to log in with their Spotify account.

> **README note (required):** Document explicitly that this flow was chosen to facilitate evaluation by reviewers who can open the app without any Spotify account setup. In a production scenario, the Authorization Code + PKCE flow would be preferred because it does not expose the client secret on the client side.

Token endpoint: `POST https://accounts.spotify.com/api/token`
Body: `grant_type=client_credentials`
Headers: `Authorization: Basic base64(clientId:clientSecret)`

The token expires in 3600 seconds. It must be:
1. Fetched on first request
2. Stored in memory (module-level variable, not localStorage — no need to persist across sessions)
3. Automatically refreshed when expired

---

## Files to Create

### `src/services/core/token.ts`
- `interface TokenCache { accessToken: string; expiresAt: number }`
- `let cache: TokenCache | null = null`
- `async function getAccessToken(): Promise<string>` — returns cached token or fetches a new one
- `function isTokenExpired(cache: TokenCache): boolean` — compare `Date.now()` with `expiresAt`
- `async function fetchToken(): Promise<TokenCache>` — calls auth endpoint, returns `{ accessToken, expiresAt: Date.now() + expiresIn * 1000 }`

**Max lines: ~60**

### `src/services/core/api.ts`
- Creates and exports the Axios instance:
  ```ts
  export const api = axios.create({ baseURL: 'https://api.spotify.com/v1' })
  ```
- Calls `setupInterceptors(api)` after creation
- Does NOT inline interceptor logic here — delegates to `interceptors.ts`

**Max lines: ~20**

### `src/services/core/interceptors.ts`
- `setupInterceptors(instance: AxiosInstance): void`

**Request interceptor:**
1. Call `getAccessToken()`
2. Attach `Authorization: Bearer <token>` to every request

**Response interceptor (success):** pass through unchanged.

**Response interceptor (error):**
- For HTTP status `300–599`, extract a user-friendly message:
  - Try `error.response.data.error.message` (Spotify error format)
  - Fallback to `error.response.statusText`
  - Fallback to `'Unexpected error'`
- Call `toast.error(message)` via `react-toastify`
- Re-throw the error so React Query can also handle it

**Max lines: ~80**

---

## Auth Service

### `src/services/auth/auth.types.ts`
```ts
export interface SpotifyTokenResponse {
  access_token: string
  token_type: string
  expires_in: number
}
```

### `src/services/auth/auth.constants.ts`
```ts
export const AUTH_ENDPOINT = 'https://accounts.spotify.com/api/token'
```

### `src/services/auth/auth.ts`
- Uses `axios` directly (NOT the `api` instance — avoid circular dependency)
- Sends `application/x-www-form-urlencoded` body with `grant_type=client_credentials`
- Authorization header: `Basic ${btoa(clientId + ':' + clientSecret)}`
- Returns `SpotifyTokenResponse`

**Max lines: ~40**

---

## ToastProvider Setup
- `<ToastContainer>` must be rendered once at app root (inside `App.tsx`)
- Theme: `dark`, position: `bottom-right`

---

## Acceptance Criteria
- [ ] `getAccessToken()` fetches a token on the first call
- [ ] `getAccessToken()` returns the cached token on subsequent calls within 3600s
- [ ] `getAccessToken()` fetches a new token after expiry
- [ ] Every Axios request has `Authorization: Bearer <token>` header
- [ ] A 4XX response triggers a `toast.error()` with the Spotify error message
- [ ] A 5XX response triggers a `toast.error()` with the error message
- [ ] Auth service does not use the `api` instance (no circular dependency)
- [ ] All files stay under 200 lines
