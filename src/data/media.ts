import type { Media, Video } from "./projects"

const m = (src: string, width: number, height: number, alt: string): Media => ({ src, width, height, alt })

export const phoneBoxMedia = {
  battery: m(
    "/media/phonebox/device-battery.webp",
    780,
    1040,
    "The Phone Box: a dark textured enclosure with a small portrait touchscreen showing the battery percentage.",
  ),
  timer: m(
    "/media/phonebox/device-timer.webp",
    780,
    1040,
    "The Phone Box touchscreen showing a focus countdown timer while a finger presses the screen.",
  ),
  dashboard: m(
    "/media/phonebox/dashboard-calendar.webp",
    1280,
    800,
    "The Phone Box web dashboard's focus calendar for August 2026, with focus days highlighted in green.",
  ),
  site: m(
    "/media/sites/phonebox.webp",
    1440,
    900,
    "The Phone Box website: a dark hero reading 'The smart focus lockbox' next to a photo of the enclosure.",
  ),
}

export const phoneBoxVideo: Video = {
  mp4: "/media/phonebox/override-loop.mp4",
  webm: "/media/phonebox/override-loop.webm",
  poster: "/media/phonebox/override-view-still.webp",
  width: 688,
  height: 1280,
  alt: "The box's display in emergency-override mode: a ring of dots fills as presses count toward 25.",
}

/** One image per ShoreClear step, in step order. */
export const shoreClearStepMedia: Media[] = [
  m(
    "/media/shoreclear/full-build.webp",
    760,
    896,
    "ShoreClear on a classroom table: a teal body on black tank tracks with a black laser-cut acrylic arm and a breadboard on top.",
  ),
  m(
    "/media/shoreclear/sifter-assembly-solidworks.webp",
    1600,
    1041,
    "SolidWorks assembly of the robot body with its perforated sifter tray pulled out.",
  ),
  m(
    "/media/shoreclear/first-complete-prototype.webp",
    1200,
    675,
    "The first complete prototype: teal printed body on tracks, black acrylic top and arm, and a white perforated sifter tray.",
  ),
  m(
    "/media/shoreclear/electronics-breadboard.webp",
    900,
    1600,
    "The drive electronics on a breadboard: an ESP32 dev board wired to two red dual-channel motor-driver boards.",
  ),
  m(
    "/media/shoreclear/final-build-wood-arm.webp",
    900,
    1600,
    "The final build: a laser-cut low-density wood arm with servos at the joints and a 3D-printed claw, on the tracked teal chassis.",
  ),
]

export const shoreClearExtras: { media: Media; caption: string }[] = [
  {
    media: m(
      "/media/shoreclear/early-prototype-mockup.webp",
      1200,
      1600,
      "An early cardboard mock-up of the robot with a perforated sifter bin and a jointed cardboard arm.",
    ),
    caption: "Cardboard mock-up, before any CAD.",
  },
  {
    media: m(
      "/media/shoreclear/arm-links-laser-cut.webp",
      1200,
      675,
      "Laser-cut arm links in black acrylic and light wood laid out on a bench with standoffs and a servo.",
    ),
    caption: "Acrylic and wood arm links: the weight iterations side by side.",
  },
  {
    media: m(
      "/media/shoreclear/claw-parts-autocad.webp",
      986,
      666,
      "Four AutoCAD panels showing claw and arm parts laid out as flat outlines for laser cutting.",
    ),
    caption: "Arm and claw parts laid out for the laser cutter.",
  },
  {
    media: m(
      "/media/shoreclear/main-body-solidworks.webp",
      984,
      308,
      "Three SolidWorks views of the main body, a box with a perforated sifter tray, modeled for 3D printing.",
    ),
    caption: "Main body in SolidWorks, ahead of printing.",
  },
]

/** One screenshot per Lumen step, in step order. */
export const lumenStepMedia: Media[] = [
  m(
    "/media/lumen/sidebar-agent.webp",
    1440,
    900,
    "Lumen showing Hacker News with the agent sidebar on the right, listing the top stories it read from the page.",
  ),
  m(
    "/media/lumen/settings.webp",
    1440,
    900,
    "Lumen's AI settings: a model picker, agent behavior toggles, and API key fields for several providers.",
  ),
  m(
    "/media/lumen/mcp-approval.webp",
    1440,
    900,
    "Lumen showing an approval prompt in the sidebar asking whether an external agent, Claude Code, may act on the page.",
  ),
  m(
    "/media/lumen/tab-groups.webp",
    1440,
    900,
    "Lumen with a row of color-coded tab groups across the top, open on the React docs.",
  ),
]

export const lumenVideo: Video = {
  mp4: "/media/lumen/agent-task.mp4",
  webm: "/media/lumen/agent-task.webm",
  poster: "/media/lumen/agent-task-poster.webp",
  width: 1440,
  height: 900,
  alt: "Screen recording: the sidebar agent is asked to open Hacker News and list the top stories, navigates there, and answers.",
}

export const optionsMedia = m(
  "/media/options/chain.webp",
  1440,
  1120,
  "The Options Analytics chain view for AAPL: an IV-rank panel beside a table of strikes with bid, ask, IV, and greeks.",
)

export const elisaMedia = m(
  "/media/elisa/app-screenshot.webp",
  1400,
  900,
  "The ELISA app in the browser: sidebar controls for data, curve fitting, and QC thresholds, with summary metrics and a plate view.",
)

export const recycleRightMedia = m(
  "/media/recycleright/homepage.webp",
  626,
  455,
  "RecycleRight's homepage illustration: people dropping bottles, cans, and boxes into four colored recycling bins.",
)

export const wordleVideo: Video = {
  mp4: "/media/wordle/demo.mp4",
  webm: "/media/wordle/demo.webm",
  poster: "/media/wordle/demo-poster.webp",
  width: 900,
  height: 708,
  alt: "Screen recording: the extension plays NYT Wordle, guessing CRANE, ABAFT, and ADAWS before solving with AWASH.",
}
