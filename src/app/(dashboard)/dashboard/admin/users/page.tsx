import { FiUsers } from "react-icons/fi";

const columns = ["Name", "Email", "Role"];

export default function AdminUsersPage() {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 p-4 sm:p-6 lg:p-8">
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#378A88]">
          Admin
        </p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight text-[#193F5B] sm:text-3xl">
          Manage Users
        </h1>
        <p className="mt-1.5 text-sm text-[#87939E]">
          All registered WedPlan accounts will appear here.
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-[#E1E8ED] bg-white shadow-[0_1px_2px_rgba(25,63,91,0.04)]">
        <div className="flex items-center justify-between gap-3 border-b border-[#E1E8ED] px-5 py-4">
          <div>
            <h2 className="text-sm font-semibold text-[#193F5B]">
              All accounts
            </h2>
            <p className="mt-0.5 text-[11px] text-[#87939E]">
              Customers, vendors and admins.
            </p>
          </div>

          <span className="rounded-full bg-[#E4F3F1] px-2.5 py-1 text-[10px] font-semibold text-[#378A88]">
            0 total
          </span>
        </div>

        <div className="hidden grid-cols-3 gap-4 border-b border-[#E1E8ED] bg-[#F8FAFC] px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#87939E] sm:grid">
          {columns.map((column) => (
            <span key={column}>{column}</span>
          ))}
        </div>

        <div className="px-5 py-14 text-center">
          <div className="mx-auto flex size-12 items-center justify-center rounded-xl bg-[#E4F3F1] text-[#378A88]">
            <FiUsers className="size-5" />
          </div>
          <h2 className="mt-4 text-sm font-semibold text-[#193F5B]">
            No users to show yet
          </h2>
          <p className="mx-auto mt-1 max-w-sm text-xs leading-5 text-[#87939E]">
            New customer and vendor accounts will be listed here after they sign
            up.
          </p>
        </div>
      </div>
    </div>
  );
}
