export type Media = {
  src: string
  alt: string
  width: number
  height: number
}

export type Video = {
  mp4?: string
  webm?: string
  poster: string
  alt: string
  width: number
  height: number
}

export type Step = {
  id: string
  title: string
  body: string
  /** Diagram node or trace ids this step lights up (Phone Box). */
  lights?: string[]
  media?: Media
}

export type Link = { label: string; href: string }

export type Project = {
  id: string
  name: string
  kind: string
  period: string
  role: string
  summary: string
  points: string[]
  skills: string[]
  links: Link[]
  /** owner/name, for the live repo card. */
  repo?: string
  /** How the work was shared, shown under the chapter. */
  credit?: string
  steps?: Step[]
  media?: Media[]
  video?: Video
}

export const phoneBox: Project = {
  id: "phone-box",
  name: "Phone Box",
  kind: "Hardware",
  period: "Aug–Sep 2026",
  role: "Co-developed with a friend",
  summary:
    "A phone lockbox with a real lock: a servo latch, a touchscreen countdown, an adjustable emergency override, and an iOS app over Bluetooth LE.",
  points: [],
  skills: [
    "ESP32",
    "CircuitPython",
    "UART/I²C/SPI",
    "GPIO/PWM",
    "BLE",
    "Oscilloscope",
    "Multimeter",
    "Bench power supply",
    "Breadboarding & soldering",
    "SolidWorks",
    "3D printing",
    "React Native",
    "TypeScript",
    "Firebase",
    "Python",
    "Git",
  ],
  links: [
    { label: "Live site", href: "https://phonebox-d14b7.web.app" },
    { label: "Repo", href: "https://github.com/emah-maker/lockbox" },
  ],
  repo: "emah-maker/lockbox",
  credit:
    "Claude Code wrote most of the code. The enclosure CAD, the MAX17043 modification, and the bench debugging were done by hand.",
  steps: [
    {
      id: "mcu",
      title: "One board runs the box",
      body: "An ESP32-S3 running CircuitPython drives the 1.47-inch touch display, the servo latch, the lock and override buttons, and the Bluetooth LE radio.",
      lights: ["mcu"],
    },
    {
      id: "touch",
      title: "A driver for the touch controller",
      body: "The display's AXS5106L touch controller sits on the I²C bus at 0x63 and runs on a custom driver written for this board.",
      lights: ["mcu", "i2c", "touch"],
    },
    {
      id: "gauge",
      title: "A real battery percentage, no extra pins",
      body: "We hand-modified a MAX17043 fuel gauge and put it on the same I²C bus as the touchscreen, at 0x36. The box shows a measured battery percentage without spending another GPIO.",
      lights: ["mcu", "i2c", "gauge", "battery"],
    },
    {
      id: "servo",
      title: "Tracking down the servo failures",
      body: "The latch failed now and then. On the bench it came down to two things: the CPU clock was scaling out from under the servo's PWM timer, and a servo drawing close to an amp was hanging off the 3.3 V rail. The fix: re-assert 50 Hz before every move, move the servo to the battery rail with bulk capacitance, and keep a brownout counter in NVM so the firmware recovers on its own.",
      lights: ["mcu", "pwm", "servo", "battery", "vbat", "cap"],
    },
    {
      id: "ble",
      title: "A BLE contract that can't drift",
      body: "A custom GATT service with 8 characteristics (status, history, commands, settings, time, alerts, labels, pending) feeds a React Native iOS app that syncs to Firebase. A contract test fails if the UUIDs ever differ between the Python firmware and the TypeScript app.",
      lights: ["mcu", "ble", "app", "cloud"],
    },
    {
      id: "build",
      title: "Enclosure and tests",
      body: "Two SolidWorks enclosure revisions, FDM printed and fit-tested on the real parts. 2,500+ tests across the firmware, the app, the Firestore security rules, and the cloud functions.",
      lights: ["mcu", "i2c", "touch", "gauge", "pwm", "servo", "battery", "vbat", "cap", "ble", "app", "cloud"],
    },
  ],
}

