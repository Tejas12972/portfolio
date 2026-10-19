"use client"

import { cn } from "@/lib/utils"

type Node = { id: string; x: number; y: number; w: number; h: number; title: string; sub: string; sub2?: string }

// Pin numbers and addresses come from firmware/lib/lock_config.py and
// hardware/wiring-diagram.svg in emah-maker/lockbox.
const NODES: Node[] = [
  { id: "touch", x: 24, y: 28, w: 172, h: 56, title: "Touch display", sub: "AXS5106L · 0x63" },
  { id: "gauge", x: 24, y: 116, w: 172, h: 56, title: "Fuel gauge (modified)", sub: "MAX17043 · 0x36" },
  { id: "servo", x: 24, y: 236, w: 172, h: 56, title: "Servo latch", sub: "MG90S · 50 Hz" },
  { id: "mcu", x: 285, y: 112, w: 150, h: 104, title: "ESP32-S3", sub: "CircuitPython", sub2: "BLE radio" },
  { id: "battery", x: 285, y: 300, w: 150, h: 56, title: "1S LiPo", sub: "TP4056 charger" },
  { id: "app", x: 524, y: 28, w: 172, h: 56, title: "iOS app", sub: "React Native · Expo" },
  { id: "cloud", x: 524, y: 236, w: 172, h: 56, title: "Firebase", sub: "Firestore · Functions" },
]

type Trace = {
  id: string
  d: string
  label?: { x: number; y: number; text: string; anchor?: "start" | "end" | "middle" }
}

const TRACES: Trace[] = [
  { id: "i2c", d: "M196 56 H240 V150 H285", label: { x: 244, y: 50, text: "I²C", anchor: "start" } },
  { id: "i2c", d: "M196 144 H240" },
  { id: "pwm", d: "M285 196 H250 V264 H196", label: { x: 254, y: 258, text: "PWM · GPIO5", anchor: "start" } },
  { id: "vbat", d: "M285 336 H110 V292", label: { x: 118, y: 330, text: "VBAT", anchor: "start" } },
  { id: "battery", d: "M360 300 V216", label: { x: 366, y: 262, text: "SYS", anchor: "start" } },
  { id: "ble", d: "M435 140 H480 V56 H524", label: { x: 484, y: 104, text: "BLE GATT", anchor: "start" } },
  { id: "cloud", d: "M610 84 V236", label: { x: 616, y: 164, text: "sync", anchor: "start" } },
]

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)"

// The servo's original supply, shown crossed out during the brownout step.
const OLD_SUPPLY = "M285 176 H226 V248 H196"

type Props = {
  /** Ids to light. `undefined` lights everything (static diagram). */
  lit?: string[]
  /** Show the crossed-out 3.3 V servo supply. */
  showOldSupply?: boolean
  animate?: boolean
  className?: string
}

export function PhoneBoxDiagram({ lit, showOldSupply = false, animate = true, className }: Props) {
  const isLit = (id: string) => (lit ? lit.includes(id) : true)
  const capLit = isLit("cap")

  return (
    <svg
      viewBox="0 0 720 372"
      className={cn("h-auto w-full", className)}
      role="img"
      aria-labelledby="pb-diagram-title pb-diagram-desc"
    >
      <title id="pb-diagram-title">Phone Box system diagram</title>
      <desc id="pb-diagram-desc">
        An ESP32-S3 in the middle. The AXS5106L touch controller (address 0x63) and the modified MAX17043 fuel gauge
        (0x36) share one I²C bus. The MG90S servo latch is driven by PWM on GPIO5 and powered from the battery rail with
        bulk capacitance. A 1S LiPo with a TP4056 charger powers the system. Bluetooth LE links the board to the iOS
        app, which syncs with Firebase.
      </desc>

      {/* Base traces */}
      <g fill="none" stroke="var(--border)" strokeWidth={1.5}>
        {TRACES.map((t, i) => (
          <path key={i} d={t.d} />
        ))}
        <path d="M200 336 V346" />
      </g>

      {/* Lit traces */}
      <g fill="none" stroke="var(--signal)" strokeWidth={2.25} strokeLinecap="round" strokeLinejoin="round">
        {TRACES.map((t, i) => (
          <path
            key={i}
            d={t.d}
            pathLength={1}
            strokeDasharray="1 1"
            style={{
              strokeDashoffset: isLit(t.id) ? 0 : 1,
              opacity: isLit(t.id) ? 1 : 0,
              transition: animate ? `stroke-dashoffset 700ms ${EASE}, opacity 300ms ease` : "none",
            }}
          />
        ))}
      </g>

      {/* Bulk capacitor to ground on the servo rail */}
      <g
        stroke={capLit ? "var(--signal)" : "var(--muted-foreground)"}
        strokeWidth={2}
        className="transition-[stroke] duration-500"
      >
        <path d="M188 346 H212 M188 353 H212 M200 353 V362 M192 362 H208 M195 366 H205" fill="none" />
      </g>
      <text x={218} y={360} className="fill-muted-foreground font-mono text-[10px]">
        bulk C
      </text>

      {/* Old supply, crossed out */}
      <g style={{ opacity: showOldSupply ? 1 : 0, transition: animate ? "opacity 400ms ease" : "none" }} aria-hidden>
        <path d={OLD_SUPPLY} fill="none" stroke="oklch(0.6 0.2 27)" strokeWidth={1.75} strokeDasharray="4 4" />
        <text x={230} y={226} className="font-mono text-[10px]" fill="oklch(0.6 0.2 27)">
          3V3 ✕
        </text>
      </g>

      {/* Trace labels */}
      {TRACES.filter((t) => t.label).map((t, i) => (
        <text
          key={i}
          x={t.label!.x}
          y={t.label!.y}
          textAnchor={t.label!.anchor}
          className={cn(
            "font-mono text-[10px] transition-[fill] duration-500",
            isLit(t.id) ? "fill-signal" : "fill-muted-foreground",
          )}
        >
          {t.label!.text}
        </text>
      ))}

      {/* Nodes */}
      {NODES.map((n) => {
        const on = isLit(n.id)
        return (
          <g key={n.id}>
            <rect
              x={n.x}
              y={n.y}
              width={n.w}
              height={n.h}
              rx={10}
              fill="var(--background)"
              stroke="var(--border)"
              strokeWidth={1.5}
            />
            <rect
              x={n.x}
              y={n.y}
              width={n.w}
              height={n.h}
              rx={10}
              fill="var(--signal-muted)"
              stroke="var(--signal)"
              strokeWidth={2}
              style={{ opacity: on ? 1 : 0, transition: animate ? "opacity 400ms ease" : "none" }}
            />
            <text x={n.x + 14} y={n.y + 24} className="fill-foreground text-[13px] font-semibold">
              {n.title}
            </text>
            <text x={n.x + 14} y={n.y + 42} className="fill-muted-foreground font-mono text-[10.5px]">
              {n.sub}
            </text>
            {n.sub2 && (
              <text x={n.x + 14} y={n.y + 58} className="fill-muted-foreground font-mono text-[10.5px]">
                {n.sub2}
              </text>
            )}
          </g>
        )
      })}

      {/* MCU pin callouts */}
      <text x={299} y={200} className="fill-muted-foreground font-mono text-[10px]">
        SDA 41 · SCL 42
      </text>
    </svg>
  )
}
