import type { CardProps } from '../../types/index.ts'
import { classNames } from '../../utils/helpers.ts'

export function Card({
  title,
  subtitle,
  children,
  className = '',
  footer,
  glow = false
}: CardProps) {
  return (
    <div className={classNames('card', glow && 'card-glow', className)}>
      {(title || subtitle) && (
        <div className="card-header">
          {title && <h3 className="card-title">{title}</h3>}
          {subtitle && <p className="card-subtitle">{subtitle}</p>}
        </div>
      )}
      <div className="card-body">{children}</div>
      {footer && <div className="card-footer">{footer}</div>}
    </div>
  )
}
