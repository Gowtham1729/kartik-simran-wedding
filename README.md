# Kartik and Simran

A save-the-date for Saturday, 27 February 2027, India time. Astro builds a static site. GitHub Pages serves it.

**Live site:** https://gowtham1729.github.io/kartik-simran-wedding/

```
src/config/wedding.ts     The words. Edit this.
src/config/site.ts        Origin and base path. Touch this for a custom domain.
src/styles/global.css     Colour, type, spacing. Tokens are at the top.
src/components/           One file per section. Empty sections render nothing.
public/                   Favicon, share image, and any photographs.
docs/design-research.md   Why the page looks like this.
```

The design is a Punjabi wedding invitation on a wheat ground: Eczar for the names, a rani stitch down the margin, and one marigold diamond. Reading text is Newsreader. The clock and the folio are Azeret Mono. All three are SIL Open Font License, subset, and self-hosted. Licenses are in `src/assets/fonts/`.

## Edit the content

Open `src/config/wedding.ts`. Leave a string as `""` and a list as `[]` until you know the real value.

- `partnerOne`, `partnerTwo`: first names.
- `date`: `"YYYY-MM-DD"`, or `null` to hide the date and the countdown. The weekday is calculated.
- `time`: `"HH:MM"` in 24-hour time, or `null`. Null counts down to midnight at the start of the day, and the page says so. Guests should not think the ceremony is at midnight.
- `utcOffset`: `"+05:30"` is India Standard Time. The countdown uses it, so it hits zero at the same moment everywhere.
- `city`: `""` shows "City to be announced".
- `intro`: the sentence under Details. `""` hides it.
- `venue`: `name`, `address`, `notes`, `mapsUrl`. A maps link becomes "Open the map". The venue section appears once any of these is filled in.
- `events`: one object per ceremony, in order. `note: ""` hides that line.
- `travel`: `notes` and `stays`. Hidden until one of them is filled in.
- `dressCode`: one or two sentences. Hidden until set. It shows as a row in Details.
- `story`: an array of paragraphs. Hidden until you write them.
- `faq`: `{ question, answer }`. Hidden until there is one.
- `gallery`: `{ src, alt, width, height }`. Put files in `public/photos/` and set `src` to `"photos/evening.jpg"`. `width` and `height` are the pixel size of the file, so the layout does not jump.
- `rsvp`: see below.

Do not invent a city, a venue, or a story. Guests will treat the page as fact.

## Reply link

There is no form on this site and nowhere for replies to be stored. Set `rsvp.mode`:

| mode | value | What the guest gets |
| --- | --- | --- |
| `""` | `""` | The row says "Not open yet". No button. |
| `"url"` | a Google Form link, or any https link | Recommended. Opens in a new tab. |
| `"mailto"` | an email address | Opens an email with the subject filled in. |
| `"whatsapp"` | digits only, country code included, such as `"919876543210"` | Opens WhatsApp. `whatsappMessage` is optional prefilled text. |

`"url"` is the right default once you know the questions you want to ask. A Google Form can collect names, a count, and which events someone can attend, without a server here.

## Preview

Node 22 or newer.

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

`src/styles/global.css` starts with the tokens: wheat, ink, rani, marigold, and the three families. A column of rani stitches draws down the left edge on load. Reduced motion shows the stitches already there, and the countdown numbers change without the tick.

## Fonts

| Family | Role | License |
| --- | --- | --- |
| Eczar | Names, the day number, headings | SIL OFL |
| Newsreader | Prose, the word "and" | SIL OFL |
| Azeret Mono | The folio, the countdown | SIL OFL |

`src/assets/fonts/OFL-*.txt` are the license texts. `scripts/fonts/` holds the instances the share image is drawn with. Both are generated from the Google Fonts sources and subset to Latin.
