import { useEffect, useState } from "react";
import { X, Tag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function CategoryModal({ isOpen, onClose, onSave, initialData }) {
  const [name, setName] = useState("");
  const [status, setStatus] = useState("Active");

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setStatus(initialData.status);
    } else {
      setName("");
      setStatus("Active");
    }
  }, [initialData, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) return;
    onSave({ name, status });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="modal-backdrop" onClick={onClose}>
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 16 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="modal w-full max-w-md mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{
                    background: "rgba(0,212,255,0.1)",
                    border: "1px solid rgba(0,212,255,0.15)",
                    boxShadow: "0 4px 16px rgba(0,212,255,0.1), inset 0 1px 0 rgba(255,255,255,0.05)",
                  }}
                >
                  <Tag size={18} className="text-[var(--cyan)]" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">
                    {initialData ? "Edit Category" : "Add Category"}
                  </h2>
                  <p className="text-[11px] text-[var(--text-muted)]">
                    {initialData ? "Update the category details below" : "Create a new category for your products"}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-xl flex items-center justify-center text-[var(--text-muted)] hover:text-white hover:bg-[var(--glass-bg)] transition-all"
              >
                <X size={16} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-wide mb-1.5">
                  Category Name
                </label>
                <input
                  className="w-full text-sm"
                  placeholder="Enter category name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-wide mb-1.5">
                  Status
                </label>
                <select className="w-full text-sm" value={status} onChange={(e) => setStatus(e.target.value)}>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button type="button" onClick={onClose} className="btn btn-secondary text-sm">Cancel</button>
                <button type="submit" className="btn btn-primary text-sm">
                  {initialData ? "Save Changes" : "Add Category"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
