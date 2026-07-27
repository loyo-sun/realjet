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

const inputs = [
  {
    icon: Package,
    title: "Production Brief",
    text: "Beam types, quantities, schedule, and target daily output, including start-up and capacity ramp-up milestones",
  },
  {
    icon: MapPin,
    title: "Site Constraints",
    text: "Area, geometry, access roads, lifting, and storage conditions that shape layout and material flow",
  },
  {
    icon: CloudSun,
    title: "Workforce & Resources",
    text: "Skilled labor, climate, utilities, concrete supply, and local maintenance capability",
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
    text: "Translate “We need a precast beam line” into “Produce Y box girders within X months to meet the project schedule,” then define the project scale, schedule, component specifications, and operating constraints.",
    output: "Defined production brief",
  },
  {
    icon: Workflow,
    title: "Process Engineering",
    text: "Optimize the layout, balance takt times, remove bottlenecks, and build in flexibility to maximize line efficiency without sacrificing production adaptability.",
    output: "Process and layout design",
  },
  {
    icon: Settings,
    title: "Equipment Selection",
    text: "Select equipment that fits the process: nothing beyond the process requirement, nothing incompatible with local conditions, and nothing that cannot be maintained locally.",
    output: "Project-fit equipment package",
  },
  {
    icon: CheckCircle,
    title: "Capacity Optimization",
    text: "Equipment arrival is the starting point. We continue through installation, standalone commissioning, integrated line commissioning, trial production, capacity validation, and ongoing optimization.",
    output: "Stable, validated capacity",
  },
];

const lines = [
  {
    image: lineV1Image,
    kicker: "Proven Base Process",
    title: "Smart Precast Beam Line V1.0",
    visual: "Daily Capacity: 1 Beam",
    text: "For projects with defined beam types and stable demand, the line combines hydraulic formwork opening and closing, casting-bed circulation, external vibration, and single-stage prestressing, with casting beds, formwork, and curing cycles configured around the production plan.",
  },
  {
    image: lineV2Image,
    kicker: "High-throughput Process",
    title: "Smart Precast Beam Line V2.0",
    visual: "Daily Capacity: 2–4 Beams",
    text: "For schedule-driven, high-output, or space-constrained projects, the line combines in-form steam curing, two-stage prestressing, and formwork opening and closing at any workstation with dedicated stations and automated transfer to improve throughput and production flexibility.",
  },
  {
    image: segmentalLineImage,
    kicker: "Segmental Beam Process",
    title: "Smart Segmental Beam Line",
    visual: "Daily Capacity: 2–3 Segments",
    text: "For segmental box-girder projects and flexible multi-size production, the line combines match-cast positioning, dedicated segment formwork, and intelligent steam curing, with takt time optimized around segment geometry and erection schedules for stable, efficient turnover.",
  },
];

