# portfolio

The personal site of Karthik (Tejas) Basavarajappa: a one-page, scroll-through
portfolio for embedded and hardware co-op recruiting. Next.js (App Router) on
Vercel.

Design based on [chanhdai.com](https://chanhdai.com) by Chánh Đại
([ncdai/chanhdai.com](https://github.com/ncdai/chanhdai.com), MIT). The ported
pieces keep his copyright notice in their file headers and in `LICENSE`; see
`DESIGN.md` for exactly what was taken and the motion plan per chapter.

## Setup

Requires Node 22+ and pnpm.

```bash
pnpm install
cp .env.example .env.local   # optional: add GITHUB_TOKEN for live GitHub data
pnpm dev                     # http://localhost:3000
```

Without `GITHUB_TOKEN` the site still builds; the GitHub section shows static
repo cards instead of the live contribution graph and star counts.

```bash
pnpm build && pnpm start     # production build
pnpm test                    # unit tests (Black-Scholes, 4PL, timeline, vCard)
pnpm lint
pnpm format
```

## Editing content

Everything on the page comes from typed files in `src/data/`. You shouldn't
need to touch components to update the site.

| File | What's in it |
| --- | --- |
| `site.ts` | Name, tagline, email (stored in two parts), links, availability, resume switch, LinkedIn headline and optional post embed |
| `projects.ts` | Every project: summary, points, skills, links, repo, and the scroll steps for Phone Box, ShoreClear, and Lumen |
| `media.ts` | Images and videos per project, with alt text |
| `experience.ts` | Jobs, shown in the timeline and the work list |
| `leadership.ts` | Eagle Scout, FLL, teaching. Give an item a `channel` to put it on the timeline |
| `skills.ts` | Skill groups. Names must match the `skills` arrays in `projects.ts` / `experience.ts` for hover highlighting |
| `repos.ts` | Which repos get live cards |
| `chapters.ts` | Chapter names in the progress rail and ⌘K menu |

### Add a project

1. Add an entry to `src/data/projects.ts` (copy an existing one) and add it to
   the `projects` array at the bottom.
2. Put images in `public/media/<project>/` (webp, ≤ 1600 px wide) and describe
   them in `src/data/media.ts`. Always write real alt text.
3. Show it on the page: the quickest way is to add a `<Card>` in
   `src/components/chapters/earlier.tsx`. For a chapter of its own, copy
   `shoreclear.tsx`, add it to `src/app/page.tsx`, and add its id to
   `src/data/chapters.ts`.
4. Add the repo to `src/data/repos.ts` if it should get a live card.

### Swap the resume

1. Export a PDF **without your phone number** and save it as `public/resume.pdf`.
2. In `src/data/site.ts`, set `resume.available` to `true`.

The drawer, the download button, and the ⌘K entry switch on automatically.

## Environment variables

| Name | Where | Purpose |
| --- | --- | --- |
| `GITHUB_TOKEN` | Vercel (Production + Preview) | Fine-grained token, **public repositories, read-only**. GraphQL for contributions and repo cards, cached for an hour. |
| `NEXT_PUBLIC_SITE_URL` | optional | Canonical URL. Defaults to Vercel's production URL. |

Never commit a token. `.env*` files are gitignored except `.env.example`.

## Deploy

The Vercel project is connected to this GitHub repo, so every push to `main`
deploys to production and every other branch gets a preview URL. Vercel Web
Analytics and Speed Insights are wired in (`src/app/layout.tsx`); turn them on
in the Vercel dashboard under the project's Analytics and Speed Insights tabs.

`scripts/qr.mjs <url>` writes a QR code PNG of the site for printing on a resume.

## License

MIT, see `LICENSE`. Portions © 2026 Chánh Đại, also MIT.
