"use client"

import { shoreClearStepMedia } from "@/data/media"
import { shoreClear } from "@/data/projects"

import { PhotoScene } from "./photo-scene"

export function ShoreClearScene() {
  return <PhotoScene label="ShoreClear, step by step" steps={shoreClear.steps!} media={shoreClearStepMedia} />
}
