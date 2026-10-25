# Kartik and Simran

A wedding page for Saturday, 27 February 2027, India time. Astro builds a static site. GitHub Pages serves it.

**Live site:** https://gowtham1729.github.io/kartik-simran-wedding/

```
src/config/wedding.ts     The words. Edit this.
src/config/site.ts        Origin and base path. Touch this for a custom domain.
src/styles/global.css     Colour, type, spacing. Tokens are at the top.
src/components/           One file per section.
public/                   Favicon, share image, and any photographs.
docs/design-research.md   Why the page looks like this.
```

Ivory ground, bottle green for the type, rani for the monogram ampersand and the offset block behind the hero frame. The display face is Instrument Serif at weight 400. The interface is Manrope. A marigold garland is strung across the top of the large hero frame. Licenses for the fonts are in `src/assets/fonts/`. Below 720px the header is the monogram and a Menu button.

## Edit the content

Open `src/config/wedding.ts`. Leave a string as `""` until you know the real value. Story, Travel, Questions, and RSVP always show. Empty fields stay placeholders. Guests will treat whatever you type as fact, so do not guess a venue, a time, or a story.

- `partnerOne`, `partnerTwo`: first names. The monogram uses the first letter of each.
- `showGurmukhi`, `gurmukhiOne`, `gurmukhiTwo`: off by default. Spelling to be confirmed by the couple.
- `date`: `"YYYY-MM-DD"`, or `null` to hide the date and the countdown. The weekday is calculated.
- `time`: `"HH:MM"` in 24-hour time, or `null`. Null counts down to midnight at the start of the day.
- `utcOffset`: `"+05:30"` is India Standard Time.
- `city`: `""` shows "Punjab, India" until a city is set.
- `heroPhoto`, `heroAccent`, `storyPhoto`, `celebrationsPhoto`, `gallery`: see the photograph list below.
- `intro` and `story`: the story. Empty keeps the placeholder.
- `celebrations`: Mehndi, Sangeet, Anand Karaj, and Reception. Set `enabled` to `false` to hide one. `date`, `time`, and `place` empty show "Date and venue to be announced".
- `travel`: `notes` and `stays`. Empty keeps the placeholder.
- `faq`: `{ question, answer }`. Empty keeps the placeholder.
- `rsvp`: see below.

## Photographs

Files are WebP in `public/photos/`, 1600px on the long side, each under 250KB. Swap a picture by replacing the file and the `src`, `alt`, `width`, `height`, `credit`, and `creditUrl` in `src/config/wedding.ts`. A `MOCK` comment means the picture is a stand-in couple. Do not write a caption that calls them Kartik and Simran.

| File | Where it sits | What it shows | Credit |
| --- | --- | --- | --- |
| `photos/hero.webp` | Large hero frame. MOCK | Bride in a red lehenga, groom in a turban and sherwani | [Royal Photography](https://unsplash.com/@royalfoto) |
| `photos/hero-720.webp` | Same hero picture, 720px wide, for phones. Replace this when you replace `hero.webp` | Same picture | [Royal Photography](https://unsplash.com/@royalfoto) |
| `photos/accent.webp` | Overlapping hero frame. MOCK | Bride and groom under a canopy of flowers | [shades by 43](https://unsplash.com/@shades_by_43) |
| `photos/story.webp` | Our Story. MOCK | Bride and groom outdoors | [Suresh Chavan](https://unsplash.com/@741suresh) |
| `photos/gallery-pair.webp` | Gallery. MOCK | Bride and groom in red and white, with garlands | [iKshana Productions](https://unsplash.com/@ikshanaproductions) |
| `photos/gallery-wide.webp` | Gallery. MOCK | Smiling bride and groom outdoors | [Suresh Chavan](https://unsplash.com/@741suresh) |
| `photos/mehndi.webp` | Celebrations | Mehndi, red and white bangles, marigolds | [Prajna Amey](https://unsplash.com/@prajna) |
| `photos/marigolds.webp` | Gallery | Marigold garlands at a flower stall | [Zoshua Colah](https://unsplash.com/@zoshuacolah) |
| `photos/bangles.webp` | Gallery | Red and gold bridal bangles on embroidered cloth | [Hush Naidoo Jade Photography](https://unsplash.com/@hush52) |
| `photos/drums.webp` | Gallery | Traditional Indian drums at a celebration | [Tomás Robertson](https://unsplash.com/@tomasrobertson) |

The footer lists each photographer once. All nine pictures are free under the [Unsplash License](https://unsplash.com/license). `hero-720.webp` is the same hero picture, only smaller.

## RSVP link

There is no form on this site and nowhere for replies to be stored. Set `rsvp.mode`:

| mode | value | What the guest gets |
| --- | --- | --- |
| `""` | `""` | The section says "RSVP is not open yet". No RSVP button yet. |
| `"url"` | a Google Form link, or any https link | Recommended. Opens in a new tab. |
| `"mailto"` | an email address | Opens an email with the subject filled in. |
| `"whatsapp"` | digits only, country code included, such as `"919876543210"` | Opens WhatsApp. `whatsappMessage` is optional prefilled text. |

`"url"` is the right choice once you know the questions you want to ask. The header button and the phone button appear only after `mode` and `value` are set. Until then the section says RSVP is not open yet.

## Preview

Node 22.23 or newer. The Pages workflow builds on Node 24.

```sh
npm install
npm run dev
```

Open the URL Astro prints. It includes `/kartik-simran-wedding/`, the same path GitHub Pages uses.

To preview the production build:

```sh
npm run build
npx serve dist
```

Asset paths in the built `index.html` are relative, so a static server at the root of `dist/` works. The dev server keeps the `/kartik-simran-wedding/` prefix.

## Deploy

Push to `main`. `.github/workflows/pages.yml` installs, runs `npm run build`, and uploads `dist/` to GitHub Pages. You can also run the workflow by hand from the Actions tab.

The build generates `og.png` from the names and the date, so the WhatsApp preview stays in step with the page. There is no analytics snippet and no third-party font request.

## Custom domain, later

GitHub Pages is on a project path today. A custom domain is served from the root of that domain. Relative asset paths already work in both places. The absolute URLs (canonical, Open Graph) do not, until you change them.

1. In `src/config/site.ts`, set `origin` to `https://your-domain` and `basePath` to `"/"`.
2. Add `public/CNAME` containing the domain and nothing else, for example `kartikandsimran.com`.
3. In the repo: Settings, Pages, set the custom domain, and turn on "Enforce HTTPS" once it is offered.
4. At the registrar, add the DNS records from [GitHub's custom domain docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site). A `www` name wants a `CNAME` to `gowtham1729.github.io`. An apex domain wants the `A` records GitHub lists.
5. Push, and let the workflow build again.

`404.html` uses the base path on purpose. GitHub serves that file at the address that was wrong, so its CSS links have to be absolute. After `basePath` is `"/"`, those links are root-absolute and match the domain.

## Look

`src/styles/global.css` starts with the tokens: ivory, green, rani, marigold. Reduced motion drops the rise and the hero parallax. The countdown is one sentence.

## Fonts

| Family | Role | License |
| --- | --- | --- |
| Instrument Serif | Names and headings, weight 400 | SIL OFL |
| Manrope | Interface, 400 and 500 | SIL OFL |
| Noto Sans Gurmukhi | Optional names line, weight 300 | SIL OFL |

`src/assets/fonts/OFL-*.txt` are the license texts. `scripts/fonts/` holds the files the share image is drawn with. Both are generated from the Google Fonts sources. The Latin faces are subset. Gurmukhi is limited to its own letters.
