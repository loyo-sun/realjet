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
    title: "Resumen de producción",
    text: "Tipos de producto, cantidades, calendario y producción diaria objetivo, incluidos los hitos de arranque y aumento gradual de capacidad",
  },
  {
    icon: MapPin,
    title: "Condicionantes del emplazamiento",
    text: "Superficie, geometría, accesos, medios de elevación y condiciones de almacenamiento que determinan la implantación y el flujo de materiales",
  },
  {
    icon: CloudSun,
    title: "Personal y recursos",
    text: "Personal cualificado, clima, servicios auxiliares, suministro de hormigón y capacidad local de mantenimiento",
  },
  {
    icon: FileCheck,
    title: "Normativa del proyecto",
    text: "Documentación de diseño, normativa local, criterios de aceptación e interfaces entre disciplinas",
  },
];

const methods = [
  {
    icon: Search,
    title: "Análisis de necesidades",
    text: "Definimos los productos, cantidades, plazos, especificaciones y restricciones operativas, y los convertimos en un resumen de producción preciso.",
    output: "Resumen de producción definido",
  },
  {
    icon: Workflow,
    title: "Ingeniería de procesos",
    text: "Optimizamos la implantación, equilibramos los tiempos de ciclo, eliminamos cuellos de botella e incorporamos la flexibilidad necesaria para una producción eficiente.",
    output: "Diseño del proceso y la implantación",
  },
  {
    icon: Settings,
    title: "Selección de equipos",
    text: "Seleccionamos equipos adaptados al proceso, las condiciones locales y la capacidad de mantenimiento disponible.",
    output: "Paquete de equipos para el proyecto",
  },
  {
    icon: CheckCircle,
    title: "Optimización de la capacidad",
    text: "Acompañamos la instalación, la puesta en marcha, la producción de prueba y la validación de capacidad hasta alcanzar una producción estable.",
    output: "Capacidad estable y validada",
  },
];

