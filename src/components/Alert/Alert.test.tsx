import { render, fireEvent, screen } from '@testing-library/react'
import { test, expect, describe, vi } from 'vitest'
import Alert from './Alert'
import type { AlertProps } from './Alert'

const defaultProps: AlertProps = {
  description: '这是一个默认的提示信息',
}

const testProps: AlertProps = {
  type: 'success',
  title: '成功提示',
  description: '操作成功完成',
  closable: true,
  onClose: vi.fn(),
}

describe('Alert 组件测试', () => {
  test('应该正确渲染默认的 Alert', () => {
    render(<Alert {...defaultProps} />)
    const alertElement = screen.getByText('这是一个默认的提示信息').closest('.alert')
    expect(alertElement).toBeInTheDocument()
    expect(alertElement).toHaveClass('alert')
  })

  test('应该根据不同的 type 属性渲染不同的样式', () => {
    const { rerender } = render(<Alert {...defaultProps} type="success" />)
    let alertElement = screen.getByText('这是一个默认的提示信息').closest('.alert')
    expect(alertElement).toHaveClass('alert-success')

    rerender(<Alert {...defaultProps} type="warning" />)
    alertElement = screen.getByText('这是一个默认的提示信息').closest('.alert')
    expect(alertElement).toHaveClass('alert-warning')

    rerender(<Alert {...defaultProps} type="error" />)
    alertElement = screen.getByText('这是一个默认的提示信息').closest('.alert')
    expect(alertElement).toHaveClass('alert-error')
  })

  test('应该正确渲染标题和描述', () => {
    render(<Alert {...testProps} />)
    expect(screen.getByText('成功提示')).toBeInTheDocument()
    expect(screen.getByText('操作成功完成')).toBeInTheDocument()
  })

  test('当 closable 为 true 时应该显示关闭按钮', () => {
    render(<Alert {...testProps} />)
    const closeButton = document.querySelector('.fa-close')
    expect(closeButton).toBeInTheDocument()
  })

  test('当 closable 为 false 时不应该显示关闭按钮', () => {
    render(<Alert {...defaultProps} closable={false} />)
    const closeButton = document.querySelector('.fa-close')
    expect(closeButton).not.toBeInTheDocument()
  })

  test('点击关闭按钮应该调用 onClose 回调', () => {
    const onCloseMock = vi.fn()
    render(<Alert {...testProps} onClose={onCloseMock} />)
    const closeButton = document.querySelector('.fa-close')
    expect(closeButton).toBeInTheDocument()
    fireEvent.click(closeButton!)
    expect(onCloseMock).toHaveBeenCalledTimes(1)
  })

  test('点击关闭按钮后组件应该隐藏', () => {
    render(<Alert {...testProps} />)
    const closeButton = document.querySelector('.fa-close')
    expect(closeButton).toBeInTheDocument()
    fireEvent.click(closeButton!)
    expect(screen.queryByText('操作成功完成')).not.toBeInTheDocument()
  })

  test('应该正确应用 closable 相关的 CSS 类', () => {
    render(<Alert {...testProps} />)
    const alertElement = screen.getByText('操作成功完成').closest('.alert')
    expect(alertElement).toHaveClass('alert-closable')
  })
})
