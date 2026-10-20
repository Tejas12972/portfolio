"use client"

import { useId, useMemo, useState } from "react"

import { bsm, type Right } from "@/lib/bsm"
import { cn } from "@/lib/utils"

const R = 0.05

type SliderProps = {
  label: string
  value: number
  min: number
  max: number
  step: number
  format: (v: number) => string
  onChange: (v: number) => void
}

function Slider({ label, value, min, max, step, format, onChange }: SliderProps) {
  const id = useId()
  return (
    <div className="grid gap-1.5">
      <div className="flex items-baseline justify-between">
        <label htmlFor={id} className="text-[13px] font-medium">
          {label}
        </label>
        <output htmlFor={id} className="font-mono text-[13px] tabular-nums">
          {format(value)}
        </output>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-6 w-full cursor-pointer accent-(--signal)"
      />
    </div>
  )
}

const W = 320
const H = 140
const SPOT_MIN = 50
const SPOT_MAX = 150

export function BsmWidget() {
  const [S, setS] = useState(100)
  const [K, setK] = useState(100)
  const [sigma, setSigma] = useState(0.2)
  const [T, setT] = useState(1)
  const [right, setRight] = useState<Right>("call")

  const result = useMemo(() => bsm({ S, K, T, r: R, sigma, right }), [S, K, T, sigma, right])

  // Value across spot, for the little chart.
  const curve = useMemo(() => {
    const pts: [number, number][] = []
    for (let s = SPOT_MIN; s <= SPOT_MAX; s += 2) pts.push([s, bsm({ S: s, K, T, r: R, sigma, right }).price])
    const payoff = pts.map(([s]) => [s, right === "call" ? Math.max(s - K, 0) : Math.max(K - s, 0)] as [number, number])
    const maxY = Math.max(...pts.map((p) => p[1]), ...payoff.map((p) => p[1]), 1)
    const x = (s: number) => ((s - SPOT_MIN) / (SPOT_MAX - SPOT_MIN)) * W
    const y = (v: number) => H - (v / maxY) * (H - 10)
    const toPath = (p: [number, number][]) =>
      p.map(([s, v], i) => `${i ? "L" : "M"}${x(s).toFixed(1)} ${y(v).toFixed(1)}`).join(" ")
    return { value: toPath(pts), payoff: toPath(payoff), dot: [x(S), y(result.price)] as const, kx: x(K) }
  }, [K, T, sigma, right, S, result.price])

  const greeks = [
    { sym: "Δ", name: "Delta", v: result.delta.toFixed(3) },
    { sym: "Γ", name: "Gamma", v: result.gamma.toFixed(4) },
    { sym: "ν", name: "Vega / vol pt", v: (result.vega / 100).toFixed(3) },
    { sym: "Θ", name: "Theta / day", v: (result.theta / 365).toFixed(3) },
    { sym: "ρ", name: "Rho / rate pt", v: (result.rho / 100).toFixed(3) },
  ]

  return (
    <div className="grid gap-4 rounded-lg border p-4 sm:grid-cols-2">
      <div className="grid content-start gap-3">
        <div role="radiogroup" aria-label="Option type" className="inline-flex w-fit rounded-lg border p-0.5">
          {(["call", "put"] as const).map((r) => (
            <button
              key={r}
              type="button"
              role="radio"
              aria-checked={right === r}
              onClick={() => setRight(r)}
              className={cn(
                "h-7 rounded-md px-3 text-[13px] font-medium capitalize transition-colors",
                right === r ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground",
              )}
            >
              {r}
            </button>
          ))}
        </div>
        <Slider
          label="Spot"
          value={S}
          min={SPOT_MIN}
          max={SPOT_MAX}
          step={1}
          format={(v) => v.toFixed(0)}
          onChange={setS}
        />
        <Slider
          label="Strike"
          value={K}
          min={SPOT_MIN}
          max={SPOT_MAX}
          step={1}
          format={(v) => v.toFixed(0)}
          onChange={setK}
        />
        <Slider
          label="Volatility"
          value={sigma}
          min={0.05}
          max={1}
          step={0.01}
          format={(v) => `${(v * 100).toFixed(0)}%`}
          onChange={setSigma}
        />
        <Slider
          label="Time to expiry"
          value={T}
          min={0.02}
          max={2}
          step={0.01}
          format={(v) => (v < 1 ? `${Math.round(v * 365)} days` : `${v.toFixed(2)} yr`)}
          onChange={setT}
        />
        <p className="font-mono text-[11px] text-muted-foreground">Rate fixed at 5%, no dividend.</p>
      </div>

      <div className="grid content-start gap-3">
        <div>
          <p className="mono-label">{right} price</p>
          <p className="font-mono text-3xl font-medium tabular-nums" aria-live="polite">
            {result.price.toFixed(2)}
          </p>
        </div>
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="h-auto w-full"
          role="img"
          aria-label={`Option value across spot prices from ${SPOT_MIN} to ${SPOT_MAX}, with the payoff at expiry for comparison`}
        >
          <line x1={curve.kx} x2={curve.kx} y1={0} y2={H} stroke="var(--border)" strokeDasharray="3 3" />
          <path d={curve.payoff} fill="none" stroke="var(--muted-foreground)" strokeWidth={1} strokeDasharray="4 3" />
          <path d={curve.value} fill="none" stroke="var(--signal)" strokeWidth={2} />
          <circle cx={curve.dot[0]} cy={curve.dot[1]} r={4} fill="var(--signal)" />
        </svg>
        <dl className="grid grid-cols-5 gap-1 text-center">
          {greeks.map((g) => (
            <div key={g.sym} className="rounded-md bg-muted/60 px-1 py-1.5">
              <dt className="text-[13px] font-semibold" title={g.name}>
                {g.sym}
                <span className="sr-only"> {g.name}</span>
              </dt>
              <dd className="font-mono text-[11px] tabular-nums">{g.v}</dd>
            </div>
          ))}
        </dl>
        <p className="text-[11px] text-muted-foreground">
          Illustration, not market data. Same Black-Scholes-Merton formulas as the project&apos;s pricer, run in your
          browser.
        </p>
      </div>
    </div>
  )
}
