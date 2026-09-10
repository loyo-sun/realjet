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
import trolley from "../../assets/image/spun-pipe-piles-line/core-products/transfer-trolley.webp";
import wrench from "../../assets/image/spun-pipe-piles-line/core-products/pneumatic-impact-wrench.webp";

// One product per card. Photo provenance: docs/spun-pile-photo-references.md.
export const coreEquipment = [
  { id: "batching-plant", category: "preparation", nameZh: "混凝土搅拌站", title: "Concrete Batching Plant", copy: "Produces concrete batches for spun pile production.", detail: "It prepares the concrete supplied to the mould feeding station. Plant output, mix consistency and discharge timing are matched to the planned mould cycle.", image: product0, alt: "Concrete batching plant with storage silos above the mixing platform" },
  { id: "bar-processing-machine", category: "preparation", nameZh: "自动切断镦头一体机", title: "PC Bar Processing Machine", copy: "Cuts prestressing bar to length before forming anchorage heads.", detail: "It prepares longitudinal prestressing bars before cage welding. Bar length and anchorage heads are set to the approved pile reinforcement drawing.", image: product2, alt: "PC bar processing equipment beside a long steel-bar feed rack" },
  { id: "wire-drawing-machine", category: "preparation", nameZh: "拉丝机", title: "Wire Drawing Machine", copy: "Draws steel wire to the specified diameter for cage production.", detail: "It supplies spiral wire for the cage welding machine. Wire diameter and output are selected to suit the reinforcement design and cage production rate.", image: product5, alt: "Steel wire drawing machine with multiple drawing blocks" },
  { id: "cage-welding-machine", category: "preparation", nameZh: "钢筋笼滚焊机", title: "Cage Welding Machine", copy: "Welds spiral wire onto longitudinal bars to form the pile cage.", detail: "It forms the reinforcement cage before end plate assembly and mould loading. Cage diameter, spiral pitch and production speed follow the pile design.", image: product3, alt: "Circular reinforcement cage welding machine in a workshop" },
  { id: "skirt-forming-machine", category: "forming", nameZh: "裙板成型机", title: "Skirt Forming Machine", copy: "Forms steel strip into pile-end skirts.", detail: "It makes the steel skirt used with the pile end plate. The forming size is matched to the pile diameter and approved end assembly.", image: product4, alt: "Pile skirt forming machine beside formed steel rings" },
  { id: "tensioning-machine", category: "forming", nameZh: "数控张拉机", title: "Pile Tensioning Machine", copy: "Applies controlled prestress to reinforcement inside the mould.", detail: "It tensions the reinforcement after the cage is placed in the mould and before spinning. Load, stroke and control steps follow the approved prestressing design.", image: product6, alt: "Pile tensioning machine positioned at the end of a steel mould" },
  { id: "pile-steel-mould", category: "forming", nameZh: "管桩钢模", title: "Spun Pile Steel Mould", copy: "Defines the pile shape during centrifugal forming.", detail: "It carries the cage and concrete through tensioning, spinning and curing. Diameter, length, running rings and lifting points are coordinated with the line equipment.", image: product7, alt: "Split steel moulds for spun concrete pile production" },
  { id: "spinning-machine", category: "forming", nameZh: "离心机", title: "Centrifugal Spinning Machine", copy: "Rotates the loaded mould to compact the concrete.", detail: "It rotates the filled mould in controlled stages to compact the concrete and form the hollow pile section. Rollers, drives and recipes are matched to the mould family.", image: product8, alt: "Centrifugal spinning machine roller assemblies in a workshop" },
  { id: "curing-control-cabinet", category: "steam-air", nameZh: "蒸养温控柜", title: "Curing Control Cabinet", copy: "Monitors curing-pit temperatures through a central control panel.", detail: "It monitors the curing temperature and operating stages. Sensors and steam controls can be connected within the agreed control scope.", image: product9, alt: "Steam-curing control cabinet with individual temperature displays" },
  { id: "steam-boiler", category: "steam-air", nameZh: "蒸汽锅炉", title: "Steam Boiler", copy: "Supplies steam for concrete pile curing.", detail: "It provides steam to the curing pits or chambers. Boiler capacity is selected from the curing volume, cycle time and site utility conditions.", image: boiler, alt: "Industrial steam boiler with a front-mounted burner" },
  { id: "screw-air-compressor", category: "steam-air", nameZh: "螺杆空压机", title: "Screw Air Compressor", copy: "Supplies compressed air for pneumatic equipment.", detail: "It supplies compressed air to tools and pneumatic devices on the line. Pressure and flow are sized from the connected equipment and expected use.", image: compressor, alt: "Blue enclosed screw air compressor with a control panel" },
  { id: "pneumatic-impact-wrench", category: "steam-air", nameZh: "气动扳手", title: "Pneumatic Impact Wrench", copy: "Tightens or loosens mould fasteners using compressed air.", detail: "It is used when closing and opening the split steel mould. The tool reduces repeated manual work while tightening procedures remain under operator control.", image: wrench, alt: "Black and silver long-shaft pneumatic impact wrench on a white background" },
  { id: "friction-wheel-drive", category: "handling", nameZh: "摩擦轮驱动装置", title: "Friction-Wheel Drive", copy: "Moves the production trolley along its transfer route.", detail: "It drives a trolley along the planned ground transfer route. Drive force, speed and stopping points are set for the trolley load and line layout.", image: product1, alt: "Motor-driven friction-wheel assemblies on steel bases" },
  { id: "transfer-trolley", category: "handling", nameZh: "管桩转运小车", title: "Transfer Trolley", copy: "Transfers piles between production stations.", detail: "It moves piles between production or finishing stations. Rated load, support points and travel route are matched to the pile size and plant layout.", image: trolley, alt: "Yellow pile transfer trolley frames in a workshop" },
  { id: "winch", category: "handling", nameZh: "卷扬机", title: "Winch", copy: "Provides pulling force for material transfer.", detail: "It pulls trolleys or materials along a defined transfer path where required. Pulling load, travel distance and safety devices are set to the application.", image: winch, alt: "Winch drive assembly with a gearbox beside a brake mechanism" },
  { id: "twin-hook-overhead-crane", category: "handling", nameZh: "双钩桥式起重机", title: "Twin-Hook Overhead Crane", copy: "Lifts long moulds using two coordinated lifting points.", detail: "It lifts long moulds at two coordinated points between line stations. Capacity, span and hook arrangement are selected from mould mass and bay geometry.", image: product10, alt: "Twin-hook overhead bridge cranes inside a production workshop" },
];

export const equipmentCategories = [
  { id: "all", label: "All" },
  { id: "preparation", label: "Preparation" },
  { id: "forming", label: "Forming" },
  { id: "steam-air", label: "Steam & Air" },
  { id: "handling", label: "Handling" },
];
