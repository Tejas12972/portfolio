"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import { FileTextIcon } from "lucide-react"

import { Button, type ButtonProps } from "./ui/button"

const ResumeDialog = dynamic(() => import("./resume-drawer").then((m) => m.ResumeDialog), { ssr: false })

const OPEN_EVENT = "resume:open"

export function openResume() {
  window.dispatchEvent(new Event(OPEN_EVENT))
}

export function ResumeButton({
  className,
  variant = "default",
  size,
  label = "Resume",
}: Pick<ButtonProps, "className" | "variant" | "size"> & { label?: string }) {
  return (
    <Button className={className} variant={variant} size={size} onClick={openResume} aria-haspopup="dialog">
      <FileTextIcon aria-hidden />
      {label}
    </Button>
  )
}

/** Listens for resume:open and mounts the drawer on first use. */
export function ResumeDrawer() {
  const [open, setOpen] = useState(false)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const onOpen = () => {
      setLoaded(true)
      setOpen(true)
    }
    window.addEventListener(OPEN_EVENT, onOpen)
    return () => window.removeEventListener(OPEN_EVENT, onOpen)
  }, [])

  return loaded ? <ResumeDialog open={open} setOpen={setOpen} /> : null
}
