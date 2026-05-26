import { fetchSpotifyToken } from '../auth/auth'

interface TokenCache {
  accessToken: string
  expiresAt: number
}

let cache: TokenCache | null = null

function isTokenExpired(tokenCache: TokenCache): boolean {
  return Date.now() >= tokenCache.expiresAt - 10000
}

async function refreshToken(): Promise<TokenCache> {
  const tokenData = await fetchSpotifyToken()
  return {
    accessToken: tokenData.access_token,
    expiresAt: Date.now() + tokenData.expires_in * 1000,
  }
}

export async function getAccessToken(): Promise<string> {
  if (!cache || isTokenExpired(cache)) {
    cache = await refreshToken()
  }
  return cache.accessToken
}

export function clearTokenCache(): void {
  cache = null
}
