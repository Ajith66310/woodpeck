import type { BadgeProps } from '../../types/index.ts'
import { classNames } from '../../utils/helpers.ts'

export function Badge({ variant = 'neutral', children, className = '' }: BadgeProps) {
  return (
    <span className={classNames('badge', `badge-${variant}`, className)}>
      {children}
    </span>
  )
}
