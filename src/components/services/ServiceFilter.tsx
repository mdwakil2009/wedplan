"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  FiMapPin,
  FiSearch,
  FiSliders,
  FiX,
  FiArrowDown,
  FiRefreshCw,
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
  hasError?: boolean;
};

const selectItemClass =
  "cursor-pointer rounded-lg text-gray-700 focus:bg-[#B76E79]/10 focus:text-[#965560] data-[highlighted]:bg-[#B76E79]/10 data-[highlighted]:text-[#965560] dark:text-[#F5FAF6] dark:focus:bg-[#3B443D] dark:focus:text-[#D9A58E] dark:data-[highlighted]:bg-[#3B443D] dark:data-[highlighted]:text-[#D9A58E]";

const categories = [
  "Photography & Videography",
  "Wedding Venues",
  "Decoration & Florist",
  "Catering Services",
  "Makeup & Styling",
  "Wedding Fashion",
];

const categoryItems = {
  all: "All categories",
  ...Object.fromEntries(categories.map((item) => [item, item])),
};

const sortItems = {
  recommended: "Recommended",
  low: "Price: Low to High",
  high: "Price: High to Low",
};

const inputClass =
  "h-[50px] w-full rounded-xl border border-white/25 bg-[#24171D]/60 pl-11 pr-4 text-[13px] font-medium text-white outline-none backdrop-blur-md transition-all duration-300 placeholder:font-normal placeholder:text-white/55 hover:border-white/45 hover:bg-[#24171D]/75 focus:border-[#E6B9B5] focus:bg-[#24171D]/80 focus:ring-4 focus:ring-[#E6B9B5]/15";

const selectTriggerClass =
  "!h-[50px] !w-full min-w-0 cursor-pointer rounded-xl border border-white/25 bg-[#24171D]/60 px-3.5 text-[13px] font-medium text-white backdrop-blur-md transition-all duration-300 hover:border-white/45 hover:bg-[#24171D]/75 focus:border-[#E6B9B6] focus:ring-4 focus:ring-[#E6B9B5]/15 [&>svg]:text-white/75";

const labelClass =
  "mb-2.5 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.17em] text-white/90";

