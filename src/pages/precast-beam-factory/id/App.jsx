import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, Building2, CheckCircle, CloudSun, Compass, FileCheck, HardHat, LoaderCircle, MapPin, Menu, Package, Search, Send, Settings, User, Workflow, Wrench, X } from "lucide-react";
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
const inputs = [{
  icon: Package,
  title: "Ringkasan Produksi",
  text: "Jenis produk, jumlah, jadwal, dan target keluaran harian, termasuk tahap permulaan dan peningkatan kapasitas"
}, {
  icon: MapPin,
  title: "Kendala Lokasi Proyek",
  text: "Luas lahan, geometri lokasi, jalan akses, kapasitas pengangkatan, dan area penyimpanan yang memengaruhi tata letak serta aliran material"
}, {
  icon: CloudSun,
  title: "Tenaga Kerja & Sumber Daya",
  text: "Tenaga kerja terampil, iklim, utilitas, pasokan beton, dan kemampuan pemeliharaan lokal"
}, {
  icon: FileCheck,
  title: "Standar Proyek",
  text: "Dokumen desain, kode lokal, kriteria penerimaan, dan antarmuka teknik multidisiplin"
}];
const methods = [{
  icon: Search,
  title: "Analisis Kebutuhan",
  text: "Mendefinisikan produk, jumlah, jadwal, spesifikasi dan batasan operasi yang dibutuhkan, kemudian menerjemahkannya ke dalam ringkasan produksi yang jelas.",
  output: "Kebutuhan produksi yang telah ditetapkan"
}, {
  icon: Workflow,
  title: "Rekayasa Proses",
  text: "Mengoptimalkan tata letak, menyeimbangkan waktu takt (takt time), menghilangkan hambatan, dan membangun fleksibilitas yang diperlukan untuk produksi yang efisien.",
  output: "Desain proses dan tata letak"
}, {
  icon: Settings,
  title: "Pemilihan Peralatan",
  text: "Menentukan peralatan yang sesuai dengan proses, kondisi setempat, dan kemampuan pemeliharaan yang tersedia.",
  output: "Paket peralatan khusus proyek"
}, {
  icon: CheckCircle,
  title: "Optimasi Kapasitas",
  text: "Melanjutkan dari instalasi hingga komisioning, uji coba produksi, dan validasi kapasitas hingga lini mencapai kapasitas produksi yang stabil.",
  output: "Kapasitas produksi yang stabil dan tervalidasi"
}];
const precastTypes = [{
  image: tBeamImage,
  title: "T-Girder",
  fullName: "T-Girder beton pracetak untuk jembatan",
  scene: "Jalan Tol / Jalan Layang",
  text: "Solusi matang dan hemat biaya yang biasa digunakan untuk proyek jalan raya dan jalan layang dengan bentang 20–50 m."
}, {
  image: smallBoxGirderImage,
  title: "Box Girder",
  fullName: "Box Girder beton prategang pracetak",
  scene: "Jembatan Layang / Jembatan / Jalan Perkotaan",
  text: "Penampang kotak berongga memberikan kekakuan torsi yang tinggi untuk jembatan perkotaan, simpang susun, jembatan lengkung, dan jembatan miring."
}, {
  image: segmentalBoxGirderImage,
  title: "Segmental Box Girder",
  fullName: "Segmental Box Girder beton pracetak",
  scene: "Jembatan Layang Perkotaan / Jembatan Penyeberangan Laut",
  text: "Segmen yang dicetak di pabrik dirakit di lokasi, sesuai untuk geometri jembatan yang kompleks dan proyek yang harus meminimalkan gangguan lalu lintas."
}, {
  image: uBeamImage,
  title: "U-Girder",
  fullName: "U-Girder beton pracetak untuk jalur kereta perkotaan",
  scene: "Kereta Perkotaan",
  text: "Kedalaman strukturalnya yang rendah dan dinding samping strukturalnya memberikan perlindungan serta peredaman kebisingan untuk jalur metro dan kereta ringan layang."
}, {
  image: iGirderImage,
  title: "I-Girder",
  fullName: "I-Girder beton prategang pracetak",
  scene: "Jembatan Layang / Jembatan / Jembatan Komposit",
  text: "Penampangnya yang efisien bekerja bersama dek komposit cor di tempat dan umumnya digunakan untuk jembatan dengan bentang 25–45 m."
}, {
  image: fullSpanBoxGirderImage,
  title: "Full-Span Box Girder",
  fullName: "Full-Span Box Girder beton pracetak",
  scene: "Kereta Cepat / Jalan Tol Perkotaan",
  text: "Dicetak sebagai satu bentang penuh dan dipasang sebagai satu unit, komponen ini memberikan kapasitas lentur dan torsi yang tinggi untuk proyek transportasi besar."
}, {
  image: doubleTSlabImage,
  title: "Double Tee",
  fullName: "Elemen beton pracetak Double Tee",
  scene: "Underpass Jalan / Stasiun Metro",
  text: "Penampang balok dan pelat yang terintegrasi dapat langsung membentuk pelat atap atau permukaan lalu lintas setelah pemasangan."
}, {
  image: troughGirderImage,
  title: "Trough Girder",
  fullName: "Trough Girder beton pracetak",
  scene: "Kereta / Jembatan Pejalan Kaki",
  text: "Pelat bawahnya yang datar dan jaringnya yang lurus sesuai dengan bagian metro yang ditinggikan dan jembatan penyeberangan prefabrikasi bentang panjang."
}, {
  image: crashBarrierImage,
  title: "Concrete Barrier",
  fullName: "Concrete Barrier beton pracetak untuk jalan dan jembatan",
  scene: "Jembatan Layang / Jalan Tol / Jembatan",
  text: "Beton pemisah jalur ini dipasang di sepanjang tepi jembatan atau median jalan untuk menahan kendaraan, mengarahkan, dan memisahkan lalu lintas."
}, {
  image: tunnelSegmentImage,
  title: "Segmen Terowongan",
  fullName: "Segmen pelapis terowongan beton pracetak",
  scene: "Metro / Penyeberangan Sungai dan Terowongan Gunung",
  text: "Segmen membentuk lapisan terowongan penahan beban permanen dan memerlukan akurasi dimensi, kekuatan, dan kedap air yang tinggi."
}, {
  image: boxCulvertImage,
  title: "Box Culvert",
  fullName: "Box Culvert beton bertulang pracetak",
  scene: "Underpass Jalan / Saluran / Terowongan Utilitas",
  text: "Unit kotak beton bertulang pracetak dicetak dalam beberapa bagian dan dirakit di lokasi untuk jalan bawah tanah, saluran besar, dan terowongan utilitas."
}, {
  image: stationElementsImage,
  title: "Elemen Struktural Stasiun",
  fullName: "Elemen struktural stasiun beton pracetak",
  scene: "Stasiun Metro / Hub Bawah Tanah",
  text: "Balok, kolom, pelat, dan dinding samping dirakit menjadi struktur stasiun bawah tanah untuk mempersingkat jadwal konstruksi."
}, {
  image: interlockingConcreteArmourUnitImage,
  title: "Unit Lapis Lindung Beton Pracetak",
  fullName: "Unit beton pracetak untuk lapis lindung pantai",
  scene: "Pemecah Gelombang Pelabuhan / Perlindungan Pantai",
  text: "Geometri dan mekanisme saling mengunci antarunit membentuk lapis lindung pemecah gelombang yang stabil untuk melindungi pelabuhan, garis pantai, dan struktur lain yang terpapar gelombang."
}];
const lines = [{
  image: lineV1Image,
  alt: "Lini produksi girder pracetak otomatis Realjet V1.0",
  kicker: "Konfigurasi Proses Standar",
  title: "Lini Produksi Girder Pracetak Otomatis V1.0",
  visual: "1 girder/hari",
  visualLabel: "Kapasitas: 1 girder/hari",
  text: "Dirancang untuk proyek dengan jenis gelagar terstandarisasi dan target kapasitas yang stabil, lini ini mengintegrasikan pembukaan dan penutupan cetakan hidraulik, transfer cetakan berbasis rel, vibrasi cetakan eksternal, dan prategang satu tahap. Cetakan, stasiun kerja, dan siklus perawatan dikonfigurasikan agar sesuai dengan rencana produksi."
}, {
  image: lineV2Image,
  alt: "Lini produksi girder pracetak otomatis Realjet V2.0",
  kicker: "Konfigurasi Proses Kapasitas Tinggi",
  title: "Lini Produksi Girder Pracetak Otomatis V2.0",
  visual: "2–4 girder/hari",
  visualLabel: "Kapasitas: 2–4 girder/hari",
  text: "Dirancang untuk proyek dengan jadwal kritis, kapasitas tinggi, atau ruang terbatas, lini ini mengintegrasikan perawatan uap di dalam cetakan, prategang dua tahap, serta pembukaan dan penutupan cetakan di setiap stasiun kerja. Stasiun kerja khusus dan transfer otomatis meningkatkan kapasitas produksi dan fleksibilitas."
}, {
  image: segmentalLineImage,
  alt: "Lini produksi Segmental Box Girder otomatis Realjet",
  kicker: "Konfigurasi Proses Segmental Box Girder",
  title: "Lini Produksi Segmental Box Girder Otomatis",
  visual: "2–3 segmen/hari",
  visualLabel: "Kapasitas: 2–3 segmen/hari",
  text: "Dirancang untuk Segmental Box Girder dan produksi fleksibel dalam berbagai ukuran, lini ini mengintegrasikan pemosisian pengecoran berpasangan, cetakan segmen khusus, dan perawatan uap otomatis. Waktu takt dioptimalkan berdasarkan geometri segmen dan jadwal pemasangan untuk mempertahankan kapasitas produksi yang stabil serta penggunaan cetakan yang efisien."
}];
const products = [{
  image: hydraulicFormworkImage,
  alt: "Cetakan hidraulik presisi tinggi untuk girder pracetak Realjet",
  title: "Cetakan Hidraulik Presisi Tinggi",
  text: "Pembukaan dan penutupan hidraulik tersinkronisasi mendukung beberapa geometri gelagar. Akurasi pemosisian berulang tetap dalam 0,3 mm setelah 5.000 siklus, sedangkan celah sambungan cetakan tetap dalam 0,5 mm, mendukung dimensi yang konsisten dalam produksi batch.",
  features: ["Operasi Tersinkronisasi", "Geometri Fleksibel", "Cetakan Bersama untuk Balok Interior / Eksterior"]
}, {
  image: castingBedSystemImage,
  alt: "Sistem transfer cetakan berbasis rel Realjet",
  title: "Sistem Transfer Cetakan Berbasis Rel",
  text: "Troli bertenaga baterai litium besi fosfat memindahkan cetakan gelagar antarstasiun kerja pada rel yang dipasang di lantai. Akurasi pemosisian ±1 mm, kapasitas muatan 80–120 ton tergantung konfigurasi, dan umur siklus baterai lebih dari 5.000 kali pengisian. Sistem ini mengurangi waktu penyelesaian cetakan dari lima hari menjadi satu hari.",
  features: ["Transfer Bertenaga Baterai", "Pengenalan Stasiun Kerja Otomatis", "Pemosisian ±1 mm"]
}, {
  image: concreteDistributionImage,
  alt: "Sistem pengangkutan dan pengecoran beton Realjet",
  title: "Sistem Pengangkutan & Pengecoran Beton",
  text: "bucket beton overhead dan distributor beton berbasis rel yang dikendalikan dari jarak jauh menyalurkan beton dalam waktu sekitar satu menit, dengan ketebalan lapisan yang dikontrol dalam ±5 mm. Sistem ini mengurangi kebutuhan tenaga kerja sebesar 37%, waktu pengecoran per gelagar sebesar 40%, dan kehilangan beton sebesar 20%.",
  features: ["Bucket Beton Overhead", "Distributor Beton Berbasis Rel", "Penempatan Beton yang Seragam dan Berkelanjutan"]
}, {
  image: vibrationSystemImage,
  alt: "Sistem vibrasi eksternal dan internal Realjet untuk beton pracetak",
  title: "Sistem Vibrasi Gabungan",
  text: "Vibrasi eksternal otomatis mencakup setidaknya 80% permukaan cetakan, sedangkan vibrasi internal terpandu memberikan cakupan 100% pada bagian dalam yang telah ditentukan. Hanya satu atau dua operator yang diperlukan untuk pemadatan tambahan secara manual.",
  features: ["Vibrasi Eksternal Otomatis", "Vibrasi Internal Terpandu", "Pencatatan Proses Otomatis"]
}, {
  image: curingKilnImage,
  alt: "Sistem perawatan uap otomatis Realjet",
  title: "Sistem Perawatan Uap Otomatis",
  text: "Perawatan dalam cetakan yang didukung oleh sistem energi surya dan pompa kalor sumber udara mengontrol laju pemanasan dan pendinginan dalam ±2 °C/jam dan variasi suhu ruang dalam 3 °C. Kekuatan beton yang dibutuhkan untuk prategang dapat dicapai dalam waktu 8–14 jam. Biaya operasional 49,6% lebih rendah dibandingkan gas alam dan 30,1% lebih rendah dibandingkan pelet biomassa.",
  features: ["Perawatan Siklus Penuh dalam Cetakan", "Sistem Energi Surya + Pompa Kalor Sumber Udara", "Kontrol Suhu & Kelembapan Otomatis"]
}, {
  image: lineManagementImage,
  alt: "Sistem manajemen lini produksi Realjet",
  title: "Sistem Manajemen Lini Produksi",
  text: "Sistem mengoordinasikan rencana produksi, status peralatan, dan data proses, dengan waktu respons interlock proses dalam satu detik dan akuisisi data setidaknya sekali per detik. Sistem ini mendukung setidaknya 200 titik I/O dan membuat catatan digital khusus untuk setiap gelagar.",
  features: ["Penjadwalan Proses Terpadu", "Rekam Digital untuk Setiap Gelagar", "Diagnostik & Dukungan Jarak Jauh"]
}];
const projects = [{
  image: shenhaiTj05Image,
  alt: "Lini produksi pracetak Proyek G15 Shenhai Expressway Ningbo South Section Contract TJ05",
  category: "Jalan Tol",
  title: "G15 Shenhai Expressway, Ningbo South Section, Contract TJ05",
  line: "2 lini produksi T-Girder",
  coreEquipment: ["Pemindahan Cetakan", "Pengecoran Beton", "Vibrasi", "Perawatan Uap", "Prategang"],
  product: "T-Girder 30 m",
  output: "6 girder/hari"
}, {
  image: wenzhouBayBaseImage,
  alt: "Lini produksi pracetak Wenzhou Bay New Area Industrialised Transport and Urban Construction Base",
  category: "Basis Produksi Industri",
  title: "Wenzhou Bay New Area Industrialised Transport and Urban Construction Base",
  line: "4 lini produksi T-Girder",
  coreEquipment: ["Pemindahan Cetakan", "Cetakan Hidraulik", "Vibrasi", "Pengecoran Beton", "Perawatan Hibrida"],
  product: "T-Girder 30 m dan 40 m",
  output: "8–12 girder/hari"
}, {
  image: yongguanDongtouImage,
  alt: "Lini produksi pracetak Yongguan Expressway Dongtou Spur Project",
  category: "Jalan Tol Cabang",
  title: "Yongguan Expressway Dongtou Spur Project",
  line: "2 lini produksi Segmental Box Girder",
  coreEquipment: ["Sistem Transfer Cetakan 300 t", "Cetakan Hidraulik", "Vibrasi", "Pengecoran Beton", "Perawatan Hibrida"],
  product: "Segmental Box Girder",
  output: "6 segmen/hari"
}, {
  image: guangaoTj5Image,
  alt: "Lini produksi pracetak Chuanzhusi–Hongyuan Expressway Project",
  category: "Modernisasi Lini Eksisting",
  title: "Chuanzhusi–Hongyuan Expressway Project",
  line: "Modernisasi lini produksi eksisting",
  coreEquipment: ["Pengecoran Beton", "Konveyor Sabuk", "Distributor Beton"],
  product: "T-Girder 20 m",
  output: "20 girder/hari"
}];
const capabilities = [{
  icon: Compass,
  image: researchDesignImage,
  alt: "Kemampuan rekayasa dan Litbang Realjet",
  title: "Rekayasa & Litbang",
  headline: "Menerjemahkan persyaratan proyek menjadi desain lini yang terintegrasi",
  text: "Tim Litbang kami mencakup desain mekanis, kontrol kelistrikan, hidrolika, algoritme perangkat lunak, dan rekayasa proses. Kami merekayasa berdasarkan jenis produk, kapasitas, jadwal, dan batasan lokasi, dan dapat bersama-sama mengembangkan proses dan peralatan baru untuk proyek khusus.",
  stats: [{
    value: "40+",
    label: "insinyur Litbang"
  }, {
    value: "50%+",
    label: "Tenaga Litbang bergelar magister"
  }, {
    value: "5%",
    label: "Pendapatan tahunan yang diinvestasikan untuk Litbang"
  }, {
    value: "150+",
    label: "Paten yang telah diberikan"
  }]
}, {
  icon: Wrench,
  image: manufacturingCapabilityImage,
  alt: "Fasilitas manufaktur internal Realjet",
  title: "Manufaktur Internal",
  headline: "Peralatan penting diproduksi sendiri dengan kontrol kualitas menyeluruh",
  text: "Enam puluh enam mesin besar mencakup pemotongan, pembengkokan, permesinan, pengelasan, perawatan permukaan, perakitan, dan pengujian, mendukung manufaktur internal dan ketertelusuran kualitas penuh untuk sistem rekayasa khusus berukuran besar.",
  stats: [{
    value: "66",
    label: "Peralatan Manufaktur Utama"
  }, {
    value: "±0,005mm",
    label: "Akurasi Pemosisian"
  }, {
    value: "12",
    label: "Robot Pengelasan"
  }, {
    value: "Sertifikasi Ganda",
    label: "ISO 9001 / ISO 3834-2"
  }]
}, {
  icon: HardHat,
  image: projectDeliveryCapabilityImage,
  alt: "Pelaksanaan proyek lini produksi beton pracetak Realjet",
  title: "Pelaksanaan Proyek",
  headline: "Selain memasok peralatan, kami mendukung lini hingga beroperasi secara stabil",
  text: "Cakupan kami mencakup mulai dari koordinasi solusi dan manufaktur hingga instalasi, komisioning sistem terintegrasi, produksi uji coba, pelatihan, dan dukungan pengoperasian, dengan satu tim proyek yang mengoordinasikan antarmuka sipil, listrik, pengangkatan, dan kontrol.",
  stats: [{
    value: "1 tahun",
    label: "Garansi peralatan"
  }, {
    value: "24/7",
    label: "Dukungan Jarak Jauh"
  }, {
    value: "60 hari",
    label: "Instalasi & Komisioning"
  }, {
    value: "2 jam",
    label: "Waktu Respons saat Produksi Terhenti"
  }]
}];
const companyProofs = [{
  value: "Sejak 2008",
  label: "Pengalaman berkelanjutan di industri"
}, {
  value: "100.000+ m²",
  label: "Fasilitas produksi milik perusahaan"
}, {
  value: "60.000+ m²",
  label: "Fasilitas manufaktur peralatan"
}, {
  value: "Perusahaan Tercatat di NEEQ",
  label: "Kode Saham 832867"
}];
function PrimaryButton({
  children,
  onClick,
  dark = false,
  className = ""
}) {
  return <button type="button" onClick={onClick} className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-[9px] px-5 text-[13px] font-[850] transition duration-180 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 ${dark ? "bg-brand-navy text-white focus-visible:outline-brand-blue" : "bg-brand-cyan text-brand-navy focus-visible:outline-white"} ${className}`}>
      {children}
    </button>;
}
function SectionHeader({
  kicker,
  title,
  text
}) {
  return <div className="mb-6 max-w-[760px]">
      <p className="mb-1.5 text-[16px] font-[850] tracking-[0.08em] text-brand-blue uppercase">{kicker}</p>
      <h2 className="text-[clamp(22px,2.6vw,30px)] leading-[1.18] font-[850] tracking-[-0.025em] text-ink">{title}</h2>
      <p className="mt-3 max-w-[710px] text-[16px] leading-[1.6] text-muted">{text}</p>
    </div>;
}
function Section({
  id,
  soft = false,
  compactBottom = false,
  children
}) {
  return <section id={id} className={`${compactBottom ? "pt-[78px] pb-[34px] max-[720px]:pt-[62px] max-[720px]:pb-[28px]" : "py-[78px] max-[720px]:py-[62px]"} ${soft ? "bg-soft" : "bg-white"}`}>
      <div className="site-container">{children}</div>
    </section>;
}
function SectionCta({
  children,
  onClick
}) {
  return <div className="mt-7 flex justify-center max-[720px]:hidden">
      <PrimaryButton dark onClick={() => onClick(children)}>{children}</PrimaryButton>
    </div>;
}
function PrecastTypeCarousel() {
  const carouselRef = useRef(null);
  const trackRef = useRef(null);
  const [paused, setPaused] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [cycleVersion, setCycleVersion] = useState(0);
  const getCardStep = track => {
    const card = track?.querySelector("[data-precast-card]");
    return card ? card.getBoundingClientRect().width + 16 : 0;
  };
  const jumpWithoutAnimation = (track, left) => {
    track.style.scrollBehavior = "auto";
    track.scrollLeft = left;
    window.requestAnimationFrame(() => track.style.removeProperty("scroll-behavior"));
  };
  const moveCarousel = direction => {
    const track = trackRef.current;
    const distance = getCardStep(track);
    if (!track || !distance) return;
    track.scrollBy({
      left: direction * distance,
      behavior: "smooth"
    });
  };
  const handleManualMove = direction => {
    moveCarousel(direction);
    setCycleVersion(version => version + 1);
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
    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting && entry.intersectionRatio >= 0.35), {
      threshold: [0, 0.35]
    });
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
  return <div ref={carouselRef} className="mt-9 border-t border-line pt-8" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocusCapture={() => setPaused(true)} onBlurCapture={() => setPaused(false)}>
      <div className="mb-2.5">
        <h3 className="text-[clamp(20px,2.2vw,26px)] font-[850] tracking-[-0.025em] text-brand-navy">Komponen Pracetak yang Dapat Diproduksi</h3>
        <p className="mt-1.5 max-w-[760px] text-[13px] leading-[1.6] text-muted">Setiap lini produksi dapat dikonfigurasi untuk memproduksi komponen beton pracetak yang berbeda sesuai dengan kebutuhan proyek.</p>
      </div>

      <div className="precast-carousel-shell">
        <button type="button" onClick={() => handleManualMove(-1)} aria-label="Komponen pracetak sebelumnya" className="precast-carousel-control precast-carousel-control-left">
          <ArrowLeft size={18} aria-hidden="true" />
        </button>
        <div ref={trackRef} className="precast-type-track" aria-label="Korsel komponen beton pracetak" onScroll={handleLoopScroll}>
          {[0, 1, 2].map(setIndex => precastTypes.map(({
          image,
          title,
          fullName,
          scene,
          text
        }) => <article key={`${setIndex}-${title}`} data-precast-card aria-hidden={setIndex !== 1} className="precast-type-card snap-start rounded-card border border-[#e6edf1] bg-white/90 p-5 shadow-[0_10px_28px_rgba(8,37,63,.045)]">
                <div className="relative -mx-5 -mt-5 aspect-video overflow-hidden rounded-t-card bg-[#edf2f5]">
                  <img src={image} alt={fullName} loading="lazy" className="h-full w-full object-cover transition duration-500 hover:scale-[1.025]" />
                </div>
                <h4 className="mt-4 text-[18px] font-[850] tracking-[-0.02em] text-brand-navy">{title}</h4>
                <div className="mt-3 flex min-h-8 items-start gap-1.5 rounded-lg bg-soft/75 px-2.5 py-2 text-[11px] font-[750] leading-[1.45] text-[#456072]">
                  <MapPin size={12} className="mt-0.5 shrink-0 text-brand-blue" aria-hidden="true" />
                  <span>{scene}</span>
                </div>
                <p className="mt-3 text-[13px] leading-[1.65] text-muted">{text}</p>
              </article>))}
        </div>
        <button type="button" onClick={() => handleManualMove(1)} aria-label="Komponen pracetak berikutnya" className="precast-carousel-control precast-carousel-control-right">
          <ArrowRight size={18} aria-hidden="true" />
        </button>
      </div>
    </div>;
}
function VisualPanel({
  icon: Icon,
  label,
  index
}) {
  return <div className="industrial-grid relative flex aspect-video items-center justify-center overflow-hidden bg-[#e4edf2]">
      <div className="absolute inset-x-8 top-1/2 h-px bg-brand-blue/20" />
      <div className="absolute inset-y-7 left-1/2 w-px bg-brand-blue/20" />
      <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl border border-white/80 bg-white/85 text-brand-blue shadow-card">
        <Icon size={38} strokeWidth={1.6} aria-hidden="true" />
      </div>
      {index && <span className="absolute top-4 right-4 text-[10px] font-[850] tracking-[0.16em] text-brand-blue/55">{index}</span>}
      {label && <span className="absolute inset-x-4 bottom-4 text-center text-[10px] font-[750] text-muted">{label}</span>}
    </div>;
}
function Header({
  onLead
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const nav = [["Solusi", "#method"], ["Lini", "#lines"], ["Peralatan", "#products"], ["Proyek", "#projects"], ["Kemampuan", "#capabilities"]];
  return <header className="sticky top-0 z-40 h-[70px] border-b border-white/10 bg-brand-navy/97 text-white backdrop-blur-xl max-[720px]:h-[62px]">
      <div className="site-container flex h-full items-center gap-6 max-[720px]:gap-2">
        <a href="#top" aria-label="Realjet" className="shrink-0">
          <img src={logoImage} alt="Realjet logo" className="h-8 w-auto max-w-60 object-contain max-[720px]:h-[23px] max-[720px]:max-w-[160px]" />
        </a>
        <nav className="ml-auto flex items-center gap-5 text-xs text-white/70 max-[1100px]:hidden" aria-label="Navigasi utama">
          {nav.map(([label, href]) => <a key={href} href={href} className="transition hover:text-white">{label}</a>)}
        </nav>
        <button onClick={() => onLead("Dapatkan Rancangan Lini Gratis")} className="rounded-lg bg-white px-3.5 py-2 text-xs font-[850] text-brand-navy max-[1100px]:ml-auto max-[820px]:hidden">Dapatkan Rancangan Lini Gratis</button>
        <div className="shrink-0 max-[820px]:ml-auto">
          <LanguageSwitcher current="id" />
        </div>
        <button type="button" aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} onClick={() => setMenuOpen(value => !value)} className="hidden rounded-lg border border-white/15 p-2 text-white max-[1100px]:ml-0 max-[1100px]:block">
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {menuOpen && <nav className="absolute inset-x-0 top-full border-t border-white/10 bg-brand-navy px-5 py-4 shadow-floating min-[1101px]:hidden" aria-label="Navigasi seluler">
          <div className="site-container grid gap-1">
            {nav.map(([label, href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)} className="rounded-lg px-3 py-2.5 text-sm text-white/75 hover:bg-white/5 hover:text-white">{label}</a>)}
          </div>
        </nav>}
    </header>;
}
function Hero({
  onLead
}) {
  return <>
      <section id="top" className="hero-gradient relative isolate h-[calc(100vh-124px)] min-h-[610px] overflow-hidden text-white max-[720px]:h-auto max-[720px]:min-h-[610px]">
        <img src={heroImage} alt="" aria-hidden="true" className="hero-image-mask absolute inset-y-0 right-0 z-0 h-full w-[72%] object-cover object-right max-[1000px]:w-[78%] max-[720px]:hidden" />
        <div className="hero-overlay absolute inset-0 z-10" />
        <div className="site-container relative z-20 flex h-full min-h-[610px] items-center py-12 pb-[60px] max-[720px]:min-h-[610px] max-[720px]:items-center max-[720px]:py-16">
          <div className="w-[min(680px,56%)] max-[1000px]:w-[66%] max-[720px]:w-full">
            <h1 className="max-w-[650px] text-[clamp(38px,3.5vw,48px)] leading-[1.13] font-[900] tracking-[-0.045em] max-[1000px]:text-[clamp(36px,5vw,44px)] max-[720px]:text-[33px]">
              Solusi Lini Produksi Terintegrasi untuk Komponen Beton Pracetak
            </h1>
            <p className="mt-8 max-w-[570px] text-lg font-normal text-white/72 max-[720px]:text-[15px]">
              Mulai dari perancangan lini dan pemilihan peralatan hingga instalasi, komisioning, dan optimalisasi kapasitas, Realjet menangani seluruh proses pelaksanaan secara terpadu.
            </p>
            <div className="mt-7.5">
              <PrimaryButton onClick={() => onLead("Dapatkan Rancangan Lini Gratis")} className="max-[720px]:w-full max-[720px]:max-w-[320px]">Dapatkan Rancangan Lini Gratis <ArrowRight size={16} /></PrimaryButton>
            </div>
            <div className="mt-5 flex flex-wrap gap-2 max-[720px]:mt-7">
              {["Jalan Tol", "Jembatan", "Perkeretaapian", "Sumber Daya Air", "Infrastruktur Perkotaan"].map(tag => <span key={tag} className="rounded-full border border-brand-cyan/35 bg-brand-navy/30 px-2.5 py-1.5 text-[12px] text-white/75 backdrop-blur-sm">{tag}</span>)}
            </div>
          </div>
        </div>
      </section>
      <div id="hero-metrics" className="relative z-30 -mt-6">
        <div className="site-container">
          <div className="grid grid-cols-4 overflow-hidden rounded-[13px] border border-line bg-white shadow-card max-[720px]:grid-cols-2">
            {[["50%", "Kebutuhan Lahan", "down"], ["30%", "Tenaga Kerja Lapangan", "down"], ["3×", "Efisiensi Pemindahan Cetakan", "up"], ["50%", "Durasi Perawatan Uap", "down"]].map(([value, label, direction]) => <div key={label} className="border-r border-line px-3.5 py-4 text-center last:border-r-0 max-[720px]:border-b max-[720px]:even:border-r-0">
                <strong className="flex items-center justify-center gap-1 text-[21px] font-[900] text-brand-navy">
                  {direction === "up" ? <ArrowUp size={19} strokeWidth={2.8} aria-hidden="true" /> : <ArrowDown size={19} strokeWidth={2.8} aria-hidden="true" />}
                  {value}
                </strong>
                <span className="text-[11px] text-muted">{label}</span>
              </div>)}
          </div>
        </div>
      </div>
    </>;
}
function LeadModal({
  open,
  onClose,
  title
}) {
  const [submitted, setSubmitted] = useState(false);
  const [submissionState, setSubmissionState] = useState("idle");
  const closeRef = useRef(null);
  const dialogRef = useRef(null);
  useEffect(() => {
    document.body.classList.toggle("modal-open", open);
    const siteShell = document.getElementById("site-shell");
    if (siteShell) {
      siteShell.inert = open;
      if (open) siteShell.setAttribute("aria-hidden", "true");else siteShell.removeAttribute("aria-hidden");
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
    const onKey = event => {
      if (!open) return;
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab") return;
      const dialog = dialogRef.current;
      if (!dialog) return;
      const focusable = Array.from(dialog.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])')).filter(element => element.getAttribute("aria-hidden") !== "true" && element.offsetParent !== null);
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
  const handleSubmit = async event => {
    event.preventDefault();
    const form = event.currentTarget;
    const company = form.elements.company.value.trim();
    const country = form.elements.country.value.trim() || "Country not provided";
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
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body
      });
      if (!response.ok) throw new Error("Submission failed");
      form.reset();
      setSubmitted(true);
      setSubmissionState("success");
    } catch {
      setSubmissionState("error");
    }
  };
  return <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#03111d]/75 p-5 backdrop-blur-lg" onMouseDown={event => event.target === event.currentTarget && onClose()}>
      <div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="lead-title" className="relative max-h-[calc(100vh-40px)] w-full max-w-[680px] overflow-auto rounded-[18px] bg-white p-7 shadow-[0_30px_90px_rgba(0,0,0,.35)]">
        <button ref={closeRef} onClick={onClose} aria-label="Tutup" className="absolute top-3.5 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-soft text-brand-navy"><X size={20} /></button>
        {submitted ? <div className="py-10 text-center">
            <CheckCircle className="mx-auto mb-4 text-brand-cyan" size={48} />
            <strong className="block text-xl font-[850] text-brand-navy">Permintaan Proyek Anda Telah Dikirim</strong>
            <p className="mt-2 text-xs text-muted">Terima kasih. Spesialis Realjet akan menghubungi Anda melalui informasi kontak yang Anda berikan.</p>
            <button type="button" onClick={onClose} className="mx-auto mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-[9px] bg-brand-navy px-5 text-[13px] font-[850] text-white">
              <ArrowLeft size={15} /> Kembali ke Halaman
            </button>
          </div> : <>
            <h3 id="lead-title" className="mr-12 text-2xl font-[850] text-brand-navy">{title}</h3>
            <p className="mt-1.5 mb-5 text-xs text-muted">Perusahaan, nama kontak dan email bisnis diperlukan. Tambahkan detail proyek apa pun yang tersedia di bawah.</p>
            <form name="precast-beam-factory-inquiry" method="POST" data-netlify="true" netlify-honeypot="bot-field" aria-busy={submissionState === "submitting"} onSubmit={handleSubmit}>
              <input type="hidden" name="form-name" value="precast-beam-factory-inquiry" />
              <input type="hidden" name="inquiry_topic" value={title} />
              <input type="hidden" name="title" defaultValue="" />
              <input type="hidden" name="subject" defaultValue="" />
              <input type="hidden" name="bot-field" />
              <fieldset disabled={submissionState === "submitting"} className="min-w-0 disabled:cursor-wait">
                <div className="grid grid-cols-2 gap-3.5 max-[720px]:grid-cols-1">
                  <Field id="company" name="company" label="Nama Perusahaan *" placeholder="Nama perusahaan" icon={Building2} required />
                  <Field id="contact-name" name="contact_name" label="Nama Kontak *" placeholder="Nama Anda" icon={User} required />
                  <Field id="country" name="country" label="Negara/Wilayah" placeholder="Lokasi proyek" icon={MapPin} />
                  <Field id="email" name="email" label="Email Bisnis *" placeholder="nama@perusahaan.com" icon={Send} type="email" required />
                  <label className="col-span-2 block max-[720px]:col-span-1">
                    <span className="mb-1.5 block text-[11px] font-[850] text-[#3e5668]">Detail Proyek</span>
                    <textarea name="project_details" rows="4" className="focus-control w-full resize-y rounded-lg border border-[#ccd8df] bg-[#fbfcfd] px-3 py-2.5 text-sm text-ink disabled:cursor-wait disabled:bg-[#eef2f5] disabled:text-muted" placeholder="Jelaskan secara singkat jenis produk, kuantitas, target keluaran atau jadwal, kondisi lokasi, dan tahapan proyek saat ini. Biarkan item yang tidak diketahui kosong." />
                  </label>
                  <div className="col-span-2 flex items-start gap-2 text-[12px] leading-[1.5] text-muted max-[720px]:col-span-1">
                    <input id="privacy-acknowledgement" type="checkbox" name="privacy_acknowledgement" value="Privacy policy acknowledged" required className="mt-1 accent-brand-blue disabled:cursor-wait" />
                    <label htmlFor="privacy-acknowledgement">
                      Saya telah membaca{" "}
                      <a href="../../privacy/id/" target="_blank" rel="noopener noreferrer" className="font-[750] text-brand-blue underline decoration-brand-blue/30 underline-offset-2 hover:text-brand-navy">
                        Kebijakan Privasi
                      </a>{" "}
                      dan memahami bahwa Realjet akan menggunakan informasi saya untuk menjawab pertanyaan ini.
                    </label>
                  </div>
                </div>
                {submissionState === "error" && <p role="alert" className="mt-4 text-[12px] text-red-600">Pengiriman gagal. Silakan periksa koneksi Anda dan coba lagi, atau hubungi kami nanti.</p>}
                <div className="mt-5 flex justify-end">
                  <button type="submit" className="inline-flex min-h-12 min-w-[92px] items-center justify-center gap-2 rounded-[9px] bg-brand-navy px-5 text-[13px] font-[850] text-white disabled:cursor-wait disabled:opacity-75">
                    {submissionState === "submitting" ? <><LoaderCircle className="animate-spin" size={17} aria-hidden="true" /> Mengirimkan…</> : <>Kirimkan Detail Proyek <Send size={15} /></>}
                  </button>
                </div>
              </fieldset>
            </form>
          </>}
      </div>
    </div>;
}
function Field({
  id,
  label,
  icon: Icon,
  ...props
}) {
  return <label htmlFor={id} className="block">
      <span className="mb-1.5 block text-[11px] font-[850] text-[#3e5668]">{label}</span>
      <span className="relative block">
        <Icon size={15} className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted" />
        <input id={id} className="focus-control w-full rounded-lg border border-[#ccd8df] bg-[#fbfcfd] py-2.5 pr-3 pl-9 text-sm text-ink disabled:cursor-wait disabled:bg-[#eef2f5] disabled:text-muted" {...props} />
      </span>
    </label>;
}
function ContactEmail() {
  const openEmail = event => {
    event.preventDefault();
    const address = [108, 111, 121, 111, 115, 117, 110, 64, 103, 109, 97, 105, 108, 46, 99, 111, 109].map(code => String.fromCharCode(code)).join("");
    window.location.href = `mailto:${address}`;
  };
  return <a id="contact-email" href="#contact-email" onClick={openEmail} className="text-left underline decoration-white/20 underline-offset-4 transition hover:text-white">
      Hubungi Kami melalui Email
    </a>;
}
export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [leadTitle, setLeadTitle] = useState("Dapatkan Rancangan Lini Gratis");
  const [progress, setProgress] = useState(0);
  const [showAllEquipment, setShowAllEquipment] = useState(false);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [finalCtaVisible, setFinalCtaVisible] = useState(false);
  const [heroMetricsVisible, setHeroMetricsVisible] = useState(true);
  const [mobileCtaVisible, setMobileCtaVisible] = useState(true);
  const lastScrollYRef = useRef(0);
  const scrollStopTimerRef = useRef(null);
  const leadTriggerRef = useRef(null);
  const openLead = (title = "Dapatkan Rancangan Lini Gratis") => {
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
      setProgress(total > 0 ? window.scrollY / total * 100 : 0);
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
    window.addEventListener("scroll", update, {
      passive: true
    });
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
    const observer = new IntersectionObserver(([entry]) => setFinalCtaVisible(entry.isIntersecting), {
      threshold: 0.15
    });
    observer.observe(finalCta);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const heroMetrics = document.getElementById("hero-metrics");
    if (!heroMetrics) return undefined;
    const observer = new IntersectionObserver(([entry]) => setHeroMetricsVisible(entry.isIntersecting), {
      threshold: 0
    });
    observer.observe(heroMetrics);
    return () => observer.disconnect();
  }, []);
  const hideMobileCta = heroMetricsVisible || finalCtaVisible || modalOpen || !mobileCtaVisible;
  return <>
      <div id="site-shell" data-locale="id">
        <Header onLead={openLead} />
        <div className="fixed top-[69px] left-0 z-50 h-[3px] bg-gradient-to-r from-brand-cyan to-accent-orange max-[720px]:top-[61px]" style={{
        width: `${progress}%`
      }} />
        <main>
        <Hero onLead={openLead} />

        <Section id="method" compactBottom>
          <SectionHeader kicker="Proses Pengembangan Solusi" title="Dari Input Proyek hingga Lini Siap Produksi" text="Kami terlebih dahulu menetapkan kebutuhan produksi, tuntutan jadwal, batasan lokasi, tenaga kerja, sumber daya, dan kondisi setempat. Proses perancangan empat tahap kemudian mengubah input tersebut menjadi kapasitas produksi yang stabil." />

          <div className="solution-journey">
            <aside className="solution-input-panel">
              <div className="solution-panel-header">
                <span className="section-index">01 · INPUT PROYEK</span>
                <h3>Menetapkan Kebutuhan dan Batasan Produksi</h3>
                <p className="solution-panel-description is-dark">Kebutuhan produksi, batasan lokasi, tenaga kerja, sumber daya, dan standar proyek bersama-sama menentukan proses, tata letak, dan paket peralatan.</p>
              </div>
              <div className="solution-input-list">
                {inputs.map(({
                  icon: Icon,
                  title,
                  text
                }, index) => <article key={title} className="solution-input-item">
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
                  </article>)}
              </div>
            </aside>

            <div className="solution-process-panel">
              <div className="journey-arrow" aria-hidden="true"><ArrowRight size={18} /></div>
              <div className="solution-panel-header">
                <span className="section-index text-brand-blue">02 · ALUR KERJA REALJET</span>
                <h3>Empat Langkah Merancang Lini</h3>
                <p className="solution-panel-description">Analisis kebutuhan, rekayasa proses, pemilihan peralatan, dan optimalisasi kapasitas menjaga setiap keputusan tetap fokus pada hasil akhir yang diperlukan.</p>
              </div>
              <div className="delivery-flow">
                {methods.map(({
                  icon: Icon,
                  title,
                  text,
                  output
                }, index) => <article key={title} className="delivery-step">
                    <div className="delivery-marker">
                      <Icon size={19} strokeWidth={1.8} aria-hidden="true" />
                      <span>0{index + 1}</span>
                    </div>
                    <div className="delivery-copy">
                      <h4>{title}</h4>
                      <p>{text}</p>
                    </div>
                    <span className="delivery-output">HASIL · {output}</span>
                  </article>)}
              </div>
            </div>
          </div>
          <SectionCta onClick={openLead}>Dapatkan Rancangan Awal Lini</SectionCta>
          <PrecastTypeCarousel />
        </Section>

        <Section id="lines" soft>
          <SectionHeader kicker="Konfigurasi Umum Lini Produksi" title="Teknologi Teruji untuk Menentukan Proses yang Tepat bagi Setiap Proyek" text="Kami telah mengembangkan proses produksi yang teruji untuk berbagai produk beton pracetak. Untuk kebutuhan khusus, kami bekerja bersama pelanggan dalam pengembangan proses, perancangan solusi, pengembangan peralatan, dan validasi produksi." />
          <div className="grid grid-cols-3 gap-4 max-[1000px]:grid-cols-1">
            {lines.map(({
              image,
              alt,
              kicker,
              title,
              visual,
              visualLabel,
              text
            }) => <article key={title} className="group overflow-hidden rounded-card border border-line bg-white shadow-card">
                <div className="relative aspect-video overflow-hidden bg-[#e4edf2]">
                  <img src={image} alt={alt} className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.025]" />
                  <span aria-label={visualLabel} className="absolute top-3 right-3 rounded-md border border-white/15 bg-brand-navy/60 px-2.5 py-1.5 text-[11px] font-[850] text-white/95 shadow-sm backdrop-blur-[3px]">
                    {visual}
                  </span>
                </div>
                <div className="p-6">
                  <span className="text-[11px] font-[850] tracking-[0.08em] text-brand-blue uppercase">{kicker}</span>
                  <h3 className="mt-1.5 text-lg font-[850] text-brand-navy">{title}</h3>
                  <p className="mt-2 text-[14px] leading-[1.7] text-muted">{text}</p>
                </div>
              </article>)}
          </div>
          <SectionCta onClick={openLead}>Diskusikan Proses Produksi Anda</SectionCta>
        </Section>

        <Section id="products">
          <SectionHeader kicker="Peralatan Produksi Utama" title="Konfigurasikan Lini Berdasarkan Operasi Kritisnya" text="Peralatan tidak sekadar ditambahkan ke dalam daftar. Setiap sistem dipilih dan dipadukan berdasarkan jenis produk, waktu takt, dan kondisi lokasi." />
          <div className="grid grid-cols-3 gap-4 max-[1000px]:grid-cols-2 max-[720px]:grid-cols-1">
            {products.map(({
              image,
              alt,
              title,
              text,
              features
            }, index) => <article key={title} className={`group overflow-hidden rounded-card border border-line bg-white shadow-card ${index >= 3 && !showAllEquipment ? "max-[720px]:hidden" : ""}`}>
                <div className="aspect-video overflow-hidden bg-[#e4edf2]">
                  <img src={image} alt={alt} className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.025]" />
                </div>
                <div className="p-5.5">
                  <h3 className="font-[850] text-brand-navy">{title}</h3>
                  <p className="mt-2 text-[14px] leading-[1.7] text-muted">{text}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {features.map(feature => <span key={feature} className="rounded-md border border-brand-blue/10 bg-soft px-2.5 py-1.5 text-[11px] font-[800] text-brand-navy">
                        {feature}
                      </span>)}
                  </div>
                </div>
              </article>)}
          </div>
          {!showAllEquipment && <button type="button" onClick={() => setShowAllEquipment(true)} className="mx-auto mt-6 hidden min-h-11 items-center justify-center rounded-[9px] border border-brand-blue/20 bg-white px-5 text-[13px] font-[850] text-brand-navy max-[720px]:flex">
              Lihat Semua Peralatan
            </button>}
          <SectionCta onClick={openLead}>Minta Detail Peralatan</SectionCta>
        </Section>

        <Section id="projects" soft>
          <SectionHeader kicker="Referensi Proyek" title="Setiap Proyek Memerlukan Lini Produksi yang Berbeda" text="Realjet telah mengirimkan lini produksi untuk proyek transportasi dan infrastruktur besar serta mencapai produksi yang stabil di berbagai lokasi." />
          <div className="grid grid-cols-4 gap-4 max-[1000px]:grid-cols-2 max-[720px]:grid-cols-1">
            {projects.map(({
              image,
              alt,
              category,
              title,
              line,
              coreEquipment,
              product,
              output
            }, index) => <article key={title} className={`group flex h-full flex-col overflow-hidden rounded-card border border-line bg-white shadow-card transition duration-200 hover:-translate-y-1 hover:border-brand-blue/30 ${index >= 2 && !showAllProjects ? "max-[720px]:hidden" : ""}`}>
                <div className="relative aspect-video overflow-hidden bg-[#e4edf2]">
                  <img src={image} alt={alt} className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.025]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/55 via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 rounded-full border border-white/20 bg-brand-navy/55 px-2.5 py-1 text-[10px] font-[850] text-white backdrop-blur-sm">
                    {category}
                  </span>
                  <div className="absolute right-3 bottom-3 rounded-lg border border-white/15 bg-brand-navy/55 px-2.5 py-1.5 text-white backdrop-blur-sm">
                    <strong className="text-[13px] font-[900]">{product}</strong>
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-4.5">
                  <h3 className="min-h-[66px] text-[15px] font-[850] leading-[1.45] tracking-[-0.02em] text-brand-navy max-[720px]:min-h-0">{title}</h3>
                  <dl className="mt-3 flex min-h-[92px] flex-wrap gap-2 max-[720px]:min-h-0">
                    <div className="min-w-[108px] flex-1 rounded-[9px] border border-line bg-soft px-3 py-2.5">
                      <dt className="text-[9px] font-[850] tracking-[0.06em] text-muted">KONFIGURASI LINI</dt>
                      <dd className="mt-1 text-[11px] font-[850] text-brand-navy">{line}</dd>
                    </div>
                    <div className="min-w-[108px] flex-1 rounded-[9px] border border-line bg-soft px-3 py-2.5">
                      <dt className="text-[9px] font-[850] tracking-[0.06em] text-muted">KAPASITAS HARIAN</dt>
                      <dd className="mt-1 text-[11px] font-[850] text-brand-navy">{output}</dd>
                    </div>
                  </dl>
                  <div className="mt-3 min-h-[162px] rounded-[9px] border border-brand-blue/10 bg-[#eef6f8] px-3 py-3 max-[720px]:min-h-0">
                    <div className="flex items-center gap-1.5 text-brand-blue">
                      <Settings size={13} aria-hidden="true" />
                      <span className="text-[10px] font-[850] tracking-[0.04em]">PERALATAN UTAMA</span>
                    </div>
                    <div className="mt-2 grid grid-cols-2 gap-1.5">
                      {coreEquipment.map(equipment => <span key={equipment} className="flex min-h-8 items-center rounded-md border border-brand-blue/10 bg-white px-2 py-1 text-[10px] font-[750] leading-[1.3] text-brand-navy">
                          {equipment}
                        </span>)}
                    </div>
                  </div>
                </div>
              </article>)}
          </div>
          {!showAllProjects && <button type="button" onClick={() => setShowAllProjects(true)} className="mx-auto mt-6 hidden min-h-11 items-center justify-center rounded-[9px] border border-brand-blue/20 bg-white px-5 text-[13px] font-[850] text-brand-navy max-[720px]:flex">
              Lihat Semua Proyek
            </button>}
          <SectionCta onClick={openLead}>Minta Referensi Proyek Lainnya</SectionCta>
        </Section>

        <Section id="capabilities">
          <SectionHeader kicker="Mengapa Realjet" title="Tiga Kapabilitas yang Mengubah Gagasan Menjadi Kapasitas Produksi" text="Didirikan pada 2008, Realjet menyediakan solusi terpadu untuk fasilitas produksi girder pracetak yang mencakup perencanaan lini produksi, litbang dan manufaktur peralatan, instalasi dan komisioning, produksi uji coba, serta dukungan operasi." />
          <div className="mb-5 grid grid-cols-4 overflow-hidden rounded-card border border-line bg-white text-center shadow-card max-[720px]:grid-cols-2">
            {companyProofs.map(({
              value,
              label
            }) => <div key={label} className="border-r border-line px-5 py-4 last:border-r-0 max-[720px]:border-b max-[720px]:nth-[2n]:border-r-0 max-[720px]:nth-[n+3]:border-b-0">
                <strong className="block text-[20px] font-[900] tracking-[-0.025em] text-brand-navy">{value}</strong>
                <span className="mt-1 block text-[11px] text-muted">{label}</span>
              </div>)}
          </div>
          <div className="grid grid-cols-3 gap-4 max-[1000px]:grid-cols-1">
            {capabilities.map(({
              icon,
              image,
              alt,
              title,
              headline,
              text,
              stats
            }, index) => <article key={title} className="group flex flex-col overflow-hidden rounded-card border border-line bg-white shadow-card max-[1000px]:grid max-[1000px]:grid-cols-[minmax(260px,0.8fr)_minmax(0,1.2fr)] max-[720px]:block">
                {image ? <div className="aspect-video shrink-0 overflow-hidden bg-[#e4edf2] max-[1000px]:aspect-auto max-[1000px]:h-full max-[720px]:aspect-video max-[720px]:h-auto">
                    <img src={image} alt={alt} className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.025]" />
                  </div> : <VisualPanel icon={icon} index={`0${index + 1}`} />}
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-lg font-[850] text-brand-navy">{title}</h3>
                  <p className="mt-1.5 text-[14px] font-[850] leading-[1.5] text-brand-blue">{headline}</p>
                  <p className="mt-3 text-[14px] leading-[1.7] text-muted">{text}</p>
                  <div className="mt-auto grid min-h-[170px] grid-cols-2 gap-2 border-t border-line pt-4 max-[1000px]:min-h-0">
                    {stats.map(({
                    value,
                    label
                  }) => <div key={label} className="rounded-lg bg-soft px-3 py-2.5">
                        <strong className="block text-[15px] font-[900] text-brand-navy">{value}</strong>
                        <span className="mt-0.5 block text-[10px] leading-[1.35] text-muted">{label}</span>
                      </div>)}
                  </div>
                </div>
              </article>)}
          </div>
          <SectionCta onClick={openLead}>Jadwalkan Konsultasi Teknis</SectionCta>
        </Section>

        <section id="final-cta" className="hero-gradient py-[72px] text-white">
          <div className="site-container flex flex-col items-center text-center">
            <p className="mb-2 text-[13px] font-[850] tracking-[0.1em] text-[#8ce2e8] uppercase">Mulai Proyek Anda</p>
            <h2 className="max-w-[760px] text-[clamp(28px,3.4vw,40px)] leading-[1.16] font-[850] tracking-[-0.03em]">Dapatkan Solusi yang Direkayasa untuk Proyek Anda</h2>
            <p className="mt-3 max-w-[670px] text-[15px] text-white/68">Beri tahu kami apa yang perlu Anda produksi, dan kami akan mulai merencanakan lini produksi pracetak Anda.</p>
            <PrimaryButton onClick={() => openLead("Diskusikan Proyek Anda")} className="mt-6 max-[720px]:w-full max-[720px]:max-w-[320px]">Diskusikan Proyek Anda <ArrowRight size={16} /></PrimaryButton>
          </div>
        </section>
        </main>

        <footer className="bg-[#051a2c] py-6 text-[11px] text-[#89a0b0] max-[720px]:pb-[calc(24px+env(safe-area-inset-bottom))]">
          <div className="site-container flex items-center justify-between gap-5 max-[720px]:flex-col max-[720px]:items-start">
            <span>© 2026 Changsha Ruijie Machinery Technology Co., Ltd. Semua hak dilindungi undang-undang.</span>
            <div className="flex items-center gap-5 max-[720px]:flex-col max-[720px]:items-start max-[720px]:gap-2">
              <a href="../../privacy/id/" className="underline decoration-white/20 underline-offset-4 transition hover:text-white">Kebijakan Privasi</a>
              <ContactEmail />
            </div>
          </div>
        </footer>

        <button onClick={() => openLead("Dapatkan Rancangan Lini Gratis")} aria-hidden={hideMobileCta} tabIndex={hideMobileCta ? -1 : 0} className={`fixed right-3.5 bottom-[max(14px,env(safe-area-inset-bottom))] left-3.5 z-40 hidden min-h-12 items-center justify-center gap-2 rounded-[9px] bg-brand-cyan text-sm font-[900] text-brand-navy shadow-floating transition duration-200 max-[720px]:flex ${hideMobileCta ? "max-[720px]:pointer-events-none max-[720px]:translate-y-20 max-[720px]:opacity-0" : "max-[720px]:translate-y-0 max-[720px]:opacity-100"}`}>
          Dapatkan Rancangan Lini Gratis <ArrowRight size={16} />
        </button>
      </div>

      <LeadModal open={modalOpen} onClose={closeLead} title={leadTitle} />
    </>;
}
