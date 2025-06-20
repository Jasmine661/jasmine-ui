import { createContext } from 'react'

export interface TabsContextProps {
  index: number
  onSelect?: (index: number) => void
  type?: 'line' | 'card'
}

const TabsContext = createContext<TabsContextProps>({ index: 0, type: 'line' })

export default TabsContext
