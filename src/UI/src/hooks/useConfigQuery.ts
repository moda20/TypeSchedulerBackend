import { useQuery } from "@tanstack/react-query"
import { fetchAdminConfig, isUnauthorized } from "@/api/adminConfig.api"

export const ADMIN_CONFIG_QUERY_KEY = ["admin-config"] as const

export function useConfigQuery() {
  return useQuery({
    queryKey: ADMIN_CONFIG_QUERY_KEY,
    queryFn: ({ signal }) => fetchAdminConfig(signal),
    // 401s are terminal (token TTL) — never retry them
    retry: (failureCount, error) => !isUnauthorized(error) && failureCount < 1,
  })
}
