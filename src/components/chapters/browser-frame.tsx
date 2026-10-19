export function BrowserFrame({ children, url }: { children: React.ReactNode; url: string }) {
  return (
    <div className="overflow-hidden rounded-xl border bg-surface shadow-sm">
      <div className="flex items-center gap-2 border-b px-3 py-2">
        <span className="flex gap-1.5" aria-hidden>
          <span className="size-2.5 rounded-full bg-border" />
          <span className="size-2.5 rounded-full bg-border" />
          <span className="size-2.5 rounded-full bg-border" />
        </span>
        <span className="mx-auto truncate rounded-md bg-background px-3 py-0.5 font-mono text-[11px] text-muted-foreground">
          {url}
        </span>
      </div>
      {children}
    </div>
  )
}
