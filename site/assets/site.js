const CONSENT_KEY = "realjet_analytics_consent_v1";

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
  panel.setAttribute("aria-labelledby", "analytics-consent-title");
  panel.innerHTML = `
    <div>
      <strong id="analytics-consent-title">Analytics preferences</strong>
      <p>We use Google Analytics to understand how this website is used and improve project enquiries. Form contents are never sent to analytics. <a href="/marketing/privacy/en/">Privacy Policy</a></p>
    </div>
    <div class="analytics-consent-actions">
      <button type="button" data-consent="denied">Reject</button>
      <button type="button" class="consent-accept" data-consent="granted">Accept analytics</button>
    </div>`;
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

  if (event.target.closest("[data-product-inquiry-link]")) {
    trackEvent("product_inquiry_click", {
      product_slug: document.body.dataset.productSlug,
      cta_id: "product_detail_enquire",
    });
  }

  if (event.target.closest("[data-product-inquiry-submit]")) {
    trackEvent("product_inquiry_submit_click", {
      form_id: "product-inquiry",
      product_slug: document.body.dataset.productSlug,
      cta_id: "product_inquiry_form",
    });
  }
});

if (document.body.dataset.pageType === "home") trackEvent("home_page_view");
if (document.body.dataset.pageType === "insight") {
  trackEvent("insight_view", { article_slug: document.body.dataset.articleSlug });
}
if (document.body.dataset.pageType === "product") {
  trackEvent("product_view", { product_slug: document.body.dataset.productSlug });
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

const floatingEnquiry = document.querySelector("[data-floating-enquiry]");
if (floatingEnquiry) {
  const toggle = floatingEnquiry.querySelector("[data-floating-enquiry-toggle]");
  const content = floatingEnquiry.querySelector("[data-floating-enquiry-content]");
  const storageKey = `realjet_quick_enquiry_minimized_${document.body.dataset.articleSlug || "insight"}`;
  let revealed = false;

  const setMinimized = (minimized, remember = true) => {
    floatingEnquiry.classList.toggle("is-minimized", minimized);
    content.setAttribute("aria-hidden", String(minimized));
    content.inert = minimized;
    toggle.setAttribute("aria-expanded", String(!minimized));
    toggle.setAttribute("aria-label", minimized ? "Expand quick enquiry" : "Minimize quick enquiry");
    toggle.textContent = minimized ? "+" : "−";
    if (remember) {
      try {
        sessionStorage.setItem(storageKey, minimized ? "true" : "false");
      } catch {
        // The control still works when session storage is unavailable.
      }
    }
  };

  try {
    setMinimized(sessionStorage.getItem(storageKey) === "true", false);
  } catch {
    setMinimized(false, false);
  }

  const revealAfterFirstScreen = () => {
    if (revealed || window.scrollY < window.innerHeight * 0.9) return;
    revealed = true;
    floatingEnquiry.hidden = false;
    requestAnimationFrame(() => floatingEnquiry.classList.add("is-visible"));
    window.removeEventListener("scroll", revealAfterFirstScreen);
    trackEvent("quick_enquiry_reveal", { article_slug: document.body.dataset.articleSlug });
  };

  toggle.addEventListener("click", () => {
    const minimized = !floatingEnquiry.classList.contains("is-minimized");
    setMinimized(minimized);
    trackEvent("quick_enquiry_toggle", {
      article_slug: document.body.dataset.articleSlug,
      state: minimized ? "minimized" : "expanded",
    });
  });

  window.addEventListener("scroll", revealAfterFirstScreen, { passive: true });
  revealAfterFirstScreen();
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
    trackEvent("lead_form_submit_attempt", {
      form_id: formId,
      cta_id: "contact_page_form",
      ...progress(),
    });
    fieldset.disabled = true;
    contactForm.setAttribute("aria-busy", "true");
    submitButton.textContent = "Submitting…";

    try {
      const body = new URLSearchParams(new FormData(contactForm)).toString();
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

const productInquiryForm = document.querySelector("[data-product-inquiry-form]");
if (productInquiryForm) {
  const formShell = document.querySelector("[data-product-inquiry-shell]");
  const successPanel = document.querySelector("[data-product-inquiry-success]");
  const errorMessage = document.querySelector("[data-product-inquiry-error]");
  const submitButton = productInquiryForm.querySelector("[data-product-inquiry-submit]");
  const fieldset = productInquiryForm.querySelector("fieldset");
  const messageField = productInquiryForm.querySelector("[data-inquiry-message]");
  const count = document.querySelector("[data-inquiry-count]");
  const productSlug = document.body.dataset.productSlug;
  let started = false;
  let submitted = false;
  let succeeded = false;

  const start = () => {
    if (started) return;
    started = true;
    trackEvent("product_inquiry_start", {
      form_id: "product-inquiry",
      product_slug: productSlug,
      cta_id: "product_inquiry_form",
    });
  };

  messageField.addEventListener("input", () => {
    count.textContent = String(messageField.value.length);
    start();
  });
  productInquiryForm.addEventListener("focusin", start);
  productInquiryForm.addEventListener(
    "invalid",
    (event) => {
      start();
      trackEvent("product_inquiry_validation_error", {
        form_id: "product-inquiry",
        product_slug: productSlug,
        field_name: event.target.name,
      });
    },
    true,
  );

  productInquiryForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    start();
    submitted = true;
    errorMessage.hidden = true;
    fieldset.disabled = true;
    productInquiryForm.setAttribute("aria-busy", "true");
    submitButton.textContent = "Sending…";
    trackEvent("product_inquiry_submit_attempt", {
      form_id: "product-inquiry",
      product_slug: productSlug,
      cta_id: "product_inquiry_form",
    });

    try {
      const body = new URLSearchParams(new FormData(productInquiryForm)).toString();
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
      });
      if (!response.ok) throw new Error("Submission failed");
      succeeded = true;
      trackEvent("generate_lead", {
        form_id: "product-inquiry",
        lead_source: "product_inquiry",
        product_slug: productSlug,
        cta_id: "product_inquiry_form",
      });
      trackEvent("product_inquiry_success", {
        form_id: "product-inquiry",
        product_slug: productSlug,
        cta_id: "product_inquiry_form",
      });
      productInquiryForm.reset();
      formShell.hidden = true;
      successPanel.hidden = false;
      successPanel.focus();
    } catch {
      submitted = false;
      errorMessage.hidden = false;
      fieldset.disabled = false;
      productInquiryForm.removeAttribute("aria-busy");
      submitButton.innerHTML = 'Send Enquiry <span aria-hidden="true">→</span>';
      trackEvent("product_inquiry_submit_error", {
        form_id: "product-inquiry",
        product_slug: productSlug,
        cta_id: "product_inquiry_form",
        error_type: "submission_failed",
      });
    }
  });

  window.addEventListener("pagehide", () => {
    if (!started || succeeded) return;
    trackEvent("product_inquiry_abandon", {
      form_id: "product-inquiry",
      product_slug: productSlug,
      submitted: submitted ? "yes" : "no",
    });
  });

  trackEvent("product_inquiry_view", { product_slug: productSlug });
}
