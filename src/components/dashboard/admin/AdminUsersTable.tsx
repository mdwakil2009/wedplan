"use client";

import { useState } from "react";

import {
  FiSearch,
  FiUsers,
  FiEye,
  FiShield,
  FiShieldOff,
  FiChevronDown,
  FiCheck,
} from "react-icons/fi";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

import AdminUserDetailsDialog, {
  type AdminUser,
} from "@/components/dashboard/admin/AdminUserDetailsDialog";

import SectionCard from "@/components/dashboard/ui/SectionCard";
import StatusBadge from "@/components/dashboard/ui/StatusBadge";
import EmptyState from "@/components/dashboard/ui/EmptyState";

import { updateUserStatus } from "@/lib/action/api";

const roles = [
  { label: "All Roles", value: "all" },
  { label: "Admin", value: "admin" },
  { label: "Vendor", value: "vendor" },
  { label: "Customer", value: "customer" },
];

const roleStyles: Record<string, string> = {
  admin: "border-[#CFDDFB] bg-[#EEF4FF] text-[#2F63D4]",
  vendor: "border-[#E4D3F4] bg-[#F4EDFB] text-[#8B4FC1]",
  customer: "border-[#C9F0E1] bg-[#E9FBF4] text-[#0E8A66]",
};

export default function AdminUsersTable({
  users,
}: {
  users: AdminUser[];
}) {
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("all");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);
  const [loadingUserId, setLoadingUserId] = useState<string | null>(null);

  // Store users in local state
  const [userList, setUserList] = useState<AdminUser[]>(users);

  // Block / Unblock User
  const handleBlockUser = async (user: AdminUser) => {
    try {
      setLoadingUserId(user._id);

      const newStatus = !user.isBlocked;

      await updateUserStatus(user._id, newStatus);

      // Update only the selected user's status
      setUserList((previousUsers) =>
        previousUsers.map((item) =>
          item._id === user._id
            ? { ...item, isBlocked: newStatus }
            : item
        )
      );

      // Update selected user details if dialog is open
      setSelectedUser((previousUser) =>
        previousUser?._id === user._id
          ? { ...previousUser, isBlocked: newStatus }
          : previousUser
      );
    } catch (error) {
      console.error(error);
      alert("Failed to update user status");
    } finally {
      setLoadingUserId(null);
    }
  };

  const selectedRole = roles.find(
    (item) => item.value === role
  );

  // Search and Filter
  const filteredUsers = userList.filter((user) => {
    const searchValue = search.toLowerCase();

    const matchesSearch =
      user.name?.toLowerCase().includes(searchValue) ||
      user.email.toLowerCase().includes(searchValue);

    const matchesRole =
      role === "all" || user.role === role;

    return matchesSearch && matchesRole;
  });

  return (
    <>
      <SectionCard
        title="Registered users"
        description="Manage your platform community"
        icon={FiUsers}
        action={
          <span className="rounded-xl bg-[#EEF4FF] px-3 py-2 text-xs font-bold text-[#3A76EF]">
            {filteredUsers.length} Users
          </span>
        }
        bodyClassName="p-5 sm:p-6"
      >
        {/* Search & Filter */}
        <div className="flex flex-col gap-3 sm:flex-row">
          {/* Search */}
          <div className="relative flex-1">
            <FiSearch className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-[#8A93A8]" />

            <input
              type="text"
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-11 w-full rounded-xl border border-[#E7EBF5] bg-[#F9FAFF] pl-10 pr-4 text-sm text-[#252B45] outline-none transition-all duration-200 placeholder:text-[#A0A8BC] hover:border-[#C9D9FF] focus:border-[#3A76EF] focus:bg-white focus:ring-4 focus:ring-[#3A76EF]/10"
            />
          </div>

          {/* Role Filter */}
          <div className="relative w-full sm:w-44">
            <button
              type="button"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex h-11 w-full items-center justify-between rounded-xl border border-[#E7EBF5] bg-white px-4 text-sm font-medium text-[#252B45] outline-none transition-all duration-200 hover:border-[#C9D9FF] focus:border-[#3A76EF] focus:ring-4 focus:ring-[#3A76EF]/10"
            >
              {selectedRole?.label}

              <FiChevronDown
                className={`size-4 text-[#8A93A8] transition-transform duration-200 ${
                  dropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Dropdown Options */}
            {dropdownOpen && (
              <div className="absolute right-0 top-12 z-50 w-full overflow-hidden rounded-xl border border-[#E7EBF5] bg-white p-1.5 shadow-[0_18px_40px_-18px_rgba(37,43,69,0.3)]">
                {roles.map((item) => (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => {
                      setRole(item.value);
                      setDropdownOpen(false);
                    }}
                    className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm transition-colors duration-200 ${
                      role === item.value
                        ? "bg-[#3A76EF] text-white"
                        : "text-[#252B45] hover:bg-[#EEF4FF] hover:text-[#3A76EF]"
                    }`}
                  >
                    {item.label}

                    {role === item.value && (
                      <FiCheck className="size-4" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Users Table */}
        <div className="mt-5 overflow-x-auto rounded-xl border border-[#EDF0F8]">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#F7F9FE] text-[10px] font-bold uppercase tracking-[0.1em] text-[#8A93A8]">
              <tr>
                <th className="px-4 py-4">User</th>
                <th className="px-4 py-4">Role</th>
                <th className="px-4 py-4">Status</th>
                <th className="px-4 py-4">Joined</th>
                <th className="px-4 py-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#EDF0F8]">
              {filteredUsers.map((user) => (
                <tr
                  key={user._id}
                  className="transition-colors duration-200 hover:bg-[#F9FAFF]"
                >
                  {/* User */}
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="size-10 border border-[#E7EBF5]">
                        <AvatarImage src={user.image} />

                        <AvatarFallback className="bg-[#EEF4FF] font-bold text-[#3A76EF]">
                          {user.name?.slice(0, 2).toUpperCase() || "U"}
                        </AvatarFallback>
                      </Avatar>

                      <div className="min-w-0">
                        <p className="truncate font-semibold text-[#252B45]">
                          {user.name || "Unknown User"}
                        </p>

                        <p className="truncate text-xs text-[#8A93A8]">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Role */}
                  <td className="px-4 py-4">
                    <span
                      className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold capitalize ${
                        roleStyles[user.role] ??
                        "border-[#E3E7F1] bg-[#F4F6FB] text-[#5B6478]"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="px-4 py-4">
                    <StatusBadge
                      status={user.isBlocked ? "blocked" : "active"}
                      label={user.isBlocked ? "Blocked" : "Active"}
                    />
                  </td>

                  {/* Joined */}
                  <td className="px-4 py-4 text-xs text-[#5B6478]">
                    {user.createdAt
                      ? new Date(user.createdAt).toLocaleDateString()
                      : "N/A"}
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-4">
                    <div className="flex justify-end gap-2">
                      {/* View User */}
                      <button
                        type="button"
                        title="View User"
                        onClick={() => setSelectedUser(user)}
                        className="flex items-center gap-2 rounded-lg border border-[#DCE6FF] bg-[#EEF4FF] px-3 py-2 text-xs font-semibold text-[#3A76EF] transition-all duration-200 hover:border-[#3A76EF] hover:bg-[#3A76EF] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3A76EF]/35"
                      >
                        <FiEye className="size-3.5" />
                        <span>View</span>
                      </button>

                      {/* Block User */}
                      {user.role !== "admin" && !user.isBlocked && (
                        <button
                          type="button"
                          title="Block User"
                          onClick={() => handleBlockUser(user)}
                          disabled={loadingUserId === user._id}
                          className="flex items-center gap-2 rounded-lg border border-[#F8CACA] bg-[#FEF0F0] px-3 py-2 text-xs font-semibold text-[#C93B3B] transition-all duration-200 hover:border-[#C93B3B] hover:bg-[#C93B3B] hover:text-white disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C93B3B]/30"
                        >
                          <FiShield className="size-3.5" />

                          <span>
                            {loadingUserId === user._id
                              ? "Updating..."
                              : "Block"}
                          </span>
                        </button>
                      )}

                      {/* Unblock User */}
                      {user.role !== "admin" && user.isBlocked && (
                        <button
                          type="button"
                          title="Unblock User"
                          onClick={() => handleBlockUser(user)}
                          disabled={loadingUserId === user._id}
                          className="flex items-center gap-2 rounded-lg border border-[#BFEFDD] bg-[#E9FBF4] px-3 py-2 text-xs font-semibold text-[#0E8A66] transition-all duration-200 hover:border-[#0E8A66] hover:bg-[#0E8A66] hover:text-white disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0E8A66]/30"
                        >
                          <FiShieldOff className="size-3.5" />

                          <span>
                            {loadingUserId === user._id
                              ? "Updating..."
                              : "Unblock"}
                          </span>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredUsers.length === 0 && (
          <div className="mt-5">
            <EmptyState
              icon={FiUsers}
              title="No users found"
              description="Try changing your search or filter."
            />
          </div>
        )}
      </SectionCard>

      {/* User Details Dialog */}
      <AdminUserDetailsDialog
        user={selectedUser}
        open={!!selectedUser}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedUser(null);
          }
        }}
      />
    </>
  );
}
