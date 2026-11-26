
export default function AdminUsersSkeleton() {
  return (
    <div className="mx-auto w-full max-w-7xl animate-pulse space-y-6 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="h-3 w-28 rounded bg-[#E7EBF5]" />
        <div className="h-7 w-44 rounded bg-[#E7EBF5]" />
        <div className="h-3 w-72 max-w-full rounded bg-[#E7EBF5]" />
      </div>

      {/* Users Section */}
      <div className="rounded-2xl border border-[#E7EBF5] bg-white p-5 sm:p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="h-5 w-36 rounded bg-[#E7EBF5]" />
            <div className="h-3 w-48 rounded bg-[#E7EBF5]" />
          </div>
          <div className="h-8 w-20 rounded-xl bg-[#EEF1F8]" />
        </div>

        {/* Search */}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <div className="h-11 flex-1 rounded-xl bg-[#F0F2F8]" />
          <div className="h-11 w-full rounded-xl bg-[#F0F2F8] sm:w-44" />
        </div>

        {/* Table */}
        <div className="mt-5 overflow-hidden rounded-xl border border-[#EDF0F8]">
          <div className="flex gap-4 bg-[#F7F9FE] p-4">
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="h-3 flex-1 rounded bg-[#E7EBF5]" />
            ))}
          </div>

          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="flex items-center gap-4 border-t border-[#EDF0F8] p-4"
            >
              <div className="flex min-w-[150px] flex-[2] items-center gap-3">
                <div className="size-10 shrink-0 rounded-full bg-[#E7EBF5]" />
                <div className="flex-1 space-y-2">
                  <div className="h-3 w-24 rounded bg-[#E7EBF5]" />
                  <div className="h-3 w-32 rounded bg-[#EEF1F8]" />
                </div>
              </div>

              <div className="h-6 flex-1 rounded-full bg-[#EEF1F8]" />
              <div className="h-6 flex-1 rounded-full bg-[#EEF1F8]" />
              <div className="h-3 flex-1 rounded bg-[#E7EBF5]" />

              <div className="flex flex-1 justify-end gap-2">
                <div className="h-8 w-14 rounded-lg bg-[#EEF1F8]" />
                <div className="h-8 w-20 rounded-lg bg-[#EEF1F8]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
