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

Ivory ground, bottle green for the type and for the functions band, rani only on the RSVP control and on links. The display face is Instrument Serif at weight 400. The interface is Manrope. One motif, a pointed arch, with a marigold toran across the top. Licenses are in `src/assets/fonts/`.

## Edit the content

Open `src/config/wedding.ts`. Leave a string as `""` and a list as `[]` until you know the real value. Hero, Functions, and RSVP always show. Story, Venue, Travel, Dress, Photographs, and Questions stay off until their fields are filled in (`sections` in that file, all false). Filling a field turns that section, and its nav link, back on. Guests will treat whatever you type as fact, so do not guess a venue, a time, a function name, or a story.

- `partnerOne`, `partnerTwo`: first names.
- `showGurmukhi`, `gurmukhiOne`, `gurmukhiTwo`: off by default. Spelling to be confirmed by the couple. Leave the flag false until both spellings are real. The line is not shown while either string is empty.
- `date`: `"YYYY-MM-DD"`, or `null` to hide the date and the countdown. The weekday is calculated.
- `time`: `"HH:MM"` in 24-hour time, or `null`. Null counts down to midnight at the start of the day, and the page says so.
- `utcOffset`: `"+05:30"` is India Standard Time.
- `city`: `""` shows "Punjab, India" until a city is set.
- `heroPhoto`: `src` is a path inside `public/`, or `""` for the dusk gradient inside the arch. `width` and `height` are the pixel size of the file.
- `intro`: the story paragraph. `""` leaves the story as a placeholder.
- `venue`: `name`, `address`, `notes`, `mapsUrl`. An empty venue says it has not been named.
- `events`: one object per confirmed function, in order. Each card shows the name, the day and time, the venue with a map link, and the dress as a colour chip. `dressColor` is a hex such as `"#E39A14"`, or `""` for an empty chip. Leave the list empty until a function is real. The page then shows a single placeholder card, not a made-up ceremony.
- `travel`: `notes` and `stays`. Empty until you write them.
- `dressCode`: one or two sentences. Empty until set.
- `story`: an array of paragraphs.
- `faq`: `{ question, answer }`.
- `gallery`: `{ src, alt, width, height }`. Put files in `public/photos/` and set `src` to `"photos/evening.jpg"`. An empty list hides Photographs.
- `rsvp`: see below.

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

`src/styles/global.css` starts with the tokens: ivory, green, rani, gold, marigold. Gold is a hairline. Marigold is the timeline square. The arch is a clip on each photograph. Reduced motion drops the rise and keeps every word where it is. The countdown is one sentence.

## Fonts

| Family | Role | License |
| --- | --- | --- |
| Instrument Serif | Names and headings, weight 400 | SIL OFL |
| Manrope | Interface, 400 and 500 | SIL OFL |
| Noto Sans Gurmukhi | Optional names line, weight 300 | SIL OFL |

`src/assets/fonts/OFL-*.txt` are the license texts. `scripts/fonts/` holds the files the share image is drawn with. Both are generated from the Google Fonts sources. The Latin faces are subset. Gurmukhi is limited to its own letters.
