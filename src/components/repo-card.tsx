import { StarIcon } from "lucide-react"

import type { Repo } from "@/lib/github"

const dateFmt = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" })

export function RepoCard({ repo, live }: { repo: Repo; live: boolean }) {
  const [owner, name] = repo.nameWithOwner.split("/")
  return (
    <a
      href={repo.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex h-full flex-col gap-2 rounded-lg border bg-background p-3 transition-colors hover:bg-accent/60"
    >
      <p className="font-mono text-[13px]">
        <span className="text-muted-foreground">{owner}/</span>
        <span className="font-medium text-foreground group-hover:underline">{name}</span>
      </p>
      {repo.description && <p className="line-clamp-2 text-[13px] text-muted-foreground">{repo.description}</p>}
      {live && (
        <p className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] text-muted-foreground">
          {repo.language && (
            <span className="inline-flex items-center gap-1.5">
              <span
                className="size-2 rounded-full"
                style={{ backgroundColor: repo.language.color ?? "var(--muted-foreground)" }}
                aria-hidden
              />
              {repo.language.name}
            </span>
          )}
          <span className="inline-flex items-center gap-1">
            <StarIcon className="size-3" aria-hidden />
            {repo.stars}
            <span className="sr-only">stars</span>
          </span>
          {repo.pushedAt && <span>Updated {dateFmt.format(new Date(repo.pushedAt))}</span>}
        </p>
      )}
      <span className="sr-only">(opens GitHub in a new tab)</span>
    </a>
  )
}
