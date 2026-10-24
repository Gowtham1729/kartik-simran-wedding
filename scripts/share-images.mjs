import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import { wedding } from "../src/config/wedding.ts";
import { formatParts, namesLine } from "../src/lib/format.ts";

const root = process.cwd();
const fontsDir = join(root, "scripts/fonts");
const paper = "#f4e6c4";
const ink = "#24160f";
const soft = "#5c4636";
const rani = "#9d1d4a";
const marigold = "#e39a14";

const fonts = [
  { name: "Eczar", data: readFileSync(join(fontsDir, "eczar-700.ttf")), weight: 700, style: "normal" },
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
    node("div", { position: "absolute", left: "0px", top: "0px", bottom: "0px", width: "8px", background: rani, display: "flex" }, ""),
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
              node("div", { display: "flex", fontFamily: "Eczar", fontWeight: 700, fontSize: "108px", lineHeight: 0.84, letterSpacing: "-0.03em" }, wedding.partnerOne),
              node("div", { display: "flex", fontFamily: "Newsreader", fontStyle: "italic", fontSize: "36px", color: rani, marginTop: "14px", marginBottom: "8px" }, "and"),
              node("div", { display: "flex", fontFamily: "Eczar", fontWeight: 700, fontSize: "108px", lineHeight: 0.84, letterSpacing: "-0.03em" }, wedding.partnerTwo),
            ]),
            parts
              ? node("div", { display: "flex", flexDirection: "column", alignItems: "flex-end" }, [
                  node("div", { display: "flex", width: "22px", height: "22px", background: marigold, transform: "rotate(45deg)", marginBottom: "10px" }, ""),
                  node("div", { display: "flex", fontFamily: "Azeret", fontSize: "18px", letterSpacing: "0.16em", color: soft }, parts.weekdayShort),
                  node("div", { display: "flex", fontFamily: "Eczar", fontWeight: 700, fontSize: "150px", lineHeight: 0.8, letterSpacing: "-0.04em" }, parts.day),
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
  <path d="M16 2.2 29.2 16 16 29.8 2.8 16Z" fill="none" stroke="${ink}" stroke-width="1.6"/>
  <path d="M16 9.2 22.6 16 16 22.8 9.4 16Z" fill="${marigold}"/>
  <path d="M16 9.2v13.6M9.4 16h13.2" fill="none" stroke="${ink}" stroke-width="1.15"/>
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
