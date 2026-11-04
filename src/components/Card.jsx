const colorMap = {
  blue: {
    icon: "rgba(96,165,250,0.12)",
    iconColor: "#60a5fa",
    glow: "rgba(96,165,250,0.08)",
    bar: "linear-gradient(90deg, #4f8eff, transparent)",
  },
  cyan: {
    icon: "rgba(0,212,255,0.12)",
    iconColor: "#00d4ff",
    glow: "rgba(0,212,255,0.08)",
    bar: "linear-gradient(90deg, #00d4ff, transparent)",
  },
  green: {
    icon: "rgba(52,211,153,0.12)",
    iconColor: "#34d399",
    glow: "rgba(52,211,153,0.08)",
    bar: "linear-gradient(90deg, #34d399, transparent)",
  },
  yellow: {
    icon: "rgba(251,191,36,0.12)",
    iconColor: "#fbbf24",
    glow: "rgba(251,191,36,0.08)",
    bar: "linear-gradient(90deg, #fbbf24, transparent)",
  },
  red: {
    icon: "rgba(248,113,113,0.12)",
    iconColor: "#f87171",
    glow: "rgba(248,113,113,0.08)",
    bar: "linear-gradient(90deg, #f87171, transparent)",
  },
  purple: {
    icon: "rgba(192,132,252,0.12)",
    iconColor: "#c084fc",
    glow: "rgba(192,132,252,0.08)",
    bar: "linear-gradient(90deg, #a855f7, transparent)",
  },
};

export default function Card({ title, value, icon, trend, color = "blue" }) {
  const c = colorMap[color] || colorMap.blue;

  return (
    <div className="card p-5 group">
      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[inherit] pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 50% 0%, ${c.glow}, transparent 70%)`,
        }}
      />

      <div className="relative z-10">
        <div className="flex items-center gap-2.5 mb-3">
          {icon && (
            <span
              className="w-8 h-8 rounded-xl flex items-center justify-center text-sm"
              style={{
                background: c.icon,
                color: c.iconColor,
                boxShadow: `inset 0 1px 0 rgba(255,255,255,0.06)`,
              }}
            >
              {icon}
            </span>
          )}
          <p className="text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-wide">
            {title}
          </p>
        </div>

        <p
          className="text-2xl font-bold text-white"
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
            {trend.up ? "↑" : "↓"} {trend.label}
          </p>
        )}
      </div>

      {/* Bottom glow bar */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[2px] opacity-50 group-hover:opacity-100 transition-opacity"
        style={{ background: c.bar }}
      />
    </div>
  );
}
