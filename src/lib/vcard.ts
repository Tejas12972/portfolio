import { emailAddress, site } from "@/data/site"

const escape = (v: string) => v.replace(/\\/g, "\\\\").replace(/,/g, "\\,").replace(/;/g, "\;")

/** vCard 3.0 with email, links, and school. Deliberately no phone number. */
export function buildVCard() {
  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    "N:Basavarajappa;Karthik;Tejas;;",
    `FN:${escape(site.name)}`,
    "NICKNAME:Tejas",
    `ORG:${escape(site.school.name)}`,
    `TITLE:${escape("Computer Engineering & CS student, open to co-op Jan–Aug 2027")}`,
    `EMAIL;TYPE=INTERNET,WORK:${emailAddress()}`,
    `URL:${site.url}`,
    `item1.URL:${site.linkedin.url}`,
    "item1.X-ABLabel:LinkedIn",
    `item2.URL:${site.github.url}`,
    "item2.X-ABLabel:GitHub",
    `ADR;TYPE=WORK:;;;Boston;MA;;USA`,
    "END:VCARD",
  ]
  return lines.join("\r\n") + "\r\n"
}
