import Link from "next/link";
import type { IconType } from "react-icons";
import { FiArrowUpRight } from "react-icons/fi";

export type QuickActionTone = "blue" | "purple" | "mint" | "sky" | "amber";

const iconStyles: Record<QuickActionTone, string> = {
  blue: "bg-[#EEF4FF] text-[#3A76EF] group-hover:bg-[#3A76EF] group-hover:text-white",
  purple: "bg-[#F4EDFB] text-[#8B4FC1] group-hover:bg-[#A66DD4] group-hover:text-white",
  mint: "bg-[#E9FBF4] text-[#0E8A66] group-hover:bg-[#6ED4B1] group-hover:text-[#0D3B2E]",
  sky: "bg-[#EAF7FF] text-[#1E7FB8] group-hover:bg-[#62C7FF] group-hover:text-[#123A5A]",
  amber: "bg-[#FDF3E1] text-[#A9690B] group-hover:bg-[#F2C879] group-hover:text-[#5C3B05]",
};

type QuickActionProps = {
  title: string;
  description: string;
  href: string;
  icon: IconType;
  tone?: QuickActionTone;
};

export default function QuickAction({
  title,
  description,
  href,
  icon: Icon,
  tone = "blue",
}: QuickActionProps) {
  return (
    <Link
      href={href}
      className="group flex items-start gap-3.5 rounded-2xl border border-[#E7EBF5] bg-white p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#C9D9FF] hover:shadow-[0_14px_30px_-18px_rgba(37,43,69,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3A76EF]/35"
    >
      <span
        className={`flex size-10 shrink-0 items-center justify-center rounded-xl transition-colors duration-200 ${iconStyles[tone]}`}
      >
        <Icon className="size-4" />
      </span>

      <span className="min-w-0 flex-1">
        <span className="block text-[13px] font-semibold text-[#252B45]">
          {title}
        </span>

        <span className="mt-1 block text-[11px] leading-5 text-[#7A839B]">
          {description}
        </span>
      </span>

      <FiArrowUpRight className="mt-0.5 size-4 shrink-0 text-[#A6AFC2] transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#3A76EF]" />
    </Link>
  );
}
