// 用于承载菜单链接的内容
import React from 'react'

export interface TabItemProps {
  disabled?: boolean
  label?: string
  className?: string
  index?: number
  children?: React.ReactNode
}

const TabsItem: React.FC<TabItemProps> = (props) => {
  const { children } = props
  return <div>{children}</div>
}

export default TabsItem
TabsItem.displayName = 'TabsItem'
