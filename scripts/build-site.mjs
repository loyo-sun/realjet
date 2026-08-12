import { spawn } from "node:child_process";
import { access, cp, mkdir, readFile, readdir, rm, stat } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const buildRoot = join(projectRoot, ".build");
const finalOutput = join(projectRoot, "dist");

function run(command, args, extraEnv = {}) {
  return new Promise((resolveRun, rejectRun) => {
    const child = spawn(command, args, {
      cwd: projectRoot,
      env: { ...process.env, ...extraEnv },
      stdio: "inherit",
    });
    child.on("error", rejectRun);
    child.on("exit", (code) =>
      code === 0
        ? resolveRun()
        : rejectRun(new Error(`${command} exited with status ${code}`)),
    );
  });
}

async function copyWithoutCollisions(source, target) {
  await mkdir(target, { recursive: true });
  for (const entry of await readdir(source, { withFileTypes: true })) {
    const sourcePath = join(source, entry.name);
    const targetPath = join(target, entry.name);
    if (entry.isDirectory()) {
      await copyWithoutCollisions(sourcePath, targetPath);
      continue;
    }
    try {
      await stat(targetPath);
      throw new Error(`Build output collision: ${targetPath}`);
    } catch (error) {
      if (error.code !== "ENOENT") throw error;
    }
    await mkdir(dirname(targetPath), { recursive: true });
    await cp(sourcePath, targetPath);
  }
}

