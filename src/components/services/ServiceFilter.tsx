"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FiFilter,
  FiMapPin,
  FiSearch,
  FiSliders,
  FiX,
} from "react-icons/fi";

import ServiceCard from "@/components/services/ServiceCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Service } from "@/lib/types/service";

type ServiceFilterProps = {
  services: Service[];
};

const selectItemClass =
  "cursor-pointer rounded-lg text-gray-700 focus:bg-[#B76E79]/10 focus:text-[#965560] data-[highlighted]:bg-[#B76E79]/10 data-[highlighted]:text-[#965560]";

export default function ServiceFilter({ services }: ServiceFilterProps) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [location, setLocation] = useState("");
  const [sort, setSort] = useState("recommended");

  const categories = Array.from(
    new Set(services.map((service) => service.category).filter(Boolean))
  ).sort();

  const categoryItems = {
    all: "All categories",
    ...Object.fromEntries(categories.map((item) => [item, item])),
  };

  const sortItems = {
    recommended: "Recommended",
    low: "Price: Low to High",
    high: "Price: High to Low",
  };

  const keyword = search.trim().toLowerCase();
  const locationKeyword = location.trim().toLowerCase();

  let filteredServices = services.filter((service) => {
    const matchesSearch = (service.serviceName || "")
      .toLowerCase()
      .includes(keyword);

    const matchesCategory =
      category === "all" || service.category === category;

    const matchesLocation = (service.location || "")
      .toLowerCase()
      .includes(locationKeyword);

    return matchesSearch && matchesCategory && matchesLocation;
  });

  if (sort === "low") {
    filteredServices = [...filteredServices].sort(
      (first, second) => Number(first.price) - Number(second.price)
    );
  }

  if (sort === "high") {
    filteredServices = [...filteredServices].sort(
      (first, second) => Number(second.price) - Number(first.price)
    );
  }

  const hasFilters =
    search.trim() !== "" ||
    category !== "all" ||
    location.trim() !== "" ||
    sort !== "recommended";

  const clearFilters = () => {
    setSearch("");
    setCategory("all");
    setLocation("");
    setSort("recommended");
  };

  return (
    <div>
      <div className="rounded-3xl border border-[#F0E1E4] bg-white p-4 shadow-[0_24px_60px_rgba(87,36,51,0.09)] sm:p-6">
        <div className="flex flex-col gap-3 border-b border-[#F6ECEE] pb-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-xl bg-[#FBF1F2] text-[#772D43]">
              <FiFilter className="size-4" />
            </span>

            <div>
              <h2 className="text-sm font-semibold text-[#332229] sm:text-base">
                Find your ideal service
              </h2>
              <p className="mt-0.5 text-[11px] text-[#9A858B]">
                Search by name, category and location.
              </p>
            </div>
          </div>

          {hasFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="inline-flex items-center gap-1.5 self-start rounded-full border border-[#EBD8DC] px-3 py-1.5 text-[11px] font-semibold text-[#772D43] transition-colors hover:bg-[#FBF1F2] sm:self-auto"
            >
              <FiX className="size-3.5" />
              Clear all
            </button>
          )}
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* Search */}
          <div className="min-w-0">
            <label
              htmlFor="service-search"
              className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.1em] text-[#8B767C]"
            >
              Search
            </label>

            <div className="relative">
              <FiSearch className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-[#B39CA1]" />

              <input
                id="service-search"
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search service name..."
                className="h-11 w-full rounded-xl border border-[#EDDEE0] bg-[#FFFCFC] pl-10 pr-4 text-sm text-[#332229] outline-none transition-all placeholder:text-[#B7A4A9] focus:border-[#B76E79] focus:bg-white focus:ring-4 focus:ring-[#B76E79]/10"
              />
            </div>
          </div>

          {/* Category */}
          <div className="min-w-0">
            <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.1em] text-[#8B767C]">
              Category
            </label>

            <Select
              value={category}
              items={categoryItems}
              onValueChange={(value) => setCategory(value as string)}
            >
              <SelectTrigger className="!h-11 !w-full min-w-0 cursor-pointer rounded-xl border border-[#EDDEE0] bg-[#FFFCFC] px-3.5 text-sm text-[#5F4C52] shadow-none outline-none transition-all focus:border-[#B76E79] focus:bg-white focus:ring-4 focus:ring-[#B76E79]/10">
                <SelectValue placeholder="All categories" />
              </SelectTrigger>

              <SelectContent className="rounded-xl border-[#EDDEE0] bg-white p-1 shadow-lg">
                <SelectItem value="all" className={selectItemClass}>
                  All categories
                </SelectItem>

                {categories.map((item) => (
                  <SelectItem key={item} value={item} className={selectItemClass}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Location */}
          <div className="min-w-0">
            <label
              htmlFor="service-location"
              className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.1em] text-[#8B767C]"
            >
              Location
            </label>

            <div className="relative">
              <FiMapPin className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-[#B39CA1]" />

              <input
                id="service-location"
                type="text"
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                placeholder="Search by location..."
                className="h-11 w-full rounded-xl border border-[#EDDEE0] bg-[#FFFCFC] pl-10 pr-4 text-sm text-[#332229] outline-none transition-all placeholder:text-[#B7A4A9] focus:border-[#B76E79] focus:bg-white focus:ring-4 focus:ring-[#B76E79]/10"
              />
            </div>
          </div>

          {/* Sort */}
          <div className="min-w-0">
            <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.1em] text-[#8B767C]">
              Sort by price
            </label>

            <Select
              value={sort}
              items={sortItems}
              onValueChange={(value) => setSort(value as string)}
            >
              <SelectTrigger className="!h-11 !w-full min-w-0 cursor-pointer rounded-xl border border-[#EDDEE0] bg-[#FFFCFC] px-3.5 text-sm text-[#5F4C52] shadow-none outline-none transition-all focus:border-[#B76E79] focus:bg-white focus:ring-4 focus:ring-[#B76E79]/10">
                <SelectValue placeholder="Recommended" />
              </SelectTrigger>

              <SelectContent className="rounded-xl border-[#EDDEE0] bg-white p-1 shadow-lg">
                <SelectItem value="recommended" className={selectItemClass}>
                  Recommended
                </SelectItem>
                <SelectItem value="low" className={selectItemClass}>
                  Price: Low to High
                </SelectItem>
                <SelectItem value="high" className={selectItemClass}>
                  Price: High to Low
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Result summary */}
      <div className="mt-7 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#B76E79]">
            The collection
          </p>
          <h2 className="mt-1 text-xl font-semibold tracking-tight text-[#332229] sm:text-2xl">
            Wedding services
          </h2>
        </div>

        <p className="text-xs text-[#9A858B]">
          Showing{" "}
          <span className="font-semibold text-[#772D43]">
            {filteredServices.length}
          </span>{" "}
          of {services.length} services
        </p>
      </div>

      {/* Cards */}
      {filteredServices.length > 0 ? (
        <div className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredServices.map((service, index) => (
            <motion.div
              key={service._id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.35,
                delay: Math.min(index, 5) * 0.05,
                ease: "easeOut",
              }}
              className="h-full"
            >
              <ServiceCard service={service} />
            </motion.div>
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-5 rounded-3xl border border-dashed border-[#E7CFD4] bg-[#FFF8F7] px-6 py-16 text-center"
        >
          <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-white text-[#B76E79] shadow-sm ring-1 ring-[#F0E1E4]">
            <FiSliders className="size-7" />
          </div>

          <h3 className="mt-5 text-lg font-semibold text-[#332229]">
            {hasFilters
              ? "No services match your filters"
              : "No services are available yet"}
          </h3>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#8B767C]">
            {hasFilters
              ? "Try a different service name, category or location. You can also clear all filters to see every available service."
              : "Approved wedding services will appear here as soon as vendors publish them. Please check back soon."}
          </p>

          {hasFilters ? (
            <button
              type="button"
              onClick={clearFilters}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#772D43] px-5 py-2.5 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-[#5F2034]"
            >
              <FiX className="size-4" />
              Clear all filters
            </button>
          ) : (
            <Link
              href="/services"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#D9BCC2] px-5 py-2.5 text-xs font-semibold text-[#772D43] transition-colors hover:bg-white"
            >
              Check again
            </Link>
          )}
        </motion.div>
      )}
    </div>
  );
}
