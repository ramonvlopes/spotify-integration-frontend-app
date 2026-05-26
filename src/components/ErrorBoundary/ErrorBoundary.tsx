import { ErrorBoundary as ReactErrorBoundary, type FallbackProps } from 'react-error-boundary'
import { ErrorState } from '@/components/ErrorState'
import type { ErrorBoundaryProps } from './ErrorBoundary.types'

function FallbackComponent({ error, resetErrorBoundary }: FallbackProps) {
  const message = error instanceof Error ? error.message : 'An unexpected error occurred'
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <ErrorState message={message} onRetry={resetErrorBoundary} />
    </div>
  )
}

export function ErrorBoundary({ children, fallback }: ErrorBoundaryProps) {
  return (
    <ReactErrorBoundary
      FallbackComponent={fallback ? () => <>{fallback}</> : FallbackComponent}
      onError={(error, info) => console.error('[ErrorBoundary]', error, info.componentStack)}
    >
      {children}
    </ReactErrorBoundary>
  )
}
