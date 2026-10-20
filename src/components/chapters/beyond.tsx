import { leadership } from "@/data/leadership"
import { formatPeriod } from "@/lib/dates"

import { Chapter } from "../story/chapter"

export function BeyondChapter() {
  return (
    <Chapter
      id="beyond"
      number={9}
      title="Beyond code"
      kicker="Leading and teaching"
      lead="What I'm good at outside the code: leading a group and keeping a lot of moving parts on schedule."
    >
      <ul className="grid divide-y sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        {leadership.map((a) => (
          <li key={a.id} className="flex flex-col gap-1 p-4">
            <p className="mono-label">{formatPeriod(a.start, a.end).replace(" – present", "–now")}</p>
            <h3 className="text-lg font-semibold tracking-tight">{a.title}</h3>
            <p className="text-[13px] text-muted-foreground">{a.org}</p>
            <p className="mt-1 text-[14px]/relaxed">{a.body}</p>
          </li>
        ))}
      </ul>
    </Chapter>
  )
}