export default function ServiceFilter({
  services,
  hasError = false,
}: ServiceFilterProps) {
  const searchParams = useSearchParams();

  const serviceSectionRef = useRef<HTMLDivElement>(null);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(
    searchParams.get("category") || "all",
  );
  const [location, setLocation] = useState("");
  const [sort, setSort] = useState("recommended");

  useEffect(() => {
    const selectedCategory = searchParams.get("category");

    const matchedCategory = categories.find(
      (item) =>
        item.toLowerCase() === (selectedCategory || "").trim().toLowerCase(),
    );

    setCategory(matchedCategory || "all");
  }, [searchParams]);

  useEffect(() => {
    const selectedCategory = searchParams.get("category");

    if (!selectedCategory) return;

    const timer = window.setTimeout(() => {
      serviceSectionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 400);

    return () => window.clearTimeout(timer);
  }, [searchParams]);

  const keyword = search.trim().toLowerCase();
  const locationKeyword = location.trim().toLowerCase();

  let filteredServices = services.filter((service) => {
    const matchesSearch = (service.serviceName || "")
      .toLowerCase()
      .includes(keyword);

    const matchesCategory =
      category === "all" ||
      (service.category || "").trim().toLowerCase() ===
        category.trim().toLowerCase();

    const matchesLocation = (service.location || "")
      .toLowerCase()
      .includes(locationKeyword);

    return matchesSearch && matchesCategory && matchesLocation;
  });

  // Sort services by price
  if (sort === "low") {
    filteredServices = [...filteredServices].sort(
      (first, second) => Number(first.price) - Number(second.price),
    );
  }

  if (sort === "high") {
    filteredServices = [...filteredServices].sort(
      (first, second) => Number(second.price) - Number(first.price),
    );
  }

  const hasFilters =
    search.trim() !== "" ||
    category !== "all" ||
    location.trim() !== "" ||
    sort !== "recommended";

  // Clear all filters
  const clearFilters = () => {
    setSearch("");
    setCategory("all");
    setLocation("");
    setSort("recommended");

    window.history.replaceState(null, "", "/services");
  };

  // Category change
  const handleCategoryChange = (value: string) => {
    setCategory(value);

    const url = new URL(window.location.href);

    if (value === "all") {
      url.searchParams.delete("category");
    } else {
      url.searchParams.set("category", value);
    }

    window.history.replaceState(null, "", url.toString());

    if (value !== "all") {
      window.setTimeout(() => {
        serviceSectionRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    }
  };

  return (
    <div>
      {/* Premium Wedding Search Banner */}
      <section className="relative isolate overflow-hidden bg-[#24151B]">
        <Image
          src="/images/background.photo3.avif"
          alt="Wedding background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        {/* Cinematic Image Overlay */}
        <div className="absolute inset-0 bg-[#211018]/35" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1D1016]/85 via-[#2D1720]/65 to-[#24131B]/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#211319]/55 via-transparent to-[#211319]/20" />

        {/* Soft Decoration */}
        <div className="absolute -left-32 top-0 size-72 rounded-full bg-[#B76E79]/15 blur-[90px]" />
        <div className="absolute -right-24 bottom-0 size-80 rounded-full bg-[#E8C7A9]/10 blur-[100px]" />

        <div className="relative z-10 mx-auto flex min-h-[300px] max-w-7xl items-center px-4 py-12 sm:min-h-[310px] sm:px-6 sm:py-14 lg:min-h-[320px] lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            className="w-full"
          >
            {/* Banner Heading */}
            <div className="mb-7 text-center sm:mb-8">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mb-3 flex items-center justify-center gap-3"
              >
                <span className="h-px w-7 bg-[#E6B9B5]/80" />

                <span className="text-[9px] font-semibold uppercase tracking-[0.28em] text-[#F0C9C5] sm:text-[10px]">
                  Make Your Day Unforgettable
                </span>

                <span className="h-px w-7 bg-[#E6B9B5]/80" />
              </motion.div>

              <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl lg:text-[36px]">
                Find Your Perfect{" "}
                <span className="font-serif font-normal italic text-[#EBC3BD]">
                  Wedding Services
                </span>
              </h1>

              <p className="mx-auto mt-2 max-w-lg text-xs leading-5 text-white/75 sm:text-[13px]">
                Discover trusted professionals to bring your dream wedding to
                life.
              </p>
            </div>

            {/* Search Filters */}
            <div className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-5">
              {/* Search */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.15 }}
                className="min-w-0"
              >
                <label htmlFor="service-search" className={labelClass}>
                  <FiSearch className="size-3.5 text-[#E6B9B5]" />
                  Search Services
                </label>

                <div className="relative">
                  <FiSearch className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-[#E6B9B5]" />

                  <input
                    id="service-search"
                    type="text"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="What are you looking for?"
                    className={inputClass}
                  />
                </div>
              </motion.div>

              {/* Category */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.22 }}
                className="min-w-0"
              >
                <label className={labelClass}>
                  <FiSliders className="size-3.5 text-[#E6B9B5]" />
                  Category
                </label>

                <Select
                  value={category}
                  items={categoryItems}
                  onValueChange={(value) =>
                    handleCategoryChange(value as string)
                  }
                >
                  <SelectTrigger className={selectTriggerClass}>
                    <SelectValue placeholder="All categories" />
                  </SelectTrigger>

                  <SelectContent className="rounded-xl border-[#EDDEE0] bg-white p-1 shadow-xl dark:border-[#414C45] dark:bg-[#29332E]">
                    <SelectItem value="all" className={selectItemClass}>
                      All categories
                    </SelectItem>

                    {categories.map((item) => (
                      <SelectItem
                        key={item}
                        value={item}
                        className={selectItemClass}
                      >
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </motion.div>

              {/* Location */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.29 }}
                className="min-w-0"
              >
                <label htmlFor="service-location" className={labelClass}>
                  <FiMapPin className="size-3.5 text-[#E6B9B5]" />
                  Location
                </label>

                <div className="relative">
                  <FiMapPin className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-[#E6B9B5]" />

                  <input
                    id="service-location"
                    type="text"
                    value={location}
                    onChange={(event) => setLocation(event.target.value)}
                    placeholder="Enter your location"
                    className={inputClass}
                  />
                </div>
              </motion.div>

              {/* Sort */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.36 }}
                className="min-w-0"
              >
                <label className={labelClass}>
                  <FiSliders className="size-3.5 text-[#E6B9B5]" />
                  Sort by Price
                </label>

                <Select
                  value={sort}
                  items={sortItems}
                  onValueChange={(value) => setSort(value as string)}
                >
                  <SelectTrigger className={selectTriggerClass}>
                    <SelectValue placeholder="Recommended" />
                  </SelectTrigger>

                  <SelectContent className="rounded-xl border-[#EDDEE0] bg-white p-1 shadow-xl dark:border-[#414C45] dark:bg-[#29332E]">
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
              </motion.div>
            </div>

            {/* Bottom Hint */}
            <div className="mt-5 flex items-center justify-center gap-2 text-[10px] text-white/65">
              <FiArrowDown className="size-3.5" />
              <span>Explore our collection of wedding professionals</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Service Results */}
      <section
        ref={serviceSectionRef}
        id="service-results"
        className="mx-auto max-w-7xl scroll-mt-24 px-4 pb-16 pt-10 transition-colors duration-300 sm:px-6 sm:pb-20 sm:pt-12 lg:px-8"
      >
        {/* Result Summary */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="flex flex-wrap items-end justify-between gap-3"
        >
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#B76E79] dark:text-[#D9A58E]">
              The Collection
            </p>

            <h2 className="mt-1 text-xl font-semibold tracking-tight text-[#332229] dark:text-[#F5FAF6] sm:text-2xl">
              {category === "all" ? "Wedding Services" : category}
            </h2>
          </div>

          <p className="text-xs text-[#9A858B] dark:text-[#B2BDB5]">
            Showing{" "}
            <span className="font-semibold text-[#772D43] dark:text-[#D9A58E]">
              {filteredServices.length}
            </span>{" "}
            of {services.length} services
          </p>
        </motion.div>

        {/* Service Cards */}
        {filteredServices.length > 0 ? (
          <div className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredServices.map((service, index) => (
              <motion.div
                key={service._id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.45,
                  delay: (index % 3) * 0.08,
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
            className="mt-5 rounded-3xl border border-dashed border-[#E7CFD4] bg-white px-6 py-16 text-center dark:border-[#414C45] dark:bg-[#29332E]"
          >
            <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-[#FFF5F5] text-[#B76E79] dark:bg-[#35413A] dark:text-[#D9A58E]">
              {hasError ? (
                <FiRefreshCw className="size-7" />
              ) : (
                <FiSliders className="size-7" />
              )}
            </div>

            <h3 className="mt-5 text-lg font-semibold text-[#332229] dark:text-[#F5FAF6]">
              {hasError
                ? "Unable to load services"
                : hasFilters
                  ? "No services match your filters"
                  : "No services are available yet"}
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#8B767C] dark:text-[#B2BDB5]">
              {hasError
                ? "Something went wrong while loading wedding services. Please try again."
                : hasFilters
                  ? "Try a different service name, category or location. You can also clear all filters to see every available service."
                  : "Approved wedding services will appear here as soon as vendors publish them. Please check back soon."}
            </p>

            {hasError ? (
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#772D43] px-5 py-2.5 text-xs font-semibold text-white shadow-sm transition-all hover:bg-[#5F2034] dark:bg-[#D9A58E] dark:text-[#1D2421] dark:hover:bg-[#E8B9A5]"
              >
                <FiRefreshCw className="size-3.5" />
                Try Again
              </button>
            ) : hasFilters ? (
              <button
                type="button"
                onClick={clearFilters}
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#772D43] px-5 py-2.5 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-[#5F2034] dark:bg-[#D9A58E] dark:text-[#1D2421] dark:hover:bg-[#E8B9A5]"
              >
                <FiX className="size-4" />
                Clear all filters
              </button>
            ) : (
              <Link
                href="/services"
                className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#D9BCC2] px-5 py-2.5 text-xs font-semibold text-[#772D43] transition-colors hover:bg-[#FFF8F7] dark:border-[#59665D] dark:text-[#D9A58E] dark:hover:bg-[#35413A]"
              >
                Check again
              </Link>
            )}
          </motion.div>
        )}
      </section>
    </div>
  );
}
