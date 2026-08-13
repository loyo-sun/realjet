import { useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Building2,
  CheckCircle,
  CloudSun,
  Compass,
  FileCheck,
  HardHat,
  LoaderCircle,
  MapPin,
  Menu,
  Package,
  Search,
  Send,
  Settings,
  User,
  Workflow,
  Wrench,
  X,
} from "lucide-react";
import LanguageSwitcher from "../shared/LanguageSwitcher";
import MobileContactBar from "../shared/MobileContactBar";
import MobileScrollArrows from "../shared/MobileScrollArrows";
import { trackLeadError, trackLeadSuccess } from "../shared/analytics";
import { createBeamFactoryEnquiryBody, UNIVERSAL_ENQUIRY_FORM_NAME } from "../shared/universalEnquiry";
import UniversalEnquiryFields from "../shared/UniversalEnquiryFields";
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
import smallBoxGirderImage from "../../../assets/image/precast-types/small-box-girder.webp";
import tBeamImage from "../../../assets/image/precast-types/t-beam.webp";
import segmentalBoxGirderImage from "../../../assets/image/precast-types/segmental-box-girder.webp";
import uBeamImage from "../../../assets/image/precast-types/u-beam.webp";
import iGirderImage from "../../../assets/image/precast-types/i-girder.webp";
import fullSpanBoxGirderImage from "../../../assets/image/precast-types/full-span-box-girder.webp";
import doubleTSlabImage from "../../../assets/image/precast-types/double-t-slab.webp";
import troughGirderImage from "../../../assets/image/precast-types/trough-girder.webp";
import crashBarrierImage from "../../../assets/image/precast-types/crash-barrier.webp";
import tunnelSegmentImage from "../../../assets/image/precast-types/tunnel-segment.webp";
import boxCulvertImage from "../../../assets/image/precast-types/box-culvert.webp";
import stationElementsImage from "../../../assets/image/precast-types/station-elements.webp";
import interlockingConcreteArmourUnitImage from "../../../assets/image/precast-types/interlocking-concrete-armour-unit.webp";

const inputs = [
  {
    icon: Package,
    title: "生产任务",
    text: "产品类型、数量、工期与目标日产量，明确投产节点和产能爬坡要求",
  },
  {
    icon: MapPin,
    title: "场地条件",
    text: "面积、形状、道路、起重与存放条件，识别布局和物流限制",
  },
  {
    icon: CloudSun,
    title: "人员与资源",
    text: "熟练工配置、气候、能源、混凝土供应与当地维护能力",
  },
  {
    icon: FileCheck,
    title: "项目标准",
    text: "设计文件、当地规范、验收要求及各专业工程接口",
  },
];

const methods = [
  {
    icon: Search,
    title: "需求诊断",
    text: "听懂客户声音：把“我需要一条梁场产线”转化为“X 个月内产出 Y 片箱梁，满足项目工期”，全面了解项目规模、工期、构件规格及约束条件。",
    output: "清晰的生产任务",
  },
  {
    icon: Workflow,
    title: "工艺规划",
    text: "通过布局优化、节拍匹配、瓶颈突破和柔性匹配等手段完成产线工艺设计，使产线效率最大化，并兼顾生产弹性。",
    output: "产线工艺与布局",
  },
  {
    icon: Settings,
    title: "设备选型",
    text: "匹配工艺要求，买最合适的设备。执行“三不买”：不买超出工艺要求的，不买当地条件不允许的，不买无法维护的。",
    output: "适配项目的设备组合",
  },
  {
    icon: CheckCircle,
    title: "产能调优",
    text: "设备到货不是终点，而是起点。完成安装、单机调试、整线联调、试生产、产能验证和持续优化，提供全过程保姆式服务。",
    output: "稳定可验证的产能",
  },
];

