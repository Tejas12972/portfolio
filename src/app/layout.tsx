import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"

import { Providers } from "@/components/providers"
import { site } from "@/data/site"

import "./globals.css"

// Latin subset only. Mono is for small labels, so it isn't preloaded.
const geistSans = Geist({ subsets: ["latin"], variable: "--font-geist-sans" })
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", preload: false })

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} · Embedded & hardware`,
    template: `%s · ${site.shortName}`,
  },
  description: site.description,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  keywords: [
    "Karthik Basavarajappa",
    "Tejas Basavarajappa",
    "embedded systems",
    "hardware engineering co-op",
    "ESP32",
    "Northeastern University",
    "computer engineering",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url: "/",
    siteName: site.shortName,
    title: `${site.name} · Embedded & hardware`,
    description: site.description,
    firstName: "Karthik",
    lastName: "Basavarajappa",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} · Embedded & hardware`,
    description: site.description,
  },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
  ],
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <Providers>{children}</Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
