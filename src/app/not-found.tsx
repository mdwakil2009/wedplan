
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Heart,
  Home,
  Search,
  Sparkles,
} from "lucide-react";
import BrandLogo from "@/components/Shared/BrandLogo";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-white px-4 py-5">

      {/* Background */}
      <div className="pointer-events-none absolute -left-20 -top-20 size-52 rounded-full bg-[#D9A58E]/10 blur-[80px]" />
      <div className="pointer-events-none absolute -bottom-20 -right-20 size-56 rounded-full bg-[#772D43]/5 blur-[80px]" />

      {/* Floating Decorations */}
      <motion.div
        animate={{ y: [0, -8, 0], rotate: [0, 8, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute left-[12%] top-[17%] hidden text-[#D9A58E]/60 sm:block"
      >
        <Heart className="size-6 fill-current" />
      </motion.div>

      <motion.div
        animate={{ y: [0, 8, 0], rotate: [0, -8, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute bottom-[16%] right-[12%] hidden text-[#B77B65]/50 sm:block"
      >
        <Sparkles className="size-7" />
      </motion.div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="relative z-10 mx-auto flex w-full max-w-lg flex-col items-center text-center"
      >
        {/* Logo */}
        <div className="mb-3 scale-90">
          <BrandLogo />
        </div>

        {/* 404 Illustration */}
        <div className="relative mb-4 flex size-40 items-center justify-center sm:size-44">

          <div className="absolute inset-0 rounded-full border border-dashed border-[#D9A58E]/50" />

          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 35,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute inset-2.5 rounded-full border border-[#F0E5DF]"
          />

          <div className="relative flex size-32 items-center justify-center rounded-full border border-[#F0E5DF] bg-white shadow-[0_10px_30px_rgba(57,43,39,0.07)] sm:size-36">
            <div className="text-center">
              <p className="font-serif text-[66px] font-semibold leading-none tracking-tighter text-[#772D43]">
                404
              </p>

              <div className="mx-auto mt-2 flex items-center justify-center gap-1.5">
                <span className="h-px w-4 bg-[#D9A58E]" />
                <Heart className="size-2.5 fill-[#B77B65] text-[#B77B65]" />
                <span className="h-px w-4 bg-[#D9A58E]" />
              </div>
            </div>
          </div>

          {/* Search */}
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute right-0 top-5 flex size-9 items-center justify-center rounded-xl border border-[#F0E5DF] bg-white text-[#B77B65] shadow-sm"
          >
            <Search className="size-4" />
          </motion.div>

          {/* Heart */}
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 3.5, repeat: Infinity }}
            className="absolute bottom-4 left-0 flex size-9 items-center justify-center rounded-xl border border-[#F0E5DF] bg-white text-[#772D43] shadow-sm"
          >
            <Heart className="size-4 fill-current" />
          </motion.div>
        </div>

        {/* Message */}
        <div className="max-w-md">
          <div className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-[#F0E5DF] bg-[#FCF9F7] px-2.5 py-1">
            <Sparkles className="size-3 text-[#B77B65]" />
            <span className="text-[8px] font-semibold tracking-[0.16em] text-[#B77B65]">
              LOST IN THE JOURNEY?
            </span>
          </div>

          <h1 className="font-serif text-2xl font-semibold leading-tight tracking-tight text-[#392B27] sm:text-3xl">
            Oops! This page
            <br />
            <span className="italic text-[#B77B65]">
              missed the celebration.
            </span>
          </h1>

          <p className="mx-auto mt-2 max-w-sm text-xs leading-5 text-[#85766F]">
            Looks like the page you are looking for has wandered away.
            Your perfect wedding journey is still waiting for you.
          </p>
        </div>

        {/* Buttons */}
        <div className="mt-5 flex w-full flex-col items-center justify-center gap-2.5 sm:w-auto sm:flex-row">
          <Link
            href="/"
            className="group inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-[#772D43] px-5 text-[11px] font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#612338] sm:w-auto"
          >
            <Home className="size-3.5" />
            Back to Home
            <ArrowRight className="size-3 transition-transform group-hover:translate-x-1" />
          </Link>

          <Link
            href="/services"
            className="group inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg border border-[#E9DED6] bg-white px-5 text-[11px] font-semibold text-[#392B27] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#B77B65] sm:w-auto"
          >
            Explore Services
            <ArrowRight className="size-3 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Footer */}
        <div className="mt-6 w-full max-w-xs border-t border-[#F0E5DF] pt-3">
          <p className="text-[9px] text-[#A4958E]">
            Every beautiful journey deserves a beautiful beginning.
          </p>

          <Link
            href="/"
            className="mt-1.5 inline-flex items-center gap-1 text-[9px] font-semibold text-[#772D43] transition-colors hover:text-[#B77B65]"
          >
            <ArrowLeft className="size-2.5" />
            Return to WedPlan
          </Link>
        </div>
      </motion.div>
    </main>
  );
}
