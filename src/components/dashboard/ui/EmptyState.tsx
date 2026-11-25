import type { ReactNode } from "react";
import type { IconType } from "react-icons";

type EmptyStateProps = {
  icon: IconType;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
};

export default function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className = "",
}: EmptyStateProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#DCE3F1] bg-[#F9FAFF] px-6 py-12 text-center ${className}`}
    >
      <span className="flex size-12 items-center justify-center rounded-2xl bg-[#EEF4FF] text-[#3A76EF]">
        <Icon className="size-5" />
      </span>

      <h3 className="mt-4 text-sm font-bold text-[#252B45]">{title}</h3>

      {description ? (
        <p className="mt-1.5 max-w-sm text-xs leading-5 text-[#7A839B]">
          {description}
        </p>
      ) : null}

      {action ? <div className="mt-5">{action}</div> : null}
    </div>
  );
}
