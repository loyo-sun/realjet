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
    title: "Programme de production",
    text: "Types de produits, quantités, calendrier et production journalière cible, y compris les jalons de démarrage et de montée en cadence",
  },
  {
    icon: MapPin,
    title: "Contraintes du site",
    text: "Surface, géométrie, accès, moyens de levage et conditions de stockage qui déterminent l’implantation et le flux des matériaux",
  },
  {
    icon: CloudSun,
    title: "Main-d’œuvre et ressources",
    text: "Personnel qualifié, climat, utilités, approvisionnement en béton et capacité locale de maintenance",
  },
  {
    icon: FileCheck,
    title: "Exigences du projet",
    text: "Documents de conception, codes locaux, critères de réception et interfaces entre disciplines",
  },
];

const methods = [
  {
    icon: Search,
    title: "Analyse des besoins",
    text: "Nous définissons les produits, les quantités, le calendrier, les spécifications et les contraintes d’exploitation, puis les traduisons en un programme de production précis.",
    output: "Programme de production défini",
  },
  {
    icon: Workflow,
    title: "Ingénierie des procédés",
    text: "Nous optimisons l’implantation, équilibrons les temps de cycle, supprimons les goulets d’étranglement et intégrons la flexibilité nécessaire à une production efficace.",
    output: "Conception du procédé et de l’implantation",
  },
  {
    icon: Settings,
    title: "Sélection des équipements",
    text: "Nous sélectionnons les équipements adaptés au procédé, aux conditions locales et aux capacités de maintenance disponibles.",
    output: "Ensemble d’équipements adapté au projet",
  },
  {
    icon: CheckCircle,
    title: "Montée en cadence",
    text: "Nous accompagnons l’installation, la mise en service, la production d’essai et la validation des performances jusqu’à l’atteinte d’une cadence stable.",
    output: "Cadence nominale validée",
  },
];

