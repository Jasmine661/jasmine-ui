import type { Meta } from '@storybook/react-vite'
import Input from './input'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: '这是 Input 输入框组件，支持图标、前后缀、禁用、不同尺寸等功能。',
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'lg'],
      description: '输入框尺寸',
      table: {
        type: { summary: "'sm' | 'lg'" },
        defaultValue: { summary: '-' },
      },
    },
    disabled: {
      control: 'boolean',
      description: '是否禁用输入框',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    icon: {
      control: 'object',
      description: '图标（FontAwesome）',
      table: {
        type: { summary: 'IconDefinition' },
      },
    },
    prepend: {
      control: 'text',
      description: '输入框前缀',
      table: {
        type: { summary: 'string | ReactElement' },
      },
    },
    append: {
      control: 'text',
      description: '输入框后缀',
      table: {
        type: { summary: 'string | ReactElement' },
      },
    },
    placeholder: {
      control: 'text',
      description: '占位提示文字',
      table: {
        type: { summary: 'string' },
      },
    },
  },
}
export default meta

export const Default = {
  args: {
    placeholder: '默认输入框',
  },
}

export const Disabled = {
  args: {
    placeholder: '禁用输入框',
    disabled: true,
  },
}

export const WithIcon = {
  args: {
    placeholder: '搜索内容',
    icon: faSearch,
  },
}

export const WithPrependAppend = {
  args: {
    placeholder: '金额',
    prepend: '￥',
  },
}

export const AllSizes = {
  args: {
    placeholder: '输入框',
  },
  render: (args: any) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <Input {...args} placeholder="小尺寸输入框" size="sm" />
      <Input {...args} placeholder="默认尺寸输入框" />
      <Input {...args} placeholder="大尺寸输入框" size="lg" />
    </div>
  ),
}

export const Controlled = {
  render: () => {
    const [value, setValue] = useState('')
    return (
      <Input value={value} onChange={(e) => setValue(e.target.value)} placeholder="受控输入框" />
    )
  },
}
