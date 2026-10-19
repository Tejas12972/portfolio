import { phoneBoxMedia, phoneBoxVideo } from "@/data/media"
import { phoneBox } from "@/data/projects"

import { Figure } from "../figure"
import { LoopVideo } from "../loop-video"
import { ProjectMeta, SkillTags } from "../project-meta"
import { Chapter } from "../story/chapter"
import { PhoneBoxScene } from "./phonebox-scene"

export function PhoneBoxChapter() {
  return (
    <Chapter
      id="phone-box"
      number={2}
      title={phoneBox.name}
      kicker="Hardware"
      lead={phoneBox.summary}
      meta={<ProjectMeta project={phoneBox} />}
    >
      <div data-skills={phoneBox.skills.join("|")}>
        <PhoneBoxScene />
      </div>
      <div className="screen-line-top grid grid-cols-2 items-start gap-3 p-4 sm:grid-cols-4">
        <Figure media={phoneBoxMedia.timer} sizes="(min-width: 640px) 180px, 50vw" />
        <Figure media={phoneBoxMedia.battery} sizes="(min-width: 640px) 180px, 50vw" />
        <figure className="overflow-hidden rounded-lg border bg-muted">
          <LoopVideo video={phoneBoxVideo} />
        </figure>
        <div className="col-span-2 flex flex-col gap-3 sm:col-span-1">
          <Figure media={phoneBoxMedia.dashboard} sizes="(min-width: 640px) 180px, 100vw" />
          <p className="text-xs text-muted-foreground">
            The display&apos;s override screen, and the web dashboard that shows focus history.
          </p>
        </div>
      </div>
      <div className="screen-line-top flex flex-col gap-3 p-4">
        <p className="rounded-lg border border-dashed px-3 py-2 text-[13px] text-muted-foreground">{phoneBox.credit}</p>
        <SkillTags skills={phoneBox.skills} />
      </div>
    </Chapter>
  )
}