const precastTypes = [
  {
    image: tBeamImage,
    title: "Viga en T",
    fullName: "Viga en T de hormigón prefabricado",
    scene: "Autopistas / Pasos elevados",
    text: "Una solución consolidada y rentable para autopistas y pasos elevados con luces habituales de 20 a 50 m.",
  },
  {
    image: smallBoxGirderImage,
    title: "Viga cajón",
    fullName: "Viga cajón prefabricada de hormigón pretensado",
    scene: "Viaductos / Puentes / Vías urbanas",
    text: "Su sección hueca ofrece gran rigidez torsional para viaductos urbanos, enlaces, puentes curvos y puentes esviados.",
  },
  {
    image: segmentalBoxGirderImage,
    title: "Viga cajón segmental",
    fullName: "Viga cajón segmental prefabricada",
    scene: "Viaductos urbanos / Puentes marítimos",
    text: "Las dovelas se fabrican en planta y se ensamblan en obra, una solución adecuada para geometrías complejas y proyectos que deben minimizar las afecciones al tráfico.",
  },
  {
    image: uBeamImage,
    title: "Viga en U",
    fullName: "Viga en U de hormigón prefabricado",
    scene: "Ferrocarril urbano",
    text: "Su canto reducido y sus almas laterales aportan protección y apantallamiento acústico en tramos elevados de metro y tren ligero.",
  },
  {
    image: iGirderImage,
    title: "Viga en I",
    fullName: "Viga en I de hormigón prefabricado",
    scene: "Viaductos / Puentes / Puentes mixtos",
    text: "Su sección eficiente trabaja con una losa colaborante ejecutada in situ y se utiliza habitualmente en puentes con luces de 25 a 45 m.",
  },
  {
    image: fullSpanBoxGirderImage,
    title: "Viga cajón de vano completo",
    fullName: "Viga cajón prefabricada de vano completo",
    scene: "Alta velocidad / Autopistas urbanas",
    text: "Se fabrica como un vano completo y se monta en una sola pieza, con elevada capacidad a flexión y torsión para grandes infraestructuras de transporte.",
  },
  {
    image: doubleTSlabImage,
    title: "Elemento doble T",
    fullName: "Elemento doble T de hormigón prefabricado",
    scene: "Pasos inferiores / Estaciones de metro",
    text: "Su sección integrada de nervios y losa puede formar directamente una cubierta o superficie de circulación tras el montaje.",
  },
  {
    image: troughGirderImage,
    title: "Viga canal",
    fullName: "Viga canal de hormigón prefabricado",
    scene: "Ferrocarril / Pasarelas",
    text: "Su losa inferior plana y sus almas rectas son adecuadas para tramos elevados de metro y pasarelas prefabricadas de gran luz.",
  },
  {
    image: crashBarrierImage,
    title: "Barrera de hormigón",
    fullName: "Barrera vial de hormigón prefabricado",
    scene: "Viaductos / Autopistas / Puentes",
    text: "Se instala en bordes de puentes o medianas para contener vehículos, guiarlos y separar sentidos de circulación.",
  },
  {
    image: tunnelSegmentImage,
    title: "Dovela de túnel",
    fullName: "Dovela prefabricada de revestimiento de túnel",
    scene: "Metro / Túneles fluviales y de montaña",
    text: "Las dovelas forman el revestimiento resistente permanente del túnel y exigen elevada precisión dimensional, resistencia y estanqueidad.",
  },
  {
    image: boxCulvertImage,
    title: "Marco prefabricado",
    fullName: "Marco prefabricado de hormigón armado",
    scene: "Pasos inferiores / Canales / Galerías de servicios",
    text: "Las unidades cerradas se fabrican por tramos y se montan en obra para pasos inferiores, grandes canales y galerías de servicios.",
  },
  {
    image: stationElementsImage,
    title: "Elementos estructurales para estaciones",
    fullName: "Elementos estructurales prefabricados para estaciones",
    scene: "Estaciones de metro / Intercambiadores subterráneos",
    text: "Vigas, pilares, losas y muros laterales se montan para formar estaciones subterráneas y reducir los plazos de construcción.",
  },
  {
    image: interlockingConcreteArmourUnitImage,
    title: "Unidad de protección costera entrelazada",
    fullName: "Unidad entrelazada de hormigón para protección costera",
    scene: "Diques portuarios / Protección costera",
    text: "Su geometría entrelazada forma un manto estable para diques, obras de protección costera y otras estructuras expuestas al oleaje.",
  },
];

const lines = [
  {
    image: lineV1Image,
    alt: "Línea automatizada Realjet V1.0 para producir vigas prefabricadas",
    kicker: "Configuración de proceso estándar",
    title: "Línea automatizada de producción de vigas prefabricadas V1.0",
    visual: "1 viga/día",
    visualLabel: "Producción diaria: 1 viga",
    text: "Diseñada para proyectos con tipologías de viga normalizadas y objetivos de producción estables, integra apertura y cierre hidráulicos de moldes, transferencia de moldes sobre raíles, vibración externa y pretensado en una etapa. Los moldes, puestos y ciclos de curado se configuran según el plan de producción.",
  },
  {
    image: lineV2Image,
    alt: "Línea automatizada Realjet V2.0 para producir vigas prefabricadas",
    kicker: "Configuración de alta producción",
    title: "Línea automatizada de producción de vigas prefabricadas V2.0",
    visual: "2–4 vigas/día",
    visualLabel: "Producción diaria: 2–4 vigas",
    text: "Diseñada para proyectos con plazos exigentes, alta producción o espacio limitado, integra curado al vapor en molde, pretensado en dos etapas y apertura y cierre del molde en cualquier puesto. Los puestos dedicados y la transferencia automatizada mejoran el rendimiento y la flexibilidad.",
  },
  {
    image: segmentalLineImage,
    alt: "Línea automatizada Realjet para producir vigas segmentales",
    kicker: "Configuración para vigas segmentales",
    title: "Línea automatizada de producción de vigas segmentales",
    visual: "2–3 dovelas/día",
    visualLabel: "Producción diaria: 2–3 dovelas",
    text: "Diseñada para vigas cajón segmentales y fabricación flexible en varios tamaños, integra posicionamiento para hormigonado conjugado, moldes específicos para dovelas y curado al vapor automatizado. El tiempo de ciclo se optimiza según la geometría de la dovela y el programa de montaje.",
  },
];

