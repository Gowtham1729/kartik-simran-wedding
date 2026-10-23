/**
 * Where the site is published.
 *
 * GitHub Pages project URL:
 *   origin https://gowtham1729.github.io
 *   basePath /kartik-simran-wedding
 *
 * When a custom domain is ready, set origin to https://the-domain and
 * basePath to "/". Add public/CNAME. See README.
 */
export const site = {
  origin: "https://gowtham1729.github.io",
  basePath: "/kartik-simran-wedding",
};

export function pageUrl(path = ""): string {
  const origin = site.origin.replace(/\/$/, "");
  const base =
    site.basePath === "/" || site.basePath === ""
      ? ""
      : site.basePath.replace(/\/$/, "");
  const extra = path.replace(/^\//, "");
  if (!extra) return `${origin}${base}/`;
  return `${origin}${base}/${extra}`;
}
