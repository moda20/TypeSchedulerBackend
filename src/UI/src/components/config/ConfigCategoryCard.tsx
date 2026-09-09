import { ChevronDownIcon } from "lucide-react"

import { ConfigSection } from "@/components/config/ConfigSection"
import type { ConfigEditorApi } from "@/components/config/types"
import { Card } from "@/components/ui/card"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import type { ConfigSectionGroup } from "@/lib/configGrouping"

type ConfigCategoryCardProps = {
  category: string
  sections: ConfigSectionGroup[]
  editor: ConfigEditorApi
  onDecryptRequest: (section: string, leafKey: string) => void
}

/** A collapsible card grouping all config sections of one category. */
export function ConfigCategoryCard({
  category,
  sections,
  editor,
  onDecryptRequest,
}: ConfigCategoryCardProps) {
  const entryCount = sections.reduce(
    (sum, group) => sum + Object.keys(group.entries).length,
    0
  )

  return (
    <Card className="gap-0 py-0">
      <Collapsible defaultOpen>
        <CollapsibleTrigger
          className="group/trigger flex w-full items-center gap-2.5 px-4 py-3.5 text-left transition-colors outline-none hover:bg-muted/50 focus-visible:ring-1 focus-visible:ring-ring/50"
          aria-label={`Toggle ${category} category`}
        >
          <ChevronDownIcon className="size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-data-[panel-open]/trigger:rotate-180" />
          <span className="font-heading text-sm font-medium capitalize">
            {category}
          </span>
          <span className="ml-auto text-xs text-muted-foreground">
            {entryCount} {entryCount === 1 ? "key" : "keys"}
          </span>
        </CollapsibleTrigger>
        <CollapsibleContent>
          {/* Sections are the column units: 2 masonry columns on wide
              screens, one full-width column below xl. Section cards carry
              break-inside-avoid so they never split across columns. */}
          <div className="columns-1 gap-4 border-t border-border px-4 py-4 xl:columns-2">
            {sections.map((group) => (
              <ConfigSection
                key={group.section}
                section={group.section}
                entries={group.entries}
                editor={editor}
                onDecryptRequest={onDecryptRequest}
              />
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  )
}
