import React, { useMemo } from 'react'
import classNames from 'classnames'

/** 按钮尺寸类型 */
export type ButtonSize = 'lg' | 'sm'

/** 按钮类型 */
export type ButtonType = 'primary' | 'default' | 'danger' | 'link'

/** 基础按钮属性 */
interface BaseButtonProps {
  /** 自定义类名 */
  className?: string
  /** 是否禁用 */
  disabled?: boolean
  /** 按钮大小 */
  size?: ButtonSize
  /** 按钮类型 */
  btnType?: ButtonType
  /** 按钮内容 */
  children: React.ReactNode
  /** 链接地址，仅当 btnType 为 'link' 时有效 */
  href?: string
}

/** 原生 button 标签支持的属性 */
type NativeButtonProps = BaseButtonProps & React.ButtonHTMLAttributes<HTMLElement>
/** 原生 a 标签支持的属性 */
type AnchorButtonProps = BaseButtonProps & React.AnchorHTMLAttributes<HTMLElement>

/** 按钮组件 Props，支持 button 和 a 标签的所有属性，所有属性均可选 */
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>

// test comment

/**
 * Button 组件
 * 根据 btnType 判断渲染 button 或 a 标签
 */
export const Button: React.FC<ButtonProps> = React.memo((props) => {
  const {
    btnType = 'default',
    disabled = false,
    className,
    size,
    children,
    href,
    ...restProps
  } = props

  const classes = useMemo(() => classNames('btn', className, {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    disabled: btnType === 'link' && disabled,
  }), [btnType, className, size, disabled])

  if (btnType === 'link' && href) {
    return (
      <a className={classes} href={href} {...restProps}>
        {children}
      </a>
    )
  } else {
    return (
      <button className={classes} disabled={disabled} {...restProps}>
        {children}
      </button>
    )
  }
})

Button.displayName = 'Button'

export default Button