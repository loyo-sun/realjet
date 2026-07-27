import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Cable,
  Check,
  CheckCircle,
  Clock,
  CloudSun,
  Compass,
  FileCheck,
  HardHat,
  LoaderCircle,
  Map,
  MapPin,
  Menu,
  Package,
  Search,
  Send,
  Settings,
  User,
  Users,
  Workflow,
  Wrench,
  X,
} from "lucide-react";
import heroImage from "../../../assets/image/precast-beam-factory-hero.webp";
import logoImage from "../../../assets/image/realjet-logo.webp";
import lineV1Image from "../../../assets/image/intelligent-precast-beam-line-v1.webp";
import lineV2Image from "../../../assets/image/intelligent-precast-beam-line-v2.webp";
import segmentalLineImage from "../../../assets/image/intelligent-segmental-beam-line.webp";
import hydraulicFormworkImage from "../../../assets/image/high-precision-hydraulic-formwork.webp";
import castingBedSystemImage from "../../../assets/image/mobile-casting-bed-circulation-system.webp";
import concreteDistributionImage from "../../../assets/image/concrete-conveying-distribution-system.webp";
import vibrationSystemImage from "../../../assets/image/combined-vibration-system.webp";
import curingKilnImage from "../../../assets/image/intelligent-steam-curing-kiln.webp";
import lineManagementImage from "../../../assets/image/production-line-management-system.webp";
import shenhaiTj05Image from "../../../assets/image/g15-shenhai-expressway-ningbo-tj05.webp";
import wenzhouBayBaseImage from "../../../assets/image/wenzhou-bay-prefab-industrial-base.webp";
import yongguanDongtouImage from "../../../assets/image/yongguan-expressway-dongtou-branch.webp";
import guangaoTj5Image from "../../../assets/image/guangao-expressway-guangzhu-tj5.webp";
import researchDesignImage from "../../../assets/image/research-design-capability.webp";
import manufacturingCapabilityImage from "../../../assets/image/manufacturing-capability.webp";
import projectDeliveryCapabilityImage from "../../../assets/image/project-delivery-capability.webp";

const challenges = [
  {
    icon: Clock,
    title: "工期紧",
    text: "交付节点明确，产量爬坡时间短，传统人工组织难以形成稳定节拍。",
    impact: "节拍不稳，影响按期交付",
  },
  {
    icon: Map,
    title: "场地受限",
    text: "狭长、不规则或分区场地，对工位布局、物流路线和存梁组织提出更高要求。",
    impact: "布局不当，造成场地浪费",
  },
  {
    icon: Users,
    title: "熟练工不足",
    text: "模板、振捣、养护等关键工序依赖经验，人员培训与质量管理压力持续增加。",
    impact: "人员波动，影响质量稳定",
  },
  {
    icon: Cable,
    title: "协同困难",
    text: "土建、设备、能源、起重和控制涉及多方，缺少统一规划容易出现衔接空档。",
    impact: "责任不清，引发返工延期",
  },
];

const inputs = [
  { icon: Package, title: "生产目标", text: "梁型、数量、工期、目标日产量" },
  { icon: MapPin, title: "场地条件", text: "面积、形状、道路、起重与存梁区" },
  { icon: CloudSun, title: "现场环境", text: "气候、能源、混凝土供应与维护条件" },
  { icon: FileCheck, title: "项目标准", text: "设计文件、当地规范与验收要求" },
];

const methods = [
  { icon: Search, title: "需求诊断", text: "明确生产目标、现场限制和项目优先级。", output: "项目需求清单" },
  { icon: Workflow, title: "工艺规划", text: "定义生产节拍、工位、物流和场地布局。", output: "工艺与布局方案" },
  { icon: Settings, title: "系统配置", text: "匹配关键装备、控制系统和工程接口。", output: "整线配置方案" },
  { icon: CheckCircle, title: "交付验证", text: "完成安装联调、试生产、培训和问题闭环。", output: "可运行生产线" },
];

