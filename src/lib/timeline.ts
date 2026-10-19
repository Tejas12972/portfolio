import { experience } from "@/data/experience"
import { leadership } from "@/data/leadership"
import { site } from "@/data/site"

export type Channel = {
  id: string
  label: string
  detail: string
  /** Months since the axis start. */
  start: number
  end: number
  /** Started before the axis does. */
  clippedStart: boolean
  ongoing: boolean
  future?: boolean
}

export const AXIS_START = { year: 2022, month: 1 }
export const AXIS_END = { year: 2027, month: 12 }
export const AXIS_MONTHS = (AXIS_END.year - AXIS_START.year) * 12 + AXIS_END.month - AXIS_START.month + 1

/** "YYYY-MM" or "YYYY" → months since the axis start. Year-only ends run to December. */
export function monthIndex(value: string, edge: "start" | "end") {
  const [y, m] = value.split("-").map(Number)
  const month = m ?? (edge === "start" ? 1 : 12)
  const idx = (y - AXIS_START.year) * 12 + (month - AXIS_START.month)
  return edge === "end" ? idx + 1 : idx
}

export function formatPeriod(start: string, end?: string) {
  const fmt = (v: string) => {
    const [y, m] = v.split("-").map(Number)
    if (!m) return String(y)
    return new Date(Date.UTC(y, m - 1, 1)).toLocaleString("en-US", { month: "short", year: "numeric", timeZone: "UTC" })
  }
  return `${fmt(start)} – ${end ? fmt(end) : "present"}`
}

export function buildChannels(now: string = site.asOf): Channel[] {
  const nowIdx = monthIndex(now, "end")
  const fromRole = (id: string, label: string, detail: string, start: string, end?: string): Channel => {
    const s = monthIndex(start, "start")
    return {
      id,
      label,
      detail,
      start: Math.max(0, s),
      end: Math.min(AXIS_MONTHS, end ? monthIndex(end, "end") : nowIdx),
      clippedStart: s < 0,
      ongoing: !end,
    }
  }

  const channels = [
    ...experience.map((r) => fromRole(r.id, r.channel, `${r.title}, ${r.org}`, r.start, r.end)),
    ...leadership
      .filter((a) => a.channel)
      .map((a) => fromRole(a.id, a.channel!, `${a.title}, ${a.org}`, a.start, a.end)),
  ].sort((a, b) => a.start - b.start || a.end - b.end)

  channels.push({
    id: "coop",
    label: "CO-OP",
    detail: "Open to a co-op, January–August 2027",
    start: monthIndex(site.availability.start, "start"),
    end: monthIndex(site.availability.end, "end"),
    clippedStart: false,
    ongoing: false,
    future: true,
  })
  return channels
}
