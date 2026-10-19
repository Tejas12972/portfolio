import { describe, expect, it } from "vitest"

import { AXIS_MONTHS, buildChannels, formatPeriod, monthIndex } from "../timeline"

describe("timeline", () => {
  it("indexes months from Jan 2022", () => {
    expect(monthIndex("2022-01", "start")).toBe(0)
    expect(monthIndex("2022-06", "start")).toBe(5)
    expect(monthIndex("2023-08", "end")).toBe(20)
    expect(monthIndex("2025", "end")).toBe(48)
    expect(AXIS_MONTHS).toBe(72)
  })

  it("ends with the open co-op pulse over Jan–Aug 2027", () => {
    const channels = buildChannels("2026-10")
    const coop = channels.at(-1)!
    expect(coop.future).toBe(true)
    expect([coop.start, coop.end]).toEqual([60, 68])
  })

  it("clips Eagle Scout at the axis start and runs current roles to now", () => {
    const channels = buildChannels("2026-10")
    const eagle = channels.find((c) => c.id === "eagle")!
    expect(eagle.clippedStart).toBe(true)
    expect(eagle.start).toBe(0)
    const xaltera = channels.find((c) => c.id === "xaltera")!
    expect(xaltera.ongoing).toBe(true)
    expect(xaltera.end).toBe(monthIndex("2026-10", "end"))
  })

  it("formats periods", () => {
    expect(formatPeriod("2022-06", "2023-08")).toBe("Jun 2022 – Aug 2023")
    expect(formatPeriod("2024-01")).toBe("Jan 2024 – present")
  })
})
