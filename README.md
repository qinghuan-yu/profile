# Qing-UU // Rhine Lab 迁移前归档

**当前分支：`codex/rhine-homepage` · 状态：历史归档 · 后续维护请使用 [main](https://github.com/qinghuan-yu/profile/tree/main)。**

此分支保留 Rhine 版转入 `main` 前的实现，代码基线为 `569b83ff2bad148057be19776909cf07860cbdb3`。自 2026-11-14 起，正式站改由 `main` 部署；此分支仅供历史查看与恢复，不再承接正式更新。

基于 [rhine-lab-art](https://github.com/reverieach/rhine-lab-art) 的个人主页版本。保留 Rhine Lab 字样、登录开场、六个三维场景、折射材质和粒子交互，填入 Qing-UU 的资料。前六个项目使用 Wikimedia Commons 的真实摄影作品，其余内容继续使用原场景插画。

## 内容

前六项为 MCMer、Dialograph、Pianalysis、Decision Arena、旋律标注工具、ESP32 GIF Player。其后为个人简介、教育经历、音乐、博客、GitHub、Steam 和邮件联系。

页面沿用英文排版。资料来自原个人主页和公开 GitHub 项目。

## 本地运行

Windows 下可双击本文件夹内的 `启动.cmd`。源码、依赖与运行素材均位于本文件夹内。

需要 Node.js 24 或更新版本。

```sh
npm ci
npm run build
npm run dev
```

打开 http://localhost:4199/ 。修改源码后重新构建并刷新。项目搜索直接在浏览器内完成，支持中文关键词和英文项目名。深链接可直接打开项目详情。WebGL 检测未通过的设备会进入简洁版作品列表。

## Cloudflare Pages

生产站点为 [info.reliarc.com](https://info.reliarc.com)，对应 Pages 项目 `profile-git` 和 GitHub 仓库 `qinghuan-yu/profile` 的 `main` 分支。Pages 默认域名为 [profile-git-brh.pages.dev](https://profile-git-brh.pages.dev)。此归档分支不绑定正式域名；后续正式更新提交到 `main`。

构建命令为 `npm run build:cloudflare`，输出目录为 `out`，Node.js 版本为 24。构建时对超过 Pages 单文件上限的模型做 gzip 传输压缩，并核验解压后字节一致。Pages 函数仅处理该模型路径，使用手动编码流式返回压缩资源。搜索、详情、图片查看和光带交互运行在浏览器内。

## 编辑

- `src/content.mjs`：名称、个人链接、十四项内容与插画来源。
- `scripts/build.mjs`：文字、导航、联系方式及 CMS 数据的适配。
- `scripts/build-boot.mjs`：开场名称的适配，保留上游动画代码。
- `src/boot/entry.js`、`boot.css`：开场界面和页面身份标识。
- `src/project-search.mjs`：浏览器和本地服务共用的项目检索规则。
- `src/static-home.mjs`：低配置设备的作品与链接入口。
- `scripts/build-cloudflare.mjs`：Pages 发布目录和传输压缩配置。

启动服务后，`npm run check` 检查原动效模块、原版参数、插画哈希、深链接和本地搜索。`npm test` 为上游完整浏览器检查。

## 来源

六张项目封面来自 Wikimedia Commons，使用公共领域、CC0 或 Creative Commons 许可。作者、许可、原图指纹及裁切记录保存在 `src/assets/projects/sources.json`，页面右下角的 Photo Credits 可查看署名。仓库内的项目封面位于 `src/assets/projects/`。其余插画用于场景视觉，来源保存在 `src/assets/rhine/sources.json` 及各条目的 `artworkSource`。详情页链接按目标命名（View on GitHub、Send Email 等）；“View Full Image” 全屏查看当前图片。原始视觉说明见 [模板说明](docs/template-guide.md)，许可证及资源归属见 [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md)。

## 分支说明

| 分支 | 内容 | 状态 |
| --- | --- | --- |
| [main](https://github.com/qinghuan-yu/profile/tree/main) | Rhine Lab 三维个人主页 | 正式维护；Cloudflare Pages 生产分支 |
| [codex/homepage-migration](https://github.com/qinghuan-yu/profile/tree/codex/homepage-migration) | Vite 交互图录作品集 | 历史归档；不再更新功能 |
| [codex/homepage-before-20261031](https://github.com/qinghuan-yu/profile/tree/codex/homepage-before-20261031) | Next.js 科幻 HUD 主页 | 历史归档；不再更新功能 |
| [codex/rhine-homepage](https://github.com/qinghuan-yu/profile/tree/codex/rhine-homepage) | Rhine 版转入 main 前的版本 | 历史归档；后续维护转到 main |
