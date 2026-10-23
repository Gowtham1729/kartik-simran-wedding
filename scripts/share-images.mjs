import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import { wedding } from "../src/config/wedding.ts";
import { formatParts, namesLine } from "../src/lib/format.ts";

const root = process.cwd();
const fontsDir = join(root, "scripts/fonts");
const paper = "#efe7d8";
const ink = "#1c1612";
const soft = "#51473f";
const red = "#c43822";
const redInk = "#8d2a18";

const fonts = [
  { name: "Brygada", data: readFileSync(join(fontsDir, "brygada-1918-italic.ttf")), weight: 500, style: "italic" },
  { name: "Brygada", data: readFileSync(join(fontsDir, "brygada-1918-roman.ttf")), weight: 600, style: "normal" },
  { name: "Newsreader", data: readFileSync(join(fontsDir, "newsreader-italic.ttf")), weight: 400, style: "italic" },
  { name: "Newsreader", data: readFileSync(join(fontsDir, "newsreader-roman.ttf")), weight: 400, style: "normal" },
  { name: "Azeret", data: readFileSync(join(fontsDir, "azeret-mono.ttf")), weight: 400, style: "normal" },
];

function node(type, style, children, extra = {}) {
  return { type, props: { style, children, ...extra } };
}

const parts = wedding.date ? formatParts(wedding.date) : null;
const place = wedding.city.trim() || "India";

const card = node(
  "div",
  {
    width: "1200px",
    height: "630px",
    display: "flex",
    background: paper,
    color: ink,
    position: "relative",
  },
  [
    node("div", { position: "absolute", left: "0px", top: "0px", bottom: "0px", width: "4px", background: ink, display: "flex" }, ""),
    node("div", { position: "absolute", left: "14px", top: "22px", bottom: "0px", width: "4px", background: red, display: "flex" }, ""),
    node(
      "div",
      {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "100%",
        height: "100%",
        padding: "58px 72px 56px 78px",
      },
      [
        node(
          "div",
          { display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" },
          [
            node("div", { display: "flex", fontFamily: "Newsreader", fontStyle: "italic", fontSize: "28px", color: soft }, "Save the date"),
            node("div", { display: "flex", fontFamily: "Azeret", fontSize: "20px", letterSpacing: "0.14em", color: ink }, parts ? `${parts.day.padStart(2, "0")}.${wedding.date.slice(5, 7)}.${parts.year.slice(2)}` : ""),
          ]
        ),
        node(
          "div",
          { display: "flex", justifyContent: "space-between", alignItems: "flex-end", width: "100%" },
          [
            node("div", { display: "flex", flexDirection: "column" }, [
              node("div", { display: "flex", fontFamily: "Brygada", fontStyle: "italic", fontWeight: 500, fontSize: "118px", lineHeight: 0.82, letterSpacing: "-0.03em" }, wedding.partnerOne),
              node("div", { display: "flex", fontFamily: "Newsreader", fontStyle: "italic", fontSize: "36px", color: redInk, marginTop: "22px", marginBottom: "6px", marginLeft: "16px" }, "and"),
              node("div", { display: "flex", fontFamily: "Brygada", fontStyle: "italic", fontWeight: 500, fontSize: "118px", lineHeight: 0.82, letterSpacing: "-0.03em" }, wedding.partnerTwo),
            ]),
            parts
              ? node("div", { display: "flex", flexDirection: "column", alignItems: "flex-end" }, [
                  node("div", { display: "flex", fontFamily: "Azeret", fontSize: "18px", letterSpacing: "0.16em", color: soft }, parts.weekdayShort),
                  node("div", { display: "flex", position: "relative" }, [
                    node("div", { display: "flex", position: "absolute", left: "14px", top: "12px", fontFamily: "Brygada", fontWeight: 600, fontSize: "168px", lineHeight: 0.78, letterSpacing: "-0.04em", color: red }, parts.day),
                    node("div", { display: "flex", fontFamily: "Brygada", fontWeight: 600, fontSize: "168px", lineHeight: 0.78, letterSpacing: "-0.04em" }, parts.day),
                  ]),
                  node("div", { display: "flex", fontFamily: "Azeret", fontSize: "18px", letterSpacing: "0.16em", color: soft }, `${parts.monthShort} ${parts.year}`),
                ])
              : null,
          ]
        ),
        node("div", { display: "flex", fontFamily: "Newsreader", fontStyle: "italic", fontSize: "28px", color: soft }, place),
      ]
    ),
  ]
);

const svg = await satori(card, { width: 1200, height: 630, fonts });
const png = new Resvg(svg, {
  fitTo: { mode: "width", value: 1200 },
  background: paper,
}).render().asPng();

const iconSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
  <rect width="32" height="32" fill="${paper}"/>
  <g fill="none" stroke="${ink}" stroke-width="1.5" stroke-linecap="square">
    <circle cx="13.5" cy="13.5" r="8"/>
    <path d="M13.5 2.2v5.2M13.5 19.6v6.2M2.2 13.5h5.2M19.6 13.5h6.2"/>
  </g>
  <rect x="16.4" y="16.4" width="6.6" height="6.6" fill="${red}"/>
</svg>`;

function raster(svgText, size) {
  return new Resvg(svgText, {
    fitTo: { mode: "width", value: size },
    background: paper,
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
