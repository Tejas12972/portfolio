import { ContactIcon } from "lucide-react"

import { site } from "@/data/site"

import { CopyEmailButton, EmailButton, EmailText } from "../email"
import { GitHubIcon, LinkedInIcon, Monogram } from "../icons"
import { ResumeButton } from "../resume"
import { Chapter } from "../story/chapter"
import { buttonVariants } from "../ui/button"

export function ContactChapter() {
  return (
    <Chapter
      id="contact"
      number={10}
      title="Contact"
      kicker="Say hi"
      lead="I'm looking for an embedded or hardware co-op from January to August 2027. Email is the fastest way to reach me."
    >
      <div className="grid gap-4 p-4 sm:grid-cols-2">
        <div className="flex flex-col gap-3 rounded-lg border p-4">
          <p className="mono-label">Email</p>
          <EmailText className="text-[15px] break-all" />
          <div className="flex flex-wrap gap-2">
            <EmailButton variant="default" size="sm">
              Send an email
            </EmailButton>
            <CopyEmailButton />
          </div>
          <div className="mt-auto flex flex-wrap gap-2 pt-2">
            <ResumeButton variant="outline" size="sm" />
            <a href="/vcard" className={buttonVariants({ variant: "outline", size: "sm" })}>
              <ContactIcon aria-hidden />
              Save contact
            </a>
            <a
              href={site.github.url}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({ variant: "outline", size: "sm" })}
            >
              <GitHubIcon className="size-4" />
              GitHub
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-3 rounded-lg border p-4">
          <div className="flex items-center gap-3">
            <Monogram className="size-12 shrink-0" />
            <div>
              <p className="font-semibold">{site.name}</p>
              <p className="text-[13px] text-muted-foreground">{site.linkedin.headline}</p>
            </div>
          </div>
          <p className="font-mono text-xs text-muted-foreground">linkedin.com/in/{site.linkedin.handle}</p>
          <a
            href={site.linkedin.url}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({ variant: "signal", size: "sm", className: "mt-auto w-fit" })}
          >
            <LinkedInIcon className="size-4" />
            Connect on LinkedIn
          </a>
        </div>
      </div>
      {site.linkedin.postEmbedUrl && (
        <div className="screen-line-top p-4">
          <iframe
            src={site.linkedin.postEmbedUrl}
            title="LinkedIn post"
            loading="lazy"
            className="h-[560px] w-full rounded-lg border bg-background"
          />
        </div>
      )}
    </Chapter>
  )
}
