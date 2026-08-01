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
    title: "متطلبات الإنتاج",
    text: "أنواع المنتجات والكميات والبرنامج الزمني وهدف الإنتاج اليومي، بما في ذلك مراحل بدء التشغيل ورفع القدرة الإنتاجية",
  },
  {
    icon: MapPin,
    title: "قيود الموقع",
    text: "مساحة الموقع وشكله وطرق الوصول وقدرات الرفع وظروف التخزين التي تحدد التخطيط وتدفق المواد",
  },
  {
    icon: CloudSun,
    title: "القوى العاملة والموارد",
    text: "العمالة الماهرة والمناخ والمرافق وإمدادات الخرسانة وقدرات الصيانة المحلية",
  },
  {
    icon: FileCheck,
    title: "معايير المشروع",
    text: "وثائق التصميم والأكواد المحلية ومعايير القبول والواجهات الهندسية متعددة التخصصات",
  },
];

const methods = [
  {
    icon: Search,
    title: "تحليل الاحتياجات",
    text: "تحديد المنتجات والكميات والبرنامج الزمني والمواصفات وقيود التشغيل المطلوبة، ثم تحويلها إلى متطلبات إنتاج واضحة.",
    output: "متطلبات إنتاج محددة",
  },
  {
    icon: Workflow,
    title: "هندسة العمليات",
    text: "تحسين التخطيط وموازنة زمن التتابع وإزالة الاختناقات وتوفير المرونة اللازمة لإنتاج كفؤ.",
    output: "تصميم العملية والتخطيط",
  },
  {
    icon: Settings,
    title: "اختيار المعدات",
    text: "اختيار المعدات الملائمة للعملية والظروف المحلية وقدرات الصيانة المتاحة.",
    output: "حزمة معدات مخصصة للمشروع",
  },
  {
    icon: CheckCircle,
    title: "تحسين القدرة الإنتاجية",
    text: "مواصلة العمل من التركيب والتشغيل التجريبي إلى الإنتاج الاختباري والتحقق من القدرة حتى يصل الخط إلى إنتاج مستقر.",
    output: "قدرة مستقرة ومتحقق منها",
  },
];

const precastTypes = [
  {
    image: tBeamImage,
    title: "عارضة على شكل T",
    fullName: "عارضة خرسانية مسبقة الصب على شكل T",
    scene: "الطرق السريعة / الجسور العلوية",
    text: "حل مجرّب واقتصادي يُستخدم عادةً في مشاريع الطرق السريعة والجسور العلوية لبحور تتراوح بين 20 و50 م.",
  },
  {
    image: smallBoxGirderImage,
    title: "عارضة صندوقية",
    fullName: "عارضة صندوقية من الخرسانة مسبقة الإجهاد ومسبقة الصب",
    scene: "الجسور المرتفعة / الجسور / الطرق الحضرية",
    text: "يوفر مقطعها الصندوقي المجوف صلابة التواء عالية للجسور الحضرية والتقاطعات والجسور المنحنية والمائلة.",
  },
  {
    image: segmentalBoxGirderImage,
    title: "عارضة صندوقية مكوّنة من قطاعات",
    fullName: "عارضة صندوقية مسبقة الصب مكوّنة من قطاعات",
    scene: "الجسور الحضرية المرتفعة / الجسور البحرية",
    text: "تُجمع القطاعات المصبوبة في المصنع في موقع المشروع، ما يلائم الأشكال الهندسية المعقدة للجسور والمشاريع التي تتطلب الحد من تعطيل حركة المرور.",
  },
  {
    image: uBeamImage,
    title: "عارضة على شكل U",
    fullName: "عارضة خرسانية مسبقة الصب على شكل U",
    scene: "السكك الحديدية الحضرية",
    text: "يوفر عمقها الإنشائي المنخفض وجدرانها الجانبية الحماية والحد من الضوضاء في قطاعات المترو والقطارات الخفيفة المرتفعة.",
  },
  {
    image: iGirderImage,
    title: "عارضة على شكل I",
    fullName: "عارضة خرسانية مسبقة الصب على شكل I",
    scene: "الجسور المرتفعة / الجسور / الجسور المركبة",
    text: "يعمل مقطعها الكفؤ مع بلاطة سطح مركبة مصبوبة في الموقع، ويُستخدم عادةً لبحور الجسور من 25 إلى 45 م.",
  },
  {
    image: fullSpanBoxGirderImage,
    title: "عارضة صندوقية لكامل البحر",
    fullName: "عارضة صندوقية مسبقة الصب لكامل البحر",
    scene: "القطارات عالية السرعة / الطرق السريعة الحضرية",
    text: "تُصب كبحر كامل وتُركب كوحدة واحدة، وتوفر مقاومة عالية للانحناء والالتواء في مشاريع النقل الكبرى.",
  },
  {
    image: doubleTSlabImage,
    title: "عنصر مزدوج على شكل T",
    fullName: "عنصر خرساني مسبق الصب مزدوج على شكل T",
    scene: "الأنفاق السفلية للطرق / محطات المترو",
    text: "يمكن لمقطع العارضة والبلاطة المتكامل أن يشكل مباشرةً بلاطة سقف أو سطح مرور بعد التركيب.",
  },
  {
    image: troughGirderImage,
    title: "عارضة حوضية",
    fullName: "عارضة حوضية خرسانية مسبقة الصب",
    scene: "السكك الحديدية / جسور المشاة",
    text: "تلائم بلاطتها السفلية المسطحة وجدرانها المستقيمة قطاعات المترو المرتفعة وجسور المشاة مسبقة الصب طويلة البحر.",
  },
  {
    image: crashBarrierImage,
    title: "حاجز مروري",
    fullName: "حاجز مروري خرساني مسبق الصب",
    scene: "الجسور المرتفعة / الطرق السريعة / الجسور",
    text: "يُركب على حواف الجسور أو الجزر الوسطية لاحتواء المركبات وتوجيهها وفصل حركة المرور.",
  },
  {
    image: tunnelSegmentImage,
    title: "قطعة تبطين نفق",
    fullName: "قطعة خرسانية مسبقة الصب لتبطين النفق",
    scene: "المترو / أنفاق عبور الأنهار والجبال",
    text: "تُكوّن قطع التبطين الغلاف الدائم الحامل للنفق، وتتطلب دقة عالية في الأبعاد ومقاومة إنشائية وعزلًا مائيًا محكمًا.",
  },
  {
    image: boxCulvertImage,
    title: "عبّارة صندوقية",
    fullName: "عبّارة صندوقية من الخرسانة المسلحة مسبقة الصب",
    scene: "الأنفاق السفلية للطرق / القنوات / أنفاق المرافق",
    text: "تُصب الوحدات الصندوقية المغلقة على أجزاء وتُجمع في الموقع للأنفاق السفلية للطرق والقنوات الكبيرة وأنفاق المرافق.",
  },
  {
    image: stationElementsImage,
    title: "العناصر الإنشائية للمحطات",
    fullName: "عناصر إنشائية مسبقة الصب للمحطات",
    scene: "محطات المترو / مراكز النقل تحت الأرض",
    text: "تُجمع العوارض والأعمدة والبلاطات والجدران الجانبية لتكوين هياكل المحطات تحت الأرض وتقليص مدة الإنشاء.",
  },
  {
    image: interlockingConcreteArmourUnitImage,
    title: "وحدة حماية ساحلية خرسانية متشابكة",
    fullName: "وحدة حماية ساحلية خرسانية متشابكة",
    scene: "كواسر أمواج الموانئ / حماية السواحل",
    text: "تكوّن هندستها المتشابكة طبقة حماية مستقرة لكواسر الأمواج وحماية السواحل والمنشآت الأخرى المعرضة للأمواج.",
  },
];

