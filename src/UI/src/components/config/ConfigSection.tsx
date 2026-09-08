import { ConfigField } from "@/components/config/ConfigField"
import type { ConfigEditorApi } from "@/components/config/types"
import { Separator } from "@/components/ui/separator"
import type { ConfigEntry } from "@/types/config"

type ConfigSectionProps = {
  section: string
  entries: Record<string, ConfigEntry>
  editor: ConfigEditorApi
  onDecryptRequest: (section: string, leafKey: string) => void
}

/** A titled sub-group of config rows inside a category card. */
export function ConfigSection({
  section,
  entries,
  editor,
  onDecryptRequest,
}: ConfigSectionProps) {
  return (
    <section
      aria-label={`${section} settings`}
      className="mb-4 flex break-inside-avoid flex-col border border-border p-3 last:mb-0"
    >
      <div className="flex items-center gap-2.5 pb-2">
        <h3 className="font-mono text-xs font-medium tracking-wider text-muted-foreground uppercase">
          {section}
        </h3>
        <Separator className="flex-1" />
      </div>
      <div className="divide-y divide-border">
        {Object.keys(entries).map((leafKey) => (
          <ConfigField
            key={leafKey}
            section={section}
            leafKey={leafKey}
            entry={entries[leafKey]}
            editor={editor}
            onDecryptRequest={onDecryptRequest}
          />
        ))}
      </div>
    </section>
  )
}
