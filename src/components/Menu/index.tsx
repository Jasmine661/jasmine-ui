import type { FC } from 'react'
import Menu from './menu'
import SubMenu from './subMenu'
import MenuItem from './menuItem'
import type { MenuProps } from './menu'
import type { SubMenuProps } from './subMenu'
import type { MenuItemProps } from './menuItem'

export type IMenuComponent = FC<MenuProps> & {
  Item: FC<MenuItemProps>,
  SubMenu: FC<SubMenuProps>
}
const TransMenu = Menu as IMenuComponent

TransMenu.Item = MenuItem
TransMenu.SubMenu = SubMenu

export default TransMenu;