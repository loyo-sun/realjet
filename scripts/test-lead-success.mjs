import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { runInNewContext } from "node:vm";

// Exercise the production handlers without sending enquiries to Netlify.
const root = new URL("../", import.meta.url);
const siteSource = await readFile(new URL("site/assets/site.js", root), "utf8");
const ppvcSource = await readFile(new URL("site/assets/ppvc.js", root), "utf8");
const sharedSource = await readFile(new URL("src/pages/precast-beam-factory/shared/analytics.js", root), "utf8");

function element() {
  const children = new Map();
  return {
    dataset: {}, listeners: {}, hidden: false,
    value: "", innerHTML: "", textContent: "", disabled: false,
    classList: { add() {}, remove() {}, toggle() {} },
    addEventListener(name, callback) { this.listeners[name] = callback; },
    setAttribute() {}, removeAttribute() {}, focus() {}, reset() {},
    getAttribute(name) { return name === "name" ? "universal-enquiry" : null; },
    reportValidity() { return true; },
    querySelector(selector) {
      if (!children.has(selector)) children.set(selector, element());
      return children.get(selector);
    },
    querySelectorAll() { return []; },
  };
}

function environment() {
  const nodes = new Map();
  const document = {
    body: { dataset: {}, classList: element().classList },
    querySelector: (selector) => nodes.get(selector) || null,
    querySelectorAll: () => [],
    addEventListener() {},
  };
  const window = { dataLayer: [], location: { pathname: "/test/", search: "" }, addEventListener() {} };
  window.gtag = (...args) => window.dataLayer.push(args);
  return {
    nodes, document, window, location: window.location,
    localStorage: { getItem: () => "denied", setItem() {}, removeItem() {} },
    URLSearchParams, console,
    FormData: class { *[Symbol.iterator]() { yield ["name", "Test"]; } },
    IntersectionObserver: class { observe() {} },
  };
}

function assertCounts(env, expected) {
  const custom = env.window.dataLayer.filter((item) => item.event === "realjet_lead_success");
  assert.equal(custom.length, expected, "GTM receives one event per successful submission");
  // Keep the new GTM signal free of enquiry fields and other personal data.
  for (const item of custom) assert.deepEqual(Object.keys(item), ["event"]);
  const ga4 = env.window.dataLayer.filter((item) => item[0] === "event" && item[1] === "generate_lead");
  assert.equal(ga4.length, expected, "existing GA4 event is still sent exactly once");
}

for (const kind of ["contact", "universal", "ppvc"]) {
  for (const outcome of ["success", "http-error", "network-error"]) {
    const env = environment();
    const form = element();
    const fields = ["name", "email", "message", "bot-field"].map((name) => ({ name, type: "text", value: "test", required: true }));
    fields.namedItem = (name) => fields.find((field) => field.name === name);
    fields["bot-field"] = { value: "" };
    form.elements = fields;
    env.fetch = async () => {
      if (outcome === "network-error") throw new Error("Network unavailable");
      return { ok: outcome === "success" };
    };
    if (kind === "contact") {
      env.nodes.set("[data-contact-form]", form);
      for (const name of ["form-shell", "success", "error"]) env.nodes.set(`[data-contact-${name}]`, element());
      runInNewContext(siteSource, env);
    } else if (kind === "universal") {
      env.nodes.set("[data-universal-enquiry-form]", form);
      for (const name of ["form-shell", "success", "error", "submit"]) env.nodes.set(`[data-universal-enquiry-${name}]`, element());
      runInNewContext(siteSource, env);
    } else {
      const page = element();
      const shell = element();
      form.dataset.enquiryPosition = "hero";
      form.closest = () => shell;
      page.querySelectorAll = (selector) => selector === "[data-ppvc-form]" ? [form] : [];
      env.nodes.set(".ppvc-page", page);
      env.document.getElementById = () => element();
      runInNewContext(ppvcSource, env);
    }
    assertCounts(env, 0); // Loading the page is not a conversion.
    form.listeners.invalid?.({ target: { name: "email" } });
    assertCounts(env, 0); // Validation errors are not conversions.
    await form.listeners.submit({ preventDefault() {} });
    assertCounts(env, outcome === "success" ? 1 : 0);
    console.log(`PASS ${kind}: ${outcome}`);
  }
}

// React landing pages share these success/error functions. Exercise the actual
// module, replacing only syntax that the classic-script VM does not support.
const env = environment();
runInNewContext(sharedSource.replaceAll("export ", "").replaceAll("import.meta.env.DEV", "false"), env);
for (const name of ["landing_page_view", "lead_form_submit_click", "lead_form_submit_attempt", "contact_whatsapp"]) {
  env.trackEvent(name);
}
env.trackLeadError(null);
assertCounts(env, 0);
env.trackLeadSuccess(null);
assertCounts(env, 1);
env.trackLeadSuccess(null);
assertCounts(env, 2); // A separate successful enquiry must still count.
console.log("PASS shared landing analytics: success, failure, non-conversion events, repeat enquiries");
