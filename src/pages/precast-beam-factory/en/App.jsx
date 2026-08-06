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
import { trackLeadError, trackLeadSuccess } from "../shared/analytics";
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
    title: "Production Brief",
    text: "Product types, quantities, schedule, and target daily output, including start-up and capacity ramp-up milestones",
  },
  {
    icon: MapPin,
    title: "Site Constraints",
    text: "Area, geometry, access roads, lifting, and storage conditions that shape layout and material flow",
  },
  {
    icon: CloudSun,
    title: "Workforce & Resources",
    text: "Skilled labour, climate, utilities, concrete supply, and local maintenance capability",
  },
  {
    icon: FileCheck,
    title: "Project Standards",
    text: "Design documents, local codes, acceptance criteria, and multidisciplinary engineering interfaces",
  },
];

const methods = [
  {
    icon: Search,
    title: "Needs Analysis",
    text: "Define the required products, quantities, schedule, specifications and operating constraints, then translate them into a clear production brief.",
    output: "Defined production brief",
  },
  {
    icon: Workflow,
    title: "Process Engineering",
    text: "Optimise the layout, balance takt times, remove bottlenecks and build in the flexibility required for efficient production.",
    output: "Process and layout design",
  },
  {
    icon: Settings,
    title: "Equipment Selection",
    text: "Select equipment that fits the process, local conditions and available maintenance capability.",
    output: "Project-specific equipment package",
  },
  {
    icon: CheckCircle,
    title: "Capacity Optimisation",
    text: "Continue from installation through commissioning, trial production and capacity validation until the line reaches stable output.",
    output: "Stable, validated capacity",
  },
];

const precastTypes = [
  {
    image: tBeamImage,
    title: "T-Girder",
    fullName: "Precast concrete T-girder",
    scene: "Expressways / Overpasses",
    text: "A mature, cost-effective solution commonly used for highway and overpass projects with spans of 20–50 m.",
  },
  {
    image: smallBoxGirderImage,
    title: "Box Girder",
    fullName: "Precast prestressed concrete box girder",
    scene: "Viaducts / Bridges / Municipal Roads",
    text: "Its hollow box section provides high torsional stiffness for urban viaducts, interchanges, curved bridges, and skew bridges.",
  },
  {
    image: segmentalBoxGirderImage,
    title: "Segmental Box Girder",
    fullName: "Precast segmental box girder",
    scene: "Urban Viaducts / Sea-crossing Bridges",
    text: "Factory-cast segments are assembled on site, suiting complex bridge geometry and projects where traffic disruption must be minimised.",
  },
  {
    image: uBeamImage,
    title: "U-Girder",
    fullName: "Precast concrete U-girder",
    scene: "Urban Rail",
    text: "Its low structural depth and side webs provide protection and noise shielding for elevated metro and light-rail sections.",
  },
  {
    image: iGirderImage,
    title: "I-Girder",
    fullName: "Precast concrete I-girder",
    scene: "Viaducts / Bridges / Composite Bridges",
    text: "Its efficient section works with a cast-in-place composite deck and is commonly used for bridge spans of 25–45 m.",
  },
  {
    image: fullSpanBoxGirderImage,
    title: "Full-Span Box Girder",
    fullName: "Full-span precast box girder",
    scene: "High-speed Rail / Urban Expressways",
    text: "Cast as a complete span and erected as one unit, it provides high flexural and torsional capacity for major transport projects.",
  },
  {
    image: doubleTSlabImage,
    title: "Double Tee",
    fullName: "Precast concrete double tee",
    scene: "Road Underpasses / Metro Stations",
    text: "Its integrated beam-and-slab section can directly form a roof slab or traffic surface after erection.",
  },
  {
    image: troughGirderImage,
    title: "Trough Girder",
    fullName: "Precast concrete trough girder",
    scene: "Rail / Pedestrian Bridges",
    text: "Its flat bottom slab and straight webs suit elevated metro sections and long-span prefabricated pedestrian bridges.",
  },
  {
    image: crashBarrierImage,
    title: "Traffic Barrier",
    fullName: "Precast concrete traffic barrier",
    scene: "Viaducts / Expressways / Bridges",
    text: "Installed along bridge edges or road medians to provide vehicle containment, guidance, and traffic separation.",
  },
  {
    image: tunnelSegmentImage,
    title: "Tunnel Segment",
    fullName: "Precast concrete tunnel lining segment",
    scene: "Metro / River-crossing and Mountain Tunnels",
    text: "Segments form the permanent load-bearing tunnel lining and require high dimensional accuracy, strength, and watertightness.",
  },
  {
    image: boxCulvertImage,
    title: "Box Culvert",
    fullName: "Precast reinforced-concrete box culvert",
    scene: "Road Underpasses / Channels / Utility Tunnels",
    text: "Closed box units are cast in sections and assembled on site for road underpasses, large channels, and utility tunnels.",
  },
  {
    image: stationElementsImage,
    title: "Station Structural Elements",
    fullName: "Precast station structural elements",
    scene: "Metro Stations / Underground Hubs",
    text: "Beams, columns, slabs, and side walls are assembled into underground station structures to shorten construction schedules.",
  },
  {
    image: interlockingConcreteArmourUnitImage,
    title: "Interlocking Concrete Armour Unit",
    fullName: "Interlocking concrete armour unit",
    scene: "Port Breakwaters / Coastal Protection",
    text: "Its interlocking geometry forms a stable armour layer for breakwaters, coastal protection and other wave-exposed structures.",
  },
];