const precastTypes = [
  {
    image: tBeamImage,
    title: "Poutre en T",
    fullName: "Poutre en T préfabriquée en béton",
    scene: "Autoroutes / Passages supérieurs",
    text: "Une solution éprouvée et économique, couramment utilisée pour les autoroutes et passages supérieurs avec des portées de 20 à 50 m.",
  },
  {
    image: smallBoxGirderImage,
    title: "Poutre-caisson",
    fullName: "Poutre-caisson préfabriquée en béton précontraint",
    scene: "Viaducs / Ponts / Voirie urbaine",
    text: "Sa section creuse offre une forte rigidité en torsion pour les viaducs urbains, échangeurs, ponts courbes et ponts biais.",
  },
  {
    image: segmentalBoxGirderImage,
    title: "Voussoir de poutre-caisson",
    fullName: "Voussoir préfabriqué de poutre-caisson",
    scene: "Viaducs urbains / Ponts maritimes",
    text: "Les voussoirs sont préfabriqués en usine puis assemblés sur site, une solution adaptée aux géométries complexes et aux projets qui doivent limiter les perturbations de circulation.",
  },
  {
    image: uBeamImage,
    title: "Poutre en U",
    fullName: "Poutre en U préfabriquée en béton",
    scene: "Transport ferroviaire urbain",
    text: "Sa faible hauteur structurelle et ses âmes latérales assurent protection et atténuation acoustique sur les sections surélevées de métro et de tramway.",
  },
  {
    image: iGirderImage,
    title: "Poutre en I",
    fullName: "Poutre en I préfabriquée en béton",
    scene: "Viaducs / Ponts / Ponts mixtes",
    text: "Sa section efficace travaille avec une dalle collaborante coulée en place et convient couramment aux portées de pont de 25 à 45 m.",
  },
  {
    image: fullSpanBoxGirderImage,
    title: "Poutre-caisson en travée entière",
    fullName: "Poutre-caisson préfabriquée en travée entière",
    scene: "Grande vitesse / Voies rapides urbaines",
    text: "Fabriquée sur toute la longueur d’une travée et posée en un seul élément, elle offre une forte capacité en flexion et en torsion pour les grandes infrastructures de transport.",
  },
  {
    image: doubleTSlabImage,
    title: "Dalle nervurée double T",
    fullName: "Dalle nervurée double T préfabriquée en béton",
    scene: "Passages inférieurs / Stations de métro",
    text: "Ses deux nervures porteuses et sa dalle intégrée permettent de former directement une couverture ou une surface de circulation après la pose.",
  },
  {
    image: troughGirderImage,
    title: "Poutre en auge",
    fullName: "Poutre en auge préfabriquée en béton",
    scene: "Rail / Passerelles",
    text: "Sa dalle inférieure plane et ses âmes droites conviennent aux sections surélevées de métro et aux passerelles préfabriquées de grande portée.",
  },
  {
    image: crashBarrierImage,
    title: "Barrière de sécurité",
    fullName: "Barrière routière préfabriquée en béton",
    scene: "Viaducs / Autoroutes / Ponts",
    text: "Installée en rive de pont ou sur le terre-plein central, elle assure la retenue et le guidage des véhicules ainsi que la séparation des flux.",
  },
  {
    image: tunnelSegmentImage,
    title: "Voussoir de tunnel",
    fullName: "Voussoir préfabriqué en béton pour revêtement de tunnel",
    scene: "Métro / Tunnels sous-fluviaux et de montagne",
    text: "Les voussoirs constituent le revêtement porteur permanent du tunnel et exigent une grande précision dimensionnelle, une résistance élevée et une parfaite étanchéité.",
  },
  {
    image: boxCulvertImage,
    title: "Cadre en béton",
    fullName: "Cadre préfabriqué en béton armé",
    scene: "Passages inférieurs / Canaux / Galeries techniques",
    text: "Les éléments fermés sont fabriqués par tronçons et assemblés sur site pour les passages inférieurs, les grands canaux et les galeries techniques.",
  },
  {
    image: stationElementsImage,
    title: "Éléments structuraux de station",
    fullName: "Éléments structuraux préfabriqués pour stations",
    scene: "Stations de métro / Pôles souterrains",
    text: "Poutres, poteaux, dalles et voiles sont assemblés pour former les structures de stations souterraines et réduire les délais de construction.",
  },
  {
    image: interlockingConcreteArmourUnitImage,
    title: "Bloc artificiel en béton pour carapace",
    fullName: "Bloc artificiel préfabriqué en béton pour carapace",
    scene: "Digues portuaires / Protection côtière",
    text: "Sa géométrie imbriquée permet de constituer une carapace stable pour les digues, les ouvrages de protection côtière et les structures exposées à la houle.",
  },
];

const lines = [
  {
    image: lineV1Image,
    alt: "Ligne automatisée Realjet V1.0 de production de poutres préfabriquées",
    kicker: "Configuration de procédé standard",
    title: "Ligne automatisée de production de poutres préfabriquées V1.0",
    visual: "1 poutre/jour",
    visualLabel: "Production journalière : 1 poutre",
    text: "Conçue pour les projets aux types de poutres standardisés et aux objectifs de production stables, la ligne intègre l’ouverture et la fermeture hydrauliques des moules, leur transfert sur rails, la vibration externe et la précontrainte en une étape. Les moules, postes et cycles de cure sont configurés selon le plan de production.",
  },
  {
    image: lineV2Image,
    alt: "Ligne automatisée Realjet V2.0 de production de poutres préfabriquées",
    kicker: "Configuration à haut rendement",
    title: "Ligne automatisée de production de poutres préfabriquées V2.0",
    visual: "2–4 poutres/jour",
    visualLabel: "Production journalière : 2–4 poutres",
    text: "Conçue pour les projets soumis à des délais serrés, à une forte production ou à un espace limité, la ligne intègre la cure à la vapeur dans le moule, la précontrainte en deux étapes et l’ouverture ou la fermeture du moule à tout poste. Les postes dédiés et le transfert automatisé améliorent le rendement et la flexibilité.",
  },
  {
    image: segmentalLineImage,
    alt: "Ligne automatisée Realjet de production de voussoirs de poutres-caissons",
    kicker: "Configuration pour voussoirs",
    title: "Ligne automatisée de production de voussoirs de poutres-caissons",
    visual: "2–3 voussoirs/jour",
    visualLabel: "Production journalière : 2–3 voussoirs",
    text: "Conçue pour les poutres-caissons à voussoirs et la production flexible de plusieurs dimensions, la ligne intègre le positionnement pour la préfabrication par voussoirs conjugués, des moules dédiés et une cure automatisée à la vapeur. Le temps de cycle est optimisé selon la géométrie des voussoirs et le calendrier de pose.",
  },
];

