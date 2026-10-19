"use client"

import { useEffect, useMemo, useState } from "react"

import { experience } from "@/data/experience"
import { projects } from "@/data/projects"
import { skillGroups } from "@/data/skills"
import { cn } from "@/lib/utils"

type Use = { id: string; name: string; kind: string; href: string; skills: string[] }

const USES: Use[] = [
  ...projects.map((p) => ({
    id: p.id,
    name: p.name,
    kind: p.kind,
    href: `#${["options-analytics", "elisa"].includes(p.id) ? "data" : ["recycleright", "wordle-solver"].includes(p.id) ? "earlier" : p.id}`,
    skills: p.skills,
  })),
  ...experience.map((r) => ({ id: r.id, name: r.org, kind: "Work", href: "#experience", skills: r.skills ?? [] })),
]

/** Hover, focus, or tap a skill to light the projects that use it. */
export function SkillsExplorer() {
  const [active, setActive] = useState<string | null>(null)
  const [pinned, setPinned] = useState<string | null>(null)
  const current = active ?? pinned

  const counts = useMemo(() => {
    const map = new Map<string, number>()
    for (const u of USES) for (const s of u.skills) map.set(s, (map.get(s) ?? 0) + 1)
    return map
  }, [])

  // Mirror the highlight onto the chapters above, so it holds when you scroll back.
  useEffect(() => {
    const root = document.querySelector("main")
    if (!root) return
    const els = root.querySelectorAll<HTMLElement>("[data-skills]")
    if (!current) {
      root.removeAttribute("data-skill-active")
      els.forEach((el) => el.removeAttribute("data-skill-match"))
      return
    }
    root.setAttribute("data-skill-active", current)
    els.forEach((el) => {
      const match = (el.dataset.skills ?? "").split("|").includes(current)
      el.toggleAttribute("data-skill-match", match)
    })
  }, [current])

  return (
    <div className="grid gap-5 p-4">
      {skillGroups.map((g) => (
        <div key={g.name}>
          <h3 className="mono-label mb-2">{g.name}</h3>
          <ul className="flex flex-wrap gap-1.5">
            {g.skills.map((s) => {
              const n = counts.get(s) ?? 0
              const on = current === s
              return (
                <li key={s}>
                  <button
                    type="button"
                    aria-pressed={pinned === s}
                    onMouseEnter={() => setActive(s)}
                    onMouseLeave={() => setActive(null)}
                    onFocus={() => setActive(s)}
                    onBlur={() => setActive(null)}
                    onClick={() => setPinned((p) => (p === s ? null : s))}
                    className={cn(
                      "inline-flex h-8 items-center gap-1.5 rounded-md border px-2.5 text-[13px] transition-colors",
                      on ? "border-signal bg-signal-muted text-foreground" : "hover:bg-accent",
                      n === 0 && !on && "text-muted-foreground",
                    )}
                  >
                    {s}
                    {n > 0 && <span className="font-mono text-[10px] text-muted-foreground">{n}</span>}
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      ))}

      <div className="rounded-lg border">
        <p className="border-b px-3 py-2 text-[13px] text-muted-foreground" aria-live="polite">
          {current ? (
            <>
              Where I&apos;ve used <span className="font-medium text-foreground">{current}</span>
            </>
          ) : (
            "Hover or tap a skill to see where I've used it."
          )}
        </p>
        <ul className="grid sm:grid-cols-2">
          {USES.map((u) => {
            const match = current ? u.skills.includes(current) : false
            return (
              <li key={u.id}>
                <a
                  href={u.href}
                  className={cn(
                    "flex items-baseline justify-between gap-2 px-3 py-2 text-[14px] transition-opacity duration-200 hover:bg-accent/60",
                    current && !match && "opacity-30",
                  )}
                >
                  <span className={cn(match && "font-medium text-signal")}>{u.name}</span>
                  <span className="font-mono text-[11px] text-muted-foreground">{u.kind}</span>
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
