import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { runInNewContext } from 'node:vm';
const root = new URL('../', import.meta.url);
const source = await readFile(new URL('site/assets/building-precast-email.js', root), 'utf8');
const template = await readFile(new URL('site/precast-concrete-plant/index.njk', root), 'utf8');
const markup = template.match(/<form[^>]*data-pc-email-form[^>]*>([\s\S]*?)<\/form>/)[1];
const hidden = [...markup.matchAll(/<input type="hidden" name="([^"]+)" value="([^"]*)"/g)];
assert.equal((markup.match(/type="email"/g) || []).length, 1);
assert.equal((markup.match(/\brequired\b/g) || []).length, 1);
function el() {
  return { hidden: false, events: {}, attrs: {}, value: '', style: {}, textContent: '',
    addEventListener(k, f) { this.events[k] = f; }, setAttribute(k, v) { this.attrs[k] = v; },
    removeAttribute(k) { delete this.attrs[k]; }, focus() { this.focused = true; } };
}
function setup({ fetcher = async () => ({ ok: true }), stored = false, local = false, consentTop = null, keyboard = false } = {}) {
  const panel = el(), form = el(), main = el(), fieldset = el(), submit = el(), close = el(), error = el(), success = el(), announcement = el();
  panel.hidden = true; success.hidden = true;
  const fields = Object.fromEntries(hidden.map(([, k, value]) => [k, { value }]));
  fields.email = Object.assign(el(), { value: 'visitor@example.com', tagName: 'INPUT' });
  form.elements = fields; form.valid = true; form.reportValidity = () => form.valid;
  const rect = { top: 1000, bottom: 2300 };
  const header = { getBoundingClientRect: () => ({ height: 86 }) };
  const lines = { getBoundingClientRect: () => rect };
  panel.querySelector = s => ({ form, '[data-pc-email-close]': close, '[data-pc-email-error]': error, '[data-pc-email-success]': success })[s];
  panel.contains = x => [fields.email, close, success].includes(x);
  form.querySelector = s => s === 'fieldset' ? fieldset : submit;
  const bodyClasses = new Set();
  const document = Object.assign(el(), { activeElement: el(), body: { classList: { add: x => bodyClasses.add(x), remove: x => bodyClasses.delete(x) } }, querySelector: s => ({ '[data-pc-email-panel]': panel, '#production-lines': lines, '[data-pc-email-announcement]': announcement, '[data-pc-form]': main, '.pc-header': header, '.analytics-consent-panel': consentTop === null ? null : { getBoundingClientRect: () => ({ top: consentTop }) } })[s] || null });
  const window = Object.assign(el(), { scrollY: 0, innerHeight: 900, trackEvent: (...args) => analytics.push(args) });
  if (keyboard) window.visualViewport = { height: 500, offsetTop: 0, addEventListener() {} };
  const storage = new Map(stored ? [['realjet_pc_scroll_email_shown_v1', '1']] : []), calls = [], analytics = [];
  runInNewContext(source, { document, window, sessionStorage: { getItem: k => storage.get(k), setItem: (k, v) => storage.set(k, v) }, localStorage: { getItem: () => 'analytics' }, MutationObserver: class { observe() {} }, requestAnimationFrame: fn => fn(), crypto: { randomUUID: () => 'random-test-id' }, FormData: class extends Map { constructor() { super(Object.entries(fields).map(([k, v]) => [k, v.value])); } }, URLSearchParams, AbortController, setTimeout: () => 1, clearTimeout() {}, location: { hostname: local ? 'localhost' : 'realjetech.com', protocol: 'https:' }, fetch: async (url, options) => { calls.push({ url, payload: new URLSearchParams(options.body) }); return fetcher(); } });
  return { document, panel, form, main, close, error, success, fields, calls, analytics, storage, bodyClasses, window,
    see() { window.scrollY = 400; rect.top = 600; rect.bottom = 1900; window.events.scroll(); },
    leave() { window.scrollY = 2250; rect.top = -1250; rect.bottom = 50; window.events.scroll(); },
    submit: () => form.events.submit({ preventDefault() {} }),
    closeOffer: () => close.events.click(),
  };
}
const good = setup(); assert.equal(good.panel.hidden, true); good.see(); assert.equal(good.panel.hidden, true); good.leave(); assert.equal(good.panel.hidden, false); assert.equal(good.fields.email.focused, undefined);
await good.submit(); const sent = good.calls[0].payload;
assert.equal(sent.get('form-name'), 'universal-enquiry'); assert.equal(sent.get('name'), 'Name'); assert.equal(sent.get('email'), 'visitor@example.com'); assert.equal(sent.get('message'), '客户通过滚动留下了邮箱信息。'); assert.equal(sent.get('enquiry_source'), 'scroll_email'); assert.equal(sent.get('submission_id'), 'random-test-id'); assert.equal(sent.has('country'), false);
assert.equal(good.success.hidden, false); await good.submit(); assert.equal(good.calls.length, 1);
assert.equal(good.analytics.filter(([event]) => event === 'generate_lead').length, 1); assert.ok(!JSON.stringify(good.analytics).includes('visitor@example.com')); assert.ok(!JSON.stringify([...good.storage]).includes('visitor@example.com'));
for (const fetcher of [async () => ({ ok: false }), async () => { throw new Error('offline'); }]) {
  const f = setup({ fetcher }); f.see(); f.leave(); await f.submit(); assert.equal(f.error.hidden, false); assert.equal(f.success.hidden, true); assert.equal(f.fields.email.value, 'visitor@example.com'); assert.equal(f.close.disabled, false); assert.equal(f.analytics.length, 0); await f.submit(); assert.equal(f.calls[0].payload.get('submission_id'), f.calls[1].payload.get('submission_id'));
}
const dismissed = setup(); dismissed.see(); dismissed.leave(); dismissed.closeOffer(); dismissed.leave(); assert.equal(dismissed.panel.hidden, true); assert.equal(dismissed.bodyClasses.size, 0);
const repeat = setup({ stored: true }); repeat.see(); repeat.leave(); assert.equal(repeat.panel.hidden, true);
const skipped = setup(); skipped.leave(); assert.equal(skipped.panel.hidden, true);
const engaged = setup(); engaged.main.events.input(); engaged.see(); engaged.leave(); assert.equal(engaged.panel.hidden, true);
const cta = setup(); cta.document.events.click({ target: { closest: () => ({}) } }); cta.see(); cta.leave(); assert.equal(cta.panel.hidden, true);
const stacked = setup({ consentTop: 650 }); stacked.see(); stacked.leave(); assert.equal(stacked.panel.style.bottom, '262px');
const keyboard = setup({ keyboard: true }); keyboard.see(); keyboard.leave(); assert.equal(keyboard.panel.style.bottom, '412px');
const invalid = setup(); invalid.form.valid = false; await invalid.submit(); assert.equal(invalid.calls.length, 0);
const local = setup({ local: true }); local.see(); local.leave(); await local.submit(); assert.equal(local.calls.length, 0); assert.equal(local.success.hidden, true); assert.match(local.error.textContent, /local preview/);
let finish; const pending = setup({ fetcher: () => new Promise(resolve => { finish = resolve; }) }); pending.see(); pending.leave(); const first = pending.submit(); await pending.submit(); pending.closeOffer(); assert.equal(pending.panel.hidden, false); assert.equal(pending.calls.length, 1); finish({ ok: true }); await first;
console.log('PASS: scroll trigger, one-field payload, dismiss/session/main-form suppression, validation, receipt/retry/local guard, duplicate prevention and private-data-free analytics/storage.');
