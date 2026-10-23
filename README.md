# 李朝楠的个人网站

北京交通大学人工智能专业本科生，展示 AI 全栈开发、Agent 工作流与 RAG 项目经历。

这是 GitHub Pages 发布版本。网站为静态 HTML、CSS、JavaScript，无需安装 npm 依赖。

## 目录

- `dist/`：完整网页及静态资源，可直接打开 `dist/index.html` 浏览。
- `.github/workflows/pages.yml`：推送到 `main` 后自动部署 GitHub Pages。
- `scripts/prepare-pages.py`：发布时根据 GitHub Pages 实际地址设置 canonical 和 Open Graph URL，支持仓库子路径。

## 首次发布

1. 将本仓库推送到自己的 GitHub 账户。
2. 在仓库 Settings → Pages → Build and deployment 中，将 Source 设为 GitHub Actions。
3. 在 Actions 中运行 Publish personal website，或向 main 推送新提交。
4. 等待部署成功，在该工作流的 github-pages 环境中打开实际网站地址。

之后修改 `dist/` 文件并推送到 main，即可自动更新网站。

发布流程使用 GitHub 提供的临时工作流令牌，不需要在源码中填写个人访问令牌。

## 模板来源

视觉参考及复用组件来自 https://github.com/anonkuki/anonkuki.github.io ，包括蓝色纸张与线稿风格、装饰插画、AI 工具链与错落作品卡片排布。个人经历和项目内容根据李朝楠提供的简历及后续修订整理。
