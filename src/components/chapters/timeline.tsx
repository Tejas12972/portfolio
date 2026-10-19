import { experience } from "@/data/experience"
import { leadership } from "@/data/leadership"
import { site } from "@/data/site"
import { formatPeriod } from "@/lib/timeline"

import { Chapter } from "../story/chapter"
import { TimelineChart } from "./timeline-chart"

export function TimelineChapter() {
  const activities = leadership.filter((a) => a.channel)
  return (
    <Chapter
      id="experience"
      number={7}
      title="Timeline"
      kicker="Experience"
      lead="Read it like a logic analyzer: each channel is high while I was in that role."
    >
      <div className="hidden p-4 md:block">
        <TimelineChart />
      </div>
      <div className="screen-line-top grid gap-6 p-4 md:grid-cols-2">
        <div>
          <h3 className="mono-label mb-3">Work</h3>
          <ol className="grid gap-5">
            {experience.map((r) => (
              <li key={r.id} data-skills={(r.skills ?? []).join("|")}>
                <p className="font-semibold">{r.org}</p>
                <p className="text-[14px]">{r.title}</p>
                <p className="mb-2 font-mono text-xs text-muted-foreground">
                  {formatPeriod(r.start, r.end)} · {r.location}
                </p>
                <ul className="grid gap-1 text-[13.5px]/relaxed text-muted-foreground">
                  {r.points.map((p) => (
                    <li key={p} className="flex gap-2">
                      <span className="mt-2 size-1 shrink-0 rounded-full bg-muted-foreground/60" aria-hidden />
                      {p}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
        <div>
          <h3 className="mono-label mb-3">Alongside</h3>
          <ol className="grid gap-5">
            {activities.map((a) => (
              <li key={a.id}>
                <p className="font-semibold">{a.title}</p>
                <p className="text-[14px]">{a.org}</p>
                <p className="font-mono text-xs text-muted-foreground">{formatPeriod(a.start, a.end)}</p>
              </li>
            ))}
            <li>
              <p className="font-semibold text-signal">Co-op</p>
              <p className="text-[14px]">{site.availability.label}</p>
              <p className="font-mono text-xs text-muted-foreground">
                Jan 2027 – Aug 2027 · embedded and hardware roles
              </p>
            </li>
          </ol>
        </div>
      </div>
    </Chapter>
  )
}
