import { Suspense } from "react"

import { BeyondChapter } from "@/components/chapters/beyond"
import { ContactChapter } from "@/components/chapters/contact"
import { DataMarketsChapter } from "@/components/chapters/data-markets"
import { EarlierChapter } from "@/components/chapters/earlier"
import { Intro } from "@/components/chapters/intro"
import { LumenChapter, LumenRepoCard } from "@/components/chapters/lumen"
import { PhoneBoxChapter } from "@/components/chapters/phonebox"
import { ShoreClearChapter } from "@/components/chapters/shoreclear"
import { SkillsChapter } from "@/components/chapters/skills"
import { TimelineChapter } from "@/components/chapters/timeline"
import { ChapterRail } from "@/components/chapter-progress"
import { ResumeDrawer } from "@/components/resume"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { personJsonLd } from "@/lib/json-ld"

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd()).replace(/</g, "\\u003c") }}
      />
      <a
        href="#phone-box"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-md focus:bg-background focus:px-3 focus:py-2"
      >
        Skip to projects
      </a>
      <SiteHeader />
      <ChapterRail />
      <main className="max-w-screen overflow-x-clip px-2">
        <div className="mx-auto md:max-w-3xl">
          <Intro />
          <PhoneBoxChapter />
          <ShoreClearChapter />
          <LumenChapter
            repoCard={
              <Suspense fallback={<div className="h-24 rounded-lg border bg-muted/40" aria-hidden />}>
                <LumenRepoCard />
              </Suspense>
            }
          />
          <DataMarketsChapter />
          <EarlierChapter />
          <TimelineChapter />
          <SkillsChapter />
          <BeyondChapter />
          <ContactChapter />
        </div>
      </main>
      <SiteFooter />
      <ResumeDrawer />
    </>
  )
}
