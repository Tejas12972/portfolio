import { MapPinIcon } from "lucide-react"

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
      <div className="flex flex-col gap-5 px-4 pt-10 pb-8 sm:pt-16">
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
    </section>
  )
}
