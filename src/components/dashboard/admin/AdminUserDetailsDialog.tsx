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

import StatusBadge from "@/components/dashboard/ui/StatusBadge";

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
      <DialogContent className="rounded-2xl border-[#E7EBF5] sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-[#252B45]">
            User Details
          </DialogTitle>

          <DialogDescription className="text-[#7A839B]">
            Detailed information about this platform user.
          </DialogDescription>
        </DialogHeader>

        {user && (
          <div className="space-y-5">
            {/* Profile */}
            <div className="flex items-center gap-4 rounded-2xl border border-[#DCE6FF] bg-[#EEF4FF] p-4">
              <Avatar className="size-16 border-2 border-white shadow-sm">
                <AvatarImage src={user.image} />

                <AvatarFallback className="bg-[#3A76EF] text-white">
                  {user.name?.slice(0, 2).toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>

              <div className="min-w-0">
                <h3 className="truncate font-bold text-[#252B45]">
                  {user.name || "Unknown User"}
                </h3>

                <p className="break-all text-sm text-[#5B6478]">
                  {user.email}
                </p>

                <span className="mt-2 inline-block rounded-full border border-[#CFDDFB] bg-white px-3 py-1 text-xs font-semibold capitalize text-[#3A76EF]">
                  {user.role}
                </span>
              </div>
            </div>

            {/* Information */}
            <div className="space-y-3">
              {/* User ID */}
              <div className="flex justify-between gap-3 border-b border-[#EDF0F8] pb-3">
                <span className="text-sm text-[#7A839B]">
                  User ID
                </span>

                <span className="max-w-[200px] break-all text-right text-xs font-medium text-[#252B45]">
                  {user._id}
                </span>
              </div>

              {/* Role */}
              <div className="flex justify-between border-b border-[#EDF0F8] pb-3">
                <span className="text-sm text-[#7A839B]">
                  Account Role
                </span>

                <span className="font-medium capitalize text-[#252B45]">
                  {user.role}
                </span>
              </div>

              {/* Status */}
              <div className="flex items-center justify-between border-b border-[#EDF0F8] pb-3">
                <span className="text-sm text-[#7A839B]">
                  Account Status
                </span>

                <StatusBadge
                  status={user.isBlocked ? "blocked" : "active"}
                  label={user.isBlocked ? "Blocked" : "Active"}
                />
              </div>

              {/* Joined Date */}
              <div className="flex justify-between border-b border-[#EDF0F8] pb-3">
                <span className="text-sm text-[#7A839B]">
                  Joined Date
                </span>

                <span className="text-sm font-medium text-[#252B45]">
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
