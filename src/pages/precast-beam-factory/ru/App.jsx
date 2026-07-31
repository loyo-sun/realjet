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
    title: "Производственное задание",
    text: "Типы изделий, объёмы, график и целевая суточная производительность, включая этапы запуска и выхода на проектную мощность",
  },
  {
    icon: MapPin,
    title: "Ограничения площадки",
    text: "Площадь, геометрия, подъездные пути, грузоподъёмные средства и условия складирования, определяющие компоновку и поток материалов",
  },
  {
    icon: CloudSun,
    title: "Персонал и ресурсы",
    text: "Квалифицированный персонал, климат, инженерные сети, поставка бетона и местные возможности технического обслуживания",
  },
  {
    icon: FileCheck,
    title: "Требования проекта",
    text: "Проектная документация, местные нормы, критерии приёмки и междисциплинарные инженерные интерфейсы",
  },
];

const methods = [
  {
    icon: Search,
    title: "Анализ требований",
    text: "Определяем требуемые изделия, объёмы, график, технические характеристики и эксплуатационные ограничения, затем формируем чёткое производственное задание.",
    output: "Согласованное производственное задание",
  },
  {
    icon: Workflow,
    title: "Разработка техпроцесса",
    text: "Оптимизируем компоновку, балансируем производственные циклы, устраняем узкие места и предусматриваем необходимую гибкость.",
    output: "Технологическая схема и компоновка",
  },
  {
    icon: Settings,
    title: "Подбор оборудования",
    text: "Подбираем оборудование с учётом технологического процесса, местных условий и доступных возможностей обслуживания.",
    output: "Комплект оборудования под проект",
  },
  {
    icon: CheckCircle,
    title: "Оптимизация мощности",
    text: "Сопровождаем монтаж, пусконаладочные работы, пробный выпуск и подтверждение мощности до достижения стабильной производительности.",
    output: "Стабильная подтверждённая мощность",
  },
];

const precastTypes = [
  {
    image: tBeamImage,
    title: "Т-образная балка",
    fullName: "Сборная железобетонная Т-образная балка",
    scene: "Автомагистрали / Путепроводы",
    text: "Отработанное и экономичное решение для автомагистралей и путепроводов с пролётами 20–50 м.",
  },
  {
    image: smallBoxGirderImage,
    title: "Коробчатая балка",
    fullName: "Сборная предварительно напряжённая железобетонная коробчатая балка",
    scene: "Эстакады / Мосты / Городские дороги",
    text: "Полая коробчатая секция обеспечивает высокую крутильную жёсткость для городских эстакад, развязок, криволинейных и косых мостов.",
  },
  {
    image: segmentalBoxGirderImage,
    title: "Сегмент коробчатой балки",
    fullName: "Сборный железобетонный сегмент коробчатой балки",
    scene: "Городские эстакады / Морские мосты",
    text: "Сегменты изготавливаются на заводе и собираются на объекте, что подходит для сложной геометрии и проектов с минимальным ограничением движения.",
  },
  {
    image: uBeamImage,
    title: "U-образная балка",
    fullName: "Сборная железобетонная U-образная балка",
    scene: "Городской рельсовый транспорт",
    text: "Малая строительная высота и боковые стенки обеспечивают защиту и шумозащиту на эстакадных участках метро и лёгкого рельсового транспорта.",
  },
  {
    image: iGirderImage,
    title: "I-образная балка",
    fullName: "Сборная железобетонная I-образная балка",
    scene: "Эстакады / Мосты / Сталежелезобетонные мосты",
    text: "Эффективное сечение работает совместно с монолитной плитой и широко применяется для мостовых пролётов 25–45 м.",
  },
  {
    image: fullSpanBoxGirderImage,
    title: "Балка на полный пролёт",
    fullName: "Сборная коробчатая балка на полный пролёт",
    scene: "Высокоскоростные железные дороги / Городские магистрали",
    text: "Изготавливается на полную длину пролёта и монтируется одним элементом, обеспечивая высокую несущую способность при изгибе и кручении.",
  },
  {
    image: doubleTSlabImage,
    title: "Двойной Т-элемент",
    fullName: "Сборный железобетонный элемент двойного Т-сечения",
    scene: "Транспортные тоннели / Станции метро",
    text: "Интегрированная ребристая секция после монтажа может непосредственно образовывать покрытие или проезжую часть.",
  },
  {
    image: troughGirderImage,
    title: "Лотковая балка",
    fullName: "Сборная железобетонная лотковая балка",
    scene: "Железные дороги / Пешеходные мосты",
    text: "Плоская нижняя плита и прямые стенки подходят для эстакадных линий метро и сборных пешеходных мостов большой длины.",
  },
  {
    image: crashBarrierImage,
    title: "Дорожное ограждение",
    fullName: "Сборное железобетонное дорожное ограждение",
    scene: "Эстакады / Автомагистрали / Мосты",
    text: "Устанавливается по краям мостов и на разделительных полосах для удержания и направления транспорта и разделения потоков.",
  },
  {
    image: tunnelSegmentImage,
    title: "Тоннельный тюбинг",
    fullName: "Сборный железобетонный тюбинг обделки тоннеля",
    scene: "Метро / Подводные и горные тоннели",
    text: "Тюбинги образуют постоянную несущую обделку тоннеля и требуют высокой точности размеров, прочности и водонепроницаемости.",
  },
  {
    image: boxCulvertImage,
    title: "Прямоугольное звено",
    fullName: "Сборное железобетонное звено прямоугольной трубы",
    scene: "Путепроводы / Каналы / Инженерные тоннели",
    text: "Замкнутые звенья изготавливаются секциями и собираются на объекте для транспортных пересечений, каналов и инженерных тоннелей.",
  },
  {
    image: stationElementsImage,
    title: "Элементы станций",
    fullName: "Сборные железобетонные конструктивные элементы станций",
    scene: "Станции метро / Подземные узлы",
    text: "Балки, колонны, плиты и стены собираются в конструкции подземных станций, сокращая сроки строительства.",
  },
  {
    image: interlockingConcreteArmourUnitImage,
    title: "Волнозащитный блок",
    fullName: "Взаимозацепляющийся бетонный волнозащитный блок",
    scene: "Портовые волноломы / Берегозащита",
    text: "Взаимозацепляющаяся геометрия формирует устойчивый защитный слой волноломов и других сооружений, подверженных воздействию волн.",
  },
];

