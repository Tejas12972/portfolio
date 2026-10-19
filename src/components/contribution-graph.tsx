// Level styling adapted from chanhdai.com's contribution-graph
// (https://github.com/ncdai/chanhdai.com). MIT License. Copyright (c) 2026 Chánh Đại.

import type { ContributionDay } from "@/lib/github"

const SIZE = 10
const GAP = 3
const LEVEL_FILL = [
  "color-mix(in oklab, var(--muted-foreground) 8%, transparent)",
  "color-mix(in oklab, var(--signal) 30%, transparent)",
  "color-mix(in oklab, var(--signal) 55%, transparent)",
  "color-mix(in oklab, var(--signal) 78%, transparent)",
  "var(--signal)",
]

export function ContributionGraph({ weeks, total }: { weeks: ContributionDay[][]; total: number | null }) {
  const width = weeks.length * (SIZE + GAP)
  const height = 7 * (SIZE + GAP)
  return (
    <figure className="flex flex-col gap-2">
      <div className="overflow-x-auto" tabIndex={0} aria-label="Contribution graph, scrolls sideways">
        <svg
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          role="img"
          aria-label={`${total ?? 0} GitHub contributions in the last year`}
          className="block"
        >
          {weeks.map((week, wi) =>
            week.map((d) => (
              <rect
                key={d.date}
                x={wi * (SIZE + GAP)}
                y={new Date(`${d.date}T00:00:00Z`).getUTCDay() * (SIZE + GAP)}
                width={SIZE}
                height={SIZE}
                rx={2}
                fill={LEVEL_FILL[d.level]}
              >
                <title>{`${d.count} contribution${d.count === 1 ? "" : "s"} on ${d.date}`}</title>
              </rect>
            )),
          )}
        </svg>
      </div>
      <figcaption className="flex items-center justify-between font-mono text-[11px] text-muted-foreground">
        <span>{total?.toLocaleString("en-US")} contributions in the last year</span>
        <span className="flex items-center gap-1" aria-hidden>
          Less
          {LEVEL_FILL.map((f) => (
            <span key={f} className="size-2.5 rounded-[2px]" style={{ background: f }} />
          ))}
          More
        </span>
      </figcaption>
    </figure>
  )
}