const lines = [
  {
    image: lineV1Image,
    alt: "خط Realjet الآلي لإنتاج العوارض مسبقة الصب V1.0",
    kicker: "تكوين العملية القياسي",
    title: "خط إنتاج العوارض مسبقة الصب الآلي V1.0",
    visual: "عارضة واحدة/يوم",
    visualLabel: "القدرة اليومية: عارضة واحدة",
    text: "صُمم للمشاريع ذات أنواع العوارض القياسية وأهداف الإنتاج المستقرة، ويجمع بين فتح القوالب وإغلاقها هيدروليكيًا ونقلها على السكك والاهتزاز الخارجي والإجهاد المسبق بمرحلة واحدة. تُضبط القوالب ومحطات العمل ودورات المعالجة بما يتوافق مع خطة الإنتاج.",
  },
  {
    image: lineV2Image,
    alt: "خط Realjet الآلي لإنتاج العوارض مسبقة الصب V2.0",
    kicker: "تكوين عملية عالي الإنتاجية",
    title: "خط إنتاج العوارض مسبقة الصب الآلي V2.0",
    visual: "2–4 عوارض/يوم",
    visualLabel: "القدرة اليومية: 2–4 عوارض",
    text: "صُمم للمشاريع ذات الجداول الحرجة أو الإنتاجية العالية أو المساحات المحدودة، ويجمع بين المعالجة بالبخار داخل القالب والإجهاد المسبق على مرحلتين وفتح القوالب وإغلاقها في أي محطة عمل. وتُحسن المحطات المخصصة والنقل الآلي الإنتاجية ومرونة التشغيل.",
  },
  {
    image: segmentalLineImage,
    alt: "خط Realjet الآلي لإنتاج قطاعات العوارض الصندوقية مسبقة الصب",
    kicker: "تكوين عملية قطاعات العوارض الصندوقية",
    title: "خط آلي لإنتاج قطاعات العوارض الصندوقية",
    visual: "2–3 قطاعات/يوم",
    visualLabel: "القدرة اليومية: 2–3 قطاعات",
    text: "صُمم لإنتاج قطاعات العوارض الصندوقية بمقاسات متعددة، ويجمع بين تموضع الصب المتطابق وقوالب القطاعات المخصصة والمعالجة الآلية بالبخار. ويُحسّن زمن التتابع وفق هندسة القطاع وبرنامج التركيب للحفاظ على إنتاج مستقر وكفاءة استخدام القوالب.",
  },
];

