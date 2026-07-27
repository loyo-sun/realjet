import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Cable,
  Check,
  CheckCircle,
  ChevronDown,
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
    title: "Tight Schedule",
    text: "Fixed delivery milestones leave little time for production ramp-up, while conventional labor-heavy operations struggle to maintain a stable takt.",
    impact: "Unstable output puts delivery dates at risk",
  },
  {
    icon: Map,
    title: "Limited Space",
    text: "Long, narrow, irregular, or divided sites demand careful planning of workstations, logistics routes, and beam storage.",
    impact: "Poor layout wastes valuable site area",
  },
  {
    icon: Users,
    title: "Labor Shortage",
    text: "Critical operations such as formwork, vibration, and curing rely on skilled workers, increasing training and quality-control pressure.",
    impact: "Workforce changes affect consistent quality",
  },
  {
    icon: Cable,
    title: "Complex Coordination",
    text: "Civil works, equipment, utilities, lifting, and controls involve multiple parties. Without unified planning, interface gaps are likely.",
    impact: "Unclear ownership causes rework and delays",
  },
];

const inputs = [
  { icon: Package, title: "Production Targets", text: "Beam types, quantities, schedule, and target daily output" },
  { icon: MapPin, title: "Site Conditions", text: "Area, geometry, access roads, lifting, and storage zones" },
  { icon: CloudSun, title: "Operating Environment", text: "Climate, utilities, concrete supply, and maintenance conditions" },
  { icon: FileCheck, title: "Project Standards", text: "Design documents, local codes, and acceptance criteria" },
];

const methods = [
  { icon: Search, title: "Requirement Review", text: "Clarify production targets, site constraints, and project priorities.", output: "Project requirement brief" },
  { icon: Workflow, title: "Process Planning", text: "Define takt time, workstations, logistics, and plant layout.", output: "Process and layout plan" },
  { icon: Settings, title: "System Configuration", text: "Match core equipment, control systems, and engineering interfaces.", output: "Integrated line configuration" },
  { icon: CheckCircle, title: "Delivery Validation", text: "Complete installation, commissioning, trial production, training, and issue closure.", output: "Production-ready line" },
];

const lines = [
  {
    image: lineV1Image,
    kicker: "Proven Base Configuration",
    title: "Smart Precast Beam Line V1.0",
    visual: "Fixed Formwork · Mobile Carriage · Single-stage Tensioning",
    text: "For projects with defined beam types and stable demand, the casting beds, formwork, and curing cycle are configured around the production plan.",
    metrics: ["Approx. 1–2 beams/day/line*", "Approx. 2–3-day cycle*"],
  },
  {
    image: lineV2Image,
    kicker: "High-throughput Configuration",
    title: "Smart Precast Beam Line V2.0",
    visual: "Flow Stations · Two-stage Tensioning · Automated Transfer",
    text: "For high-output, schedule-driven, or space-constrained projects, dedicated stations and staged tensioning improve throughput and land use.",
    metrics: ["Approx. 2–4 beams/day/line*", "More compact footprint*"],
  },
  {
    image: segmentalLineImage,
    kicker: "Segmental Beam Configuration",
    title: "Smart Segmental Beam Line",
    visual: "Match-cast Positioning · Segment Formwork · Smart Steam Curing",
    text: "For segmental box-girder projects, match-cast positioning, formwork, and curing are defined around segment geometry and erection schedules.",
    metrics: ["Approx. 2–3 segments/day*", "Flexible multi-size production*"],
  },
];

const products = [
  {
    image: hydraulicFormworkImage,
    code: "FORMING",
    title: "High-precision Hydraulic Formwork",
    text: "Custom-engineered for each beam type with hydraulic closing, opening, and critical dimensional adjustment.",
    value: "Less manual handling and more consistent geometry",
  },
  {
    image: castingBedSystemImage,
    code: "FLOW",
    title: "Mobile Casting Bed Circulation System",
    text: "Moves the beam between dedicated stations so formwork and casting beds can enter the next cycle sooner.",
    value: "Faster circulation and better site organization",
  },
  {
    image: concreteDistributionImage,
    code: "CONCRETE",
    title: "Concrete Conveying & Distribution System",
    text: "Connects the batching plant to casting stations for concrete conveying, weighing, and zoned distribution.",
    value: "Shorter supply routes and less manual coordination",
  },
  {
    image: vibrationSystemImage,
    code: "COMPACTION",
    title: "Combined Vibration System",
    text: "Combines external and internal vibration methods to suit the component and centrally control key parameters.",
    value: "Higher concrete density and process consistency",
  },
  {
    image: curingKilnImage,
    code: "CURING",
    title: "Smart Steam-curing Kiln",
    text: "Controls steam-curing temperature, humidity, and time profiles according to climate and strength requirements.",
    value: "Consistent curing and faster production turnover",
  },
  {
    image: lineManagementImage,
    code: "MANAGEMENT",
    title: "Production Line Management System",
    text: "Centralizes production plans, equipment status, operation progress, and critical process data.",
    value: "Greater visibility, coordination, and traceability",
  },
];

