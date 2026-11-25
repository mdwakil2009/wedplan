
"use client";

import { useEffect, useState } from "react";
import {
  User,
  Mail,
  ShieldCheck,
  Edit,
  Save,
  X,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface ProfileClientProps {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role?: string | null;
}

export default function ProfileClient({
  name,
  email,
  image,
  role,
}: ProfileClientProps) {
  // Safe values
  const safeName = typeof name === "string" ? name : "";
  const safeEmail = typeof email === "string" ? email : "";
  const safeRole = typeof role === "string" ? role : "vendor";

  // Profile information
  const [profileName, setProfileName] = useState(safeName);
  const [profileEmail, setProfileEmail] = useState(safeEmail);

  // Edit form information
  const [editName, setEditName] = useState(safeName);
  const [editEmail, setEditEmail] = useState(safeEmail);

  // Dialog
  const [open, setOpen] = useState(false);

  // Loading and messages
  const [saving, setSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Sync profile information when server props change
  useEffect(() => {
    setProfileName(safeName);
    setProfileEmail(safeEmail);

    setEditName(safeName);
    setEditEmail(safeEmail);
  }, [safeName, safeEmail]);

  // Generate initials safely
  const initials =
    (profileName || "")
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((word) => word[0]?.toUpperCase())
      .join("") || "U";

  // Open edit dialog
  const handleEdit = () => {
    setEditName(profileName || "");
    setEditEmail(profileEmail || "");

    setErrorMessage("");
    setSuccessMessage("");

    setOpen(true);
  };

  // Cancel editing
  const handleCancel = () => {
    setEditName(profileName || "");
    setEditEmail(profileEmail || "");

    setErrorMessage("");
    setOpen(false);
  };

  // Save profile
  const handleSave = async () => {
    const trimmedName = (editName || "").trim();
    const trimmedEmail = (editEmail || "").trim();

    if (!trimmedName || !trimmedEmail) {
      setErrorMessage("Name and email are required.");
      return;
    }

    setSaving(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      // 1. Update Name
      const nameResult = await authClient.updateUser({
        name: trimmedName,
      });

      if (nameResult.error) {
        setErrorMessage(
          nameResult.error.message || "Failed to update name."
        );
        return;
      }

      // Update local name
      setProfileName(trimmedName);

      // 2. Update Email if changed
      if (trimmedEmail !== profileEmail) {
        const emailResult = await authClient.changeEmail({
          newEmail: trimmedEmail,
          callbackURL: "/dashboard/customer/profile",
        });

        if (emailResult.error) {
          setErrorMessage(
            emailResult.error.message || "Failed to update email."
          );
          return;
        }

        setSuccessMessage(
          "Name updated successfully. Please check your new email for verification."
        );
      } else {
        setSuccessMessage("Profile updated successfully!");
      }

      // Close dialog
      setOpen(false);
    } catch (error) {
      console.error("Profile update error:", error);

      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <div className="space-y-6">
        {/* Page Heading */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#3A76EF]">
            {safeRole.charAt(0).toUpperCase() + safeRole.slice(1)}
          </p>

          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-[#252B45] sm:text-3xl">
            Profile Settings
          </h1>

          <p className="mt-1.5 text-sm text-[#7A839B]">
            Manage your account information on WedPlan.
          </p>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="flex items-start gap-3 rounded-xl border border-[#BFEFDD] bg-[#E9FBF4] p-4">
            <CheckCircle2
              size={18}
              className="mt-0.5 shrink-0 text-[#0E8A66]"
            />

            <p className="text-sm leading-6 text-[#0E8A66]">
              {successMessage}
            </p>

            <button
              onClick={() => setSuccessMessage("")}
              className="ml-auto shrink-0 text-[#0E8A66] transition hover:opacity-70"
              aria-label="Dismiss message"
            >
              <X size={16} />
            </button>
          </div>
        )}

        {/* Profile Card */}
        <div className="overflow-hidden rounded-2xl border border-[#E7EBF5] bg-white shadow-sm">
          {/* Profile Header */}
          <div className="flex flex-col gap-4 border-b border-[#E7EBF5] bg-[#F9FAFF] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <div className="flex min-w-0 items-center gap-4">
              {/* Avatar */}
              {image ? (
                <img
                  src={image}
                  alt={profileName || "Profile"}
                  className="h-16 w-16 shrink-0 rounded-full border-2 border-white object-cover shadow-sm ring-1 ring-[#E7EBF5]"
                />
              ) : (
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#EEF4FF] text-xl font-semibold text-[#3A76EF] ring-1 ring-[#C9D9FF]">
                  {initials}
                </div>
              )}

              {/* Name & Email */}
              <div className="min-w-0">
                <h2 className="truncate text-base font-semibold text-[#252B45]">
                  {profileName || "Your Name"}
                </h2>

                <p className="mt-1 truncate text-sm text-[#7A839B]">
                  {profileEmail || "No email provided"}
                </p>

                <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-[#EEF4FF] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-[#3A76EF]">
                  <ShieldCheck size={13} />
                  {safeRole}
                </span>
              </div>
            </div>

            {/* Edit Button */}
            <Button
              onClick={handleEdit}
              variant="outline"
              className="h-9 gap-2 rounded-lg border-[#E7EBF5] text-[#252B45] transition-colors hover:bg-[#EEF4FF] hover:text-[#2F63D4]"
            >
              <Edit size={14} />
              Edit Profile
            </Button>
          </div>

          {/* Personal Information */}
          <div className="p-5 sm:p-6">
            <div className="mb-5">
              <h3 className="text-base font-semibold text-[#252B45]">
                Personal Information
              </h3>

              <p className="mt-1 text-xs text-[#7A839B]">
                Your basic account information.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {/* Full Name */}
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[#7A839B]">
                  Full Name
                </p>

                <div className="mt-2 flex items-center gap-3 rounded-xl border border-[#E7EBF5] bg-[#F9FAFF] p-3.5">
                  <User
                    size={17}
                    className="shrink-0 text-[#3A76EF]"
                  />

                  <p className="break-words text-sm font-medium text-[#252B45]">
                    {profileName || "Not provided"}
                  </p>
                </div>
              </div>

              {/* Email */}
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[#7A839B]">
                  Email Address
                </p>

                <div className="mt-2 flex items-center gap-3 rounded-xl border border-[#E7EBF5] bg-[#F9FAFF] p-3.5">
                  <Mail
                    size={17}
                    className="shrink-0 text-[#3A76EF]"
                  />

                  <p className="break-all text-sm font-medium text-[#252B45]">
                    {profileEmail || "Not provided"}
                  </p>
                </div>
              </div>

              {/* Account Type */}
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[#7A839B]">
                  Account Type
                </p>

                <div className="mt-2 flex items-center gap-3 rounded-xl border border-[#E7EBF5] bg-[#F9FAFF] p-3.5">
                  <ShieldCheck
                    size={17}
                    className="shrink-0 text-[#3A76EF]"
                  />

                  <p className="text-sm font-medium capitalize text-[#252B45]">
                    {safeRole}
                  </p>
                </div>
              </div>
            </div>

            {/* Information Note */}
            <div className="mt-6 rounded-xl border border-[#DCE6FF] bg-[#EEF4FF]/60 px-4 py-3">
              <p className="text-xs leading-5 text-[#2F63D4]">
                You can update your name and email address using
                the Edit Profile button. Other account information
                cannot be changed here.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Dialog */}
      <Dialog
        open={open}
        onOpenChange={(value) => {
          if (!saving) {
            setOpen(value);

            if (!value) {
              setErrorMessage("");
            }
          }
        }}
      >
        <DialogContent className="rounded-2xl border-[#E7EBF5] bg-white sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-[#252B45]">
              Edit Profile
            </DialogTitle>

            <DialogDescription className="text-sm text-[#7A839B]">
              Update your name and email address.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-5 py-2">
            {/* Name Input */}
            <div className="space-y-2">
              <Label
                htmlFor="edit-name"
                className="text-sm font-medium text-[#252B45]"
              >
                Full Name
              </Label>

              <div className="relative">
                <User
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#3A76EF]"
                />

                <Input
                  id="edit-name"
                  value={editName}
                  onChange={(e) => {
                    setEditName(e.target.value);
                    setErrorMessage("");
                  }}
                  placeholder="Enter your name"
                  disabled={saving}
                  className="h-11 rounded-xl border-[#E7EBF5] pl-10 focus-visible:ring-[#3A76EF]"
                />
              </div>
            </div>

            {/* Email Input */}
            <div className="space-y-2">
              <Label
                htmlFor="edit-email"
                className="text-sm font-medium text-[#252B45]"
              >
                Email Address
              </Label>

              <div className="relative">
                <Mail
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#3A76EF]"
                />

                <Input
                  id="edit-email"
                  type="email"
                  value={editEmail}
                  onChange={(e) => {
                    setEditEmail(e.target.value);
                    setErrorMessage("");
                  }}
                  placeholder="Enter your email"
                  disabled={saving}
                  className="h-11 rounded-xl border-[#E7EBF5] pl-10 focus-visible:ring-[#3A76EF]"
                />
              </div>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3">
                <AlertCircle
                  size={16}
                  className="mt-0.5 shrink-0 text-red-500"
                />

                <p className="text-xs leading-5 text-red-600">
                  {errorMessage}
                </p>
              </div>
            )}

            {/* Buttons */}
            <div className="flex flex-col-reverse gap-2 pt-2 sm:flex-row sm:justify-end">
              <Button
                variant="outline"
                onClick={handleCancel}
                disabled={saving}
                className="rounded-xl border-[#E7EBF5] text-[#252B45] hover:bg-[#F9FAFF]"
              >
                <X size={15} className="mr-2" />
                Cancel
              </Button>

              <Button
                onClick={handleSave}
                disabled={
                  saving ||
                  !editName.trim() ||
                  !editEmail.trim()
                }
                className="rounded-xl bg-[#3A76EF] text-white hover:bg-[#2F63D4]"
              >
                <Save size={15} className="mr-2" />

                {saving ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
