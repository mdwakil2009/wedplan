import type { ReactNode } from "react";
import type { IconType } from "react-icons";

type SectionCardProps = {
  title?: string;
  description?: string;
  action?: ReactNode;
  icon?: IconType;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
};

export default function SectionCard({
  title,
  description,
  action,
  icon: Icon,
  children,
  className = "",
  bodyClassName = "p-5 sm:p-6",
}: SectionCardProps) {
  return (
    <section
      className={`overflow-hidden rounded-2xl border border-[#E7EBF5] bg-white shadow-[0_1px_2px_rgba(37,43,69,0.04)] ${className}`}
    >
      {title || action ? (
        <div className="flex flex-col gap-3 border-b border-[#EDF0F8] px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            {Icon ? (
              <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[#EEF4FF] text-[#3A76EF]">
                <Icon className="size-4" />
              </span>
            ) : null}

            <div className="min-w-0">
              <h2 className="text-[15px] font-bold tracking-tight text-[#252B45]">
                {title}
              </h2>

              {description ? (
                <p className="mt-0.5 text-xs leading-5 text-[#7A839B]">
                  {description}
                </p>
              ) : null}
            </div>
          </div>

          {action ? <div className="shrink-0">{action}</div> : null}
        </div>
      ) : null}

      <div className={bodyClassName}>{children}</div>
    </section>
  );
}
