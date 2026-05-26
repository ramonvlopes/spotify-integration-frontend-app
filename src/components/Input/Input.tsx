import { forwardRef } from 'react'
import type { InputProps } from './Input.types'

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, leftIcon, className = '', id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-')
    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-text-secondary">
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary">
              {leftIcon}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            className={`w-full bg-white/[0.04] border rounded-xl px-3 py-2.5 text-text-primary placeholder-text-secondary/40 focus:outline-none transition-all duration-200 ${leftIcon ? 'pl-10' : ''} ${error ? 'border-red-500/50 focus:ring-2 focus:ring-red-500/20 focus:border-red-500/60' : 'border-white/[0.08] focus:ring-2 focus:ring-primary/20 focus:border-primary/40 focus:shadow-glow-green-sm'} ${className}`}
            {...props}
          />
        </div>
        {error && <span className="text-xs text-red-400">{error}</span>}
      </div>
    )
  },
)

Input.displayName = 'Input'
