interface TooltipProps {
  message: string
  children: React.ReactNode
}

export function Tooltip({ message, children }: TooltipProps) {
  return (
    <div className="relative group/tooltip inline-flex">
      {children}
      <div
        role="tooltip"
        className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50
                   px-2.5 py-1.5 rounded-lg bg-surface border border-border shadow-lg
                   text-xs text-text-secondary whitespace-nowrap
                   opacity-0 group-hover/tooltip:opacity-100 transition-opacity duration-150"
      >
        {message}
        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-border" />
      </div>
    </div>
  )
}
