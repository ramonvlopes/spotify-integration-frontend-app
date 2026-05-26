import axios from 'axios'
import { AUTH_ENDPOINT } from './auth.constants'
import type { SpotifyTokenResponse } from './auth.types'

export async function fetchSpotifyToken(): Promise<SpotifyTokenResponse> {
  const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID
  const clientSecret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET
  const credentials = btoa(`${clientId}:${clientSecret}`)

  const response = await axios.post<SpotifyTokenResponse>(
    AUTH_ENDPOINT,
    new URLSearchParams({ grant_type: 'client_credentials' }),
    {
      headers: {
        Authorization: `Basic ${credentials}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    },
  )

  return response.data
}
