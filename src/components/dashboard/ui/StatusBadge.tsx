const statusStyles: Record<string, string> = {
  pending: "border-[#F7E1B5] bg-[#FFF7E8] text-[#A9690B]",
  approved: "border-[#BFEFDD] bg-[#E9FBF4] text-[#0E8A66]",
  accepted: "border-[#BFEFDD] bg-[#E9FBF4] text-[#0E8A66]",
  active: "border-[#BFEFDD] bg-[#E9FBF4] text-[#0E8A66]",
  paid: "border-[#BFEFDD] bg-[#E9FBF4] text-[#0E8A66]",
  premium: "border-[#CFDDFB] bg-[#EEF4FF] text-[#2F63D4]",
  rejected: "border-[#F8CACA] bg-[#FEF0F0] text-[#C93B3B]",
  blocked: "border-[#F8CACA] bg-[#FEF0F0] text-[#C93B3B]",
  inactive: "border-[#E3E7F1] bg-[#F4F6FB] text-[#5B6478]",
  free: "border-[#E3E7F1] bg-[#F4F6FB] text-[#5B6478]",
};

type StatusBadgeProps = {
  status: string;
  label?: string;
  className?: string;
};

export default function StatusBadge({
  status,
  label,
  className = "",
}: StatusBadgeProps) {
  const key = (status || "").toLowerCase();
  const style =
    statusStyles[key] ?? "border-[#E3E7F1] bg-[#F4F6FB] text-[#5B6478]";

  return (
    <span
      className={`inline-flex w-fit items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold capitalize ${style} ${className}`}
    >
      <span className="size-1.5 rounded-full bg-current" />
      {label ?? status}
    </span>
  );
}
