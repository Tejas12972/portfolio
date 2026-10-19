import { shoreClearExtras } from "@/data/media"
import { shoreClear } from "@/data/projects"

import { Figure } from "../figure"
import { ProjectMeta, SkillTags } from "../project-meta"
import { Chapter } from "../story/chapter"
import { ShoreClearScene } from "./shoreclear-scene"

export function ShoreClearChapter() {
  return (
    <Chapter
      id="shoreclear"
      number={3}
      title={shoreClear.name}
      kicker="Hardware · team project"
      lead={shoreClear.summary}
      meta={<ProjectMeta project={shoreClear} />}
    >
      <div data-skills={shoreClear.skills.join("|")}>
        <ShoreClearScene />
      </div>
      <div className="screen-line-top grid grid-cols-2 items-start gap-3 p-4 sm:grid-cols-4">
        {shoreClearExtras.map((x) => (
          <Figure key={x.media.src} media={x.media} caption={x.caption} sizes="(min-width: 640px) 180px, 50vw" />
        ))}
      </div>
      <div className="screen-line-top flex flex-col gap-3 p-4">
        <p className="text-[13px] text-muted-foreground">
          Next time: screws and slots so parts can be swapped, lighter printed parts in place of wood, ultrasonic or IR
          sensing, and autonomous driving.
        </p>
        <p className="rounded-lg border border-dashed px-3 py-2 text-[13px] text-muted-foreground">
          {shoreClear.credit}
        </p>
        <SkillTags skills={shoreClear.skills} />
      </div>
    </Chapter>
  )
}
