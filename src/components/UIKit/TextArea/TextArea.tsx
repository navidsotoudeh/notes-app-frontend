import cn from 'clsx'
import React, { InputHTMLAttributes } from 'react'

export interface TextAreaProps
  extends InputHTMLAttributes<HTMLTextAreaElement> {
  className?: string
  rows?: number
  hasError?: boolean
  errorText?: string
  label?: string
  width?: number
  height?: number
  radius?: number
  percent?: boolean
}

const TextArea: React.FC<TextAreaProps> = (props) => {
  const {
    className,
    onChange,
    id,
    value,
    label,
    rows,
    width,
    height,
    radius,
    hasError,
    percent,
    ...rest
  } = props

  const rootClassName = cn(
    {
      'textArea-root': !hasError,
      'textArea-root-hasError': hasError,
    },
    'peer',
    className
  )
  return (
    <div className="relative z-0 w-full ">
      <textarea
        style={{
          width: percent ? `${width}%` : `${width}px`,
          height: `${height}px`,
          borderRadius: `${radius}`,
        }}
        id={id}
        className={rootClassName}
        value={value}
        onChange={onChange}
        rows={rows}
        dir="rtl"
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
        {...rest}
      />
      <label
        htmlFor={id}
        className={`textArea-label   peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-[14px] peer-focus:text-sm peer-focus:text-gray-600`}
      >
        {label}
      </label>
    </div>
  )
}

export default TextArea