const precastTypes = [
  {
    image: tBeamImage,
    category: "桥梁上部主梁",
    title: "T梁",
    scene: "高速公路 / 跨线桥",
    text: "技术成熟、造价经济，常用于20–50米跨径的公路、高速桥梁和跨线桥项目。",
  },
  {
    image: smallBoxGirderImage,
    category: "桥梁上部主梁",
    title: "小箱梁",
    scene: "高架 / 桥梁 / 市政道路",
    text: "中空箱形截面，抗扭刚度高，适用于城市高架、互通立交以及曲线桥和斜桥。",
  },
  {
    image: segmentalBoxGirderImage,
    category: "桥梁上部主梁",
    title: "节段箱梁",
    scene: "城市高架 / 跨海大桥",
    text: "将主梁分节段工厂预制、现场拼装，适用于交通影响敏感和曲线线形复杂的桥梁。",
  },
  {
    image: uBeamImage,
    category: "桥梁上部主梁",
    title: "U型梁",
    scene: "城市轨道交通",
    text: "建筑高度低，两侧腹板可兼顾防护与降噪，适合地铁和轻轨高架区间。",
  },
  {
    image: iGirderImage,
    category: "桥梁上部主梁",
    title: "I梁 / 工字梁",
    scene: "高架 / 桥梁 / 组合桥",
    text: "受力效率高，可与现浇叠合板组合使用，常用于25–45米跨径桥梁。",
  },
  {
    image: fullSpanBoxGirderImage,
    category: "桥梁上部主梁",
    title: "整孔箱梁",
    scene: "高铁 / 城市快速路",
    text: "整跨预制、整体架设，抗弯抗扭能力强，适合高铁及大型城市快速路工程。",
  },
  {
    image: doubleTSlabImage,
    category: "桥梁上部主梁",
    title: "双T梁",
    scene: "道路下穿 / 地铁站房",
    text: "梁板合一，吊装后可直接形成顶板或行车面，适用于大跨度下穿和盖挖结构。",
  },
  {
    image: troughGirderImage,
    category: "桥梁上部主梁",
    title: "槽形梁",
    scene: "轨道交通 / 人行天桥",
    text: "平底直腹板结构，适用于地铁高架段和跨度较大的装配式人行天桥。",
  },
  {
    image: crashBarrierImage,
    category: "桥面及辅助结构",
    title: "防撞护栏",
    scene: "高架 / 高速 / 桥梁",
    text: "用于桥梁边缘或道路中央分隔带，承担车辆防护、导向和道路隔离功能。",
  },
  {
    image: tunnelSegmentImage,
    category: "地下与隧道结构",
    title: "盾构管片",
    scene: "地铁 / 过江及山岭隧道",
    text: "拼装形成隧道永久承重外壳，对尺寸精度、结构强度和抗渗性能要求高。",
  },
  {
    image: boxCulvertImage,
    category: "地下与隧道结构",
    title: "预制箱涵",
    scene: "道路下穿 / 暗渠 / 管廊",
    text: "闭合箱体分节预制并现场拼装，适用于道路下穿、大型暗渠和综合管廊。",
  },
  {
    image: stationElementsImage,
    category: "地下与隧道结构",
    title: "装配式车站构件",
    scene: "地铁车站 / 地下枢纽",
    text: "通过预制梁、柱、楼板和侧墙拼装地下车站结构，缩短深基坑施工周期。",
  },
  {
    image: interlockingConcreteArmourUnitImage,
    category: "港口与海岸防护",
    title: "扭王字块",
    scene: "港口防波堤 / 海岸防护",
    text: "依靠特殊外形和块体间咬合形成稳定护面，适用于港口防波堤、海岸防护及其他受浪结构。",
  },
];

const lines = [
  {
    image: lineV1Image,
    kicker: "基础工艺架构",
    title: "智能预制梁生产线 V1.0",
    visual: "日产能：1 片",
    text: "面向梁型明确、产量稳定的项目，采用液压拆合模、移动台车、附着式振捣与一次张拉工艺，并按生产任务定义台座、模板和养护周转。",
  },
  {
    image: lineV2Image,
    kicker: "高周转工艺架构",
    title: "智能预制梁生产线 V2.0",
    visual: "日产能：2–4 片",
    text: "面向工期紧、产量高或场地受限的项目，采用带模蒸养、二次张拉与任意工位拆合模，并结合专业工位和自动摆渡，提高产线周转效率与生产弹性。",
  },
  {
    image: segmentalLineImage,
    kicker: "节段梁工艺架构",
    title: "智能节段梁生产线",
    visual: "日产能：2–3 片",
    text: "面向节段箱梁及多规格柔性生产项目，采用匹配段定位、节段专用模板与智能蒸养工艺，并根据节段规格和架设计划优化生产节拍，实现稳定、高效周转。",
  },
];