const products = [
  {
    image: hydraulicFormworkImage,
    alt: "Moules hydrauliques Realjet de haute précision pour poutres",
    title: "Moules hydrauliques de haute précision",
    text: "L’ouverture et la fermeture hydrauliques synchronisées s’adaptent à plusieurs géométries de poutres. La précision de repositionnement reste inférieure à 0,3 mm après 5 000 cycles et le jeu aux joints du moule inférieur à 0,5 mm, pour garantir des dimensions régulières en production de série.",
    features: ["Fonctionnement synchronisé", "Géométrie flexible", "Moule commun pour poutres intérieures / extérieures"],
  },
  {
    image: castingBedSystemImage,
    alt: "Système Realjet de transfert des moules sur rails",
    title: "Système de transfert des moules sur rails",
    text: "Un chariot alimenté par batterie lithium-fer-phosphate transfère les moules entre les postes sur des rails au sol. La précision de positionnement est de ±1 mm, la capacité de charge de 80 à 120 t selon la configuration et la batterie dépasse 5 000 cycles de charge. Le système réduit la rotation du moule de cinq jours à un.",
    features: ["Transfert sur batterie", "Reconnaissance automatique des postes", "Positionnement à ±1 mm"],
  },
  {
    image: concreteDistributionImage,
    alt: "Système Realjet d’acheminement et de distribution du béton",
    title: "Acheminement et distribution du béton",
    text: "Une benne aérienne et un distributeur sur rails télécommandé acheminent le béton en une minute environ, avec une épaisseur de couche maîtrisée à ±5 mm. Le système réduit les besoins en main-d’œuvre de 37 %, le temps de bétonnage par poutre de 40 % et les pertes de béton de 20 %.",
    features: ["Benne aérienne à béton", "Distributeur de béton sur rails", "Mise en place continue et uniforme"],
  },
  {
    image: vibrationSystemImage,
    alt: "Système Realjet combinant vibration externe et interne",
    title: "Système de vibration combinée",
    text: "La vibration externe automatisée couvre au moins 80 % de la surface du moule, tandis que la vibration interne guidée couvre 100 % des zones profondes identifiées. Un ou deux opérateurs seulement sont nécessaires pour les reprises manuelles.",
    features: ["Vibration externe automatisée", "Vibration interne guidée", "Enregistrement automatique du procédé"],
  },
  {
    image: curingKilnImage,
    alt: "Système automatisé Realjet de traitement thermique à la vapeur",
    title: "Système automatisé de traitement thermique à la vapeur",
    text: "La cure dans le moule, alimentée par un complément d’énergie solaire et des pompes à chaleur aérothermiques, maintient les vitesses de chauffe et de refroidissement dans une plage de ±2 °C/h et l’écart de température de l’enceinte dans une plage de 3 °C. La résistance requise pour la mise en précontrainte est atteinte en 8 à 14 heures. Les coûts d’exploitation sont inférieurs de 49,6 % au gaz naturel et de 30,1 % aux granulés de biomasse.",
    features: ["Cycle complet dans le moule", "Solaire + pompes à chaleur aérothermiques", "Contrôle automatisé de la température et de l’humidité"],
  },
  {
    image: lineManagementImage,
    alt: "Système Realjet de gestion de la ligne de production",
    title: "Système de gestion de la ligne de production",
    text: "Le système coordonne les plans de production, l’état des équipements et les données du procédé, avec une réponse d’interverrouillage en moins d’une seconde et une acquisition des données au moins une fois par seconde. Il prend en charge au moins 200 points d’E/S et crée un dossier numérique dédié à chaque poutre.",
    features: ["Ordonnancement intégré du procédé", "Dossier numérique pour chaque poutre", "Diagnostic et assistance à distance"],
  },
];

