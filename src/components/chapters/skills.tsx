import { Suspense } from "react"

import { site } from "@/data/site"
import { getGitHubData } from "@/lib/github"

import { ContributionGraph } from "../contribution-graph"
import { RepoCard } from "../repo-card"
import { Chapter } from "../story/chapter"
import { SkillsExplorer } from "./skills-explorer"

async function GitHubPanel() {
  const gh = await getGitHubData()
  return (
    <div className="grid gap-4">
      {gh.live && gh.weeks.length > 0 && <ContributionGraph weeks={gh.weeks} total={gh.totalContributions} />}
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {gh.repos.map((r) => (
          <li key={r.nameWithOwner}>
            <RepoCard repo={r} live={gh.live} />
          </li>
        ))}
      </ul>
    </div>
  )
}

function GitHubSkeleton() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3" aria-hidden>
      {Array.from({ length: 6 }, (_, i) => (
        <div key={i} className="h-24 rounded-lg border bg-muted/40" />
      ))}
    </div>
  )
}

export function SkillsChapter() {
  return (
    <Chapter id="skills" number={8} title="Skills and GitHub" kicker="Toolbox">
      <SkillsExplorer />
      <div className="screen-line-top grid gap-3 p-4">
        <div className="flex items-baseline justify-between">
          <h3 className="mono-label">GitHub</h3>
          <a
            href={site.github.url}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline font-mono text-xs"
          >
            @{site.github.username}
          </a>
        </div>
        <Suspense fallback={<GitHubSkeleton />}>
          <GitHubPanel />
        </Suspense>
      </div>
    </Chapter>
  )
}
