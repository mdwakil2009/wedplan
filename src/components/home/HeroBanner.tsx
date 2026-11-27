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
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

// Child animation
const itemVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease },
  },
};

const buttonBase =
  "group inline-flex min-h-12 w-full items-center justify-center gap-3 px-7 text-[10px] font-semibold uppercase tracking-[0.18em] transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E8C7D1] sm:w-auto";

const arrowMotion =
  "size-3.5 transition-transform duration-300 motion-reduce:transform-none motion-reduce:transition-none";

export default function HeroBanner() {
  const router = useRouter();
  const shouldReduceMotion = useReducedMotion();

  // Session Hook must be inside the component
  const { data: session, isPending } = authClient.useSession();

  return (
    <section className="relative isolate flex min-h-[400px] w-full overflow-hidden bg-[#2B181F] dark:bg-[#1D2421] sm:min-h-[440px] lg:min-h-[min(640px,calc(100svh-68px))]">
      {/* Background Image */}
      <motion.div
        initial={shouldReduceMotion ? false : { scale: 1.08, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: shouldReduceMotion ? 0 : 2, ease }}
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

      {/* Overlays: even on small screens, directional on desktop so the photo stays open */}
      <div className="absolute inset-0 -z-20 bg-[#24121A]/65 lg:bg-transparent lg:bg-gradient-to-r lg:from-[#24121A]/90 lg:via-[#24121A]/55 lg:to-[#24121A]/5" />
      <div className="absolute inset-0 -z-20 bg-gradient-to-t from-[#24121A]/55 via-transparent to-transparent dark:bg-[#1D2421]/25" />

      {/* Fine editorial frame */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-3 -z-10 border border-[#E8C7D1]/25 sm:inset-4"
      />

      {/* Main Content */}
      <div className="relative mx-auto flex w-full max-w-[1440px] items-center px-7 pb-16 pt-12 sm:px-12 lg:px-16 lg:pb-16 lg:pt-10 xl:px-20">
        <div className="grid w-full grid-cols-1 items-center gap-6 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-16">
          {/* LEFT CONTENT */}
          <motion.div
            variants={containerVariants}
            initial={shouldReduceMotion ? false : "hidden"}
            animate="visible"
            className="relative z-10 max-w-[640px]"
          >
            {/* Eyebrow */}
            <motion.div
              variants={itemVariants}
              className="mb-4 flex items-center gap-3"
            >
              <motion.span
                aria-hidden="true"
                initial={shouldReduceMotion ? false : { width: 0 }}
                animate={{ width: 40 }}
                transition={{
                  duration: shouldReduceMotion ? 0 : 0.8,
                  delay: shouldReduceMotion ? 0 : 0.5,
                }}
                className="h-px bg-[#B99576]"
              />
              <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#E8C7D1]">
                The Beginning of Forever
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              variants={itemVariants}
              className="font-serif text-[clamp(2.5rem,4.6vw,4.25rem)] font-normal leading-[1.04] tracking-[-0.025em] text-white"
            >
              Your Day.
              <br />
              Your Story.
              <span className="mt-1 block italic text-[#E8C7D1]">
                Beautifully
                <br className="hidden sm:block" /> Unforgettable.
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="mt-5 max-w-[440px] text-[13px] leading-7 text-white/90 sm:text-sm sm:leading-7"
            >
              From the first spark of an idea to your final dance, discover
              everything you need to turn your dream wedding into a celebration
              that feels uniquely yours.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
            >
              <Link
                href="/services"
                className={`${buttonBase} bg-[#FBF8F4] text-[#772D43] hover:bg-[#E8C7D1]`}
              >
                Explore Services
                <FiArrowUpRight
                  aria-hidden="true"
                  className={`${arrowMotion} group-hover:-translate-y-0.5 group-hover:translate-x-0.5`}
                />
              </Link>

              <button
                type="button"
                onClick={() => {
                  if (!isPending && !session) {
                    router.push("/sign-in");
                  }
                }}
                disabled={isPending || !!session}
                className={`${buttonBase} border border-[#E8C7D1]/60 text-white enabled:hover:border-[#772D43] enabled:hover:bg-[#772D43] disabled:cursor-default`}
              >
                Start Your Journey
                <FiArrowUpRight
                  aria-hidden="true"
                  className={`${arrowMotion} group-enabled:group-hover:-translate-y-0.5 group-enabled:group-hover:translate-x-0.5`}
                />
              </button>
            </motion.div>

            {/* Signature */}
            <motion.div
              variants={itemVariants}
              className="mt-6 flex items-center gap-3"
            >
              <motion.span
                animate={
                  shouldReduceMotion ? undefined : { scale: [1, 1.15, 1] }
                }
                transition={{
                  duration: 2.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <FiHeart aria-hidden="true" className="size-3.5 text-[#E8C7D1]" />
              </motion.span>

              <span className="text-[9px] uppercase tracking-[0.2em] text-white/80">
                Made for moments that last forever
              </span>
            </motion.div>
          </motion.div>

          {/* RIGHT EDITORIAL CARD */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: shouldReduceMotion ? 0 : 1.1,
              delay: shouldReduceMotion ? 0 : 0.55,
              ease,
            }}
            className="relative hidden w-full max-w-[320px] justify-self-end lg:block"
          >
            {/* Decorative Accent */}
            <motion.div
              aria-hidden="true"
              initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: shouldReduceMotion ? 0 : 1,
                delay: shouldReduceMotion ? 0 : 1,
              }}
              className="absolute -right-3 -top-3 h-24 w-24 border-r border-t border-[#B99576]"
            />

            {/* Card: styled as a printed invitation */}
            <div className="group/card relative bg-[#FBF8F4] p-3 shadow-[0_30px_70px_rgba(20,8,13,0.35)] transition-transform duration-500 ease-out hover:-translate-y-1 motion-reduce:transform-none motion-reduce:transition-none dark:bg-[#252E2A]">
              <div className="border border-[#B99576]/50 px-3 pb-3 pt-3">
                {/* Card Header */}
                <div className="flex items-start justify-between gap-3 pb-3">
                  <div>
                    <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[#772D43] dark:text-[#E8C7D1]">
                      The Wedding Edit
                    </p>
                    <p className="mt-1 font-serif text-xs italic text-[#7D696F] dark:text-[#BCC5BF]">
                      A collection of beautiful moments
                    </p>
                  </div>
                  <span className="font-serif text-sm italic text-[#9A5269] dark:text-[#E8C7D1]">
                    01
                  </span>
                </div>

                {/* Card Image: arched like a wedding aisle arch */}
                <div className="relative mx-auto h-[190px] w-[86%] overflow-hidden rounded-t-full">
                  <Image
                    src="/images/background.photo7.avif"
                    alt="Elegant wedding decoration"
                    fill
                    sizes="(min-width: 1024px) 320px, 100vw"
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover/card:scale-[1.07] motion-reduce:transform-none motion-reduce:transition-none"
                  />

                  <motion.div
                    initial={
                      shouldReduceMotion ? false : { opacity: 0, y: 10 }
                    }
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: shouldReduceMotion ? 0 : 1.2,
                      duration: shouldReduceMotion ? 0 : 0.6,
                    }}
                    className="absolute inset-x-0 bottom-0 flex justify-center"
                  >
                    <span className="whitespace-nowrap bg-[#FBF8F4] px-3 pt-1.5 text-[8px] font-semibold uppercase tracking-[0.2em] text-[#772D43] dark:bg-[#252E2A] dark:text-[#E8C7D1]">
                      Crafted with love
                    </span>
                  </motion.div>
                </div>

                {/* Card Content */}
                <div className="pt-4 text-center">
                  <p className="text-[8px] font-semibold uppercase tracking-[0.22em] text-[#9A5269] dark:text-[#E8C7D1]">
                    A Day to Remember
                  </p>

                  <h2 className="mt-1.5 font-serif text-[24px] font-normal italic leading-tight text-[#392B32] dark:text-[#F7F0F2]">
                    Love, in every detail.
                  </h2>

                  <p className="mx-auto mt-1.5 max-w-[220px] text-[10px] leading-[18px] text-[#7D696F] dark:text-[#BCC5BF]">
                    Thoughtfully planned. Beautifully celebrated. Uniquely
                    yours.
                  </p>
                </div>

                {/* Card Footer */}
                <div className="mt-3 flex items-center justify-between gap-2 border-t border-[#E8C7D1] pt-3 dark:border-[#3D4842]">
                  <span className="text-[8px] font-semibold uppercase tracking-[0.18em] text-[#7D696F] dark:text-[#BCC5BF]">
                    Begin something beautiful
                  </span>
                  <FiArrowUpRight
                    aria-hidden="true"
                    className="size-3.5 shrink-0 text-[#772D43] dark:text-[#E8C7D1]"
                  />
                </div>
              </div>
            </div>

            {/* Decorative Label: vertical ribbon beside the card */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: shouldReduceMotion ? 0 : 1.1,
                duration: shouldReduceMotion ? 0 : 0.7,
              }}
              className="absolute -left-8 bottom-10 hidden bg-[#772D43] px-2 py-4 xl:block"
            >
              <p className="rotate-180 text-[8px] font-semibold uppercase tracking-[0.22em] text-white [writing-mode:vertical-rl]">
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
        className="absolute bottom-7 left-7 flex items-center gap-2 sm:left-12 lg:left-16 xl:left-20"
      >
        <motion.span
          animate={shouldReduceMotion ? undefined : { y: [0, 4, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <FiArrowDown aria-hidden="true" className="size-3 text-[#E8C7D1]" />
        </motion.span>

        <span className="text-[8px] font-semibold uppercase tracking-[0.22em] text-white/75">
          Scroll to discover
        </span>
      </motion.div>

      {/* Bottom Line */}
      <motion.div
        aria-hidden="true"
        initial={shouldReduceMotion ? false : { scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{
          duration: shouldReduceMotion ? 0 : 1.2,
          delay: shouldReduceMotion ? 0 : 0.4,
        }}
        className="absolute bottom-0 left-0 h-px w-full origin-left bg-gradient-to-r from-transparent via-[#B99576] to-transparent"
      />
    </section>
  );
}