const products = [
  {
    image: hydraulicFormworkImage,
    alt: "قوالب Realjet الهيدروليكية عالية الدقة للعوارض",
    title: "قوالب هيدروليكية عالية الدقة",
    text: "يدعم الفتح والإغلاق الهيدروليكي المتزامن أشكالًا هندسية متعددة للعوارض. وتبقى دقة إعادة التموضع ضمن 0.3 مم بعد 5,000 دورة، بينما تظل فجوة وصلات القالب ضمن 0.5 مم، بما يدعم ثبات الأبعاد في الإنتاج المتسلسل.",
    features: ["تشغيل متزامن", "مرونة هندسية", "قالب مشترك للعوارض الداخلية والخارجية"],
  },
  {
    image: castingBedSystemImage,
    alt: "نظام Realjet لنقل القوالب على السكك",
    title: "نظام نقل القوالب على السكك",
    text: "تنقل عربة تعمل ببطارية ليثيوم فوسفات الحديد قوالب العوارض بين محطات العمل على سكك أرضية. تبلغ دقة التموضع ±1 مم، وتتراوح الحمولة بين 80 و120 طنًا حسب التكوين، ويتجاوز عمر البطارية 5,000 دورة شحن. ويخفض النظام زمن دوران القالب من خمسة أيام إلى يوم واحد.",
    features: ["نقل ببطارية", "التعرف الآلي على محطة العمل", "تموضع بدقة ±1 مم"],
  },
  {
    image: concreteDistributionImage,
    alt: "نظام Realjet لنقل الخرسانة وصبها",
    title: "نظام نقل الخرسانة وصبها",
    text: "ينقل وعاء خرساني علوي وموزع على السكك يُتحكم به عن بُعد الخرسانة في نحو دقيقة واحدة، مع ضبط سماكة الطبقة ضمن ±5 مم. ويخفض النظام احتياجات العمالة بنسبة 37% وزمن صب العارضة بنسبة 40% وفاقد الخرسانة بنسبة 20%.",
    features: ["وعاء خرسانة علوي", "موزع خرسانة على السكك", "صب خرسانة مستمر ومتجانس"],
  },
  {
    image: vibrationSystemImage,
    alt: "نظام Realjet للاهتزاز الخارجي والداخلي",
    title: "نظام اهتزاز مركب",
    text: "يغطي الاهتزاز الخارجي الآلي ما لا يقل عن 80% من سطح القالب، بينما يوفر الاهتزاز الداخلي الموجه تغطية كاملة للمقاطع العميقة المحددة. ولا يلزم سوى مشغل واحد أو اثنين للاهتزاز التكميلي اليدوي.",
    features: ["اهتزاز خارجي آلي", "اهتزاز داخلي موجه", "تسجيل العمليات آليًا"],
  },
  {
    image: curingKilnImage,
    alt: "نظام Realjet للمعالجة الآلية بالبخار",
    title: "نظام المعالجة الآلية بالبخار",
    text: "تستخدم المعالجة داخل القالب الطاقة الشمسية المساندة ومضخات الحرارة الهوائية لضبط معدلات التسخين والتبريد ضمن ±2 °م/ساعة وتفاوت حرارة الحجرة ضمن 3 °م. ويمكن بلوغ مقاومة الخرسانة المطلوبة للإجهاد المسبق خلال 8–14 ساعة. وتقل تكاليف التشغيل بنسبة 49.6% مقارنة بالغاز الطبيعي و30.1% مقارنة بحبيبات الكتلة الحيوية.",
    features: ["معالجة كاملة الدورة داخل القالب", "طاقة شمسية + مضخات حرارة هوائية", "تحكم آلي في الحرارة والرطوبة"],
  },
  {
    image: lineManagementImage,
    alt: "نظام Realjet لإدارة خط الإنتاج",
    title: "نظام إدارة خط الإنتاج",
    text: "ينسق النظام خطط الإنتاج وحالة المعدات وبيانات العمليات، مع استجابة للتشابك التشغيلي خلال ثانية واحدة وجمع للبيانات مرة واحدة على الأقل كل ثانية. ويدعم ما لا يقل عن 200 نقطة إدخال/إخراج وينشئ سجلًا رقميًا مخصصًا لكل عارضة.",
    features: ["جدولة موحدة للعمليات", "سجل رقمي لكل عارضة", "تشخيص ودعم عن بُعد"],
  },
];

