import { useEffect, useState } from 'react'
import Button from './components/Button/Button'
import Alert from './components/Alert/Alert'
import Menu from './components/Menu/menu'
import MenuItem from './components/Menu/menuItem'
import SubMenu from './components/Menu/subMenu'
import Tabs from './components/Tabs/tabs'
import TabsItem from './components/Tabs/tabsItem'
import Icon from './components/Icons/icon'
import Transition from './components/Transition/Transition'
import Input from './components/Input/input'
import Upload from './components/Upload/upload'
import axios from 'axios'

function App() {
  const [count, setCount] = useState(0)
  const [show, setShow] = useState(false)

  const [title, setTitle] = useState('')
  useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/posts/1', {
        headers: {
          'X-Request-With': 'MXLHttpRequest',
        },
        responseType: 'json',
      })
      .then((res) => {
        console.log(res)
        setTitle(res.data.title)
      })
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files
    if (file) {
      const uploadedFile = file[0]
      const formData = new FormData()
      formData.append(uploadedFile.name, uploadedFile)
      axios
        .post('https://jsonplaceholder.typicode.com/posts', formData, {
          headers: {
            'Context-type': 'Multipart/from-data',
          },
        })
        .then((res) => {
          console.log(res)
        })
    }
  }
  return (
    <>
      {/* 测试Upload */}
      <div>
        <Upload action=""></Upload>
      </div>
      {/* 测试JSONPlaceholder接口 */}
      <div>{title}</div>
      <input type="file" name="myFile" onChange={handleChange} />
      <hr />
      {/* 测试input */}
      <div>
        <Input placeholder="default input"></Input>
        <Input size="sm" placeholder="small input"></Input>
        <Input size="lg" placeholder="large input"></Input>
        <Input prepend={'https://'}></Input>
        <Input append={'.com'}></Input>
        <Input icon="search"></Input>
        <Input disabled placeholder="disabled input"></Input>
      </div>
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
        {/* <Transition in={show} timeout={200} animation="zoom-in-top" wrapper={true}>
          <Button btnType="primary" size="lg">
            test
          </Button>
        </Transition> */}
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
        <Alert type="success" description="这是一个成功的提示" closable={true} onClose={() => {}} />
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
