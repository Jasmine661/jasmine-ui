// import React from 'react'
import { render, fireEvent, screen, waitFor } from '@testing-library/react'
import { test, expect, describe, vi } from 'vitest'
import Form from './form'
import FormItem from './formItem'
import Input from '../Input/input'
import type { FormProps } from './form'

const defaultProps: FormProps = {
  children: (
    <FormItem name="test" label="测试字段">
      <Input placeholder="请输入内容" />
    </FormItem>
  ),
  initialValues: { test: 'initial value' },
}

const testProps: FormProps = {
  children: (
    <FormItem name="username" label="用户名">
      <Input placeholder="请输入用户名" />
    </FormItem>
  ),
  onFinish: vi.fn(),
  onFinishFailed: vi.fn(),
}

describe('Form 组件测试', () => {
  test('应该正确渲染默认的 Form', () => {
    render(<Form {...defaultProps} />)
    expect(screen.getByText('测试字段')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('请输入内容')).toBeInTheDocument()
  })

  test('应该正确设置初始值', () => {
    render(<Form {...defaultProps} />)
    const input = screen.getByPlaceholderText('请输入内容')
    expect(input).toHaveValue('initial value')
  })

  test('应该正确渲染函数式 children', () => {
    const renderProps = (form: any) => (
      <div>
        <FormItem name="dynamic" label="动态字段">
          <Input placeholder="动态输入" />
        </FormItem>
        <div data-testid="form-state">{JSON.stringify(form)}</div>
      </div>
    )
    
    render(<Form children={renderProps} />)
    expect(screen.getByText('动态字段')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('动态输入')).toBeInTheDocument()
  })

  test('应该正确应用 name 属性', () => {
    render(<Form {...defaultProps} name="test-form" />)
    const formElement = screen.getByText('测试字段').closest('form')
    expect(formElement).toHaveAttribute('name', 'test-form')
  })

  test('应该正确处理 onFinish 回调', async () => {
    const onFinishMock = vi.fn()
    render(
      <Form {...testProps} onFinish={onFinishMock}>
        <FormItem name="username" label="用户名">
          <Input placeholder="请输入用户名" />
        </FormItem>
        <button type="submit">提交</button>
      </Form>
    )
    
    const submitButton = screen.getByText('提交')
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(onFinishMock).toHaveBeenCalled()
    })
  })

  test('应该正确处理 onFinishFailed 回调', async () => {
    const onFinishFailedMock = vi.fn()
    render(
      <Form {...testProps} onFinishFailed={onFinishFailedMock}>
        <FormItem 
          name="username" 
          label="用户名"
          rules={[{ required: true, message: '用户名不能为空' }]}
        >
          <Input placeholder="请输入用户名" />
        </FormItem>
        <button type="submit">提交</button>
      </Form>
    )
    
    const submitButton = screen.getByText('提交')
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(onFinishFailedMock).toHaveBeenCalled()
    })
  })

  test('应该正确处理空的 children', () => {
    render(<Form children={null} />)
    const formElement = screen.getByRole('form')
    expect(formElement).toBeInTheDocument()
  })

  test('应该正确处理 undefined 的 initialValues', () => {
    render(<Form children={<div>Test</div>} />)
    expect(screen.getByText('Test')).toBeInTheDocument()
  })
})
