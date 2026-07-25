# Realjet Website Design Tokens

> 版本：1.0  
> 基准页面：Precast Beam Factory 中文 Landing Page  
> 用途：指导后续产品主题页、解决方案页和营销 Landing Page 的设计与生成。

## 1. 设计原则

1. **工程可信感**：以深蓝、灰白和低饱和工业色为主，避免过度装饰。
2. **解决方案优先**：页面先说明客户任务和项目约束，再介绍产品。
3. **单一主转化**：每个 Section 只设置一个主要转化入口。
4. **清晰交替节奏**：内容 Section 使用白色与浅灰色背景交替。
5. **数据谨慎表达**：未经确认的数据使用“约”“参考值”或 `*` 标记。

## 2. CSS 基础变量

以下变量可直接用于新页面：

```css
:root {
  /* Brand */
  --color-brand-navy: #08253f;
  --color-brand-navy-light: #0f405f;
  --color-brand-blue: #1678aa;
  --color-brand-cyan: #39bbc8;
  --color-accent-orange: #f39a3e;

  /* Text */
  --color-text-primary: #172a3c;
  --color-text-secondary: #627486;
  --color-text-inverse: #ffffff;
  --color-text-inverse-muted: rgba(255, 255, 255, 0.72);

  /* Surface */
  --color-surface-primary: #ffffff;
  --color-surface-secondary: #f3f7f9;
  --color-surface-dark: #08253f;
  --color-border: #d9e3e9;

  /* Hero */
  --hero-gradient:
    radial-gradient(circle at 82% 18%, rgba(57, 187, 200, 0.22), transparent 26%),
    linear-gradient(135deg, #061e34, #0b3855 56%, #0d4b68);

  /* Typography */
  --font-family-sans: Inter, "PingFang SC", "Microsoft YaHei", Arial, sans-serif;
  --font-weight-regular: 400;
  --font-weight-semibold: 750;
  --font-weight-bold: 850;
  --font-weight-black: 900;
  --line-height-body: 1.55;
  --line-height-heading: 1.13;

  /* Layout */
  --layout-max-width: 1180px;
  --layout-gutter-desktop: 22px;
  --layout-gutter-mobile: 14px;
  --section-space-desktop: 78px;
  --section-space-mobile: 62px;

  /* Spacing */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 24px;
  --space-6: 32px;
  --space-7: 48px;
  --space-8: 64px;
  --space-9: 80px;

  /* Shape */
  --radius-small: 8px;
  --radius-control: 9px;
  --radius-medium: 13px;
  --radius-card: 16px;
  --radius-large: 20px;
  --radius-pill: 999px;

  /* Effects */
  --shadow-card: 0 18px 48px rgba(8, 37, 63, 0.10);
  --shadow-floating: 0 28px 70px rgba(0, 0, 0, 0.23);
  --focus-ring: 0 0 0 3px rgba(22, 120, 170, 0.10);

  /* Motion */
  --motion-fast: 180ms;

  /* Breakpoints */
  --breakpoint-tablet: 1000px;
  --breakpoint-mobile: 720px;
}
```

## 3. 颜色使用规则

| Token | 用途 |
|---|---|
| `brand-navy` | 导航、深色按钮、深色 Section、主要标题 |
| `brand-blue` | Kicker、编号、链接、信息强调 |
| `brand-cyan` | Hero 主按钮、浅色强调、进度条 |
| `accent-orange` | 少量辅助强调，不作为大面积主色 |
| `text-primary` | 正文标题和重要内容 |
| `text-secondary` | 说明文字、参数、备注 |
| `surface-primary` | 白色 Section、卡片 |
| `surface-secondary` | 与白色交替的浅灰 Section |
| `border` | 卡片、表单和数据栏边框 |

### Section 背景顺序

```text
Hero 深色
→ 白色
→ #f3f7f9
→ 白色
→ #f3f7f9
→ 按相同节奏继续
→ Closing 使用 Hero 深色渐变
```

连续两个相邻的内容 Section 不使用相同背景色。

## 4. 字体层级

| 层级 | 字号 | 字重 | 行高 | 用途 |
|---|---:|---:|---:|---|
| Hero H1 | `clamp(44px, 4.2vw, 68px)` | 850–900 | 1.16 | 页面唯一主标题 |
| H2 | `clamp(30px, 4vw, 44px)` | 850 | 1.13 | Section 标题 |
| H3 | 16–18px | 850 | 1.3 | 卡片标题 |
| Lead | 17–18px | 400 | 1.55 | Hero 说明 |
| Body | 12–15px | 400 | 1.55 | 正文和描述 |
| Kicker | 11px | 850 | 1.4 | Section 分类标签 |
| Caption | 9–11px | 750–850 | 1.5 | 参数、备注、图片说明 |

规则：

- 一个页面只使用一个 H1。
- Hero 说明文字使用常规字重，不加粗。
- 标题采用紧凑字距；正文保持正常字距。
- 中文优先使用 `PingFang SC` 或 `Microsoft YaHei`。

## 5. 布局 Tokens

### 页面容器

```css
.container {
  width: min(1180px, calc(100% - 44px));
  margin-inline: auto;
}

@media (max-width: 720px) {
  .container {
    width: calc(100% - 28px);
  }
}
```

### 栅格

| 内容类型 | 桌面端 | 平板端 | 手机端 |
|---|---:|---:|---:|
| 数据证明栏 | 4 列 | 3–4 列 | 2 列 |
| 痛点 / 输入 / 方法 | 4 列 | 2 列 | 1 列 |
| 典型产线 | 3 列 | 1 列 | 1 列 |
| 核心产品 | 3 列 | 2 列 | 1 列 |
| 项目案例 | 4 列 | 2 列 | 1 列 |
| 核心能力 | 3 列 | 1 列 | 1 列 |

