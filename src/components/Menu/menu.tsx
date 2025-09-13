// src/menu/Menu.tsx
import React, { useState } from 'react'
import classNames from 'classnames'
import MenuContext from './menuContext'
import type { MenuContextProps, SelectCallback } from './menuContext'
import type { MenuItemProps } from './menuItem'
import type MenuItem from './menuItem'

// 横向纵向
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
  // 接收的参数props
  const {
    className,
    mode = 'horizontal',
    style,
    defaultIndex = '0',
    onSelect: onSelectProp,
    children,
    defaultOpenSubMenus = [],
  } = props
  // 根据props生成className
  const classes = classNames('jasmine-menu', className, {
    'menu-vertical': mode === 'vertical',
    'menu-horizontal': mode !== 'vertical',
  })
  // 当前激活项的index
  const [currentActive, setActive] = useState(defaultIndex)

  const handleSelect = (index: string) => {
    setActive(index)
    if (onSelectProp) {
      onSelectProp(index)
    }
  }

  const passedContext: MenuContextProps = {
    index: currentActive,
    onSelect: handleSelect,
    mode,
    defaultOpenSubMenus,
  }

  // 确保子组件是MenuItem或SubMenu
  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as React.ReactElement<MenuItemProps, typeof MenuItem>

      const { displayName } = childElement.type
      if (displayName === 'MenuItem' || displayName === 'SubMenu') {
        // 给返回的childElement添加index属性
        return React.cloneElement(childElement, { index: index.toString() })
      } else {
        console.error('Warning: Menu has a child which is not a MenuItem component')
        return null
      }
    })
  }

  return (
    <ul className={classes} style={style}>
      <MenuContext.Provider value={passedContext}>{renderChildren()}</MenuContext.Provider>
    </ul>
  )
}

export default Menu
