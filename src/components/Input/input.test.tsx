import { render, fireEvent, screen } from '@testing-library/react'
import { test, expect, describe, vi } from 'vitest'
import Input from './input'
import type { InputProps } from './input'

const defaultProps: InputProps = {
  placeholder: '请输入内容',
  onChange: vi.fn(),
}

const testProps: InputProps = {
  size: 'lg',
  prepend: 'https://',
  append: '.com',
  icon: 'search',
  disabled: true,
}

describe('Input 组件测试', () => {
  test('应该正确渲染默认的 Input', () => {
    render(<Input {...defaultProps} />)
    const inputElement = screen.getByPlaceholderText('请输入内容')
    expect(inputElement).toBeInTheDocument()
    expect(inputElement).toHaveClass('jasmine-input-inner')
  })

  test('应该根据不同的 size 属性渲染不同的样式', () => {
    const { rerender } = render(<Input {...defaultProps} size="lg" />)
    let wrapperElement = screen.getByPlaceholderText('请输入内容').closest('.jasmine-input-wrapper')
    expect(wrapperElement).toHaveClass('input-size-lg')

    rerender(<Input {...defaultProps} size="sm" />)
    wrapperElement = screen.getByPlaceholderText('请输入内容').closest('.jasmine-input-wrapper')
    expect(wrapperElement).toHaveClass('input-size-sm')
  })

  test('应该正确渲染 prepend 和 append', () => {
    render(<Input {...testProps} placeholder="请输入内容" />)
    expect(screen.getByText('https://')).toBeInTheDocument()
    expect(screen.getByText('.com')).toBeInTheDocument()
    expect(screen.getByText('https://')).toHaveClass('jasmine-input-group-prepend')
    expect(screen.getByText('.com')).toHaveClass('jasmine-input-group-append')
  })

  test('应该正确渲染图标', () => {
    render(<Input {...testProps} placeholder="请输入内容" />)
    const iconElement = screen.getByTitle('title-search')
    expect(iconElement).toBeInTheDocument()
  })

  test('当 disabled 为 true 时应该禁用输入框', () => {
    render(<Input {...testProps} placeholder="请输入内容" />)
    const inputElement = screen.getByPlaceholderText('请输入内容')
    expect(inputElement).toBeDisabled()
  })

  test('当 disabled 为 true 时应该应用禁用样式', () => {
    render(<Input {...testProps} placeholder="请输入内容" />)
    const wrapperElement = screen.getByPlaceholderText('请输入内容').closest('.jasmine-input-wrapper')
    expect(wrapperElement).toHaveClass('is-disabled')
  })

  test('当有 prepend 或 append 时应该应用相应的样式类', () => {
    render(<Input {...testProps} placeholder="请输入内容" />)
    const wrapperElement = screen.getByPlaceholderText('请输入内容').closest('.jasmine-input-wrapper')
    expect(wrapperElement).toHaveClass('input-group-prepend')
    expect(wrapperElement).toHaveClass('input-group-append')
  })

  test('onChange 事件应该正确触发', () => {
    const onChangeMock = vi.fn()
    render(<Input {...defaultProps} onChange={onChangeMock} />)
    const inputElement = screen.getByPlaceholderText('请输入内容')
    fireEvent.change(inputElement, { target: { value: 'test input' } })
    expect(onChangeMock).toHaveBeenCalledTimes(1)
  })

  test('应该正确处理受控组件的 value', () => {
    const { rerender } = render(<Input {...defaultProps} value="controlled value" />)
    const inputElement = screen.getByPlaceholderText('请输入内容')
    expect(inputElement).toHaveValue('controlled value')

    rerender(<Input {...defaultProps} value="" />)
    expect(inputElement).toHaveValue('')
  })

  test('应该正确处理 undefined 和 null 值', () => {
    const { rerender } = render(<Input {...defaultProps} value={undefined} />)
    const inputElement = screen.getByPlaceholderText('请输入内容')
    expect(inputElement).toHaveValue('')

    rerender(<Input {...defaultProps} value={undefined} />)
    expect(inputElement).toHaveValue('')
  })

  test('应该正确应用自定义样式', () => {
    const customStyle = { color: 'red', fontSize: '16px' }
    render(<Input {...defaultProps} style={customStyle} />)
    const wrapperElement = screen.getByPlaceholderText('请输入内容').closest('.jasmine-input-wrapper')
    expect(wrapperElement).toHaveStyle('color: rgb(255, 0, 0); font-size: 16px;')
  })
})
