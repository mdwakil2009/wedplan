
export default function CustomerMyBookingsSkeleton() {
  return (
    <div className="mx-auto w-full max-w-6xl animate-pulse space-y-6 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="space-y-3">
        <div className="h-3 w-32 rounded bg-[#E7EBF5]" />
        <div className="h-7 w-44 rounded bg-[#E7EBF5]" />
        <div className="h-3 w-72 max-w-full rounded bg-[#EEF1F8]" />
      </div>

      {/* Booking Cards */}
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="space-y-4 rounded-2xl border border-[#E7EBF5] bg-white p-5"
          >
            {/* Header */}
            <div className="flex items-center justify-between gap-3">
              <div className="h-4 w-32 rounded bg-[#E7EBF5]" />
              <div className="h-6 w-20 rounded-full bg-[#EEF1F8]" />
            </div>

            {/* Service Information */}
            <div className="flex flex-col gap-4 rounded-2xl border border-[#EDF0F8] bg-[#F9FAFF] p-3 sm:flex-row">
              <div className="h-44 w-full shrink-0 rounded-xl bg-[#EEF1F8] sm:h-32 sm:w-44" />

              <div className="flex-1 space-y-3 py-1">
                <div className="h-3 w-28 rounded bg-[#E7EBF5]" />
                <div className="h-5 w-48 max-w-full rounded bg-[#E7EBF5]" />
                <div className="h-4 w-28 rounded bg-[#EEF1F8]" />

                <div className="flex items-start gap-3 border-t border-[#E7EBF5] pt-3">
                  <div className="size-8 rounded-full bg-[#E7EBF5]" />
                  <div className="space-y-2">
                    <div className="h-3 w-28 rounded bg-[#E7EBF5]" />
                    <div className="h-3 w-36 rounded bg-[#EEF1F8]" />
                  </div>
                </div>
              </div>
            </div>

            {/* Event Details */}
            <div className="grid gap-3 sm:grid-cols-2">
              {[1, 2].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-xl border border-[#EDF0F8] p-3"
                >
                  <div className="size-10 shrink-0 rounded-xl bg-[#EEF1F8]" />
                  <div className="space-y-2">
                    <div className="h-3 w-24 rounded bg-[#E7EBF5]" />
                    <div className="h-4 w-32 rounded bg-[#EEF1F8]" />
                  </div>
                </div>
              ))}
            </div>

            {/* Message */}
            <div className="flex gap-3 rounded-xl border border-[#EDF0F8] bg-[#F9FAFF] p-3">
              <div className="size-4 shrink-0 rounded bg-[#E7EBF5]" />
              <div className="flex-1 space-y-2">
                <div className="h-3 w-24 rounded bg-[#E7EBF5]" />
                <div className="h-3 w-full rounded bg-[#EEF1F8]" />
              </div>
            </div>

            {/* Request Date */}
            <div className="space-y-2 border-t border-[#EDF0F8] pt-3">
              <div className="h-3 w-36 rounded bg-[#E7EBF5]" />
              <div className="h-4 w-32 rounded bg-[#EEF1F8]" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
