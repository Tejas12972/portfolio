import { lumenVideo } from "@/data/media"
import { lumen } from "@/data/projects"
import { getGitHubData } from "@/lib/github"

import { LoopVideo } from "../loop-video"
import { ProjectMeta, SkillTags } from "../project-meta"
import { RepoCard } from "../repo-card"
import { Chapter } from "../story/chapter"
import { LumenScene } from "./lumen-scene"

export async function LumenRepoCard() {
  const gh = await getGitHubData()
  const repo = gh.repos.find((r) => r.nameWithOwner === lumen.repo)
  return repo ? <RepoCard repo={repo} live={gh.live} /> : null
}

export function LumenChapter({ repoCard }: { repoCard: React.ReactNode }) {
  return (
    <Chapter
      id="lumen"
      number={4}
      title={lumen.name}
      kicker="Software · co-built"
      lead={<>{lumen.summary} This is the one I&apos;m proudest of.</>}
      meta={<ProjectMeta project={lumen} />}
    >
      <div data-skills={lumen.skills.join("|")}>
        <LumenScene />
      </div>
      <div className="screen-line-top grid gap-3 p-4 sm:grid-cols-[2fr_1fr]">
        <figure className="overflow-hidden rounded-lg border">
          <LoopVideo video={lumenVideo} />
          <figcaption className="border-t px-3 py-2 text-xs text-muted-foreground">
            Asking the agent to open Hacker News and list the top stories.
          </figcaption>
        </figure>
        <div className="flex flex-col gap-3">
          {repoCard}
          <p className="rounded-lg border border-dashed px-3 py-2 text-[13px] text-muted-foreground">{lumen.credit}</p>
        </div>
      </div>
      <div className="screen-line-top p-4">
        <SkillTags skills={lumen.skills} />
      </div>
    </Chapter>
  )
}
