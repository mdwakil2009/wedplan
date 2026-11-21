export default function ServicesSkeleton() {
  return (
    <div>
      <div className="rounded-3xl border border-[#F0E1E4] bg-white p-4 shadow-[0_24px_60px_rgba(87,36,51,0.09)] sm:p-6">
        <div className="flex items-center gap-3 border-b border-[#F6ECEE] pb-4">
          <div className="size-10 animate-pulse rounded-xl bg-[#FBF1F2]" />
          <div className="space-y-2">
            <div className="h-4 w-40 animate-pulse rounded bg-[#F3E4E6]" />
            <div className="h-3 w-52 animate-pulse rounded bg-[#F8EFF0]" />
          </div>
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[0, 1, 2, 3].map((item) => (
            <div key={item} className="space-y-2">
              <div className="h-3 w-16 animate-pulse rounded bg-[#F5E9EA]" />
              <div className="h-11 w-full animate-pulse rounded-xl bg-[#F8EFF0]" />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-7 flex items-end justify-between">
        <div className="space-y-2">
          <div className="h-3 w-24 animate-pulse rounded bg-[#F3E4E6]" />
          <div className="h-7 w-44 animate-pulse rounded bg-[#F5E9EA]" />
        </div>
        <div className="h-3 w-28 animate-pulse rounded bg-[#F5E9EA]" />
      </div>

      <div className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[0, 1, 2, 3, 4, 5].map((item) => (
          <div
            key={item}
            className="overflow-hidden rounded-2xl border border-[#F0E1E4] bg-white"
          >
            <div className="aspect-[4/3] animate-pulse bg-[#F5E9EA]" />

            <div className="space-y-3 p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="h-5 w-2/3 animate-pulse rounded bg-[#F3E4E6]" />
                <div className="h-5 w-16 animate-pulse rounded bg-[#F3E4E6]" />
              </div>
              <div className="h-3.5 w-full animate-pulse rounded bg-[#F8EFF0]" />
              <div className="h-3.5 w-4/5 animate-pulse rounded bg-[#F8EFF0]" />
              <div className="h-3.5 w-1/2 animate-pulse rounded bg-[#F8EFF0]" />
              <div className="flex items-center justify-between gap-3 border-t border-[#F6ECEE] pt-4">
                <div className="h-3 w-24 animate-pulse rounded bg-[#F8EFF0]" />
                <div className="h-8 w-28 animate-pulse rounded-full bg-[#F3E4E6]" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
