"use client"

import { useState } from "react"
import dynamic from "next/dynamic"
import { SearchIcon } from "lucide-react"
import { useHotkeys } from "react-hotkeys-hook"

import { Button } from "./ui/button"

const CommandPalette = dynamic(() => import("./command-palette").then((m) => m.CommandPalette), { ssr: false })

export function CommandMenu() {
  const [open, setOpen] = useState(false)
  const [loaded, setLoaded] = useState(false)

  const show = (next: boolean) => {
    if (next) setLoaded(true)
    setOpen(next)
  }

  useHotkeys(
    "mod+k, slash",
    (e) => {
      e.preventDefault()
      show(!open)
    },
    { enableOnFormTags: ["input"] },
  )

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={() => show(true)}
        onPointerEnter={() => setLoaded(true)}
        className="gap-2 text-muted-foreground"
        aria-label="Open command menu (⌘K)"
      >
        <SearchIcon aria-hidden />
        <span className="hidden sm:inline">Jump to…</span>
        <kbd className="hidden rounded border bg-muted px-1 font-mono text-[10px] sm:inline">⌘K</kbd>
      </Button>
      {loaded && <CommandPalette open={open} onOpenChange={show} />}
    </>
  )
}
