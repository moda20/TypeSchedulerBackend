import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

/** Layout-matching skeleton shown during the first config load. */
export function ConfigPageSkeleton() {
  return (
    <div className="flex flex-col gap-4 p-4 lg:p-6" aria-busy="true">
      <div className="flex flex-col gap-2">
        <Skeleton className="h-7 w-56" />
        <Skeleton className="h-4 w-full max-w-md" />
      </div>
      {[0, 1, 2].map((cardIndex) => (
        <Card key={cardIndex} className="gap-0 py-0">
          <div className="flex items-center gap-2.5 px-4 py-3.5">
            <Skeleton className="size-4" />
            <Skeleton className="h-4 w-28" />
            <Skeleton className="ml-auto h-3.5 w-14" />
          </div>
          <div className="flex flex-col gap-4 border-t border-border px-4 py-4">
            <Skeleton className="h-3 w-24" />
            {[0, 1, 2].map((rowIndex) => (
              <div
                key={rowIndex}
                className="flex flex-col gap-2.5 sm:flex-row sm:items-center"
              >
                <div className="flex flex-col gap-1.5 sm:w-64 sm:shrink-0">
                  <Skeleton className="h-3.5 w-40" />
                  <Skeleton className="h-5 w-24" />
                </div>
                <Skeleton className="h-8 w-full flex-1" />
              </div>
            ))}
          </div>
        </Card>
      ))}
    </div>
  )
}
