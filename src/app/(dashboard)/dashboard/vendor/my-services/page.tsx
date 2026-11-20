"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSession } from "@/lib/auth-client";
import Link from "next/link";

import {
  FiSearch,
  FiMapPin,
  FiEdit2,
  FiTrash2,
  FiPlus,
  FiImage,
  FiBriefcase,
  FiCheckCircle,
  FiClock,
  FiXCircle,
  FiArrowUpRight,
  FiChevronDown,
} from "react-icons/fi";
import EditServiceButton from "@/components/dashboard/Vendor-Edit-Detele/EditServiceButton";
import DeleteServiceButton from "@/components/dashboard/Vendor-Edit-Detele/DeleteServiceButton";

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

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 18,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: "easeOut" as const,
    },
  },
};

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
      {/* Dropdown Button */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex h-11 w-full items-center justify-between gap-2 rounded-xl border border-[#E1E8ED] bg-[#F8FAFC] px-3 text-xs font-medium text-[#5B7286] outline-none transition-all hover:border-[#C8D6E0] hover:bg-white focus:border-[#378A88] focus:ring-4 focus:ring-[#378A88]/5"
      >
        <span>{selectedOption?.label}</span>

        <FiChevronDown
          size={14}
          className={`shrink-0 text-[#87939E] transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown Options */}
      {open && (
        <>
          <button
            type="button"
            aria-label="Close dropdown"
            className="fixed inset-0 z-40 cursor-default"
            onClick={() => setOpen(false)}
          />

          <motion.div
            initial={{ opacity: 0, y: -5, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 top-full z-50 mt-2 w-full overflow-hidden rounded-xl border border-[#E1E8ED] bg-white p-1.5 shadow-lg shadow-[#378A88]/10"
          >
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                }}
                className={`w-full rounded-lg px-3 py-2 text-left text-sm transition-colors hover:bg-[#2C7371] hover:text-white`}
              >
                {option.label}
              </button>
            ))}
          </motion.div>
        </>
      )}
    </div>
  );
}

