import { describe, expect, it } from "vitest"

import { fourPlOd, linearOd, plate1Recovery, plate1Standards } from "../fourpl"

const mean = (xs: number[]) => xs.reduce((a, b) => a + b, 0) / xs.length

describe("plate 1 fits", () => {
  it("4PL tracks every standard within 3% in raw OD", () => {
    for (const s of plate1Standards) {
      const observed = mean(s.od)
      expect(Math.abs(fourPlOd(s.conc) - observed) / observed).toBeLessThan(0.03)
    }
  })

  it("the straight line misses the middle standards by more than the 4PL does", () => {
    for (const s of plate1Standards.slice(2, 6)) {
      const observed = mean(s.od)
      expect(Math.abs(linearOd(s.conc) - observed)).toBeGreaterThan(Math.abs(fourPlOd(s.conc) - observed))
    }
  })

  it("recovery ranges match the notebook", () => {
    const four = plate1Recovery.map((r) => r.fourPl)
    const lin = plate1Recovery.map((r) => r.linear)
    expect([Math.min(...four), Math.max(...four)]).toEqual([94, 102])
    expect([Math.min(...lin), Math.max(...lin)]).toEqual([99, 134])
  })
})
