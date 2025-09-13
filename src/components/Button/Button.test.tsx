import { fireEvent, render } from '@testing-library/react'
import { test, expect, describe, vi } from 'vitest'
import Button from './Button'
import type { ButtonProps, ButtonType, ButtonSize } from './Button'

const defaultProps = {
  onClick: vi.fn(),
}

const testProps: ButtonProps = {
  className: 'test',
  size: 'lg' as ButtonSize,
  btnType: 'primary' as ButtonType,
}

const disabledProps: ButtonProps = {
  disabled: true,
  btnType: 'link' as ButtonType,
  onClick: vi.fn(),
}

describe('test Button component', () => {
  test('should render the correct default button', () => {
    // 测试默认按钮是否正确渲染
    const wrapper = render(<Button {...defaultProps}>Primary</Button>)
    const element = wrapper.getByText('Primary') as HTMLButtonElement
    expect(element).toBeInTheDocument()
    expect(element.tagName).toEqual('BUTTON')
    expect(element).toHaveClass('btn btn-default')
    fireEvent.click(element)
    expect(defaultProps.onClick).toHaveBeenCalled()
    expect(element.disabled).toBeFalsy()
  })
  test('should render the correct component based on different props', () => {
    // 测试不同的props是否生效
    const wrapper = render(<Button {...testProps}>Primary</Button>)
    const element = wrapper.getByText('Primary')
    expect(element).toBeInTheDocument()
    expect(element).toHaveClass('btn btn-primary btn-lg test')
  })
  test('should render a link when btnType is link and href is provided', () => {
    // 测试当btnType为link且href存在时，是否渲染为链接
    const wrapper = render(
      <Button btnType="link" href="http://www.baidu.com">
        link
      </Button>
    )
    const element = wrapper.getByText('link')
    expect(element).toBeInTheDocument()
    expect(element.tagName).toEqual('A')
  })
  test('should render a disabled button when disabled is true', () => {
    const wrapper = render(<Button {...disabledProps}>disabled</Button>)
    const element = wrapper.getByText('disabled') as HTMLButtonElement
    expect(element).toBeInTheDocument()
    expect(element.disabled).toBeTruthy()
    fireEvent.click(element)
    expect(disabledProps.onClick).not.toHaveBeenCalled()
  })
})
