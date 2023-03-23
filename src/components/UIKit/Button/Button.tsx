import cn from 'clsx'
import { ClipLoader } from 'react-spinners'
import React, { ButtonHTMLAttributes, LegacyRef } from 'react'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string
  className?: string
  variant?: 'filled' | 'outline' | 'text'
  size?: 'large' | 'medium'
  active?: boolean
  type?: 'submit' | 'reset' | 'button'
  buttonRef?: LegacyRef<HTMLButtonElement>
  width?: string | number
  height?: string | number
  firstIcon?: React.ReactNode
  secondIcon?: React.ReactNode
  label?: string | React.ReactNode
  loading?: boolean
  disabled?: boolean
}

// eslint-disable-next-line react/display-name
const Button: React.FC<ButtonProps> = (props) => {
  const {
    className,
    variant = 'filled',
    size = 'large',
    label,
    firstIcon,
    secondIcon,
    active,
    loading = false,
    disabled = false,
    buttonRef,
    ...rest
  } = props

  const rootClassName = cn(
    `btn-root`,
    `btn-${variant}`,
    `btn-${size}`,
    className
  )
  return (
    <button
      aria-pressed={active}
      data-variant={variant}
      className={rootClassName}
      disabled={disabled}
      ref={buttonRef}
      {...rest}
    >
      {!loading && !!label && (
        <div className="flex items-center gap-6">
          {firstIcon}
          {label}
          {secondIcon}
        </div>
      )}
      {!loading && !label && <div>{firstIcon}</div>}
      {loading && <ClipLoader size={30} color="#f5f5f5" />}
    </button>
  )
}

export default Button
