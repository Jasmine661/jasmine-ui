import React, { useContext, useMemo, useCallback } from 'react'
import classNames from 'classnames'

import MenuContext from './menuContext'

export interface MenuItemProps {
  index?: string
  disabled?: boolean
  className?: string
  children?: React.ReactNode
  style?: React.CSSProperties
}

const MenuItem: React.FC<MenuItemProps> = React.memo((props) => {
  const { index, disabled, className, children, style } = props
  const context = useContext(MenuContext)
  
  const classes = useMemo(() => classNames('menu-item', className, {
    'is-disabled': disabled,
    'is-active': context.index === index,
  }), [className, disabled, context.index, index])

  const handlerClick = useCallback(() => {
    if (context.onSelect && !disabled && typeof index === 'string') {
      context.onSelect(index)
    }
  }, [context.onSelect, disabled, index])

  return (
    <li className={classes} style={style} onClick={handlerClick}>
      {children}
    </li>
  )
})

MenuItem.displayName = 'MenuItem'
export default MenuItem
