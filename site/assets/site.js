const CONSENT_KEY = "realjet_analytics_consent_v1";

const randomHero = document.querySelector("[data-random-hero]");
if (randomHero) {
  const heroSources = randomHero.dataset.heroSources?.split("|").filter(Boolean) || [];
  if (heroSources.length > 1) {
    randomHero.src = heroSources[Math.floor(Math.random() * heroSources.length)];
  }
}

function sendGtag(...args) {
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function gtagQueue() {
    window.dataLayer.push(arguments);
  };
  window.gtag(...args);
}

function trackEvent(name, parameters = {}) {
  sendGtag("event", name, {
    page_path: window.location.pathname,
    page_type: document.body.dataset.pageType || "page",
    ...parameters,
  });
}

function readConsent() {
  try {
    const value = localStorage.getItem(CONSENT_KEY);
    return value === "granted" || value === "denied" ? value : null;
  } catch {
    return null;
  }
}

function updateConsent(value, trackChoice = false) {
  sendGtag("consent", "update", {
    analytics_storage: value,
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
  try {
    localStorage.setItem(CONSENT_KEY, value);
  } catch {
    // Consent still applies to the current page if storage is unavailable.
  }
  if (trackChoice && value === "granted") {
    trackEvent("analytics_consent_granted", { consent_source: "site_banner" });
  }
}

function showConsentPanel() {
  document.querySelector(".analytics-consent-panel")?.remove();
  const panel = document.createElement("section");
  panel.className = "analytics-consent-panel";
  panel.setAttribute("role", "dialog");
  panel.setAttribute("aria-modal", "false");
  panel.setAttribute("aria-label", "Analytics preferences");
  panel.innerHTML = `
    <div class="analytics-consent-copy">
      <p>We use cookies for anonymous site analytics to improve your experience. For more information, please read our <a href="/marketing/privacy/en/">privacy policy</a>.</p>
    </div>
    <div class="analytics-consent-actions">
      <a href="/marketing/privacy/en/#cookies">Privacy settings</a>
      <button type="button" class="consent-accept" data-consent="granted">Accept all</button>
    </div>
    <button type="button" class="analytics-consent-close" data-consent="denied" aria-label="Close analytics preferences">×</button>`;
  panel.addEventListener("click", (event) => {
    const value = event.target.closest("button")?.dataset.consent;
    if (!value) return;
    updateConsent(value, true);
    panel.remove();
  });
  document.body.appendChild(panel);
}

const consent = readConsent();
if (consent) updateConsent(consent);
else showConsentPanel();

document.querySelector("[data-open-analytics]")?.addEventListener("click", showConsentPanel);

const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".site-navigation");
menuToggle?.addEventListener("click", () => {
  const expanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!expanded));
  navigation?.classList.toggle("is-open", !expanded);
});

document.addEventListener("click", (event) => {
  const businessEntry = event.target.closest("[data-business-entry]");
  if (businessEntry) {
    trackEvent("business_entry_click", {
      business_type: businessEntry.dataset.businessType,
      cta_id: businessEntry.dataset.ctaId,
    });
  }

  const insightCard = event.target.closest("[data-insight-card]");
  if (insightCard) {
    trackEvent("insight_card_click", {
      article_slug: insightCard.dataset.articleSlug,
      card_position: Number(insightCard.dataset.cardPosition),
    });
  }

  const insightCta = event.target.closest("[data-insight-cta]");
  if (insightCta) {
    trackEvent("insight_cta_click", {
      article_slug: document.body.dataset.articleSlug,
      cta_type: insightCta.dataset.ctaType,
    });
    if (
      insightCta.getAttribute("href")?.startsWith("mailto:") ||
      insightCta.getAttribute("href")?.startsWith("/contact/")
    ) {
      trackEvent("article_inquiry_click", {
        article_slug: document.body.dataset.articleSlug,
        cta_type: insightCta.dataset.ctaType,
      });
    }
  }

  if (event.target.closest("[data-manufacturing-inquiry]")) {
    trackEvent("manufacturing_inquiry_click", {
      cta_id: "manufacturing_coming_soon",
    });
  }

  if (event.target.closest("[data-contact-submit]")) {
    const form = event.target.closest("form");
    trackEvent("lead_form_submit_click", {
      form_id: form?.name || "precast-beam-factory-inquiry",
      cta_id: "contact_page_form",
    });
  }

  const mouldCategory = event.target.closest("[data-mould-category]");
  if (mouldCategory) {
    trackEvent("mould_category_click", {
      category_slug: mouldCategory.dataset.mouldCategory,
    });
  }

  const mouldCta = event.target.closest("[data-mould-cta]");
  if (mouldCta) {
    trackEvent("mould_cta_click", { cta_id: mouldCta.dataset.mouldCta });
  }

  const mouldProduct = event.target.closest("[data-mould-product]");
  if (mouldProduct) {
    trackEvent("mould_product_click", {
      product_slug: mouldProduct.dataset.mouldProduct,
    });
  }

  const enquiryTrigger = event.target.closest("[data-universal-enquiry]");
  if (enquiryTrigger) {
    event.preventDefault();
    openUniversalEnquiry(enquiryTrigger);
  }
});

