import { site } from "@/data/site"

import { ChapterProgress } from "./chapter-progress"
import { CommandMenu } from "./command-menu"
import { Monogram } from "./icons"
import { ResumeButton } from "./resume"
import { ThemeToggle } from "./theme-toggle"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 max-w-screen overflow-x-clip bg-background/90 px-2 backdrop-blur-sm">
      <div className="screen-line-bottom mx-auto flex h-14 items-center gap-2 border-x px-3 md:max-w-3xl">
        <a
          href="#intro"
          className="mr-auto flex items-center gap-2 rounded-md"
          aria-label={`KB, ${site.shortName}, back to top`}
        >
          <Monogram className="size-8" />
          <span className="hidden text-sm font-semibold sm:inline">{site.shortName}</span>
        </a>
        <CommandMenu />
        <ResumeButton size="sm" variant="ghost" className="max-sm:hidden" />
        <ThemeToggle />
      </div>
      <ChapterProgress />
    </header>
  )
}
