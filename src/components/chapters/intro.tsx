import Image from "next/image"
import { ArrowDownRightIcon, MapPinIcon } from "lucide-react"

import { lumenStepMedia, optionsMedia, phoneBoxMedia, shoreClearStepMedia } from "@/data/media"
import { site } from "@/data/site"

import { EmailButton } from "../email"
import { GitHubIcon, LinkedInIcon, Monogram } from "../icons"
import { ResumeButton } from "../resume"
import { buttonVariants } from "../ui/button"

// The one load sequence on the page. Plain CSS so it starts at first paint,
// before any JavaScript, and the global reduced-motion rule turns it off.
const step = (i: number) => ({ "--i": i }) as React.CSSProperties

export function Intro() {
  return (
    <section id="intro" aria-labelledby="intro-title" data-chapter="intro" className="screen-line-bottom border-x">
      <div className="grid gap-10 px-4 pt-10 pb-8 sm:pt-16 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:items-center lg:gap-12 lg:pb-14">
        <div className="flex flex-col gap-5">
          <div className="intro-item flex items-center gap-3" style={step(0)}>
            <Monogram className="size-12" />
            <div className="flex flex-col">
              <span className="text-sm font-medium">{site.school.name}</span>
              <span className="font-mono text-xs text-muted-foreground">
                {site.school.degree} · {site.school.graduation}
              </span>
            </div>
          </div>

          <h1
            id="intro-title"
            className="intro-item text-4xl font-semibold tracking-tight text-balance sm:text-5xl"
            style={step(1)}
          >
            {site.name}
          </h1>

          <p className="intro-item max-w-xl text-lg/relaxed text-balance text-muted-foreground" style={step(2)}>
            {site.tagline} I lean toward the hardware side: firmware, wiring, and bench debugging.
          </p>

          <div className="intro-item flex flex-wrap items-center gap-3" style={step(3)}>
            <span className="inline-flex items-center gap-2 rounded-full border border-signal/40 bg-signal-muted px-3 py-1 text-sm font-medium">
              <span className="relative flex size-2" aria-hidden>
                <span className="intro-ping absolute inset-0 rounded-full bg-signal" />
                <span className="relative size-2 rounded-full bg-signal" />
              </span>
              {site.availability.label}
            </span>
            <span className="inline-flex items-center gap-1 font-mono text-xs text-muted-foreground">
              <MapPinIcon className="size-3.5" aria-hidden />
              {site.location}
            </span>
          </div>

          <div className="intro-item flex flex-wrap gap-2" style={step(4)}>
            <ResumeButton />
            <EmailButton />
            <a
              href={site.github.url}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({ variant: "outline" })}
            >
              <GitHubIcon className="size-4" />
              GitHub
            </a>
            <a
              href={site.linkedin.url}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({ variant: "outline" })}
            >
              <LinkedInIcon className="size-4" />
              LinkedIn
            </a>
          </div>
        </div>
        <FeaturedBuilds />
      </div>
    </section>
  )
}

const FEATURED = [
  {
    href: "#phone-box",
    n: "02",
    name: "Phone Box",
    line: "ESP32-S3 lockbox: servo latch, I²C fuel gauge, BLE to an iOS app",
    media: phoneBoxMedia.timer,
  },
  {
    href: "#shoreclear",
    n: "03",
    name: "ShoreClear",
    line: "Tracked beach-cleanup robot; I built the drive and the arm",
    media: shoreClearStepMedia[4],
  },
  {
    href: "#lumen",
    n: "04",
    name: "Lumen",
    line: "AI browser on Electron that doubles as a 44-tool MCP server",
    media: lumenStepMedia[0],
  },
  {
    href: "#data",
    n: "05",
    name: "Options Analytics · ELISA",
    line: "Pricing and curve-fitting tools where the math is tested",
    media: optionsMedia,
  },
]

function FeaturedBuilds() {
  return (
    <nav aria-label="Featured builds" className="intro-item rounded-xl border bg-surface/60 p-2" style={step(5)}>
      <p className="mono-label px-2 pt-1 pb-2">Featured builds</p>
      <ul className="grid gap-1">
        {FEATURED.map((f) => (
          <li key={f.href}>
            <a href={f.href} className="group flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-accent">
              <span className="relative size-14 shrink-0 overflow-hidden rounded-md border bg-muted">
                <Image src={f.media.src} alt="" fill sizes="56px" className="object-cover" />
              </span>
              <span className="flex min-w-0 flex-col">
                <span className="flex items-baseline gap-2 text-[15px] font-semibold">
                  <span className="font-mono text-[11px] font-normal text-muted-foreground">{f.n}</span>
                  {f.name}
                </span>
                <span className="text-[13px] text-muted-foreground">{f.line}</span>
              </span>
              <ArrowDownRightIcon
                className="ml-auto size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5"
                aria-hidden
              />
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