const lines = [
  {
    image: lineV1Image,
    alt: "Realjet automated precast girder production line V1.0",
    kicker: "Standard Process Configuration",
    title: "Automated Precast Girder Production Line V1.0",
    visual: "1 girder/day",
    visualLabel: "Daily output: 1 girder",
    text: "Designed for projects with standardised girder types and stable output targets, the line integrates hydraulic mould opening and closing, rail-mounted mould transfer, external mould vibration and single-stage prestressing. Moulds, workstations and curing cycles are configured to match the production plan.",
  },
  {
    image: lineV2Image,
    alt: "Realjet automated precast girder production line V2.0",
    kicker: "High-Output Process Configuration",
    title: "Automated Precast Girder Production Line V2.0",
    visual: "2–4 girders/day",
    visualLabel: "Daily output: 2–4 girders",
    text: "Designed for schedule-critical, high-output or space-constrained projects, the line integrates in-mould steam curing, two-stage prestressing and mould opening and closing at any workstation. Dedicated workstations and automated transfer improve throughput and production flexibility.",
  },
  {
    image: segmentalLineImage,
    alt: "Realjet automated segmental girder production line",
    kicker: "Segmental Girder Process Configuration",
    title: "Automated Segmental Girder Production Line",
    visual: "2–3 segments/day",
    visualLabel: "Daily output: 2–3 segments",
    text: "Designed for segmental box girders and flexible production across multiple sizes, the line integrates match-cast positioning, dedicated segment moulds and automated steam curing. Takt time is optimised for the segment geometry and erection schedule to maintain stable output and efficient mould utilisation.",
  },
];

const products = [
  {
    image: hydraulicFormworkImage,
    alt: "Realjet high-precision hydraulic girder moulds",
    title: "High-Precision Hydraulic Moulds",
    text: "Synchronised hydraulic opening and closing supports multiple girder geometries. Repeat positioning accuracy remains within 0.3 mm after 5,000 cycles, while the mould joint gap remains within 0.5 mm, supporting consistent dimensions in batch production.",
    features: ["Synchronised Operation", "Flexible Geometry", "Shared Mould for Interior / Exterior Girders"],
  },
  {
    image: castingBedSystemImage,
    alt: "Realjet rail-mounted mould transfer system",
    title: "Rail-Mounted Mould Transfer System",
    text: "A lithium iron phosphate battery-powered trolley transfers girder moulds between workstations on floor-mounted rails. Positioning accuracy is ±1 mm, load capacity is 80–120 t depending on configuration, and battery life exceeds 5,000 charge cycles. The system reduces mould turnaround time from five days to one.",
    features: ["Battery-Powered Transfer", "Automatic Workstation Recognition", "±1 mm Positioning"],
  },
  {
    image: concreteDistributionImage,
    alt: "Realjet concrete conveying and placing system",
    title: "Concrete Conveying & Placing System",
    text: "An overhead concrete skip and a rail-mounted, remote-controlled distributor deliver concrete in approximately one minute, with layer thickness controlled to within ±5 mm. The system reduces labour requirements by 37%, casting time per girder by 40% and concrete loss by 20%.",
    features: ["Overhead Concrete Skip", "Rail-Mounted Concrete Distributor", "Continuous, Uniform Concrete Placement"],
  },
  {
    image: vibrationSystemImage,
    alt: "Realjet combined external and internal vibration system",
    title: "Combined Vibration System",
    text: "Automated external vibration covers at least 80% of the mould surface, while guided internal vibration provides 100% coverage of identified deep sections. Only one or two operators are required for manual touch-up vibration.",
    features: ["Automated External Vibration", "Guided Internal Vibration", "Automatic Process Logging"],
  },
  {
    image: curingKilnImage,
    alt: "Realjet automated steam curing system",
    title: "Automated Steam Curing System",
    text: "In-mould curing powered by complementary solar energy and air-source heat pumps controls heating and cooling rates within ±2 °C/h and chamber temperature variation within 3 °C. The required concrete strength for prestressing can be reached in 8–14 hours. Operating costs are 49.6% lower than natural gas and 30.1% lower than biomass pellets.",
    features: ["Full-Cycle Curing in the Mould", "Solar + Air-Source Heat Pumps", "Automated Temperature & Humidity Control"],
  },
  {
    image: lineManagementImage,
    alt: "Realjet production line management system",
    title: "Production Line Management System",
    text: "The system coordinates production plans, equipment status and process data, with a process interlock response within one second and data acquisition at least once per second. It supports at least 200 I/O points and creates a dedicated digital record for every girder.",
    features: ["Unified Process Scheduling", "Digital Record for Every Girder", "Remote Diagnostics & Support"],
  },
];

