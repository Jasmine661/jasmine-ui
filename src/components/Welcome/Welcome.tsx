import React from 'react'
import Button  from '../Button'
import Alert  from '../Alert'
import './Welcome.scss'

interface WelcomeProps {
  title?: string
  description?: string
  showComponents?: boolean
}

export const Welcome: React.FC<WelcomeProps> = ({
  title = '欢迎使用 Jasmine UI',
  description = '一个基于 React 和 TypeScript 的现代化组件库',
  showComponents = true
}) => {
  return (
    <div className="welcome-container">
      <div className="welcome-header">
        <h1 className="welcome-title">{title}</h1>
        <p className="welcome-description">{description}</p>
      </div>

      {showComponents && (
        <div className="welcome-content">
          <div className="welcome-section">
            <h2>快速开始</h2>
            <p>安装并开始使用 Jasmine UI 组件库：</p>
            <div className="code-block">
              <code>npm install jasmine-ui</code>
            </div>
          </div>

          <div className="welcome-section">
            <h2>组件示例</h2>
            <div className="component-showcase">
              <div className="component-item">
                <h3>按钮组件</h3>
                <div className="component-demo">
                  <Button btnType="primary">主要按钮</Button>
                  <Button btnType="default">默认按钮</Button>
                  <Button btnType="danger">危险按钮</Button>
                </div>
              </div>

              <div className="component-item">
                <h3>提示组件</h3>
                <div className="component-demo">
                  <Alert type="success" title="成功提示" description="操作成功完成" />
                  <Alert type="warning" title="警告提示" description="请注意相关事项" />
                </div>
              </div>
            </div>
          </div>

          <div className="welcome-section">
            <h2>特性</h2>
            <ul className="features-list">
              <li>🎨 现代化设计语言</li>
              <li>📱 响应式设计</li>
              <li>♿ 无障碍访问支持</li>
              <li>🌍 TypeScript 支持</li>
              <li>🎯 高度可定制</li>
              <li>📚 完整的文档和示例</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

export default Welcome
