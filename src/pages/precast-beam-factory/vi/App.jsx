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
import FloatingContactActions from "../shared/FloatingContactActions";
import MobileScrollArrows from "../shared/MobileScrollArrows";
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
    title: "Yêu cầu sản xuất",
    text: "Chủng loại, số lượng, tiến độ và sản lượng mục tiêu theo ngày, bao gồm các mốc khởi động và nâng dần công suất",
  },
  {
    icon: MapPin,
    title: "Điều kiện mặt bằng",
    text: "Diện tích, hình dạng mặt bằng, đường tiếp cận, điều kiện nâng hạ và lưu kho ảnh hưởng đến bố trí và dòng vật liệu",
  },
  {
    icon: CloudSun,
    title: "Nhân lực và nguồn lực",
    text: "Nhân lực kỹ thuật, khí hậu, hạ tầng tiện ích, nguồn cung bê tông và năng lực bảo trì tại địa phương",
  },
  {
    icon: FileCheck,
    title: "Yêu cầu dự án",
    text: "Hồ sơ thiết kế, tiêu chuẩn địa phương, tiêu chí nghiệm thu và các giao diện kỹ thuật liên ngành",
  },
];

const methods = [
  {
    icon: Search,
    title: "Phân tích nhu cầu",
    text: "Xác định sản phẩm, số lượng, tiến độ, thông số kỹ thuật và các ràng buộc vận hành, sau đó chuyển thành yêu cầu sản xuất rõ ràng.",
    output: "Yêu cầu sản xuất đã xác định",
  },
  {
    icon: Workflow,
    title: "Thiết kế công nghệ",
    text: "Tối ưu mặt bằng, cân bằng nhịp sản xuất, loại bỏ nút thắt và tích hợp độ linh hoạt cần thiết để vận hành hiệu quả.",
    output: "Thiết kế quy trình và mặt bằng",
  },
  {
    icon: Settings,
    title: "Lựa chọn thiết bị",
    text: "Lựa chọn thiết bị phù hợp với quy trình, điều kiện địa phương và năng lực bảo trì hiện có.",
    output: "Gói thiết bị theo dự án",
  },
  {
    icon: CheckCircle,
    title: "Nâng công suất",
    text: "Đồng hành từ lắp đặt, chạy thử, sản xuất thử đến xác nhận công suất, cho đến khi dây chuyền đạt sản lượng ổn định.",
    output: "Công suất ổn định đã xác nhận",
  },
];

