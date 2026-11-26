
export default function AdminOverviewSkeleton() {
  return (
    <div className="mx-auto w-full max-w-7xl animate-pulse space-y-6 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="h-3 w-28 rounded bg-[#E7EBF5]" />
          <div className="h-7 w-52 rounded bg-[#E7EBF5]" />
          <div className="h-3 w-72 max-w-full rounded bg-[#E7EBF5]" />
        </div>
        <div className="h-10 w-36 rounded-xl bg-[#E7EBF5]" />
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="rounded-2xl border border-[#E7EBF5] bg-white p-5"
          >
            <div className="size-10 rounded-xl bg-[#EEF1F8]" />
            <div className="mt-4 h-3 w-28 rounded bg-[#E7EBF5]" />
            <div className="mt-2 h-7 w-16 rounded bg-[#E7EBF5]" />
            <div className="mt-2 h-3 w-40 rounded bg-[#E7EBF5]" />
          </div>
        ))}
      </div>

      {/* Activity and Quick Actions */}
      <div className="grid gap-5 lg:grid-cols-3">
        <div className="space-y-6 rounded-2xl border border-[#E7EBF5] bg-white p-5 lg:col-span-2">
          <div className="h-5 w-40 rounded bg-[#E7EBF5]" />
          <div className="grid gap-6 sm:grid-cols-2">
            {[0, 1].map((item) => (
              <div key={item} className="space-y-4">
                <div className="h-3 w-28 rounded bg-[#E7EBF5]" />
                {[0, 1, 2].map((bar) => (
                  <div key={bar} className="space-y-2">
                    <div className="h-3 w-20 rounded bg-[#E7EBF5]" />
                    <div className="h-3 w-full rounded-full bg-[#EEF1F8]" />
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className="grid gap-3 border-t border-[#EDF0F8] pt-5 sm:grid-cols-3">
            {[0, 1, 2].map((item) => (
              <div key={item} className="rounded-xl bg-[#F9FAFF] p-4">
                <div className="h-3 w-20 rounded bg-[#E7EBF5]" />
                <div className="mt-3 h-6 w-12 rounded bg-[#E7EBF5]" />
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-5 rounded-2xl border border-[#E7EBF5] bg-white p-5">
          <div className="h-5 w-32 rounded bg-[#E7EBF5]" />
          {[0, 1, 2].map((item) => (
            <div key={item} className="flex gap-3 rounded-xl border border-[#EDF0F8] p-4">
              <div className="size-10 shrink-0 rounded-xl bg-[#EEF1F8]" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-28 rounded bg-[#E7EBF5]" />
                <div className="h-3 w-full rounded bg-[#E7EBF5]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
