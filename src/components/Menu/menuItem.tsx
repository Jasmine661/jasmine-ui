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
  const { index: activeIndex, onSelect } = context
  
  const classes = useMemo(() => classNames('menu-item', className, {
    'is-disabled': disabled,
    'is-active': activeIndex === index,
  }), [className, disabled, activeIndex, index])

  const handlerClick = useCallback(() => {
    if (onSelect && !disabled && typeof index === 'string') {
      onSelect(index)
    }
  }, [onSelect, disabled, index])

  return (
    <li className={classes} style={style} onClick={handlerClick}>
      {children}
    </li>
  )
})

MenuItem.displayName = 'MenuItem'
export default MenuItem
