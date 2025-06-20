// import React from 'react'
import { cleanup, fireEvent, render, waitFor } from '@testing-library/react'
import type { RenderResult } from '@testing-library/react'
import { beforeEach, describe, expect, test, vi } from 'vitest'

import Menu from './menu'
import MenuItem from './menuItem'
import SubMenu from './subMenu'
import type { MenuProps } from './menu'

const testProps: MenuProps = {
  defaultIndex: '0',
  onSelect: vi.fn(),
  className: 'test',
}

const testVarProps: MenuProps = {
  defaultIndex: '0',
  onSelect: vi.fn(),
  className: 'test',
  mode: 'vertical',
  defaultOpenSubMenus: ['4'],
}

const generateMenu = (props: MenuProps) => {
  return (
    <Menu {...props} defaultOpenSubMenus={props.defaultOpenSubMenus}>
      <MenuItem>active</MenuItem>
      <MenuItem>link</MenuItem>
      <MenuItem disabled>disabled</MenuItem>
      <SubMenu title="SubMenu1">
        <MenuItem>SubMenu-1</MenuItem>
        <MenuItem>SubMenu-2</MenuItem>
        <MenuItem>SubMenu-3</MenuItem>
      </SubMenu>
      <SubMenu title="SubMenu2">
        <MenuItem>SubMenu-4</MenuItem>
        <MenuItem>SubMenu-5</MenuItem>
        <MenuItem>SubMenu-6</MenuItem>
      </SubMenu>
    </Menu>
  )
}

let wrapper: RenderResult,
  wrapper2: RenderResult,
  menuElement: HTMLElement,
  activeElement: HTMLElement,
  disabledElement: HTMLElement

const createStyleFile = () => {
  const cssFile = `
      .jasmine-submenu {
        display: none;
      }
      .jasmine-submenu.menu-opened {
        display: block;
      }
    `

  const style = document.createElement('style')
  style.innerHTML = cssFile

  return style
}

describe('test Menu and MenuItem component', () => {
  beforeEach(() => {
    wrapper = render(generateMenu(testProps))
    // container 用来访问完整的dom容器节点，将css样式插入wrapper
    wrapper.container.append(createStyleFile())
    menuElement = wrapper.getByTestId('menu')
    activeElement = wrapper.getByText('active')
    disabledElement = wrapper.getByText('disabled')
  })
  test('should render correct Menu and MenuItem based on default props', () => {
    expect(menuElement).toBeInTheDocument()
    expect(menuElement).toHaveClass('jasmine-menu test')
    expect(menuElement.getElementsByTagName('li').length).toEqual(11) // 4 MenuItems + 2 SubMenus + 1 SubMenuItems
    expect(menuElement.querySelectorAll(':scope > li.menu-item').length).toEqual(5)
    // :scope is used to select only direct children
    expect(activeElement).toHaveClass('menu-item is-active')
    expect(disabledElement).toHaveClass('menu-item is-disabled')
  })
  test('click item should change active and call the right callback', () => {
    const secondItem = wrapper.getByText('link')
    fireEvent.click(secondItem)
    expect(secondItem).toHaveClass('is-active')
    expect(activeElement).not.toHaveClass('is-active')
    expect(testProps.onSelect).toHaveBeenCalledWith('1')
    fireEvent.click(disabledElement)
    expect(disabledElement).not.toHaveClass('is-active')
    expect(testProps.onSelect).not.toHaveBeenCalledWith('2')
  })
  test('should render vertical mode when mode is set to vertical', () => {
    cleanup()
    const wrapper = render(generateMenu(testVarProps))
    const menuElement = wrapper.getByTestId('menu')
    expect(menuElement).toHaveClass('menu-vertical')
  })
  test('should show dropdown items when hover on SubMenu', async () => {
    expect(wrapper.queryByText('SubMenu-1')).not.toBeVisible()
    const dropdownElement = wrapper.getByText('SubMenu1')
    fireEvent.mouseEnter(dropdownElement)
    // 等待异步状态变化
    await waitFor(() => {
      expect(wrapper.queryByText('SubMenu-1')).toBeVisible()
    })
    fireEvent.click(wrapper.getByText('SubMenu-1'))
    expect(testProps.onSelect).toHaveBeenCalledWith('3-0')
    fireEvent.mouseLeave(dropdownElement)
    await waitFor(() => {
      expect(wrapper.queryByText('SubMenu-1')).not.toBeVisible()
    })
  })
})
describe('test Menu and MenuItem component in vertical mode', () => {
  beforeEach(() => {
    wrapper2 = render(generateMenu(testVarProps))
    wrapper2.container.append(createStyleFile())
  })
  test('should render vertical mode when mode is set to vertical', () => {
    const menuElement = wrapper2.getByTestId('menu')
    expect(menuElement).toHaveClass('menu-vertical')
  })
  test('should show dropdown items when click on subMenu for vertical mode', () => {
    const dropDownItem = wrapper2.queryByText('SubMenu-1')
    expect(dropDownItem).not.toBeVisible()
    fireEvent.click(wrapper2.getByText('SubMenu1'))
    expect(dropDownItem).toBeVisible()
  })
  test('should show subMenu dropdown when defaultOpenSubMenus contains SubMenu index', () => {
    expect(wrapper2.queryByText('SubMenu-4')).toBeVisible()
  })
})
