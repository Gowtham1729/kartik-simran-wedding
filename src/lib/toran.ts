/** Marigold toran laid out on the doorway arch.
 *
 * Coordinates are pixels in a frame of `width` by `height`. The arch clip is
 * the objectBoundingBox path in Base.astro, so the same fractions hold at any
 * frame size. On the 390 frame the opening is about 280px and blooms are 12px.
 * A tall desktop arch uses the frame width as the arch width, so a 506px arch
 * gets blooms of about 21px. Leaves, bells, and strand spacing use that scale.
 */

export interface ToranBloom {
  x: number;
  y: number;
  rot: number;
  role: "garland" | "strand";
  strand: number;
}

export interface ToranLeaf {
  x: number;
  y: number;
  rot: number;
  strand: number;
}

export interface ToranBell {
  x: number;
  y: number;
  strand: number;
}

export interface ToranLayout {
  bloom: number;
  inset: number;
  leafLength: number;
  leafWidth: number;
  bellHeight: number;
  bellWidth: number;
  blooms: ToranBloom[];
  leaves: ToranLeaf[];
  bells: ToranBell[];
}

const STRAND_LENGTHS = [4, 5, 6, 7, 6, 5, 4];

interface Pt {
  x: number;
  y: number;
}

function cubic(p0: Pt, p1: Pt, p2: Pt, p3: Pt, t: number): Pt {
  const u = 1 - t;
  const a = u * u * u;
  const b = 3 * u * u * t;
  const c = 3 * u * t * t;
  const d = t * t * t;
  return {
    x: a * p0.x + b * p1.x + c * p2.x + d * p3.x,
    y: a * p0.y + b * p1.y + c * p2.y + d * p3.y,
  };
}

function cubicDeriv(p0: Pt, p1: Pt, p2: Pt, p3: Pt, t: number): Pt {
  const u = 1 - t;
  return {
    x: 3 * u * u * (p1.x - p0.x) + 6 * u * t * (p2.x - p1.x) + 3 * t * t * (p3.x - p2.x),
    y: 3 * u * u * (p1.y - p0.y) + 6 * u * t * (p2.y - p1.y) + 3 * t * t * (p3.y - p2.y),
  };
}

function offsetArch(width: number, height: number, inset: number): Pt[] {
  const w = width;
  const h = height;
  const left: [Pt, Pt, Pt, Pt] = [
    { x: 0.14 * w, y: 0.484 * h },
    { x: 0.14 * w, y: 0.281 * h },
    { x: 0.32 * w, y: 0.125 * h },
    { x: 0.5 * w, y: 0.047 * h },
  ];
  const right: [Pt, Pt, Pt, Pt] = [
    { x: 0.5 * w, y: 0.047 * h },
    { x: 0.68 * w, y: 0.125 * h },
    { x: 0.86 * w, y: 0.281 * h },
    { x: 0.86 * w, y: 0.484 * h },
  ];

  const sample = (bez: [Pt, Pt, Pt, Pt], steps: number) => {
    const pts: Pt[] = [];
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const pos = cubic(bez[0], bez[1], bez[2], bez[3], t);
      const der = cubicDeriv(bez[0], bez[1], bez[2], bez[3], t);
      const len = Math.hypot(der.x, der.y) || 1;
      // Inward normal while walking spring → apex → spring (see layout notes).
      const nx = -der.y / len;
      const ny = der.x / len;
      pts.push({ x: pos.x + nx * inset, y: pos.y + ny * inset });
    }
    return pts;
  };

  const leftPts = sample(left, 96).filter((p) => p.x <= w / 2 + 0.01);
  const rightPts = sample(right, 96).filter((p) => p.x >= w / 2 - 0.01);
  const apex = { x: w / 2, y: 0.047 * h + inset };
  const curve = [...leftPts, apex, ...rightPts];

  // Keep x monotonic across the pointed apex so the garland is a single arch.
  const mono: Pt[] = [];
  for (const p of curve) {
    const prev = mono[mono.length - 1];
    if (!prev || p.x > prev.x + 0.05) mono.push(p);
  }
  return mono;
}

function curveLength(pts: Pt[]): number {
  let len = 0;
  for (let i = 1; i < pts.length; i++) len += Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y);
  return len;
}

