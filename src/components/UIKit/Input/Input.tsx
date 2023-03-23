import cn from 'clsx'
import React, { LegacyRef, InputHTMLAttributes } from 'react'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string
  hasError?: boolean
  errorText?: string
  label: string
  inputRef?: LegacyRef<HTMLInputElement>
  firstIcon?: React.ReactNode
  secondIcon?: React.ReactNode
  height?: number
  radius?: number
  width?: number
  percent?: boolean

  handleOnFirstIcon?: () => void
  handleOnSecondIcon?: () => void
}

const Input: React.FC<InputProps> = (props) => {
  const {
    className,
    id,
    value,
    label,
    inputRef,
    firstIcon,
    secondIcon,
    height,
    radius,
    width,
    percent,
    handleOnFirstIcon,
    handleOnSecondIcon,
    hasError = false,

    ...rest
  } = props

  const rootClassName = cn(`relative z-0 flex items-center w-full`, className)
  const inputClassName = cn(
    {
      'input-root': !hasError,
      'input-root-hasError': hasError,
    },
    'peer',
    {
      'px-8': firstIcon,
      'px-3': !firstIcon,
    }
  )

  return (
    <div className={rootClassName}>
      <input
        style={{
          width: percent ? `${width}%` : `${width}px`,
          height: `${height}px`,
          borderRadius: `${radius}`,
        }}
        type="text"
        id={id}
        className={inputClassName}
        value={value}
        placeholder=" "
        dir="rtl"
        ref={inputRef}
        {...rest}
      />
      {firstIcon && (
        <div onClick={handleOnFirstIcon} className={`input-firstIcon`}>
          {firstIcon}
        </div>
      )}
      <label
        htmlFor={id}
        className={`input-label  px-1 duration-75 peer-placeholder-shown:top-2 peer-placeholder-shown:-z-10 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-3 peer-focus:z-50 peer-focus:text-sm peer-focus:text-gray-600 mobile:duration-150  ${
          firstIcon ? 'right-6' : 'right-3'
        }`}
      >
        {label}
      </label>
      {secondIcon && (
        <div onClick={handleOnSecondIcon} className={`input-secondIcon`}>
          {secondIcon}
        </div>
      )}
    </div>
  )
}
export default Input
