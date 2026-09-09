import { useQuery } from "@tanstack/react-query"
import { fetchHealth } from "@/api/adminConfig.api"

export const ADMIN_HEALTH_QUERY_KEY = ["admin-health"] as const

export type ConnectionStatus = "connected" | "checking" | "offline"

const POLL_INTERVAL_MS = 15_000

/**
 * Polls GET /status/version (no auth) every 15s. "checking" until the first
 * poll answers; "connected" only while the latest poll succeeded with data;
 * any error flips to "offline" even if stale data is still cached.
 */
export function useHealthCheck() {
  const query = useQuery({
    queryKey: ADMIN_HEALTH_QUERY_KEY,
    queryFn: ({ signal }) => fetchHealth(signal),
    refetchInterval: POLL_INTERVAL_MS,
    retry: 1,
  })

  const connection: ConnectionStatus = query.isError
    ? "offline"
    : query.data !== undefined
      ? "connected"
      : "checking"

  return { ...query, connection }
}
