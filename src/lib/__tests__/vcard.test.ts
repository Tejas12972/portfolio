import { describe, expect, it } from "vitest"

import { buildVCard } from "../vcard"

describe("vCard", () => {
  const card = buildVCard()

  it("has the school email, LinkedIn, and GitHub", () => {
    expect(card).toContain("EMAIL;TYPE=INTERNET,WORK:basavarajappa.k@northeastern.edu")
    expect(card).toContain("linkedin.com/in/tejasb12")
    expect(card).toContain("github.com/Tejas12972")
  })

  it("never includes a phone number", () => {
    expect(card).not.toMatch(/^TEL/m)
    expect(card).not.toMatch(/\d{3}[-.\s]?\d{3}[-.\s]?\d{4}/)
  })
})
