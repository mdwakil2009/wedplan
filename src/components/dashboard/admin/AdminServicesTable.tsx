"use client";

import { useState } from "react";
import {
  updateServiceStatus,
  updateServiceActiveStatus,
  deleteAdminService,
} from "@/lib/action/api";
import { toast } from "@/components/ui/toast";

import {
  FiSearch,
  FiChevronDown,
  FiCheck,
  FiX,
  FiTrash2,
  FiImage,
  FiPower,
} from "react-icons/fi";

import StatusBadge from "@/components/dashboard/ui/StatusBadge";
import EmptyState from "@/components/dashboard/ui/EmptyState";

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
  vendor?: {
    name?: string;
    email?: string;
    image?: string;
  } | null;
};

type DropdownFilterProps = {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
};

const buttonStyle =
  "inline-flex h-10 items-center justify-center gap-2 rounded-xl px-4 text-xs font-semibold transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1";

const primaryButton = `${buttonStyle} bg-[#3A76EF] text-white hover:bg-[#2F63D4] focus-visible:ring-[#3A76EF]/40`;

const dangerButton = `${buttonStyle} border border-[#F8CACA] bg-white text-[#C93B3B] hover:bg-[#FEF0F0] focus-visible:ring-[#C93B3B]/30`;

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
        className="flex h-11 w-full items-center justify-between rounded-xl border border-[#E7EBF5] bg-white px-4 text-sm font-medium text-[#252B45] transition-all duration-200 hover:border-[#C9D9FF] focus:border-[#3A76EF] focus:ring-4 focus:ring-[#3A76EF]/10"
      >
        <span className="truncate">
          {value === "all"
            ? label
            : value.charAt(0).toUpperCase() + value.slice(1)}
        </span>

        <FiChevronDown
          className={`size-4 text-[#8A93A8] transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="absolute left-0 top-full z-50 mt-2 max-h-64 w-full overflow-y-auto rounded-xl border border-[#E7EBF5] bg-white p-1.5 shadow-[0_18px_40px_-18px_rgba(37,43,69,0.3)]">
          {options.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => {
                onChange(option);
                setOpen(false);
              }}
              className={`w-full rounded-lg px-3 py-2.5 text-left text-sm transition-colors duration-200 ${
                value === option
                  ? "bg-[#EEF4FF] font-semibold text-[#3A76EF]"
                  : "text-[#5B6478] hover:bg-[#F9FAFF]"
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
      service.vendor?.name ||
      service.vendorName ||
      service.userName ||
      "Unknown Vendor";

    const vendorEmail = service.vendor?.email || service.vendorEmail || "";

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
      <div className="flex flex-col gap-3 rounded-2xl border border-[#E7EBF5] bg-white p-4 shadow-[0_1px_2px_rgba(37,43,69,0.04)] sm:flex-row">
        <div className="relative flex-1">
          <FiSearch className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-[#8A93A8]" />

          <input
            type="text"
            placeholder="Search services or vendors..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-11 w-full rounded-xl border border-[#E7EBF5] bg-[#F9FAFF] pl-10 pr-4 text-sm text-[#252B45] outline-none transition-all duration-200 placeholder:text-[#A0A8BC] hover:border-[#C9D9FF] focus:border-[#3A76EF] focus:bg-white focus:ring-4 focus:ring-[#3A76EF]/10"
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
      <p className="text-xs font-medium text-[#7A839B]">
        Showing{" "}
        <span className="font-bold text-[#252B45]">
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
            service.vendor?.name ||
            service.vendorName ||
            service.userName ||
            "Unknown Vendor";

          const vendorEmail =
            service.vendor?.email || service.vendorEmail || "";
          const status = (service.status || "pending").toLowerCase();

          const isActive = service.isActive === true;

          const isLoading = loadingId === service._id;

          const imageFailed = failedImages.includes(service._id);

          return (
            <div
              key={service._id}
              className="group overflow-hidden rounded-2xl border border-[#E7EBF5] bg-white shadow-[0_1px_2px_rgba(37,43,69,0.04)] transition-all duration-200 hover:border-[#C9D9FF] hover:shadow-[0_16px_36px_-22px_rgba(37,43,69,0.3)]"
            >
              <div className="flex flex-col gap-5 p-4 sm:p-5 lg:flex-row lg:items-center">
                {/* Service Image */}
                <div className="h-48 w-full shrink-0 overflow-hidden rounded-xl bg-[#EEF4FF] sm:h-40 sm:w-48 lg:h-36 lg:w-44">
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
                    <div className="flex h-full flex-col items-center justify-center gap-2 text-[#3A76EF]">
                      <FiImage className="size-10" />

                      <span className="text-xs font-medium">No Image</span>
                    </div>
                  )}
                </div>

                {/* Information */}
                <div className="min-w-0 flex-1 space-y-3">
                  {/* Name & Status */}
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-lg font-bold leading-tight text-[#252B45] sm:text-xl">
                      {service.serviceName}
                    </h3>

                    <StatusBadge status={status} />
                  </div>

                  {/* Category, Price, Location */}
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-[#5B6478]">
                    <span>{service.category}</span>

                    <span className="text-[#C9D0DE]">•</span>

                    <span className="font-bold text-[#252B45]">
                      ৳{Number(service.price || 0).toLocaleString()}
                    </span>

                    <span className="text-[#C9D0DE]">•</span>

                    <span>{service.location || "Location unavailable"}</span>
                  </div>

                  {/* Vendor */}
                  <p className="break-all text-sm text-[#5B6478]">
                    <span className="font-semibold text-[#252B45]">
                      Vendor:
                    </span>{" "}
                    {vendorName}{" "}
                    <span className="text-[#A0A8BC]">({vendorEmail})</span>
                  </p>

                  {/* Description */}
                  {service.description && (
                    <p className="line-clamp-2 text-sm leading-6 text-[#7A839B]">
                      {service.description}
                    </p>
                  )}

                  {/* Availability */}
                  {status === "approved" && (
                    <div className="flex items-center gap-2">
                      <span
                        className={`h-2 w-2 rounded-full ${
                          isActive ? "bg-[#6ED4B1]" : "bg-[#A0A8BC]"
                        }`}
                      />

                      <span className="text-xs text-[#8A93A8]">
                        Availability:
                      </span>

                      <span
                        className={`text-xs font-semibold ${
                          isActive ? "text-[#0E8A66]" : "text-[#5B6478]"
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
                        <FiCheck className="size-3.5" />
                        {isLoading ? "Updating..." : "Approve"}
                      </button>

                      <button
                        disabled={isLoading}
                        onClick={() => handleStatus(service._id, "rejected")}
                        className={dangerButton}
                      >
                        <FiX className="size-3.5" />
                        Reject
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
                        <FiX className="size-3.5" />
                        Reject
                      </button>

                      <button
                        disabled={isLoading}
                        onClick={() => handleActive(service._id, isActive)}
                        className={primaryButton}
                      >
                        <FiPower className="size-3.5" />
                        {isLoading
                          ? "Updating..."
                          : isActive
                            ? "Deactivate"
                            : "Activate"}
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
                      <FiCheck className="size-3.5" />
                      {isLoading ? "Updating..." : "Approve"}
                    </button>
                  )}

                  {/* Delete */}
                  <button
                    type="button"
                    disabled={isLoading}
                    onClick={() => handleDelete(service._id)}
                    className={dangerButton}
                  >
                    <FiTrash2 className="size-3.5" />
                    Delete Service
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {/* Empty State */}
        {filteredServices.length === 0 && (
          <div className="rounded-2xl border border-[#E7EBF5] bg-white p-5">
            <EmptyState
              icon={FiSearch}
              title="No services found"
              description="Try changing your search or filters."
            />
          </div>
        )}
      </div>
    </div>
  );
}
