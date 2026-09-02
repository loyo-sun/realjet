import { ArrowLeft, Mail, MapPin, ShieldCheck } from "lucide-react";
import logoImage from "../../../assets/image/realjet-logo.webp";
import AnalyticsPreferenceSwitch from "../shared/AnalyticsPreferenceSwitch";

const sections = [
  ["who-we-are", "1. Về chúng tôi"],
  ["information-we-collect", "2. Thông tin chúng tôi thu thập"],
  ["how-we-use-information", "3. Cách chúng tôi sử dụng thông tin"],
  ["legal-bases", "4. Cơ sở xử lý"],
  ["sharing", "5. Chia sẻ thông tin"],
  ["international-transfers", "6. Chuyển dữ liệu quốc tế"],
  ["retention", "7. Thời gian lưu trữ"],
  ["security", "8. Bảo mật thông tin"],
  ["your-rights", "9. Quyền của bạn"],
  ["cookies", "10. Cookie và công nghệ tương tự"],
  ["children", "11. Thông tin của trẻ em"],
  ["third-party-links", "12. Liên kết của bên thứ ba"],
  ["changes", "13. Thay đổi chính sách"],
  ["contact", "14. Liên hệ"],
];

function PolicySection({ id, title, children }) {
  return <section id={id} className="scroll-mt-24 border-b border-line py-8 first:pt-0 last:border-b-0 last:pb-0"><h2 className="text-[clamp(21px,2.2vw,26px)] leading-[1.25] font-[850] tracking-[-0.02em] text-brand-navy">{title}</h2><div className="policy-copy mt-4 space-y-4 text-[15px] leading-[1.75] text-muted">{children}</div></section>;
}

function ContactCard() {
  return <div className="mt-5 rounded-card border border-brand-blue/15 bg-soft p-5"><strong className="block text-[16px] font-[850] text-brand-navy">Changsha Ruijie Machinery Technology Co., Ltd.</strong><div className="mt-4 grid gap-3 text-[14px]"><div className="flex items-start gap-2.5"><MapPin className="mt-0.5 shrink-0 text-brand-blue" size={17} aria-hidden="true" /><span>Số 48, Khu mới Jinzhou (Khu phát triển Jinzhou), Ningxiang, Trường Sa, Hồ Nam, Trung Quốc</span></div><a href="mailto:sales@realjetech.com" className="flex items-center gap-2.5 font-[750] text-brand-blue underline decoration-brand-blue/25 underline-offset-3 hover:text-brand-navy"><Mail size={17} aria-hidden="true" />sales@realjetech.com</a></div></div>;
}

function goBack() {
  if (document.referrer && window.history.length > 1) window.history.back();
  else window.location.assign("/marketing/spun-pipe-piles-production-line/vi/");
}

