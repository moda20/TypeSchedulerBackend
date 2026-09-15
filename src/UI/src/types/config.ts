/**
 * Types mirroring the curl-verified admin config API contract
 * (see .tmp/admin-config-ui/PLAN.md, verified 2026-09-08).
 */

/** Placeholder the server sends instead of an encrypted value. Never send it back. */
export const ENCRYPTED_VALUE_MASK = "*******************"

export type ConfigEntry = {
  /** Current value. Encrypted entries arrive masked with ENCRYPTED_VALUE_MASK. */
  value: string
  is_encrypted: boolean
  doc: string | false
  default: unknown
  db_mirror: boolean
  format: string
  job_hidden: boolean
  /** Present & true => schema-defined key: no delete, no encryption toggle (value edit OK). */
  base?: true
}

export type AdminConfigResponse = {
  configArray: Record<string, Record<string, ConfigEntry>>
  categoriesMap: Record<string, string>
}

export type HealthStatus = {
  version: string
  name: string
  services: Record<string, boolean>
  uptime: string
}

/** One entry of the POST /admin/updateConfig body. */
export type ConfigUpdateEntry = {
  /**
   * Dot-notation key, e.g. "server.port". The backend translates dots to
   * the underscore DB keys itself and rejects underscored wire keys.
   */
  key: string
  /** Required by the server schema even for deletes (use null then). */
  value: string | null
  /**
   * Always sent: the entry's effective post-change encryption status
   * (current status for deletes). The backend rejects base-key updates
   * whose is_encrypted doesn't match the schema's, omission included.
   */
  is_encrypted?: boolean
  deleted?: boolean
}

export type PendingChangeKind = "value" | "encrypt" | "decrypt" | "delete"

/**
 * A single user-intended modification, resolved against the server snapshot.
 * Carries everything needed to render a confirmation list (old -> new).
 */
export type PendingChange = {
  /** Full dot-notation key, e.g. "server.PORT". */
  key: string
  section: string
  leafKey: string
  kind: PendingChangeKind
  /** Server value as displayed to the user (mask for encrypted entries). */
  previousDisplayValue: string
  /** Draft value as displayed to the user. Empty string for deletes. */
  nextDisplayValue: string
  /** True when the underlying entry is schema-defined (base). */
  base: boolean
  /** Server-side encryption status of the entry (before this change). */
  isEncrypted: boolean
}

/** Local edit overlay for one config key, keyed by dot-notation key. */
export type ConfigDraft = {
  value?: string
  is_encrypted?: boolean
  deleted?: boolean
}