const precastTypes = [
  {
    image: tBeamImage,
    title: "Dầm T",
    fullName: "Dầm T bê tông đúc sẵn",
    scene: "Đường cao tốc / Cầu vượt",
    text: "Giải pháp đã được kiểm chứng và có hiệu quả kinh tế, thường dùng cho đường cao tốc và cầu vượt với nhịp từ 20–50 m.",
  },
  {
    image: smallBoxGirderImage,
    title: "Dầm hộp",
    fullName: "Dầm hộp bê tông dự ứng lực đúc sẵn",
    scene: "Cầu cạn / Cầu / Đường đô thị",
    text: "Tiết diện hộp rỗng tạo độ cứng xoắn cao, phù hợp với cầu cạn đô thị, nút giao, cầu cong và cầu xiên.",
  },
  {
    image: segmentalBoxGirderImage,
    title: "Dầm hộp phân đoạn",
    fullName: "Đốt dầm hộp bê tông đúc sẵn",
    scene: "Cầu cạn đô thị / Cầu vượt biển",
    text: "Các đốt dầm được đúc sẵn tại nhà máy rồi lắp ghép tại công trường, phù hợp với hình học cầu phức tạp và dự án cần hạn chế ảnh hưởng giao thông.",
  },
  {
    image: uBeamImage,
    title: "Dầm U",
    fullName: "Dầm U bê tông đúc sẵn",
    scene: "Đường sắt đô thị",
    text: "Chiều cao kết cấu thấp cùng hai thành bên giúp bảo vệ và giảm tiếng ồn cho các đoạn metro và đường sắt nhẹ trên cao.",
  },
  {
    image: iGirderImage,
    title: "Dầm I",
    fullName: "Dầm I bê tông đúc sẵn",
    scene: "Cầu cạn / Cầu / Cầu liên hợp",
    text: "Tiết diện hiệu quả kết hợp với bản mặt cầu đổ tại chỗ, thường dùng cho các nhịp cầu từ 25–45 m.",
  },
  {
    image: fullSpanBoxGirderImage,
    title: "Dầm hộp nguyên nhịp",
    fullName: "Dầm hộp nguyên nhịp đúc sẵn",
    scene: "Đường sắt cao tốc / Đường vành đai đô thị",
    text: "Được đúc nguyên nhịp và lao lắp thành một khối, cấu kiện có khả năng chịu uốn và xoắn cao cho các công trình giao thông lớn.",
  },
  {
    image: doubleTSlabImage,
    title: "Tấm sàn Double Tee",
    fullName: "Tấm sàn Double Tee bê tông đúc sẵn",
    scene: "Hầm chui / Ga metro",
    text: "Hai sườn chịu lực cùng bản liền khối có thể trực tiếp tạo mái hoặc bề mặt giao thông sau khi lắp đặt.",
  },
  {
    image: troughGirderImage,
    title: "Dầm máng",
    fullName: "Dầm máng bê tông đúc sẵn",
    scene: "Đường sắt / Cầu đi bộ",
    text: "Bản đáy phẳng và hai thành thẳng phù hợp với metro trên cao và cầu đi bộ đúc sẵn nhịp lớn.",
  },
  {
    image: crashBarrierImage,
    title: "Dải phân cách giao thông",
    fullName: "Dải phân cách bê tông đúc sẵn",
    scene: "Cầu cạn / Đường cao tốc / Cầu",
    text: "Lắp đặt ở mép cầu hoặc dải phân cách để giữ, dẫn hướng phương tiện và phân luồng giao thông.",
  },
  {
    image: tunnelSegmentImage,
    title: "Đốt vỏ hầm",
    fullName: "Đốt vỏ hầm bê tông đúc sẵn",
    scene: "Metro / Hầm vượt sông và hầm xuyên núi",
    text: "Các đốt hầm tạo thành lớp vỏ chịu lực vĩnh cửu, đòi hỏi độ chính xác kích thước, cường độ và khả năng chống thấm cao.",
  },
  {
    image: boxCulvertImage,
    title: "Cống hộp",
    fullName: "Cống hộp bê tông cốt thép đúc sẵn",
    scene: "Hầm chui / Kênh / Hành lang kỹ thuật",
    text: "Các cấu kiện hộp kín được đúc theo đoạn và lắp ghép tại công trường cho hầm chui, kênh lớn và hành lang kỹ thuật.",
  },
  {
    image: stationElementsImage,
    title: "Cấu kiện kết cấu ga",
    fullName: "Cấu kiện kết cấu ga đúc sẵn",
    scene: "Ga metro / Đầu mối ngầm",
    text: "Dầm, cột, sàn và tường được lắp ghép thành kết cấu ga ngầm, giúp rút ngắn tiến độ thi công.",
  },
  {
    image: interlockingConcreteArmourUnitImage,
    title: "Khối bê tông bảo vệ bờ dạng liên kết",
    fullName: "Khối bê tông đúc sẵn bảo vệ bờ dạng liên kết",
    scene: "Đê chắn sóng cảng / Bảo vệ bờ",
    text: "Hình học liên kết tạo lớp bảo vệ ổn định cho đê chắn sóng, công trình bảo vệ bờ và kết cấu chịu tác động của sóng.",
  },
];

const lines = [
  {
    image: lineV1Image,
    alt: "Dây chuyền tự động Realjet V1.0 sản xuất dầm bê tông đúc sẵn",
    kicker: "Cấu hình quy trình tiêu chuẩn",
    title: "Dây chuyền tự động sản xuất dầm bê tông đúc sẵn V1.0",
    visual: "1 dầm/ngày",
    visualLabel: "Sản lượng ngày: 1 dầm",
    text: "Dành cho dự án có chủng loại dầm tiêu chuẩn và mục tiêu sản lượng ổn định, dây chuyền tích hợp đóng mở khuôn thủy lực, chuyển khuôn trên ray, đầm rung ngoài và kéo căng một giai đoạn. Khuôn, trạm làm việc và chu kỳ dưỡng hộ được cấu hình theo kế hoạch sản xuất.",
  },
  {
    image: lineV2Image,
    alt: "Dây chuyền tự động Realjet V2.0 sản xuất dầm bê tông đúc sẵn",
    kicker: "Cấu hình sản lượng cao",
    title: "Dây chuyền tự động sản xuất dầm bê tông đúc sẵn V2.0",
    visual: "2–4 dầm/ngày",
    visualLabel: "Sản lượng ngày: 2–4 dầm",
    text: "Dành cho dự án có tiến độ gấp, sản lượng cao hoặc mặt bằng hạn chế, dây chuyền tích hợp dưỡng hộ hơi nước trong khuôn, kéo căng hai giai đoạn và đóng mở khuôn tại mọi trạm. Các trạm chuyên dụng cùng hệ thống chuyển tự động nâng cao năng suất và tính linh hoạt.",
  },
  {
    image: segmentalLineImage,
    alt: "Dây chuyền tự động Realjet sản xuất dầm hộp phân đoạn",
    kicker: "Cấu hình dầm phân đoạn",
    title: "Dây chuyền tự động sản xuất dầm hộp phân đoạn",
    visual: "2–3 đốt/ngày",
    visualLabel: "Sản lượng ngày: 2–3 đốt",
    text: "Dành cho dầm hộp phân đoạn và sản xuất linh hoạt nhiều kích thước, dây chuyền tích hợp định vị đúc ghép khớp, khuôn đốt dầm chuyên dụng và dưỡng hộ hơi nước tự động. Nhịp sản xuất được tối ưu theo hình học đốt dầm và tiến độ lắp dựng.",
  },
];

