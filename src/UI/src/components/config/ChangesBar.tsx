import { CircleAlertIcon, SaveIcon, Trash2Icon } from "lucide-react"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"

type ChangesBarProps = {
  changeCount: number
  onReview: () => void
  onDiscard: () => void
}

/**
 * Sticky bottom bar shown only while there are pending (unsaved) changes.
 * Discarding requires its own confirmation.
 */
export function ChangesBar({
  changeCount,
  onReview,
  onDiscard,
}: ChangesBarProps) {
  return (
    <div className="sticky bottom-4 z-30 mt-2">
      <div className="flex flex-col gap-3 bg-card/95 p-3 shadow-lg ring-1 ring-foreground/10 backdrop-blur sm:flex-row sm:items-center sm:pl-4">
        <div
          className="flex items-center gap-2 text-xs font-medium"
          role="status"
        >
          <CircleAlertIcon className="size-4 shrink-0 text-primary" />
          <span>
            {changeCount} pending {changeCount === 1 ? "change" : "changes"}
          </span>
        </div>
        <div className="flex items-center gap-2 sm:ml-auto">
          <AlertDialog>
            <AlertDialogTrigger
              render={<Button variant="outline" size="sm" />}
              aria-label="Discard all pending changes"
            >
              <Trash2Icon data-icon="inline-start" />
              Discard all
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Discard all changes?</AlertDialogTitle>
                <AlertDialogDescription>
                  All {changeCount} pending{" "}
                  {changeCount === 1 ? "change" : "changes"} will be discarded.
                  This cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction variant="destructive" onClick={onDiscard}>
                  Discard changes
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <Button size="sm" onClick={onReview}>
            <SaveIcon data-icon="inline-start" />
            Review &amp; save
          </Button>
        </div>
      </div>
    </div>
  )
}
