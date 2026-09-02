import { Mail, MessageCircle, Send } from "lucide-react";
import { trackEvent } from "./analytics";

const actionClass = "grid h-[46px] w-[46px] place-items-center rounded-[10px] text-white no-underline transition hover:-translate-x-0.5 hover:bg-white/15 focus-visible:-translate-x-0.5 focus-visible:bg-white/15 max-[720px]:h-[42px] max-[720px]:w-[42px]";

export default function FloatingContactActions({ ariaLabel = "Contact Realjet", canonicalUrl, enquiryLabel = "Enquiry", enquiryTitle, messagingChannel = "whatsapp", messagingHref, messagingLabel = "WhatsApp", onEnquire, showEmail = true, subject }) {
  const whatsappText = encodeURIComponent(`Hello, I would like to discuss ${subject}.\n${canonicalUrl}\nChannel: website`);
  const emailSubject = encodeURIComponent(`${subject} enquiry`);
  const emailBody = encodeURIComponent(`Hello, I would like to discuss ${subject}.\n${canonicalUrl}\n\nChannel: website`);
  const enquiryAction = onEnquire ? (
    <button
      type="button"
      onClick={() => {
        trackEvent("floating_contact_click", { channel: "enquiry" });
        onEnquire(enquiryTitle);
      }}
      className={`${actionClass} border-0 bg-[#d94824] shadow-[0_8px_22px_rgba(217,72,36,.32)] hover:bg-[#b93619] focus-visible:bg-[#b93619]`}
      aria-label={enquiryLabel}
      title={enquiryLabel}
    >
      <Send size={22} aria-hidden="true" />
    </button>
  ) : (
    <a
      href={`/contact/?topic=${encodeURIComponent(subject)}`}
      onClick={() => trackEvent("floating_contact_click", { channel: "enquiry" })}
      className={`${actionClass} bg-[#d94824] shadow-[0_8px_22px_rgba(217,72,36,.32)] hover:bg-[#b93619] focus-visible:bg-[#b93619]`}
      aria-label={enquiryLabel}
      title={enquiryLabel}
    >
      <Send size={22} aria-hidden="true" />
    </a>
  );

  return (
    <nav className="fixed top-1/2 right-[18px] z-40 grid -translate-y-1/2 gap-2 rounded-[14px] border border-white/15 bg-[#051a2c]/90 p-2 shadow-[0_18px_46px_rgba(5,26,44,.28)] backdrop-blur-xl max-[720px]:right-[10px] max-[720px]:gap-1.5 max-[720px]:p-1.5" aria-label={ariaLabel}>
      {enquiryAction}
      <a href={messagingHref || `https://wa.me/8619310090600?text=${whatsappText}`} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent("floating_contact_click", { channel: messagingChannel })} className={`${actionClass} bg-white/8`} aria-label={messagingLabel} title={messagingLabel}>
        <MessageCircle size={22} aria-hidden="true" />
      </a>
      {showEmail && (
        <a href={`mailto:sales@realjetech.com?subject=${emailSubject}&body=${emailBody}`} onClick={() => trackEvent("floating_contact_click", { channel: "email" })} className={`${actionClass} bg-white/8`} aria-label="E-mail" title="E-mail">
          <Mail size={22} aria-hidden="true" />
        </a>
      )}
    </nav>
  );
}