const products = [
  {
    image: hydraulicFormworkImage,
    title: "高精度液压模板",
    text: "通过液压系统实现模板同步拆合模与柔性梁型切换，5000 次开合循环后重复定位精度仍≤0.3 mm，合模间隙≤0.5 mm，保障批量构件的尺寸一致性。",
    features: ["同步液压拆合模", "柔性梁型切换", "中边梁共模"],
  },
  {
    image: castingBedSystemImage,
    title: "移动台座流转系统",
    text: "采用磷酸铁锂电池驱动台座在各工位间循环流转，定位精度±1 mm，最大承载80～120 t，电池充放电循环超过5000次，可将台座周转周期由传统5天缩短至1天。",
    features: ["锂电动力驱动", "自动识别工位", "精准就位"],
  },
  {
    image: concreteDistributionImage,
    title: "混凝土输布料系统",
    text: "通过鱼雷罐空中运料与轨道式遥控布料，实现混凝土约1分钟送达、布料分层偏差±5 mm，可减少37%作业人员、缩短40%单片浇筑时间，并降低20%混凝土损耗。",
    features: ["鱼雷罐空中运料", "轨道式遥控布料", "连续均匀浇筑"],
  },
  {
    image: vibrationSystemImage,
    title: "组合振捣系统",
    text: "采用附着式自动振捣与插入式引导振捣相结合的方式，自动覆盖≥80%的模体表面，深腔重点区域实现100%覆盖，仅需1～2人完成补充作业。",
    features: ["附着式自动振捣", "插入式引导振捣", "参数自动记录"],
  },
  {
    image: curingKilnImage,
    title: "智能蒸养系统",
    text: "采用带模养护与太阳能、空气能互补热源，将升降温速率控制精度保持在±2 ℃/h、窑内温差控制在≤3 ℃，养护8～14小时即可达到张拉强度，综合成本比天然气低49.6%、比生物颗粒低30.1%。",
    features: ["全程带模养护", "太阳能＋空气能", "智能温湿度控制"],
  },
  {
    image: lineManagementImage,
    title: "产线管理系统",
    text: "统一管理生产计划、设备状态和工序数据，工序联动响应时间≤1秒、数据采集频率≥1次/秒，可同时控制≥200个I/O点，并为每片梁建立独立电子档案，实现“一梁一档”全生命周期追溯。",
    features: ["工序统一调度", "一梁一档", "远程诊断运维"],
  },
];

const projects = [
  {
    image: shenhaiTj05Image,
    category: "高速公路",
    title: "G15沈海高速宁波南段TJ05标",
    line: "2 条 T 梁产线",
    coreEquipment: ["带模台车流转", "智能输布料", "附着式振捣", "蒸汽蒸养", "智能张拉"],
    product: "30 米 T 梁",
    output: "6 片/天",
  },
  {
    image: wenzhouBayBaseImage,
    category: "产业基地",
    title: "温州湾新区新型交通城建工业化基地",
    line: "4 条 T 梁产线",
    coreEquipment: ["带模台车流转", "固定液压开合模", "附着式振捣", "智能输布料", "复合能源蒸养"],
    product: "30 / 40 米 T 梁",
    output: "8–12 片/天",
  },
  {
    image: yongguanDongtouImage,
    category: "高速支线",
    title: "甬莞高速洞头支线项目",
    line: "2 条节段梁产线",
    coreEquipment: ["300 吨带模台车", "移动液压开合模", "附着式振捣", "智能输布料", "复合能源蒸养"],
    product: "节段梁",
    output: "6 片/天",
  },
  {
    image: guangaoTj5Image,
    category: "产线升级",
    title: "川主寺至红原高速项目（产线升级）",
    line: "既有产线升级",
    coreEquipment: ["智能输布料", "皮带机", "布料机"],
    product: "20 米 T 梁",
    output: "20 片/天",
  },
];

