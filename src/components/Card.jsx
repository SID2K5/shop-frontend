const colorMap = {
  blue: {
    icon: "bg-blue-500/15 text-blue-400",
    bar: "from-blue-500",
  },
  cyan: {
    icon: "bg-cyan-500/15 text-cyan-400",
    bar: "from-cyan-500",
  },
  green: {
    icon: "bg-green-500/15 text-green-400",
    bar: "from-green-500",
  },
  yellow: {
    icon: "bg-yellow-500/15 text-yellow-400",
    bar: "from-yellow-500",
  },
  red: {
    icon: "bg-red-500/15 text-red-400",
    bar: "from-red-500",
  },
  purple: {
    icon: "bg-purple-500/15 text-purple-400",
    bar: "from-purple-500",
  },
};

export default function Card({ title, value, icon, trend, color = "blue" }) {
  const colors = colorMap[color] || colorMap.blue;

  return (
    <div className="card p-4 sm:p-5 group">
      <div className="flex items-center gap-2 mb-2">
        {icon && (
          <span
            className={`w-7 h-7 rounded-lg flex items-center justify-center text-sm ${colors.icon}`}
          >
            {icon}
          </span>
        )}
        <p className="text-xs text-[var(--text-muted)] font-medium">{title}</p>
      </div>

      <p className="text-2xl font-bold text-white" style={{ fontVariantNumeric: "tabular-nums" }}>
        {value}
      </p>

      {trend && (
        <p
          className={`text-xs mt-1.5 font-medium flex items-center gap-1 ${
            trend.up ? "text-green-400" : "text-red-400"
          }`}
        >
          {trend.up ? "↑" : "↓"} {trend.label}
        </p>
      )}

      {/* Accent bar */}
      <div
        className={`absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r ${colors.bar} to-transparent opacity-60 group-hover:opacity-100 transition-opacity`}
      />
    </div>
  );
}
