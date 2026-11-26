
"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  FiInstagram,
  FiFacebook,
  FiMail,
  FiPhone,
  FiHeart,
  FiArrowUpRight,
  FiMapPin,
} from "react-icons/fi";

import BrandLogo from "./BrandLogo";

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "Browse Services", href: "/services" },
  { name: "Sign In", href: "/sign-in" },
  { name: "Create Account", href: "/sign-up" },
];

const serviceLinks = [
  { name: "Photography & Videography", category: "Photography & Videography" },
  { name: "Wedding Venues", category: "Wedding Venues" },
  { name: "Decoration & Florist", category: "Decoration & Florist" },
  { name: "Catering Services", category: "Catering Services" },
  { name: "Makeup & Styling", category: "Makeup & Styling" },
  { name: "Wedding Fashion", category: "Wedding Fashion" },
];

const socialLinks = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/",
    icon: FiInstagram,
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/",
    icon: FiFacebook,
  },
];

export default function Footer() {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.12,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 24,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.65,
        ease: "easeOut" as const,
      },
    },
  };

  const linkHover = shouldReduceMotion ? {} : { x: 5 };

  const linkTransition = {
    type: "spring" as const,
    stiffness: 300,
    damping: 20,
  };

  return (
    <footer className="overflow-hidden border-t border-[#F0E7E3] bg-white text-[#392B27] transition-colors duration-300 dark:border-[#34413A] dark:bg-[#1D2421] dark:text-[#F5FAF6]">
      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.12 }}
          className="grid grid-cols-1 gap-8 border-b border-[#F0E7E3] py-9 transition-colors duration-300 dark:border-[#34413A] sm:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_1.2fr_1fr] lg:gap-10 lg:py-11"
        >
          {/* Brand Section */}
          <motion.div variants={itemVariants}>
            <motion.div
              whileHover={shouldReduceMotion ? undefined : { y: -3 }}
              transition={linkTransition}
              className="w-fit"
            >
              <BrandLogo />
            </motion.div>

            <p className="mt-3 max-w-xs text-[12px] leading-6 text-[#85766F] dark:text-[#B2BDB5]">
              Creating beautiful beginnings, one celebration at a time.
              Discover trusted wedding professionals and make every
              moment of your special day unforgettable.
            </p>

            {/* Social Links */}
            <div className="mt-5">
              <p className="mb-2.5 text-[9px] font-bold uppercase tracking-[0.18em] text-[#B77B65] dark:text-[#D9A58E]">
                Follow Our Journey
              </p>

              <div className="flex items-center gap-2">
                {socialLinks.map((social) => {
                  const Icon = social.icon;

                  return (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.name}
                      whileHover={
                        shouldReduceMotion
                          ? undefined
                          : {
                              y: -5,
                              scale: 1.08,
                              rotate: 4,
                            }
                      }
                      whileTap={{ scale: 0.92 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 15,
                      }}
                      className="flex size-9 items-center justify-center rounded-full border border-[#EDE2DD] bg-[#FFFAF8] text-[#8B6A5D] transition-all duration-300 hover:border-[#B77B65] hover:bg-[#B77B65] hover:text-white dark:border-[#46534B] dark:bg-[#29332E] dark:text-[#D9A58E] dark:hover:border-[#D9A58E] dark:hover:bg-[#B77B65] dark:hover:text-white"
                    >
                      <Icon size={15} />
                    </motion.a>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Explore */}
          <motion.div variants={itemVariants}>
            <h3 className="font-serif text-base font-semibold text-[#392B27] dark:text-[#F5FAF6]">
              Explore
            </h3>

            <div className="mb-4 mt-2.5 h-[2px] w-8 rounded-full bg-[#B77B65] dark:bg-[#D9A58E]" />

            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <motion.div
                    whileHover={linkHover}
                    transition={linkTransition}
                    className="w-fit"
                  >
                    <Link
                      href={link.href}
                      className="group flex w-fit items-center gap-1.5 text-[12px] text-[#85766F] transition-colors duration-300 hover:text-[#B77B65] dark:text-[#B2BDB5] dark:hover:text-[#D9A58E]"
                    >
                      <FiArrowUpRight
                        size={13}
                        className="text-[#C99B89] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 dark:text-[#D9A58E]"
                      />
                      {link.name}
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Wedding Services */}
          <motion.div variants={itemVariants}>
            <h3 className="font-serif text-base font-semibold text-[#392B27] dark:text-[#F5FAF6]">
              Wedding Services
            </h3>

            <div className="mb-4 mt-2.5 h-[2px] w-8 rounded-full bg-[#B77B65] dark:bg-[#D9A58E]" />

            <ul className="space-y-3">
              {serviceLinks.map((service) => (
                <li key={service.name}>
                  <motion.div
                    whileHover={linkHover}
                    transition={linkTransition}
                    className="w-fit"
                  >
                    <Link
                      href={`/services?category=${encodeURIComponent(service.category)}`}
                      className="group flex w-fit items-center gap-1.5 text-[12px] text-[#85766F] transition-colors duration-300 hover:text-[#B77B65] dark:text-[#B2BDB5] dark:hover:text-[#D9A58E]"
                    >
                      <FiArrowUpRight
                        size={13}
                        className="shrink-0 text-[#C99B89] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 dark:text-[#D9A58E]"
                      />
                      {service.name}
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div variants={itemVariants}>
            <h3 className="font-serif text-base font-semibold text-[#392B27] dark:text-[#F5FAF6]">
              Get in Touch
            </h3>

            <div className="mb-4 mt-2.5 h-[2px] w-8 rounded-full bg-[#B77B65] dark:bg-[#D9A58E]" />

            <p className="mb-4 text-[12px] leading-6 text-[#85766F] dark:text-[#B2BDB5]">
              Have questions about your wedding plans? We would love
              to hear from you.
            </p>

            <div className="space-y-4">
              {/* Email */}
              <motion.a
                href="mailto:hello@wedplan.com"
                whileHover={shouldReduceMotion ? undefined : { x: 4 }}
                transition={linkTransition}
                className="group flex items-center gap-2.5"
              >
                <motion.span
                  whileHover={
                    shouldReduceMotion
                      ? undefined
                      : { scale: 1.12, rotate: -6 }
                  }
                  transition={{
                    type: "spring",
                    stiffness: 350,
                    damping: 15,
                  }}
                  className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#F9F0EC] text-[#B77B65] transition-colors duration-300 group-hover:bg-[#B77B65] group-hover:text-white dark:bg-[#29332E] dark:text-[#D9A58E] dark:group-hover:bg-[#B77B65] dark:group-hover:text-white"
                >
                  <FiMail size={15} />
                </motion.span>

                <span>
                  <span className="block text-[9px] font-semibold uppercase tracking-wider text-[#A3958F] dark:text-[#9EADA3]">
                    Email Us
                  </span>

                  <span className="mt-0.5 block text-[12px] font-medium text-[#574740] transition-colors group-hover:text-[#B77B65] dark:text-[#E2ECE8] dark:group-hover:text-[#D9A58E]">
                    hello@wedplan.com
                  </span>
                </span>
              </motion.a>

              {/* Support */}
              <motion.div
                whileHover={shouldReduceMotion ? undefined : { x: 4 }}
                transition={linkTransition}
                className="group flex items-center gap-2.5"
              >
                <motion.span
                  whileHover={
                    shouldReduceMotion
                      ? undefined
                      : { scale: 1.12, rotate: -6 }
                  }
                  transition={{
                    type: "spring",
                    stiffness: 350,
                    damping: 15,
                  }}
                  className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#F9F0EC] text-[#B77B65] dark:bg-[#29332E] dark:text-[#D9A58E]"
                >
                  <FiPhone size={15} />
                </motion.span>

                <span>
                  <span className="block text-[9px] font-semibold uppercase tracking-wider text-[#A3958F] dark:text-[#9EADA3]">
                    Support
                  </span>

                  <span className="mt-0.5 block text-[12px] font-medium text-[#574740] dark:text-[#E2ECE8]">
                    Wedding Planning Support
                  </span>
                </span>
              </motion.div>

              {/* Platform */}
              <motion.div
                whileHover={shouldReduceMotion ? undefined : { x: 4 }}
                transition={linkTransition}
                className="group flex items-center gap-2.5"
              >
                <motion.span
                  whileHover={
                    shouldReduceMotion
                      ? undefined
                      : { scale: 1.12, rotate: -6 }
                  }
                  transition={{
                    type: "spring",
                    stiffness: 350,
                    damping: 15,
                  }}
                  className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#F9F0EC] text-[#B77B65] dark:bg-[#29332E] dark:text-[#D9A58E]"
                >
                  <FiMapPin size={15} />
                </motion.span>

                <span>
                  <span className="block text-[9px] font-semibold uppercase tracking-wider text-[#A3958F] dark:text-[#9EADA3]">
                    Our Platform
                  </span>

                  <span className="mt-0.5 block text-[12px] font-medium text-[#574740] dark:text-[#E2ECE8]">
                    Made for Your Special Day
                  </span>
                </span>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Brand Quote */}
        <motion.div
          initial={{
            opacity: 0,
            y: shouldReduceMotion ? 0 : 25,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{
            duration: shouldReduceMotion ? 0 : 0.8,
            ease: "easeOut",
          }}
          className="mx-auto max-w-4xl py-5 text-center sm:py-6"
        >
          <div className="mx-auto mb-2.5 flex items-center justify-center gap-2.5">
            <motion.span
              initial={{ width: shouldReduceMotion ? 28 : 0 }}
              whileInView={{ width: 28 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="h-px bg-[#E8CFC4] dark:bg-[#52635A]"
            />

            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 12,
                delay: 0.2,
              }}
              className="flex size-6 items-center justify-center rounded-full border border-[#EAD9D1] bg-[#FFFAF8] dark:border-[#46534B] dark:bg-[#29332E]"
            >
              <FiHeart
                className="fill-[#B77B65] text-[#B77B65] dark:fill-[#D9A58E] dark:text-[#D9A58E]"
                size={10}
              />
            </motion.span>

            <motion.span
              initial={{ width: shouldReduceMotion ? 28 : 0 }}
              whileInView={{ width: 28 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="h-px bg-[#E8CFC4] dark:bg-[#52635A]"
            />
          </div>

          <p className="font-serif text-base font-normal italic leading-relaxed tracking-wide text-[#574039] dark:text-[#E2ECE8] sm:text-lg">
            Your day. Your story. Your forever.
          </p>

          <p className="mt-1.5 text-[8px] font-semibold uppercase tracking-[0.25em] text-[#B77B65] dark:text-[#D9A58E]">
            THE WEDPLAN PROMISE
          </p>
        </motion.div>
      </div>

      {/* Copyright */}
      <div className="border-t border-[#F0E7E3] bg-[#FFFCFB] transition-colors duration-300 dark:border-[#34413A] dark:bg-[#17201C]">
        <motion.div
          initial={{
            opacity: 0,
            y: shouldReduceMotion ? 0 : 10,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{ once: true }}
          transition={{
            duration: shouldReduceMotion ? 0 : 0.6,
          }}
          className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-5 py-3.5 text-center sm:px-8 md:flex-row md:text-left lg:px-12"
        >
          <p className="text-[10px] text-[#94857D] dark:text-[#9EADA3]">
            © 2026 WedPlan. All rights reserved.
          </p>

          <p className="flex items-center gap-1.5 text-[10px] text-[#94857D] dark:text-[#9EADA3]">
            Crafted with
            <motion.span
              animate={
                shouldReduceMotion
                  ? undefined
                  : { scale: [1, 1.2, 1] }
              }
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatDelay: 2,
              }}
              className="inline-flex"
            >
              <FiHeart
                className="fill-[#B77B65] text-[#B77B65] dark:fill-[#D9A58E] dark:text-[#D9A58E]"
                size={11}
              />
            </motion.span>
            for every beautiful love story.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
