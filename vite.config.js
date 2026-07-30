import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "node:path";

export default defineConfig({
  base: "./",
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        home: resolve(process.cwd(), "index.html"),
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
        "privacy-en": resolve(
          process.cwd(),
          "marketing/privacy/en/index.html",
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
      },
    },
  },
});
