import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Boxes,
  Building2,
  Cable,
  Check,
  CheckCircle,
  Clock,
  CloudSun,
  Compass,
  Factory,
  FileCheck,
  Globe,
  HardHat,
  LayoutTemplate,
  Map,
  MapPin,
  Menu,
  Monitor,
  Package,
  Repeat,
  Route,
  Search,
  Send,
  Settings,
  Thermometer,
  Truck,
  User,
  Users,
  Waves,
  Workflow,
  Wrench,
  X,
} from "lucide-react";
import heroImage from "../../../assets/image/precast-beam-factory-hero.webp";
import logoImage from "../../../assets/image/realjet-logo.webp";

const challenges = [
  { icon: Clock, title: "工期紧", text: "产量目标高，人工协调难以形成稳定节拍。" },
  { icon: Map, title: "场地受限", text: "标准布局无法适配狭长或不规则场地。" },
  { icon: Users, title: "熟练工不足", text: "关键工序依赖经验，培训和管理压力大。" },
  { icon: Cable, title: "接口复杂", text: "设备、土建和能源之间容易出现责任空白。" },
];

const inputs = [
  { icon: Package, title: "产品任务", text: "梁型、数量、工期、目标日产量" },
  { icon: MapPin, title: "场地条件", text: "面积、形状、道路、起重与存梁区" },
  { icon: CloudSun, title: "现场环境", text: "气候、能源、混凝土供应与维护条件" },
  { icon: FileCheck, title: "项目标准", text: "设计文件、当地规范与验收要求" },
];

const methods = [
  { icon: Search, title: "需求诊断", text: "明确梁型、总量、工期和现场约束。", output: "需求清单" },
  { icon: Workflow, title: "工艺规划", text: "优化物流、节拍、瓶颈与缓冲区。", output: "流程与布局" },
  { icon: Settings, title: "系统配置", text: "匹配模板、台座、养护和控制系统。", output: "配置与接口" },
  { icon: CheckCircle, title: "生产验证", text: "联调、试生产、培训并闭环问题。", output: "交接与验证" },
];

const lines = [
  {
    icon: LayoutTemplate,
    kicker: "基础工艺架构",
    title: "智能预制梁生产线 V1.0",
    visual: "固定模板 · 移动台车 · 一次张拉",
    text: "面向梁型明确、产量稳定的项目，按任务要求定义台座、模板和养护周转。",
    metrics: ["日产约 1–2 片/线*", "周期约 2–3 天*"],
  },
  {
    icon: Repeat,
    kicker: "高周转工艺架构",
    title: "智能预制梁生产线 V2.0",
    visual: "流水工位 · 二次张拉 · 自动摆渡",
    text: "面向工期紧、产量高或场地受限的项目，定义专业工位与分阶段张拉工艺。",
    metrics: ["日产约 2–4 片/线*", "用地更紧凑*"],
  },
  {
    icon: Boxes,
    kicker: "节段梁工艺架构",
    title: "智能节段梁生产线",
    visual: "匹配段定位 · 节段模板 · 智能蒸养",
    text: "面向节段箱梁项目，根据节段规格与架设计划定义匹配段定位、模板和蒸养工艺。",
    metrics: ["日产约 2–3 个节段*", "多规格柔性*"],
  },
];

