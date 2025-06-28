import React, { forwardRef } from 'react'
import type { ChangeEvent, InputHTMLAttributes, ReactElement } from 'react'
import type { IconDefinition } from '@fortawesome/free-solid-svg-icons'
import classNames from 'classnames'
import Icon from '../Icons/icon'

export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size'> {
  size?: string
  append?: string | ReactElement
  prepend?: string | ReactElement
  disabled?: boolean
  icon?: IconDefinition
  style?: React.CSSProperties
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { size, append, prepend, disabled, icon, style, ...restProps } = props
  // 根据属性计算className
  const className = classNames('jasmine-input-wrapper', size && `input-size-${size}`, {
    'is-disabled': disabled,
    'input-group': append || prepend,
    'input-group-append': !!append, // 双重取反，有值则为true，无值为false
    'input-group-prepend': !!prepend,
  })

  // 设置受控组件相关
  const fixControlledValue = (value: any) => {
    if (typeof value === 'undefined' || value === null) {
      return ''
    }
    return value
  }
  if ('value' in props) {
    delete restProps.defaultValue
    restProps.value = fixControlledValue(props.value)
  }

  return (
    <div className={className} style={style}>
      {prepend && <div className="jasmine-input-group-prepend">{prepend}</div>}
      {icon && (
        <div className="icon-wrapper">
          <Icon icon={icon} title={`title-${icon}`} />
        </div>
      )}
      <input ref={ref} className="jasmine-input-inner" disabled={disabled} {...restProps} />
      {append && <div className="jasmine-input-group-append">{append}</div>}
    </div>
  )
})

export default Input
