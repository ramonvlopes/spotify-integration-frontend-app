import type { BadgeProps } from './Badge.types'

const variantClasses = {
  genre: 'bg-accent/10 text-accent/80 border-accent/20 hover:bg-accent/15',
  type: 'bg-primary/10 text-primary/80 border-primary/20 hover:bg-primary/15',
  default: 'bg-white/[0.05] text-text-secondary border-white/[0.08]',
}

export function Badge({ label, variant = 'default' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium border tracking-wide uppercase transition-colors ${variantClasses[variant]}`}
    >
      {label}
    </span>
  )
}
