# Qing-UU // 交互图录作品集归档

**当前分支：`codex/homepage-migration` · 状态：历史归档，不再更新功能。**

本分支保存原 `main` 的 Vite 交互图录作品集，已纳入原 `main` 最后一次文档与测试修正（`5507c28667d550329ce10a407c92948d9ece2e0c`）。网站源码和素材保持原样。当前正式网站是 [main 分支](https://github.com/qinghuan-yu/profile/tree/main) 的 Rhine Lab 版。

[查看图录归档预览](https://codex-homepage-migration.profile-git-brh.pages.dev)

Qing-UU 的个人主页：学习记录、代码、音乐和硬件项目。

![个人主页](docs/images/homepage-home.jpg)

## 打开

双击 `双击打开.html`，或运行本地服务：

```powershell
npm ci
npm run build
npm start
```

开发时运行 `npm run dev`。

- `/`、`/personal.html`：作品集。
- `/archive.html`：原版互动图录。
- `个人网站样例.html`：同一作品集的另一个离线入口。

## 内容

重点展示 MCMer、Dialograph、Pianalysis、Decision Arena、旋律标注工具和 ESP32 GIF Player。日记日历只出现在关于页的次要链接中。

资料来自 [GitHub 主页](https://github.com/qinghuan-yu/qinghuan-yu) 及各公开项目的 README。姓名、简介、项目和外链统一在 `src/site/profile.ts` 中修改。项目详情中的图版展示各项目的处理流程。

## 页面

- 首页：姓名、简短介绍和作品入口。
- 关于：个人介绍与学习方向。
- 作品：拖动地图、点选项目、查看说明与源码。
- 方向：每个条目关联具体项目。
- 联系：GitHub 和博客链接。

支持 `#/works/pianalysis`、`#/about`、`#/skills`、`#/contact` 深链。`?still` 可用于静态截图检查。

## 检查

```powershell
npm test
npm run build
npm run verify
```

## 部署与历史记录

本分支在 Pages 项目 `profile-git` 中属于预览分支，保留 `npm run build:cloudflare` 构建命令及 `out` 输出目录。正式域名 [info.reliarc.com](https://info.reliarc.com) 由 `main` 的 Rhine 版部署。

`docs/homepage-migration.md` 及下列改造、验证文档记录的是当时的迁移过程和检查结果，不代表当前生产分支或本次重新执行的测试。

技术栈：TypeScript、Vite、SVG、Canvas；原版圣堂使用 Three.js。

改造与验证记录见 [docs/portfolio-validation.md](docs/portfolio-validation.md)。原图录说明保存在 [docs/original-guide.md](docs/original-guide.md)，素材来源和第三方组件说明见 [THIRD_PARTY_NOTICES.txt](THIRD_PARTY_NOTICES.txt)。

## 分支说明

| 分支 | 内容 | 状态 |
| --- | --- | --- |
| [main](https://github.com/qinghuan-yu/profile/tree/main) | Rhine Lab 三维个人主页 | 正式维护；Cloudflare Pages 生产分支 |
| [codex/homepage-migration](https://github.com/qinghuan-yu/profile/tree/codex/homepage-migration) | Vite 交互图录作品集 | 历史归档；不再更新功能 |
| [codex/homepage-before-20261031](https://github.com/qinghuan-yu/profile/tree/codex/homepage-before-20261031) | Next.js 科幻 HUD 主页 | 历史归档；不再更新功能 |
| [codex/rhine-homepage](https://github.com/qinghuan-yu/profile/tree/codex/rhine-homepage) | Rhine 版转入 main 前的版本 | 历史归档；后续维护转到 main |
