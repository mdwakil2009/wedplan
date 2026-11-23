
import { FiCreditCard, FiShield, } from "react-icons/fi";
import { getAdminTransactions } from "@/lib/action/api";

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

export default async function AdminTransactionsPage() {
  let transactions: Transaction[] = [];
  let error = false;

  try {
    transactions = await getAdminTransactions();
  } catch {
    error = true;
  }

  return (
    <div className="mx-auto w-full max-w-7xl space-y-7 p-4 sm:p-6 lg:p-8">

      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#378A88]">
            Admin Dashboard
          </p>

          <h1 className="mt-2 text-2xl font-bold tracking-tight text-[#193F5B] sm:text-3xl">
            Transactions
          </h1>

          <p className="mt-2 text-sm text-[#87939E]">
            Monitor and review all vendor subscription payments.
          </p>
        </div>

        <div className="flex w-fit items-center gap-2 rounded-xl border border-[#DCECE9] bg-[#F0F8F6] px-4 py-2.5">
          <FiShield className="text-lg text-[#378A88]" />
          <span className="text-xs font-semibold text-[#378A88]">
            Read Only Records
          </span>
        </div>
      </div>

      {/* Transaction Card */}
      <div className="overflow-hidden rounded-2xl border border-[#E1E8ED] bg-white shadow-sm">

        {/* Card Header */}
        <div className="flex flex-col justify-between gap-3 border-b border-[#E1E8ED] px-5 py-5 sm:flex-row sm:items-center sm:px-6">
          <div>
            <h2 className="text-base font-bold text-[#193F5B]">
              Payment History
            </h2>
            <p className="mt-1 text-xs text-[#87939E]">
              All vendor subscription transactions.
            </p>
          </div>

          <span className="w-fit rounded-lg bg-[#E4F3F1] px-3 py-2 text-xs font-bold text-[#378A88]">
            {transactions.length} Records
          </span>
        </div>

        {/* Error State */}
        {error ? (
          <div className="px-5 py-16 text-center">
            <p className="text-sm font-medium text-red-500">
              Failed to load transactions.
            </p>
            <p className="mt-1 text-xs text-[#87939E]">
              Please try again later.
            </p>
          </div>

        ) : transactions.length === 0 ? (

          /* Empty State */
          <div className="px-5 py-16 text-center">
            <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-[#E4F3F1]">
              <FiCreditCard className="text-2xl text-[#378A88]" />
            </div>

            <h2 className="mt-4 text-base font-bold text-[#193F5B]">
              No Transactions Yet
            </h2>

            <p className="mt-1 text-sm text-[#87939E]">
              Vendor payments will appear here.
            </p>
          </div>

        ) : (

          /* Transaction Table */
          <div className="overflow-x-auto">
            <table className="w-full min-w-[750px] text-left">

              <thead className="bg-[#F8FAFC]">
                <tr className="text-[10px] font-bold uppercase tracking-wider text-[#87939E]">
                  <th className="px-6 py-4">Vendor Information</th>
                  <th className="px-6 py-4">Subscription Plan</th>
                  <th className="px-6 py-4">Payment Amount</th>
                  <th className="px-6 py-4">Payment Status</th>
                  <th className="px-6 py-4">Transaction Date</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[#E1E8ED]">
                {transactions.map((item) => {
                  const paid = item.status?.toLowerCase() === "paid";

                  return (
                    <tr
                      key={item._id}
                      className="transition-colors hover:bg-[#F8FAFC]"
                    >
                      {/* Vendor Information */}
                      <td className="px-6 py-5">
                        <p className="text-sm font-semibold text-[#193F5B]">
                          {item.vendor?.name || "Unknown Vendor"}
                        </p>

                        <p className="mt-1 text-xs text-[#87939E]">
                          {item.vendor?.email || "No email"}
                        </p>
                      </td>

                      {/* Subscription Plan */}
                      <td className="px-6 py-5">
                        <span className="inline-flex rounded-lg bg-[#F0F5FA] px-3 py-1.5 text-xs font-semibold capitalize text-[#193F5B]">
                          {item.plan}
                        </span>
                      </td>

                      {/* Payment Amount */}
                      <td className="px-6 py-5">
                        <p className="text-sm font-bold text-[#193F5B]">
                          {item.amount} {item.currency?.toUpperCase()}
                        </p>
                      </td>

                      {/* Payment Status */}
                      <td className="px-6 py-5">
                        <span
                          className={`inline-flex rounded-full px-3 py-1.5 text-[11px] font-bold capitalize ${
                            paid
                              ? "bg-[#E4F3F1] text-[#378A88]"
                              : "bg-[#FFF1E8] text-[#D97706]"
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>

                      {/* Transaction Date */}
                      <td className="whitespace-nowrap px-6 py-5 text-xs font-medium text-[#64748B]">
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
          <div className="border-t border-[#E1E8ED] bg-[#F8FAFC] px-5 py-3.5 sm:px-6">
            <p className="text-[11px] text-[#87939E]">
              Payment records are verified and managed automatically through Stripe.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
