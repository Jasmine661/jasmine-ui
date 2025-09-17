import type { Meta, StoryObj } from '@storybook/react-vite'
import Tabs from './tabs'
import TabsItem from './tabsItem'

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: '这是 Tabs 标签页组件，用于在多个内容面板之间切换。',
      },
    },
  },
  argTypes: {
    defaultIndex: {
      control: { type: 'number', min: 0, max: 10 },
      description: '默认激活的标签页索引',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '0' },
      },
    },
    type: {
      control: 'select',
      options: ['line', 'card'],
      description: '标签页类型',
      table: {
        type: { summary: "'line' | 'card'" },
        defaultValue: { summary: 'line' },
      },
    },
    onSelect: {
      action: 'selected',
      description: '标签页选择回调',
      table: {
        type: { summary: '(index: number) => void' },
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Tabs>

// 基础用法
export const Default: Story = {
  render: (args) => (
    <Tabs {...args}>
      <TabsItem label="标签一">
        <div style={{ padding: '20px' }}>
          <h3>标签一内容</h3>
          <p>这是第一个标签页的内容。</p>
        </div>
      </TabsItem>
      <TabsItem label="标签二">
        <div style={{ padding: '20px' }}>
          <h3>标签二内容</h3>
          <p>这是第二个标签页的内容。</p>
        </div>
      </TabsItem>
      <TabsItem label="标签三">
        <div style={{ padding: '20px' }}>
          <h3>标签三内容</h3>
          <p>这是第三个标签页的内容。</p>
        </div>
      </TabsItem>
    </Tabs>
  ),
}

// 不同类型和功能
export const DifferentTypesAndFeatures: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <h4>线条类型 - 包含禁用项</h4>
        <Tabs {...args}>
          <TabsItem label="标签一">
            <div style={{ padding: '20px' }}>
              <h3>标签一内容</h3>
              <p>这是第一个标签页的内容。</p>
            </div>
          </TabsItem>
          <TabsItem label="标签二（禁用）" disabled>
            <div style={{ padding: '20px' }}>
              <h3>标签二内容</h3>
              <p>这个标签页被禁用了。</p>
            </div>
          </TabsItem>
          <TabsItem label="标签三">
            <div style={{ padding: '20px' }}>
              <h3>标签三内容</h3>
              <p>这是第三个标签页的内容。</p>
            </div>
          </TabsItem>
        </Tabs>
      </div>
      
      <div>
        <h4>卡片类型 - 默认激活第二个</h4>
        <Tabs {...args} type="card" defaultIndex={1}>
          <TabsItem label="标签一">
            <div style={{ padding: '20px' }}>
              <h3>标签一内容</h3>
              <p>这是第一个标签页的内容。</p>
            </div>
          </TabsItem>
          <TabsItem label="标签二">
            <div style={{ padding: '20px' }}>
              <h3>标签二内容</h3>
              <p>这是第二个标签页的内容，默认激活。</p>
            </div>
          </TabsItem>
          <TabsItem label="标签三">
            <div style={{ padding: '20px' }}>
              <h3>标签三内容</h3>
              <p>这是第三个标签页的内容。</p>
            </div>
          </TabsItem>
        </Tabs>
      </div>
    </div>
  ),
}

