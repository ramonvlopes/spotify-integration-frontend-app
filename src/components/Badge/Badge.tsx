import type { BadgeProps } from './Badge.types'

const variantClasses = {
  genre: 'bg-accent/20 text-accent border-accent/30',
  type: 'bg-primary/20 text-primary border-primary/30',
  default: 'bg-surface-alt text-text-secondary border-border',
}

export function Badge({ label, variant = 'default' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${variantClasses[variant]}`}
    >
      {label}
    </span>
  )
}
