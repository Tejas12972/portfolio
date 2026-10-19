# CLAUDE.md

Personal portfolio for Karthik (Tejas) Basavarajappa, aimed at embedded and
hardware co-op recruiters. One page, ten chapters, Next.js 16 App Router with
Cache Components, Tailwind v4, Motion, Base UI + cmdk. Deployed on Vercel from
`main`.

## Commands

- `pnpm dev` / `pnpm build` / `pnpm start`
- `pnpm test` (vitest, `src/lib/__tests__`), `pnpm lint`, `pnpm format` (prettier, no semicolons)

## Layout

- `src/data/`: all content. Edit here, not in components.
- `src/components/chapters/`: one file per chapter; `*-scene.tsx` are the client-side pinned scenes.
- `src/components/story/`: `PinnedScene` (sticky stage + normal-scrolling captions) and `useScenesEnabled`.
- `src/lib/github.ts`: GitHub GraphQL, `"use cache"` + `cacheLife("hours")`, static fallback without a token.
- `DESIGN.md`: what was ported from chanhdai.com and the motion rules.

## Rules that matter

- **Facts must be checkable.** Every number on the site comes from a repo or
  the user. If you can't verify it, leave it out. Lumen's README says 28 MCP
  tools but the code exposes 44; the site uses the code.
- **No phone number anywhere**: page, vCard, JSON-LD, metadata, resume PDF. `src/lib/__tests__/vcard.test.ts` checks the vCard.
- **The email address never appears whole in server HTML.** It's assembled client-side (`src/components/email.tsx`).
- **Motion:** only the CSS intro runs without input. Everything else is
  scroll, hover, or click driven. Animate transform/opacity (and SVG pathLength)
  only. No scroll-jacking, snapping, or Lenis. Reduced motion and < 768 px get
  stacked, static steps.
- Phone Box copy must say Claude Code wrote most of the code and the CAD,
  fuel-gauge mod, and bench debugging were done by hand (matches its README).
- Keep the chanhdai.com MIT notice in ported files and the footer credit.
- Never commit `.env*` or tokens.
