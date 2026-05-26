import { useTranslation } from 'react-i18next'
import { ChevronLeftIcon, ChevronRightIcon } from '@/commons/icons'
import { Button } from '@/components/Button'
import type { PaginationProps } from './Pagination.types'

export function Pagination({ currentPage, totalPages, onPageChange, isLoading }: PaginationProps) {
  const { t } = useTranslation()

  if (totalPages <= 1) return null

  return (
    <div className="flex items-center justify-center gap-4 py-6">
      <Button
        variant="secondary"
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1 || isLoading}
      >
        <ChevronLeftIcon />
        {t('pagination.previous')}
      </Button>
      <span className="text-sm text-text-secondary">
        {t('pagination.page', { current: currentPage, total: totalPages })}
      </span>
      <Button
        variant="secondary"
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages || isLoading}
      >
        {t('pagination.next')}
        <ChevronRightIcon />
      </Button>
    </div>
  )
}
