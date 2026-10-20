"use client"

import { useState, useSyncExternalStore } from "react"
import { CheckIcon, CopyIcon, MailIcon } from "lucide-react"

import { emailAddress } from "@/data/site"
import { cn } from "@/lib/utils"

import { buttonVariants, type ButtonProps } from "./ui/button"

const noopSubscribe = () => () => {}

/** The address is only assembled in the browser, so it never sits in the HTML. */
function useEmail() {
  return useSyncExternalStore(
    noopSubscribe,
    () => emailAddress(),
    () => null,
  )
}

export function EmailButton({
  className,
  variant = "outline",
  size,
  children,
}: Pick<ButtonProps, "className" | "variant" | "size" | "children">) {
  const email = useEmail()
  return (
    <a
      href={email ? `mailto:${email}` : undefined}
      onClick={(e) => {
        if (!email) e.preventDefault()
      }}
      className={cn(buttonVariants({ variant, size }), className)}
    >
      <MailIcon aria-hidden />
      {children ?? "Email"}
    </a>
  )
}

export function EmailText({ className }: { className?: string }) {
  const email = useEmail()
  return (
    <span className={cn("font-mono", className)}>
      {email ?? (
        <>
          basavarajappa.k <span aria-hidden>[at]</span>
          <span className="sr-only">at</span> northeastern <span aria-hidden>[dot]</span>
          <span className="sr-only">dot</span> edu
        </>
      )}
    </span>
  )
}

export function copyEmail() {
  return navigator.clipboard.writeText(emailAddress())
}

export function CopyEmailButton({ className }: { className?: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await copyEmail()
          setCopied(true)
          setTimeout(() => setCopied(false), 1800)
        } catch (error) {
          console.error("Copy failed:", error)
        }
      }}
      className={cn(buttonVariants({ variant: "outline", size: "sm" }), className)}
      aria-live="polite"
    >
      {copied ? <CheckIcon className="text-signal" aria-hidden /> : <CopyIcon aria-hidden />}
      {copied ? "Copied" : "Copy email"}
    </button>
  )
}
