import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "node:path";

const consentModeDefaults = {
  name: "realjet-consent-mode-defaults",
  transformIndexHtml: {
    order: "pre",
    handler() {
      return [{
        tag: "script",
        children: `window.dataLayer=window.dataLayer||[];window.gtag=window.gtag||function(){window.dataLayer.push(arguments)};window.gtag("consent","default",{analytics_storage:"denied",ad_storage:"denied",ad_user_data:"denied",ad_personalization:"denied",wait_for_update:500});`,
        injectTo: "head-prepend",
      }];
    },
  },
};

export default defineConfig({
  base: "./",
  publicDir: false,
  plugins: [consentModeDefaults, react(), tailwindcss()],
  build: {
    outDir: ".build/vite",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        "contract-manufacturing": resolve(
          process.cwd(),
          "marketing/contract_manufacturing/index.html",
        ),
        "spun-pipe-piles-production-line": resolve(
          process.cwd(),
          "marketing/spun-pipe-piles-production-ine/index.html",
        ),
        "precast-beam-factory-cn": resolve(
          process.cwd(),
          "marketing/precast-beam-factory/cn/index.html",
        ),
        "precast-beam-factory-en": resolve(
          process.cwd(),
          "marketing/precast-beam-factory/en/index.html",
        ),
        "precast-beam-factory-id": resolve(
          process.cwd(),
          "marketing/precast-beam-factory/id/index.html",
        ),
        "precast-beam-factory-ar": resolve(
          process.cwd(),
          "marketing/precast-beam-factory/ar/index.html",
        ),
        "precast-beam-factory-es": resolve(
          process.cwd(),
          "marketing/precast-beam-factory/es/index.html",
        ),
        "precast-beam-factory-fr": resolve(
          process.cwd(),
          "marketing/precast-beam-factory/fr/index.html",
        ),
        "precast-beam-factory-ru": resolve(
          process.cwd(),
          "marketing/precast-beam-factory/ru/index.html",
        ),
        "privacy-en": resolve(
          process.cwd(),
          "marketing/privacy/en/index.html",
        ),
        "privacy-cn": resolve(
          process.cwd(),
          "marketing/privacy/cn/index.html",
        ),
        "privacy-id": resolve(
          process.cwd(),
          "marketing/privacy/id/index.html",
        ),
        "privacy-ar": resolve(
          process.cwd(),
          "marketing/privacy/ar/index.html",
        ),
        "privacy-es": resolve(
          process.cwd(),
          "marketing/privacy/es/index.html",
        ),
        "privacy-fr": resolve(
          process.cwd(),
          "marketing/privacy/fr/index.html",
        ),
        "privacy-ru": resolve(
          process.cwd(),
          "marketing/privacy/ru/index.html",
        ),
      },
    },
  },
});
