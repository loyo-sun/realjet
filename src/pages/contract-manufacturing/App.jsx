import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle,
  ChevronRight,
  CircleCheckBig,
  FileCheck2,
  Menu,
  X,
} from "lucide-react";
import { trackLeadError, trackLeadSuccess } from "../precast-beam-factory/shared/analytics";
import UniversalEnquiryFields from "../precast-beam-factory/shared/UniversalEnquiryFields";
import FloatingContactActions from "../precast-beam-factory/shared/FloatingContactActions";
import { createUniversalEnquiryBody, UNIVERSAL_ENQUIRY_FORM_NAME } from "../precast-beam-factory/shared/universalEnquiry";

import { manufacturingFaqs } from "./content";

import logoImage from "../../assets/image/realjet-logo.webp";
import heroImage from "../../assets/image/contract-manufacturing/hero-welding-workshop.webp";
import factoryImage from "../../assets/image/contract-manufacturing/realjet-factory.webp";
import weldingImage from "../../assets/image/contract-manufacturing/robotic-welding.webp";
import cuttingImage from "../../assets/image/contract-manufacturing/plate-cutting.webp";
import bendingImage from "../../assets/image/contract-manufacturing/bending.webp";
import machiningImage from "../../assets/image/contract-manufacturing/machining.webp";
import surfaceImage from "../../assets/image/contract-manufacturing/surface-treatment.webp";
import qualityImage from "../../assets/image/contract-manufacturing/quality-inspection.webp";
import chassisImage from "../../assets/image/contract-manufacturing/machinery-chassis.webp";
import turntableImage from "../../assets/image/contract-manufacturing/welded-turntable.webp";
import fuelTankImage from "../../assets/image/contract-manufacturing/fabricated-fuel-tank.webp";
import craneBoomImage from "../../assets/image/contract-manufacturing/crane-boom-real.webp";
import craneJibImage from "../../assets/image/contract-manufacturing/crane-jib-real.webp";
import craneMastImage from "../../assets/image/contract-manufacturing/crane-mast-real.webp";
import oilTankImage from "../../assets/image/contract-manufacturing/oil-tank-real.webp";
import productionLineImage from "../../assets/image/contract-manufacturing/production-line-real.webp";
import tunnelPlatformImage from "../../assets/image/contract-manufacturing/tunnel-platform-real.webp";
import honorSanyImage from "../../assets/image/contract-manufacturing/cases/honor-sany.webp";
import honorZoomlionImage from "../../assets/image/contract-manufacturing/cases/honor-zoomlion.webp";
import honorBoschImage from "../../assets/image/contract-manufacturing/cases/honor-bosch.webp";
import honorHelgesenImage from "../../assets/image/contract-manufacturing/cases/honor-helgesen.webp";
import honorCscmaImage from "../../assets/image/contract-manufacturing/cases/honor-cscma.webp";
import honorWallImage from "../../assets/image/contract-manufacturing/cases/honor-wall.webp";

const companyStats = [
  { value: "2008", label: "Founded in Changsha" },
  { value: "77,000 m²", label: "Manufacturing footprint" },
  { value: "470+", label: "Equipment sets" },
  { value: "150+", label: "Authorized patents" },
];

