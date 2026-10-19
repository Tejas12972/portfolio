"use client"

import { useEffect, useState } from "react"

import { chapters } from "@/data/chapters"
import { cn } from "@/lib/utils"

/**
 * Where you are on the page: a hairline progress bar under the header with the
 * current chapter's name, and on wide screens a rail of chapter names.
 */
function useActiveChapter() {
  const [active, setActive] = useState<string>(chapters[0].id)

  useEffect(() => {
    const els = chapters.map((c) => document.getElementById(c.id)).filter((el): el is HTMLElement => !!el)
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id)
      },
      // A chapter is "current" while it crosses the band just under the header.
      { rootMargin: "-20% 0px -70% 0px" },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return active
}

/** Hairline progress bar under the header, with the chapter name below xl. */
export function ChapterProgress() {
  const active = useActiveChapter()
  const index = chapters.findIndex((c) => c.id === active)
  const current = chapters[index]

  return (
    <div className="relative mx-auto h-6 md:max-w-3xl xl:h-0">
      <div className="flex h-full items-center justify-between border-x px-3 font-mono text-[11px] text-muted-foreground xl:hidden">
        <span aria-live="polite">
          {String(index + 1).padStart(2, "0")} · {current?.label}
        </span>
        <span aria-hidden>/{String(chapters.length).padStart(2, "0")}</span>
      </div>
      {/* CSS scroll-driven animation; browsers without it just don't show the bar. */}
      <div className="scroll-progress absolute inset-x-0 bottom-0 h-px origin-left bg-signal" aria-hidden />
    </div>
  )
}

/** Chapter names in a rail left of the column, on wide screens only. */
export function ChapterRail() {
  const active = useActiveChapter()
  return (
    <nav
      aria-label="Chapters"
      className="fixed top-1/2 left-[max(1rem,calc(50%-24rem-13rem))] hidden -translate-y-1/2 xl:block"
    >
      <ol className="grid gap-1.5 border-l pl-3">
        {chapters.map((c, i) => (
          <li key={c.id}>
            <a
              href={`#${c.id}`}
              aria-current={c.id === active ? "location" : undefined}
              className={cn(
                "relative flex items-center gap-2 font-mono text-[11px] transition-colors",
                c.id === active ? "text-foreground" : "text-muted-foreground hover:text-foreground",
              )}
            >
              <span
                className={cn(
                  "absolute -left-[15px] h-4 w-0.5 rounded-full bg-signal transition-opacity",
                  c.id === active ? "opacity-100" : "opacity-0",
                )}
                aria-hidden
              />
              {String(i + 1).padStart(2, "0")} {c.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}
