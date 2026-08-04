import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "node:path";

export default defineConfig({
  base: "./",
  publicDir: false,
  plugins: [react(), tailwindcss()],
  build: {
    outDir: ".build/vite",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        "contract-manufacturing": resolve(
          process.cwd(),
          "marketing/contract_manufacturing/index.html",
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
