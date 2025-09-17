import type { Meta, StoryObj } from '@storybook/react-vite'
import Menu from './menu'
import MenuItem from './menuItem'
import SubMenu from './subMenu'

const meta: Meta<typeof Menu> = {
  title: 'Components/Menu',
  component: Menu,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: '这是 Menu 菜单组件，支持水平、垂直布局，以及子菜单功能。',
      },
    },
  },
  argTypes: {
    defaultIndex: {
      control: 'text',
      description: '默认激活的菜单项索引',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '0' },
      },
    },
    mode: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: '菜单模式',
      table: {
        type: { summary: "'horizontal' | 'vertical'" },
        defaultValue: { summary: 'horizontal' },
      },
    },
    onSelect: {
      action: 'selected',
      description: '菜单项选择回调',
      table: {
        type: { summary: '(index: string) => void' },
      },
    },
    defaultOpenSubMenus: {
      control: 'object',
      description: '默认展开的子菜单索引数组',
      table: {
        type: { summary: 'string[]' },
        defaultValue: { summary: '[]' },
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Menu>

// 基础用法
export const Default: Story = {
  render: (args) => (
    <Menu {...args}>
      <MenuItem>首页</MenuItem>
      <MenuItem>产品</MenuItem>
      <MenuItem>服务</MenuItem>
      <MenuItem>关于我们</MenuItem>
    </Menu>
  ),
}

// 水平菜单 - 包含所有功能
export const HorizontalMenu: Story = {
  render: (args) => (
    <Menu {...args}>
      <MenuItem>首页</MenuItem>
      <SubMenu title="产品">
        <MenuItem>产品一</MenuItem>
        <MenuItem>产品二</MenuItem>
        <MenuItem>产品三</MenuItem>
      </SubMenu>
      <SubMenu title="服务">
        <MenuItem>服务一</MenuItem>
        <MenuItem>服务二</MenuItem>
      </SubMenu>
      <MenuItem disabled>关于我们（禁用）</MenuItem>
      <MenuItem>联系我们</MenuItem>
    </Menu>
  ),
}

// 垂直菜单 - 包含所有功能
export const VerticalMenu: Story = {
  args: {
    mode: 'vertical',
    defaultOpenSubMenus: ['1', '2'],
  },
  render: (args) => (
    <Menu {...args}>
      <MenuItem>首页</MenuItem>
      <SubMenu title="产品中心">
        <MenuItem>产品介绍</MenuItem>
        <MenuItem>产品特性</MenuItem>
        <MenuItem>产品价格</MenuItem>
        <SubMenu title="产品分类">
          <MenuItem>分类一</MenuItem>
          <MenuItem>分类二</MenuItem>
        </SubMenu>
      </SubMenu>
      <SubMenu title="解决方案">
        <MenuItem>企业解决方案</MenuItem>
        <MenuItem>个人解决方案</MenuItem>
      </SubMenu>
      <SubMenu title="支持服务">
        <MenuItem>技术支持</MenuItem>
        <MenuItem>培训服务</MenuItem>
        <MenuItem>咨询服务</MenuItem>
      </SubMenu>
      <MenuItem disabled>关于我们（禁用）</MenuItem>
      <MenuItem>联系我们</MenuItem>
    </Menu>
  ),
}

// 实际应用场景
export const RealWorldExamples: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <h4>导航栏样式</h4>
        <div style={{ 
          background: '#001529', 
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
          
        }}>
          <div style={{ color: 'white', fontSize: '18px', fontWeight: 'bold' }}>
            Logo
          </div>
          <Menu {...args} style={{ background: 'transparent',color: 'white',margin: '10px 24px' }}>
            <MenuItem>首页</MenuItem>
            <SubMenu title="产品">
              <MenuItem>产品一</MenuItem>
              <MenuItem>产品二</MenuItem>
            </SubMenu>
            <MenuItem>服务</MenuItem>
            <MenuItem>关于我们</MenuItem>
          </Menu>
        </div>
      </div>
      
      <div>
        <h4>侧边栏样式</h4>
        <div style={{ display: 'flex', height: '300px' }}>
          <div style={{ width: '200px', background: '#f5f5f5', padding: '16px' }}>
            <Menu {...args} mode="vertical">
              <MenuItem>仪表盘</MenuItem>
              <SubMenu title="用户管理">
                <MenuItem>用户列表</MenuItem>
                <MenuItem>角色管理</MenuItem>
                <MenuItem>权限设置</MenuItem>
              </SubMenu>
              <SubMenu title="内容管理">
                <MenuItem>文章管理</MenuItem>
                <MenuItem>分类管理</MenuItem>
              </SubMenu>
              <MenuItem>系统设置</MenuItem>
            </Menu>
          </div>
          <div style={{ flex: 1, padding: '16px', background: 'white' }}>
            <h3>主要内容区域</h3>
            <p>这里是页面的主要内容区域，侧边栏菜单用于导航。</p>
          </div>
        </div>
      </div>
    </div>
  ),
}
