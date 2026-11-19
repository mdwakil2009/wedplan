
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { GiDiamondRing } from "react-icons/gi";

export default function BrandLogo() {
  return (
    <Link
      href="/"
      aria-label="WedPlan Home"
      className="group inline-flex shrink-0 items-center gap-2.5"
    >
      {/* Wedding Icon */}
      <motion.div
        whileHover={{ scale: 1.08, rotate: -6 }}
        transition={{ duration: 0.25 }}
        className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-[#772D43] shadow-sm"
      >
        <GiDiamondRing className="h-6 w-6 text-[#F5DFA0]" />

        {/* Small Gold Accent */}
        <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full border-2 border-white" />
      </motion.div>

      {/* Brand Name */}
      <div className="flex flex-col leading-none">
        <span className=" text-[25px] font-bold tracking-tight text-[#772D43] transition-colors duration-200 group-hover:text-[#9A5269]">
          WedPlan
        </span>

        <span className="mt-1 text-[8px] font-semibold uppercase tracking-[2.2px] text-[#99858A]">
          Your Day, Perfectly Planned
        </span>
      </div>
    </Link>
  );
}
