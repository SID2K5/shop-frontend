import { X, History, TrendingUp, TrendingDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function StockHistoryModal({ product, isOpen, onClose }) {
  const logs = product?.stockHistory || [];

  return (
    <AnimatePresence>
      {isOpen && product && (
        <div className="modal-backdrop" onClick={onClose}>
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 16 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="modal w-full max-w-2xl mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{
                    background: "var(--purple-soft)",
                    border: "1px solid rgba(168,85,247,0.15)",
                    boxShadow: "0 4px 16px rgba(168,85,247,0.1), inset 0 1px 0 rgba(255,255,255,0.05)",
                  }}
                >
                  <History size={18} className="text-[var(--purple)]" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">Stock History</h2>
                  <p className="text-[11px] text-[var(--text-muted)]">{product.name}</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-xl flex items-center justify-center text-[var(--text-muted)] hover:text-white hover:bg-[var(--glass-bg)] transition-all"
              >
                <X size={16} />
              </button>
            </div>

            {logs.length === 0 ? (
              <div className="py-10 text-center">
                <div className="w-12 h-12 rounded-xl glass flex items-center justify-center mx-auto mb-3">
                  <History size={20} className="text-[var(--text-muted)]" />
                </div>
                <p className="text-sm text-[var(--text-muted)]">No history available for this product.</p>
              </div>
            ) : (
              <div className="overflow-x-auto rounded-[var(--radius-md)] border border-[var(--glass-border)]">
                <table className="w-full">
                  <thead>
                    <tr>
                      {["Previous", "New", "Change", "Date"].map((h) => (
                        <th key={h} className="px-4 py-3 text-center">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {logs.map((l, i) => {
                      const change = l.newQty - l.previousQty;
                      return (
                        <tr key={i} className="text-center">
                          <td className="px-4 py-3 text-[var(--text-secondary)]" style={{ fontVariantNumeric: "tabular-nums" }}>
                            {l.previousQty}
                          </td>
                          <td className="px-4 py-3 text-[var(--text-secondary)]" style={{ fontVariantNumeric: "tabular-nums" }}>
                            {l.newQty}
                          </td>
                          <td className="px-4 py-3">
                            <span
                              className={`inline-flex items-center justify-center gap-1 text-sm font-semibold ${
                                change > 0 ? "text-[var(--success)]" : "text-[var(--danger)]"
                              }`}
                              style={{ fontVariantNumeric: "tabular-nums" }}
                            >
                              {change > 0 ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
                              {change > 0 ? "+" : ""}{change}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-xs text-[var(--text-muted)]">
                            {new Date(l.date).toLocaleString()}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}

            <div className="flex justify-end mt-5">
              <button onClick={onClose} className="btn btn-secondary text-sm">Close</button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
