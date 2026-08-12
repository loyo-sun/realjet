const DEFAULT_FORM_NAME = "universal-enquiry";
const CONSENT_KEY = "realjet_analytics_consent_v1";
const DEFAULT_PAGE_TYPE = "precast_production_line";

const consentCopy = {
  en: {
    title: "Analytics preferences",
    body: "We use cookies for anonymous site analytics to improve your experience. For more information, please read our",
    accept: "Accept all",
    settings: "Privacy settings",
    close: "Close analytics preferences",
    privacy: "privacy policy",
  },
  id: {
    title: "Preferensi analitik",
    body: "Kami menggunakan cookie untuk analitik situs anonim guna meningkatkan pengalaman Anda. Untuk informasi lebih lanjut, silakan baca",
    accept: "Terima semua",
    settings: "Pengaturan privasi",
    close: "Tutup preferensi analitik",
    privacy: "Kebijakan Privasi",
  },
  ar: {
    title: "تفضيلات التحليلات",
    body: "نستخدم ملفات تعريف الارتباط لتحليل استخدام الموقع بصورة مجهولة الهوية وتحسين تجربتك. لمزيد من المعلومات، يرجى قراءة",
    accept: "قبول الكل",
    settings: "إعدادات الخصوصية",
    close: "إغلاق تفضيلات التحليلات",
    privacy: "سياسة الخصوصية",
  },
  ru: {
    title: "Настройки аналитики",
    body: "Мы используем файлы cookie для анонимной аналитики сайта, чтобы улучшить вашу работу с сайтом. Для получения дополнительной информации ознакомьтесь с",
    accept: "Принять все",
    settings: "Настройки конфиденциальности",
    close: "Закрыть настройки аналитики",
    privacy: "Политика конфиденциальности",
  },
  cn: {
    title: "统计偏好设置",
    body: "我们使用 Cookie 进行匿名网站分析，以改善您的使用体验。如需了解更多信息，请阅读我们的",
    accept: "全部接受",
    settings: "隐私设置",
    close: "关闭统计偏好设置",
    privacy: "隐私政策",
  },
  fr: {
    title: "Préférences d’analyse",
    body: "Nous utilisons des cookies pour analyser anonymement l’utilisation du site et améliorer votre expérience. Pour plus d’informations, veuillez consulter notre",
    accept: "Tout accepter",
    settings: "Paramètres de confidentialité",
    close: "Fermer les préférences d’analyse",
    privacy: "Politique de confidentialité",
  },
  es: {
    title: "Preferencias de analítica",
    body: "Utilizamos cookies para realizar análisis anónimos del sitio y mejorar su experiencia. Para obtener más información, consulte nuestra",
    accept: "Aceptar todo",
    settings: "Ajustes de privacidad",
    close: "Cerrar las preferencias de analítica",
    privacy: "Política de privacidad",
  },
};

const runtime = {
  locale: "en",
  formName: DEFAULT_FORM_NAME,
  pageType: DEFAULT_PAGE_TYPE,
  initialized: false,
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
    return value === "granted" || value === "denied" ? value : null;
  } catch {
    return null;
  }
}

function writeConsent(value) {
  try {
    window.localStorage.setItem(CONSENT_KEY, value);
  } catch {
    // The consent update still applies to the current page if storage is unavailable.
  }
}

function updateConsent(value, trackChoice = false) {
  if (import.meta.env.DEV) console.info("[Realjet consent]", value);
  gtag("consent", "update", {
    analytics_storage: value,
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
  writeConsent(value);
  if (trackChoice && value === "granted") {
    trackEvent("analytics_consent_granted", { consent_source: "site_banner" });
  }
}

export function isAnalyticsConsentGranted() {
  return readConsent() !== "denied";
}

export function setAnalyticsConsent(enabled) {
  updateConsent(enabled ? "granted" : "denied", enabled);
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
      <p>${copy.body} <a href="${privacyUrl(locale)}">${copy.privacy}</a>.</p>
    </div>
    <div class="analytics-consent-actions">
      <a href="${privacyUrl(locale)}">${copy.settings}</a>
      <button type="button" class="analytics-consent-accept" data-consent="granted">${copy.accept}</button>
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
  const current = readConsent();
  if (current) updateConsent(current);
  else if (options.defaultGranted) updateConsent("granted");
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