async function readHomepageRecommendations(directory) {
  const entries = await readdir(join(projectRoot, directory));
  const items = [];

  for (const entry of entries.filter((name) => name.endsWith(".md"))) {
    const source = await readFile(join(projectRoot, directory, entry), "utf8");
    const readField = (name) => {
      const match = source.match(new RegExp(`^${name}:\\s*(.+)$`, "m"));
      return match?.[1]?.trim().replace(/^(["'])(.*)\1$/, "$2") || "";
    };

    items.push({
      title: readField("title"),
      slug: readField("slug"),
      featured: /^featured:\s*true\s*$/m.test(source),
      draft: /^draft:\s*true\s*$/m.test(source),
      date: readField("date"),
      order: Number(readField("order") || 999),
      productSeries: readField("productSeries"),
    });
  }

  return items;
}

await rm(buildRoot, { recursive: true, force: true });
await rm(finalOutput, { recursive: true, force: true });

await run(process.execPath, ["node_modules/vite/bin/vite.js", "build"]);
await run(
  process.execPath,
  ["node_modules/@11ty/eleventy/cmd.cjs", "--config=eleventy.config.js"],
  { ELEVENTY_ENV: "production" },
);

await copyWithoutCollisions(join(buildRoot, "vite"), finalOutput);
await copyWithoutCollisions(join(buildRoot, "eleventy"), finalOutput);

for (const expectedPath of [
  "index.html",
  "manufacturing/index.html",
  "contact/index.html",
  "insights/index.html",
  "products/index.html",
  "precast-concrete-molds/index.html",
  "precast-concrete-molds/bridge-transportation-moulds/index.html",
  "precast-concrete-molds/building-component-moulds/index.html",
  "precast-concrete-molds/tunnel-underground-moulds/index.html",
  "precast-concrete-molds/municipal-infrastructure-moulds/index.html",
  "precast-concrete-molds/beam-and-girder-moulds/index.html",
  "admin/index.html",
  "admin/config.yml",
  "admin/config.zh.yml",
  "sitemap.xml",
  "robots.txt",
  "feed.xml",
  "marketing/precast-beam-factory/en/index.html",
  "marketing/contract_manufacturing/index.html",
  "marketing/precast-beam-factory/id/index.html",
  "marketing/precast-beam-factory/ar/index.html",
  "marketing/precast-beam-factory/ru/index.html",
  "marketing/precast-beam-factory/cn/index.html",
  "marketing/precast-beam-factory/fr/index.html",
  "marketing/precast-beam-factory/es/index.html",
  "marketing/privacy/en/index.html",
]) {
  await access(join(finalOutput, expectedPath));
}

const homepage = await readFile(join(finalOutput, "index.html"), "utf8");
const adminPage = await readFile(join(finalOutput, "admin/index.html"), "utf8");
const chineseAdminConfig = await readFile(
  join(finalOutput, "admin/config.zh.yml"),
  "utf8",
);
const manufacturingPage = await readFile(
  join(finalOutput, "manufacturing/index.html"),
  "utf8",
);
const contactPage = await readFile(join(finalOutput, "contact/index.html"), "utf8");
const productsPage = await readFile(join(finalOutput, "products/index.html"), "utf8");
const precastMouldsPage = await readFile(
  join(finalOutput, "precast-concrete-molds/index.html"),
  "utf8",
);
const bridgeMouldsCategoryPage = await readFile(
  join(finalOutput, "precast-concrete-molds/bridge-transportation-moulds/index.html"),
  "utf8",
);
const beamMouldProductPage = await readFile(
  join(finalOutput, "precast-concrete-molds/beam-and-girder-moulds/index.html"),
  "utf8",
);
const insightPage = await readFile(
  join(
    finalOutput,
    "insights/precast-concrete-production-line-layout-rfq-checklist/index.html",
  ),
  "utf8",
);
const contractManufacturingPage = await readFile(
  join(finalOutput, "marketing/contract_manufacturing/index.html"),
  "utf8",
);
const sitemap = await readFile(join(finalOutput, "sitemap.xml"), "utf8");
const requiredHomepageContent = [
  '<link rel="canonical" href="https://realjetech.com/"',
  'meta name="robots" content="index, follow"',
  'href="/marketing/contract_manufacturing/"',
  'href="/marketing/precast-beam-factory/en/"',
  "Custom Machinery Component Manufacturing",
  "Production Lines for Precast Concrete Components",
  'href="/products/"',
  '<a href="/">Home</a>',
];
for (const requiredAdminContent of [
  'configLink.rel = "cms-config-url"',
  '"/admin/config.zh.yml"',
  "mountLanguageSwitcher",
  "cmsHeader.appendChild(languageSwitcher)",
]) {
  if (!adminPage.includes(requiredAdminContent)) {
    throw new Error(`Admin localization validation failed: ${requiredAdminContent}`);
  }
}
if (/\.admin-language-switcher\s*\{[^}]*position:\s*fixed/s.test(adminPage)) {
  throw new Error("Admin language switcher must remain inside the CMS header flow.");
}
for (const requiredChineseLabel of [
  "label: 产品",
  "label: 标题",
  "label: 首页推荐",
  "label: 产品详细介绍",
  "label: 文章",
  "label: SEO 描述",
  "label: 正文",
]) {
  if (!chineseAdminConfig.includes(requiredChineseLabel)) {
    throw new Error(`Chinese admin config validation failed: ${requiredChineseLabel}`);
  }
}
for (const requiredContent of requiredHomepageContent) {
  if (!homepage.includes(requiredContent)) {
    throw new Error(`Homepage validation failed: ${requiredContent}`);
  }
}
const productRecommendations = await readHomepageRecommendations("content/products");
const catalogueProductRecommendations = productRecommendations.filter(
  (item) => item.productSeries !== "precast-concrete-moulds",
);
const insightRecommendations = await readHomepageRecommendations("content/insights");
const visibleProductTitles = catalogueProductRecommendations
  .filter((item) => item.featured)
  .sort((a, b) => a.order - b.order)
  .slice(0, 4)
  .map((item) => item.title);
const visibleInsightTitles = insightRecommendations
  .filter((item) => item.featured)
  .sort((a, b) => new Date(b.date) - new Date(a.date))
  .slice(0, 3)
  .map((item) => item.title);

for (const title of [...visibleProductTitles, ...visibleInsightTitles]) {
  if (!homepage.includes(title)) {
    throw new Error(`Homepage is missing recommended content: ${title}`);
  }
}
for (const item of [...catalogueProductRecommendations, ...insightRecommendations]) {
  if (!item.featured && homepage.includes(item.title)) {
    throw new Error(`Homepage contains non-recommended content: ${item.title}`);
  }
}
if (visibleProductTitles.length === 0 && homepage.includes("Featured Products")) {
  throw new Error("Homepage product section must be hidden without recommendations.");
}
if (visibleInsightTitles.length === 0 && homepage.includes("Latest Insights")) {
  throw new Error("Homepage insight section must be hidden without recommendations.");
}
for (const product of catalogueProductRecommendations.filter((item) => !item.draft)) {
  const productPath = `products/${product.slug}.html`;
  await access(join(finalOutput, productPath));

  const productDetailPage = await readFile(join(finalOutput, productPath), "utf8");
  for (const requiredProductDetailContent of [
    product.title,
    "data-product-gallery",
    "product-detail-content-layout",
    "data-universal-enquiry",
    'name="universal-enquiry"',
    'name="keyword"',
    "Contract Manufacturing",
    "Precast Concrete Production Lines",
  ]) {
    if (!productDetailPage.includes(requiredProductDetailContent)) {
      throw new Error(
        `Product detail validation failed: ${requiredProductDetailContent}`,
      );
    }
  }
  for (const retiredProductFormContent of ['name="product-inquiry"', "data-product-inquiry-form", "/inquiry/"]) {
    if (productDetailPage.includes(retiredProductFormContent)) {
      throw new Error(`Product detail retains retired enquiry content: ${retiredProductFormContent}`);
    }
  }
}
for (const requiredInsightContent of [
  "Latest News",
  "latest-news-list",
  "Precast Concrete Production Line Commissioning Checklist",
  "Contract Manufacturing",
  "Precast Concrete Production Lines",
]) {
  if (!insightPage.includes(requiredInsightContent)) {
    throw new Error(`Insight detail validation failed: ${requiredInsightContent}`);
  }
}
if (insightPage.includes("Choose Your Project Path")) {
  throw new Error("Insight sidebar must only contain the latest-news module.");
}
const requiredProductsPageContents = [
  catalogueProductRecommendations.length
    ? "Latest Products"
    : "Product catalogue is being updated.",
  "Contract Manufacturing",
  "Precast Concrete Production Lines",
];
for (const requiredProductsPageContent of requiredProductsPageContents) {
  if (!productsPage.includes(requiredProductsPageContent)) {
    throw new Error(`Products page validation failed: ${requiredProductsPageContent}`);
  }
}
for (const requiredMouldsPageContent of [
  '<link rel="canonical" href="https://realjetech.com/precast-concrete-molds/"',
  'meta name="robots" content="index, follow"',
  "Precast Concrete Moulds &amp; Formwork",
  "Bridge &amp; Transportation Moulds",
  "Building Component Moulds",
  "Tunnel &amp; Underground Moulds",
  "Municipal &amp; Infrastructure Moulds",
  'name="universal-enquiry"',
  'name="name"',
  'name="email"',
  'name="message"',
  'name="keyword"',
  "data-universal-enquiry",
  "data-mould-category",
  "14 Precast Mould Systems",
]) {
  if (!precastMouldsPage.includes(requiredMouldsPageContent)) {
    throw new Error(`Precast moulds page validation failed: ${requiredMouldsPageContent}`);
  }
}
const mouldProductCardCount = (precastMouldsPage.match(/class="mould-product-card"/g) || []).length;
if (mouldProductCardCount !== 14) {
  throw new Error(`Precast moulds page must contain exactly 14 product cards; found ${mouldProductCardCount}.`);
}
const mouldScenarioCount = (precastMouldsPage.match(/data-mould-category=/g) || []).length;
if (mouldScenarioCount !== 4) {
  throw new Error(`Precast moulds hero must contain exactly four application scenarios; found ${mouldScenarioCount}.`);
}
for (const removedCatalogueLabel of ["Browse the complete 16-product mould range.", "View by Application Scenario", "View product", "View category", "Custom Precast Moulds"]) {
  if (precastMouldsPage.includes(removedCatalogueLabel)) {
    throw new Error(`Precast moulds page retains removed catalogue label: ${removedCatalogueLabel}`);
  }
}
for (const requiredBridgeCategoryContent of [
  "Bridge &amp; Transportation Moulds",
  "Beam and Girder Moulds",
  "Box Girder Moulds",
  "Segmental Bridge Moulds",
]) {
  if (!bridgeMouldsCategoryPage.includes(requiredBridgeCategoryContent)) {
    throw new Error(`Bridge mould category validation failed: ${requiredBridgeCategoryContent}`);
  }
}
for (const requiredMouldProductContent of [
  "Beam and Girder Moulds",
  "Production scenarios and design basis",
  "Product performance and engineering features",
  "Required project inputs",
  "About Realjet",
  "data-product-gallery",
  "data-universal-enquiry",
  'name="universal-enquiry"',
]) {
  if (!beamMouldProductPage.includes(requiredMouldProductContent)) {
    throw new Error(`Precast mould product validation failed: ${requiredMouldProductContent}`);
  }
}
for (const mouldPage of [precastMouldsPage, bridgeMouldsCategoryPage, beamMouldProductPage]) {
  if (!mouldPage.includes('meta name="robots" content="index, follow"')) {
    throw new Error("Precast mould pages must remain crawlable with index, follow.");
  }
}
const landingProductActionCount = (precastMouldsPage.match(/class="mould-product-actions"/g) || []).length;
if (landingProductActionCount !== 14) {
  throw new Error(`Each landing-page product must have an action group; found ${landingProductActionCount}.`);
}
const bridgeProductActionCount = (bridgeMouldsCategoryPage.match(/class="mould-product-actions"/g) || []).length;
if (bridgeProductActionCount !== 3) {
  throw new Error(`Bridge category must have three product action groups; found ${bridgeProductActionCount}.`);
}
if (!manufacturingPage.includes('meta name="robots" content="noindex, follow"')) {
  throw new Error("Manufacturing construction page must remain noindex.");
}
if (!manufacturingPage.includes("data-manufacturing-inquiry")) {
  throw new Error("Manufacturing construction page is missing its enquiry CTA.");
}
for (const requiredContent of [
  '<link rel="canonical" href="https://realjetech.com/marketing/contract_manufacturing/"',
  'meta name="robots" content="index, follow"',
  "Custom Machinery Component Manufacturing",
  'name="universal-enquiry"',
  'name="name"',
  'name="email"',
  'name="message"',
]) {
  if (!contractManufacturingPage.includes(requiredContent)) {
    throw new Error(`Contract manufacturing page validation failed: ${requiredContent}`);
  }
}
for (const requiredContactContent of [
  'name="universal-enquiry"',
  'name="name"',
  'name="email"',
  'name="message"',
  'name="keyword"',
  "data-contact-form",
  "data-contact-submit",
]) {
  if (!contactPage.includes(requiredContactContent)) {
    throw new Error(`Contact page validation failed: ${requiredContactContent}`);
  }
}

for (const requiredSitemapUrl of [
  "https://realjetech.com/",
  "https://realjetech.com/contact/",
  "https://realjetech.com/insights/",
  "https://realjetech.com/products/",
  "https://realjetech.com/marketing/contract_manufacturing/",
  "https://realjetech.com/marketing/precast-beam-factory/en/",
  "https://realjetech.com/marketing/precast-beam-factory/id/",
  "https://realjetech.com/marketing/precast-beam-factory/ar/",
  "https://realjetech.com/marketing/precast-beam-factory/ru/",
  "https://realjetech.com/marketing/precast-beam-factory/cn/",
  "https://realjetech.com/marketing/precast-beam-factory/fr/",
  "https://realjetech.com/marketing/precast-beam-factory/es/",
  "https://realjetech.com/marketing/privacy/en/",
  "https://realjetech.com/marketing/privacy/id/",
  "https://realjetech.com/marketing/privacy/ar/",
  "https://realjetech.com/marketing/privacy/ru/",
  "https://realjetech.com/marketing/privacy/cn/",
  "https://realjetech.com/marketing/privacy/fr/",
  "https://realjetech.com/marketing/privacy/es/",
]) {
  if (!sitemap.includes(`<loc>${requiredSitemapUrl}</loc>`)) {
    throw new Error(`Sitemap validation failed: ${requiredSitemapUrl}`);
  }
}
for (const excludedSitemapUrl of [
  "https://realjetech.com/admin/",
  "https://realjetech.com/manufacturing/",
  "https://realjetech.com/inquiry/intelligent-precast-beam-production-line.html",
  "https://realjetech.com/precast-concrete-molds/",
]) {
  if (sitemap.includes(excludedSitemapUrl)) {
    throw new Error(`Sitemap contains excluded URL or URL prefix: ${excludedSitemapUrl}`);
  }
}
for (const product of catalogueProductRecommendations.filter((item) => !item.draft)) {
  const productUrl = `https://realjetech.com/products/${product.slug}.html`;
  if (!sitemap.includes(`<loc>${productUrl}</loc>`)) {
    throw new Error(`Sitemap validation failed: ${productUrl}`);
  }
}

await run(process.execPath, ["scripts/validate-site.mjs"]);

console.log("Realjet website build merged successfully into dist/.");
