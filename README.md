# Jasmine661 UI

一个基于 React + TypeScript 的现代化 UI 组件库。

## 安装

```bash
npm install jasmine661-ui
# 或
pnpm add jasmine661-ui
```

## 使用

```tsx
import { Button, Alert, Input } from 'jasmine661-ui'
import 'jasmine661-ui/dist/jasmine661-ui.css'

function App() {
  return (
    <div>
      <Button btnType="primary">点击我</Button>
      <Alert type="success">成功消息</Alert>
      <Input placeholder="请输入内容" />
    </div>
  )
}
```

## ESLint 配置

使用 jasmine661-ui 的 ESLint 配置：

```bash
# 安装依赖
npm install --save-dev eslint @eslint/js globals eslint-plugin-react-hooks eslint-plugin-react-refresh typescript-eslint

# 配置 eslint.config.js
import jasmine661Config from 'jasmine661-ui/eslint-config-jasmine661-ui.js'
export default jasmine661Config
```

详细配置说明请查看 [ESLINT.md](./ESLINT.md)

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
