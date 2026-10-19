"use client"

import Image from "next/image"

import type { Media, Step } from "@/data/projects"

import { Figure } from "../figure"
import { PinnedScene } from "../story/pinned-scene"

type Props = {
  label: string
  steps: Step[]
  /** One image per step; a step without one keeps the previous image. */
  media: (Media | undefined)[]
  /** Wrap the stage image, e.g. in a browser frame. */
  frame?: (image: React.ReactNode, index: number) => React.ReactNode
  stackedLead?: React.ReactNode
}

function mediaFor(media: (Media | undefined)[], index: number) {
  for (let i = index; i >= 0; i--) if (media[i]) return media[i]
  return media.find(Boolean)
}

/** A pinned stage that crossfades to each step's image as you scroll. */
export function PhotoScene({ label, steps, media, frame, stackedLead }: Props) {
  return (
    <PinnedScene
      label={label}
      steps={steps}
      stage={({ index }) => {
        const current = mediaFor(media, index)
        // Every step's image sits in the stage; only the current one is opaque.
        const images = media.filter((m, i): m is Media => !!m && media.indexOf(m) === i)
        const image = (
          <div className="relative aspect-[16/10] max-h-[52vh] w-full overflow-hidden bg-muted">
            {images.map((m) => (
              <div
                key={m.src}
                className="absolute inset-0 transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                style={{ opacity: m === current ? 1 : 0, transform: m === current ? "scale(1)" : "scale(1.02)" }}
                aria-hidden={m !== current}
              >
                <Image
                  src={m.src}
                  alt={m === current ? m.alt : ""}
                  fill
                  sizes="(min-width: 768px) 768px, 100vw"
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        )
        return (
          <div className="p-3">
            {frame ? frame(image, index) : <div className="overflow-hidden rounded-lg border">{image}</div>}
          </div>
        )
      }}
      stackedLead={stackedLead}
      stackedMedia={(i) => (media[i] ? <Figure media={media[i]!} /> : null)}
    />
  )
}
