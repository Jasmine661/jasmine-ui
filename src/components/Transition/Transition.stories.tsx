import type { Meta, StoryObj } from '@storybook/react-vite'
import Transition from './Transition'
import { useState } from 'react'
import Button from '../Button/Button'

const meta: Meta<typeof Transition> = {
  title: 'Components/Transition',
  component: Transition,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: '这是 Transition 过渡动画组件，提供多种进入和退出动画效果。',
      },
    },
  },
  argTypes: {
    animation: {
      control: 'select',
      options: ['zoom-in-top', 'zoom-in-left', 'zoom-in-right', 'zoom-in-bottom'],
      description: '动画类型',
      table: {
        type: { summary: "'zoom-in-top' | 'zoom-in-left' | 'zoom-in-right' | 'zoom-in-bottom'" },
        defaultValue: { summary: 'zoom-in-top' },
      },
    },
    in: {
      control: 'boolean',
      description: '是否显示组件',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    timeout: {
      control: { type: 'range', min: 100, max: 2000, step: 100 },
      description: '动画持续时间（毫秒）',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '200' },
      },
    },
    classNames: {
      control: 'text',
      description: '自定义类名前缀',
      table: {
        type: { summary: 'string' },
      },
    },
    tag: {
      control: 'text',
      description: '渲染的HTML标签',
      table: {
        type: { summary: 'ElementType' },
        defaultValue: { summary: 'div' },
      },
    },
    wrapper: {
      control: 'boolean',
      description: '是否包装子元素',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    onEnter: {
      action: 'enter',
      description: '进入动画开始回调',
      table: {
        type: { summary: '() => void' },
      },
    },
    onEntered: {
      action: 'entered',
      description: '进入动画完成回调',
      table: {
        type: { summary: '() => void' },
      },
    },
    onExit: {
      action: 'exit',
      description: '退出动画开始回调',
      table: {
        type: { summary: '() => void' },
      },
    },
    onExited: {
      action: 'exited',
      description: '退出动画完成回调',
      table: {
        type: { summary: '() => void' },
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Transition>

// 基础用法
export const Default: Story = {
  args: {
    in: true,
    children: (
      <div style={{ 
        padding: '20px', 
        background: '#f0f0f0', 
        borderRadius: '8px',
        textAlign: 'center'
      }}>
        这是一个过渡动画组件
      </div>
    ),
  },
}

// 不同动画类型和持续时间
export const AnimationTypesAndTimeouts: Story = {
  render: () => {
    const [show, setShow] = useState(true)
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div style={{ display: 'flex', gap: '10px' }}>
          <Button onClick={() => setShow(!show)}>
            {show ? '隐藏' : '显示'}
          </Button>
        </div>
        
        <div>
          <h4>不同动画类型</h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
            <div>
              <h5>从顶部进入</h5>
              <Transition animation="zoom-in-top" in={show}>
                <div style={{ 
                  padding: '20px', 
                  background: '#e6f7ff', 
                  borderRadius: '8px',
                  textAlign: 'center'
                }}>
                  从顶部进入
                </div>
              </Transition>
            </div>
            
            <div>
              <h5>从左侧进入</h5>
              <Transition animation="zoom-in-left" in={show}>
                <div style={{ 
                  padding: '20px', 
                  background: '#f6ffed', 
                  borderRadius: '8px',
                  textAlign: 'center'
                }}>
                  从左侧进入
                </div>
              </Transition>
            </div>
            
            <div>
              <h5>从右侧进入</h5>
              <Transition animation="zoom-in-right" in={show}>
                <div style={{ 
                  padding: '20px', 
                  background: '#fff7e6', 
                  borderRadius: '8px',
                  textAlign: 'center'
                }}>
                  从右侧进入
                </div>
              </Transition>
            </div>
            
            <div>
              <h5>从底部进入</h5>
              <Transition animation="zoom-in-bottom" in={show}>
                <div style={{ 
                  padding: '20px', 
                  background: '#f9f0ff', 
                  borderRadius: '8px',
                  textAlign: 'center'
                }}>
                  从底部进入
                </div>
              </Transition>
            </div>
          </div>
        </div>
        
        <div>
          <h4>不同持续时间</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <h5>快速动画 (200ms)</h5>
              <Transition animation="zoom-in-top" in={show} timeout={200}>
                <div style={{ 
                  padding: '20px', 
                  background: '#e6f7ff', 
                  borderRadius: '8px',
                  textAlign: 'center'
                }}>
                  快速动画
                </div>
              </Transition>
            </div>
            
            <div>
              <h5>中等动画 (500ms)</h5>
              <Transition animation="zoom-in-top" in={show} timeout={500}>
                <div style={{ 
                  padding: '20px', 
                  background: '#f6ffed', 
                  borderRadius: '8px',
                  textAlign: 'center'
                }}>
                  中等动画
                </div>
              </Transition>
            </div>
            
            <div>
              <h5>慢速动画 (1000ms)</h5>
              <Transition animation="zoom-in-top" in={show} timeout={1000}>
                <div style={{ 
                  padding: '20px', 
                  background: '#fff7e6', 
                  borderRadius: '8px',
                  textAlign: 'center'
                }}>
                  慢速动画
                </div>
              </Transition>
            </div>
          </div>
        </div>
      </div>
    )
  },
}

// 不同HTML标签和包装模式
export const DifferentTagsAndWrapper: Story = {
  render: () => {
    const [show, setShow] = useState(true)
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div style={{ display: 'flex', gap: '10px' }}>
          <Button onClick={() => setShow(!show)}>
            {show ? '隐藏' : '显示'}
          </Button>
        </div>
        
        <div>
          <h4>不同HTML标签</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <h5>div 标签</h5>
              <Transition animation="zoom-in-top" in={show} tag="div">
                <div style={{ 
                  padding: '20px', 
                  background: '#e6f7ff', 
                  borderRadius: '8px',
                  textAlign: 'center'
                }}>
                  div 标签
                </div>
              </Transition>
            </div>
            
            <div>
              <h5>span 标签</h5>
              <Transition animation="zoom-in-top" in={show} tag="span">
                <span style={{ 
                  display: 'inline-block',
                  padding: '20px', 
                  background: '#f6ffed', 
                  borderRadius: '8px',
                  textAlign: 'center'
                }}>
                  span 标签
                </span>
              </Transition>
            </div>
            
            <div>
              <h5>section 标签</h5>
              <Transition animation="zoom-in-top" in={show} tag="section">
                <section style={{ 
                  padding: '20px', 
                  background: '#fff7e6', 
                  borderRadius: '8px',
                  textAlign: 'center'
                }}>
                  section 标签
                </section>
              </Transition>
            </div>
          </div>
        </div>
        
        <div>
          <h4>包装模式对比</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <h5>普通模式</h5>
              <Transition animation="zoom-in-top" in={show}>
                <div style={{ 
                  padding: '20px', 
                  background: '#e6f7ff', 
                  borderRadius: '8px',
                  textAlign: 'center'
                }}>
                  普通模式
                </div>
              </Transition>
            </div>
            
            <div>
              <h5>包装模式</h5>
              <Transition animation="zoom-in-top" in={show} wrapper>
                <div style={{ 
                  padding: '20px', 
                  background: '#f6ffed', 
                  borderRadius: '8px',
                  textAlign: 'center'
                }}>
                  包装模式
                </div>
              </Transition>
            </div>
          </div>
        </div>
      </div>
    )
  },
}

// 生命周期回调和复杂内容
export const CallbacksAndComplexContent: Story = {
  render: () => {
    const [show, setShow] = useState(true)
    const [logs, setLogs] = useState<string[]>([])
    
    const addLog = (message: string) => {
      setLogs(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`])
    }
    
    const clearLogs = () => setLogs([])
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div style={{ display: 'flex', gap: '10px' }}>
          <Button onClick={() => setShow(!show)}>
            {show ? '隐藏' : '显示'}
          </Button>
          <Button onClick={clearLogs}>清空日志</Button>
        </div>
        
        <div style={{ display: 'flex', gap: '20px' }}>
          <div style={{ flex: 1 }}>
            <h4>带生命周期回调的组件</h4>
            <Transition 
              animation="zoom-in-top" 
              in={show}
              onEnter={() => addLog('onEnter: 进入动画开始')}
              onEntered={() => addLog('onEntered: 进入动画完成')}
              onExit={() => addLog('onExit: 退出动画开始')}
              onExited={() => addLog('onExited: 退出动画完成')}
            >
              <div style={{ 
                padding: '24px', 
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: '12px',
                color: 'white',
                textAlign: 'center'
              }}>
                <h3 style={{ margin: '0 0 16px 0' }}>复杂内容示例</h3>
                <p style={{ margin: '0 0 16px 0' }}>
                  这是一个包含复杂内容的过渡动画组件示例。
                </p>
                <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                  <Button btnType="primary" size="sm">按钮一</Button>
                  <Button btnType="default" size="sm">按钮二</Button>
                </div>
              </div>
            </Transition>
          </div>
          
          <div style={{ flex: 1 }}>
            <h4>生命周期日志</h4>
            <div style={{ 
              padding: '16px', 
              background: '#f5f5f5', 
              borderRadius: '8px',
              maxHeight: '200px',
              overflow: 'auto'
            }}>
              {logs.length === 0 ? (
                <p style={{ color: '#999' }}>暂无日志</p>
              ) : (
                logs.map((log, index) => (
                  <div key={index} style={{ fontSize: '12px', marginBottom: '4px' }}>
                    {log}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    )
  },
}

// 自定义类名
export const CustomClassNames: Story = {
  render: () => {
    const [show, setShow] = useState(true)
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'flex', gap: '10px' }}>
          <Button onClick={() => setShow(!show)}>
            {show ? '隐藏' : '显示'}
          </Button>
        </div>
        
        <div>
          <h4>自定义类名前缀</h4>
          <Transition 
            animation="zoom-in-top" 
            in={show}
            classNames="custom-transition"
          >
            <div style={{ 
              padding: '20px', 
              background: '#e6f7ff', 
              borderRadius: '8px',
              textAlign: 'center'
            }}>
              自定义类名前缀
            </div>
          </Transition>
        </div>
      </div>
    )
  },
}
