import * as React from "react"
import type {
  AdminConfigResponse,
  ConfigDraft,
  ConfigEntry,
  ConfigUpdateEntry,
  PendingChange,
  PendingChangeKind,
} from "@/types/config"
import { ENCRYPTED_VALUE_MASK } from "@/types/config"

type Drafts = Record<string, ConfigDraft>

function toKey(section: string, leafKey: string): string {
  // Empty leafKey = scalar top-level key: the section alone is the config key
  return leafKey === "" ? section : `${section}.${leafKey}`
}

function fromKey(key: string): { section: string; leafKey: string } {
  const dot = key.lastIndexOf(".")
  return dot === -1
    ? { section: key, leafKey: "" }
    : { section: key.slice(0, dot), leafKey: key.slice(dot + 1) }
}

function lookupEntry(
  data: AdminConfigResponse | undefined,
  section: string,
  leafKey: string
): ConfigEntry {
  const entry = data?.configArray[section]?.[leafKey]
  if (!entry) {
    throw new Error(`Unknown config key: "${toKey(section, leafKey)}"`)
  }
  return entry
}

/**
 * Draft/diff state machine for the admin config editor.
 *
 * Server data flows in via the `data` prop (wire it to useConfigQuery()
 * data); the hook keeps an internal snapshot so pending changes stay computed
 * against a stable baseline. Call `reset` with fresh data after a successful
 * save (or a manual refresh) to clear drafts and re-baseline; call
 * `discardAll` to drop edits without touching the baseline.
 */
