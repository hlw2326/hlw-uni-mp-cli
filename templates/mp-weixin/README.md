# QSY Uni 小程序

基于 Vue 3、uni-app 和 hlw-uni 的微信小程序前端项目模板，集成用户中心、广告奖励和基础功能架构。

## 环境要求

- Node.js
- pnpm
- 微信开发者工具

## 常用命令

```bash
pnpm install
pnpm dev
pnpm type-check
pnpm build
```

命令说明：

- `pnpm dev`：以开发模式构建微信小程序，读取 `.env.dev`
- `pnpm type-check`：执行 Vue/TypeScript 类型检查
- `pnpm build`：以生产模式构建微信小程序，读取 `.env.prod`

上传体验版或线上版时，先执行 `pnpm build`，再用微信开发者工具打开 `dist/build/mp-weixin` 上传。不要直接上传 `dist/dev/mp-weixin`，否则会使用 `.env.dev` 的开发接口地址。

## 目录说明

```text
src/core      业务组合逻辑
src/service   接口请求模块
src/store     Pinia 状态
src/pages     小程序页面
src/types     全局接口类型
```

## 开发约定

- 页面弹提示统一使用 `hlw.$msg.toast()`
- 修改前端后至少运行 `pnpm type-check`