const products = [
  {
    image: hydraulicFormworkImage,
    alt: "Khuôn dầm thủy lực Realjet độ chính xác cao",
    title: "Khuôn thủy lực độ chính xác cao",
    text: "Cơ cấu thủy lực đóng mở đồng bộ phù hợp với nhiều hình dạng dầm. Độ chính xác tái định vị duy trì trong 0,3 mm sau 5.000 chu kỳ, khe ghép khuôn trong 0,5 mm, giúp bảo đảm kích thước ổn định khi sản xuất hàng loạt.",
    features: ["Vận hành đồng bộ", "Hình học linh hoạt", "Dùng chung khuôn cho dầm trong / dầm biên"],
  },
  {
    image: castingBedSystemImage,
    alt: "Hệ thống chuyển khuôn trên ray Realjet",
    title: "Hệ thống chuyển khuôn trên ray",
    text: "Xe chuyển dùng pin lithium sắt phosphate vận chuyển khuôn giữa các trạm trên ray đặt sàn. Độ chính xác định vị ±1 mm, tải trọng 80–120 t tùy cấu hình và tuổi thọ pin trên 5.000 chu kỳ sạc. Hệ thống rút ngắn vòng quay khuôn từ năm ngày xuống còn một ngày.",
    features: ["Chuyển khuôn bằng pin", "Tự động nhận diện trạm", "Định vị ±1 mm"],
  },
  {
    image: concreteDistributionImage,
    alt: "Hệ thống vận chuyển và rải bê tông Realjet",
    title: "Vận chuyển và rải bê tông",
    text: "Gầu vận chuyển trên cao và máy rải bê tông điều khiển từ xa chạy trên ray đưa bê tông đến vị trí trong khoảng một phút, đồng thời kiểm soát chiều dày lớp rải trong ±5 mm. Hệ thống giảm 37% nhu cầu nhân công, 40% thời gian đổ bê tông mỗi dầm và 20% hao hụt bê tông.",
    features: ["Gầu bê tông trên cao", "Máy rải bê tông chạy ray", "Rải bê tông liên tục, đồng đều"],
  },
  {
    image: vibrationSystemImage,
    alt: "Hệ thống đầm rung ngoài và trong kết hợp Realjet",
    title: "Hệ thống đầm rung kết hợp",
    text: "Đầm rung ngoài tự động bao phủ ít nhất 80% bề mặt khuôn, trong khi đầm rung trong có dẫn hướng bao phủ 100% các vùng sâu đã xác định. Chỉ cần một đến hai công nhân để đầm bổ sung thủ công.",
    features: ["Đầm rung ngoài tự động", "Đầm rung trong có dẫn hướng", "Tự động ghi dữ liệu quy trình"],
  },
  {
    image: curingKilnImage,
    alt: "Hệ thống dưỡng hộ hơi nước tự động Realjet",
    title: "Hệ thống dưỡng hộ hơi nước tự động",
    text: "Dưỡng hộ trong khuôn bằng nguồn năng lượng mặt trời bổ trợ và bơm nhiệt không khí kiểm soát tốc độ gia nhiệt, làm nguội trong ±2 °C/giờ và chênh lệch nhiệt độ buồng trong 3 °C. Bê tông có thể đạt cường độ cần thiết để tạo dự ứng lực sau 8–14 giờ. Chi phí vận hành thấp hơn 49,6% so với khí tự nhiên và 30,1% so với viên nén sinh khối.",
    features: ["Dưỡng hộ toàn chu kỳ trong khuôn", "Năng lượng mặt trời + bơm nhiệt không khí", "Tự động kiểm soát nhiệt độ và độ ẩm"],
  },
  {
    image: lineManagementImage,
    alt: "Hệ thống quản lý dây chuyền sản xuất Realjet",
    title: "Hệ thống quản lý dây chuyền sản xuất",
    text: "Hệ thống điều phối kế hoạch sản xuất, trạng thái thiết bị và dữ liệu quy trình, với thời gian phản hồi liên động trong một giây và tần suất thu thập dữ liệu ít nhất một lần mỗi giây. Hệ thống hỗ trợ tối thiểu 200 điểm I/O và tạo hồ sơ số riêng cho từng dầm.",
    features: ["Lập lịch quy trình đồng bộ", "Hồ sơ số cho từng dầm", "Chẩn đoán và hỗ trợ từ xa"],
  },
];

