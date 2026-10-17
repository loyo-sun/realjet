import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { load } from 'js-yaml';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const report = JSON.parse(await readFile(join(root, 'docs/sheet-metal-import-manifest.json'), 'utf8'));
assert.equal(report.products.length, report.sourceUniqueProducts, 'Source entries missing from import');
assert.equal(new Set(report.products.map(product => product.source)).size, report.products.length, 'Duplicate source entry');
assert.equal(new Set(report.products.map(product => product.slug)).size, report.products.length, 'Duplicate destination slug');
assert.equal(report.sourceCountsByPage.reduce((a, b) => a + b, 0), report.sourceUniqueProducts);
const sitemap = await readFile(join(root, 'dist/sitemap.xml'), 'utf8');
const titles = new Set(), descriptions = new Set(), bodies = new Set();
let imageCount = 0;
for (const product of report.products) {
  const source = await readFile(join(root, product.contentFile), 'utf8');
  const [, frontmatter, body] = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  const data = load(frontmatter);
  assert.equal(data.slug, product.slug);
  assert.equal(data.productSeries, 'contract-manufacturing');
  assert.equal(data.sheetMetalProduct, true);
  assert.equal(data.productSourceBatch, 'sheet-metal-2026-10-17');
  assert(!data.draft);
  assert(data.sheetMetalFamily, `${product.slug}: missing fabrication family`);
  assert(data.imageAlt.length > 15);
  assert(data.description.length >= 90 && data.description.length <= 190, `${product.slug}: description length`);
  assert(data.landingSeoTitle.length <= 75, `${product.slug}: search title too long`);
  assert(!titles.has(data.landingSeoTitle), `${product.slug}: duplicate search title`); titles.add(data.landingSeoTitle);
  assert(!descriptions.has(data.description), `${product.slug}: duplicate search description`); descriptions.add(data.description);
  const hash = createHash('sha256').update(body).digest('hex');
  assert(!bodies.has(hash), `${product.slug}: duplicate body`); bodies.add(hash);
  assert(body.split(/\s+/).length > 650, `${product.slug}: incomplete product content`);
  for (const section of ['product-overview','specification','sheet-metal-fabrication','fabrication-advantages','fabrication-technology','quality','request-quotation']) {
    assert(body.includes(`id="${section}"`), `${product.slug}: missing ${section}`);
  }
  const html = await readFile(join(root, 'dist/products', `${product.slug}.html`), 'utf8');
  const canonical = `https://realjetech.com/products/${product.slug}.html`;
  assert(html.includes(`<link rel="canonical" href="${canonical}"`), `${product.slug}: canonical`);
  assert(sitemap.includes(`<loc>${canonical}</loc>`), `${product.slug}: sitemap`);
  assert.equal((html.match(/<h1[ >]/g) || []).length, 1);
  assert(!/starway|starwaymfg|v15cdn|15251708787|Shanghai Starway/i.test(html), `${product.slug}: source brand or external source material leaked into page`);
  assert(html.includes('data-product-conversion'));
  assert(html.includes('data-product-gallery'));
  const related = html.match(/<nav class="latest-product-list" aria-label="Related machinery components">([\s\S]*?)<\/nav>/);
  assert(related, `${product.slug}: related components`);
  assert((related[1].match(/<a /g) || []).length <= 6, `${product.slug}: unbounded related list`);
  for (const image of product.images) {
    assert(image.sourceSha256 && image.review, `${product.slug}: image provenance and review`);
    const path = join(root, 'public', image.published);
    const data = await readFile(path);
    assert.equal(data.toString('ascii',0,4), 'RIFF', `${path}: image file type`);
    assert.equal(data.toString('ascii',8,12), 'WEBP');
    assert((await stat(path)).size < 2 * 1024 * 1024, `${path}: unoptimized image`);
    if (image.width) assert(image.width <= 1400 && image.height <= 1400);
    assert(html.includes(image.published), `${product.slug}: reviewed image not used`);
    imageCount++;
  }
}
for (let page = 1; page <= report.sourcePages; page++) {
  assert.equal(report.products.filter(product => product.cataloguePage === page).length, report.sourceCountsByPage[page - 1], `Missing products from source page ${page}`);
}
console.log(`Validated ${report.products.length} imported source entries across ${report.sourcePages} pages, ${imageCount} selected images, unique copy/metadata and bounded related lists.`);