const projects = [
  {
    image: shenhaiTj05Image,
    alt: "G15 Shenhai Expressway Ningbo South Section Contract TJ05 precast production line",
    category: "Expressway",
    title: "G15 Shenhai Expressway, Ningbo South Section, Contract TJ05",
    line: "2 T-girder Lines",
    coreEquipment: ["Mould Transfer", "Concrete Placing", "Vibration", "Steam Curing", "Prestressing"],
    product: "30 m T-girders",
    output: "6 girders/day",
  },
  {
    image: wenzhouBayBaseImage,
    alt: "Wenzhou Bay New Area Industrialised Transport and Urban Construction Base precast production line",
    category: "Industrial Base",
    title: "Wenzhou Bay New Area Industrialised Transport and Urban Construction Base",
    line: "4 T-girder Lines",
    coreEquipment: ["Mould Transfer", "Hydraulic Moulds", "Vibration", "Concrete Placing", "Hybrid Curing"],
    product: "30 m and 40 m T-girders",
    output: "8–12 girders/day",
  },
  {
    image: yongguanDongtouImage,
    alt: "Yongguan Expressway Dongtou Spur Project precast production line",
    category: "Expressway Spur",
    title: "Yongguan Expressway Dongtou Spur Project",
    line: "2 Segmental Girder Lines",
    coreEquipment: ["300 t Mould Transfer System", "Hydraulic Moulds", "Vibration", "Concrete Placing", "Hybrid Curing"],
    product: "Segmental Girders",
    output: "6 segments/day",
  },
  {
    image: guangaoTj5Image,
    alt: "Chuanzhusi–Hongyuan Expressway Project precast production line",
    category: "Line Upgrade",
    title: "Chuanzhusi–Hongyuan Expressway Project",
    line: "Existing Line Upgrade",
    coreEquipment: ["Concrete Placing", "Belt Conveyor", "Distributor"],
    product: "20 m T-girders",
    output: "20 girders/day",
  },
];

const capabilities = [
  {
    icon: Compass,
    image: researchDesignImage,
    alt: "Realjet engineering and R&D capability",
    title: "Engineering & R&D",
    headline: "Translate project requirements into an integrated line design",
    text: "Our R&D team covers mechanical design, electrical control, hydraulics, software algorithms, and process engineering. We engineer around product type, capacity, schedule, and site constraints, and can jointly develop new processes and equipment for special projects.",
    stats: [
      { value: "40+", label: "R&D engineers" },
      { value: "50%+", label: "R&D Staff with Master’s Degrees" },
      { value: "5%", label: "Annual revenue invested in R&D" },
      { value: "150+", label: "Granted patents" },
    ],
  },
  {
    icon: Wrench,
    image: manufacturingCapabilityImage,
    alt: "Realjet in-house manufacturing facility",
    title: "In-House Manufacturing",
    headline: "Critical equipment manufactured in-house with end-to-end quality control",
    text: "Sixty-six large machines cover cutting, bending, machining, welding, surface treatment, assembly, and testing, supporting in-house manufacturing and full quality traceability for large custom-engineered systems.",
    stats: [
      { value: "66", label: "Major Manufacturing Equipment" },
      { value: "±0.005 mm", label: "Positioning Accuracy" },
      { value: "12", label: "Welding Robots" },
      { value: "Dual Certification", label: "ISO 9001 / ISO 3834-2" },
    ],
  },
  {
    icon: HardHat,
    image: projectDeliveryCapabilityImage,
    alt: "Realjet precast production line project delivery",
    title: "Project Delivery",
    headline: "Beyond equipment delivery, we support the line through stable operation",
    text: "Our scope extends from solution coordination and manufacturing to installation, integrated commissioning, trial production, training, and operating support, with one project team coordinating civil, power, lifting, and control interfaces.",
    stats: [
      { value: "1 year", label: "Equipment warranty" },
      { value: "24/7", label: "Remote Support" },
      { value: "60 days", label: "Installation & Commissioning" },
      { value: "2 hours", label: "Production Stoppage Response Time" },
    ],
  },
];

