import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { load } from 'js-yaml';
import { productCategories } from './product-catalogue.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const output = join(root, 'dist');
const sourceProducts = [];
for (const name of (await readdir(join(root, 'content/products'))).filter(name => name.endsWith('.md'))) {
  const source = await readFile(join(root, 'content/products', name), 'utf8');
  const data = load(source.match(/^---\r?\n([\s\S]*?)\r?\n---/)[1]);
  if (data.draft || data.mouldGroup === true) continue;
  const url = data.marketingPath || (data.productSeries === 'precast-concrete-moulds' ? `/precast-concrete-molds/${data.slug}/` : `/products/${data.slug}.html`);
  sourceProducts.push({ ...data, url: `https://realjetech.com${url}` });
}
const sitemap = await readFile(join(output, 'sitemap.xml'), 'utf8');
const expectedSitemap = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => match[1]);
assert.equal(new Set(expectedSitemap).size, expectedSitemap.length, 'Duplicate sitemap URLs');
const buckets = [{ slug: 'all', url: '/products/' }, ...productCategories.map(category => ({ ...category, url: `/products/${category.slug}/` }))];
const titles = new Set();
let checkedPages = 0;
for (const bucket of buckets) {
  const expected = bucket.slug === 'all' ? sourceProducts : sourceProducts.filter(product => product.productSeries === bucket.series);
  const numberOfPages = Math.max(1, Math.ceil(expected.length / 12));
  const seenUrls = [];
  for (let number = 1; number <= numberOfPages; number++) {
    const url = `${bucket.url}${number > 1 ? `page/${number}/` : ''}`;
    const html = await readFile(join(output, url, 'index.html'), 'utf8');
    const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)[1];
    assert.equal(canonical, `https://realjetech.com${url}`, `${url}: self canonical`);
    const title = html.match(/<title>(.*?)<\/title>/s)[1];
    assert(!titles.has(title), `${url}: duplicate title`); titles.add(title);
    assert.equal((html.match(/<h1[ >]/g) || []).length, 1, `${url}: H1`);
    assert(html.includes('content="index, follow"'), `${url}: robots`);
    assert(expectedSitemap.includes(canonical), `${url}: sitemap`);
    const schema = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].flatMap(match => JSON.parse(match[1])['@graph'] || []);
    const list = schema.find(item => item['@type'] === 'ItemList');
    const cards = [...html.matchAll(/<article class="product-card">([\s\S]*?)<\/article>/g)];
    const expectedSize = Math.min(12, expected.length - (number - 1) * 12);
    assert.equal(cards.length, expectedSize, `${url}: page size`);
    assert.equal(list.numberOfItems, cards.length, `${url}: structured data count`);
    assert.equal(list.itemListElement.length, cards.length);
    for (let index = 0; index < cards.length; index++) {
      const cardUrl = new URL(cards[index][1].match(/href="([^"]+)"/)[1], 'https://realjetech.com').href;
      assert.equal(list.itemListElement[index].url, cardUrl, `${url}: card/schema URL`);
      assert.equal(list.itemListElement[index].position, (number - 1) * 12 + index + 1);
      seenUrls.push(cardUrl);
    }
    const nav = html.match(/<nav class="catalogue-categories"[\s\S]*?<\/nav>/)[0];
    assert.equal((nav.match(/<a /g) || []).length, 5, `${url}: all categories available`);
    for (const category of buckets) {
      const count = category.slug === 'all' ? sourceProducts.length : sourceProducts.filter(product => product.productSeries === category.series).length;
      assert(nav.includes(`aria-label="${count} products"`), `${url}: category count`);
    }
    const prev = html.match(/<link rel="prev" href="([^"]+)"/);
    const next = html.match(/<link rel="next" href="([^"]+)"/);
    const prevUrl = number === 2 ? bucket.url : `${bucket.url}page/${number - 1}/`;
    assert.equal(prev?.[1], number > 1 ? `https://realjetech.com${prevUrl}` : undefined, `${url}: previous stays in category`);
    assert.equal(next?.[1], number < numberOfPages ? `https://realjetech.com${bucket.url}page/${number + 1}/` : undefined, `${url}: next stays in category`);
    assert(!html.includes(`${bucket.url}page/1/`), `${url}: no duplicate page 1 URL`);
    checkedPages++;
  }
  assert.equal(new Set(seenUrls).size, seenUrls.length, `${bucket.slug}: repeated product across pages`);
  assert.deepEqual([...seenUrls].sort(), expected.map(product => product.url).sort(), `${bucket.slug}: missing or extra products`);
  console.log(`${bucket.slug}: ${expected.length} products, ${numberOfPages} page(s), complete coverage.`);
}
console.log(`Validated ${checkedPages} catalogue pages against ${sourceProducts.length} published products.`);