const products = [
  {
    icon: LayoutTemplate,
    code: "FORMING",
    title: "高精度液压模板",
    text: "按梁型进行非标设计，实现液压合模、开模和关键尺寸调整。",
    value: "减少人工拆装，提高成型一致性",
  },
  {
    icon: Repeat,
    code: "FLOW",
    title: "移动台座流转系统",
    text: "承载梁体在专业工位间流转，让模板和台座更快进入下一循环。",
    value: "改善周转节拍和场地组织",
  },
  {
    icon: Truck,
    code: "CONCRETE",
    title: "混凝土输布料系统",
    text: "衔接拌合站与浇筑工位，完成混凝土输送、称重与分区布料。",
    value: "缩短供料路径，减少人工配合",
  },
  {
    icon: Waves,
    code: "COMPACTION",
    title: "组合振捣系统",
    text: "根据构件特点组合附着式与插入式振捣，统一控制关键参数。",
    value: "提升混凝土密实度与过程稳定性",
  },
  {
    icon: Thermometer,
    code: "CURING",
    title: "智能蒸养窑",
    text: "根据气候与强度要求控制蒸养温度、湿度和时间曲线。",
    value: "改善养护一致性和生产周转",
  },
  {
    icon: Monitor,
    code: "MANAGEMENT",
    title: "产线管理系统",
    text: "集中管理生产计划、设备状态、工序进度和关键过程数据。",
    value: "提升整线可视化、协调与追溯能力",
  },
];

const projects = [
  {
    icon: Route,
    title: "苏台高速 TJ03 智慧梁厂",
    feature: "移动台座 + 专业工位",
    product: "T 梁",
    output: "约 4–5 片/日*",
  },
  {
    icon: Factory,
    title: "某高速 TJ04 三线梁场",
    feature: "3 条生产线 + 回程线",
    product: "30m / 40m T 梁",
    output: "约 5 片/日*",
  },
  {
    icon: Building2,
    title: "某城市高架节段梁项目",
    feature: "匹配段定位 + 智能蒸养",
    product: "节段箱梁",
    output: "约 2–3 节段/日*",
  },
  {
    icon: Globe,
    title: "某海外预制基地",
    feature: "高温高湿适配 + 柔性模板",
    product: "箱梁 / U 梁",
    output: "约 3 片/日*",
  },
];

const capabilities = [
  {
    icon: Compass,
    title: "研发设计能力",
    text: "从梁型、产量、工期和场地出发，多专业协同定义产线工艺与装备。",
    points: ["机械、电气、液压、软件与工艺联合设计", "完成布局、节拍、非标装备与控制逻辑", "通过设计评审和现场反馈持续迭代"],
  },
  {
    icon: Wrench,
    title: "自主制造能力",
    text: "自有制造基地覆盖大型非标装备从原材料到整机测试的关键环节。",
    points: ["下料、折弯、机加工、焊接与表面处理", "机械、液压、电气集成及整机装配", "过程检验、厂内测试和质量记录追溯"],
  },
  {
    icon: HardHat,
    title: "项目交付能力",
    text: "项目经理统筹技术、制造和现场团队，把设备安装推进到整线顺利运行。",
    points: ["明确土建、动力、起重与客户配合接口", "完成安装、单机调试、整线联动和试生产", "提供操作维护培训及后续运行支持"],
  },
];

