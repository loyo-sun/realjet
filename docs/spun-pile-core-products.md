---
permalink: false
eleventyExcludeFromCollections: true
---

# Equipment system 单产品卡片与 WebP 图片

## 2026-09-05 图片更新

用户已自行替换 6 张素材：Automatic Mould Lifter、PC Bar Processing Machine、Concrete Batching Plant、Cage Welding Machine、Curing Control Cabinet、Friction-Wheel Drive。本轮保留这些文件不动。

其余 11 张当前设备图使用 OpenAI Image 模型，以原图为编辑目标执行高清修复与 8:5 横向扩图：Skirt Forming Machine、Wire Drawing Machine、Pile Tensioning Machine、Spun Pile Steel Mould、Centrifugal Spinning Machine、Steam Boiler、Screw Air Compressor、Winch、Pile-Sawing Trolley、Pneumatic Impact Wrench、Twin-Hook Overhead Crane。统一输出为 800×500 WebP，单张 35,792–78,540 字节。气动扳手由原产品说明页改成无文字的单品实拍式画面，并同步修改 Alt。

通用模型提示要求：保留原设备身份、主体结构、主要部件、颜色和视角；提高画面清晰度与曝光平衡；通过横向扩图达到 8:5；不得添加商标、水印或无关设备。模型输出属于基于原图的 AI 编辑素材，正式作为设备结构证明前仍需由项目负责人核对。

追加更新：用户将 Pneumatic Impact Wrench 更换为黑银色长轴气动扳手白底图，800×500 WebP，6,818 字节；英文 Alt 已同步修改。

## 当前补充

最新调整：移除 Automatic Mould Lifter 产品卡片，当前展示 16 款，桌面四列四行。移除所有 View larger 可见提示，图片点击放大功能保留。以下 17 款说明为上一轮记录，移除的图片文件保留备份。

设备总数现为 17 款，桌面每行 4 款。以下五款已从 Supporting equipment 标签改成主列表图文卡片；序号和页面参考声明按用户要求删除。原有 12 款及原图未改。

| 产品 | imagess 来源 | 输出 WebP | 字节 |
| --- | --- | --- | --- |
| Steam Boiler | 第6页-16.PNG | steam-boiler.webp | 12342 |
| Screw Air Compressor | 第7页-17.PNG | screw-air-compressor.webp | 8178 |
| Winch | 第7页-18.PNG | winch.webp | 13638 |
| Pile-Sawing Trolley | 第7页-19.PNG | pile-sawing-trolley.webp | 11936 |
| Pneumatic Impact Wrench | 第8页-22.PNG | pneumatic-impact-wrench.webp | 19624 |

点击每张图片可打开原生模态对话框，支持关闭按钮、Esc、背景关闭；打开时锁定背景滚动，关闭后恢复焦点。放大显示现有 WebP，不生成虚假的高清细节。

维护记录中的权利提醒仍然有效，移除页面说明不代表素材授权已核验。

以下为首批 12 款的处理记录。

日期：2026-09-04。当前英文 LP 保留 12 张卡片，桌面 4 列 × 3 行。
每张卡片仅介绍一款设备，标题与介绍不使用 and 或 & 组合不同产品。

| 单款设备 | 图片来源 | 输出文件 | 字节数 |
| --- | --- | --- | --- |
| 混凝土搅拌站 / Concrete Batching Plant | imagess/1.PNG | batching-plant.webp | 26254 |
| 摩擦轮驱动装置 / Friction-Wheel Drive | imagess/第2页-4.PNG | friction-wheel-drive.webp | 30662 |
| 自动切断镦头一体机 / PC Bar Processing Machine | imagess/第6页-12.PNG | bar-processing-machine.webp | 17868 |
| 钢筋笼滚焊机 / Cage Welding Machine | 原站 cage-welding.webp | cage-welding-machine.webp | 76258 |
| 裙板成型机 / Skirt Forming Machine | imagess/第6页-14.PNG | skirt-forming-machine.webp | 19416 |
| 拉丝机 / Wire Drawing Machine | imagess/第7页-20.PNG | wire-drawing-machine.webp | 11176 |
| 数控张拉机 / Pile Tensioning Machine | imagess/第6页-15.PNG | tensioning-machine.webp | 22442 |
| 管桩钢模 / Spun Pile Steel Mould | 原站 pile-mould.webp | pile-steel-mould.webp | 43684 |
| 离心机 / Centrifugal Spinning Machine | imagess/第7页-21.PNG | spinning-machine.webp | 27798 |
| 蒸养温控柜 / Curing Control Cabinet | imagess/第3页-6.PNG | curing-control-cabinet.webp | 19238 |
| 双钩桥式起重机 / Twin-Hook Overhead Crane | imagess/第4页-7.PNG | twin-hook-overhead-crane.webp | 75322 |
| 钢模自动吊具 / Automatic Mould Lifter | imagess/第5页-10.PNG | automatic-mould-lifter.webp | 34800 |

输出目录：src/assets/image/spun-pipe-piles-line/core-products/。
全部 12 张图片均小于 80,000 字节，未放大低分辨率源图，未裁剪水印或设备主体。
采用完整显示的 object-contain。原始文件保留，方便高清替换。

## 产品选择边界

- 搅拌、分料、喂料组合聚焦为混凝土搅拌站。
- 摩擦轮与平车组合聚焦为摩擦轮驱动装置。
- 自动切断镦头是一台集成设备，使用 PC Bar Processing Machine，介绍保留先切断再镦头的用途。
- 自动吊具与吸盘组合聚焦为钢模自动吊具，暂不单列吸盘。
- 滚焊机候选图第6页-13.PNG缺乏明确全景，继续使用原站已匹配图片；钢模同样保留原站图。
- 配套设备标签也改为单品名称；这不代表整体供货范围被删减。

## 素材与权利

10 张来自用户指定 imagess 文件夹，2 张来自现有网站。素材来源不等于瑞捷制造或交付证据，也不自动证明商业授权。页面保留统一参考说明；用户应在正式投放前确认使用权。旧第三方图片不再被本设备卡片引用，文件保留供版本追溯。

## 再生成

scripts/prepare-spun-pile-equipment-images.mjs 使用 sharp，需要可解析的 sharp 安装（可通过 NODE_PATH 指向本地运行时的包目录），同时需要网站上一级的 imagess 原图文件夹。它会按尺寸、质量逐级压缩，超出 80,000 字节时失败，不静默放宽限额。
