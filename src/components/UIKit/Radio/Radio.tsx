import React, { InputHTMLAttributes } from 'react'
export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string
  name: string
  hasError?: boolean
  checked?: boolean
  errorText?: string
  label?: string
}

const Checkbox: React.FC<CheckboxProps> = (props) => {
  const { className, label, checked, ...rest } = props
  return (
    <div className={className}>
      <label className={'radio-container'}>
        <input
          type="radio"
          className="radio-input"
          {...rest}
          checked={checked}
        />
        <span className="radio-icon">
          {checked ? <div className="h-1 w-1 rounded-full bg-red-50" /> : ''}
        </span>
        <span className="radio-label">{label}</span>
      </label>
    </div>
  )
}

export default Checkbox