const products = [
  {
    image: hydraulicFormworkImage,
    alt: "Moldes hidráulicos Realjet de alta precisión para vigas",
    title: "Moldes hidráulicos de alta precisión",
    text: "La apertura y el cierre hidráulicos sincronizados admiten distintas geometrías. La precisión de reposicionamiento se mantiene dentro de 0,3 mm tras 5.000 ciclos y la junta del molde dentro de 0,5 mm, favoreciendo dimensiones constantes en serie.",
    features: ["Funcionamiento sincronizado", "Geometría flexible", "Molde común para vigas interiores / exteriores"],
  },
  {
    image: castingBedSystemImage,
    alt: "Sistema Realjet de transferencia de moldes sobre raíles",
    title: "Sistema de transferencia de moldes sobre raíles",
    text: "Una plataforma con batería de litio-ferrofosfato traslada los moldes entre puestos sobre raíles instalados en el suelo. La precisión de posicionamiento es de ±1 mm, la capacidad de carga de 80–120 t según la configuración y la batería supera 5.000 ciclos. El sistema reduce la rotación del molde de cinco días a uno.",
    features: ["Transferencia por batería", "Reconocimiento automático del puesto", "Posicionamiento ±1 mm"],
  },
  {
    image: concreteDistributionImage,
    alt: "Sistema Realjet de transporte y colocación de hormigón",
    title: "Sistema de transporte y colocación de hormigón",
    text: "Un cangilón aéreo y un distribuidor sobre raíles con control remoto suministran el hormigón en aproximadamente un minuto, con un espesor de capa controlado dentro de ±5 mm. El sistema reduce un 37 % la mano de obra, un 40 % el tiempo de hormigonado por viga y un 20 % las pérdidas de hormigón.",
    features: ["Cangilón aéreo", "Distribuidor de hormigón sobre raíles", "Colocación continua y uniforme"],
  },
  {
    image: vibrationSystemImage,
    alt: "Sistema Realjet de vibración externa e interna combinada",
    title: "Sistema de vibración combinada",
    text: "La vibración externa automatizada cubre al menos el 80 % de la superficie del molde y la vibración interna guiada alcanza el 100 % de las zonas profundas identificadas. Solo se requieren uno o dos operarios para los retoques manuales.",
    features: ["Vibración externa automatizada", "Vibración interna guiada", "Registro automático del proceso"],
  },
  {
    image: curingKilnImage,
    alt: "Sistema Realjet de curado al vapor automatizado",
    title: "Sistema automatizado de curado al vapor",
    text: "El curado en molde, alimentado por energía solar y bombas de calor aerotérmicas, controla las rampas de calentamiento y enfriamiento dentro de ±2 °C/h y la variación de temperatura de la cámara dentro de 3 °C. La resistencia necesaria para el pretensado se alcanza en 8–14 horas. Los costes operativos son un 49,6 % inferiores al gas natural y un 30,1 % inferiores a los pellets de biomasa.",
    features: ["Ciclo completo de curado en molde", "Solar + bombas de calor aerotérmicas", "Control automático de temperatura y humedad"],
  },
  {
    image: lineManagementImage,
    alt: "Sistema Realjet de gestión de la línea de producción",
    title: "Sistema de gestión de la línea de producción",
    text: "El sistema coordina los planes, el estado de los equipos y los datos del proceso, con respuesta de enclavamiento en menos de un segundo y adquisición de datos al menos una vez por segundo. Admite al menos 200 puntos de E/S y crea un registro digital para cada viga.",
    features: ["Programación integrada del proceso", "Registro digital por viga", "Diagnóstico y asistencia remotos"],
  },
];

