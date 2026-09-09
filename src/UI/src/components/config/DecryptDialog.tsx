import * as React from "react"
import { LockOpenIcon } from "lucide-react"

import type { DecryptTarget } from "@/components/config/types"
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ENCRYPTED_VALUE_MASK } from "@/types/config"

type DecryptDialogProps = {
  target: DecryptTarget | null
  onConfirm: (plaintext: string) => void
  onCancel: () => void
}

/**
 * Collects the plaintext for decrypting an entry. The input always starts
 * EMPTY (the stored value is masked and can never be prefilled), and the
 * masked placeholder itself is rejected as a confirmation value.
 */
export function DecryptDialog({
  target,
  onConfirm,
  onCancel,
}: DecryptDialogProps) {
  const [plaintext, setPlaintext] = React.useState("")
  const targetKey = target
    ? target.leafKey === ""
      ? target.section
      : `${target.section}.${target.leafKey}`
    : null

  // Reset the input whenever a new target is opened (render-phase prop sync).
  const [lastTargetKey, setLastTargetKey] = React.useState<string | null>(
    targetKey
  )
  if (targetKey !== lastTargetKey) {
    setLastTargetKey(targetKey)
    setPlaintext("")
  }

  const canConfirm =
    target !== null &&
    plaintext.length > 0 &&
    plaintext !== ENCRYPTED_VALUE_MASK

  return (
    <AlertDialog
      open={target !== null}
      onOpenChange={(open) => {
        if (!open) onCancel()
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogMedia>
            <LockOpenIcon />
          </AlertDialogMedia>
          <AlertDialogTitle>
            Decrypt &quot;{targetKey ?? ""}&quot;
          </AlertDialogTitle>
          <AlertDialogDescription>
            The stored value is masked and cannot be recovered by the UI. Enter
            the plaintext value to store instead; it will be saved unencrypted
            once you review and save.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Input
          value={plaintext}
          onChange={(event) => setPlaintext(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && canConfirm) onConfirm(plaintext)
          }}
          placeholder="Enter plaintext value"
          autoFocus
          autoComplete="off"
          spellCheck={false}
          className="font-mono"
          aria-label={`Plaintext value for ${targetKey ?? "encrypted key"}`}
        />
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button disabled={!canConfirm} onClick={() => onConfirm(plaintext)}>
            Continue
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
