import { useEffect, useState } from "react";

export default function CategoryModal({
  isOpen,
  onClose,
  onSave,
  initialData,
}) {
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 w-full max-w-md">
        <h2 className="text-lg font-semibold text-white mb-4">
          {initialData ? "Edit Category" : "Add Category"}
        </h2>

        <input
          className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 mb-4 text-white"
          placeholder="Category name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <select
          className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 mb-6 text-white"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave({ name, status })}
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
