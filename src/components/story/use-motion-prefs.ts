"use client"

import { useEffect, useState, useSyncExternalStore } from "react"

function useMediaQuery(query: string): boolean | null {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia(query)
      mq.addEventListener("change", onChange)
      return () => mq.removeEventListener("change", onChange)
    },
    () => window.matchMedia(query).matches,
    () => null,
  )
}

export function usePrefersReducedMotion() {
  return useMediaQuery("(prefers-reduced-motion: reduce)") ?? false
}

/**
 * Whether scroll scenes should run: 768px and up, without reduced motion.
 * `null` while prerendering, so the server and first client render agree;
 * callers render the stacked, motion-free layout until this says otherwise.
 */
export function useScenesEnabled() {
  const wide = useMediaQuery("(min-width: 768px)")
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)")
  if (wide === null || reduced === null) return null
  return wide && !reduced
}

/**
 * Loads a Motion-powered module only once scenes are enabled, so phones and
 * reduced-motion visitors never download the animation code.
 */
export function useSceneModule<T>(load: () => Promise<T>): T | null {
  const enabled = useScenesEnabled()
  const [mod, setMod] = useState<T | null>(null)
  useEffect(() => {
    if (!enabled || mod) return
    let cancelled = false
    load()
      .then((m) => {
        if (!cancelled) setMod(() => m)
      })
      .catch((error) => console.error("Failed to load scene module:", error))
    return () => {
      cancelled = true
    }
  }, [enabled, mod, load])
  return enabled ? mod : null
}
