import { X, History, TrendingUp, TrendingDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function StockHistoryModal({ product, isOpen, onClose }) {
  const logs = product?.stockHistory || [];

  return (
    <AnimatePresence>
      {isOpen && product && (
        <div className="modal-backdrop" onClick={onClose}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="modal w-full max-w-2xl mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/15 border border-purple-400/20 flex items-center justify-center">
                  <History size={18} className="text-purple-400" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">
                    Stock History
                  </h2>
                  <p className="text-xs text-[var(--text-muted)]">
                    {product.name}
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-[var(--text-muted)] hover:text-white hover:bg-[var(--bg-surface)] transition"
              >
                <X size={16} />
              </button>
            </div>

            {logs.length === 0 ? (
              <div className="py-10 text-center">
                <div className="w-12 h-12 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-default)] flex items-center justify-center mx-auto mb-3">
                  <History size={20} className="text-[var(--text-muted)]" />
                </div>
                <p className="text-sm text-[var(--text-muted)]">
                  No history available for this product.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto rounded-[var(--radius-md)] border border-[var(--border-default)]">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="px-4 py-3 text-center">Previous</th>
                      <th className="px-4 py-3 text-center">New</th>
                      <th className="px-4 py-3 text-center">Change</th>
                      <th className="px-4 py-3 text-center">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {logs.map((l, i) => {
                      const change = l.newQty - l.previousQty;
                      return (
                        <tr key={i} className="text-center">
                          <td
                            className="px-4 py-3 text-[var(--text-secondary)]"
                            style={{ fontVariantNumeric: "tabular-nums" }}
                          >
                            {l.previousQty}
                          </td>
                          <td
                            className="px-4 py-3 text-[var(--text-secondary)]"
                            style={{ fontVariantNumeric: "tabular-nums" }}
                          >
                            {l.newQty}
                          </td>
                          <td className="px-4 py-3">
                            <span
                              className={`inline-flex items-center gap-1 text-sm font-semibold ${
                                change > 0
                                  ? "text-green-400"
                                  : "text-red-400"
                              }`}
                              style={{ fontVariantNumeric: "tabular-nums" }}
                            >
                              {change > 0 ? (
                                <TrendingUp size={13} />
                              ) : (
                                <TrendingDown size={13} />
                              )}
                              {change > 0 ? "+" : ""}
                              {change}
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
              <button onClick={onClose} className="btn btn-secondary text-sm">
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
