import AnimatedCounter from "./AnimatedCounter";

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
    icon: "var(--purple-light)",
    iconColor: "var(--purple)",
    stripe: "var(--purple)",
  },
};

function MiniSparkline({ data, color, width = 60, height = 24 }) {
  if (!data || data.length < 2) return null;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const step = width / (data.length - 1);

  const points = data.map((v, i) => {
    const x = i * step;
    const y = height - ((v - min) / range) * (height - 4) - 2;
    return `${x},${y}`;
  }).join(" ");

  return (
    <svg width={width} height={height} className="opacity-60 group-hover:opacity-100 transition-opacity duration-300">
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Card({ title, value, icon, trend, color = "blue", sparkline }) {
  const c = colorMap[color] || colorMap.blue;

  return (
    <div className="card p-4 overflow-hidden group">
      {/* Top accent stripe */}
      <div
        className="absolute top-0 left-0 right-0 h-[3px] opacity-60 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(90deg, ${c.stripe}, transparent)` }}
      />

      {/* Decorative background glow */}
      <div
        className="absolute -top-8 -right-8 w-28 h-28 rounded-full opacity-[0.05] group-hover:opacity-[0.1] transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(circle, ${c.stripe}, transparent 70%)` }}
      />

      {/* Hover shimmer sweep */}
      <div className="card-shimmer" />

      <div className="relative flex items-center justify-between mb-3">
        <div className="flex items-center gap-2.5">
          {icon && (
            <span
              className="w-9 h-9 rounded-lg flex items-center justify-center text-sm transition-all duration-200 group-hover:scale-110 group-hover:shadow-sm"
              style={{ background: c.icon, color: c.iconColor }}
            >
              {icon}
            </span>
          )}
          <p className="text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-wide">
            {title}
          </p>
        </div>
        {sparkline && <MiniSparkline data={sparkline} color={c.stripe} />}
      </div>

      <p
        className="relative text-2xl font-bold text-[var(--text-primary)]"
        style={{ fontVariantNumeric: "tabular-nums" }}
      >
        <AnimatedCounter value={value} />
      </p>

      {trend && (
        <p
          className={`relative text-xs mt-2 font-semibold flex items-center gap-1 ${
            trend.up ? "text-[var(--success)]" : "text-[var(--danger)]"
          }`}
        >
          {trend.up ? "+" : ""}{trend.label}
        </p>
      )}
    </div>
  );
}
