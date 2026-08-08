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
  "products/intelligent-precast-beam-production-line.html",
  "inquiry/intelligent-precast-beam-production-line.html",
  "admin/index.html",
  "admin/config.yml",
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
const manufacturingPage = await readFile(
  join(finalOutput, "manufacturing/index.html"),
  "utf8",
);
const contactPage = await readFile(join(finalOutput, "contact/index.html"), "utf8");
const productsPage = await readFile(join(finalOutput, "products/index.html"), "utf8");
const productPage = await readFile(
  join(finalOutput, "products/intelligent-precast-beam-production-line.html"),
  "utf8",
);
const productInquiryPage = await readFile(
  join(finalOutput, "inquiry/intelligent-precast-beam-production-line.html"),
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
  "Featured Products",
];
for (const requiredContent of requiredHomepageContent) {
  if (!homepage.includes(requiredContent)) {
    throw new Error(`Homepage validation failed: ${requiredContent}`);
  }
}
for (const requiredProductContent of [
  "Intelligent Precast Beam Production Line",
  "Latest Products",
  "Contract Manufacturing",
  "Precast Concrete Production Lines",
]) {
  if (!productsPage.includes(requiredProductContent)) {
    throw new Error(`Products page validation failed: ${requiredProductContent}`);
  }
  if (!productPage.includes(requiredProductContent)) {
    throw new Error(`Product detail validation failed: ${requiredProductContent}`);
  }
}
for (const requiredProductDetailContent of [
  "data-product-gallery",
  "data-product-gallery-thumb",
  "product-detail-content-layout",
  'href="/inquiry/intelligent-precast-beam-production-line.html"',
  "data-product-inquiry-link",
]) {
  if (!productPage.includes(requiredProductDetailContent)) {
    throw new Error(`Product detail validation failed: ${requiredProductDetailContent}`);
  }
}
for (const requiredInquiryContent of [
  'meta name="robots" content="noindex, follow"',
  'name="product-inquiry"',
  'name="product_slug"',
  'name="message"',
  'name="email"',
  "data-product-inquiry-form",
  "data-product-inquiry-success",
  "Enquiry Sent Successfully",
]) {
  if (!productInquiryPage.includes(requiredInquiryContent)) {
    throw new Error(`Product inquiry validation failed: ${requiredInquiryContent}`);
  }
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
]) {
  if (!contractManufacturingPage.includes(requiredContent)) {
    throw new Error(`Contract manufacturing page validation failed: ${requiredContent}`);
  }
}
for (const requiredContactContent of [
  'name="precast-beam-factory-inquiry"',
  'name="inquiry_topic"',
  'name="privacy_acknowledgement"',
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
  "https://realjetech.com/products/intelligent-precast-beam-production-line.html",
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
]) {
  if (sitemap.includes(`<loc>${excludedSitemapUrl}</loc>`)) {
    throw new Error(`Sitemap contains noindex URL: ${excludedSitemapUrl}`);
  }
}

await run(process.execPath, ["scripts/validate-site.mjs"]);

console.log("Realjet website build merged successfully into dist/.");
