import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [deleteId, setDeleteId] = useState(null);

  /* ================= FETCH ================= */
  const fetchCategories = async () => {
    try {
      const res = await api.get("/categories");
      setCategories(res.data);
    } catch (err) {
      console.error("Failed to fetch categories", err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  /* ================= ADD ================= */
  const addCategory = async () => {
    if (!name.trim()) return;

    try {
      await api.post("/categories", { name });
      setName("");
      fetchCategories();
    } catch (err) {
      console.error("Failed to add category", err);
    }
  };

  /* ================= TOGGLE STATUS ================= */
  const toggleStatus = async (id, status) => {
    try {
      await api.put(`/categories/${id}`, {
        status: status === "Active" ? "Inactive" : "Active",
      });
      fetchCategories();
    } catch (err) {
      console.error("Failed to update category", err);
    }
  };

  /* ================= DELETE ================= */
  const deleteCategory = async () => {
    try {
      await api.delete(`/categories/${deleteId}`);
      setDeleteId(null);
      fetchCategories();
    } catch (err) {
      console.error("Failed to delete category", err);
    }
  };

  return (
    <div className="p-6 text-gray-100">
      <h1 className="text-2xl font-bold mb-6">Categories</h1>

      {/* ===== ADD CATEGORY ===== */}
      <div className="flex gap-3 mb-6">
        <input
          className="bg-slate-800 border border-slate-700 px-3 py-2 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
          placeholder="New category"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button
          onClick={addCategory}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
        >
          Add
        </button>
      </div>

      {/* ===== TABLE ===== */}
      <div className="bg-slate-900 rounded-xl shadow border border-slate-800 overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-800 text-gray-300">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {categories.map((c) => (
              <tr
                key={c._id}
                className="border-t border-slate-800 hover:bg-slate-800/60 transition"
              >
                <td className="p-3">{c.name}</td>

                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded text-sm font-medium ${
                      c.status === "Active"
                        ? "bg-green-900/40 text-green-400"
                        : "bg-red-900/40 text-red-400"
                    }`}
                  >
                    {c.status}
                  </span>
                </td>

                <td className="p-3 flex gap-4">
                  <button
                    onClick={() => toggleStatus(c._id, c.status)}
                    className="text-yellow-400 hover:text-yellow-300 transition"
                  >
                    Toggle
                  </button>

                  <button
                    onClick={() => setDeleteId(c._id)}
                    className="text-red-500 hover:text-red-400 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {categories.length === 0 && (
          <p className="p-6 text-center text-gray-400">
            No categories created yet
          </p>
        )}
      </div>

      {/* ===== DELETE CONFIRM MODAL ===== */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 w-full max-w-sm">
            <h2 className="text-lg font-semibold mb-4 text-white">
              Delete Category?
            </h2>
            <p className="text-gray-400 mb-6">
              This action cannot be undone.
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white"
              >
                Cancel
              </button>
              <button
                onClick={deleteCategory}
                className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
