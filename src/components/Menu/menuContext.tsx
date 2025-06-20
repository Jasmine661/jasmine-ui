import { createContext } from 'react'

export type SelectCallback = (selectedIndex: string) => void

export interface MenuContextProps {
  index: string
  onSelect?: SelectCallback
  mode?: 'horizontal' | 'vertical'
  defaultOpenSubMenus?: string[]
}

const MenuContext = createContext<MenuContextProps>({ index: '0', defaultOpenSubMenus: [] })

export default MenuContext
