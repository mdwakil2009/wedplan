import { FiCreditCard } from "react-icons/fi";

const columns = ["Transaction", "Vendor", "Amount", "Status"];

export default function AdminTransactionsPage() {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 p-4 sm:p-6 lg:p-8">
      <div>
        <p className="text-[10px] font-semibold tracking-[0.18em] text-[#9A5269]">
          ADMIN
        </p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight text-[#292329] sm:text-3xl">
          Transactions
        </h1>
        <p className="mt-1 text-sm text-[#817780]">
          Payments and subscription transactions will be listed here.
        </p>
      </div>

      <div className="overflow-hidden rounded-xl border border-[#EDE2E5] bg-white shadow-[0_2px_12px_rgba(75,35,48,0.04)]">
        <div className="hidden grid-cols-4 gap-4 border-b border-[#F0E7E8] bg-[#FFFCF9] px-5 py-3 text-[10px] font-semibold uppercase tracking-wide text-[#91858C] sm:grid">
          {columns.map((column) => (
            <span key={column}>{column}</span>
          ))}
        </div>

        <div className="px-5 py-12 text-center">
          <div className="mx-auto flex size-12 items-center justify-center rounded-xl bg-[#F8EFF0] text-[#772D43]">
            <FiCreditCard className="size-5" />
          </div>
          <h2 className="mt-4 text-sm font-semibold text-[#292329]">
            No transactions yet
          </h2>
          <p className="mx-auto mt-1 max-w-sm text-xs leading-5 text-[#817780]">
            Vendor subscription payments will appear here.
          </p>
        </div>
      </div>
    </div>
  );
}