const capabilities = [
  {
    number: "01",
    image: cuttingImage,
    alt: "Large-format plate cutting equipment at Realjet",
    title: "Cutting",
    text: "High-power laser cutting together with CNC plasma and flame cutting supports carbon steel, stainless steel and aluminum plate preparation, including extra-long plate work up to 12 metres.",
    tags: ["Up to 12 m", "Laser cutting", "Plasma & flame"],
  },
  {
    number: "02",
    image: bendingImage,
    alt: "CNC bending operation in the Realjet workshop",
    title: "Bending & forming",
    text: "Multiple CNC press brakes cover working lengths from 3,200 to 6,000 mm, with capacity up to 500 tonnes for boxes, frames and other complex formed structures.",
    tags: ["Up to 500 T / 6 m", "CNC bending", "Plate levelling"],
  },
  {
    number: "03",
    image: weldingImage,
    alt: "Robotic and manual welding in the Realjet workshop",
    title: "Welding & fabrication",
    text: "Multiple FANUC robotic welding lines covering arc welding and GMAW, with post-weld seam finishing. ISO 3834-2 welding quality system certified and EN 15085-2 CL1 international welding certified, meeting rail vehicle and export product standards.",
    tags: ["Robotic welding", "ISO 3834-2", "EN 15085-2 CL1"],
  },
  {
    number: "04",
    image: machiningImage,
    alt: "Machining and assembly equipment at Realjet",
    title: "Machining & assembly",
    text: "Drilling, boring, tapping, deburring and component assembly are coordinated with fabricated datums so critical holes, interfaces and final assembly dimensions remain controlled.",
    tags: ["Drilling & boring", "Deburring", "Subassembly"],
  },
  {
    number: "05",
    image: surfaceImage,
    alt: "Surface treatment line for machinery components",
    title: "Surface treatment",
    text: "Phosphating, powder coating and painting routes include small- and large-part U-shaped coating lines plus a 12-metre large-part painting line, followed by cleanliness checks and clean assembly.",
    tags: ["Phosphating", "Powder coating", "12 m paint line"],
  },
  {
    number: "06",
    image: qualityImage,
    alt: "Dimensional quality inspection of a manufactured component",
    title: "Quality control",
    text: "Drawing revision, material, dimensions, welds, coating and final condition are checked against the agreed plan using inspection equipment including articulated measuring arms and hardness testers.",
    tags: ["ISO 9001", "Dimensional checks", "Documented release"],
  },
];

const productCases = [
  { image: turntableImage, alt: "Aerial work platform turntable fabricated by Realjet", title: "Aerial Work Platform Turntable", client: "SINOBOOM reference", category: "Welded structure", href: "/products/contract-manufactured-aerial-work-platform-turntable.html" },
  { image: craneBoomImage, alt: "Crane boom head manufactured by Realjet", title: "Crane Boom Head", client: "SANY reference", category: "Crane component", href: "/products/crane-boom-head-contract-manufacturing-machining.html" },
  { image: chassisImage, alt: "Concrete pump chassis manufactured by Realjet", title: "Concrete Pump Chassis", client: "Zoomlion reference", category: "Machine chassis", href: "/products/concrete-pump-chassis-contract-manufacturing.html" },
  { image: oilTankImage, alt: "Hydraulic oil tank manufactured under Helgesen authorization", title: "Hydraulic Oil Tank", client: "Helgesen licensed", category: "Fluid system component", href: "/products/hydraulic-oil-tank-contract-manufacturing.html" },
  { image: fuelTankImage, alt: "Fabricated fuel tank manufactured by Realjet", title: "Fuel Tank", client: "Helgesen licensed", category: "Fabricated tank", href: "/products/fabricated-fuel-tank-contract-manufacturing.html" },
  { image: tunnelPlatformImage, alt: "Railway multifunction service vehicle structure", title: "Railway Multifunction Vehicle", client: "CRCHI reference", category: "Rail equipment", href: "/products/railway-multifunction-vehicle-structure-contract-manufacturing.html" },
  { image: productionLineImage, alt: "Chain conveyor assembly manufactured by Realjet", title: "Chain Conveyor", client: "Changtai reference", category: "Production equipment", href: "/products/industrial-chain-conveyor-contract-manufacturing.html" },
  { image: craneJibImage, alt: "Crane jib arm manufactured by Realjet", title: "Crane Jib Arm", client: "SANY reference", category: "Crane component", href: "/products/crane-jib-arm-contract-manufacturing-machining.html" },
  { image: craneMastImage, alt: "Crane mast structure manufactured by Realjet", title: "Crane Mast", client: "SANY reference", category: "Welded structure", href: "/products/crane-mast-contract-manufacturing.html" },
];

const recognitionCases = [
  { image: honorSanyImage, alt: "SANY supplier recognition presented to Realjet", title: "SANY", text: "Excellent Supplier recognition" },
  { image: honorZoomlionImage, alt: "Zoomlion supplier recognition presented to Realjet", title: "Zoomlion", text: "2021 Excellent Supplier recognition" },
  { image: honorBoschImage, alt: "Bosch technical exchange visit at Realjet", title: "Bosch", text: "Technical exchange and manufacturing visit" },
  { image: honorHelgesenImage, alt: "Helgesen hydraulic oil tank license certificate", title: "Helgesen License", text: "Hydraulic oil tank intellectual-property and production authorization" },
  { image: honorCscmaImage, alt: "Changsha Construction Machinery Association membership certificate", title: "Industry Association", text: "Member of the Changsha Construction Machinery Association" },
  { image: honorWallImage, alt: "Realjet company honor and certification wall", title: "Company Honors", text: "High-tech enterprise, specialized manufacturer and other company recognitions" },
];

