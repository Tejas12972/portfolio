// Black-Scholes-Merton price and greeks, mirroring
// Tejas12972/OptionsAnalytics api/options_tool/analytics/black_scholes.py.
// Raw units: vega and rho per 1.00 change, theta per year.

export type Right = "call" | "put"

export type Inputs = {
  S: number
  K: number
  /** Years to expiry. */
  T: number
  r: number
  sigma: number
  q?: number
  right: Right
}

export type Result = {
  price: number
  delta: number
  gamma: number
  vega: number
  theta: number
  rho: number
}

// Complementary error function (Numerical Recipes erfcc), fractional error
// below 1.2e-7: plenty for a display widget.
function erfc(x: number): number {
  const z = Math.abs(x)
  const t = 1 / (1 + 0.5 * z)
  const r =
    t *
    Math.exp(
      -z * z -
        1.26551223 +
        t *
          (1.00002368 +
            t *
              (0.37409196 +
                t *
                  (0.09678418 +
                    t *
                      (-0.18628806 +
                        t *
                          (0.27886807 + t * (-1.13520398 + t * (1.48851587 + t * (-0.82215223 + t * 0.17087277)))))))),
    )
  return x >= 0 ? r : 2 - r
}

export function normCdf(x: number) {
  return 0.5 * erfc(-x / Math.SQRT2)
}

export function normPdf(x: number) {
  return Math.exp(-0.5 * x * x) / Math.sqrt(2 * Math.PI)
}

export function bsm({ S, K, T, r, sigma, q = 0, right }: Inputs): Result {
  if (T <= 0 || sigma <= 0) {
    const intrinsic = right === "call" ? Math.max(S - K, 0) : Math.max(K - S, 0)
    const itm = right === "call" ? S > K : S < K
    return {
      price: intrinsic,
      delta: itm ? (right === "call" ? 1 : -1) : 0,
      gamma: 0,
      vega: 0,
      theta: 0,
      rho: 0,
    }
  }
  const sqrtT = Math.sqrt(T)
  const d1 = (Math.log(S / K) + (r - q + 0.5 * sigma * sigma) * T) / (sigma * sqrtT)
  const d2 = d1 - sigma * sqrtT
  const carry = Math.exp(-q * T)
  const discount = Math.exp(-r * T)
  const pdf1 = normPdf(d1)
  const gamma = (carry * pdf1) / (S * sigma * sqrtT)
  const vega = S * carry * pdf1 * sqrtT
  const decay = -(S * carry * pdf1 * sigma) / (2 * sqrtT)

  if (right === "call") {
    return {
      price: S * carry * normCdf(d1) - K * discount * normCdf(d2),
      delta: carry * normCdf(d1),
      gamma,
      vega,
      theta: decay - r * K * discount * normCdf(d2) + q * S * carry * normCdf(d1),
      rho: K * T * discount * normCdf(d2),
    }
  }
  return {
    price: K * discount * normCdf(-d2) - S * carry * normCdf(-d1),
    delta: -carry * normCdf(-d1),
    gamma,
    vega,
    theta: decay + r * K * discount * normCdf(-d2) - q * S * carry * normCdf(-d1),
    rho: -K * T * discount * normCdf(-d2),
  }
}
