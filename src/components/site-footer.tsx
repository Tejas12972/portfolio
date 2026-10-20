import { site } from "@/data/site"

export function SiteFooter() {
  return (
    <footer className="max-w-screen overflow-x-clip px-2">
      <div className="screen-line-top mx-auto flex flex-col gap-2 border-x px-4 py-6 font-mono text-[11px] text-muted-foreground md:max-w-3xl lg:max-w-6xl">
        <p>
          © {new Date(site.asOf).getUTCFullYear()} {site.name}. Built with Next.js, deployed on Vercel.
        </p>
        <p>
          Design based on{" "}
          <a href="https://chanhdai.com" target="_blank" rel="noopener noreferrer" className="link-underline">
            chanhdai.com
          </a>{" "}
          by Chánh Đại, used under the MIT license.{" "}
          <a
            href="https://github.com/Tejas12972/portfolio"
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline"
          >
            Source
          </a>
          .
        </p>
      </div>
    </footer>
  )
}
