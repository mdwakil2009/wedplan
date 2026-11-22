"use client";

import { FiAlertTriangle, FiArrowRight, FiCheck } from "react-icons/fi";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

type ServiceLimitDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function ServiceLimitDialog({
  open,
  onOpenChange,
}: ServiceLimitDialogProps) {
  const router = useRouter();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[calc(100%-2rem)] max-w-sm rounded-2xl border border-[#E1E8ED] bg-white p-4">

        {/* Header */}
        <DialogHeader className="text-center">
          <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-amber-100 text-amber-600">
            <FiAlertTriangle size={22} />
          </div>

          <DialogTitle className="text-lg font-bold text-[#193F5B]">
            Service Limit Reached
          </DialogTitle>

          <DialogDescription className="text-xs leading-5 text-[#64748B]">
            You've reached the maximum 3 services allowed
            on your Free Plan. Upgrade to add more services.
          </DialogDescription>
        </DialogHeader>

        {/* Warning */}
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-3">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-amber-800">
              Free Plan Limit
            </p>

            <span className="text-xs font-bold text-amber-800">
              3 / 3
            </span>
          </div>

          {/* Progress */}
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-amber-200">
            <div className="h-full w-full rounded-full bg-amber-500" />
          </div>

          <p className="mt-1.5 text-[11px] text-amber-700">
            All service slots are used.
          </p>
        </div>

        {/* Premium Benefits */}
        <div className="rounded-lg border border-[#CFE7E4] bg-[#F8FAFC] p-3">
          <p className="text-xs font-semibold text-[#193F5B]">
            Premium Benefits
          </p>

          <ul className="mt-2 space-y-1.5 text-xs text-[#64748B]">
            <li className="flex items-center gap-2">
              <FiCheck className="text-[#378A88]" />
              Unlimited services
            </li>

            <li className="flex items-center gap-2">
              <FiCheck className="text-[#378A88]" />
              Grow your wedding business
            </li>

            <li className="flex items-center gap-2">
              <FiCheck className="text-[#378A88]" />
              Reach more customers
            </li>
          </ul>
        </div>

        {/* Buttons */}
        <DialogFooter className="flex flex-col gap-2 sm:flex-col sm:space-x-0">
          <Button
            onClick={() => {
              onOpenChange(false);
              router.push("/dashboard/vendor/subscription");
            }}
            className="h-9 w-full rounded-lg bg-[#378A88] text-sm text-white hover:bg-[#2C7371]"
          >
            Upgrade to Premium
            <FiArrowRight className="ml-1.5" size={15} />
          </Button>

          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="h-9 w-full rounded-lg border-[#E1E8ED] text-sm"
          >
            Maybe Later
          </Button>
        </DialogFooter>

      </DialogContent>
    </Dialog>
  );
}