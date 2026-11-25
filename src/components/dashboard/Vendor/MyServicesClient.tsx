"use client";

import { useState } from "react";
import Link from "next/link";

import {
  FiSearch,
  FiMapPin,
  FiPlus,
  FiImage,
  FiBriefcase,
  FiCheckCircle,
  FiClock,
  FiXCircle,
  FiArrowUpRight,
  FiChevronDown,
} from "react-icons/fi";

import EditServiceButton from "@/components/dashboard/Vendor/EditServiceButton";
import DeleteServiceButton from "@/components/dashboard/Vendor/DeleteServiceButton";

import PageHeader from "@/components/dashboard/ui/PageHeader";
import StatCard from "@/components/dashboard/ui/StatCard";
import StatusBadge from "@/components/dashboard/ui/StatusBadge";
import EmptyState from "@/components/dashboard/ui/EmptyState";

interface Service {
  _id: string;
  serviceName: string;
  category: string;
  price: number;
  location: string;
  description: string;
  images: string[];
  status: string;
  userEmail: string;
  createdAt: string;
}

const dropdownOptions = {
  status: [
    { value: "all", label: "All Status" },
    { value: "pending", label: "Pending" },
    { value: "approved", label: "Approved" },
    { value: "rejected", label: "Rejected" },
  ],
  sort: [
    { value: "newest", label: "Newest First" },
    { value: "oldest", label: "Oldest First" },
    { value: "low", label: "Price: Low to High" },
    { value: "high", label: "Price: High to Low" },
  ],
};

