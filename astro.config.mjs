// astro.config.mjs
import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  adapter: vercel(),
  integrations: [tailwind()],
  vite: {
    ssr: {
      external: ["chrome-aws-lambda", "puppeteer-core"],
    },
  },
});
