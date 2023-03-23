import React, { FC } from 'react'
import cn from 'clsx'
import CircleCheck_icon from '../../icons/common/CircleCheck_icon'
import CircleInfo_icon from '../../icons/common/CircleInfo_icon'
import CircleClose_icon from '../../icons/common/CircleClose_icon'
export declare type ToastType = 'info' | 'success' | 'error'

interface Props {
  title?: string
  subtitle?: string
  titleClassName?: string
  subtitleClassName?: string
  type: ToastType
}

const ToastUI: FC<Props> = (props) => {
  const { type, title, subtitle, titleClassName, subtitleClassName } = props

  const titleClassNames = cn(
      'toast-title',
      `${subtitle ? 'text-text-40' : `toast-${type}`}`,
      titleClassName
  )

  const subtitleClassNames = cn(
      'toast-subtitle',
      `toast-${type}`,
      subtitleClassName
  )
  return (
      <div
          className="toast-container"
          // style={{ borderColor: type === 'success' ? '#27AE60' : '#EB5757' }}
      >
        <div className="px-1">
          {type === 'success' && <CircleCheck_icon />}
          {type === 'info' && <CircleInfo_icon />}
          {type === 'error' && <CircleClose_icon />}
        </div>
        <div className="flex flex-col gap-1 pr-1 pl-2 leading-0">
          <div className={titleClassNames}>{title}</div>
          {subtitle && <div className={subtitleClassNames}>{subtitle}</div>}
        </div>
      </div>
  )
}

export default ToastUI
