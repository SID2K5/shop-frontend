export function SkeletonPulse({ className = "" }) {
  return (
    <div
      className={`animate-pulse rounded-[var(--radius-sm)] ${className}`}
      style={{ background: "var(--bg-secondary)" }}
    />
  );
}

export function SkeletonCard() {
  return (
    <div className="card p-4 overflow-hidden">
      <div className="flex items-center gap-2.5 mb-3">
        <SkeletonPulse className="w-9 h-9 rounded-lg" />
        <SkeletonPulse className="h-3 w-20" />
      </div>
      <SkeletonPulse className="h-7 w-16 mb-2" />
      <SkeletonPulse className="h-3 w-12" />
    </div>
  );
}

export function SkeletonTableRow({ cols = 6 }) {
  return (
    <tr>
      {Array.from({ length: cols }).map((_, i) => (
        <td key={i} className="px-5 py-3">
          <SkeletonPulse className={`h-4 ${i === 0 ? "w-28" : i === cols - 1 ? "w-32 mx-auto" : "w-16"}`} />
        </td>
      ))}
    </tr>
  );
}

export function SkeletonChart() {
  return (
    <div className="flex items-end gap-3 h-[220px] px-8 pb-4">
      {[40, 65, 50, 80, 55, 70, 45].map((h, i) => (
        <SkeletonPulse
          key={i}
          className="flex-1 rounded-t-md"
          style={{ height: `${h}%` }}
        />
      ))}
    </div>
  );
}
