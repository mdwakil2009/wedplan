import { FiCreditCard, FiShield } from "react-icons/fi";
import { getAdminTransactions } from "@/lib/action/api";

import PageHeader from "@/components/dashboard/ui/PageHeader";
import SectionCard from "@/components/dashboard/ui/SectionCard";
import StatusBadge from "@/components/dashboard/ui/StatusBadge";
import EmptyState from "@/components/dashboard/ui/EmptyState";
import { Suspense } from "react";
import AdminTransactionsSkeleton from "@/components/dashboard/admin/AdminTransactionsSkeleton";

type Transaction = {
  _id: string;
  vendorId: string;
  plan: string;
  amount: number;
  currency: string;
  status: string;
  stripeSessionId: string;
  createdAt: string;
  vendor?: {
    name?: string;
    email?: string;
  };
};

export default function AdminTransactionsPage() {
  return (
    <Suspense fallback={<AdminTransactionsSkeleton />}>
      <AdminTransactionsContent />
    </Suspense>
  );
}


 async function AdminTransactionsContent() {
  let transactions: Transaction[] = [];
  let error = false;

  try {
    transactions = await getAdminTransactions();
  } catch {
    error = true;
  }

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6 p-4 sm:p-6 lg:p-8">
      <PageHeader
        eyebrow="Admin Workspace"
        title="Transactions"
        description="Monitor and review all vendor subscription payments."
        action={
          <div className="flex w-fit items-center gap-2 rounded-xl border border-[#DCE6FF] bg-[#EEF4FF] px-4 py-2.5">
            <FiShield className="size-4 text-[#3A76EF]" />
            <span className="text-xs font-semibold text-[#3A76EF]">
              Read Only Records
            </span>
          </div>
        }
      />

      <SectionCard
        title="Payment history"
        description="All vendor subscription transactions."
        icon={FiCreditCard}
        action={
          <span className="w-fit rounded-xl bg-[#EEF4FF] px-3 py-2 text-xs font-bold text-[#3A76EF]">
            {transactions.length} Records
          </span>
        }
        bodyClassName=""
      >
        {/* Error State */}
        {error ? (
          <div className="px-5 py-16 text-center">
            <p className="text-sm font-semibold text-[#C93B3B]">
              Failed to load transactions.
            </p>
            <p className="mt-1 text-xs text-[#8A93A8]">
              Please try again later.
            </p>
          </div>
        ) : transactions.length === 0 ? (
          /* Empty State */
          <div className="p-5 sm:p-6">
            <EmptyState
              icon={FiCreditCard}
              title="No transactions yet"
              description="Vendor subscription payments will appear here once they are recorded."
            />
          </div>
        ) : (
          /* Transaction Table */
          <div className="overflow-x-auto">
            <table className="w-full min-w-[750px] text-left">
              <thead className="bg-[#F7F9FE]">
                <tr className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#8A93A8]">
                  <th className="px-6 py-4">Vendor Information</th>
                  <th className="px-6 py-4">Subscription Plan</th>
                  <th className="px-6 py-4">Payment Amount</th>
                  <th className="px-6 py-4">Payment Status</th>
                  <th className="px-6 py-4">Transaction Date</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[#EDF0F8]">
                {transactions.map((item) => {
                  const paid = item.status?.toLowerCase() === "paid";

                  return (
                    <tr
                      key={item._id}
                      className="transition-colors duration-200 hover:bg-[#F9FAFF]"
                    >
                      {/* Vendor Information */}
                      <td className="px-6 py-5">
                        <p className="text-sm font-semibold text-[#252B45]">
                          {item.vendor?.name || "Unknown Vendor"}
                        </p>

                        <p className="mt-1 text-xs text-[#8A93A8]">
                          {item.vendor?.email || "No email"}
                        </p>
                      </td>

                      {/* Subscription Plan */}
                      <td className="px-6 py-5">
                        <span className="inline-flex rounded-lg bg-[#F4F6FB] px-3 py-1.5 text-xs font-semibold capitalize text-[#252B45]">
                          {item.plan}
                        </span>
                      </td>

                      {/* Payment Amount */}
                      <td className="px-6 py-5">
                        <p className="text-sm font-bold text-[#252B45]">
                          {item.amount} {item.currency?.toUpperCase()}
                        </p>
                      </td>

                      {/* Payment Status */}
                      <td className="px-6 py-5">
                        <StatusBadge
                          status={paid ? "paid" : item.status || "pending"}
                        />
                      </td>

                      {/* Transaction Date */}
                      <td className="whitespace-nowrap px-6 py-5 text-xs font-medium text-[#5B6478]">
                        {new Date(item.createdAt).toLocaleDateString(
                          "en-GB",
                          {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          }
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Footer */}
        {!error && transactions.length > 0 && (
          <div className="border-t border-[#EDF0F8] bg-[#F9FAFF] px-5 py-3.5 sm:px-6">
            <p className="text-[11px] text-[#8A93A8]">
              Payment records are verified and managed automatically through
              Stripe.
            </p>
          </div>
        )}
      </SectionCard>
    </div>
  );
}
