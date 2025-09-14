import type { Meta, StoryObj } from '@storybook/react-vite'
import { Welcome } from './Welcome'

const meta: Meta<typeof Welcome> = {
  title: 'Welcome/Jasmine UI',
  component: Welcome,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Jasmine UI 组件库的欢迎页面，展示组件库的特性和快速开始指南。'
      }
    },
    options: {
      showPanel: false,
    },
  },
  argTypes: {
    title: {
      control: 'text',
      description: '欢迎页面的标题'
    },
    description: {
      control: 'text',
      description: '欢迎页面的描述'
    },
    showComponents: {
      control: 'boolean',
      description: '是否显示组件示例'
    }
  }
}

export default meta
type Story = StoryObj<typeof Welcome>

// 默认故事
export const Default: Story = {
  args: {
    title: '欢迎使用 Jasmine UI',
    description: '一个基于 React 和 TypeScript 的现代化组件库',
    showComponents: true
  }
}

// 完整版本
export const Full: Story = {
  args: {
    title: '🎉 欢迎使用 Jasmine UI 组件库',
    description: '一个功能丰富、设计精美、易于使用的 React 组件库，为你的项目提供高质量的 UI 组件。',
    showComponents: true
  }
}
