import { site } from "@/data/site"

/** schema.org Person. Deliberately no telephone, and no email (it would put the address in the HTML). */
export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Karthik Basavarajappa",
    alternateName: "Tejas Basavarajappa",
    url: site.url,
    jobTitle: "Computer Engineering student",
    description: site.description,
    address: { "@type": "PostalAddress", addressLocality: "Boston", addressRegion: "MA", addressCountry: "US" },
    alumniOf: { "@type": "CollegeOrUniversity", name: site.school.name, url: site.school.url },
    knowsAbout: [
      "Embedded systems",
      "ESP32",
      "CircuitPython",
      "Bluetooth Low Energy",
      "SolidWorks",
      "Python",
      "TypeScript",
    ],
    sameAs: [site.linkedin.url, site.github.url],
  }
}
