# Qing-UU // Personal Node

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

生产站点为 https://info.reliarc.com ，对应 Pages 项目 `profile-git` 和 GitHub 仓库 `qinghuan-yu/profile` 的 `codex/rhine-homepage` 分支。

构建命令为 `npm run build:cloudflare`，输出目录为 `out`，Node.js 版本为 24。构建时对超过 Pages 单文件上限的模型做 gzip 传输压缩，并核验解压后字节一致。浏览器搜索、详情、图片查看和光带交互均可通过静态 Pages 运行。

## 编辑

- `src/content.mjs`：名称、个人链接、十四项内容与插画来源。
- `scripts/build.mjs`：文字、导航、联系方式及 CMS 数据的适配。
- `scripts/build-boot.mjs`：开场名称的适配，保留上游动画代码。
- `src/boot/entry.js`、`boot.css`：开场界面和页面身份标识。
- `src/project-search.mjs`：浏览器和本地服务共用的项目检索规则。
- `src/static-home.mjs`：低配置设备的作品与链接入口。
- `scripts/build-cloudflare.mjs`：Pages 发布目录和传输压缩配置。

启动服务后，`npm run check` 检查原动效模块、2577 项参数、插画哈希、深链接和本地搜索。`npm test` 为上游完整浏览器检查。

## 来源

六张项目封面来自 Wikimedia Commons，使用公共领域、CC0 或 Creative Commons 许可。作者、许可、原图指纹及裁切记录保存在 `src/assets/projects/sources.json`，页面右下角的 Photo Credits 可查看署名。选图和原图保存在本项目的 `素材原图/` 文件夹。其余插画用于场景视觉，来源保存在 `src/assets/rhine/sources.json` 及各条目的 `artworkSource`。详情页链接按目标命名（View on GitHub、Send Email 等）；“View Full Image” 全屏查看当前图片。原始视觉说明见 [模板说明](docs/template-guide.md)，许可证及资源归属见 [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md)。