function CustomDropdown({
  value,
  onChange,
  options,
  width,
}: {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  width: string;
}) {
  const [open, setOpen] = useState(false);

  const selectedOption = options.find((option) => option.value === value);

  return (
    <div className={`relative ${width}`}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex h-11 w-full items-center justify-between gap-2 rounded-xl border border-[#E7EBF5] bg-[#F9FAFF] px-3 text-xs font-semibold text-[#5B6478] outline-none transition-all duration-200 hover:border-[#C9D9FF] hover:bg-white focus:border-[#3A76EF] focus:ring-4 focus:ring-[#3A76EF]/10"
      >
        <span>{selectedOption?.label}</span>

        <FiChevronDown
          size={14}
          className={`shrink-0 text-[#8A93A8] transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <>
          <button
            type="button"
            aria-label="Close dropdown"
            className="fixed inset-0 z-40 cursor-default"
            onClick={() => setOpen(false)}
          />

          <div className="absolute left-0 top-full z-50 mt-2 w-full overflow-hidden rounded-xl border border-[#E7EBF5] bg-white p-1.5 shadow-[0_18px_40px_-18px_rgba(37,43,69,0.3)]">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                }}
                className={`w-full rounded-lg px-3 py-2 text-left text-sm transition-colors duration-200 ${
                  value === option.value
                    ? "bg-[#EEF4FF] font-semibold text-[#3A76EF]"
                    : "text-[#5B6478] hover:bg-[#F9FAFF]"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default function MyServicesClient({
  initialServices,
}: {
  initialServices: Service[];
}) {
  const [updatedServices, setUpdatedServices] = useState<Service[] | null>(
    null,
  );

  const services = updatedServices ?? initialServices;

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");

  // Filter and sort services
  const filteredServices = services
    .filter((service) => {
      const matchesSearch =
        service.serviceName.toLowerCase().includes(search.toLowerCase()) ||
        service.category.toLowerCase().includes(search.toLowerCase()) ||
        service.location.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || service.status.toLowerCase() === statusFilter;

      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (sortOrder === "newest") {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      }

      if (sortOrder === "oldest") {
        return (
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      }

      if (sortOrder === "low") {
        return a.price - b.price;
      }

      return b.price - a.price;
    });

  const pendingCount = services.filter(
    (service) => service.status.toLowerCase() === "pending",
  ).length;

  const approvedCount = services.filter(
    (service) => service.status.toLowerCase() === "approved",
  ).length;

  const rejectedCount = services.filter(
    (service) => service.status.toLowerCase() === "rejected",
  ).length;

  return (
    <div className="min-h-full px-4 py-5 sm:px-6 sm:py-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-5">
        {/* Header */}
        <PageHeader
          eyebrow="Vendor Workspace"
          title="My Services"
          description="Manage your services and track approval status."
          action={
            <Link
              href="/dashboard/vendor/add-service"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-[#3A76EF] px-4 text-sm font-semibold text-white shadow-[0_10px_22px_-12px_rgba(58,118,239,0.9)] transition-all duration-200 hover:bg-[#2F63D4] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3A76EF]/40 focus-visible:ring-offset-2"
            >
              <FiPlus className="size-4" />
              Add New Service
              <FiArrowUpRight className="size-3.5" />
            </Link>
          }
        />

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <StatCard
            label="Total Services"
            value={services.length}
            icon={FiBriefcase}
            tone="purple"
            className="p-4"
          />

          <StatCard
            label="Approved"
            value={approvedCount}
            icon={FiCheckCircle}
            tone="mint"
            className="p-4"
          />

          <StatCard
            label="Pending"
            value={pendingCount}
            icon={FiClock}
            tone="amber"
            className="p-4"
          />

          <StatCard
            label="Rejected"
            value={rejectedCount}
            icon={FiXCircle}
            tone="rose"
            className="p-4"
          />
        </div>

        {/* Search & Filters */}
        <div className="rounded-2xl border border-[#E7EBF5] bg-white p-3.5 shadow-[0_1px_2px_rgba(37,43,69,0.04)] sm:p-4">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            {/* Search */}
            <div className="relative w-full lg:max-w-md">
              <FiSearch
                className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-[#8A93A8]"
              />

              <input
                type="text"
                placeholder="Search services, category or location..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-11 w-full rounded-xl border border-[#E7EBF5] bg-[#F9FAFF] pl-10 pr-4 text-sm text-[#252B45] outline-none transition-all duration-200 placeholder:text-[#A0A8BC] hover:border-[#C9D9FF] focus:border-[#3A76EF] focus:bg-white focus:ring-4 focus:ring-[#3A76EF]/10"
              />
            </div>

            {/* Filters */}
            <div className="grid grid-cols-2 gap-2 sm:flex sm:gap-3">
              <CustomDropdown
                value={statusFilter}
                onChange={setStatusFilter}
                options={dropdownOptions.status}
                width="sm:min-w-[135px] w-full"
              />

              <CustomDropdown
                value={sortOrder}
                onChange={setSortOrder}
                options={dropdownOptions.sort}
                width="sm:min-w-[155px] w-full"
              />
            </div>
          </div>

          {/* Results */}
          <div className="mt-3 flex items-center justify-between border-t border-[#EDF0F8] pt-3">
            <p className="text-xs text-[#7A839B]">
              Showing{" "}
              <span className="font-semibold text-[#252B45]">
                {filteredServices.length}
              </span>{" "}
              of {services.length} services
            </p>

            {(search || statusFilter !== "all") && (
              <button
                onClick={() => {
                  setSearch("");
                  setStatusFilter("all");
                }}
                className="rounded-lg px-2 py-1 text-xs font-semibold text-[#3A76EF] transition-colors hover:bg-[#EEF4FF]"
              >
                Clear filters
              </button>
            )}
          </div>
        </div>

        {/* Empty */}
        {services.length === 0 && (
          <div className="rounded-2xl border border-[#E7EBF5] bg-white p-5">
            <EmptyState
              icon={FiImage}
              title="No services yet"
              description="Add your first wedding service to get started."
              action={
                <Link
                  href="/dashboard/vendor/add-service"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#3A76EF] px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-[#2F63D4]"
                >
                  <FiPlus className="size-3.5" />
                  Add Service
                </Link>
              }
            />
          </div>
        )}

        {/* No Search Results */}
        {services.length > 0 && filteredServices.length === 0 && (
          <div className="rounded-2xl border border-[#E7EBF5] bg-white p-5">
            <EmptyState
              icon={FiSearch}
              title="No services found"
              description="Try another search or change your filters."
              action={
                <button
                  onClick={() => {
                    setSearch("");
                    setStatusFilter("all");
                  }}
                  className="text-xs font-semibold text-[#3A76EF] hover:underline"
                >
                  Clear filters
                </button>
              }
            />
          </div>
        )}

        {/* Services Grid */}
        {filteredServices.length > 0 && (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {filteredServices.map((service) => (
              <div
                key={service._id}
                className="group overflow-hidden rounded-2xl border border-[#E7EBF5] bg-white transition-all duration-200 hover:border-[#C9D9FF] hover:shadow-[0_18px_38px_-22px_rgba(37,43,69,0.3)]"
              >
                {/* Image */}
                <div className="relative h-44 overflow-hidden bg-[#EEF4FF]">
                  {service.images?.[0] ? (
                    <img
                      src={service.images[0]}
                      alt={service.serviceName}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-[#3A76EF]">
                      <FiImage size={32} />
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-black/5" />

                  {/* Status */}
                  <span className="absolute left-3 top-3">
                    <StatusBadge
                      status={service.status}
                      className="border-white/40 bg-white/95 shadow-sm backdrop-blur-sm"
                    />
                  </span>

                  {/* Image Count */}
                  {service.images?.length > 0 && (
                    <span className="absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-md bg-black/50 px-2 py-1 text-[10px] font-medium text-white backdrop-blur-sm">
                      <FiImage size={12} />
                      {service.images.length} photos
                    </span>
                  )}
                </div>

                {/* Card Content */}
                <div className="p-4">
                  {/* Category */}
                  <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#3A76EF]">
                    {service.category}
                  </p>

                  {/* Title */}
                  <h3 className="mt-1.5 line-clamp-1 text-base font-bold text-[#252B45]">
                    {service.serviceName}
                  </h3>

                  {/* Description */}
                  <p className="mt-1.5 line-clamp-2 min-h-9 text-xs leading-5 text-[#7A839B]">
                    {service.description}
                  </p>

                  {/* Location */}
                  <div className="mt-3 flex items-center gap-2 text-xs text-[#7A839B]">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-[#EEF4FF] text-[#3A76EF]">
                      <FiMapPin size={12} />
                    </div>

                    <span className="line-clamp-1">{service.location}</span>
                  </div>

                  {/* Price */}
                  <div className="mt-3 flex items-end justify-between border-t border-[#EDF0F8] pt-3">
                    <div>
                      <p className="text-[10px] text-[#8A93A8]">
                        Starting price
                      </p>

                      <p className="mt-0.5 text-lg font-bold text-[#3A76EF]">
                        ৳{service.price.toLocaleString("en-BD")}
                      </p>
                    </div>

                    <span className="rounded-md bg-[#EEF4FF] px-2 py-1 text-[9px] font-semibold text-[#3A76EF]">
                      {service.status.toLowerCase() === "approved"
                        ? "Published"
                        : service.status.toLowerCase() === "rejected"
                          ? "Needs update"
                          : "Under review"}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="mt-3 grid grid-cols-2 gap-2 border-t border-[#EDF0F8] pt-3">
                    <EditServiceButton service={service} />

                    <DeleteServiceButton
                      serviceId={service._id}
                      onDelete={(deletedId) => {
                        setUpdatedServices((prevServices) =>
                          (prevServices ?? initialServices).filter(
                            (item) => item._id !== deletedId,
                          ),
                        );
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