const products = [
  {
    image: hydraulicFormworkImage,
    title: "High-Precision Hydraulic Formwork",
    text: "Hydraulically synchronized formwork opening and closing supports adaptable beam geometry. Repeat positioning accuracy remains ≤0.3 mm after 5,000 cycles, while the closed-form gap remains ≤0.5 mm for consistent dimensions across batch production.",
    features: ["Synchronized Hydraulic Operation", "Multi-Geometry Compatibility", "Common Form for Interior & Exterior Beams"],
  },
  {
    image: castingBedSystemImage,
    title: "Casting Bed Circulation System",
    text: "Lithium iron phosphate battery power moves casting beds between workstations with ±1 mm positioning accuracy and an 80–120 t maximum load. Battery life exceeds 5,000 charge cycles, while casting-bed turnover can be reduced from five days to one.",
    features: ["Lithium Battery Drive", "Automatic Station Recognition", "Precision Positioning"],
  },
  {
    image: concreteDistributionImage,
    title: "Concrete Conveying & Distribution System",
    text: "An overhead concrete skip and rail-mounted remote-controlled distributor deliver concrete in approximately one minute with ±5 mm layer-thickness accuracy, reducing labor by 37%, casting time per beam by 40%, and concrete loss by 20%.",
    features: ["Overhead Concrete Skip", "Rail-Mounted Distribution", "Continuous Uniform Casting"],
  },
  {
    image: vibrationSystemImage,
    title: "Combined Vibration System",
    text: "External automatic vibrators cover at least 80% of the form surface, while guided internal vibration covers 100% of critical deep sections. Only one to two operators are required for supplementary vibration.",
    features: ["Automatic External Vibration", "Guided Internal Vibration", "Automatic Parameter Records"],
  },
  {
    image: curingKilnImage,
    title: "Intelligent Steam Curing Chamber",
    text: "In-form curing with complementary solar and air-source heat maintains heating and cooling ramp accuracy within ±2 °C/h and chamber temperature variation within 3 °C. Prestressing strength can be reached in 8–14 hours, with operating costs 49.6% below natural gas and 30.1% below biomass pellets.",
    features: ["Full-Cycle In-Form Curing", "Solar + Air-Source Heat", "Intelligent Temperature & Humidity Control"],
  },
  {
    image: lineManagementImage,
    title: "Production Line Management System",
    text: "The system coordinates production plans, equipment status, and process data with ≤1-second operation-linkage response and a data collection frequency of at least once per second. It supports at least 200 I/O points and creates a dedicated digital record for every beam.",
    features: ["Unified Process Scheduling", "One Beam, One Record", "Remote Diagnostics & Support"],
  },
];

const projects = [
  {
    image: shenhaiTj05Image,
    category: "Expressway",
    title: "G15 Shenhai Expressway Ningbo South Section, TJ05",
    line: "2 T-beam lines",
    coreProducts: "Casting Bed Circulation System · Intelligent Steam Curing Chamber",
    product: "30 m T-beams",
    output: "6 beams/day",
  },
  {
    image: wenzhouBayBaseImage,
    category: "Industrial Base",
    title: "Industrialized Transportation & Urban Construction Base",
    line: "4 T-beam lines",
    coreProducts: "High-Precision Hydraulic Formwork · Production Line Management System",
    product: "30 / 40 m T-beams",
    output: "8–12 beams/day",
  },
  {
    image: yongguanDongtouImage,
    category: "Expressway Link",
    title: "Yongguan Expressway Dongtou Branch Project",
    line: "2 segmental beam lines",
    coreProducts: "High-Precision Hydraulic Formwork · Intelligent Steam Curing Chamber",
    product: "Segmental beams",
    output: "6 segments/day",
  },
  {
    image: guangaoTj5Image,
    category: "Expressway Expansion",
    title: "Guang'ao Expressway Guangzhu Section Expansion, TJ5",
    line: "7 T-beam lines",
    coreProducts: "Concrete Conveying & Distribution System · Combined Vibration System",
    product: "30 m T-beams",
    output: "12 beams/day",
  },
];

const capabilities = [
  {
    icon: Compass,
    image: researchDesignImage,
    title: "Engineering & R&D",
    headline: "Translate project requirements into an integrated line design",
    text: "Our R&D team covers mechanical design, electrical control, hydraulics, software algorithms, and process engineering. We engineer around beam type, capacity, schedule, and site constraints, and can jointly develop new processes and equipment for special projects.",
    stats: [
      { value: "40+", label: "R&D engineers" },
      { value: "50%+", label: "With master's degrees" },
      { value: "5%", label: "Annual revenue invested in R&D" },
      { value: "150+", label: "Granted patents" },
    ],
  },
  {
    icon: Wrench,
    image: manufacturingCapabilityImage,
    title: "In-house Manufacturing",
    headline: "Critical equipment manufactured in-house with end-to-end quality control",
    text: "Sixty-six sets of large-scale production equipment cover cutting, bending, machining, welding, surface treatment, assembly, and testing, supporting in-house production and full quality traceability for large custom-engineered systems.",
    stats: [
      { value: "66 sets", label: "Large production machines" },
      { value: "±0.005 mm", label: "Machining positioning accuracy" },
      { value: "12", label: "Welding robots" },
      { value: "Dual certified", label: "ISO 9001 / ISO 3834-2" },
    ],
  },
  {
    icon: HardHat,
    image: projectDeliveryCapabilityImage,
    title: "Project Delivery",
    headline: "Beyond equipment delivery, we support the line through stable operation",
    text: "Our scope extends from solution coordination and manufacturing to installation, integrated commissioning, trial production, training, and operating support, with one project team coordinating civil, power, lifting, and control interfaces.",
    stats: [
      { value: "1 year", label: "Equipment warranty" },
      { value: "24/7", label: "Online response" },
      { value: "60 days", label: "Installation and commissioning" },
      { value: "2 hours", label: "Downtime solution response" },
    ],
  },
];

