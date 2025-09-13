// import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { test, expect, describe, vi, beforeEach } from 'vitest'
import Transition from './Transition'
import type { TransitionProps } from './Transition'

const defaultProps: TransitionProps = {
  children: <div>Transition Content</div>,
  in: true,
}

const testProps: TransitionProps = {
  children: <div>Test Content</div>,
  in: false,
  animation: 'zoom-in-left',
  timeout: 500,
  onEnter: vi.fn(),
  onEntered: vi.fn(),
  onExit: vi.fn(),
  onExited: vi.fn(),
}

describe('Transition 组件测试', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  test('应该正确渲染默认的 Transition', () => {
    render(<Transition {...defaultProps} />)
    expect(screen.getByText('Transition Content')).toBeInTheDocument()
  })

  test('当 in 为 false 时不应该渲染内容', () => {
    render(<Transition {...testProps} />)
    expect(screen.queryByText('Test Content')).not.toBeInTheDocument()
  })

  test('应该正确应用默认动画类名', () => {
    render(<Transition {...defaultProps} />)
    const element = screen.getByText('Transition Content')
    expect(element).toHaveClass('zoom-in-top')
    expect(element).toHaveClass('zoom-in-top-enter')
  })

  test('应该正确应用自定义动画类名', () => {
    render(<Transition {...testProps} in={true} />)
    const element = screen.getByText('Test Content')
    expect(element).toHaveClass('zoom-in-left')
    expect(element).toHaveClass('zoom-in-left-enter')
  })

  test('应该正确应用自定义 classNames', () => {
    render(<Transition {...defaultProps} classNames="custom-transition" />)
    const element = screen.getByText('Transition Content')
    expect(element).toHaveClass('custom-transition')
  })

  test('应该正确使用自定义标签', () => {
    render(<Transition {...defaultProps} tag="span" />)
    const element = screen.getByText('Transition Content')
    expect(element.tagName).toBe('SPAN')
  })

  test('当 wrapper 为 true 时应该包装内容', () => {
    render(<Transition {...defaultProps} wrapper={true} />)
    const element = screen.getByText('Transition Content')
    expect(element.parentElement).toHaveClass('zoom-in-top')
  })

  test('应该正确调用生命周期钩子', async () => {
    const onEnterMock = vi.fn()
    const onEnteredMock = vi.fn()
    
    const { rerender } = render(
      <Transition {...testProps} onEnter={onEnterMock} onEntered={onEnteredMock} />
    )
    
    // 从 false 变为 true
    rerender(
      <Transition {...testProps} in={true} onEnter={onEnterMock} onEntered={onEnteredMock} />
    )
    
    expect(onEnterMock).toHaveBeenCalled()
    
    await waitFor(() => {
      expect(onEnteredMock).toHaveBeenCalled()
    }, { timeout: 600 })
  })

  test('应该正确处理退出动画的生命周期钩子', async () => {
    const onExitMock = vi.fn()
    const onExitedMock = vi.fn()
    
    const { rerender } = render(
      <Transition {...defaultProps} onExit={onExitMock} onExited={onExitedMock} />
    )
    
    // 从 true 变为 false
    rerender(
      <Transition {...defaultProps} in={false} onExit={onExitMock} onExited={onExitedMock} />
    )
    
    expect(onExitMock).toHaveBeenCalled()
    
    await waitFor(() => {
      expect(onExitedMock).toHaveBeenCalled()
    }, { timeout: 300 })
  })

  test('应该正确处理自定义超时时间', async () => {
    const onEnteredMock = vi.fn()
    
    render(
      <Transition 
        {...defaultProps} 
        timeout={1000} 
        onEntered={onEnteredMock} 
      />
    )
    
    await waitFor(() => {
      expect(onEnteredMock).toHaveBeenCalled()
    }, { timeout: 1100 })
  })

  test('应该正确传递其他属性', () => {
    render(
      <Transition 
        {...defaultProps} 
        data-testid="transition-element"
      />
    )
    
    const element = screen.getByTestId('transition-element')
    expect(element).toBeInTheDocument()
  })

  test('应该正确处理多个子元素', () => {
    render(
      <Transition {...defaultProps}>
        <div>First Child</div>
        <div>Second Child</div>
      </Transition>
    )
    
    expect(screen.getByText('First Child')).toBeInTheDocument()
    expect(screen.getByText('Second Child')).toBeInTheDocument()
  })
})
