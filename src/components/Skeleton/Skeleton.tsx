import type { SkeletonProps } from './Skeleton.types'

export function Skeleton({ width, height, rounded = false, className = '' }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse bg-surface-alt ${rounded ? 'rounded-full' : 'rounded-md'} ${className}`}
      style={{ width, height }}
    />
  )
}
