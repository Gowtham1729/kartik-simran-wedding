import { wedding, type Wedding } from "../config/wedding";
import { pageUrl } from "../config/site";
import { sectionFlags } from "../config/wedding";
import {
  countdownPhrase,
  countdownTarget,
  folio,
  formatClock,
  formatLongDate,
  formatParts,
  namesLine,
  placeLine,
} from "./format";

export interface SheetRow {
  label: string;
  value: string;
  open: boolean;
  href?: string;
}

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

export function venueHasDetail(w: Wedding = wedding): boolean {
  const v = w.venue;
  return Boolean(v.name.trim() || v.address.trim() || v.notes.trim() || v.mapsUrl.trim());
}

export function travelHasDetail(w: Wedding = wedding): boolean {
  return Boolean(w.travel.notes.trim() || w.travel.stays.length);
}

export function detailRows(w: Wedding = wedding): SheetRow[] {
  const rows: SheetRow[] = [];
  if (w.date) {
    const time = w.time ? `, ${formatClock(w.time)}` : "";
    rows.push({
      label: "Date",
      value: `${formatLongDate(w.date)}${time}, India time`,
      open: false,
    });
  }
  const city = w.city.trim();
  rows.push({
    label: "City",
    value: placeLine(w),
    open: !city,
  });
  const venueName = w.venue.name.trim();
  rows.push({
    label: "Venue",
    value: venueName || "To be announced",
    open: !venueName,
    href: venueHasDetail(w) ? "#venue" : undefined,
  });
  const count = w.events.length;
  rows.push({
    label: "Schedule",
    value: count ? `${count} ${count === 1 ? "event" : "events"}` : "To be announced",
    open: count === 0,
    href: count ? "#schedule" : undefined,
  });
  if (travelHasDetail(w)) {
    const stays = w.travel.stays.length;
    rows.push({
      label: "Travel",
      value: stays ? `${stays} ${stays === 1 ? "place to stay" : "places to stay"}` : "Notes",
      open: false,
      href: "#travel",
    });
  }
  const dress = w.dressCode.trim();
  if (dress) {
    rows.push({ label: "Dress", value: dress, open: false });
  }
  const reply = rsvpLink(w);
  rows.push({
    label: "RSVP",
    value: reply ? reply.label : "Not open yet",
    open: !reply,
    href: reply ? "#rsvp" : undefined,
  });
  return rows;
}

export function navItems(w: Wedding = wedding): { href: string; label: string }[] {
  const on = sectionFlags(w);
  const items: { href: string; label: string }[] = [];
  if (on.story) items.push({ href: "#story", label: "Story" });
  items.push({ href: "#schedule", label: "Functions" });
  if (on.venue) items.push({ href: "#venue", label: "Venue" });
  if (on.travel) items.push({ href: "#travel", label: "Travel" });
  if (on.dress) items.push({ href: "#dress", label: "Dress" });
  if (on.photographs) items.push({ href: "#gallery", label: "Photographs" });
  if (on.questions) items.push({ href: "#faq", label: "Questions" });
  return items;
}

/** A dress chip colour, or "" when the value is not a plain hex. */
export function chipColor(value: string): string {
  const hex = value.trim();
  return /^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(hex) ? hex : "";
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
  const venueName = w.venue.name.trim();
  const address = w.venue.address.trim();
  if (city || venueName || address) {
    data.location = {
      "@type": "Place",
      name: venueName || city || address,
      ...(address ? { address } : {}),
      ...(city ? { addressLocality: city } : {}),
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
    folioText: w.date ? folio(w.date) : "",
    city: placeLine(w),
    image: w.heroPhoto,
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
