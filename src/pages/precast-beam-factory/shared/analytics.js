const DEFAULT_FORM_NAME = "universal-enquiry";
const CONSENT_KEY = "realjet_consent_v2";
const LEGACY_CONSENT_KEY = "realjet_analytics_consent_v1";
const DEFAULT_PAGE_TYPE = "precast_production_line";

const CONSENT_CHOICES = {
  all: { analytics_storage: "granted", ad_storage: "granted", ad_user_data: "granted", ad_personalization: "granted" },
  analytics: { analytics_storage: "granted", ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied" },
  advertising: { analytics_storage: "denied", ad_storage: "granted", ad_user_data: "granted", ad_personalization: "granted" },
  denied: { analytics_storage: "denied", ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied" },
};

const consentCopy = {
  en: {
    title: "Cookie preferences",
    body: "We use optional cookies for site analytics and advertising measurement. Select Accept all, or use Privacy settings to manage analytics and advertising separately. Close this notice to reject optional cookies.",
    accept: "Accept all",
    settings: "Privacy settings",
    close: "Close cookie preferences",
  },
  id: {
    title: "Preferensi cookie",
    body: "Kami menggunakan cookie opsional untuk analitik situs dan pengukuran iklan. Pilih Terima semua, atau gunakan Pengaturan privasi untuk mengelola analitik dan iklan secara terpisah. Tutup pemberitahuan ini untuk menolak cookie opsional.",
    accept: "Terima semua",
    settings: "Pengaturan privasi",
    close: "Tutup preferensi cookie",
  },
  ar: {
    title: "تفضيلات ملفات تعريف الارتباط",
    body: "نستخدم ملفات تعريف ارتباط اختيارية لتحليل الموقع وقياس الإعلانات. اختر قبول الكل، أو استخدم إعدادات الخصوصية لإدارة التحليلات والإعلانات بشكل منفصل. أغلق هذا الإشعار لرفض ملفات الارتباط الاختيارية.",
    accept: "قبول الكل",
    settings: "إعدادات الخصوصية",
    close: "إغلاق تفضيلات ملفات تعريف الارتباط",
  },
  ru: {
    title: "Настройки cookie",
    body: "Мы используем необязательные cookie для аналитики сайта и измерения рекламы. Выберите «Принять все» или используйте настройки конфиденциальности, чтобы раздельно управлять аналитикой и рекламой. Закройте это уведомление, чтобы отклонить необязательные cookie.",
    accept: "Принять все",
    settings: "Настройки конфиденциальности",
    close: "Закрыть настройки cookie",
  },
  cn: {
    title: "Cookie 偏好设置",
    body: "我们使用可选 Cookie 进行网站分析和广告效果衡量。您可选择“全部接受”，或进入“隐私设置”分别管理分析统计和广告。关闭此提示即拒绝可选 Cookie。",
    accept: "全部接受",
    settings: "隐私设置",
    close: "关闭 Cookie 偏好设置",
  },
  fr: {
    title: "Préférences de cookies",
    body: "Nous utilisons des cookies facultatifs pour l’analyse du site et la mesure publicitaire. Sélectionnez « Tout accepter » ou utilisez les paramètres de confidentialité pour gérer séparément l’analyse et la publicité. Fermez cet avis pour refuser les cookies facultatifs.",
    accept: "Tout accepter",
    settings: "Paramètres de confidentialité",
    close: "Fermer les préférences de cookies",
  },
  es: {
    title: "Preferencias de cookies",
    body: "Utilizamos cookies opcionales para la analítica del sitio y la medición publicitaria. Seleccione «Aceptar todo» o use los ajustes de privacidad para gestionar por separado la analítica y la publicidad. Cierre este aviso para rechazar las cookies opcionales.",
    accept: "Aceptar todo",
    settings: "Ajustes de privacidad",
    close: "Cerrar las preferencias de cookies",
  },
};

const runtime = {
  locale: "en",
  formName: DEFAULT_FORM_NAME,
  pageType: DEFAULT_PAGE_TYPE,
  initialized: false,
  contactTrackingInitialized: false,
  currentCta: "unknown",
  forms: new Map(),
  observer: null,
};

function gtag(...args) {
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function gtagQueue() {
    window.dataLayer.push(arguments);
  };
  window.gtag(...args);
}

function commonParameters() {
  return {
    page_locale: runtime.locale,
    page_type: runtime.pageType,
    page_path: window.location.pathname,
  };
}

export function trackEvent(name, parameters = {}) {
  const payload = { ...commonParameters(), ...parameters };
  if (import.meta.env.DEV) console.info("[Realjet analytics]", name, payload);
  gtag("event", name, payload);
}

function contactMethod(target) {
  const link = target.closest?.("a");
  if (!link) return null;
  if (link.id === "contact-email") return "email";
  const href = link.getAttribute("href") || "";
  if (/^mailto:/i.test(href)) return "email";
  if (/^https?:\/\/(?:api\.)?whatsapp\.com\//i.test(href) || /^https?:\/\/wa\.me\//i.test(href)) return "whatsapp";
  return null;
}

function onContactClick(event) {
  const link = event.target.closest?.("a");
  const method = contactMethod(event.target);
  if (!link || !method) return;
  trackEvent(method === "whatsapp" ? "contact_whatsapp" : "contact_email", {
    cta_id: link.dataset.ctaId || link.id || undefined,
    cta_position: link.closest(".beam-mobile-contact-bar") ? "mobile_bar" : undefined,
  });
}

function initContactTracking() {
  if (runtime.contactTrackingInitialized) return;
  runtime.contactTrackingInitialized = true;
  document.addEventListener("click", onContactClick, true);
}

function visibleFormFields(form) {
  return Array.from(form.elements).filter((field) => {
    if (!field.name || field.disabled) return false;
    if (["hidden", "submit", "button"].includes(field.type)) return false;
    return !["bot-field", "title", "subject", "form-name", "inquiry_topic"].includes(field.name);
  });
}

function formIdentifier(form) {
  return form?.getAttribute("name") || "";
}

function isComplete(field) {
  if (["checkbox", "radio"].includes(field.type)) return field.checked;
  return Boolean(String(field.value || "").trim());
}

function formProgress(form, state) {
  const fields = visibleFormFields(form);
  const required = fields.filter((field) => field.required);
  return {
    field_count: fields.length,
    completed_fields: fields.filter(isComplete).length,
    required_fields_completed: required.filter(isComplete).length,
    required_field_count: required.length,
    progress_percent: fields.length ? Math.round((state.completed.size / fields.length) * 100) : 0,
  };
}

function getFormState(form) {
  if (!runtime.forms.has(form)) {
    runtime.forms.set(form, {
      started: false,
      completed: new Set(),
      invalid: new Set(),
      submitClicked: false,
      submitted: false,
      success: false,
      lastField: "none",
    });
  }
  return runtime.forms.get(form);
}

function trackedField(target) {
  const form = target?.form;
  if (!form || formIdentifier(form) !== runtime.formName) return null;
  return visibleFormFields(form).includes(target) ? target : null;
}

function startForm(form, state) {
  if (state.started) return;
  state.started = true;
  trackEvent("lead_form_start", {
    form_id: runtime.formName,
    cta_id: runtime.currentCta,
  });
}

function classifyCta(button) {
  if (!button) return null;
  if (button.closest('[role="dialog"]')) return null;
  if (button.hasAttribute("aria-label") || button.hasAttribute("aria-expanded")) return null;
  if (button.dataset.ctaId) return button.dataset.ctaId;
  if (button.classList.contains("fixed")) return "mobile_sticky";
  if (button.closest("header")) return "header";
  const section = button.closest("section");
  const ids = {
    top: "hero",
    method: "workflow",
    lines: "production_lines",
    products: "equipment",
    projects: "projects",
    capabilities: "capabilities",
    "final-cta": "final_cta",
  };
  return ids[section?.id] || null;
}

function onClick(event) {
  const button = event.target.closest?.("button");
  if (!button) return;

  const form = button.form;
  if (formIdentifier(form) === runtime.formName && button.type === "submit") {
    const state = getFormState(form);
    startForm(form, state);
    state.submitClicked = true;
    trackEvent("lead_form_submit_click", {
      form_id: runtime.formName,
      cta_id: runtime.currentCta,
      ...formProgress(form, state),
    });
    return;
  }

  const ctaId = classifyCta(button);
  if (!ctaId) return;
  runtime.currentCta = ctaId;
  trackEvent("cta_click", { cta_id: ctaId });
}

function onFocus(event) {
  const field = trackedField(event.target);
  if (!field) return;
  const state = getFormState(field.form);
  state.lastField = field.name;
  startForm(field.form, state);
}

function onChange(event) {
  const field = trackedField(event.target);
  if (!field || !isComplete(field)) return;
  const form = field.form;
  const state = getFormState(form);
  startForm(form, state);
  state.lastField = field.name;
  if (state.completed.has(field.name)) return;
  state.completed.add(field.name);
  const fields = visibleFormFields(form);
  trackEvent("lead_form_field_complete", {
    form_id: runtime.formName,
    cta_id: runtime.currentCta,
    field_name: field.name,
    field_order: fields.indexOf(field) + 1,
    is_required: field.required ? "yes" : "no",
    ...formProgress(form, state),
  });
}

function onInvalid(event) {
  const field = trackedField(event.target);
  if (!field) return;
  const form = field.form;
  const state = getFormState(form);
  startForm(form, state);
  state.lastField = field.name;
  if (state.invalid.has(field.name)) return;
  state.invalid.add(field.name);
  trackEvent("lead_form_validation_error", {
    form_id: runtime.formName,
    cta_id: runtime.currentCta,
    field_name: field.name,
  });
}

function onSubmit(event) {
  const form = event.target;
  if (formIdentifier(form) !== runtime.formName) return;
  const state = getFormState(form);
  startForm(form, state);
  state.submitted = true;
  trackEvent("lead_form_submit_attempt", {
    form_id: runtime.formName,
    cta_id: runtime.currentCta,
    ...formProgress(form, state),
  });
}

function observeAbandonment() {
  runtime.observer = new MutationObserver(() => {
    for (const [form, state] of runtime.forms) {
      if (form.isConnected) continue;
      if (state.started && !state.success) {
        trackEvent("lead_form_abandon", {
          form_id: runtime.formName,
          cta_id: runtime.currentCta,
          last_field_name: state.lastField,
          ...formProgress(form, state),
        });
      }
      runtime.forms.delete(form);
    }
  });
  runtime.observer.observe(document.body, { childList: true, subtree: true });
}

export function trackLeadSuccess(form) {
  const state = form ? getFormState(form) : null;
  if (state) state.success = true;
  trackEvent("generate_lead", {
    form_id: runtime.formName,
    lead_source: "website_form",
    cta_id: runtime.currentCta,
    ...(form && state ? formProgress(form, state) : {}),
  });
}

export function trackLeadError(form, errorType = "submission_failed") {
  const state = form ? getFormState(form) : null;
  trackEvent("lead_form_submit_error", {
    form_id: runtime.formName,
    cta_id: runtime.currentCta,
    error_type: errorType,
    ...(form && state ? formProgress(form, state) : {}),
  });
}

function readConsent() {
  try {
    const value = window.localStorage.getItem(CONSENT_KEY);
    if (value && CONSENT_CHOICES[value]) return value;
    const legacyValue = window.localStorage.getItem(LEGACY_CONSENT_KEY);
    // Existing analytics consent does not cover the newly introduced advertising purposes.
    // Prompt those visitors again instead of silently expanding or migrating their consent.
    if (legacyValue === "granted") return null;
    if (legacyValue === "denied") return "denied";
    return null;
  } catch {
    return null;
  }
}

function writeConsent(choice) {
  try {
    window.localStorage.setItem(CONSENT_KEY, choice);
    window.localStorage.removeItem(LEGACY_CONSENT_KEY);
  } catch {
    // The consent update still applies to the current page if storage is unavailable.
  }
}

function updateConsent(choice, trackChoice = false) {
  const state = CONSENT_CHOICES[choice] || CONSENT_CHOICES.denied;
  if (import.meta.env.DEV) console.info("[Realjet consent]", choice, state);
  gtag("consent", "update", state);
  writeConsent(choice);
  if (trackChoice && state.analytics_storage === "granted") {
    trackEvent("consent_preferences_updated", {
      consent_source: "site_banner",
      analytics_consent: state.analytics_storage,
      advertising_consent: state.ad_storage,
      personalization_consent: state.ad_personalization,
    });
  }
}

export function getConsentPreferences() {
  const choice = readConsent();
  const state = choice ? CONSENT_CHOICES[choice] : CONSENT_CHOICES.denied;
  return {
    analytics: state.analytics_storage === "granted",
    advertising: state.ad_storage === "granted",
  };
}

export function setConsentPreferences({ analytics, advertising }) {
  const choice = analytics
    ? (advertising ? "all" : "analytics")
    : (advertising ? "advertising" : "denied");
  updateConsent(choice, true);
}

function privacyUrl(locale) {
  return `/marketing/privacy/${locale}/#cookies`;
}

function showConsentPanel(locale) {
  const copy = consentCopy[locale] || consentCopy.en;
  document.querySelector(".analytics-consent-panel")?.remove();

  const panel = document.createElement("section");
  panel.className = "analytics-consent-panel";
  panel.setAttribute("role", "dialog");
  panel.setAttribute("aria-modal", "false");
  panel.setAttribute("aria-label", copy.title);
  panel.dir = locale === "ar" ? "rtl" : "ltr";
  panel.innerHTML = `
    <div class="analytics-consent-copy">
      <p>${copy.body}</p>
    </div>
    <div class="analytics-consent-actions">
      <a href="${privacyUrl(locale)}">${copy.settings}</a>
      <button type="button" class="analytics-consent-accept" data-consent="all">${copy.accept}</button>
    </div>
    <button type="button" class="analytics-consent-close" data-consent="denied" aria-label="${copy.close}">×</button>
  `;
  panel.addEventListener("click", (event) => {
    const value = event.target.closest("button")?.dataset.consent;
    if (!value) return;
    updateConsent(value, true);
    panel.remove();
  });
  document.body.appendChild(panel);
}

export function openAnalyticsConsentSettings() {
  showConsentPanel(runtime.locale);
}

export function initAnalyticsConsent(locale, options = {}) {
  runtime.locale = locale;
  initContactTracking();
  const current = readConsent();
  if (current) updateConsent(current);
  else if (options.showPanel !== false) showConsentPanel(locale);
}

export function initLandingAnalytics(locale, options = {}) {
  if (runtime.initialized) return;
  runtime.initialized = true;
  runtime.locale = locale;
  runtime.formName = options.formName || DEFAULT_FORM_NAME;
  runtime.pageType = options.pageType || DEFAULT_PAGE_TYPE;
  initAnalyticsConsent(locale);
  document.addEventListener("click", onClick, true);
  document.addEventListener("focusin", onFocus, true);
  document.addEventListener("change", onChange, true);
  document.addEventListener("focusout", onChange, true);
  document.addEventListener("invalid", onInvalid, true);
  document.addEventListener("submit", onSubmit, true);
  observeAbandonment();
  trackEvent("landing_page_view");
}