// 复杂内容和嵌套标签
export const ComplexContentAndNested: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <h4>复杂内容展示</h4>
        <Tabs {...args}>
          <TabsItem label="用户信息">
            <div style={{ padding: '20px' }}>
              <h3>用户信息</h3>
              <div style={{ display: 'flex', gap: '20px' }}>
                <div>
                  <h4>基本信息</h4>
                  <p>姓名：张三</p>
                  <p>年龄：25</p>
                  <p>邮箱：zhangsan@example.com</p>
                </div>
                <div>
                  <h4>联系方式</h4>
                  <p>电话：13800138000</p>
                  <p>地址：北京市朝阳区</p>
                </div>
              </div>
            </div>
          </TabsItem>
          <TabsItem label="订单记录">
            <div style={{ padding: '20px' }}>
              <h3>订单记录</h3>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #ddd' }}>
                    <th style={{ padding: '8px', textAlign: 'left' }}>订单号</th>
                    <th style={{ padding: '8px', textAlign: 'left' }}>商品</th>
                    <th style={{ padding: '8px', textAlign: 'left' }}>金额</th>
                    <th style={{ padding: '8px', textAlign: 'left' }}>状态</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ padding: '8px' }}>20231201001</td>
                    <td style={{ padding: '8px' }}>商品A</td>
                    <td style={{ padding: '8px' }}>¥99.00</td>
                    <td style={{ padding: '8px' }}>已完成</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '8px' }}>20231201002</td>
                    <td style={{ padding: '8px' }}>商品B</td>
                    <td style={{ padding: '8px' }}>¥199.00</td>
                    <td style={{ padding: '8px' }}>配送中</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </TabsItem>
          <TabsItem label="设置">
            <div style={{ padding: '20px' }}>
              <h3>设置</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label>
                    <input type="checkbox" defaultChecked /> 接收邮件通知
                  </label>
                </div>
                <div>
                  <label>
                    <input type="checkbox" /> 接收短信通知
                  </label>
                </div>
                <div>
                  <label>
                    <input type="checkbox" defaultChecked /> 接收推送通知
                  </label>
                </div>
              </div>
            </div>
          </TabsItem>
        </Tabs>
      </div>
      
      <div>
        <h4>嵌套标签</h4>
        <Tabs {...args}>
          <TabsItem label="用户管理">
            <div style={{ padding: '20px' }}>
              <h3>用户管理</h3>
              <Tabs type="card">
                <TabsItem label="用户列表">
                  <div style={{ padding: '16px' }}>
                    <p>用户列表内容</p>
                  </div>
                </TabsItem>
                <TabsItem label="角色管理">
                  <div style={{ padding: '16px' }}>
                    <p>角色管理内容</p>
                  </div>
                </TabsItem>
                <TabsItem label="权限设置">
                  <div style={{ padding: '16px' }}>
                    <p>权限设置内容</p>
                  </div>
                </TabsItem>
              </Tabs>
            </div>
          </TabsItem>
          <TabsItem label="内容管理">
            <div style={{ padding: '20px' }}>
              <h3>内容管理</h3>
              <Tabs type="card">
                <TabsItem label="文章管理">
                  <div style={{ padding: '16px' }}>
                    <p>文章管理内容</p>
                  </div>
                </TabsItem>
                <TabsItem label="分类管理">
                  <div style={{ padding: '16px' }}>
                    <p>分类管理内容</p>
                  </div>
                </TabsItem>
              </Tabs>
            </div>
          </TabsItem>
        </Tabs>
      </div>
    </div>
  ),
}

// 多行标签和自定义样式
export const MultipleRowsAndCustomStyle: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <h4>多行标签</h4>
        <Tabs {...args}>
          <TabsItem label="首页">
            <div style={{ padding: '20px' }}>
              <h3>首页内容</h3>
              <p>这是首页的内容。</p>
            </div>
          </TabsItem>
          <TabsItem label="产品">
            <div style={{ padding: '20px' }}>
              <h3>产品内容</h3>
              <p>这是产品页的内容。</p>
            </div>
          </TabsItem>
          <TabsItem label="服务">
            <div style={{ padding: '20px' }}>
              <h3>服务内容</h3>
              <p>这是服务页的内容。</p>
            </div>
          </TabsItem>
          <TabsItem label="关于我们">
            <div style={{ padding: '20px' }}>
              <h3>关于我们</h3>
              <p>这是关于我们页的内容。</p>
            </div>
          </TabsItem>
          <TabsItem label="联系我们">
            <div style={{ padding: '20px' }}>
              <h3>联系我们</h3>
              <p>这是联系我们页的内容。</p>
            </div>
          </TabsItem>
          <TabsItem label="帮助中心">
            <div style={{ padding: '20px' }}>
              <h3>帮助中心</h3>
              <p>这是帮助中心页的内容。</p>
            </div>
          </TabsItem>
        </Tabs>
      </div>
      
      <div>
        <h4>自定义样式</h4>
        <Tabs {...args} style={{ border: '1px solid #ddd', borderRadius: '8px' }}>
          <TabsItem label="标签一">
            <div style={{ padding: '20px', background: '#f9f9f9' }}>
              <h3>标签一内容</h3>
              <p>这是第一个标签页的内容。</p>
            </div>
          </TabsItem>
          <TabsItem label="标签二">
            <div style={{ padding: '20px', background: '#f9f9f9' }}>
              <h3>标签二内容</h3>
              <p>这是第二个标签页的内容。</p>
            </div>
          </TabsItem>
          <TabsItem label="标签三">
            <div style={{ padding: '20px', background: '#f9f9f9' }}>
              <h3>标签三内容</h3>
              <p>这是第三个标签页的内容。</p>
            </div>
          </TabsItem>
        </Tabs>
      </div>
    </div>
  ),
}
