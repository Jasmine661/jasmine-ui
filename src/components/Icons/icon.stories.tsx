import type { Meta, StoryObj } from '@storybook/react-vite'
import Icon from './icon'
import { faHome, faUser, faCog, faHeart, faStar, faSearch, faDownload, faUpload, faEdit, faTrash, faCheck, faTimes, faPlus, faMinus, faArrowLeft, faArrowRight, faArrowUp, faArrowDown, faSpinner } from '@fortawesome/free-solid-svg-icons'

const meta: Meta<typeof Icon> = {
  title: 'Components/Icons',
  component: Icon,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: '这是 Icons 图标组件，基于 FontAwesome 图标库，支持多种主题和尺寸。',
      },
    },
  },
  argTypes: {
    icon: {
      control: 'select',
      options: ['home', 'user', 'cog', 'heart', 'star', 'search', 'download', 'upload', 'edit', 'trash', 'check', 'times', 'plus', 'minus', 'arrow-left', 'arrow-right', 'arrow-up', 'arrow-down', 'spinner'],
      description: '图标名称',
      table: {
        type: { summary: 'IconDefinition' },
      },
    },
    theme: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'],
      description: '图标主题',
      table: {
        type: { summary: "'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark'" },
      },
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'lg', 'xl', '2xl', '1x', '2x', '3x', '4x', '5x'],
      description: '图标尺寸',
      table: {
        type: { summary: "'xs' | 'sm' | 'lg' | 'xl' | '2xl' | '1x' | '2x' | '3x' | '4x' | '5x'" },
      },
    },
    spin: {
      control: 'boolean',
      description: '是否旋转',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    pulse: {
      control: 'boolean',
      description: '是否脉冲',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    onClick: {
      action: 'clicked',
      description: '点击事件回调',
      table: {
        type: { summary: '() => void' },
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Icon>


// 基础用法
export const Default: Story = {
  args: {
    icon: faHome,
    size: '1x',
  },
}

// 尺寸和主题展示
export const SizesAndThemes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h4>不同尺寸</h4>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <Icon icon={faHome} size="xs" />
          <Icon icon={faHome} size="sm" />
          <Icon icon={faHome} size="1x" />
          <Icon icon={faHome} size="lg" />
          <Icon icon={faHome} size="xl" />
          <Icon icon={faHome} size="2x" />
          <Icon icon={faHome} size="3x" />
          <Icon icon={faHome} size="4x" />
        </div>
      </div>
      
      <div>
        <h4>不同主题</h4>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <Icon icon={faHeart} theme="primary" size="2x" />
          <Icon icon={faHeart} theme="secondary" size="2x" />
          <Icon icon={faHeart} theme="success" size="2x" />
          <Icon icon={faHeart} theme="danger" size="2x" />
          <Icon icon={faHeart} theme="warning" size="2x" />
          <Icon icon={faHeart} theme="info" size="2x" />
          <Icon icon={faHeart} theme="light" size="2x" />
          <Icon icon={faHeart} theme="dark" size="2x" />
        </div>
      </div>
    </div>
  ),
}

// 常用图标和动画效果
export const CommonIconsAndAnimations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h4>常用图标</h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px', padding: '20px' }}>
          <div style={{ textAlign: 'center' }}>
            <Icon icon={faHome} size="2x" />
            <div style={{ marginTop: '8px', fontSize: '12px' }}>首页</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Icon icon={faUser} size="2x" />
            <div style={{ marginTop: '8px', fontSize: '12px' }}>用户</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Icon icon={faCog} size="2x" />
            <div style={{ marginTop: '8px', fontSize: '12px' }}>设置</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Icon icon={faSearch} size="2x" />
            <div style={{ marginTop: '8px', fontSize: '12px' }}>搜索</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Icon icon={faHeart} size="2x" />
            <div style={{ marginTop: '8px', fontSize: '12px' }}>收藏</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Icon icon={faStar} size="2x" />
            <div style={{ marginTop: '8px', fontSize: '12px' }}>星标</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Icon icon={faDownload} size="2x" />
            <div style={{ marginTop: '8px', fontSize: '12px' }}>下载</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Icon icon={faUpload} size="2x" />
            <div style={{ marginTop: '8px', fontSize: '12px' }}>上传</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Icon icon={faEdit} size="2x" />
            <div style={{ marginTop: '8px', fontSize: '12px' }}>编辑</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Icon icon={faTrash} size="2x" />
            <div style={{ marginTop: '8px', fontSize: '12px' }}>删除</div>
          </div>
        </div>
      </div>
      
      <div>
        <h4>动画效果</h4>
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px', padding: '20px' }}>
          <div style={{ textAlign: 'center' }}>
            <Icon icon={faSpinner} size="2x" spin />
            <div style={{ marginTop: '8px', fontSize: '12px' }}>旋转</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Icon icon={faHeart} size="2x" pulse />
            <div style={{ marginTop: '8px', fontSize: '12px' }}>脉冲</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Icon icon={faSpinner} size="2x" spin pulse />
            <div style={{ marginTop: '8px', fontSize: '12px' }}>旋转+脉冲</div>
          </div>
        </div>
      </div>
    </div>
  ),
}

// 可点击图标和箭头
export const ClickableAndArrows: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h4>可点击图标</h4>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '20px' }}>
          <Icon 
            icon={faHeart} 
            size="2x" 
            theme="danger" 
            onClick={() => alert('点击了心形图标')}
            style={{ cursor: 'pointer' }}
          />
          <Icon 
            icon={faStar} 
            size="2x" 
            theme="warning" 
            onClick={() => alert('点击了星形图标')}
            style={{ cursor: 'pointer' }}
          />
          <Icon 
            icon={faCog} 
            size="2x" 
            theme="primary" 
            onClick={() => alert('点击了设置图标')}
            style={{ cursor: 'pointer' }}
          />
        </div>
      </div>
      
      <div>
        <h4>箭头和操作图标</h4>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '20px' }}>
          <Icon icon={faArrowLeft} size="2x" />
          <Icon icon={faArrowUp} size="2x" />
          <Icon icon={faArrowDown} size="2x" />
          <Icon icon={faArrowRight} size="2x" />
          <Icon icon={faPlus} size="2x" theme="success" />
          <Icon icon={faMinus} size="2x" theme="danger" />
          <Icon icon={faCheck} size="2x" theme="success" />
          <Icon icon={faTimes} size="2x" theme="danger" />
        </div>
      </div>
    </div>
  ),
}
