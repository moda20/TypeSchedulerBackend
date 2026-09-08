import type { useConfigEditor } from "@/hooks/useConfigEditor"

/** The object returned by useConfigEditor, passed down through the config page tree. */
export type ConfigEditorApi = ReturnType<typeof useConfigEditor>

/** The encrypted entry the user is currently decrypting (plaintext required). */
export type DecryptTarget = {
  section: string
  leafKey: string
}