const projects = [
  {
    image: shenhaiTj05Image,
    alt: "Ligne de production d’éléments préfabriqués pour la section sud de l’autoroute Shenhai G15 à Ningbo, lot TJ05",
    category: "Autoroute",
    title: "Section sud de l’autoroute Shenhai G15 à Ningbo — Lot TJ05",
    englishTitle: "G15 Shenhai Expressway, Ningbo South Section, Contract TJ05",
    line: "2 lignes pour poutres en T",
    coreEquipment: ["Transfert des moules", "Distribution du béton", "Vibration", "Traitement thermique", "Précontrainte"],
    product: "Poutres en T de 30 m",
    output: "6 poutres/jour",
  },
  {
    image: wenzhouBayBaseImage,
    alt: "Ligne de production d’éléments préfabriqués de la base industrielle de la nouvelle zone de la baie de Wenzhou",
    category: "Base industrielle",
    title: "Base industrielle de transport et de construction urbaine de la nouvelle zone de la baie de Wenzhou",
    englishTitle: "Wenzhou Bay New Area Industrialised Transport and Urban Construction Base",
    line: "4 lignes pour poutres en T",
    coreEquipment: ["Transfert des moules", "Moules hydrauliques", "Vibration", "Distribution du béton", "Traitement thermique hybride"],
    product: "Poutres en T de 30 et 40 m",
    output: "8–12 poutres/jour",
  },
  {
    image: yongguanDongtouImage,
    alt: "Ligne de production d’éléments préfabriqués pour la bretelle Dongtou de l’autoroute Yongguan",
    category: "Bretelle autoroutière",
    title: "Projet de la bretelle Dongtou de l’autoroute Yongguan",
    englishTitle: "Yongguan Expressway Dongtou Spur Project",
    line: "2 lignes de voussoirs",
    coreEquipment: ["Transfert de moules 300 t", "Moules hydrauliques", "Vibration", "Distribution du béton", "Traitement thermique hybride"],
    product: "Voussoirs de poutres-caissons",
    output: "6 voussoirs/jour",
  },
  {
    image: guangaoTj5Image,
    alt: "Ligne de production d’éléments préfabriqués pour l’autoroute Chuanzhusi–Hongyuan",
    category: "Modernisation",
    title: "Projet de l’autoroute Chuanzhusi–Hongyuan",
    englishTitle: "Chuanzhusi–Hongyuan Expressway Project",
    line: "Modernisation de ligne existante",
    coreEquipment: ["Distribution du béton", "Convoyeur à bande", "Distributeur"],
    product: "Poutres en T de 20 m",
    output: "20 poutres/jour",
  },
];

