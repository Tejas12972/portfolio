import { describe, expect, it } from "vitest"

import { bsm } from "../bsm"

// Reference values from Tejas12972/OptionsAnalytics api/tests/test_black_scholes.py:
// S=100, K=100, T=1, r=5%, sigma=20%, q=0.
const ref = { S: 100, K: 100, T: 1, r: 0.05, sigma: 0.2 }

describe("bsm", () => {
  it("matches the repo's call price and greeks", () => {
    const c = bsm({ ...ref, right: "call" })
    expect(c.price).toBeCloseTo(10.450583572185565, 5)
    expect(c.delta).toBeCloseTo(0.6368306511756191, 6)
    expect(c.gamma).toBeCloseTo(0.018762017345846895, 7)
    expect(c.vega).toBeCloseTo(37.52403469169379, 4)
    expect(c.theta).toBeCloseTo(-6.414027546438197, 4)
    expect(c.rho).toBeCloseTo(53.232481545376345, 4)
  })

  it("matches the repo's put price and delta", () => {
    const p = bsm({ ...ref, right: "put" })
    expect(p.price).toBeCloseTo(5.573526022256971, 5)
    expect(p.delta).toBeCloseTo(-0.3631693488243809, 6)
  })

  it("satisfies put-call parity", () => {
    const c = bsm({ ...ref, K: 110, right: "call" }).price
    const p = bsm({ ...ref, K: 110, right: "put" }).price
    expect(c - p).toBeCloseTo(100 - 110 * Math.exp(-0.05), 6)
  })

  it("collapses to intrinsic value at expiry", () => {
    expect(bsm({ ...ref, S: 120, T: 0, right: "call" }).price).toBe(20)
    expect(bsm({ ...ref, S: 120, T: 0, right: "put" }).price).toBe(0)
  })
})
