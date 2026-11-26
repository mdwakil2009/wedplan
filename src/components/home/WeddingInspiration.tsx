
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";

const inspirations = [
  {
    number: "01",
    title: "Dream Wedding Venues",
    description:
      "Discover extraordinary places where your forever story begins.",
    category: "Wedding Venues",
    image: "/images/photo2.avif",
    href: "/services?category=Wedding%20Venues",
  },
  {
    number: "02",
    title: "Beautiful Moments",
    description:
      "Capture the emotions, laughter and little moments worth remembering.",
    category: "Photography & Videography",
    image: "/images/photo3.avif",
    href: "/services?category=Photography%20%26%20Videography",
  },
  {
    number: "03",
    title: "Elegant Decorations",
    description:
      "Find the perfect details to make your celebration truly unforgettable.",
    category: "Decoration & Florist",
    image: "/images/photo4.avif",
    href: "/services?category=Decoration%20%26%20Florist",
  },
];

export default function WeddingInspiration() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="overflow-hidden bg-white pb-16 pt-8 transition-colors duration-300 dark:bg-[#1D2421] sm:pb-20 sm:pt-10 lg:pb-24 lg:pt-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Centered Heading */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto mb-10 max-w-3xl text-center sm:mb-14 lg:mb-16"
        >
          <div className="mb-5 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-[#B77B65] dark:bg-[#D9A58E]" />

            <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#B77B65] dark:text-[#D9A58E] sm:text-[11px]">
              A World of Wedding Inspiration
            </span>

            <span className="h-px w-8 bg-[#B77B65] dark:bg-[#D9A58E]" />
          </div>

          <h2 className="text-3xl font-semibold leading-[1.15] tracking-tight text-[#392B27] dark:text-[#F5FAF6] sm:text-4xl lg:text-[54px]">
            Every Detail Tells
            <br />
            <span className="font-serif font-normal italic text-[#B77B65] dark:text-[#D9A58E]">
              Your Love Story.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#85766F] dark:text-[#B2BDB5] sm:text-[15px]">
            Find inspiration for a celebration that feels beautifully yours.
            Explore stunning venues, unforgettable photography and thoughtful
            details for your special day.
          </p>

          <Link
            href="/services"
            className="group mt-6 inline-flex items-center gap-2 border-b border-[#D9C4B9] pb-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#392B27] transition-all hover:border-[#B77B65] hover:text-[#B77B65] dark:border-[#59665D] dark:text-[#F5FAF6] dark:hover:text-[#D9A58E]"
          >
            Explore All Services
            <FiArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
          </Link>
        </motion.div>

        {/* Inspiration Cards */}
        <div className="grid gap-7 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8">
          {inspirations.map((item, index) => (
            <motion.div
              key={item.number}
              initial={
                shouldReduceMotion ? false : { opacity: 0, y: 35 }
              }
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.7,
                delay: shouldReduceMotion ? 0 : index * 0.13,
              }}
              className={`group min-w-0 ${
                index === 1 ? "lg:mt-12" : index === 2 ? "lg:mt-6" : ""
              }`}
            >
              <Link href={item.href} className="block">
                {/* Image */}
                <div className="relative aspect-[4/4.7] overflow-hidden bg-[#F0EAE5] dark:bg-[#29332E]">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                  />

                  {/* Elegant Image Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/5 to-black/15 transition-all duration-500 group-hover:from-black/75" />

                  {/* Top Details */}
                  <div className="absolute left-5 right-5 top-5 flex items-center justify-between">
                    <span className="flex size-10 items-center justify-center rounded-full border border-white/50 bg-black/10 font-serif text-sm text-white backdrop-blur-sm">
                      {item.number}
                    </span>

                    <span className="border border-white/40 bg-black/10 px-3 py-2 text-[9px] font-medium uppercase tracking-[0.16em] text-white backdrop-blur-sm">
                      WedPlan Inspiration
                    </span>
                  </div>

                  {/* Image Bottom Content */}
                  <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                    <span className="mb-3 inline-block border-b border-[#D9A58E] pb-1 text-[9px] font-semibold uppercase tracking-[0.2em] text-white">
                      {item.category}
                    </span>

                    <div className="flex items-end justify-between gap-3">
                      <h3 className="max-w-[260px] font-serif text-2xl font-medium leading-tight text-white sm:text-[27px]">
                        {item.title}
                      </h3>

                      <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-white/60 text-white transition-all duration-300 group-hover:rotate-45 group-hover:border-white group-hover:bg-white group-hover:text-[#392B27]">
                        <FiArrowUpRight className="size-5" />
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="flex items-center justify-between gap-4 border-b border-[#EAE2DC] py-4 transition-colors duration-300 group-hover:border-[#B77B65] dark:border-[#414C45] dark:group-hover:border-[#D9A58E]">
                  <p className="max-w-sm text-[13px] leading-6 text-[#85766F] dark:text-[#B2BDB5]">
                    {item.description}
                  </p>

                  <span className="shrink-0 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#B77B65] transition-colors group-hover:text-[#392B27] dark:text-[#D9A58E] dark:group-hover:text-white">
                    Discover
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Bottom Statement */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-12 flex flex-col items-center justify-center gap-3 text-center sm:mt-16"
        >
          <span className="h-px w-12 bg-[#B77B65] dark:bg-[#D9A58E]" />

          <p className="font-serif text-lg italic text-[#85766F] dark:text-[#B2BDB5] sm:text-xl">
            The beginning of your forever starts here.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
