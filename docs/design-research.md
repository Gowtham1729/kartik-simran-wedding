# Design research

A wedding page for Kartik and Simran. The confirmed facts are the two first names, Saturday 27 February 2027, India time (UTC+05:30), and Punjab. Venue, ceremonies, travel, dress, story, photographs, and Gurmukhi spellings are unknown. The page has to be finished without inventing them.

The design lead's direction, October 2026, replaces the earlier wheat stitch and the heavy Bagh palette. Restraint is the point: fewer things, done well. The feel to aim at is Raw Mango and Good Earth. Modern Indian editorial, a light ground, one deep colour, big serif type. Not a wedding-template marketplace.

## What I looked at

### The references for the feel

- [Raw Mango](https://rawmango.com/) and [the about page](https://rawmango.com/pages/raw-mango). A house that talks about measured intervention and nothing mass-produced. Forest green is already one of their colours. Taken: an ivory ground, one jewel green for type and for one full-bleed band, large quiet type, and empty space. Not taken: their shop, their product grid, or a costume of embroidery.
- [Now Form on Raw Mango](https://nowform.co/all/case-study/raw-mango/). The line worth keeping is that the idea should cost less than ten rupees. Taken: one motif. Here that motif is a pointed arch, used as a mask on photographs and as the frame of the hero. A second motif would already be too many.
- [Grazia on Raw Mango and Good Earth, "A Thousand Flowers"](https://www.grazia.co.in/fashion/raw-mango-is-all-set-to-curate-a-thousand-flowers-for-good-earth-10243.html). Good Earth is the other house named for this direction: a luxury Indian shop, editorial, not a wedding template. The Grazia piece is what was read. The Good Earth site itself was not used as a layout to copy, and the floral costume of that collaboration is exactly what this page leaves out.

### What a Punjabi wedding page usually does, and what this one refuses

- [Paigam, Punjabi](https://paigam.co.in/templates/punjabi) and [Phulkari Ghungat](https://paigam.co.in/templates/phulkari-ghungat). Families do want a list of functions. These samples fill that list with Mehndi, Anand Karaj, and Reception, and with venues in Ludhiana and Amritsar that belong to the template. Taken: the list, once a function is confirmed. Refused: any function name, time, or venue that is not in `src/config/wedding.ts`.
- [Shaadify Royal](https://shaadify.org/themes/royal). Maroon, Playfair, gold arches, icon cards, a WhatsApp share. Taken: the arch as a frame, and a reply action that stays on screen on a phone. Refused: Playfair, the palace palette, and the row of icons.
- The marketplace look this page is not: Curated Knot, WedMeGood e-invites, and the gold-and-maroon theme demos that ship a full week of ceremonies. They read as a template gallery within a second. This page should read as a wedding, and as Indian, without looking like that shelf.

### Type

- [Instrument Serif](https://fonts.google.com/specimen/Instrument+Serif) (Rodrigo Fuenzalida, SIL Open Font License). The display face, regular and italic, weight 400. Set large, with slightly tight tracking. Not Playfair, not Cormorant, not a script.
- [Manrope](https://fonts.google.com/specimen/Manrope) (Mikhail Sharanda, SIL OFL) at 400 and 500 for the interface. Not Inter.
- [Noto Sans Gurmukhi](https://fonts.google.com/noto/specimen/Noto+Sans+Gurmukhi) (SIL OFL), weight 300, behind `showGurmukhi`. The flag is off. The spelling is for the couple to confirm. The font file is unicode-range limited, so it is not downloaded while the flag is off.

## Direction

Ivory `#F7F1E6`. Bottle green `#123D2F` for type, one story block, and the footer. Rani `#D2266E` is the hero colour block and the ampersand in the monogram. It is about 4.4:1 on ivory, short of ordinary text, so small type stays green. Marigold is the short toran of blooms along the top of the hero frame (`#F2A12C` and `#E07A1F`).

The page is an editorial wedding layout: a sticky monogram nav, an asymmetric hero of two overlapping photographs, then story, celebrations, gallery, travel, questions, and RSVP. The sections do not repeat one card grid. Celebrations are Mehndi, Sangeet, Anand Karaj, and Reception, each able to be turned off in config, and each reading "Date and venue to be announced" until a real date or place is typed. Story, travel, questions, and RSVP stay visible as placeholders. The photographs are Unsplash stand-ins. Couple pictures are marked `MOCK` in `src/config/wedding.ts`. Alt text describes the picture. It does not name Kartik or Simran.

Motion is a short rise as a section enters, and a slight translate on the hero photograph, both opacity or transform only, inside `prefers-reduced-motion: no-preference` and `@supports (animation-timeline: view())`. There is no polyfill. The countdown is a sentence, not a flip clock.

Chrome's modern-web-guidance note on scroll entry (skill text dated 2026-05-16, current package 2026-10-16) is the source for that motion. The installed skill is behind the package. Update it from [the project docs](https://github.com/GoogleChrome/modern-web-guidance#updating). The parallax guide came back in the same search and was not used.

## Stack

Astro builds a static `dist/`. GitHub Pages uploads that folder from `.github/workflows/pages.yml` on Node 24. `src/config/wedding.ts` is the only content file. Fonts are subset, self-hosted, woff2. The share image is drawn in `scripts/share-images.mjs` from the same names and date.

Not used, on purpose: view transitions, a smooth-scroll library, and a motion library. One document does not need a route transition. The rise is a few lines of CSS.

Asset URLs in `index.html` are rewritten to relative paths after the build (`scripts/relativize.mjs`). `404.html` keeps base-absolute URLs, because GitHub Pages serves that file at the address that was wrong. Canonical and Open Graph URLs stay absolute.

## RSVP

No form is hosted here. `rsvp.mode` is `""`, `"url"`, `"mailto"`, or `"whatsapp"`. Empty still shows the RSVP section, and it says RSVP is not open yet. The header button and the phone button stay off until `mode` and `value` are both set. When the phone button is on, the page keeps a bottom pad equal to that button so it does not cover the last content. `"url"` is the one to use once the questions are known: paste a Google Form link. Nothing is stored on this site.

## Still open

Time of day, story, venue name, address, notes, and map, each function (only once the day, the time, and the place are real), travel, dress, questions, photographs, the reply link, and the Gurmukhi spellings. Punjab is already the place line.
