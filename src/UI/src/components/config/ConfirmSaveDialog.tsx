import type { VariantProps } from "class-variance-authority"
import { ArrowRightIcon, Loader2Icon, SaveIcon } from "lucide-react"

import { Badge, badgeVariants } from "@/components/ui/badge"
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import type { PendingChange, PendingChangeKind } from "@/types/config"

type BadgeVariant = VariantProps<typeof badgeVariants>["variant"]

const KIND_META: Record<
  PendingChangeKind,
  { label: string; variant: BadgeVariant }
> = {
  value: { label: "value", variant: "secondary" },
  encrypt: { label: "encrypt", variant: "default" },
  decrypt: { label: "decrypt", variant: "outline" },
  delete: { label: "delete", variant: "destructive" },
}

type ConfirmSaveDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  changes: PendingChange[]
  saving: boolean
  onConfirm: () => void
}

/**
 * Pre-save review: lists every pending change (previous value, kind badge,
 * next value / "will be deleted"). The dialog stays open while saving or when
 * the save fails — only a successful save closes it (parent-driven).
 */
export function ConfirmSaveDialog({
  open,
  onOpenChange,
  changes,
  saving,
  onConfirm,
}: ConfirmSaveDialogProps) {
  return (
    <AlertDialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (!saving) onOpenChange(nextOpen)
      }}
    >
      <AlertDialogContent className="sm:max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle>Review changes</AlertDialogTitle>
          <AlertDialogDescription>
            {changes.length} {changes.length === 1 ? "change" : "changes"} will
            be sent to the server.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <ul className="max-h-96 overflow-y-auto" role="list">
          {changes.map((change) => {
            const meta = KIND_META[change.kind]
            return (
              <li
                key={change.key}
                data-change-key={change.key}
                data-change-kind={change.kind}
                className="border-b border-border py-2.5 first:pt-0 last:border-b-0 last:pb-0"
              >
                <div className="flex min-w-0 items-center gap-2">
                  <span
                    className="truncate font-mono text-xs font-medium"
                    title={change.key}
                  >
                    {change.key}
                  </span>
                  <Badge variant={meta.variant}>{meta.label}</Badge>
                </div>
                <div className="mt-1 flex min-w-0 items-center gap-1.5">
                  <span
                    className="truncate font-mono text-muted-foreground"
                    title={change.previousDisplayValue}
                  >
                    {change.previousDisplayValue || "(empty)"}
                  </span>
                  <ArrowRightIcon className="size-3 shrink-0 text-muted-foreground" />
                  {change.kind === "delete" ? (
                    <span className="shrink-0 text-xs font-medium text-destructive">
                      will be deleted
                    </span>
                  ) : (
                    <span
                      className="truncate font-mono"
                      title={change.nextDisplayValue}
                    >
                      {change.nextDisplayValue || "(empty)"}
                    </span>
                  )}
                </div>
              </li>
            )
          })}
        </ul>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={saving}>Cancel</AlertDialogCancel>
          <Button onClick={onConfirm} disabled={saving}>
            {saving ? (
              <Loader2Icon data-icon="inline-start" className="animate-spin" />
            ) : (
              <SaveIcon data-icon="inline-start" />
            )}
            {saving ? "Saving..." : "Save changes"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
