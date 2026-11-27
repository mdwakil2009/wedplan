"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  FiSearch,
  FiMessageCircle,
  FiCheckCircle,
  FiHeart,
  FiArrowRight,
} from "react-icons/fi";

const steps = [
  {
    number: "01",
    label: "DISCOVER",
    icon: FiSearch,
    title: "Explore Services",
    description:
      "Discover beautiful wedding services and find talented professionals who understand your vision.",
  },
  {
    number: "02",
    label: "CONNECT",
    icon: FiMessageCircle,
    title: "Request a Booking",
    description:
      "Choose your favorite vendor, share your event details and send your booking request with ease.",
  },
  {
    number: "03",
    label: "CELEBRATE",
    icon: FiCheckCircle,
    title: "Enjoy Your Journey",
    description:
      "Track your booking, receive updates and get one step closer to your dream wedding.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.18,
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
      duration: 0.7,
      ease: "easeOut" as const,
    },
  },
};

export default function HowWedPlanWorks() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative isolate overflow-hidden bg-white px-5 pt-6 pb-12 transition-colors duration-500 dark:bg-[#1D2421] sm:pt-8 sm:pb-14 lg:pt-10 lg:pb-16">
      {/* Background Decorations */}
      <div className="pointer-events-none absolute -right-40 -top-40 -z-10 size-[420px] rounded-full border border-[#B77B65]/10 dark:border-[#D9A58E]/10" />

      <div className="pointer-events-none absolute -right-24 -top-24 -z-10 size-[300px] rounded-full border border-[#B77B65]/10 dark:border-[#D9A58E]/10" />

      <div className="pointer-events-none absolute -bottom-48 -left-40 -z-10 size-[450px] rounded-full border border-[#B77B65]/10 dark:border-[#D9A58E]/10" />

      <div className="relative mx-auto max-w-7xl">
        {/* Heading */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="mx-auto mb-14 max-w-2xl text-center sm:mb-16 lg:mb-20"
        >
          <div className="mb-5 inline-flex items-center gap-2">
            <span className="h-px w-7 bg-[#D9A58E]" />

            <FiHeart className="size-3.5 text-[#B77B65] dark:text-[#D9A58E]" />

            <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#A17B61] dark:text-[#D9A58E]">
              A Beautifully Simple Journey
            </span>

            <span className="h-px w-7 bg-[#D9A58E]" />
          </div>

          <h2 className="font-serif text-2xl font-medium leading-tight tracking-tight text-[#392B27] dark:text-[#F5FAF6] sm:text-4xl md:text-5xl lg:text-[56px]">
            How Your Wedding
            <br />
            <span className="italic text-[#B77B65] dark:text-[#D9A58E]">
              Comes Together
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-lg text-xs leading-7 text-[#85766F] dark:text-[#B2BDB5] sm:text-sm sm:leading-8">
            From the first little idea to the big celebration, let WedPlan make
            every step of your wedding journey effortless.
          </p>
        </motion.div>

        {/* Steps */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="relative grid gap-12 md:grid-cols-3 md:gap-8"
        >
          {/* Connecting Line */}
          <div className="pointer-events-none absolute left-[16.5%] right-[16.5%] top-[47px] hidden items-center md:flex">
            <div className="h-px w-full border-t border-dashed border-[#D9A58E]/60 dark:border-[#D9A58E]/35" />
          </div>

          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <motion.div
                key={step.number}
                variants={itemVariants}
                className="group relative text-center"
              >
                {/* Icon */}
                <div className="relative z-10 mx-auto mb-7 flex size-[88px] items-center justify-center rounded-full border border-[#EAD8CF] bg-[#FFFAF8] transition-all duration-500 group-hover:scale-105 group-hover:border-[#B77B65] group-hover:bg-[#F8EEE8] dark:border-[#59665D] dark:bg-[#29332E] dark:group-hover:border-[#D9A58E] dark:group-hover:bg-[#35413A] sm:size-[96px]">
                  <div className="flex size-[66px] items-center justify-center rounded-full bg-white shadow-[0_4px_20px_rgba(87,43,35,0.06)] transition-transform duration-500 group-hover:rotate-[-7deg] dark:bg-[#35413A] sm:size-[72px]">
                    <Icon
                      className="size-7 text-[#B77B65] transition-transform duration-500 group-hover:scale-110 dark:text-[#D9A58E] sm:size-8"
                      strokeWidth={1.4}
                    />
                  </div>

                  {/* Number */}
                  <span className="absolute -right-1 -top-1 flex size-7 items-center justify-center rounded-full border-[3px] border-white bg-[#B77B65] font-sans text-[9px] font-semibold text-white shadow-sm dark:border-[#1D2421] dark:bg-[#D9A58E] dark:text-[#1D2421]">
                    {step.number}
                  </span>
                </div>

                {/* Step Label */}
                <p className="mb-3 text-[9px] font-semibold uppercase tracking-[0.25em] text-[#B77B65] dark:text-[#D9A58E]">
                  {step.label}
                </p>

                {/* Title */}
                <h3 className="font-serif text-xl font-medium text-[#392B27] transition-colors duration-300 group-hover:text-[#A96D58] dark:text-[#F5FAF6] dark:group-hover:text-[#D9A58E] sm:text-2xl">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="mx-auto mt-3 max-w-[290px] text-xs leading-7 text-[#85766F] dark:text-[#B2BDB5] sm:text-[13px]">
                  {step.description}
                </p>

                {/* Bottom Ornament */}
                <div className="mt-6 flex items-center justify-center gap-2">
                  <span className="h-px w-7 bg-[#EAD8CF] transition-all duration-300 group-hover:w-10 group-hover:bg-[#B77B65] dark:bg-[#46534B] dark:group-hover:bg-[#D9A58E]" />

                  <span className="size-1.5 rotate-45 bg-[#D9A58E]" />

                  <span className="h-px w-7 bg-[#EAD8CF] transition-all duration-300 group-hover:w-10 group-hover:bg-[#B77B65] dark:bg-[#46534B] dark:group-hover:bg-[#D9A58E]" />
                </div>

                {/* Mobile Connector */}
                {index !== steps.length - 1 && (
                  <div className="absolute -bottom-9 left-1/2 flex -translate-x-1/2 items-center justify-center text-[#D9A58E] md:hidden">
                    <FiArrowRight className="rotate-90 size-4" />
                  </div>
                )}
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom Message */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-14 text-center sm:mt-16"
        >
          <p className="font-serif text-lg font-light italic leading-relaxed tracking-[0.04em] text-[#8D6E61] dark:text-[#D9A58E] sm:text-xl">
            Where every detail becomes
            <span className="ml-1 font-semibold n text-[#B77B65] dark:text-[#F0C5AD]">
              a timeless memory.
            </span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
