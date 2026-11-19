import { FiUsers } from "react-icons/fi";

const columns = ["Name", "Email", "Role"];

export default function AdminUsersPage() {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 p-4 sm:p-6 lg:p-8">
      <div>
        <p className="text-[10px] font-semibold tracking-[0.18em] text-[#9A5269]">
          ADMIN
        </p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight text-[#292329] sm:text-3xl">
          Manage Users
        </h1>
        <p className="mt-1 text-sm text-[#817780]">
          All registered WedPlan accounts will appear here.
        </p>
      </div>

      <div className="overflow-hidden rounded-xl border border-[#EDE2E5] bg-white shadow-[0_2px_12px_rgba(75,35,48,0.04)]">
        <div className="hidden grid-cols-3 gap-4 border-b border-[#F0E7E8] bg-[#FFFCF9] px-5 py-3 text-[10px] font-semibold uppercase tracking-wide text-[#91858C] sm:grid">
          {columns.map((column) => (
            <span key={column}>{column}</span>
          ))}
        </div>

        <div className="px-5 py-12 text-center">
          <div className="mx-auto flex size-12 items-center justify-center rounded-xl bg-[#F8EFF0] text-[#772D43]">
            <FiUsers className="size-5" />
          </div>
          <h2 className="mt-4 text-sm font-semibold text-[#292329]">
            No users to show yet
          </h2>
          <p className="mx-auto mt-1 max-w-sm text-xs leading-5 text-[#817780]">
            New customer and vendor accounts will be listed here after they sign
            up.
          </p>
        </div>
      </div>
    </div>
  );
}
