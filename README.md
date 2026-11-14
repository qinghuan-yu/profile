**中文** | [English](./README.en.md)

# Qing-UU // 科幻 HUD 主页归档

**当前分支：`codex/homepage-before-20261031` · 状态：历史归档，不再更新功能。**

这里保留 2026-10-31 换站前的 Next.js 个人主页，代码基线为 `35d7e61834bfcc8f61b6f8d0773bb561c8244871`。网站采用 RAINMORIME 的后末日科幻 HUD 风格，包含加载动画、多列导航、作品、经历、联系页面与音乐播放器。

[查看 HUD 归档预览](https://codex-homepage-before-202610.profile-git-brh.pages.dev) · [当前正式网站](https://info.reliarc.com)

正式网站现由 [main 分支](https://github.com/qinghuan-yu/profile/tree/main) 的 Rhine Lab 版提供；本分支用于历史查看与恢复。

## 内容与技术

项目列表包括 GIF-PLAYER、VUE-PIANO、Pianalysis、Minimalist-Calendar、MCMer 和 Dialograph，资料保留归档时的状态。

技术栈：Next.js 14、React 18、TypeScript、SCSS、GSAP、Three.js。Node 服务提供 SSE 访问统计；Cloudflare Pages 使用静态导出，不运行该 Node 服务。

## 本地运行

先检出本分支，再执行：

```sh
npm ci
npm run dev
```

打开 [localhost:3000](http://localhost:3000)。可在 `.env.local` 中设置 `PORT`，默认端口为 3000。

本地生产构建与启动：

```sh
npm run build
npm start
```

以上是归档版本保留的命令；本次整理仅更新说明，没有升级依赖或重新验证旧版在新环境下的兼容性。

## 文件入口

| 路径 | 内容 |
| --- | --- |
| `data/projects.ts` | 六个项目的简介、链接与详情 |
| `data/experience.ts` | 教育与经历 |
| `data/skills.ts` | 技能数据 |
| `pages/` | 页面路由 |
| `components/layout/` | 导航、HUD 与布局 |
| `components/interactive/` | 音乐播放器、灯箱、拉杆和光标 |
| `styles/` | 样式与动画 |
| `server.js` | 本地 Node 服务与 SSE 统计 |

## Cloudflare Pages

本分支在 Pages 项目 `profile-git` 中属于历史预览分支。保留的构建命令为 `npm run build:cloudflare`，输出目录为 `out`。正式域名 `info.reliarc.com` 绑定的是 `main`，不是本分支。

## 来源与许可证

原始模板设计与开发：[RainMorime](https://github.com/RainMorime)；[上游模板](https://github.com/RainMorime/rainmorime-template)。个人资料与项目内容由 Qing-UU 适配。

本分支保留上游 [MIT 许可证](./LICENSE)，使用时保留原署名。第三方素材权利归各自权利人所有。

## 分支说明

| 分支 | 内容 | 状态 |
| --- | --- | --- |
| [main](https://github.com/qinghuan-yu/profile/tree/main) | Rhine Lab 三维个人主页 | 正式维护；Cloudflare Pages 生产分支 |
| [codex/homepage-migration](https://github.com/qinghuan-yu/profile/tree/codex/homepage-migration) | Vite 交互图录作品集 | 历史归档；不再更新功能 |
| [codex/homepage-before-20261031](https://github.com/qinghuan-yu/profile/tree/codex/homepage-before-20261031) | Next.js 科幻 HUD 主页 | 历史归档；不再更新功能 |
| [codex/rhine-homepage](https://github.com/qinghuan-yu/profile/tree/codex/rhine-homepage) | Rhine 版转入 main 前的版本 | 历史归档；后续维护转到 main |