const projects = [
  {
    image: shenhaiTj05Image,
    alt: "Dây chuyền cấu kiện bê tông đúc sẵn cho đoạn phía nam Ninh Ba của cao tốc Shenhai G15, gói thầu TJ05",
    category: "Cao tốc",
    title: "Đoạn phía nam Ninh Ba, cao tốc Shenhai G15 — Gói thầu TJ05",
    englishTitle: "G15 Shenhai Expressway, Ningbo South Section, Contract TJ05",
    line: "2 dây chuyền dầm T",
    coreEquipment: ["Chuyển khuôn", "Rải bê tông", "Đầm rung", "Dưỡng hộ hơi nước", "Tạo dự ứng lực"],
    product: "Dầm T 30 m",
    output: "6 dầm/ngày",
  },
  {
    image: wenzhouBayBaseImage,
    alt: "Dây chuyền cấu kiện bê tông đúc sẵn tại cơ sở công nghiệp Khu mới Vịnh Ôn Châu",
    category: "Cơ sở công nghiệp",
    title: "Cơ sở công nghiệp giao thông và xây dựng đô thị Khu mới Vịnh Ôn Châu",
    englishTitle: "Wenzhou Bay New Area Industrialised Transport and Urban Construction Base",
    line: "4 dây chuyền dầm T",
    coreEquipment: ["Chuyển khuôn", "Khuôn thủy lực", "Đầm rung", "Rải bê tông", "Dưỡng hộ kết hợp"],
    product: "Dầm T 30 m và 40 m",
    output: "8–12 dầm/ngày",
  },
  {
    image: yongguanDongtouImage,
    alt: "Dây chuyền cấu kiện bê tông đúc sẵn cho nhánh Động Đầu của cao tốc Vĩnh Quán",
    category: "Nhánh cao tốc",
    title: "Dự án nhánh Động Đầu, cao tốc Vĩnh Quán",
    englishTitle: "Yongguan Expressway Dongtou Spur Project",
    line: "2 dây chuyền dầm phân đoạn",
    coreEquipment: ["Hệ thống chuyển khuôn 300 t", "Khuôn thủy lực", "Đầm rung", "Rải bê tông", "Dưỡng hộ kết hợp"],
    product: "Đốt dầm hộp",
    output: "6 đốt/ngày",
  },
  {
    image: guangaoTj5Image,
    alt: "Dây chuyền cấu kiện bê tông đúc sẵn cho cao tốc Xuyên Chủ Tự–Hồng Nguyên",
    category: "Nâng cấp",
    title: "Dự án cao tốc Xuyên Chủ Tự–Hồng Nguyên",
    englishTitle: "Chuanzhusi–Hongyuan Expressway Project",
    line: "Nâng cấp dây chuyền hiện có",
    coreEquipment: ["Rải bê tông", "Băng tải", "Máy rải"],
    product: "Dầm T 20 m",
    output: "20 dầm/ngày",
  },
];

const capabilities = [
  {
    icon: Compass,
    image: researchDesignImage,
    alt: "Năng lực kỹ thuật và R&D của Realjet",
    title: "Kỹ thuật và R&D",
    headline: "Chuyển yêu cầu dự án thành thiết kế dây chuyền tích hợp",
    text: "Đội ngũ R&D của chúng tôi bao gồm thiết kế cơ khí, điều khiển điện, thủy lực, thuật toán phần mềm và công nghệ quy trình. Dây chuyền được thiết kế theo sản phẩm, công suất, tiến độ và điều kiện mặt bằng; đồng thời có thể cùng khách hàng phát triển quy trình và thiết bị cho dự án đặc thù.",
    stats: [
      { value: "40+", label: "Kỹ sư R&D" },
      { value: "50%+", label: "Nhân sự R&D có bằng thạc sĩ" },
      { value: "5%", label: "Doanh thu hằng năm đầu tư cho R&D" },
      { value: "150+", label: "Bằng sáng chế được cấp" },
    ],
  },
  {
    icon: Wrench,
    image: manufacturingCapabilityImage,
    alt: "Cơ sở chế tạo nội bộ của Realjet",
    title: "Tự chủ chế tạo",
    headline: "Thiết bị trọng yếu được chế tạo nội bộ với kiểm soát chất lượng xuyên suốt",
    text: "66 máy thiết bị cỡ lớn phục vụ cắt, chấn, gia công, hàn, xử lý bề mặt, lắp ráp và thử nghiệm, bảo đảm truy xuất chất lượng toàn diện cho các hệ thống tùy chỉnh quy mô lớn.",
    stats: [
      { value: "66", label: "Thiết bị chế tạo chính" },
      { value: "±0,005 mm", label: "Độ chính xác định vị" },
      { value: "12", label: "Robot hàn" },
      { value: "Chứng nhận kép", label: "ISO 9001 / ISO 3834-2" },
    ],
  },
  {
    icon: HardHat,
    image: projectDeliveryCapabilityImage,
    alt: "Triển khai dự án dây chuyền bê tông đúc sẵn Realjet",
    title: "Triển khai dự án",
    headline: "Không chỉ bàn giao thiết bị, chúng tôi hỗ trợ đến khi dây chuyền vận hành ổn định",
    text: "Phạm vi dịch vụ từ phối hợp giải pháp và chế tạo đến lắp đặt, chạy thử đồng bộ, sản xuất thử, đào tạo và hỗ trợ vận hành. Một nhóm dự án thống nhất điều phối các giao diện xây dựng, điện, nâng hạ và điều khiển.",
    stats: [
      { value: "1 năm", label: "Bảo hành thiết bị" },
      { value: "24/7", label: "Hỗ trợ từ xa" },
      { value: "60 ngày", label: "Lắp đặt và chạy thử" },
      { value: "2 giờ", label: "Phản hồi khi ngừng sản xuất" },
    ],
  },
];

