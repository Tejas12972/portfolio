"use client"

import { Dialog as DialogPrimitive } from "@base-ui/react/dialog"
import Image from "next/image"
import { DownloadIcon, ExternalLinkIcon, XIcon } from "lucide-react"

import { site } from "@/data/site"
import { cn } from "@/lib/utils"

import { Button, buttonVariants } from "./ui/button"

/** Resume in a side drawer, with a download button. Loaded the first time it opens. */
export function ResumeDialog({ open, setOpen }: { open: boolean; setOpen: (open: boolean) => void }) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Backdrop className="fixed inset-0 z-50 bg-black/30 duration-200 data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0 dark:bg-black/50" />
        <DialogPrimitive.Popup
          className={cn(
            "fixed inset-y-0 right-0 z-50 flex w-full max-w-3xl flex-col border-l bg-background shadow-xl outline-none",
            "duration-300 data-open:animate-in data-open:slide-in-from-right data-closed:animate-out data-closed:slide-out-to-right",
          )}
        >
          <div className="flex items-center gap-2 border-b px-4 py-3">
            <DialogPrimitive.Title className="mr-auto text-base font-semibold">Resume</DialogPrimitive.Title>
            {site.resume.available && (
              <a
                href={site.resume.path}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonVariants({ size: "sm", variant: "outline" })}
              >
                <ExternalLinkIcon aria-hidden />
                Open PDF
              </a>
            )}
            {site.resume.available && (
              <a href={site.resume.path} download={site.resume.downloadName} className={buttonVariants({ size: "sm" })}>
                <DownloadIcon aria-hidden />
                Download PDF
              </a>
            )}
            <DialogPrimitive.Close render={<Button variant="ghost" size="icon-sm" aria-label="Close resume" />}>
              <XIcon />
            </DialogPrimitive.Close>
          </div>
          <DialogPrimitive.Description className="sr-only">
            Karthik (Tejas) Basavarajappa&apos;s resume as a PDF.
          </DialogPrimitive.Description>
          {site.resume.available ? (
            // An image, not an embedded PDF: phones and some browsers won't render a PDF inside a page.
            <div className="min-h-0 flex-1 overflow-y-auto bg-muted p-4">
              <Image
                src={site.resume.preview.src}
                width={site.resume.preview.width}
                height={site.resume.preview.height}
                alt="Karthik (Tejas) Basavarajappa's one-page resume: education, technical skills, work experience, projects, and leadership."
                sizes="(min-width: 768px) 720px, 100vw"
                className="mx-auto h-auto w-full max-w-[720px] rounded-md border bg-white shadow-sm"
              />
            </div>
          ) : (
            <div className="flex flex-1 flex-col items-center justify-center gap-2 p-8 text-center">
              <p className="font-medium">The resume PDF is on its way.</p>
              <p className="text-sm text-muted-foreground">Until then, email me and I&apos;ll send it over.</p>
            </div>
          )}
        </DialogPrimitive.Popup>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}
