import { useEffect, useState } from "react";
import {
  Tag,
  Plus,
  Pencil,
  Power,
  Trash2,
  AlertTriangle,
  X,
} from "lucide-react";

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
    <div className="text-[var(--text-primary)]">
      {/* Header */}
      <div className="flex flex-col gap-4 mb-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-500/20 via-blue-500/20 to-purple-600/20 border border-cyan-400/20 flex items-center justify-center shadow-lg shadow-cyan-950/30">
            <Tag size={22} className="text-cyan-400" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              Categories
            </h1>
            <p className="text-xs text-[var(--text-muted)]">
              Manage all your product categories
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            setSelectedCategory(null);
            setModalOpen(true);
          }}
          className="btn btn-primary gap-2 px-5 py-2.5 text-sm"
        >
          <Plus size={16} />
          Add Category
        </button>
      </div>

      {/* Table */}
      <div className="rounded-[var(--radius-lg)] border border-[var(--border-default)] bg-[var(--bg-elevated)]/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[540px]">
            <thead>
              <tr>
                <th className="px-5 py-4">Name</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {categories.map((c) => (
                <tr key={c._id} className="group">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900 border border-cyan-400/15 group-hover:border-cyan-400/40 transition">
                        <Tag
                          size={16}
                          className="text-cyan-400 group-hover:scale-110 transition-transform"
                        />
                      </div>
                      <span className="font-medium text-slate-200 group-hover:text-white transition">
                        {c.name}
                      </span>
                    </div>
                  </td>

                  <td className="px-5 py-3.5">
                    <span
                      className={`badge ${
                        c.status === "Active"
                          ? "badge-success"
                          : "badge-danger"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          c.status === "Active"
                            ? "bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.6)]"
                            : "bg-red-400 shadow-[0_0_6px_rgba(248,113,113,0.6)]"
                        }`}
                      />
                      {c.status}
                    </span>
                  </td>

                  <td className="px-5 py-3.5">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => {
                          setSelectedCategory(c);
                          setModalOpen(true);
                        }}
                        title="Edit Category"
                        className="w-9 h-9 rounded-lg flex items-center justify-center text-blue-400 bg-blue-500/5 border border-blue-400/20 hover:bg-blue-500/15 hover:border-blue-400/40 transition"
                      >
                        <Pencil size={15} />
                      </button>

                      <button
                        onClick={() => toggleStatus(c)}
                        title="Toggle Status"
                        className="w-9 h-9 rounded-lg flex items-center justify-center text-yellow-400 bg-yellow-500/5 border border-yellow-400/20 hover:bg-yellow-500/15 hover:border-yellow-400/40 transition"
                      >
                        <Power size={15} />
                      </button>

                      <button
                        onClick={() => setDeleteId(c._id)}
                        title="Delete Category"
                        className="w-9 h-9 rounded-lg flex items-center justify-center text-red-400 bg-red-500/5 border border-red-400/20 hover:bg-red-500/15 hover:border-red-400/40 transition"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty state */}
        {categories.length === 0 && (
          <div className="py-16 flex flex-col items-center justify-center text-center">
            <div className="w-14 h-14 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-default)] flex items-center justify-center mb-4">
              <Tag size={24} className="text-[var(--text-muted)]" />
            </div>
            <h3 className="text-base font-semibold text-slate-300">
              No categories yet
            </h3>
            <p className="mt-1 text-sm text-[var(--text-muted)]">
              Create your first category to start organizing your products.
            </p>
          </div>
        )}

        {/* Footer */}
        {categories.length > 0 && (
          <div className="px-5 py-3 border-t border-[var(--border-default)]">
            <p className="text-xs text-[var(--text-muted)]">
              Total categories{" "}
              <span className="font-semibold text-slate-300">
                {categories.length}
              </span>
            </p>
          </div>
        )}
      </div>

      {/* Delete confirm */}
      {deleteId && (
        <div className="modal-backdrop animate-in fade-in duration-200">
          <div className="modal w-full max-w-md relative">
            <button
              onClick={() => setDeleteId(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-lg flex items-center justify-center text-[var(--text-muted)] hover:text-white hover:bg-[var(--bg-surface)] transition"
            >
              <X size={16} />
            </button>

            <div className="w-12 h-12 rounded-xl bg-[var(--danger-muted)] border border-red-500/20 flex items-center justify-center mb-4">
              <AlertTriangle size={22} className="text-red-400" />
            </div>

            <h2 className="text-lg font-bold text-white">Delete Category?</h2>
            <p className="mt-2 text-sm text-[var(--text-secondary)] leading-relaxed">
              This action cannot be undone. The category will be permanently
              removed from your inventory system.
            </p>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setDeleteId(null)}
                className="btn btn-secondary text-sm"
              >
                Cancel
              </button>
              <button onClick={handleDelete} className="btn btn-danger text-sm">
                Delete Category
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
