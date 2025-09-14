import { useRef } from 'react'
import Form, { type IFormRef } from './form'
import Item from './formItem'
import Input from '../Input/input'
import Button from '../Button'
import type { Meta, StoryObj } from '@storybook/react-vite'
import '../../styles/index.scss'
import type { CustomRule } from './useStore'

const meta: Meta<typeof Form> = {
  title: 'Components/Form',
  component: Form,
  argTypes: {
    onFinish: {
      action: 'submit',
    },  
    onFinishFailed: {
      action: 'submitFailed',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

// 检测重复密码
const confirmRule: CustomRule[] = [
  { type: 'string', required: true, min: 3, max: 8 },
  ({ getFieldValue }) => ({
    asyncValidator: (_, value) => {
      return new Promise((resolve, reject) => {
        if (value !== getFieldValue('password')) {
          reject('The two passwords that you entered do not match!')
        }
        setTimeout(() => {
          resolve()
        }, 1000)
      })
    }
  })
]

export const BasicForm: Story = {
  name: 'BasicForm',
  render: (args) => {
    const ref = useRef<IFormRef>(null)
    const resetAll = () => {
      console.log(ref.current)
      console.log(ref.current?.getFieldValue('username'))
      ref.current?.resetFields()
    }
    
    return (
      <Form
        initialValues={{ username: '', agreement: false }}
        ref={ref}
        {...args}
      >
        {({ isValid, isSubmitting }) => (
          <>
            <Item
              label="用户名"
              name="username"
              required
              rules={[{ type: 'email', required: true, min: 3 }]}
            >
              <Input placeholder="请输入用户名" />
            </Item>
            <Item
              label="密码"
              name="password"
              required
              rules={[{ type: 'string', required: true, min: 3, max: 8 }]}
            >
              <Input type="password" placeholder="请输入密码" />
            </Item>
            <Item label="确认密码" name="confirm-password" required rules={confirmRule}>
              <Input type="password" placeholder="请再次输入密码" />
            </Item>

            <Item 
              name="agreement" 
              valuePropName="checked" 
              getValueFromEvent={(e) => e.target.checked}
              rules={[{ type: 'enum', enum: [true], message: '请同意协议'}]}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input type="checkbox" />
                <span>
                  注册即代表你同意<a href="#">用户协议</a>
                </span>
              </div>
            </Item>
            <div className="jasmine-form-submit-area">
              <Button type="submit">
                提交 {isSubmitting ? '验证中' : '验证完毕'} {isValid ? '通过😄' : '没通过😢'}
              </Button>
              <Button type="button" onClick={resetAll}>重置</Button>
            </div>
          </>
        )}
      </Form>
    )
  },
}

export const LoginForm: Story = {
  render: () => (
    <Form onFinish={(values) => console.log(values)} onFinishFailed={(values,errors) => console.log(values,errors)}>
      <Item label="用户名" name="username">
        <Input placeholder="请输入用户名或邮箱" />
      </Item>
      <Item label="密码" name="password">
        <Input type="password" placeholder="请输入密码" />
      </Item>
      <Item name="login">
        <Button type="submit" style={{ width: '100%' }}>
          登录
        </Button>
      </Item>
    </Form>
  ),
}