const lines = [
  {
    image: lineV1Image,
    alt: "Автоматизированная линия Realjet V1.0 по производству сборных железобетонных балок",
    kicker: "Стандартная технологическая схема",
    title: "Автоматизированная линия сборных балок V1.0",
    visual: "1 балка/сут.",
    visualLabel: "Суточная производительность: 1 балка",
    text: "Предназначена для проектов со стандартными типами балок и стабильным планом выпуска. Включает гидравлическое открытие и закрытие форм, перемещение форм по рельсам, наружное вибрирование и одностадийное натяжение арматуры.",
  },
  {
    image: lineV2Image,
    alt: "Автоматизированная линия Realjet V2.0 по производству сборных железобетонных балок",
    kicker: "Высокопроизводительная схема",
    title: "Автоматизированная линия сборных балок V2.0",
    visual: "2–4 балки/сут.",
    visualLabel: "Суточная производительность: 2–4 балки",
    text: "Предназначена для проектов с жёсткими сроками, высокой производительностью или ограниченной площадью. Включает тепловлажностную обработку в форме, двухстадийное натяжение и открытие формы на любом посту.",
  },
  {
    image: segmentalLineImage,
    alt: "Автоматизированная линия Realjet по производству сегментов коробчатых балок",
    kicker: "Схема производства сегментов",
    title: "Автоматизированная линия сегментов коробчатых балок",
    visual: "2–3 сегмента/сут.",
    visualLabel: "Суточная производительность: 2–3 сегмента",
    text: "Предназначена для изготовления сегментов коробчатых балок разных размеров. Включает сопряжённое формование, специальные формы и автоматизированную тепловлажностную обработку.",
  },
];

