// src/menu/Menu.tsx
import React, { useState } from 'react'
import classNames from 'classnames'
import MenuContext from './menuContext'
import type { MenuContextProps, SelectCallback } from './menuContext'
import type { MenuItemProps } from './menuItem'
import type MenuItem from './menuItem'

type MenuMode = 'horizontal' | 'vertical'

export interface MenuProps {
  defaultIndex?: string
  className?: string
  mode?: MenuMode
  style?: React.CSSProperties
  onSelect?: SelectCallback
  children?: React.ReactNode
  defaultOpenSubMenus?: string[]
}

const Menu: React.FC<MenuProps> = (props) => {
  const {
    className,
    mode = 'horizontal',
    style,
    defaultIndex = '0',
    onSelect,
    children,
    defaultOpenSubMenus = [],
  } = props
  const classes = classNames('jasmine-menu', className, {
    'menu-vertical': mode === 'vertical',
    'menu-horizontal': mode !== 'vertical',
  })

  const [currentActive, setActive] = useState(defaultIndex)

  const handlerClick = (index: string) => {
    setActive(index)
    if (onSelect) {
      onSelect(index)
    }
  }

  const passedContext: MenuContextProps = {
    index: currentActive,
    onSelect: handlerClick,
    mode,
    defaultOpenSubMenus,
  }

  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as React.ReactElement<MenuItemProps, typeof MenuItem>

      const { displayName } = childElement.type
      if (displayName === 'MenuItem' || displayName === 'SubMenu') {
        return React.cloneElement(childElement, { index: index.toString() })
      } else {
        console.error('Warning: Menu has a child which is not a MenuItem component')
        return null
      }
    })
  }

  return (
    <ul className={classes} style={style} data-testId="menu">
      <MenuContext.Provider value={passedContext}>{renderChildren()}</MenuContext.Provider>
    </ul>
  )
}

export default Menu