const capabilities = [
  {
    icon: Compass,
    image: researchDesignImage,
    title: "研发设计能力",
    headline: "从项目需求出发，定义整线方案",
    text: "研发团队覆盖机械设计、电气控制、液压系统、软件算法和工艺工程。我们根据梁型、产能、工期与场地条件完成协同设计，也可针对特殊项目共同开展工艺研究、装备开发和生产验证。",
    stats: [
      { value: "40+", label: "研发工程师" },
      { value: "50%+", label: "硕士占比" },
      { value: "5%", label: "年营收研发投入" },
      { value: "150+", label: "授权专利" },
    ],
  },
  {
    icon: Wrench,
    image: manufacturingCapabilityImage,
    title: "自主制造能力",
    headline: "关键装备自主制造，质量全过程可控",
    text: "66台套大型加工设备覆盖下料、折弯、机加工、焊接、表面处理、装配和测试全过程，支持大型非标装备的自主制造与全流程质量追溯。",
    stats: [
      { value: "66台套", label: "大型加工设备" },
      { value: "±0.005mm", label: "加工定位精度" },
      { value: "12台", label: "焊接机器人" },
      { value: "双认证", label: "ISO 9001 / 3834-2" },
    ],
  },
  {
    icon: HardHat,
    image: projectDeliveryCapabilityImage,
    title: "项目交付能力",
    headline: "不止交付设备，更负责产线顺利运行",
    text: "服务贯穿方案协同、生产制造、安装调试、整线联调、试生产、人员培训和运行支持，由项目团队统一协调土建、动力、起重与控制接口。",
    stats: [
      { value: "1年", label: "整机质保" },
      { value: "7×24", label: "在线响应" },
      { value: "60天", label: "完成安装调试" },
      { value: "2小时", label: "停产故障方案" },
    ],
  },
];

const companyProofs = [
  { value: "2008年", label: "成立并持续深耕" },
  { value: "150+亩", label: "自有生产基地" },
  { value: "6万+㎡", label: "装备制造厂房" },
  { value: "832867", label: "新三板证券代码" },
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
      <p className="mb-1.5 text-[16px] font-[850] tracking-[0.08em] text-brand-blue uppercase">{kicker}</p>
      <h2 className="text-[clamp(22px,2.6vw,30px)] leading-[1.18] font-[850] tracking-[-0.025em] text-ink">{title}</h2>
      <p className="mt-3 max-w-[710px] text-[16px] leading-[1.6] text-muted">{text}</p>
    </div>
  );
}

function Section({ id, soft = false, compactBottom = false, children }) {
  return (
    <section
      id={id}
      className={`${compactBottom ? "pt-[78px] pb-[34px] max-[720px]:pt-[62px] max-[720px]:pb-[28px]" : "py-[78px] max-[720px]:py-[62px]"} ${soft ? "bg-soft" : "bg-white"}`}
    >
      <div className="site-container">{children}</div>
    </section>
  );
}

function SectionCta({ children, onClick }) {
  return (
    <div className="mt-7 flex justify-center max-[720px]:hidden">
      <PrimaryButton dark onClick={() => onClick(children)}>{children}</PrimaryButton>
    </div>
  );
}

