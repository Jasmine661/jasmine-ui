// import React from 'react'
import { test, expect, describe, vi } from 'vitest'
import { fireEvent, render, waitFor } from '@testing-library/react'
import type { RenderResult } from '@testing-library/react'
import Upload from './upload'
import type { UploadProps } from './upload'
import axios from 'axios'

// 将icon组件渲染成其icon的文本
vi.mock('../Icon/icon', () => {
  return (props: any) => {
    return <span onClick={props.onClick}>{props.icon}</span>
  }
})

vi.mock('axios')
const mockedAxios = vi.mocked(axios, true)

const testProps: UploadProps = {
  action: 'fakeUrl.com',
  onSuccess: vi.fn(),
  onChange: vi.fn(),
  onRemove: vi.fn(),
}

const testFile = new File(['xyz'], 'test.png', { type: 'image/png' })
describe('test upload component', () => {
  const wrapper: RenderResult = render(<Upload {...testProps}>Click to upload</Upload>)
  const fileInput: HTMLInputElement = wrapper.container.querySelector(
    '.jasmine-file-input'
  ) as HTMLInputElement
  const uploadArea: HTMLElement = wrapper.queryByText('Click to upload') as HTMLElement

  test('upload process should works fine', async () => {
    const { queryByText, getByText } = wrapper
    // 模拟axios.post的返回值的两种方法，第一种能实现一个完整的函数，能包含许多复杂的内容，第二种是给固定的返回值，模拟失败的返回值可以用mockRejectValue()
    // mockedAxios.post.mockImplementation(() => {
    //   return Promise.resolve({ data: 'cool' })
    // })
    mockedAxios.post.mockResolvedValue({ data: 'cool' })
    expect(uploadArea).toBeInTheDocument()
    expect(fileInput).not.toBeVisible()
    // 触发change事件
    fireEvent.change(fileInput, { target: { files: [testFile] } })
    // 检测是否有spinner这个icon
    expect(queryByText('spinner')).toBeInTheDocument()
    await waitFor(() => {
      // 判断是否上传成功
      expect(queryByText('test.png')).toBeInTheDocument()
      expect(queryByText('check-circle')).toBeInTheDocument()
    })
    // 测试onSuccess和onChange是否被调用
    //expect(testProps.onSuccess).toHaveBeenCalledWith('cool',testFile)
    expect(testProps.onSuccess).toHaveBeenCalledWith(
      'cool',
      expect.objectContaining({
        raw: testFile,
        status: 'success',
        response: 'cool',
        name: 'test.png',
      })
    )
    expect(testProps.onChange).toHaveBeenCalledWith(
      expect.objectContaining({
        raw: testFile,
        status: 'success',
        response: 'cool',
        name: 'test.png',
      })
    )

    // 测试删除用例 即onRemove
    expect(queryByText('times')).toBeInTheDocument()
    fireEvent.click(getByText('times'))
    expect(queryByText('test.png')).not.toBeInTheDocument()
    // expect.objectContaining与toHaveBeenCalledWith一起使用，可用于测试对象是否包含某些特定的属性，因为uid一直在变化，无法准确拿到其值
    expect(testProps.onRemove).toHaveBeenCalledWith(
      expect.objectContaining({
        raw: testFile,
        status: 'success',
        name: 'test.png',
      })
    )
  })
  // 测试drag drop
  test('drag and drop files should works fine', async () => {
    mockedAxios.post.mockResolvedValue({ data: 'cool' })
    fireEvent.dragOver(uploadArea)
    expect(uploadArea).toHaveClass('is-dragover')
    fireEvent.dragLeave(uploadArea)
    expect(uploadArea).not.toHaveClass('is-dragover')
    // 以下是处理drag和drop事件的两种方法，前者更偏向底层，后者更加简洁
    // const mockDropEvent = createEvent.drop(uploadArea)
    // Object.defineProperty(mockDropEvent, "dataTransfer", {
    //   value: {
    //     files: [testFile]
    //   }
    // })
    // fireEvent(uploadArea, mockDropEvent)
    fireEvent.drop(uploadArea, {
      dataTransfer: {
        files: [testFile],
      },
    })
    await waitFor(() => {
      expect(wrapper.queryByText('test.png')).toBeInTheDocument()
      // expect(wrapper.queryByText('check-circle')).toBeInTheDocument()
    })
    expect(testProps.onSuccess).toHaveBeenCalledWith(
      'cool',
      expect.objectContaining({
        raw: testFile,
        status: 'success',
        response: 'cool',
        name: 'test.png',
      })
    )
  })
})
