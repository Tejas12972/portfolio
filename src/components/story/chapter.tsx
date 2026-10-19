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
        <PanelHeader className="py-4">
          <p className="mono-label mb-1">
            {String(number).padStart(2, "0")}
            {kicker ? ` · ${kicker}` : null}
          </p>
          <PanelTitle id={headingId}>{title}</PanelTitle>
          {lead && <div className="mt-2 max-w-prose text-[15px]/relaxed text-muted-foreground">{lead}</div>}
          {meta && <div className="mt-3">{meta}</div>}
        </PanelHeader>
        {children}
      </Panel>
    </>
  )
}
