import { cacheLife } from "next/cache"

import { featuredRepos } from "@/data/repos"
import { site } from "@/data/site"

export type Repo = {
  nameWithOwner: string
  description: string | null
  url: string
  stars: number
  pushedAt: string | null
  language: { name: string; color: string | null } | null
}

export type ContributionDay = {
  date: string
  count: number
  level: number
}

export type GitHubData = {
  live: boolean
  totalContributions: number | null
  weeks: ContributionDay[][]
  repos: Repo[]
}

const LEVELS: Record<string, number> = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
}

const REPO_FIELDS = `nameWithOwner description url stargazerCount pushedAt primaryLanguage { name color }`

function buildQuery(repos: string[]) {
  const aliases = repos
    .map((full, i) => {
      const [owner, name] = full.split("/")
      return `r${i}: repository(owner: "${owner}", name: "${name}") { ${REPO_FIELDS} }`
    })
    .join("\n")
  return `query($login: String!) {
    user(login: $login) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks { contributionDays { date contributionCount contributionLevel } }
        }
      }
      pinnedItems(first: 6, types: REPOSITORY) {
        nodes { ... on Repository { ${REPO_FIELDS} } }
      }
    }
    ${aliases}
  }`
}

type RawRepo = {
  nameWithOwner: string
  description: string | null
  url: string
  stargazerCount: number
  pushedAt: string | null
  primaryLanguage: { name: string; color: string | null } | null
}

function toRepo(raw: RawRepo): Repo {
  return {
    nameWithOwner: raw.nameWithOwner,
    description: raw.description,
    url: raw.url,
    stars: raw.stargazerCount,
    pushedAt: raw.pushedAt,
    language: raw.primaryLanguage,
  }
}

function fallback(): GitHubData {
  return {
    live: false,
    totalContributions: null,
    weeks: [],
    repos: featuredRepos.map((full) => ({
      nameWithOwner: full,
      description: null,
      url: `https://github.com/${full}`,
      stars: 0,
      pushedAt: null,
      language: null,
    })),
  }
}

/**
 * Contribution calendar, pinned repos, and the featured repo cards, fetched
 * server-side through the GitHub GraphQL API and cached for about an hour.
 * Without GITHUB_TOKEN (local builds, forks) it returns static fallback cards.
 */
export async function getGitHubData(): Promise<GitHubData> {
  "use cache"
  cacheLife("hours")

  const token = process.env.GITHUB_TOKEN
  if (!token) return fallback()

  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: buildQuery(featuredRepos),
        variables: { login: site.github.username },
      }),
    })
    if (!res.ok) {
      console.error(`GitHub GraphQL returned ${res.status}`)
      return fallback()
    }
    const json = await res.json()
    if (json.errors?.length) {
      console.error(
        "GitHub GraphQL errors:",
        json.errors.map((e: { message: string }) => e.message),
      )
    }
    const data = json.data
    if (!data?.user) return fallback()

    const calendar = data.user.contributionsCollection.contributionCalendar
    const weeks: ContributionDay[][] = calendar.weeks.map(
      (w: { contributionDays: { date: string; contributionCount: number; contributionLevel: string }[] }) =>
        w.contributionDays.map((d) => ({
          date: d.date,
          count: d.contributionCount,
          level: LEVELS[d.contributionLevel] ?? 0,
        })),
    )

    // Pinned repos first, then any featured repo that isn't pinned.
    const byName = new Map<string, Repo>()
    for (const node of data.user.pinnedItems.nodes as RawRepo[]) {
      if (node?.nameWithOwner) byName.set(node.nameWithOwner, toRepo(node))
    }
    featuredRepos.forEach((_, i) => {
      const raw = data[`r${i}`] as RawRepo | null
      if (raw && !byName.has(raw.nameWithOwner)) byName.set(raw.nameWithOwner, toRepo(raw))
    })

    return {
      live: true,
      totalContributions: calendar.totalContributions,
      weeks,
      repos: [...byName.values()],
    }
  } catch (error) {
    console.error("GitHub fetch failed:", error)
    return fallback()
  }
}
