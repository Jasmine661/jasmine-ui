// import React from 'react'
import { render, fireEvent, screen, waitFor } from '@testing-library/react'
import { test, expect, describe, vi, beforeEach } from 'vitest'
import Upload from './upload'
import type { UploadProps, UploadFile } from './upload'

// Mock axios
vi.mock('axios', () => ({
  default: {
    post: vi.fn(() => Promise.resolve({ data: 'success' })),
  },
}))

const defaultProps: UploadProps = {
  action: 'https://jsonplaceholder.typicode.com/posts',
  children: <button>上传文件</button>,
}

const testProps: UploadProps = {
  action: 'https://jsonplaceholder.typicode.com/posts',
  multiple: true,
  accept: '.jpg,.png',
  beforeUpload: vi.fn(),
  onProgress: vi.fn(),
  onSuccess: vi.fn(),
  onError: vi.fn(),
  onChange: vi.fn(),
  onRemove: vi.fn(),
  children: <div>拖拽上传</div>,
  drag: true,
}

const mockFile = new File(['test content'], 'test.txt', { type: 'text/plain' })

describe('Upload 组件测试', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  test('应该正确渲染默认的 Upload', () => {
    render(<Upload {...defaultProps} />)
    expect(screen.getByText('上传文件')).toBeInTheDocument()
  })

  test('应该正确渲染拖拽上传', () => {
    render(<Upload {...testProps} />)
    expect(screen.getByText('拖拽上传')).toBeInTheDocument()
  })

  test('应该正确处理文件选择', async () => {
    const onChangeMock = vi.fn()
    render(<Upload {...defaultProps} onChange={onChangeMock} />)
    
    const input = screen.getByRole('button').closest('div')?.querySelector('input[type="file"]')
    expect(input).toBeInTheDocument()
    
    if (input) {
      fireEvent.change(input, { target: { files: [mockFile] } })
      
      await waitFor(() => {
        expect(onChangeMock).toHaveBeenCalled()
      })
    }
  })

  test('应该正确处理 beforeUpload 回调', async () => {
    const beforeUploadMock = vi.fn().mockReturnValue(true)
    render(<Upload {...testProps} beforeUpload={beforeUploadMock} />)
    
    const input = screen.getByRole('button').closest('div')?.querySelector('input[type="file"]')
    expect(input).toBeInTheDocument()
    
    if (input) {
      fireEvent.change(input, { target: { files: [mockFile] } })
      
      await waitFor(() => {
        expect(beforeUploadMock).toHaveBeenCalledWith(mockFile)
      })
    }
  })

  test('当 beforeUpload 返回 false 时应该阻止上传', async () => {
    const beforeUploadMock = vi.fn().mockReturnValue(false)
    const onChangeMock = vi.fn()
    render(<Upload {...testProps} beforeUpload={beforeUploadMock} onChange={onChangeMock} />)
    
    const input = screen.getByRole('button').closest('div')?.querySelector('input[type="file"]')
    expect(input).toBeInTheDocument()
    
    if (input) {
      fireEvent.change(input, { target: { files: [mockFile] } })
      
      await waitFor(() => {
        expect(beforeUploadMock).toHaveBeenCalledWith(mockFile)
        expect(onChangeMock).not.toHaveBeenCalled()
      })
    }
  })

  test('应该正确设置 input 属性', () => {
    render(<Upload {...testProps} />)
    const input = screen.getByRole('button').closest('div')?.querySelector('input[type="file"]')
    expect(input).toHaveAttribute('multiple')
    expect(input).toHaveAttribute('accept', '.jpg,.png')
  })

  test('应该正确渲染默认文件列表', () => {
    const defaultFileList: UploadFile[] = [
      {
        uid: '1',
        name: 'test1.txt',
        status: 'success',
        size: 100,
        percent: 100,
        raw: mockFile,
      },
      {
        uid: '2',
        name: 'test2.txt',
        status: 'error',
        size: 200,
        percent: 0,
        raw: mockFile,
      },
    ]
    
    render(<Upload {...defaultProps} defaultFileList={defaultFileList} />)
    expect(screen.getByText('test1.txt')).toBeInTheDocument()
    expect(screen.getByText('test2.txt')).toBeInTheDocument()
  })

  test('应该正确处理文件移除', () => {
    const onRemoveMock = vi.fn()
    const defaultFileList: UploadFile[] = [
      {
        uid: '1',
        name: 'test1.txt',
        status: 'success',
        size: 100,
        percent: 100,
        raw: mockFile,
      },
    ]
    
    render(<Upload {...defaultProps} defaultFileList={defaultFileList} onRemove={onRemoveMock} />)
    
    const removeButton = screen.getByTitle('删除文件')
    fireEvent.click(removeButton)
    
    expect(onRemoveMock).toHaveBeenCalledWith(defaultFileList[0])
  })

  test('应该正确应用自定义样式类名', () => {
    render(<Upload {...defaultProps} className="custom-upload" />)
    const uploadElement = screen.getByText('上传文件').closest('.jasmine-upload-component')
    expect(uploadElement).toHaveClass('custom-upload')
  })
})