export default function MyServicesPage() {
  const { data: session, isPending: sessionLoading } = useSession();

  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");

  // Fetch user's services
  useEffect(() => {
    if (sessionLoading) return;

    const email = session?.user?.email;

    if (!email) {
      setLoading(false);
      return;
    }

    const fetchServices = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/my-services?email=${encodeURIComponent(email)}`,
        );

        if (!response.ok) {
          throw new Error("Failed to load services");
        }

        const data = await response.json();
        setServices(data);
      } catch (error) {
        console.error(error);
        setError("Unable to load your services. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [session, sessionLoading]);

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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
      className="min-h-full px-4 py-5 sm:px-6 sm:py-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl space-y-5">
        {/* Header */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center"
        >
          <div>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#378A88]" />
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#378A88]">
                Vendor Workspace
              </p>
            </div>

            <h1 className="mt-1.5 text-2xl font-bold tracking-tight text-[#193F5B] sm:text-3xl">
              My Services
            </h1>

            <p className="mt-1 text-xs leading-5 text-[#87939E] sm:text-sm">
              Manage your services and track approval status.
            </p>
          </div>

          <Link
            href="/dashboard/vendor/add-service"
            className="inline-flex h-9 items-center justify-center gap-2 self-start rounded-lg bg-[#378A88] px-4 text-xs font-semibold text-white shadow-sm transition hover:bg-[#2C7371] sm:self-auto"
          >
            <FiPlus size={15} />
            Add New Service
            <FiArrowUpRight size={14} />
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 gap-3 sm:grid-cols-4"
        >
          {/* Total */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -3 }}
            className="rounded-xl border border-[#E1E8ED] bg-white p-3.5 transition-shadow hover:shadow-md sm:p-4"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#E4F3F1] text-[#378A88]">
              <FiBriefcase size={16} />
            </div>

            <p className="mt-3 text-xs text-[#87939E]">Total Services</p>

            <h2 className="mt-0.5 text-2xl font-bold text-[#193F5B]">
              {services.length}
            </h2>
          </motion.div>

          {/* Approved */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -3 }}
            className="rounded-xl border border-[#E1E8ED] bg-white p-3.5 transition-shadow hover:shadow-md sm:p-4"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-50 text-green-700">
              <FiCheckCircle size={16} />
            </div>

            <p className="mt-3 text-xs text-[#87939E]">Approved</p>

            <h2 className="mt-0.5 text-2xl font-bold text-green-700">
              {approvedCount}
            </h2>
          </motion.div>

          {/* Pending */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -3 }}
            className="rounded-xl border border-[#E1E8ED] bg-white p-3.5 transition-shadow hover:shadow-md sm:p-4"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
              <FiClock size={16} />
            </div>

            <p className="mt-3 text-xs text-[#87939E]">Pending</p>

            <h2 className="mt-0.5 text-2xl font-bold text-amber-600">
              {pendingCount}
            </h2>
          </motion.div>

          {/* Rejected */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -3 }}
            className="rounded-xl border border-[#E1E8ED] bg-white p-3.5 transition-shadow hover:shadow-md sm:p-4"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-50 text-red-600">
              <FiXCircle size={16} />
            </div>

            <p className="mt-3 text-xs text-[#87939E]">Rejected</p>

            <h2 className="mt-0.5 text-2xl font-bold text-red-600">
              {rejectedCount}
            </h2>
          </motion.div>
        </motion.div>

        {/* Search & Filters */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="rounded-xl border border-[#E1E8ED] bg-white p-3.5 sm:p-4"
        >
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            {/* Search */}
            <div className="relative w-full lg:max-w-md">
              <FiSearch
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#87939E]"
                size={16}
              />

              <input
                type="text"
                placeholder="Search services, category or location..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-11 w-full rounded-xl border border-[#E1E8ED] bg-[#F8FAFC] pl-10 pr-4 text-sm text-[#193F5B] placeholder:text-[#87939E] outline-none transition-all duration-200 focus:border-[#378A88] focus:bg-white focus:ring-4 focus:ring-[#378A88]/5"
              />
            </div>

            {/* Filters */}
            <div className="grid grid-cols-2 gap-2 sm:flex sm:gap-3">
              {/* Custom Status Dropdown */}
              <CustomDropdown
                value={statusFilter}
                onChange={setStatusFilter}
                options={dropdownOptions.status}
                width="sm:min-w-[135px] w-full"
              />

              {/* Custom Sorting Dropdown */}
              <CustomDropdown
                value={sortOrder}
                onChange={setSortOrder}
                options={dropdownOptions.sort}
                width="sm:min-w-[155px] w-full"
              />
            </div>
          </div>

          {/* Results */}
          <div className="mt-3 flex items-center justify-between border-t border-[#E1E8ED] pt-3">
            <p className="text-xs text-[#87939E]">
              Showing{" "}
              <span className="font-semibold text-[#193F5B]">
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
                className="rounded-lg px-2 py-1 text-xs font-semibold text-[#378A88] transition hover:bg-[#E4F3F1]"
              >
                Clear filters
              </button>
            )}
          </div>
        </motion.div>

        {/* Loading */}
        {loading && (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="overflow-hidden rounded-xl border border-[#E1E8ED]"
              >
                <div className="h-44 animate-pulse bg-[#E4F3F1]" />

                <div className="space-y-3 p-4">
                  <div className="h-3 w-1/3 animate-pulse rounded bg-[#E4F3F1]" />
                  <div className="h-4 w-2/3 animate-pulse rounded bg-[#E4F3F1]" />
                  <div className="h-3 w-full animate-pulse rounded bg-[#E4F3F1]" />
                  <div className="h-8 animate-pulse rounded bg-[#E4F3F1]" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="rounded-xl border border-red-100 bg-red-50 p-6 text-center">
            <FiXCircle className="mx-auto text-red-500" size={24} />

            <p className="mt-2 text-sm text-red-600">{error}</p>
          </div>
        )}

        {/* Empty */}
        {!loading && !error && services.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl border border-dashed border-[#CFE7E4] bg-[#F8FAFC] px-5 py-12 text-center"
          >
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[#E4F3F1] text-[#378A88]">
              <FiImage size={22} />
            </div>

            <h3 className="mt-4 text-base font-semibold text-[#193F5B]">
              No services yet
            </h3>

            <p className="mt-1.5 text-xs text-[#87939E]">
              Add your first wedding service to get started.
            </p>

            <Link
              href="/dashboard/vendor/add-service"
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[#378A88] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#2C7371]"
            >
              <FiPlus size={15} />
              Add Service
            </Link>
          </motion.div>
        )}

        {/* No Search Results */}
        {!loading &&
          !error &&
          services.length > 0 &&
          filteredServices.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl border border-[#E1E8ED] bg-white px-5 py-10 text-center"
            >
              <FiSearch className="mx-auto text-[#87939E]" size={22} />

              <h3 className="mt-3 text-sm font-semibold text-[#193F5B]">
                No services found
              </h3>

              <p className="mt-1 text-xs text-[#87939E]">
                Try another search or change your filters.
              </p>

              <button
                onClick={() => {
                  setSearch("");
                  setStatusFilter("all");
                }}
                className="mt-3 text-xs font-semibold text-[#378A88] hover:underline"
              >
                Clear filters
              </button>
            </motion.div>
          )}

        {/* Services Grid */}
        {!loading && !error && filteredServices.length > 0 && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
          >
            {filteredServices.map((service) => (
              <motion.div
                key={service._id}
                variants={itemVariants}
                whileHover={{ y: -4 }}
                className="group overflow-hidden rounded-xl border border-[#E1E8ED] bg-white transition-shadow duration-300 hover:border-[#C8D6E0] hover:shadow-lg hover:shadow-[#378A88]/5"
              >
                {/* Image */}
                <div className="relative h-44 overflow-hidden bg-[#E4F3F1]">
                  {service.images?.[0] ? (
                    <img
                      src={service.images[0]}
                      alt={service.serviceName}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-[#87939E]">
                      <FiImage size={32} />
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/5" />

                  {/* Status */}
                  <span
                    className={`absolute left-3 top-3 inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[10px] font-semibold capitalize backdrop-blur-sm ${
                      service.status.toLowerCase() === "approved"
                        ? "border-green-200/50 bg-green-50/95 text-green-700"
                        : service.status.toLowerCase() === "rejected"
                          ? "border-red-200/50 bg-red-50/95 text-red-700"
                          : "border-amber-200/50 bg-amber-50/95 text-amber-700"
                    }`}
                  >
                    {service.status.toLowerCase() === "approved" ? (
                      <FiCheckCircle size={12} />
                    ) : service.status.toLowerCase() === "rejected" ? (
                      <FiXCircle size={12} />
                    ) : (
                      <FiClock size={12} />
                    )}
                    {service.status}
                  </span>

                  {/* Image count */}
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
                  <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#378A88]">
                    {service.category}
                  </p>

                  {/* Title */}
                  <h3 className="mt-1.5 line-clamp-1 text-base font-bold text-[#193F5B]">
                    {service.serviceName}
                  </h3>

                  {/* Description */}
                  <p className="mt-1.5 line-clamp-2 min-h-9 text-xs leading-5 text-[#87939E]">
                    {service.description}
                  </p>

                  {/* Location */}
                  <div className="mt-3 flex items-center gap-2 text-xs text-[#87939E]">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-[#E4F3F1] text-[#378A88]">
                      <FiMapPin size={12} />
                    </div>

                    <span className="line-clamp-1">{service.location}</span>
                  </div>

                  {/* Price */}
                  <div className="mt-3 flex items-end justify-between border-t border-[#E1E8ED] pt-3">
                    <div>
                      <p className="text-[10px] text-[#87939E]">
                        Starting price
                      </p>

                      <p className="mt-0.5 text-lg font-bold text-[#378A88]">
                        ৳{service.price.toLocaleString("en-BD")}
                      </p>
                    </div>

                    <span className="rounded-md bg-[#E4F3F1] px-2 py-1 text-[9px] font-semibold text-[#378A88]">
                      {service.status.toLowerCase() === "approved"
                        ? "Published"
                        : service.status.toLowerCase() === "rejected"
                          ? "Needs update"
                          : "Under review"}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="mt-3 grid grid-cols-2 gap-2 border-t border-[#E1E8ED] pt-3">
                    <EditServiceButton service={service} />
                    <DeleteServiceButton
                      serviceId={service._id}
                      onDelete={(deletedId) => {
                        setServices((Services) =>
                          Services.filter((item) => item._id !== deletedId),
                        );
                      }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
