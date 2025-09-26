// src/menu/Menu.tsx
import React, { useCallback, useMemo, useState } from 'react'
import classNames from 'classnames'
import MenuContext from './menuContext'
import type { SelectCallback } from './menuContext'
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

const Menu: React.FC<MenuProps> = React.memo((props) => {
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
  
  // 根据props生成className - 使用 useMemo 优化
  const classes = useMemo(() => classNames('jasmine-menu', className, {
    'menu-vertical': mode === 'vertical',
    'menu-horizontal': mode !== 'vertical',
  }), [className, mode])
  // 当前激活项的index
  const [currentActive, setActive] = useState(defaultIndex)

  const handleSelect = useCallback((index: string) => {
    setActive(index)
    if (onSelectProp) {
      onSelectProp(index)
    }
  },[onSelectProp])

  const passedContext = useMemo(() => ({
    index: currentActive,
    onSelect: handleSelect,
    mode,
    defaultOpenSubMenus,
  }),[currentActive, handleSelect, mode, defaultOpenSubMenus])

  // 确保子组件是MenuItem或SubMenu
  const renderChildren = useMemo(() => {
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
  },[children])

  return (
    <ul className={classes} style={style} data-testid="menu">
      <MenuContext.Provider value={passedContext}>{renderChildren}</MenuContext.Provider>
    </ul>
  )
})

Menu.displayName = 'Menu'

export default Menu
