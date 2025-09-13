import React from 'react'
import { render, fireEvent, screen, waitFor } from '@testing-library/react'
import { test, expect, describe, vi, beforeEach } from 'vitest'
import AutoComplete from './AutoComplete'
import type { AutoCompleteProps, DataSourceType } from './AutoComplete'

const mockSuggestions: DataSourceType[] = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
]

const defaultProps: AutoCompleteProps = {
  fetchSuggestions: vi.fn().mockResolvedValue(mockSuggestions),
  placeholder: '请输入内容',
}

const testProps: AutoCompleteProps = {
  fetchSuggestions: vi.fn().mockResolvedValue(mockSuggestions),
  onSelect: vi.fn(),
  renderOption: (item) => <div data-testid="custom-option">{item.label}</div>,
  placeholder: '测试输入',
}

describe('AutoComplete 组件测试', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  test('应该正确渲染默认的 AutoComplete', () => {
    render(<AutoComplete {...defaultProps} />)
    expect(screen.getByPlaceholderText('请输入内容')).toBeInTheDocument()
  })

  test('输入内容时应该触发搜索', async () => {
    const fetchSuggestionsMock = vi.fn().mockResolvedValue(mockSuggestions)
    render(<AutoComplete {...defaultProps} fetchSuggestions={fetchSuggestionsMock} />)
    
    const input = screen.getByPlaceholderText('请输入内容')
    fireEvent.change(input, { target: { value: 'a' } })
    
    await waitFor(() => {
      expect(fetchSuggestionsMock).toHaveBeenCalledWith('a')
    })
  })

  test('应该正确显示建议列表', async () => {
    render(<AutoComplete {...defaultProps} />)
    
    const input = screen.getByPlaceholderText('请输入内容')
    fireEvent.change(input, { target: { value: 'a' } })
    
    await waitFor(() => {
      expect(screen.getByText('apple')).toBeInTheDocument()
      expect(screen.getByText('banana')).toBeInTheDocument()
      expect(screen.getByText('cherry')).toBeInTheDocument()
    })
  })

  test('点击建议项应该调用 onSelect 回调', async () => {
    const onSelectMock = vi.fn()
    render(<AutoComplete {...defaultProps} onSelect={onSelectMock} />)
    
    const input = screen.getByPlaceholderText('请输入内容')
    fireEvent.change(input, { target: { value: 'a' } })
    
    await waitFor(() => {
      const suggestion = screen.getByText('apple')
      fireEvent.click(suggestion)
      expect(onSelectMock).toHaveBeenCalledWith(mockSuggestions[0])
    })
  })

  test('应该使用自定义渲染函数', async () => {
    render(<AutoComplete {...testProps} />)
    
    const input = screen.getByPlaceholderText('测试输入')
    fireEvent.change(input, { target: { value: 'a' } })
    
    await waitFor(() => {
      expect(screen.getAllByTestId('custom-option')).toHaveLength(3)
      expect(screen.getByText('Apple')).toBeInTheDocument()
    })
  })

  test('应该正确处理键盘导航', async () => {
    render(<AutoComplete {...defaultProps} />)
    
    const input = screen.getByPlaceholderText('请输入内容')
    fireEvent.change(input, { target: { value: 'a' } })
    
    await waitFor(() => {
      expect(screen.getByText('apple')).toBeInTheDocument()
    })
    
    // 按下下箭头键
    fireEvent.keyDown(input, { key: 'ArrowDown' })
    
    // 按下上箭头键
    fireEvent.keyDown(input, { key: 'ArrowUp' })
    
    // 按下回车键
    fireEvent.keyDown(input, { key: 'Enter' })
  })

  test('应该正确处理 ESC 键隐藏建议列表', async () => {
    render(<AutoComplete {...defaultProps} />)
    
    const input = screen.getByPlaceholderText('请输入内容')
    fireEvent.change(input, { target: { value: 'a' } })
    
    await waitFor(() => {
      expect(screen.getByText('apple')).toBeInTheDocument()
    })
    
    fireEvent.keyDown(input, { key: 'Escape' })
    
    await waitFor(() => {
      expect(screen.queryByText('apple')).not.toBeInTheDocument()
    })
  })

  test('点击外部区域应该隐藏建议列表', async () => {
    render(
      <div>
        <AutoComplete {...defaultProps} />
        <div data-testid="outside">Outside</div>
      </div>
    )
    
    const input = screen.getByPlaceholderText('请输入内容')
    fireEvent.change(input, { target: { value: 'a' } })
    
    await waitFor(() => {
      expect(screen.getByText('apple')).toBeInTheDocument()
    })
    
    const outside = screen.getByTestId('outside')
    fireEvent.click(outside)
    
    await waitFor(() => {
      expect(screen.queryByText('apple')).not.toBeInTheDocument()
    })
  })

  test('应该正确处理加载状态', async () => {
    const fetchSuggestionsMock = vi.fn().mockImplementation(() => 
      new Promise(resolve => setTimeout(() => resolve(mockSuggestions), 100))
    )
    
    render(<AutoComplete {...defaultProps} fetchSuggestions={fetchSuggestionsMock} />)
    
    const input = screen.getByPlaceholderText('请输入内容')
    fireEvent.change(input, { target: { value: 'a' } })
    
    // 应该显示加载状态
    expect(screen.getByText('加载中...')).toBeInTheDocument()
    
    await waitFor(() => {
      expect(screen.getByText('apple')).toBeInTheDocument()
    })
  })

  test('应该正确处理空建议列表', async () => {
    const fetchSuggestionsMock = vi.fn().mockResolvedValue([])
    render(<AutoComplete {...defaultProps} fetchSuggestions={fetchSuggestionsMock} />)
    
    const input = screen.getByPlaceholderText('请输入内容')
    fireEvent.change(input, { target: { value: 'xyz' } })
    
    await waitFor(() => {
      expect(screen.getByText('没有找到匹配的建议')).toBeInTheDocument()
    })
  })

  test('应该正确处理受控组件的值', () => {
    const { rerender } = render(<AutoComplete {...defaultProps} value="controlled value" />)
    
    const input = screen.getByPlaceholderText('请输入内容')
    expect(input).toHaveValue('controlled value')
    
    rerender(<AutoComplete {...defaultProps} value="new value" />)
    expect(input).toHaveValue('new value')
  })
})