const companyProofs = [
  { value: "Since 2008", label: "Continuous industry focus" },
  { value: "100,000+ m²", label: "Company-owned production base" },
  { value: "60,000+ m²", label: "Equipment manufacturing floor" },
  { value: "832867", label: "NEEQ stock code" },
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
    ["Solution", "#method"],
    ["Processes", "#lines"],
    ["Products", "#products"],
    ["Projects", "#projects"],
    ["Capabilities", "#capabilities"],
  ];

  return (
    <header className="sticky top-0 z-40 h-[70px] border-b border-white/10 bg-brand-navy/97 text-white backdrop-blur-xl max-[720px]:h-[62px]">
      <div className="site-container flex h-full items-center gap-6">
        <a href="#top" aria-label="Realjet" className="shrink-0">
          <img src={logoImage} alt="Realjet logo" className="h-8 w-auto max-w-60 object-contain max-[720px]:h-[27px]" />
        </a>
        <nav className="ml-auto flex items-center gap-5 text-xs text-white/70 max-[1100px]:hidden" aria-label="Main navigation">
          {nav.map(([label, href]) => <a key={href} href={href} className="transition hover:text-white">{label}</a>)}
        </nav>
        <button onClick={onLead} className="rounded-lg bg-white px-3.5 py-2 text-xs font-[850] text-brand-navy max-[1100px]:ml-auto max-[720px]:hidden">Get a Free Custom Line Plan</button>
        <LanguageSwitcher current="en" />
        <button
          type="button"
          aria-label="Open navigation"
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
            <h1 className="max-w-[650px] text-[clamp(38px,3.5vw,56px)] leading-[1.13] font-[900] tracking-[-0.045em] max-[1000px]:text-[clamp(36px,5vw,48px)] max-[720px]:text-[33px]">
              Turnkey Smart Precast Beam Production Line Solutions
            </h1>
            <p className="mt-8 max-w-[570px] text-lg font-normal text-white/72 max-[720px]:text-[15px]">
              One accountable team for line planning, equipment manufacturing, installation, commissioning, and production ramp-up.
            </p>
            <div className="mt-7.5 max-[720px]:hidden">
              <PrimaryButton onClick={onLead}>Get a Free Custom Line Plan <ArrowRight size={16} /></PrimaryButton>
            </div>
            <div className="mt-5 flex flex-wrap gap-2 max-[720px]:mt-7">
              {["Expressway Bridges", "Rail Transit", "Municipal Infrastructure"].map((tag) => (
                <span key={tag} className="rounded-full border border-brand-cyan/35 bg-brand-navy/30 px-2.5 py-1.5 text-[12px] text-white/75 backdrop-blur-sm">{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </section>
      <div className="relative z-30 -mt-6">
        <div className="site-container">
          <div className="grid grid-cols-4 overflow-hidden rounded-[13px] border border-line bg-white shadow-card max-[720px]:grid-cols-2">
            {[["50%", "Construction Footprint", "down"], ["30%", "On-site Workers", "down"], ["3×", "Casting Bed Cycle Rate", "up"], ["50%", "Steam-curing Time", "down"]].map(([value, label, direction]) => (
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
        <button ref={closeRef} onClick={onClose} aria-label="Close" className="absolute top-3.5 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-soft text-brand-navy"><X size={20} /></button>
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
            <h3 id="lead-title" className="mr-12 text-2xl font-[850] text-brand-navy">Get a Free Custom Line Plan</h3>
            <p className="mt-1.5 mb-5 text-xs text-muted">Company, contact name, and email are required. Add any available project details below.</p>
            <form name="precast-beam-factory-inquiry" method="POST" data-netlify="true" netlify-honeypot="bot-field" aria-busy={submissionState === "submitting"} onSubmit={handleSubmit}>
              <input type="hidden" name="form-name" value="precast-beam-factory-inquiry" />
              <input type="hidden" name="bot-field" />
              <fieldset disabled={submissionState === "submitting"} className="min-w-0 disabled:cursor-wait">
                <div className="grid grid-cols-2 gap-3.5 max-[720px]:grid-cols-1">
                  <Field id="company" name="company" label="Company *" placeholder="Company name" icon={Building2} required />
                  <Field id="contact-name" name="contact_name" label="Contact Name *" placeholder="Your name" icon={User} required />
                  <Field id="country" name="country" label="Country / Region" placeholder="Project location" icon={MapPin} />
                  <Field id="email" name="email" label="Business Email *" placeholder="name@company.com" icon={Send} type="email" required />
                  <label className="col-span-2 block max-[720px]:col-span-1">
                    <span className="mb-1.5 block text-[11px] font-[850] text-[#3e5668]">Project Details</span>
                    <textarea
                      name="project_details"
                      rows="4"
                      className="focus-control w-full resize-y rounded-lg border border-[#ccd8df] bg-[#fbfcfd] px-3 py-2.5 text-sm text-ink disabled:cursor-wait disabled:bg-[#eef2f5] disabled:text-muted"
                      placeholder="Briefly describe the beam type, quantity, target output or schedule, site conditions, and current project stage. Leave unknown items blank."
                    />
                  </label>
                  <label className="col-span-2 flex items-start gap-2 text-[11px] text-muted max-[720px]:col-span-1">
                    <input type="checkbox" name="contact_consent" value="Contact permitted" className="mt-1 accent-brand-blue disabled:cursor-wait" />
                    <span>I agree that Realjet may contact me regarding this project.</span>
                  </label>
                </div>
                {submissionState === "error" && (
                  <p role="alert" className="mt-4 text-[12px] text-red-600">Submission failed. Please check your connection and try again.</p>
                )}
                <div className="mt-5 flex justify-end">
                  <button type="submit" className="inline-flex min-h-12 min-w-[92px] items-center justify-center gap-2 rounded-[9px] bg-brand-navy px-5 text-[13px] font-[850] text-white disabled:cursor-wait disabled:opacity-75">
                    {submissionState === "submitting" ? (
                      <><LoaderCircle className="animate-spin" size={17} aria-hidden="true" /> Submitting…</>
                    ) : (
                      <>Submit <Send size={15} /></>
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
      Email Us
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

        <Section id="method">
          <SectionHeader
            kicker="Solution Development Process"
            title="From Project Inputs to a Production-ready Line"
            text="We first define the production brief, schedule pressure, site constraints, workforce, resources, and local conditions. Our four-step line design method then converts those inputs into stable production capacity."
          />

          <div className="solution-journey">
            <aside className="solution-input-panel">
              <div className="solution-panel-header">
                <span className="section-index">01 · PROJECT INPUTS</span>
                <h3>Define the Production Brief<br />and Project Constraints</h3>
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
                <p className="solution-panel-description">Needs analysis, process engineering, equipment selection, and capacity optimization keep every decision focused on the required final output.</p>
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
          <SectionCta onClick={openLead}>Share Your Project Inputs for an Initial Plan</SectionCta>
        </Section>

        <Section id="lines" soft>
          <SectionHeader
            kicker="Production Process Engineering"
            title="Proven Technology, Adapted and Advanced for Your Project"
            text="Our mature precast beam production processes provide a reliable starting point. For special requirements, we work with your team on process studies, solution engineering, equipment development, and production validation."
          />
          <div className="grid grid-cols-3 gap-4 max-[1000px]:grid-cols-1">
            {lines.map(({ image, kicker, title, visual, text }) => (
              <article key={title} className="group overflow-hidden rounded-card border border-line bg-white shadow-card">
                <div className="relative aspect-video overflow-hidden bg-[#e4edf2]">
                  <img
                    src={image}
                    alt={`${title} overview`}
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
          <SectionCta onClick={openLead}>Discuss the Production Process</SectionCta>
        </Section>

        <Section id="products">
          <SectionHeader kicker="Six Core Product Systems" title="Configured Around the Operations That Matter" text="Equipment is not simply added to a list. Each system is selected and combined according to beam type, takt time, and site conditions." />
          <div className="grid grid-cols-3 gap-4 max-[1000px]:grid-cols-2 max-[720px]:grid-cols-1">
            {products.map(({ image, title, text, features }) => (
              <article key={title} className="group overflow-hidden rounded-card border border-line bg-white shadow-card">
                <div className="aspect-video overflow-hidden bg-[#e4edf2]">
                  <img
                    src={image}
                    alt={title}
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
          <SectionCta onClick={openLead}>Get Product Details</SectionCta>
        </Section>

        <Section id="projects" soft>
          <SectionHeader
            kicker="Project References"
            title="Different Projects Require Different Production Lines"
            text="These references are based on Realjet projects under contract or already delivered. Line scale, precast products, and core equipment combinations were defined around the conditions of each project."
          />
          <div className="grid grid-cols-4 gap-4 max-[1000px]:grid-cols-2 max-[720px]:grid-cols-1">
            {projects.map(({ image, category, title, line, coreProducts, product, output }) => (
              <article key={title} className="group overflow-hidden rounded-card border border-line bg-white shadow-card transition duration-200 hover:-translate-y-1 hover:border-brand-blue/30">
                <div className="relative aspect-video overflow-hidden bg-[#e4edf2]">
                  <img
                    src={image}
                    alt={`${title} project`}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.025]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/55 via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 rounded-full border border-white/20 bg-brand-navy/55 px-2.5 py-1 text-[10px] font-[850] text-white backdrop-blur-sm">
                    {category}
                  </span>
                  <div className="absolute right-3 bottom-3 flex items-center gap-1.5 rounded-lg border border-white/15 bg-brand-navy/55 px-2.5 py-1.5 text-white backdrop-blur-sm">
                    <span className="text-[9px] text-white/60">Daily output</span>
                    <strong className="text-[13px] font-[900]">{output}</strong>
                  </div>
                </div>
                <div className="p-4.5">
                  <h3 className="text-[15px] font-[850] leading-[1.45] tracking-[-0.02em] text-brand-navy">{title}</h3>
                  <dl className="mt-3 flex flex-wrap gap-2">
                    <div className="min-w-[108px] flex-1 rounded-[9px] border border-line bg-soft px-3 py-2.5">
                      <dt className="text-[9px] font-[850] tracking-[0.06em] text-muted">LINE SCALE</dt>
                      <dd className="mt-1 text-[11px] font-[850] text-brand-navy">{line}</dd>
                    </div>
                    <div className="min-w-[108px] flex-1 rounded-[9px] border border-line bg-soft px-3 py-2.5">
                      <dt className="text-[9px] font-[850] tracking-[0.06em] text-muted">PRODUCT</dt>
                      <dd className="mt-1 text-[11px] font-[850] text-brand-navy">{product}</dd>
                    </div>
                  </dl>
                  <div className="mt-3 flex items-center gap-2.5 rounded-[9px] border border-brand-blue/10 bg-[#eef6f8] px-3 py-2.5">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-white text-brand-blue shadow-[0_5px_16px_rgba(8,37,63,.08)]">
                      <Settings size={14} aria-hidden="true" />
                    </div>
                    <div>
                      <span className="block text-[9px] font-[850] text-brand-blue">CORE PRODUCTS</span>
                      <strong className="mt-0.5 block text-[11px] font-[850] leading-[1.45] text-brand-navy">{coreProducts}</strong>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <SectionCta onClick={openLead}>Explore More Project References</SectionCta>
        </Section>

        <Section id="capabilities">
          <SectionHeader
            kicker="Why Realjet"
            title="Three Capabilities That Turn Ideas into Production Capacity"
            text="Founded in 2008, Realjet provides integrated smart precast beam factory solutions covering line planning, equipment engineering and manufacturing, installation, trial production, and operating support."
          />
          <div className="mb-5 grid grid-cols-4 overflow-hidden rounded-card border border-line bg-white shadow-card max-[720px]:grid-cols-2">
            {companyProofs.map(({ value, label }) => (
              <div key={label} className="border-r border-line px-5 py-4 last:border-r-0 max-[720px]:border-b max-[720px]:nth-[2n]:border-r-0 max-[720px]:nth-[n+3]:border-b-0">
                <strong className="block text-[20px] font-[900] tracking-[-0.025em] text-brand-navy">{value}</strong>
                <span className="mt-1 block text-[11px] text-muted">{label}</span>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-4 max-[1000px]:grid-cols-1">
            {capabilities.map(({ icon, image, title, headline, text, stats }, index) => (
              <article key={title} className="group flex flex-col overflow-hidden rounded-card border border-line bg-white shadow-card max-[1000px]:grid max-[1000px]:grid-cols-[minmax(260px,0.8fr)_minmax(0,1.2fr)] max-[720px]:block">
                {image ? (
                  <div className="aspect-video shrink-0 overflow-hidden bg-[#e4edf2] max-[1000px]:aspect-auto max-[1000px]:h-full max-[720px]:aspect-video max-[720px]:h-auto">
                    <img
                      src={image}
                      alt={title}
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
          <SectionCta onClick={openLead}>Book a Technical Consultation</SectionCta>
        </Section>

        <section className="hero-gradient py-[72px] text-white">
          <div className="site-container flex flex-col items-center text-center">
            <p className="mb-2 text-[13px] font-[850] tracking-[0.1em] text-[#8ce2e8] uppercase">Start Your Project</p>
            <h2 className="max-w-[760px] text-[clamp(28px,3.4vw,40px)] leading-[1.16] font-[850] tracking-[-0.03em]">Get a Solution Engineered for Your Project</h2>
            <p className="mt-3 max-w-[670px] text-[15px] text-white/68">Tell us what you need to produce, and we will start planning your precast beam line.</p>
            <PrimaryButton onClick={openLead} className="mt-6 max-[720px]:hidden">Open Project Enquiry <ArrowRight size={16} /></PrimaryButton>
          </div>
        </section>
      </main>

      <footer className="bg-[#051a2c] py-6 text-[11px] text-[#89a0b0]">
        <div className="site-container flex items-center justify-between gap-5 max-[720px]:flex-col max-[720px]:items-start">
          <span>© 2026 Changsha ruijie machinary technology co.LTD. All rights reserved.</span>
          <div className="flex items-center gap-5 max-[720px]:flex-col max-[720px]:items-start max-[720px]:gap-2">
            <span>Turnkey precast beam factory solutions</span>
            <ContactEmail />
          </div>
        </div>
      </footer>

      <button onClick={openLead} className="fixed right-3.5 bottom-3.5 left-3.5 z-40 hidden min-h-12 items-center justify-center gap-2 rounded-[9px] bg-brand-cyan text-sm font-[900] text-brand-navy shadow-floating max-[720px]:flex">
        Get a Free Custom Line Plan <ArrowRight size={16} />
      </button>

      <LeadModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
