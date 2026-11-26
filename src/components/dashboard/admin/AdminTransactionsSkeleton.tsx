
import PageHeader from "@/components/dashboard/ui/PageHeader";
import SectionCard from "@/components/dashboard/ui/SectionCard";
import { FiCreditCard } from "react-icons/fi";

export default function AdminTransactionsSkeleton() {
  return (
    <div className="mx-auto w-full max-w-7xl animate-pulse space-y-6 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="space-y-3">
          <div className="h-3 w-28 rounded bg-[#E7EBF5]" />
          <div className="h-7 w-44 rounded bg-[#E7EBF5]" />
          <div className="h-3 w-72 max-w-full rounded bg-[#EEF1F8]" />
        </div>

        <div className="h-10 w-36 rounded-xl bg-[#EEF1F8]" />
      </div>

      {/* Payment History */}
      <SectionCard
        title="Payment history"
        description="All vendor subscription transactions."
        icon={FiCreditCard}
        action={
          <div className="h-8 w-24 rounded-xl bg-[#EEF1F8]" />
        }
      >
        <div className="overflow-x-auto">
          <table className="w-full min-w-[750px] text-left">
            <thead className="bg-[#F7F9FE]">
              <tr>
                {[
                  "Vendor Information",
                  "Subscription Plan",
                  "Payment Amount",
                  "Payment Status",
                  "Transaction Date",
                ].map((heading) => (
                  <th
                    key={heading}
                    className="px-6 py-4"
                  >
                    <div className="h-3 w-24 rounded bg-[#E7EBF5]" />
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-[#EDF0F8]">
              {Array.from({ length: 5 }).map((_, index) => (
                <tr key={index}>
                  {/* Vendor */}
                  <td className="px-6 py-5">
                    <div className="space-y-2">
                      <div className="h-4 w-32 rounded bg-[#E7EBF5]" />
                      <div className="h-3 w-40 rounded bg-[#EEF1F8]" />
                    </div>
                  </td>

                  {/* Plan */}
                  <td className="px-6 py-5">
                    <div className="h-7 w-20 rounded-lg bg-[#EEF1F8]" />
                  </td>

                  {/* Amount */}
                  <td className="px-6 py-5">
                    <div className="h-4 w-24 rounded bg-[#E7EBF5]" />
                  </td>

                  {/* Status */}
                  <td className="px-6 py-5">
                    <div className="h-6 w-20 rounded-full bg-[#EEF1F8]" />
                  </td>

                  {/* Date */}
                  <td className="px-6 py-5">
                    <div className="h-4 w-24 rounded bg-[#EEF1F8]" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="border-t border-[#EDF0F8] bg-[#F9FAFF] px-5 py-4">
          <div className="h-3 w-80 max-w-full rounded bg-[#EEF1F8]" />
        </div>
      </SectionCard>
    </div>
  );
}
