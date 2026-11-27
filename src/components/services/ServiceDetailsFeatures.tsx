
"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import {
  FiArrowUpRight,
  FiCalendar,
  FiHeart,
  FiShield,
  FiStar,
} from "react-icons/fi";

const features = [
  {
    number: "01",
    icon: FiShield,
    title: "Trusted Professionals",
    description:
      "Discover verified wedding vendors who bring quality, experience, and care to your special day.",
  },
  {
    number: "02",
    icon: FiCalendar,
    title: "Easy Booking",
    description:
      "Connect with vendors, share your plans, and manage your wedding service requests effortlessly.",
  },
  {
    number: "03",
    icon: FiStar,
    title: "Made for Your Story",
    description:
      "Find beautiful wedding services that match your vision, style, and unforgettable moments.",
  },
];

export default function ServiceDetailsFeatures() {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 16,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.5,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  return (
    <section className="relative mt-8 border-t border-[#F1E8EA] bg-white py-10 dark:border-[#343B37] dark:bg-[#1D2421] sm:mt-10 sm:py-12">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        {/* Heading */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.5 }}
          className="mb-8 text-center sm:mb-10"
        >
          <div className="mb-3 flex items-center justify-center gap-2.5">
            <span className="h-px w-6 bg-[#B77B85]" />

            <span className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[#9A5269] dark:text-[#D9A58E]">
              The WedPlan Difference
            </span>

            <span className="h-px w-6 bg-[#B77B85]" />
          </div>

          <h2 className="font-serif text-2xl font-medium leading-tight text-[#392B32] sm:text-3xl dark:text-[#F5FAF6]">
            Planning made
            <span className="ml-2 italic text-[#9A5269] dark:text-[#D9A58E]">
              beautifully simple.
            </span>
          </h2>

          <p className="mx-auto mt-3 max-w-md text-[12px] leading-6 text-[#8B767C] dark:text-[#B2BDB5]">
            Everything you need to create a wedding that feels truly yours.
          </p>
        </motion.div>

        {/* Features */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={feature.number}
                variants={itemVariants}
                className={`group px-3 py-5 sm:px-6 md:px-7 ${
                  index !== 0
                    ? "border-t border-[#F0E6E9] md:border-t-0 md:border-l dark:border-[#3B443F]"
                    : ""
                }`}
              >
                {/* Icon & Number */}
                <div className="flex items-center gap-3">
                  <motion.div
                    whileHover={
                      shouldReduceMotion
                        ? undefined
                        : { rotate: -6, scale: 1.06 }
                    }
                    transition={{ duration: 0.25 }}
                    className="flex size-10 items-center justify-center rounded-full bg-[#FBF4F6] text-[#9A5269] transition-colors duration-300 group-hover:bg-[#772D43] group-hover:text-white dark:bg-[#362B30] dark:text-[#D9A58E] dark:group-hover:bg-[#9A5269]"
                  >
                    <Icon className="size-[17px]" strokeWidth={1.6} />
                  </motion.div>

                  <span className="font-serif text-xs italic text-[#B9A1A8] dark:text-[#A98A95]">
                    {feature.number}
                  </span>
                </div>

                {/* Content */}
                <div className="mt-4">
                  <h3 className="font-serif text-[19px] font-medium text-[#392B32] transition-colors duration-300 group-hover:text-[#772D43] dark:text-[#F5FAF6] dark:group-hover:text-[#D9A58E]">
                    {feature.title}
                  </h3>

                  <p className="mt-2 max-w-sm text-[12px] leading-6 text-[#8B767C] dark:text-[#B2BDB5]">
                    {feature.description}
                  </p>
                </div>

                {/* Accent */}
                <div className="mt-4 flex items-center gap-2">
                  <span className="h-px w-5 bg-[#D8B7C1] transition-all duration-300 group-hover:w-9 group-hover:bg-[#9A5269]" />
                  <span className="text-[9px] uppercase tracking-[0.12em] text-[#B09AA1] dark:text-[#A98A95]">
                    WedPlan Promise
                  </span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom Message */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.45 }}
          className="mt-7 flex flex-col items-center justify-center gap-3 border-t border-[#F1E8EA] pt-6 dark:border-[#343B37]"
        >
          <div className="flex items-center gap-2">
            <FiHeart className="size-3.5 text-[#B77B85]" />

            <p className="font-serif text-xs italic text-[#87777B] dark:text-[#B2BDB5]">
              Every little detail, a beautiful beginning.
            </p>
          </div>

          <Link
            href="/services"
            className="group inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#772D43] transition-colors hover:text-[#9A5269] dark:text-[#D9A58E] dark:hover:text-[#EBC2CE]"
          >
            Explore More Services
            <FiArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
