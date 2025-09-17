import type { Meta, StoryFn } from '@storybook/react-vite'
import { Upload } from './upload'
import type { UploadProps } from './upload'
import Button from '../Button'
import Icon from '../Icons'
const meta: Meta<typeof Upload> = {
  title: 'Components/Upload',
  component: Upload,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: '这是上传组件，用于文件上传功能，支持点击按钮选择文件。',
      },
    },
  },
  argTypes: {
    action: {
      control: 'text',
      description: '上传接口地址',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '-' },
      },
    },
    onProgress: {
      action: 'progress',
      description: '上传进度回调函数',
      table: {
        type: { summary: '(percentage: number, file: File) => void' },
      },
    },
    onSuccess: {
      action: 'success',
      description: '上传成功回调函数',
      table: {
        type: { summary: '(data: any, file: File) => void' },
      },
    },
    onError: {
      action: 'error',
      description: '上传失败回调函数',
      table: {
        type: { summary: '(err: any, file: File) => void' },
      },
    },
  },
}
export default meta

const Template: StoryFn<UploadProps> = (args) => <Upload {...args} />

export const Default = Template.bind({})
Default.args = {
  action: 'https://httpbin.org/post',
  children: <Button btnType='primary'>上传文件</Button>,
}

export const WithCallbacks = Template.bind({})

WithCallbacks.args = {
  children: <Button btnType='primary'>上传文件</Button>,
  action: 'https://httpbin.org/post',
  onProgress: (percentage, file) => {
    console.log(`上传进度: ${percentage}%, 文件: ${file.name}`)
  },
  onSuccess: (data, file) => {
    console.log('上传成功:', data, file.name)
  },
  onError: (err, file) => {
    console.error('上传失败:', err, file.name)
  },
}

export const Demo = () => (
  <div
    style={{
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      alignItems: 'center',
    }}
  >
    <h3>文件上传组件演示</h3>
    <Upload action="https://httpbin.org/post"><Button btnType='primary'>上传文件</Button></Upload>
    <p style={{ color: '#666', fontSize: '14px' }}>点击按钮选择文件进行上传</p>
    <p>测试2</p>
    <Upload
      action="https://httpbin.org/post"
      name="fileName"
      data={{ key: 'value' }}
      header={{ 'X-Powered-By': 'jasmine-ship' }}
      accept=".jpg"
      multiple
      drag
    >
      <Icon icon='upload' size='5x'></Icon>      
    </Upload>
  </div>
)