const capabilities = [
  {
    icon: Compass,
    image: researchDesignImage,
    alt: "Capacités d’ingénierie et de R&D de Realjet",
    title: "Ingénierie et R&D",
    headline: "Transformer les exigences du projet en une conception intégrée de la ligne",
    text: "Notre équipe R&D couvre la conception mécanique, le contrôle électrique, l’hydraulique, les algorithmes logiciels et l’ingénierie des procédés. Nous concevons la ligne en fonction du produit, de la capacité, du calendrier et des contraintes du site, et pouvons codévelopper des procédés et équipements spécifiques.",
    stats: [
      { value: "40+", label: "Ingénieurs R&D" },
      { value: "50%+", label: "Personnel R&D titulaire d’un master" },
      { value: "5%", label: "Chiffre d’affaires annuel investi en R&D" },
      { value: "150+", label: "Brevets obtenus" },
    ],
  },
  {
    icon: Wrench,
    image: manufacturingCapabilityImage,
    alt: "Site de fabrication interne de Realjet",
    title: "Fabrication en interne",
    headline: "Équipements critiques fabriqués en interne avec un contrôle qualité de bout en bout",
    text: "Soixante-six machines de grande capacité couvrent la découpe, le pliage, l’usinage, le soudage, le traitement de surface, l’assemblage et les essais, avec une traçabilité complète pour les grands systèmes sur mesure.",
    stats: [
      { value: "66", label: "Équipements majeurs de fabrication" },
      { value: "±0,005 mm", label: "Précision de positionnement" },
      { value: "12", label: "Robots de soudage" },
      { value: "Double certification", label: "ISO 9001 / ISO 3834-2" },
    ],
  },
  {
    icon: HardHat,
    image: projectDeliveryCapabilityImage,
    alt: "Livraison de projets de lignes de préfabrication Realjet",
    title: "Réalisation des projets",
    headline: "Au-delà de la livraison des équipements, nous accompagnons la ligne jusqu’à une exploitation stable",
    text: "Notre périmètre va de la coordination de la solution et de la fabrication à l’installation, la mise en service intégrée, la production d’essai, la formation et l’assistance à l’exploitation. Une équipe projet coordonne les interfaces de génie civil, d’alimentation électrique, de levage et de contrôle.",
    stats: [
      { value: "1 an", label: "Garantie des équipements" },
      { value: "24 h/24, 7 j/7", label: "Assistance à distance" },
      { value: "60 jours", label: "Installation et mise en service" },
      { value: "2 heures", label: "Réponse en cas d’arrêt de production" },
    ],
  },
];