const lines = [
  {
    image: lineV1Image,
    kicker: "基础工艺架构",
    title: "智能预制梁生产线 V1.0",
    visual: "固定模板 · 移动台车 · 一次张拉",
    text: "面向梁型明确、产量稳定的项目，按任务要求定义台座、模板和养护周转。",
    metrics: ["日产约 1–2 片/线*", "周期约 2–3 天*"],
  },
  {
    image: lineV2Image,
    kicker: "高周转工艺架构",
    title: "智能预制梁生产线 V2.0",
    visual: "流水工位 · 二次张拉 · 自动摆渡",
    text: "面向工期紧、产量高或场地受限的项目，定义专业工位与分阶段张拉工艺。",
    metrics: ["日产约 2–4 片/线*", "用地更紧凑*"],
  },
  {
    image: segmentalLineImage,
    kicker: "节段梁工艺架构",
    title: "智能节段梁生产线",
    visual: "匹配段定位 · 节段模板 · 智能蒸养",
    text: "面向节段箱梁项目，根据节段规格与架设计划定义匹配段定位、模板和蒸养工艺。",
    metrics: ["日产约 2–3 个节段*", "多规格柔性*"],
  },
];

const products = [
  {
    image: hydraulicFormworkImage,
    code: "FORMING",
    title: "高精度液压模板",
    text: "按梁型进行非标设计，实现液压合模、开模和关键尺寸调整。",
    value: "减少人工拆装，提高成型一致性",
  },
  {
    image: castingBedSystemImage,
    code: "FLOW",
    title: "移动台座流转系统",
    text: "承载梁体在专业工位间流转，让模板和台座更快进入下一循环。",
    value: "改善周转节拍和场地组织",
  },
  {
    image: concreteDistributionImage,
    code: "CONCRETE",
    title: "混凝土输布料系统",
    text: "衔接拌合站与浇筑工位，完成混凝土输送、称重与分区布料。",
    value: "缩短供料路径，减少人工配合",
  },
  {
    image: vibrationSystemImage,
    code: "COMPACTION",
    title: "组合振捣系统",
    text: "根据构件特点组合附着式与插入式振捣，统一控制关键参数。",
    value: "提升混凝土密实度与过程稳定性",
  },
  {
    image: curingKilnImage,
    code: "CURING",
    title: "智能蒸养窑",
    text: "根据气候与强度要求控制蒸养温度、湿度和时间曲线。",
    value: "改善养护一致性和生产周转",
  },
  {
    image: lineManagementImage,
    code: "MANAGEMENT",
    title: "产线管理系统",
    text: "集中管理生产计划、设备状态、工序进度和关键过程数据。",
    value: "提升整线可视化、协调与追溯能力",
  },
];

const projects = [
  {
    image: shenhaiTj05Image,
    category: "高速公路",
    title: "G15 沈海高速宁波南段 TJ05 标",
    line: "2 条 T 梁产线",
    process: "带模蒸养 · 二次张拉",
    product: "30 米 T 梁",
    output: "6 片/天",
  },
  {
    image: wenzhouBayBaseImage,
    category: "产业基地",
    title: "新型交通城建工业化基地",
    line: "4 条 T 梁产线",
    process: "带模蒸养 · 二次张拉",
    product: "30 / 40 米 T 梁",
    output: "8–12 片/天",
  },
  {
    image: yongguanDongtouImage,
    category: "高速支线",
    title: "甬莞高速洞头支线项目",
    line: "2 条节段梁产线",
    process: "带模蒸养",
    product: "节段梁",
    output: "6 片/天",
  },
  {
    image: guangaoTj5Image,
    category: "高速改扩建",
    title: "广澳高速改扩建广珠段 TJ5 标",
    line: "7 条 T 梁产线",
    process: "带模蒸养",
    product: "30 米 T 梁",
    output: "12 片/天",
  },
];

