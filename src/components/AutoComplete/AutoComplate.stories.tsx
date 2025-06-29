import type { Meta, StoryObj } from '@storybook/react-vite'
import AutoComplete, { type DataSourceType } from './AutoComplete'

const meta: Meta<typeof AutoComplete<User>> = {
  title: 'Components/AutoComplete',
  component: AutoComplete<User>,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: '带有自定义渲染功能的自动补全输入框组件',
      },
    },
  },
}
export default meta

type Story = StoryObj<typeof AutoComplete<User>>
type GitHubStory = StoryObj<typeof AutoComplete<GitHubUser>>

// 示例数据类型
interface User extends Record<string, unknown> {
  value: string
  email: string
}

// mock 请求函数
const mockFetchSuggestions = async (query: string): Promise<DataSourceType<User>[]> => {
  const users = [
    { value: 'Alice', email: 'alice@example.com' },
    { value: 'Bob', email: 'bob@example.com' },
    { value: 'Charlie', email: 'charlie@example.com' },
  ]
  return users.filter((user) => user.value.toLowerCase().includes(query.toLowerCase()))
}

// 默认故事
export const Default: Story = {
  args: {
    placeholder: '请输入用户名',
    fetchSuggestions: mockFetchSuggestions,
    onSelect: (item: DataSourceType<User>) => {
      alert(`你选择了：${item.value}(${(item as unknown as User).email})`)
    },
    renderOption: (item: DataSourceType<User>) => {
      const user = item as unknown as User
      return (
        <div>
          <strong>{user.value}</strong> - <small>{user.email}</small>
        </div>
      )
    },
  },
}

// 示例数据类型：适配 GitHub 搜索结果
interface GitHubUser extends Record<string, unknown> {
  value: string // 对应 login（用户名）
  html_url: string // GitHub 主页链接
  avatar_url: string // 头像链接
}

// 使用 GitHub 用户搜索 API 获取建议项
const fetchGitHubUsers = async (query: string): Promise<DataSourceType<GitHubUser>[]> => {
  if (!query) return []
  const res = await fetch(`https://api.github.com/search/users?q=${query}`)
  const data = await res.json()
  return data.items.slice(0, 10).map((item: any) => ({
    value: item.login,
    html_url: item.html_url,
    avatar_url: item.avatar_url,
  }))
}

// 默认故事：搜索 GitHub 用户名
export const GitHubUsers: GitHubStory = {
  args: {
    placeholder: '输入 GitHub 用户名',
    fetchSuggestions: fetchGitHubUsers,
    onSelect: (item: DataSourceType<GitHubUser>) => {
      alert(`你选择了：${item.value}\n主页地址：${item.html_url}`)
    },
    renderOption: (item: DataSourceType<GitHubUser>) => {
      return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <img
            src={item.avatar_url}
            alt={item.value}
            style={{ width: 24, height: 24, borderRadius: '50%' }}
          />
          <span>{item.value}</span>
        </div>
      )
    },
  },
}
