import { readFile, writeFile, access } from "node:fs/promises";
import { join } from "node:path";
import { createServer } from "vite";
import { createElement } from "react";
import { renderToString } from "react-dom/server";

// Render the same component used by the browser; resolve source images through
// Vite's manifest so the static page uses the actual production asset names.
export async function prerenderContractManufacturing(projectRoot, outputRoot) {
  const server = await createServer({
    root: projectRoot,
    server: { middlewareMode: true, watch: null, hmr: false, ws: false },
    appType: "custom",
  });
  try {
    const { default: App } = await server.ssrLoadModule("/src/pages/contract-manufacturing/App.jsx");
    const manifest = JSON.parse(await readFile(join(outputRoot, ".vite/manifest.json"), "utf8"));
    let markup = renderToString(createElement(App));
    for (const [source, asset] of Object.entries(manifest)) {
      if (!source.startsWith("src/")) continue;
      markup = markup.replaceAll(`"/${source}"`, `"/${asset.file}"`);
    }
    if (/\b(?:src|href)="\/src\//.test(markup)) {
      throw new Error("Contract manufacturing prerender contains unresolved source assets.");
    }
    for (const match of markup.matchAll(/\b(?:src|href)="\/(assets\/[^"?#]+)"/g)) {
      await access(join(outputRoot, match[1]));
    }
    const target = join(outputRoot, "marketing/contract_manufacturing/index.html");
    const html = await readFile(target, "utf8");
    if (!html.includes('<div id="root"></div>')) throw new Error("Missing contract manufacturing render root.");
    await writeFile(target, html.replace('<div id="root"></div>', `<div id="root">${markup}</div>`));
  } finally {
    await server.close();
  }
}
