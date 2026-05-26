import { SpinnerIcon } from '@/commons/icons'
import type { ButtonProps } from './Button.types'

const variantClasses = {
  primary:
    'bg-primary text-black font-semibold hover:bg-primary/90 border-transparent shadow-glow-green-sm hover:shadow-glow-green',
  secondary:
    'bg-white/[0.06] border-white/[0.1] text-text-primary hover:bg-white/[0.1] hover:border-white/[0.15]',
  ghost:
    'bg-transparent border-transparent text-text-secondary hover:text-text-primary hover:bg-white/[0.05]',
}

const sizeClasses = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
}

export function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled,
  children,
  className = '',
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled || isLoading}
      className={`inline-flex items-center justify-center gap-2 rounded-xl border font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/40 disabled:opacity-40 disabled:cursor-not-allowed ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {isLoading && <SpinnerIcon className="animate-spin" />}
      {children}
    </button>
  )
}
