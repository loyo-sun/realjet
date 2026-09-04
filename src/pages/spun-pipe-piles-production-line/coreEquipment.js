import product0 from "../../assets/image/spun-pipe-piles-line/core-products/batching-plant.webp";
import product1 from "../../assets/image/spun-pipe-piles-line/core-products/friction-wheel-drive.webp";
import product2 from "../../assets/image/spun-pipe-piles-line/core-products/bar-processing-machine.webp";
import product3 from "../../assets/image/spun-pipe-piles-line/core-products/cage-welding-machine.webp";
import product4 from "../../assets/image/spun-pipe-piles-line/core-products/skirt-forming-machine.webp";
import product5 from "../../assets/image/spun-pipe-piles-line/core-products/wire-drawing-machine.webp";
import product6 from "../../assets/image/spun-pipe-piles-line/core-products/tensioning-machine.webp";
import product7 from "../../assets/image/spun-pipe-piles-line/core-products/pile-steel-mould.webp";
import product8 from "../../assets/image/spun-pipe-piles-line/core-products/spinning-machine.webp";
import product9 from "../../assets/image/spun-pipe-piles-line/core-products/curing-control-cabinet.webp";
import product10 from "../../assets/image/spun-pipe-piles-line/core-products/twin-hook-overhead-crane.webp";
import boiler from "../../assets/image/spun-pipe-piles-line/core-products/steam-boiler.webp";
import compressor from "../../assets/image/spun-pipe-piles-line/core-products/screw-air-compressor.webp";
import winch from "../../assets/image/spun-pipe-piles-line/core-products/winch.webp";
import trolley from "../../assets/image/spun-pipe-piles-line/core-products/pile-sawing-trolley.webp";
import wrench from "../../assets/image/spun-pipe-piles-line/core-products/pneumatic-impact-wrench.webp";

// One product per card. Photo provenance: docs/spun-pile-photo-references.md.
export const coreEquipment = [
  { id: "batching-plant", nameZh: "混凝土搅拌站", title: "Concrete Batching Plant", copy: "Produces concrete batches for spun pile production.", image: product0, alt: "Concrete batching plant with storage silos above the mixing platform" },
  { id: "friction-wheel-drive", nameZh: "摩擦轮驱动装置", title: "Friction-Wheel Drive", copy: "Moves the production trolley along its transfer route.", image: product1, alt: "Motor-driven friction-wheel assemblies on steel bases" },
  { id: "bar-processing-machine", nameZh: "自动切断镦头一体机", title: "PC Bar Processing Machine", copy: "Cuts prestressing bar to length before forming anchorage heads.", image: product2, alt: "PC bar processing equipment beside a long steel-bar feed rack" },
  { id: "cage-welding-machine", nameZh: "钢筋笼滚焊机", title: "Cage Welding Machine", copy: "Welds spiral wire onto longitudinal bars to form the pile cage.", image: product3, alt: "Circular reinforcement cage welding machine in a workshop" },
  { id: "skirt-forming-machine", nameZh: "裙板成型机", title: "Skirt Forming Machine", copy: "Forms steel strip into pile-end skirts.", image: product4, alt: "Pile skirt forming machine beside formed steel rings" },
  { id: "wire-drawing-machine", nameZh: "拉丝机", title: "Wire Drawing Machine", copy: "Draws steel wire to the specified diameter for cage production.", image: product5, alt: "Steel wire drawing machine with multiple drawing blocks" },
  { id: "tensioning-machine", nameZh: "数控张拉机", title: "Pile Tensioning Machine", copy: "Applies controlled prestress to reinforcement inside the mould.", image: product6, alt: "Pile tensioning machine positioned at the end of a steel mould" },
  { id: "pile-steel-mould", nameZh: "管桩钢模", title: "Spun Pile Steel Mould", copy: "Defines the pile shape during centrifugal forming.", image: product7, alt: "Split steel moulds for spun concrete pile production" },
  { id: "spinning-machine", nameZh: "离心机", title: "Centrifugal Spinning Machine", copy: "Rotates the loaded mould to compact the concrete.", image: product8, alt: "Centrifugal spinning machine roller assemblies in a workshop" },
  { id: "curing-control-cabinet", nameZh: "蒸养温控柜", title: "Curing Control Cabinet", copy: "Monitors curing-pit temperatures through a central control panel.", image: product9, alt: "Steam-curing control cabinet with individual temperature displays" },
  { id: "twin-hook-overhead-crane", nameZh: "双钩桥式起重机", title: "Twin-Hook Overhead Crane", copy: "Lifts long moulds using two coordinated lifting points.", image: product10, alt: "Twin-hook overhead bridge cranes inside a production workshop" },
  { id: "steam-boiler", nameZh: "蒸汽锅炉", title: "Steam Boiler", copy: "Supplies steam for concrete pile curing.", image: boiler, alt: "Industrial steam boiler with a front-mounted burner" },
  { id: "screw-air-compressor", nameZh: "螺杆空压机", title: "Screw Air Compressor", copy: "Supplies compressed air for pneumatic equipment.", image: compressor, alt: "Blue enclosed screw air compressor with a control panel" },
  { id: "winch", nameZh: "卷扬机", title: "Winch", copy: "Provides pulling force for material transfer.", image: winch, alt: "Winch drive assembly with a gearbox beside a brake mechanism" },
  { id: "pile-sawing-trolley", nameZh: "锯桩小车", title: "Pile-Sawing Trolley", copy: "Supports pile positioning during cutting.", image: trolley, alt: "Stacked yellow trolley frames for pile-sawing equipment" },
  { id: "pneumatic-impact-wrench", nameZh: "气动扳手", title: "Pneumatic Impact Wrench", copy: "Tightens or loosens mould fasteners using compressed air.", image: wrench, alt: "Product sheet showing a pneumatic impact wrench with a long drive shaft" },
];
