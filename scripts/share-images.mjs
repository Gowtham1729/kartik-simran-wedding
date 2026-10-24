import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import { wedding } from "../src/config/wedding.ts";
import { formatLongDate, namesLine } from "../src/lib/format.ts";

const root = process.cwd();
const fontsDir = join(root, "scripts/fonts");
const ivory = "#F7F1E6";
const green = "#123D2F";
const gold = "#B08A3E";

const fonts = [
  { name: "Instrument Serif", data: readFileSync(join(fontsDir, "instrument-serif.ttf")), weight: 400, style: "normal" },
  { name: "Instrument Serif", data: readFileSync(join(fontsDir, "instrument-serif-italic.ttf")), weight: 400, style: "italic" },
  { name: "Manrope", data: readFileSync(join(fontsDir, "manrope-400.ttf")), weight: 400, style: "normal" },
  { name: "Manrope", data: readFileSync(join(fontsDir, "manrope-500.ttf")), weight: 500, style: "normal" },
];

function node(type, style, children, extra = {}) {
  return { type, props: { style, children, ...extra } };
}

const when = wedding.date ? formatLongDate(wedding.date) : "Date to be announced";
const place = wedding.city.trim() || "City to be announced";

const arch = {
  type: "svg",
  props: {
    width: 280,
    height: 358,
    viewBox: "0 0 100 128",
    xmlns: "http://www.w3.org/2000/svg",
    children: {
      type: "path",
      props: {
        d: "M14 128 L14 62 C14 36 32 16 50 6 C68 16 86 36 86 62 L86 128",
        fill: "none",
        stroke: gold,
        "stroke-width": 1.25,
      },
    },
  },
};

const card = node(
  "div",
  {
    width: "1200px",
    height: "630px",
    display: "flex",
    background: ivory,
    color: green,
  },
  [
    node(
      "div",
      {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "760px",
        height: "630px",
        padding: "64px 40px 64px 72px",
      },
      [
        node(
          "div",
          {
            display: "flex",
            fontFamily: "Manrope",
            fontWeight: 500,
            fontSize: "18px",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
          },
          "The wedding of"
        ),
        node("div", { display: "flex", flexDirection: "column" }, [
          node(
            "div",
            { display: "flex", fontFamily: "Instrument Serif", fontWeight: 400, fontSize: "92px", lineHeight: 0.86, letterSpacing: "-0.03em" },
            wedding.partnerOne
          ),
          node(
            "div",
            { display: "flex", fontFamily: "Instrument Serif", fontStyle: "italic", fontWeight: 400, fontSize: "36px", marginTop: "8px", marginBottom: "6px" },
            "and"
          ),
          node(
            "div",
            { display: "flex", fontFamily: "Instrument Serif", fontWeight: 400, fontSize: "92px", lineHeight: 0.86, letterSpacing: "-0.03em" },
            wedding.partnerTwo
          ),
        ]),
        node("div", { display: "flex", flexDirection: "column", gap: "10px" }, [
          node("div", { width: "72px", height: "1px", background: gold, display: "flex" }, ""),
          node(
            "div",
            { display: "flex", fontFamily: "Manrope", fontWeight: 500, fontSize: "18px", letterSpacing: "0.14em", textTransform: "uppercase" },
            when
          ),
          node(
            "div",
            { display: "flex", fontFamily: "Manrope", fontWeight: 500, fontSize: "18px", letterSpacing: "0.16em", textTransform: "uppercase" },
            place
          ),
        ]),
      ]
    ),
    node(
      "div",
      { display: "flex", alignItems: "flex-end", justifyContent: "flex-end", width: "440px", height: "630px", padding: "48px 56px 0 0" },
      [arch]
    ),
  ]
);

const svg = await satori(card, { width: 1200, height: 630, fonts });
const png = new Resvg(svg, {
  fitTo: { mode: "width", value: 1200 },
  background: ivory,
}).render().asPng();

const iconSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
  <rect width="32" height="32" fill="${ivory}"/>
  <path d="M8 28 V16.5 C8 10.5 12 6.2 16 4.2 C20 6.2 24 10.5 24 16.5 V28" fill="none" stroke="${green}" stroke-width="1.4"/>
</svg>`;

function raster(svgText, size) {
  return new Resvg(svgText, {
    fitTo: { mode: "width", value: size },
    background: ivory,
  }).render().asPng();
}

const outputs = [
  ["og.png", png],
  ["favicon-32.png", raster(iconSvg, 32)],
  ["apple-touch-icon.png", raster(iconSvg, 180)],
];

for (const dir of [join(root, "dist"), join(root, "public")]) {
  mkdirSync(dir, { recursive: true });
  for (const [name, bytes] of outputs) {
    writeFileSync(join(dir, name), bytes);
  }
}

console.log(`share-images: wrote og.png for ${namesLine(wedding)}`);
