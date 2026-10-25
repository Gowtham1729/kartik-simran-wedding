import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { site } from "../src/config/site.ts";

const dist = join(process.cwd(), "dist");
const base = site.basePath.replace(/\/$/, "");

if (!base || base === "/") {
  console.log("relativize: base is the domain root, leaving asset URLs absolute");
  process.exit(0);
}

const indexPath = join(dist, "index.html");
const index = readFileSync(indexPath, "utf8");
const rewritten = index
  .replaceAll(`="${base}/`, '="./')
  .replaceAll(`='${base}/`, "='./")
  .replaceAll(`, ${base}/`, ", ./")
  .replaceAll(`,${base}/`, ",./");
writeFileSync(indexPath, rewritten);

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) {
      walk(path);
      continue;
    }
    if (!path.endsWith(".css") && !path.endsWith(".js")) continue;
    const text = readFileSync(path, "utf8");
    const next = text.replaceAll(`${base}/_astro/`, "./");
    if (next !== text) writeFileSync(path, next);
  }
}

walk(dist);
console.log("relativize: index.html assets are relative, 404.html keeps the base path");
