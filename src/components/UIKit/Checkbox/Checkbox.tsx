// import cn from 'clsx'
import React from 'react'
import Check_icon from '../../icons/common/Check_icon'
import Text from '../Text/Text'
type LabelVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'subtitle1'
  | 'subtitle2'
  | 'subtitle3'
  | 'subtitle4'
  | 'body1'
  | 'body2'
  | 'body3'
  | 'body4'
  | 'discount1'
  | 'discount2'
  | 'caption1'
  | 'caption2'
  | 'button1'
  | 'button2'
type LabelLang = 'fa' | 'en'
export interface CheckboxProps {
  className?: string
  labelClassName?: string
  name: string
  hasError?: boolean
  value?: boolean
  checked?: boolean
  errorText?: string
  label?: string
  onChange: () => void
  labelVariant?: LabelVariant
  labelLang?: LabelLang
}

const Checkbox: React.FC<CheckboxProps> = (props) => {
  const {
    className,
    label,
    value,
    labelVariant,
    labelClassName,
    labelLang,
    ...rest
  } = props

  return (
    <div className={className}>
      <label className={'checkbox-container'}>
        <input
          type="checkbox"
          className="checkbox-input"
          checked={true}
          {...rest}
        />
        <span className="checkbox-icon">{value ? <Check_icon /> : ''}</span>
        <Text
          variant={labelVariant}
          className={labelClassName}
          lang={labelLang}
        >
          {label}
        </Text>
      </label>
    </div>
  )
}

export default Checkbox
