import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export function MetricCardSkeleton({ index = 0 }: { index?: number }) {
  return (
    <Card 
      className={cn(
        "bg-gradient-subtle border-0 shadow-elegant animate-fade-in-up animate-shimmer",
        "bg-gradient-to-r from-muted via-muted/50 to-muted bg-[length:1000px_100%]"
      )}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-3 flex-1">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-8 w-32" />
          </div>
          <Skeleton className="h-12 w-12 rounded-xl" />
        </div>
        <div className="mt-4 flex items-center space-x-2">
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-4 w-32" />
        </div>
      </CardContent>
    </Card>
  );
}

export function ChartCardSkeleton({ index = 0 }: { index?: number }) {
  return (
    <Card 
      className={cn(
        "bg-gradient-subtle border-0 shadow-elegant animate-fade-in-up animate-shimmer",
        "bg-gradient-to-r from-muted via-muted/50 to-muted bg-[length:1000px_100%]"
      )}
      style={{ animationDelay: `${index * 150}ms` }}
    >
      <CardHeader className="pb-4">
        <Skeleton className="h-6 w-48" />
        <Skeleton className="h-4 w-64" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-[300px] w-full rounded-lg" />
      </CardContent>
    </Card>
  );
}

export function TableSkeleton() {
  return (
    <Card className="bg-gradient-subtle border-0 shadow-elegant animate-fade-in-up animate-shimmer bg-gradient-to-r from-muted via-muted/50 to-muted bg-[length:1000px_100%]">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-64" />
          </div>
          <div className="flex space-x-2">
            <Skeleton className="h-9 w-20" />
            <Skeleton className="h-9 w-20" />
          </div>
        </div>
        <Skeleton className="h-10 w-72 mt-4" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex space-x-4 py-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-4 flex-1" />
            ))}
          </div>
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex space-x-4 py-3">
              {Array.from({ length: 6 }).map((_, j) => (
                <Skeleton key={j} className="h-4 flex-1" />
              ))}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}