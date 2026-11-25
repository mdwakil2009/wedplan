type ChartItem = {
  label: string;
  value: number;
  color: string;
};

type MiniBarChartProps = {
  items: ChartItem[];
  emptyLabel?: string;
};

export default function MiniBarChart({
  items,
  emptyLabel = "No data available yet.",
}: MiniBarChartProps) {
  const total = items.reduce((sum, item) => sum + item.value, 0);

  if (total === 0) {
    return (
      <p className="rounded-xl bg-[#F9FAFF] px-4 py-6 text-center text-xs text-[#8A93A8]">
        {emptyLabel}
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {items.map((item) => {
        const percentage = Math.round((item.value / total) * 100);

        return (
          <div key={item.label}>
            <div className="flex items-center justify-between gap-3 text-xs">
              <span className="flex min-w-0 items-center gap-2 font-medium text-[#4A5268]">
                <span className={`size-2 shrink-0 rounded-full ${item.color}`} />
                <span className="truncate">{item.label}</span>
              </span>

              <span className="shrink-0 font-semibold text-[#252B45]">
                {item.value}
                <span className="ml-1 font-normal text-[#8A93A8]">
                  ({percentage}%)
                </span>
              </span>
            </div>

            <div className="mt-2 h-2 overflow-hidden rounded-full bg-[#F0F3FA]">
              <div
                className={`h-full rounded-full transition-all duration-500 ${item.color}`}
                style={{ width: `${(item.value / total) * 100}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
