import type { AdminConfigResponse, ConfigEntry } from "@/types/config"

export type ConfigSectionGroup = {
  section: string
  entries: Record<string, ConfigEntry>
}

export type ConfigCategoryGroup = {
  category: string
  sections: ConfigSectionGroup[]
}

const KNOWN_CATEGORY_ORDER = ["system", "logging", "notifications"] as const
const CUSTOM_CATEGORY = "custom"

/**
 * Groups config sections into display categories: system, logging,
 * notifications first (in that order), then any other mapped categories
 * alphabetically, and finally sections missing from categoriesMap under
 * "custom". Sections are alphabetical within each category.
 */
export function groupByCategory(
  response: AdminConfigResponse
): ConfigCategoryGroup[] {
  const byCategory = new Map<string, ConfigSectionGroup[]>()

  for (const section of Object.keys(response.configArray)) {
    const category = response.categoriesMap[section] ?? CUSTOM_CATEGORY
    const sections = byCategory.get(category) ?? []
    sections.push({ section, entries: response.configArray[section] })
    byCategory.set(category, sections)
  }

  const ordered: ConfigCategoryGroup[] = []
  const flush = (category: string) => {
    const sections = byCategory.get(category)
    if (!sections) return
    sections.sort((a, b) => a.section.localeCompare(b.section))
    ordered.push({ category, sections })
    byCategory.delete(category)
  }

  for (const category of KNOWN_CATEGORY_ORDER) flush(category)
  const otherCategories = Array.from(byCategory.keys())
    .filter((c) => c !== CUSTOM_CATEGORY)
    .sort()
  for (const category of otherCategories) {
    flush(category)
  }
  flush(CUSTOM_CATEGORY)

  return ordered
}