const capabilities = [
  {
    icon: Compass,
    image: researchDesignImage,
    title: "研发设计能力",
    text: "围绕预制梁模板、移动台车、智能蒸养与控制软件持续研发，以知识产权和专业化创新能力支撑项目设计。",
    points: [
      "拥有智慧梁场模板控制系统等软件著作权",
      "拥有智能蒸养房、带模移动台车和端模拆除装置等专利",
      "获评湖南省专精特新中小企业（2025–2028）",
    ],
  },
  {
    icon: Wrench,
    image: manufacturingCapabilityImage,
    title: "自主制造能力",
    text: "自有制造基地覆盖大型非标装备从原材料到整机测试的关键环节。",
    points: ["下料、折弯、机加工、焊接与表面处理", "机械、液压、电气集成及整机装配", "过程检验、厂内测试和质量记录追溯"],
  },
  {
    icon: HardHat,
    image: projectDeliveryCapabilityImage,
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
    <div className="mb-6 max-w-[760px]">
      <p className="mb-2 text-[11px] font-[850] tracking-[0.12em] text-brand-blue uppercase">{kicker}</p>
      <h2 className="text-[clamp(30px,4vw,44px)] leading-[1.13] font-[850] tracking-[-0.03em] text-ink">{title}</h2>
      <p className="mt-3 max-w-[710px] text-[16px] leading-[1.6] text-muted">{text}</p>
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
    <div className="mt-7 flex justify-center max-[720px]:hidden">
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
    ["解决方案", "#method"],
    ["产线工艺", "#lines"],
    ["核心产品", "#products"],
    ["项目案例", "#projects"],
    ["企业能力", "#capabilities"],
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
          className="hidden rounded-lg border border-white/15 p-2 text-white max-[1000px]:ml-auto max-[1000px]:block"
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
          </div>
        </nav>
      )}
    </header>
  );
}

