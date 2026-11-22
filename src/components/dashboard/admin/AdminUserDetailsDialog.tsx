
"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

export type AdminUser = {
  _id: string;
  name?: string;
  email: string;
  image?: string;
  role: string;
  createdAt?: string;
  isBlocked?: boolean;
};

type Props = {
  user: AdminUser | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function AdminUserDetailsDialog({
  user,
  open,
  onOpenChange,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-2xl sm:max-w-md">

        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-[#193F5B]">
            User Details
          </DialogTitle>

          <DialogDescription>
            Detailed information about this platform user.
          </DialogDescription>
        </DialogHeader>

        {user && (
          <div className="space-y-5">

            {/* Profile */}
            <div className="flex items-center gap-4 rounded-xl bg-[#EAF5F3] p-4">
              <Avatar className="size-16">
                <AvatarImage src={user.image} />

                <AvatarFallback className="bg-[#378A88] text-white">
                  {user.name?.slice(0, 2).toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>

              <div className="min-w-0">
                <h3 className="font-bold text-[#193F5B]">
                  {user.name || "Unknown User"}
                </h3>

                <p className="break-all text-sm text-slate-500">
                  {user.email}
                </p>

                <span className="mt-2 inline-block rounded-full bg-white px-3 py-1 text-xs font-semibold capitalize text-[#378A88]">
                  {user.role}
                </span>
              </div>
            </div>

            {/* Information */}
            <div className="space-y-3">

              {/* User ID */}
              <div className="flex justify-between gap-3 border-b pb-3">
                <span className="text-sm text-slate-500">
                  User ID
                </span>

                <span className="max-w-[200px] break-all text-right text-xs font-medium text-slate-700">
                  {user._id}
                </span>
              </div>

              {/* Role */}
              <div className="flex justify-between border-b pb-3">
                <span className="text-sm text-slate-500">
                  Account Role
                </span>

                <span className="font-medium capitalize text-slate-700">
                  {user.role}
                </span>
              </div>

              {/* Status */}
              <div className="flex justify-between border-b pb-3">
                <span className="text-sm text-slate-500">
                  Account Status
                </span>

                <span
                  className={`font-semibold ${
                    user.isBlocked
                      ? "text-red-500"
                      : "text-emerald-600"
                  }`}
                >
                  {user.isBlocked ? "Blocked" : "Active"}
                </span>
              </div>

              {/* Joined Date */}
              <div className="flex justify-between border-b pb-3">
                <span className="text-sm text-slate-500">
                  Joined Date
                </span>

                <span className="text-sm font-medium text-slate-700">
                  {user.createdAt
                    ? new Date(user.createdAt).toLocaleDateString()
                    : "Not available"}
                </span>
              </div>

            </div>
          </div>
        )}

      </DialogContent>
    </Dialog>
  );
}
