import { WarningIcon, RetryIcon } from '@/commons/icons'
import { Button } from '@/components/Button'
import type { ErrorStateProps } from './ErrorState.types'

export function ErrorState({ message = 'Something went wrong', onRetry }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
      <WarningIcon className="text-4xl text-red-400" />
      <p className="text-text-secondary">{message}</p>
      {onRetry && (
        <Button variant="secondary" size="sm" onClick={onRetry}>
          <RetryIcon />
          Try again
        </Button>
      )}
    </div>
  )
}
