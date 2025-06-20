import React, { useContext, useState, useRef } from 'react'
import classNames from 'classnames'
import MenuContext from './menuContext'
import type { MenuItemProps } from './menuItem'
import Icon from '../Icons/icon'
import Transition from '../Transition/Transition'

interface SubMenuProps {
  index?: string
  title: string
  className?: string
  children?: React.ReactNode
}

const SubMenu: React.FC<SubMenuProps> = ({ index, title, className, children }) => {
  const context = useContext(MenuContext)
  const openedSubMenus = context.defaultOpenSubMenus as string[]
  const [isOpen, setIsOpen] = useState(
    index && context.mode === 'vertical' ? openedSubMenus.includes(index) : false
  )
  const classes = classNames('submenu-item menu-item', className, {
    'is-active': context.index === index,
    'is-vertical': context.mode === 'vertical',
    'is-opened': isOpen,
  })

  const timer = useRef<any>(null)

  const renderChildren = () => {
    const childrenComponents = React.Children.map(children, (child, i) => {
      const childElement = child as React.ReactElement<MenuItemProps>
      const { displayName } = childElement.type as any
      if (displayName === 'MenuItem') {
        return React.cloneElement(childElement, { index: `${index}-${i}` })
      } else {
        console.error('Warning: SubMenu has a child which is not a MenuItem component')
      }
    })
    return (
      <Transition
        in={isOpen}
        timeout={150}
        animation="zoom-in-top"
        classNames="jasmine-submenu"
        tag={'ul'}
      >
        {childrenComponents}
      </Transition>
    )
  }

  const handlerClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsOpen(!isOpen)
  }

  const handlerMouse = (e: React.MouseEvent, toggle: boolean) => {
    if (timer.current) clearTimeout(timer.current)
    e.preventDefault()
    timer.current = setTimeout(() => {
      setIsOpen(toggle)
    }, 200)
  }

  const clickEvents = context.mode === 'vertical' ? { onClick: handlerClick } : {}

  const hoverEvents =
    context.mode === 'horizontal'
      ? {
          onMouseEnter: (e: React.MouseEvent) => handlerMouse(e, true),
          onMouseLeave: (e: React.MouseEvent) => handlerMouse(e, false),
        }
      : {}

  return (
    <li key={index} className={classes} {...hoverEvents}>
      <div className="submenu-title" onClick={handlerClick} {...clickEvents}>
        {title}
        <Icon icon="chevron-down" theme="primary" className="arrow-icon" size="sm" />
      </div>
      {renderChildren()}
    </li>
  )
}

SubMenu.displayName = 'SubMenu'
export default SubMenu