const projects = [
  {
    image: shenhaiTj05Image,
    alt: "خط إنتاج مسبق الصب لمشروع القطاع الجنوبي من طريق شِنهاي السريع G15 في نينغبو، العقد TJ05",
    category: "طريق سريع",
    title: "مشروع القطاع الجنوبي من طريق شِنهاي السريع G15 في نينغبو – العقد TJ05",
    englishTitle: "G15 Shenhai Expressway, Ningbo South Section, Contract TJ05",
    line: "خطان لإنتاج عوارض T",
    coreEquipment: ["نقل القوالب", "صب الخرسانة", "الاهتزاز", "المعالجة بالبخار", "الإجهاد المسبق"],
    product: "عوارض T بطول 30 م",
    output: "6 عوارض/يوم",
  },
  {
    image: wenzhouBayBaseImage,
    alt: "خط إنتاج مسبق الصب في قاعدة التصنيع الصناعي للنقل والإنشاءات الحضرية بمنطقة خليج ونتشو الجديدة",
    category: "قاعدة إنتاج صناعية",
    title: "قاعدة التصنيع الصناعي للنقل والإنشاءات الحضرية بمنطقة خليج ونتشو الجديدة",
    englishTitle: "Wenzhou Bay New Area Industrialised Transport and Urban Construction Base",
    line: "4 خطوط لإنتاج عوارض T",
    coreEquipment: ["نقل القوالب", "قوالب هيدروليكية", "الاهتزاز", "صب الخرسانة", "معالجة هجينة"],
    product: "عوارض T بطول 30 و40 م",
    output: "8–12 عارضة/يوم",
  },
  {
    image: yongguanDongtouImage,
    alt: "خط إنتاج مسبق الصب لمشروع فرع دونغتو من طريق يونغقوان السريع",
    category: "فرع طريق سريع",
    title: "مشروع فرع دونغتو من طريق يونغقوان السريع",
    englishTitle: "Yongguan Expressway Dongtou Spur Project",
    line: "خطان لإنتاج قطاعات العوارض الصندوقية",
    coreEquipment: ["نظام نقل قوالب بسعة 300 طن", "قوالب هيدروليكية", "الاهتزاز", "صب الخرسانة", "معالجة هجينة"],
    product: "قطاعات عوارض صندوقية",
    output: "6 قطاعات/يوم",
  },
  {
    image: guangaoTj5Image,
    alt: "تحديث خط الإنتاج لمشروع طريق تشوانتشوسي–هونغيوان السريع",
    category: "تحديث خط قائم",
    title: "مشروع طريق تشوانتشوسي–هونغيوان السريع",
    englishTitle: "Chuanzhusi–Hongyuan Expressway Project",
    line: "تحديث خط الإنتاج القائم",
    coreEquipment: ["صب الخرسانة", "ناقل حزامي", "موزع الخرسانة"],
    product: "عوارض T بطول 20 م",
    output: "20 عارضة/يوم",
  },
];

const capabilities = [
  {
    icon: Compass,
    image: researchDesignImage,
    alt: "قدرات Realjet الهندسية والبحثية",
    title: "الهندسة والبحث والتطوير",
    headline: "تحويل متطلبات المشروع إلى تصميم متكامل لخط الإنتاج",
    text: "يغطي فريق البحث والتطوير التصميم الميكانيكي والتحكم الكهربائي والهيدروليك وخوارزميات البرمجيات وهندسة العمليات. ونصمم الحل وفق نوع المنتج والقدرة والبرنامج الزمني وقيود الموقع، كما يمكننا تطوير عمليات ومعدات جديدة بالتعاون مع العميل للمشاريع الخاصة.",
    stats: [
      { value: "40+", label: "مهندسًا في البحث والتطوير" },
      { value: "50%+", label: "من فريق البحث والتطوير يحملون درجات ماجستير" },
      { value: "5%", label: "من الإيرادات السنوية مستثمر في البحث والتطوير" },
      { value: "150+", label: "براءة اختراع ممنوحة" },
    ],
  },
  {
    icon: Wrench,
    image: manufacturingCapabilityImage,
    alt: "منشأة التصنيع الداخلية لدى Realjet",
    title: "التصنيع الداخلي",
    headline: "تصنيع المعدات الأساسية داخليًا مع رقابة جودة شاملة",
    text: "تغطي 66 آلة كبيرة عمليات القطع والثني والتشغيل واللحام والمعالجة السطحية والتجميع والاختبار، ما يدعم التصنيع الداخلي والتتبع الكامل للجودة للأنظمة الكبيرة المصممة حسب الطلب.",
    stats: [
      { value: "66", label: "معدات تصنيع رئيسية" },
      { value: "±0.005 mm", label: "دقة التموضع" },
      { value: "12", label: "روبوت لحام" },
      { value: "اعتماد مزدوج", label: "ISO 9001 / ISO 3834-2" },
    ],
  },
  {
    icon: HardHat,
    image: projectDeliveryCapabilityImage,
    alt: "تنفيذ Realjet لمشاريع خطوط إنتاج العناصر الخرسانية مسبقة الصب",
    title: "تنفيذ المشروع",
    headline: "لا نكتفي بتوريد المعدات، بل ندعم الخط حتى التشغيل المستقر",
    text: "يمتد نطاقنا من تنسيق الحل والتصنيع إلى التركيب والتشغيل المتكامل والإنتاج التجريبي والتدريب ودعم التشغيل، مع فريق مشروع واحد ينسق واجهات الأعمال المدنية والطاقة والرفع والتحكم.",
    stats: [
      { value: "سنة واحدة", label: "ضمان المعدات" },
      { value: "24/7", label: "دعم عن بُعد" },
      { value: "60 يومًا", label: "التركيب والتشغيل التجريبي" },
      { value: "ساعتان", label: "زمن الاستجابة عند توقف الإنتاج" },
    ],
  },
];

const companyProofs = [
  { value: "منذ 2008", label: "خبرة متواصلة في القطاع" },
  { value: "100,000+ m²", label: "قاعدة إنتاج مملوكة للشركة" },
  { value: "60,000+ m²", label: "منشآت تصنيع المعدات" },
  { value: "شركة مدرجة في NEEQ", label: "رمز السهم 832867" },
];

