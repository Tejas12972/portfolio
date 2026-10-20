"use client"

import type { ReactNode, SVGProps } from "react"

import { fourPlOd, linearOd, plate1Recovery, plate1Standards } from "@/lib/fourpl"

import { useSceneModule } from "../story/use-motion-prefs"

const W = 640
const TOP_H = 220
const BOT_H = 150
const PAD = { l: 44, r: 16, t: 18, b: 28 }
const X_MAX = 520
const Y_MAX = 1.6

const x = (conc: number) => PAD.l + (conc / X_MAX) * (W - PAD.l - PAD.r)
const y = (od: number) => PAD.t + (1 - od / Y_MAX) * (TOP_H - PAD.t - PAD.b)

function curvePath(fn: (c: number) => number) {
  const pts: string[] = []
  for (let c = 0; c <= 500; c += 5) pts.push(`${c ? "L" : "M"}${x(c).toFixed(1)} ${y(fn(c)).toFixed(1)}`)
  return pts.join(" ")
}

const LINEAR_PATH = curvePath(linearOd)
const FOURPL_PATH = curvePath((c) => fourPlOd(c))

// Recovery strip: one column per standard, evenly spaced.
const REC_MIN = 80
const REC_MAX = 145
const recX = (i: number) => PAD.l + 20 + i * ((W - PAD.l - PAD.r - 40) / (plate1Recovery.length - 1))
const recY = (pct: number) => TOP_H + 22 + (1 - (pct - REC_MIN) / (REC_MAX - REC_MIN)) * (BOT_H - 40)

export const LINEAR_PROPS: SVGProps<SVGPathElement> = {
  d: LINEAR_PATH,
  fill: "none",
  stroke: "var(--muted-foreground)",
  strokeWidth: 1.75,
  strokeDasharray: "5 4",
}

export const FOURPL_PROPS: SVGProps<SVGPathElement> = {
  d: FOURPL_PATH,
  fill: "none",
  stroke: "var(--signal)",
  strokeWidth: 2.25,
}

export type RecoveryDotProps = { cx: number; from: number; to: number; label: string }

/** Scroll-driven replacements for the chart's moving parts (see elisa-chart-motion.tsx). */
export type ElisaSlots = {
  linear: () => ReactNode
  fourPl: () => ReactNode
  dot: (props: RecoveryDotProps) => ReactNode
}

export function Chart({ slots }: { slots?: ElisaSlots }) {
  return (
    <svg
      viewBox={`0 0 ${W} ${TOP_H + BOT_H}`}
      className="h-auto w-full"
      role="img"
      aria-labelledby="elisa-title elisa-desc"
    >
      <title id="elisa-title">Plate 1 standard curve: straight line versus 4PL</title>
      <desc id="elisa-desc">
        Seven IL-6 standards from 7.8 to 500 pg/mL, in duplicate. The study&apos;s straight-line calibration reads the
        standards back at 99 to 134 percent of nominal, worst at the low end. The weighted four-parameter logistic fit
        reads them back at 94 to 102 percent.
      </desc>

      {/* Axes */}
      <g className="fill-muted-foreground font-mono text-[10px]">
        {[0, 0.4, 0.8, 1.2, 1.6].map((v) => (
          <g key={v}>
            <line x1={PAD.l} x2={W - PAD.r} y1={y(v)} y2={y(v)} stroke="var(--line)" />
            <text x={PAD.l - 6} y={y(v) + 3} textAnchor="end">
              {v.toFixed(1)}
            </text>
          </g>
        ))}
        {[0, 100, 200, 300, 400, 500].map((c) => (
          <text key={c} x={x(c)} y={TOP_H - 10} textAnchor="middle">
            {c}
          </text>
        ))}
        <text x={W - PAD.r} y={TOP_H - 10 + 0} textAnchor="end" dy={-12}>
          pg/mL
        </text>
        <text x={PAD.l - 6} y={PAD.t - 9} textAnchor="end">
          OD
        </text>
      </g>

      {/* Fits */}
      {slots ? slots.linear() : <path {...LINEAR_PROPS} opacity={0.6} />}
      {slots ? slots.fourPl() : <path {...FOURPL_PROPS} />}

      {/* Standards, raw OD in duplicate */}
      {plate1Standards.flatMap((s) =>
        s.od.map((od, j) => <circle key={`${s.conc}-${j}`} cx={x(s.conc)} cy={y(od)} r={3} fill="var(--foreground)" />),
      )}

      {/* Legend */}
      <g className="font-mono text-[10px]">
        <line
          x1={PAD.l + 8}
          x2={PAD.l + 30}
          y1={PAD.t + 10}
          y2={PAD.t + 10}
          stroke="var(--muted-foreground)"
          strokeDasharray="5 4"
          strokeWidth={1.75}
        />
        <text x={PAD.l + 36} y={PAD.t + 13} className="fill-muted-foreground">
          study&apos;s straight line
        </text>
        <line
          x1={PAD.l + 8}
          x2={PAD.l + 30}
          y1={PAD.t + 26}
          y2={PAD.t + 26}
          stroke="var(--signal)"
          strokeWidth={2.25}
        />
        <text x={PAD.l + 36} y={PAD.t + 29} className="fill-signal">
          weighted 4PL
        </text>
      </g>

      {/* Recovery strip */}
      <g className="font-mono text-[10px]">
        <rect
          x={PAD.l}
          y={recY(120)}
          width={W - PAD.l - PAD.r}
          height={recY(80) - recY(120)}
          fill="var(--signal-muted)"
        />
        <line
          x1={PAD.l}
          x2={W - PAD.r}
          y1={recY(100)}
          y2={recY(100)}
          stroke="var(--signal)"
          strokeOpacity={0.5}
          strokeDasharray="2 3"
        />
        <text x={PAD.l - 6} y={recY(100) + 3} textAnchor="end" className="fill-muted-foreground">
          100%
        </text>
        <text x={PAD.l - 6} y={recY(130) + 3} textAnchor="end" className="fill-muted-foreground">
          130%
        </text>
        <text x={W - PAD.r} y={TOP_H + 8} textAnchor="end" className="fill-muted-foreground">
          recovery, % of nominal · shaded band 80–120%
        </text>
        {plate1Recovery.map((r, i) => (
          <g key={r.conc}>
            <text x={recX(i)} y={TOP_H + BOT_H - 6} textAnchor="middle" className="fill-muted-foreground">
              {r.conc}
            </text>
            {slots ? (
              slots.dot({
                cx: recX(i),
                from: recY(r.linear),
                to: recY(r.fourPl),
                label: `${r.conc} pg/mL: ${r.linear}% → ${r.fourPl}%`,
              })
            ) : (
              <>
                <circle cx={recX(i)} cy={recY(r.linear)} r={4} fill="none" stroke="var(--muted-foreground)" />
                <circle cx={recX(i)} cy={recY(r.fourPl)} r={4.5} fill="var(--signal)" />
              </>
            )}
          </g>
        ))}
      </g>
    </svg>
  )
}

const loadMotion = () => import("./elisa-chart-motion")

export function ElisaChart() {
  const mod = useSceneModule(loadMotion)
  return mod ? <mod.ScrollChart /> : <Chart />
}
