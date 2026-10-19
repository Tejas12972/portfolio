export type Activity = {
  id: string
  org: string
  title: string
  /** "YYYY-MM" or "YYYY". Omit `end` if ongoing. */
  start: string
  end?: string
  /** Timeline channel label. Omit to keep it off the timeline. */
  channel?: string
  body: string
}

export const leadership: Activity[] = [
  {
    id: "eagle",
    org: "Boy Scouts of America, Troop 77",
    title: "Eagle Scout",
    start: "2016",
    end: "2025",
    channel: "EAGLE",
    body: "Led my Eagle project: a raised-bed garden for the Village Food Hub food pantry.",
  },
  {
    id: "fll",
    org: "CodeWiz",
    title: "FIRST LEGO League coach",
    start: "2025-02",
    end: "2025-07",
    body: "Coached our team to the Massachusetts state title and a spot at the 2025 FLL World Festival in Houston.",
  },
  {
    id: "chinmaya",
    org: "Chinmaya Mission Boston",
    title: "Sanskrit teacher",
    start: "2022",
    channel: "TEACHING",
    body: "Teach weekly Sanskrit lessons to 10+ students, with a curriculum and materials I built myself.",
  },
]
