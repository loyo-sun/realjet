export const UNIVERSAL_ENQUIRY_FORM_NAME = "universal-enquiry";

export function createBeamFactoryEnquiryBody(form, { locale, title }) {
  const value = (name) => String(form.elements.namedItem(name)?.value || "").trim();
  const keyword = `Precast beam factory enquiry [${locale}]: ${title}`;

  return new URLSearchParams({
    "form-name": UNIVERSAL_ENQUIRY_FORM_NAME,
    keyword,
    subject: `Website enquiry: ${keyword}`,
    "bot-field": value("bot-field"),
    name: value("name"),
    email: value("email"),
    message: value("message"),
  }).toString();
}