function BidiMetric({ value }) {
  const text = String(value);
  const match = text.match(/^([0-9.,+%×±/–-]+)(\s*)(.*)$/u);
  if (!match) return text;

  const [, numericPart, spacing, remainder] = match;
  if (!remainder || !/[\u0600-\u06ff]/u.test(remainder)) {
    return <bdi dir="ltr">{text}</bdi>;
  }

  return (
    <>
      <bdi dir="ltr">{numericPart}</bdi>
      {spacing}
      {remainder}
    </>
  );
}

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
        <h3 className="text-[clamp(20px,2.2vw,26px)] font-[850] tracking-[-0.025em] text-brand-navy">العناصر التي يمكن للخط إنتاجها</h3>
        <p className="mt-1.5 max-w-[760px] text-[13px] leading-[1.6] text-muted">يمكن تهيئة كل خط لإنتاج عناصر خرسانية مسبقة الصب مختلفة وفق متطلبات المشروع.</p>
      </div>

      <div className="precast-carousel-shell">
        <button type="button" onClick={() => handleManualMove(-1)} aria-label="العناصر السابقة" className="precast-carousel-control precast-carousel-control-left">
          <ArrowLeft size={18} aria-hidden="true" />
        </button>
        <div ref={trackRef} dir="ltr" className="precast-type-track" aria-label="عارض عناصر الخرسانة مسبقة الصب" onScroll={handleLoopScroll}>
          {[0, 1, 2].map((setIndex) =>
            precastTypes.map(({ image, title, fullName, scene, text }) => (
              <article
                key={`${setIndex}-${title}`}
                data-precast-card
                aria-hidden={setIndex !== 1}
                dir="rtl"
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
        <button type="button" onClick={() => handleManualMove(1)} aria-label="العناصر التالية" className="precast-carousel-control precast-carousel-control-right">
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
    ["الحل", "#method"],
    ["الخطوط", "#lines"],
    ["المعدات", "#products"],
    ["المشاريع", "#projects"],
    ["القدرات", "#capabilities"],
  ];

  return (
    <header className="sticky top-0 z-40 h-[70px] border-b border-white/10 bg-brand-navy/97 text-white backdrop-blur-xl max-[720px]:h-[62px]">
      <div className="site-container flex h-full items-center gap-6 max-[720px]:gap-2">
        <a href="#top" aria-label="Realjet" className="shrink-0">
          <img src={logoImage} alt="شعار Realjet" className="h-8 w-auto max-w-60 object-contain max-[720px]:h-[23px] max-[720px]:max-w-[160px]" />
        </a>
        <nav className="mr-auto flex items-center gap-5 text-xs text-white/70 max-[1100px]:hidden" aria-label="التنقل الرئيسي">
          {nav.map(([label, href]) => <a key={href} href={href} className="transition hover:text-white">{label}</a>)}
        </nav>
        <button onClick={() => onLead("احصل على تصميم خط مجاني")} className="rounded-lg bg-white px-3.5 py-2 text-xs font-[850] text-brand-navy max-[1100px]:mr-auto max-[720px]:hidden">احصل على تصميم خط مجاني</button>
        <LanguageSwitcher current="ar" />
        <button
          type="button"
          aria-label={menuOpen ? "إغلاق قائمة التنقل" : "فتح قائمة التنقل"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((value) => !value)}
          className="hidden rounded-lg border border-white/15 p-2 text-white max-[1100px]:ml-0 max-[1100px]:block"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {menuOpen && (
        <nav className="absolute inset-x-0 top-full border-t border-white/10 bg-brand-navy px-5 py-4 shadow-floating min-[1101px]:hidden" aria-label="تنقل الهاتف">
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
              <span className="block">حلول متكاملة لخطوط إنتاج</span>{" "}
              <span className="block">العناصر الخرسانية مسبقة الصب</span>
            </h1>
            <p className="mt-8 max-w-[570px] text-lg font-normal text-white/72 max-[720px]:text-[15px]">
              من تخطيط الخط واختيار المعدات وتخصيصها إلى التركيب وتحسين القدرة الإنتاجية، تتولى Realjet تنسيق عملية التنفيذ كاملة.
            </p>
            <div className="mt-7.5">
              <PrimaryButton onClick={() => onLead("احصل على تصميم خط مجاني")} className="max-[720px]:w-full max-[720px]:max-w-[320px]">احصل على تصميم خط مجاني <ArrowLeft size={16} /></PrimaryButton>
            </div>
            <div className="mt-5 flex flex-wrap gap-2 max-[720px]:mt-7">
              {["الطرق السريعة", "الجسور", "السكك الحديدية", "مشاريع المياه", "البنية التحتية الحضرية"].map((tag) => (
                <span key={tag} className="rounded-full border border-brand-cyan/35 bg-brand-navy/30 px-2.5 py-1.5 text-[12px] text-white/75 backdrop-blur-sm">{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </section>
      <div id="hero-metrics" className="relative z-30 -mt-6">
        <div className="site-container">
          <div className="grid grid-cols-4 overflow-hidden rounded-[13px] border border-line bg-white shadow-card max-[720px]:grid-cols-2">
            {[["50%", "المساحة المطلوبة", "down"], ["30%", "العمالة في الموقع", "down"], ["3×", "كفاءة نقل القوالب", "up"], ["50%", "مدة المعالجة بالبخار", "down"]].map(([value, label, direction]) => (
              <div key={label} className="border-r border-line px-3.5 py-4 text-center last:border-r-0 max-[720px]:border-b max-[720px]:even:border-r-0">
                <strong className="flex items-center justify-center gap-1 text-[21px] font-[900] text-brand-navy">
                  {direction === "up" ? <ArrowUp size={19} strokeWidth={2.8} aria-hidden="true" /> : <ArrowDown size={19} strokeWidth={2.8} aria-hidden="true" />}
                  <BidiMetric value={value} />
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
    const country = form.elements.country.value.trim() || "الدولة غير مذكورة";
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
      trackLeadSuccess();
      form.reset();
      setSubmitted(true);
      setSubmissionState("success");
    } catch {
      trackLeadError();
      setSubmissionState("error");
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#03111d]/75 p-5 backdrop-blur-lg" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="lead-title" className="relative max-h-[calc(100vh-40px)] w-full max-w-[680px] overflow-auto rounded-[18px] bg-white p-7 shadow-[0_30px_90px_rgba(0,0,0,.35)]">
        <button ref={closeRef} onClick={onClose} aria-label="إغلاق" className="absolute top-3.5 left-4 flex h-9 w-9 items-center justify-center rounded-full bg-soft text-brand-navy"><X size={20} /></button>
        {submitted ? (
          <div className="py-10 text-center">
            <CheckCircle className="mx-auto mb-4 text-brand-cyan" size={48} />
            <strong className="block text-xl font-[850] text-brand-navy">تم إرسال استفسار مشروعك</strong>
            <p className="mt-2 text-xs text-muted">شكرًا لك. سيتواصل معك أحد مختصي Realjet عبر البيانات التي قدمتها.</p>
            <button
              type="button"
              onClick={onClose}
              className="mx-auto mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-[9px] bg-brand-navy px-5 text-[13px] font-[850] text-white"
            >
              <ArrowRight size={15} /> العودة إلى الصفحة
            </button>
          </div>
        ) : (
          <>
            <h3 id="lead-title" className="mr-12 text-2xl font-[850] text-brand-navy">{title}</h3>
            <p className="mt-1.5 mb-5 text-xs text-muted">اسم الشركة واسم جهة الاتصال والبريد الإلكتروني للعمل حقول مطلوبة. أضف تفاصيل المشروع المتاحة أدناه.</p>
            <form name="precast-beam-factory-inquiry" method="POST" data-netlify="true" netlify-honeypot="bot-field" aria-busy={submissionState === "submitting"} onSubmit={handleSubmit}>
              <input type="hidden" name="form-name" value="precast-beam-factory-inquiry" />
              <input type="hidden" name="inquiry_topic" value={title} />
              <input type="hidden" name="title" defaultValue="" />
              <input type="hidden" name="subject" defaultValue="" />
              <input type="hidden" name="bot-field" />
              <fieldset disabled={submissionState === "submitting"} className="min-w-0 disabled:cursor-wait">
                <div className="grid grid-cols-2 gap-3.5 max-[720px]:grid-cols-1">
                  <Field id="company" name="company" label="اسم الشركة *" placeholder="اسم الشركة" icon={Building2} required />
                  <Field id="contact-name" name="contact_name" label="اسم جهة الاتصال *" placeholder="اسمك" icon={User} required />
                  <Field id="country" name="country" label="الدولة / المنطقة" placeholder="موقع المشروع" icon={MapPin} />
                  <Field id="email" name="email" label="البريد الإلكتروني للعمل *" placeholder="name@company.com" icon={Send} type="email" required />
                  <label className="col-span-2 block max-[720px]:col-span-1">
                    <span className="mb-1.5 block text-[11px] font-[850] text-[#3e5668]">تفاصيل المشروع</span>
                    <textarea
                      name="project_details"
                      rows="4"
                      className="focus-control w-full resize-y rounded-lg border border-[#ccd8df] bg-[#fbfcfd] px-3 py-2.5 text-sm text-ink disabled:cursor-wait disabled:bg-[#eef2f5] disabled:text-muted"
                      placeholder="صف بإيجاز نوع المنتج والكمية وهدف الإنتاج أو البرنامج الزمني وظروف الموقع والمرحلة الحالية للمشروع. اترك البنود غير المعروفة فارغة."
                    />
                  </label>
                  <div className="col-span-2 flex items-start gap-2 text-[12px] leading-[1.5] text-muted max-[720px]:col-span-1">
                    <input id="privacy-acknowledgement" type="checkbox" name="privacy_acknowledgement" value="تمت الموافقة على سياسة الخصوصية" required className="mt-1 accent-brand-blue disabled:cursor-wait" />
                    <label htmlFor="privacy-acknowledgement">
                      لقد قرأت{" "}
                      <a href="../../privacy/ar/" target="_blank" rel="noopener noreferrer" className="font-[750] text-brand-blue underline decoration-brand-blue/30 underline-offset-2 hover:text-brand-navy">
                        سياسة الخصوصية
                      </a>{" "}
                      وأفهم أن Realjet ستستخدم معلوماتي للرد على هذا الاستفسار.
                    </label>
                  </div>
                </div>
                {submissionState === "error" && (
                  <p role="alert" className="mt-4 text-[12px] text-red-600">تعذر الإرسال. تحقق من اتصالك وحاول مرة أخرى، أو تواصل معنا لاحقًا.</p>
                )}
                <div className="mt-5 flex justify-end">
                  <button type="submit" className="inline-flex min-h-12 min-w-[92px] items-center justify-center gap-2 rounded-[9px] bg-brand-navy px-5 text-[13px] font-[850] text-white disabled:cursor-wait disabled:opacity-75">
                    {submissionState === "submitting" ? (
                      <><LoaderCircle className="animate-spin" size={17} aria-hidden="true" /> جارٍ الإرسال…</>
                    ) : (
                      <>إرسال تفاصيل المشروع <Send size={15} /></>
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
      راسلنا عبر البريد الإلكتروني
    </a>
  );
}

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [leadTitle, setLeadTitle] = useState("احصل على تصميم خط مجاني");
  const [progress, setProgress] = useState(0);
  const [showAllEquipment, setShowAllEquipment] = useState(false);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [finalCtaVisible, setFinalCtaVisible] = useState(false);
  const [heroMetricsVisible, setHeroMetricsVisible] = useState(true);
  const [mobileCtaVisible, setMobileCtaVisible] = useState(true);
  const lastScrollYRef = useRef(0);
  const scrollStopTimerRef = useRef(null);
  const leadTriggerRef = useRef(null);
  const openLead = (title = "احصل على تصميم خط مجاني") => {
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
      <div id="site-shell" data-locale="ar" dir="rtl">
        <Header onLead={openLead} />
        <div className="fixed top-[69px] left-0 z-50 h-[3px] bg-gradient-to-r from-brand-cyan to-accent-orange max-[720px]:top-[61px]" style={{ width: `${progress}%` }} />
        <main>
        <Hero onLead={openLead} />

        <Section id="method" compactBottom>
          <SectionHeader
            kicker="مسار تطوير الحل"
            title="من مدخلات المشروع إلى خط جاهز للإنتاج"
            text="نحدد أولًا متطلبات الإنتاج وضغط الجدول الزمني وقيود الموقع والقوى العاملة والموارد والظروف المحلية. ثم تحول منهجية التصميم ذات الخطوات الأربع هذه المدخلات إلى قدرة إنتاجية مستقرة."
          />

          <div className="solution-journey">
            <aside className="solution-input-panel">
              <div className="solution-panel-header">
                <span className="section-index">01 · مدخلات المشروع</span>
                <h3>تحديد متطلبات الإنتاج والقيود</h3>
                <p className="solution-panel-description is-dark">تحدد متطلبات الإنتاج وقيود الموقع والقوى العاملة والموارد ومعايير المشروع العملية والتخطيط وحزمة المعدات بصورة مشتركة.</p>
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
              <div className="journey-arrow" aria-hidden="true"><ArrowLeft size={18} /></div>
              <div className="solution-panel-header">
                <span className="section-index text-brand-blue">02 · منهجية REALJET</span>
                <h3>أربع خطوات لتصميم الخط</h3>
                <p className="solution-panel-description">يحافظ تحليل الاحتياجات وهندسة العمليات واختيار المعدات وتحسين القدرة على تركيز كل قرار على الناتج النهائي المطلوب.</p>
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
                    <span className="delivery-output">المخرج · {output}</span>
                  </article>
                ))}
              </div>
            </div>
          </div>
          <SectionCta onClick={openLead}>احصل على تصميم أولي للخط</SectionCta>
          <PrecastTypeCarousel />
        </Section>

        <Section id="lines" soft>
          <SectionHeader
            kicker="تكوينات نموذجية لخطوط الإنتاج"
            title="اعتمد على تقنية مجرّبة لتحديد العملية المناسبة لكل مشروع"
            text="طورنا عمليات إنتاج مجرّبة لمجموعة واسعة من منتجات الخرسانة مسبقة الصب. وللمتطلبات الخاصة، نتعاون مع العملاء في تطوير العمليات وتصميم الحلول وتطوير المعدات والتحقق من الإنتاج."
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
                    <BidiMetric value={visual} />
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
          <SectionCta onClick={openLead}>ناقش عملية الإنتاج الخاصة بك</SectionCta>
        </Section>

        <Section id="products">
          <SectionHeader kicker="معدات الإنتاج الأساسية" title="هيئ الخط وفق عملياته الأساسية" text="لا تُضاف المعدات إلى قائمة فحسب؛ بل يُختار كل نظام ويُدمج وفق نوع المنتج وزمن التتابع وظروف الموقع." />
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
              عرض جميع المعدات
            </button>
          )}
          <SectionCta onClick={openLead}>اطلب تفاصيل المعدات</SectionCta>
        </Section>

        <Section id="projects" soft>
          <SectionHeader
            kicker="مراجع المشاريع"
            title="تتطلب المشاريع المختلفة خطوط إنتاج مختلفة"
            text="نفذت Realjet خطوط إنتاج لمشاريع نقل وبنية تحتية كبرى وحققت إنتاجًا مستقرًا في مواقع متعددة."
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
                  <div className="min-h-[138px] max-[720px]:min-h-0">
                    <h3 className="text-[15px] font-[850] leading-[1.45] tracking-[-0.02em] text-brand-navy">{title}</h3>
                    <p lang="en" dir="ltr" className="mt-2 text-left text-[10px] leading-[1.45] text-muted">{englishTitle}</p>
                  </div>
                  <dl className="mt-3 flex flex-wrap gap-2">
                    <div className="min-w-[108px] flex-1 rounded-[9px] border border-line bg-soft px-3 py-2.5">
                      <dt className="text-[9px] font-[850] tracking-[0.06em] text-muted">تكوين الخط</dt>
                      <dd className="mt-1 text-[11px] font-[850] text-brand-navy">{line}</dd>
                    </div>
                    <div className="min-w-[108px] flex-1 rounded-[9px] border border-line bg-soft px-3 py-2.5">
                      <dt className="text-[9px] font-[850] tracking-[0.06em] text-muted">الإنتاج اليومي</dt>
                      <dd className="mt-1 text-[11px] font-[850] text-brand-navy"><BidiMetric value={output} /></dd>
                    </div>
                  </dl>
                  <div className="mt-3 min-h-[152px] rounded-[9px] border border-brand-blue/10 bg-[#eef6f8] px-3 py-3 max-[720px]:min-h-0">
                    <div className="flex items-center gap-1.5 text-brand-blue">
                      <Settings size={13} aria-hidden="true" />
                      <span className="text-[10px] font-[850] tracking-[0.04em]">المعدات الأساسية</span>
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
              عرض جميع المشاريع
            </button>
          )}
          <SectionCta onClick={openLead}>اطلب مراجع مشاريع إضافية</SectionCta>
        </Section>

        <Section id="capabilities">
          <SectionHeader
            kicker="لماذا Realjet"
            title="ثلاث قدرات تحول الأفكار إلى قدرة إنتاجية"
            text="منذ تأسيسها عام 2008، تقدم Realjet حلولًا متكاملة لمصانع العوارض مسبقة الصب تشمل تخطيط خطوط الإنتاج وبحث المعدات وتطويرها وتصنيعها والتركيب والتشغيل التجريبي والإنتاج الاختباري ودعم التشغيل."
          />
          <div className="mb-5 grid grid-cols-4 overflow-hidden rounded-card border border-line bg-white text-center shadow-card max-[720px]:grid-cols-2">
            {companyProofs.map(({ value, label }) => (
              <div key={label} className="border-r border-line px-5 py-4 last:border-r-0 max-[720px]:border-b max-[720px]:nth-[2n]:border-r-0 max-[720px]:nth-[n+3]:border-b-0">
                <strong className="block text-[20px] font-[900] tracking-[-0.025em] text-brand-navy"><BidiMetric value={value} /></strong>
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
                        <strong className="block text-[15px] font-[900] text-brand-navy"><BidiMetric value={value} /></strong>
                        <span className="mt-0.5 block text-[10px] leading-[1.35] text-muted">{label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
          <SectionCta onClick={openLead}>احجز استشارة فنية</SectionCta>
        </Section>

        <section id="final-cta" className="hero-gradient py-[72px] text-white">
          <div className="site-container flex flex-col items-center text-center">
            <p className="mb-2 text-[13px] font-[850] tracking-[0.1em] text-[#8ce2e8] uppercase">ابدأ مشروعك</p>
            <h2 className="max-w-[760px] text-[clamp(28px,3.4vw,40px)] leading-[1.16] font-[850] tracking-[-0.03em]">احصل على حل مصمم هندسيًا لمشروعك</h2>
            <p className="mt-3 max-w-[670px] text-[15px] text-white/68">أخبرنا بالعناصر التي تحتاج إلى إنتاجها، وسنبدأ تخطيط خط إنتاج العناصر الخرسانية مسبقة الصب المناسب لمشروعك.</p>
            <PrimaryButton onClick={() => openLead("ناقش مشروعك معنا")} className="mt-6 max-[720px]:w-full max-[720px]:max-w-[320px]">ناقش مشروعك معنا <ArrowLeft size={16} /></PrimaryButton>
          </div>
        </section>
        </main>

        <footer className="bg-[#051a2c] py-6 text-[11px] text-[#89a0b0] max-[720px]:pb-[calc(24px+env(safe-area-inset-bottom))]">
          <div className="site-container flex items-center justify-between gap-5 max-[720px]:flex-col max-[720px]:items-start">
            <span>© 2026 Changsha Ruijie Machinery Technology Co., Ltd. جميع الحقوق محفوظة.</span>
            <div className="flex items-center gap-5 max-[720px]:flex-col max-[720px]:items-start max-[720px]:gap-2">
              <a href="../../privacy/ar/" className="underline decoration-white/20 underline-offset-4 transition hover:text-white">سياسة الخصوصية</a>
              <ContactEmail />
            </div>
          </div>
        </footer>

        <button
          onClick={() => openLead("احصل على تصميم خط مجاني")}
          aria-hidden={hideMobileCta}
          tabIndex={hideMobileCta ? -1 : 0}
          className={`fixed right-3.5 bottom-[max(14px,env(safe-area-inset-bottom))] left-3.5 z-40 hidden min-h-12 items-center justify-center gap-2 rounded-[9px] bg-brand-cyan text-sm font-[900] text-brand-navy shadow-floating transition duration-200 max-[720px]:flex ${
            hideMobileCta
              ? "max-[720px]:pointer-events-none max-[720px]:translate-y-20 max-[720px]:opacity-0"
              : "max-[720px]:translate-y-0 max-[720px]:opacity-100"
          }`}
        >
          احصل على تصميم خط مجاني <ArrowLeft size={16} />
        </button>
      </div>

      <LeadModal open={modalOpen} onClose={closeLead} title={leadTitle} />
    </>
  );
}
