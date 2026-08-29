import { useEffect, useState } from "react";
import { fetchCategories } from "../services/categoryService";

export default function ProductModal({ isOpen, onClose, onSave, initialData }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [categories, setCategories] = useState([]);

  /* ================= LOAD CATEGORIES ================= */
  useEffect(() => {
    if (isOpen) {
      loadCategories();
    }
  }, [isOpen]);

  /* ================= EDIT MODE ================= */
  useEffect(() => {
    if (initialData) {
      setName(initialData.name || "");
      setCategory(initialData.category?._id || "");
      setPrice(initialData.price || "");
      setQuantity(initialData.quantity || "");
    } else {
      resetForm();
    }
  }, [initialData]);

  const resetForm = () => {
    setName("");
    setCategory("");
    setPrice("");
    setQuantity("");
  };

  const loadCategories = async () => {
    try {
      const data = await fetchCategories();

      // ✅ only ACTIVE categories
      const active = data.filter((c) => c.status === "Active");

      setCategories(active);

      // 🔍 DEBUG (remove later)
      console.log("Loaded categories:", active);
    } catch (err) {
      console.error("Failed to load categories", err);
      setCategories([]);
    }
  };

  const handleSubmit = () => {
    if (!name || !category || !price || !quantity) return;

    onSave({
      name,
      category,
      price: Number(price),
      quantity: Number(quantity),
    });

    resetForm();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-slate-900 p-6 rounded-xl w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">
          {initialData ? "Edit Product" : "Add Product"}
        </h2>

        <input
          className="w-full mb-3 p-2 rounded bg-slate-800"
          placeholder="Product name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {/* ✅ CATEGORY DROPDOWN */}
        <select
          className="w-full mb-3 p-2 rounded bg-slate-800"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select category</option>
          {categories.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>

        <input
          type="number"
          className="w-full mb-3 p-2 rounded bg-slate-800"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <input
          type="number"
          className="w-full mb-4 p-2 rounded bg-slate-800"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-slate-700"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded bg-blue-600"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