if (document.body.dataset.pageType === "home") trackEvent("home_page_view");
if (document.body.dataset.pageType === "insight") {
  trackEvent("insight_view", { article_slug: document.body.dataset.articleSlug });
}
if (document.body.dataset.pageType === "product") {
  trackEvent("product_view", { product_slug: document.body.dataset.productSlug });
}
if (document.body.dataset.pageType === "precast-moulds") {
  trackEvent("precast_moulds_page_view");
}
if (document.body.dataset.pageType === "precast-mould-category") {
  trackEvent("precast_mould_category_view");
}

const productGallery = document.querySelector("[data-product-gallery]");
if (productGallery) {
  const mainImage = productGallery.querySelector("[data-product-gallery-main]");
  const thumbnails = Array.from(
    productGallery.querySelectorAll("[data-product-gallery-thumb]"),
  );
  for (const thumbnail of thumbnails) {
    thumbnail.addEventListener("click", () => {
      mainImage.src = thumbnail.dataset.gallerySrc;
      mainImage.alt = thumbnail.dataset.galleryAlt;
      for (const item of thumbnails) {
        const active = item === thumbnail;
        item.classList.toggle("is-active", active);
        item.setAttribute("aria-pressed", String(active));
      }
      trackEvent("product_gallery_image_click", {
        product_slug: document.body.dataset.productSlug,
        image_position: Number(thumbnail.dataset.galleryPosition),
      });
    });
  }
}