const products = [
  {
    image: hydraulicFormworkImage,
    alt: "Высокоточные гидравлические формы Realjet для балок",
    title: "Высокоточные гидравлические формы",
    text: "Синхронное гидравлическое открытие и закрытие поддерживает разные геометрии балок. Точность повторного позиционирования остаётся в пределах 0,3 мм после 5 000 циклов, а зазор стыков формы — в пределах 0,5 мм.",
    features: ["Синхронная работа", "Гибкая геометрия", "Общая форма для внутренних / наружных балок"],
  },
  {
    image: castingBedSystemImage,
    alt: "Рельсовая система Realjet для перемещения форм",
    title: "Рельсовая система перемещения форм",
    text: "Тележка с литий-железо-фосфатной батареей перемещает формы между постами по напольным рельсам. Точность позиционирования составляет ±1 мм, грузоподъёмность — 80–120 т, ресурс батареи превышает 5 000 циклов.",
    features: ["Аккумуляторный привод", "Автораспознавание постов", "Позиционирование ±1 мм"],
  },
  {
    image: concreteDistributionImage,
    alt: "Система Realjet транспортирования и распределения бетонной смеси",
    title: "Транспортирование и распределение бетона",
    text: "Подвесной бункер и дистанционно управляемый рельсовый бетонораздатчик подают смесь примерно за одну минуту с точностью толщины слоя ±5 мм. Система снижает трудозатраты на 37 %, время бетонирования балки на 40 % и потери бетона на 20 %.",
    features: ["Подвесной бункер", "Рельсовый бетонораздатчик", "Непрерывная равномерная укладка"],
  },
  {
    image: vibrationSystemImage,
    alt: "Комбинированная система наружного и внутреннего вибрирования Realjet",
    title: "Комбинированная вибрационная система",
    text: "Автоматическое наружное вибрирование охватывает не менее 80 % поверхности формы, а направленное внутреннее вибрирование — 100 % определённых глубоких зон. Для ручной доводки требуется один или два оператора.",
    features: ["Автоматическое наружное вибрирование", "Направленное внутреннее вибрирование", "Автоматическая регистрация процесса"],
  },
  {
    image: curingKilnImage,
    alt: "Автоматизированная система Realjet тепловлажностной обработки бетона",
    title: "Автоматизированная тепловлажностная обработка",
    text: "Обработка в форме с использованием солнечной энергии и воздушных тепловых насосов поддерживает скорость нагрева и охлаждения в пределах ±2 °C/ч, а перепад температуры в камере — в пределах 3 °C. Требуемая перед натяжением прочность достигается за 8–14 часов.",
    features: ["Полный цикл в форме", "Солнечная энергия + тепловые насосы", "Автоконтроль температуры и влажности"],
  },
  {
    image: lineManagementImage,
    alt: "Система Realjet управления производственной линией",
    title: "Система управления линией",
    text: "Система координирует производственные планы, состояние оборудования и технологические данные. Время реакции блокировок — до одной секунды, сбор данных — не реже одного раза в секунду; поддерживается не менее 200 точек ввода-вывода.",
    features: ["Единое планирование", "Цифровой паспорт каждой балки", "Удалённая диагностика и поддержка"],
  },
];

const projects = [
  {
    image: shenhaiTj05Image,
    alt: "Линия сборного железобетона для южного участка автомагистрали G15 Шэньхай в Нинбо, контракт TJ05",
    category: "Автомагистраль",
    title: "Южный участок автомагистрали G15 Шэньхай в Нинбо — контракт TJ05",
    englishTitle: "G15 Shenhai Expressway, Ningbo South Section, Contract TJ05",
    line: "2 линии Т-балок",
    coreEquipment: ["Перемещение форм", "Подача бетона", "Вибрирование", "Тепловлажностная обработка", "Предварительное напряжение"],
    product: "Т-балки 30 м",
    output: "6 балок/сут.",
  },
  {
    image: wenzhouBayBaseImage,
    alt: "Линия сборного железобетона на индустриальной базе нового района залива Вэньчжоу",
    category: "Индустриальная база",
    title: "Индустриальная база транспорта и городского строительства нового района залива Вэньчжоу",
    englishTitle: "Wenzhou Bay New Area Industrialised Transport and Urban Construction Base",
    line: "4 линии Т-балок",
    coreEquipment: ["Перемещение форм", "Гидравлические формы", "Вибрирование", "Подача бетона", "Комбинированная обработка"],
    product: "Т-балки 30 и 40 м",
    output: "8–12 балок/сут.",
  },
  {
    image: yongguanDongtouImage,
    alt: "Линия сборного железобетона для ответвления Дунтоу автомагистрали Юнгуань",
    category: "Ответвление магистрали",
    title: "Проект ответвления Дунтоу автомагистрали Юнгуань",
    englishTitle: "Yongguan Expressway Dongtou Spur Project",
    line: "2 линии сегментов",
    coreEquipment: ["Перемещение форм 300 т", "Гидравлические формы", "Вибрирование", "Подача бетона", "Комбинированная обработка"],
    product: "Сегменты коробчатых балок",
    output: "6 сегментов/сут.",
  },
  {
    image: guangaoTj5Image,
    alt: "Линия сборного железобетона для автомагистрали Чуаньчжусы–Хунъюань",
    category: "Модернизация",
    title: "Проект автомагистрали Чуаньчжусы–Хунъюань",
    englishTitle: "Chuanzhusi–Hongyuan Expressway Project",
    line: "Модернизация действующей линии",
    coreEquipment: ["Подача бетона", "Ленточный конвейер", "Распределитель"],
    product: "Т-балки 20 м",
    output: "20 балок/сут.",
  },
];

