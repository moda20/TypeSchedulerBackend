import { MoonIcon, SunIcon } from "lucide-react"
import { useLocation } from "react-router"

import { useTheme } from "@/components/theme-provider"
import { ConnectionStatus } from "@/components/layout/ConnectionStatus"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"

const PAGE_TITLES: Record<string, string> = {
  "/": "Config",
}

export function Header() {
  const { pathname } = useLocation()
  const pageTitle = PAGE_TITLES[pathname] ?? "Admin"

  return (
    <header className="flex h-12 shrink-0 items-center gap-3 border-b px-3">
      <SidebarTrigger />
      <Separator orientation="vertical" className="h-4" />
      <span className="text-sm font-medium">{pageTitle}</span>
      <div className="ml-auto flex items-center gap-1">
        <ThemeToggle />
        <ConnectionStatus />
      </div>
    </header>
  )
}

function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const isDark =
    theme === "dark" ||
    (theme === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)

  return (
    <Button
      variant="ghost"
      size="icon-sm"
      aria-label="Toggle theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      {isDark ? <SunIcon /> : <MoonIcon />}
    </Button>
  )
}
