export default function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <div className="py-16 flex flex-col items-center justify-center text-center">
      <div className="relative mb-5">
        {/* Decorative rings */}
        <div
          className="absolute inset-0 w-20 h-20 -top-4 -left-4 rounded-full opacity-[0.08]"
          style={{ background: "radial-gradient(circle, var(--primary), transparent 70%)" }}
        />
        <div
          className="relative w-12 h-12 rounded-xl flex items-center justify-center"
          style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)" }}
        >
          {Icon && <Icon size={22} className="text-[var(--text-muted)]" />}
        </div>
      </div>
      <h3 className="text-sm font-semibold text-[var(--text-primary)]">{title}</h3>
      <p className="mt-1.5 text-sm text-[var(--text-muted)] max-w-xs">{description}</p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
