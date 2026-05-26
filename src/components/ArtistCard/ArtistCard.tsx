import { MusicIcon } from '@/commons/icons'
import { Badge } from '@/components/Badge'
import { PopularityBar } from '@/components/PopularityBar'
import { formatFollowers } from '@/commons/helpers/formatFollowers'
import type { ArtistCardProps } from './ArtistCard.types'

export function ArtistCard({
  id,
  name,
  imageUrl,
  genres,
  followers,
  popularity,
  onClick,
}: ArtistCardProps) {
  return (
    <button
      onClick={() => onClick(id)}
      className="group w-full text-left bg-surface border border-border rounded-xl overflow-hidden hover:border-primary/40 hover:bg-surface-alt transition-all duration-200 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-primary/40"
    >
      <div className="aspect-square overflow-hidden bg-surface-alt">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <MusicIcon className="text-4xl text-text-secondary" />
          </div>
        )}
      </div>
      <div className="p-3 flex flex-col gap-2">
        <h3 className="font-semibold text-text-primary text-sm truncate">{name}</h3>
        {genres && genres.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {genres.slice(0, 2).map((genre) => (
              <Badge key={genre} label={genre} variant="genre" />
            ))}
          </div>
        )}
        {followers !== undefined && (
          <p className="text-xs text-text-secondary">{formatFollowers(followers)} followers</p>
        )}
        {popularity !== undefined && <PopularityBar value={popularity} />}
      </div>
    </button>
  )
}
