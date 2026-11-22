
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

import { Card, CardContent } from "@/components/ui/card";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

import AdminUserDetailsDialog, {
  type AdminUser,
} from "@/components/dashboard/admin/AdminUserDetailsDialog";

import { updateUserStatus } from "@/lib/action/api";

const roles = [
  { label: "All Roles", value: "all" },
  { label: "Admin", value: "admin" },
  { label: "Vendor", value: "vendor" },
  { label: "Customer", value: "customer" },
];

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
      <Card className="overflow-hidden rounded-2xl border-slate-200 shadow-sm">
        <CardContent className="space-y-5 p-5">

          {/* Header */}
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-bold text-[#193F5B]">
                Registered Users
              </h2>

              <p className="text-sm text-slate-500">
                Manage your platform community
              </p>
            </div>

            <div className="rounded-xl bg-[#EAF5F3] px-4 py-2 text-sm font-semibold text-[#378A88]">
              {filteredUsers.length} Users
            </div>
          </div>

          {/* Search & Filter */}
          <div className="flex flex-col gap-3 sm:flex-row">

            {/* Search */}
            <div className="relative flex-1">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />

              <input
                type="text"
                placeholder="Search by name or email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-sm text-[#193F5B] outline-none transition focus:border-[#378A88] focus:ring-2 focus:ring-[#378A88]/10"
              />
            </div>

            {/* Role Filter */}
            <div className="relative w-full sm:w-44">
              <button
                type="button"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex h-11 w-full items-center justify-between rounded-xl border border-slate-200 bg-white px-4 text-sm text-[#193F5B] outline-none transition hover:border-[#378A88] focus:border-[#378A88] focus:ring-2 focus:ring-[#378A88]/10"
              >
                {selectedRole?.label}

                <FiChevronDown
                  className={`transition-transform ${
                    dropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dropdown Options */}
              {dropdownOpen && (
                <div className="absolute right-0 top-12 z-50 w-full overflow-hidden rounded-xl border border-slate-200 bg-white p-1 shadow-lg">

                  {roles.map((item) => (
                    <button
                      key={item.value}
                      type="button"
                      onClick={() => {
                        setRole(item.value);
                        setDropdownOpen(false);
                      }}
                      className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm transition ${
                        role === item.value
                          ? "bg-[#378A88] text-white"
                          : "text-[#193F5B] hover:bg-[#EAF5F3] hover:text-[#378A88]"
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
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">

              <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="px-4 py-4">User</th>
                  <th className="px-4 py-4">Role</th>
                  <th className="px-4 py-4">Status</th>
                  <th className="px-4 py-4">Joined</th>
                  <th className="px-4 py-4 text-right">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">

                {filteredUsers.map((user) => (
                  <tr
                    key={user._id}
                    className="transition hover:bg-slate-50/80"
                  >

                    {/* User */}
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">

                        <Avatar className="size-10">
                          <AvatarImage src={user.image} />

                          <AvatarFallback className="bg-[#EAF5F3] font-semibold text-[#378A88]">
                            {user.name?.slice(0, 2).toUpperCase() || "U"}
                          </AvatarFallback>
                        </Avatar>

                        <div>
                          <p className="font-semibold text-slate-700">
                            {user.name || "Unknown User"}
                          </p>

                          <p className="text-xs text-slate-500">
                            {user.email}
                          </p>
                        </div>

                      </div>
                    </td>

                    {/* Role */}
                    <td className="px-4 py-4">
                      <span className="rounded-full bg-[#EAF5F3] px-3 py-1 text-xs font-semibold capitalize text-[#378A88]">
                        {user.role}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-4 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          user.isBlocked
                            ? "bg-red-50 text-red-600"
                            : "bg-emerald-50 text-emerald-600"
                        }`}
                      >
                        {user.isBlocked ? "Blocked" : "Active"}
                      </span>
                    </td>

                    {/* Joined */}
                    <td className="px-4 py-4 text-slate-500">
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
                          className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 transition hover:bg-[#EAF5F3] hover:text-[#378A88]"
                        >
                          <FiEye />
                          <span>View</span>
                        </button>

                        {/* Block User */}
                  {user.role !== "admin" && !user.isBlocked && (
                          <button
                            type="button"
                            title="Block User"
                            onClick={() => handleBlockUser(user)}
                            disabled={loadingUserId === user._id}
                            className="flex items-center gap-2 rounded-lg border border-red-200 px-3 py-2 text-xs font-medium text-red-500 transition hover:bg-red-50 disabled:opacity-50"
                          >
                            <FiShield />

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
                            className="flex items-center gap-2 rounded-lg border border-emerald-200 px-3 py-2 text-xs font-medium text-emerald-600 transition hover:bg-emerald-50 disabled:opacity-50"
                          >
                            <FiShieldOff />

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
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <FiUsers className="mb-3 size-10 text-slate-300" />

              <h3 className="font-semibold text-slate-600">
                No users found
              </h3>

              <p className="mt-1 text-sm text-slate-400">
                Try changing your search or filter.
              </p>
            </div>
          )}

        </CardContent>
      </Card>

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
