import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateAdminConfig } from "@/api/adminConfig.api"
import type { ConfigUpdateEntry } from "@/types/config"
import { ADMIN_CONFIG_QUERY_KEY } from "@/hooks/useConfigQuery"

export function useUpdateConfig() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (changes: ConfigUpdateEntry[]) => updateAdminConfig(changes),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ADMIN_CONFIG_QUERY_KEY })
    },
  })
}
