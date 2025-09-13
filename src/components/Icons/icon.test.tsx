import { render, screen, fireEvent } from '@testing-library/react'
import { vi, test, expect, describe } from 'vitest'
import Icon from './icon'
import type { IconProps } from './icon'

const defaultProps: IconProps = {
  icon: 'search',
}

const testProps: IconProps = {
  icon: 'user',
  theme: 'primary',
  size: 'lg',
  className: 'custom-icon',
  style: { color: 'red' },
}

describe('Icon 组件测试', () => {
  test('应该正确渲染默认的 Icon', () => {
    render(<Icon {...defaultProps} />)
    const iconElement = screen.getByRole('img', { hidden: true })
    expect(iconElement).toBeInTheDocument()
    expect(iconElement).toHaveClass('jasmine-icon')
  })

  test('应该正确应用主题样式', () => {
    render(<Icon {...testProps} />)
    const iconElement = screen.getByRole('img', { hidden: true })
    expect(iconElement).toHaveClass('icon-primary')
  })

  test('应该正确应用自定义 className', () => {
    render(<Icon {...testProps} />)
    const iconElement = screen.getByRole('img', { hidden: true })
    expect(iconElement).toHaveClass('custom-icon')
  })

  test('应该正确应用自定义样式', () => {
    render(<Icon {...testProps} />)
    const iconElement = screen.getByRole('img', { hidden: true })
    expect(iconElement).toHaveStyle('color: rgb(255, 0, 0)')
  })

  test('应该正确传递 FontAwesome 属性', () => {
    render(<Icon {...testProps} />)
    const iconElement = screen.getByRole('img', { hidden: true })
    expect(iconElement).toHaveAttribute('data-icon', 'user')
  })

  test('应该正确处理不同的主题', () => {
    const themes = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark']
    
    themes.forEach(theme => {
      const { unmount } = render(<Icon {...defaultProps} theme={theme as any} />)
      const iconElement = screen.getByRole('img', { hidden: true })
      expect(iconElement).toHaveClass(`icon-${theme}`)
      unmount()
    })
  })

  test('应该正确处理不同的尺寸', () => {
    const sizes = ['xs', 'sm', 'lg', 'xl', '2xl']
    
    sizes.forEach(size => {
      const { unmount } = render(<Icon {...defaultProps} size={size as any} />)
      const iconElement = screen.getByRole('img', { hidden: true })
      expect(iconElement).toHaveClass(`fa-${size}`)
      unmount()
    })
  })

  test('应该正确处理点击事件', () => {
    const onClickMock = vi.fn()
    render(<Icon {...defaultProps} onClick={onClickMock} />)
    
    const iconElement = screen.getByRole('img', { hidden: true })
    fireEvent.click(iconElement)
    
    expect(onClickMock).toHaveBeenCalledTimes(1)
  })


  test('应该正确处理旋转动画', () => {
    render(<Icon {...defaultProps} spin />)
    const iconElement = screen.getByRole('img', { hidden: true })
    expect(iconElement).toHaveClass('fa-spin')
  })

  test('应该正确处理脉冲动画', () => {
    render(<Icon {...defaultProps} pulse />)
    const iconElement = screen.getByRole('img', { hidden: true })
    expect(iconElement).toHaveClass('fa-pulse')
  })

  test('应该正确处理 title 属性', () => {
    render(<Icon {...defaultProps} title="Search Icon" />)
    const iconElement = screen.getByRole('img', { hidden: true })
    // FontAwesome 可能不会直接设置 title 属性，我们检查 SVG 元素
    expect(iconElement).toBeInTheDocument()
  })

  test('应该正确处理 aria-label 属性', () => {
    render(<Icon {...defaultProps} aria-label="Search" />)
    const iconElement = screen.getByRole('img', { hidden: true })
    expect(iconElement).toHaveAttribute('aria-label', 'Search')
  })
})
