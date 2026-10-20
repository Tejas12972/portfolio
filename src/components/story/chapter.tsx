import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

import { Panel, PanelHeader, PanelTitle } from "../panel"

type ChapterProps = {
  id: string
  number: number
  title: string
  kicker?: string
  lead?: ReactNode
  meta?: ReactNode
  children: ReactNode
  className?: string
}

export function Chapter({ id, number, title, kicker, lead, meta, children, className }: ChapterProps) {
  const headingId = `${id}-title`
  return (
    <>
      <div className="stripe-divider border-x" aria-hidden />
      <Panel id={id} aria-labelledby={headingId} data-chapter={id} className={cn(className)}>
        <PanelHeader className="py-4 lg:flex lg:items-end lg:justify-between lg:gap-10 lg:py-6">
          <div>
            <p className="mono-label mb-1">
              {String(number).padStart(2, "0")}
              {kicker ? ` · ${kicker}` : null}
            </p>
            <PanelTitle id={headingId} className="lg:text-4xl">
              {title}
            </PanelTitle>
            {lead && (
              <div className="mt-2 max-w-2xl text-[15px]/relaxed text-muted-foreground lg:text-base/relaxed">
                {lead}
              </div>
            )}
          </div>
          {meta && <div className="mt-3 shrink-0 lg:mt-0 lg:text-right [&_ul]:lg:justify-end">{meta}</div>}
        </PanelHeader>
        {children}
      </Panel>
    </>
  )
}
