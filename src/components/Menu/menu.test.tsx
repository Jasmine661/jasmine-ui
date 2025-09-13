import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import { test, expect, describe, vi } from 'vitest'
import Menu from './menu'
import MenuItem from './menuItem'
import type { MenuProps } from './menu'

const defaultProps: MenuProps = {
  children: [
    <MenuItem key="1">Menu Item 1</MenuItem>,
    <MenuItem key="2">Menu Item 2</MenuItem>,
    <MenuItem key="3" disabled>
      Menu Item 3
    </MenuItem>,
  ],
}

const testProps: MenuProps = {
  defaultIndex: '1',
  mode: 'vertical',
  onSelect: vi.fn(),
  children: [
    <MenuItem key="1">Vertical Menu Item 1</MenuItem>,
    <MenuItem key="2">Vertical Menu Item 2</MenuItem>,
  ],
}

describe('Menu 组件测试', () => {
  test('应该正确渲染默认的 Menu', () => {
    render(<Menu {...defaultProps} />)
    expect(screen.getByText('Menu Item 1')).toBeInTheDocument()
    expect(screen.getByText('Menu Item 2')).toBeInTheDocument()
    expect(screen.getByText('Menu Item 3')).toBeInTheDocument()
  })

  test('应该默认激活第一个 MenuItem', () => {
    render(<Menu {...defaultProps} />)
    const menuItem1 = screen.getByText('Menu Item 1').closest('li')
    expect(menuItem1).toHaveClass('is-active')
  })

  test('应该根据 defaultIndex 激活对应的 MenuItem', () => {
    render(<Menu {...testProps} />)
    const menuItem2 = screen.getByText('Vertical Menu Item 2').closest('li')
    expect(menuItem2).toHaveClass('is-active')
  })

  test('应该正确应用水平模式的样式', () => {
    render(<Menu {...defaultProps} mode="horizontal" />)
    const menuElement = screen.getByTestId('menu')
    expect(menuElement).toHaveClass('menu-horizontal')
  })

  test('应该正确应用垂直模式的样式', () => {
    render(<Menu {...testProps} />)
    const menuElement = screen.getByTestId('menu')
    expect(menuElement).toHaveClass('menu-vertical')
  })

  test('点击 MenuItem 应该触发 onSelect 回调', () => {
    const onSelectMock = vi.fn()
    render(<Menu {...defaultProps} onSelect={onSelectMock} />)
    
    const menuItem2 = screen.getByText('Menu Item 2')
    fireEvent.click(menuItem2)
    
    expect(onSelectMock).toHaveBeenCalledWith('1')
  })

  test('点击禁用的 MenuItem 不应该触发 onSelect 回调', () => {
    const onSelectMock = vi.fn()
    render(<Menu {...defaultProps} onSelect={onSelectMock} />)
    
    const disabledMenuItem = screen.getByText('Menu Item 3')
    fireEvent.click(disabledMenuItem)
    
    expect(onSelectMock).not.toHaveBeenCalled()
  })

  test('应该正确应用自定义样式', () => {
    const customStyle = { color: 'red', fontSize: '16px' }
    render(<Menu {...defaultProps} style={customStyle} />)
    const menuElement = screen.getByTestId('menu')
    expect(menuElement).toHaveStyle('color: rgb(255, 0, 0); font-size: 16px;')
  })

  test('应该正确应用自定义 className', () => {
    render(<Menu {...defaultProps} className="custom-menu" />)
    const menuElement = screen.getByTestId('menu')
    expect(menuElement).toHaveClass('custom-menu')
  })

  test('应该正确处理 defaultOpenSubMenus 属性', () => {
    const propsWithSubMenus: MenuProps = {
      ...defaultProps,
      defaultOpenSubMenus: ['0'],
    }
    render(<Menu {...propsWithSubMenus} />)
    const menuElement = screen.getByTestId('menu')
    expect(menuElement).toBeInTheDocument()
  })

  test('应该正确处理空的 children', () => {
    render(<Menu children={[]} />)
    const menuElement = screen.getByTestId('menu')
    expect(menuElement).toBeInTheDocument()
  })
})