import { Send, User } from "lucide-react";

const copyByLocale = {
  en: {
    name: "Name *",
    namePlaceholder: "Your name",
    email: "E-mail *",
    emailPlaceholder: "name@company.com",
    message: "Message *",
    messagePlaceholder: "Tell us what you need, the target output or schedule, and any known project requirements.",
    privacy: "By submitting, you agree that Realjet may use this information to respond to your enquiry.",
    privacyLabel: "Privacy Policy",
    submit: "Submit Enquiry",
    submitting: "Submitting…",
    error: "Submission failed. Please check your connection and try again, or contact us later.",
  },
  cn: {
    name: "姓名 *",
    namePlaceholder: "您的姓名",
    email: "邮箱 *",
    emailPlaceholder: "name@company.com",
    message: "信息 *",
    messagePlaceholder: "请简要说明您的需求、目标产能或工期，以及已知的项目条件。",
    privacy: "提交即表示您同意瑞捷使用这些信息回复本次询盘。",
    privacyLabel: "隐私政策",
    submit: "提交询盘",
    submitting: "提交中…",
    error: "提交未成功，请检查网络后重试，或稍后与我们联系。",
  },
  id: {
    name: "Nama *",
    namePlaceholder: "Nama Anda",
    email: "E-mail *",
    emailPlaceholder: "nama@perusahaan.com",
    message: "Pesan *",
    messagePlaceholder: "Jelaskan kebutuhan, target keluaran atau jadwal, dan persyaratan proyek yang sudah diketahui.",
    privacy: "Dengan mengirimkan formulir ini, Anda menyetujui Realjet menggunakan informasi ini untuk menjawab pertanyaan Anda.",
    privacyLabel: "Kebijakan Privasi",
    submit: "Kirim Permintaan",
    submitting: "Mengirim…",
    error: "Pengiriman gagal. Periksa koneksi Anda dan coba lagi, atau hubungi kami nanti.",
  },
  vi: {
    name: "Họ và tên *",
    namePlaceholder: "Tên của bạn",
    email: "E-mail *",
    emailPlaceholder: "ten@congty.com",
    message: "Nội dung *",
    messagePlaceholder: "Cho chúng tôi biết nhu cầu, sản lượng hoặc tiến độ mục tiêu và các yêu cầu dự án đã xác định.",
    privacy: "Khi gửi biểu mẫu, bạn đồng ý để Realjet sử dụng thông tin này nhằm phản hồi yêu cầu của bạn.",
    privacyLabel: "Chính sách quyền riêng tư",
    submit: "Gửi yêu cầu",
    submitting: "Đang gửi…",
    error: "Không thể gửi biểu mẫu. Vui lòng kiểm tra kết nối rồi thử lại hoặc liên hệ với chúng tôi sau.",
  },
  ar: {
    name: "الاسم *",
    namePlaceholder: "اسمك",
    email: "البريد الإلكتروني *",
    emailPlaceholder: "name@company.com",
    message: "الرسالة *",
    messagePlaceholder: "اذكر احتياجاتك والطاقة الإنتاجية أو الجدول المستهدف وأي متطلبات معروفة للمشروع.",
    privacy: "بإرسال النموذج، فإنك توافق على استخدام Realjet لهذه المعلومات للرد على استفسارك.",
    privacyLabel: "سياسة الخصوصية",
    submit: "إرسال الاستفسار",
    submitting: "جارٍ الإرسال…",
    error: "تعذر الإرسال. تحقق من الاتصال وحاول مرة أخرى أو تواصل معنا لاحقًا.",
  },
  fr: {
    name: "Nom *",
    namePlaceholder: "Votre nom",
    email: "E-mail *",
    emailPlaceholder: "nom@entreprise.com",
    message: "Message *",
    messagePlaceholder: "Indiquez votre besoin, la capacité ou le calendrier visé et les exigences déjà connues du projet.",
    privacy: "En envoyant ce formulaire, vous acceptez que Realjet utilise ces informations pour répondre à votre demande.",
    privacyLabel: "Politique de confidentialité",
    submit: "Envoyer la demande",
    submitting: "Envoi…",
    error: "Échec de l’envoi. Vérifiez votre connexion et réessayez, ou contactez-nous ultérieurement.",
  },
  es: {
    name: "Nombre *",
    namePlaceholder: "Su nombre",
    email: "E-mail *",
    emailPlaceholder: "nombre@empresa.com",
    message: "Mensaje *",
    messagePlaceholder: "Indique qué necesita, la capacidad o el plazo objetivo y los requisitos conocidos del proyecto.",
    privacy: "Al enviar este formulario, acepta que Realjet utilice esta información para responder a su consulta.",
    privacyLabel: "Política de privacidad",
    submit: "Enviar consulta",
    submitting: "Enviando…",
    error: "No se pudo enviar. Compruebe su conexión e inténtelo de nuevo, o contáctenos más tarde.",
  },
  ru: {
    name: "Имя *",
    namePlaceholder: "Ваше имя",
    email: "E-mail *",
    emailPlaceholder: "name@company.com",
    message: "Сообщение *",
    messagePlaceholder: "Опишите задачу, требуемую производительность или сроки и известные требования проекта.",
    privacy: "Отправляя форму, вы соглашаетесь на использование Realjet этих данных для ответа на запрос.",
    privacyLabel: "Политика конфиденциальности",
    submit: "Отправить запрос",
    submitting: "Отправка…",
    error: "Не удалось отправить форму. Проверьте соединение и повторите попытку или свяжитесь с нами позже.",
  },
};

