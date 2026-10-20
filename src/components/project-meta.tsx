import { ArrowUpRightIcon } from "lucide-react"

import type { Project } from "@/data/projects"

export function ProjectMeta({ project }: { project: Project }) {
  return (
    <div className="flex flex-col gap-3">
      <p className="font-mono text-xs text-muted-foreground">
        {project.role} · {project.period}
      </p>
      {project.links.length > 0 && (
        <ul className="flex flex-wrap gap-2">
          {project.links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-8 items-center gap-1 rounded-lg border px-3 text-[13px] font-medium transition-colors hover:bg-accent"
              >
                {link.label}
                <ArrowUpRightIcon className="size-3.5 text-muted-foreground" aria-hidden />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export function SkillTags({ skills }: { skills: string[] }) {
  return (
    <ul className="flex flex-wrap gap-1.5" aria-label="Skills used">
      {skills.map((s) => (
        <li key={s} className="rounded-md border bg-muted/50 px-1.5 py-0.5 font-mono text-[11px] text-muted-foreground">
          {s}
        </li>
      ))}
    </ul>
  )
}
