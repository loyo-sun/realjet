import { access, readFile, readdir } from "node:fs/promises";
import { dirname, extname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { load as loadYaml } from "js-yaml";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const outputRoot = join(projectRoot, "dist");
const failures = [];

const cmsConfig = loadYaml(
  await readFile(join(projectRoot, "public/admin/config.yml"), "utf8"),
);
for (const collection of cmsConfig.collections || []) {
  if (collection.sortable_fields && !Array.isArray(collection.sortable_fields)) {
    failures.push(
      `CMS collection ${collection.name}: sortable_fields must be an array`,
    );
  }
}

async function walk(directory) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const fullPath = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(fullPath)));
    else files.push(fullPath);
  }
  return files;
}

async function exists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

function resolveOutputReference(reference, htmlPath) {
  const clean = reference.split("#")[0].split("?")[0];
  if (!clean) return null;
  const base = clean.startsWith("/")
    ? join(outputRoot, clean)
    : resolve(dirname(htmlPath), clean);
  if (extname(base)) return base;
  return clean.endsWith("/") ? join(base, "index.html") : base;
}

const htmlFiles = (await walk(outputRoot)).filter((file) => file.endsWith(".html"));
function validateStructuredData(value, path) {
  if (!value || typeof value !== "object") return;
  const types = [].concat(value["@type"] || []);
  if (types.includes("Product") && !["offers", "review", "aggregateRating"].some((key) => value[key])) {
    failures.push(`${path}: Product requires offers, review or aggregateRating for Google product snippets`);
  }
  for (const child of Object.values(value)) validateStructuredData(child, path);
}

for (const htmlPath of htmlFiles) {
  const html = await readFile(htmlPath, "utf8");
  const relativePath = htmlPath.slice(outputRoot.length + 1);
  for (const match of html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
    try {
      validateStructuredData(JSON.parse(match[1]), relativePath);
    } catch (error) {
      failures.push(`${relativePath}: invalid JSON-LD: ${error.message}`);
    }
  }
  const ids = [...html.matchAll(/\sid=["']([^"']+)["']/g)].map((match) => match[1]);
  const duplicateIds = ids.filter((id, index) => ids.indexOf(id) !== index);
  if (duplicateIds.length) failures.push(`${relativePath}: duplicate IDs ${[...new Set(duplicateIds)].join(", ")}`);

  for (const match of html.matchAll(/<img\b[^>]*>/gi)) {
    if (!/\salt=["'][^"']*["']/i.test(match[0])) {
      failures.push(`${relativePath}: image without alt attribute`);
    }
  }

  for (const match of html.matchAll(/\s(?:href|src)=["']([^"']+)["']/gi)) {
    const reference = match[1];
    if (/^(?:https?:|mailto:|tel:|data:|javascript:|#)/i.test(reference)) continue;
    const target = resolveOutputReference(reference, htmlPath);
    if (target && !(await exists(target))) {
      failures.push(`${relativePath}: missing internal reference ${reference}`);
    }
  }
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log(`Validated ${htmlFiles.length} generated HTML files.`);
