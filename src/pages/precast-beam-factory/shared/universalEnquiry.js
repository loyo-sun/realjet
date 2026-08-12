export const UNIVERSAL_ENQUIRY_FORM_NAME = "universal-enquiry";

export function createBeamFactoryEnquiryBody(form, { locale, title }) {
  const value = (name) => String(form.elements.namedItem(name)?.value || "").trim();
  const contactName = value("contact_name");
  const email = value("email");
  const company = value("company") || "Not provided";
  const country = value("country") || "Not provided";
  const projectDetails = value("project_details") || "Not provided";
  const keyword = `Precast beam factory enquiry [${locale}]: ${title}`;
  const message = [
    `Company: ${company}`,
    `Country / Region: ${country}`,
    `Project details: ${projectDetails}`,
    `Page locale: ${locale}`,
    `Source page: ${window.location.href}`,
    "Privacy acknowledgement: accepted",
  ].join("\n");

  return new URLSearchParams({
    "form-name": UNIVERSAL_ENQUIRY_FORM_NAME,
    keyword,
    subject: `Website enquiry: ${keyword}`,
    "bot-field": value("bot-field"),
    name: contactName,
    email,
    message,
  }).toString();
}
