export interface AlbumImage {
  url: string
  height: number
  width: number
}

export interface Album {
  id: string
  name: string
  album_type: string
  release_date: string
  images: AlbumImage[]
  total_tracks: number
  external_urls: { spotify: string }
  artists?: Array<{ id: string; name: string }>
}

export interface AlbumCardProps {
  album: Album
  onClick: (id: string) => void
}
