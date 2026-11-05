const colorMap = {
  blue: {
    icon: "var(--primary-light)",
    iconColor: "var(--primary)",
    stripe: "var(--primary)",
  },
  cyan: {
    icon: "var(--primary-light)",
    iconColor: "var(--steel-blue)",
    stripe: "var(--steel-blue)",
  },
  green: {
    icon: "var(--success-light)",
    iconColor: "var(--success)",
    stripe: "var(--success)",
  },
  yellow: {
    icon: "var(--warning-light)",
    iconColor: "var(--warning)",
    stripe: "var(--warning)",
  },
  red: {
    icon: "var(--danger-light)",
    iconColor: "var(--danger)",
    stripe: "var(--danger)",
  },
  purple: {
    icon: "#F0EBF5",
    iconColor: "#6B5B8A",
    stripe: "#6B5B8A",
  },
};

export default function Card({ title, value, icon, trend, color = "blue" }) {
  const c = colorMap[color] || colorMap.blue;

  return (
    <div className="card p-4 overflow-hidden group">
      {/* Top accent stripe */}
      <div
        className="absolute top-0 left-0 right-0 h-[3px] opacity-60 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(90deg, ${c.stripe}, transparent)` }}
      />

      <div className="flex items-center gap-2.5 mb-3">
        {icon && (
          <span
            className="w-8 h-8 rounded-lg flex items-center justify-center text-sm transition-transform duration-200 group-hover:scale-105"
            style={{ background: c.icon, color: c.iconColor }}
          >
            {icon}
          </span>
        )}
        <p className="text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-wide">
          {title}
        </p>
      </div>

      <p
        className="text-2xl font-bold text-[var(--text-primary)]"
        style={{ fontVariantNumeric: "tabular-nums" }}
      >
        {value}
      </p>

      {trend && (
        <p
          className={`text-xs mt-2 font-semibold flex items-center gap-1 ${
            trend.up ? "text-[var(--success)]" : "text-[var(--danger)]"
          }`}
        >
          {trend.up ? "+" : ""}{trend.label}
        </p>
      )}
    </div>
  );
}
