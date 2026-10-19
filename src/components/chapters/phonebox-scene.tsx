"use client"

import { phoneBox } from "@/data/projects"

import { PinnedScene } from "../story/pinned-scene"
import { PhoneBoxDiagram } from "./phonebox-diagram"

const steps = phoneBox.steps!

export function PhoneBoxScene() {
  return (
    <PinnedScene
      label="Phone Box, step by step"
      steps={steps}
      stage={({ index }) => (
        <div className="px-3 py-3">
          <PhoneBoxDiagram
            lit={steps[index].lights}
            showOldSupply={steps[index].id === "servo"}
            className="max-h-[calc(52vh)]"
          />
        </div>
      )}
      stackedLead={
        <div>
          <div className="overflow-x-auto px-3 py-3" tabIndex={0} aria-label="System diagram (scrolls sideways)">
            <PhoneBoxDiagram animate={false} className="min-w-[560px]" />
          </div>
          <p className="px-4 pb-3 font-mono text-[11px] text-muted-foreground md:hidden">
            Swipe the diagram sideways →
          </p>
        </div>
      }
    />
  )
}
