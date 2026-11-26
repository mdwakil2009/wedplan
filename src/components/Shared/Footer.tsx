
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
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

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const,
    },
  },
};

export default function Footer() {
  return (
    <footer className="overflow-hidden border-t border-[#F0E7E3] bg-white text-[#392B27] transition-colors duration-300 dark:border-[#34413A] dark:bg-[#1D2421] dark:text-[#F5FAF6]">

      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.12 }}
          className="grid grid-cols-1 gap-10 border-b border-[#F0E7E3] py-12 transition-colors duration-300 dark:border-[#34413A] sm:grid-cols-2 lg:grid-cols-[1.45fr_0.8fr_1.2fr_1fr] lg:gap-12 lg:py-16"
        >

          {/* Brand Section */}
          <motion.div variants={itemVariants}>
            <BrandLogo />

            <p className="mt-5 max-w-xs text-[13px] leading-7 text-[#85766F] dark:text-[#B2BDB5]">
              Creating beautiful beginnings, one celebration at a time.
              Discover trusted wedding professionals and make every
              moment of your special day unforgettable.
            </p>

            {/* Social Links */}
            <div className="mt-7">
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#B77B65] dark:text-[#D9A58E]">
                Follow Our Journey
              </p>

              <div className="flex items-center gap-2.5">
                {socialLinks.map((social) => {
                  const Icon = social.icon;

                  return (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.name}
                      whileHover={{ y: -4 }}
                      whileTap={{ scale: 0.94 }}
                      className="flex size-10 items-center justify-center rounded-full border border-[#EDE2DD] bg-[#FFFAF8] text-[#8B6A5D] transition-all duration-300 hover:border-[#B77B65] hover:bg-[#B77B65] hover:text-white dark:border-[#46534B] dark:bg-[#29332E] dark:text-[#D9A58E] dark:hover:border-[#D9A58E] dark:hover:bg-[#B77B65] dark:hover:text-white"
                    >
                      <Icon size={16} />
                    </motion.a>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Explore */}
          <motion.div variants={itemVariants}>
            <h3 className="font-serif text-lg font-semibold text-[#392B27] dark:text-[#F5FAF6]">
              Explore
            </h3>

            <div className="mb-6 mt-3 h-[2px] w-9 rounded-full bg-[#B77B65] dark:bg-[#D9A58E]" />

            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="group flex w-fit items-center gap-2 text-[13px] text-[#85766F] transition-colors duration-300 hover:text-[#B77B65] dark:text-[#B2BDB5] dark:hover:text-[#D9A58E]"
                  >
                    <FiArrowUpRight
                      size={14}
                      className="text-[#C99B89] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 dark:text-[#D9A58E]"
                    />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Wedding Services */}
          <motion.div variants={itemVariants}>
            <h3 className="font-serif text-lg font-semibold text-[#392B27] dark:text-[#F5FAF6]">
              Wedding Services
            </h3>

            <div className="mb-6 mt-3 h-[2px] w-9 rounded-full bg-[#B77B65] dark:bg-[#D9A58E]" />

            <ul className="space-y-4">
              {serviceLinks.map((service) => (
                <li key={service.name}>
                  <Link
                    href={`/services?category=${encodeURIComponent(service.category)}`}
                    className="group flex w-fit items-center gap-2 text-[13px] text-[#85766F] transition-colors duration-300 hover:text-[#B77B65] dark:text-[#B2BDB5] dark:hover:text-[#D9A58E]"
                  >
                    <FiArrowUpRight
                      size={14}
                      className="shrink-0 text-[#C99B89] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 dark:text-[#D9A58E]"
                    />
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div variants={itemVariants}>
            <h3 className="font-serif text-lg font-semibold text-[#392B27] dark:text-[#F5FAF6]">
              Get in Touch
            </h3>

            <div className="mb-6 mt-3 h-[2px] w-9 rounded-full bg-[#B77B65] dark:bg-[#D9A58E]" />

            <p className="mb-6 text-[13px] leading-7 text-[#85766F] dark:text-[#B2BDB5]">
              Have questions about your wedding plans? We would love
              to hear from you.
            </p>

            <div className="space-y-5">

              {/* Email */}
              <a
                href="mailto:hello@wedplan.com"
                className="group flex items-center gap-3"
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#F9F0EC] text-[#B77B65] transition-colors duration-300 group-hover:bg-[#B77B65] group-hover:text-white dark:bg-[#29332E] dark:text-[#D9A58E] dark:group-hover:bg-[#B77B65] dark:group-hover:text-white">
                  <FiMail size={16} />
                </span>

                <span>
                  <span className="block text-[10px] font-semibold uppercase tracking-wider text-[#A3958F] dark:text-[#9EADA3]">
                    Email Us
                  </span>

                  <span className="mt-1 block text-[13px] font-medium text-[#574740] transition-colors group-hover:text-[#B77B65] dark:text-[#E2ECE8] dark:group-hover:text-[#D9A58E]">
                    hello@wedplan.com
                  </span>
                </span>
              </a>

              {/* Support */}
              <div className="flex items-center gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#F9F0EC] text-[#B77B65] dark:bg-[#29332E] dark:text-[#D9A58E]">
                  <FiPhone size={16} />
                </span>

                <span>
                  <span className="block text-[10px] font-semibold uppercase tracking-wider text-[#A3958F] dark:text-[#9EADA3]">
                    Support
                  </span>

                  <span className="mt-1 block text-[13px] font-medium text-[#574740] dark:text-[#E2ECE8]">
                    Wedding Planning Support
                  </span>
                </span>
              </div>

              {/* Platform */}
              <div className="flex items-center gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#F9F0EC] text-[#B77B65] dark:bg-[#29332E] dark:text-[#D9A58E]">
                  <FiMapPin size={16} />
                </span>

                <span>
                  <span className="block text-[10px] font-semibold uppercase tracking-wider text-[#A3958F] dark:text-[#9EADA3]">
                    Our Platform
                  </span>

                  <span className="mt-1 block text-[13px] font-medium text-[#574740] dark:text-[#E2ECE8]">
                    Made for Your Special Day
                  </span>
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Brand Quote */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="relative mx-auto max-w-4xl overflow-hidden py-7 text-center transition-colors duration-300 sm:py-9"
        >
          <div className="mx-auto mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-[#E8CFC4] dark:bg-[#52635A] sm:w-12" />

            <span className="flex size-8 items-center justify-center rounded-full border border-[#EAD9D1] bg-[#FFFAF8] dark:border-[#46534B] dark:bg-[#29332E]">
              <FiHeart
                className="fill-[#B77B65] text-[#B77B65] dark:fill-[#D9A58E] dark:text-[#D9A58E]"
                size={13}
              />
            </span>

            <span className="h-px w-8 bg-[#E8CFC4] dark:bg-[#52635A] sm:w-12" />
          </div>

          <p className="font-serif text-lg italic leading-relaxed tracking-wide text-[#574039] dark:text-[#E2ECE8] sm:text-2xl">
            Your day. Your story. Your forever.
          </p>

          <p className="mt-2.5 text-[8px] font-bold uppercase tracking-[0.3em] text-[#B77B65] dark:text-[#D9A58E] sm:text-[9px]">
            THE WEDPLAN PROMISE
          </p>

          <div className="mx-auto mt-5 h-[2px] w-10 rounded-full bg-[#D9A58E]/60 dark:bg-[#D9A58E]/70" />
        </motion.div>
      </div>

      {/* Copyright */}
      <div className="border-t border-[#F0E7E3] bg-[#FFFCFB] transition-colors duration-300 dark:border-[#34413A] dark:bg-[#17201C]">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 py-5 text-center sm:px-8 md:flex-row md:text-left lg:px-12">

          <p className="text-[11px] text-[#94857D] dark:text-[#9EADA3]">
            © 2026 WedPlan. All rights reserved.
          </p>

          <p className="flex items-center gap-1.5 text-[11px] text-[#94857D] dark:text-[#9EADA3]">
            Crafted with
            <FiHeart
              className="fill-[#B77B65] text-[#B77B65] dark:fill-[#D9A58E] dark:text-[#D9A58E]"
              size={12}
            />
            for every beautiful love story.
          </p>
        </div>
      </div>
    </footer>
  );
}
