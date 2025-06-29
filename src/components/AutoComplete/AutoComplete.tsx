import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type KeyboardEvent,
  type ReactElement,
} from 'react'
import Input, { type InputProps } from '../Input/input'
import Icon from '../Icons/icon'
import useDebounce from '../hooks/useDebounce'
import classNames from 'classnames'
import useClickOutside from '../hooks/useClickOutside'
import Transition from '../Transition/Transition'

interface DataSourceObject {
  value: string
}

export type DataSourceType<T = Record<string, unknown>> = T & DataSourceObject

export interface AutoCompleteProps<T = Record<string, unknown>>
  extends Omit<InputProps, 'onSelect'> {
  fetchSuggestions: (str: string) => DataSourceType<T>[] | Promise<DataSourceType<T>[]>
  onSelect?: (item: DataSourceType<T>) => void
  renderOption?: (item: DataSourceType<T>) => ReactElement // 按照该函数的方式渲染内容
}

// 组件主体部分 (FC不支持泛型)  Record表示一个对象，key是string，value是任意类型
const AutoComplete = <T extends Record<string, unknown> = Record<string, unknown>>(
  props: AutoCompleteProps<T>
) => {
  const { fetchSuggestions, onSelect, value, renderOption, ...restProps } = props

  const [inputValue, setInputValue] = useState(value as string)
  // 筛选的结果
  const [suggestions, setSuggestions] = useState<DataSourceType<T>[]>([])
  const [loading, setLoading] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  // 选择高亮项
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  // 控制点击其他位置隐藏列表
  const componentRef = useRef<HTMLDivElement>(null)
  // 防止onselect之后继续搜索
  const triggerSearch = useRef(false)

  useClickOutside(componentRef, () => {
    setSuggestions([])
  })
  const debouncedValue = useDebounce(inputValue, 300)
  // 使用自定义hook配合useEffect完成节流优化
  useEffect(() => {
    if (debouncedValue && triggerSearch.current) {
      setLoading(true)
      const fetchData = async () => {
        const result = await Promise.resolve(fetchSuggestions(debouncedValue))
        setLoading(false)
        setSuggestions(result)
        setShowDropdown(result.length > 0)
      }
      fetchData()
      setHighlightedIndex(-1)
    } else if (!debouncedValue) {
      setSuggestions([])
      setShowDropdown(false) // 清空输入时隐藏下拉框
    } else {
      triggerSearch.current = false
      setShowDropdown(false)
    }
  }, [debouncedValue, fetchSuggestions]) // 所有在 effect 内部使用的变量都应该包含在依赖数组中

  // 键盘控制
  const highlight = (index: number) => {
    if (suggestions.length === 0) return
    if (index < 0) index = suggestions.length - 1
    if (index >= suggestions.length) index = 0
    setHighlightedIndex(index)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case 'ArrowDown':
        // 向下选择
        highlight(highlightedIndex + 1)
        break
      case 'ArrowUp':
        // 向上选择
        highlight(highlightedIndex - 1)
        break
      case 'Enter':
        // 确认选择
        if (highlightedIndex >= 0) {
          handleSelect(suggestions[highlightedIndex])
        }
        break
      case 'Escape':
        // 关闭下拉框
        setSuggestions([])
        setShowDropdown(false)

        break
      default:
        break
    }
  }

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()
    setInputValue(value)
    triggerSearch.current = true
  }

  const handleSelect = (item: DataSourceType<T>) => {
    setInputValue(item.value)
    setSuggestions([])
    setShowDropdown(false)

    onSelect?.(item)
    triggerSearch.current = false
  }

  const renderTemplate = (item: DataSourceType<T>) => {
    return renderOption ? renderOption(item) : item.value
  }

  // 搜索返回列表
  const generateDropdown = () => {
    return (
      <Transition
        in={showDropdown || loading}
        animation="zoom-in-top"
        timeout={300}
        onExited={() => {
          setSuggestions([])
        }}
      >
        <ul className="jasmine-suggestion-list">
          {loading && (
            <div className="suggestions-loading-icon">
              <Icon icon="spinner" spin />
            </div>
          )}
          {suggestions.map((item, index) => {
            const cname = classNames('suggestion-item', {
              'is-active': highlightedIndex === index,
            })
            return (
              <li key={index} className={cname} onClick={() => handleSelect(item)}>
                {renderTemplate(item)}
              </li>
            )
          })}
        </ul>
      </Transition>
    )
  }

  return (
    <div className="jasmine-auto-complete" ref={componentRef}>
      <Input {...restProps} value={inputValue} onChange={handleChange} onKeyDown={handleKeyDown} />
      {generateDropdown()}
    </div>
  )
}

export default AutoComplete
