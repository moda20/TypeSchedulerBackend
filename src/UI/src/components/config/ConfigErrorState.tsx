import { RefreshCwIcon } from "lucide-react"

import { isUnauthorized } from "@/api/adminConfig.api"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

type ConfigErrorStateProps = {
  error: unknown
  onRetry: () => void
}

/**
 * First-load failure state. A 401 means the 15-minute UI token expired:
 * reloading the page mints a fresh one from the server-rendered meta tag.
 */
export function ConfigErrorState({ error, onRetry }: ConfigErrorStateProps) {
  const unauthorized = isUnauthorized(error)
  const message = error instanceof Error ? error.message : "Unexpected error"

  return (
    <div className="flex min-h-full items-center justify-center p-4">
      <Card className="w-full max-w-lg">
        <CardHeader>
          {unauthorized ? (
            <>
              <CardTitle>Session expired</CardTitle>
              <CardDescription>
                The admin UI token is no longer valid. Reload the page to mint a
                fresh token and continue.
              </CardDescription>
            </>
          ) : (
            <>
              <CardTitle>Failed to load configuration</CardTitle>
              <CardDescription className="break-words">
                {message}
              </CardDescription>
            </>
          )}
          <CardAction>
            {unauthorized ? (
              <Button onClick={() => window.location.reload()}>
                <RefreshCwIcon data-icon="inline-start" />
                Reload page
              </Button>
            ) : (
              <Button variant="outline" onClick={onRetry}>
                <RefreshCwIcon data-icon="inline-start" />
                Retry
              </Button>
            )}
          </CardAction>
        </CardHeader>
      </Card>
    </div>
  )
}
