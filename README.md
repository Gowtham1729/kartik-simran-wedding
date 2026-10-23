# Kartik & Simran

A small, static wedding website. Plain HTML, CSS and a little vanilla JavaScript.
There is no framework and no build step. What's in `public/` is exactly what gets deployed.

```
public/
  index.html    Page structure and section markup
  styles.css    All styling. Colours, fonts and spacing live in :root at the top
  script.js     The WEDDING config object, plus the code that renders it
  favicon.svg   K&S monogram
firebase.json   Firebase Hosting config (public dir, cache headers)
.firebaserc     Firebase project id
.github/workflows/deploy.yml   CI/CD to Firebase Hosting
```

## Editing the content

Almost everything you'll want to change is in the `WEDDING` object at the top of
`public/script.js`:

- `partnerOne`, `partnerTwo`, `tagline`: the hero text.
- `date`: an ISO 8601 date-time with a timezone offset, for example
  `"2027-02-14T18:00:00+05:30"`. While it is `null` the page shows `dateFallback`
  ("Date to be announced") and the countdown stays hidden. Set a real date and the
  formatted date and a live countdown appear automatically.
- `city`: the small line under the date.
- `venue`: `name`, `address`, optional `notes`, and `mapsUrl`. Paste a Google Maps
  share link into `mapsUrl` and an "Open in Google Maps" button appears. While it is
  empty, the page says "Map link coming soon".
- `events`: one object per event, rendered in order as cards. Each has `name`,
  `date`, `time`, `location` and `description`. Entries with `placeholder: true` get a
  visible "Placeholder" tag, so remove that flag once an event is real.
- `footerNote`: the line in the footer.

All current values are placeholders. Nothing about real dates or venues has been
filled in yet.

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

If you have the Firebase CLI, `firebase serve --only hosting` (or
`firebase emulators:start --only hosting`) also works and applies the headers from
`firebase.json`.

## Deploys

Deploys run from `.github/workflows/deploy.yml` using
[FirebaseExtended/action-hosting-deploy](https://github.com/FirebaseExtended/action-hosting-deploy):

- **Push to `main`**: deploys to the live site, at
  `https://<project-id>.web.app`.
- **Pull request**: deploys a temporary preview channel (expires after 7 days) and
  the action comments the preview URL on the PR. PRs from forks are skipped,
  because they can't read the repo secrets.

The Firebase project id is `kartik-simran-wedding`. It appears in two places,
`.firebaserc` and the `FIREBASE_PROJECT_ID` env in the workflow, so change both if
the project id changes.

## The secret

The workflow authenticates with a Firebase service account stored as a GitHub
Actions secret named **`FIREBASE_SERVICE_ACCOUNT`** (repo Settings, then Secrets and
variables, then Actions). Its value is the full JSON key of a service account with
Firebase Hosting admin access.

The easiest way to create it is `firebase init hosting:github` from the repo root,
which makes the service account and adds the secret for you. Never commit the JSON
key to the repo; `.gitignore` blocks the usual filenames as a safety net.

`GITHUB_TOKEN` is provided by GitHub automatically and is only used to post the PR
preview comment.
