import { useState } from "react";
import {
  ArrowRight,
  Award,
  Building2,
  Check,
  ChevronRight,
  CircleCheckBig,
  FileCheck2,
  Menu,
  ShieldCheck,
  Users,
  Wrench,
  X,
} from "lucide-react";

import logoImage from "../../assets/image/realjet-logo.webp";
import factoryImage from "../../assets/image/contract-manufacturing/realjet-factory.jpeg";
import weldingImage from "../../assets/image/contract-manufacturing/robotic-welding.jpeg";
import cuttingImage from "../../assets/image/contract-manufacturing/plate-cutting.jpeg";
import bendingImage from "../../assets/image/contract-manufacturing/bending.jpeg";
import machiningImage from "../../assets/image/contract-manufacturing/machining.jpeg";
import surfaceImage from "../../assets/image/contract-manufacturing/surface-treatment.jpeg";
import qualityImage from "../../assets/image/contract-manufacturing/quality-inspection.jpeg";
import chassisImage from "../../assets/image/contract-manufacturing/machinery-chassis.jpeg";
import turntableImage from "../../assets/image/contract-manufacturing/welded-turntable.jpeg";
import fuelTankImage from "../../assets/image/contract-manufacturing/fabricated-fuel-tank.jpeg";
import craneBoomImage from "../../assets/image/contract-manufacturing/crane-boom-real.jpeg";
import craneJibImage from "../../assets/image/contract-manufacturing/crane-jib-real.jpeg";
import craneMastImage from "../../assets/image/contract-manufacturing/crane-mast-real.jpeg";
import oilTankImage from "../../assets/image/contract-manufacturing/oil-tank-real.jpeg";
import productionLineImage from "../../assets/image/contract-manufacturing/production-line-real.jpeg";
import tunnelPlatformImage from "../../assets/image/contract-manufacturing/tunnel-platform-real.jpeg";
import honorSanyImage from "../../assets/image/contract-manufacturing/cases/honor-sany.jpeg";
import honorZoomlionImage from "../../assets/image/contract-manufacturing/cases/honor-zoomlion.jpeg";
import honorBoschImage from "../../assets/image/contract-manufacturing/cases/honor-bosch.jpeg";
import honorHelgesenImage from "../../assets/image/contract-manufacturing/cases/honor-helgesen.jpeg";
import honorCscmaImage from "../../assets/image/contract-manufacturing/cases/honor-cscma.jpeg";
import honorWallImage from "../../assets/image/contract-manufacturing/cases/honor-wall.jpeg";

