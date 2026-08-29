import { useEffect, useState } from "react";
import CategoryModal from "../components/CategoryModal";
import {
  fetchCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../services/categoryService";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const loadCategories = async () => {
    const data = await fetchCategories();
    setCategories(data);
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleSave = async (data) => {
    if (selectedCategory) {
      await updateCategory(selectedCategory._id, data);
    } else {
      await createCategory(data);
    }

    setModalOpen(false);
    setSelectedCategory(null);
    loadCategories();
  };

  const toggleStatus = async (cat) => {
    await updateCategory(cat._id, {
      status: cat.status === "Active" ? "Inactive" : "Active",
    });
    loadCategories();
  };

  const handleDelete = async () => {
    await deleteCategory(deleteId);
    setDeleteId(null);
    loadCategories();
  };

  return (
    <div className="p-6 text-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Categories</h1>
        <button
          onClick={() => setModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg"
        >
          + Add Category
        </button>
      </div>

      <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
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
                className="border-t border-slate-800 hover:bg-slate-800/60"
              >
                <td className="p-3">{c.name}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded text-sm ${
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
                    onClick={() => {
                      setSelectedCategory(c);
                      setModalOpen(true);
                    }}
                    className="text-blue-400"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => toggleStatus(c)}
                    className="text-yellow-400"
                  >
                    Toggle
                  </button>
                  <button
                    onClick={() => setDeleteId(c._id)}
                    className="text-red-500"
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

      {/* DELETE CONFIRM */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 w-full max-w-sm">
            <h2 className="text-lg font-semibold mb-4">Delete Category?</h2>
            <p className="text-gray-400 mb-6">
              This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="bg-slate-700 px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-600 px-4 py-2 rounded-lg"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <CategoryModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelectedCategory(null);
        }}
        onSave={handleSave}
        initialData={selectedCategory}
      />
    </div>
  );
}
