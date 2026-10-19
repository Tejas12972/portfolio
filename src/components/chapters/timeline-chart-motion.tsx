"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, type MotionValue } from "motion/react"

import type { Channel } from "@/lib/timeline"

import { Chart, stroke, TraceShell, wave, type ChartProps } from "./timeline-chart"

// Motion-only pieces of the timeline. Loaded on demand, like elisa-chart-motion.tsx.

function AnimatedTrace({ c, i, progress }: { c: Channel; i: number; progress: MotionValue<number> }) {
  // Each channel draws a little after the one above it.
  const t = useTransform(progress, [i * 0.06, 0.55 + i * 0.06], [0, 1])
  return (
    <TraceShell c={c} i={i}>
      {/* A dashed path can't be drawn with pathLength, so the open co-op pulse fades in instead. */}
      <motion.path d={wave(c)} {...stroke(c)} style={c.future ? { opacity: t } : { pathLength: t }} />
    </TraceShell>
  )
}

export function ScrollChart(props: Omit<ChartProps, "renderTrace">) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 55%"] })
  return (
    <div ref={ref}>
      <Chart
        {...props}
        renderTrace={(c: Channel, i) => <AnimatedTrace key={c.id} c={c} i={i} progress={scrollYProgress} />}
      />
    </div>
  )
}
