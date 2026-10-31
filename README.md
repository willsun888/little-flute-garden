# 小小长笛家

一套面向儿童与家长的长笛和五线谱启蒙网站，适用于儿童弯头长笛入门。共 12 个单元、48 节图文微课，从认识乐器和寻找声音开始，逐步学习谱位、节奏、连音、力度、升降号，最后进行创编与家庭音乐会。

在线地址：[小小长笛家](https://willsun888.github.io/little-flute-garden/)

## 网站内容

- 48 节微课，每课包含儿童讲解、图示或乐谱、短练习、反馈与家长提示。
- 44 段节奏与旋律谱例，支持电子播放、休止、连音、延音、反复和力度比较。
- 11 个音的谱位及常见波姆体系指法卡。
- 听音与识谱游戏、节奏练习、两小节创编、合奏预备拍及两首音乐会小曲。
- 手机与电脑布局，支持按学习进度继续探索。

每课建议约 5—10 分钟，允许分几天完成。48 课不是 48 天的进度要求。技术动作和儿童乐器的具体调整应跟随授课老师；电子声音用于音高与节奏示范。

## 学习记录

无需账号，不使用麦克风。进度、陪练准备和自编旋律保存在当前浏览器的本地存储中，不上传到仓库。更换设备或从离线文件切换到在线网址时，记录不会自动迁移。

## 文件结构

| 路径 | 用途 |
|---|---|
| `dist/` | 可直接运行的网站源文件、课程、图示与音乐逻辑 |
| `bundle.mjs` | 将源文件打包为独立 HTML，并更新 Pages 发布文件 |
| `validate.mjs` | 检查课程、乐谱、指法、节奏与进度兼容性 |
| `docs/index.html` | GitHub Pages 发布入口 |
| `docs/.nojekyll` | 直接提供静态文件，不经 Jekyll 处理 |

## 本地预览与更新

需要 Node.js 20 或更新版本。没有第三方依赖。

```sh
node validate.mjs
node bundle.mjs
python3 -m http.server 4173 --bind 127.0.0.1
```

在浏览器打开 `http://127.0.0.1:4173/docs/`。修改 `dist/` 中的内容后，重新检查和打包；将更新后的源文件与 `docs/` 一起推送，Pages 会重新发布。

打包也会生成 `output/小小长笛家.html`，可供离线打开；这个本地输出目录不纳入 Git。

## GitHub Pages 设置

部署来源为 **Deploy from a branch**，分支 **main**，文件夹 **/docs**。网站不依赖服务器端程序或 Sites 托管。

## 教学参考

- [Yamaha 长笛指法表](https://www.yamaha.com/en/musical_instrument_guide/common/images/flute/fingering.pdf)
- [五线谱与谱号基础](https://www.musictheory.net/lessons/10)
- [附点与延音线](https://musictheory.pugetsound.edu/mt21c/DotsAndTies.html)

练习旋律为本教程原创编写。指法图表示按键组合，不是镜像持笛动作图；请结合实际乐器与老师指导使用。
