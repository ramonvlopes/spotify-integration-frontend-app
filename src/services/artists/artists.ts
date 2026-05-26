import { api } from '../core/api'
import {
  ARTISTS_ENDPOINTS,
  SEARCH_DEFAULT_LIMIT,
  ALBUMS_DEFAULT_LIMIT,
  TOP_TRACKS_MARKET,
} from './artists.constants'
import type {
  Artist,
  Album,
  Track,
  SearchArtistsParams,
  SearchByAlbumParams,
  GetArtistAlbumsParams,
  SpotifyPaginatedResponse,
} from './artists.types'

interface SearchResponse {
  artists: SpotifyPaginatedResponse<Artist>
}

interface TopTracksResponse {
  tracks: Track[]
}

export async function searchArtists(
  params: SearchArtistsParams,
): Promise<SpotifyPaginatedResponse<Artist>> {
  const response = await api.get<SearchResponse>(ARTISTS_ENDPOINTS.SEARCH, {
    params: {
      q: params.query,
      type: 'artist',
      limit: params.limit ?? SEARCH_DEFAULT_LIMIT,
      offset: params.offset ?? 0,
    },
  })
  return response.data.artists
}

export async function searchArtistsByAlbum(
  params: SearchByAlbumParams,
): Promise<SpotifyPaginatedResponse<Artist>> {
  const response = await api.get<SearchResponse>(ARTISTS_ENDPOINTS.SEARCH, {
    params: {
      q: `album:${params.album}`,
      type: 'artist',
      limit: params.limit ?? SEARCH_DEFAULT_LIMIT,
      offset: params.offset ?? 0,
    },
  })
  return response.data.artists
}

export async function getArtistById(id: string): Promise<Artist> {
  const response = await api.get<Artist>(ARTISTS_ENDPOINTS.ARTIST(id))
  return response.data
}

export async function getArtistsByIds(ids: readonly string[]): Promise<Artist[]> {
  const response = await api.get<{ artists: Artist[] }>(ARTISTS_ENDPOINTS.ARTISTS_BATCH, {
    params: { ids: ids.join(',') },
  })
  return response.data.artists.filter(Boolean)
}

export async function getArtistTopTracks(artistId: string): Promise<Track[]> {
  const response = await api.get<TopTracksResponse>(ARTISTS_ENDPOINTS.TOP_TRACKS(artistId), {
    params: { market: TOP_TRACKS_MARKET },
  })
  return response.data.tracks
}

export async function getArtistAlbums(
  params: GetArtistAlbumsParams,
): Promise<SpotifyPaginatedResponse<Album>> {
  const response = await api.get<SpotifyPaginatedResponse<Album>>(
    ARTISTS_ENDPOINTS.ALBUMS(params.artistId),
    {
      params: {
        limit: params.limit ?? ALBUMS_DEFAULT_LIMIT,
        offset: params.offset ?? 0,
      },
    },
  )
  return response.data
}