const projects = [
  {
    image: shenhaiTj05Image,
    category: "Expressway",
    title: "G15 Shenhai Expressway Ningbo South Section, TJ05",
    line: "2 T-beam lines",
    process: "In-form steam curing · Two-stage tensioning",
    product: "30 m T-beams",
    output: "6 beams/day",
  },
  {
    image: wenzhouBayBaseImage,
    category: "Industrial Base",
    title: "Industrialized Transportation & Urban Construction Base",
    line: "4 T-beam lines",
    process: "In-form steam curing · Two-stage tensioning",
    product: "30 / 40 m T-beams",
    output: "8–12 beams/day",
  },
  {
    image: yongguanDongtouImage,
    category: "Expressway Link",
    title: "Yongguan Expressway Dongtou Branch Project",
    line: "2 segmental beam lines",
    process: "In-form steam curing",
    product: "Segmental beams",
    output: "6 segments/day",
  },
  {
    image: guangaoTj5Image,
    category: "Expressway Expansion",
    title: "Guang'ao Expressway Guangzhu Section Expansion, TJ5",
    line: "7 T-beam lines",
    process: "In-form steam curing",
    product: "30 m T-beams",
    output: "12 beams/day",
  },
];

const capabilities = [
  {
    icon: Compass,
    image: researchDesignImage,
    title: "Engineering & R&D",
    text: "Continuous development in precast beam formwork, mobile carriages, smart curing, and control software supports project-specific engineering.",
    points: [
      "Software copyrights covering smart beam factory formwork control systems",
      "Patents for smart curing chambers, mobile in-form carriages, and end-form removal devices",
      "Recognized as a Hunan Specialized and Innovative SME (2025–2028)",
    ],
  },
  {
    icon: Wrench,
    image: manufacturingCapabilityImage,
    title: "In-house Manufacturing",
    text: "Our own manufacturing base covers the critical stages required to build large, custom-engineered equipment.",
    points: ["Cutting, bending, machining, welding, and surface treatment", "Mechanical, hydraulic, and electrical integration with final assembly", "In-process inspection, factory testing, and traceable quality records"],
  },
  {
    icon: HardHat,
    image: projectDeliveryCapabilityImage,
    title: "Project Delivery",
    text: "A dedicated project manager coordinates engineering, manufacturing, and site teams from installation through stable line operation.",
    points: ["Define civil works, power, lifting, and client-side interfaces", "Complete installation, standalone tests, line commissioning, and trial production", "Provide operation and maintenance training plus ongoing support"],
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

function LanguageSwitcher() {
  return (
    <details className="group relative shrink-0 max-[720px]:ml-auto">
      <summary className="flex min-h-9 cursor-pointer list-none items-center gap-1.5 rounded-lg border border-white/15 px-2.5 text-[11px] font-[750] text-white/80 transition hover:border-white/30 hover:text-white [&::-webkit-details-marker]:hidden">
        <span aria-hidden="true">🇬🇧</span>
        <span>English</span>
        <ChevronDown size={13} className="transition group-open:rotate-180" aria-hidden="true" />
      </summary>
      <div className="absolute top-[calc(100%+8px)] right-0 z-50 min-w-[138px] overflow-hidden rounded-lg border border-white/10 bg-brand-navy p-1.5 shadow-floating">
        <a href="../cn/" lang="zh-CN" className="flex items-center gap-2 rounded-md px-3 py-2 text-[12px] text-white/70 transition hover:bg-white/5 hover:text-white">
          <span aria-hidden="true">🇨🇳</span> 中文
        </a>
        <a href="../en/" lang="en" aria-current="page" className="flex items-center gap-2 rounded-md bg-white/8 px-3 py-2 text-[12px] text-white">
          <span aria-hidden="true">🇬🇧</span> English
        </a>
      </div>
    </details>
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
        <button onClick={onLead} className="rounded-lg bg-white px-3.5 py-2 text-xs font-[850] text-brand-navy max-[1100px]:ml-auto max-[720px]:hidden">Discuss Your Project</button>
        <LanguageSwitcher />
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
            <p className="mb-4 flex items-center gap-3 text-[14px] font-[850] tracking-[0.08em] text-[#8ce2e8] before:h-0.5 before:w-7 before:bg-brand-cyan max-[720px]:text-[13px]">
              Turnkey Precast Beam Factory Solutions
            </p>
            <h1 className="max-w-[650px] text-[clamp(38px,3.5vw,56px)] leading-[1.13] font-[900] tracking-[-0.045em] max-[1000px]:text-[clamp(36px,5vw,48px)] max-[720px]:text-[33px]">
              A Precast Beam Factory Engineered Around Your Site and Production Plan
            </h1>
            <p className="mt-8 max-w-[570px] text-lg font-normal text-white/72 max-[720px]:text-[15px]">
              One accountable team for line planning, equipment manufacturing, installation, commissioning, and production ramp-up.
            </p>
            <div className="mt-7.5 max-[720px]:hidden">
              <PrimaryButton onClick={onLead}>Discuss Your Project <ArrowRight size={16} /></PrimaryButton>
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
            {[["Since 2008", "Industry experience"], ["100,000+ m²", "Production base"], ["60,000+ m²", "Manufacturing facilities"], ["150+", "Granted patents"]].map(([value, label]) => (
              <div key={label} className="border-r border-line px-3.5 py-4 text-center last:border-r-0 max-[720px]:border-b max-[720px]:even:border-r-0">
                <strong className="block text-[21px] font-[900] text-brand-navy">{value}</strong>
                <span className="text-[11px] text-muted">{label}</span>
              </div>
            ))}
          </div>
          <p className="mt-3 text-center text-[13px] font-[650] text-[#526b7d] max-[720px]:px-5 max-[720px]:text-[12px]">
            Realjet is an integrated production-line solution provider with over a decade of experience and in-house engineering and manufacturing capabilities.
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
            <h3 id="lead-title" className="mr-12 text-2xl font-[850] text-brand-navy">Discuss Your Project</h3>
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

        <Section id="challenges">
          <SectionHeader
            kicker="Project Challenges"
            title="Building a Beam Factory Takes More Than Buying Equipment"
            text="From project targets to stable production, these four challenges often occur together. They are why every production line must be engineered around actual project conditions."
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
                  <span className="mb-1 block text-[10px] font-[900] tracking-[0.13em] text-brand-blue/65">PROJECT IMPACT</span>
                  <p className="flex items-center gap-1.5 text-[12px] font-[850] text-brand-navy">
                    {impact}
                    <ArrowRight size={13} className="text-brand-cyan transition group-hover:translate-x-1" aria-hidden="true" />
                  </p>
                </div>
              </article>
            ))}
          </div>
          <SectionCta onClick={openLead}>Request a Project Assessment</SectionCta>
        </Section>

        <Section id="method" soft>
          <SectionHeader
            kicker="How the Solution Is Developed"
            title="From Project Inputs to a Production-ready Line"
            text="We do not begin with an equipment list. We first define production targets and site conditions, then develop the process, system configuration, and delivery plan."
          />

          <div className="solution-journey">
            <aside className="solution-input-panel">
              <div className="solution-panel-header">
                <span className="section-index">01 · PROJECT INPUTS</span>
                <h3>Define the Project<br />Before the Line</h3>
                <p className="solution-panel-description is-dark">Four groups of inputs determine the layout, takt time, and equipment combination.</p>
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
                <span className="section-index text-brand-blue">02 · REALJET DELIVERY PROCESS</span>
                <h3>Turn Project Inputs into<br />a Working Production System</h3>
                <p className="solution-panel-description">Requirement review, process planning, system configuration, and delivery validation progressively turn the concept into production capacity.</p>
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
          <SectionCta onClick={openLead}>Share Your Project Inputs</SectionCta>
        </Section>

        <Section id="lines">
          <SectionHeader
            kicker="Production Process Engineering"
            title="Proven Technology, Adapted and Advanced for Your Project"
            text="Our mature precast beam production processes provide a reliable starting point. For special requirements, we work with your team on process studies, solution engineering, equipment development, and production validation."
          />
          <div className="grid grid-cols-3 gap-4 max-[1000px]:grid-cols-1">
            {lines.map(({ image, kicker, title, visual, text, metrics }) => (
              <article key={title} className="group overflow-hidden rounded-card border border-line bg-white shadow-card">
                <div className="relative aspect-video overflow-hidden bg-[#e4edf2]">
                  <img
                    src={image}
                    alt={`${title} overview`}
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
          <SectionCta onClick={openLead}>Discuss the Production Process</SectionCta>
        </Section>

        <Section id="products" soft>
          <SectionHeader kicker="Six Core Product Systems" title="Configured Around the Operations That Matter" text="Equipment is not simply added to a list. Each system is selected and combined according to beam type, takt time, and site conditions." />
          <div className="grid grid-cols-3 gap-4 max-[1000px]:grid-cols-2 max-[720px]:grid-cols-1">
            {products.map(({ image, code, title, text, value }) => (
              <article key={title} className="group overflow-hidden rounded-card border border-line bg-white shadow-card">
                <div className="aspect-video overflow-hidden bg-[#e4edf2]">
                  <img
                    src={image}
                    alt={title}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.025]"
                  />
                </div>
                <div className="p-5.5">
                  <span className="text-[10px] font-[900] tracking-[0.1em] text-brand-blue">{code}</span>
                  <h3 className="mt-1.5 font-[850] text-brand-navy">{title}</h3>
                  <p className="mt-2 text-[13px] leading-[1.7] text-muted">{text}</p>
                  <p className="mt-3 border-t border-line pt-3 text-[12px] font-[850] text-brand-navy">Project value: {value}</p>
                </div>
              </article>
            ))}
          </div>
          <SectionCta onClick={openLead}>Get Product Details</SectionCta>
        </Section>

        <Section id="projects">
          <SectionHeader
            kicker="Project References"
            title="Different Projects Require Different Production Lines"
            text="These references are based on Realjet projects under contract or already delivered. Line capacity, production process, and equipment configuration were defined for each project's conditions."
          />
          <div className="grid grid-cols-4 gap-4 max-[1000px]:grid-cols-2 max-[720px]:grid-cols-1">
            {projects.map(({ image, category, title, line, process, product, output }) => (
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
                      <Workflow size={14} aria-hidden="true" />
                    </div>
                    <div>
                      <span className="block text-[9px] font-[850] text-brand-blue">CORE PROCESS</span>
                      <strong className="mt-0.5 block text-[11px] font-[850] text-brand-navy">{process}</strong>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <SectionCta onClick={openLead}>Explore More Project References</SectionCta>
        </Section>

        <Section id="capabilities" soft>
          <SectionHeader kicker="Why Realjet" title="Three Capabilities That Turn Plans into Production Capacity" text="From initial project inputs to site production, our engineering, manufacturing, and delivery teams share responsibility for the outcome." />
          <div className="grid grid-cols-3 gap-4 max-[1000px]:grid-cols-1">
            {capabilities.map(({ icon, image, title, text, points }, index) => (
              <article key={title} className="group overflow-hidden rounded-card border border-line bg-white shadow-card">
                {image ? (
                  <div className="aspect-video overflow-hidden bg-[#e4edf2]">
                    <img
                      src={image}
                      alt={title}
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
          <SectionCta onClick={openLead}>Book a Technical Consultation</SectionCta>
        </Section>

        <section className="hero-gradient py-[72px] text-white">
          <div className="site-container flex flex-col items-center text-center">
            <p className="mb-3 text-[11px] font-[850] tracking-[0.12em] text-[#8ce2e8] uppercase">Start Your Project</p>
            <h2 className="max-w-[760px] text-[clamp(30px,4vw,44px)] leading-[1.13] font-[850] tracking-[-0.03em]">Get a Solution Engineered for Your Project</h2>
            <p className="mt-3 max-w-[670px] text-[15px] text-white/68">Tell us what you need to produce, and we will start planning your precast beam line.</p>
            <PrimaryButton onClick={openLead} className="mt-6 max-[720px]:hidden">Open Project Enquiry <ArrowRight size={16} /></PrimaryButton>
          </div>
        </section>
      </main>

      <footer className="bg-[#051a2c] py-6 text-[11px] text-[#89a0b0]">
        <div className="site-container flex items-center justify-between gap-5 max-[720px]:flex-col max-[720px]:items-start">
          <span>© 2026 Changsha Realjet Machinery Technology Co., Ltd. All rights reserved.</span>
          <div className="flex items-center gap-5 max-[720px]:flex-col max-[720px]:items-start max-[720px]:gap-2">
            <span>Turnkey precast beam factory solutions</span>
            <ContactEmail />
          </div>
        </div>
      </footer>

      <button onClick={openLead} className="fixed right-3.5 bottom-3.5 left-3.5 z-40 hidden min-h-12 items-center justify-center gap-2 rounded-[9px] bg-brand-cyan text-sm font-[900] text-brand-navy shadow-floating max-[720px]:flex">
        Discuss Your Project <ArrowRight size={16} />
      </button>

      <LeadModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
