/** Full-width marigold toran for the hero.
 *
 * Strands sit every 36–44px across the viewport. Lengths grow toward the
 * centre, with a small seeded wobble. Blooms are 12px at 390 and 19px at 1440.
 * `topInset` is the header overlapping the top of the toran band, so the
 * flowers start under it and stay inside the top 30% of the screen.
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

interface Pt {
  x: number;
  y: number;
}

function bloomSize(width: number): number {
  if (width <= 390) return 12 * (width / 390);
  const t = Math.min(1, (width - 390) / (1440 - 390));
  return 12 + (19 - 12) * t;
}

function strandCount(width: number): number {
  let count = Math.max(5, Math.round(width / 42));
  while (width / count > 44) count += 1;
  while (count > 5 && width / count < 36) count -= 1;
  return count;
}

function jitter(index: number): number {
  const n = (index * 17 + 5) % 5;
  if (n === 0) return -1;
  if (n === 4) return 1;
  return 0;
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

export function layoutToran(width: number, height: number, topInset = 0): ToranLayout {
  const bloom = bloomSize(width);
  const scale = bloom / 12;
  const leafLength = 12 * scale;
  const leafWidth = 5 * scale;
  const bellHeight = 8 * scale;
  const bellWidth = (14 / 16) * bellHeight;
  const count = strandCount(width);
  const gap = width / count;
  const sag = Math.min(bloom * 1.15, height * 0.08);
  const base = Math.min(height * 0.42, topInset + bloom * 0.7);
  const yAt = (x: number) => base + sag * Math.sin((Math.PI * x) / width);

  const centerY = base + sag;
  const maxLen =
    Math.floor((height - 6 - centerY - bloom / 2 - bellHeight) / bloom) + 1;
  const mid = Math.max(4, Math.min(11, maxLen));
  const edge = Math.max(2, Math.round(mid * 0.45));

  const blooms: ToranBloom[] = [];
  const leaves: ToranLeaf[] = [];
  const bells: ToranBell[] = [];
  const tops: Pt[] = [];

  for (let i = 0; i < count; i++) {
    const x = gap * (i + 0.5);
    const rise = 1 - Math.abs((i / (count - 1)) * 2 - 1);
    let length = Math.round(edge + (mid - edge) * Math.pow(rise, 0.85));
    length += jitter(i);
    length = Math.max(2, Math.min(maxLen, length));
    const top = yAt(x);
    tops.push({ x, y: top });
    for (let k = 0; k < length; k++) {
      blooms.push({
        x,
        y: top + k * bloom,
        rot: ((i * 5 + k * 17) % 26) - 13,
        role: "strand",
        strand: i,
      });
    }
    const lastY = top + (length - 1) * bloom;
    bells.push({
      x,
      y: lastY + bloom / 2 + bellHeight / 2 - 0.4 * scale,
      strand: i,
    });
    leaves.push(
      { x: x - bloom * 0.78, y: top + bloom * 0.12, rot: 196, strand: i },
      { x: x + bloom * 0.78, y: top + bloom * 0.12, rot: -16, strand: i },
    );
  }

  const samples: Pt[] = [];
  const steps = Math.max(24, Math.ceil(width / 4));
  for (let i = 0; i <= steps; i++) {
    const x = (width * i) / steps;
    samples.push({ x, y: yAt(x) });
  }
  const total = curveLength(samples);
  const garlandCount = Math.max(2, Math.round(total / bloom) + 1);
  for (let i = 0; i < garlandCount; i++) {
    const p = pointAtLength(samples, (total * i) / (garlandCount - 1));
    const onStrand = tops.some((top) => Math.hypot(top.x - p.x, top.y - p.y) < bloom * 0.72);
    if (onStrand) continue;
    blooms.push({
      x: p.x,
      y: p.y,
      rot: ((i * 19) % 24) - 12,
      role: "garland",
      strand: -1,
    });
  }

  return {
    bloom,
    inset: topInset,
    leafLength,
    leafWidth,
    bellHeight,
    bellWidth,
    blooms,
    leaves,
    bells,
  };
}
