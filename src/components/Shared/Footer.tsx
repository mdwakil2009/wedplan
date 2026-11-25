"use client";

import Link from "next/link";
import {
  FiInstagram,
  FiFacebook,
  FiMail,
  FiPhone,
  FiMapPin,
  FiHeart,
  FiArrowRight,
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

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#211A17] text-white">
      {/* Background Decorations */}
      <div className="pointer-events-none absolute -left-40 top-10 h-[300px] w-[300px] rounded-full bg-[#B77B65]/10 blur-[100px]" />

      <div className="pointer-events-none absolute -right-40 bottom-5 h-[280px] w-[280px] rounded-full bg-[#D9A58E]/[0.06] blur-[100px]" />

      {/* Main Footer */}
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-8 border-b border-white/[0.08] py-9 sm:grid-cols-2 sm:gap-9 sm:py-10 lg:grid-cols-[1.5fr_0.85fr_1.2fr_1fr] lg:gap-10 lg:py-12">
          {/* Brand Section */}
          <div>
            <div aria-label="WedPlan Home" className="inline-flex items-center">
              <BrandLogo />
            </div>

            <p className="mt-3 max-w-xs text-xs leading-6 text-[#B3A39A] sm:text-[13px]">
              Making wedding planning feel effortless, meaningful and a little
              more magical. Your love story deserves the most beautiful
              beginning.
            </p>

            {/* Social Links */}
            <div className="mt-5">
              <p className="mb-2.5 text-[9px] font-semibold uppercase tracking-[0.22em] text-[#D9A58E]">
                Follow Our Journey
              </p>

              <div className="flex items-center gap-2.5">
                {socialLinks.map((social) => {
                  const Icon = social.icon;

                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.name}
                      className="group flex h-9 w-9 items-center justify-center border border-white/10 bg-white/[0.025] text-[#D0B6A6] transition-all duration-300 hover:-translate-y-1 hover:border-[#B77B65] hover:bg-[#B77B65] hover:text-white"
                    >
                      <Icon
                        size={15}
                        className="transition-transform duration-300 group-hover:scale-110"
                      />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
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
                    <FiArrowRight
                      size={11}
                      className="shrink-0 text-[#B77B65] opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100"
                    />

                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      {link.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Wedding Services */}
          <div>
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
                    <FiArrowRight
                      size={11}
                      className="shrink-0 text-[#B77B65] opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100"
                    />

                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      {service}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="font-serif text-base font-medium text-[#F5EAE3]">
              Get in Touch
            </h3>

            <div className="mb-4 mt-2 h-[2px] w-8 bg-[#B77B65]" />

            <p className="mb-4 text-xs leading-6 text-[#B3A39A]">
              Have a question? We're here to help you plan every beautiful
              detail.
            </p>

            <div className="space-y-3.5">
              {/* Email */}
              <a
                href="mailto:hello@wedplan.com"
                className="group flex items-center gap-2.5"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center border border-[#B77B65]/25 bg-[#B77B65]/10 text-[#D9A58E] transition-all duration-300 group-hover:border-[#B77B65] group-hover:bg-[#B77B65] group-hover:text-white">
                  <FiMail size={15} />
                </span>

                <span className="min-w-0">
                  <span className="block text-[9px] uppercase tracking-[0.15em] text-[#94857D]">
                    Email Us
                  </span>

                  <span className="mt-1 block break-all text-xs text-[#E7D9D0] transition-colors duration-300 group-hover:text-[#D9A58E]">
                    hello@wedplan.com
                  </span>
                </span>
              </a>

              {/* Support */}
              <div className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center border border-[#B77B65]/25 bg-[#B77B65]/10 text-[#D9A58E]">
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

              {/* Platform */}
              <div className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center border border-[#B77B65]/25 bg-[#B77B65]/10 text-[#D9A58E]">
                  <FiMapPin size={15} />
                </span>

                <span>
                  <span className="block text-[9px] uppercase tracking-[0.15em] text-[#94857D]">
                    Our Promise
                  </span>

                  <span className="mt-1 block text-xs text-[#E7D9D0]">
                    Your Wedding, Our Passion
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Brand Quote */}
        <div className="relative py-6 text-center sm:py-7">
          <div className="mb-3 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-[#B77B65]/50" />

            <FiHeart size={12} className="fill-[#B77B65] text-[#B77B65]" />

            <span className="h-px w-8 bg-[#B77B65]/50" />
          </div>

          <p className="font-serif text-base italic tracking-wide text-[#E8DDD6] sm:text-lg">
            “Your day. Your story. Your forever.”
          </p>

          <p className="mt-2 text-[8px] font-medium uppercase tracking-[0.3em] text-[#94857D]">
            The WedPlan Promise
          </p>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="border-t border-white/[0.07] bg-[#181311]">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2.5 px-5 py-4 text-center sm:px-8 md:flex-row md:text-left lg:px-12">
          <p className="text-[10px] text-[#94857D] sm:text-[11px]">
            © 2026 WedPlan. All rights reserved.
          </p>

          <p className="flex items-center gap-1.5 text-[10px] text-[#94857D] sm:text-[11px]">
            Crafted with
            <FiHeart size={11} className="fill-[#B77B65] text-[#B77B65]" />
            for every beautiful love story.
          </p>
        </div>
      </div>
    </footer>
  );
}
