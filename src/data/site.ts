function siteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  return "http://localhost:3000"
}

export const site = {
  name: "Karthik (Tejas) Basavarajappa",
  shortName: "Tejas Basavarajappa",
  initials: "KB",
  tagline: "I build embedded systems and the software around them.",
  description:
    "Computer Engineering and Computer Science student at Northeastern. I build embedded systems, from ESP32 firmware and bench debugging to the apps and tools around them. Open to co-op January–August 2027.",
  url: siteUrl(),
  location: "Boston, MA",
  school: {
    name: "Northeastern University",
    degree: "B.S. Computer Engineering and Computer Science",
    graduation: "Expected May 2029",
    url: "https://www.northeastern.edu",
  },
  // Fallback "now" for the timeline before the browser supplies the real date.
  asOf: "2026-10",
  availability: {
    label: "Open to co-op Jan–Aug 2027",
    start: "2027-01",
    end: "2027-08",
  },
  // Kept in parts so the address never appears whole in the server HTML.
  email: { user: "basavarajappa.k", domain: "northeastern.edu" },
  github: { username: "Tejas12972", url: "https://github.com/Tejas12972" },
  linkedin: {
    handle: "tejasb12",
    url: "https://www.linkedin.com/in/tejasb12",
    headline: "CompE + CS @ Northeastern | Seeking Jan 2027 Co-op | Co-Founder @ XalteraMedia",
    // To embed a post: on LinkedIn open the post's "..." menu > "Embed this
    // post", and paste the iframe's src (https://www.linkedin.com/embed/...).
    postEmbedUrl: undefined as string | undefined,
  },
  resume: {
    // Drop a phone-free export at public/resume.pdf and set this to true.
    available: false,
    path: "/resume.pdf",
    downloadName: "Karthik-Basavarajappa-Resume.pdf",
  },
} as const

export function emailAddress() {
  return `${site.email.user}@${site.email.domain}`
}