const companyProofs = [
  { value: "Từ năm 2008", label: "Liên tục chuyên sâu trong ngành" },
  { value: "Hơn 100.000 m²", label: "Cơ sở sản xuất thuộc sở hữu công ty" },
  { value: "Hơn 60.000 m²", label: "Nhà xưởng chế tạo thiết bị" },
  { value: "Doanh nghiệp niêm yết NEEQ", label: "Mã chứng khoán 832867" },
];

function PrimaryButton({ children, onClick, className = "" }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-[9px] bg-[#d94824] px-5 text-[13px] font-[850] text-white shadow-[0_12px_28px_rgba(217,72,36,.26)] transition duration-180 hover:-translate-y-0.5 hover:bg-[#b93619] focus-visible:bg-[#b93619] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${className}`}
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
        <h3 className="text-[clamp(20px,2.2vw,26px)] font-[850] tracking-[-0.025em] text-brand-navy">Các cấu kiện dây chuyền có thể sản xuất</h3>
        <p className="mt-1.5 max-w-[760px] text-[13px] leading-[1.6] text-muted">Mỗi dây chuyền có thể được cấu hình để sản xuất các loại cấu kiện bê tông đúc sẵn khác nhau theo yêu cầu dự án.</p>
      </div>

      <div className="precast-carousel-shell">
        <button type="button" onClick={() => handleManualMove(-1)} aria-label="Cấu kiện đúc sẵn trước" className="precast-carousel-control precast-carousel-control-left">
          <ArrowLeft size={18} aria-hidden="true" />
        </button>
        <div ref={trackRef} className="precast-type-track" aria-label="Danh sách trượt cấu kiện bê tông đúc sẵn" onScroll={handleLoopScroll}>
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
        <button type="button" onClick={() => handleManualMove(1)} aria-label="Cấu kiện đúc sẵn tiếp theo" className="precast-carousel-control precast-carousel-control-right">
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
    ["Giải pháp", "#method"],
    ["Dây chuyền", "#lines"],
    ["Thiết bị", "#products"],
    ["Dự án", "#projects"],
    ["Năng lực", "#capabilities"],
  ];

  return (
    <header className="sticky top-0 z-40 h-[70px] border-b border-white/10 bg-brand-navy/97 text-white backdrop-blur-xl max-[720px]:h-[62px]">
      <div className="site-container flex h-full items-center gap-6 max-[720px]:gap-2">
        <a href="/" aria-label="Trang chủ Realjet" className="shrink-0">
          <img src={logoImage} alt="Logo Realjet" className="h-8 w-auto max-w-60 object-contain max-[720px]:h-[23px] max-[720px]:max-w-[160px]" />
        </a>
        <nav className="ml-auto flex items-center gap-5 text-xs text-white/70 max-[1100px]:hidden" aria-label="Điều hướng chính">
          {nav.map(([label, href]) => <a key={href} href={href} className="transition hover:text-white">{label}</a>)}
        </nav>
        <button onClick={() => onLead("Tư vấn phương án miễn phí")} className="rounded-lg bg-[#d94824] px-3.5 py-2 text-xs font-[850] text-white shadow-[0_8px_22px_rgba(217,72,36,.28)] transition hover:bg-[#b93619] focus-visible:bg-[#b93619] max-[1100px]:ml-auto max-[720px]:hidden">Tư vấn phương án miễn phí</button>
        <LanguageSwitcher current="vi" />
        <button
          type="button"
          aria-label={menuOpen ? "Đóng điều hướng" : "Mở điều hướng"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((value) => !value)}
          className="hidden rounded-lg border border-white/15 p-2 text-white max-[1100px]:ml-0 max-[1100px]:block"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {menuOpen && (
        <nav className="absolute inset-x-0 top-full border-t border-white/10 bg-brand-navy px-5 py-4 shadow-floating min-[1101px]:hidden" aria-label="Điều hướng di động">
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
              <span className="block">Dây chuyền trọn gói sản xuất</span>{" "}
              <span className="block">cấu kiện bê tông đúc sẵn</span>
            </h1>
            <p className="mt-8 max-w-[570px] text-lg font-normal text-white/72 max-[720px]:text-[15px]">
              Từ quy hoạch dây chuyền, lựa chọn và tùy chỉnh thiết bị đến lắp đặt và tối ưu công suất, Realjet điều phối toàn bộ quá trình triển khai.
            </p>
            <div className="mt-7.5">
              <PrimaryButton onClick={() => onLead("Tư vấn phương án miễn phí")} className="max-[720px]:w-full max-[720px]:max-w-[320px]">Tư vấn phương án miễn phí <ArrowRight size={16} /></PrimaryButton>
            </div>
            <div className="mt-5 flex flex-wrap gap-2 max-[720px]:mt-7">
              {["Đường cao tốc", "Cầu", "Đường sắt", "Thủy lợi", "Hạ tầng đô thị"].map((tag) => (
                <span key={tag} className="rounded-full border border-brand-cyan/35 bg-brand-navy/30 px-2.5 py-1.5 text-[12px] text-white/75 backdrop-blur-sm">{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </section>
      <div id="hero-metrics" className="relative z-30 -mt-6">
        <div className="site-container">
          <div className="grid grid-cols-4 overflow-hidden rounded-[13px] border border-line bg-white shadow-card max-[720px]:grid-cols-2">
            {[["50%", "Diện tích cần thiết", "down"], ["30%", "Nhân công tại chỗ", "down"], ["3×", "Hiệu suất chuyển khuôn", "up"], ["50%", "Thời gian dưỡng hộ hơi nước", "down"]].map(([value, label, direction]) => (
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
    const body = createBeamFactoryEnquiryBody(form, { locale: "vi", title });
    setSubmissionState("submitting");

    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
      });

      if (!response.ok) throw new Error("Không thể gửi");
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
        <button ref={closeRef} onClick={onClose} aria-label="Đóng" className="absolute top-3.5 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-soft text-brand-navy"><X size={20} /></button>
        {submitted ? (
          <div className="py-10 text-center">
            <CheckCircle className="mx-auto mb-4 text-brand-cyan" size={48} />
            <strong className="block text-xl font-[850] text-brand-navy">Yêu cầu dự án của bạn đã được gửi</strong>
            <p className="mt-2 text-xs text-muted">Cảm ơn bạn. Chuyên gia Realjet sẽ liên hệ qua thông tin bạn đã cung cấp.</p>
            <button
              type="button"
              onClick={onClose}
              className="mx-auto mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-[9px] bg-brand-navy px-5 text-[13px] font-[850] text-white"
            >
              <ArrowLeft size={15} /> Quay lại trang
            </button>
          </div>
        ) : (
          <>
            <h3 id="lead-title" className="mr-12 text-2xl font-[850] text-brand-navy">{title}</h3>
            <p className="mt-1.5 mb-5 text-xs text-muted">Vui lòng nhập họ tên, e-mail và nội dung yêu cầu.</p>
            <form name={UNIVERSAL_ENQUIRY_FORM_NAME} method="POST" data-netlify="true" netlify-honeypot="bot-field" aria-busy={submissionState === "submitting"} onSubmit={handleSubmit}>
              <input type="hidden" name="form-name" value={UNIVERSAL_ENQUIRY_FORM_NAME} />
              <input type="hidden" name="bot-field" />
              <input type="hidden" name="privacy_acknowledgement" value="acknowledged" />
              <UniversalEnquiryFields locale="vi" submissionState={submissionState} />
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
  return (
    <a href="mailto:sales@realjetech.com" className="text-left underline decoration-white/20 underline-offset-4 transition hover:text-white">
      sales@realjetech.com
    </a>
  );
}

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [leadTitle, setLeadTitle] = useState("Tư vấn phương án miễn phí");
  const [progress, setProgress] = useState(0);
  const [showAllEquipment, setShowAllEquipment] = useState(false);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [finalCtaVisible, setFinalCtaVisible] = useState(false);
  const [heroMetricsVisible, setHeroMetricsVisible] = useState(true);
  const [mobileCtaVisible, setMobileCtaVisible] = useState(true);
  const lastScrollYRef = useRef(0);
  const scrollStopTimerRef = useRef(null);
  const leadTriggerRef = useRef(null);
  const openLead = (title = "Tư vấn phương án miễn phí") => {
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
      <div id="site-shell" data-locale="vi">
        <Header onLead={openLead} />
        <div className="fixed top-[69px] left-0 z-50 h-[3px] bg-gradient-to-r from-brand-cyan to-accent-orange max-[720px]:top-[61px]" style={{ width: `${progress}%` }} />
        <main>
        <Hero onLead={openLead} />

        <Section id="method" compactBottom>
          <SectionHeader
            kicker="Quy trình phát triển giải pháp"
            title="Từ dữ liệu dự án đến dây chuyền sẵn sàng sản xuất"
            text="Trước tiên, chúng tôi xác định yêu cầu sản xuất, áp lực tiến độ, điều kiện mặt bằng, nhân lực, nguồn lực và điều kiện địa phương. Quy trình bốn bước sau đó chuyển các dữ liệu này thành công suất sản xuất ổn định."
          />

          <div className="solution-journey">
            <aside className="solution-input-panel">
              <div className="solution-panel-header">
                <span className="section-index">01 · DỮ LIỆU DỰ ÁN</span>
                <h3>Xác định yêu cầu sản xuất và các ràng buộc</h3>
                <p className="solution-panel-description is-dark">Yêu cầu sản xuất, điều kiện mặt bằng, nguồn lực và tiêu chuẩn dự án cùng quyết định quy trình, bố trí và gói thiết bị.</p>
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
                <span className="section-index text-brand-blue">02 · QUY TRÌNH REALJET</span>
                <h3>Bốn bước thiết kế dây chuyền</h3>
                <p className="solution-panel-description">Phân tích nhu cầu, thiết kế công nghệ, lựa chọn thiết bị và tối ưu công suất giúp mọi quyết định bám sát sản lượng đầu ra cần đạt.</p>
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
                    <span className="delivery-output">ĐẦU RA · {output}</span>
                  </article>
                ))}
              </div>
            </div>
          </div>
          <SectionCta onClick={openLead}>Yêu cầu phương án dây chuyền sơ bộ</SectionCta>
          <PrecastTypeCarousel />
        </Section>

        <Section id="lines" soft>
          <SectionHeader
            kicker="Cấu hình dây chuyền điển hình"
            title="Ứng dụng công nghệ đã được kiểm chứng để xác định quy trình phù hợp cho từng dự án"
            text="Chúng tôi đã phát triển các quy trình được kiểm chứng cho nhiều loại cấu kiện bê tông đúc sẵn. Với yêu cầu đặc thù, Realjet phối hợp cùng khách hàng phát triển quy trình, thiết kế giải pháp, thiết bị và xác nhận sản xuất."
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
          <MobileScrollArrows />
          <SectionCta onClick={openLead}>Trao đổi về quy trình sản xuất</SectionCta>
        </Section>

        <Section id="products">
          <SectionHeader kicker="Thiết bị sản xuất cốt lõi" title="Cấu hình dây chuyền theo các công đoạn trọng yếu" text="Thiết bị không chỉ là một danh sách. Mỗi hệ thống được lựa chọn và kết hợp theo sản phẩm, nhịp sản xuất và điều kiện mặt bằng." />
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
          <MobileScrollArrows />
          {!showAllEquipment && (
            <button type="button" onClick={() => setShowAllEquipment(true)} className="mx-auto mt-6 hidden min-h-11 items-center justify-center rounded-[9px] border border-brand-blue/20 bg-white px-5 text-[13px] font-[850] text-brand-navy max-[720px]:flex">
              Xem tất cả thiết bị
            </button>
          )}
          <SectionCta onClick={openLead}>Yêu cầu thông tin thiết bị</SectionCta>
        </Section>

        <Section id="projects" soft>
          <SectionHeader
            kicker="Dự án tham khảo"
            title="Mỗi dự án cần một dây chuyền sản xuất khác nhau"
            text="Realjet đã bàn giao dây chuyền cho nhiều dự án giao thông và hạ tầng lớn, đạt sản lượng ổn định tại nhiều địa điểm."
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
                      <dt className="text-[9px] font-[850] tracking-[0.06em] text-muted">CẤU HÌNH DÂY CHUYỀN</dt>
                      <dd className="mt-1 text-[11px] font-[850] text-brand-navy">{line}</dd>
                    </div>
                    <div className="min-w-[108px] flex-1 rounded-[9px] border border-line bg-soft px-3 py-2.5">
                      <dt className="text-[9px] font-[850] tracking-[0.06em] text-muted">SẢN LƯỢNG NGÀY</dt>
                      <dd className="mt-1 text-[11px] font-[850] text-brand-navy">{output}</dd>
                    </div>
                  </dl>
                  <div className="mt-3 min-h-[152px] rounded-[9px] border border-brand-blue/10 bg-[#eef6f8] px-3 py-3 max-[720px]:min-h-0">
                    <div className="flex items-center gap-1.5 text-brand-blue">
                      <Settings size={13} aria-hidden="true" />
                      <span className="text-[10px] font-[850] tracking-[0.04em]">THIẾT BỊ CỐT LÕI</span>
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
          <MobileScrollArrows />
          {!showAllProjects && (
            <button type="button" onClick={() => setShowAllProjects(true)} className="mx-auto mt-6 hidden min-h-11 items-center justify-center rounded-[9px] border border-brand-blue/20 bg-white px-5 text-[13px] font-[850] text-brand-navy max-[720px]:flex">
              Xem tất cả dự án
            </button>
          )}
          <SectionCta onClick={openLead}>Yêu cầu thêm dự án tham khảo</SectionCta>
        </Section>

        <Section id="capabilities">
          <SectionHeader
            kicker="Vì sao chọn Realjet"
            title="Ba năng lực biến ý tưởng thành công suất sản xuất"
            text="Được thành lập năm 2008, Realjet cung cấp giải pháp tích hợp cho nhà máy dầm bê tông đúc sẵn, bao gồm quy hoạch dây chuyền, R&D và chế tạo thiết bị, lắp đặt, chạy thử, sản xuất thử và hỗ trợ vận hành."
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
          <MobileScrollArrows />
          <SectionCta onClick={openLead}>Yêu cầu tư vấn kỹ thuật</SectionCta>
        </Section>

        <section id="final-cta" className="hero-gradient py-[72px] text-white">
          <div className="site-container flex flex-col items-center text-center">
            <p className="mb-2 text-[13px] font-[850] tracking-[0.1em] text-[#8ce2e8] uppercase">Khởi động dự án</p>
            <h2 className="max-w-[760px] text-[clamp(28px,3.4vw,40px)] leading-[1.16] font-[850] tracking-[-0.03em]">Nhận giải pháp được thiết kế cho dự án của bạn</h2>
            <p className="mt-3 max-w-[670px] text-[15px] text-white/68">Hãy cho chúng tôi biết sản phẩm cần sản xuất; Realjet sẽ bắt đầu lập phương án dây chuyền cấu kiện bê tông đúc sẵn cho dự án.</p>
            <PrimaryButton onClick={() => openLead("Gửi thông tin dự án")} className="mt-6 max-[720px]:w-full max-[720px]:max-w-[320px]">Gửi thông tin dự án <ArrowRight size={16} /></PrimaryButton>
          </div>
        </section>
        </main>

        <footer className="bg-[#051a2c] py-6 text-[11px] text-[#89a0b0] max-[720px]:pb-[calc(24px+env(safe-area-inset-bottom))]">
          <div className="site-container flex items-center justify-between gap-5 max-[720px]:flex-col max-[720px]:items-start">
            <span>© 2026 Changsha Ruijie Machinery Technology Co., Ltd. Bảo lưu mọi quyền.</span>
            <div className="flex items-center gap-5 max-[720px]:flex-col max-[720px]:items-start max-[720px]:gap-2">
              <a href="../../privacy/vi/" className="underline decoration-white/20 underline-offset-4 transition hover:text-white">Chính sách quyền riêng tư</a>
              <a href="https://zalo.me/8619310090600" target="_blank" rel="noopener noreferrer" className="underline decoration-white/20 underline-offset-4 transition hover:text-white">Zalo: +86 193 1009 0600</a>
              <ContactEmail />
            </div>
          </div>
        </footer>

        <FloatingContactActions ariaLabel="Tùy chọn liên hệ" canonicalUrl="https://realjetech.com/marketing/precast-beam-factory/vi/" enquiryLabel="Yêu cầu" enquiryTitle="Tư vấn phương án miễn phí" messagingChannel="zalo" messagingHref="https://zalo.me/8619310090600" messagingLabel="Zalo" onEnquire={openLead} showEmail={false} subject="dây chuyền sản xuất dầm bê tông đúc sẵn" />
        <MobileContactBar ariaLabel="Tùy chọn liên hệ" canonicalUrl="https://realjetech.com/marketing/precast-beam-factory/vi/" emailLabel="Email" enquireLabel="Yêu cầu" enquiryTitle="Tư vấn phương án miễn phí" hidden={hideMobileCta} messagingChannel="zalo" messagingHref="https://zalo.me/8619310090600" messagingLabel="Zalo" onEnquire={openLead} showEmail={false} subject="dây chuyền sản xuất dầm bê tông đúc sẵn" />
      </div>

      <LeadModal open={modalOpen} onClose={closeLead} title={leadTitle} />
    </>
  );
}
