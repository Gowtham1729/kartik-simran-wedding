# Design research

A save-the-date for Kartik and Simran. The only confirmed facts are the two first names, Saturday 27 February 2027, and India time (UTC+05:30). City, venue, ceremonies, travel, dress, story, and photographs are unknown, so the page has to be finished without them.

## What I looked at

### Award and editorial sites

- [Celine & Jad, Poetic Love](https://www.awwwards.com/sites/celine-jad-poetic-love-1) (Awwwards nominee, Pixel Bytes). A theme, Midsummer Night's Dream, carries the whole site, and guests RSVP per event. The scores are mixed. The useful lesson is that a wedding site needs one idea, not a stack of sections. We do not have a theme we were told, so inventing one would be fiction.
- [Arpeeta & Arpan](https://www.awwwards.com/sites/arpeeta-arpan-wedding-website) (Awwwards nominee). An Indian wedding told as a long, luxurious story. It depends on biography and photography. We have neither, so a story-led page would be padding.
- [Wedding invitation, Ngano Yoshihiro](https://www.awwwards.com/sites/wedding-invitation). Hospitality as the content. Useful as a reminder that the guest is the reader. The visual system is not something to copy from a thumbnail.
- [The Invitation, Chasing the Moment](https://www.awwwards.com/inspiration/the-invitation-chasing-the-moment). Shader, type, and 3D. The lesson worth keeping: type can be the picture. The technique is the wrong weight for a WhatsApp open on a phone in India.

Wedding sites rarely win Site of the Day. The bar used here is SOTD craft applied to this brief: one idea, type as the image, motion that explains the idea, no component-library chrome. The comparisons below are the wedding sites and templates this page is actually trying to beat.

### Templates people actually ship

- [Cetinale](https://www.framer.com/marketplace/templates/cetinale/) (Framer). A magazine: contact sheet, wax seal, taped prints, gold seals, eleven sections. It works when a couple has a weekend of photographs. Without photographs it is a frame with nothing in it.
- [Amorette](https://www.framer.com/marketplace/templates/amorette/) (Framer). Engraved stationery, paper grain, falling petals, a bouquet interaction. The botanicals are the costume of "editorial wedding" in 2025 and 2026.
- [Wedfully](https://www.framer.com/marketplace/templates/wedfully/) and [Our Day](https://www.avathiery.com/framer-templates/our-day). Editorial type, story timeline, schedule, dress, FAQ, RSVP. Competent, and interchangeable once the photographs are removed.
- [Webflow's wedding template roundup](https://webflow.com/blog/wedding-websites) (Sage & Milk, Framy, Marriage, Luna Flora). A catalog. Floral illustration and a serif headline are the house style.
- [Bliss & Bone](https://blissandbone.com/). The clearest commercial claim that a wedding site should not look like everyone else's. The product is still a template library with RSVP attached.

### Guest tools

- [Withjoy's 2026 invitation roundup](https://withjoy.com/blog/23-beautiful-wedding-invitation-websites-expert-tested-2025/), [Zola](https://www.zola.com/wedding/website), [The Knot](https://www.theknot.com/gs/wedding-websites), [Minted](https://www.minted.com/wedding-websites). These are the sites families have already seen. They are good at RSVP, registries, and guest lists. The visual default is a script or a soft serif, a blush or ivory field, and centered cards. [A 2026 review of the builders](https://www.womangettingmarried.com/the-best-wedding-websites-reviewed/) judges them on planning tools, which is the right test for a planner and the wrong test for this page. There is no backend here, and there is no guest list.

### Indian wedding sites

- [The Curated Knot on Indian wedding website styles](https://thecuratedknot.com/blog/indian-wedding-website-examples-inspiration) and their [Sikh wedding notes](https://thecuratedknot.com/blog/sikh-wedding-website). The practical advice is right: names largest, logistics second, mobile first, one motif, fast. The motifs they recommend (paisley, phulkari, temple gold, red and gold) assume a ceremony tradition. The surnames suggest a North Indian wedding and nothing more specific. A phulkari pattern or a khanda would be a guess.
- [Anvaya](https://anvaya.love/features/wedding-website-builder) starts from the couple's own words, clothes, and invitation. That is the right method, and we do not have that material yet.
- [Dil Se Invite](https://dilseinvite.in/) is explicit about WhatsApp as the way the link arrives. That constraint matters more than any desktop composition.

### Type, motion, and agent guidance

- [Godly's font directory](https://godly.website/directory/fonts). The curated web is Inter, Neue Haas Grotesk, Suisse, Editorial New. Those faces would make this look like a studio marketing page. Cormorant and Playfair are the wedding-template pair the previous page already used. Fraunces and Instrument Serif are the newer "tasteful" defaults. I set Bodoni Moda, Brygada 1918, Fraunces, and Newsreader in the same layout and kept Brygada.
- [Brygada 1918](https://fonts.google.com/specimen/Brygada+1918) (Borys Kosmynka, SIL Open Font License). A 1918 Polish text face with a fast italic. At display size it is sharp and warm, and it is not on wedding templates.
- [Newsreader](https://fonts.google.com/specimen/Newsreader) (Production Type, OFL) for reading, with the optical size cut for text. [Azeret Mono](https://fonts.google.com/specimen/Azeret+Mono) (Displaay, OFL) for figures only.
- [Fontshare](https://www.fontshare.com/) (Indian Type Foundry): Panchang, Boska, General Sans. Panchang is a display grotesque that would shout over the names. Boska is another fashion serif, closer to the stationery lane. They are free for commercial use and not OFL, so the self-hosted faces here stay on the Open Font License.
- [MDN, CSS scroll-driven animations](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll-driven_animations) and [Safari 26's release notes](https://webkit.org/blog/17333/webkit-features-in-safari-26-0/). `animation-timeline` is in Chrome, Edge, and Safari 26. It is not in Firefox. It must not be load-bearing.
- Chrome's modern-web-guidance notes on motion and scroll progress (skill text dated 2026-05-16, newer package 2026-10-16). Animate `transform` and `opacity` only. Do not zero every duration with one global override. Declare `animation-timeline` after the `animation` shorthand, because the shorthand resets it. Feature-detect scroll timelines. Do not ship the scroll-timeline polyfill. A decorative progress indicator needs `aria-hidden`. I used the scroll timeline for one drift and skipped the progress bar: a bar at the top of a short invitation is a template, and it does not belong to the idea.
- [Astro on GitHub Pages](https://docs.astro.build/en/guides/deploy/github/). `site` is the origin. `base` is the project path. A later custom domain means the project path goes away.

## Direction

**Out of register.**

A letterpress invitation is usually printed in two passes. This page is the black pass, already dry, and a vermillion pass set a few pixels off. The names are Brygada italic. The word "and" is Newsreader italic in vermillion, and it sits on that same offset, a second voice that missed the register. The day number is printed twice: Brygada roman in ink, and the same figures in vermillion, shifted down and to the right. That is the second pass at the size of the poster, which is what a hairline in the margin cannot do. The running head is the registration mark and the folio. The names appear once, large.

The countdown is a press counter: the day count in Brygada, then hours, minutes, and seconds as one colon clock in Azeret Mono. Four labeled cells (days, hours, minutes, seconds) are the widget on Zola, Joy, and The Knot, so they are not used. Prose is Newsreader. Azeret stays on the folio, the date codes, and the clock, where the figures have to stay tabular.

The motif is drawn, not picked from an icon set: a registration mark (circle, a cross that stops short of the middle, a vermillion square that misses the center) used as the favicon, the header mark, and the share image. The same idea at page scale is two rules down the left edge, ink and vermillion, the red one starting lower and drifting a few pixels as you scroll. A first pass of this page kept the second colour only in that hairline and in the word "and". It still read as an editorial template with an accent. The numeral now carries the second pass, which is the difference you can see in a screenshot.

Colour is paper `#efe7d8`, ink `#1c1612`, and vermillion `#c43822` for the non-text rule. Text that has to be red uses `#8d2a18` (about 6.9:1 on the paper). There is no gold, no ivory-and-forest palette, no gradient, no shadow, no blur, no rounded card.

It is a save-the-date, not a wedding website pretending the plans are done. Essential unknowns (city, venue, schedule, reply) are rows in one list. An open row is italic. Optional sections (story, travel, dress, questions, photographs, the reply link, the map) are real components and render nothing until `src/config/wedding.ts` has something to say.

### What this is beating, and how

- **Cetinale, Amorette, Wedfully, Our Day.** They are magazine spreads that need photographs, florals, wax, and gold to look finished. Strip the photos and the page is a frame. This one is finished with the names and a day number you can see was printed twice. The ornament is that printing error, used as structure (the edge rules, the mark, the numeral, the share image).
- **Zola, Joy, The Knot, Minted, and the previous page on this repo.** Centered serif, script or Cormorant, blush or ivory, gold star, card grid, a four-cell countdown, a pill button. This page is asymmetric. The type is Brygada, Newsreader, and Azeret, not Cormorant or Playfair or Inter. The countdown is one figure and a clock. There is no card.
- **Curated Knot's phulkari, temple-gold, and red-and-gold templates.** Those are right for a couple who have chosen that tradition. Using them here would invent a ceremony. The Indian context shows up as the timezone, the English a guest in India will read on a phone, and the refusal to paste on a motif from a region we were not given.
- **Celine & Jad and Arpeeta & Arpan (Awwwards nominees).** They win on biography, photography, and a theme the couple actually has. We do not have that material, and inventing it would be fiction. What this page beats them on is the empty brief: their structures would be blank frames, and this one is a complete poster.
- **The Invitation, Chasing the Moment.** Stronger as spectacle (shader, type, 3D). It loses the open that matters here, a WhatsApp tap on a phone, on weight and on reduced motion. The motion on this page is the red rule drawing on, the word "and" rising onto its offset, the rule drifting a few pixels with the scroll, and the clock digits knocking. Reduced motion keeps the misregister and drops the movement.

## Stack

Astro 7 builds a static `dist/` and GitHub Pages uploads that folder. It earns the build step:

- One content module, `src/config/wedding.ts`. Sections are components. An empty list renders nothing, so Kartik is not maintaining placeholder cards.
- Fonts are subset, self-hosted, woff2, about 80KB together. The display italic is 13KB. No Google Fonts request.
- The share image is generated in `scripts/share-images.mjs` with Satori and resvg, from the same config, so the preview cannot drift from the page.

Not used, on purpose:

- **View Transitions.** There is one document. A second route added so the names could cross-fade would be theater, and the API does not honor `prefers-reduced-motion` by itself.
- **Lenis.** It takes over wheel and touch. On a short page opened inside WhatsApp on iOS, native scrolling is the better feel, and it is free.
- **GSAP.** The motion is a scale on the red rule, a short rise on the word "and", a scroll-linked `translate` of that rule, and a digit tick. Those are compositor properties. A library would spend the mobile budget on the same idea.

`animation-timeline: scroll()` drives the drift only inside `@supports`, and only when the user has not asked for reduced motion. Firefox and older iOS keep the static offset, which already shows the misregister. The names and the 27 are not faded in, so the largest text can paint immediately.

Asset URLs in `index.html` are rewritten to relative paths after the build (`scripts/relativize.mjs`). `./_astro/...` works at `/kartik-simran-wedding/` and, later, at a domain root. `404.html` keeps base-absolute URLs, because GitHub Pages serves that file at whatever wrong address was requested, and a relative URL would resolve against that address. Canonical and Open Graph URLs stay absolute.

## RSVP

No form is hosted here. `rsvp.mode` is `""`, `"url"`, `"mailto"`, or `"whatsapp"`. Empty means the reply row says "Not open yet" and the reply section is absent. `"url"` is the one to use: paste a Google Form link. The page opens it in a new tab. Mailto and WhatsApp are the other two, for when a form is the wrong tool. Nothing is stored on this site.

## Still open

City, venue, map, schedule, travel, dress, story, questions, photographs, and the reply link. The config file is the list, with the shape of each field in the types above the object.
