import cn from 'clsx'
import React, { ButtonHTMLAttributes } from 'react'
import styles from './Badge.module.css'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string
  className?: string
  size?: 'large' | 'medium'
  width?: string | number
  height?: string | number
  label?: string
}

// eslint-disable-next-line react/display-name
const Badge: React.FC<ButtonProps> = (props) => {
  const { className, size = 'large', label, ...rest } = props

  const rootClassName = cn(styles.root, `btn-${size}`, className)
  return (
    <button
      className={rootClassName}
      data-count={label}
      type="button"
      {...rest}
    />
  )
}

export default Badge
