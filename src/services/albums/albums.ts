import { api } from '../core/api'
import { ALBUMS_ENDPOINTS, ALBUM_TRACKS_DEFAULT_LIMIT } from './albums.constants'
import type {
  AlbumDetail,
  AlbumTrack,
  GetAlbumTracksParams,
  AlbumSearchResult,
  SearchAlbumsParams,
} from './albums.types'
import type { SpotifyPaginatedResponse } from '../artists/artists.types'

export async function getAlbumById(id: string): Promise<AlbumDetail> {
  const response = await api.get<AlbumDetail>(ALBUMS_ENDPOINTS.ALBUM(id))
  return response.data
}

export async function getAlbumsByIds(ids: readonly string[]): Promise<AlbumDetail[]> {
  const response = await api.get<{ albums: AlbumDetail[] }>(ALBUMS_ENDPOINTS.ALBUMS_BATCH, {
    params: { ids: ids.join(',') },
  })
  return response.data.albums.filter(Boolean)
}

export async function getAlbumTracks(
  params: GetAlbumTracksParams,
): Promise<SpotifyPaginatedResponse<AlbumTrack>> {
  const response = await api.get<SpotifyPaginatedResponse<AlbumTrack>>(
    ALBUMS_ENDPOINTS.TRACKS(params.albumId),
    {
      params: {
        limit: params.limit ?? ALBUM_TRACKS_DEFAULT_LIMIT,
        offset: params.offset ?? 0,
      },
    },
  )
  return response.data
}

export async function searchAlbums(
  params: SearchAlbumsParams,
): Promise<SpotifyPaginatedResponse<AlbumSearchResult>> {
  const response = await api.get<{ albums: SpotifyPaginatedResponse<AlbumSearchResult> }>(
    ALBUMS_ENDPOINTS.SEARCH,
    {
      params: {
        q: params.query,
        type: 'album',
        limit: params.limit ?? 10,
        offset: params.offset ?? 0,
      },
    },
  )
  return response.data.albums
}
