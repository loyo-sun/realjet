import { useState } from "react";
import {
  ArrowRight,
  Check,
  ChevronRight,
  CircleCheckBig,
  FileCheck2,
  Gauge,
  Layers3,
  Menu,
  PackageCheck,
  ScanLine,
  ShieldCheck,
  Sparkles,
  Wrench,
  X,
} from "lucide-react";

import logoImage from "../../assets/image/realjet-logo.webp";
import factoryImage from "../../assets/image/contract-manufacturing/realjet-factory.jpeg";
import weldingImage from "../../assets/image/contract-manufacturing/robotic-welding.jpeg";
import machiningImage from "../../assets/image/contract-manufacturing/machining.jpeg";
import surfaceImage from "../../assets/image/contract-manufacturing/surface-treatment.jpeg";
import qualityImage from "../../assets/image/contract-manufacturing/quality-inspection.jpeg";
import chassisImage from "../../assets/image/contract-manufacturing/machinery-chassis.jpeg";
import turntableImage from "../../assets/image/contract-manufacturing/welded-turntable.jpeg";
import fuelTankImage from "../../assets/image/contract-manufacturing/fabricated-fuel-tank.jpeg";

const capabilities = [
  {
    icon: Layers3,
    title: "Plate cutting & forming",
    text: "Process planning for carbon steel, stainless steel and other specified materials, from cutting through bending and fit-up.",
  },
  {
    icon: Sparkles,
    title: "Welding & fabrication",
    text: "Manual and robotic welding routes selected around geometry, volume, inspection requirements and approved procedures.",
  },
  {
    icon: Wrench,
    title: "Machining & assembly",
    text: "Machining, drilling, boring and assembly are coordinated with fabricated datums and final interface requirements.",
  },
  {
    icon: Gauge,
    title: "Surface treatment",
    text: "Finishing routes are reviewed against corrosion exposure, appearance, packaging and destination requirements.",
  },
  {
    icon: ScanLine,
    title: "Inspection planning",
    text: "Inspection points, records and acceptance criteria are defined from the drawing package and purchase requirements.",
  },
  {
    icon: PackageCheck,
    title: "Packing & delivery",
    text: "Export packing, marking and delivery coordination are planned around part geometry and agreed shipping terms.",
  },
];

const productFamilies = [
  {
    image: turntableImage,
    alt: "Large fabricated machinery turntable structure",
    eyebrow: "Welded structures",
    title: "Machine frames and load-bearing assemblies",
    text: "Fabricated structures produced to customer drawings, weld requirements, dimensional controls and finishing specifications.",
  },
  {
    image: chassisImage,
    alt: "Finished custom machinery chassis assembly",
    eyebrow: "Integrated components",
    title: "Chassis and equipment subassemblies",
    text: "Fabrication, machining and assembly coordinated as one route where interfaces and final fit are critical.",
  },
  {
    image: fuelTankImage,
    alt: "Fabricated machinery fuel tank component",
    eyebrow: "Fabricated vessels",
    title: "Tanks, enclosures and formed components",
    text: "Project-specific components manufactured around material, sealing, surface and connection requirements.",
  },
];

const workflow = [
  {
    step: "01",
    title: "Review the requirement",
    text: "Share drawings, specifications, annual or batch quantity, delivery location and quality documentation needs.",
  },
  {
    step: "02",
    title: "Confirm the process route",
    text: "Realjet reviews material, fabrication, machining, finishing, inspection and external interface requirements.",
  },
  {
    step: "03",
    title: "Manufacture with checkpoints",
    text: "Production follows the agreed route with inspection points aligned to the drawing and purchase requirements.",
  },
  {
    step: "04",
    title: "Inspect, pack and deliver",
    text: "Final records, marking, protection, packing and shipping are coordinated against the agreed delivery scope.",
  },
];

const decisionInputs = [
  "2D drawings and available 3D models",
  "Material grade and applicable standards",
  "Critical dimensions, tolerances and interfaces",
  "Welding, finishing and inspection requirements",
  "Prototype, batch or recurring volume",
  "Delivery destination and target schedule",
];

