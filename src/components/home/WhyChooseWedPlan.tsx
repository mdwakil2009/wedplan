
"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  FiShield,
  FiHeart,
  FiUsers,
  FiCalendar,
  FiArrowUpRight,
  FiStar,
} from "react-icons/fi";

const benefits = [
  {
    icon: FiShield,
    title: "Trusted Professionals",
    description:
      "Discover trusted wedding professionals whose services are reviewed before appearing on the platform.",
  },
  {
    icon: FiHeart,
    title: "Everything in One Place",
    description:
      "Explore venues, photography, decoration, catering, makeup and more in one convenient place.",
  },
  {
    icon: FiCalendar,
    title: "Easy Booking Management",
    description:
      "Send booking requests and conveniently track their status from your personal dashboard.",
  },
  {
    icon: FiUsers,
    title: "Made for Everyone",
    description:
      "A convenient platform for couples, wedding vendors and administrators to manage their work.",
  },
];

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
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const,
    },
  },
};

export default function WhyChooseWedPlan() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-white px-5 pt-5 pb-14 transition-colors duration-300 dark:bg-[#1D2421] sm:px-8 sm:pt-7 sm:pb-16 md:pt-9 md:pb-20">
      {/* Background Decorations */}
      <div className="pointer-events-none absolute -left-40 top-10 h-[350px] w-[350px] rounded-full bg-[#EAD8CB]/25 blur-[110px] dark:bg-[#B77B65]/10" />

      <div className="pointer-events-none absolute -right-40 bottom-0 h-[350px] w-[350px] rounded-full bg-[#DCC3B0]/20 blur-[110px] dark:bg-[#D9A58E]/10" />

      <div className="relative mx-auto max-w-7xl">
        {/* Section Heading */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.65 }}
          className="mx-auto mb-10 max-w-2xl text-center md:mb-14"
        >
          <div className="mb-4 inline-flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-[#C8A48D] dark:bg-[#D9A58E]/60" />

            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#B77B65] dark:text-[#D9A58E] sm:text-xs">
              The WedPlan Difference
            </p>

            <span className="h-px w-8 bg-[#C8A48D] dark:bg-[#D9A58E]/60" />
          </div>

          <h2 className="font-serif text-3xl font-medium leading-[1.2] text-[#392B27] dark:text-[#F5FAF6] sm:text-4xl md:text-5xl">
            More Than Planning,
            <br />
            <span className="italic text-[#B77B65] dark:text-[#D9A58E]">
              It's Your Love Story.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#85766F] dark:text-[#B2BDB5] sm:text-base">
            Every little detail matters when it comes to your big day.
            WedPlan brings everything together to make your wedding
            planning journey simple, organized and memorable.
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <motion.div
          variants={shouldReduceMotion ? {} : containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {benefits.map((benefit) => {
            const Icon = benefit.icon;

            return (
              <motion.div
                key={benefit.title}
                variants={shouldReduceMotion ? {} : itemVariants}
                className="group relative flex min-h-[290px] flex-col overflow-hidden border border-[#E9DED4] bg-white p-6 transition-all duration-500 hover:-translate-y-1.5 hover:border-[#C69A82] hover:shadow-[0_18px_45px_rgba(57,43,39,0.08)] dark:border-[#414C45] dark:bg-[#29332E] dark:hover:border-[#D9A58E] dark:hover:shadow-[0_18px_45px_rgba(0,0,0,0.2)] sm:p-7"
              >
                {/* Top Accent Line */}
                <div className="absolute left-0 top-0 h-[2px] w-0 bg-[#B77B65] transition-all duration-500 group-hover:w-full dark:bg-[#D9A58E]" />

                {/* Icon */}
                <div className="relative mb-8 flex h-14 w-14 items-center justify-center border border-[#EAD8CB] bg-[#FBF5F0] text-[#B77B65] transition-all duration-500 group-hover:border-[#B77B65] group-hover:bg-[#B77B65] group-hover:text-white dark:border-[#414C45] dark:bg-[#35413A] dark:text-[#D9A58E] dark:group-hover:border-[#D9A58E] dark:group-hover:bg-[#D9A58E] dark:group-hover:text-[#1D2421]">
                  <Icon size={24} strokeWidth={1.5} />
                </div>

                {/* Content */}
                <h3 className="font-serif text-xl font-medium leading-snug text-[#392B27] transition-colors duration-300 group-hover:text-[#A66F59] dark:text-[#F5FAF6] dark:group-hover:text-[#D9A58E]">
                  {benefit.title}
                </h3>

                <p className="mt-3 text-[13px] leading-7 text-[#85766F] dark:text-[#B2BDB5]">
                  {benefit.description}
                </p>

                {/* Bottom Arrow */}
                <div className="mt-auto mt-7 flex items-center justify-between border-t border-[#F0E9E2] pt-5 dark:border-[#414C45]">
                  <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-[#B9A99C] dark:text-[#9BA99F]">
                    Why WedPlan
                  </span>

                  <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#E9DED4] text-[#B77B65] transition-all duration-300 group-hover:border-[#B77B65] group-hover:bg-[#B77B65] group-hover:text-white dark:border-[#414C45] dark:text-[#D9A58E] dark:group-hover:border-[#D9A58E] dark:group-hover:bg-[#D9A58E] dark:group-hover:text-[#1D2421]">
                    <FiArrowUpRight
                      size={16}
                      className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom Highlight */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-12 flex flex-col items-center justify-center gap-3 text-center md:mt-14"
        >
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-[#D8C2B1] dark:bg-[#D9A58E]/50" />

            <FiStar className="text-[#B77B65] dark:text-[#D9A58E]" size={16} />

            <span className="h-px w-8 bg-[#D8C2B1] dark:bg-[#D9A58E]/50" />
          </div>

          <p className="font-serif text-base italic text-[#85766F] dark:text-[#B2BDB5] sm:text-lg">
            Thoughtful planning starts with finding the right people.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
