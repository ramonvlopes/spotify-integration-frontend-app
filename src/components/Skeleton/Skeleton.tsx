import type { SkeletonProps } from './Skeleton.types'

export function Skeleton({ width, height, rounded = false, className = '' }: SkeletonProps) {
  return (
    <div
      className={`shimmer ${rounded ? 'rounded-full' : 'rounded-xl'} ${className}`}
      style={{ width, height }}
    />
  )
}
