import type { ConnectionStatus as ConnectionState } from "@/hooks/useHealthCheck"
import type { HealthStatus } from "@/types/config"
import { cn } from "cn"

import { useHealthCheck } from "@/hooks/useHealthCheck"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

type StatusVisual = {
  label: string
  dotClassName: string
  labelClassName?: string
}

const STATUS_VISUALS: Record<ConnectionState, StatusVisual> = {
  connected: {
    label: "Connected",
    dotClassName: "bg-emerald-500 dark:bg-emerald-400",
  },
  checking: {
    label: "Checking",
    dotClassName: "animate-pulse bg-muted-foreground/50",
  },
  offline: {
    label: "Offline",
    dotClassName: "bg-destructive",
    labelClassName: "text-destructive",
  },
}

export function ConnectionStatus() {
  const { data, connection } = useHealthCheck()
  const visual = STATUS_VISUALS[connection]

  return (
    <Tooltip>
      <TooltipTrigger
        aria-live="polite"
        className="flex h-7 items-center gap-1.5 px-2 text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-1 focus-visible:ring-ring/50"
      >
        <span
          className={cn("size-2 shrink-0 rounded-full", visual.dotClassName)}
        />
        <span className={visual.labelClassName}>{visual.label}</span>
      </TooltipTrigger>
      <TooltipContent side="bottom" align="end">
        {data ? (
          <HealthDetails data={data} />
        ) : connection === "offline" ? (
          "Server unreachable"
        ) : (
          "Waiting for first health check"
        )}
      </TooltipContent>
    </Tooltip>
  )
}

function HealthDetails({ data }: { data: HealthStatus }) {
  const services = Object.entries(data.services)

  return (
    <div className="grid gap-1 text-left">
      <div className="flex items-baseline justify-between gap-6">
        <span className="text-background/60">Version</span>
        <span className="font-medium">{data.version}</span>
      </div>
      <div className="flex items-baseline justify-between gap-6">
        <span className="text-background/60">Uptime</span>
        <span className="font-medium">{data.uptime}</span>
      </div>
      {services.length > 0 && (
        <div className="mt-1 grid gap-1 border-t border-background/20 pt-1">
          <span className="text-background/60">Services</span>
          {services.map(([name, ok]) => (
            <div
              key={name}
              className="flex items-baseline justify-between gap-6"
            >
              <span>{name}</span>
              <span
                className={
                  ok
                    ? "text-emerald-500 dark:text-emerald-600"
                    : "text-red-500 dark:text-red-600"
                }
              >
                {ok ? "ok" : "fail"}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
