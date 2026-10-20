"use client"

import { lumenStepMedia } from "@/data/media"
import { lumen } from "@/data/projects"

import { BrowserFrame } from "./browser-frame"
import { PhotoScene } from "./photo-scene"

export function LumenScene() {
  return (
    <PhotoScene
      label="Lumen, step by step"
      steps={lumen.steps!}
      media={lumenStepMedia}
      frame={(image) => <BrowserFrame url="lumen://agent">{image}</BrowserFrame>}
    />
  )
}