export default function UniversalEnquiryFields({ locale, submissionState, privacyHref = `../../privacy/${locale}/` }) {
  const copy = copyByLocale[locale] || copyByLocale.en;
  const disabled = submissionState === "submitting";

  return (
    <fieldset disabled={disabled} className="min-w-0 disabled:cursor-wait">
      <div className="grid grid-cols-2 gap-3.5 max-[720px]:grid-cols-1 max-[720px]:gap-2">
        <label htmlFor={`enquiry-name-${locale}`} className="block">
          <span className="mb-1.5 block text-[11px] font-[850] text-[#3e5668]">{copy.name}</span>
          <span className="relative block">
            <User size={15} className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted" />
            <input id={`enquiry-name-${locale}`} name="name" type="text" autoComplete="name" required placeholder={copy.namePlaceholder} className="focus-control w-full rounded-lg border border-[#ccd8df] bg-[#fbfcfd] py-2.5 pr-3 pl-9 text-sm text-ink disabled:cursor-wait disabled:bg-[#eef2f5] disabled:text-muted" />
          </span>
        </label>
        <label htmlFor={`enquiry-email-${locale}`} className="block">
          <span className="mb-1.5 block text-[11px] font-[850] text-[#3e5668]">{copy.email}</span>
          <span className="relative block">
            <Send size={15} className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted" />
            <input id={`enquiry-email-${locale}`} name="email" type="email" autoComplete="email" required placeholder={copy.emailPlaceholder} className="focus-control w-full rounded-lg border border-[#ccd8df] bg-[#fbfcfd] py-2.5 pr-3 pl-9 text-sm text-ink disabled:cursor-wait disabled:bg-[#eef2f5] disabled:text-muted" />
          </span>
        </label>
        <label htmlFor={`enquiry-message-${locale}`} className="col-span-2 block max-[720px]:col-span-1">
          <span className="mb-1.5 block text-[11px] font-[850] text-[#3e5668]">{copy.message}</span>
          <textarea id={`enquiry-message-${locale}`} name="message" rows="4" required placeholder={copy.messagePlaceholder} className="focus-control w-full resize-y rounded-lg border border-[#ccd8df] bg-[#fbfcfd] px-3 py-2.5 text-sm text-ink disabled:cursor-wait disabled:bg-[#eef2f5] disabled:text-muted" />
        </label>
      </div>
      <p className="mt-3 text-[11px] leading-[1.5] text-muted">
        {copy.privacy}{" "}
        <a href={privacyHref} target="_blank" rel="noopener noreferrer" className="font-[750] text-brand-blue underline decoration-brand-blue/30 underline-offset-2 hover:text-brand-navy">{copy.privacyLabel}</a>
      </p>
      {submissionState === "error" && <p role="alert" className="mt-4 text-[12px] text-red-600">{copy.error}</p>}
      <div className="mt-5 flex justify-end max-[720px]:mt-3">
        <button type="submit" className="inline-flex min-h-12 min-w-[92px] items-center justify-center gap-2 rounded-[9px] bg-[#d94824] px-5 text-[13px] font-[850] text-white shadow-[0_12px_28px_rgba(217,72,36,.26)] transition hover:bg-[#b93619] focus-visible:bg-[#b93619] disabled:cursor-wait disabled:opacity-75 max-[720px]:min-h-10 max-[720px]:w-full max-[720px]:text-xs">
          {disabled ? <><span className="h-4 w-4 animate-spin rounded-full border-2 border-white/35 border-t-white" aria-hidden="true" /> {copy.submitting}</> : <>{copy.submit} <Send size={15} /></>}
        </button>
      </div>
    </fieldset>
  );
}
