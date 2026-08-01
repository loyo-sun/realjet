import { access, readFile, readdir } from "node:fs/promises";
import { dirname, extname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const outputRoot = join(projectRoot, "dist");
const failures = [];

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
for (const htmlPath of htmlFiles) {
  const html = await readFile(htmlPath, "utf8");
  const relativePath = htmlPath.slice(outputRoot.length + 1);
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
