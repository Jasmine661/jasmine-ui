import type { FC } from 'react'
import Tabs from './tabs'
import TabsItem from './tabsItem'
import type { TabsProps } from './tabs'
import type { TabItemProps } from './tabsItem'

export type ITabsComponent = FC<TabsProps> & {
  Item: FC<TabItemProps>
}

const TransTabs = Tabs as ITabsComponent
TransTabs.Item = TabsItem

export default TransTabs