const workflow = [
  { step: "01", title: "Review the requirement", text: "Send a short component enquiry. We will contact you to arrange drawing exchange and clarify quantities, delivery and quality requirements." },
  { step: "02", title: "Confirm the process route", text: "Review drawings, materials, processes and inspection needs together, then confirm the quotation and delivery scope before production." },
  { step: "03", title: "Manufacture with checkpoints", text: "Production follows the agreed route with inspection points aligned to drawings and purchase requirements." },
  { step: "04", title: "Inspect, pack and deliver", text: "Final records, marking, protection, export packing and delivery are coordinated against the agreed scope." },
];

const decisionInputs = [
  "2D drawings and available 3D models",
  "Material grade and applicable standards",
  "Critical dimensions, tolerances and interfaces",
  "Welding, finishing and inspection requirements",
  "Prototype, batch or recurring volume",
  "Delivery destination and target schedule",
];

function ProductCard({ item }) {
  return (
                <article className="group overflow-hidden rounded-card border border-white/12 bg-brand-navy-light">
                  <a href={item.href} aria-label={`View ${item.title} product details`} className="block aspect-[4/3] overflow-hidden bg-white/5"><img src={item.image} alt={item.alt} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.025]" /></a>
                  <div className="p-5">
                    <p className="m-0 text-[10px] font-[850] tracking-[.14em] text-brand-cyan uppercase">{item.category}</p>
                    <h3 className="mt-2 mb-0 text-xl leading-tight font-[850]"><a href={item.href} className="text-white no-underline transition hover:text-brand-cyan focus-visible:text-brand-cyan">{item.title}</a></h3>
                    <p className="mt-3 mb-0 text-xs font-bold text-white/54">{item.client}</p>
                  </div>
                </article>
  );
}

function PrimaryButton({ children, onClick, ctaId }) {
  return (
    <button type="button" onClick={onClick} data-cta-id={ctaId} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#d94824] px-5 text-sm font-[850] text-white shadow-[0_12px_28px_rgba(217,72,36,.26)] transition hover:-translate-y-0.5 hover:bg-[#b93619] focus-visible:bg-[#b93619]">
      {children}<ArrowRight size={17} aria-hidden="true" />
    </button>
  );
}

