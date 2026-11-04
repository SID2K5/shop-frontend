import { AlertTriangle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function DeleteConfirmModal({ isOpen, onClose, onConfirm }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="modal-backdrop" onClick={onClose}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="modal w-full max-w-sm mx-4 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 rounded-lg flex items-center justify-center text-[var(--text-muted)] hover:text-white hover:bg-[var(--bg-surface)] transition"
            >
              <X size={16} />
            </button>

            <div className="w-12 h-12 rounded-xl bg-[var(--danger-muted)] border border-red-500/20 flex items-center justify-center mb-4">
              <AlertTriangle size={22} className="text-red-400" />
            </div>

            <h2 className="text-lg font-bold text-white">Confirm Delete</h2>
            <p className="mt-2 text-sm text-[var(--text-secondary)] leading-relaxed">
              Are you sure you want to delete this item? This action cannot be
              undone.
            </p>

            <div className="flex justify-end gap-3 mt-6">
              <button onClick={onClose} className="btn btn-secondary text-sm">
                Cancel
              </button>
              <button onClick={onConfirm} className="btn btn-danger text-sm">
                Delete
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
