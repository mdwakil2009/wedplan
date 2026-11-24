
"use client";

import { FiTrash2 } from "react-icons/fi";
import { Trash2 } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { deleteService } from "@/lib/action/service";

interface DeleteServiceButtonProps {
  serviceId: string;
  onDelete: (id: string) => void;
}

const DeleteServiceButton = ({
  serviceId,
  onDelete,
}: DeleteServiceButtonProps) => {
  // Delete Service Function
  const handleDelete = async () => {
    try {
      const result = await deleteService(serviceId);

      if (result.success) {
        toast.add({
          title: "Service deleted",
          description: "Your service has been successfully deleted.",
        });

        onDelete(serviceId);
      } else {
        toast.add({
          title: "Delete failed",
          description: result.message || "Unable to delete this service.",
        });
      }
    } catch (error) {
      toast.add({
        title: "Something went wrong",
        description: "Please try again later.",
      });
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger
        render={
          <Button
            variant="outline"
            className="h-9 gap-2 rounded-xl border border-red-200 bg-white px-3 text-xs font-medium text-red-500 shadow-sm transition-all duration-200 hover:border-red-500 hover:bg-red-500 hover:text-white"
          >
            <FiTrash2 size={14} />
            Delete
          </Button>
        }
      />

      <AlertDialogContent className="rounded-2xl border border-gray-100 bg-white p-6 shadow-2xl sm:max-w-[420px]">
        <AlertDialogHeader className="items-center text-center">
          <AlertDialogMedia className="mb-2 flex size-14 items-center justify-center rounded-2xl bg-red-50 text-red-500 ring-1 ring-red-100">
            <Trash2 size={24} />
          </AlertDialogMedia>

          <AlertDialogTitle className="text-lg font-semibold tracking-tight text-gray-900">
            Delete this service?
          </AlertDialogTitle>

          <AlertDialogDescription className="max-w-[300px] text-sm leading-6 text-gray-500">
            Are you sure you want to delete this service? This action cannot be
            undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-center">
          <AlertDialogCancel
            variant="outline"
            className="h-10 w-full rounded-xl border-gray-200 bg-white text-sm font-medium text-gray-700 transition hover:bg-gray-50 sm:w-auto sm:min-w-[120px]"
          >
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            variant="destructive"
            onClick={handleDelete}
            className="h-10 w-full rounded-xl bg-red-500 text-sm font-medium text-white shadow-sm transition hover:bg-red-600 sm:w-auto sm:min-w-[120px]"
          >
            <Trash2 size={15} />
            Delete Service
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteServiceButton;
