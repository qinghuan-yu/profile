# 作品集验证记录

日期：2026-10-31。

## 内容与入口

- PASS：默认入口与 personal.html 展示 Qing Yu 的作品集，离线入口使用同一份内容。
- PASS：六个项目都有真实 GitHub 链接；项目说明根据各仓库 README 整理。
- PASS：日记日历不在首页或作品地图中，仅放在关于页的次要链接里。
- PASS：删除虚构姓名、工作年限、熟练度评分、占位作品、邮箱和回复承诺。
- PASS：首页、个人图版、地图、方向图谱和联系页不再显示原游戏文案；地图中自带文字的背景与入口图改为几何线条和文字按钮。
- PASS：原版图录保留在 archive.html，第三方素材来源说明保留。

## 自动检查

- `npm test`：20 项通过。
- `npm run build`：TypeScript 检查、Vite 构建及两个离线 HTML 打包通过。
- `npm run verify`：启动器编码、70 件素材、主离线 HTML 脚本语法与 71 份内嵌媒体校验通过。
- `git diff --check`：通过。

## 浏览器检查

Chrome 中查看桌面版（含 1440×900）和 390×844 手机宽度：

- PASS：首页姓名、简介、作品按钮及博客入口清晰可见。
- PASS：关于页简介可读，姓名分行和手机文字衬底正常。
- PASS：作品地图选中与上一项/下一项操作能更新标题、说明和源码链接；手机端快捷入口不遮挡详情。
- PASS：方向页点选“计算音乐”后，显示对应说明与 Pianalysis 链接；手机端同样可见。
- PASS：联系页直接显示 GitHub 和博客，不需要解谜才能访问。
- PASS：通过本地 HTTP 加载生成的离线 HTML，深链打开 Pianalysis，并切换到 Decision Arena，内容与源码链接正常。
- PASS：检查期间采集的浏览器错误日志为空。

浏览器工具不允许直接访问 `file:` 地址，因此离线 HTML 的浏览器运行检查通过本地 HTTP 完成。未重新测量帧率或进行真机触屏测试。

首页截图：`docs/images/portfolio-home.jpg`。

## 测试驱动记录

为图版复用增加三个行为测试：自定义首页身份、自定义个人图版身份、自定义方向图谱标题及说明。

RED：先增加测试，原实现忽略自定义身份和图谱说明，分别出现 2 项失败和新增 1 项失败。

GREEN：为绘图函数增加可选身份与说明参数；作品集传入自己的内容，原图录沿用默认参数。`node --experimental-strip-types --test tests/portfolio.test.ts` 的 3 项全部通过，完整测试共 20 项通过。

REFACTOR：不另做结构重写。复制文案和样式调整采用页面检查；新参数的图版行为由上述测试保护。

## 内容来源

- [个人主页](https://github.com/qinghuan-yu/qinghuan-yu)
- [MCMer](https://github.com/qinghuan-yu/MCMer)
- [Dialograph](https://github.com/qinghuan-yu/Dialograph)
- [Pianalysis](https://github.com/qinghuan-yu/Pianalysis)
- [Decision Arena](https://github.com/qinghuan-yu/deconstruct)
- [旋律标注工具](https://github.com/qinghuan-yu/vue-piano)
- [ESP32 GIF Player](https://github.com/qinghuan-yu/gif-player)
