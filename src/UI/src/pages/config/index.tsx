import * as React from "react"
import { toast } from "sonner"

import { ChangesBar } from "@/components/config/ChangesBar"
import { ConfigCategoryCard } from "@/components/config/ConfigCategoryCard"
import { ConfigErrorState } from "@/components/config/ConfigErrorState"
import { ConfigPageSkeleton } from "@/components/config/ConfigPageSkeleton"
import { ConfirmSaveDialog } from "@/components/config/ConfirmSaveDialog"
import { DecryptDialog } from "@/components/config/DecryptDialog"
import type { DecryptTarget } from "@/components/config/types"
import { TooltipProvider } from "@/components/ui/tooltip"
import { useConfigEditor } from "@/hooks/useConfigEditor"
import { useConfigQuery } from "@/hooks/useConfigQuery"
import { useUpdateConfig } from "@/hooks/useUpdateConfig"
import { isUnauthorized } from "@/api/adminConfig.api"
import { groupByCategory } from "@/lib/configGrouping"
import type { ConfigUpdateEntry } from "@/types/config"

/**
 * Admin configuration page. Edits are staged as drafts in useConfigEditor and
 * only reach the server after an explicit review-and-save round trip; a
 * successful save resets the editor (masked encrypted values would otherwise
 * stay dirty forever) and the invalidated query refetches fresh data.
 */
export function ConfigPage() {
  const query = useConfigQuery()
  const editor = useConfigEditor(query.data)
  const mutation = useUpdateConfig()
  const [saveOpen, setSaveOpen] = React.useState(false)
  const [decryptTarget, setDecryptTarget] =
    React.useState<DecryptTarget | null>(null)

  const data = query.data
  const groups = React.useMemo(
    () => (data ? groupByCategory(data) : []),
    [data]
  )

  const handleDecryptRequest = (section: string, leafKey: string) => {
    setDecryptTarget({ section, leafKey })
  }

  const handleDecryptConfirm = (plaintext: string) => {
    if (!decryptTarget) return
    try {
      editor.setEncryption(
        decryptTarget.section,
        decryptTarget.leafKey,
        false,
        plaintext
      )
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Could not stage the decryption"
      )
    }
    setDecryptTarget(null)
  }

  const handleSaveConfirm = async () => {
    let payload: ConfigUpdateEntry[]
    try {
      payload = editor.buildUpdatePayload()
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Could not build the update payload"
      )
      return
    }
    try {
      await mutation.mutateAsync(payload)
      editor.reset()
      setSaveOpen(false)
      toast.success("Configuration updated")
    } catch (error) {
      if (isUnauthorized(error)) {
        setSaveOpen(false)
        toast.error("Session expired", {
          description:
            "The admin token has expired (15 min TTL). Reload to get a fresh one.",
          action: {
            label: "Reload",
            onClick: () => window.location.reload(),
          },
        })
      } else {
        toast.error(
          error instanceof Error
            ? error.message
            : "Failed to update configuration"
        )
      }
    }
  }

  if (!data) {
    if (query.isError) {
      return (
        <ConfigErrorState
          error={query.error}
          onRetry={() => {
            query.refetch()
          }}
        />
      )
    }
    return <ConfigPageSkeleton />
  }

  return (
    <TooltipProvider>
      <div className="flex flex-col gap-4 p-4 pb-6 lg:p-6">
        <header className="flex flex-col gap-1">
          <h1 className="font-heading text-lg font-semibold tracking-tight">
            Configuration
          </h1>
          <p className="text-xs text-muted-foreground">
            Quick existing config updates direct to DB,
            this is useful for when the client API is not available.
          </p>
        </header>
        <div className="flex flex-col gap-4">
          {groups.map((group) => (
            <ConfigCategoryCard
              key={group.category}
              category={group.category}
              sections={group.sections}
              editor={editor}
              onDecryptRequest={handleDecryptRequest}
            />
          ))}
        </div>
        {editor.isDirty ? (
          <ChangesBar
            changeCount={editor.changeCount}
            onReview={() => {
              setSaveOpen(true)
            }}
            onDiscard={() => {
              editor.discardAll()
            }}
          />
        ) : null}
        <ConfirmSaveDialog
          open={saveOpen}
          onOpenChange={setSaveOpen}
          changes={editor.pendingChanges}
          saving={mutation.isPending}
          onConfirm={handleSaveConfirm}
        />
        <DecryptDialog
          target={decryptTarget}
          onConfirm={handleDecryptConfirm}
          onCancel={() => {
            setDecryptTarget(null)
          }}
        />
      </div>
    </TooltipProvider>
  )
}