function PrimaryLink({ children, href = "/contact/?topic=manufacturing", dark = false }) {
  return (
    <a
      href={href}
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-lg px-5 text-sm font-[850] no-underline transition hover:-translate-y-0.5 ${dark ? "bg-brand-navy text-white hover:bg-brand-navy-light" : "bg-white text-brand-navy hover:bg-soft"}`}
    >
      {children}
      <ArrowRight size={17} aria-hidden="true" />
    </a>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const navItems = [
    ["Capabilities", "#capabilities"],
    ["Components", "#components"],
    ["Workflow", "#workflow"],
    ["Quality", "#quality"],
  ];

  return (
    <header className="sticky top-0 z-50 h-[70px] border-b border-white/10 bg-brand-navy/97 text-white backdrop-blur-xl max-[720px]:h-[62px]">
      <div className="site-container flex h-full items-center gap-6">
        <a href="#top" aria-label="Realjet contract manufacturing" className="shrink-0">
          <img src={logoImage} alt="Realjet" className="h-8 w-auto max-w-60 object-contain max-[720px]:h-[23px]" />
        </a>
        <nav className="ml-auto flex items-center gap-6 text-xs font-bold text-white/70 max-[980px]:hidden" aria-label="Primary navigation">
          {navItems.map(([label, href]) => (
            <a key={href} href={href} className="transition hover:text-white">{label}</a>
          ))}
        </nav>
        <a href="/contact/?topic=manufacturing" className="rounded-lg bg-white px-4 py-2.5 text-xs font-[850] text-brand-navy no-underline max-[980px]:ml-auto max-[640px]:hidden">
          Send Drawings
        </a>
        <button
          type="button"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
          className="hidden rounded-lg border border-white/20 p-2 max-[980px]:block"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {open && (
        <nav className="absolute inset-x-0 top-full border-t border-white/10 bg-brand-navy px-4 py-4 shadow-floating min-[981px]:hidden" aria-label="Mobile navigation">
          <div className="site-container grid gap-1">
            {navItems.map(([label, href]) => (
              <a key={href} href={href} onClick={() => setOpen(false)} className="rounded-lg px-3 py-3 text-sm text-white/75 hover:bg-white/5 hover:text-white">{label}</a>
            ))}
            <a href="/contact/?topic=manufacturing" className="mt-2 rounded-lg bg-white px-3 py-3 text-center text-sm font-extrabold text-brand-navy">Send Drawings</a>
          </div>
        </nav>
      )}
    </header>
  );
}

function SectionHeading({ eyebrow, title, text, light = false }) {
  return (
    <div className="max-w-[760px]">
      <p className={`m-0 text-[11px] font-[850] tracking-[0.16em] uppercase ${light ? "text-brand-cyan" : "text-brand-blue"}`}>{eyebrow}</p>
      <h2 className={`mt-3 mb-0 text-[clamp(32px,4vw,48px)] leading-[1.08] font-[900] tracking-[-0.04em] ${light ? "text-white" : "text-brand-navy"}`}>{title}</h2>
      {text && <p className={`mt-5 mb-0 text-base leading-7 ${light ? "text-white/68" : "text-muted"}`}>{text}</p>}
    </div>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-white text-ink">
      <Header />
      <main id="main-content">
        <section id="top" className="hero-gradient relative isolate min-h-[640px] overflow-hidden text-white">
          <img src={weldingImage} alt="Robotic and manual welding in the Realjet manufacturing workshop" className="absolute inset-y-0 right-0 h-full w-[62%] object-cover object-center max-[850px]:w-full" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,30,52,1)_0%,rgba(6,30,52,.96)_40%,rgba(6,30,52,.68)_62%,rgba(6,30,52,.28)_100%)] max-[850px]:bg-brand-navy/88" />
          <div className="site-container relative z-10 flex min-h-[640px] items-center py-20">
            <div className="w-[min(650px,58%)] max-[850px]:w-full">
              <p className="m-0 text-[11px] font-[850] tracking-[0.18em] text-brand-cyan uppercase">Contract manufacturing to customer drawings</p>
              <h1 className="mt-5 mb-0 text-[clamp(42px,5.2vw,68px)] leading-[1.02] font-[900] tracking-[-0.052em]">Custom Machinery Component Manufacturing</h1>
              <p className="mt-7 max-w-[610px] text-lg leading-8 text-white/76 max-[640px]:text-base max-[640px]:leading-7">
                Realjet coordinates fabrication, machining, finishing, inspection and delivery for machinery components built to your drawings, specifications and project requirements.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <PrimaryLink>Start a Drawing Review</PrimaryLink>
                <a href="#capabilities" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/28 px-5 text-sm font-[800] text-white no-underline transition hover:bg-white/8">
                  Explore Capabilities <ChevronRight size={17} aria-hidden="true" />
                </a>
              </div>
              <div className="mt-10 grid max-w-[620px] grid-cols-3 gap-5 border-t border-white/18 pt-6 max-[640px]:grid-cols-1 max-[640px]:gap-3">
                {["Drawing-led review", "Coordinated process route", "Project-specific inspection"].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-xs font-bold text-white/72"><Check size={15} className="shrink-0 text-brand-cyan" />{item}</div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-line bg-white py-8">
          <div className="site-container grid grid-cols-[1.1fr_1fr_1fr_1fr] items-center gap-5 max-[850px]:grid-cols-2 max-[520px]:grid-cols-1">
            <p className="m-0 text-sm font-[850] text-brand-navy">A practical route from requirement to delivery</p>
            {["Built to drawings", "Process coordination", "Documented handoffs"].map((item) => (
              <div key={item} className="flex items-center gap-2.5 text-sm text-muted"><CircleCheckBig size={18} className="text-brand-blue" />{item}</div>
            ))}
          </div>
        </section>

        <section id="capabilities" className="bg-soft py-24 max-[720px]:py-16">
          <div className="site-container">
            <div className="flex items-end justify-between gap-10 max-[850px]:items-start max-[850px]:flex-col">
              <SectionHeading eyebrow="Manufacturing capabilities" title="One coordinated route across critical processes" text="The final route is confirmed against your drawings, volume, standards, quality documentation and delivery requirements." />
              <a href="/contact/?topic=manufacturing" className="shrink-0 text-sm font-[850] text-brand-blue no-underline">Discuss your requirement →</a>
            </div>
            <div className="mt-12 grid grid-cols-3 gap-4 max-[900px]:grid-cols-2 max-[620px]:grid-cols-1">
              {capabilities.map(({ icon: Icon, title, text }) => (
                <article key={title} className="rounded-card border border-line bg-white p-6 shadow-[0_14px_40px_rgba(8,37,63,.06)]">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-blue/10 text-brand-blue"><Icon size={23} strokeWidth={1.8} /></div>
                  <h3 className="mt-5 mb-0 text-xl font-[850] text-brand-navy">{title}</h3>
                  <p className="mt-3 mb-0 text-sm leading-6 text-muted">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="components" className="bg-white py-24 max-[720px]:py-16">
          <div className="site-container">
            <SectionHeading eyebrow="Component scope" title="Manufacturing support for complex machinery components" text="These examples show the type of work Realjet can review. Suitability, process route and acceptance criteria are confirmed project by project." />
            <div className="mt-12 grid grid-cols-3 gap-5 max-[900px]:grid-cols-1">
              {productFamilies.map((item) => (
                <article key={item.title} className="group overflow-hidden rounded-card border border-line bg-white shadow-card">
                  <div className="aspect-[4/3] overflow-hidden bg-[#eef2f4]"><img src={item.image} alt={item.alt} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.025]" /></div>
                  <div className="p-6">
                    <p className="m-0 text-[10px] font-[850] tracking-[0.14em] text-brand-blue uppercase">{item.eyebrow}</p>
                    <h3 className="mt-3 mb-0 text-[22px] leading-[1.2] font-[850] text-brand-navy">{item.title}</h3>
                    <p className="mt-3 mb-0 text-sm leading-6 text-muted">{item.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="workflow" className="bg-brand-navy py-24 text-white max-[720px]:py-16">
          <div className="site-container">
            <SectionHeading light eyebrow="Project workflow" title="Start with the engineering inputs that shape the quote" text="A useful review begins with the component definition and acceptance requirements—not a generic price request." />
            <div className="mt-12 grid grid-cols-4 gap-px overflow-hidden rounded-card border border-white/12 bg-white/12 max-[900px]:grid-cols-2 max-[560px]:grid-cols-1">
              {workflow.map((item) => (
                <article key={item.step} className="min-h-[255px] bg-brand-navy-light p-6">
                  <span className="text-3xl font-[900] text-brand-cyan">{item.step}</span>
                  <h3 className="mt-10 mb-0 text-xl font-[850]">{item.title}</h3>
                  <p className="mt-3 mb-0 text-sm leading-6 text-white/64">{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="quality" className="bg-white py-24 max-[720px]:py-16">
          <div className="site-container grid grid-cols-[1.02fr_.98fr] items-center gap-16 max-[900px]:grid-cols-1 max-[900px]:gap-10">
            <div>
              <SectionHeading eyebrow="Quality planning" title="Define acceptance before production begins" text="Quality is managed through agreed inputs, process checkpoints and records. The exact plan depends on the component and purchase requirements." />
              <div className="mt-8 grid gap-3">
                {[
                  "Drawing revision and requirement review",
                  "Material and process traceability as agreed",
                  "Critical dimension and interface checks",
                  "Weld, finish and documentation requirements",
                  "Final inspection, protection and packing review",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-xl border border-line bg-soft px-4 py-3.5 text-sm font-bold text-ink"><ShieldCheck size={19} className="mt-0.5 shrink-0 text-brand-blue" />{item}</div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img src={qualityImage} alt="Quality inspection of a machinery component" loading="lazy" className="col-span-2 aspect-[16/9] w-full rounded-card object-cover shadow-card" />
              <img src={machiningImage} alt="Machining equipment in the Realjet workshop" loading="lazy" className="aspect-square w-full rounded-card object-cover" />
              <img src={surfaceImage} alt="Machinery component surface treatment process" loading="lazy" className="aspect-square w-full rounded-card object-cover" />
            </div>
          </div>
        </section>

        <section className="bg-soft py-24 max-[720px]:py-16">
          <div className="site-container grid grid-cols-[.95fr_1.05fr] items-center gap-14 max-[900px]:grid-cols-1">
            <div className="overflow-hidden rounded-card shadow-card"><img src={factoryImage} alt="Realjet manufacturing facility in Ningxiang, Changsha" loading="lazy" className="aspect-[4/3] w-full object-cover" /></div>
            <div>
              <SectionHeading eyebrow="Prepare the enquiry" title="Send the information needed for a useful manufacturing review" />
              <div className="mt-7 grid grid-cols-2 gap-x-5 gap-y-3 max-[580px]:grid-cols-1">
                {decisionInputs.map((item) => <div key={item} className="flex items-start gap-2.5 text-sm leading-6 text-muted"><FileCheck2 size={18} className="mt-1 shrink-0 text-brand-blue" />{item}</div>)}
              </div>
              <div className="mt-8"><PrimaryLink dark>Send a Manufacturing Enquiry</PrimaryLink></div>
            </div>
          </div>
        </section>

        <section className="industrial-grid bg-brand-navy-light py-20 text-white">
          <div className="site-container flex items-center justify-between gap-12 max-[800px]:items-start max-[800px]:flex-col">
            <div className="max-w-[720px]">
              <p className="m-0 text-[11px] font-[850] tracking-[0.16em] text-brand-cyan uppercase">Next step</p>
              <h2 className="mt-3 mb-0 text-[clamp(32px,4vw,50px)] leading-[1.08] font-[900] tracking-[-0.04em]">Have a component ready for supplier review?</h2>
              <p className="mt-5 mb-0 text-base leading-7 text-white/68">Share the drawing package, quantities, standards and delivery requirement. Realjet will review the manufacturing scope and identify the next technical questions.</p>
            </div>
            <PrimaryLink>Start the Review</PrimaryLink>
          </div>
        </section>
      </main>

      <footer className="bg-[#061b2c] py-12 text-white/60">
        <div className="site-container grid grid-cols-[1.4fr_1fr_1fr] gap-10 max-[800px]:grid-cols-1">
          <div><a href="/" className="text-2xl font-black text-white no-underline">Realjet</a><p className="mt-3 max-w-sm text-xs leading-6">Changsha Ruijie Machinery Technology Co., Ltd</p></div>
          <div className="grid content-start gap-3 text-xs"><a href="/marketing/contract_manufacturing/">Custom Machinery Components</a><a href="/marketing/precast-beam-factory/en/">Precast Concrete Lines</a><a href="/insights/">Insights</a></div>
          <div className="grid content-start gap-3 text-xs"><a href="/contact/?topic=manufacturing">Contact</a><a href="/marketing/privacy/en/">Privacy Policy</a><a href="mailto:loyosun@gmail.com">loyosun@gmail.com</a></div>
        </div>
        <div className="site-container mt-8 border-t border-white/10 pt-5 text-[11px]">© 2026 Changsha Ruijie Machinery Technology Co., Ltd</div>
      </footer>
    </div>
  );
}

export default App;
