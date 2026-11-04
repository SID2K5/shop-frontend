import { useEffect, useState } from "react";
import { fetchCategories } from "../services/categoryService";
import { X, Package } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ProductModal({ isOpen, onClose, onSave, initialData }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (isOpen) loadCategories();
  }, [isOpen]);

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || "");
      setCategory(initialData.category?._id || initialData.category || "");
      setPrice(initialData.price || "");
      setQuantity(initialData.quantity || "");
    } else {
      resetForm();
    }
  }, [initialData]);

  const resetForm = () => { setName(""); setCategory(""); setPrice(""); setQuantity(""); };

  const loadCategories = async () => {
    try {
      const data = await fetchCategories();
      setCategories(data.filter((c) => c.status === "Active"));
    } catch {
      setCategories([]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !category || !price || !quantity) return;
    onSave({ name, category, price: Number(price), quantity: Number(quantity) });
    resetForm();
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
                    background: "var(--accent-soft)",
                    border: "1px solid rgba(79,142,255,0.15)",
                    boxShadow: "0 4px 16px rgba(79,142,255,0.1), inset 0 1px 0 rgba(255,255,255,0.05)",
                  }}
                >
                  <Package size={18} className="text-[var(--accent)]" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">
                    {initialData ? "Edit Product" : "Add Product"}
                  </h2>
                  <p className="text-[11px] text-[var(--text-muted)]">
                    {initialData ? "Update the product details below" : "Fill in the details to add a new product"}
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
                  Product Name
                </label>
                <input
                  className="w-full text-sm"
                  placeholder="Enter product name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-wide mb-1.5">
                  Category
                </label>
                <select className="w-full text-sm" value={category} onChange={(e) => setCategory(e.target.value)}>
                  <option value="">Select category</option>
                  {categories.map((c) => (
                    <option key={c._id} value={c._id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-wide mb-1.5">
                    Price (₹)
                  </label>
                  <input
                    type="number"
                    className="w-full text-sm"
                    placeholder="0"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-wide mb-1.5">
                    Quantity
                  </label>
                  <input
                    type="number"
                    className="w-full text-sm"
                    placeholder="0"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button type="button" onClick={onClose} className="btn btn-secondary text-sm">Cancel</button>
                <button type="submit" className="btn btn-primary text-sm">
                  {initialData ? "Save Changes" : "Add Product"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
