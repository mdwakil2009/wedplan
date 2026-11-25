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
      {/* Logo Icon */}
      <motion.div
        whileHover={{ scale: 1.08, rotate: -6 }}
        transition={{ duration: 0.25 }}
        className="flex size-10 items-center justify-center rounded-full bg-[#B77B65] text-[#FFFDF8] shadow-sm transition-colors duration-300 group-hover:bg-[#9F624D]"
      >
        <GiDiamondRing className="size-6" />
      </motion.div>

      {/* Brand Name */}
      {/* Brand Name */}
<div className="flex flex-col">
  <span className="text-[25px] font-semibold leading-none tracking-[-1.2px]">
    
    <span className="text-[#B77B65] transition-colors duration-300 group-hover:text-[#9F624D]">
     WebPlan
    </span>
  </span>

  <span className="mt-1.5 text-[7px] font-semibold uppercase tracking-[1.7px] text-[#85766F]">
    Your Day, Perfectly Planned
  </span>
</div>
    </Link>
  );
}