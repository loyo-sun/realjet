const CONSENT_KEY = "realjet_analytics_consent_v1";

function gtag(...args) {
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function gtagQueue() {
    window.dataLayer.push(arguments);
  };
  window.gtag(...args);
}

function trackEvent(name, parameters = {}) {
  gtag("event", name, {
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
  gtag("consent", "update", {
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
    if (insightCta.getAttribute("href")?.startsWith("mailto:")) {
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
});

if (document.body.dataset.pageType === "home") trackEvent("home_page_view");
if (document.body.dataset.pageType === "insight") {
  trackEvent("insight_view", { article_slug: document.body.dataset.articleSlug });
}
