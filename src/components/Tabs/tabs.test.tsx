import { render, fireEvent, screen } from '@testing-library/react'
import { test, expect, describe, vi } from 'vitest'
import Tabs from './tabs'
import TabsItem from './tabsItem'
import type { TabsProps } from './tabs'

const defaultProps: TabsProps = {
  children: [
    <TabsItem label="Tab 1" key="1">
      Content 1
    </TabsItem>,
    <TabsItem label="Tab 2" key="2">
      Content 2
    </TabsItem>,
    <TabsItem label="Tab 3" key="3" disabled>
      Content 3
    </TabsItem>,
  ],
}

const testProps: TabsProps = {
  defaultIndex: 1,
  type: 'card',
  onSelect: vi.fn(),
  children: [
    <TabsItem label="Card Tab 1" key="1">
      Card Content 1
    </TabsItem>,
    <TabsItem label="Card Tab 2" key="2">
      Card Content 2
    </TabsItem>,
  ],
}

describe('Tabs 组件测试', () => {
  test('应该正确渲染默认的 Tabs', () => {
    render(<Tabs {...defaultProps} />)
    expect(screen.getByText('Tab 1')).toBeInTheDocument()
    expect(screen.getByText('Tab 2')).toBeInTheDocument()
    expect(screen.getByText('Tab 3')).toBeInTheDocument()
  })

  test('应该默认显示第一个 Tab 的内容', () => {
    render(<Tabs {...defaultProps} />)
    expect(screen.getByText('Content 1')).toBeInTheDocument()
    expect(screen.queryByText('Content 2')).not.toBeInTheDocument()
  })

  test('应该根据 defaultIndex 显示对应的 Tab 内容', () => {
    render(<Tabs {...testProps} />)
    expect(screen.getByText('Card Content 2')).toBeInTheDocument()
    expect(screen.queryByText('Card Content 1')).not.toBeInTheDocument()
  })

  test('应该正确应用 line 类型的样式', () => {
    render(<Tabs {...defaultProps} type="line" />)
    const navElement = screen.getByText('Tab 1').closest('.jasmine-tabs-nav')
    expect(navElement).toHaveClass('nav-line')
  })

  test('应该正确应用 card 类型的样式', () => {
    render(<Tabs {...testProps} />)
    const navElement = screen.getByText('Card Tab 1').closest('.jasmine-tabs-nav')
    expect(navElement).toHaveClass('nav-card')
  })

  test('点击 Tab 应该切换内容并触发 onSelect 回调', () => {
    const onSelectMock = vi.fn()
    render(<Tabs {...defaultProps} onSelect={onSelectMock} />)
    
    const tab2 = screen.getByText('Tab 2')
    fireEvent.click(tab2)
    
    expect(screen.getByText('Content 2')).toBeInTheDocument()
    expect(screen.queryByText('Content 1')).not.toBeInTheDocument()
    expect(onSelectMock).toHaveBeenCalledWith(1)
  })

  test('点击禁用的 Tab 不应该切换内容', () => {
    const onSelectMock = vi.fn()
    render(<Tabs {...defaultProps} onSelect={onSelectMock} />)
    
    const disabledTab = screen.getByText('Tab 3')
    fireEvent.click(disabledTab)
    
    expect(screen.getByText('Content 1')).toBeInTheDocument()
    expect(screen.queryByText('Content 3')).not.toBeInTheDocument()
    expect(onSelectMock).not.toHaveBeenCalled()
  })

  test('应该正确应用激活状态的样式', () => {
    render(<Tabs {...defaultProps} />)
    const activeTab = screen.getByText('Tab 1').closest('.jasmine-tabs-nav-item')
    expect(activeTab).toHaveClass('is-active')
  })

  test('应该正确应用禁用状态的样式', () => {
    render(<Tabs {...defaultProps} />)
    const disabledTab = screen.getByText('Tab 3').closest('.jasmine-tabs-nav-item')
    expect(disabledTab).toHaveClass('disabled')
  })

  test('应该正确应用自定义样式', () => {
    const customStyle = { color: 'red', fontSize: '16px' }
    render(<Tabs {...defaultProps} style={customStyle} />)
    const navElement = screen.getByText('Tab 1').closest('.jasmine-tabs-nav')
    expect(navElement).toHaveStyle('color: rgb(255, 0, 0); font-size: 16px;')
  })

  test('应该正确应用自定义 className', () => {
    render(<Tabs {...defaultProps} className="custom-tabs" />)
    const navElement = screen.getByText('Tab 1').closest('.jasmine-tabs-nav')
    expect(navElement).toHaveClass('custom-tabs')
  })
})
