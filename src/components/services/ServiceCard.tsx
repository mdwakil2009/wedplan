
import Image from "next/image";
import Link from "next/link";
import { FiArrowUpRight, FiCheck, FiImage, FiMapPin } from "react-icons/fi";

import type { Service } from "@/lib/types/service";

export default function ServiceCard({ service }: { service: Service }) {
  const image = service.images?.[0];
  const price = Number(service.price || 0);
  const href = `/services/${service._id}`;

  return (
    <article className="group relative flex h-full min-w-0 flex-col overflow-hidden rounded-xl border border-[#EFE3E3] bg-white transition duration-300 ease-out hover:-translate-y-1 hover:border-[#B99576]/70 hover:shadow-[0_16px_35px_rgba(57,43,50,0.09)] focus-within:border-[#772D43] motion-reduce:transform-none motion-reduce:transition-none dark:border-[#38433D] dark:bg-[#242D29] dark:hover:border-[#B99576]/70 dark:hover:shadow-[0_16px_35px_rgba(0,0,0,0.25)] dark:focus-within:border-[#E8C7D1]"
    >
      {/* Image */}
      <div className="p-2 pb-0">
        <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-[#FBF8F4] dark:bg-[#2E3833]">
          {image ? (
            <Image
              src={image}
              alt={service.serviceName || "Wedding service"}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition duration-700 ease-out group-hover:scale-105 motion-reduce:transform-none motion-reduce:transition-none dark:brightness-90 dark:group-hover:brightness-100"
            />
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-2 text-[#9A5269] dark:text-[#E8C7D1]">
              <FiImage aria-hidden="true" className="size-5" />
              <span className="font-serif text-xs italic">
                No image available
              </span>
            </div>
          )}

          <span className="absolute bottom-2.5 left-2.5 inline-flex items-center gap-1 bg-white/95 px-2.5 py-1.5 text-[9px] font-semibold uppercase tracking-[0.15em] text-[#772D43] dark:bg-[#1D2421]/90 dark:text-[#E8C7D1]">
            <FiCheck aria-hidden="true" className="size-3" />
            Approved
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col px-4 pb-3.5 pt-4 sm:px-5">
        {service.category && (
          <p className="flex items-center gap-2.5 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#9A5269] dark:text-[#E8C7D1]">
            <span aria-hidden="true" className="h-px w-5 shrink-0 bg-[#B99576]" />
            <span className="min-w-0 truncate">{service.category}</span>
          </p>
        )}

        <h3 className="mt-2.5 line-clamp-2 break-words font-serif text-xl font-normal leading-[1.3] tracking-tight text-[#392B32] dark:text-[#F7F0F2]">
          <Link
            href={href}
            className="transition-colors duration-300 hover:text-[#772D43] focus-visible:underline focus-visible:underline-offset-4 focus-visible:outline-none dark:hover:text-[#E8C7D1]"
          >
            {service.serviceName}
          </Link>
        </h3>

        {service.description && (
          <p className="mt-2 line-clamp-2 text-xs leading-5 text-[#7D696F] dark:text-[#BCC5BF]">
            {service.description}
          </p>
        )}

        {service.location && (
          <p className="mt-2.5 flex items-center gap-2 text-[11px] text-[#7D696F] dark:text-[#BCC5BF]">
            <FiMapPin
              aria-hidden="true"
              className="size-3.5 shrink-0 text-[#9A5269] dark:text-[#E8C7D1]"
            />
            <span className="min-w-0 truncate" title={service.location}>
              {service.location}
            </span>
          </p>
        )}

        {/* Footer */}
        <div className="mt-auto pt-4">
          {/* Vendor */}
          <div className="border-t border-[#E8C7D1]/70 py-3 dark:border-[#3D4842]">
            <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#7D696F] dark:text-[#BCC5BF]">
              Verified vendor
            </p>

            {service.userEmail && (
              <p
                className="mt-1 truncate text-[11px] text-[#392B32] dark:text-[#F7F0F2]"
                title={service.userEmail}
              >
                {service.userEmail}
              </p>
            )}
          </div>

          {/* Price and CTA */}
          <div className="flex flex-wrap items-end justify-between gap-2 border-t border-[#E8C7D1]/70 pt-3 dark:border-[#3D4842]">
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.17em] text-[#7D696F] dark:text-[#BCC5BF]">
                Starting from
              </p>

              <p className="mt-0.5 font-serif text-xl text-[#772D43] dark:text-[#E8C7D1]">
                ৳{price.toLocaleString("en-US")}
              </p>
            </div>

            <Link
              href={href}
              aria-label={`View details: ${service.serviceName}`}
              className="group/cta ml-auto inline-flex min-h-9 items-center gap-2 rounded-md bg-[#772D43] px-3 text-[9px] font-semibold uppercase tracking-[0.13em] text-white transition-colors duration-300 hover:bg-[#9A5269] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#772D43] dark:bg-[#E8C7D1] dark:text-[#392B32] dark:hover:bg-white dark:focus-visible:outline-[#E8C7D1]"
            >
              View Details
              <FiArrowUpRight
                aria-hidden="true"
                className="size-3.5 transition-transform duration-300 group-hover/cta:-translate-y-0.5 group-hover/cta:translate-x-0.5 motion-reduce:transform-none motion-reduce:transition-none"
              />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
