export type Role = {
  id: string
  org: string
  title: string
  location: string
  /** "YYYY-MM". Omit `end` for current roles. */
  start: string
  end?: string
  /** Short label for the timeline channel. */
  channel: string
  points: string[]
  skills?: string[]
  url?: string
}

export const experience: Role[] = [
  {
    id: "xaltera",
    org: "XalteraMedia",
    title: "Co-Founder",
    location: "Andover, MA",
    start: "2024-01",
    channel: "XALTERA",
    points: [
      "Build client-acquisition systems end to end for service businesses: Meta ads, Next.js sites, GoHighLevel CRM, and booking.",
      "Automate the lead pipeline in GoHighLevel: sub-5-minute first response, qualification, recovery, and attribution.",
      "Build voice and text agents that answer inbound calls and qualify leads around the clock, with speech-to-text, an LLM response layer, and ElevenLabs voice in one pipeline.",
    ],
    skills: ["Next.js", "React", "Node.js", "TypeScript"],
  },
  {
    id: "codewiz",
    org: "CodeWiz",
    title: "Programming & Robotics Coach",
    location: "Reading, MA",
    start: "2025-02",
    end: "2025-07",
    channel: "CODEWIZ",
    points: [
      "Coached a FIRST LEGO League team to 1st place at the Massachusetts state championship and a spot at the 2025 FLL World Festival in Houston.",
      "Taught robot design, building, and programming on LEGO SPIKE Prime, including how to isolate sensor, motor, and code faults.",
      "Taught Python, Java, and Lua (Roblox), from a first program up to competition level.",
    ],
    skills: ["Python", "Java"],
  },
  {
    id: "abris",
    org: "ABRIS.IO",
    title: "Software Engineering Intern",
    location: "Andover, MA",
    start: "2022-06",
    end: "2023-08",
    channel: "ABRIS",
    points: [
      "Designed and tested conversation flows for Pizza Pal, an AI host in Uprate.AI's demo suite, and fixed faulty responses found through systematic testing.",
      "Wrote PyTeal (Python) smart contracts for Licit, an Algorand platform that stores document hashes on-chain for tamper-proof verification.",
    ],
    skills: ["Python"],
  },
]
