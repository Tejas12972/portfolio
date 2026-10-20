import { describe, expect, it } from "vitest"

import { formatPeriod } from "../dates"

describe("formatPeriod", () => {
  it("formats month ranges, year ranges, and current roles", () => {
    expect(formatPeriod("2022-06", "2023-08")).toBe("Jun 2022 – Aug 2023")
    expect(formatPeriod("2016", "2025")).toBe("2016 – 2025")
    expect(formatPeriod("2024-01")).toBe("Jan 2024 – present")
  })
})