function PrecastTypeCarousel() {
  const trackRef = useRef(null);
  const [paused, setPaused] = useState(false);

  const getCardStep = (track) => {
    const card = track?.querySelector("[data-precast-card]");
    return card ? card.getBoundingClientRect().width + 16 : 0;
  };

  const jumpWithoutAnimation = (track, left) => {
    track.style.scrollBehavior = "auto";
    track.scrollLeft = left;
    window.requestAnimationFrame(() => track.style.removeProperty("scroll-behavior"));
  };

  const moveCarousel = (direction) => {
    const track = trackRef.current;
    const distance = getCardStep(track);
    if (!track || !distance) return;
    track.scrollBy({ left: direction * distance, behavior: "smooth" });
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;

    const moveToMiddleSet = () => {
      const step = getCardStep(track);
      if (step) jumpWithoutAnimation(track, step * precastTypes.length);
    };

    const frame = window.requestAnimationFrame(moveToMiddleSet);
    window.addEventListener("resize", moveToMiddleSet);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", moveToMiddleSet);
    };
  }, []);

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    const timer = window.setInterval(() => moveCarousel(1), 5200);
    return () => window.clearInterval(timer);
  }, [paused]);

  const handleLoopScroll = () => {
    const track = trackRef.current;
    const step = getCardStep(track);
    if (!track || !step) return;

    const setWidth = step * precastTypes.length;
    if (track.scrollLeft >= setWidth * 2) {
      jumpWithoutAnimation(track, track.scrollLeft - setWidth);
    } else if (track.scrollLeft <= setWidth * 0.25) {
      jumpWithoutAnimation(track, track.scrollLeft + setWidth);
    }
  };

  return (
    <div
      className="mt-9 border-t border-line pt-8"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="mb-2.5">
        <h3 className="text-[clamp(20px,2.2vw,26px)] font-[850] tracking-[-0.025em] text-brand-navy">预制构件适用类型</h3>
        <p className="mt-1.5 max-w-[760px] text-[13px] leading-[1.6] text-muted">根据不同的项目需求，可以通过产线生产不同的预制件。</p>
      </div>

      <div className="precast-carousel-shell">
        <button
          type="button"
          onClick={() => moveCarousel(-1)}
          aria-label="查看上一组预制构件"
          className="precast-carousel-control precast-carousel-control-left"
        >
          <ArrowLeft size={18} aria-hidden="true" />
        </button>
        <div
          ref={trackRef}
          className="precast-type-track"
          aria-label="预制构件适用类型轮播"
          onScroll={handleLoopScroll}
        >
          {[0, 1, 2].map((setIndex) =>
            precastTypes.map(({ image, title, scene, text }) => (
                <article
                  key={`${setIndex}-${title}`}
                  data-precast-card
                  aria-hidden={setIndex !== 1}
                  className="precast-type-card snap-start rounded-card border border-[#e6edf1] bg-white/90 p-5 shadow-[0_10px_28px_rgba(8,37,63,.045)]"
                >
                  <div className="relative -mx-5 -mt-5 aspect-video overflow-hidden rounded-t-card bg-[#edf2f5]">
                    <img
                      src={image}
                      alt={`${title}预制构件`}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-500 hover:scale-[1.025]"
                    />
                  </div>
                  <h4 className="mt-4 text-[18px] font-[850] tracking-[-0.02em] text-brand-navy">{title}</h4>
                  <div className="mt-3 flex min-h-8 items-start gap-1.5 rounded-lg bg-soft/75 px-2.5 py-2 text-[10px] font-[750] leading-[1.45] text-[#456072]">
                    <MapPin size={12} className="mt-0.5 shrink-0 text-brand-blue" aria-hidden="true" />
                    <span>{scene}</span>
                  </div>
                  <p className="mt-3 line-clamp-3 text-[12px] leading-[1.65] text-muted">{text}</p>
                </article>
            )),
          )}
        </div>
        <button
          type="button"
          onClick={() => moveCarousel(1)}
          aria-label="查看下一组预制构件"
          className="precast-carousel-control precast-carousel-control-right"
        >
          <ArrowRight size={18} aria-hidden="true" />
        </button>
      </div>
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
    ["核心设备", "#products"],
    ["项目案例", "#projects"],
    ["企业能力", "#capabilities"],
  ];

  return (
    <header className="sticky top-0 z-40 h-[70px] border-b border-white/10 bg-brand-navy/97 text-white backdrop-blur-xl max-[720px]:h-[62px]">
      <div className="site-container flex h-full items-center gap-6">
        <a href="/" aria-label="瑞捷首页" className="shrink-0">
          <img src={logoImage} alt="瑞捷机械 Logo" className="h-8 w-auto max-w-60 object-contain max-[720px]:h-[27px]" />
        </a>
        <nav className="ml-auto flex items-center gap-5 text-xs text-white/70 max-[1000px]:hidden" aria-label="主导航">
          {nav.map(([label, href]) => <a key={href} href={href} className="transition hover:text-white">{label}</a>)}
        </nav>
        <button onClick={() => onLead("免费获取产线定制方案")} className="rounded-lg bg-white px-3.5 py-2 text-xs font-[850] text-brand-navy max-[1000px]:ml-auto max-[720px]:hidden">免费获取产线定制方案</button>
        <LanguageSwitcher current="cn" />
        <button
          type="button"
          aria-label="打开导航"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((value) => !value)}
          className="hidden rounded-lg border border-white/15 p-2 text-white max-[1000px]:ml-0 max-[1000px]:block"
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
            <h1 className="max-w-[610px] text-[clamp(40px,3.65vw,58px)] leading-[1.18] font-[900] tracking-[-0.05em] max-[1000px]:text-[clamp(38px,5.2vw,50px)] max-[720px]:text-[34px]">
              一站式预制件智能产线解决方案
            </h1>
            <p className="mt-8 max-w-[570px] text-lg font-normal text-white/72 max-[720px]:text-[15px]">
              从产线规划、设备选型和定制，到安装及产能调优，由我们统筹交付。
            </p>
            <div className="mt-7.5 max-[720px]:hidden">
              <PrimaryButton onClick={() => onLead("免费获取产线定制方案")}>免费获取产线定制方案 <ArrowRight size={16} /></PrimaryButton>
            </div>
            <div className="mt-5 flex flex-wrap gap-2 max-[720px]:mt-7">
              {["高速公路", "桥梁", "轨道", "水利工程", "市政工程"].map((tag) => (
                <span key={tag} className="rounded-full border border-brand-cyan/35 bg-brand-navy/30 px-2.5 py-1.5 text-[12px] text-white/75 backdrop-blur-sm">{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </section>
      <div className="relative z-30 -mt-6">
        <div className="site-container">
          <div className="grid grid-cols-4 overflow-hidden rounded-[13px] border border-line bg-white shadow-card max-[720px]:grid-cols-2">
            {[["50%", "施工场地", "down"], ["30%", "现场工人", "down"], ["3 倍", "台车周转", "up"], ["50%", "蒸养时间", "down"]].map(([value, label, direction]) => (
              <div key={label} className="border-r border-line px-3.5 py-4 text-center last:border-r-0 max-[720px]:border-b max-[720px]:even:border-r-0">
                <strong className="flex items-center justify-center gap-1 text-[21px] font-[900] text-brand-navy">
                  {direction === "up" ? <ArrowUp size={19} strokeWidth={2.8} aria-hidden="true" /> : <ArrowDown size={19} strokeWidth={2.8} aria-hidden="true" />}
                  {value}
                </strong>
                <span className="text-[11px] text-muted">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

function LeadModal({ open, onClose, title }) {
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
    const body = createBeamFactoryEnquiryBody(form, { locale: "cn", title });
    setSubmissionState("submitting");

    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
      });

      if (!response.ok) throw new Error("Submission failed");
      trackLeadSuccess(form);
      form.reset();
      setSubmitted(true);
      setSubmissionState("success");
    } catch {
      trackLeadError(form);
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
            <h3 id="lead-title" className="mr-12 text-2xl font-[850] text-brand-navy">{title}</h3>
            <p className="mt-1.5 mb-5 text-xs text-muted">请填写姓名、邮箱和信息。</p>
            <form name={UNIVERSAL_ENQUIRY_FORM_NAME} method="POST" data-netlify="true" netlify-honeypot="bot-field" aria-busy={submissionState === "submitting"} onSubmit={handleSubmit}>
              <input type="hidden" name="form-name" value={UNIVERSAL_ENQUIRY_FORM_NAME} />
              <input type="hidden" name="bot-field" />
              <UniversalEnquiryFields locale="cn" submissionState={submissionState} />
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
  const [leadTitle, setLeadTitle] = useState("免费获取产线定制方案");
  const [progress, setProgress] = useState(0);
  const openLead = (title = "免费获取产线定制方案") => {
    setLeadTitle(title);
    setModalOpen(true);
  };

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

        <Section id="method" compactBottom>
          <SectionHeader
            kicker="方案形成流程"
            title="从项目条件到可运行的整线方案"
            text="先把生产任务、工期压力、场地限制、人员资源和当地条件定义清楚，再通过产线设计四步法，把项目需求转化为稳定产能。"
          />

          <div className="solution-journey">
            <aside className="solution-input-panel">
              <div className="solution-panel-header">
                <span className="section-index">01 · 项目输入</span>
                <h3>先把生产任务与<br />项目约束定义清楚</h3>
                <p className="solution-panel-description is-dark">生产任务、场地条件、人员资源和项目标准，共同决定产线工艺、布局和装备组合。</p>
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
                <h3>产线设计四步法</h3>
                <p className="solution-panel-description">从需求诊断、工艺规划、设备选型到产能调优，<br />每一步都围绕项目最终产能展开。</p>
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
          <PrecastTypeCarousel />
        </Section>

        <Section id="lines" soft>
          <SectionHeader
            kicker="典型产线工艺"
            title="以成熟技术为基础，共同定义适合项目的新工艺"
            text="我们已积累各类型预制件产线成熟工艺，对于特殊项目要求，与您共同完成工艺研究、方案设计、装备开发和生产验证。"
          />
          <div className="mobile-card-track grid grid-cols-3 gap-4 max-[1000px]:grid-cols-1">
            {lines.map(({ image, kicker, title, visual, text }) => (
              <article key={title} className="group overflow-hidden rounded-card border border-line bg-white shadow-card">
                <div className="relative aspect-video overflow-hidden bg-[#e4edf2]">
                  <img
                    src={image}
                    alt={`${title}示意图`}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.025]"
                  />
                  <span className="absolute top-3 right-3 rounded-md border border-white/15 bg-brand-navy/60 px-2.5 py-1.5 text-[11px] font-[850] text-white/95 shadow-sm backdrop-blur-[3px]">
                    {visual}
                  </span>
                </div>
                <div className="p-6">
                  <span className="text-[11px] font-[850] tracking-[0.08em] text-brand-blue uppercase">{kicker}</span>
                  <h3 className="mt-1.5 text-lg font-[850] text-brand-navy">{title}</h3>
                  <p className="mt-2 text-[13px] leading-[1.7] text-muted">{text}</p>
                </div>
              </article>
            ))}
          </div>
          <MobileScrollArrows />
          <SectionCta onClick={openLead}>与工程师沟通生产工艺</SectionCta>
        </Section>

        <Section id="products">
          <SectionHeader kicker="产线核心设备" title="围绕关键工序，组成适合项目的产线" text="不是简单地堆叠设备，而是根据产品、节拍和场地进行最佳组合。" />
          <div className="mobile-card-track grid grid-cols-3 gap-4 max-[1000px]:grid-cols-2 max-[720px]:grid-cols-1">
            {products.map(({ image, title, text, features }) => (
              <article key={title} className="group overflow-hidden rounded-card border border-line bg-white shadow-card">
                <div className="aspect-video overflow-hidden bg-[#e4edf2]">
                  <img
                    src={image}
                    alt={`${title}产品图`}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.025]"
                  />
                </div>
                <div className="p-5.5">
                  <h3 className="font-[850] text-brand-navy">{title}</h3>
                  <p className="mt-2 text-[13px] leading-[1.7] text-muted">{text}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {features.map((feature) => (
                      <span key={feature} className="rounded-md border border-brand-blue/10 bg-soft px-2.5 py-1.5 text-[11px] font-[800] text-brand-navy">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
          <MobileScrollArrows />
          <SectionCta onClick={openLead}>获取更多设备信息</SectionCta>
        </Section>

        <Section id="projects" soft>
          <SectionHeader
            kicker="项目案例"
            title="不同项目，得到不同的产线答案"
            text="已与国内头部施工总包单位合作，在多个项目上完成产线量产验证。"
          />
          <div className="mobile-card-track grid grid-cols-4 gap-4 max-[1000px]:grid-cols-2 max-[720px]:grid-cols-1">
            {projects.map(({ image, category, title, line, coreEquipment, product, output }) => (
              <article key={title} className="group flex h-full flex-col overflow-hidden rounded-card border border-line bg-white shadow-card transition duration-200 hover:-translate-y-1 hover:border-brand-blue/30">
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
                  <div className="absolute right-3 bottom-3 rounded-lg border border-white/15 bg-brand-navy/55 px-2.5 py-1.5 text-white backdrop-blur-sm">
                    <strong className="text-[13px] font-[900]">{product}</strong>
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-4.5">
                  <h3 className="line-clamp-2 min-h-[44px] text-[15px] font-[850] leading-[1.45] tracking-[-0.02em] text-brand-navy max-[720px]:min-h-0">{title}</h3>
                  <dl className="mt-3 flex flex-wrap gap-2">
                    <div className="min-w-[108px] flex-1 rounded-[9px] border border-line bg-soft px-3 py-2.5">
                      <dt className="text-[9px] font-[850] tracking-[0.06em] text-muted">产线规模</dt>
                      <dd className="mt-1 text-[11px] font-[850] text-brand-navy">{line}</dd>
                    </div>
                    <div className="min-w-[108px] flex-1 rounded-[9px] border border-line bg-soft px-3 py-2.5">
                      <dt className="text-[9px] font-[850] tracking-[0.06em] text-muted">日产能</dt>
                      <dd className="mt-1 text-[11px] font-[850] text-brand-navy">{output}</dd>
                    </div>
                  </dl>
                  <div className="mt-3 min-h-[152px] rounded-[9px] border border-brand-blue/10 bg-[#eef6f8] px-3 py-3 max-[720px]:min-h-0">
                    <div className="flex items-center gap-1.5 text-brand-blue">
                      <Settings size={13} aria-hidden="true" />
                      <span className="text-[10px] font-[850] tracking-[0.04em]">核心设备</span>
                    </div>
                    <div className="mt-2 grid grid-cols-2 gap-1.5">
                      {coreEquipment.map((equipment) => (
                        <span
                          key={equipment}
                          className="flex min-h-8 items-center rounded-md border border-brand-blue/10 bg-white px-2 py-1 text-[10px] font-[750] leading-[1.3] text-brand-navy"
                        >
                          {equipment}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <MobileScrollArrows />
          <SectionCta onClick={openLead}>了解更多案例</SectionCta>
        </Section>

        <Section id="capabilities">
          <SectionHeader
            kicker="为什么选择瑞捷"
            title="三种能力，把想法变成产能"
            text="瑞捷机械成立于2008年，是一家集产线规划、装备研发制造、安装调试、试生产和运行支持于一体的智慧梁厂解决方案提供商。"
          />
          <div className="mb-5 grid grid-cols-4 overflow-hidden rounded-card border border-line bg-white text-center shadow-card max-[720px]:grid-cols-2">
            {companyProofs.map(({ value, label }) => (
              <div key={label} className="border-r border-line px-5 py-4 last:border-r-0 max-[720px]:border-b max-[720px]:nth-[2n]:border-r-0 max-[720px]:nth-[n+3]:border-b-0">
                <strong className="block text-[20px] font-[900] tracking-[-0.025em] text-brand-navy">{value}</strong>
                <span className="mt-1 block text-[11px] text-muted">{label}</span>
              </div>
            ))}
          </div>
          <div className="mobile-card-track grid grid-cols-3 gap-4 max-[1000px]:grid-cols-1">
            {capabilities.map(({ icon, image, title, headline, text, stats }, index) => (
              <article key={title} className="group flex flex-col overflow-hidden rounded-card border border-line bg-white shadow-card max-[1000px]:grid max-[1000px]:grid-cols-[minmax(260px,0.8fr)_minmax(0,1.2fr)] max-[720px]:block">
                {image ? (
                  <div className="aspect-video shrink-0 overflow-hidden bg-[#e4edf2] max-[1000px]:aspect-auto max-[1000px]:h-full max-[720px]:aspect-video max-[720px]:h-auto">
                    <img
                      src={image}
                      alt={`${title}配图`}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.025]"
                    />
                  </div>
                ) : (
                  <VisualPanel icon={icon} index={`0${index + 1}`} />
                )}
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-lg font-[850] text-brand-navy">{title}</h3>
                  <p className="mt-1.5 text-[14px] font-[850] leading-[1.5] text-brand-blue">{headline}</p>
                  <p className="mt-3 text-[13px] leading-[1.7] text-muted">{text}</p>
                  <div className="mt-auto grid grid-cols-2 gap-2 border-t border-line pt-4">
                    {stats.map(({ value, label }) => (
                      <div key={label} className="rounded-lg bg-soft px-3 py-2.5">
                        <strong className="block text-[15px] font-[900] text-brand-navy">{value}</strong>
                        <span className="mt-0.5 block text-[10px] leading-[1.35] text-muted">{label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
          <MobileScrollArrows />
          <SectionCta onClick={openLead}>预约专家沟通项目</SectionCta>
        </Section>

        <section className="hero-gradient py-[72px] text-white">
          <div className="site-container flex flex-col items-center text-center">
            <p className="mb-2 text-[13px] font-[850] tracking-[0.1em] text-[#8ce2e8] uppercase">开始您的项目</p>
            <h2 className="max-w-[760px] text-[clamp(28px,3.4vw,40px)] leading-[1.16] font-[850] tracking-[-0.03em]">获取专属于您的解决方案</h2>
            <p className="mt-3 max-w-[670px] text-[15px] text-white/68">告诉我们生产任务，开始规划你的预制梁产线</p>
            <PrimaryButton onClick={() => openLead("打开项目需求表")} className="mt-6 max-[720px]:hidden">打开项目需求表 <ArrowRight size={16} /></PrimaryButton>
          </div>
        </section>
      </main>

      <footer className="bg-[#051a2c] py-6 text-[11px] text-[#89a0b0]">
        <div className="site-container flex items-center justify-between gap-5 max-[720px]:flex-col max-[720px]:items-start">
          <span>© 2026 长沙瑞捷机械科技股份有限公司 版权所有</span>
          <div className="flex items-center gap-5 max-[720px]:flex-col max-[720px]:items-start max-[720px]:gap-2">
            <a href="../../privacy/cn/" className="underline decoration-white/20 underline-offset-4 transition hover:text-white">隐私政策</a>
            <ContactEmail />
          </div>
        </div>
      </footer>

      <MobileContactBar canonicalUrl="https://realjetech.com/marketing/precast-beam-factory/cn/" enquireLabel="询盘" enquiryTitle="免费获取产线定制方案" onEnquire={openLead} subject="预制梁生产线" />

      <LeadModal open={modalOpen} onClose={() => setModalOpen(false)} title={leadTitle} />
    </>
  );
}
