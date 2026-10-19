"use client"

import { useSyncExternalStore, type ReactNode } from "react"

import { AXIS_MONTHS, AXIS_START, buildChannels, monthIndex, type Channel } from "@/lib/timeline"
import { site } from "@/data/site"
import { cn } from "@/lib/utils"

import { useSceneModule } from "../story/use-motion-prefs"

const W = 720
const LABEL_W = 92
const ROW = 40
const HIGH = 10
const LOW = 30
const TOP = 26

const x = (month: number) => LABEL_W + (month / AXIS_MONTHS) * (W - LABEL_W - 12)

export function wave(c: Channel) {
  const x0 = x(0)
  const x1 = x(AXIS_MONTHS)
  const xs = x(c.start)
  const xe = x(c.end)
  if (c.clippedStart) return `M${x0} ${HIGH} H${xe} V${LOW} H${x1}`
  return `M${x0} ${LOW} H${xs} V${HIGH} H${xe} V${LOW} H${x1}`
}

export function TraceShell({ c, i, children }: { c: Channel; i: number; children: React.ReactNode }) {
  return (
    <g transform={`translate(0 ${TOP + i * ROW})`}>
      <text x={0} y={LOW - 4} className="fill-muted-foreground font-mono text-[10.5px]">
        {c.label}
      </text>
      <line x1={x(0)} x2={x(AXIS_MONTHS)} y1={LOW} y2={LOW} stroke="var(--line)" />
      {c.future && (
        <rect x={x(c.start)} y={HIGH} width={x(c.end) - x(c.start)} height={LOW - HIGH} fill="var(--signal-muted)" />
      )}
      {children}
      {c.clippedStart && (
        <text x={x(0) + 4} y={HIGH - 3} className="fill-muted-foreground font-mono text-[9px]">
          ← since 2016
        </text>
      )}
    </g>
  )
}

export const stroke = (c: Channel) => ({
  fill: "none",
  stroke: c.future ? "var(--signal)" : "var(--foreground)",
  strokeWidth: 1.75,
  strokeDasharray: c.future ? "5 4" : undefined,
})

function StaticTrace({ c, i }: { c: Channel; i: number }) {
  return (
    <TraceShell c={c} i={i}>
      <path d={wave(c)} {...stroke(c)} />
    </TraceShell>
  )
}

export type ChartProps = {
  channels: Channel[]
  nowMonth: number
  /** Scroll-driven trace renderer (see timeline-chart-motion.tsx); static if omitted. */
  renderTrace?: (c: Channel, i: number) => ReactNode
}

export function Chart({ channels, nowMonth, renderTrace }: ChartProps) {
  const height = TOP + channels.length * ROW + 8
  const years = Array.from({ length: AXIS_MONTHS / 12 + 1 }, (_, i) => AXIS_START.year + i)
  return (
    <svg viewBox={`0 0 ${W} ${height}`} className="h-auto w-full" aria-hidden>
      {years.map((y, i) => (
        <g key={y}>
          <line x1={x(i * 12)} x2={x(i * 12)} y1={14} y2={height} stroke="var(--line)" />
          {i < years.length - 1 && (
            <text
              x={x(i * 12 + 6)}
              y={12}
              textAnchor="middle"
              className="fill-muted-foreground font-mono text-[10.5px]"
            >
              {y}
            </text>
          )}
        </g>
      ))}
      {channels.map((c, i) => (renderTrace ? renderTrace(c, i) : <StaticTrace key={c.id} c={c} i={i} />))}
      <line x1={x(nowMonth)} x2={x(nowMonth)} y1={16} y2={height} stroke="var(--signal)" strokeWidth={1} />
      <text x={x(nowMonth) + 4} y={22} className="fill-signal font-mono text-[9.5px]">
        now
      </text>
    </svg>
  )
}

const noopSubscribe = () => () => {}
const currentMonth = () => {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`
}

const loadMotion = () => import("./timeline-chart-motion")

export function TimelineChart({ className }: { className?: string }) {
  const mod = useSceneModule(loadMotion)
  // The browser's month; undefined while prerendering, so the build-time fallback is used.
  const now = useSyncExternalStore(noopSubscribe, currentMonth, () => undefined)
  const channels = buildChannels(now)
  const nowMonth = monthIndex(now ?? site.asOf, "start") + 0.5
  return (
    <div className={cn(className)}>
      {mod ? (
        <mod.ScrollChart channels={channels} nowMonth={nowMonth} />
      ) : (
        <Chart channels={channels} nowMonth={nowMonth} />
      )}
    </div>
  )
}
