/** "YYYY-MM" or "YYYY" ranges → "Jun 2022 – Aug 2023", "2016 – 2025", "Jan 2024 – present". */
export function formatPeriod(start: string, end?: string) {
  const fmt = (v: string) => {
    const [y, m] = v.split("-").map(Number)
    if (!m) return String(y)
    return new Date(Date.UTC(y, m - 1, 1)).toLocaleString("en-US", { month: "short", year: "numeric", timeZone: "UTC" })
  }
  return `${fmt(start)} – ${end ? fmt(end) : "present"}`
}
