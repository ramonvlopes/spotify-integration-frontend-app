import { SpinnerIcon } from '@/commons/icons'
import type { ButtonProps } from './Button.types'

const variantClasses = {
  primary: 'bg-primary text-background hover:bg-primary/90 border-transparent',
  secondary: 'bg-surface border-border text-text-primary hover:bg-surface-alt',
  ghost:
    'bg-transparent border-transparent text-text-secondary hover:text-text-primary hover:bg-surface',
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
      className={`inline-flex items-center justify-center gap-2 rounded-lg border font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50 disabled:cursor-not-allowed ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {isLoading && <SpinnerIcon className="animate-spin" />}
      {children}
    </button>
  )
}
