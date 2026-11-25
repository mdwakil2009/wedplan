
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { FiArrowUpRight, FiHeart, FiArrowDown } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

const ease = [0.22, 1, 0.36, 1] as const;

// Parent animation
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.16,
      delayChildren: 0.25,
    },
  },
};

// Child animation
const itemVariants = {
  hidden: {
    opacity: 0,
    y: 24,
    filter: "blur(5px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease,
    },
  },
};

export default function HeroBanner() {
  const router = useRouter();
  const shouldReduceMotion = useReducedMotion();

  // Session Hook must be inside the component
  const { data: session, isPending } = authClient.useSession();

  const animationDuration = shouldReduceMotion ? 0 : 1;

  return (
    <section className="relative isolate min-h-[400px] w-full overflow-hidden bg-[#342921] dark:bg-[#1D2421] sm:min-h-[440px] lg:min-h-[min(600px,calc(100svh-68px))]">
      {/* Background Image */}
      <motion.div
        initial={shouldReduceMotion ? false : { scale: 1.12, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          duration: shouldReduceMotion ? 0 : 2,
          ease,
        }}
        className="absolute inset-0 -z-30"
      >
        <Image
          src="/images/background photo.jpg"
          alt="Beautiful outdoor wedding celebration"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>

      {/* Cinematic Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: animationDuration === 0 ? 0 : 1.4,
        }}
        className="absolute inset-0 -z-20 bg-black/15"
      />

      {/* Left Gradient */}
      <div className="absolute inset-0 -z-20 bg-gradient-to-r from-[#211912]/75 via-[#211912]/50 to-[#211912]/10" />

      {/* Bottom Gradient */}
      <div className="absolute inset-0 -z-20 bg-gradient-to-t from-[#211912]/45 via-transparent to-[#211912]/10" />

      {/* Main Content */}
      <div className="relative mx-auto flex min-h-[400px] w-full max-w-[1600px] items-center px-5 py-8 sm:min-h-[440px] sm:px-8 lg:min-h-[min(600px,calc(100svh-68px))] lg:px-14 xl:px-20">
        <div className="grid w-full grid-cols-1 items-center gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
          {/* LEFT CONTENT */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="relative z-10 max-w-[650px]"
          >
            {/* Eyebrow */}
            <motion.div
              variants={itemVariants}
              className="mb-4 flex items-center gap-3"
            >
              <motion.span
                initial={shouldReduceMotion ? false : { width: 0 }}
                animate={{ width: 36 }}
                transition={{
                  duration: shouldReduceMotion ? 0 : 0.8,
                  delay: shouldReduceMotion ? 0 : 0.5,
                }}
                className="h-px bg-[#D9AD91]"
              />

              <span className="text-[9px] font-medium uppercase tracking-[2.5px] text-[#F0D4C0] sm:text-[10px]">
                The Beginning of Forever
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              variants={itemVariants}
              className="text-[clamp(2.5rem,4.8vw,4.8rem)] font-medium leading-[1.02] tracking-[-0.055em] text-[#FAF7F2]"
            >
              Your Day.
              <br />
              Your Story.
              <span className="mt-1 block font-serif font-normal italic tracking-[-0.04em] text-[#E3BDA2]">
                Beautifully
                <br className="hidden sm:block" /> Unforgettable.
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="mt-4 max-w-[430px] text-xs leading-6 text-white/85 sm:text-sm sm:leading-7"
            >
              From the first spark of an idea to your final dance, discover
              everything you need to turn your dream wedding into a celebration
              that feels uniquely yours.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="mt-5 flex flex-wrap items-center gap-3"
            >
              <motion.div
                whileHover={shouldReduceMotion ? undefined : { y: -4 }}
                whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
                transition={{ duration: 0.25 }}
              >
                <Link
                  href="/services"
                  className="group inline-flex h-11 items-center justify-center gap-3 bg-[#E5C1A9] px-5 text-[9px] font-semibold uppercase tracking-[1.2px] text-[#211912] transition-colors duration-300 hover:bg-white sm:px-7 sm:text-[10px]"
                >
                  Explore Services
                  <FiArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </Link>
              </motion.div>

              <motion.div
                whileHover={shouldReduceMotion ? undefined : { y: -4 }}
                whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
                transition={{ duration: 0.25 }}
              >
                <button
                  type="button"
                  onClick={() => {
                    if (!isPending && !session) {
                      router.push("/sign-in");
                    }
                  }}
                  disabled={isPending || !!session}
                  className="group inline-flex h-11 items-center gap-3 border border-white/50 px-5 text-[9px] font-medium uppercase tracking-[1.2px] text-white transition-colors duration-300 hover:border-white hover:bg-white/15 disabled:cursor-default sm:px-7 sm:text-[10px]"
                >
                  Start Your Journey
                  <FiArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </button>
              </motion.div>
            </motion.div>

            {/* Signature */}
            <motion.div
              variants={itemVariants}
              className="mt-5 flex items-center gap-3"
            >
              <motion.span
                animate={
                  shouldReduceMotion ? undefined : { scale: [1, 1.2, 1] }
                }
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <FiHeart className="size-3 text-[#E3BDA2]" />
              </motion.span>

              <span className="text-[8px] uppercase tracking-[1.8px] text-white/70 sm:text-[9px]">
                Made for moments that last forever
              </span>
            </motion.div>
          </motion.div>

          {/* RIGHT EDITORIAL CARD */}
          <motion.div
            initial={
              shouldReduceMotion
                ? false
                : {
                    opacity: 0,
                    x: 45,
                    y: 20,
                    scale: 0.94,
                  }
            }
            animate={{
              opacity: 1,
              x: 0,
              y: 0,
              scale: 1,
            }}
            transition={{
              duration: shouldReduceMotion ? 0 : 1.1,
              delay: shouldReduceMotion ? 0 : 0.55,
              ease,
            }}
            className="relative hidden justify-end lg:flex"
          >
            {/* Decorative Accent */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: shouldReduceMotion ? 0 : 1,
                delay: shouldReduceMotion ? 0 : 1,
              }}
              className="absolute -right-4 -top-4 h-20 w-20 border-r border-t border-[#E5C1A9]/70"
            />

            {/* Card */}
            <motion.div
              whileHover={shouldReduceMotion ? undefined : { y: -5 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="relative w-full max-w-[320px] border border-white/35 bg-[#F8F3EC]/15 p-2.5 shadow-[0_20px_60px_rgba(0,0,0,0.18)] backdrop-blur-[5px]"
            >
              {/* Card Header */}
              <div className="flex items-center justify-between px-2 py-2">
                <div>
                  <p className="text-[8px] font-medium uppercase tracking-[2px] text-[#E8C9B2]">
                    The Wedding Edit
                  </p>

                  <p className="mt-1 font-serif text-xs italic text-white/85">
                    A collection of beautiful moments
                  </p>
                </div>

                <span className="font-serif text-xs italic text-[#E8C9B2]">
                  01
                </span>
              </div>

              {/* Card Image */}
              <div className="relative h-[170px] w-full overflow-hidden xl:h-[185px]">
                <motion.div
                  className="absolute inset-0"
                  whileHover={shouldReduceMotion ? undefined : { scale: 1.08 }}
                  transition={{
                    duration: 0.7,
                    ease: "easeOut",
                  }}
                >
                  <Image
                    src="/images/background.photo7.avif"
                    alt="Elegant wedding decoration"
                    fill
                    sizes="(min-width: 1024px) 320px, 100vw"
                    className="object-cover object-center"
                  />
                </motion.div>

                <div className="pointer-events-none absolute inset-0 bg-black/10" />

                <motion.div
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: shouldReduceMotion ? 0 : 1.2,
                    duration: shouldReduceMotion ? 0 : 0.6,
                  }}
                  className="absolute bottom-3 left-3 border border-white/50 bg-black/35 px-2.5 py-1.5 backdrop-blur-sm"
                >
                  <span className="text-[8px] font-medium uppercase tracking-[1.5px] text-white">
                    Crafted with love
                  </span>
                </motion.div>
              </div>

              {/* Card Content */}
              <div className="px-3 pb-2 pt-3 text-center">
                <p className="text-[8px] font-medium uppercase tracking-[2px] text-[#E8C9B2]">
                  A Day to Remember
                </p>

                <h2 className="mt-2 font-serif text-[23px] font-normal italic leading-tight text-[#FAF7F2]">
                  Love, in every detail.
                </h2>

                <p className="mx-auto mt-2 max-w-[220px] text-[10px] leading-5 text-white/75">
                  Thoughtfully planned. Beautifully celebrated. Uniquely yours.
                </p>
              </div>

              {/* Card Footer */}
              <div className="mt-1 flex items-center justify-between border-t border-white/20 px-2 py-2.5">
                <span className="text-[7px] font-medium uppercase tracking-[1.8px] text-white/70">
                  Begin something beautiful
                </span>

                <FiArrowUpRight className="size-3.5 text-[#E8C9B2]" />
              </div>
            </motion.div>

            {/* Decorative Label */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: shouldReduceMotion ? 0 : 1.1,
                duration: shouldReduceMotion ? 0 : 0.7,
              }}
              className="absolute -bottom-4 -left-4 hidden border border-white/25 bg-[#211912]/75 px-3 py-2 backdrop-blur-sm xl:block"
            >
              <p className="text-[8px] uppercase tracking-[1.8px] text-[#E8C9B2]">
                Your day, your story
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: shouldReduceMotion ? 0 : 1.5,
          duration: shouldReduceMotion ? 0 : 0.8,
        }}
        className="absolute bottom-4 left-5 flex items-center gap-2 sm:left-8 lg:left-14 xl:left-20"
      >
        <motion.span
          animate={shouldReduceMotion ? undefined : { y: [0, 5, 0] }}
          transition={{
            duration: 1.6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <FiArrowDown className="size-3 text-[#E3BDA2]" />
        </motion.span>

        <span className="text-[8px] font-medium uppercase tracking-[1.8px] text-white/65">
          Scroll to discover
        </span>
      </motion.div>

      {/* Bottom Line */}
      <motion.div
        initial={shouldReduceMotion ? false : { scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{
          duration: shouldReduceMotion ? 0 : 1.2,
          delay: shouldReduceMotion ? 0 : 0.4,
        }}
        className="absolute bottom-0 left-0 h-px w-full origin-left bg-gradient-to-r from-transparent via-white/30 to-transparent"
      />
    </section>
  );
}
