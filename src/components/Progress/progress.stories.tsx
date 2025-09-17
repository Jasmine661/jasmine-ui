import type { Meta, StoryObj } from '@storybook/react-vite'
import Progress from './progress'

const meta: Meta<typeof Progress> = {
  title: 'Components/Progress',
  component: Progress,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: '这是 Progress 进度条组件，用于显示任务或操作的完成进度。',
      },
    },
  },
  argTypes: {
    percent: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: '进度百分比',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '0' },
      },
    },
    strokeHeight: {
      control: { type: 'range', min: 8, max: 50, step: 1 },
      description: '进度条高度',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '15' },
      },
    },
    showText: {
      control: 'boolean',
      description: '是否显示百分比文字',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    theme: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'],
      description: '进度条主题',
      table: {
        type: { summary: "'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark'" },
        defaultValue: { summary: 'primary' },
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Progress>

// 基础用法
export const Default: Story = {
  args: {
    percent: 30,
  },
}

// 不同进度和主题
export const DifferentProgressAndThemes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h4>不同进度</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Progress percent={0} />
          <Progress percent={25} />
          <Progress percent={50} />
          <Progress percent={75} />
          <Progress percent={100} />
        </div>
      </div>
      
      <div>
        <h4>不同主题</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Progress percent={30} theme="primary" />
          <Progress percent={40} theme="secondary" />
          <Progress percent={50} theme="success" />
          <Progress percent={60} theme="danger" />
          <Progress percent={70} theme="warning" />
          <Progress percent={80} theme="info" />
        </div>
      </div>
      
      <div>
        <h4>不同高度</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Progress percent={30} strokeHeight={8} />
          <Progress percent={40} strokeHeight={15} />
          <Progress percent={50} strokeHeight={25} />
          <Progress percent={60} strokeHeight={35} />
          <Progress percent={70} strokeHeight={50} />
        </div>
      </div>
    </div>
  ),
}

// 实际应用场景
export const RealWorldExamples: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h4>文件上传进度</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <h5>文件上传中...</h5>
            <Progress percent={25} theme="primary" />
            <p style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
              正在上传 document.pdf (2.5MB / 10MB)
            </p>
          </div>
          <div>
            <h5>文件上传完成</h5>
            <Progress percent={100} theme="success" />
            <p style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
              document.pdf 上传成功
            </p>
          </div>
          <div>
            <h5>上传失败</h5>
            <Progress percent={60} theme="danger" />
            <p style={{ fontSize: '12px', color: '#f56565', marginTop: '4px' }}>
              网络错误，请重试
            </p>
          </div>
        </div>
      </div>
      
      <div>
        <h4>技能展示</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
              <span>JavaScript</span>
              <span>85%</span>
            </div>
            <Progress percent={85} theme="primary" showText={false} />
          </div>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
              <span>React</span>
              <span>90%</span>
            </div>
            <Progress percent={90} theme="success" showText={false} />
          </div>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
              <span>TypeScript</span>
              <span>75%</span>
            </div>
            <Progress percent={75} theme="info" showText={false} />
          </div>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
              <span>Node.js</span>
              <span>70%</span>
            </div>
            <Progress percent={70} theme="warning" showText={false} />
          </div>
        </div>
      </div>
      
      <div>
        <h4>任务进度</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <h5>数据处理任务</h5>
            <Progress percent={75} theme="info" />
            <p style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
              已处理 7500 / 10000 条记录
            </p>
          </div>
          <div>
            <h5>系统更新</h5>
            <Progress percent={90} theme="warning" />
            <p style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
              更新进度 90%，预计还需 2 分钟
            </p>
          </div>
        </div>
      </div>
    </div>
  ),
}

// 自定义样式
export const CustomStyle: Story = {
  args: {
    percent: 45,
    styles: {
      width: '300px',
      margin: '20px 0',
    },
  },
}