const capabilities = [
  {
    icon: Compass,
    image: researchDesignImage,
    alt: "Инженерные и научно-исследовательские возможности Realjet",
    title: "Инжиниринг и НИОКР",
    headline: "Преобразуем требования проекта в комплексную конструкцию линии",
    text: "Команда НИОКР охватывает механику, электрическое управление, гидравлику, программные алгоритмы и технологическое проектирование. Решение учитывает тип изделий, мощность, сроки и ограничения площадки.",
    stats: [
      { value: "40+", label: "Инженеров НИОКР" },
      { value: "50%+", label: "Сотрудников НИОКР со степенью магистра" },
      { value: "5%", label: "Годовой выручки направляется на НИОКР" },
      { value: "150+", label: "Выданных патентов" },
    ],
  },
  {
    icon: Wrench,
    image: manufacturingCapabilityImage,
    alt: "Собственная производственная база Realjet",
    title: "Собственное производство",
    headline: "Критически важное оборудование изготавливается внутри компании с полным контролем качества",
    text: "Шестьдесят шесть крупных станков обеспечивают резку, гибку, мехобработку, сварку, обработку поверхности, сборку и испытания, а также полную прослеживаемость крупных систем.",
    stats: [
      { value: "66", label: "Единиц основного оборудования" },
      { value: "±0.005 mm", label: "Точность позиционирования" },
      { value: "12", label: "Сварочных роботов" },
      { value: "Двойная сертификация", label: "ISO 9001 / ISO 3834-2" },
    ],
  },
  {
    icon: HardHat,
    image: projectDeliveryCapabilityImage,
    alt: "Реализация проектов производственных линий Realjet",
    title: "Реализация проектов",
    headline: "Сопровождаем линию до стабильной эксплуатации, а не только поставляем оборудование",
    text: "Объём работ включает координацию решения, производство, монтаж, комплексные пусконаладочные работы, пробный выпуск, обучение и эксплуатационную поддержку.",
    stats: [
      { value: "1 год", label: "Гарантия на оборудование" },
      { value: "24/7", label: "Удалённая поддержка" },
      { value: "60 дней", label: "Монтаж и пусконаладка" },
      { value: "2 часа", label: "Реакция при остановке производства" },
    ],
  },
];

