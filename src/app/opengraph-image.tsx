import { ImageResponse } from "next/og"

import { site } from "@/data/site"

export const alt = `${site.name}: ${site.tagline} ${site.availability.label}.`
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
        background: "#09090b",
        color: "#fafafa",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 20, fontSize: 28, color: "#a1a1aa" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 64,
            height: 64,
            borderRadius: 14,
            border: "2px solid #27272a",
            fontSize: 26,
            fontWeight: 700,
            color: "#fafafa",
          }}
        >
          KB
        </div>
        Northeastern University · Computer Engineering & CS
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div style={{ fontSize: 76, fontWeight: 700, letterSpacing: -2, lineHeight: 1.05 }}>{site.name}</div>
        <div style={{ fontSize: 36, color: "#d4d4d8" }}>{site.tagline}</div>
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            padding: "12px 24px",
            borderRadius: 999,
            border: "2px solid #166534",
            background: "#052e16",
            fontSize: 30,
            color: "#bbf7d0",
          }}
        >
          <div style={{ width: 14, height: 14, borderRadius: 999, background: "#4ade80" }} />
          {site.availability.label}
        </div>
        <svg width="260" height="60" viewBox="0 0 260 60">
          <path d="M0 50 H60 V10 H130 V50 H170 V10 H260" fill="none" stroke="#4ade80" strokeWidth="4" />
        </svg>
      </div>
    </div>,
    size,
  )
}