const projects = [
  {
    image: shenhaiTj05Image,
    alt: "Línea de producción de prefabricados para el tramo sur de la autopista Shenhai G15 en Ningbo, contrato TJ05",
    category: "Autopista",
    title: "Proyecto del tramo sur de la autopista Shenhai G15 en Ningbo — Contrato TJ05",
    englishTitle: "G15 Shenhai Expressway, Ningbo South Section, Contract TJ05",
    line: "2 líneas para vigas en T",
    coreEquipment: ["Transferencia de moldes", "Colocación de hormigón", "Vibración", "Curado al vapor", "Pretensado"],
    product: "Vigas en T de 30 m",
    output: "6 vigas/día",
  },
  {
    image: wenzhouBayBaseImage,
    alt: "Línea de producción de prefabricados en la base industrial de la Nueva Área de la Bahía de Wenzhou",
    category: "Base industrial",
    title: "Base industrial de transporte y construcción urbana de la Nueva Área de la Bahía de Wenzhou",
    englishTitle: "Wenzhou Bay New Area Industrialised Transport and Urban Construction Base",
    line: "4 líneas para vigas en T",
    coreEquipment: ["Transferencia de moldes", "Moldes hidráulicos", "Vibración", "Colocación de hormigón", "Curado híbrido"],
    product: "Vigas en T de 30 y 40 m",
    output: "8–12 vigas/día",
  },
  {
    image: yongguanDongtouImage,
    alt: "Línea de producción de prefabricados para el ramal Dongtou de la autopista Yongguan",
    category: "Ramal de autopista",
    title: "Proyecto del ramal Dongtou de la autopista Yongguan",
    englishTitle: "Yongguan Expressway Dongtou Spur Project",
    line: "2 líneas para vigas segmentales",
    coreEquipment: ["Transferencia de moldes de 300 t", "Moldes hidráulicos", "Vibración", "Colocación de hormigón", "Curado híbrido"],
    product: "Vigas segmentales",
    output: "6 dovelas/día",
  },
  {
    image: guangaoTj5Image,
    alt: "Línea de producción de prefabricados para la autopista Chuanzhusi–Hongyuan",
    category: "Modernización de línea",
    title: "Proyecto de la autopista Chuanzhusi–Hongyuan",
    englishTitle: "Chuanzhusi–Hongyuan Expressway Project",
    line: "Modernización de línea existente",
    coreEquipment: ["Colocación de hormigón", "Cinta transportadora", "Distribuidor"],
    product: "Vigas en T de 20 m",
    output: "20 vigas/día",
  },
];

const capabilities = [
  {
    icon: Compass,
    image: researchDesignImage,
    alt: "Capacidad de ingeniería e I+D de Realjet",
    title: "Ingeniería e I+D",
    headline: "Convertimos los requisitos del proyecto en un diseño integrado de línea",
    text: "Nuestro equipo de I+D integra diseño mecánico, control eléctrico, hidráulica, algoritmos de software e ingeniería de procesos. Diseñamos en función del producto, la capacidad, los plazos y el emplazamiento, y podemos desarrollar procesos y equipos específicos junto con el cliente.",
    stats: [
      { value: "40+", label: "Ingenieros de I+D" },
      { value: "50%+", label: "Personal de I+D con máster" },
      { value: "5%", label: "Ingresos anuales invertidos en I+D" },
      { value: "150+", label: "Patentes concedidas" },
    ],
  },
  {
    icon: Wrench,
    image: manufacturingCapabilityImage,
    alt: "Instalaciones propias de fabricación de Realjet",
    title: "Fabricación propia",
    headline: "Equipos críticos fabricados internamente con control integral de calidad",
    text: "Sesenta y seis máquinas de gran tamaño cubren corte, plegado, mecanizado, soldadura, tratamiento superficial, montaje y pruebas, con trazabilidad completa para grandes sistemas a medida.",
    stats: [
      { value: "66", label: "Equipos principales de fabricación" },
      { value: "±0.005 mm", label: "Precisión de posicionamiento" },
      { value: "12", label: "Robots de soldadura" },
      { value: "Doble certificación", label: "ISO 9001 / ISO 3834-2" },
    ],
  },
  {
    icon: HardHat,
    image: projectDeliveryCapabilityImage,
    alt: "Entrega de proyectos de líneas de prefabricados Realjet",
    title: "Ejecución de proyectos",
    headline: "Acompañamos la línea hasta alcanzar una operación estable",
    text: "Nuestro alcance abarca la coordinación de la solución, fabricación, instalación, puesta en marcha integrada, producción de prueba, formación y asistencia operativa. Un único equipo coordina obra civil, energía, elevación y control.",
    stats: [
      { value: "1 año", label: "Garantía de los equipos" },
      { value: "24/7", label: "Asistencia remota" },
      { value: "60 días", label: "Instalación y puesta en marcha" },
      { value: "2 horas", label: "Respuesta ante parada de producción" },
    ],
  },
];

