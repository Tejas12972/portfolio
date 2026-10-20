"use client"

import type { ReactNode } from "react"
import type { MotionValue } from "motion/react"

import { useSceneModule } from "./use-motion-prefs"

export type SceneStep = { id: string; title: string; body: string }

export type StageState = {
  /** Active step, 0-based. */
  index: number
  /** 0 → 1 across the whole scene. */
  progress: MotionValue<number>
}

export type PinnedSceneProps = {
  label: string
  steps: SceneStep[]
  /** The sticky stage in pinned mode. */
  stage: (state: StageState) => ReactNode
  /** Shown once above the steps in stacked mode (phones, reduced motion). */
  stackedLead?: ReactNode
  /** Optional media under a step in stacked mode. */
  stackedMedia?: (index: number) => ReactNode
  className?: string
}

/**
 * A sticky stage above captions that scroll normally underneath it. Scroll
 * position picks the active step; nothing is hijacked or snapped. Under
 * 768px or with reduced motion it renders the same steps stacked.
 */
const loadPinned = () => import("./pinned-motion")

export function PinnedScene(props: PinnedSceneProps) {
  const mod = useSceneModule(loadPinned)
  return mod ? <mod.Pinned {...props} /> : <Stacked {...props} />
}

function Stacked({ steps, stackedLead, stackedMedia, className }: PinnedSceneProps) {
  return (
    <div className={className}>
      {stackedLead && <div className="border-b">{stackedLead}</div>}
      <ol className="divide-y">
        {steps.map((step, i) => (
          <li key={step.id} className="px-4 py-6">
            <p className="mono-label mb-2">
              {String(i + 1).padStart(2, "0")} / {String(steps.length).padStart(2, "0")}
            </p>
            <h3 className="mb-2 text-lg font-semibold tracking-tight">{step.title}</h3>
            <p className="max-w-prose text-[15px]/relaxed text-muted-foreground">{step.body}</p>
            {stackedMedia && <div className="mt-4">{stackedMedia(i)}</div>}
          </li>
        ))}
      </ol>
    </div>
  )
}
