import { useEffect, useState } from "react";

export default function ProductModal({
  isOpen,
  onClose,
  onSave,
  initialData,
  categories,
}) {
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    quantity: "",
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name,
        category: initialData.category,
        price: initialData.price,
        quantity: initialData.quantity,
      });
    } else {
      setForm({ name: "", category: "", price: "", quantity: "" });
    }
  }, [initialData]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSave({
      ...form,
      price: Number(form.price),
      quantity: Number(form.quantity),
    });
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="w-full max-w-md rounded-xl p-6
                      bg-gradient-to-br from-slate-900 to-slate-800
                      border border-slate-700 shadow-2xl">

        <h2 className="text-xl font-semibold text-white mb-6">
          {initialData ? "Edit Product" : "Add Product"}
        </h2>

        {/* Product Name */}
        <input
          type="text"
          name="name"
          placeholder="Product name"
          value={form.name}
          onChange={handleChange}
          className="w-full mb-4 px-4 py-3 rounded-lg
                     bg-slate-800 text-white placeholder-gray-400
                     border border-slate-700
                     focus:outline-none focus:ring-2 focus:ring-blue-600"
        />

        {/* Category */}
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="w-full mb-4 px-4 py-3 rounded-lg
                     bg-slate-800 text-white
                     border border-slate-700
                     focus:outline-none focus:ring-2 focus:ring-blue-600"
        >
          <option value="">Select category</option>
          {categories.map((c) => (
            <option key={c._id} value={c.name}>
              {c.name}
            </option>
          ))}
        </select>

        {/* Price */}
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          className="w-full mb-4 px-4 py-3 rounded-lg
                     bg-slate-800 text-white placeholder-gray-400
                     border border-slate-700
                     focus:outline-none focus:ring-2 focus:ring-blue-600"
        />

        {/* Quantity */}
        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={form.quantity}
          onChange={handleChange}
          className="w-full mb-6 px-4 py-3 rounded-lg
                     bg-slate-800 text-white placeholder-gray-400
                     border border-slate-700
                     focus:outline-none focus:ring-2 focus:ring-blue-600"
        />

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg
                       bg-slate-700 text-white
                       hover:bg-slate-600 transition"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded-lg
                       bg-blue-600 text-white
                       hover:bg-blue-700 transition"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
