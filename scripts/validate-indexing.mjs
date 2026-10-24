import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const output = fileURLToPath(new URL('../dist/', import.meta.url));
const sitemap = await readFile(resolve(output, 'sitemap.xml'), 'utf8');
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => match[1]);
assert.equal(urls.length, new Set(urls).size, 'Sitemap must not repeat URLs');
const rules = (await readFile(resolve(output, '_redirects'), 'utf8'))
  .split('\n').map(line => line.trim()).filter(line => line && !line.startsWith('#'))
  .map(line => line.split(/\s+/));
const sources = new Set();
for (const [source, target, status] of rules) {
  assert(!sources.has(source), `Duplicate redirect: ${source}`);
  sources.add(source);
  assert.equal(status, '301!');
  assert.notEqual(source, target);
  assert((target.startsWith('/products/') && target.endsWith('.html')) || ['/about/manufacturing-capabilities/', '/solutions/contract-manufacturing/'].includes(target));
  const html = await readFile(resolve(output, target.slice(1) + (target.endsWith('/') ? 'index.html' : '')), 'utf8');
  assert(html.includes(`<link rel="canonical" href="https://realjetech.com${target}"`), `${target}: canonical`);
  assert(!/<meta\b[^>]*name="robots"[^>]*content="[^"]*noindex/i.test(html), `${target}: indexable`);
  assert(urls.includes(`https://realjetech.com${target}`), `${target}: sitemap`);
}
for (const slug of ['custom-mounting-bracket', 'custom-aluminum-box', 'ss-laser-cutting', 'winch', 'transfer-trolley', 'fabricated-fuel-tank-contract-manufacturing']) {
  assert(sources.has(`/products/${slug}`), `Search Console alias missing: ${slug}`);
}
for (const url of urls) {
  assert(!sources.has(new URL(url).pathname), `Sitemap contains a redirect source: ${url}`);
}
assert(!sources.has('/products/page/4/'), 'Catalogue pages must stay accessible');
assert(!sources.has('/products/precast-concrete-equipment/'), 'Category directories must stay accessible');
console.log(`Indexing validation passed: ${rules.length} permanent aliases, ${urls.length} unique sitemap URLs.`);
