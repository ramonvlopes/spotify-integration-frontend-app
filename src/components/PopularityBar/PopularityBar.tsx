import type { PopularityBarProps } from './PopularityBar.types'

export function PopularityBar({ value }: PopularityBarProps) {
  const clamped = Math.min(100, Math.max(0, value))
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-surface-alt rounded-full overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-accent to-primary transition-all duration-500"
          style={{ width: `${clamped}%` }}
        />
      </div>
      <span className="text-xs text-text-secondary w-8 text-right">{clamped}</span>
    </div>
  )
}
