# Design

A one-page portfolio for embedded and hardware co-op recruiting. The reader is a
recruiter or engineer skimming for about a minute, so the first screen answers
four things before any animation finishes: who this is, what he builds, that he's
available January–August 2027, and where the resume is.

## What's taken from chanhdai.com

The look is based on [Chánh Đại's portfolio](https://chanhdai.com)
([repo](https://github.com/ncdai/chanhdai.com), MIT). Only these pieces were
ported, each keeping his copyright notice in the file header:

| From his repo | Here | Notes |
| --- | --- | --- |
| `src/styles/globals.css`: zinc oklch tokens, `--line`, `screen-line-*`, `diagonal-stripes`, `stripe-divider` | `src/app/globals.css` | Accent color is ours (an oscilloscope-trace green), not his blue. |
| `features/portfolio/components/panel.tsx` | `src/components/panel.tsx` | Unchanged API. |
| `components/theme-toggle.tsx` ("Dark Side" icon) | `src/components/theme-toggle.tsx` | No click sound. Keeps the `D` hotkey. |
| `components/ui/command.tsx` + `ui/dialog.tsx` (cmdk on Base UI) | `src/components/ui/` | Command menu content is new. |
| `registry/components/work-experience` | `src/components/work-experience.tsx` | Plain-text bullets, no markdown, no idle "ping" dot. |
| `registry/components/contribution-graph` (level theme) | `src/components/contribution-graph.tsx` | Fed by GitHub GraphQL, which already groups days into weeks, so no date-fns. |

Not taken: blog, component registry, docs, sponsors, ads, bookmarks, analytics
IDs, his mark/wordmark/avatar, vCard, OG images, llms.txt. Per his TRADEMARK.md
the identity is different: our own monogram, accent color, and footer.

## Layout

A single centered column (`max-w-3xl`, widening to `max-w-6xl` from 1024 px, `border-x`) with full-bleed hairlines
between panels and diagonal-stripe dividers between chapters. Geist Sans for
text, Geist Mono for labels, data, and anything that reads like a datasheet.
Light and dark themes, both defined as tokens; the toggle rotates a half-filled
circle.

A slim chapter rail (left of the column from 1536 px, a top strip below that) shows the chapter
names and how far through the page you are.

## Motion rules

- One intro sequence on load (about 1.2 s). After that, nothing moves unless
  the visitor scrolls, hovers, or clicks. No looping idle animations.
- Each chapter gets one scroll-linked idea. No generic fade-up on every block.
- Native scrolling only: no scroll-jacking, no snapping, no Lenis. Pinned scenes
  are `position: sticky` stages (a left column from 1024 px) inside tall sections, so anchor links and ⌘K
  jumps land normally.
- Only `transform`, `opacity`, and SVG `pathLength` animate.
- `prefers-reduced-motion`, or a viewport under 768 px: the same content as
  plain stacked steps, nothing pinned, nothing animated.
- Videos are muted, looping, `playsInline`, and only play while on screen.

## Chapters

| # | Chapter | Scroll-linked idea |
| --- | --- | --- |
| 1 | Intro | The load sequence: name, one line, availability badge, then Resume / Email / GitHub / LinkedIn. A featured-builds panel sits beside it on wide screens. |
| 2 | Phone Box | Pinned system diagram: ESP32-S3 in the middle; touch and fuel gauge on I²C, servo on PWM, LiPo rail with bulk cap, BLE out to the app and Firebase. Each step lights its traces and tells that part, including the servo brownout. |
| 3 | ShoreClear | Pinned photo stage that crossfades through problem → CAD → fabrication → drive electronics → what I did. |
| 4 | Lumen | Pinned browser frame whose screenshot swaps per step: agent, model options, MCP server, tabs. Live repo card. |
| 5 | Data & markets | Options: interactive Black-Scholes widget (sliders → price and greeks), labeled as an illustration. ELISA: the study's straight-line fit bends into the 4PL as you scroll, on the real plate-1 standards; live demo loads only on click. |
| 6 | Earlier builds | Compact cards; the Wordle demo plays only while visible. |
| 7 | Experience | Plain rows: role, dates, and tags on the left, what I did on the right. Static. |
| 8 | Skills & GitHub | Hover or tap a skill and the projects that use it light up. Live contribution graph and repo cards. |
| 9 | Beyond code | Eagle Scout, FLL state title, teaching. A static panel. |
| 10 | Contact | Email with copy button, LinkedIn, GitHub, resume, vCard. |
