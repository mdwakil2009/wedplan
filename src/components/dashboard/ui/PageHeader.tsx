import type { ReactNode } from "react";
import { GiDiamondRing } from "react-icons/gi";

type PageHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
  action?: ReactNode;
  children?: ReactNode;
};

export default function PageHeader({
  eyebrow,
  title,
  description,
  action,
  children,
}: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="min-w-0">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-[#DCE6FF] bg-[#EEF4FF] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[#3A76EF]">
          <GiDiamondRing className="size-3" />
          {eyebrow}
        </span>

        <h1 className="mt-3 text-2xl font-bold tracking-tight text-[#252B45] sm:text-[28px]">
          {title}
        </h1>

        {description ? (
          <p className="mt-1.5 max-w-2xl text-sm leading-6 text-[#6B7389]">
            {description}
          </p>
        ) : null}

        {children}
      </div>

      {action ? (
        <div className="flex shrink-0 flex-wrap items-center gap-2">{action}</div>
      ) : null}
    </div>
  );
}
