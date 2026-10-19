"use client"

import { useRef, useState } from "react"
import { useMotionValueEvent, useScroll } from "motion/react"

import { cn } from "@/lib/utils"

import type { PinnedSceneProps } from "./pinned-scene"

/** The pinned layout. Loaded on demand by PinnedScene; see useSceneModule. */
export function Pinned({ label, steps, stage, className }: PinnedSceneProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [index, setIndex] = useState(0)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 75%"],
  })

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const next = Math.min(steps.length - 1, Math.max(0, Math.floor(p * steps.length)))
    setIndex((prev) => (prev === next ? prev : next))
  })

  return (
    <div ref={ref} className={cn("relative", className)} aria-label={label}>
      <div className="sticky top-(--header-height) z-10 border-b bg-background">
        {stage({ index, progress: scrollYProgress })}
      </div>
      <ol className="relative">
        {steps.map((step, i) => (
          <li
            key={step.id}
            className="flex min-h-[46vh] items-start px-4 pt-10 pb-6"
            aria-current={i === index ? "step" : undefined}
          >
            <div
              className={cn("max-w-prose transition-opacity duration-300", i === index ? "opacity-100" : "opacity-50")}
            >
              <p className="mono-label mb-2">
                {String(i + 1).padStart(2, "0")} / {String(steps.length).padStart(2, "0")}
              </p>
              <h3 className="mb-2 text-lg font-semibold tracking-tight">{step.title}</h3>
              <p className="text-[15px]/relaxed text-muted-foreground">{step.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}