function Hero({ onLead }) {
  return (
    <>
      <section id="top" className="hero-gradient relative isolate h-[calc(100vh-124px)] min-h-[610px] overflow-hidden text-white max-[720px]:h-auto max-[720px]:min-h-[610px]">
        <img
          src={heroImage}
          alt=""
          aria-hidden="true"
          className="hero-image-mask absolute inset-y-0 right-0 z-0 h-full w-[72%] object-cover object-right max-[1000px]:w-[78%] max-[720px]:hidden"
        />
        <div className="hero-overlay absolute inset-0 z-10" />
        <div className="site-container relative z-20 flex h-full min-h-[610px] items-center py-12 pb-[60px] max-[720px]:min-h-[610px] max-[720px]:items-center max-[720px]:py-16">
          <div className="w-[min(610px,51%)] max-[1000px]:w-[60%] max-[720px]:w-full">
            <p className="mb-4 flex items-center gap-3 text-[14px] font-[850] tracking-[0.08em] text-[#8ce2e8] before:h-0.5 before:w-7 before:bg-brand-cyan max-[720px]:text-[13px]">
              装配式梁板智慧生产线交钥匙解决方案服务商
            </p>
            <h1 className="max-w-[610px] text-[clamp(40px,3.65vw,58px)] leading-[1.18] font-[900] tracking-[-0.05em] max-[1000px]:text-[clamp(38px,5.2vw,50px)] max-[720px]:text-[34px]">
              根据您的场地与生产计划，定制按期投产的智慧梁厂
            </h1>
            <p className="mt-8 max-w-[570px] text-lg font-normal text-white/72 max-[720px]:text-[15px]">
              从产线规划、装备制造到安装试生产，由我们统筹交付。
            </p>
            <div className="mt-7.5 max-[720px]:hidden">
              <PrimaryButton onClick={onLead}>提交项目需求 <ArrowRight size={16} /></PrimaryButton>
            </div>
            <div className="mt-5 flex flex-wrap gap-2 max-[720px]:mt-7">
              {["高速桥梁", "轨道交通", "市政工程"].map((tag) => (
                <span key={tag} className="rounded-full border border-brand-cyan/35 bg-brand-navy/30 px-2.5 py-1.5 text-[12px] text-white/75 backdrop-blur-sm">{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </section>
      <div className="relative z-30 -mt-6">
        <div className="site-container">
          <div className="grid grid-cols-4 overflow-hidden rounded-[13px] border border-line bg-white shadow-card max-[720px]:grid-cols-2">
            {[["2008 年", "成立并持续深耕"], ["150+ 亩", "自有生产基地"], ["6 万+㎡", "装备制造厂房"], ["150+ 项", "授权专利积累"]].map(([value, label]) => (
              <div key={label} className="border-r border-line px-3.5 py-4 text-center last:border-r-0 max-[720px]:border-b max-[720px]:even:border-r-0">
                <strong className="block text-[21px] font-[900] text-brand-navy">{value}</strong>
                <span className="text-[11px] text-muted">{label}</span>
              </div>
            ))}
          </div>
          <p className="mt-3 text-center text-[13px] font-[650] text-[#526b7d] max-[720px]:px-5 max-[720px]:text-[12px]">
            瑞捷机械是一家拥有 10 年以上行业经验，并具备自主研发与生产能力的产线解决方案提供商。
          </p>
        </div>
      </div>
    </>
  );
}

function LeadModal({ open, onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [submissionState, setSubmissionState] = useState("idle");
  const closeRef = useRef(null);

  useEffect(() => {
    document.body.classList.toggle("modal-open", open);
    if (open) {
      setSubmitted(false);
      setSubmissionState("idle");
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const body = new URLSearchParams(new FormData(form)).toString();
    setSubmissionState("submitting");

    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
      });

      if (!response.ok) throw new Error("Submission failed");
      form.reset();
      setSubmitted(true);
      setSubmissionState("success");
    } catch {
      setSubmissionState("error");
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#03111d]/75 p-5 backdrop-blur-lg" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <div role="dialog" aria-modal="true" aria-labelledby="lead-title" className="relative max-h-[calc(100vh-40px)] w-full max-w-[680px] overflow-auto rounded-[18px] bg-white p-7 shadow-[0_30px_90px_rgba(0,0,0,.35)]">
        <button ref={closeRef} onClick={onClose} aria-label="关闭" className="absolute top-3.5 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-soft text-brand-navy"><X size={20} /></button>
        {submitted ? (
          <div className="py-10 text-center">
            <CheckCircle className="mx-auto mb-4 text-brand-cyan" size={48} />
            <strong className="block text-xl font-[850] text-brand-navy">项目需求已提交</strong>
            <p className="mt-2 text-xs text-muted">感谢您的信任，瑞捷团队将根据所留联系方式与您沟通。</p>
            <button
              type="button"
              onClick={onClose}
              className="mx-auto mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-[9px] bg-brand-navy px-5 text-[13px] font-[850] text-white"
            >
              <ArrowLeft size={15} /> 返回页面
            </button>
          </div>
        ) : (
          <>
            <h3 id="lead-title" className="mr-12 text-2xl font-[850] text-brand-navy">提交项目需求</h3>
            <p className="mt-1.5 mb-5 text-xs text-muted">填写公司、联系人和邮箱即可提交；如有明确的项目条件，可在项目说明中补充。</p>
            <form name="precast-beam-factory-inquiry" method="POST" data-netlify="true" netlify-honeypot="bot-field" aria-busy={submissionState === "submitting"} onSubmit={handleSubmit}>
              <input type="hidden" name="form-name" value="precast-beam-factory-inquiry" />
              <input type="hidden" name="bot-field" />
              <fieldset disabled={submissionState === "submitting"} className="min-w-0 disabled:cursor-wait">
                <div className="grid grid-cols-2 gap-3.5 max-[720px]:grid-cols-1">
                  <Field id="company" name="company" label="公司名称 *" placeholder="公司全称" icon={Building2} required />
                  <Field id="contact-name" name="contact_name" label="联系人 *" placeholder="您的姓名" icon={User} required />
                  <Field id="country" name="country" label="国家 / 地区（选填）" placeholder="项目所在国家或地区" icon={MapPin} />
                  <Field id="email" name="email" label="商务邮箱 *" placeholder="name@company.com" icon={Send} type="email" required />
                  <label className="col-span-2 block max-[720px]:col-span-1">
                    <span className="mb-1.5 block text-[11px] font-[850] text-[#3e5668]">项目说明</span>
                    <textarea
                      name="project_details"
                      rows="4"
                      className="focus-control w-full resize-y rounded-lg border border-[#ccd8df] bg-[#fbfcfd] px-3 py-2.5 text-sm text-ink disabled:cursor-wait disabled:bg-[#eef2f5] disabled:text-muted"
                      placeholder="请简要说明梁型、数量、目标产能或工期、场地与现场条件，以及当前项目阶段；暂不明确的内容可留空。"
                    />
                  </label>
                  <label className="col-span-2 flex items-start gap-2 text-[11px] text-muted max-[720px]:col-span-1">
                    <input type="checkbox" name="contact_consent" value="同意联系" className="mt-1 accent-brand-blue disabled:cursor-wait" />
                    <span>我同意瑞捷机械就该项目与我联系。</span>
                  </label>
                </div>
                {submissionState === "error" && (
                  <p role="alert" className="mt-4 text-[12px] text-red-600">提交未成功，请检查网络后重试，或稍后与我们联系。</p>
                )}
                <div className="mt-5 flex justify-end">
                  <button type="submit" className="inline-flex min-h-12 min-w-[92px] items-center justify-center gap-2 rounded-[9px] bg-brand-navy px-5 text-[13px] font-[850] text-white disabled:cursor-wait disabled:opacity-75">
                    {submissionState === "submitting" ? (
                      <><LoaderCircle className="animate-spin" size={17} aria-hidden="true" /> 提交中…</>
                    ) : (
                      <>提交 <Send size={15} /></>
                    )}
                  </button>
                </div>
              </fieldset>
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
        <input id={id} className="focus-control w-full rounded-lg border border-[#ccd8df] bg-[#fbfcfd] py-2.5 pr-3 pl-9 text-sm text-ink disabled:cursor-wait disabled:bg-[#eef2f5] disabled:text-muted" {...props} />
      </span>
    </label>
  );
}

function ContactEmail() {
  const openEmail = (event) => {
    event.preventDefault();
    const address = [108, 111, 121, 111, 115, 117, 110, 64, 103, 109, 97, 105, 108, 46, 99, 111, 109]
      .map((code) => String.fromCharCode(code))
      .join("");
    window.location.href = `mailto:${address}`;
  };

  return (
    <a id="contact-email" href="#contact-email" onClick={openEmail} className="text-left underline decoration-white/20 underline-offset-4 transition hover:text-white">
      联系邮箱
    </a>
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
          <SectionHeader
            kicker="项目难题"
            title="建一座梁厂，难点不只是买设备"
            text="从项目目标到稳定投产，以下四个问题往往同时发生，也决定了产线必须按项目条件进行整体设计。"
          />
          <div className="grid grid-cols-4 gap-4 max-[1000px]:grid-cols-2 max-[720px]:grid-cols-1">
            {challenges.map(({ icon: Icon, title, text, impact }, index) => (
              <article
                key={title}
                className="group relative flex min-h-[278px] flex-col overflow-hidden rounded-card border border-line bg-white p-6 transition duration-200 hover:-translate-y-1.5 hover:border-brand-blue/35 hover:shadow-card"
              >
                <div className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-brand-blue to-brand-cyan transition duration-200 group-hover:scale-x-100" />
                <span className="absolute top-2 right-4 text-[62px] leading-none font-[900] tracking-[-0.08em] text-brand-blue/[0.055]">
                  0{index + 1}
                </span>
                <div className="relative mb-6 flex h-12 w-12 items-center justify-center rounded-[14px] border border-brand-blue/10 bg-[#eaf4f7] text-brand-blue transition duration-200 group-hover:bg-brand-blue group-hover:text-white">
                  <Icon size={22} strokeWidth={1.8} aria-hidden="true" />
                </div>
                <h3 className="relative text-[19px] font-[850] tracking-[-0.02em] text-brand-navy">{title}</h3>
                <p className="relative mt-2.5 text-[14px] leading-[1.7] text-muted">{text}</p>
                <div className="relative mt-auto border-t border-line pt-4">
                  <span className="mb-1 block text-[10px] font-[900] tracking-[0.13em] text-brand-blue/65">项目影响</span>
                  <p className="flex items-center gap-1.5 text-[12px] font-[850] text-brand-navy">
                    {impact}
                    <ArrowRight size={13} className="text-brand-cyan transition group-hover:translate-x-1" aria-hidden="true" />
                  </p>
                </div>
              </article>
            ))}
          </div>
          <SectionCta onClick={openLead}>让工程师评估我的项目</SectionCta>
        </Section>

        <Section id="method" soft>
          <SectionHeader
            kicker="方案形成流程"
            title="从项目条件到可运行的整线方案"
            text="我们不是从设备清单开始，而是先明确生产目标和现场条件，再完成工艺规划、系统配置与交付验证。"
          />

          <div className="solution-journey">
            <aside className="solution-input-panel">
              <div className="solution-panel-header">
                <span className="section-index">01 · 项目输入</span>
                <h3>先把项目条件<br />定义清楚</h3>
                <p className="solution-panel-description is-dark">四类条件共同决定产线布局、生产节拍和装备组合。</p>
              </div>
              <div className="solution-input-list">
                {inputs.map(({ icon: Icon, title, text }, index) => (
                  <article key={title} className="solution-input-item">
                    <div className="solution-input-icon">
                      <Icon size={18} strokeWidth={1.8} aria-hidden="true" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4>{title}</h4>
                        <span>0{index + 1}</span>
                      </div>
                      <p>{text}</p>
                    </div>
                  </article>
                ))}
              </div>
            </aside>

            <div className="solution-process-panel">
              <div className="journey-arrow" aria-hidden="true"><ArrowRight size={18} /></div>
              <div className="solution-panel-header">
                <span className="section-index text-brand-blue">02 · 瑞捷工作流程</span>
                <h3>把项目条件转化为<br />可运行的生产系统</h3>
                <p className="solution-panel-description">通过需求诊断、工艺规划、系统配置和交付验证，让方案逐步落地到生产。</p>
              </div>
              <div className="delivery-flow">
                {methods.map(({ icon: Icon, title, text, output }, index) => (
                  <article key={title} className="delivery-step">
                    <div className="delivery-marker">
                      <Icon size={19} strokeWidth={1.8} aria-hidden="true" />
                      <span>0{index + 1}</span>
                    </div>
                    <div className="delivery-copy">
                      <h4>{title}</h4>
                      <p>{text}</p>
                    </div>
                    <span className="delivery-output">输出 · {output}</span>
                  </article>
                ))}
              </div>
            </div>
          </div>
          <SectionCta onClick={openLead}>提交项目条件，获取初步方案</SectionCta>
        </Section>

        <Section id="lines">
          <SectionHeader
            kicker="产线工艺设计"
            title="以成熟技术为基础，共同定义适合项目的新工艺"
            text="我们已有成熟的预制梁产线工艺，对于特殊项目需求，与您共同完成工艺研究、方案设计、装备开发和生产验证。"
          />
          <div className="grid grid-cols-3 gap-4 max-[1000px]:grid-cols-1">
            {lines.map(({ image, kicker, title, visual, text, metrics }) => (
              <article key={title} className="group overflow-hidden rounded-card border border-line bg-white shadow-card">
                <div className="relative aspect-video overflow-hidden bg-[#e4edf2]">
                  <img
                    src={image}
                    alt={`${title}示意图`}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.025]"
                  />
                  <span className="absolute inset-x-4 bottom-4 rounded-md border border-white/10 bg-brand-navy/50 px-3 py-2 text-center text-[11px] font-[750] text-white/90 backdrop-blur-[3px]">
                    {visual}
                  </span>
                </div>
                <div className="p-6">
                  <span className="text-[11px] font-[850] tracking-[0.08em] text-brand-blue uppercase">{kicker}</span>
                  <h3 className="mt-1.5 text-lg font-[850] text-brand-navy">{title}</h3>
                  <p className="mt-2 text-[13px] leading-[1.7] text-muted">{text}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {metrics.map((metric) => <span key={metric} className="rounded-md bg-soft px-2.5 py-1.5 text-[11px] font-[850] text-brand-navy">{metric}</span>)}
                  </div>
                </div>
              </article>
            ))}
          </div>
          <SectionCta onClick={openLead}>与工程师沟通生产工艺</SectionCta>
        </Section>

        <Section id="products" soft>
          <SectionHeader kicker="六款核心产品" title="围绕关键工序，组成适合项目的产线" text="产品不是独立堆叠，而是依据梁型、节拍和场地进行组合。" />
          <div className="grid grid-cols-3 gap-4 max-[1000px]:grid-cols-2 max-[720px]:grid-cols-1">
            {products.map(({ image, code, title, text, value }) => (
              <article key={title} className="group overflow-hidden rounded-card border border-line bg-white shadow-card">
                <div className="aspect-video overflow-hidden bg-[#e4edf2]">
                  <img
                    src={image}
                    alt={`${title}产品图`}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.025]"
                  />
                </div>
                <div className="p-5.5">
                  <span className="text-[10px] font-[900] tracking-[0.1em] text-brand-blue">{code}</span>
                  <h3 className="mt-1.5 font-[850] text-brand-navy">{title}</h3>
                  <p className="mt-2 text-[13px] leading-[1.7] text-muted">{text}</p>
                  <p className="mt-3 border-t border-line pt-3 text-[12px] font-[850] text-brand-navy">客户价值：{value}</p>
                </div>
              </article>
            ))}
          </div>
          <SectionCta onClick={openLead}>获取产品详情</SectionCta>
        </Section>

        <Section id="projects">
          <SectionHeader
            kicker="项目案例"
            title="不同项目，得到不同的产线答案"
            text="以下案例来自瑞捷已签单及已交付项目，产线规模、生产工艺和装备配置均根据项目条件确定。"
          />
          <div className="grid grid-cols-4 gap-4 max-[1000px]:grid-cols-2 max-[720px]:grid-cols-1">
            {projects.map(({ image, category, title, line, process, product, output }) => (
              <article key={title} className="group overflow-hidden rounded-card border border-line bg-white shadow-card transition duration-200 hover:-translate-y-1 hover:border-brand-blue/30">
                <div className="relative aspect-video overflow-hidden bg-[#e4edf2]">
                  <img
                    src={image}
                    alt={`${title}项目图`}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.025]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/55 via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 rounded-full border border-white/20 bg-brand-navy/55 px-2.5 py-1 text-[10px] font-[850] text-white backdrop-blur-sm">
                    {category}
                  </span>
                  <div className="absolute right-3 bottom-3 flex items-center gap-1.5 rounded-lg border border-white/15 bg-brand-navy/55 px-2.5 py-1.5 text-white backdrop-blur-sm">
                    <span className="text-[9px] text-white/60">日产能</span>
                    <strong className="text-[13px] font-[900]">{output}</strong>
                  </div>
                </div>
                <div className="p-4.5">
                  <h3 className="text-[15px] font-[850] leading-[1.45] tracking-[-0.02em] text-brand-navy">{title}</h3>
                  <dl className="mt-3 flex flex-wrap gap-2">
                    <div className="min-w-[108px] flex-1 rounded-[9px] border border-line bg-soft px-3 py-2.5">
                      <dt className="text-[9px] font-[850] tracking-[0.06em] text-muted">产线规模</dt>
                      <dd className="mt-1 text-[11px] font-[850] text-brand-navy">{line}</dd>
                    </div>
                    <div className="min-w-[108px] flex-1 rounded-[9px] border border-line bg-soft px-3 py-2.5">
                      <dt className="text-[9px] font-[850] tracking-[0.06em] text-muted">生产构件</dt>
                      <dd className="mt-1 text-[11px] font-[850] text-brand-navy">{product}</dd>
                    </div>
                  </dl>
                  <div className="mt-3 flex items-center gap-2.5 rounded-[9px] border border-brand-blue/10 bg-[#eef6f8] px-3 py-2.5">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-white text-brand-blue shadow-[0_5px_16px_rgba(8,37,63,.08)]">
                      <Workflow size={14} aria-hidden="true" />
                    </div>
                    <div>
                      <span className="block text-[9px] font-[850] text-brand-blue">核心工艺</span>
                      <strong className="mt-0.5 block text-[11px] font-[850] text-brand-navy">{process}</strong>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <SectionCta onClick={openLead}>了解更多案例</SectionCta>
        </Section>

        <Section id="capabilities" soft>
          <SectionHeader kicker="为什么选择瑞捷" title="三种能力，把想法变成产能" text="从项目输入到现场投产，研发、制造和交付团队共同对结果负责。" />
          <div className="grid grid-cols-3 gap-4 max-[1000px]:grid-cols-1">
            {capabilities.map(({ icon, image, title, text, points }, index) => (
              <article key={title} className="group overflow-hidden rounded-card border border-line bg-white shadow-card">
                {image ? (
                  <div className="aspect-video overflow-hidden bg-[#e4edf2]">
                    <img
                      src={image}
                      alt={`${title}配图`}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.025]"
                    />
                  </div>
                ) : (
                  <VisualPanel icon={icon} index={`0${index + 1}`} />
                )}
                <div className="p-6">
                  <h3 className="text-lg font-[850] text-brand-navy">{title}</h3>
                  <p className="mt-2 text-[13px] leading-[1.7] text-muted">{text}</p>
                  <ul className="mt-4 space-y-2 border-t border-line pt-4">
                    {points.map((point) => (
                      <li key={point} className="flex gap-2 text-[12px] leading-[1.65] text-muted"><Check size={14} className="mt-0.5 shrink-0 text-brand-cyan" />{point}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
          <SectionCta onClick={openLead}>预约专家沟通项目</SectionCta>
        </Section>

        <section className="hero-gradient py-[72px] text-white">
          <div className="site-container flex flex-col items-center text-center">
            <p className="mb-3 text-[11px] font-[850] tracking-[0.12em] text-[#8ce2e8] uppercase">开始您的项目</p>
            <h2 className="max-w-[760px] text-[clamp(30px,4vw,44px)] leading-[1.13] font-[850] tracking-[-0.03em]">获取专属于您的解决方案</h2>
            <p className="mt-3 max-w-[670px] text-[15px] text-white/68">告诉我们生产任务，开始规划你的预制梁产线</p>
            <PrimaryButton onClick={openLead} className="mt-6 max-[720px]:hidden">打开项目需求表 <ArrowRight size={16} /></PrimaryButton>
          </div>
        </section>
      </main>

      <footer className="bg-[#051a2c] py-6 text-[11px] text-[#89a0b0]">
        <div className="site-container flex items-center justify-between gap-5 max-[720px]:flex-col max-[720px]:items-start">
          <span>© 2026 长沙瑞捷机械科技股份有限公司 版权所有</span>
          <div className="flex items-center gap-5 max-[720px]:flex-col max-[720px]:items-start max-[720px]:gap-2">
            <span>装配式梁板智慧生产线交钥匙解决方案</span>
            <ContactEmail />
          </div>
        </div>
      </footer>

      <button onClick={openLead} className="fixed right-3.5 bottom-3.5 left-3.5 z-40 hidden min-h-12 items-center justify-center gap-2 rounded-[9px] bg-brand-cyan text-sm font-[900] text-brand-navy shadow-floating max-[720px]:flex">
        提交项目需求 <ArrowRight size={16} />
      </button>

      <LeadModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
