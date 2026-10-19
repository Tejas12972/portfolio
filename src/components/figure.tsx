import Image from "next/image"

import type { Media } from "@/data/projects"
import { cn } from "@/lib/utils"

export function Figure({
  media,
  caption,
  className,
  sizes = "(min-width: 768px) 384px, 100vw",
  priority,
}: {
  media: Media
  caption?: string
  className?: string
  sizes?: string
  priority?: boolean
}) {
  return (
    <figure className={cn("overflow-hidden rounded-lg border bg-muted", className)}>
      <Image
        src={media.src}
        alt={media.alt}
        width={media.width}
        height={media.height}
        sizes={sizes}
        priority={priority}
        className="h-auto w-full"
      />
      {caption && (
        <figcaption className="border-t bg-background px-3 py-2 text-xs text-muted-foreground">{caption}</figcaption>
      )}
    </figure>
  )
}
