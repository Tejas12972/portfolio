import { recycleRightMedia, wordleVideo } from "@/data/media"
import { recycleRight, wordleSolver, type Project } from "@/data/projects"

import { Figure } from "../figure"
import { LoopVideo } from "../loop-video"
import { ProjectMeta, SkillTags } from "../project-meta"
import { Chapter } from "../story/chapter"

function Card({ project, children }: { project: Project; children: React.ReactNode }) {
  return (
    <article
      data-skills={project.skills.join("|")}
      className="flex flex-col gap-3 rounded-lg border p-3"
      aria-labelledby={`${project.id}-h`}
    >
      {children}
      <div className="flex flex-col gap-1">
        <p className="mono-label">{project.kind}</p>
        <h3 id={`${project.id}-h`} className="text-lg font-semibold tracking-tight">
          {project.name}
        </h3>
        <p className="text-[14px]/relaxed">{project.summary}</p>
      </div>
      <ul className="grid gap-1 text-[13.5px]/relaxed text-muted-foreground">
        {project.points.map((p) => (
          <li key={p}>{p}</li>
        ))}
      </ul>
      <div className="mt-auto flex flex-col gap-3">
        <SkillTags skills={project.skills} />
        <ProjectMeta project={project} />
      </div>
    </article>
  )
}

export function EarlierChapter() {
  return (
    <Chapter id="earlier" number={6} title="Earlier builds" kicker="2024–2025">
      <div className="grid gap-4 p-4 sm:grid-cols-2">
        <Card project={recycleRight}>
          <Figure media={recycleRightMedia} sizes="(min-width: 640px) 360px, 100vw" className="rounded-md" />
        </Card>
        <Card project={wordleSolver}>
          <figure className="overflow-hidden rounded-md border">
            <LoopVideo video={wordleVideo} />
          </figure>
        </Card>
      </div>
    </Chapter>
  )
}
