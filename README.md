# 瑞捷机械智慧梁厂 Landing Page V1

## 版本状态

V1 中文版已定稿，并在此基础上建立中英文双语体系。

- 页面主题：装配式梁板智慧生产线交钥匙解决方案
- 核心客户：需要按场地、梁型、产量和工期定制预制梁产线的基础设施项目业主、总包方及生产单位
- 中文路径：`/marketing/precast-beam-factory/cn/`
- 英文路径：`/marketing/precast-beam-factory/en/`
- 旧中文路径：`/marketing/precast-beam-factory/zh-cn/`，在 Netlify 上会自动跳转至新版中文路径

## V1 页面结构

1. Hero：交钥匙智慧梁厂价值主张
2. 企业实力：成立时间、生产基地、自有厂房和授权专利
3. 项目难题：工期、场地、熟练工和多方协同
4. 方案形成流程：项目输入与瑞捷工作流程
5. 产线工艺：V1.0、V2.0 与节段梁生产线
6. 六款核心产品
7. 项目案例
8. 研发设计、制造与项目交付能力
9. 项目询盘与正式版权信息

## 多语言结构

每种语言拥有独立的 HTML 入口和 React 页面文件，共用设计样式与图片资源。

```text
marketing/precast-beam-factory/
├── cn/index.html
└── en/index.html

src/pages/precast-beam-factory/
├── cn/
│   ├── App.jsx
│   └── main.jsx
└── en/
    ├── App.jsx
    └── main.jsx
```

新增语言时，使用对应的短语言代码建立同级目录，并同步增加：

- 独立 HTML 入口
- 对应语言页面代码
- `vite.config.js` 构建入口
- 页面语言切换链接
- SEO 标题、描述及 `hreflang`

## 询盘表单

询盘通过 Netlify Forms 提交，表单名称为：

```text
precast-beam-factory-inquiry
```

必填字段为公司、联系人和商务邮箱；国家/地区及项目说明为选填。Netlify 后台需要保持 Form detection 开启。

## 本地预览

双击根目录下的 `启动本地预览.command`。

脚本会自动：

1. 检查 Node.js 环境
2. 在首次运行时安装依赖
3. 启动本地网站
4. 打开中文页面

启动后可通过页面右上角切换中文与英文。

也可以在终端中运行：

```bash
npm install
npm run dev -- --host 127.0.0.1
```

## 构建

```bash
npm run build
```

构建结果输出到 `dist`，包含中文、英文和网站根入口。

## 公共资源

- 设计规范：`DESIGN_TOKENS.md`
- 公共样式：`src/styles/tailwind.css`
- 页面图片：`src/assets/image/`

## 发布说明

本次多语言版本仅在本地创建和验证，不自动提交 GitHub，也不自动触发 Netlify 发布。
