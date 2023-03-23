import cn from 'clsx'
import React, { forwardRef, ButtonHTMLAttributes } from 'react'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string
  className?: string
  variant?: 'filled' | 'outline' | 'text'
  active?: boolean
  width?: string | number
  height?: string | number
  firstIcon?: React.ReactNode
  secondIcon?: React.ReactNode
  label?: string
  loading?: boolean
  disabled?: boolean
}

// eslint-disable-next-line react/display-name
const Chips: React.FC<ButtonProps> = forwardRef((props) => {
  const {
    className,
    variant = 'filled',
    label,
    firstIcon,
    secondIcon,
    active,
    width,
    height,
    style = {},
  } = props

  const rootClassName = cn(`chips-root`, `chips-${variant}`, className)
  return (
    <div
      aria-pressed={active}
      data-variant={variant}
      className={rootClassName}
      style={{
        width,
        height,
        ...style,
      }}
    >
      {!!label && (
        <div className="flex items-center gap-6">
          {firstIcon}
          {label}
          {secondIcon}
        </div>
      )}
      {!label && <div>{firstIcon}</div>}
    </div>
  )
})

export default Chips
