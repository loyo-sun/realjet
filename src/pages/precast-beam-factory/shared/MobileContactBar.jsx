import { Mail, MessageCircle, Send } from "lucide-react";
import { trackEvent } from "./analytics";

const actionClass = "flex min-w-0 items-center justify-center gap-1.5 rounded-lg px-2 py-3 text-[11px] font-[850] no-underline transition hover:bg-white/10 focus-visible:bg-white/10";

export default function MobileContactBar({
  canonicalUrl,
  emailLabel = "Email",
  enquireLabel,
  enquiryTitle,
  hidden = false,
  onEnquire,
  subject,
  whatsappLabel = "WhatsApp",
}) {
  const whatsappText = encodeURIComponent(`Hello, I would like to enquire about ${subject}.\n${canonicalUrl}\nChannel: website`);
  const emailSubject = encodeURIComponent(`${subject} enquiry`);
  const emailBody = encodeURIComponent(`Hello, I would like to enquire about ${subject}.\n${canonicalUrl}\n\nChannel: website`);
  const visibilityClass = hidden
    ? "max-[720px]:pointer-events-none max-[720px]:translate-y-full max-[720px]:opacity-0"
    : "max-[720px]:translate-y-0 max-[720px]:opacity-100";

  return (
    <nav
      className={`beam-mobile-contact-bar fixed inset-x-0 bottom-0 z-40 hidden grid-cols-3 gap-px border-t border-white/15 bg-brand-navy/95 px-2 pt-2 pb-[calc(8px+env(safe-area-inset-bottom))] text-white shadow-floating backdrop-blur-xl transition duration-200 max-[720px]:grid ${visibilityClass}`}
      aria-label="Contact options"
      aria-hidden={hidden}
    >
      <button
        type="button"
        onClick={() => {
          trackEvent("mobile_contact_click", { channel: "enquiry" });
          onEnquire(enquiryTitle);
        }}
        tabIndex={hidden ? -1 : 0}
        className={`${actionClass} border-0 bg-brand-cyan text-brand-navy`}
      >
        <Send size={18} aria-hidden="true" />
        <span className="truncate">{enquireLabel}</span>
      </button>
      <a
        href={`https://wa.me/8619310090600?text=${whatsappText}`}
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={hidden ? -1 : 0}
        className={`${actionClass} bg-white/8`}
      >
        <MessageCircle size={18} aria-hidden="true" />
        <span className="truncate">{whatsappLabel}</span>
      </a>
      <a
        href={`mailto:sales@realjetech.com?subject=${emailSubject}&body=${emailBody}`}
        tabIndex={hidden ? -1 : 0}
        className={`${actionClass} bg-white/8`}
      >
        <Mail size={18} aria-hidden="true" />
        <span className="truncate">{emailLabel}</span>
      </a>
    </nav>
  );
}