const companyProofs = [
  { value: "Depuis 2008", label: "Spécialisation continue dans le secteur" },
  { value: "Plus de 100 000 m²", label: "Base de production détenue par l’entreprise" },
  { value: "Plus de 60 000 m²", label: "Ateliers de fabrication des équipements" },
  { value: "Société cotée au NEEQ", label: "Code boursier 832867" },
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
        <h3 className="text-[clamp(20px,2.2vw,26px)] font-[850] tracking-[-0.025em] text-brand-navy">Éléments que la ligne peut produire</h3>
        <p className="mt-1.5 max-w-[760px] text-[13px] leading-[1.6] text-muted">Chaque ligne peut être configurée pour fabriquer différents éléments préfabriqués en béton selon les exigences du projet.</p>
      </div>

      <div className="precast-carousel-shell">
        <button type="button" onClick={() => handleManualMove(-1)} aria-label="Éléments préfabriqués précédents" className="precast-carousel-control precast-carousel-control-left">
          <ArrowLeft size={18} aria-hidden="true" />
        </button>
        <div ref={trackRef} className="precast-type-track" aria-label="Carrousel des éléments préfabriqués en béton" onScroll={handleLoopScroll}>
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
        <button type="button" onClick={() => handleManualMove(1)} aria-label="Éléments préfabriqués suivants" className="precast-carousel-control precast-carousel-control-right">
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
    ["Lignes", "#lines"],
    ["Équipements", "#products"],
    ["Projets", "#projects"],
    ["Capacités", "#capabilities"],
  ];

  return (
    <header className="sticky top-0 z-40 h-[70px] border-b border-white/10 bg-brand-navy/97 text-white backdrop-blur-xl max-[720px]:h-[62px]">
      <div className="site-container flex h-full items-center gap-6 max-[720px]:gap-2">
        <a href="/" aria-label="Accueil Realjet" className="shrink-0">
          <img src={logoImage} alt="Logo Realjet" className="h-8 w-auto max-w-60 object-contain max-[720px]:h-[23px] max-[720px]:max-w-[160px]" />
        </a>
        <nav className="ml-auto flex items-center gap-5 text-xs text-white/70 max-[1100px]:hidden" aria-label="Navigation principale">
          {nav.map(([label, href]) => <a key={href} href={href} className="transition hover:text-white">{label}</a>)}
        </nav>
        <button onClick={() => onLead("Étude personnalisée gratuite")} className="rounded-lg bg-white px-3.5 py-2 text-xs font-[850] text-brand-navy max-[1100px]:ml-auto max-[720px]:hidden">Étude personnalisée gratuite</button>
        <LanguageSwitcher current="fr" />
        <button
          type="button"
          aria-label={menuOpen ? "Fermer la navigation" : "Ouvrir la navigation"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((value) => !value)}
          className="hidden rounded-lg border border-white/15 p-2 text-white max-[1100px]:ml-0 max-[1100px]:block"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {menuOpen && (
        <nav className="absolute inset-x-0 top-full border-t border-white/10 bg-brand-navy px-5 py-4 shadow-floating min-[1101px]:hidden" aria-label="Navigation mobile">
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
              <span className="block">Lignes clés en main pour produire des</span>{" "}
              <span className="block">éléments préfabriqués en béton</span>
            </h1>
            <p className="mt-8 max-w-[570px] text-lg font-normal text-white/72 max-[720px]:text-[15px]">
              De la planification de la ligne et de la sélection des équipements à leur personnalisation, leur installation et l’optimisation de la capacité, Realjet coordonne l’ensemble du projet.
            </p>
            <div className="mt-7.5">
              <PrimaryButton onClick={() => onLead("Étude personnalisée gratuite")} className="max-[720px]:w-full max-[720px]:max-w-[320px]">Étude personnalisée gratuite <ArrowRight size={16} /></PrimaryButton>
            </div>
            <div className="mt-5 flex flex-wrap gap-2 max-[720px]:mt-7">
              {["Autoroutes", "Ponts", "Rail", "Hydraulique", "Aménagement urbain"].map((tag) => (
                <span key={tag} className="rounded-full border border-brand-cyan/35 bg-brand-navy/30 px-2.5 py-1.5 text-[12px] text-white/75 backdrop-blur-sm">{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </section>
      <div id="hero-metrics" className="relative z-30 -mt-6">
        <div className="site-container">
          <div className="grid grid-cols-4 overflow-hidden rounded-[13px] border border-line bg-white shadow-card max-[720px]:grid-cols-2">
            {[["50%", "Emprise nécessaire", "down"], ["30%", "Personnel sur site", "down"], ["3×", "Efficacité du transfert", "up"], ["50%", "Temps de cure à la vapeur", "down"]].map(([value, label, direction]) => (
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
    const body = createBeamFactoryEnquiryBody(form, { locale: "fr", title });
    setSubmissionState("submitting");

    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
      });

      if (!response.ok) throw new Error("Échec de l’envoi");
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
        <button ref={closeRef} onClick={onClose} aria-label="Fermer" className="absolute top-3.5 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-soft text-brand-navy"><X size={20} /></button>
        {submitted ? (
          <div className="py-10 text-center">
            <CheckCircle className="mx-auto mb-4 text-brand-cyan" size={48} />
            <strong className="block text-xl font-[850] text-brand-navy">Votre demande de projet a été envoyée</strong>
            <p className="mt-2 text-xs text-muted">Merci. Un spécialiste Realjet vous contactera aux coordonnées indiquées.</p>
            <button
              type="button"
              onClick={onClose}
              className="mx-auto mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-[9px] bg-brand-navy px-5 text-[13px] font-[850] text-white"
            >
              <ArrowLeft size={15} /> Retour à la page
            </button>
          </div>
        ) : (
          <>
            <h3 id="lead-title" className="mr-12 text-2xl font-[850] text-brand-navy">{title}</h3>
            <p className="mt-1.5 mb-5 text-xs text-muted">Saisissez votre nom, votre e-mail et votre message.</p>
            <form name={UNIVERSAL_ENQUIRY_FORM_NAME} method="POST" data-netlify="true" netlify-honeypot="bot-field" aria-busy={submissionState === "submitting"} onSubmit={handleSubmit}>
              <input type="hidden" name="form-name" value={UNIVERSAL_ENQUIRY_FORM_NAME} />
              <input type="hidden" name="bot-field" />
              <UniversalEnquiryFields locale="fr" submissionState={submissionState} />
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
      Nous écrire
    </a>
  );
}

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [leadTitle, setLeadTitle] = useState("Étude personnalisée gratuite");
  const [progress, setProgress] = useState(0);
  const [showAllEquipment, setShowAllEquipment] = useState(false);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [finalCtaVisible, setFinalCtaVisible] = useState(false);
  const [heroMetricsVisible, setHeroMetricsVisible] = useState(true);
  const [mobileCtaVisible, setMobileCtaVisible] = useState(true);
  const lastScrollYRef = useRef(0);
  const scrollStopTimerRef = useRef(null);
  const leadTriggerRef = useRef(null);
  const openLead = (title = "Étude personnalisée gratuite") => {
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
      <div id="site-shell" data-locale="fr">
        <Header onLead={openLead} />
        <div className="fixed top-[69px] left-0 z-50 h-[3px] bg-gradient-to-r from-brand-cyan to-accent-orange max-[720px]:top-[61px]" style={{ width: `${progress}%` }} />
        <main>
        <Hero onLead={openLead} />

        <Section id="method" compactBottom>
          <SectionHeader
            kicker="Processus de conception de la solution"
            title="Des données du projet à une ligne prête à produire"
            text="Nous définissons d’abord le programme de production, les délais, le site, les ressources humaines et les conditions locales. Notre méthode en quatre étapes transforme ensuite ces données en une capacité de production stable."
          />

          <div className="solution-journey">
            <aside className="solution-input-panel">
              <div className="solution-panel-header">
                <span className="section-index">01 · DONNÉES DU PROJET</span>
                <h3>Définir la production et ses contraintes</h3>
                <p className="solution-panel-description is-dark">Le programme de production, le site, les ressources et les exigences du projet déterminent ensemble le procédé, l’implantation et l’ensemble des équipements.</p>
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
                <span className="section-index text-brand-blue">02 · MÉTHODE REALJET</span>
                <h3>Quatre étapes pour concevoir la ligne</h3>
                <p className="solution-panel-description">L’analyse des besoins, l’ingénierie des procédés, la sélection des équipements et l’optimisation de la capacité orientent chaque décision vers la production finale requise.</p>
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
                    <span className="delivery-output">RÉSULTAT · {output}</span>
                  </article>
                ))}
              </div>
            </div>
          </div>
          <SectionCta onClick={openLead}>Demander une première étude de ligne</SectionCta>
          <PrecastTypeCarousel />
        </Section>

        <Section id="lines" soft>
          <SectionHeader
            kicker="Configurations types de lignes"
            title="Une technologie éprouvée pour définir le procédé adapté à chaque projet"
            text="Nous avons développé des procédés éprouvés pour de nombreux produits préfabriqués en béton. Pour les besoins particuliers, nous travaillons avec le client sur le procédé, la solution, les équipements et la validation de la production."
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
          <SectionCta onClick={openLead}>Étudier votre procédé de production</SectionCta>
        </Section>

        <Section id="products">
          <SectionHeader kicker="Équipements de production essentiels" title="Configurer la ligne autour de ses opérations critiques" text="Les équipements ne sont pas une simple liste : chaque système est sélectionné et combiné selon le produit, le temps de cycle et les conditions du site." />
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
              Voir tous les équipements
            </button>
          )}
          <SectionCta onClick={openLead}>Demander les détails des équipements</SectionCta>
        </Section>

        <Section id="projects" soft>
          <SectionHeader
            kicker="Projets de référence"
            title="Chaque projet exige une ligne de production différente"
            text="Realjet a livré des lignes pour de grands projets de transport et d’infrastructure et atteint une production stable sur plusieurs sites."
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
                      <dt className="text-[9px] font-[850] tracking-[0.06em] text-muted">CONFIGURATION</dt>
                      <dd className="mt-1 text-[11px] font-[850] text-brand-navy">{line}</dd>
                    </div>
                    <div className="min-w-[108px] flex-1 rounded-[9px] border border-line bg-soft px-3 py-2.5">
                      <dt className="text-[9px] font-[850] tracking-[0.06em] text-muted">PRODUCTION JOURNALIÈRE</dt>
                      <dd className="mt-1 text-[11px] font-[850] text-brand-navy">{output}</dd>
                    </div>
                  </dl>
                  <div className="mt-3 min-h-[152px] rounded-[9px] border border-brand-blue/10 bg-[#eef6f8] px-3 py-3 max-[720px]:min-h-0">
                    <div className="flex items-center gap-1.5 text-brand-blue">
                      <Settings size={13} aria-hidden="true" />
                      <span className="text-[10px] font-[850] tracking-[0.04em]">ÉQUIPEMENTS PRINCIPAUX</span>
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
              Voir tous les projets
            </button>
          )}
          <SectionCta onClick={openLead}>Demander d’autres références</SectionCta>
        </Section>

        <Section id="capabilities">
          <SectionHeader
            kicker="Pourquoi Realjet"
            title="Trois capacités pour transformer une idée en capacité de production"
            text="Fondée en 2008, Realjet fournit des solutions intégrées pour les usines de poutres préfabriquées : planification des lignes, R&D et fabrication des équipements, installation, mise en service, production d’essai et assistance à l’exploitation."
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
          <SectionCta onClick={openLead}>Demander une consultation technique</SectionCta>
        </Section>

        <section id="final-cta" className="hero-gradient py-[72px] text-white">
          <div className="site-container flex flex-col items-center text-center">
            <p className="mb-2 text-[13px] font-[850] tracking-[0.1em] text-[#8ce2e8] uppercase">Démarrez votre projet</p>
            <h2 className="max-w-[760px] text-[clamp(28px,3.4vw,40px)] leading-[1.16] font-[850] tracking-[-0.03em]">Obtenez une solution conçue pour votre projet</h2>
            <p className="mt-3 max-w-[670px] text-[15px] text-white/68">Indiquez-nous ce que vous devez fabriquer et nous commencerons à planifier votre ligne de production d’éléments préfabriqués en béton.</p>
            <PrimaryButton onClick={() => openLead("Parlez-nous de votre projet")} className="mt-6 max-[720px]:w-full max-[720px]:max-w-[320px]">Parlez-nous de votre projet <ArrowRight size={16} /></PrimaryButton>
          </div>
        </section>
        </main>

        <footer className="bg-[#051a2c] py-6 text-[11px] text-[#89a0b0] max-[720px]:pb-[calc(24px+env(safe-area-inset-bottom))]">
          <div className="site-container flex items-center justify-between gap-5 max-[720px]:flex-col max-[720px]:items-start">
            <span>© 2026 Changsha Ruijie Machinery Technology Co., Ltd. Tous droits réservés.</span>
            <div className="flex items-center gap-5 max-[720px]:flex-col max-[720px]:items-start max-[720px]:gap-2">
              <a href="../../privacy/fr/" className="underline decoration-white/20 underline-offset-4 transition hover:text-white">Politique de confidentialité</a>
              <ContactEmail />
            </div>
          </div>
        </footer>

        <MobileContactBar canonicalUrl="https://realjetech.com/marketing/precast-beam-factory/fr/" enquireLabel="Demande" enquiryTitle="Étude personnalisée gratuite" hidden={hideMobileCta} onEnquire={openLead} subject="une ligne de production de poutres préfabriquées" />
      </div>

      <LeadModal open={modalOpen} onClose={closeLead} title={leadTitle} />
    </>
  );
}