const companyProofs = [
  { value: "Desde 2008", label: "Especialización continua en el sector" },
  { value: "Más de 100.000 m²", label: "Base de producción propia" },
  { value: "Más de 60.000 m²", label: "Instalaciones de fabricación de equipos" },
  { value: "Empresa cotizada en NEEQ", label: "Código bursátil 832867" },
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
        <h3 className="text-[clamp(20px,2.2vw,26px)] font-[850] tracking-[-0.025em] text-brand-navy">Elementos que puede producir la línea</h3>
        <p className="mt-1.5 max-w-[760px] text-[13px] leading-[1.6] text-muted">Cada línea puede configurarse para fabricar distintos elementos prefabricados de hormigón según los requisitos del proyecto.</p>
      </div>

      <div className="precast-carousel-shell">
        <button type="button" onClick={() => handleManualMove(-1)} aria-label="Elementos prefabricados anteriores" className="precast-carousel-control precast-carousel-control-left">
          <ArrowLeft size={18} aria-hidden="true" />
        </button>
        <div ref={trackRef} className="precast-type-track" aria-label="Carrusel de elementos prefabricados de hormigón" onScroll={handleLoopScroll}>
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
        <button type="button" onClick={() => handleManualMove(1)} aria-label="Elementos prefabricados siguientes" className="precast-carousel-control precast-carousel-control-right">
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
    ["Solución", "#method"],
    ["Líneas", "#lines"],
    ["Equipos", "#products"],
    ["Proyectos", "#projects"],
    ["Capacidades", "#capabilities"],
  ];

  return (
    <header className="sticky top-0 z-40 h-[70px] border-b border-white/10 bg-brand-navy/97 text-white backdrop-blur-xl max-[720px]:h-[62px]">
      <div className="site-container flex h-full items-center gap-6 max-[720px]:gap-2">
        <a href="/" aria-label="Inicio de Realjet" className="shrink-0">
          <img src={logoImage} alt="Realjet logo" className="h-8 w-auto max-w-60 object-contain max-[720px]:h-[23px] max-[720px]:max-w-[160px]" />
        </a>
        <nav className="ml-auto flex items-center gap-5 text-xs text-white/70 max-[1100px]:hidden" aria-label="Navegación principal">
          {nav.map(([label, href]) => <a key={href} href={href} className="transition hover:text-white">{label}</a>)}
        </nav>
        <button onClick={() => onLead("Diseño personalizado gratis")} className="rounded-lg bg-white px-3.5 py-2 text-xs font-[850] text-brand-navy max-[1100px]:ml-auto max-[720px]:hidden">Diseño personalizado gratis</button>
        <LanguageSwitcher current="es" />
        <button
          type="button"
          aria-label={menuOpen ? "Cerrar navegación" : "Abrir navegación"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((value) => !value)}
          className="hidden rounded-lg border border-white/15 p-2 text-white max-[1100px]:ml-0 max-[1100px]:block"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {menuOpen && (
        <nav className="absolute inset-x-0 top-full border-t border-white/10 bg-brand-navy px-5 py-4 shadow-floating min-[1101px]:hidden" aria-label="Navegación móvil">
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
              <span className="block">Líneas integrales para producir</span>{" "}
              <span className="block">elementos prefabricados de hormigón</span>
            </h1>
            <p className="mt-8 max-w-[570px] text-lg font-normal text-white/72 max-[720px]:text-[15px]">
              Desde la planificación de la línea, la selección y personalización de equipos hasta la instalación y la optimización de capacidad, Realjet coordina todo el proyecto.
            </p>
            <div className="mt-7.5">
              <PrimaryButton onClick={() => onLead("Diseño personalizado gratis")} className="max-[720px]:w-full max-[720px]:max-w-[320px]">Diseño personalizado gratis <ArrowRight size={16} /></PrimaryButton>
            </div>
            <div className="mt-5 flex flex-wrap gap-2 max-[720px]:mt-7">
              {["Autopistas", "Puentes", "Ferrocarril", "Obras hidráulicas", "Infraestructura urbana"].map((tag) => (
                <span key={tag} className="rounded-full border border-brand-cyan/35 bg-brand-navy/30 px-2.5 py-1.5 text-[12px] text-white/75 backdrop-blur-sm">{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </section>
      <div id="hero-metrics" className="relative z-30 -mt-6">
        <div className="site-container">
          <div className="grid grid-cols-4 overflow-hidden rounded-[13px] border border-line bg-white shadow-card max-[720px]:grid-cols-2">
            {[["50%", "Superficie requerida", "down"], ["30%", "Personal en planta", "down"], ["3×", "Eficiencia de transferencia", "up"], ["50%", "Tiempo de curado al vapor", "down"]].map(([value, label, direction]) => (
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
    const body = createBeamFactoryEnquiryBody(form, { locale: "es", title });
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
        <button ref={closeRef} onClick={onClose} aria-label="Cerrar" className="absolute top-3.5 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-soft text-brand-navy"><X size={20} /></button>
        {submitted ? (
          <div className="py-10 text-center">
            <CheckCircle className="mx-auto mb-4 text-brand-cyan" size={48} />
            <strong className="block text-xl font-[850] text-brand-navy">Su consulta de proyecto se ha enviado</strong>
            <p className="mt-2 text-xs text-muted">Gracias. Un especialista de Realjet se pondrá en contacto con usted mediante los datos facilitados.</p>
            <button
              type="button"
              onClick={onClose}
              className="mx-auto mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-[9px] bg-brand-navy px-5 text-[13px] font-[850] text-white"
            >
              <ArrowLeft size={15} /> Volver a la página
            </button>
          </div>
        ) : (
          <>
            <h3 id="lead-title" className="mr-12 text-2xl font-[850] text-brand-navy">{title}</h3>
            <p className="mt-1.5 mb-5 text-xs text-muted">Introduzca su nombre, e-mail y mensaje.</p>
            <form name={UNIVERSAL_ENQUIRY_FORM_NAME} method="POST" data-netlify="true" netlify-honeypot="bot-field" aria-busy={submissionState === "submitting"} onSubmit={handleSubmit}>
              <input type="hidden" name="form-name" value={UNIVERSAL_ENQUIRY_FORM_NAME} />
              <input type="hidden" name="bot-field" />
              <UniversalEnquiryFields locale="es" submissionState={submissionState} />
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
      Escríbanos
    </a>
  );
}

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [leadTitle, setLeadTitle] = useState("Diseño personalizado gratis");
  const [progress, setProgress] = useState(0);
  const [showAllEquipment, setShowAllEquipment] = useState(false);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [finalCtaVisible, setFinalCtaVisible] = useState(false);
  const [heroMetricsVisible, setHeroMetricsVisible] = useState(true);
  const [mobileCtaVisible, setMobileCtaVisible] = useState(true);
  const lastScrollYRef = useRef(0);
  const scrollStopTimerRef = useRef(null);
  const leadTriggerRef = useRef(null);
  const openLead = (title = "Diseño personalizado gratis") => {
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
    const finalCta = document.getElementById("final-cta");
    if (!finalCta) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => setFinalCtaVisible(entry.isIntersecting),
      { threshold: 0.15 },
    );
    observer.observe(finalCta);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const heroMetrics = document.getElementById("hero-metrics");
    if (!heroMetrics) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => setHeroMetricsVisible(entry.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(heroMetrics);
    return () => observer.disconnect();
  }, []);

  const hideMobileCta = heroMetricsVisible || finalCtaVisible || modalOpen || !mobileCtaVisible;

  return (
    <>
      <div id="site-shell">
        <Header onLead={openLead} />
        <div className="fixed top-[69px] left-0 z-50 h-[3px] bg-gradient-to-r from-brand-cyan to-accent-orange max-[720px]:top-[61px]" style={{ width: `${progress}%` }} />
        <main>
        <Hero onLead={openLead} />

        <Section id="method" compactBottom>
          <SectionHeader
            kicker="Proceso de desarrollo de la solución"
            title="De los requisitos del proyecto a una línea lista para producir"
            text="Primero definimos el programa de producción, los plazos, el emplazamiento, el personal, los recursos y las condiciones locales. Después, nuestro método de cuatro etapas convierte esos datos en una capacidad de producción estable."
          />

          <div className="solution-journey">
            <aside className="solution-input-panel">
              <div className="solution-panel-header">
                <span className="section-index">01 · DATOS DEL PROYECTO</span>
                <h3>Definir la producción y sus condicionantes</h3>
                <p className="solution-panel-description is-dark">El programa de producción, el emplazamiento, los recursos y la normativa determinan conjuntamente el proceso, la implantación y el paquete de equipos.</p>
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
                <span className="section-index text-brand-blue">02 · MÉTODO REALJET</span>
                <h3>Cuatro etapas para diseñar la línea</h3>
                <p className="solution-panel-description">El análisis de necesidades, la ingeniería de procesos, la selección de equipos y la optimización de capacidad orientan cada decisión hacia la producción final requerida.</p>
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
                    <span className="delivery-output">RESULTADO · {output}</span>
                  </article>
                ))}
              </div>
            </div>
          </div>
          <SectionCta onClick={openLead}>Solicitar un anteproyecto de línea</SectionCta>
          <PrecastTypeCarousel />
        </Section>

        <Section id="lines" soft>
          <SectionHeader
            kicker="Configuraciones habituales de línea"
            title="Tecnología probada para definir el proceso adecuado en cada proyecto"
            text="Hemos desarrollado procesos probados para numerosos productos de hormigón prefabricado. Ante requisitos especiales, colaboramos con el cliente en el proceso, la solución, los equipos y la validación de producción."
          />
          <div className="mobile-card-track grid grid-cols-3 gap-4 max-[1000px]:grid-cols-1">
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
          <SectionCta onClick={openLead}>Analizar su proceso de producción</SectionCta>
        </Section>

        <Section id="products">
          <SectionHeader kicker="Equipos principales de producción" title="Configurar la línea en torno a sus operaciones críticas" text="Los equipos no se limitan a una lista: cada sistema se selecciona y combina según el producto, el tiempo de ciclo y las condiciones del emplazamiento." />
          <div className="mobile-card-track grid grid-cols-3 gap-4 max-[1000px]:grid-cols-2 max-[720px]:grid-cols-1">
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
              Ver todos los equipos
            </button>
          )}
          <SectionCta onClick={openLead}>Solicitar detalles de los equipos</SectionCta>
        </Section>

        <Section id="projects" soft>
          <SectionHeader
            kicker="Proyectos de referencia"
            title="Cada proyecto requiere una línea de producción distinta"
            text="Realjet ha suministrado líneas para grandes proyectos de transporte e infraestructura y ha logrado una producción estable en distintos emplazamientos."
          />
          <div className="mobile-card-track grid grid-cols-4 gap-4 max-[1000px]:grid-cols-2 max-[720px]:grid-cols-1">
            {projects.map(({ image, alt, category, title, englishTitle, line, coreEquipment, product, output }, index) => (
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
                  <div className="min-h-[112px] max-[720px]:min-h-0">
                    <h3 className="text-[15px] font-[850] leading-[1.45] tracking-[-0.02em] text-brand-navy">{title}</h3>
                    <p lang="en" className="mt-1.5 text-[10px] leading-[1.35] text-muted">{englishTitle}</p>
                  </div>
                  <dl className="mt-3 flex flex-wrap gap-2">
                    <div className="min-w-[108px] flex-1 rounded-[9px] border border-line bg-soft px-3 py-2.5">
                      <dt className="text-[9px] font-[850] tracking-[0.06em] text-muted">CONFIGURACIÓN</dt>
                      <dd className="mt-1 text-[11px] font-[850] text-brand-navy">{line}</dd>
                    </div>
                    <div className="min-w-[108px] flex-1 rounded-[9px] border border-line bg-soft px-3 py-2.5">
                      <dt className="text-[9px] font-[850] tracking-[0.06em] text-muted">PRODUCCIÓN DIARIA</dt>
                      <dd className="mt-1 text-[11px] font-[850] text-brand-navy">{output}</dd>
                    </div>
                  </dl>
                  <div className="mt-3 min-h-[152px] rounded-[9px] border border-brand-blue/10 bg-[#eef6f8] px-3 py-3 max-[720px]:min-h-0">
                    <div className="flex items-center gap-1.5 text-brand-blue">
                      <Settings size={13} aria-hidden="true" />
                      <span className="text-[10px] font-[850] tracking-[0.04em]">EQUIPOS PRINCIPALES</span>
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
              Ver todos los proyectos
            </button>
          )}
          <SectionCta onClick={openLead}>Solicitar más referencias</SectionCta>
        </Section>

        <Section id="capabilities">
          <SectionHeader
            kicker="Por qué Realjet"
            title="Tres capacidades que convierten una idea en capacidad productiva"
            text="Fundada en 2008, Realjet ofrece soluciones integradas para plantas de vigas prefabricadas: planificación de líneas, I+D y fabricación de equipos, instalación, puesta en marcha, producción de prueba y asistencia operativa."
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
          <SectionCta onClick={openLead}>Solicitar una consulta técnica</SectionCta>
        </Section>

        <section id="final-cta" className="hero-gradient py-[72px] text-white">
          <div className="site-container flex flex-col items-center text-center">
            <p className="mb-2 text-[13px] font-[850] tracking-[0.1em] text-[#8ce2e8] uppercase">Inicie su proyecto</p>
            <h2 className="max-w-[760px] text-[clamp(28px,3.4vw,40px)] leading-[1.16] font-[850] tracking-[-0.03em]">Obtenga una solución diseñada para su proyecto</h2>
            <p className="mt-3 max-w-[670px] text-[15px] text-white/68">Díganos qué necesita fabricar y empezaremos a planificar su línea de producción de prefabricados.</p>
            <PrimaryButton onClick={() => openLead("Cuéntenos su proyecto")} className="mt-6 max-[720px]:w-full max-[720px]:max-w-[320px]">Cuéntenos su proyecto <ArrowRight size={16} /></PrimaryButton>
          </div>
        </section>
        </main>

        <footer className="bg-[#051a2c] py-6 text-[11px] text-[#89a0b0] max-[720px]:pb-[calc(24px+env(safe-area-inset-bottom))]">
          <div className="site-container flex items-center justify-between gap-5 max-[720px]:flex-col max-[720px]:items-start">
            <span>© 2026 Changsha Ruijie Machinery Technology Co., Ltd. Todos los derechos reservados.</span>
            <div className="flex items-center gap-5 max-[720px]:flex-col max-[720px]:items-start max-[720px]:gap-2">
              <a href="../../privacy/es/" className="underline decoration-white/20 underline-offset-4 transition hover:text-white">Política de privacidad</a>
              <ContactEmail />
            </div>
          </div>
        </footer>

        <MobileContactBar canonicalUrl="https://realjetech.com/marketing/precast-beam-factory/es/" enquireLabel="Consulta" enquiryTitle="Diseño personalizado gratis" hidden={hideMobileCta} onEnquire={openLead} subject="una línea de producción de vigas prefabricadas" />
      </div>

      <LeadModal open={modalOpen} onClose={closeLead} title={leadTitle} />
    </>
  );
}
