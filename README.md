# Speakband landing page

Marketing page for [Speakband: IELTS Speaking AI](https://play.google.com/store/apps/details?id=com.speakband.app),
an Android app that scores IELTS Speaking answers with an AI examiner.

Live at **https://sanjar-swe.github.io/**

## How it is built

A React + Vite single page, built to static files and served by GitHub Pages.
No server, no database, no API calls — the page is HTML, CSS, one JS bundle and
a handful of images.

Every product claim on the page (prices, quotas, model names, criteria) comes
from one file: `client/src/content/site.ts`. A hard-coded price inside a section
component is a bug. `LAUNCH_STATE` in that file switches the whole page between
closed-testing and public-release wording.

## Being found by AI assistants

Most of the traffic worth having now arrives through an assistant answering
"what app can score my IELTS Speaking practice?", so the build treats AI
crawlers as a first-class audience:

- **`scripts/prerender.mjs`** renders the page with headless Chrome after the
  Vite build and writes the resulting DOM back over `index.html`. Googlebot
  executes JavaScript, but GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot and
  CCBot largely do not — without this step they see an empty `<div id="root">`.
- **`client/public/llms.txt`** and **`llms-full.txt`** state every fact in plain
  text: pricing, quotas, what is scored and how, what the app does not do.
  An assistant can quote figures instead of inventing them.
- **`client/public/robots.txt`** names each AI crawler explicitly, because
  several ignore a bare wildcard rule.
- **`StructuredData.tsx`** emits schema.org JSON-LD — SoftwareApplication with
  offers, FAQPage, HowTo, Organization — generated from `site.ts`, so the markup
  cannot drift away from the visible page.

When prices, quotas or claims change, update `site.ts` **and** the two `llms*`
files. They are the same facts written twice, for two different readers.

## Commands

```bash
pnpm install
pnpm dev              # local dev server
pnpm build            # vite build → prerender → dist/public
node scripts/serve-dist.mjs   # serve the built site exactly as Pages will
pnpm check            # typecheck
./scripts/deploy.sh   # build and publish dist/public to the gh-pages branch
```

`pnpm build` needs a Chrome or Chromium on the machine for the prerender step.
Set `CHROME_PATH` if it lives somewhere unusual.

## Layout

```
client/src/content/site.ts     every product fact, single source of truth
client/src/components/sections real page sections, in render order
client/public/                 static files copied verbatim: llms.txt, robots.txt, images
scripts/prerender.mjs          post-build static-HTML snapshot
scripts/deploy.sh              publish to GitHub Pages
```
