import plant from "../../assets/image/spun-pipe-piles-line/plant-overview.webp";
import layout from "../../assets/image/spun-pipe-piles-line/line-layout.webp";
import cage from "../../assets/image/spun-pipe-piles-line/cage-welding.webp";
import mould from "../../assets/image/spun-pipe-piles-line/pile-mould.webp";
import spinning from "../../assets/image/spun-pipe-piles-line/centrifugal-spinning.webp";
import handling from "../../assets/image/spun-pipe-piles-line/handling.webp";
import crane from "../../assets/image/spun-pipe-piles-line/line-hero.webp";

// Replace each image and alt together when the matching approved equipment photo is available.
// reference=true denotes a related process image, not a photograph of the named machine.
export const coreEquipment = [
  { id: "batching-feeding", nameZh: "混凝土搅拌、分料与喂料系统", title: "Concrete batching & feeding", copy: "Batching plant, distribution cars and fixed feeding hoppers.", image: plant, alt: "Spun pile plant overview used as a concrete supply process reference", reference: true },
  { id: "friction-transfer", nameZh: "摩擦轮驱动与喂料平车", title: "Friction drives & transfer cars", copy: "Friction-wheel drives and flat transfer cars for feeding and curing-exit areas.", image: layout, alt: "Spun pile line layout used as a transfer-system reference", reference: true },
  { id: "cutting-heading", nameZh: "自动切断镦头一体机", title: "Automatic cutting & heading", copy: "Steel-bar cutting, heading, pay-off and automatic turnover racks.", image: cage, alt: "Reinforcement cage production used as a steel-bar preparation reference", reference: true },
  { id: "cage-welding", nameZh: "圆桩钢筋笼滚焊机", title: "Reinforcement cage welding", copy: "Cage welding machine with traction carriage, guides and controls.", image: cage, alt: "Circular reinforcement cage welding equipment", reference: false },
  { id: "skirt-forming", nameZh: "圆桩裙板加工设备", title: "Pile skirt forming equipment", copy: "Steel-strip cutting, rolling, embossing and mechanical joining.", image: mould, alt: "Spun pile steel moulds used as a pile-end component process reference", reference: true },
  { id: "wire-drawing", nameZh: "拉丝机组", title: "Wire drawing line", copy: "Wire drawing with pay-off, descaling and butt-welding equipment.", image: cage, alt: "Reinforcement cage production used as a spiral-wire preparation reference", reference: true },
  { id: "tensioning", nameZh: "数控张拉机", title: "Controlled tensioning system", copy: "Tensioning carriage, hydraulic station, jack and control cabinet.", image: layout, alt: "Spun pile production layout used as a tensioning-station reference", reference: true },
  { id: "pile-moulds", nameZh: "管桩钢模", title: "Spun pile steel moulds", copy: "Split moulds matched to the pile drawing and spinning equipment.", image: mould, alt: "Split steel moulds for spun concrete piles", reference: false },
  { id: "spinning", nameZh: "离心机", title: "Centrifugal spinning machines", copy: "Roller assemblies, motors, variable-speed drives and controls.", image: spinning, alt: "Spun pile moulds supported on centrifugal spinning rollers", reference: false },
  { id: "curing-control", nameZh: "蒸养池温控系统", title: "Steam-curing temperature control", copy: "Curing-pit temperature monitoring, electrical controls and display.", image: plant, alt: "Spun pile factory used as a steam-curing process reference", reference: true },
  { id: "overhead-cranes", nameZh: "双钩桥式起重机", title: "Twin-hook overhead cranes", copy: "Single- or double-girder cranes matched to bay and lifting requirements.", image: crane, alt: "Overhead cranes above a spun pile mould production area", reference: false },
  { id: "lifting-devices", nameZh: "钢模自动吊具与成品桩吸盘", title: "Mould & finished-pile lifters", copy: "Automatic steel-mould lifting devices and finished-pile suction lifters.", image: handling, alt: "Mould lifting operation used as a lifting-device reference", reference: true },
];

export const auxiliaryEquipment = ["Steam boiler", "Screw air compressor & receivers", "Winch", "Pile-sawing trolleys", "Pneumatic impact wrenches"];
