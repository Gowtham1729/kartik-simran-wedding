import { wedding, type Celebration, type Photo, type Wedding } from "../config/wedding";
import { pageUrl } from "../config/site";
import {
  countdownPhrase,
  countdownTarget,
  formatLongDate,
  formatParts,
  namesLine,
  placeLine,
} from "./format";

export interface RsvpLink {
  href: string;
  external: boolean;
  note: string;
  label: string;
}

export function pageTitle(w: Wedding = wedding): string {
  const names = namesLine(w);
  if (!w.date) return names;
  return `${names}, ${formatLongDate(w.date)}`;
}

export function pageDescription(w: Wedding = wedding): string {
  const names = namesLine(w);
  const when = w.date ? formatLongDate(w.date) : "a date still to be set";
  return `${names} are marrying on ${when}, in ${placeLine(w)}.`;
}

export function rsvpLink(w: Wedding = wedding): RsvpLink | null {
  const value = w.rsvp.value.trim();
  if (!w.rsvp.mode || !value) return null;
  const names = namesLine(w);
  const when = w.date ? formatLongDate(w.date) : "the wedding";
  if (w.rsvp.mode === "url") {
    return {
      href: value,
      external: true,
      note: "Opens a form in a new tab.",
      label: w.rsvp.label || "RSVP",
    };
  }
  if (w.rsvp.mode === "mailto") {
    const subject = encodeURIComponent(`${names}, ${when}`);
    return {
      href: `mailto:${value}?subject=${subject}`,
      external: false,
      note: "Opens an email.",
      label: w.rsvp.label || "RSVP",
    };
  }
  const digits = value.replace(/\D/g, "");
  if (!digits) return null;
  const message = w.rsvp.whatsappMessage.trim();
  const href = message
    ? `https://wa.me/${digits}?text=${encodeURIComponent(message)}`
    : `https://wa.me/${digits}`;
  return {
    href,
    external: true,
    note: "Opens WhatsApp.",
    label: w.rsvp.label || "RSVP",
  };
}

export function activeCelebrations(w: Wedding = wedding): Celebration[] {
  return w.celebrations.filter((item) => item.enabled && item.name.trim());
}

/** What a guest can be told. Empty fields stay announced, never invented. */
export function celebrationLine(item: Celebration): string {
  const date = item.date.trim();
  const time = item.time.trim();
  const place = item.place.trim();
  if (!date && !time && !place) return "Date and venue to be announced";
  const when = [date, time].filter(Boolean).join(", ") || "Date to be announced";
  return `${when}. ${place || "Venue to be announced"}`;
}

export function photoCredits(w: Wedding = wedding): { name: string; url: string }[] {
  const photos: Photo[] = [w.heroPhoto, w.heroAccent, w.storyPhoto, w.celebrationsPhoto, ...w.gallery];
  const seen = new Map<string, string>();
  for (const photo of photos) {
    const name = photo.credit.trim();
    const url = photo.creditUrl.trim();
    if (name && url && !seen.has(name)) seen.set(name, url);
  }
  return [...seen].map(([name, url]) => ({ name, url }));
}

export function navItems(): { href: string; label: string }[] {
  return [
    { href: "#story", label: "Story" },
    { href: "#celebrations", label: "Celebrations" },
    { href: "#gallery", label: "Gallery" },
    { href: "#travel", label: "Travel" },
    { href: "#faq", label: "Questions" },
    { href: "#rsvp", label: "RSVP" },
  ];
}

export function httpUrl(value: string): string {
  const url = value.trim();
  return /^https?:\/\//i.test(url) ? url : "";
}

export function eventJsonLd(w: Wedding = wedding): string | null {
  if (!w.date) return null;
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: `Wedding of ${namesLine(w)}`,
    startDate: w.time ? `${w.date}T${w.time}:00${w.utcOffset}` : w.date,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    description: pageDescription(w),
    url: pageUrl(),
  };
  const city = placeLine(w);
  if (city) {
    data.location = {
      "@type": "Place",
      name: city,
      addressLocality: city,
    };
  }
  return JSON.stringify(data);
}

export function heroModel(w: Wedding = wedding) {
  const parts = w.date ? formatParts(w.date) : null;
  return {
    partners: [w.partnerOne, w.partnerTwo] as const,
    parts,
    longDate: w.date ? formatLongDate(w.date) : "",
    city: placeLine(w),
    image: w.heroPhoto,
    accent: w.heroAccent,
    gurmukhi:
      w.showGurmukhi && w.gurmukhiOne.trim() && w.gurmukhiTwo.trim()
        ? { one: w.gurmukhiOne.trim(), two: w.gurmukhiTwo.trim() }
        : null,
    target: countdownTarget(w),
    phrase: countdownPhrase(w),
    here: w.date ? `${formatLongDate(w.date)} is here.` : "",
    passed: w.date ? `${formatLongDate(w.date)} has passed.` : "",
  };
}

export function assetPath(src: string): string {
  if (/^https?:\/\//.test(src)) return src;
  const base = import.meta.env.BASE_URL;
  return base + src.replace(/^\//, "");
}

/** Phone file plus the full file, so a small screen does not download the large one. */
export function imageSrcSet(photo: Photo): string {
  const narrow = photo.narrow;
  if (!narrow?.src.trim() || !narrow.width || !photo.src.trim() || !photo.width) return "";
  return `${assetPath(narrow.src)} ${narrow.width}w, ${assetPath(photo.src)} ${photo.width}w`;
}
