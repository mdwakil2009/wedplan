import type { ReactNode } from "react";
import type { IconType } from "react-icons";

export type StatTone = "blue" | "sky" | "purple" | "mint" | "white" | "amber" | "rose";

type ToneStyle = {
  card: string;
  label: string;
  value: string;
  hint: string;
  icon: string;
  glow: string;
};

const toneStyles: Record<StatTone, ToneStyle> = {
  blue: {
    card: "bg-[#3A76EF] text-white shadow-[0_16px_32px_-18px_rgba(58,118,239,0.75)]",
    label: "text-white/75",
    value: "text-white",
    hint: "text-white/70",
    icon: "bg-white/15 text-white",
    glow: "bg-white/10",
  },
  sky: {
    card: "bg-[#62C7FF] text-[#123A5A] shadow-[0_16px_32px_-18px_rgba(98,199,255,0.8)]",
    label: "text-[#123A5A]/70",
    value: "text-[#123A5A]",
    hint: "text-[#123A5A]/65",
    icon: "bg-white/35 text-[#123A5A]",
    glow: "bg-white/25",
  },
  purple: {
    card: "bg-[#A66DD4] text-white shadow-[0_16px_32px_-18px_rgba(166,109,212,0.75)]",
    label: "text-white/75",
    value: "text-white",
    hint: "text-white/70",
    icon: "bg-white/15 text-white",
    glow: "bg-white/10",
  },
  mint: {
    card: "bg-[#6ED4B1] text-[#0D3B2E] shadow-[0_16px_32px_-18px_rgba(110,212,177,0.8)]",
    label: "text-[#0D3B2E]/70",
    value: "text-[#0D3B2E]",
    hint: "text-[#0D3B2E]/65",
    icon: "bg-white/35 text-[#0D3B2E]",
    glow: "bg-white/25",
  },
  white: {
    card: "border border-[#E7EBF5] bg-white text-[#252B45] shadow-[0_1px_2px_rgba(37,43,69,0.04)]",
    label: "text-[#7A839B]",
    value: "text-[#252B45]",
    hint: "text-[#8A93A8]",
    icon: "bg-[#EEF4FF] text-[#3A76EF]",
    glow: "bg-[#F3F6FE]",
  },
  amber: {
    card: "border border-[#F7E7C8] bg-[#FFFBF3] text-[#252B45] shadow-[0_1px_2px_rgba(37,43,69,0.04)]",
    label: "text-[#9A7B45]",
    value: "text-[#252B45]",
    hint: "text-[#A78A58]",
    icon: "bg-[#FDF0D8] text-[#B47A17]",
    glow: "bg-[#FDF3E1]",
  },
  rose: {
    card: "border border-[#F6DADA] bg-[#FFF8F8] text-[#252B45] shadow-[0_1px_2px_rgba(37,43,69,0.04)]",
    label: "text-[#A26A6A]",
    value: "text-[#252B45]",
    hint: "text-[#B07C7C]",
    icon: "bg-[#FCE9E9] text-[#C93B3B]",
    glow: "bg-[#FCEFEF]",
  },
};

type StatCardProps = {
  label: string;
  value: ReactNode;
  hint?: string;
  icon: IconType;
  tone?: StatTone;
  className?: string;
};

export default function StatCard({
  label,
  value,
  hint,
  icon: Icon,
  tone = "white",
  className = "",
}: StatCardProps) {
  const styles = toneStyles[tone];

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_20px_40px_-20px_rgba(37,43,69,0.3)] ${styles.card} ${className}`}
    >
      <span
        aria-hidden
        className={`pointer-events-none absolute -right-8 -top-8 size-24 rounded-full ${styles.glow}`}
      />

      <div className="relative flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className={`text-[11px] font-semibold uppercase tracking-[0.08em] ${styles.label}`}>
            {label}
          </p>

          <p className={`mt-2 text-[28px] font-bold leading-none tracking-tight ${styles.value}`}>
            {value}
          </p>

          {hint ? (
            <p className={`mt-2.5 text-[11px] leading-4 ${styles.hint}`}>{hint}</p>
          ) : null}
        </div>

        <span
          className={`flex size-11 shrink-0 items-center justify-center rounded-xl transition-transform duration-200 group-hover:scale-105 ${styles.icon}`}
        >
          <Icon className="size-5" />
        </span>
      </div>
    </div>
  );
}
