"use client"

// Built on the cmdk + Base UI dialog wrappers ported from chanhdai.com
// (https://github.com/ncdai/chanhdai.com). MIT License. Copyright (c) 2026 Chánh Đại.

import { ContactIcon, CopyIcon, DownloadIcon, FileTextIcon, HashIcon, MoonIcon } from "lucide-react"

import { chapters } from "@/data/chapters"
import { site } from "@/data/site"

import { copyEmail } from "./email"
import { GitHubIcon, LinkedInIcon } from "./icons"
import { openResume } from "./resume"
import { useToggleTheme } from "./theme-toggle"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "./ui/command"

function clickLink(href: string, download?: string) {
  const a = document.createElement("a")
  a.href = href
  if (download) a.download = download
  a.click()
}

/** The ⌘K dialog. Loaded the first time it opens. */
export function CommandPalette({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const toggleTheme = useToggleTheme()
  const setOpen = onOpenChange

  const run = (fn: () => void) => () => {
    setOpen(false)
    // Let the dialog close and return focus before acting.
    requestAnimationFrame(fn)
  }

  const jump = (id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    el.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" })
    history.replaceState(null, "", `#${id}`)
  }

  return (
    <CommandDialog
      open={open}
      onOpenChange={setOpen}
      title="Command menu"
      description="Jump to a chapter or run an action"
    >
      <CommandInput placeholder="Jump to a chapter or run an action…" />
      <CommandList>
        <CommandEmpty>Nothing found.</CommandEmpty>
        <CommandGroup heading="Chapters">
          {chapters.map((c, i) => (
            <CommandItem key={c.id} value={`chapter ${c.label}`} onSelect={run(() => jump(c.id))}>
              <HashIcon aria-hidden />
              {c.label}
              <CommandShortcut>{String(i + 1).padStart(2, "0")}</CommandShortcut>
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandGroup heading="Actions">
          <CommandItem
            value="copy email"
            onSelect={run(() => copyEmail().catch((err) => console.error("Copy failed:", err)))}
          >
            <CopyIcon aria-hidden />
            Copy email address
          </CommandItem>
          <CommandItem value="resume open view" onSelect={run(openResume)}>
            <FileTextIcon aria-hidden />
            View resume
          </CommandItem>
          {site.resume.available && (
            <CommandItem
              value="resume download pdf"
              onSelect={run(() => clickLink(site.resume.path, site.resume.downloadName))}
            >
              <DownloadIcon aria-hidden />
              Download resume
            </CommandItem>
          )}
          <CommandItem value="save contact vcard" onSelect={run(() => clickLink("/vcard"))}>
            <ContactIcon aria-hidden />
            Save contact card
          </CommandItem>
          <CommandItem value="toggle theme dark light" onSelect={run(toggleTheme)}>
            <MoonIcon aria-hidden />
            Toggle theme
            <CommandShortcut>D</CommandShortcut>
          </CommandItem>
        </CommandGroup>
        <CommandGroup heading="Links">
          <CommandItem value="github" onSelect={run(() => window.open(site.github.url, "_blank", "noopener"))}>
            <GitHubIcon />
            GitHub
          </CommandItem>
          <CommandItem value="linkedin" onSelect={run(() => window.open(site.linkedin.url, "_blank", "noopener"))}>
            <LinkedInIcon />
            LinkedIn
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
