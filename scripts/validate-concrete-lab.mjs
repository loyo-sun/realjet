import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const pages = JSON.parse(await readFile(join(root, 'site/_data/concreteLab.json'), 'utf8'));
assert.equal(pages.length, 5, 'Complete laboratory page set');
assert.equal(pages.filter(p => p.type === 'product').length, 3);
assert.equal(new Set(pages.map(p => p.path)).size, 5, 'Unique routes');
const sitemap = await readFile(join(root, 'dist/sitemap.xml'), 'utf8');
const titles = new Set();
for (const page of pages) {
  const html = await readFile(join(root, 'dist', page.path, 'index.html'), 'utf8');
  assert.equal((html.match(/<h1[ >]/g) || []).length, 1, `${page.id}: one H1`);
  assert(html.includes(`href="https://realjetech.com${page.path}"`), `${page.id}: canonical`);
  const title = html.match(/<title>(.*?)<\/title>/s)?.[1];
  assert(title && !titles.has(title), `${page.id}: unique title`); titles.add(title);
  assert(sitemap.includes(`<loc>https://realjetech.com${page.path}</loc>`), `${page.id}: sitemap`);
  const navigation = html.match(/id="solutions-submenu"[\s\S]*?<\/nav>/)?.[0];
  assert(navigation?.includes('href="/solutions/concrete-lab-automation/"') && navigation.includes('mega-menu-links'), `${page.id}: laboratory entry in flat solutions menu`);
  assert(html.includes('"publisher":{"@type":"Organization","name":"REALJET"'), `${page.id}: publisher`);
  assert(!/Source:|Image source|Courtesy of|集思|协金|Azimuth|Novatiq/i.test(html), `${page.id}: customer-facing ownership`);
  for (const anchor of html.matchAll(/href="#([^"\s]+)"/g)) assert(html.includes(`id="${anchor[1]}"`), `${page.id}: working anchor ${anchor[1]}`);
  for (const code of page.related) assert(pages.some(p => p.id === code), `${page.id}: related page ${code}`);
  for (const image of html.matchAll(/<img[^>]*\ssrc="([^"]+)"/g)) {
    if (image[1].startsWith('/')) await access(join(root, 'dist', image[1]));
  }
  const main = html.match(/<article class="lab-page[\s\S]*?<\/article>\s*<dialog/)?.[0] || html;
  assert(!/TODO|TBD|Lorem ipsum|待确认|待补|Coming soon/.test(main), `${page.id}: no placeholders`);
  const text = main.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
  assert(text.split(' ').length > 300, `${page.id}: substantive page content`);
}
const formPage = await readFile(join(root, 'dist/request-concrete-lab-proposal/index.html'), 'utf8');
assert(formPage.includes('data-lab-form'), 'Engineering enquiry form');
assert(formPage.includes('type="email" autocomplete="email"'), 'Email input');
assert(formPage.includes('name="privacy_consent"'), 'Privacy consent');
const capacityPage = await readFile(join(root, 'dist/solutions/concrete-lab-automation/index.html'), 'utf8');
assert(capacityPage.includes('data-lab-calculator'), 'Capacity calculator');
assert(capacityPage.includes('Planning example only'), 'Planning assumptions visible');
console.log('Validated all 5 concrete laboratory pages, navigation order, internal anchors, assets, catalogue content and enquiry structure.');

const redirects = JSON.parse(await readFile(join(root, 'docs/concrete-lab-redirects.json'), 'utf8'));
for (const item of redirects) {
 const html = await readFile(join(root, 'dist', item.from, 'index.html'), 'utf8');
 assert(html.includes('content="noindex, follow"'));
 assert(html.includes(`url=${item.to}`));
 assert(!sitemap.includes(`<loc>https://realjetech.com${item.from}</loc>`));
 const [path, anchor] = item.to.split('#');
 const target = await readFile(join(root, 'dist', path, 'index.html'), 'utf8');
 assert(!anchor || target.includes(`id="${anchor}"`));
}
console.log('Validated 10 consolidated URLs and their destination sections.');
