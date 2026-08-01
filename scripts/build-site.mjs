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
  "insights/index.html",
  "admin/index.html",
  "admin/config.yml",
  "sitemap.xml",
  "robots.txt",
  "feed.xml",
  "marketing/precast-beam-factory/en/index.html",
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
const requiredHomepageContent = [
  '<link rel="canonical" href="https://realjetech.com/"',
  'meta name="robots" content="index, follow"',
  'href="/manufacturing/"',
  'href="/marketing/precast-beam-factory/en/"',
  "Custom Machinery Component Manufacturing",
  "Production Lines for Precast Concrete Components",
];
for (const requiredContent of requiredHomepageContent) {
  if (!homepage.includes(requiredContent)) {
    throw new Error(`Homepage validation failed: ${requiredContent}`);
  }
}
if (!manufacturingPage.includes('meta name="robots" content="noindex, follow"')) {
  throw new Error("Manufacturing construction page must remain noindex.");
}
if (!manufacturingPage.includes("data-manufacturing-inquiry")) {
  throw new Error("Manufacturing construction page is missing its enquiry CTA.");
}

await run(process.execPath, ["scripts/validate-site.mjs"]);

console.log("Realjet website build merged successfully into dist/.");