export const shoreClear: Project = {
  id: "shoreclear",
  name: "ShoreClear",
  kind: "Hardware",
  period: "Cornerstone of Engineering",
  role: "Team of four · I did the drive electronics and the arm",
  summary:
    "A small tracked robot that picks plastic out of beach sand, built by a team of four for Northeastern's first-year engineering course.",
  points: [],
  skills: [
    "ESP32",
    "Arduino",
    "C++",
    "GPIO/PWM",
    "SolidWorks",
    "3D printing",
    "Laser cutting",
    "Breadboarding & soldering",
    "Multimeter",
  ],
  links: [],
  credit:
    "Team: Marwan A., Cyrus C., Lucas Peralta, and me. Photos from the team's build and Lucas's portfolio, used with his OK.",
  steps: [
    {
      id: "problem",
      title: "The problem",
      body: "Plastic piles up on beaches and in shallow water, where it hurts wildlife and drifts out to sea. Picking it up by hand is slow, and big cleanup machines are expensive and rough on the shoreline. We wanted something small that could keep pulling debris out of the sand.",
    },
    {
      id: "design",
      title: "Designed in SolidWorks",
      body: "The main body and the top-mounted collection arm were modeled in SolidWorks. The goals: collect plastic reliably, drive on sand, separate sand from plastic, and stay stable, all inside a tight budget and the torque and battery limits of our parts.",
    },
    {
      id: "fab",
      title: "Printed, cut, and assembled",
      body: "The body was 3D printed and the arm parts were laid out for the laser cutter. The tracked base was built from purchased parts instead of being custom-made.",
    },
    {
      id: "drive",
      title: "My part: the drive",
      body: "I wired the drive: an ESP32 on the Arduino framework running four motors through two dual-channel motor drivers, with the left and right sides on their own direction and PWM pins. I wrote the test firmware that runs each side forward and back, then straight, then spins in both directions, to check every motor and every pin.",
    },
    {
      id: "arm",
      title: "My part: the arm",
      body: "The arm kept coming out too heavy. I went from an acrylic arm with a metal claw, to the same arm with a 3D-printed claw, to a laser-cut low-density wood arm with the printed claw, which was finally light enough. When the servo stopped responding in the final assembly, I worked through everything around it until the servo itself was the only cause left.",
    },
  ],
}

export const lumen: Project = {
  id: "lumen",
  name: "Lumen",
  kind: "Software",
  period: "Sep 2026–now",
  role: "Co-built with a school friend",
  summary:
    "A Chromium browser on Electron with an AI agent in the sidebar that reads the page you're on and acts on it.",
  points: [],
  skills: ["Electron", "JavaScript", "Node.js", "MCP", "Playwright", "GitHub Actions", "Git"],
  links: [
    { label: "Project site", href: "https://emah-maker.github.io/lumen/" },
    { label: "Repo", href: "https://github.com/emah-maker/lumen" },
  ],
  repo: "emah-maker/lumen",
  credit: "Co-built with Evan (emah-maker), who owns the repo.",
  steps: [
    {
      id: "agent",
      title: "An agent that works the page",
      body: "The sidebar agent reads the page you're on and acts on it: it clicks, types, fills forms, and reads up to six pages in parallel. It asks before acting on a site it hasn't used yet.",
    },
    {
      id: "models",
      title: "Your choice of model",
      body: "It works with Claude, OpenAI, Gemini, Grok, OpenRouter, or local models through Ollama and LM Studio.",
    },
    {
      id: "mcp",
      title: "A browser other agents can drive",
      body: "Lumen doubles as an MCP server. Outside agents like Claude Code, Codex, and Cursor drive it through 44 tools over an HMAC-authenticated local channel, and each app gets its own token you can revoke.",
    },
    {
      id: "ship",
      title: "Built like a real browser",
      body: "Ad and tracker blocking built in, no telemetry. 1,700+ commits, Playwright test suites, and self-updating Windows and macOS builds.",
    },
  ],
}