function pointAtLength(pts: Pt[], dist: number): Pt {
  let left = dist;
  for (let i = 1; i < pts.length; i++) {
    const seg = Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y);
    if (left <= seg || i === pts.length - 1) {
      const t = seg === 0 ? 0 : Math.min(1, left / seg);
      return {
        x: pts[i - 1].x + (pts[i].x - pts[i - 1].x) * t,
        y: pts[i - 1].y + (pts[i].y - pts[i - 1].y) * t,
      };
    }
    left -= seg;
  }
  return pts[pts.length - 1];
}

function yAtX(pts: Pt[], x: number): number {
  for (let i = 1; i < pts.length; i++) {
    const a = pts[i - 1];
    const b = pts[i];
    if ((a.x <= x && x <= b.x) || i === pts.length - 1) {
      const span = b.x - a.x;
      const t = span === 0 ? 0 : (x - a.x) / span;
      return a.y + (b.y - a.y) * Math.min(1, Math.max(0, t));
    }
  }
  return pts[0].y;
}

function bloomScale(width: number, height: number): number {
  const mobileAspect = 312 / 390;
  const desktopAspect = 701 / 506;
  const aspect = height / width;
  const t = Math.min(1, Math.max(0, (aspect - mobileAspect) / (desktopAspect - mobileAspect)));
  const inner = (0.86 - 0.14) * width;
  // Mobile opening ≈ 280px at 12px blooms. The 506px desktop arch is the frame.
  const archWidth = inner + t * (width - inner);
  const mobileOpening = (0.86 - 0.14) * 390;
  return archWidth / mobileOpening;
}

export function layoutToran(width: number, height: number): ToranLayout {
  const scale = bloomScale(width, height);
  const bloom = 12 * scale;
  const inset = 6 * scale;
  const leafLength = 12 * scale;
  const leafWidth = 5 * scale;
  const bellHeight = 8 * scale;
  const bellWidth = (14 / 16) * bellHeight;

  const curve = offsetArch(width, height, inset);
  const innerWidth = (0.86 - 0.14) * width;
  const span = 0.85 * innerWidth;
  const x0 = (width - span) / 2;
  // Nine even slots across the opening. The two outer slots sit on the steep
  // side of the arch, so the strands use the inner seven and the garland ends there.
  const slots = STRAND_LENGTHS.length + 2;
  const strandX = STRAND_LENGTHS.map((_, strand) => x0 + (span * (strand + 1)) / (slots - 1));
  // Stop the garland at the outer strands so it does not run down the jambs beside them.
  const leftX = strandX[0];
  const rightX = strandX[strandX.length - 1];
  const garlandCurve: Pt[] = [
    { x: leftX, y: yAtX(curve, leftX) },
    ...curve.filter((p) => p.x > leftX + 0.4 && p.x < rightX - 0.4),
    { x: rightX, y: yAtX(curve, rightX) },
  ];
  const total = curveLength(garlandCurve);
  const garlandCount = Math.max(2, Math.round(total / bloom) + 1);
  const garland: Pt[] = [];
  for (let i = 0; i < garlandCount; i++) {
    garland.push(pointAtLength(garlandCurve, (total * i) / (garlandCount - 1)));
  }

  const blooms: ToranBloom[] = [];
  const leaves: ToranLeaf[] = [];
  const bells: ToranBell[] = [];

  STRAND_LENGTHS.forEach((count, strand) => {
    const x = strandX[strand];
    const top = yAtX(curve, x);
    for (let k = 0; k < count; k++) {
      blooms.push({
        x,
        y: top + (k + 1) * bloom,
        rot: ((strand * 5 + k * 17) % 26) - 13,
        role: "strand",
        strand,
      });
    }
    const lastY = top + count * bloom;
    bells.push({
      x,
      y: lastY + bloom / 2 + bellHeight / 2 - 0.5 * scale,
      strand,
    });
    leaves.push(
      { x: x - bloom * 0.78, y: top + bloom * 0.12, rot: 196, strand },
      { x: x + bloom * 0.78, y: top + bloom * 0.12, rot: -16, strand },
    );
  });

  garland.forEach((p, i) => {
    blooms.push({
      x: p.x,
      y: p.y,
      rot: ((i * 19) % 24) - 12,
      role: "garland",
      strand: -1,
    });
  });

  return { bloom, inset, leafLength, leafWidth, bellHeight, bellWidth, blooms, leaves, bells };
}
