import { AlertTriangle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function DeleteConfirmModal({ isOpen, onClose, onConfirm }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="modal-backdrop" onClick={onClose}>
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 16 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="modal w-full max-w-sm mx-4 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 rounded-xl flex items-center justify-center text-[var(--text-muted)] hover:text-white hover:bg-[var(--glass-bg)] transition-all"
            >
              <X size={16} />
            </button>

            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
              style={{
                background: "var(--danger-soft)",
                border: "1px solid rgba(248,113,113,0.15)",
                boxShadow: "0 4px 20px rgba(248,113,113,0.1), inset 0 1px 0 rgba(255,255,255,0.04)",
              }}
            >
              <AlertTriangle size={22} className="text-[var(--danger)]" />
            </div>

            <h2 className="text-lg font-bold text-white">Confirm Delete</h2>
            <p className="mt-2 text-sm text-[var(--text-secondary)] leading-relaxed">
              Are you sure you want to delete this item? This action cannot be undone.
            </p>

            <div className="flex justify-end gap-3 mt-6">
              <button onClick={onClose} className="btn btn-secondary text-sm">Cancel</button>
              <button onClick={onConfirm} className="btn btn-danger text-sm">Delete</button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
