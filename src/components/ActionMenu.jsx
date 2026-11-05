import { useState, useRef, useEffect } from "react";
import { MoreHorizontal } from "lucide-react";

export default function ActionMenu({ actions }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    if (open) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  return (
    <div ref={ref} className="relative inline-flex">
      {/* Desktop: show buttons */}
      <div className="hidden sm:flex items-center gap-2">
        {actions.map((a, i) => (
          <button key={i} onClick={a.onClick} className={`action-btn ${a.className}`}>
            {a.icon}
            {a.label}
          </button>
        ))}
      </div>

      {/* Mobile: dropdown */}
      <div className="sm:hidden">
        <button
          onClick={() => setOpen(!open)}
          className="w-8 h-8 rounded-[var(--radius-sm)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] transition border border-[var(--border)]"
        >
          <MoreHorizontal size={16} />
        </button>

        {open && (
          <div
            className="absolute right-0 top-full mt-1 z-30 min-w-[140px] py-1 rounded-[var(--radius-md)]"
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
              boxShadow: "var(--shadow-lg)",
            }}
          >
            {actions.map((a, i) => (
              <button
                key={i}
                onClick={() => { a.onClick(); setOpen(false); }}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium transition-colors hover:bg-[var(--bg-secondary)]"
                style={{ color: a.color || "var(--text-secondary)" }}
              >
                {a.icon}
                {a.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
