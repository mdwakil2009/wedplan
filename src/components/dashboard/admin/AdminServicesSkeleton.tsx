
export default function AdminServicesSkeleton() {
  return (
    <div className="mx-auto w-full max-w-7xl animate-pulse space-y-6 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="h-3 w-28 rounded bg-[#E7EBF5]" />
        <div className="h-7 w-48 rounded bg-[#E7EBF5]" />
        <div className="h-3 w-72 max-w-full rounded bg-[#E7EBF5]" />
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col gap-3 rounded-2xl border border-[#E7EBF5] bg-white p-4 sm:flex-row">
        <div className="h-11 flex-1 rounded-xl bg-[#F0F2F8]" />
        <div className="h-11 w-full rounded-xl bg-[#F0F2F8] sm:w-52" />
        <div className="h-11 w-full rounded-xl bg-[#F0F2F8] sm:w-52" />
      </div>

      <div className="h-3 w-40 rounded bg-[#E7EBF5]" />

      {/* Service Cards */}
      <div className="space-y-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="flex flex-col gap-5 rounded-2xl border border-[#E7EBF5] bg-white p-4 sm:p-5 lg:flex-row lg:items-center"
          >
            {/* Image */}
            <div className="h-48 w-full shrink-0 rounded-xl bg-[#EEF1F8] sm:h-40 sm:w-48 lg:h-36 lg:w-44" />

            {/* Information */}
            <div className="min-w-0 flex-1 space-y-4">
              <div className="flex gap-3">
                <div className="h-5 w-40 rounded bg-[#E7EBF5]" />
                <div className="h-6 w-20 rounded-full bg-[#EEF1F8]" />
              </div>

              <div className="h-3 w-64 max-w-full rounded bg-[#E7EBF5]" />
              <div className="h-3 w-52 max-w-full rounded bg-[#EEF1F8]" />
              <div className="h-3 w-full rounded bg-[#EEF1F8]" />
              <div className="h-3 w-3/4 rounded bg-[#EEF1F8]" />
            </div>

            {/* Actions */}
            <div className="flex w-full shrink-0 flex-col gap-2 lg:w-[210px]">
              <div className="grid grid-cols-2 gap-2">
                <div className="h-10 rounded-xl bg-[#EEF1F8]" />
                <div className="h-10 rounded-xl bg-[#F7EDEE]" />
              </div>
              <div className="h-10 rounded-xl bg-[#F7EDEE]" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
