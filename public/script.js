/* ==========================================================================
   Kartik & Simran wedding site
   --------------------------------------------------------------------------
   Edit the WEDDING object below to change what the page shows.
   Everything else in this file just renders that config into the page.
   ========================================================================== */

const WEDDING = {
  partnerOne: "Kartik",
  partnerTwo: "Simran",
  tagline: "We're getting married",

  // Wedding day as "YYYY-MM-DD". Leave as null until the date is final.
  // While null, the page shows `dateFallback` and the countdown stays hidden.
  date: "2027-02-27",
  // Optional start time as "HH:MM" (24-hour), e.g. "18:30". While null, the
  // countdown runs to the start of the day (00:00) in `utcOffset`.
  time: null,
  // Timezone the date and time are in. "+05:30" is India Standard Time.
  // The countdown uses this, so it is the same for guests in any country.
  utcOffset: "+05:30",
  dateFallback: "Date to be announced",

  // Shown under the date in the hero.
  city: "City to be announced",

  venue: {
    name: "Venue to be announced",
    address: "Address to be announced",
    notes: "", // Optional: parking, dress code, accessibility, etc.
    // Paste a Google Maps share link, e.g. "https://maps.app.goo.gl/...".
    // While empty, the page shows "Map link coming soon".
    mapsUrl: "",
  },

  // One entry per event, shown in this order.
  // `placeholder: true` adds a visible "Placeholder" tag. Delete it once real.
  events: [
    {
      name: "Event name",
      date: "Date to be announced",
      time: "Time to be announced",
      location: "Location to be announced",
      description: "A short line about this event goes here.",
      placeholder: true,
    },
    {
      name: "Event name",
      date: "Date to be announced",
      time: "Time to be announced",
      location: "Location to be announced",
      description: "A short line about this event goes here.",
      placeholder: true,
    },
    {
      name: "Event name",
      date: "Date to be announced",
      time: "Time to be announced",
      location: "Location to be announced",
      description: "A short line about this event goes here.",
      placeholder: true,
    },
  ],

  footerNote: "With love, and gratitude for having you in our lives.",
};

/* ========================================================================== */

(function render(config) {
  // The exact moment the countdown targets, in the configured timezone.
  const weddingDate = config.date
    ? new Date(`${config.date}T${config.time || "00:00"}:00${config.utcOffset || "+05:30"}`)
    : null;
  const hasDate = weddingDate !== null && !Number.isNaN(weddingDate.getTime());

  // ---- Simple text bindings: <el data-bind="key"> ----
  const initials = `${config.partnerOne.charAt(0)} & ${config.partnerTwo.charAt(0)}`;
  const text = {
    partnerOne: config.partnerOne,
    partnerTwo: config.partnerTwo,
    tagline: config.tagline,
    initials,
    city: config.city,
    venueName: config.venue.name,
    venueAddress: config.venue.address,
    venueNotes: config.venue.notes,
    footerNote: config.footerNote,
    date: hasDate ? formatDate(config.date) : config.dateFallback,
  };

  document.querySelectorAll("[data-bind]").forEach((el) => {
    const value = text[el.dataset.bind];
    if (value === undefined) return;
    el.textContent = value;
    if (value === "") el.hidden = true;
  });

  document.title = `${config.partnerOne} & ${config.partnerTwo}`;
  if (hasDate) {
    document.querySelector('[data-bind="date"]').setAttribute("datetime", config.date);
  }

  renderEvents(config.events);
  renderMapLink(config.venue.mapsUrl);
  if (hasDate) startCountdown(weddingDate);
  revealOnScroll();

  // ---- Helpers ----

  // Formats "2027-02-27" as "Saturday, 27 February 2027". The calendar date is
  // read as-is, so it never shifts a day for guests in other timezones.
  function formatDate(isoDate) {
    const [y, m, d] = isoDate.split("-").map(Number);
    const day = new Date(Date.UTC(y, m - 1, d));
    const part = (options) => day.toLocaleDateString("en-GB", { timeZone: "UTC", ...options });
    return `${part({ weekday: "long" })}, ${d} ${part({ month: "long" })} ${y}`;
  }

  function renderEvents(events) {
    const list = document.querySelector("[data-events]");
    list.innerHTML = "";

    events.forEach((event) => {
      const item = document.createElement("li");
      item.className = "event reveal";

      if (event.placeholder) {
        const tag = document.createElement("span");
        tag.className = "tag";
        tag.textContent = "Placeholder";
        item.append(tag);
      }

      item.append(
        el("h3", "event__name", event.name),
        when(event.date, event.time),
        el("p", "event__where", event.location),
        el("p", "event__desc", event.description)
      );
      list.append(item);
    });
  }

  function when(date, time) {
    const node = el("p", "event__when", "");
    [date, time].filter(Boolean).forEach((part) => node.append(el("span", "", part)));
    return node;
  }

  function renderMapLink(url) {
    const slot = document.querySelector("[data-venue-map]");
    if (url) {
      const link = el("a", "button", "Open in Google Maps");
      link.href = url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      slot.append(link);
    } else {
      slot.append(el("p", "venue__pending", "Map link coming soon"));
    }
  }

  function startCountdown(target) {
    const box = document.querySelector("[data-countdown]");
    const done = document.querySelector("[data-countdown-done]");
    const units = {
      days: box.querySelector('[data-unit="days"]'),
      hours: box.querySelector('[data-unit="hours"]'),
      minutes: box.querySelector('[data-unit="minutes"]'),
      seconds: box.querySelector('[data-unit="seconds"]'),
    };

    function tick() {
      const ms = target.getTime() - Date.now();
      if (ms <= 0) {
        box.hidden = true;
        done.hidden = false;
        clearInterval(timer);
        return;
      }
      const s = Math.floor(ms / 1000);
      units.days.textContent = Math.floor(s / 86400);
      units.hours.textContent = String(Math.floor((s % 86400) / 3600)).padStart(2, "0");
      units.minutes.textContent = String(Math.floor((s % 3600) / 60)).padStart(2, "0");
      units.seconds.textContent = String(s % 60).padStart(2, "0");
      box.hidden = false;
    }

    const timer = setInterval(tick, 1000);
    tick();
  }

  // Fade sections in as they scroll into view. CSS skips this entirely
  // for people who prefer reduced motion.
  function revealOnScroll() {
    const items = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      items.forEach((item) => item.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    items.forEach((item) => observer.observe(item));
  }

  function el(tag, className, content) {
    const node = document.createElement(tag);
    node.className = className;
    node.textContent = content;
    return node;
  }
})(WEDDING);
