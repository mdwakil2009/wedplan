
export default function BookingRequestsSkeleton() {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 p-4 sm:p-6 lg:p-8 animate-pulse">
      {/* Header */}
      <div className="space-y-2">
        <div className="h-3 w-32 rounded bg-[#E7EBF5]" />
        <div className="h-7 w-52 rounded-lg bg-[#E7EBF5]" />
        <div className="h-3 w-72 max-w-full rounded bg-[#E7EBF5]" />
      </div>

      {/* Booking Cards */}
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-2xl border border-[#E7EBF5] bg-white p-5 shadow-sm sm:p-6"
        >
          {/* Card Header */}
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="h-3 w-28 rounded bg-[#E7EBF5]" />
              <div className="h-5 w-40 rounded bg-[#E7EBF5]" />
            </div>
            <div className="h-7 w-20 rounded-full bg-[#EEF1F8]" />
          </div>

          {/* Service */}
          <div className="mt-5 flex flex-col gap-3 rounded-2xl border border-[#EDF0F8] bg-[#F9FAFF] p-3 sm:flex-row">
            <div className="h-40 w-full shrink-0 rounded-xl bg-[#EEF1F8] sm:h-28 sm:w-36" />
            <div className="flex-1 space-y-3 py-2">
              <div className="h-3 w-24 rounded bg-[#E7EBF5]" />
              <div className="h-5 w-48 max-w-full rounded bg-[#E7EBF5]" />
              <div className="h-3 w-28 rounded bg-[#E7EBF5]" />
              <div className="h-4 w-20 rounded bg-[#E7EBF5]" />
              <div className="h-3 w-40 rounded bg-[#E7EBF5]" />
            </div>
          </div>

          {/* Customer */}
          <div className="mt-4 flex items-center gap-3 rounded-xl border border-[#EDF0F8] p-3">
            <div className="size-11 rounded-full bg-[#E7EBF5]" />
            <div className="flex-1 space-y-2">
              <div className="h-3 w-32 rounded bg-[#E7EBF5]" />
              <div className="h-3 w-44 max-w-full rounded bg-[#E7EBF5]" />
            </div>
          </div>

          {/* Booking Details */}
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="flex items-center gap-3 rounded-xl border border-[#EDF0F8] p-3"
              >
                <div className="size-9 shrink-0 rounded-lg bg-[#EEF1F8]" />
                <div className="flex-1 space-y-2">
                  <div className="h-2.5 w-20 rounded bg-[#E7EBF5]" />
                  <div className="h-3 w-28 max-w-full rounded bg-[#E7EBF5]" />
                </div>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="mt-4 flex gap-3 border-t border-[#EDF0F8] pt-4">
            <div className="h-10 flex-1 rounded-xl bg-[#EEF1F8]" />
            <div className="h-10 flex-1 rounded-xl bg-[#EEF1F8]" />
          </div>
        </div>
      ))}
    </div>
  );
}
