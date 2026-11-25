
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
} from "react-icons/fi";

import BrandLogo from "./BrandLogo";

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "Browse Services", href: "/services" },
  { name: "Sign In", href: "/login" },
  { name: "Create Account", href: "/signup" },
];

const serviceLinks = [
  "Photography & Videography",
  "Wedding Venues",
  "Decoration & Florist",
  "Catering Services",
  "Makeup & Styling",
  "Wedding Fashion",
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
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 22,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: "easeOut" as const,
    },
  },
};

export default function Footer() {
  return (
    <footer className="overflow-hidden bg-[#211A17] text-white">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">

        {/* Main Footer */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.12 }}
          className="grid grid-cols-1 gap-9 border-b border-white/[0.08] py-10 sm:grid-cols-2 sm:gap-10 lg:grid-cols-[1.5fr_0.85fr_1.2fr_1fr] lg:gap-12 lg:py-12"
        >
          {/* Brand Section */}
          <motion.div variants={itemVariants}>
            <BrandLogo />

            <p className="mt-4 max-w-xs text-xs leading-6 text-[#B3A39A] sm:text-[13px]">
              Making wedding planning effortless, meaningful and magical.
              Your love story deserves a beautiful beginning.
            </p>

            {/* Social Links */}
            <div className="mt-5">
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#D9A58E]">
                Follow Us
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
                      whileHover={{ y: -4, scale: 1.08 }}
                      whileTap={{ scale: 0.94 }}
                      transition={{ duration: 0.2 }}
                      className="flex size-9 items-center justify-center border border-white/10 text-[#D0B6A6] transition-colors duration-300 hover:border-[#B77B65] hover:bg-[#B77B65] hover:text-white"
                    >
                      <Icon size={15} />
                    </motion.a>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h3 className="font-serif text-base font-medium text-[#F5EAE3]">
              Explore
            </h3>

            <div className="mb-4 mt-2 h-[2px] w-8 bg-[#B77B65]" />

            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-xs text-[#B3A39A] transition-colors duration-300 hover:text-[#D9A58E] sm:text-[13px]"
                  >
                    <FiArrowUpRight
                      size={12}
                      className="text-[#B77B65] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Wedding Services */}
          <motion.div variants={itemVariants}>
            <h3 className="font-serif text-base font-medium text-[#F5EAE3]">
              Wedding Services
            </h3>

            <div className="mb-4 mt-2 h-[2px] w-8 bg-[#B77B65]" />

            <ul className="space-y-3">
              {serviceLinks.map((service) => (
                <li key={service}>
                  <Link
                    href="/services"
                    className="group inline-flex items-center gap-2 text-xs text-[#B3A39A] transition-colors duration-300 hover:text-[#D9A58E] sm:text-[13px]"
                  >
                    <FiArrowUpRight
                      size={12}
                      className="text-[#B77B65] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Section */}
          <motion.div variants={itemVariants}>
            <h3 className="font-serif text-base font-medium text-[#F5EAE3]">
              Get in Touch
            </h3>

            <div className="mb-4 mt-2 h-[2px] w-8 bg-[#B77B65]" />

            <p className="mb-4 text-xs leading-6 text-[#B3A39A]">
              Need help planning your special day? We are here for you.
            </p>

            <motion.a
              href="mailto:hello@wedplan.com"
              whileHover={{ x: 4 }}
              className="group flex items-center gap-3"
            >
              <span className="flex size-9 shrink-0 items-center justify-center border border-[#B77B65]/25 bg-[#B77B65]/10 text-[#D9A58E] transition-colors duration-300 group-hover:bg-[#B77B65] group-hover:text-white">
                <FiMail size={15} />
              </span>

              <span>
                <span className="block text-[9px] uppercase tracking-[0.15em] text-[#94857D]">
                  Email Us
                </span>
                <span className="mt-1 block text-xs text-[#E7D9D0] transition-colors duration-300 group-hover:text-[#D9A58E]">
                  hello@wedplan.com
                </span>
              </span>
            </motion.a>

            <div className="mt-4 flex items-center gap-3">
              <span className="flex size-9 shrink-0 items-center justify-center border border-[#B77B65]/25 bg-[#B77B65]/10 text-[#D9A58E]">
                <FiPhone size={15} />
              </span>

              <span>
                <span className="block text-[9px] uppercase tracking-[0.15em] text-[#94857D]">
                  Support
                </span>
                <span className="mt-1 block text-xs text-[#E7D9D0]">
                  Wedding Planning Support
                </span>
              </span>
            </div>
          </motion.div>
        </motion.div>

        {/* Brand Quote */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="py-7 text-center"
        >
          <div className="mb-3 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-[#B77B65]/50" />
            <FiHeart className="fill-[#B77B65] text-[#B77B65]" size={12} />
            <span className="h-px w-8 bg-[#B77B65]/50" />
          </div>

          <p className="font-serif text-base italic tracking-wide text-[#E8DDD6] sm:text-lg">
            Your day. Your story. Your forever.
          </p>

          <p className="mt-2 text-[8px] font-medium uppercase tracking-[0.3em] text-[#94857D]">
            The WedPlan Promise
          </p>
        </motion.div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/[0.07] bg-[#181311]">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2.5 px-5 py-4 text-center sm:px-8 md:flex-row md:text-left lg:px-12">
          <p className="text-[10px] text-[#94857D] sm:text-[11px]">
            © 2026 WedPlan. All rights reserved.
          </p>

          <p className="flex items-center gap-1.5 text-[10px] text-[#94857D] sm:text-[11px]">
            Crafted with
            <FiHeart className="fill-[#B77B65] text-[#B77B65]" size={11} />
            for every beautiful love story.
          </p>
        </div>
      </div>
    </footer>
  );
}