const companyProofs = [
  { value: "Since 2008", label: "Continuous industry focus" },
  { value: "100,000+ m²", label: "Company-owned production base" },
  { value: "60,000+ m²", label: "Equipment manufacturing facilities" },
  { value: "NEEQ-Listed Company", label: "Stock Code 832867" },
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
  const carouselRef = useRef(null);
  const trackRef = useRef(null);
  const [paused, setPaused] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [cycleVersion, setCycleVersion] = useState(0);

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

  const handleManualMove = (direction) => {
    moveCarousel(direction);
    setCycleVersion((version) => version + 1);
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
    const carousel = carouselRef.current;
    if (!carousel) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting && entry.intersectionRatio >= 0.35),
      { threshold: [0, 0.35] },
    );
    observer.observe(carousel);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible || paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    const timer = window.setInterval(() => moveCarousel(1), 5200);
    return () => window.clearInterval(timer);
  }, [cycleVersion, isVisible, paused]);

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
      ref={carouselRef}
      className="mt-9 border-t border-line pt-8"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="mb-2.5">
        <h3 className="text-[clamp(20px,2.2vw,26px)] font-[850] tracking-[-0.025em] text-brand-navy">Components the Line Can Produce</h3>
        <p className="mt-1.5 max-w-[760px] text-[13px] leading-[1.6] text-muted">Each production line can be configured to manufacture different precast concrete components according to project requirements.</p>
      </div>

      <div className="precast-carousel-shell">
        <button type="button" onClick={() => handleManualMove(-1)} aria-label="Previous precast components" className="precast-carousel-control precast-carousel-control-left">
          <ArrowLeft size={18} aria-hidden="true" />
        </button>
        <div ref={trackRef} className="precast-type-track" aria-label="Precast concrete component carousel" onScroll={handleLoopScroll}>
          {[0, 1, 2].map((setIndex) =>
            precastTypes.map(({ image, title, fullName, scene, text }) => (
              <article
                key={`${setIndex}-${title}`}
                data-precast-card
                aria-hidden={setIndex !== 1}
                className="precast-type-card snap-start rounded-card border border-[#e6edf1] bg-white/90 p-5 shadow-[0_10px_28px_rgba(8,37,63,.045)]"
              >
                <div className="relative -mx-5 -mt-5 aspect-video overflow-hidden rounded-t-card bg-[#edf2f5]">
                  <img src={image} alt={fullName} loading="lazy" className="h-full w-full object-cover transition duration-500 hover:scale-[1.025]" />
                </div>
                <h4 className="mt-4 text-[18px] font-[850] tracking-[-0.02em] text-brand-navy">{title}</h4>
                <div className="mt-3 flex min-h-8 items-start gap-1.5 rounded-lg bg-soft/75 px-2.5 py-2 text-[11px] font-[750] leading-[1.45] text-[#456072]">
                  <MapPin size={12} className="mt-0.5 shrink-0 text-brand-blue" aria-hidden="true" />
                  <span>{scene}</span>
                </div>
                <p className="mt-3 text-[13px] leading-[1.65] text-muted">{text}</p>
              </article>
            )),
          )}
        </div>
        <button type="button" onClick={() => handleManualMove(1)} aria-label="Next precast components" className="precast-carousel-control precast-carousel-control-right">
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
    ["Solution", "#method"],
    ["Lines", "#lines"],
    ["Equipment", "#products"],
    ["Projects", "#projects"],
    ["Capabilities", "#capabilities"],
  ];

  return (
    <header className="sticky top-0 z-40 h-[70px] border-b border-white/10 bg-brand-navy/97 text-white backdrop-blur-xl max-[720px]:h-[62px]">
      <div className="site-container flex h-full items-center gap-6 max-[720px]:gap-2">
        <a href="#top" aria-label="Realjet" className="shrink-0">
          <img src={logoImage} alt="Realjet logo" className="h-8 w-auto max-w-60 object-contain max-[720px]:h-[23px] max-[720px]:max-w-[160px]" />
        </a>
        <nav className="ml-auto flex items-center gap-5 text-xs text-white/70 max-[1100px]:hidden" aria-label="Main navigation">
          {nav.map(([label, href]) => <a key={href} href={href} className="transition hover:text-white">{label}</a>)}
        </nav>
        <button onClick={() => onLead("Get a Free Custom Plan")} className="rounded-lg bg-white px-3.5 py-2 text-xs font-[850] text-brand-navy max-[1100px]:ml-auto max-[720px]:hidden">Get a Free Custom Plan</button>
        <LanguageSwitcher current="en" />
        <button
          type="button"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((value) => !value)}
          className="hidden rounded-lg border border-white/15 p-2 text-white max-[1100px]:ml-0 max-[1100px]:block"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {menuOpen && (
        <nav className="absolute inset-x-0 top-full border-t border-white/10 bg-brand-navy px-5 py-4 shadow-floating min-[1101px]:hidden" aria-label="Mobile navigation">
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
            <h1 className="max-w-[650px] text-[clamp(38px,3.5vw,48px)] leading-[1.13] font-[900] tracking-[-0.045em] max-[1000px]:text-[clamp(36px,5vw,44px)] max-[720px]:text-[33px]">
              <span className="block">Turnkey Production Lines for</span>{" "}
              <span className="block">Precast Concrete Components</span>
            </h1>
            <p className="mt-8 max-w-[570px] text-lg font-normal text-white/72 max-[720px]:text-[15px]">
              From line planning, equipment selection, and customisation to installation and capacity optimisation, Realjet coordinates the complete delivery.
            </p>
            <div className="mt-7.5">
              <PrimaryButton onClick={() => onLead("Get a Free Custom Plan")} className="max-[720px]:w-full max-[720px]:max-w-[320px]">Get a Free Custom Plan <ArrowRight size={16} /></PrimaryButton>
            </div>
            <div className="mt-5 flex flex-wrap gap-2 max-[720px]:mt-7">
              {["Expressways", "Bridges", "Rail", "Water", "Municipal"].map((tag) => (
                <span key={tag} className="rounded-full border border-brand-cyan/35 bg-brand-navy/30 px-2.5 py-1.5 text-[12px] text-white/75 backdrop-blur-sm">{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </section>
      <div id="hero-metrics" className="relative z-30 -mt-6">
        <div className="site-container">
          <div className="grid grid-cols-4 overflow-hidden rounded-[13px] border border-line bg-white shadow-card max-[720px]:grid-cols-2">
            {[["50%", "Site Footprint", "down"], ["30%", "On-Site Workforce", "down"], ["3×", "Mould Transfer Efficiency", "up"], ["50%", "Steam Curing Time", "down"]].map(([value, label, direction]) => (
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
  const dialogRef = useRef(null);

  useEffect(() => {
    document.body.classList.toggle("modal-open", open);
    const siteShell = document.getElementById("site-shell");
    if (siteShell) {
      siteShell.inert = open;
      if (open) siteShell.setAttribute("aria-hidden", "true");
      else siteShell.removeAttribute("aria-hidden");
    }
    if (open) {
      setSubmitted(false);
      setSubmissionState("idle");
      requestAnimationFrame(() => closeRef.current?.focus());
    }
    return () => {
      document.body.classList.remove("modal-open");
      if (siteShell) {
        siteShell.inert = false;
        siteShell.removeAttribute("aria-hidden");
      }
    };
  }, [open]);

  useEffect(() => {
    const onKey = (event) => {
      if (!open) return;
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab") return;

      const dialog = dialogRef.current;
      if (!dialog) return;
      const focusable = Array.from(
        dialog.querySelectorAll(
          'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((element) => element.getAttribute("aria-hidden") !== "true" && element.offsetParent !== null);
      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!dialog.contains(document.activeElement)) {
        event.preventDefault();
        first.focus();
      } else if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const company = form.elements.company.value.trim();
    const country = form.elements.country.value.trim() || "Country not provided";
    const contactName = form.elements.contact_name.value.trim();
    const submissionTitle = `[${title}] ${company} - ${country} - ${contactName}`;
    const formData = new FormData(form);
    formData.set("title", submissionTitle);
    formData.set("subject", submissionTitle);
    const body = new URLSearchParams(formData).toString();
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
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#03111d]/75 p-5 backdrop-blur-lg max-[720px]:p-3" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="lead-title" className="relative max-h-[calc(100dvh-40px)] w-full max-w-[680px] overflow-auto rounded-[18px] bg-white p-7 shadow-[0_30px_90px_rgba(0,0,0,.35)] max-[720px]:max-h-[calc(100dvh-24px)] max-[720px]:rounded-[14px] max-[720px]:p-4">
        <button ref={closeRef} onClick={onClose} aria-label="Close" className="absolute top-3.5 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-soft text-brand-navy max-[720px]:top-2.5 max-[720px]:right-2.5 max-[720px]:h-8 max-[720px]:w-8"><X size={20} /></button>
        {submitted ? (
          <div className="py-10 text-center">
            <CheckCircle className="mx-auto mb-4 text-brand-cyan" size={48} />
            <strong className="block text-xl font-[850] text-brand-navy">Your Project Enquiry Has Been Submitted</strong>
            <p className="mt-2 text-xs text-muted">Thank you. A Realjet specialist will contact you using the details provided.</p>
            <button
              type="button"
              onClick={onClose}
              className="mx-auto mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-[9px] bg-brand-navy px-5 text-[13px] font-[850] text-white"
            >
              <ArrowLeft size={15} /> Return to Page
            </button>
          </div>
        ) : (
          <>
            <h3 id="lead-title" className="mr-12 text-2xl font-[850] text-brand-navy max-[720px]:text-xl">{title}</h3>
            <p className="mt-1.5 mb-5 text-xs text-muted max-[720px]:mb-3 max-[720px]:text-[11px] max-[720px]:leading-[1.4]">Company, contact name and business email are required. Add any available project details below.</p>
            <form name="precast-beam-factory-inquiry" method="POST" data-netlify="true" netlify-honeypot="bot-field" aria-busy={submissionState === "submitting"} onSubmit={handleSubmit}>
              <input type="hidden" name="form-name" value="precast-beam-factory-inquiry" />
              <input type="hidden" name="inquiry_topic" value={title} />
              <input type="hidden" name="title" defaultValue="" />
              <input type="hidden" name="subject" defaultValue="" />
              <input type="hidden" name="bot-field" />
              <fieldset disabled={submissionState === "submitting"} className="min-w-0 disabled:cursor-wait">
                <div className="grid grid-cols-2 gap-3.5 max-[720px]:gap-2">
                  <Field id="company" name="company" label="Company *" placeholder="Company name" icon={Building2} required />
                  <Field id="contact-name" name="contact_name" label="Contact Name *" placeholder="Your name" icon={User} required />
                  <Field id="country" name="country" label="Country / Region" placeholder="Project location" icon={MapPin} />
                  <Field id="email" name="email" label="Business Email *" placeholder="name@company.com" icon={Send} type="email" required />
                  <label className="col-span-2 block">
                    <span className="mb-1.5 block text-[11px] font-[850] text-[#3e5668] max-[720px]:mb-1 max-[720px]:text-[10px]">Project Details</span>
                    <textarea
                      name="project_details"
                      rows="4"
                      className="focus-control w-full resize-y rounded-lg border border-[#ccd8df] bg-[#fbfcfd] px-3 py-2.5 text-sm text-ink disabled:cursor-wait disabled:bg-[#eef2f5] disabled:text-muted max-[720px]:h-14 max-[720px]:resize-none max-[720px]:py-2 max-[720px]:text-xs"
                      placeholder="Briefly describe the product type, quantity, target output or schedule, site conditions, and current project stage. Leave unknown items blank."
                    />
                  </label>
                  <div className="col-span-2 flex items-start gap-2 text-[12px] leading-[1.5] text-muted max-[720px]:text-[10px] max-[720px]:leading-[1.35]">
                    <input id="privacy-acknowledgement" type="checkbox" name="privacy_acknowledgement" value="Privacy policy acknowledged" required className="mt-1 accent-brand-blue disabled:cursor-wait" />
                    <label htmlFor="privacy-acknowledgement">
                      I have read the{" "}
                      <a href="../../privacy/en/" target="_blank" rel="noopener noreferrer" className="font-[750] text-brand-blue underline decoration-brand-blue/30 underline-offset-2 hover:text-brand-navy">
                        Privacy Policy
                      </a>{" "}
                      and understand that Realjet will use my information to respond to this enquiry.
                    </label>
                  </div>
                </div>
                {submissionState === "error" && (
                  <p role="alert" className="mt-4 text-[12px] text-red-600">Submission failed. Please check your connection and try again, or contact us later.</p>
                )}
                <div className="mt-5 flex justify-end max-[720px]:mt-3">
                  <button type="submit" className="inline-flex min-h-12 min-w-[92px] items-center justify-center gap-2 rounded-[9px] bg-brand-navy px-5 text-[13px] font-[850] text-white disabled:cursor-wait disabled:opacity-75 max-[720px]:min-h-10 max-[720px]:w-full max-[720px]:text-xs">
                    {submissionState === "submitting" ? (
                      <><LoaderCircle className="animate-spin" size={17} aria-hidden="true" /> Submitting…</>
                    ) : (
                      <>Submit Project Details <Send size={15} /></>
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
      <span className="mb-1.5 block text-[11px] font-[850] text-[#3e5668] max-[720px]:mb-1 max-[720px]:text-[10px]">{label}</span>
      <span className="relative block">
        <Icon size={15} className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted" />
        <input id={id} className="focus-control w-full rounded-lg border border-[#ccd8df] bg-[#fbfcfd] py-2.5 pr-3 pl-9 text-sm text-ink disabled:cursor-wait disabled:bg-[#eef2f5] disabled:text-muted max-[720px]:py-2 max-[720px]:pr-2 max-[720px]:pl-8 max-[720px]:text-xs" {...props} />
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
      Email Us
    </a>
  );
}

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [leadTitle, setLeadTitle] = useState("Get a Free Custom Plan");
  const [progress, setProgress] = useState(0);
  const [showAllEquipment, setShowAllEquipment] = useState(false);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const leadTriggerRef = useRef(null);
  const openLead = (title = "Get a Free Custom Plan") => {
    leadTriggerRef.current = document.activeElement;
    setLeadTitle(title);
    setModalOpen(true);
  };
  const closeLead = () => {
    setModalOpen(false);
    window.requestAnimationFrame(() => leadTriggerRef.current?.focus?.());
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
      <div id="site-shell">
        <Header onLead={openLead} />
        <div className="fixed top-[69px] left-0 z-50 h-[3px] bg-gradient-to-r from-brand-cyan to-accent-orange max-[720px]:top-[61px]" style={{ width: `${progress}%` }} />
        <main>
        <Hero onLead={openLead} />

        <Section id="method" compactBottom>
          <SectionHeader
            kicker="Solution Development Process"
            title="From Project Inputs to a Production-Ready Line"
            text="We first define the production brief, schedule pressure, site constraints, workforce, resources, and local conditions. Our four-step line design method then converts those inputs into stable production capacity."
          />

          <div className="solution-journey">
            <aside className="solution-input-panel">
              <div className="solution-panel-header">
                <span className="section-index">01 · PROJECT INPUTS</span>
                <h3>Define the Production Brief &amp; Constraints</h3>
                <p className="solution-panel-description is-dark">The production brief, site constraints, workforce and resources, and project standards jointly determine the process, layout, and equipment package.</p>
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
                <span className="section-index text-brand-blue">02 · REALJET WORKFLOW</span>
                <h3>Four Steps to Design the Line</h3>
                <p className="solution-panel-description">Needs analysis, process engineering, equipment selection, and capacity optimisation keep every decision focused on the required final output.</p>
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
                    <span className="delivery-output">OUTPUT · {output}</span>
                  </article>
                ))}
              </div>
            </div>
          </div>
          <SectionCta onClick={openLead}>Get an Initial Line Plan</SectionCta>
          <PrecastTypeCarousel />
        </Section>

        <Section id="lines" soft>
          <SectionHeader
            kicker="Typical Production Line Configurations"
            title="Build on Proven Technology to Define the Right Process for Each Project"
            text="We have developed proven production processes for a wide range of precast concrete products. For special requirements, we work with customers on process development, solution design, equipment development, and production validation."
          />
          <div className="grid grid-cols-3 gap-4 max-[1000px]:grid-cols-1">
            {lines.map(({ image, alt, kicker, title, visual, visualLabel, text }) => (
              <article key={title} className="group overflow-hidden rounded-card border border-line bg-white shadow-card">
                <div className="relative aspect-video overflow-hidden bg-[#e4edf2]">
                  <img
                    src={image}
                    alt={alt}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.025]"
                  />
                  <span aria-label={visualLabel} className="absolute top-3 right-3 rounded-md border border-white/15 bg-brand-navy/60 px-2.5 py-1.5 text-[11px] font-[850] text-white/95 shadow-sm backdrop-blur-[3px]">
                    {visual}
                  </span>
                </div>
                <div className="p-6">
                  <span className="text-[11px] font-[850] tracking-[0.08em] text-brand-blue uppercase">{kicker}</span>
                  <h3 className="mt-1.5 text-lg font-[850] text-brand-navy">{title}</h3>
                  <p className="mt-2 text-[14px] leading-[1.7] text-muted">{text}</p>
                </div>
              </article>
            ))}
          </div>
          <SectionCta onClick={openLead}>Discuss Your Production Process</SectionCta>
        </Section>

        <Section id="products">
          <SectionHeader kicker="Core Production Equipment" title="Configure the Line Around Its Critical Operations" text="Equipment is not simply added to a list. Each system is selected and combined according to product type, takt time, and site conditions." />
          <div className="grid grid-cols-3 gap-4 max-[1000px]:grid-cols-2 max-[720px]:grid-cols-1">
            {products.map(({ image, alt, title, text, features }, index) => (
              <article key={title} className={`group overflow-hidden rounded-card border border-line bg-white shadow-card ${index >= 3 && !showAllEquipment ? "max-[720px]:hidden" : ""}`}>
                <div className="aspect-video overflow-hidden bg-[#e4edf2]">
                  <img
                    src={image}
                    alt={alt}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.025]"
                  />
                </div>
                <div className="p-5.5">
                  <h3 className="font-[850] text-brand-navy">{title}</h3>
                  <p className="mt-2 text-[14px] leading-[1.7] text-muted">{text}</p>
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
          {!showAllEquipment && (
            <button type="button" onClick={() => setShowAllEquipment(true)} className="mx-auto mt-6 hidden min-h-11 items-center justify-center rounded-[9px] border border-brand-blue/20 bg-white px-5 text-[13px] font-[850] text-brand-navy max-[720px]:flex">
              View All Equipment
            </button>
          )}
          <SectionCta onClick={openLead}>Request Equipment Details</SectionCta>
        </Section>

        <Section id="projects" soft>
          <SectionHeader
            kicker="Project References"
            title="Different Projects Require Different Production Lines"
            text="Realjet has delivered production lines for major transport and infrastructure projects and achieved stable production across multiple sites."
          />
          <div className="grid grid-cols-4 gap-4 max-[1000px]:grid-cols-2 max-[720px]:grid-cols-1">
            {projects.map(({ image, alt, category, title, line, coreEquipment, product, output }, index) => (
              <article key={title} className={`group flex h-full flex-col overflow-hidden rounded-card border border-line bg-white shadow-card transition duration-200 hover:-translate-y-1 hover:border-brand-blue/30 ${index >= 2 && !showAllProjects ? "max-[720px]:hidden" : ""}`}>
                <div className="relative aspect-video overflow-hidden bg-[#e4edf2]">
                  <img
                    src={image}
                    alt={alt}
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
                  <h3 className="min-h-[66px] text-[15px] font-[850] leading-[1.45] tracking-[-0.02em] text-brand-navy max-[720px]:min-h-0">{title}</h3>
                  <dl className="mt-3 flex flex-wrap gap-2">
                    <div className="min-w-[108px] flex-1 rounded-[9px] border border-line bg-soft px-3 py-2.5">
                      <dt className="text-[9px] font-[850] tracking-[0.06em] text-muted">LINE CONFIGURATION</dt>
                      <dd className="mt-1 text-[11px] font-[850] text-brand-navy">{line}</dd>
                    </div>
                    <div className="min-w-[108px] flex-1 rounded-[9px] border border-line bg-soft px-3 py-2.5">
                      <dt className="text-[9px] font-[850] tracking-[0.06em] text-muted">DAILY OUTPUT</dt>
                      <dd className="mt-1 text-[11px] font-[850] text-brand-navy">{output}</dd>
                    </div>
                  </dl>
                  <div className="mt-3 min-h-[152px] rounded-[9px] border border-brand-blue/10 bg-[#eef6f8] px-3 py-3 max-[720px]:min-h-0">
                    <div className="flex items-center gap-1.5 text-brand-blue">
                      <Settings size={13} aria-hidden="true" />
                      <span className="text-[10px] font-[850] tracking-[0.04em]">CORE EQUIPMENT</span>
                    </div>
                    <div className="mt-2 grid grid-cols-2 gap-1.5">
                      {coreEquipment.map((equipment) => (
                        <span key={equipment} className="flex min-h-8 items-center rounded-md border border-brand-blue/10 bg-white px-2 py-1 text-[10px] font-[750] leading-[1.3] text-brand-navy">
                          {equipment}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
          {!showAllProjects && (
            <button type="button" onClick={() => setShowAllProjects(true)} className="mx-auto mt-6 hidden min-h-11 items-center justify-center rounded-[9px] border border-brand-blue/20 bg-white px-5 text-[13px] font-[850] text-brand-navy max-[720px]:flex">
              View All Projects
            </button>
          )}
          <SectionCta onClick={openLead}>Request More Project References</SectionCta>
        </Section>

        <Section id="capabilities">
          <SectionHeader
            kicker="Why Realjet"
            title="Three Capabilities That Turn Ideas into Production Capacity"
            text="Founded in 2008, Realjet provides integrated precast girder plant solutions covering production-line planning, equipment R&D and manufacturing, installation and commissioning, trial production, and operations support."
          />
          <div className="mb-5 grid grid-cols-4 overflow-hidden rounded-card border border-line bg-white text-center shadow-card max-[720px]:grid-cols-2">
            {companyProofs.map(({ value, label }) => (
              <div key={label} className="border-r border-line px-5 py-4 last:border-r-0 max-[720px]:border-b max-[720px]:nth-[2n]:border-r-0 max-[720px]:nth-[n+3]:border-b-0">
                <strong className="block text-[20px] font-[900] tracking-[-0.025em] text-brand-navy">{value}</strong>
                <span className="mt-1 block text-[11px] text-muted">{label}</span>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-4 max-[1000px]:grid-cols-1">
            {capabilities.map(({ icon, image, alt, title, headline, text, stats }, index) => (
              <article key={title} className="group flex flex-col overflow-hidden rounded-card border border-line bg-white shadow-card max-[1000px]:grid max-[1000px]:grid-cols-[minmax(260px,0.8fr)_minmax(0,1.2fr)] max-[720px]:block">
                {image ? (
                  <div className="aspect-video shrink-0 overflow-hidden bg-[#e4edf2] max-[1000px]:aspect-auto max-[1000px]:h-full max-[720px]:aspect-video max-[720px]:h-auto">
                    <img
                      src={image}
                      alt={alt}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.025]"
                    />
                  </div>
                ) : (
                  <VisualPanel icon={icon} index={`0${index + 1}`} />
                )}
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-lg font-[850] text-brand-navy">{title}</h3>
                  <p className="mt-1.5 text-[14px] font-[850] leading-[1.5] text-brand-blue">{headline}</p>
                  <p className="mt-3 text-[14px] leading-[1.7] text-muted">{text}</p>
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
          <SectionCta onClick={openLead}>Book a Technical Consultation</SectionCta>
        </Section>

        <section id="final-cta" className="hero-gradient py-[72px] text-white">
          <div className="site-container flex flex-col items-center text-center">
            <p className="mb-2 text-[13px] font-[850] tracking-[0.1em] text-[#8ce2e8] uppercase">Start Your Project</p>
            <h2 className="max-w-[760px] text-[clamp(28px,3.4vw,40px)] leading-[1.16] font-[850] tracking-[-0.03em]">Get a Solution Engineered for Your Project</h2>
            <p className="mt-3 max-w-[670px] text-[15px] text-white/68">Tell us what you need to produce, and we will start planning your precast production line.</p>
            <PrimaryButton onClick={() => openLead("Tell Us About Your Project")} className="mt-6 max-[720px]:w-full max-[720px]:max-w-[320px]">Tell Us About Your Project <ArrowRight size={16} /></PrimaryButton>
          </div>
        </section>
        </main>

        <footer className="bg-[#051a2c] py-6 text-[11px] text-[#89a0b0] max-[720px]:pb-[calc(88px+env(safe-area-inset-bottom))]">
          <div className="site-container flex items-center justify-between gap-5 max-[720px]:flex-col max-[720px]:items-start">
            <span>© 2026 Changsha Ruijie Machinery Technology Co., Ltd. All rights reserved.</span>
            <div className="flex items-center gap-5 max-[720px]:flex-col max-[720px]:items-start max-[720px]:gap-2">
              <a href="../../privacy/en/" className="underline decoration-white/20 underline-offset-4 transition hover:text-white">Privacy Policy</a>
              <ContactEmail />
            </div>
          </div>
        </footer>

        <button
          onClick={() => openLead("Get a Free Custom Plan")}
          className="fixed right-3.5 bottom-[max(14px,env(safe-area-inset-bottom))] left-3.5 z-40 hidden min-h-12 items-center justify-center gap-2 rounded-[9px] bg-brand-cyan text-sm font-[900] text-brand-navy shadow-floating max-[720px]:flex"
        >
          Get a Free Custom Plan <ArrowRight size={16} />
        </button>
      </div>

      <LeadModal open={modalOpen} onClose={closeLead} title={leadTitle} />
    </>
  );
}
