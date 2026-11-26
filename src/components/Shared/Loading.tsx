
import { Loader2 } from "lucide-react";

// Reusable skeleton component
export function Skeleton({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div
      className={`animate-pulse rounded-md bg-[#EDE7E3] ${className}`}
    />
  );
}

// Full page loader
export function PageLoader({
  text = "Loading...",
}: {
  text?: string;
}) {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-3">
      <Loader2 className="size-8 animate-spin text-[#B77B65]" />

      <p className="text-sm font-medium text-[#85766F]">
        {text}
      </p>
    </div>
  );
}

// Service card skeleton
export function ServiceCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl border border-[#E9E0D5] bg-white">
      <Skeleton className="h-48 w-full rounded-none" />

      <div className="space-y-3 p-4">
        <Skeleton className="h-4 w-3/4" />

        <Skeleton className="h-3 w-1/2" />

        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-8 w-24 rounded-lg" />
        </div>
      </div>
    </div>
  );
}

// Dashboard statistics skeleton
export function StatsCardSkeleton() {
  return (
    <div className="rounded-xl border border-[#E9E0D5] bg-white p-5">
      <Skeleton className="h-4 w-28" />

      <Skeleton className="mt-4 h-8 w-20" />

      <Skeleton className="mt-3 h-3 w-32" />
    </div>
  );
}
