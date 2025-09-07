import type { Meta, StoryFn } from '@storybook/react-vite'
import Button from './Button'
import type { ButtonProps } from './Button'

// 元信息： 告诉storybook这是哪个组件，以及展示配置
const meta: Meta<typeof Button> = {
  title: 'Components/Button', // 组件在storybook的路径
  component: Button, // 对应的React组件
  tags: ['autodocs'], // 自动生成文档
  // 添加注释内容
  parameters: {
    docs: {
      description: {
        component: '这是按钮组件，用于触发用户操作，支持多种类型和尺寸。',
      },
    },
  },
  argTypes: {
    btnType: {
      control: 'select',
      options: ['primary', 'default', 'danger', 'link'],
      description: '按钮类型',
      table: {
        type: { summary: "'primary'| 'default'| 'danger'| 'link'" },
        defaultValue: { summary: 'default' },
      },
    },
    size: {
      control: 'select',
      options: ['lg', 'sm'],
      description: '按钮大小',
      table: {
        type: { summary: "'lg'| 'sm'" },
        defaultValue: { summary: '-' },
      },
    },
    disabled: {
      control: 'boolean',
      description: '是否禁用',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    href: { control: 'text', description: '按钮链接地址,，仅 btnType 为 link 时生效' },
    children: { control: 'text', description: '按钮内容' },
    className: {
      control: 'text',
      description: '自定义样式类名',
    },
    onClick: {
      action: 'clicked',
      description: '点击事件回调函数',
      table: {
        type: { summary: '() => void' },
      },
    },
  },
}
export default meta

const Template: StoryFn<ButtonProps> = (args) => <Button {...args} />

// 以下是单个story，定义某个特殊场景
// args是组件的props
export const Default = Template.bind({})
Default.args = {
  children: 'Default Button',
  btnType: 'default',
}

export const Primary = Template.bind({})
Primary.args = {
  children: 'Primary Button',
  btnType: 'primary',
}

export const AllTypes = () => (
  <div
    style={{
      display: 'flex',
      gap: '12px',
      padding: '16px',
      justifyContent: 'center',
      width: '100%',
      boxSizing: 'border-box',
    }}
  >
    <Button btnType="default">Default</Button>
    <Button btnType="primary">Primary</Button>
    <Button btnType="danger">Danger</Button>
    <Button btnType="link" href="https://example.com">
      Link
    </Button>
  </div>
)

export const AllSizes = () => (
  <div
    style={{
      display: 'flex',
      gap: '12px',
      padding: '16px',
      justifyContent: 'center',
      width: '100%',
      boxSizing: 'border-box',
    }}
  >
    <Button btnType="primary" size="lg">
      Large
    </Button>
    <Button btnType="primary">Default</Button>
    <Button btnType="primary" size="sm">
      Small
    </Button>
  </div>
)
