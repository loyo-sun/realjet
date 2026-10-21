import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';

const source = await readFile(new URL('../site/assets/concrete-lab.js', import.meta.url), 'utf8');
function element(initial = {}) {
  return { hidden: false, disabled: false, innerHTML: 'Send', textContent: '', attrs: {}, listeners: {},
    addEventListener(name, callback) { this.listeners[name] = callback; },
    setAttribute(name, value) { this.attrs[name] = value; }, removeAttribute(name) { delete this.attrs[name]; },
    focus() { this.focused = true; }, ...initial };
}
function setup() {
  const fieldset = element(), error = element({ hidden: true }), success = element({ hidden: true }), button = element();
  const fields = Object.fromEntries(Object.entries({ name: 'QA Example', email: 'qa@example.com', company: 'Example Laboratory', country: 'Example Country', module: 'Complete laboratory', specimen: '150 mm concrete cubes', daily_specimens: '90', message: 'Review preparation and curing.', 'bot-field': '' }).map(([name, value]) => [name, { value }]));
  fields.module.options = [{ value: 'Complete laboratory' }];
  const shell = { querySelector: () => success };
  const form = element({ valid: true, elements: { namedItem: name => fields[name] }, reportValidity() { return this.valid; }, closest: () => shell, querySelector: selector => ({ fieldset, '[data-lab-error]': error, '[type="submit"]': button })[selector] });
  const output = { querySelector: () => element() };
  const calculator = element({ reportValidity: () => true, elements: { daily: { value: '40' }, days: { value: '28' }, size: { value: '3' } }, querySelector: () => output });
  const root = { dataset: { labPage: 'Q01' }, querySelectorAll: () => [], querySelector: s => s === '[data-lab-form]' ? form : s === '[data-lab-calculator]' ? calculator : null };
  const events = [], requests = [];
  let response = { ok: false };
  const window = { gtag: (...args) => events.push(args), dataLayer: [], addEventListener() {} };
  const context = { document: { querySelector: s => s === '[data-lab-page]' ? root : null }, window, location: { pathname: '/request-concrete-lab-proposal/', origin: 'https://example.test', search: '?module=Complete%20laboratory' }, URLSearchParams, console, fetch: async (url, options) => { requests.push({ url, ...options }); return response; } };
  vm.runInNewContext(source, context);
  return { form, fields, fieldset, error, success, button, events, requests, window, setResponse: value => { response = value; } };
}
const event = { preventDefault() {} };
const test = setup();
test.form.valid = false;
await test.form.listeners.submit(event);
assert.equal(test.requests.length, 0, 'Invalid input is not submitted');
test.form.valid = true; test.fields['bot-field'].value = 'bot';
await test.form.listeners.submit(event);
assert.equal(test.requests.length, 0, 'Honeypot does not submit');
test.fields['bot-field'].value = '';
await test.form.listeners.submit(event);
assert.equal(test.requests.length, 1);
assert.equal(test.error.hidden, false, 'Failure is visible');
assert.equal(test.fieldset.disabled, false, 'Failure permits retry');
assert.equal(test.success.hidden, true, 'Failure does not show success');
assert.equal(test.fields.message.value, 'Review preparation and curing.', 'Input is retained after failure');
const payload = new URLSearchParams(test.requests[0].body);
assert.equal(test.requests[0].url, '/');
assert.equal(payload.get('form-name'), 'universal-enquiry');
assert.equal(payload.get('email'), 'qa@example.com');
for (const text of ['Example Laboratory', 'Example Country', '90', 'Complete laboratory']) assert(payload.get('message').includes(text), 'Engineering data included in shared message');
assert.equal(test.window.dataLayer.length, 0, 'No lead signal after failure');
test.setResponse({ ok: true });
await test.form.listeners.submit(event);
assert.equal(test.requests.length, 2);
assert.equal(test.form.hidden, true);
assert.equal(test.success.hidden, false);
assert.equal(test.success.focused, true);
assert.equal(test.window.dataLayer.length, 1);
assert.equal(test.events.filter(e => e[1] === 'generate_lead').length, 1);
await test.form.listeners.submit(event);
assert.equal(test.requests.length, 2, 'Successful submission cannot duplicate');
const telemetry = JSON.stringify(test.events);
for (const personal of ['qa@example.com', 'QA Example', 'Review preparation and curing.']) assert(!telemetry.includes(personal), 'No enquiry contents in analytics');
console.log('Lab enquiry: validation, honeypot, failed response, retained input, retry, shared payload, success, deduplication and analytics passed. No live enquiry sent.');
