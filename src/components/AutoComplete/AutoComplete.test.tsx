import { config } from 'react-transition-group'
import { render, fireEvent, waitFor } from '@testing-library/react'
import type { RenderResult } from '@testing-library/react'
import AutoComplete from './AutoComplete'
import type { AutoCompleteProps, DataSourceType } from './AutoComplete'
import { vi, describe, test, expect, beforeEach } from 'vitest'

// 禁用 react-transition-group 的动画以避免测试问题，把异步效果转换成同步，直接发生
config.disabled = true

// Mock useDebounce hook
vi.mock('../hooks/useDebounce', () => {
  return {
    default: vi.fn((value: any) => value)
  }
})

// Mock useClickOutside hook
vi.mock('../hooks/useClickOutside', () => {
  return {
    default: vi.fn()
  }
})

vi.mock('../Icons/icon', () => {
  return {
    default: (props: any) => {
      return <span onClick={props.onClick}>{props.icon}</span>
    }
  }
})

const testArray = [
  { value: 'ab', number: 11 },
  { value: 'abc', number: 1 },
  { value: 'b', number: 4 },
  { value: 'c', number: 15 },
]

const renderOption = (item: DataSourceType<{ value: string; number: number }>) => {
  return <>name: {item.value}</>
}

const testProps: AutoCompleteProps<{ value: string; number: number }> = {
  fetchSuggestions: (query) => {
    return testArray.filter((item) => item.value.includes(query))
  },
  onSelect: vi.fn(),
  placeholder: 'auto-complete',
}

const testPropsWithCustomRender: AutoCompleteProps<{ value: string; number: number }> = {
  ...testProps,
  placeholder: 'auto-complete-2',
  renderOption,
}

let wrapper: RenderResult, inputNode: HTMLInputElement

describe('test AutoComplete component', () => {
  beforeEach(() => {
    wrapper = render(<AutoComplete {...testProps} />)
    inputNode = wrapper.getByPlaceholderText('auto-complete') as HTMLInputElement
  })

  test('test basic AutoComplete behavior', async () => {
    // input change
    fireEvent.change(inputNode, { target: { value: 'a' } })
    await waitFor(() => {
      expect(wrapper.queryByText('ab')).toBeInTheDocument()
    })
    // should have two suggestion items
    expect(wrapper.container.querySelectorAll('.suggestion-item').length).toEqual(2)
    //click the first item
    fireEvent.click(wrapper.getByText('ab'))
    expect(testProps.onSelect).toHaveBeenCalledWith({ value: 'ab', number: 11 })
    expect(wrapper.queryByText('ab')).not.toBeInTheDocument()
    //fill the input
    expect(inputNode.value).toBe('ab')
  })

  test('should provide keyboard support', async () => {
    // input change
    fireEvent.change(inputNode, { target: { value: 'a' } })
    await waitFor(() => {
      expect(wrapper.queryByText('ab')).toBeInTheDocument()
    })
    const firstResult = wrapper.queryByText('ab')
    const secondResult = wrapper.queryByText('abc')

    // arrow down
    fireEvent.keyDown(inputNode, { key: 'ArrowDown' })
    expect(firstResult).toHaveClass('is-active')
    //arrow down
    fireEvent.keyDown(inputNode, { key: 'ArrowDown' })
    expect(secondResult).toHaveClass('is-active')
    //arrow up
    fireEvent.keyDown(inputNode, { key: 'ArrowUp' })
    expect(firstResult).toHaveClass('is-active')
    // press enter
    fireEvent.keyDown(inputNode, { key: 'Enter' })
    expect(testProps.onSelect).toHaveBeenCalledWith({ value: 'ab', number: 11 })
    expect(wrapper.queryByText('ab')).not.toBeInTheDocument()
  })

  test('Escape key should hide the dropdown', async () => {
    // input change
    fireEvent.change(inputNode, { target: { value: 'a' } })
    await waitFor(() => {
      expect(wrapper.queryByText('ab')).toBeInTheDocument()
    })
    fireEvent.keyDown(inputNode, { key: 'Escape' })
    expect(wrapper.queryByText('ab')).not.toBeInTheDocument()
  })

  test('renderOption should generate the right template', async () => {
    const wrapper = render(<AutoComplete {...testPropsWithCustomRender} />)
    const inputNode = wrapper.getByPlaceholderText('auto-complete-2') as HTMLInputElement
    fireEvent.change(inputNode, { target: { value: 'a' } })
    await waitFor(() => {
      expect(wrapper.queryByText('name: ab')).toBeInTheDocument()
    })
  })

  test('async fetchSuggestions should works fine', async () => {
    const testPropsWithPromise: AutoCompleteProps<{ value: string; number: number }> = {
      ...testProps,
      fetchSuggestions: vi.fn((query) => {
        return Promise.resolve(testArray.filter((item) => item.value.includes(query)))
      }) as any,
      placeholder: 'auto-complete-3',
    }
    const wrapper = render(<AutoComplete {...testPropsWithPromise} />)
    const inputNode = wrapper.getByPlaceholderText('auto-complete-3') as HTMLInputElement
    fireEvent.change(inputNode, { target: { value: 'a' } })
    await waitFor(() => {
      expect(testPropsWithPromise.fetchSuggestions).toHaveBeenCalled()
      expect(wrapper.queryByText('ab')).toBeInTheDocument()
    })
  })

  test('should show loading state', async () => {
    const testPropsWithLoading: AutoCompleteProps<{ value: string; number: number }> = {
      ...testProps,
      fetchSuggestions: vi.fn((query) => {
        return new Promise<DataSourceType<{ value: string; number: number }>[]>((resolve) => {
          setTimeout(() => resolve(testArray.filter((item) => item.value.includes(query))), 100)
        })
      }) as any,
      placeholder: 'auto-complete-loading',
    }
    const wrapper = render(<AutoComplete {...testPropsWithLoading} />)
    const inputNode = wrapper.getByPlaceholderText('auto-complete-loading') as HTMLInputElement
    fireEvent.change(inputNode, { target: { value: 'a' } })

    // 应该显示加载状态
    expect(wrapper.container.querySelector('.suggestions-loading-icon')).toBeInTheDocument()

    await waitFor(() => {
      expect(wrapper.queryByText('ab')).toBeInTheDocument()
    })
  })

  test('should handle empty results', async () => {
    const testPropsWithEmpty: AutoCompleteProps<{ value: string; number: number }> = {
      ...testProps,
      fetchSuggestions: vi.fn(() => []) as any,
      placeholder: 'auto-complete-empty',
    }
    const wrapper = render(<AutoComplete {...testPropsWithEmpty} />)
    const inputNode = wrapper.getByPlaceholderText('auto-complete-empty') as HTMLInputElement
    fireEvent.change(inputNode, { target: { value: 'xyz' } })

    await waitFor(() => {
      expect(wrapper.container.querySelectorAll('.suggestion-item').length).toEqual(0)
    })
  })
})
