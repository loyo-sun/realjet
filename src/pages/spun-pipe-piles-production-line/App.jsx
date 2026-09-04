import { Children, cloneElement, isValidElement, useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  BarChart3,
  Check,
  CheckCircle2,
  ClipboardCheck,
  Factory,
  Gauge,
  Layers3,
  Menu,
  MessageCircle,
  PackageCheck,
  Settings2,
  ShieldCheck,
  Sparkles,
  TimerReset,
  X,
  Zap,
} from "lucide-react";
import logo from "../../assets/image/realjet-logo.webp";
import heroImage from "../../assets/image/spun-pipe-piles-line/line-hero.webp";
import cageImage from "../../assets/image/spun-pipe-piles-line/cage-welding.webp";
import spinningImage from "../../assets/image/spun-pipe-piles-line/centrifugal-spinning.webp";
import handlingImage from "../../assets/image/spun-pipe-piles-line/handling.webp";
import layoutImage from "../../assets/image/spun-pipe-piles-line/line-layout.webp";
import mouldImage from "../../assets/image/spun-pipe-piles-line/pile-mould.webp";
import mouldFlowImage from "../../assets/image/spun-pipe-piles-line/mould-flow.webp";
import plantImage from "../../assets/image/spun-pipe-piles-line/plant-overview.webp";
import curvedLayoutReference from "../../assets/image/spun-pipe-piles-line/layout-curved-reference.webp";
import straightLayoutReference from "../../assets/image/spun-pipe-piles-line/layout-straight-reference.webp";
import UniversalEnquiryFields from "../precast-beam-factory/shared/UniversalEnquiryFields";
import FloatingContactActions from "../precast-beam-factory/shared/FloatingContactActions";
import MobileContactBar from "../precast-beam-factory/shared/MobileContactBar";
import { createUniversalEnquiryBody, UNIVERSAL_ENQUIRY_FORM_NAME } from "../precast-beam-factory/shared/universalEnquiry";
import { trackEvent, trackLeadError, trackLeadSuccess } from "../precast-beam-factory/shared/analytics";
import LanguageSwitcher from "./LanguageSwitcher";
import { localeMeta, translate } from "./translations";

const scope = [
  ["Spun pile moulds", "Split steel moulds planned around pile diameter, length, mass and lifting method."],
  ["Reinforcement cage welding", "Longitudinal bars, spiral wire and end-plate preparation arranged for repeatable cage output."],
  ["End plates", "End-plate fit-up and connection interfaces coordinated with pile drawings and prestressing."],
  ["Prestressing / tensioning system", "Tensioning equipment and procedures configured around the approved reinforcement design."],
  ["Concrete feeding", "Batch receiving, distribution and controlled mould feeding matched to the planned cycle time."],
  ["Centrifugal spinning", "Roller stations and recipes engineered for the specified pile families and concrete mix."],
  ["Curing", "Controlled curing route, chamber allocation and circulation planned around release requirements."],
  ["Demoulding", "Opening, release and mould-return operations designed for safe, repeatable changeover."],
  ["Handling", "Cranes, transfer devices and buffers arranged around product mass, bay width and flow."],
  ["Control system", "Interlocks, recipe management, operating records and interfaces defined to project scope."],
];

const processSteps = [
  "Reinforcement cage & end-plate preparation",
  "Cage placement in the lower mould",
  "Concrete feeding",
  "Mould closing & locking",
  "Prestressing / tensioning",
  "Centrifugal spinning",
  "Controlled curing",
  "Stress release / detensioning",
  "Demoulding",
  "Inspection, marking & handling",
];

const mouldRanges = [
  ["Ø300–400 mm", "7–15 m", "Approx. 3–6 t", "Standard split mould family"],
  ["Ø500–600 mm", "7–15 m", "Approx. 5–9 t", "Standard / heavy-duty family"],
  ["Ø700–800 mm", "7–15 m", "Approx. 7–12 t", "Heavy-duty mould family"],
  ["Ø1000–1200 mm", "7–15 m", "Approx. 10–18 t", "Project-engineered family"],
];

const capacityPlans = [
  ["Starter", "1 shift", "20–30", "240–360 m", "61,200–91,800 m"],
  ["Standard", "2 shifts", "40–60", "480–720 m", "122,400–183,600 m"],
  ["High-output", "2 shifts", "70–100", "840–1,200 m", "214,200–306,000 m"],
];

