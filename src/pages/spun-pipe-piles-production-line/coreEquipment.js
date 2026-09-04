import feeding from "../../assets/image/spun-pipe-piles-line/equipment-reference/feeding.png";
import heading from "../../assets/image/spun-pipe-piles-line/equipment-reference/cutting-heading.webp";
import skirt from "../../assets/image/spun-pipe-piles-line/equipment-reference/skirt-forming.png";
import wire from "../../assets/image/spun-pipe-piles-line/equipment-reference/wire-drawing.webp";
import tension from "../../assets/image/spun-pipe-piles-line/equipment-reference/tensioning.png";
import cage from "../../assets/image/spun-pipe-piles-line/cage-welding.webp";
import mould from "../../assets/image/spun-pipe-piles-line/pile-mould.webp";
import spinning from "../../assets/image/spun-pipe-piles-line/centrifugal-spinning.webp";
import crane from "../../assets/image/spun-pipe-piles-line/line-hero.webp";

// Replace each image and alt together when the matching approved equipment photo is available.
// reference=true denotes a third-party equipment reference, not Realjet-owned equipment.
// Source pages and replacement shot list: docs/spun-pile-photo-references.md.
export const coreEquipment = [
  { id: "batching-feeding", nameZh: "混凝土搅拌、分料与喂料系统", title: "Concrete batching & feeding", copy: "Batching plant, distribution cars and fixed feeding hoppers.", image: feeding, alt: "Third-party reference photograph of a concrete feeding hopper and discharge unit", reference: true },
  { id: "friction-transfer", nameZh: "摩擦轮驱动与喂料平车", title: "Friction drives & transfer cars", copy: "Friction-wheel drives and flat transfer cars for feeding and curing-exit areas.", image: null, alt: "", reference: false, photoBrief: "Friction-wheel drive, rail and transfer car in one view." },
  { id: "cutting-heading", nameZh: "自动切断镦头一体机", title: "Automatic cutting & heading", copy: "Steel-bar cutting, heading, pay-off and automatic turnover racks.", image: heading, alt: "Third-party reference photograph of a PC steel bar heading station with steel coils and bar guides", reference: true },
  { id: "cage-welding", nameZh: "圆桩钢筋笼滚焊机", title: "Reinforcement cage welding", copy: "Cage welding machine with traction carriage, guides and controls.", image: cage, alt: "Circular reinforcement cage welding equipment", reference: false },
  { id: "skirt-forming", nameZh: "圆桩裙板加工设备", title: "Pile skirt forming equipment", copy: "Steel-strip cutting, rolling, embossing and mechanical joining.", image: skirt, alt: "Third-party reference photograph of an integrated pile skirt plate processing line", reference: true },
  { id: "wire-drawing", nameZh: "拉丝机组", title: "Wire drawing line", copy: "Wire drawing with pay-off, descaling and butt-welding equipment.", image: wire, alt: "Third-party reference photograph of a multi-block steel wire drawing machine", reference: true },
  { id: "tensioning", nameZh: "数控张拉机", title: "Controlled tensioning system", copy: "Tensioning carriage, hydraulic station, jack and control cabinet.", image: tension, alt: "Third-party reference photograph of a pile tensioning jack, rail carriage and control cabinet", reference: true },
  { id: "pile-moulds", nameZh: "管桩钢模", title: "Spun pile steel moulds", copy: "Split moulds matched to the pile drawing and spinning equipment.", image: mould, alt: "Split steel moulds for spun concrete piles", reference: false },
  { id: "spinning", nameZh: "离心机", title: "Centrifugal spinning machines", copy: "Roller assemblies, motors, variable-speed drives and controls.", image: spinning, alt: "Spun pile moulds supported on centrifugal spinning rollers", reference: false },
  { id: "curing-control", nameZh: "蒸养池温控系统", title: "Steam-curing temperature control", copy: "Curing-pit temperature monitoring, electrical controls and display.", image: null, alt: "", reference: false, photoBrief: "Temperature cabinet, display and curing-pit sensor connections." },
  { id: "overhead-cranes", nameZh: "双钩桥式起重机", title: "Twin-hook overhead cranes", copy: "Single- or double-girder cranes matched to bay and lifting requirements.", image: crane, alt: "Overhead cranes above a spun pile mould production area", reference: false },
  { id: "lifting-devices", nameZh: "钢模自动吊具与成品桩吸盘", title: "Mould & finished-pile lifters", copy: "Automatic steel-mould lifting devices and finished-pile suction lifters.", image: null, alt: "", reference: false, photoBrief: "Automatic mould gripper and finished-pile suction lifter." },
];

export const auxiliaryEquipment = ["Steam boiler", "Screw air compressor & receivers", "Winch", "Pile-sawing trolleys", "Pneumatic impact wrenches"];
