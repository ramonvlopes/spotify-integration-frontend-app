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
            className={`w-full bg-surface border rounded-lg px-3 py-2 text-text-primary placeholder-text-secondary/50 focus:outline-none focus:ring-2 transition-colors ${leftIcon ? 'pl-10' : ''} ${error ? 'border-red-500 focus:ring-red-500/30' : 'border-border focus:ring-primary/30 focus:border-primary/50'} ${className}`}
            {...props}
          />
        </div>
        {error && <span className="text-xs text-red-400">{error}</span>}
      </div>
    )
  },
)

Input.displayName = 'Input'
