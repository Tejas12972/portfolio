"use client"

// Adapted from chanhdai.com (https://github.com/ncdai/chanhdai.com).
// MIT License. Copyright (c) 2026 Chánh Đại.

import { useTheme } from "next-themes"
import { useHotkeys } from "react-hotkeys-hook"

import { Button } from "./ui/button"

export function useToggleTheme() {
  const { resolvedTheme, systemTheme, setTheme } = useTheme()
  return () => {
    const next = resolvedTheme === "dark" ? "light" : "dark"
    setTheme(next === systemTheme ? "system" : next)
  }
}

export function ThemeToggle() {
  const toggle = useToggleTheme()

  useHotkeys("d", () => toggle())

  return (
    <Button
      className="relative touch-manipulation"
      variant="ghost"
      size="icon-sm"
      aria-label="Toggle light or dark theme (D)"
      title="Toggle theme (D)"
      onClick={toggle}
    >
      <span className="absolute size-11 pointer-fine:hidden" aria-hidden />
      <DarkSideIcon className="size-4" />
    </Button>
  )
}

// Adapted from toggles.dev "Dark Side".
// `transition-transform!` overrides the `transition: none !important` that
// `next-themes` applies during theme changes (`disableTransitionOnChange`).
function DarkSideIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="currentColor" aria-hidden>
      <path
        d="M16 .5C7.4.5.5 7.4.5 16S7.4 31.5 16 31.5 31.5 24.6 31.5 16 24.6.5 16 .5zm0 28.1V3.4C23 3.4 28.6 9 28.6 16S23 28.6 16 28.6z"
        className="origin-center motion-safe:transition-transform! motion-safe:duration-500 motion-safe:ease-[ease] dark:rotate-180"
      />
    </svg>
  )
}
