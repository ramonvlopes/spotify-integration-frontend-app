import { Skeleton } from '@/components/Skeleton'
import { EmptyState } from '@/components/EmptyState'
import type { TableProps } from './Table.types'

const SKELETON_ROWS = 5

export function Table<T>({ columns, data, isLoading, emptyMessage, keyExtractor }: TableProps<T>) {
  return (
    <div className="w-full overflow-x-auto rounded-xl border border-border">
      <table className="w-full">
        <thead>
          <tr className="bg-surface-alt border-b border-border">
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-4 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider"
                style={col.width ? { width: col.width } : undefined}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {isLoading &&
            Array.from({ length: SKELETON_ROWS }).map((_, i) => (
              <tr key={i} className="border-b border-border/50">
                {columns.map((col) => (
                  <td key={col.key} className="px-4 py-3">
                    <Skeleton height="16px" />
                  </td>
                ))}
              </tr>
            ))}
          {!isLoading && data.length === 0 && (
            <tr>
              <td colSpan={columns.length}>
                <EmptyState message={emptyMessage ?? 'No data available'} />
              </td>
            </tr>
          )}
          {!isLoading &&
            data.map((row, index) => (
              <tr
                key={keyExtractor(row, index)}
                className={`border-b border-border/30 hover:bg-surface-alt/50 transition-colors ${index % 2 === 0 ? 'bg-surface' : 'bg-background'}`}
              >
                {columns.map((col) => (
                  <td key={col.key} className="px-4 py-3 text-sm text-text-primary">
                    {col.render(row, index)}
                  </td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}