const contactForm = document.querySelector("[data-contact-form]");
if (contactForm) {
  const formId = contactForm.getAttribute("name");
  const formShell = document.querySelector("[data-contact-form-shell]");
  const successPanel = document.querySelector("[data-contact-success]");
  const errorMessage = document.querySelector("[data-contact-error]");
  const fieldset = contactForm.querySelector("fieldset");
  const submitButton = contactForm.querySelector("[data-contact-submit]");
  const completedFields = new Set();
  let started = false;
  let submitted = false;
  let succeeded = false;

  const fields = Array.from(contactForm.elements).filter(
    (field) =>
      field.name &&
      !["hidden", "submit", "button"].includes(field.type) &&
      field.name !== "bot-field",
  );
  const complete = (field) =>
    ["checkbox", "radio"].includes(field.type)
      ? field.checked
      : Boolean(String(field.value || "").trim());
  const progress = () => {
    const required = fields.filter((field) => field.required);
    return {
      field_count: fields.length,
      completed_fields: fields.filter(complete).length,
      required_field_count: required.length,
      required_fields_completed: required.filter(complete).length,
      progress_percent: fields.length
        ? Math.round((completedFields.size / fields.length) * 100)
        : 0,
    };
  };
  const start = () => {
    if (started) return;
    started = true;
    trackEvent("lead_form_start", {
      form_id: formId,
      cta_id: "contact_page_form",
    });
  };

  const topic = new URLSearchParams(window.location.search).get("topic");
  const topicValues = {
    manufacturing: "Custom Machinery Component Manufacturing",
    "precast-line": "Precast Concrete Component Production Line",
    "precast-moulds": "Precast Concrete Moulds and Formwork",
  };
  const topicField = contactForm.elements.namedItem("inquiry_topic");
  if (topicValues[topic] && topicField) topicField.value = topicValues[topic];

  contactForm.addEventListener("focusin", (event) => {
    if (fields.includes(event.target)) start();
  });
  const recordCompletion = (event) => {
    const field = event.target;
    if (!fields.includes(field) || !complete(field) || completedFields.has(field.name)) return;
    start();
    completedFields.add(field.name);
    trackEvent("lead_form_field_complete", {
      form_id: formId,
      cta_id: "contact_page_form",
      field_name: field.name,
      field_order: fields.indexOf(field) + 1,
      is_required: field.required ? "yes" : "no",
      ...progress(),
    });
  };
  contactForm.addEventListener("change", recordCompletion);
  contactForm.addEventListener("focusout", recordCompletion);
  contactForm.addEventListener(
    "invalid",
    (event) => {
      start();
      trackEvent("lead_form_validation_error", {
        form_id: formId,
        cta_id: "contact_page_form",
        field_name: event.target.name,
      });
    },
    true,
  );

  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    start();
    submitted = true;
    errorMessage.hidden = true;
    const company = contactForm.elements.namedItem("company").value.trim();
    const country = contactForm.elements.namedItem("country").value.trim() || "Country not provided";
    const contactName = contactForm.elements.namedItem("contact_name").value.trim();
    const selectedTopic = topicField.value;
    const submissionTitle = `[${selectedTopic}] ${company} - ${country} - ${contactName}`;
    contactForm.elements.namedItem("title").value = submissionTitle;
    contactForm.elements.namedItem("subject").value = submissionTitle;
    // Capture successful controls before disabling the fieldset. Disabled
    // controls are intentionally omitted by the FormData constructor.
    const body = new URLSearchParams(new FormData(contactForm)).toString();
    trackEvent("lead_form_submit_attempt", {
      form_id: formId,
      cta_id: "contact_page_form",
      ...progress(),
    });
    fieldset.disabled = true;
    contactForm.setAttribute("aria-busy", "true");
    submitButton.textContent = "Submitting…";

    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
      });
      if (!response.ok) throw new Error("Submission failed");
      succeeded = true;
      trackEvent("generate_lead", {
        form_id: formId,
        lead_source: "website_form",
        cta_id: "contact_page_form",
        inquiry_topic: selectedTopic,
        ...progress(),
      });
      contactForm.reset();
      formShell.hidden = true;
      successPanel.hidden = false;
      successPanel.focus();
    } catch {
      submitted = false;
      errorMessage.hidden = false;
      fieldset.disabled = false;
      contactForm.removeAttribute("aria-busy");
      submitButton.innerHTML = 'Submit Project Details <span aria-hidden="true">→</span>';
      trackEvent("lead_form_submit_error", {
        form_id: formId,
        cta_id: "contact_page_form",
        error_type: "submission_failed",
        ...progress(),
      });
    }
  });

  window.addEventListener("pagehide", () => {
    if (!started || succeeded) return;
    trackEvent("lead_form_abandon", {
      form_id: formId,
      cta_id: "contact_page_form",
      submitted: submitted ? "yes" : "no",
      ...progress(),
    });
  });

  trackEvent("contact_page_view");
}

const universalEnquiryModal = document.querySelector("[data-universal-enquiry-modal]");
const universalEnquiryDialog = document.querySelector("[data-universal-enquiry-dialog]");
const universalEnquiryForm = document.querySelector("[data-universal-enquiry-form]");
const universalEnquiryFormShell = document.querySelector("[data-universal-enquiry-form-shell]");
const universalEnquirySuccess = document.querySelector("[data-universal-enquiry-success]");
const universalEnquiryError = document.querySelector("[data-universal-enquiry-error]");
const universalEnquirySubmit = document.querySelector("[data-universal-enquiry-submit]");
const universalEnquiryFieldset = universalEnquiryForm?.querySelector("fieldset");
const universalKeywordField = document.querySelector("[data-universal-enquiry-keyword]");
const universalKeywordLabel = document.querySelector("[data-universal-enquiry-keyword-label]");
const universalSubjectField = document.querySelector("[data-universal-enquiry-subject]");
let universalEnquiryOpener = null;
let universalEnquiryStarted = false;
let universalEnquirySubmitted = false;
let universalEnquirySucceeded = false;

