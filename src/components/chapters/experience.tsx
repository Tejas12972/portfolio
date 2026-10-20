import { experience } from "@/data/experience"
import { site } from "@/data/site"
import { formatPeriod } from "@/lib/dates"

import { SkillTags } from "../project-meta"
import { Chapter } from "../story/chapter"

export function ExperienceChapter() {
  return (
    <Chapter id="experience" number={7} title="Experience" kicker="Work">
      <ol>
        {experience.map((r) => (
          <li
            key={r.id}
            data-skills={(r.skills ?? []).join("|")}
            className="screen-line-bottom grid gap-3 p-4 last:after:content-none lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-8 lg:py-6"
          >
            <div className="flex flex-col gap-1">
              <h3 className="flex items-center gap-2 text-lg font-semibold tracking-tight">
                {r.org}
                {!r.end && <span className="size-2 rounded-full bg-signal" aria-label="Current" role="img" />}
              </h3>
              <p className="text-[14px]">{r.title}</p>
              <p className="font-mono text-xs text-muted-foreground">
                {formatPeriod(r.start, r.end)} · {r.location}
              </p>
              {r.skills && r.skills.length > 0 && (
                <div className="mt-2">
                  <SkillTags skills={r.skills} />
                </div>
              )}
            </div>
            <ul className="grid content-start gap-2 text-[14.5px]/relaxed text-muted-foreground">
              {r.points.map((p) => (
                <li key={p} className="flex gap-2.5">
                  <span className="mt-2.5 size-1 shrink-0 rounded-full bg-signal" aria-hidden />
                  {p}
                </li>
              ))}
            </ul>
          </li>
        ))}
        <li className="grid gap-3 border-t p-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-8 lg:py-6">
          <div className="flex flex-col gap-1">
            <h3 className="text-lg font-semibold tracking-tight">{site.school.name}</h3>
            <p className="text-[14px]">{site.school.degree}</p>
            <p className="font-mono text-xs text-muted-foreground">{site.school.graduation} · Boston, MA</p>
          </div>
          <p className="text-[14.5px]/relaxed text-muted-foreground">
            {site.availability.label}, for embedded and hardware roles.
          </p>
        </li>
      </ol>
    </Chapter>
  )
}
