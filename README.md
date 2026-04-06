# @hlw-uni/mp-cli

UniApp 小程序脚手架生成器，通过交互式命令行快速创建基于 `@hlw-uni/*` 的 UniApp 项目。

## 安装

```bash
# 全局安装
npm install -g @hlw-uni/mp-cli

# 或直接使用 npx
npx @hlw-uni/mp-cli create my-project
```

## 命令

| 命令 | 说明 |
|------|------|
| `hlw-uni-mp create [name]` | 创建新项目（交互式引导） |
| `hlw-uni-mp create [name] --ci` | 非交互模式创建，使用默认选项 |
| `hlw-uni-mp add page <name>` | 添加新页面（自动注册到 pages.json） |
| `hlw-uni-mp add component <name>` | 添加新组件 |
| `hlw-uni-mp list` | 列出所有可用平台和模板 |
| `hlw-uni-mp --help` | 显示帮助信息 |

### create 命令选项

| 选项 | 说明 |
|------|------|
| `-p, --platform <platform>` | 指定平台 (`mp-weixin` / `mp-toutiao`) |
| `-t, --template <template>` | 指定模板 ID |
| `-d, --description <description>` | 项目描述 |
| `-a, --author <author>` | 作者名称 |
| `--ci` | 非交互模式，自动使用默认选项 |

## 使用示例

```bash
# 交互式创建（需在支持上下箭头选择的终端中运行）
hlw-uni-mp create

# 指定名称创建（非交互，自动使用默认平台和模板）
hlw-uni-mp create my-project

# 指定全部参数（非交互，自动使用指定选项）
hlw-uni-mp create -p mp-weixin -t template1 -d "我的项目" -a "作者名" my-project

# 非交互模式显式指定
hlw-uni-mp create --ci my-project

# 添加页面
hlw-uni-mp add page user

# 添加组件
hlw-uni-mp add component my-component

# 列出可用平台
hlw-uni-mp list
```

## 支持的平台

| 平台 | ID | 描述 |
|------|-----|------|
| 微信小程序 | `mp-weixin` | 微信小程序模板 |
| 抖音小程序 | `mp-toutiao` | 抖音小程序模板 |

## 模板

每个平台提供多种风格模板，创建项目时可选择。

生成的模板预配置：

- **Vite + uni-app** — 快速构建
- **Pinia** — 状态管理
- **@hlw-uni/mp-core** — HTTP 请求、Loading、Msg composables
- **@hlw-uni/mp-vite-plugin** — SCSS 主题、Auto-Import、环境变量注入
- **TypeScript** — 类型安全
- **easycom** — 组件自动扫描

## 项目结构

```
src/
├── App.vue
├── main.ts
├── manifest.json
├── pages.json
├── uni.scss
│
├── api/              # API 模块
│   └── index.ts
│
├── components/       # 业务组件
│
├── pages/            # 页面
│   ├── index/        # 首页
│   ├── user/         # 用户页
│   └── tools/        # 工具页
│
├── static/           # 静态资源
│
├── stores/           # Pinia Store
│   ├── user.ts
│   └── app.ts
│
└── styles/           # 全局样式
    ├── variables.scss
    └── common.scss

.env.development      # 开发环境变量
.env.production       # 生产环境变量
vite.config.ts        # Vite 配置（已集成 hlw-uni-plugin）
```

## 环境变量

```bash
# .env.development
VITE_API_BASE_URL=http://localhost:3000/api

# .env.production
VITE_API_BASE_URL=https://api.example.com/api
```

> `VITE_API_BASE_URL` 会被 `@hlw-uni/mp-vite-plugin` 注入到 `@hlw-uni/mp-core` 的 HTTP 请求中，作为 API 请求的基础地址。

## 快速开始

```bash
# 进入项目目录
cd my-project

# 安装依赖
npm install

# 开发微信小程序
npm run dev:mp-weixin

# 开发抖音小程序
npm run dev:mp-toutiao

# 构建微信小程序
npm run build:mp-weixin

# 构建抖音小程序
npm run build:mp-toutiao
```

## 依赖

```json
{
  "dependencies": {
    "chalk": "^4.1.2",
    "commander": "^11.1.0",
    "fs-extra": "^11.2.0",
    "inquirer": "^8.2.7",
    "ora": "^5.4.1"
  }
}
```
