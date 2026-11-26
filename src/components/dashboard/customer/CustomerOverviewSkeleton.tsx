
import PageHeader from "@/components/dashboard/ui/PageHeader";
import SectionCard from "@/components/dashboard/ui/SectionCard";

export default function CustomerOverviewSkeleton() {
  return (
    <div className="mx-auto w-full max-w-6xl animate-pulse space-y-6 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="space-y-3">
          <div className="h-3 w-36 rounded bg-[#E7EBF5]" />
          <div className="h-7 w-40 rounded bg-[#E7EBF5]" />
          <div className="h-3 w-72 max-w-full rounded bg-[#EEF1F8]" />
        </div>
        <div className="h-10 w-40 rounded-xl bg-[#E7EBF5]" />
      </div>

      {/* Statistics */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="rounded-2xl border border-[#E7EBF5] bg-white p-5"
          >
            <div className="flex items-center justify-between">
              <div className="h-3 w-28 rounded bg-[#EEF1F8]" />
              <div className="size-10 rounded-xl bg-[#EEF1F8]" />
            </div>
            <div className="mt-5 h-8 w-16 rounded bg-[#E7EBF5]" />
            <div className="mt-3 h-3 w-36 rounded bg-[#EEF1F8]" />
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid gap-5 lg:grid-cols-3">
        {/* Recent Bookings */}
        <div className="space-y-4 rounded-2xl border border-[#E7EBF5] bg-white p-5 lg:col-span-2">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="h-5 w-36 rounded bg-[#E7EBF5]" />
              <div className="h-3 w-44 rounded bg-[#EEF1F8]" />
            </div>
            <div className="h-4 w-16 rounded bg-[#EEF1F8]" />
          </div>

          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="flex flex-col gap-3 rounded-2xl border border-[#EDF0F8] bg-[#FCFDFF] p-3 sm:flex-row sm:items-center"
            >
              <div className="h-32 w-full rounded-xl bg-[#EEF1F8] sm:size-20 sm:shrink-0" />

              <div className="min-w-0 flex-1 space-y-3">
                <div className="h-4 w-40 rounded bg-[#E7EBF5]" />
                <div className="h-3 w-32 rounded bg-[#EEF1F8]" />
                <div className="flex flex-wrap gap-3">
                  <div className="h-3 w-24 rounded bg-[#EEF1F8]" />
                  <div className="h-3 w-28 rounded bg-[#EEF1F8]" />
                </div>
              </div>

              <div className="h-6 w-20 shrink-0 rounded-full bg-[#EEF1F8]" />
            </div>
          ))}
        </div>

        {/* Booking Status */}
        <div className="space-y-5 rounded-2xl border border-[#E7EBF5] bg-white p-5">
          <div className="space-y-2">
            <div className="h-5 w-32 rounded bg-[#E7EBF5]" />
            <div className="h-3 w-44 rounded bg-[#EEF1F8]" />
          </div>

          <div className="space-y-5 pt-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="space-y-2">
                <div className="h-3 w-20 rounded bg-[#EEF1F8]" />
                <div className="h-2.5 w-full rounded-full bg-[#EEF1F8]" />
              </div>
            ))}
          </div>

          <div className="space-y-3 rounded-xl border border-[#EDF0F8] bg-[#F9FAFF] p-4">
            <div className="h-3 w-24 rounded bg-[#E7EBF5]" />
            <div className="h-3 w-full rounded bg-[#EEF1F8]" />
            <div className="h-3 w-4/5 rounded bg-[#EEF1F8]" />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="space-y-4 rounded-2xl border border-[#E7EBF5] bg-white p-5">
        <div className="space-y-2">
          <div className="h-5 w-32 rounded bg-[#E7EBF5]" />
          <div className="h-3 w-64 max-w-full rounded bg-[#EEF1F8]" />
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="rounded-xl border border-[#EDF0F8] p-4"
            >
              <div className="size-10 rounded-xl bg-[#EEF1F8]" />
              <div className="mt-4 h-4 w-28 rounded bg-[#E7EBF5]" />
              <div className="mt-2 h-3 w-36 rounded bg-[#EEF1F8]" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
