import type { PopularityBarProps } from './PopularityBar.types'

export function PopularityBar({ value }: PopularityBarProps) {
  const clamped = Math.min(100, Math.max(0, value))
  const color =
    clamped > 70
      ? 'from-primary to-neon'
      : clamped > 40
        ? 'from-accent to-primary'
        : 'from-text-secondary to-accent'

  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1 bg-white/[0.06] rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${color} transition-all duration-700 shadow-[0_0_6px_rgba(29,185,84,0.5)]`}
          style={{ width: `${clamped}%` }}
        />
      </div>
      <span className="text-[10px] text-text-secondary font-mono w-6 text-right">{clamped}</span>
    </div>
  )
}
