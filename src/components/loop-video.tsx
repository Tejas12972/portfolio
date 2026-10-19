"use client"

import { useEffect, useRef } from "react"

import type { Video } from "@/data/projects"
import { cn } from "@/lib/utils"

import { usePrefersReducedMotion } from "./story/use-motion-prefs"

/** Muted, looping, inline video that only plays while it's on screen. */
export function LoopVideo({ video, className }: { video: Video; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    const el = ref.current
    if (!el || reduced) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.play().catch(() => {
            // Autoplay can be refused (e.g. Low Power Mode); the poster stays up.
          })
        } else {
          el.pause()
        }
      },
      { threshold: 0.35 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [reduced])

  return (
    <video
      ref={ref}
      className={cn("h-auto w-full bg-muted", className)}
      width={video.width}
      height={video.height}
      poster={video.poster}
      muted
      loop
      playsInline
      preload="none"
      aria-label={video.alt}
    >
      {video.webm && <source src={video.webm} type="video/webm" />}
      {video.mp4 && <source src={video.mp4} type="video/mp4" />}
    </video>
  )
}
