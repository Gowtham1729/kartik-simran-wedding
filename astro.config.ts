import { defineConfig } from "astro/config";
import { site } from "./src/config/site";

// Keep site.origin and site.basePath in src/config/site.ts as the single
// deploy config. This file only reads them.
export default defineConfig({
  site: site.origin,
  base: site.basePath,
  trailingSlash: "always",
  compressHTML: true,
  build: {
    inlineStylesheets: "never",
  },
  vite: {
    build: {
      cssCodeSplit: false,
      assetsInlineLimit: 4096,
    },
  },
});