const companyStats = [
  { value: "2008", label: "Founded in Changsha" },
  { value: "77,000 m²", label: "Manufacturing footprint" },
  { value: "470+", label: "Equipment sets" },
  { value: "50+", label: "Authorized patents" },
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
    text: "FANUC robotic welding lines and manual welding routes support arc welding, gas-shielded welding and post-weld finishing for machinery and export-oriented structural components.",
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
  { image: turntableImage, alt: "Aerial work platform turntable fabricated by Realjet", title: "Aerial Work Platform Turntable", client: "Sinoboom reference", category: "Welded structure" },
  { image: craneBoomImage, alt: "Crane boom head manufactured by Realjet", title: "Crane Boom Head", client: "SANY reference", category: "Crane component" },
  { image: chassisImage, alt: "Concrete pump chassis manufactured by Realjet", title: "Concrete Pump Chassis", client: "Zoomlion reference", category: "Machine chassis" },
  { image: oilTankImage, alt: "Hydraulic oil tank manufactured under Helgesen authorization", title: "Hydraulic Oil Tank", client: "Helgesen licensed", category: "Fluid system component" },
  { image: fuelTankImage, alt: "Fabricated fuel tank manufactured by Realjet", title: "Fuel Tank", client: "Helgesen licensed", category: "Fabricated tank" },
  { image: tunnelPlatformImage, alt: "Railway multifunction service vehicle structure", title: "Railway Multifunction Vehicle", client: "CRCHI reference", category: "Rail equipment" },
  { image: productionLineImage, alt: "Chain conveyor assembly manufactured by Realjet", title: "Chain Conveyor", client: "Changtai reference", category: "Production equipment" },
  { image: craneJibImage, alt: "Crane jib arm manufactured by Realjet", title: "Crane Jib Arm", client: "SANY reference", category: "Crane component" },
  { image: craneMastImage, alt: "Crane mast structure manufactured by Realjet", title: "Crane Mast", client: "SANY reference", category: "Welded structure" },
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
  { step: "01", title: "Review the requirement", text: "Share drawings, specifications, quantities, delivery location and quality-documentation requirements." },
  { step: "02", title: "Confirm the process route", text: "Material, fabrication, machining, finishing, inspection and external interfaces are reviewed together." },
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

function PrimaryLink({ children, href = "/contact/?topic=manufacturing", dark = false }) {
  return (
    <a href={href} className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-lg px-5 text-sm font-[850] no-underline transition hover:-translate-y-0.5 ${dark ? "bg-brand-navy text-white hover:bg-brand-navy-light" : "bg-white text-brand-navy hover:bg-soft"}`}>
      {children}<ArrowRight size={17} aria-hidden="true" />
    </a>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const navItems = [
    ["About", "#about"],
    ["Capabilities", "#capabilities"],
    ["Products", "#products"],
    ["Cases", "#cases"],
  ];

  return (
    <header className="sticky top-0 z-50 h-[70px] border-b border-white/10 bg-brand-navy/97 text-white backdrop-blur-xl max-[720px]:h-[62px]">
      <div className="site-container flex h-full items-center gap-6">
        <a href="#top" aria-label="Realjet contract manufacturing" className="shrink-0">
          <img src={logoImage} alt="Realjet" className="h-8 w-auto max-w-60 object-contain max-[720px]:h-[23px]" />
        </a>
        <nav className="ml-auto flex items-center gap-6 text-xs font-bold text-white/70 max-[980px]:hidden" aria-label="Primary navigation">
          {navItems.map(([label, href]) => <a key={href} href={href} className="transition hover:text-white">{label}</a>)}
        </nav>
        <a href="/contact/?topic=manufacturing" className="rounded-lg bg-white px-4 py-2.5 text-xs font-[850] text-brand-navy no-underline max-[980px]:ml-auto max-[640px]:hidden">Send Drawings</a>
        <button type="button" aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} onClick={() => setOpen((value) => !value)} className="hidden rounded-lg border border-white/20 p-2 max-[980px]:block">
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {open && (
        <nav className="absolute inset-x-0 top-full border-t border-white/10 bg-brand-navy px-4 py-4 shadow-floating min-[981px]:hidden" aria-label="Mobile navigation">
          <div className="site-container grid gap-1">
            {navItems.map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)} className="rounded-lg px-3 py-3 text-sm text-white/75 hover:bg-white/5 hover:text-white">{label}</a>)}
            <a href="/contact/?topic=manufacturing" className="mt-2 rounded-lg bg-white px-3 py-3 text-center text-sm font-extrabold text-brand-navy">Send Drawings</a>
          </div>
        </nav>
      )}
    </header>
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
  return (
    <div className="min-h-screen bg-white text-ink">
      <Header />
      <main id="main-content">
        <section id="top" className="hero-gradient relative isolate min-h-[640px] overflow-hidden text-white">
          <img src={weldingImage} alt="Robotic and manual welding in the Realjet manufacturing workshop" className="absolute inset-y-0 right-0 h-full w-[62%] object-cover object-center max-[850px]:w-full" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,30,52,1)_0%,rgba(6,30,52,.96)_40%,rgba(6,30,52,.68)_62%,rgba(6,30,52,.28)_100%)] max-[850px]:bg-brand-navy/88" />
          <div className="site-container relative z-10 flex min-h-[640px] items-center py-20">
            <div className="w-[min(690px,60%)] max-[850px]:w-full">
              <p className="m-0 text-[11px] font-[850] tracking-[0.18em] text-brand-cyan uppercase">One-stop metal fabrication since 2008</p>
              <h1 className="mt-5 mb-0 text-[clamp(42px,5.2vw,68px)] leading-[1.02] font-[900] tracking-[-0.052em]">Custom Machinery Component Manufacturing</h1>
              <p className="mt-7 max-w-[640px] text-lg leading-8 text-white/76 max-[640px]:text-base max-[640px]:leading-7">From cutting and forming to welding, machining, coating, inspection and delivery, Realjet manufactures machinery components to customer drawings and project requirements.</p>
              <div className="mt-9 flex flex-wrap gap-3">
                <PrimaryLink>Start a Drawing Review</PrimaryLink>
                <a href="#products" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/28 px-5 text-sm font-[800] text-white no-underline transition hover:bg-white/8">View Manufacturing Cases <ChevronRight size={17} aria-hidden="true" /></a>
              </div>
              <div className="mt-10 grid max-w-[650px] grid-cols-3 gap-5 border-t border-white/18 pt-6 max-[640px]:grid-cols-1 max-[640px]:gap-3">
                {["Drawing-led review", "Six coordinated processes", "Project-specific inspection"].map((item) => <div key={item} className="flex items-center gap-2 text-xs font-bold text-white/72"><Check size={15} className="shrink-0 text-brand-cyan" />{item}</div>)}
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-line bg-white py-8">
          <div className="site-container grid grid-cols-4 gap-px overflow-hidden rounded-card border border-line bg-line max-[820px]:grid-cols-2 max-[480px]:grid-cols-1">
            {companyStats.map((item) => <div key={item.label} className="bg-white px-6 py-5"><strong className="block text-2xl font-[900] tracking-[-0.03em] text-brand-navy">{item.value}</strong><span className="mt-1 block text-xs text-muted">{item.label}</span></div>)}
          </div>
        </section>

        <section id="about" className="bg-soft py-24 max-[720px]:py-16">
          <div className="site-container grid grid-cols-[.95fr_1.05fr] items-center gap-16 max-[900px]:grid-cols-1 max-[900px]:gap-10">
            <div className="overflow-hidden rounded-card shadow-card"><img src={factoryImage} alt="Realjet manufacturing facility in Ningxiang, Changsha" loading="lazy" className="aspect-[4/3] w-full object-cover" /></div>
            <div>
              <SectionHeading eyebrow="About Realjet" title="A manufacturing partner built around long-term industrial supply" />
              <p className="mt-6 mb-0 text-base leading-7 text-muted">Founded in 2008 in Ningxiang, Changsha, Realjet has developed into a supporting manufacturer for high-end equipment. The company was listed on China&apos;s NEEQ in 2015 under stock code 832867.</p>
              <p className="mt-4 mb-0 text-base leading-7 text-muted">Its core business covers metal structural components, with coordinated support from engineering and precision processing through assembly and delivery. The original project record includes long-term work for SANY, Zoomlion, CRCHI, Sinoboom, Helgesen and other industrial customers.</p>
              <div className="mt-7 grid grid-cols-2 gap-3 max-[560px]:grid-cols-1">
                <div className="flex items-center gap-3 rounded-xl border border-line bg-white p-4"><Users size={21} className="text-brand-blue" /><span className="text-sm font-bold text-brand-navy">500+ employees</span></div>
                <div className="flex items-center gap-3 rounded-xl border border-line bg-white p-4"><Wrench size={21} className="text-brand-blue" /><span className="text-sm font-bold text-brand-navy">70+ R&amp;D personnel</span></div>
                <div className="flex items-center gap-3 rounded-xl border border-line bg-white p-4"><Building2 size={21} className="text-brand-blue" /><span className="text-sm font-bold text-brand-navy">Integrated production site</span></div>
                <div className="flex items-center gap-3 rounded-xl border border-line bg-white p-4"><Award size={21} className="text-brand-blue" /><span className="text-sm font-bold text-brand-navy">Quality and welding systems</span></div>
              </div>
            </div>
          </div>
        </section>

        <section id="capabilities" className="bg-white py-24 max-[720px]:py-16">
          <div className="site-container">
            <SectionHeading eyebrow="Six-process manufacturing route" title="From plate preparation to final inspection" text="Each requirement is reviewed against drawings, material, volume, standards, documentation and delivery needs. The photos below show the original Realjet manufacturing processes." />
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
          </div>
        </section>

        <section id="products" className="bg-brand-navy py-24 text-white max-[720px]:py-16">
          <div className="site-container">
            <SectionHeading light eyebrow="Manufacturing portfolio" title="Representative products and delivered components" text="The complete product set retained from the original site is shown below. Customer references are presented as recorded in the supplied source material." />
            <div className="mt-12 grid grid-cols-3 gap-5 max-[960px]:grid-cols-2 max-[620px]:grid-cols-1">
              {productCases.map((item) => (
                <article key={item.title} className="group overflow-hidden rounded-card border border-white/12 bg-brand-navy-light">
                  <div className="aspect-[4/3] overflow-hidden bg-white/5"><img src={item.image} alt={item.alt} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.025]" /></div>
                  <div className="p-5">
                    <p className="m-0 text-[10px] font-[850] tracking-[.14em] text-brand-cyan uppercase">{item.category}</p>
                    <h3 className="mt-2 mb-0 text-xl leading-tight font-[850] text-white">{item.title}</h3>
                    <p className="mt-3 mb-0 text-xs font-bold text-white/54">{item.client}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="cases" className="bg-soft py-24 max-[720px]:py-16">
          <div className="site-container">
            <SectionHeading centered eyebrow="Customer recognition & qualifications" title="Original cases, certificates and company honors" text="These photographs and documents are displayed from the supplied historical website archive to preserve the original evidence and context." />
            <div className="mt-12 grid grid-cols-3 gap-5 max-[900px]:grid-cols-2 max-[580px]:grid-cols-1">
              {recognitionCases.map((item) => (
                <article key={item.title} className="overflow-hidden rounded-card border border-line bg-white shadow-card">
                  <div className="flex aspect-[4/3] items-center justify-center overflow-hidden bg-[#f2f4f5] p-3"><img src={item.image} alt={item.alt} loading="lazy" className="h-full w-full object-contain" /></div>
                  <div className="p-5"><h3 className="m-0 text-xl font-[850] text-brand-navy">{item.title}</h3><p className="mt-2 mb-0 text-sm leading-6 text-muted">{item.text}</p></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-20 max-[720px]:py-14">
          <div className="site-container grid grid-cols-4 gap-4 max-[900px]:grid-cols-2 max-[520px]:grid-cols-1">
            {["ISO 9001 quality management", "ISO 3834-2 welding quality", "EN 15085-2 CL1 welding", "Helgesen production license"].map((item) => <div key={item} className="flex min-h-24 items-center gap-3 rounded-card border border-line bg-soft p-5 text-sm font-[850] text-brand-navy"><ShieldCheck size={22} className="shrink-0 text-brand-blue" />{item}</div>)}
          </div>
        </section>

        <section id="workflow" className="bg-brand-navy-light py-24 text-white max-[720px]:py-16">
          <div className="site-container">
            <SectionHeading light eyebrow="Project workflow" title="A practical route from requirement to delivery" text="A useful manufacturing review starts with the engineering inputs that shape process, inspection, quotation and schedule." />
            <div className="mt-12 grid grid-cols-4 gap-px overflow-hidden rounded-card border border-white/12 bg-white/12 max-[900px]:grid-cols-2 max-[560px]:grid-cols-1">
              {workflow.map((item) => <article key={item.step} className="min-h-[255px] bg-brand-navy p-6"><span className="text-3xl font-[900] text-brand-cyan">{item.step}</span><h3 className="mt-10 mb-0 text-xl font-[850]">{item.title}</h3><p className="mt-3 mb-0 text-sm leading-6 text-white/64">{item.text}</p></article>)}
            </div>
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
              <div className="mt-8"><PrimaryLink dark>Send a Manufacturing Enquiry</PrimaryLink></div>
            </div>
          </div>
        </section>

        <section className="industrial-grid bg-brand-navy-light py-20 text-white">
          <div className="site-container flex items-center justify-between gap-12 max-[800px]:items-start max-[800px]:flex-col">
            <div className="max-w-[720px]"><p className="m-0 text-[11px] font-[850] tracking-[0.16em] text-brand-cyan uppercase">Next step</p><h2 className="mt-3 mb-0 text-[clamp(32px,4vw,50px)] leading-[1.08] font-[900] tracking-[-0.04em]">Have a component ready for supplier review?</h2><p className="mt-5 mb-0 text-base leading-7 text-white/68">Share the drawing package, quantities, standards and delivery requirement. Realjet will review the manufacturing scope and identify the next technical questions.</p></div>
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
