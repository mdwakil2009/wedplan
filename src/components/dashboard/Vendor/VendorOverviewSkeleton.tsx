
function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-lg bg-[#EDF0F8] ${className}`}
    />
  );
}

export default function Loading() {
  return (
    <div className="mx-auto w-full max-w-7xl space-y-6 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="space-y-3">
          <Skeleton className="h-3 w-28" />
          <Skeleton className="h-8 w-56" />
          <Skeleton className="h-4 w-72 max-w-full" />
        </div>

        <Skeleton className="h-10 w-40 rounded-xl" />
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="rounded-2xl border border-[#EDF0F8] bg-white p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="size-10 rounded-xl" />
            </div>

            <Skeleton className="mt-5 h-8 w-20" />
            <Skeleton className="mt-3 h-3 w-36" />
          </div>
        ))}
      </div>

      {/* Dashboard Content */}
      <div className="grid gap-5 lg:grid-cols-3">
        {/* Service Status */}
        <div className="rounded-2xl border border-[#EDF0F8] bg-white p-5">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="mt-2 h-3 w-52" />

          <div className="mt-8 flex h-36 items-end justify-around gap-4">
            <Skeleton className="h-20 w-12 rounded-t-lg" />
            <Skeleton className="h-32 w-12 rounded-t-lg" />
            <Skeleton className="h-16 w-12 rounded-t-lg" />
          </div>

          <div className="mt-6 space-y-3">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <Skeleton className="size-3 rounded-full" />
                <Skeleton className="h-3 w-20" />
                <Skeleton className="ml-auto h-3 w-8" />
              </div>
            ))}
          </div>

          <Skeleton className="mt-6 h-20 w-full rounded-xl" />
        </div>

        {/* Quick Actions */}
        <div className="rounded-2xl border border-[#EDF0F8] bg-white p-5 lg:col-span-2">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="mt-2 h-3 w-64 max-w-full" />

          <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="rounded-xl border border-[#EDF0F8] p-4"
              >
                <Skeleton className="size-10 rounded-xl" />
                <Skeleton className="mt-4 h-4 w-28" />
                <Skeleton className="mt-2 h-3 w-full" />
                <Skeleton className="mt-2 h-3 w-3/4" />
              </div>
            ))}
          </div>

          <Skeleton className="mt-4 h-20 w-full rounded-xl" />
        </div>
      </div>

      {/* Recent Services */}
      <div className="rounded-2xl border border-[#EDF0F8] bg-white p-5">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <Skeleton className="h-5 w-36" />
            <Skeleton className="h-3 w-56" />
          </div>
          <Skeleton className="h-4 w-16" />
        </div>

        <div className="mt-6 space-y-3">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="flex flex-col gap-3 rounded-xl border border-[#EDF0F8] p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-center gap-3">
                <Skeleton className="size-10 rounded-xl" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-36" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-6 w-20 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
