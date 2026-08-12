export const UNIVERSAL_ENQUIRY_FORM_NAME = "universal-enquiry";

export function createUniversalEnquiryBody(form, keyword) {
  const value = (name) => String(form.elements.namedItem(name)?.value || "").trim();

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

export function createBeamFactoryEnquiryBody(form, { locale, title }) {
  const keyword = `Precast beam factory enquiry [${locale}]: ${title}`;
  return createUniversalEnquiryBody(form, keyword);
}
