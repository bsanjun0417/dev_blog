import { defineConfig } from "astro/config";

export default defineConfig({
  site: process.env.SITE ?? "https://blog.san2blog.com",
  base: process.env.BASE_PATH ?? "/",
  trailingSlash: "never",
  markdown: {
    shikiConfig: {
      theme: "github-dark"
    }
  }
});
