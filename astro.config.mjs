import { defineConfig } from "astro/config";
import { readFileSync } from "node:fs";

const siteConfig = JSON.parse(
  readFileSync(new URL("./site.config.json", import.meta.url), "utf8")
);

function prefixUploadPaths(base) {
  const prefix = `${base.replace(/^\/+|\/+$/g, "")}/`;
  const uploadPath = `/${prefix === "/" ? "" : prefix}uploads/`;

  return () => (tree) => {
    const visit = (node) => {
      if (node.type === "raw" && typeof node.value === "string") {
        node.value = node.value.replace(
          /\b(src|href)=(["'])\/uploads\//g,
          `$1=$2${uploadPath}`
        );
      }
      if (node.type === "element" && node.properties) {
        for (const name of ["src", "href"]) {
          const value = node.properties[name];
          if (typeof value === "string" && value.startsWith("/uploads/")) {
            node.properties[name] = `${uploadPath}${value.slice(9)}`;
          }
        }
      }
      node.children?.forEach(visit);
    };
    visit(tree);
  };
}

const deploymentUrl = new URL(siteConfig.url);
const base = process.env.BASE_PATH ?? deploymentUrl.pathname;

export default defineConfig({
  site: process.env.SITE ?? deploymentUrl.origin,
  base,
  trailingSlash: "never",
  markdown: {
    rehypePlugins: [prefixUploadPaths(base)],
    shikiConfig: {
      theme: "github-dark"
    }
  }
});