const companyProofs = [
  { value: "С 2008 года", label: "Непрерывная специализация в отрасли" },
  { value: "100 000+ м²", label: "Собственная производственная база" },
  { value: "60 000+ м²", label: "Производственные цеха" },
  { value: "Компания NEEQ", label: "Биржевой код 832867" },
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
        <h3 className="text-[clamp(20px,2.2vw,26px)] font-[850] tracking-[-0.025em] text-brand-navy">Изделия, выпускаемые линией</h3>
        <p className="mt-1.5 max-w-[760px] text-[13px] leading-[1.6] text-muted">Каждая линия настраивается под производство различных сборных железобетонных изделий в соответствии с требованиями проекта.</p>
      </div>

      <div className="precast-carousel-shell">
        <button type="button" onClick={() => handleManualMove(-1)} aria-label="Предыдущие изделия" className="precast-carousel-control precast-carousel-control-left">
          <ArrowLeft size={18} aria-hidden="true" />
        </button>
        <div ref={trackRef} className="precast-type-track" aria-label="Карусель сборных железобетонных изделий" onScroll={handleLoopScroll}>
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
        <button type="button" onClick={() => handleManualMove(1)} aria-label="Следующие изделия" className="precast-carousel-control precast-carousel-control-right">
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
    ["Решение", "#method"],
    ["Линии", "#lines"],
    ["Оборудование", "#products"],
    ["Проекты", "#projects"],
    ["Возможности", "#capabilities"],
  ];

  return (
    <header className="sticky top-0 z-40 h-[70px] border-b border-white/10 bg-brand-navy/97 text-white backdrop-blur-xl max-[720px]:h-[62px]">
      <div className="site-container flex h-full items-center gap-6 max-[720px]:gap-2">
        <a href="#top" aria-label="Realjet" className="shrink-0">
          <img src={logoImage} alt="Логотип Realjet" className="h-8 w-auto max-w-60 object-contain max-[720px]:h-[23px] max-[720px]:max-w-[160px]" />
        </a>
        <nav className="ml-auto flex items-center gap-5 text-xs text-white/70 max-[1100px]:hidden" aria-label="Основная навигация">
          {nav.map(([label, href]) => <a key={href} href={href} className="transition hover:text-white">{label}</a>)}
        </nav>
        <button onClick={() => onLead("Бесплатный индивидуальный проект")} className="rounded-lg bg-white px-3.5 py-2 text-xs font-[850] text-brand-navy max-[1100px]:ml-auto max-[720px]:hidden">Бесплатный индивидуальный проект</button>
        <LanguageSwitcher current="ru" />
        <button
          type="button"
          aria-label={menuOpen ? "Закрыть навигацию" : "Открыть навигацию"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((value) => !value)}
          className="hidden rounded-lg border border-white/15 p-2 text-white max-[1100px]:ml-0 max-[1100px]:block"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {menuOpen && (
        <nav className="absolute inset-x-0 top-full border-t border-white/10 bg-brand-navy px-5 py-4 shadow-floating min-[1101px]:hidden" aria-label="Мобильная навигация">
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
              <span className="block">Линии под ключ для производства</span>{" "}
              <span className="block">сборных железобетонных изделий</span>
            </h1>
            <p className="mt-8 max-w-[570px] text-lg font-normal text-white/72 max-[720px]:text-[15px]">
              Realjet координирует весь проект: от планирования линии и подбора оборудования до его адаптации, монтажа и выхода на проектную мощность.
            </p>
            <div className="mt-7.5">
              <PrimaryButton onClick={() => onLead("Бесплатный индивидуальный проект")} className="max-[720px]:w-full max-[720px]:max-w-[320px]">Бесплатный индивидуальный проект <ArrowRight size={16} /></PrimaryButton>
            </div>
            <div className="mt-5 flex flex-wrap gap-2 max-[720px]:mt-7">
              {["Автомагистрали", "Мосты", "Железные дороги", "Гидротехника", "Городская инфраструктура"].map((tag) => (
                <span key={tag} className="rounded-full border border-brand-cyan/35 bg-brand-navy/30 px-2.5 py-1.5 text-[12px] text-white/75 backdrop-blur-sm">{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </section>
      <div id="hero-metrics" className="relative z-30 -mt-6">
        <div className="site-container">
          <div className="grid grid-cols-4 overflow-hidden rounded-[13px] border border-line bg-white shadow-card max-[720px]:grid-cols-2">
            {[["50%", "Требуемая площадь", "down"], ["30%", "Персонал на площадке", "down"], ["3×", "Эффективность перемещения", "up"], ["50%", "Время тепловой обработки", "down"]].map(([value, label, direction]) => (
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
    const country = form.elements.country.value.trim() || "Страна не указана";
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

      if (!response.ok) throw new Error("Ошибка отправки");
      form.reset();
      setSubmitted(true);
      setSubmissionState("success");
    } catch {
      setSubmissionState("error");
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#03111d]/75 p-5 backdrop-blur-lg" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="lead-title" className="relative max-h-[calc(100vh-40px)] w-full max-w-[680px] overflow-auto rounded-[18px] bg-white p-7 shadow-[0_30px_90px_rgba(0,0,0,.35)]">
        <button ref={closeRef} onClick={onClose} aria-label="Закрыть" className="absolute top-3.5 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-soft text-brand-navy"><X size={20} /></button>
        {submitted ? (
          <div className="py-10 text-center">
            <CheckCircle className="mx-auto mb-4 text-brand-cyan" size={48} />
            <strong className="block text-xl font-[850] text-brand-navy">Запрос по проекту отправлен</strong>
            <p className="mt-2 text-xs text-muted">Спасибо. Специалист Realjet свяжется с вами по указанным контактным данным.</p>
            <button
              type="button"
              onClick={onClose}
              className="mx-auto mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-[9px] bg-brand-navy px-5 text-[13px] font-[850] text-white"
            >
              <ArrowLeft size={15} /> Вернуться на страницу
            </button>
          </div>
        ) : (
          <>
            <h3 id="lead-title" className="mr-12 text-2xl font-[850] text-brand-navy">{title}</h3>
            <p className="mt-1.5 mb-5 text-xs text-muted">Название компании, контактное лицо и рабочий адрес электронной почты обязательны. Ниже укажите имеющиеся данные проекта.</p>
            <form name="precast-beam-factory-inquiry" method="POST" data-netlify="true" netlify-honeypot="bot-field" aria-busy={submissionState === "submitting"} onSubmit={handleSubmit}>
              <input type="hidden" name="form-name" value="precast-beam-factory-inquiry" />
              <input type="hidden" name="inquiry_topic" value={title} />
              <input type="hidden" name="title" defaultValue="" />
              <input type="hidden" name="subject" defaultValue="" />
              <input type="hidden" name="bot-field" />
              <fieldset disabled={submissionState === "submitting"} className="min-w-0 disabled:cursor-wait">
                <div className="grid grid-cols-2 gap-3.5 max-[720px]:grid-cols-1">
                  <Field id="company" name="company" label="Компания *" placeholder="Название компании" icon={Building2} required />
                  <Field id="contact-name" name="contact_name" label="Контактное лицо *" placeholder="Ваше имя" icon={User} required />
                  <Field id="country" name="country" label="Страна / регион" placeholder="Место реализации проекта" icon={MapPin} />
                  <Field id="email" name="email" label="Рабочая эл. почта *" placeholder="name@company.com" icon={Send} type="email" required />
                  <label className="col-span-2 block max-[720px]:col-span-1">
                    <span className="mb-1.5 block text-[11px] font-[850] text-[#3e5668]">Данные проекта</span>
                    <textarea
                      name="project_details"
                      rows="4"
                      className="focus-control w-full resize-y rounded-lg border border-[#ccd8df] bg-[#fbfcfd] px-3 py-2.5 text-sm text-ink disabled:cursor-wait disabled:bg-[#eef2f5] disabled:text-muted"
                      placeholder="Кратко опишите изделие, объёмы, требуемую производительность или график, условия площадки и текущую стадию проекта. Неизвестные данные можно не указывать."
                    />
                  </label>
                  <div className="col-span-2 flex items-start gap-2 text-[12px] leading-[1.5] text-muted max-[720px]:col-span-1">
                    <input id="privacy-acknowledgement" type="checkbox" name="privacy_acknowledgement" value="Политика конфиденциальности прочитана" required className="mt-1 accent-brand-blue disabled:cursor-wait" />
                    <label htmlFor="privacy-acknowledgement">
                      Я ознакомился с{" "}
                      <a href="../../privacy/ru/" target="_blank" rel="noopener noreferrer" className="font-[750] text-brand-blue underline decoration-brand-blue/30 underline-offset-2 hover:text-brand-navy">
                        Политикой конфиденциальности
                      </a>{" "}
                      и понимаю, что Realjet использует мои данные для ответа на этот запрос.
                    </label>
                  </div>
                </div>
                {submissionState === "error" && (
                  <p role="alert" className="mt-4 text-[12px] text-red-600">Не удалось отправить данные. Проверьте соединение и повторите попытку либо свяжитесь с нами позже.</p>
                )}
                <div className="mt-5 flex justify-end">
                  <button type="submit" className="inline-flex min-h-12 min-w-[92px] items-center justify-center gap-2 rounded-[9px] bg-brand-navy px-5 text-[13px] font-[850] text-white disabled:cursor-wait disabled:opacity-75">
                    {submissionState === "submitting" ? (
                      <><LoaderCircle className="animate-spin" size={17} aria-hidden="true" /> Отправка…</>
                    ) : (
                      <>Отправить данные <Send size={15} /></>
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
      Написать нам
    </a>
  );
}

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [leadTitle, setLeadTitle] = useState("Бесплатный индивидуальный проект");
  const [progress, setProgress] = useState(0);
  const [showAllEquipment, setShowAllEquipment] = useState(false);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [finalCtaVisible, setFinalCtaVisible] = useState(false);
  const [heroMetricsVisible, setHeroMetricsVisible] = useState(true);
  const [mobileCtaVisible, setMobileCtaVisible] = useState(true);
  const lastScrollYRef = useRef(0);
  const scrollStopTimerRef = useRef(null);
  const leadTriggerRef = useRef(null);
  const openLead = (title = "Бесплатный индивидуальный проект") => {
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
      <div id="site-shell" data-locale="ru">
        <Header onLead={openLead} />
        <div className="fixed top-[69px] left-0 z-50 h-[3px] bg-gradient-to-r from-brand-cyan to-accent-orange max-[720px]:top-[61px]" style={{ width: `${progress}%` }} />
        <main>
        <Hero onLead={openLead} />

        <Section id="method" compactBottom>
          <SectionHeader
            kicker="Процесс разработки решения"
            title="От исходных данных до готовой производственной линии"
            text="Сначала мы определяем производственную программу, сроки, условия площадки и доступные ресурсы. Затем четырёхэтапный метод превращает эти данные в стабильную производственную мощность."
          />

          <div className="solution-journey">
            <aside className="solution-input-panel">
              <div className="solution-panel-header">
                <span className="section-index">01 · ДАННЫЕ ПРОЕКТА</span>
                <h3>Определить производственную задачу и ограничения</h3>
                <p className="solution-panel-description is-dark">Производственная программа, площадка, ресурсы и требования проекта совместно определяют технологию, компоновку и комплект оборудования.</p>
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
                <span className="section-index text-brand-blue">02 · МЕТОД REALJET</span>
                <h3>Четыре этапа проектирования линии</h3>
                <p className="solution-panel-description">Анализ требований, разработка технологии, подбор оборудования и оптимизация мощности связывают каждое решение с требуемым результатом.</p>
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
                    <span className="delivery-output">РЕЗУЛЬТАТ · {output}</span>
                  </article>
                ))}
              </div>
            </div>
          </div>
          <SectionCta onClick={openLead}>Получить предварительный проект линии</SectionCta>
          <PrecastTypeCarousel />
        </Section>

        <Section id="lines" soft>
          <SectionHeader
            kicker="Типовые конфигурации линий"
            title="Проверенная технология для выбора процесса под каждый проект"
            text="Мы разработали проверенные процессы для широкого спектра сборных железобетонных изделий. Для специальных задач совместно с заказчиком разрабатываем технологию, решение, оборудование и подтверждаем производство."
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
          <SectionCta onClick={openLead}>Обсудить ваш технологический процесс</SectionCta>
        </Section>

        <Section id="products">
          <SectionHeader kicker="Основное производственное оборудование" title="Настроить линию вокруг ключевых операций" text="Оборудование — не просто перечень: каждая система подбирается и объединяется с учётом изделия, производственного цикла и условий площадки." />
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
              Показать всё оборудование
            </button>
          )}
          <SectionCta onClick={openLead}>Запросить данные оборудования</SectionCta>
        </Section>

        <Section id="projects" soft>
          <SectionHeader
            kicker="Реализованные проекты"
            title="Для каждого проекта требуется своя производственная линия"
            text="Realjet поставила линии для крупных транспортных и инфраструктурных проектов и обеспечила стабильное производство на разных площадках."
          />
          <div className="grid grid-cols-4 gap-4 max-[1000px]:grid-cols-2 max-[720px]:grid-cols-1">
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
                      <dt className="text-[9px] font-[850] tracking-[0.06em] text-muted">КОНФИГУРАЦИЯ</dt>
                      <dd className="mt-1 text-[11px] font-[850] text-brand-navy">{line}</dd>
                    </div>
                    <div className="min-w-[108px] flex-1 rounded-[9px] border border-line bg-soft px-3 py-2.5">
                      <dt className="text-[9px] font-[850] tracking-[0.06em] text-muted">СУТОЧНЫЙ ВЫПУСК</dt>
                      <dd className="mt-1 text-[11px] font-[850] text-brand-navy">{output}</dd>
                    </div>
                  </dl>
                  <div className="mt-3 min-h-[152px] rounded-[9px] border border-brand-blue/10 bg-[#eef6f8] px-3 py-3 max-[720px]:min-h-0">
                    <div className="flex items-center gap-1.5 text-brand-blue">
                      <Settings size={13} aria-hidden="true" />
                      <span className="text-[10px] font-[850] tracking-[0.04em]">ОСНОВНОЕ ОБОРУДОВАНИЕ</span>
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
              Показать все проекты
            </button>
          )}
          <SectionCta onClick={openLead}>Запросить другие проекты</SectionCta>
        </Section>

        <Section id="capabilities">
          <SectionHeader
            kicker="Почему Realjet"
            title="Три компетенции, превращающие идею в производственную мощность"
            text="С 2008 года Realjet предлагает комплексные решения для заводов сборных балок: планирование линий, НИОКР и производство оборудования, монтаж, пусконаладку, пробный выпуск и эксплуатационную поддержку."
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
          <SectionCta onClick={openLead}>Заказать техническую консультацию</SectionCta>
        </Section>

        <section id="final-cta" className="hero-gradient py-[72px] text-white">
          <div className="site-container flex flex-col items-center text-center">
            <p className="mb-2 text-[13px] font-[850] tracking-[0.1em] text-[#8ce2e8] uppercase">Начните свой проект</p>
            <h2 className="max-w-[760px] text-[clamp(28px,3.4vw,40px)] leading-[1.16] font-[850] tracking-[-0.03em]">Получите решение, разработанное под ваш проект</h2>
            <p className="mt-3 max-w-[670px] text-[15px] text-white/68">Сообщите, какие изделия нужно выпускать, и мы начнём проектирование вашей линии сборного железобетона.</p>
            <PrimaryButton onClick={() => openLead("Расскажите о проекте")} className="mt-6 max-[720px]:w-full max-[720px]:max-w-[320px]">Расскажите о проекте <ArrowRight size={16} /></PrimaryButton>
          </div>
        </section>
        </main>

        <footer className="bg-[#051a2c] py-6 text-[11px] text-[#89a0b0] max-[720px]:pb-[calc(24px+env(safe-area-inset-bottom))]">
          <div className="site-container flex items-center justify-between gap-5 max-[720px]:flex-col max-[720px]:items-start">
            <span>© 2026 Changsha Ruijie Machinery Technology Co., Ltd. Все права защищены.</span>
            <div className="flex items-center gap-5 max-[720px]:flex-col max-[720px]:items-start max-[720px]:gap-2">
              <a href="../../privacy/ru/" className="underline decoration-white/20 underline-offset-4 transition hover:text-white">Политикой конфиденциальности</a>
              <ContactEmail />
            </div>
          </div>
        </footer>

        <button
          onClick={() => openLead("Бесплатный индивидуальный проект")}
          aria-hidden={hideMobileCta}
          tabIndex={hideMobileCta ? -1 : 0}
          className={`fixed right-3.5 bottom-[max(14px,env(safe-area-inset-bottom))] left-3.5 z-40 hidden min-h-12 items-center justify-center gap-2 rounded-[9px] bg-brand-cyan text-sm font-[900] text-brand-navy shadow-floating transition duration-200 max-[720px]:flex ${
            hideMobileCta
              ? "max-[720px]:pointer-events-none max-[720px]:translate-y-20 max-[720px]:opacity-0"
              : "max-[720px]:translate-y-0 max-[720px]:opacity-100"
          }`}
        >
          Бесплатный индивидуальный проект <ArrowRight size={16} />
        </button>
      </div>

      <LeadModal open={modalOpen} onClose={closeLead} title={leadTitle} />
    </>
  );
}
