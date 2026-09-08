import { EyeOffIcon, LockIcon, Trash2Icon, Undo2Icon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import type { ConfigDraft, ConfigEntry } from "@/types/config"
import { ENCRYPTED_VALUE_MASK } from "@/types/config"
import type { ConfigEditorApi } from "@/components/config/types"

type ConfigFieldProps = {
  section: string
  leafKey: string
  entry: ConfigEntry
  editor: ConfigEditorApi
  onDecryptRequest: (section: string, leafKey: string) => void
}

/**
 * One editable config row: key (+ doc tooltip), format/base/encrypted badges,
 * value input, encryption switch, delete and undo affordances.
 *
 * Encrypted values arrive masked: the mask is shown as a placeholder and the
 * input starts empty so the mask is never resubmitted as a value. Nested
 * notification keys (dotted leafKey) are read-only — the server rejects edits.
 */
export function ConfigField({
  section,
  leafKey,
  entry,
  editor,
  onDecryptRequest,
}: ConfigFieldProps) {
  const draft: ConfigDraft | undefined = editor.getDraft(section, leafKey)
  // Empty leafKey = scalar top-level key: the section alone is the config key
  const key = leafKey === "" ? section : `${section}.${leafKey}`
  const label = leafKey === "" ? section : leafKey
  const isDeleted = draft?.deleted === true
  const isBase = entry.base === true
  const isReadOnly = section === "notifications" && leafKey.includes(".")
  // Booleans get a true/false dropdown instead of free-text input.
  // Encrypted entries fall back to text (their value is an unknown secret).
  const isBooleanField = entry.format === "boolean" && !entry.is_encrypted
  const effectiveValue = draft?.value ?? entry.value
  const booleanRawOptions =
    effectiveValue === "true" || effectiveValue === "false"
      ? ["true", "false"]
      : [effectiveValue, "true", "false"]
  const booleanItems = booleanRawOptions.map((option) => ({
    label: option,
    value: option,
  }))

  const keyLabelClass = cn(
    "truncate font-mono text-xs font-medium",
    isDeleted && "line-through decoration-destructive"
  )

  return (
    <div
      data-config-key={key}
      data-dirty={draft !== undefined || undefined}
      data-deleted={isDeleted || undefined}
      data-readonly={isReadOnly || undefined}
      className={cn(
        "flex flex-col gap-2.5 py-2.5 sm:flex-row sm:items-center sm:gap-4",
        isDeleted && "bg-destructive/5"
      )}
    >
      <div className="flex w-full min-w-0 flex-col gap-1.5 sm:w-64 sm:shrink-0">
        {entry.doc ? (
          <Tooltip>
            <TooltipTrigger
              render={
                <span
                  className={cn(
                    keyLabelClass,
                    "cursor-help underline decoration-muted-foreground decoration-dotted underline-offset-4"
                  )}
                />
              }
            >
              {label}
            </TooltipTrigger>
            <TooltipContent>{entry.doc}</TooltipContent>
          </Tooltip>
        ) : (
          <span className={keyLabelClass}>{label}</span>
        )}
        <div className="flex flex-wrap items-center gap-1">
          {entry.format ? (
            <Badge variant="outline" className="font-mono">
              {entry.format}
            </Badge>
          ) : null}
          {isBase ? (
            <Badge
              variant="secondary"
              title="Schema-defined key: cannot be deleted or re-encrypted"
            >
              base
            </Badge>
          ) : null}
          {entry.is_encrypted ? (
            <Badge variant="outline">
              <LockIcon data-icon="inline-start" />
              encrypted
            </Badge>
          ) : null}
          {isReadOnly ? (
            <Badge
              variant="outline"
              title="Nested notification keys are not editable through this API"
            >
              <EyeOffIcon data-icon="inline-start" />
              read-only
            </Badge>
          ) : null}
        </div>
      </div>

      <div className="flex min-w-0 flex-1 items-center gap-2">
        {isDeleted ? (
          <>
            <Input
              value=""
              disabled
              placeholder="Will be deleted"
              className="font-mono"
              aria-label={`Value for ${key}`}
            />
            <Button
              variant="outline"
              size="sm"
              className="shrink-0"
              onClick={() => editor.undoChange(key)}
              title="Undo delete"
            >
              <Undo2Icon data-icon="inline-start" />
              Undo
            </Button>
          </>
        ) : (
          <>
            {isBooleanField ? (
              <div className="flex min-w-0 flex-1">
                <Select
                  items={booleanItems}
                  value={draft?.value ?? entry.value}
                  onValueChange={(next) => {
                    if (typeof next === "string") {
                      editor.setValue(section, leafKey, next)
                    }
                  }}
                >
                  <SelectTrigger
                    className="w-full font-mono sm:max-w-56"
                    aria-label={`Value for ${key}`}
                    disabled={isReadOnly}
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {booleanItems.map((item) => (
                      <SelectItem
                        key={item.value}
                        value={item.value}
                        className="font-mono"
                      >
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            ) : (
              <Input
                value={draft?.value ?? (entry.is_encrypted ? "" : entry.value)}
                placeholder={
                  entry.is_encrypted && draft?.value === undefined
                    ? ENCRYPTED_VALUE_MASK
                    : ""
                }
                readOnly={isReadOnly}
                onChange={(event) =>
                  editor.setValue(section, leafKey, event.target.value)
                }
                className={cn(
                  "font-mono",
                  isReadOnly &&
                    "cursor-text opacity-80 focus-visible:border-input focus-visible:ring-transparent"
                )}
                aria-label={`Value for ${key}`}
                title={
                  isReadOnly
                    ? "Nested notification keys are not editable through this API"
                    : entry.is_encrypted && draft?.value === undefined
                      ? "Masked value: type a replacement plaintext"
                      : undefined
                }
              />
            )}
            <Switch
              className="shrink-0"
              checked={draft?.is_encrypted ?? entry.is_encrypted}
              disabled={isBase || isReadOnly}
              onCheckedChange={(next) => {
                if (!next && entry.is_encrypted) {
                  onDecryptRequest(section, leafKey)
                } else {
                  editor.setEncryption(section, leafKey, next)
                }
              }}
              aria-label={`Toggle encryption for ${key}`}
              title={
                isBase
                  ? "Base keys cannot change encryption"
                  : isReadOnly
                    ? "Read-only key"
                    : entry.is_encrypted
                      ? "Encrypted: turning off requires re-entering the plaintext"
                      : "Store this value encrypted"
              }
            />
            <Button
              variant="ghost"
              size="icon-xs"
              className="shrink-0 text-destructive hover:bg-destructive/10 hover:text-destructive"
              disabled={isBase || isReadOnly}
              onClick={() => editor.markDeleted(section, leafKey)}
              aria-label={`Delete ${key}`}
              title={
                isBase
                  ? "Base keys cannot be deleted"
                  : isReadOnly
                    ? "Read-only key"
                    : `Delete ${key}`
              }
            >
              <Trash2Icon />
            </Button>
            {draft !== undefined ? (
              <Button
                variant="ghost"
                size="icon-xs"
                className="shrink-0 text-muted-foreground"
                onClick={() => editor.undoChange(key)}
                aria-label={`Undo pending change for ${key}`}
                title="Undo pending change"
              >
                <Undo2Icon />
              </Button>
            ) : null}
          </>
        )}
      </div>
    </div>
  )
}
