import { MusicIcon } from '@/commons/icons'
import type { EmptyStateProps } from './EmptyState.types'

export function EmptyState({ message, icon }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
      <span className="text-4xl text-text-secondary">{icon ?? <MusicIcon />}</span>
      <p className="text-text-secondary max-w-sm">{message}</p>
    </div>
  )
}