export default function App() {
  return <>
    <header className="sticky top-0 z-30 h-[70px] border-b border-white/10 bg-brand-navy/97 text-white backdrop-blur-xl max-[720px]:h-[62px]"><div className="site-container flex h-full items-center justify-between gap-5"><a href="/" aria-label="Trang chủ Realjet"><img src={logoImage} alt="Realjet" className="h-8 w-auto max-w-60 object-contain max-[720px]:h-[23px] max-[720px]:max-w-[160px]" /></a><button type="button" onClick={goBack} className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-white/15 px-3 text-[12px] font-[750] text-white/80 transition hover:border-white/30 hover:text-white"><ArrowLeft size={15} aria-hidden="true" />Quay lại</button></div></header>
    <main>
      <section className="hero-gradient text-white"><div className="site-container py-16 max-[720px]:py-12"><div className="flex max-w-[820px] items-start gap-5"><div className="mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-brand-cyan/25 bg-white/8 text-brand-cyan max-[720px]:hidden"><ShieldCheck size={27} aria-hidden="true" /></div><div><p className="text-[13px] font-[850] tracking-[0.1em] text-[#8ce2e8] uppercase">Bảo vệ dữ liệu</p><h1 className="mt-2 text-[clamp(36px,5vw,56px)] leading-[1.08] font-[900] tracking-[-0.04em]">Chính sách quyền riêng tư</h1><p className="mt-5 max-w-[760px] text-[17px] leading-[1.7] text-white/72 max-[720px]:text-[15px]">Chính sách này giải thích cách Realjet thu thập, sử dụng, lưu trữ, chia sẻ và bảo vệ dữ liệu cá nhân được gửi qua website và biểu mẫu yêu cầu dự án.</p><p className="mt-5 text-[12px] font-[750] text-white/55">Ngày hiệu lực: 1 tháng 8 năm 2026</p></div></div></div></section>
      <div className="site-container grid grid-cols-[250px_minmax(0,1fr)] gap-12 py-16 max-[1000px]:grid-cols-1 max-[720px]:gap-8 max-[720px]:py-10">
        <aside className="max-[1000px]:order-2"><nav aria-label="Mục lục chính sách quyền riêng tư" className="sticky top-24 rounded-card border border-line bg-soft p-5 max-[1000px]:static"><strong className="text-[13px] font-[850] tracking-[0.06em] text-brand-blue uppercase">Nội dung</strong><ol className="mt-3 grid gap-1.5">{sections.map(([id, title]) => <li key={id}><a href={`#${id}`} className="block rounded-md px-2 py-1.5 text-[12px] leading-[1.35] text-muted transition hover:bg-white hover:text-brand-navy">{title}</a></li>)}</ol></nav></aside>
        <article className="min-w-0 max-w-[830px]">
          <div className="mb-8 space-y-4 text-[16px] leading-[1.75] text-muted"><p>Changsha Ruijie Machinery Technology Co., Ltd. (“Realjet”, “chúng tôi”) tôn trọng quyền riêng tư của bạn và cam kết xử lý dữ liệu cá nhân một cách có trách nhiệm, minh bạch.</p><p>Chính sách này áp dụng khi bạn truy cập website, gửi yêu cầu dự án hoặc liên hệ với chúng tôi theo cách khác.</p></div>
          <PolicySection id="who-we-are" title="1. Về chúng tôi"><p>Đơn vị chịu trách nhiệm đối với dữ liệu cá nhân nêu trong chính sách này là:</p><ContactCard /></PolicySection>
          <PolicySection id="information-we-collect" title="2. Thông tin chúng tôi thu thập"><h3 className="font-[850] text-brand-navy">2.1 Thông tin bạn cung cấp</h3><p>Khi bạn gửi yêu cầu, chúng tôi có thể thu thập tên, e-mail công việc, quốc gia hoặc khu vực, thông tin công ty và nội dung dự án như loại sản phẩm, sản lượng, tiến độ, điều kiện mặt bằng và phạm vi cần cung cấp.</p><p>Không gửi dữ liệu cá nhân nhạy cảm nếu dữ liệu đó không cần thiết cho yêu cầu dự án.</p><h3 className="pt-2 font-[850] text-brand-navy">2.2 Thông tin kỹ thuật</h3><p>Nhà cung cấp dịch vụ lưu trữ, bảo mật, e-mail hoặc xử lý biểu mẫu có thể nhận địa chỉ IP, loại trình duyệt và thiết bị, trang đã truy cập, thời gian truy cập và nhật ký chẩn đoán cơ bản.</p><p>Khi có sự đồng ý, Google Analytics 4 có thể ghi nhận các sự kiện ẩn danh hoặc dùng mã định danh giả như lượt xem trang, vị trí nút được chọn, tiến độ biểu mẫu theo tên trường và trạng thái gửi. Nội dung bạn nhập vào biểu mẫu không được gửi cho Google Analytics.</p></PolicySection>
          <PolicySection id="how-we-use-information" title="3. Cách chúng tôi sử dụng thông tin"><p>Chúng tôi sử dụng dữ liệu để tiếp nhận và phản hồi yêu cầu; hiểu nhu cầu sản xuất; chuẩn bị thông tin kỹ thuật, thiết bị hoặc thương mại; trao đổi về dự án; tổ chức tư vấn, báo giá, chạy thử hoặc hỗ trợ; lưu hồ sơ kinh doanh; bảo vệ hệ thống; tuân thủ nghĩa vụ pháp lý; và cải thiện website, dịch vụ.</p><p>Chúng tôi không dùng thông tin yêu cầu để đưa ra quyết định hoàn toàn tự động gây hiệu lực pháp lý hoặc ảnh hưởng đáng kể tương tự.</p></PolicySection>
          <PolicySection id="legal-bases" title="4. Cơ sở xử lý"><p>Tùy theo luật áp dụng, chúng tôi xử lý dữ liệu dựa trên các bước theo yêu cầu trước khi ký hợp đồng hoặc thực hiện hợp đồng, lợi ích hợp pháp, sự đồng ý và nghĩa vụ pháp lý.</p><p>Nếu việc xử lý dựa trên sự đồng ý, bạn có thể rút lại sự đồng ý bất cứ lúc nào; việc rút lại không ảnh hưởng đến hoạt động xử lý hợp pháp đã thực hiện trước đó.</p></PolicySection>
          <PolicySection id="sharing" title="5. Chia sẻ thông tin"><p>Khi cần thiết, dữ liệu có thể được chia sẻ với nhân sự Realjet được ủy quyền; nhà cung cấp dịch vụ lưu trữ, biểu mẫu, e-mail, đám mây, an ninh mạng; cố vấn chuyên môn; cơ quan có thẩm quyền theo yêu cầu pháp luật; hoặc bên kế thừa trong một giao dịch doanh nghiệp hợp pháp.</p><p>Chúng tôi không bán dữ liệu cá nhân. Nhà cung cấp dịch vụ chỉ được xử lý dữ liệu để cung cấp dịch vụ cho chúng tôi và phải bảo vệ dữ liệu theo yêu cầu áp dụng.</p></PolicySection>
          <PolicySection id="international-transfers" title="6. Chuyển dữ liệu quốc tế"><p>Realjet đặt tại Trung Quốc và phục vụ khách hàng ở nhiều quốc gia. Thông tin gửi qua website có thể được xử lý tại Trung Quốc hoặc tại quốc gia nơi nhà cung cấp dịch vụ hoạt động.</p><p>Khi luật yêu cầu, chúng tôi áp dụng cơ chế chuyển dữ liệu hợp pháp cùng biện pháp bảo vệ hợp đồng, tổ chức hoặc kỹ thuật phù hợp.</p></PolicySection>
          <PolicySection id="retention" title="7. Thời gian lưu trữ"><p>Thông tin yêu cầu dự án thường được lưu tối đa <strong>24 tháng kể từ lần trao đổi có nội dung gần nhất</strong>. Nếu yêu cầu phát triển thành báo giá, hợp đồng, dự án, tranh chấp hoặc nghĩa vụ pháp lý, dữ liệu liên quan có thể được lưu lâu hơn theo yêu cầu.</p><p>Khi không còn cần thiết, dữ liệu sẽ được xóa, ẩn danh hoặc cô lập an toàn, trừ khi pháp luật yêu cầu tiếp tục lưu giữ.</p></PolicySection>
          <PolicySection id="security" title="8. Bảo mật thông tin"><p>Chúng tôi áp dụng biện pháp hành chính, kỹ thuật và tổ chức hợp lý nhằm bảo vệ dữ liệu khỏi truy cập trái phép, mất mát, lạm dụng, thay đổi hoặc tiết lộ.</p><p>Không hệ thống Internet nào có thể được bảo đảm an toàn tuyệt đối. Không gửi tài liệu kỹ thuật mật hoặc dữ liệu nhạy cảm qua biểu mẫu yêu cầu chung.</p></PolicySection>
          <PolicySection id="your-rights" title="9. Quyền của bạn"><p>Tùy theo luật áp dụng, bạn có thể có quyền yêu cầu xác nhận việc xử lý, truy cập, sửa, xóa, hạn chế xử lý, phản đối một số hoạt động xử lý, rút lại sự đồng ý, yêu cầu chuyển dữ liệu và khiếu nại với cơ quan có thẩm quyền.</p><p>Để thực hiện quyền, hãy liên hệ theo thông tin tại Mục 1. Chúng tôi có thể cần xác minh danh tính trước khi xử lý yêu cầu.</p></PolicySection>
          <PolicySection id="cookies" title="10. Cookie và công nghệ tương tự"><p>Website có thể dùng các chức năng kỹ thuật hoặc bảo mật thiết yếu để hiển thị trang, xử lý yêu cầu, ngăn chặn lạm dụng và duy trì độ tin cậy.</p><p>Google Analytics 4 và đo lường chuyển đổi Google Ads, nếu được cấu hình, là dịch vụ tùy chọn. “Chấp nhận tất cả” bật cả phân tích và quảng cáo. Hai nút bên dưới cho phép quản lý riêng từng mục đích. Đóng thông báo ban đầu mà không chấp nhận sẽ từ chối cả hai.</p><p>Bạn có thể thay đổi hoặc rút lại lựa chọn bất cứ lúc nào. Nội dung biểu mẫu yêu cầu không được gửi cho Google Analytics hoặc Google Ads.</p><AnalyticsPreferenceSwitch locale="vi" label="Quản lý tùy chọn cookie" /></PolicySection>
          <PolicySection id="children" title="11. Thông tin của trẻ em"><p>Website và dịch vụ yêu cầu dự án dành cho người dùng doanh nghiệp, chuyên môn; không hướng đến trẻ em và chúng tôi không chủ ý thu thập dữ liệu của trẻ em qua biểu mẫu.</p></PolicySection>
          <PolicySection id="third-party-links" title="12. Liên kết của bên thứ ba"><p>Website có thể chứa liên kết đến dịch vụ của bên thứ ba. Hoạt động quyền riêng tư của họ tuân theo chính sách riêng; chúng tôi không chịu trách nhiệm về quyền riêng tư, bảo mật hoặc nội dung của website bên thứ ba.</p></PolicySection>
          <PolicySection id="changes" title="13. Thay đổi chính sách"><p>Chúng tôi có thể cập nhật chính sách khi website, dịch vụ, cách xử lý dữ liệu hoặc nghĩa vụ pháp lý thay đổi. Bản sửa đổi sẽ được đăng tại đây kèm ngày hiệu lực mới.</p></PolicySection>
          <PolicySection id="contact" title="14. Liên hệ"><p>Đối với câu hỏi, yêu cầu hoặc khiếu nại về quyền riêng tư, vui lòng liên hệ:</p><ContactCard /><p>Chúng tôi sẽ xem xét và phản hồi trong thời hạn luật áp dụng yêu cầu.</p></PolicySection>
        </article>
      </div>
    </main>
    <footer className="bg-[#051a2c] py-6 text-[11px] text-[#89a0b0]"><div className="site-container flex items-center justify-between gap-5 max-[720px]:flex-col max-[720px]:items-start"><span>© 2026 Changsha Ruijie Machinery Technology Co., Ltd. Bảo lưu mọi quyền.</span><a href="../../spun-pipe-piles-production-line/vi/" className="underline decoration-white/20 underline-offset-4 transition hover:text-white">Dây chuyền sản xuất cọc ly tâm</a></div></footer>
  </>;
}
