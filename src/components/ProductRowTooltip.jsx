import { useState, useRef } from "react";

export default function ProductRowTooltip({ product, children }) {
  const [show, setShow] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const timeoutRef = useRef(null);

  const handleEnter = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPos({ x: rect.left + rect.width / 2, y: rect.top });
    timeoutRef.current = setTimeout(() => setShow(true), 400);
  };

  const handleLeave = () => {
    clearTimeout(timeoutRef.current);
    setShow(false);
  };

  const status = product.quantity === 0
    ? { label: "Out of Stock", color: "var(--danger)" }
    : product.quantity <= 1
      ? { label: "Low Stock", color: "var(--warning)" }
      : { label: "In Stock", color: "var(--success)" };

  return (
    <div onMouseEnter={handleEnter} onMouseLeave={handleLeave} className="contents">
      {children}
      {show && (
        <div
          className="fixed z-[100] pointer-events-none"
          style={{
            left: Math.min(pos.x, window.innerWidth - 220),
            top: pos.y - 8,
            transform: "translate(-50%, -100%)",
          }}
        >
          <div
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-md)",
              padding: "10px 14px",
              boxShadow: "var(--shadow-lg)",
              minWidth: 180,
            }}
          >
            <p className="text-xs font-bold text-[var(--text-primary)] mb-2 truncate">{product.name}</p>
            <div className="space-y-1.5">
              <div className="flex justify-between text-[11px]">
                <span className="text-[var(--text-muted)]">Category</span>
                <span className="text-[var(--text-secondary)] font-medium">{product.category?.name || "—"}</span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span className="text-[var(--text-muted)]">Price</span>
                <span className="text-[var(--text-secondary)] font-medium" style={{ fontVariantNumeric: "tabular-nums" }}>
                  ₹{product.price.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span className="text-[var(--text-muted)]">Stock</span>
                <span className="text-[var(--text-secondary)] font-medium">{product.quantity} units</span>
              </div>
              <div className="flex justify-between text-[11px] items-center">
                <span className="text-[var(--text-muted)]">Status</span>
                <span className="flex items-center gap-1 font-semibold" style={{ color: status.color }}>
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: status.color }} />
                  {status.label}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