默认卡片间距为 `16px`；较紧凑的信息模块可使用 `14px`。

## 6. 组件 Tokens

### 顶部导航

| 属性 | 桌面端 | 手机端 |
|---|---:|---:|
| 高度 | 70px | 62px |
| 背景 | `rgba(8,37,63,.97)` | 同桌面端 |
| Logo 高度 | 32px | 27px |
| 位置 | Sticky Top | Sticky Top |

顶部导航只保留关键页面锚点和一个主要转化按钮。

### Hero

- 使用 `--hero-gradient` 作为基础背景。
- 左侧放置价值主张、说明、主转化按钮和适用场景标签。
- 右侧允许使用项目或工厂图片，通过渐变遮罩融入背景。
- Hero 主转化按钮左对齐。
- 桌面端 Hero 与四项数据证明栏应尽量在首屏同时可见。
- 当前参考高度：`calc(100vh - 124px)`，最小高度 `610px`。

### 按钮

```css
.button {
  min-height: 46px;
  padding: 10px 18px;
  border-radius: 9px;
  font-size: 13px;
  font-weight: 850;
  transition: transform 180ms;
}
```

| 类型 | 背景 | 文字 | 使用场景 |
|---|---|---|---|
| Primary | `brand-cyan` | `brand-navy` | Hero 和 Closing 主转化 |
| Dark | `brand-navy` | 白色 | 内容 Section 转化 |
| Secondary | 透明深色 | 白色 | 默认不使用，仅在确有第二操作时启用 |
| Outline | 白色 | `brand-navy` | 弱操作或工具型页面 |

按钮规则：

- 每个 Section 最多一个转化按钮。
- Hero 按钮左对齐；其他 Section 的转化按钮居中。
- 按钮文案以动作开头，例如“提交”“获取”“申请”“预约”。
- 不在按钮下方添加重复说明或备注。

### 卡片

```css
.card {
  background: #ffffff;
  border: 1px solid #d9e3e9;
  border-radius: 16px;
  box-shadow: 0 18px 48px rgba(8, 37, 63, 0.10);
}
```

- 信息型卡片内边距：21–24px。
- 图片型卡片的图片比例优先使用 `16:9`。
- 项目案例图片比例使用 `4:3`。
- 卡片标题和说明之间保持 6–8px 间距。

### 标签

- 胶囊圆角：`999px`。
- 字号：11px。
- Hero 标签使用半透明边框，不使用高饱和实色背景。
- 标签只用于场景、类型和短参数，不承载长句。

### 表单与弹窗

- 弹窗最大宽度：680px。
- 表单桌面端 2 列，手机端 1 列。
- 输入框圆角：8px；边框：`#ccd8df`。
- Focus 状态使用 `brand-blue` 边框和 `--focus-ring`。
- 公司、联系人、邮箱必填；国家选填。
- 其他项目条件统一放入“项目说明”文本框。

## 7. 图片 Tokens

| 场景 | 推荐比例 | 显示方式 |
|---|---:|---|
| Hero 工厂图 | 宽幅或透明底整线图 | `cover`，右对齐，左侧渐隐 |
| 产品图 | 16:9 | `contain` 或居中展示 |
| 项目案例 | 4:3 | `cover` |
| 能力介绍 | 16:9 | `cover` |

文件命名规则：

```text
品牌：realjet-logo.webp
Hero：{topic}-hero.webp
产品：{product-name}.webp
项目：project-{country-or-name}-{number}.webp
能力：capability-{type}.webp
```

图片统一放入页面主题目录下的 `assets/image/`，HTML 不引用临时文件名。

## 8. 响应式规则

### ≤ 1000px

- 隐藏桌面导航链接。
- 四列网格变为两列。
- 三列产线和能力模块变为单列或两列。
- Hero 文字宽度可扩大到 60%。

### ≤ 720px

- 页面左右留白缩小为 14px。
- H1 调整为约 40px。
- Hero 图片移动到页面下半部。
- Hero 主按钮占满容器宽度。
- 内容卡片全部使用单列。
- 数据证明栏使用两列。
- 显示底部固定移动端转化按钮。

## 9. 页面生成约束

后续生成其他主题页面时，应保持以下结构逻辑：

```text
顶部导航
Hero：价值主张 + 项目适用范围 + 主转化
数据证明
客户问题
方案输入
设计方法
典型方案或工艺
核心产品
项目案例
企业能力
Closing 转化
页脚
一步式留资弹窗
```

可按主题删除不适用模块，但不要改变以下原则：

- 不将瑞捷描述为单纯设备销售商。
- 方案内容从客户场地、生产任务、环境和标准出发。
- 产品模块用于解释方案如何落地，不取代整体解决方案叙事。
- 每一个关键 Section 都应有清晰转化入口。
- 页面文案保持短段落、短标题和可扫描结构。

## 10. 当前目录参考

```text
website/
├── package.json
├── vite.config.js
├── DESIGN_TOKENS.md
├── src/
│   ├── assets/image/
│   │   ├── realjet-logo.webp
│   │   └── precast-beam-factory-hero.webp
│   ├── styles/tailwind.css
│   └── pages/precast-beam-factory/zh-cn/
│       ├── App.jsx
│       └── main.jsx
└── marketing/
    └── precast-beam-factory/
        └── zh-cn/
            └── index.html
```