function universalEnquiryParameters() {
  return {
    form_id: "universal-enquiry",
    keyword: universalKeywordField?.value || "General enquiry",
    product_slug: document.body.dataset.productSlug || undefined,
  };
}

function openUniversalEnquiry(trigger) {
  if (!universalEnquiryModal || !universalEnquiryForm) return;
  universalEnquiryOpener = trigger;
  universalEnquiryStarted = false;
  universalEnquirySubmitted = false;
  universalEnquirySucceeded = false;
  universalEnquiryForm.reset();
  universalEnquiryFieldset.disabled = false;
  universalEnquiryForm.removeAttribute("aria-busy");
  universalEnquiryError.hidden = true;
  universalEnquiryFormShell.hidden = false;
  universalEnquirySuccess.hidden = true;
  universalEnquirySubmit.innerHTML = 'Send Enquiry <span aria-hidden="true">→</span>';
  const keyword = trigger.dataset.enquiryKeyword || "General enquiry";
  universalKeywordField.value = keyword;
  universalKeywordLabel.textContent = keyword;
  universalSubjectField.value = `Website enquiry: ${keyword}`;
  universalEnquiryModal.hidden = false;
  document.body.classList.add("has-enquiry-modal");
  universalEnquiryDialog.focus();
  trackEvent("universal_enquiry_open", universalEnquiryParameters());
}

function closeUniversalEnquiry() {
  if (!universalEnquiryModal || universalEnquiryModal.hidden) return;
  universalEnquiryModal.hidden = true;
  document.body.classList.remove("has-enquiry-modal");
  universalEnquiryOpener?.focus();
}

for (const closeButton of document.querySelectorAll("[data-universal-enquiry-close]")) {
  closeButton.addEventListener("click", closeUniversalEnquiry);
}
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && universalEnquiryModal && !universalEnquiryModal.hidden) {
    closeUniversalEnquiry();
  }
});

if (universalEnquiryForm) {
  const startUniversalEnquiry = () => {
    if (universalEnquiryStarted) return;
    universalEnquiryStarted = true;
    trackEvent("lead_form_start", universalEnquiryParameters());
  };
  universalEnquiryForm.addEventListener("focusin", startUniversalEnquiry);
  universalEnquiryForm.addEventListener(
    "invalid",
    (event) => {
      startUniversalEnquiry();
      trackEvent("lead_form_validation_error", {
        ...universalEnquiryParameters(),
        field_name: event.target.name,
      });
    },
    true,
  );
  universalEnquiryForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    startUniversalEnquiry();
    universalEnquirySubmitted = true;
    universalEnquiryError.hidden = true;
    // Capture the enquiry fields before disabling them so Netlify receives
    // the visitor's name, email address and message.
    const body = new URLSearchParams(new FormData(universalEnquiryForm)).toString();
    universalEnquiryFieldset.disabled = true;
    universalEnquiryForm.setAttribute("aria-busy", "true");
    universalEnquirySubmit.textContent = "Sending…";
    trackEvent("lead_form_submit_attempt", universalEnquiryParameters());
    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
      });
      if (!response.ok) throw new Error("Submission failed");
      universalEnquirySucceeded = true;
      trackEvent("generate_lead", {
        ...universalEnquiryParameters(),
        lead_source: "universal_enquiry_modal",
      });
      universalEnquiryFormShell.hidden = true;
      universalEnquirySuccess.hidden = false;
      universalEnquirySuccess.focus();
    } catch {
      universalEnquirySubmitted = false;
      universalEnquiryError.hidden = false;
      universalEnquiryFieldset.disabled = false;
      universalEnquiryForm.removeAttribute("aria-busy");
      universalEnquirySubmit.innerHTML = 'Send Enquiry <span aria-hidden="true">→</span>';
      trackEvent("lead_form_submit_error", {
        ...universalEnquiryParameters(),
        error_type: "submission_failed",
      });
    }
  });
  window.addEventListener("pagehide", () => {
    if (!universalEnquiryStarted || universalEnquirySucceeded) return;
    trackEvent("lead_form_abandon", {
      ...universalEnquiryParameters(),
      submitted: universalEnquirySubmitted ? "yes" : "no",
    });
  });
}