function PrimaryButton({ children, onClick, dark = false, className = "" }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-[9px] px-5 text-[13px] font-[850] transition duration-180 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 ${
        dark
          ? "bg-brand-navy text-white focus-visible:outline-brand-blue"
          : "bg-brand-cyan text-brand-navy focus-visible:outline-white"
      } ${className}`}
    >
      {children}
    </button>
  );
}

function SectionHeader({ kicker, title, text }) {
  return (
    <div className="mb-8 max-w-[760px]">
      <p className="mb-2 text-[11px] font-[850] tracking-[0.12em] text-brand-blue uppercase">{kicker}</p>
      <h2 className="text-[clamp(30px,4vw,44px)] leading-[1.13] font-[850] tracking-[-0.03em] text-ink">{title}</h2>
      <p className="mt-3.5 max-w-[710px] text-[15px] text-muted">{text}</p>
    </div>
  );
}

function Section({ id, soft = false, children }) {
  return (
    <section id={id} className={`py-[78px] max-[720px]:py-[62px] ${soft ? "bg-soft" : "bg-white"}`}>
      <div className="site-container">{children}</div>
    </section>
  );
}

function SectionCta({ children, onClick }) {
  return (
    <div className="mt-7 flex justify-center">
      <PrimaryButton dark onClick={onClick}>{children}</PrimaryButton>
    </div>
  );
}

function VisualPanel({ icon: Icon, label, index }) {
  return (
    <div className="industrial-grid relative flex aspect-video items-center justify-center overflow-hidden bg-[#e4edf2]">
      <div className="absolute inset-x-8 top-1/2 h-px bg-brand-blue/20" />
      <div className="absolute inset-y-7 left-1/2 w-px bg-brand-blue/20" />
      <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl border border-white/80 bg-white/85 text-brand-blue shadow-card">
        <Icon size={38} strokeWidth={1.6} aria-hidden="true" />
      </div>
      {index && <span className="absolute top-4 right-4 text-[10px] font-[850] tracking-[0.16em] text-brand-blue/55">{index}</span>}
      {label && <span className="absolute inset-x-4 bottom-4 text-center text-[10px] font-[750] text-muted">{label}</span>}
    </div>
  );
}

function Header({ onLead }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const nav = [
    ["项目难题", "#challenges"],
    ["设计方法", "#method"],
    ["典型产线", "#lines"],
    ["核心产品", "#products"],
    ["项目案例", "#projects"],
  ];

  return (
    <header className="sticky top-0 z-40 h-[70px] border-b border-white/10 bg-brand-navy/97 text-white backdrop-blur-xl max-[720px]:h-[62px]">
      <div className="site-container flex h-full items-center gap-6">
        <a href="#top" aria-label="瑞捷机械" className="shrink-0">
          <img src={logoImage} alt="瑞捷机械 Logo" className="h-8 w-auto max-w-60 object-contain max-[720px]:h-[27px]" />
        </a>
        <nav className="ml-auto flex items-center gap-5 text-xs text-white/70 max-[1000px]:hidden" aria-label="主导航">
          {nav.map(([label, href]) => <a key={href} href={href} className="transition hover:text-white">{label}</a>)}
        </nav>
        <button onClick={onLead} className="rounded-lg bg-white px-3.5 py-2 text-xs font-[850] text-brand-navy max-[1000px]:ml-auto max-[720px]:hidden">提交项目需求</button>
        <button
          type="button"
          aria-label="打开导航"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((value) => !value)}
          className="hidden rounded-lg border border-white/15 p-2 text-white max-[1000px]:ml-0 max-[1000px]:block max-[720px]:ml-auto"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {menuOpen && (
        <nav className="absolute inset-x-0 top-full border-t border-white/10 bg-brand-navy px-5 py-4 shadow-floating min-[1001px]:hidden" aria-label="移动端导航">
          <div className="site-container grid gap-1">
            {nav.map(([label, href]) => (
              <a key={href} href={href} onClick={() => setMenuOpen(false)} className="rounded-lg px-3 py-2.5 text-sm text-white/75 hover:bg-white/5 hover:text-white">{label}</a>
            ))}
            <button onClick={onLead} className="mt-2 rounded-lg bg-brand-cyan px-3 py-3 text-sm font-[850] text-brand-navy">提交项目需求</button>
          </div>
        </nav>
      )}
    </header>
  );
}

function Hero({ onLead }) {
  return (
    <>
      <section id="top" className="hero-gradient relative isolate h-[calc(100vh-124px)] min-h-[610px] overflow-hidden text-white max-[720px]:h-auto max-[720px]:min-h-[780px]">
        <img
          src={heroImage}
          alt=""
          aria-hidden="true"
          className="hero-image-mask absolute inset-y-0 right-0 z-0 h-full w-[72%] object-cover object-right max-[1000px]:w-[78%] max-[720px]:top-auto max-[720px]:bottom-0 max-[720px]:h-[54%] max-[720px]:w-full max-[720px]:object-[68%_center]"
        />
        <div className="hero-overlay absolute inset-0 z-10" />
        <div className="site-container relative z-20 flex h-full min-h-[610px] items-center py-12 pb-[60px] max-[720px]:min-h-[780px] max-[720px]:items-start max-[720px]:pt-12 max-[720px]:pb-[250px]">
          <div className="w-[min(610px,51%)] max-[1000px]:w-[60%] max-[720px]:w-full">
            <p className="mb-4 flex items-center gap-2.5 text-[11px] font-[850] tracking-[0.12em] text-[#8ce2e8] uppercase before:h-0.5 before:w-6 before:bg-brand-cyan">
              装配式梁板智慧生产线整体解决方案
            </p>
            <h1 className="max-w-[610px] text-[clamp(44px,4.2vw,68px)] leading-[1.16] font-[900] tracking-[-0.055em] max-[1000px]:text-[clamp(42px,6vw,58px)] max-[720px]:text-[40px]">
              根据您的场地与生产计划，定制一座真正能投产的智慧梁厂
            </h1>
            <p className="mt-8 max-w-[570px] text-lg font-normal text-white/72 max-[720px]:text-[15px]">
              从梁型、产量和工期出发，统一规划布局、工艺、装备、安装调试与试生产。
            </p>
            <div className="mt-7.5">
              <PrimaryButton onClick={onLead} className="max-[720px]:w-full">提交项目需求 <ArrowRight size={16} /></PrimaryButton>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {["新建智慧梁厂", "传统梁场升级", "公路 · 铁路 · 城市高架"].map((tag) => (
                <span key={tag} className="rounded-full border border-brand-cyan/35 bg-brand-navy/30 px-2.5 py-1.5 text-[11px] text-white/75 backdrop-blur-sm">{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </section>
      <div className="relative z-30 -mt-6">
        <div className="site-container grid grid-cols-4 overflow-hidden rounded-[13px] border border-line bg-white shadow-card max-[720px]:grid-cols-2">
          {[["2008", "成立年份"], ["150+ 亩", "生产基地"], ["6 万+㎡", "自有厂房"], ["150+ 项", "授权专利"]].map(([value, label]) => (
            <div key={label} className="border-r border-line px-3.5 py-4 text-center last:border-r-0 max-[720px]:border-b">
              <strong className="block text-[21px] font-[900] text-brand-navy">{value}</strong>
              <span className="text-[10px] text-muted">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function LeadModal({ open, onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const closeRef = useRef(null);

  useEffect(() => {
    document.body.classList.toggle("modal-open", open);
    if (open) {
      setSubmitted(false);
      requestAnimationFrame(() => closeRef.current?.focus());
    }
    return () => document.body.classList.remove("modal-open");
  }, [open]);

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === "Escape" && open) onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#03111d]/75 p-5 backdrop-blur-lg" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <div role="dialog" aria-modal="true" aria-labelledby="lead-title" className="relative max-h-[calc(100vh-40px)] w-full max-w-[680px] overflow-auto rounded-[18px] bg-white p-7 shadow-[0_30px_90px_rgba(0,0,0,.35)]">
        <button ref={closeRef} onClick={onClose} aria-label="关闭" className="absolute top-3.5 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-soft text-brand-navy"><X size={20} /></button>
        {submitted ? (
          <div className="py-10 text-center">
            <CheckCircle className="mx-auto mb-4 text-brand-cyan" size={48} />
            <strong className="block text-xl font-[850] text-brand-navy">项目信息已模拟提交</strong>
            <p className="mt-2 text-xs text-muted">这是结构原型，不会发送真实数据。</p>
          </div>
        ) : (
          <>
            <h3 id="lead-title" className="mr-12 text-2xl font-[850] text-brand-navy">提交项目需求</h3>
            <p className="mt-1.5 mb-5 text-xs text-muted">公司、联系人和邮箱为必填项。其他项目条件可统一写在项目说明中。</p>
            <form onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }}>
              <div className="grid grid-cols-2 gap-3.5 max-[720px]:grid-cols-1">
                <Field id="company" label="公司名称 *" placeholder="公司全称" icon={Building2} required />
                <Field id="name" label="联系人 *" placeholder="您的姓名" icon={User} required />
                <Field id="country" label="国家 / 地区（选填）" placeholder="项目所在国家或地区" icon={MapPin} />
                <Field id="email" label="商务邮箱 *" placeholder="name@company.com" icon={Send} type="email" required />
                <label className="col-span-2 block max-[720px]:col-span-1">
                  <span className="mb-1.5 block text-[11px] font-[850] text-[#3e5668]">项目说明</span>
                  <textarea
                    className="focus-control min-h-32 w-full resize-y rounded-lg border border-[#ccd8df] bg-[#fbfcfd] px-3 py-2.5 text-sm text-ink"
                    placeholder={"建议填写：\n1. 梁型、梁长与预计数量\n2. 目标生产周期或日产量\n3. 可用场地面积、形状和起重条件\n4. 混凝土、能源与现场环境\n5. 现有设备、项目阶段和主要难题"}
                  />
                  <span className="mt-1 block text-[10px] text-[#8696a2]">不知道的内容可以留空，也可以说明“待确认”。</span>
                </label>
                <label className="col-span-2 flex items-start gap-2 text-[11px] text-muted max-[720px]:col-span-1">
                  <input type="checkbox" className="mt-1 accent-brand-blue" />
                  <span>我同意瑞捷机械就该项目与我联系。</span>
                </label>
              </div>
              <div className="mt-5 flex justify-end">
                <button type="submit" className="inline-flex min-h-12 items-center gap-2 rounded-[9px] bg-brand-navy px-5 text-[13px] font-[850] text-white">模拟提交项目 <Send size={15} /></button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

function Field({ id, label, icon: Icon, ...props }) {
  return (
    <label htmlFor={id} className="block">
      <span className="mb-1.5 block text-[11px] font-[850] text-[#3e5668]">{label}</span>
      <span className="relative block">
        <Icon size={15} className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted" />
        <input id={id} className="focus-control w-full rounded-lg border border-[#ccd8df] bg-[#fbfcfd] py-2.5 pr-3 pl-9 text-sm text-ink" {...props} />
      </span>
    </label>
  );
}

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const openLead = () => setModalOpen(true);

  useEffect(() => {
    const update = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <>
      <Header onLead={openLead} />
      <div className="fixed top-[69px] left-0 z-50 h-[3px] bg-gradient-to-r from-brand-cyan to-accent-orange max-[720px]:top-[61px]" style={{ width: `${progress}%` }} />
      <main>
        <Hero onLead={openLead} />

        <Section id="challenges">
          <SectionHeader kicker="项目难题" title="建一座梁厂，难点不只是买设备" text="真正影响项目结果的是工期、场地、用工、质量和多方接口。" />
          <div className="grid grid-cols-4 gap-4 max-[1000px]:grid-cols-2 max-[720px]:grid-cols-1">
            {challenges.map(({ icon: Icon, title, text }, index) => (
              <article key={title} className="rounded-card border border-line bg-white p-6 transition duration-180 hover:-translate-y-1 hover:shadow-card">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#e8f3f7] text-brand-blue"><Icon size={21} /></div>
                <span className="mb-1 block text-[10px] font-[850] tracking-[0.14em] text-brand-blue/55">0{index + 1}</span>
                <h3 className="text-[17px] font-[850] text-brand-navy">{title}</h3>
                <p className="mt-2 text-xs text-muted">{text}</p>
              </article>
            ))}
          </div>
          <SectionCta onClick={openLead}>让工程师评估我的项目</SectionCta>
        </Section>

        <Section id="inputs" soft>
          <SectionHeader kicker="方案输入" title="每一套方案，都从项目条件开始" text="四类输入共同决定布局、节拍和设备组合。" />
          <div className="grid grid-cols-4 gap-3.5 max-[1000px]:grid-cols-2 max-[720px]:grid-cols-1">
            {inputs.map(({ icon: Icon, title, text }, index) => (
              <article key={title} className="rounded-[14px] border border-line bg-white p-5.5">
                <div className="mb-4 flex items-center justify-between">
                  <Icon size={22} className="text-brand-blue" />
                  <span className="text-[10px] font-[850] text-brand-blue/45">0{index + 1}</span>
                </div>
                <h3 className="font-[850] text-brand-navy">{title}</h3>
                <p className="mt-1.5 text-xs text-muted">{text}</p>
              </article>
            ))}
          </div>
          <SectionCta onClick={openLead}>提交项目条件</SectionCta>
        </Section>

        <Section id="method">
          <SectionHeader kicker="设计方法" title="先优化工艺，再配置设备" text="从生产目标反推产线，而不是按设备清单报价。" />
          <div className="grid grid-cols-4 gap-3.5 max-[1000px]:grid-cols-2 max-[720px]:grid-cols-1">
            {methods.map(({ icon: Icon, title, text, output }, index) => (
              <article key={title} className="relative overflow-hidden rounded-[14px] border border-line bg-white p-5.5">
                <span className="absolute top-4 right-4 text-4xl font-[900] text-brand-blue/6">0{index + 1}</span>
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-brand-blue text-white"><Icon size={20} /></div>
                <h3 className="font-[850] text-brand-navy">{title}</h3>
                <p className="mt-1.5 text-xs text-muted">{text}</p>
                <p className="mt-3 border-t border-line pt-3 text-[10px] font-[850] text-brand-blue">输出：{output}</p>
              </article>
            ))}
          </div>
          <SectionCta onClick={openLead}>申请初步产线规划</SectionCta>
        </Section>

        <Section id="lines" soft>
          <SectionHeader kicker="产线工艺设计" title="基于您的生产需求，定义适合项目的产线工艺" text="以三种成熟工艺为技术基础，根据梁型、产量、工期、场地和环境，重新确定工位组织、张拉方式与设备组合。" />
          <div className="grid grid-cols-3 gap-4 max-[1000px]:grid-cols-1">
            {lines.map(({ icon, kicker, title, visual, text, metrics }, index) => (
              <article key={title} className="overflow-hidden rounded-card border border-line bg-white shadow-card">
                <VisualPanel icon={icon} label={visual} index={`0${index + 1}`} />
                <div className="p-6">
                  <span className="text-[10px] font-[850] tracking-[0.08em] text-brand-blue uppercase">{kicker}</span>
                  <h3 className="mt-1.5 text-lg font-[850] text-brand-navy">{title}</h3>
                  <p className="mt-2 text-xs text-muted">{text}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {metrics.map((metric) => <span key={metric} className="rounded-md bg-soft px-2.5 py-1.5 text-[10px] font-[850] text-brand-navy">{metric}</span>)}
                  </div>
                </div>
              </article>
            ))}
          </div>
          <SectionCta onClick={openLead}>让工程师定义我的产线工艺</SectionCta>
        </Section>

        <Section id="products">
          <SectionHeader kicker="六款核心产品" title="围绕关键工序，组成适合项目的产线" text="产品不是独立堆叠，而是依据梁型、节拍和场地进行组合。" />
          <div className="grid grid-cols-3 gap-4 max-[1000px]:grid-cols-2 max-[720px]:grid-cols-1">
            {products.map(({ icon, code, title, text, value }, index) => (
              <article key={title} className="overflow-hidden rounded-card border border-line bg-white shadow-card">
                <VisualPanel icon={icon} index={`0${index + 1}`} />
                <div className="p-5.5">
                  <span className="text-[9px] font-[900] tracking-[0.1em] text-brand-blue">{code}</span>
                  <h3 className="mt-1.5 font-[850] text-brand-navy">{title}</h3>
                  <p className="mt-2 text-[11px] text-muted">{text}</p>
                  <p className="mt-3 border-t border-line pt-3 text-[10px] font-[850] text-brand-navy">客户价值：{value}</p>
                </div>
              </article>
            ))}
          </div>
          <SectionCta onClick={openLead}>获取产品组合建议</SectionCta>
        </Section>

        <Section id="projects" soft>
          <SectionHeader kicker="项目案例" title="不同项目，得到不同的产线答案" text="以下内容为结构占位，用于观察四个项目卡片的整体布局。" />
          <div className="grid grid-cols-4 gap-4 max-[1000px]:grid-cols-2 max-[720px]:grid-cols-1">
            {projects.map(({ icon, title, feature, product, output }, index) => (
              <article key={title} className="overflow-hidden rounded-card border border-line bg-white shadow-card">
                <VisualPanel icon={icon} index={`0${index + 1}`} />
                <div className="p-5">
                  <h3 className="font-[850] text-brand-navy">{title}</h3>
                  <dl className="mt-3 grid grid-cols-[44px_1fr] gap-x-2 gap-y-1.5 text-[10px]">
                    <dt className="text-muted">特色</dt><dd className="font-[750] text-ink">{feature}</dd>
                    <dt className="text-muted">构件</dt><dd className="font-[750] text-ink">{product}</dd>
                    <dt className="text-muted">产能</dt><dd className="font-[750] text-ink">{output}</dd>
                  </dl>
                </div>
              </article>
            ))}
          </div>
          <SectionCta onClick={openLead}>获取类似项目建议</SectionCta>
        </Section>

        <Section id="capabilities">
          <SectionHeader kicker="为什么选择瑞捷" title="三种能力，把方案变成可运行的生产系统" text="从项目输入到现场投产，研发、制造和交付团队共同对结果负责。" />
          <div className="grid grid-cols-3 gap-4 max-[1000px]:grid-cols-1">
            {capabilities.map(({ icon, title, text, points }, index) => (
              <article key={title} className="overflow-hidden rounded-card border border-line bg-white shadow-card">
                <VisualPanel icon={icon} index={`0${index + 1}`} />
                <div className="p-6">
                  <h3 className="text-lg font-[850] text-brand-navy">{title}</h3>
                  <p className="mt-2 text-xs text-muted">{text}</p>
                  <ul className="mt-4 space-y-2 border-t border-line pt-4">
                    {points.map((point) => (
                      <li key={point} className="flex gap-2 text-[11px] text-muted"><Check size={14} className="mt-0.5 shrink-0 text-brand-cyan" />{point}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
          <SectionCta onClick={openLead}>预约项目技术沟通</SectionCta>
        </Section>

        <section className="hero-gradient py-[72px] text-white">
          <div className="site-container flex flex-col items-center text-center">
            <p className="mb-3 text-[11px] font-[850] tracking-[0.12em] text-[#8ce2e8] uppercase">开始您的项目</p>
            <h2 className="max-w-[760px] text-[clamp(30px,4vw,44px)] leading-[1.13] font-[850] tracking-[-0.03em]">告诉我们生产任务，开始规划适合项目的智慧梁厂</h2>
            <p className="mt-3 max-w-[670px] text-sm text-white/68">只需填写基础信息和联系方式，其他项目条件可统一写在备注中。</p>
            <PrimaryButton onClick={openLead} className="mt-6">打开项目需求表 <ArrowRight size={16} /></PrimaryButton>
          </div>
        </section>
      </main>

      <footer className="bg-[#051a2c] py-6 text-[10px] text-[#89a0b0]">
        <div className="site-container flex justify-between gap-5 max-[720px]:flex-col">
          <span>瑞捷机械｜交钥匙智慧梁厂结构原型</span>
          <span>图片、项目名称与数据均为占位，正式发布前须复核。</span>
        </div>
      </footer>

      <button onClick={openLead} className="fixed right-3.5 bottom-3.5 left-3.5 z-40 hidden min-h-12 items-center justify-center gap-2 rounded-[9px] bg-brand-cyan text-sm font-[900] text-brand-navy shadow-floating max-[720px]:flex">
        提交项目需求 <ArrowRight size={16} />
      </button>

      <LeadModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
