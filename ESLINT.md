# ESLint 配置

## 使用 jasmine-ui 的 ESLint 配置

### 1. 安装依赖

```bash
npm install --save-dev eslint @eslint/js globals eslint-plugin-react-hooks eslint-plugin-react-refresh typescript-eslint cross-env
```

### 2. 配置 ESLint

在你的项目根目录创建 `eslint.config.js`：

```javascript
import jasmineConfig from 'jasmine-ui/eslint-config-jasmine-ui.js'

export default jasmineConfig
```

### 3. 添加脚本

在 `package.json` 中添加：

```json
{
  "scripts": {
    "lint": "cross-env NODE_ENV=development eslint --ext js,ts,tsx src --max-warnings 5",
    "lint:fix": "cross-env NODE_ENV=development eslint --ext js,ts,tsx src --fix",
    "lint:check": "cross-env NODE_ENV=production eslint --ext js,ts,tsx src --max-warnings 0"
  }
}
```

### 4. 运行检查

```bash
npm run lint        # 检查代码，最多允许5个警告
npm run lint:fix    # 自动修复可修复的问题
npm run lint:check  # 严格检查，不允许任何警告
```

## 配置说明

- 支持 TypeScript 和 JavaScript
- 包含 React Hooks 规则
- 包含 React Refresh 规则
- 自动忽略 `dist`、`node_modules`、`build` 目录
