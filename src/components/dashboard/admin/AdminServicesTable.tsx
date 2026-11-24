"use client";

import { useState } from "react";
import {
  updateServiceStatus,
  updateServiceActiveStatus,
  deleteAdminService,
} from "@/lib/action/api";
import { toast } from "@/components/ui/toast";

type Service = {
  _id: string;
  serviceName: string;
  category: string;
  price: number;
  location: string;
  description?: string;
  images?: string[];
  image?: string;
  imageUrl?: string;
  vendorName?: string;
  vendorEmail?: string;
  userName?: string;
  userEmail?: string;
  status: string;
  isActive?: boolean;
};

type DropdownFilterProps = {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
};

const buttonStyle =
  "inline-flex h-10 items-center justify-center gap-2 rounded-lg px-4 text-sm font-semibold transition-all duration-200 disabled:pointer-events-none disabled:opacity-50";

const primaryButton = `${buttonStyle} bg-[#378A88] text-white hover:bg-[#2D7472]`;

const outlineButton = `${buttonStyle} border border-slate-200 bg-white text-slate-700 hover:bg-slate-50`;

const dangerButton = `${buttonStyle} border border-red-200 bg-white text-red-600 hover:bg-red-50`;

function DropdownFilter({
  label,
  value,
  options,
  onChange,
}: DropdownFilterProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative w-full sm:w-52">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex h-11 w-full items-center justify-between rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 transition hover:border-[#378A88]"
      >
        <span className="truncate">
          {value === "all"
            ? label
            : value.charAt(0).toUpperCase() + value.slice(1)}
        </span>

        <svg
          className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {open && (
        <div className="absolute left-0 top-full z-50 mt-2 max-h-64 w-full overflow-y-auto rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl">
          {options.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => {
                onChange(option);
                setOpen(false);
              }}
              className={`w-full rounded-lg px-3 py-2.5 text-left text-sm transition ${
                value === option
                  ? "bg-[#EAF5F3] font-semibold text-[#193F5B]"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              {option === "all"
                ? label
                : option.charAt(0).toUpperCase() + option.slice(1)}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function AdminServicesTable({
  services,
}: {
  services: Service[];
}) {
  const [serviceList, setServiceList] = useState(services);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [failedImages, setFailedImages] = useState<string[]>([]);

  // Approve / Reject
  const handleStatus = async (id: string, status: string) => {
    try {
      setLoadingId(id);

      await updateServiceStatus(
        id,
        status as "pending" | "approved" | "rejected",
      );

      setServiceList((prev) =>
        prev.map((service) =>
          service._id === id
            ? {
                ...service,
                status,
                isActive: status === "approved" ? service.isActive : false,
              }
            : service,
        ),
      );

      toast.add({
        title: "Service Updated",
        description: `Service ${status} successfully.`,
      });
    } catch {
      toast.add({
        title: "Update Failed",
        description: "Could not update service status.",
        type: "error",
      });
    } finally {
      setLoadingId(null);
    }
  };

  // Activate / Deactivate
  const handleActive = async (id: string, currentActive: boolean) => {
    const newActive = !currentActive;

    try {
      setLoadingId(id);

      await updateServiceActiveStatus(id, newActive);

      setServiceList((prev) =>
        prev.map((service) =>
          service._id === id ? { ...service, isActive: newActive } : service,
        ),
      );

      toast.add({
        title: "Availability Updated",
        description: `Service is now ${newActive ? "Active" : "Inactive"}.`,
      });
    } catch {
      toast.add({
        title: "Update Failed",
        description: "Could not update availability.",
        type: "error",
      });
    } finally {
      setLoadingId(null);
    }
  };

  // Delete Service
  const handleDelete = async (id: string) => {
    try {
      setLoadingId(id);

      await deleteAdminService(id);

      setServiceList((prev) => prev.filter((service) => service._id !== id));

      toast.add({
        title: "Service Deleted",
        description: "Service deleted successfully.",
      });
    } catch {
      toast.add({
        title: "Delete Failed",
        description: "Could not delete this service.",
        type: "error",
      });
    } finally {
      setLoadingId(null);
    }
  };

  // Categories
  const categories = [
    ...new Set(serviceList.map((service) => service.category).filter(Boolean)),
  ];

  // Search & Filter
  const filteredServices = serviceList.filter((service) => {
    const searchText = search.toLowerCase();

    const vendorName =
      service.vendorName || service.userName || "Unknown Vendor";

    const vendorEmail = service.vendorEmail || service.userEmail || "";

    const matchesSearch =
      service.serviceName?.toLowerCase().includes(searchText) ||
      service.category?.toLowerCase().includes(searchText) ||
      service.location?.toLowerCase().includes(searchText) ||
      vendorName.toLowerCase().includes(searchText) ||
      vendorEmail.toLowerCase().includes(searchText);

    const matchesCategory =
      categoryFilter === "all" || service.category === categoryFilter;

    const matchesStatus =
      statusFilter === "all" ||
      (service.status || "pending").toLowerCase() === statusFilter;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="space-y-5">
      {/* Search & Filters */}
      <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 sm:flex-row">
        <div className="relative flex-1">
          <svg
            className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-4-4" />
          </svg>

          <input
            type="text"
            placeholder="Search services or vendors..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-11 w-full rounded-xl border border-slate-200 py-2 pl-11 pr-4 text-sm outline-none transition focus:border-[#378A88] focus:ring-2 focus:ring-[#378A88]/10"
          />
        </div>

        <DropdownFilter
          label="All Categories"
          value={categoryFilter}
          options={["all", ...categories]}
          onChange={setCategoryFilter}
        />

        <DropdownFilter
          label="All Status"
          value={statusFilter}
          options={["all", "pending", "approved", "rejected"]}
          onChange={setStatusFilter}
        />
      </div>

      {/* Result Count */}
      <p className="text-sm text-slate-500">
        Showing{" "}
        <span className="font-bold text-[#193F5B]">
          {filteredServices.length}
        </span>{" "}
        of {serviceList.length} services
      </p>

      {/* Cards */}
      <div className="space-y-4">
        {filteredServices.map((service) => {
          const imageSrc =
            service.images?.find((image) => image?.trim()) ||
            service.image ||
            service.imageUrl;

          const vendorName =
            service.vendorName || service.userName || "Unknown Vendor";

          const vendorEmail =
            service.vendorEmail || service.userEmail || "No email";

          const status = (service.status || "pending").toLowerCase();

          const isActive = service.isActive === true;

          const isLoading = loadingId === service._id;

          const imageFailed = failedImages.includes(service._id);

          return (
            <div
              key={service._id}
              className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:border-[#B8DCD5] hover:shadow-md"
            >
              <div className="flex flex-col gap-5 p-4 sm:p-5 lg:flex-row lg:items-center">
                {/* Service Image */}
                <div className="h-48 w-full shrink-0 overflow-hidden rounded-xl bg-[#EAF5F3] sm:h-40 sm:w-48 lg:h-36 lg:w-44">
                  {imageSrc && !imageFailed ? (
                    <img
                      src={imageSrc}
                      alt={service.serviceName}
                      className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                      onError={() =>
                        setFailedImages((prev) =>
                          prev.includes(service._id)
                            ? prev
                            : [...prev, service._id],
                        )
                      }
                    />
                  ) : (
                    <div className="flex h-full flex-col items-center justify-center gap-2 text-[#378A88]">
                      <svg
                        className="h-12 w-12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={1.5}
                      >
                        <rect x="3" y="3" width="18" height="18" rx="2" />
                        <path d="m3 16 5-5 4 4 5-7 4 8" />
                      </svg>

                      <span className="text-sm font-medium">No Image</span>
                    </div>
                  )}
                </div>

                {/* Information */}
                <div className="min-w-0 flex-1 space-y-3">
                  {/* Name & Status */}
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-lg font-bold leading-tight text-[#193F5B] sm:text-xl">
                      {service.serviceName}
                    </h3>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                        status === "approved"
                          ? "bg-emerald-50 text-emerald-700"
                          : status === "rejected"
                            ? "bg-red-50 text-red-600"
                            : "bg-amber-50 text-amber-700"
                      }`}
                    >
                      {status}
                    </span>
                  </div>

                  {/* Category, Price, Location */}
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-slate-600">
                    <span>{service.category}</span>

                    <span className="text-slate-300">•</span>

                    <span className="font-semibold text-[#193F5B]">
                      ৳{Number(service.price || 0).toLocaleString()}
                    </span>

                    <span className="text-slate-300">•</span>

                    <span>{service.location || "Location unavailable"}</span>
                  </div>

                  {/* Vendor */}
                  <p className="break-all text-sm text-slate-600">
                    <span className="font-semibold text-[#193F5B]">
                      Vendor:
                    </span>{" "}
                    {vendorName}{" "}
                    <span className="text-slate-400">({vendorEmail})</span>
                  </p>

                  {/* Description */}
                  {service.description && (
                    <p className="line-clamp-2 text-sm leading-6 text-slate-500">
                      {service.description}
                    </p>
                  )}

                  {/* Availability */}
                  {status === "approved" && (
                    <div className="flex items-center gap-2">
                      <span
                        className={`h-2 w-2 rounded-full ${
                          isActive ? "bg-emerald-500" : "bg-slate-400"
                        }`}
                      />

                      <span className="text-xs text-slate-500">
                        Availability:
                      </span>

                      <span
                        className={`text-xs font-semibold ${
                          isActive ? "text-emerald-600" : "text-slate-500"
                        }`}
                      >
                        {isActive ? "Active" : "Inactive"}
                      </span>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex w-full shrink-0 flex-col gap-2 lg:w-auto lg:min-w-[210px]">
                  {/* Pending */}
                  {status === "pending" && (
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        disabled={isLoading}
                        onClick={() => handleStatus(service._id, "approved")}
                        className={primaryButton}
                      >
                        {isLoading ? "Updating..." : "✓ Approve"}
                      </button>

                      <button
                        disabled={isLoading}
                        onClick={() => handleStatus(service._id, "rejected")}
                        className={dangerButton}
                      >
                        ✕ Reject
                      </button>
                    </div>
                  )}

                  {/* Approved */}
                  {status === "approved" && (
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        disabled={isLoading}
                        onClick={() => handleStatus(service._id, "rejected")}
                        className={dangerButton}
                      >
                        ✕ Reject
                      </button>

                      <button
                        disabled={isLoading}
                        onClick={() => handleActive(service._id, isActive)}
                        className={primaryButton}
                      >
                        {isLoading
                          ? "Updating..."
                          : isActive
                            ? "↓ Deactivate"
                            : "↑ Activate"}
                      </button>
                    </div>
                  )}

                  {/* Rejected */}
                  {status === "rejected" && (
                    <button
                      disabled={isLoading}
                      onClick={() => handleStatus(service._id, "approved")}
                      className={primaryButton}
                    >
                      {isLoading ? "Updating..." : "✓ Approve"}
                    </button>
                  )}

                  {/* Delete */}
                  <button
                    type="button"
                    disabled={isLoading}
                    onClick={() => handleDelete(service._id)}
                    className={dangerButton}
                  >
                    🗑 Delete Service
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {/* Empty State */}
        {filteredServices.length === 0 && (
          <div className="rounded-2xl border border-slate-200 bg-white px-5 py-16 text-center">
            <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-[#EAF5F3] text-[#378A88]">
              <svg
                className="h-7 w-7"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-4-4" />
              </svg>
            </div>

            <h3 className="font-semibold text-[#193F5B]">No services found</h3>

            <p className="mt-1 text-sm text-slate-500">
              Try changing your search or filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
