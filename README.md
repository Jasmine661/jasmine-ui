# Jasmine661 UI

一个基于 React + TypeScript 的现代化 UI 组件库，内置常用交互组件、类型定义、样式体系与完善的开发/测试/打包流程。

## ✨ 特性

- 以 TypeScript 编写，完整导出 `.d.ts` 类型
- Vite 库模式打包，提供 `ES` 与 `UMD` 双格式
- Sass 构建统一样式，单文件样式输出 `jasmine661-ui.css`
- 组件完善：`Button / Input / Alert / Menu / Tabs / Progress / Transition / AutoComplete / Upload / Form / Icons` 等
- 配套 ESLint 规则与 Storybook 用例、Vitest 单测

## 🔍 亮点特点（详细）

- **强类型与开发体验**
  - 全量 TypeScript 编写，公共 API 全部导出类型（`dist/types`）。
  - 表单、上传、Tabs 等复杂组件均有完善的 Props 类型与事件签名。
  - `tsconfig.build.json` 严格构建：`noEmitOnError`、`declarationMap`、路径别名 `@/*`。

- **稳定的打包产物**
  - Vite 库模式：同时输出 `ES` 与 `UMD`，满足不同生态的消费方式。
  - 外部化 `react` / `react-dom`，避免重复打包，降低使用者包体。
  - 关闭代码分割（库模式更友好），默认单文件可直接引入；支持开启 `manualChunks` 做精细拆分。
  - 集成 Terser 压缩（可选依赖）：移除 `console`/`debugger`，可输出 source map 便于调试。

- **样式体系与可定制性**
  - 统一入口 `src/styles/index.scss`，所有组件样式通过 Sass 管理。
  - 变量集中在 `src/styles/_variables.scss`，可通过覆盖变量实现主题定制。
  - BEM 风格命名 + 细粒度样式文件，易于按需裁剪与维护。

- **高质量组件实现**
  - `Form`：内置校验（`async-validator`）、受控/非受控输入管理、错误提示与布局（行/列）支持。
  - `Upload`：拖拽上传、状态展示、操作区（重试/删除）与进度条联动（`Progress`）。
  - `AutoComplete`：防抖（`useDebounce`）、异步搜索、键盘交互支持、空态与高亮。
  - `Menu/Tabs`：上下文共享（Context）、受控/非受控切换、键盘无障碍基础支持。
  - `Transition`：基于 `react-transition-group` 的过渡封装，提供统一的动画 API。

- **工程化与质量保障**
  - 规范：提供可复用 ESLint 配置（零成本接入）。
  - 测试：Vitest + @testing-library，覆盖核心交互。
  - 文档：Storybook 用例便于可视化验收与回归测试。
  - CI 友好：分离 `build:types`、`build:css`、`build`，可独立在流水线中执行。

- **本地联调与发布体验**
  - 一键全局链接：`pnpm link --global` + 测试项目 `pnpm link jasmine661-ui`。
  - 推荐以 peer 依赖方式消费 React，避免宿主与组件库 React 冲突。
  - 发布前校验：`test:nowatch && lint && build`，保证包内产物可直接使用。

- **性能与可维护性**
  - 依赖精简：常用工具库使用 `lodash-es`（Tree-Shaking 友好），`classnames` 组合 class 更高效。
  - 产物可分析：可通过自定义模式接入 bundle 分析（如 `rollup-plugin-visualizer`）。
  - 架构清晰：每个组件独立目录（逻辑/样式/测试/故事分离），易于扩展。

## 📦 安装

```bash
pnpm add jasmine661-ui
# 或
npm install jasmine661-ui
```

Peer 依赖（由使用方提供）：

```json
{
  "peerDependencies": {
    "react": ">=16.8.0",
    "react-dom": ">=16.8.0"
  }
}
```

## 🚀 快速上手

```tsx
import { Button, Alert, Input } from 'jasmine661-ui'
import 'jasmine661-ui/dist/jasmine661-ui.css'

export default function App() {
  return (
    <div>
      <Button btnType="primary">点击我</Button>
      <Alert type="success">成功消息</Alert>
      <Input placeholder="请输入内容" />
    </div>
  )
}
```

按需引入（Tree-Shaking 友好）：

```tsx
import Button from 'jasmine661-ui/dist/components/Button'
```

## 🧩 组件一览

- Alert、AutoComplete、Button、Form、Icons、Input、Menu、Progress、Tabs、Transition、Upload、Welcome

## 🛠 本地开发与调试

```bash
# 启动示例/开发环境
pnpm dev

# 单测
pnpm test           # 交互式
pnpm test:run       # 一次性
pnpm test:coverage  # 覆盖率

# Storybook
pnpm storybook
```

联调外部测试项目（类似 npm link）：

```bash
# 在组件库根目录
pnpm link --global

# 在测试项目根目录
pnpm link jasmine661-ui

# 取消链接
pnpm unlink jasmine661-ui      # 在测试项目
pnpm unlink --global           # 在组件库
```

## 🔧 构建与产物

构建脚本：

```bash
pnpm build         # vite 构建 + 产出类型 + 构建样式
pnpm build:types   # 仅产出类型（tsconfig.build.json）
pnpm build:css     # 仅构建样式（Sass -> dist/jasmine661-ui.css）
```

产物布局：

```
dist/
  ├─ jasmine-ui.es.js      # ES 模块
  ├─ jasmine-ui.umd.js     # UMD 模块
  ├─ jasmine661-ui.css     # 组件库样式
  └─ types/                # .d.ts 类型文件
```

Vite 关键配置（见 `vite.config.ts`）：

- 库模式（`build.lib`），外部化 `react` / `react-dom`
- 关闭代码分割，便于库消费者一次性引入
- Terser 压缩（需本地安装 `terser`）及 source map 生成（便于调试）

TypeScript 关键配置（见 `tsconfig.build.json`）：

- 输出到 `dist/types`，开启 `declaration`/`declarationMap`
- 更严格的 `noEmitOnError`，并支持别名路径 `@/*`

## ✅ 代码规范

提供可复用的 ESLint 规则：

```bash
# 安装 ESLint 所需依赖（在你的应用中）
pnpm add -D eslint @eslint/js globals eslint-plugin-react-hooks eslint-plugin-react-refresh typescript-eslint

# eslint.config.js
import jasmine661Config from 'jasmine661-ui/eslint-config-jasmine-ui.js'
export default jasmine661Config
```

详见 [ESLINT.md](./ESLINT.md)。

## 🎨 主题与样式

样式通过 Sass 构建，入口为 `src/styles/index.scss`，可通过覆盖变量实现主题定制。常用变量见 `src/styles/_variables.scss`。

## 📦 发布前检查

```bash
pnpm test:nowatch && pnpm lint && pnpm build
```

## 📄 许可证

MIT © Jasmine661
