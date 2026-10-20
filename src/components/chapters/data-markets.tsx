import { elisaMedia, optionsMedia } from "@/data/media"
import { elisa, optionsAnalytics } from "@/data/projects"

import { Figure } from "../figure"
import { ProjectMeta, SkillTags } from "../project-meta"
import { Chapter } from "../story/chapter"
import { BsmWidget } from "./bsm-widget"
import { ElisaChart } from "./elisa-chart"
import { ElisaDemo } from "./elisa-demo"

function Points({ points }: { points: string[] }) {
  return (
    <ul className="grid gap-1.5 text-[14px]/relaxed text-muted-foreground">
      {points.map((p) => (
        <li key={p} className="flex gap-2">
          <span className="mt-2.5 size-1 shrink-0 rounded-full bg-signal" aria-hidden />
          {p}
        </li>
      ))}
    </ul>
  )
}

export function DataMarketsChapter() {
  return (
    <Chapter
      id="data"
      number={5}
      title="Data and markets"
      kicker="Software · solo"
      lead="Two projects where the math has to be right before the interface matters."
    >
      <article
        aria-labelledby="options-title"
        data-skills={optionsAnalytics.skills.join("|")}
        className="flex flex-col gap-4 p-4"
      >
        <div className="flex flex-col gap-2">
          <h3 id="options-title" className="text-xl font-semibold tracking-tight">
            {optionsAnalytics.name}
          </h3>
          <p className="text-[15px]/relaxed">{optionsAnalytics.summary}</p>
          <ProjectMeta project={optionsAnalytics} />
        </div>
        <BsmWidget />
        <div className="grid gap-4 sm:grid-cols-[1fr_1fr]">
          <Points points={optionsAnalytics.points} />
          <Figure media={optionsMedia} caption="The option chain, with IV and greeks computed locally." />
        </div>
        <SkillTags skills={optionsAnalytics.skills} />
      </article>

      <article
        aria-labelledby="elisa-title-h"
        data-skills={elisa.skills.join("|")}
        className="screen-line-top flex flex-col gap-4 p-4"
      >
        <div className="flex flex-col gap-2">
          <h3 id="elisa-title-h" className="text-xl font-semibold tracking-tight">
            {elisa.name}
          </h3>
          <p className="text-[15px]/relaxed">{elisa.summary}</p>
          <ProjectMeta project={elisa} />
        </div>
        <div className="grid gap-4 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:items-start">
          <div className="rounded-lg border p-3">
            <ElisaChart />
          </div>
          <div className="flex flex-col gap-4">
            <p className="text-[14px]/relaxed text-muted-foreground">
              This is plate 1 of a public 110-mouse IL-6 study. The authors calibrated with a straight line, which reads
              their own standards back at 99–134% of nominal, worst at the low end where most samples sit. The
              pipeline&apos;s weighted 4PL reads the same standards at 94–102%. Across all four plates, the straight
              lines range 28–142%.
            </p>
            <Points points={elisa.points} />
          </div>
        </div>
        <div className="grid gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:items-start">
          <ElisaDemo />
          <Figure media={elisaMedia} caption="The app running in the browser, no server." />
        </div>
        <SkillTags skills={elisa.skills} />
      </article>
    </Chapter>
  )
}