function Button({ children, onClick, secondary = false }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-[10px] px-5 text-sm font-[850] transition ${secondary ? "border border-white/30 bg-white/8 text-white hover:bg-white/15" : "bg-[#e4572e] text-white shadow-[0_14px_32px_rgba(228,87,46,.3)] hover:bg-[#c8421d]"}`}
    >
      {children}
    </button>
  );
}

function SectionHeading({ eyebrow, title, copy, centered = false, inverse = false }) {
  return (
    <div className={centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <p className="mb-3 text-xs font-[900] tracking-[.18em] text-brand-blue uppercase">{eyebrow}</p>
      <h2 className={`text-[clamp(2rem,4vw,3.35rem)] leading-[1.08] font-[900] tracking-[-.035em] ${inverse ? "text-white" : "text-brand-navy"}`}>{title}</h2>
      {copy && <p className={`mt-5 text-[17px] leading-8 ${inverse ? "text-white/68" : "text-muted"}`}>{copy}</p>}
    </div>
  );
}

const translatableProps = new Set(["alt", "aria-label", "copy", "enquireLabel", "enquiryTitle", "eyebrow", "title"]);

function localizeTree(node, locale) {
  if (typeof node === "string") {
    const core = node.trim();
    if (!core) return node;
    const localized = translate(locale, core);
    return localized === core ? node : node.replace(core, localized);
  }
  if (!isValidElement(node)) return node;
  const nextProps = {};
  for (const prop of translatableProps) {
    if (typeof node.props[prop] === "string") nextProps[prop] = translate(locale, node.props[prop]);
  }
  if (node.props.children !== undefined) {
    nextProps.children = Children.map(node.props.children, (child) => localizeTree(child, locale));
  }
  return cloneElement(node, nextProps);
}

function LocalizedPage({ locale, children }) {
  return localizeTree(children, locale);
}

function EnquiryModal({ open, title, onClose, locale }) {
  const [submissionState, setSubmissionState] = useState("idle");
  const dialogRef = useRef(null);
  const t = (text) => translate(locale, text);
  const meta = localeMeta[locale] ?? localeMeta.en;

  useEffect(() => {
    if (!open) return undefined;
    document.body.classList.add("modal-open");
    const onKey = (event) => event.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    setTimeout(() => dialogRef.current?.querySelector("input")?.focus(), 0);
    return () => {
      document.body.classList.remove("modal-open");
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  async function submit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    setSubmissionState("submitting");
    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: createUniversalEnquiryBody(form, `${meta.subject}: ${t(title)}`),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      trackLeadSuccess(form);
      setSubmissionState("success");
      form.reset();
    } catch (error) {
      trackLeadError(form, "submission_failed");
      setSubmissionState("error");
    }
  }

  return (
    <div className="fixed inset-0 z-[120] grid place-items-center bg-[#041522]/78 p-5 backdrop-blur-sm" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="enquiry-title" className="relative w-full max-w-[650px] rounded-2xl bg-white p-7 shadow-[0_35px_90px_rgba(0,0,0,.38)] max-[720px]:p-5">
        <button type="button" onClick={onClose} aria-label={t("Close enquiry form")} className="absolute top-4 right-4 grid h-9 w-9 place-items-center rounded-full bg-soft text-brand-navy hover:bg-line"><X size={19} /></button>
        {submissionState === "success" ? (
          <div className="py-8 text-center">
            <CheckCircle2 className="mx-auto text-[#198754]" size={48} />
            <h2 id="enquiry-title" className="mt-4 text-2xl font-[900] text-brand-navy">{t("Enquiry received")}</h2>
            <p className="mx-auto mt-3 max-w-md text-muted">{t("Thank you. Our team will review your requirement and reply by e-mail.")}</p>
            <button type="button" onClick={onClose} className="mt-6 rounded-lg bg-brand-navy px-5 py-3 text-sm font-bold text-white">{t("Close")}</button>
          </div>
        ) : (
          <>
            <p className="text-xs font-[900] tracking-[.16em] text-brand-blue uppercase">{t("Project enquiry")}</p>
            <h2 id="enquiry-title" className="mt-2 pr-10 text-2xl font-[900] tracking-[-.02em] text-brand-navy">{t(title)}</h2>
            {locale !== "en" && <p className="mt-2 mb-5 text-sm leading-6 text-muted">{t("Share the pile size, target output and site information you already have. Name, e-mail and message are all we need.")}</p>}
            <form name={UNIVERSAL_ENQUIRY_FORM_NAME} method="POST" data-netlify="true" netlify-honeypot="bot-field" onSubmit={submit} data-contact-form className={locale === "en" ? "mt-5" : undefined}>
              <input type="hidden" name="form-name" value={UNIVERSAL_ENQUIRY_FORM_NAME} />
              <input type="hidden" name="keyword" value={meta.subject} />
              <input type="hidden" name="subject" value={meta.enquirySubject} />
              <p className="hidden"><label>Do not fill this out: <input name="bot-field" /></label></p>
              <UniversalEnquiryFields locale={locale} submissionState={submissionState} privacyHref={locale === "en" ? "../privacy/en/" : `../../privacy/${locale}/`} singleColumn={locale === "en"} />
            </form>
          </>
        )}
      </div>
    </div>
  );
}

function AdsLeadForm({ locale = "en" }) {
  const [submissionState, setSubmissionState] = useState("idle");
  const meta = localeMeta[locale] ?? localeMeta.en;
  const t = (text) => translate(locale, text);

  async function submit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    setSubmissionState("submitting");
    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: createUniversalEnquiryBody(form, `${meta.subject}: Google Ads landing page`),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      trackLeadSuccess(form);
      setSubmissionState("success");
      form.reset();
    } catch (error) {
      trackLeadError(form, "submission_failed");
      setSubmissionState("error");
    }
  }

  if (submissionState === "success") {
    return (
      <div className="py-8 text-center">
        <CheckCircle2 className="mx-auto text-[#198754]" size={48} />
        <h2 className="mt-4 text-2xl font-[900] text-brand-navy">{t("Project brief received")}</h2>
        <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-muted">{t("Our team will review your requirement and reply by e-mail.")}</p>
      </div>
    );
  }

  return (
    <form name={UNIVERSAL_ENQUIRY_FORM_NAME} method="POST" data-netlify="true" netlify-honeypot="bot-field" onSubmit={submit} data-contact-form data-form-position="hero">
      <input type="hidden" name="form-name" value={UNIVERSAL_ENQUIRY_FORM_NAME} />
      <input type="hidden" name="keyword" value={meta.subject} />
      <input type="hidden" name="subject" value={meta.enquirySubject} />
      <p className="hidden"><label>Do not fill this out: <input name="bot-field" /></label></p>
      <UniversalEnquiryFields locale={locale} submissionState={submissionState} privacyHref={locale === "en" ? "../privacy/en/" : `../../privacy/${locale}/`} idPrefix={`hero-review-${locale}`} singleColumn />
    </form>
  );
}

function AdsPage({ locale = "en" }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [modal, setModal] = useState({ open: false, title: "Discuss your spun pile plant" });
  const meta = localeMeta[locale] ?? localeMeta.en;
  const messagingHref = meta.messagingChannel === "zalo"
    ? "https://zalo.me/8615111041998"
    : `https://wa.me/8619310090600?text=${encodeURIComponent(`Hello, I would like to discuss ${meta.subject}.\n${meta.canonicalUrl}\nChannel: website`)}`;
  const openEnquiry = (title) => {
    trackEvent("enquiry_modal_open", { source: title });
    setModal({ open: true, title });
  };
  const scrollToReview = (source) => {
    if (window.matchMedia("(max-width: 720px)").matches) {
      openEnquiry("Discuss a prestressed spun concrete pile production line");
      return;
    }
    trackEvent("project_review_scroll", { source });
    document.querySelector("#project-review")?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const upgradeAreas = [
    [Gauge, "Spinning stability", "Match mould running rings, rollers, drives and recipes to reduce process variation."],
    [TimerReset, "Crane and mould-return bottlenecks", "Review ground-level empty-mould return, crane crossing, feeding, curing and buffers as one production system."],
    [Settings2, "Controls and traceability", "Define interlocks, recipe management, alarms, operating records and line interfaces."],
    [PackageCheck, "Mould and handling capacity", "Check mould quantity, product mix, lifting method and bay constraints against output targets."],
  ];

  return (
    <LocalizedPage locale={locale}><div className="min-h-screen overflow-x-hidden bg-white pb-0 max-[720px]:pb-20" dir={locale === "ar" ? "rtl" : "ltr"}>
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#061e34]/96 text-white backdrop-blur-xl">
        <div className="site-container flex min-h-[70px] items-center justify-between gap-5">
          <a href="/" aria-label="Realjet home" className="shrink-0"><img src={logo} alt="REALJET" className="h-9 w-auto brightness-0 invert" /></a>
          <nav className={`${menuOpen ? "flex" : "hidden"} absolute top-[70px] right-0 left-0 flex-col gap-1 border-b border-white/10 bg-brand-navy p-5 md:static md:flex md:flex-row md:items-center md:border-0 md:bg-transparent md:p-0`} aria-label="Primary navigation">
            {[["New", "#new-line"], ["Upgrade", "#upgrade"], ["Layout", "#layout-upgrade"], ["Equipment", "#equipment"]].map(([label, href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)} className="rounded-lg px-3 py-2 text-sm font-bold text-white/76 no-underline hover:bg-white/8 hover:text-white">{label}</a>)}
            <button type="button" onClick={() => scrollToReview("header")} className="ml-2 rounded-lg bg-[#e4572e] px-4 py-2.5 text-sm font-[850] text-white">Request proposal</button>
            <LanguageSwitcher current={locale} />
          </nav>
          <button type="button" onClick={() => setMenuOpen(!menuOpen)} className="grid h-10 w-10 place-items-center rounded-lg bg-white/8 md:hidden" aria-label="Toggle navigation">{menuOpen ? <X /> : <Menu />}</button>
        </div>
      </header>

      <main>
        <section className="relative isolate overflow-hidden bg-[#061e34] text-white">
          <img src={heroImage} alt="Prestressed spun concrete pile production line" className="absolute inset-0 h-full w-full object-cover opacity-38" fetchPriority="high" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,21,36,.99)_0%,rgba(5,31,51,.95)_52%,rgba(5,31,51,.72)_100%)]" />
          <div className="industrial-grid absolute inset-0 opacity-25" />
          <div className="site-container relative grid min-h-[calc(100svh-71px)] grid-cols-[1.16fr_.84fr] items-center gap-12 py-8 max-[980px]:grid-cols-1 max-[980px]:gap-9 max-[980px]:py-12">
            <div className="max-w-[760px]">
              <h1 className={`text-[clamp(2.45rem,4.4vw,4rem)] font-[950] ${locale === "ar" ? "leading-[1.12] tracking-[-.035em]" : "leading-[1.01] tracking-[-.048em]"}`}>
                {locale === "ar" ? <> خط إنتاج الخوازيق الخرسانية سابقة الإجهاد بالطرد المركزي من نوعي <bdi dir="ltr">PHC</bdi> و<bdi dir="ltr">PC</bdi></> : <><span className="whitespace-nowrap max-[640px]:whitespace-normal">PHC / PC Spun Pile</span><br /><span className="text-[#58d0d8]">Production Line</span></>}
              </h1>
              <p className="mt-6 max-w-2xl text-[clamp(1.05rem,1.8vw,1.3rem)] leading-8 text-white/80">Build a new prestressed spun concrete pile plant or upgrade an existing line with project-specific moulds, equipment integration and capacity planning.</p>
              <div className="mt-7 grid max-w-2xl grid-cols-2 gap-3 max-[620px]:grid-cols-1">
                {["New production line", "Upgrade an existing line"].map((item) => <div key={item} className="flex items-center gap-3 rounded-xl border border-white/14 bg-white/7 px-4 py-3 text-sm font-[850] backdrop-blur"><CheckCircle2 size={19} className="shrink-0 text-brand-cyan" />{item}</div>)}
              </div>
              <ul className="mt-7 grid gap-3 text-sm text-white/76">
                {["Preliminary equipment boundary and line flow", "Capacity model based on pile mix, mould cycle and shifts", "Mould, spinning, curing, handling and controls reviewed together"].map((item) => <li key={item} className="flex items-start gap-3"><Check className="mt-0.5 shrink-0 text-brand-cyan" size={18} />{item}</li>)}
              </ul>
              <a href={messagingHref} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent("hero_messaging_click", { channel: meta.messagingChannel })} className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-[10px] border border-white/30 bg-white/8 px-5 text-sm font-[850] text-white no-underline transition hover:bg-white/15">Start Instant Chat <MessageCircle size={17} /></a>
            </div>

            <aside id="project-review" className="scroll-mt-24 rounded-2xl border border-white/20 bg-white p-7 text-ink shadow-[0_30px_80px_rgba(0,0,0,.32)] max-[720px]:hidden">
              <p className="text-xs font-[900] tracking-[.16em] text-brand-blue uppercase">Project-specific review</p>
              <h2 className="mt-2 text-2xl font-[950] tracking-[-.025em] text-brand-navy">Request a Line Proposal</h2>
              <div className="mt-5"><AdsLeadForm locale={locale} /></div>
            </aside>
          </div>
        </section>

        <section id="new-line" className="scroll-mt-20 border-t border-line/70 bg-white py-20">
          <div className="site-container">
            <div className="grid grid-cols-[.9fr_1.1fr] items-center gap-14 max-[900px]:grid-cols-1">
              <div>
                <SectionHeading eyebrow="New production line" title="Define the production target before sizing the line" copy="We use the pile range, output target, mould cycle, available plant space and utilities to prepare the initial process route and equipment boundary." />
                <button type="button" onClick={() => openEnquiry("Plan a new spun pile production line")} className="mt-7 inline-flex min-h-12 items-center gap-2 rounded-xl bg-brand-navy px-5 text-sm font-[900] text-white">Plan My New Line <ArrowRight size={17} /></button>
              </div>
              <div className="grid grid-cols-2 gap-4 max-[620px]:grid-cols-1">
                {[
                  [Layers3, "Product definition", "Pile diameter, length, wall thickness, reinforcement and applicable standard."],
                  [BarChart3, "Output basis", "Daily or annual demand, product mix, shifts and operating days."],
                  [Factory, "Plant conditions", "Building spans, crane coverage, concrete supply, curing utilities and logistics."],
                  [ClipboardCheck, "Line concept", "Mould quantity and circulation, station allocation, buffers and equipment interfaces."],
                ].map(([Icon, title, copy]) => <article key={title} className="rounded-xl border border-line bg-soft/55 p-5"><Icon size={23} className="text-brand-blue" /><h3 className="mt-4 font-[900] text-brand-navy">{title}</h3><p className="mt-2 text-sm leading-6 text-muted">{copy}</p></article>)}
              </div>
            </div>
          </div>
        </section>

        <section id="upgrade" className="scroll-mt-20 bg-soft py-20">
          <div className="site-container">
            <div className="grid grid-cols-[.9fr_1.1fr] items-center gap-14 max-[900px]:grid-cols-1">
              <div><SectionHeading eyebrow="Production-line upgrade" title="Start with the bottleneck, not a generic equipment list" copy="We review the current process, installed equipment, product mix and output loss before defining the upgrade boundary." /><button type="button" onClick={() => openEnquiry("Review a spun pile line bottleneck")} className="mt-7 inline-flex min-h-12 items-center gap-2 rounded-xl bg-brand-navy px-5 text-sm font-[900] text-white">Discuss My Bottleneck <ArrowRight size={17} /></button></div>
              <div className="grid grid-cols-2 gap-4 max-[620px]:grid-cols-1">{upgradeAreas.map(([Icon, title, copy]) => <article key={title} className="rounded-xl border border-line bg-white p-5 shadow-[0_10px_30px_rgba(8,37,63,.06)]"><Icon size={23} className="text-brand-blue" /><h3 className="mt-4 font-[900] text-brand-navy">{title}</h3><p className="mt-2 text-sm leading-6 text-muted">{copy}</p></article>)}</div>
            </div>

            <div id="layout-upgrade" className="mt-14 overflow-hidden rounded-2xl bg-[#071f34] text-white shadow-[0_24px_70px_rgba(7,31,52,.2)]">
              <div className="grid grid-cols-[1.05fr_.95fr] gap-12 p-8 max-[900px]:grid-cols-1 max-[520px]:p-5">
                <div>
                  <p className="text-xs font-[900] tracking-[.16em] text-brand-cyan uppercase">Layout upgrade opportunity</p>
                  <h2 className="mt-3 text-[clamp(2rem,4vw,3.2rem)] leading-[1.08] font-[950] tracking-[-.035em]">Move empty moulds on the ground so cranes can focus on production</h2>
                  <p className="mt-5 text-[16px] leading-8 text-white/68">In many conventional layouts, overhead cranes carry both loaded and empty moulds across the full bay. Crossing movements, waiting and repeated lifts can become a line-level bottleneck. Where site conditions allow, we evaluate a ground-level empty-mould return route as part of the production flow.</p>
                </div>
                <div className="grid gap-3">
                  <p className="text-xs font-[900] tracking-[.15em] text-brand-cyan uppercase">What the layout review checks</p>
                  {["Crane crossing, long empty-mould travel and waiting between stations", "Curved or straight return routes based on floor space and transfer points", "Mould length and mass, trolley path, power routing, buffers and bay geometry"].map((item) => <div key={item} className="flex gap-3 rounded-xl border border-white/12 bg-white/5 p-4 text-sm leading-6 text-white/82"><CheckCircle2 size={19} className="mt-0.5 shrink-0 text-brand-cyan" />{item}</div>)}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-px bg-white/12 max-[760px]:grid-cols-1">
                <figure className="bg-white text-ink"><img src={curvedLayoutReference} alt="Reference curved-track ground-level mould return layout for a spun pile production line" loading="lazy" className="h-[410px] w-full object-contain p-4 max-[520px]:h-[310px]" /><figcaption className="border-t border-line bg-soft p-5"><strong className="text-base text-brand-navy">Curved-track return</strong><p className="mt-2 text-sm leading-6 text-muted">Useful when the return route must avoid a central transfer bay, subject to available turning space, trolley design and power arrangement.</p></figcaption></figure>
                <figure className="bg-white text-ink"><img src={straightLayoutReference} alt="Reference straight-track ground-level mould return layout for a spun pile production line" loading="lazy" className="h-[410px] w-full object-contain p-4 max-[520px]:h-[310px]" /><figcaption className="border-t border-line bg-soft p-5"><strong className="text-base text-brand-navy">Straight-track return</strong><p className="mt-2 text-sm leading-6 text-muted">Simplifies rail and power routing, while transfer points and the auxiliary bay must be checked against the available building.</p></figcaption></figure>
              </div>

              <div className="flex items-center justify-between gap-6 border-t border-white/12 px-8 py-6 max-[720px]:flex-col max-[720px]:items-start max-[520px]:px-5">
                <p className="max-w-2xl text-sm leading-6 text-white/68">The preferred route is selected from the actual building, mould circulation, crane coverage and production target—not from a fixed standard layout.</p>
                <button type="button" onClick={() => openEnquiry("Review a spun pile plant layout upgrade")} className="inline-flex min-h-12 shrink-0 items-center gap-2 rounded-xl bg-[#e4572e] px-5 text-sm font-[900] text-white">Review My Plant Layout <ArrowRight size={17} /></button>
              </div>
            </div>
          </div>
        </section>

        <section id="equipment" className="scroll-mt-20 py-20">
          <div className="site-container grid grid-cols-[.92fr_1.08fr] items-center gap-14 max-[900px]:grid-cols-1">
            <img src={plantImage} alt="Integrated PHC and PC spun pile production equipment" loading="lazy" className="aspect-[4/3] w-full rounded-2xl object-cover shadow-card" />
            <div><SectionHeading eyebrow="Confirmed equipment boundary" title="Supply one package or coordinate the complete line" copy="The final scope is matched to the approved pile drawings, capacity target, existing assets and agreed automation level." />
              <div className="mt-7 grid grid-cols-2 gap-3 max-[520px]:grid-cols-1">{scope.map(([title]) => <div key={title} className="flex items-center gap-3 rounded-lg border border-line bg-white px-4 py-3 text-sm font-[850] text-brand-navy"><CheckCircle2 size={18} className="shrink-0 text-brand-blue" />{title}</div>)}</div>
            </div>
          </div>
        </section>

        <section id="process" className="bg-[#071f34] py-20 text-white">
          <div className="site-container">
            <SectionHeading inverse eyebrow="Production flow" title="The process sequence is fixed; the equipment and buffers are project-specific" copy="Mould circulation, crane access, spinning, curing and release timing are balanced against the required product mix." />
            <div className="mt-9 grid grid-cols-5 gap-3 max-[960px]:grid-cols-3 max-[620px]:grid-cols-2">{processSteps.map((step, index) => <div key={step} className="rounded-xl border border-white/12 bg-white/5 p-4"><span className="text-xs font-[950] text-brand-cyan">{String(index + 1).padStart(2, "0")}</span><p className="mt-3 text-sm font-[850] leading-5 text-white/86">{step}</p></div>)}</div>
          </div>
        </section>

        <section className="py-20">
          <div className="site-container grid grid-cols-2 gap-8 max-[850px]:grid-cols-1">
            <div className="rounded-2xl bg-brand-navy p-7 text-white"><p className="text-xs font-[900] tracking-[.15em] text-brand-cyan uppercase">Send what you know</p><h2 className="mt-3 text-3xl font-[950] tracking-[-.03em]">Four inputs for the first review</h2><div className="mt-6 grid gap-3">{["Pile dimensions, reinforcement and applicable standard", "Target daily or annual output and planned shifts", "Available building, cranes, utilities and logistics", "New plant or the current-line problem to be solved"].map((item) => <div key={item} className="flex gap-3 text-sm leading-6 text-white/78"><Check size={18} className="mt-0.5 shrink-0 text-brand-cyan" />{item}</div>)}</div></div>
            <div className="rounded-2xl border border-line bg-soft p-7"><p className="text-xs font-[900] tracking-[.15em] text-brand-blue uppercase">What the review produces</p><h2 className="mt-3 text-3xl font-[950] tracking-[-.03em] text-brand-navy">A clearer basis for your next decision</h2><div className="mt-6 grid gap-3">{["Recommended equipment and delivery boundary", "Preliminary process flow and layout direction", "Capacity assumptions and main bottleneck checks", "Open technical questions for proposal engineering"].map((item) => <div key={item} className="flex gap-3 text-sm font-bold leading-6 text-brand-navy"><CheckCircle2 size={18} className="mt-0.5 shrink-0 text-[#198754]" />{item}</div>)}</div><button type="button" onClick={() => scrollToReview("review-output")} className="mt-7 inline-flex min-h-12 items-center gap-2 rounded-xl bg-[#e4572e] px-5 text-sm font-[900] text-white">Request the Review <ArrowRight size={17} /></button></div>
          </div>
        </section>

        <section className="bg-soft py-16">
          <div className="site-container">
            <details className="group rounded-2xl border border-line bg-white p-6 shadow-card">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-5"><div><p className="text-xs font-[900] tracking-[.15em] text-brand-blue uppercase">Technical planning data</p><h2 className="mt-2 text-2xl font-[950] text-brand-navy">View preliminary mould and capacity planning ranges</h2><p className="mt-2 text-sm leading-6 text-muted">Useful for early discussion; final values require project engineering.</p></div><span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-soft text-2xl text-brand-blue transition group-open:rotate-45">+</span></summary>
              <div className="mt-8 grid gap-8 border-t border-line pt-8">
                <div className="overflow-x-auto rounded-xl border border-line"><table className="w-full min-w-[720px] border-collapse text-left"><thead className="bg-brand-navy text-white"><tr>{["Pile outside diameter", "Typical length", "Planning empty-mould mass", "Planning category"].map((label) => <th key={label} className="px-4 py-3 text-xs font-[900] uppercase">{label}</th>)}</tr></thead><tbody>{mouldRanges.map((row) => <tr key={row[0]} className="border-b border-line last:border-0">{row.map((cell, index) => <td key={cell} className={`px-4 py-3 text-sm ${index === 0 ? "font-[900] text-brand-navy" : "text-muted"}`}>{cell}</td>)}</tr>)}</tbody></table></div>
                <div className="overflow-x-auto rounded-xl border border-line"><table className="w-full min-w-[760px] border-collapse text-left"><thead className="bg-brand-blue text-white"><tr>{["Scenario", "Shift pattern", "Piles / day", "Daily output", "Calculated annual output"].map((label) => <th key={label} className="px-4 py-3 text-xs font-[900] uppercase">{label}</th>)}</tr></thead><tbody>{capacityPlans.map((row) => <tr key={row[0]} className="border-b border-line last:border-0">{row.map((cell, index) => <td key={cell} className={`px-4 py-3 text-sm ${index === 0 ? "font-[900] text-brand-navy" : "text-muted"}`}>{cell}</td>)}</tr>)}</tbody></table></div>
                <p className="text-xs leading-6 text-muted">Capacity examples assume a 12 m weighted average pile length, 300 planned operating days and 85% effective utilisation. Mould ranges and output figures are preliminary planning references—not quotations, guarantees or fixed product limits.</p>
              </div>
            </details>
          </div>
        </section>

        <section className="py-20">
          <div className="site-container"><SectionHeading centered eyebrow="Project delivery" title="From requirement review to production ramp-up" copy="Selected packages or a coordinated line can be supplied. The contract defines the final technical and service boundary." /><div className="mt-10 grid grid-cols-4 gap-4 max-[900px]:grid-cols-2 max-[520px]:grid-cols-1">{[["01", "Requirement review", "Products, output, site and current constraints."], ["02", "Concept engineering", "Process route, layout, capacity and scope."], ["03", "Manufacturing & integration", "Equipment, controls, interfaces and checks."], ["04", "Installation & ramp-up", "Commissioning, trials and training to scope."]].map(([n, title, copy]) => <article key={n} className="rounded-xl border border-line p-5"><div className="text-2xl font-[950] text-brand-blue">{n}</div><h3 className="mt-5 font-[900] text-brand-navy">{title}</h3><p className="mt-2 text-sm leading-6 text-muted">{copy}</p></article>)}</div></div>
        </section>

        <section className="bg-[linear-gradient(135deg,#0d4b68,#08253f)] py-16 text-white"><div className="site-container flex items-center justify-between gap-10 max-[800px]:flex-col max-[800px]:items-start"><div><p className="text-xs font-[900] tracking-[.16em] text-brand-cyan uppercase">New plant or line upgrade</p><h2 className="mt-3 max-w-3xl text-[clamp(2rem,4vw,3.3rem)] leading-[1.08] font-[900] tracking-[-.035em]">Turn your production requirement into a clear equipment plan.</h2></div><button type="button" onClick={() => scrollToReview("final-cta")} className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-[#e4572e] px-5 text-sm font-[900] text-white">Request a Line Proposal <ArrowRight size={17} /></button></div></section>
      </main>

      <footer className="bg-[#041522] py-9 text-white"><div className="site-container flex items-center justify-between gap-6 max-[720px]:flex-col max-[720px]:items-start"><div><img src={logo} alt="REALJET" className="h-8 w-auto brightness-0 invert" /><p className="mt-3 text-xs text-white/48">Equipment and line integration for precast concrete production.</p></div><div className="flex flex-wrap gap-x-6 gap-y-2 text-xs font-bold text-white/65"><a href={locale === "en" ? "../privacy/en/" : `../../privacy/${locale}/`} className="hover:text-white">Privacy Policy</a><a href={messagingHref} target="_blank" rel="noopener noreferrer" className="hover:text-white">{meta.messagingLabel}</a><button type="button" onClick={() => scrollToReview("footer")} className="hover:text-white">Request a review</button></div></div></footer>

      <div className="max-[720px]:hidden"><FloatingContactActions ariaLabel={meta.contactOptionsLabel} canonicalUrl={meta.canonicalUrl} enquiryLabel={meta.enquiryLabel} enquiryTitle="Discuss a prestressed spun concrete pile production line" messagingChannel={meta.messagingChannel} messagingHref={messagingHref} messagingLabel={meta.messagingLabel} onEnquire={openEnquiry} showEmail={false} subject={meta.subject} /></div>
      <MobileContactBar ariaLabel={meta.contactOptionsLabel} canonicalUrl={meta.canonicalUrl} emailLabel={meta.emailLabel} enquireLabel={meta.enquiryLabel} enquiryTitle="Discuss a prestressed spun concrete pile production line" messagingChannel={meta.messagingChannel} messagingHref={messagingHref} messagingLabel={meta.messagingLabel} onEnquire={openEnquiry} showEmail={false} subject={meta.subject} />
      <EnquiryModal open={modal.open} title={modal.title} onClose={() => setModal((value) => ({ ...value, open: false }))} locale={locale} />
    </div></LocalizedPage>
  );
}

