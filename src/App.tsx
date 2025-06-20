import { useState } from 'react'
import Button from './components/Button/Button'
import Alert from './components/Alert/Alert'
import Menu from './components/Menu/menu'
import MenuItem from './components/Menu/menuItem'
import SubMenu from './components/Menu/subMenu'

import Tabs from './components/Tabs/tabs'
import TabsItem from './components/Tabs/tabsItem'

import Icon from './components/Icons/icon'

import Transition from './components/Transition/Transition'

function App() {
  const [count, setCount] = useState(0)
  const [show, setShow] = useState(false)
  return (
    <>
      {/* 测试transition */}
      <div>
        <Button onClick={() => setShow(!show)}>Toggle</Button>
        <Transition in={show} timeout={200} animation="zoom-in-left">
          <div style={{ position: 'absolute' }}>
            <p>test test test test</p>
            <br />
            <p>test test test test</p>
            <br />
            <p>test test test test</p>
            <br />
            <p>test test test test</p>
            <br />
            <p>test test test test</p>
            <br />
            <p>test test test test</p>
            <br />
          </div>
        </Transition>
        <Transition in={show} timeout={200} animation="zoom-in-top" wrapper={true}>
          <Button btnType="primary" size="lg">
            test
          </Button>
        </Transition>
      </div>
      {/* 测试icon */}
      <div>
        icon:
        <Icon icon="coffee" theme="primary" />
      </div>
      {/* 测试tabs */}
      <Tabs
        onSelect={(index) => {
          console.log(index)
        }}
        defaultIndex={0}
        type="card"
      >
        <TabsItem label="Tab 1">Tab 1</TabsItem>
        <TabsItem label="Tab 2">Tab 2</TabsItem>
        <TabsItem label="Tab 3">Tab 3</TabsItem>
      </Tabs>
      {/* 测试菜单 */}
      <div>
        <Menu
          onSelect={(index) => {
            console.log(index)
          }}
          defaultOpenSubMenus={['4']}
          // mode="vertical"
        >
          <MenuItem>active</MenuItem>
          <MenuItem>link</MenuItem>
          <MenuItem disabled>disabled</MenuItem>
          <SubMenu title="SubMenu">
            <MenuItem>SubMenu-1</MenuItem>
            <MenuItem>SubMenu-2</MenuItem>
            <MenuItem>SubMenu-3</MenuItem>
          </SubMenu>
          <SubMenu title="SubMenu2">
            <MenuItem>SubMenu-1</MenuItem>
            <MenuItem>SubMenu-2</MenuItem>
            <MenuItem>SubMenu-3</MenuItem>
          </SubMenu>
        </Menu>
      </div>
      {/* 测试按钮 */}
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
        <Button btnType="primary" size="lg">
          Button-lg
        </Button>
        <Button btnType="danger" size="sm">
          Button-sm
        </Button>
        <Button btnType="default" disabled>
          Button-df
        </Button>
        <Button href="https://www.baidu.com" btnType="link" size="sm">
          Button-link
        </Button>
      </div>
      {/* 测试Alert */}
      <div>
        <Alert
          type="success"
          title="操作成功"
          description="这是一个成功的提示"
          closable={true}
          onClose={() => {}}
        />
        <Alert
          type="error"
          title="操作失败"
          description="这是一个失败的提示"
          closable={true}
          onClose={() => {}}
        />
        <Alert
          type="info"
          title="默认"
          description="这是一个默认的提示"
          closable={true}
          onClose={() => {}}
        />
        <Alert
          type="warning"
          title="警告"
          description="这是一个提示"
          closable={true}
          onClose={() => {}}
        />
      </div>
    </>
  )
}

export default App
