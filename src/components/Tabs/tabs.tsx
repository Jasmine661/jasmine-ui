import classNames from 'classnames'
import React, { useState, useMemo, useCallback } from 'react'
import TabsItem from './tabsItem'
import type { TabItemProps } from './tabsItem'

type TabType = 'line' | 'card'
export interface TabsProps {
  defaultIndex?: number
  className?: string
  onSelect?: (index: number) => void
  children?: React.ReactNode
  type?: TabType
  style?: React.CSSProperties
}

const Tabs: React.FC<TabsProps> = React.memo((props) => {
  const { className, defaultIndex = 0, onSelect, children, type = 'line', style } = props

  //组件的样式 - 使用 useMemo 优化
  const classes = useMemo(() => classNames('jasmine-tabs-nav', className, {
    'nav-line': type === 'line',
    'nav-card': type === 'card',
  }), [className, type])
  
  const [currentActive, setActive] = useState(defaultIndex)

  // 使用 useCallback 缓存事件处理函数
  const handlerClick = useCallback((_e: React.MouseEvent, index: number, disabled: boolean) => {
    if (disabled) return
    setActive(index) // 切换激活状态
    if (onSelect) {
      onSelect(index) // 触发外部回调，通知父组件
    }
  }, [onSelect])

  // 使用 useMemo 缓存导航链接渲染
  const renderNavLink = useMemo(() => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as React.ReactElement<TabItemProps, typeof TabsItem>

      const { label, disabled } = childElement.props
      const { displayName } = childElement.type

      // 链接样式
      const liClass = classNames('jasmine-tabs-nav-item', {
        'is-active': currentActive === index,
        disabled: disabled,
      })

      // 确保子组件的期望是TabsItem
      if (displayName === 'TabsItem') {
        return (
          <li
            className={liClass}
            key={`nav-item-${index}`}
            onClick={(e) => {
              handlerClick(e, index, disabled as boolean)
            }}
          >
            {label}
          </li>
        )
      } else {
        console.error('Warning: Tabs has a child which is not a TabsItem component')
        return null
      }
    })
  }, [children, currentActive, handlerClick])

  // 使用 useMemo 缓存内容渲染
  const renderContent = useMemo(() => {
    return React.Children.map(children, (child, index) => {
      if (index === currentActive) {
        return child
      }
    })
  }, [children, currentActive])

  return (
    <div>
      <ul className={classes} style={style}>
        {renderNavLink}
      </ul>
      {/* 渲染选中的 Tab 内容 */}
      <div className="jasmine-tabs-content">{renderContent}</div>
    </div>
  )
})

Tabs.displayName = 'Tabs'

export default Tabs
