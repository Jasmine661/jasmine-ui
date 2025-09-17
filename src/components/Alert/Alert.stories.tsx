import type { Meta, StoryObj } from '@storybook/react-vite'
import Alert from './Alert'

const meta: Meta<typeof Alert> = {
  title: 'Components/Alert',
  component: Alert,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: '这是 Alert 提示组件，用于显示重要的提示信息，支持多种类型和可关闭功能。',
      },
    },
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['success', 'warning', 'error', 'info'],
      description: '提示类型',
      table: {
        type: { summary: "'success' | 'warning' | 'error' | 'info'" },
        defaultValue: { summary: 'info' },
      },
    },
    title: {
      control: 'text',
      description: '提示标题',
      table: {
        type: { summary: 'string' },
      },
    },
    description: {
      control: 'text',
      description: '提示描述内容',
      table: {
        type: { summary: 'string' },
      },
    },
    closable: {
      control: 'boolean',
      description: '是否显示关闭按钮',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    onClose: {
      action: 'closed',
      description: '关闭按钮点击回调',
      table: {
        type: { summary: '() => void' },
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Alert>

// 所有类型和功能展示
export const AllTypes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Alert type="success" title="成功" description="操作成功完成！" closable />
      <Alert type="warning" title="警告" description="请注意相关风险！" closable />
      <Alert type="error" title="错误" description="操作失败，请重试！" closable />
      <Alert type="info" title="信息" description="这是一条重要信息。" closable />
      <Alert type="info" title="长文本提示" description="这是一个包含较长文本内容的提示信息，用于测试组件在长文本情况下的显示效果。提示信息应该能够自动换行并保持良好的视觉效果。" closable />
      <Alert type="success" description="这是一个只有描述内容的提示信息，没有标题。" />
    </div>
  ),
}

// 基础用法
export const Default: Story = {
  args: {
    description: '这是一个默认的提示信息',
  },
}

// 可关闭提示
export const Closable: Story = {
  args: {
    type: 'success',
    title: '可关闭提示',
    description: '点击右侧关闭按钮可以关闭此提示。',
    closable: true,
  },
}
