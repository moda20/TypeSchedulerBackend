import { getCAToken } from "@/utils/httpUtils"
import type {
  AdminConfigResponse,
  ConfigUpdateEntry,
  HealthStatus,
} from "@/types/config"

/** Error thrown for any non-2xx admin API response. Message is the raw response body (server sends plain-text errors). */
export class ApiError extends Error {
  readonly status: number

  constructor(message: string, status: number) {
    super(message)
    this.name = "ApiError"
    this.status = status
  }
}

export function isUnauthorized(error: unknown): boolean {
  return error instanceof ApiError && error.status === 401
}

type RequestOptions = {
  method?: "GET" | "POST"
  /** JSON body; sets the content-type header. */
  body?: string
  /** Adds the x-ui-token header from the page's CA_TOKEN meta. */
  auth?: boolean
  signal?: AbortSignal
}

/**
 * Low-level same-origin request. Any 2xx (including an empty body) resolves;
 * any non-2xx rejects with an ApiError carrying the body text.
 */
async function request(
  path: string,
  options: RequestOptions = {}
): Promise<string> {
  const headers: Record<string, string> = {}
  if (options.body !== undefined) {
    headers["content-type"] = "application/json"
  }
  if (options.auth) {
    headers["x-ui-token"] = getCAToken()
  }

  const response = await fetch(path, {
    method: options.method ?? "GET",
    headers,
    body: options.body,
    signal: options.signal,
  })

  const text = await response.text()
  if (!response.ok) {
    throw new ApiError(
      text || `Request failed with status ${response.status}`,
      response.status
    )
  }
  return text
}

function parseJson<T>(text: string, status: number): T {
  try {
    return JSON.parse(text) as T
  } catch {
    throw new ApiError(
      `Unexpected non-JSON response (status ${status}): ${text.slice(0, 120)}`,
      status
    )
  }
}

function isConfigEntry(
  value: unknown
): value is AdminConfigResponse["configArray"][string][string] {
  return (
    typeof value === "object" &&
    value !== null &&
    "value" in value &&
    "is_encrypted" in value &&
    "db_mirror" in value &&
    "format" in value
  )
}

/**
 * Scalar top-level config keys (e.g. `env`, `appName`) arrive as the entry
 * itself, not as a leaf map. Normalize them to `{ "": entry }` so every
 * section downstream is uniformly Record<leafKey, ConfigEntry>; an empty
 * leafKey means "the section IS the config key".
 */
function normalizeConfigArray(raw: AdminConfigResponse): AdminConfigResponse {
  const configArray: AdminConfigResponse["configArray"] = {}
  for (const [section, leaves] of Object.entries(raw.configArray)) {
    configArray[section] = isConfigEntry(leaves) ? { "": leaves } : leaves
  }
  return { ...raw, configArray }
}

export async function fetchAdminConfig(
  signal?: AbortSignal
): Promise<AdminConfigResponse> {
  const text = await request("/admin/config", { auth: true, signal })
  return normalizeConfigArray(parseJson<AdminConfigResponse>(text, 200))
}

/**
 * POST /admin/updateConfig. The server answers 200 with an EMPTY body on
 * success, so any 2xx (empty text included) is treated as success here.
 */
export async function updateAdminConfig(
  changes: ConfigUpdateEntry[],
  signal?: AbortSignal
): Promise<void> {
  await request("/admin/updateConfig", {
    method: "POST",
    body: JSON.stringify(changes),
    auth: true,
    signal,
  })
}

/** GET /status/version — public endpoint, no token header. */
export async function fetchHealth(signal?: AbortSignal): Promise<HealthStatus> {
  // A hung request would stall the poll cycle forever (react-query only
  // schedules the next tick after the current one settles) — cap it.
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), 5000)
  if (signal?.aborted) controller.abort()
  else
    signal?.addEventListener("abort", () => controller.abort(), { once: true })
  try {
    const text = await request("/status/version", {
      signal: controller.signal,
    })
    return parseJson<HealthStatus>(text, 200)
  } finally {
    clearTimeout(timer)
  }
}