function LegacyLocalizedPage({ locale = "en" }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [modal, setModal] = useState({ open: false, title: "Discuss your spun pile plant" });
  const meta = localeMeta[locale] ?? localeMeta.en;
  const { canonicalUrl, subject } = meta;
  const messagingHref = meta.messagingChannel === "zalo"
    ? "https://zalo.me/8615111041998"
    : `https://wa.me/8619310090600?text=${encodeURIComponent(`Hello, I would like to discuss ${subject}.\n${canonicalUrl}\nChannel: website`)}`;
  const messagingNumber = meta.messagingChannel === "zalo" ? "+86 151 1104 1998" : "+86 193 1009 0600";
  const openEnquiry = (title = "Discuss your spun pile plant") => {
    trackEvent("enquiry_modal_open", { source: title });
    setModal({ open: true, title });
  };

  return (
    <LocalizedPage locale={locale}><div className="min-h-screen overflow-x-hidden bg-white pb-0 max-[720px]:pb-20" dir={locale === "ar" ? "rtl" : "ltr"}>
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#061e34]/96 text-white backdrop-blur-xl">
        <div className="site-container flex min-h-[72px] items-center justify-between gap-6">
          <a href="/" aria-label="Realjet home" className="shrink-0"><img src={logo} alt="REALJET" className="h-9 w-auto brightness-0 invert" /></a>
          <nav className={`${menuOpen ? "flex" : "hidden"} absolute top-[72px] right-0 left-0 flex-col gap-1 border-b border-white/10 bg-brand-navy p-5 md:static md:flex md:flex-row md:items-center md:border-0 md:bg-transparent md:p-0`} aria-label="Primary navigation">
            {[["Solution", "#solution"], ["Process", "#process"], ["Mould range", "#moulds"], ["Capacity", "#capacity"], ["FAQ", "#faq"]].map(([label, href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)} className="rounded-lg px-3 py-2 text-sm font-bold text-white/78 no-underline hover:bg-white/8 hover:text-white">{label}</a>)}
            <button type="button" onClick={() => openEnquiry("Request a turnkey plant review")} className="ml-2 rounded-lg bg-[#e4572e] px-4 py-2.5 text-sm font-[850] text-white md:inline-flex">Request a review</button>
            <LanguageSwitcher current={locale} />
          </nav>
          <button type="button" onClick={() => setMenuOpen(!menuOpen)} className="grid h-10 w-10 place-items-center rounded-lg bg-white/8 md:hidden" aria-label="Toggle navigation">{menuOpen ? <X /> : <Menu />}</button>
        </div>
      </header>

      <main>
        <section className="hero-gradient relative isolate min-h-[680px] overflow-hidden text-white">
          <img src={heroImage} alt="Reference layout of a prestressed spun concrete pile production line" className="absolute inset-0 h-full w-full object-cover opacity-55" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,21,36,.98)_0%,rgba(5,31,51,.92)_45%,rgba(5,31,51,.35)_100%)]" />
          <div className="industrial-grid absolute inset-0 opacity-30" />
          <div className="site-container relative flex min-h-[680px] items-center py-20">
            <div className="max-w-[790px]">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/18 bg-white/8 px-4 py-2 text-xs font-[850] tracking-[.12em] uppercase backdrop-blur"><Factory size={16} className="text-brand-cyan" /> Turnkey equipment and plant integration</div>
              <h1 className="text-[clamp(2.7rem,6.2vw,5.4rem)] leading-[.98] font-[950] tracking-[-.055em]">Prestressed Spun Concrete Pile<br /><span className="text-[#58d0d8]">Production Line</span></h1>
              <p className="mt-6 max-w-2xl text-[clamp(1.08rem,2vw,1.35rem)] leading-8 text-white/80">Plan a new prestressed spun concrete pile plant or upgrade an existing production line with project-specific moulds, equipment and line integration—from cage preparation to spinning, curing, demoulding and handling.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button onClick={() => openEnquiry("Request a turnkey plant review")}>Request a Turnkey Plant Review <ArrowRight size={17} /></Button>
                <a href={messagingHref} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent("hero_messaging_click", { channel: meta.messagingChannel })} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[10px] border border-white/30 bg-white/8 px-5 text-sm font-[850] text-white no-underline transition hover:bg-white/15">{meta.messagingCta} <MessageCircle size={17} /></a>
              </div>
              <div className="mt-10 grid max-w-3xl grid-cols-3 gap-px overflow-hidden rounded-xl border border-white/14 bg-white/14 max-[720px]:grid-cols-1">
                {[["10", "Equipment packages"], ["Ø300–1200 mm", "Preliminary planning families"], ["1–2 shifts", "Scalable capacity scenarios"]].map(([value, label]) => <div key={label} className="bg-[#071f34]/76 px-5 py-4 backdrop-blur"><div className="text-xl font-[900] text-white">{value}</div><div className="mt-1 text-[11px] font-bold tracking-wide text-white/62 uppercase">{label}</div></div>)}
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-line bg-white py-8">
          <div className="site-container grid grid-cols-4 gap-4 max-[900px]:grid-cols-2 max-[520px]:grid-cols-1">
            {[[ClipboardCheck, "Pile specification", "Diameter, length, wall and applicable standard"], [BarChart3, "Target output", "Product mix, shifts and operating days"], [Factory, "Site conditions", "Building, utilities, logistics and local labour"], [PackageCheck, "Delivery boundary", "Equipment-only or turnkey integration"]].map(([Icon, title, text]) => <div key={title} className="flex gap-3 rounded-xl border border-line bg-soft/55 p-4"><Icon className="mt-0.5 shrink-0 text-brand-blue" size={22} /><div><h3 className="text-sm font-[900] text-brand-navy">{title}</h3><p className="mt-1 text-xs leading-5 text-muted">{text}</p></div></div>)}
          </div>
        </section>

        <section id="solution" className="py-24">
          <div className="site-container">
            <SectionHeading centered eyebrow="Complete equipment boundary" title="One line concept, ten coordinated equipment packages" copy="The final configuration is developed around your approved pile drawings, output target, plant constraints and preferred automation level." />
            <div className="mt-12 grid grid-cols-5 gap-3 max-[1050px]:grid-cols-3 max-[720px]:grid-cols-2 max-[480px]:grid-cols-1">
              {scope.map(([title, copy], index) => <article key={title} className="group rounded-xl border border-line bg-white p-5 shadow-[0_10px_34px_rgba(8,37,63,.06)] transition hover:-translate-y-1 hover:border-brand-blue/40 hover:shadow-card"><div className="mb-4 grid h-10 w-10 place-items-center rounded-lg bg-brand-navy text-sm font-[900] text-white">{String(index + 1).padStart(2, "0")}</div><h3 className="text-base font-[900] text-brand-navy">{title}</h3><p className="mt-2 text-sm leading-6 text-muted">{copy}</p></article>)}
            </div>
          </div>
        </section>

        <section id="process" className="bg-[#071f34] py-24 text-white">
          <div className="site-container grid grid-cols-[1.05fr_.95fr] items-center gap-14 max-[900px]:grid-cols-1">
            <div>
              <p className="mb-3 text-xs font-[900] tracking-[.18em] text-brand-cyan uppercase">Process flow</p>
              <h2 className="text-[clamp(2rem,4vw,3.35rem)] leading-[1.08] font-[900] tracking-[-.035em]">A controlled route from reinforcement to finished pile</h2>
              <p className="mt-5 max-w-2xl text-[17px] leading-8 text-white/68">We balance each station against the mould cycle, spinning recipe, curing route and crane movement. The goal is a practical flow with visible buffers—not an isolated equipment list.</p>
              <div className="mt-8 grid grid-cols-2 gap-3 max-[520px]:grid-cols-1">
                {processSteps.map((step, index) => <div key={step} className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 p-3"><span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brand-cyan text-xs font-[900] text-brand-navy">{index + 1}</span><span className="text-sm font-bold text-white/88">{step}</span></div>)}
              </div>
            </div>
            <div className="relative">
              <img src={layoutImage} alt="Reference material-flow concept for a prestressed spun concrete pile production line" className="aspect-[4/3] w-full rounded-2xl object-cover shadow-[0_28px_70px_rgba(0,0,0,.35)]" />
              <div className="absolute right-4 bottom-4 left-4 rounded-xl border border-white/12 bg-[#061e34]/88 p-4 backdrop-blur"><p className="text-xs font-[900] tracking-wide text-brand-cyan uppercase">Planning principle</p><p className="mt-1 text-sm leading-6 text-white/78">Mould circulation and crane access are included in the cycle-time and capacity model from the start.</p></div>
            </div>
          </div>
        </section>

        <section className="py-24">
          <div className="site-container grid grid-cols-2 items-center gap-16 max-[900px]:grid-cols-1">
            <div className="relative"><img src={spinningImage} alt="Reference centrifugal spinning machine for prestressed spun concrete piles" className="aspect-square w-full rounded-2xl object-cover shadow-card" /><div className="absolute -right-5 -bottom-5 max-w-[250px] rounded-xl bg-[#e4572e] p-5 text-white shadow-floating max-[520px]:right-3 max-[520px]:bottom-3"><Gauge size={25} /><p className="mt-2 text-sm font-[900]">Recipe-based spinning</p><p className="mt-1 text-xs leading-5 text-white/80">Low, medium and high-speed stages are confirmed through product trials.</p></div></div>
            <div><SectionHeading eyebrow="Centrifugal spinning core" title="The line is engineered around stable mould rotation and repeatable recipes" copy="Spinning equipment, mould running rings, drive arrangement, foundations and controls must work as one system. Final speeds and dwell times are set from the pile geometry, concrete mix and validated process trials." />
              <div className="mt-7 space-y-4">{[[Zap, "Controlled acceleration", "Drive and control logic support staged acceleration instead of abrupt speed changes."], [Settings2, "Mould–machine compatibility", "Running rings, roller spacing, dynamic loading and guarding are reviewed together."], [ShieldCheck, "Interlocks and records", "Operating permissions, alarms and recipe records are defined to the selected control scope."]].map(([Icon, title, text]) => <div key={title} className="flex gap-4"><span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-blue/10 text-brand-blue"><Icon size={22} /></span><div><h3 className="font-[900] text-brand-navy">{title}</h3><p className="mt-1 text-sm leading-6 text-muted">{text}</p></div></div>)}</div>
            </div>
          </div>
        </section>

        <section id="moulds" className="bg-soft py-24">
          <div className="site-container">
            <div className="grid grid-cols-[.85fr_1.15fr] items-end gap-12 max-[900px]:grid-cols-1"><SectionHeading eyebrow="Mould planning range" title="Mainstream pile families, engineered to the approved product drawing" copy="These ranges are suitable for early layout, crane and budget discussions. Final dimensions, plate thicknesses, running rings, mass and interfaces require engineering confirmation." /><img src={mouldImage} alt="Reference steel moulds for prestressed spun concrete piles" className="h-[280px] w-full rounded-2xl object-cover shadow-card" /></div>
            <div className="mt-10 overflow-x-auto rounded-2xl border border-line bg-white shadow-card"><table className="w-full min-w-[760px] border-collapse text-left"><thead className="bg-brand-navy text-white"><tr>{["Pile outside diameter", "Typical length", "Planning empty-mould mass", "Planning category"].map((label) => <th key={label} className="px-5 py-4 text-xs font-[900] tracking-wide uppercase">{label}</th>)}</tr></thead><tbody>{mouldRanges.map((row) => <tr key={row[0]} className="border-b border-line last:border-0">{row.map((cell, index) => <td key={cell} className={`px-5 py-4 text-sm ${index === 0 ? "font-[900] text-brand-navy" : "text-muted"}`}>{cell}</td>)}</tr>)}</tbody></table></div>
            <div className="mt-5 grid grid-cols-[1fr_auto] items-center gap-5 rounded-xl border border-amber-200 bg-amber-50 p-5 max-[720px]:grid-cols-1"><div><h3 className="text-sm font-[900] text-amber-950">Preliminary planning values—not a quotation or guaranteed product limit</h3><p className="mt-1 text-xs leading-5 text-amber-900/75">Figures reflect mainstream Chinese market configurations. Products above Ø1200 mm, longer sections or unusual load cases require a dedicated technical review.</p></div><button type="button" onClick={() => openEnquiry("Review a spun pile mould specification")} className="rounded-lg bg-amber-950 px-4 py-3 text-xs font-[850] text-white">Review my pile drawing</button></div>
            <div className="mt-8 grid grid-cols-2 gap-8 max-[800px]:grid-cols-1"><img src={mouldFlowImage} alt="Reference mould circulation arrangement for a prestressed spun concrete pile plant" className="h-[360px] w-full rounded-2xl object-cover shadow-card" /><div className="rounded-2xl bg-white p-7 shadow-card"><h3 className="text-xl font-[900] text-brand-navy">Typical mould structure planning</h3><ul className="mt-5 grid gap-3">{["Longitudinal split steel shell with bolted closure", "Running rings coordinated with the spinning station", "Longitudinal stiffeners and sectional flange connections", "End-plate and prestressing interfaces based on the pile design", "Lifting points planned for mould mass and crane method"].map((item) => <li key={item} className="flex gap-3 text-sm leading-6 text-muted"><Check className="mt-1 shrink-0 text-[#198754]" size={17} />{item}</li>)}</ul></div></div>
          </div>
        </section>

        <section id="capacity" className="py-24">
          <div className="site-container">
            <SectionHeading centered eyebrow="Capacity planning" title="Build the output model from product mix and mould cycle" copy="The examples below use a 12 m weighted average pile length, 300 planned operating days and 85% effective utilisation. They are concept-stage scenarios, not guaranteed output." />
            <div className="mt-10 overflow-x-auto rounded-2xl border border-line shadow-card"><table className="w-full min-w-[800px] border-collapse text-left"><thead className="bg-[#071f34] text-white"><tr>{["Scenario", "Shift pattern", "Piles / day", "Daily output", "Calculated annual output"].map((label) => <th key={label} className="px-5 py-4 text-xs font-[900] tracking-wide uppercase">{label}</th>)}</tr></thead><tbody>{capacityPlans.map((row, i) => <tr key={row[0]} className={i === 1 ? "border-b border-line bg-brand-blue/6" : "border-b border-line bg-white last:border-0"}>{row.map((cell, index) => <td key={cell} className={`px-5 py-5 text-sm ${index === 0 ? "font-[900] text-brand-navy" : "text-muted"}`}>{cell}</td>)}</tr>)}</tbody></table></div>
            <div className="mt-8 grid grid-cols-[.78fr_1.22fr] gap-8 max-[850px]:grid-cols-1"><div className="rounded-2xl bg-brand-blue p-7 text-white"><TimerReset size={30} /><p className="mt-4 text-xs font-[900] tracking-[.15em] text-white/65 uppercase">Calculation logic</p><p className="mt-2 text-xl font-[900] leading-8">Annual metres = piles/day × weighted average length × operating days × effective utilisation</p></div><div className="rounded-2xl border border-line bg-soft p-7"><h3 className="text-lg font-[900] text-brand-navy">What changes the actual output?</h3><div className="mt-5 grid grid-cols-2 gap-3 max-[520px]:grid-cols-1">{["Diameter and length mix", "Curing route and release time", "Available mould quantity", "Spinning-station capacity", "Handling and buffer design", "Shift, maintenance and staffing"].map((item) => <div key={item} className="flex items-center gap-2 rounded-lg bg-white px-3 py-3 text-sm font-bold text-muted"><CheckCircle2 size={17} className="shrink-0 text-brand-blue" />{item}</div>)}</div></div></div>
          </div>
        </section>

        <section className="bg-[#071f34] py-24 text-white">
          <div className="site-container">
            <SectionHeading inverse eyebrow="Turnkey delivery path" title="From requirement review to a commissioned production system" copy="Realjet can supply selected equipment packages or coordinate a turnkey plant boundary. The contract defines exactly what is included." />
            <div className="mt-12 grid grid-cols-4 gap-4 max-[900px]:grid-cols-2 max-[520px]:grid-cols-1">{[["01", "Requirement review", "Pile drawings, standards, capacity, site and local constraints."], ["02", "Concept engineering", "Process route, layout, cycle-time and capacity model, utilities and equipment boundary."], ["03", "Manufacturing & integration", "Equipment fabrication, controls, interfaces and pre-delivery checks."], ["04", "Installation & ramp-up", "Site support, commissioning, trials and operator training to contract scope."]].map(([n, title, text]) => <article key={n} className="rounded-xl border border-white/12 bg-white/5 p-6"><div className="text-3xl font-[950] text-brand-cyan">{n}</div><h3 className="mt-6 text-lg font-[900]">{title}</h3><p className="mt-3 text-sm leading-6 text-white/62">{text}</p></article>)}</div>
            <div className="mt-10 grid grid-cols-3 gap-5 max-[800px]:grid-cols-1">{[[cageImage, "Reinforcement cage preparation", "Equipment is coordinated with the reinforcement design and downstream cycle time."], [handlingImage, "Mould handling", "Lifting, transfer and buffers are planned around real mass and bay geometry."], [plantImage, "Plant integration", "Line layout connects production flow, access, utilities and safety zones."]].map(([image, title, text]) => <article key={title} className="overflow-hidden rounded-xl border border-white/10 bg-white/5"><img src={image} alt={title} className="h-52 w-full object-cover" /><div className="p-5"><h3 className="font-[900]">{title}</h3><p className="mt-2 text-sm leading-6 text-white/62">{text}</p></div></article>)}</div>
          </div>
        </section>

        <section className="py-24">
          <div className="site-container">
            <SectionHeading eyebrow="Start the engineering conversation" title="Four inputs are enough for a useful first review" copy="If some data is not available, send what you have. We can help structure the remaining questions." />
            <div className="mt-9 grid grid-cols-2 items-stretch gap-6 max-[900px]:grid-cols-1">
              <div className="flex h-full flex-col justify-between rounded-2xl bg-soft p-7 shadow-card max-[520px]:p-5">
                <div>
                  <p className="text-xs font-[900] tracking-[.16em] text-brand-blue uppercase">Direct enquiry</p>
                  <h3 className="mt-3 text-3xl font-[900] tracking-[-.03em] text-brand-navy">Send your requirement</h3>
                  <p className="mt-3 max-w-lg text-sm leading-6 text-muted">Use our short form, e-mail or WhatsApp. We only ask for the information needed to reply.</p>
                </div>
                <div className="mt-6">
                  <button type="button" onClick={() => openEnquiry("Discuss a prestressed spun concrete pile production line")} className="flex min-h-14 w-full items-center justify-center gap-2 rounded-xl bg-[#e4572e] px-5 text-sm font-[900] text-white shadow-[0_14px_30px_rgba(228,87,46,.25)]">Open enquiry form <ArrowRight size={17} /></button>
                  <div className="mt-5 grid grid-cols-2 gap-3 border-t border-line pt-5 text-sm text-muted max-[520px]:grid-cols-1">
                    <p dir="ltr"><strong className="text-brand-navy">E-mail:</strong><br />sales@realjetech.com</p>
                    <p dir="ltr"><strong className="text-brand-navy">{meta.messagingLabel}:</strong><br />{messagingNumber}</p>
                  </div>
                </div>
              </div>
              <div className="grid h-full grid-cols-2 auto-rows-fr gap-4 max-[520px]:grid-cols-1">
                {[[Layers3, "Pile family", "Diameter, length, wall, reinforcement and standard"], [BarChart3, "Output target", "Daily or annual demand and planned shifts"], [Factory, "Plant site", "Available building, crane, utilities and logistics"], [Sparkles, "Preferred scope", "Equipment packages, automation level or turnkey plant"]].map(([Icon, title, text]) => <div key={title} className="flex min-h-[160px] flex-col rounded-xl border border-line p-5"><Icon className="text-brand-blue" size={23} /><h3 className="mt-4 font-[900] text-brand-navy">{title}</h3><p className="mt-2 text-sm leading-6 text-muted">{text}</p></div>)}
              </div>
            </div>
          </div>
        </section>

        <section id="faq" className="bg-soft py-24"><div className="site-container"><SectionHeading centered eyebrow="Frequently asked questions" title="Questions buyers raise before layout engineering" /><div className="mx-auto mt-10 grid max-w-4xl gap-3">{[["Can Realjet supply only a mould or spinning machine?", "Yes. The delivery boundary can cover selected equipment packages or a coordinated turnkey plant, subject to technical review and contract definition."], ["Are the listed mould sizes fixed product limits?", "No. They are preliminary planning families based on mainstream configurations. Final range and mass depend on the approved pile drawing and engineering review."], ["Is the stated capacity guaranteed?", "No. The table is a concept-stage calculation. Contract capacity must be based on product mix, mould quantity, curing cycle, spinning capacity, handling, shifts and agreed acceptance conditions."], ["What is needed for a first proposal?", "Send the pile dimensions and standard, target output, available site information, preferred automation level and the delivery boundary you expect."], ["Can the control system connect line equipment?", "Yes, within the agreed scope. Recipes, interlocks, operating records and external interfaces are defined during controls engineering."]].map(([q, a]) => <details key={q} className="group rounded-xl border border-line bg-white p-5"><summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-[900] text-brand-navy">{q}<span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-soft text-brand-blue transition group-open:rotate-45">+</span></summary><p className="mt-4 max-w-3xl text-sm leading-7 text-muted">{a}</p></details>)}</div></div></section>

        <section className="bg-[linear-gradient(135deg,#0d4b68,#08253f)] py-20 text-white"><div className="site-container flex items-center justify-between gap-10 max-[800px]:flex-col max-[800px]:items-start"><div><p className="text-xs font-[900] tracking-[.16em] text-brand-cyan uppercase">Your next plant starts with a clear brief</p><h2 className="mt-3 max-w-3xl text-[clamp(2rem,4vw,3.4rem)] leading-[1.08] font-[900] tracking-[-.035em]">Turn pile specifications into an equipment and layout plan.</h2></div><Button onClick={() => openEnquiry("Request a spun pile plant concept")}>Start the project review <ArrowRight size={17} /></Button></div></section>
      </main>

      <footer className="bg-[#041522] py-10 text-white"><div className="site-container flex items-center justify-between gap-6 max-[720px]:flex-col max-[720px]:items-start"><div><img src={logo} alt="REALJET" className="h-8 w-auto brightness-0 invert" /><p className="mt-3 text-xs text-white/48">Turnkey equipment for precast concrete production.</p></div><div className="flex flex-wrap gap-x-6 gap-y-2 text-xs font-bold text-white/65"><a href="/" className="hover:text-white">Company website</a><a href="../privacy/en/" className="hover:text-white">Privacy Policy</a><button type="button" onClick={() => openEnquiry("Contact Realjet") } className="hover:text-white">Contact</button></div></div></footer>

      <div className="max-[720px]:hidden"><FloatingContactActions ariaLabel={meta.contactOptionsLabel} canonicalUrl={canonicalUrl} enquiryLabel={meta.enquiryLabel} enquiryTitle="Discuss a prestressed spun concrete pile production line" messagingChannel={meta.messagingChannel} messagingHref={messagingHref} messagingLabel={meta.messagingLabel} onEnquire={openEnquiry} subject={subject} /></div>
      <MobileContactBar ariaLabel={meta.contactOptionsLabel} canonicalUrl={canonicalUrl} emailLabel={meta.emailLabel} enquireLabel="Enquire" enquiryTitle="Discuss a prestressed spun concrete pile production line" messagingChannel={meta.messagingChannel} messagingHref={messagingHref} messagingLabel={meta.messagingLabel} onEnquire={openEnquiry} subject={subject} />
      <EnquiryModal open={modal.open} title={modal.title} onClose={() => setModal((value) => ({ ...value, open: false }))} locale={locale} />
    </div></LocalizedPage>
  );
}

export default function App({ locale = "en" }) {
  return <AdsPage locale={locale} />;
}
