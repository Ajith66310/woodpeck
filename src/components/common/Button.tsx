import type { ButtonProps } from '../../types/index.ts'
import { classNames } from '../../utils/helpers.ts'

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  onClick,
  disabled = false,
  className = '',
  icon,
  type = 'button'
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classNames(
        'btn',
        `btn-${variant}`,
        `btn-${size}`,
        disabled && 'btn-disabled',
        className
      )}
    >
      {icon && <span className="btn-icon">{icon}</span>}
      <span>{children}</span>
    </button>
  )
}
