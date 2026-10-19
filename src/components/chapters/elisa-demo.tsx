"use client"

import { useState } from "react"
import { PlayIcon } from "lucide-react"

import { elisa } from "@/data/projects"

import { Button } from "../ui/button"

const APP_URL = elisa.links.find((l) => l.label === "Live demo")!.href

/** The app pulls a whole Python runtime (Pyodide), so it only loads on click. */
export function ElisaDemo() {
  const [loaded, setLoaded] = useState(false)
  if (!loaded) {
    return (
      <div className="flex flex-col items-start gap-2 rounded-lg border border-dashed p-4">
        <Button variant="signal" onClick={() => setLoaded(true)}>
          <PlayIcon aria-hidden />
          Launch live demo
        </Button>
        <p className="text-xs text-muted-foreground">
          Loads the real app, with Python running in your browser through WebAssembly. The first load takes a little
          while.
        </p>
      </div>
    )
  }
  return (
    <div className="overflow-hidden rounded-lg border">
      <iframe
        src={APP_URL}
        title="ELISA Analysis Pipeline live demo"
        className="h-[640px] w-full bg-background"
        allow="clipboard-write"
      />
      <p className="border-t px-3 py-2 text-xs text-muted-foreground">
        Cramped here?{" "}
        <a href={APP_URL} target="_blank" rel="noopener noreferrer" className="link-underline">
          Open it full size
        </a>
        .
      </p>
    </div>
  )
}