function Header({ onLead }) {
  const [open, setOpen] = useState(false);
  const navItems = [
    ["Components", "#products"],
    ["Quality & references", "#cases"],
    ["Capabilities", "#capabilities"],
    ["FAQ", "#faq"],
  ];

  return (
    <header className="sticky top-0 z-50 h-[70px] border-b border-white/10 bg-brand-navy/97 text-white backdrop-blur-xl max-[720px]:h-[62px]">
      <div className="site-container flex h-full items-center gap-6">
        <a href="/" aria-label="Realjet home" className="shrink-0">
          <img src={logoImage} alt="Realjet" className="h-8 w-auto max-w-60 object-contain max-[720px]:h-[23px]" />
        </a>
        <nav className="ml-auto flex items-center gap-6 text-xs font-bold text-white/70 max-[980px]:hidden" aria-label="Primary navigation">
          {navItems.map(([label, href]) => <a key={href} href={href} className="transition hover:text-white">{label}</a>)}
        </nav>
        <button type="button" onClick={() => onLead("Request a Manufacturing Quote")} data-cta-id="header" className="rounded-lg bg-[#d94824] px-4 py-2.5 text-xs font-[850] text-white shadow-[0_8px_22px_rgba(217,72,36,.28)] transition hover:bg-[#b93619] focus-visible:bg-[#b93619] max-[980px]:ml-auto max-[640px]:hidden">Request a Manufacturing Quote</button>
        <button type="button" aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} onClick={() => setOpen((value) => !value)} className="hidden rounded-lg border border-white/20 p-2 max-[980px]:block">
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {open && (
        <nav className="absolute inset-x-0 top-full border-t border-white/10 bg-brand-navy px-4 py-4 shadow-floating min-[981px]:hidden" aria-label="Mobile navigation">
          <div className="site-container grid gap-1">
            {navItems.map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)} className="rounded-lg px-3 py-3 text-sm text-white/75 hover:bg-white/5 hover:text-white">{label}</a>)}
            <button type="button" onClick={() => { setOpen(false); onLead("Request a Manufacturing Quote"); }} data-cta-id="mobile_menu" className="mt-2 rounded-lg bg-[#d94824] px-3 py-3 text-center text-sm font-extrabold text-white transition hover:bg-[#b93619] focus-visible:bg-[#b93619]">Request a Manufacturing Quote</button>
          </div>
        </nav>
      )}
    </header>
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
      const focusable = Array.from(dialog.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])')).filter((element) => element.offsetParent !== null);
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
    const body = createUniversalEnquiryBody(form, `Contract manufacturing enquiry: ${title}`);
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
      <div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="lead-title" className="relative max-h-[calc(100vh-40px)] w-full max-w-[680px] overflow-auto rounded-[18px] bg-white p-7 shadow-[0_30px_90px_rgba(0,0,0,.35)]">
        <button ref={closeRef} type="button" onClick={onClose} aria-label="Close" className="absolute top-3.5 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-soft text-brand-navy"><X size={20} /></button>
        {submitted ? (
          <div className="py-10 text-center">
            <CheckCircle className="mx-auto mb-4 text-brand-cyan" size={48} />
            <strong className="block text-xl font-[850] text-brand-navy">Your Manufacturing Enquiry Has Been Submitted</strong>
            <p className="mt-2 text-xs text-muted">A Realjet specialist will contact you to clarify the component requirements and arrange drawing exchange. A quotation follows review of the technical and delivery scope.</p>
            <button type="button" onClick={onClose} className="mx-auto mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-[9px] bg-brand-navy px-5 text-[13px] font-[850] text-white"><ArrowLeft size={15} /> Return to Page</button>
          </div>
        ) : (
          <>
            <h3 id="lead-title" className="mr-12 text-2xl font-[850] text-brand-navy">{title}</h3>
            <p className="mt-1.5 mb-5 text-xs text-muted">Tell us which component you need. Quantities, materials and delivery destination are helpful if known. We will contact you to agree how to exchange drawings and confirm technical requirements before preparing a quote. Keep confidential details out of this initial form.</p>
            <form name={UNIVERSAL_ENQUIRY_FORM_NAME} method="POST" data-netlify="true" netlify-honeypot="bot-field" aria-busy={submissionState === "submitting"} onSubmit={handleSubmit}>
              <input type="hidden" name="form-name" value={UNIVERSAL_ENQUIRY_FORM_NAME} />
              <input type="hidden" name="bot-field" />
              <UniversalEnquiryFields copyOverrides={{ email: "Work e-mail *", message: "Component requirement *", messagePlaceholder: "What component do you need? If known, include material, quantity, delivery country and target date. Please do not paste confidential drawing details.", submit: "Request a Quote" }} locale="en" submissionState={submissionState} privacyHref="/marketing/privacy/en/" />
            </form>
          </>
        )}
      </div>
    </div>
  );
}

