import { DiscIcon } from '@/commons/icons'
import type { AlbumCardProps } from './AlbumCard.types'

export function AlbumCard({ album, onClick }: AlbumCardProps) {
  const year = album.release_date?.split('-')[0] ?? ''
  const imageUrl = album.images?.[0]?.url

  return (
    <button
      onClick={() => onClick(album.id)}
      className="group w-full text-left bg-surface border border-border rounded-xl overflow-hidden hover:border-primary/40 hover:bg-surface-alt transition-all duration-200 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-primary/40"
    >
      <div className="aspect-square overflow-hidden bg-surface-alt">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={album.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <DiscIcon className="text-3xl text-text-secondary" />
          </div>
        )}
      </div>
      <div className="p-3">
        <h4 className="font-medium text-text-primary text-sm truncate">{album.name}</h4>
        <p className="text-xs text-text-secondary mt-1">
          {year} · {album.total_tracks} tracks
        </p>
      </div>
    </button>
  )
}
