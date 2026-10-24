import type { Wedding } from "../config/wedding";

export interface DateParts {
  weekdayLong: string;
  weekdayShort: string;
  day: string;
  monthShort: string;
  monthLong: string;
  year: string;
}

export function formatParts(iso: string): DateParts {
  const [y, m, d] = iso.split("-").map(Number);
  const date = new Date(Date.UTC(y, m - 1, d));
  const part = (options: Intl.DateTimeFormatOptions) =>
    date.toLocaleDateString("en-GB", { timeZone: "UTC", ...options });
  return {
    weekdayLong: part({ weekday: "long" }),
    weekdayShort: part({ weekday: "short" }).toUpperCase(),
    day: String(d),
    monthShort: part({ month: "short" }).toUpperCase(),
    monthLong: part({ month: "long" }),
    year: String(y),
  };
}

export function formatLongDate(iso: string): string {
  const { weekdayLong, day, monthLong, year } = formatParts(iso);
  return `${weekdayLong}, ${day} ${monthLong} ${year}`;
}

/** Day.month.year folio, for example 27.02.27. */
export function folio(iso: string): string {
  const [y, m, d] = iso.split("-");
  return `${d}.${m}.${y.slice(2)}`;
}

/** "18:30" -> "6:30 pm". Returns the input unchanged if it is not HH:MM. */
export function formatClock(hhmm: string): string {
  const match = /^(\d{1,2}):(\d{2})$/.exec(hhmm.trim());
  if (!match) return hhmm.trim();
  const h = Number(match[1]);
  const minute = match[2];
  if (h > 23) return hhmm.trim();
  const suffix = h >= 12 ? "pm" : "am";
  const hour = h % 12 === 0 ? 12 : h % 12;
  return `${hour}:${minute} ${suffix}`;
}

export function countdownTarget(w: Wedding): string | null {
  if (!w.date) return null;
  const time = w.time ?? "00:00";
  return `${w.date}T${time}:00${w.utcOffset}`;
}

/** "" means the city is not set yet, so the page says Punjab, India. */
export function placeLine(w: Wedding): string {
  const city = w.city.trim();
  return city || "Punjab, India";
}

export function namesLine(w: Wedding): string {
  return `${w.partnerOne} and ${w.partnerTwo}`;
}

/** A quiet phrase for the countdown, from the clock at build time. */
export function countdownPhrase(w: Wedding): string {
  const target = countdownTarget(w);
  if (!target) return "";
  const ms = new Date(target).getTime() - Date.now();
  if (ms <= 0) return "";
  const days = Math.floor(ms / 86400000);
  if (days > 1) return `${days} days to go`;
  if (days === 1) return "1 day to go";
  const hours = Math.floor(ms / 3600000);
  if (hours > 1) return `${hours} hours to go`;
  if (hours === 1) return "1 hour to go";
  return "Less than an hour to go";
}
