import { useEffect, useState } from "react";
import { X, Tag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function CategoryModal({ isOpen, onClose, onSave, initialData }) {
  const [name, setName] = useState("");
  const [status, setStatus] = useState("Active");
  const [error, setError] = useState("");
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setStatus(initialData.status);
    } else {
      setName("");
      setStatus("Active");
    }
    setError("");
    setTouched(false);
  }, [initialData, isOpen]);

  const validate = () => {
    if (!name.trim()) return "Category name is required";
    if (name.trim().length < 2) return "Name must be at least 2 characters";
    return "";
  };

  const handleBlur = () => {
    setTouched(true);
    setError(validate());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const v = validate();
    setError(v);
    setTouched(true);
    if (v) return;
    onSave({ name: name.trim(), status });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="modal-backdrop" onClick={onClose}>
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="modal w-full max-w-md mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center"
                  style={{ background: "var(--primary-light)" }}
                >
                  <Tag size={16} className="text-[var(--primary)]" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-[var(--text-primary)]">
                    {initialData ? "Edit Category" : "Add Category"}
                  </h2>
                  <p className="text-[11px] text-[var(--text-muted)]">
                    {initialData ? "Update the category details below" : "Create a new category for your products"}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] transition"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">
                  Category Name <span style={{ color: "var(--danger)" }}>*</span>
                </label>
                <input
                  className="w-full text-sm"
                  style={
                    touched && error
                      ? { borderColor: "var(--danger)", boxShadow: "0 0 0 2px rgba(184, 74, 74, 0.1)" }
                      : {}
                  }
                  placeholder="Enter category name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onBlur={handleBlur}
                />
                {touched && error && (
                  <p className="mt-1 text-[11px] font-medium" style={{ color: "var(--danger)" }}>
                    {error}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">
                  Status
                </label>
                <select className="w-full text-sm" value={status} onChange={(e) => setStatus(e.target.value)}>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-2">
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
