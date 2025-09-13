import { render, screen } from '@testing-library/react'
import { test, expect, describe } from 'vitest'
import Progress from './progress'
import type { ProgressProps } from './progress'

const defaultProps: ProgressProps = {
  percent: 50,
}

const testProps: ProgressProps = {
  percent: 75,
  strokeHeight: 20,
  showText: false,
  theme: 'success',
}

describe('Progress 组件测试', () => {
  test('应该正确渲染默认的 Progress', () => {
    render(<Progress {...defaultProps} />)
    const progressElement = screen.getByText('50%')
    expect(progressElement).toBeInTheDocument()
    expect(progressElement).toHaveClass('inner-text')
  })

  test('应该正确显示百分比文本', () => {
    render(<Progress {...defaultProps} />)
    expect(screen.getByText('50%')).toBeInTheDocument()
  })

  test('当 showText 为 false 时不应该显示百分比文本', () => {
    render(<Progress {...testProps} />)
    expect(screen.queryByText('75%')).not.toBeInTheDocument()
  })

  test('应该根据 percent 属性正确设置进度条宽度', () => {
    render(<Progress {...defaultProps} />)
    const innerElement = screen.getByText('50%').closest('.jasmine-progress-bar-inner')
    expect(innerElement).toHaveStyle('width: 50%')
  })

  test('应该根据 strokeHeight 属性正确设置进度条高度', () => {
    render(<Progress {...testProps} />)
    const outerElement = document.querySelector('.jasmine-progress-bar-outer')
    expect(outerElement).toHaveStyle('height: 20px')
  })

  test('应该根据 theme 属性正确应用样式类', () => {
    render(<Progress {...testProps} />)
    const innerElement = document.querySelector('.jasmine-progress-bar-inner')
    expect(innerElement).toHaveClass('color-success')
  })

  test('应该正确应用自定义样式', () => {
    const customStyle = { margin: '10px', padding: '5px' }
    render(<Progress {...defaultProps} styles={customStyle} />)
    const progressBar = screen.getByText('50%').closest('.jasmine-progress-bar')
    expect(progressBar).toHaveStyle('margin: 10px; padding: 5px;')
  })

  test('当 percent 为 0 时应该正确显示', () => {
    render(<Progress {...defaultProps} percent={0} />)
    expect(screen.getByText('0%')).toBeInTheDocument()
    const innerElement = screen.getByText('0%').closest('.jasmine-progress-bar-inner')
    expect(innerElement).toHaveStyle('width: 0%')
  })

  test('当 percent 为 100 时应该正确显示', () => {
    render(<Progress {...defaultProps} percent={100} />)
    expect(screen.getByText('100%')).toBeInTheDocument()
    const innerElement = screen.getByText('100%').closest('.jasmine-progress-bar-inner')
    expect(innerElement).toHaveStyle('width: 100%')
  })

  test('应该使用默认的 strokeHeight 值', () => {
    render(<Progress {...defaultProps} />)
    const outerElement = screen.getByText('50%').closest('.jasmine-progress-bar-outer')
    expect(outerElement).toHaveStyle('height: 15px')
  })

  test('应该使用默认的 theme 值', () => {
    render(<Progress {...defaultProps} />)
    const innerElement = screen.getByText('50%').closest('.jasmine-progress-bar-inner')
    expect(innerElement).toHaveClass('color-primary')
  })
})
