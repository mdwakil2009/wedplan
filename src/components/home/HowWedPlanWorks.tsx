
"use client";

import { motion } from "framer-motion";
import {
  FiSearch,
  FiCheckCircle,
  FiMessageCircle,
} from "react-icons/fi";

const steps = [
  {
    number: "01",
    icon: FiSearch,
    title: "Explore Services",
    description:
      "Browse wedding services and discover the professionals that match your needs.",
  },
  {
    number: "02",
    icon: FiMessageCircle,
    title: "Request a Booking",
    description:
      "Choose your preferred service, share your event details and submit a booking request.",
  },
  {
    number: "03",
    icon: FiCheckCircle,
    title: "Manage Your Booking",
    description:
      "Track your booking status and stay updated as the vendor responds to your request.",
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

export default function HowWedPlanWorks() {
  return (
<section className="relative overflow-hidden bg-[#FFFFFF] px-5 pt-2 pb-12 sm:pt-3 sm:pb-14 md:pt-4 md:pb-16">

      {/* Background Decorations */}
      <div className="pointer-events-none absolute -right-32 -top-32 h-72 w-72 rounded-full border border-[#B77B65]/10" />
      <div className="pointer-events-none absolute -bottom-40 -left-32 h-80 w-80 rounded-full border border-[#B77B65]/10" />

      <div className="relative mx-auto max-w-7xl">

        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="mx-auto mb-10 max-w-2xl text-center md:mb-12"
        >
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#B77B65] sm:text-xs">
            Your Journey Starts Here
          </p>

          <h2 className="font-serif text-3xl font-medium leading-tight text-[#392B27] sm:text-4xl md:text-5xl">
            How WedPlan{" "}
            <span className="italic text-[#B77B65]">Works</span>
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-xs leading-6 text-[#85766F] sm:text-sm sm:leading-7">
            From discovering the perfect service to managing your booking,
            we make your wedding planning journey easier.
          </p>
        </motion.div>

        {/* Steps */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 gap-9 md:grid-cols-3 md:gap-7"
        >
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <motion.div
                key={step.number}
                variants={itemVariants}
                className="relative text-center"
              >
                {/* Icon */}
                <div className="relative mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-[#D9A58E]/50 bg-[#FBF5F0] transition-all duration-300 hover:border-[#B77B65] hover:bg-[#F5E9E1] sm:h-[70px] sm:w-[70px]">
                  <Icon
                    size={25}
                    strokeWidth={1.4}
                    className="text-[#B77B65]"
                  />

                  <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-[#B77B65] text-[9px] font-semibold text-white">
                    {step.number}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-serif text-xl font-medium text-[#392B27] sm:text-2xl">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="mx-auto mt-3 max-w-xs text-xs leading-6 text-[#85766F] sm:text-sm sm:leading-7">
                  {step.description}
                </p>

                {/* Connecting Line */}
                {index !== steps.length - 1 && (
                  <div className="absolute left-[calc(50%+58px)] top-8 hidden w-[calc(100%-75px)] border-t border-dashed border-[#D9A58E]/60 md:block" />
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