export const optionsAnalytics: Project = {
  id: "options-analytics",
  name: "Options Analytics",
  kind: "Software",
  period: "Sep 2026",
  role: "Solo",
  summary:
    "Full-stack options analytics that computes implied volatility and all five greeks itself and builds its own IV history.",
  points: [
    "Black-Scholes-Merton pricer with a Newton-Raphson IV solver and a bisection fallback; the price → IV round trip is tested to 1e-8.",
    'Daily snapshots build the history behind IV rank, which says "insufficient history" instead of showing a fake zero.',
    "548 Python and 48 TypeScript tests; 97% measured coverage on the analytics core, with CI gating it at 90%.",
  ],
  skills: [
    "Python",
    "FastAPI",
    "SQLite",
    "SQL",
    "Next.js",
    "React",
    "TypeScript",
    "Docker",
    "pytest",
    "GitHub Actions",
    "Git",
    "Pandas",
    "NumPy",
  ],
  links: [{ label: "Repo", href: "https://github.com/Tejas12972/OptionsAnalytics" }],
  repo: "Tejas12972/OptionsAnalytics",
}

export const elisa: Project = {
  id: "elisa",
  name: "ELISA Analysis Pipeline",
  kind: "Software",
  period: "Sep 2026",
  role: "Solo",
  summary:
    "Turns raw 96-well plate-reader exports into concentrations, QC verdicts, group statistics, and an HTML report.",
  points: [
    "Weighted 4PL/5PL standard curves picked by AICc, with %CV, recovery, and LOD/LLOQ/ULOQ checks against FDA/ICH M10-style criteria.",
    "Runs in the browser with no backend: the Streamlit app is compiled to WebAssembly. 135 tests, CI on Python 3.11–3.13.",
  ],
  skills: ["Python", "Pandas", "NumPy", "SciPy", "Streamlit", "pytest", "GitHub Actions", "Git"],
  links: [
    { label: "Live demo", href: "https://tejas12972.github.io/elisa-analysis-pipeline/app/" },
    { label: "Repo", href: "https://github.com/Tejas12972/elisa-analysis-pipeline" },
  ],
  repo: "Tejas12972/elisa-analysis-pipeline",
}

export const recycleRight: Project = {
  id: "recycleright",
  name: "RecycleRight",
  kind: "Hackathon",
  period: "Mar 2025",
  role: "Hackathon team",
  summary: "Snap a photo of trash and it tells you how to get rid of it.",
  points: [
    "Flask backend. GPT-4o vision identifies the item, with a heuristic image classifier as the fallback.",
    "Google Maps finds nearby recycling centers; MongoDB holds accounts, history, and a points leaderboard.",
  ],
  skills: ["Python", "Flask", "MongoDB", "OpenAI API", "JavaScript", "HTML/CSS", "Git"],
  links: [{ label: "Repo", href: "https://github.com/Tejas12972/Recyleright" }],
  repo: "Tejas12972/Recyleright",
}

export const wordleSolver: Project = {
  id: "wordle-solver",
  name: "Wordle Solver",
  kind: "Chrome extension",
  period: "Jul 2024",
  role: "Solo",
  summary: "A Chrome extension that solves the daily Wordle.",
  points: [
    "Reads each tile's green, yellow, or gray state straight from the page's DOM, then narrows the word list with constraint filtering.",
  ],
  skills: ["JavaScript", "HTML/CSS", "Chrome extensions", "Git"],
  links: [
    {
      label: "Chrome Web Store",
      href: "https://chromewebstore.google.com/detail/wordle-solver/llhbgnfbaepkdanmnbkdipgkgibhlokd",
    },
    { label: "Repo", href: "https://github.com/Tejas12972/Wordle-Solver" },
  ],
  repo: "Tejas12972/Wordle-Solver",
}

export const projects = [phoneBox, shoreClear, lumen, optionsAnalytics, elisa, recycleRight, wordleSolver]
