# Realjet Website

Realjet 英文官网、SEO Insights 内容系统和 7 语种预制构件生产线落地页共用同一个 Netlify 项目。

## 线上路径

- 英文官网：`/`
- 机械件代加工（建设中）：`/manufacturing/`
- Insights 列表：`/insights/`
- 内容管理：`/admin/`
- 预制构件生产线：`/marketing/precast-beam-factory/{language}/`
- 隐私政策：`/marketing/privacy/{language}/`

落地页语言代码为 `en` 、`id` 、`ar` 、`ru` 、`cn` 、`fr` 和 `es`。

## 技术架构

- Vite + React：7 语种落地页与隐私政策。
- Eleventy：首页、机械制造页、Insights、RSS、robots.txt 和 sitemap.xml。
- Decap CMS：通过 `/admin/` 编辑 `content/insights/` 下的 Markdown 文章。
- Netlify：统一构建、托管、GitHub OAuth 和 GA4 Snippet Injection。

## 本地预览

可以双击 `启动本地预览.command`，或在终端运行：

```bash
npm install
npm run dev -- --host 127.0.0.1
```

预览地址为 `http://127.0.0.1:5173/`。`npm run dev` 会先生成完整生产构建，再启动预览服务。

## 生产构建

```bash
npm run build
```

构建产物输出至 `dist/`。脚本会合并 Vite 与 Eleventy 产物，并检查首页、CMS、SEO 文件、7 语种落地页和机械制造询盘按钮。Netlify 使用 Node.js 22 执行同一命令。

## 发布 Insights

1. 访问 `https://realjetech.com/admin/` 并使用 GitHub 登录。
2. 新建 Insight，填写 SEO Description、Slug、日期、图片与图片 Alt。
3. 正文从 H2 开始；页面 H1 由模板自动生成。
4. 审核前保持 Draft 开启；审核后关闭 Draft 并发布。
5. CMS 向 GitHub 提交后，Netlify 自动构建并更新首页、Insights、RSS 和 sitemap。

完整设计、内容与操作标准见 `04_官网与网络资产/03_评估执行/4.44_Realjet英文官网与SEO新闻系统设计及操作指南.md`。
