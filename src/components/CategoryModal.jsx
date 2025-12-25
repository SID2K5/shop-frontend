import { useState, useEffect } from "react";

export default function CategoryModal({ isOpen, onClose, onSave, initialData }) {
  const [name, setName] = useState("");
  const [status, setStatus] = useState("Active");

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setStatus(initialData.status || "Active");
    } else {
      setName("");
      setStatus("Active");
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-xl p-6">
        <h2 className="text-lg font-bold mb-4">
          {initialData ? "Edit Category" : "Add Category"}
        </h2>

        <input
          className="w-full border rounded-lg px-3 py-2 mb-4"
          placeholder="Category name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <select
          className="w-full border rounded-lg px-3 py-2 mb-4"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>

        <div className="flex justify-end gap-3">
          <button className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button
            className="btn btn-primary"
            onClick={() => onSave({ name, status })}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
