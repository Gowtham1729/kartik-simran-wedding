# Kartik & Simran

A small, static wedding website. Plain HTML, CSS and a little vanilla JavaScript.
There is no framework and no build step. What's in `public/` is exactly what gets deployed.

**Live site:** https://gowtham1729.github.io/kartik-simran-wedding/

```
public/
  index.html    Page structure and section markup
  styles.css    All styling. Colours, fonts and spacing live in :root at the top
  script.js     The WEDDING config object, plus the code that renders it
  favicon.svg   K&S monogram
.github/workflows/pages.yml   CI/CD to GitHub Pages
```

## Deploys

Hosting is GitHub Pages, deployed by `.github/workflows/pages.yml`:

- **Push to `main`** and the workflow uploads `public/` and publishes it. The site
  updates a minute or so after the run goes green (see the Actions tab).
- You can also redeploy by hand from Actions, "Deploy to GitHub Pages", "Run workflow".

There are no secrets or keys to manage. The workflow uses GitHub's built-in Pages
permissions.

The site is served from the `/kartik-simran-wedding/` subpath, so keep links to
files relative (`styles.css`, not `/styles.css`). Absolute paths would point at
`gowtham1729.github.io/` and break.

## Editing the content

Almost everything you'll want to change is in the `WEDDING` object at the top of
`public/script.js`:

- `partnerOne`, `partnerTwo`, `tagline`: the hero text.
- `date`: the wedding day as `"YYYY-MM-DD"`. It is set to `"2027-02-27"`, which the
  page shows as "Saturday, 27 February 2027". Set it to `null` to show `dateFallback`
  and hide the countdown.
- `time`: optional start time as `"HH:MM"` (24-hour), for example `"18:30"`. While it
  is `null`, the countdown runs to the start of the day.
- `utcOffset`: the timezone of `date` and `time`. `"+05:30"` is India time, so the
  countdown hits zero at the same moment for every guest, wherever they are.
- `city`: the small line under the date.
- `venue`: `name`, `address`, optional `notes`, and `mapsUrl`. Paste a Google Maps
  share link into `mapsUrl` and an "Open in Google Maps" button appears. While it is
  empty, the page says "Map link coming soon".
- `events`: one object per event, rendered in order as cards. Each has `name`,
  `date`, `time`, `location` and `description`. Entries with `placeholder: true` get a
  visible "Placeholder" tag, so remove that flag once an event is real.
- `footerNote`: the line in the footer.

Apart from the date, all current values (city, venue, events) are placeholders.

To change the look, start with the CSS variables in `:root` in `public/styles.css`
(ivory background, deep green accent, gold ornaments, fonts). Fonts are Cormorant
Garamond and Inter from Google Fonts, loaded in `index.html`.

Motion is limited to a gentle fade-in on scroll, and it is switched off for anyone
with "reduce motion" turned on in their OS settings.

## Previewing locally

From the repo root, either of these works:

```sh
npx serve public
# or
python3 -m http.server 8000 -d public
```

Then open the URL it prints (for the Python one, http://localhost:8000).

## Custom domain (later)

If you buy a domain, you can point it at this site:

1. Add a file `public/CNAME` containing just the domain, for example
   `kartikandsimran.com`, and push it.
2. In the repo, go to Settings, then Pages, enter the same domain under
   "Custom domain", and tick "Enforce HTTPS" once it is available.
3. At your domain registrar, add the DNS records GitHub lists in its
   [custom domain docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)
   (a `CNAME` to `gowtham1729.github.io` for a `www` subdomain, or the `A` records
   for an apex domain).