function SectionHeading({ eyebrow, title, text, light = false, centered = false }) {
  return (
    <div className={`${centered ? "mx-auto text-center" : ""} max-w-[780px]`}>
      <p className={`m-0 text-[11px] font-[850] tracking-[0.16em] uppercase ${light ? "text-brand-cyan" : "text-brand-blue"}`}>{eyebrow}</p>
      <h2 className={`mt-3 mb-0 text-[clamp(32px,4vw,50px)] leading-[1.08] font-[900] tracking-[-0.04em] ${light ? "text-white" : "text-brand-navy"}`}>{title}</h2>
      {text && <p className={`mt-5 mb-0 text-base leading-7 ${light ? "text-white/68" : "text-muted"}`}>{text}</p>}
    </div>
  );
}

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [leadTitle, setLeadTitle] = useState("Request a Manufacturing Quote");
  const [progress, setProgress] = useState(0);
  const [finalCtaVisible, setFinalCtaVisible] = useState(false);
  const [heroStatsVisible, setHeroStatsVisible] = useState(true);
  const [mobileCtaVisible, setMobileCtaVisible] = useState(true);
  const lastScrollYRef = useRef(0);
  const scrollStopTimerRef = useRef(null);
  const leadTriggerRef = useRef(null);

  const openLead = (title = "Request a Manufacturing Quote") => {
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
      if (window.innerWidth <= 720) {
        const delta = window.scrollY - lastScrollYRef.current;
        if (delta > 3) setMobileCtaVisible(false);
        if (delta < -3) setMobileCtaVisible(true);
        window.clearTimeout(scrollStopTimerRef.current);
        scrollStopTimerRef.current = window.setTimeout(() => setMobileCtaVisible(true), 260);
      } else {
        setMobileCtaVisible(true);
      }
      lastScrollYRef.current = window.scrollY;
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      window.clearTimeout(scrollStopTimerRef.current);
    };
  }, []);

  useEffect(() => {
    const target = document.getElementById("final-cta");
    if (!target) return undefined;
    const observer = new IntersectionObserver(([entry]) => setFinalCtaVisible(entry.isIntersecting), { threshold: 0.15 });
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const target = document.getElementById("hero-stats");
    if (!target) return undefined;
    const observer = new IntersectionObserver(([entry]) => setHeroStatsVisible(entry.isIntersecting), { threshold: 0 });
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  const hideMobileCta = heroStatsVisible || finalCtaVisible || modalOpen || !mobileCtaVisible;

  return (
    <>
    <div id="site-shell" className="min-h-screen bg-white text-ink">
      <Header onLead={openLead} />
      <div className="fixed top-[69px] left-0 z-50 h-[3px] bg-gradient-to-r from-brand-cyan to-accent-orange max-[720px]:top-[61px]" style={{ width: `${progress}%` }} />
      <main id="main-content">
        <section id="top" className="hero-gradient relative isolate min-h-[640px] overflow-hidden text-white">
          <img src={heroImage} alt="Robotic welding workshop at the Realjet manufacturing facility" fetchPriority="high" className="absolute inset-y-0 right-0 h-full w-[62%] object-cover object-center max-[850px]:w-full" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,30,52,1)_0%,rgba(6,30,52,.96)_40%,rgba(6,30,52,.68)_62%,rgba(6,30,52,.28)_100%)] max-[850px]:bg-brand-navy/88" />
          <div className="site-container relative z-10 flex min-h-[640px] items-center py-20">
            <div className="w-[min(690px,60%)] max-[850px]:w-full">
              <p className="m-0 text-[11px] font-[850] tracking-[0.18em] text-brand-cyan uppercase">OEM metal fabrication · Since 2008</p>
              <h1 className="mt-5 mb-0 text-[clamp(42px,5.2vw,68px)] leading-[1.02] font-[900] tracking-[-0.052em]">Custom Metal Components for Machinery OEMs</h1>
              <p className="mt-7 max-w-[640px] text-lg leading-8 text-white/76 max-[640px]:text-base max-[640px]:leading-7">Build-to-print manufacturing of welded structures, machine chassis, tanks and assemblies—with cutting, forming, welding, machining, finishing and inspection coordinated by Realjet.</p>
              <div className="mt-9 flex flex-wrap gap-3">
                <PrimaryButton onClick={() => openLead("Request a Manufacturing Quote")} ctaId="hero">Request a Manufacturing Quote</PrimaryButton>
                <a href="#products" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/28 px-5 text-sm font-[800] text-white no-underline transition hover:bg-white/8">View Component Examples <ChevronRight size={17} aria-hidden="true" /></a>
              </div>
              <div className="mt-10 grid max-w-[650px] grid-cols-3 gap-5 border-t border-white/18 pt-6 max-[640px]:grid-cols-1 max-[640px]:gap-3">
                {["Built to your drawings", "Fabrication through finishing", "Agreed inspection requirements"].map((item) => <div key={item} className="flex items-center gap-2 text-xs font-bold text-white/72"><Check size={15} className="shrink-0 text-brand-cyan" />{item}</div>)}
              </div>
            </div>
          </div>
        </section>

        <section id="hero-stats" className="border-b border-line bg-white py-8">
          <div className="site-container grid grid-cols-4 gap-px overflow-hidden rounded-card border border-line bg-line max-[820px]:grid-cols-2">
            {companyStats.map((item) => <div key={item.label} className="bg-white px-6 py-5"><strong className="block text-2xl font-[900] tracking-[-0.03em] text-brand-navy">{item.value}</strong><span className="mt-1 block text-xs text-muted">{item.label}</span></div>)}
          </div>
          <div className="site-container mt-6 flex justify-center"><PrimaryButton dark onClick={() => openLead("Request a Manufacturing Quote")} ctaId="capacity_stats">Request a Manufacturing Quote</PrimaryButton></div>
        </section>

        <section id="products" className="bg-brand-navy py-24 text-white max-[720px]:py-16">
          <div className="site-container">
            <SectionHeading light eyebrow="Manufacturing portfolio" title="Welded structures, chassis, tanks and machinery assemblies" text="Find a component similar to yours, then share your requirements for a manufacturing quote. Each project is reviewed against its own drawings, quantities and acceptance criteria." />
            <div className="mt-12 grid grid-cols-3 gap-5 max-[960px]:grid-cols-2 max-[620px]:grid-cols-1">
              {productCases.slice(0, 6).map((item) => (
                <ProductCard key={item.title} item={item} />
              ))}
            </div>
            <details className="mt-8 rounded-card border border-white/20 p-5">
              <summary className="cursor-pointer text-sm font-bold text-white">View more component examples: conveyors, crane jibs and masts</summary>
              <div className="mt-6 grid grid-cols-3 gap-5 max-[960px]:grid-cols-2 max-[620px]:grid-cols-1">{productCases.slice(6).map((item) => <ProductCard key={item.title} item={item} />)}</div>
            </details>
            <div className="mt-10 flex justify-center"><PrimaryButton onClick={() => openLead("Request a Manufacturing Quote")} ctaId="products">Request a Manufacturing Quote</PrimaryButton></div>
          </div>
        </section>

        <section id="cases" className="bg-soft py-24 max-[720px]:py-16">
          <div className="site-container">
            <SectionHeading centered eyebrow="Customer recognition & qualifications" title="Customer references and manufacturing qualifications" text="Review the supplier recognitions and documented relationships below. For your order, confirm the applicable quality requirements, inspection records and certificate scope during the technical review." />
            <div className="mt-12 grid grid-cols-3 gap-5 max-[900px]:grid-cols-2 max-[580px]:grid-cols-1">
              {recognitionCases.map((item) => (
                <article key={item.title} className="overflow-hidden rounded-card border border-line bg-white shadow-card">
                  <div className="flex aspect-[4/3] items-center justify-center overflow-hidden bg-[#f2f4f5] p-3"><img src={item.image} alt={item.alt} loading="lazy" className="h-full w-full object-contain" /></div>
                  <div className="p-5"><h3 className="m-0 text-xl font-[850] text-brand-navy">{item.title}</h3><p className="mt-2 mb-0 text-sm leading-6 text-muted">{item.text}</p></div>
                </article>
              ))}
            </div>
            <div className="mt-10 flex justify-center"><PrimaryButton dark onClick={() => openLead("Request a Manufacturing Quote")} ctaId="cases">Request a Manufacturing Quote</PrimaryButton></div>
          </div>
        </section>

        <section id="capabilities" className="bg-white py-24 max-[720px]:py-16">
          <div className="site-container">
            <SectionHeading eyebrow="Six-process manufacturing route" title="From plate preparation to final inspection" text="Each requirement is reviewed against drawings, material, volume, standards, documentation and delivery needs. Explore the cutting, forming, welding and finishing capabilities available for your components." />
            <div className="mt-12 grid grid-cols-2 gap-5 max-[820px]:grid-cols-1">
              {capabilities.map((item) => (
                <article key={item.title} className="group overflow-hidden rounded-card border border-line bg-soft shadow-[0_14px_40px_rgba(8,37,63,.06)]">
                  <div className="relative aspect-[16/9] overflow-hidden bg-[#e7edf1]"><img src={item.image} alt={item.alt} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]" /><span className="absolute top-4 left-4 rounded-full bg-brand-navy/90 px-3 py-1.5 text-[11px] font-black text-brand-cyan">{item.number}</span></div>
                  <div className="p-6">
                    <h3 className="m-0 text-2xl font-[850] text-brand-navy">{item.title}</h3>
                    <p className="mt-3 mb-0 text-sm leading-6 text-muted">{item.text}</p>
                    <div className="mt-5 flex flex-wrap gap-2">{item.tags.map((tag) => <span key={tag} className="rounded-full border border-brand-blue/18 bg-white px-3 py-1.5 text-[11px] font-bold text-brand-blue">{tag}</span>)}</div>
                  </div>
                </article>
              ))}
            </div>
            <div className="mt-10 flex justify-center"><PrimaryButton dark onClick={() => openLead("Request a Manufacturing Quote")} ctaId="capabilities">Request a Manufacturing Quote</PrimaryButton></div>
          </div>
        </section>

        <section id="about" className="bg-soft py-16">
          <div className="site-container grid grid-cols-[.65fr_1.35fr] items-center gap-10 max-[800px]:grid-cols-1">
            <img src={factoryImage} alt="Realjet metal component manufacturing facility in Changsha, China" loading="lazy" className="aspect-[4/3] w-full rounded-card object-cover" />
            <div><SectionHeading eyebrow="About Realjet" title="Contract manufacturing for machinery OEMs" text="Founded in Changsha in 2008, Realjet manufactures metal structural components to customer drawings and specifications. Our team coordinates fabrication, machining, finishing and assembly requirements for industrial equipment supply." />
            <p className="mt-5 text-sm leading-7 text-muted">Review the <a className="font-bold text-brand-blue underline" href="/insights/contract-manufacturing-supplier-qualification/">supplier qualification checklist</a> or the <a className="font-bold text-brand-blue underline" href="/insights/contract-manufacturing-drawing-bom-readiness/">drawing and BOM enquiry guide</a> to prepare your requirements.</p></div>
          </div>
        </section>

        <section id="workflow" className="bg-brand-navy-light py-24 text-white max-[720px]:py-16">
          <div className="site-container">
            <SectionHeading light eyebrow="Project workflow" title="A practical route from requirement to delivery" text="A useful manufacturing review starts with the engineering inputs that shape process, inspection, quotation and schedule." />
            <div className="mt-12 grid grid-cols-4 gap-px overflow-hidden rounded-card border border-white/12 bg-white/12 max-[900px]:grid-cols-2 max-[560px]:grid-cols-1">
              {workflow.map((item) => <article key={item.step} className="min-h-[255px] bg-brand-navy p-6"><span className="text-3xl font-[900] text-brand-cyan">{item.step}</span><h3 className="mt-10 mb-0 text-xl font-[850]">{item.title}</h3><p className="mt-3 mb-0 text-sm leading-6 text-white/64">{item.text}</p></article>)}
            </div>
            <div className="mt-10 flex justify-center"><PrimaryButton onClick={() => openLead("Request a Manufacturing Quote")} ctaId="workflow">Request a Manufacturing Quote</PrimaryButton></div>
          </div>
        </section>

        <section className="bg-soft py-24 max-[720px]:py-16">
          <div className="site-container grid grid-cols-[.95fr_1.05fr] items-center gap-14 max-[900px]:grid-cols-1">
            <div className="rounded-card bg-brand-navy p-8 text-white shadow-card">
              <p className="m-0 text-[11px] font-[850] tracking-[.16em] text-brand-cyan uppercase">Quality inputs</p>
              <h3 className="mt-3 mb-0 text-3xl font-[900] tracking-[-.03em]">Define acceptance before production begins</h3>
              <div className="mt-7 grid gap-3">{["Drawing revision and requirement review", "Material and process traceability as agreed", "Critical dimension and interface checks", "Weld, finish and documentation requirements", "Final inspection, protection and packing review"].map((item) => <div key={item} className="flex items-start gap-3 text-sm text-white/72"><CircleCheckBig size={18} className="mt-0.5 shrink-0 text-brand-cyan" />{item}</div>)}</div>
            </div>
            <div>
              <SectionHeading eyebrow="Prepare the enquiry" title="Send the information needed for a useful manufacturing review" />
              <div className="mt-7 grid grid-cols-2 gap-x-5 gap-y-3 max-[580px]:grid-cols-1">{decisionInputs.map((item) => <div key={item} className="flex items-start gap-2.5 text-sm leading-6 text-muted"><FileCheck2 size={18} className="mt-1 shrink-0 text-brand-blue" />{item}</div>)}</div>
              <div className="mt-8"><PrimaryButton dark onClick={() => openLead("Request a Manufacturing Quote")} ctaId="enquiry_preparation">Request a Manufacturing Quote</PrimaryButton></div>
            </div>
          </div>
        </section>

        <section id="faq" className="bg-white py-20">
          <div className="site-container max-w-[960px]">
            <SectionHeading eyebrow="Before you enquire" title="OEM manufacturing questions" text="A clear scope helps both teams assess manufacturing fit and prepare a useful quotation." />
            <div className="mt-10 divide-y divide-line border-y border-line">
              {manufacturingFaqs.map(({ question, answer }) => <details key={question} className="group py-5"><summary className="cursor-pointer text-lg font-bold text-brand-navy">{question}</summary><p className="mt-4 max-w-[800px] text-sm leading-7 text-muted">{answer}</p></details>)}
            </div>
          </div>
        </section>

        <section id="final-cta" className="industrial-grid bg-brand-navy-light py-20 text-white">
          <div className="site-container flex items-center justify-between gap-12 max-[800px]:items-start max-[800px]:flex-col">
            <div className="max-w-[720px]"><p className="m-0 text-[11px] font-[850] tracking-[0.16em] text-brand-cyan uppercase">Next step</p><h2 className="mt-3 mb-0 text-[clamp(32px,4vw,50px)] leading-[1.08] font-[900] tracking-[-0.04em]">Request a quote for your custom component</h2><p className="mt-5 mb-0 text-base leading-7 text-white/68">Start with a short description of your component and any known quantities or delivery needs. We will contact you to arrange drawing exchange, confirm the manufacturing scope and prepare a quotation after technical review.</p></div>
            <PrimaryButton onClick={() => openLead("Request a Manufacturing Quote")} ctaId="final_cta">Request a Manufacturing Quote</PrimaryButton>
          </div>
        </section>
      </main>

      <footer className="bg-[#061b2c] py-12 text-white/60">
        <div className="site-container grid grid-cols-[1.4fr_1fr_1fr] gap-10 max-[800px]:grid-cols-1">
          <div><a href="/" className="text-2xl font-black text-white no-underline">Realjet</a><p className="mt-3 max-w-sm text-xs leading-6">Changsha Ruijie Machinery Technology Co., Ltd</p></div>
          <div className="grid content-start gap-3 text-xs"><a href="/marketing/contract_manufacturing/">Custom Machinery Components</a><a href="/marketing/precast-beam-factory/en/">Precast Concrete Lines</a><a href="/insights/">Insights</a></div>
          <div className="grid content-start gap-3 text-xs"><a href="/contact/?topic=manufacturing">Contact</a><a href="/marketing/privacy/en/">Privacy Policy</a><a href="mailto:sales@realjetech.com">sales@realjetech.com</a></div>
        </div>
        <div className="site-container mt-8 border-t border-white/10 pt-5 text-[11px]">© 2026 Changsha Ruijie Machinery Technology Co., Ltd</div>
      </footer>
      <div className="max-[720px]:hidden"><FloatingContactActions canonicalUrl="https://realjetech.com/marketing/contract_manufacturing/" enquiryTitle="Request a Manufacturing Quote" onEnquire={openLead} subject="contract manufacturing" /></div>
      <button
        type="button"
        onClick={() => openLead("Request a Manufacturing Quote")}
        data-cta-id="mobile_sticky"
        aria-hidden={hideMobileCta}
        tabIndex={hideMobileCta ? -1 : 0}
        className={`fixed right-3.5 bottom-[max(14px,env(safe-area-inset-bottom))] left-3.5 z-40 hidden min-h-12 items-center justify-center gap-2 rounded-[9px] bg-[#d94824] text-sm font-[900] text-white shadow-[0_12px_28px_rgba(217,72,36,.32)] transition duration-200 hover:bg-[#b93619] focus-visible:bg-[#b93619] max-[720px]:flex ${hideMobileCta ? "max-[720px]:pointer-events-none max-[720px]:translate-y-20 max-[720px]:opacity-0" : "max-[720px]:translate-y-0 max-[720px]:opacity-100"}`}
      >
        Request a Manufacturing Quote <ArrowRight size={16} />
      </button>
    </div>
    <LeadModal open={modalOpen} onClose={closeLead} title={leadTitle} />
    </>
  );
}

export default App;
