import Image from "next/image";
import Link from "next/link";
import {
  FiArrowUpRight,
  FiCheckCircle,
  FiImage,
  FiMapPin,
  FiTag,
  FiUser,
} from "react-icons/fi";

import type { Service } from "@/lib/types/service";

export default function ServiceCard({ service }: { service: Service }) {
  const image = service.images?.[0];
  const price = Number(service.price || 0);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#F0E1E4] bg-white shadow-[0_10px_30px_rgba(72,31,44,0.05)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#DDBEC4] hover:shadow-[0_24px_48px_rgba(72,31,44,0.12)]">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-[#F7EDEE]">
        {image ? (
          <Image
            src={image}
            alt={service.serviceName || "Wedding service"}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-2 text-[#B39CA1]">
            <FiImage className="size-7" />
            <span className="text-xs">No image available</span>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-[#2D111B]/45 via-transparent to-transparent" />

        <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#772D43] shadow-sm backdrop-blur-sm">
          <FiTag className="size-3" />
          {service.category}
        </span>

        <span className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-[#2D111B]/70 px-2.5 py-1.5 text-[10px] font-semibold text-white backdrop-blur-sm">
          <FiCheckCircle className="size-3 text-[#F0C9CF]" />
          Approved
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="line-clamp-2 text-lg font-semibold leading-snug tracking-tight text-[#332229]">
            {service.serviceName}
          </h3>

          <div className="shrink-0 text-right">
            <p className="text-[10px] uppercase tracking-[0.1em] text-[#A38E94]">
              From
            </p>
            <p className="mt-0.5 text-lg font-bold text-[#772D43]">
              ৳{price.toLocaleString("en-US")}
            </p>
          </div>
        </div>

        <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#8B767C]">
          {service.description}
        </p>

        <div className="mt-4 flex flex-col gap-2 text-xs text-[#7C686E]">
          <span className="inline-flex items-center gap-1.5">
            <FiMapPin className="size-3.5 shrink-0 text-[#B76E79]" />
            <span className="truncate">{service.location}</span>
          </span>

          <span className="inline-flex min-w-0 items-center gap-1.5">
            <FiUser className="size-3.5 shrink-0 text-[#B76E79]" />
            <span className="truncate" title={service.userEmail}>
              {service.userEmail}
            </span>
          </span>
        </div>

        <div className="mt-auto flex items-center justify-between gap-3 border-t border-[#F6ECEE] pt-4">
          <span className="text-[10px] font-medium uppercase tracking-[0.08em] text-[#A38E94]">
            Verified vendor
          </span>

          <Link
            href={`/services/${service._id}`}
            className="inline-flex items-center gap-1.5 rounded-full bg-[#772D43] px-4 py-2 text-[11px] font-semibold text-white transition-colors hover:bg-[#5F2034] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B76E79]/50"
          >
            View Details
            <FiArrowUpRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
