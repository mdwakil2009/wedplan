
export default function MyServicesSkeleton() {
  return (
    <div className="min-h-full px-4 py-5 sm:px-6 sm:py-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-5 animate-pulse">
        {/* Header */}
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="h-3 w-28 rounded bg-[#E7EBF5]" />
            <div className="h-7 w-40 rounded-lg bg-[#E7EBF5]" />
            <div className="h-3 w-64 max-w-full rounded bg-[#E7EBF5]" />
          </div>
          <div className="h-10 w-40 rounded-xl bg-[#E7EBF5]" />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="rounded-2xl border border-[#E7EBF5] bg-white p-4"
            >
              <div className="h-9 w-9 rounded-xl bg-[#EEF1F8]" />
              <div className="mt-4 h-3 w-24 rounded bg-[#E7EBF5]" />
              <div className="mt-2 h-7 w-12 rounded bg-[#E7EBF5]" />
            </div>
          ))}
        </div>

        {/* Search and Filters */}
        <div className="rounded-2xl border border-[#E7EBF5] bg-white p-4">
          <div className="flex flex-col gap-3 lg:flex-row lg:justify-between">
            <div className="h-11 w-full rounded-xl bg-[#F0F2F8] lg:max-w-md" />
            <div className="grid grid-cols-2 gap-2 sm:flex">
              <div className="h-11 w-full rounded-xl bg-[#F0F2F8] sm:w-36" />
              <div className="h-11 w-full rounded-xl bg-[#F0F2F8] sm:w-40" />
            </div>
          </div>
          <div className="mt-4 h-3 w-40 rounded bg-[#E7EBF5]" />
        </div>

        {/* Service Cards */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-2xl border border-[#E7EBF5] bg-white"
            >
              <div className="h-44 bg-[#EEF1F8]" />
              <div className="space-y-3 p-4">
                <div className="h-3 w-28 rounded bg-[#E7EBF5]" />
                <div className="h-5 w-3/4 rounded bg-[#E7EBF5]" />
                <div className="h-3 w-full rounded bg-[#E7EBF5]" />
                <div className="h-3 w-2/3 rounded bg-[#E7EBF5]" />
                <div className="h-10 w-full rounded-lg bg-[#F0F2F8]" />
                <div className="grid grid-cols-2 gap-2 border-t border-[#EDF0F8] pt-3">
                  <div className="h-9 rounded-lg bg-[#EEF1F8]" />
                  <div className="h-9 rounded-lg bg-[#EEF1F8]" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