export function useConfigEditor(data?: AdminConfigResponse) {
  const [snapshot, setSnapshot] = React.useState<
    AdminConfigResponse | undefined
  >(data)
  const [drafts, setDrafts] = React.useState<Drafts>({})
  // Re-baseline against fresh server data during render (React's documented
  // "adjust state when a prop changes" pattern — no effect, no cascading render)
  const [lastSyncedData, setLastSyncedData] = React.useState(data)
  if (data !== lastSyncedData) {
    setLastSyncedData(data)
    setSnapshot(data)
  }

  const getEntry = React.useCallback(
    (section: string, leafKey: string): ConfigEntry =>
      lookupEntry(snapshot, section, leafKey),
    [snapshot]
  )

  const getDraft = React.useCallback(
    (section: string, leafKey: string): ConfigDraft | undefined =>
      drafts[toKey(section, leafKey)],
    [drafts]
  )

  /** Set a new value for a key. Editing a row marked for delete revives it. */
  const setValue = React.useCallback(
    (section: string, leafKey: string, value: string) => {
      const entry = lookupEntry(snapshot, section, leafKey)
      const key = toKey(section, leafKey)
      setDrafts((prev) => {
        const prior = prev[key]
        const next: ConfigDraft = { ...prior, value }
        delete next.deleted
        // Editing back to the server value (and no encryption change) is a no-op.
        if (next.value === entry.value && next.is_encrypted === undefined) {
          if (!prior) return prev
          const rest = { ...prev }
          delete rest[key]
          return rest
        }
        return { ...prev, [key]: next }
      })
    },
    [snapshot]
  )

  /**
   * Toggle encryption. Encrypting re-stores the current (possibly edited)
   * value; decrypting requires the user to re-enter the plaintext because the
   * stored value is only known to the server in masked form.
   */
  const setEncryption = React.useCallback(
    (
      section: string,
      leafKey: string,
      isEncrypted: boolean,
      plaintextIfDecrypt?: string
    ) => {
      const entry = lookupEntry(snapshot, section, leafKey)
      const key = toKey(section, leafKey)
      if (entry.base === true) {
        throw new Error(
          `"${key}" is a base configuration key: its encryption status cannot be changed`
        )
      }
      if (isEncrypted === entry.is_encrypted) {
        // Toggle returned to the server state: drop any encryption draft.
        setDrafts((prev) => {
          const prior = prev[key]
          if (!prior || prior.is_encrypted === undefined) return prev
          const next: ConfigDraft = { ...prior }
          delete next.is_encrypted
          const rest = { ...prev }
          if (next.value === undefined && next.deleted === undefined) {
            delete rest[key]
          } else {
            rest[key] = next
          }
          return rest
        })
        return
      }
      if (isEncrypted) {
        setDrafts((prev) => {
          const next: ConfigDraft = { ...prev[key], is_encrypted: true }
          delete next.deleted
          return { ...prev, [key]: next }
        })
      } else {
        if (plaintextIfDecrypt === undefined) {
          throw new Error(
            `Decrypting "${key}" requires entering its plaintext value: the stored value is masked and cannot be recovered by the UI`
          )
        }
        setDrafts((prev) => ({
          ...prev,
          [key]: { value: plaintextIfDecrypt, is_encrypted: false },
        }))
      }
    },
    [snapshot]
  )

  /** Mark a non-base key for deletion. */
  const markDeleted = React.useCallback(
    (section: string, leafKey: string) => {
      const entry = lookupEntry(snapshot, section, leafKey)
      const key = toKey(section, leafKey)
      if (entry.base === true) {
        throw new Error(
          `"${key}" is a base configuration key and cannot be deleted`
        )
      }
      setDrafts((prev) => ({ ...prev, [key]: { deleted: true } }))
    },
    [snapshot]
  )

  const undoChange = React.useCallback((key: string) => {
    setDrafts((prev) => {
      if (!(key in prev)) return prev
      const rest = { ...prev }
      delete rest[key]
      return rest
    })
  }, [])

  /** Drop every pending edit, keeping the current baseline. */
  const discardAll = React.useCallback(() => {
    setDrafts({})
  }, [])

  /** Clear drafts and optionally adopt fresh server data as the new baseline. */
  const reset = React.useCallback((nextData?: AdminConfigResponse) => {
    setDrafts({})
    if (nextData) setSnapshot(nextData)
  }, [])

  const pendingChanges = React.useMemo<PendingChange[]>(() => {
    if (!snapshot) return []
    const changes: PendingChange[] = []
    for (const key of Object.keys(drafts).sort()) {
      const draft = drafts[key]
      const { section, leafKey } = fromKey(key)
      const entry = snapshot.configArray[section]?.[leafKey]
      if (!entry) continue

      let kind: PendingChangeKind = "value"
      if (draft.deleted) {
        kind = "delete"
      } else if (
        draft.is_encrypted !== undefined &&
        draft.is_encrypted !== entry.is_encrypted
      ) {
        kind = draft.is_encrypted ? "encrypt" : "decrypt"
      }

      // A bare value draft equal to the server value is a no-op.
      if (
        kind === "value" &&
        (draft.value === undefined || draft.value === entry.value)
      ) {
        continue
      }

      changes.push({
        key,
        section,
        leafKey,
        kind,
        previousDisplayValue: entry.is_encrypted
          ? ENCRYPTED_VALUE_MASK
          : entry.value,
        nextDisplayValue: kind === "delete" ? "" : (draft.value ?? entry.value),
        base: entry.base === true,
        isEncrypted: entry.is_encrypted,
      })
    }
    return changes
  }, [drafts, snapshot])

  const isDirty = pendingChanges.length > 0
  const changeCount = pendingChanges.length

  /**
   * Build the POST /admin/updateConfig payload from the pending changes.
   * Implements the contract rules: dot-notation keys (translated to the
   * underscore wire notation by the API layer), is_encrypted on every
   * entry, never resends the encrypted mask, rejects base-key
   * deletes/encryption changes, and maps each change kind to its exact
   * wire shape. Throws a descriptive Error on any violation.
   */
  const buildUpdatePayload = React.useCallback((): ConfigUpdateEntry[] => {
    if (!snapshot) return []
    const payload: ConfigUpdateEntry[] = []
    for (const change of pendingChanges) {
      const entry = snapshot.configArray[change.section]?.[change.leafKey]
      if (!entry) continue
      const draft = drafts[change.key]
      if (!draft) continue

      if (entry.base === true && change.kind !== "value") {
        throw new Error(
          `"${change.key}" is a base configuration key: deletion and encryption changes are not allowed`
        )
      }

      switch (change.kind) {
        case "delete":
          payload.push({
            key: change.key,
            value: null,
            deleted: true,
            is_encrypted: draft.is_encrypted ?? entry.is_encrypted,
          })
          break
        case "decrypt": {
          const plaintext = draft.value
          if (plaintext === undefined) {
            throw new Error(
              `Decrypting "${change.key}" requires a plaintext value`
            )
          }
          if (plaintext === ENCRYPTED_VALUE_MASK) {
            throw new Error(
              `Refusing to decrypt "${change.key}" with the masked placeholder: enter its plaintext value`
            )
          }
          payload.push({
            key: change.key,
            value: plaintext,
            is_encrypted: draft.is_encrypted ?? entry.is_encrypted,
          })
          break
        }
        case "encrypt": {
          // Re-stores the current (possibly edited) value, encrypted.
          const value = draft.value ?? entry.value
          if (value === ENCRYPTED_VALUE_MASK) {
            throw new Error(
              `Refusing to send the encrypted placeholder for "${change.key}": enter its plaintext value first`
            )
          }
          payload.push({
            key: change.key,
            value,
            is_encrypted: draft.is_encrypted ?? entry.is_encrypted,
          })
          break
        }
        case "value": {
          const value = draft.value
          if (value === undefined || value === entry.value) break
          if (value === ENCRYPTED_VALUE_MASK) {
            throw new Error(
              `Refusing to send the encrypted placeholder for "${change.key}": enter a new value`
            )
          }
          // The wire contract requires is_encrypted on every entry: edits of
          // encrypted fields re-store the new plaintext encrypted; plaintext
          // edits re-affirm their unencrypted status.
          payload.push({
            key: change.key,
            value,
            is_encrypted: draft.is_encrypted ?? entry.is_encrypted,
          })
          break
        }
      }
    }
    return payload
  }, [drafts, snapshot, pendingChanges])

  return {
    drafts,
    getEntry,
    getDraft,
    setValue,
    setEncryption,
    markDeleted,
    undoChange,
    discardAll,
    reset,
    pendingChanges,
    isDirty,
    changeCount,
    buildUpdatePayload,
  }
}
