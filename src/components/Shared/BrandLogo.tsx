
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { GiDiamondRing } from "react-icons/gi";

export default function BrandLogo() {
  return (
    <Link
      href="/"
      aria-label="WedPlan Home"
      className="group inline-flex shrink-0 items-center gap-2"
    >
      {/* Logo Icon */}
      <motion.div
        whileHover={{ scale: 1.08, rotate: -6 }}
        transition={{ duration: 0.25 }}
        className="flex size-9 items-center justify-center rounded-full bg-[#B65F3A] text-white transition-colors duration-300 group-hover:bg-[#9F4F30]"
      >
        <GiDiamondRing className="size-6" />
      </motion.div>

      {/* Brand Name */}
      <div className="flex flex-col leading-none">
        <span className="text-[26px] font-medium tracking-[-1.3px] text-[#B65F3A] transition-colors duration-300 group-hover:text-[#9F4F30]">
          WedPlan
        </span>

        <span className="mt-1 text-[7px] font-semibold uppercase tracking-[1.8px] text-[#8C8178]">
          Your Day, Perfectly Planned
        </span>
      </div>
    </Link>
  );
}
