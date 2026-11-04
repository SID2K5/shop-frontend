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
    <div>
      {/* Header */}
      <div className="flex flex-col gap-4 mb-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: "var(--primary-light)" }}
          >
            <Tag size={20} className="text-[var(--primary)]" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--text-primary)]">Categories</h1>
            <p className="text-[11px] text-[var(--text-muted)]">Manage all your product categories</p>
          </div>
        </div>

        <button
          onClick={() => { setSelectedCategory(null); setModalOpen(true); }}
          className="btn btn-primary"
        >
          <Plus size={16} />
          Add Category
        </button>
      </div>

      {/* Table */}
      <div
        className="rounded-[var(--radius-xl)] overflow-hidden"
        style={{ background: "var(--bg-card)", border: "1px solid var(--border)", boxShadow: "var(--shadow-sm)" }}
      >
        <div className="overflow-x-auto">
          <table className="w-full min-w-[540px]">
            <thead>
              <tr>
                <th className="px-5 py-3">Name</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((c) => (
                <tr key={c._id} className="group">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{ background: "var(--primary-light)" }}
                      >
                        <Tag size={14} className="text-[var(--primary)]" />
                      </div>
                      <span className="font-medium text-[var(--text-primary)]">{c.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <span className={`badge ${c.status === "Active" ? "badge-success" : "badge-danger"}`}>
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ background: c.status === "Active" ? "var(--success)" : "var(--danger)" }}
                      />
                      {c.status}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => { setSelectedCategory(c); setModalOpen(true); }}
                        className="action-btn action-btn-blue"
                      >
                        <Pencil size={13} />
                        Edit
                      </button>
                      <button
                        onClick={() => toggleStatus(c)}
                        className="action-btn action-btn-yellow"
                      >
                        <Power size={13} />
                        {c.status === "Active" ? "Disable" : "Enable"}
                      </button>
                      <button
                        onClick={() => setDeleteId(c._id)}
                        className="action-btn action-btn-red"
                      >
                        <Trash2 size={13} />
                        Delete
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
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
              style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)" }}
            >
              <Tag size={22} className="text-[var(--text-muted)]" />
            </div>
            <h3 className="text-sm font-semibold text-[var(--text-primary)]">No categories yet</h3>
            <p className="mt-1 text-sm text-[var(--text-muted)]">Create your first category to start organizing your products.</p>
          </div>
        )}

        {/* Footer */}
        {categories.length > 0 && (
          <div className="px-5 py-3 border-t border-[var(--border)]">
            <p className="text-[11px] text-[var(--text-muted)]">
              Total categories <span className="font-semibold text-[var(--text-primary)]">{categories.length}</span>
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
              className="absolute top-4 right-4 w-8 h-8 rounded-lg flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] transition"
            >
              <X size={16} />
            </button>

            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
              style={{ background: "var(--danger-light)" }}
            >
              <AlertTriangle size={20} className="text-[var(--danger)]" />
            </div>

            <h2 className="text-lg font-bold text-[var(--text-primary)]">Delete Category?</h2>
            <p className="mt-2 text-sm text-[var(--text-secondary)] leading-relaxed">
              This action cannot be undone. The category will be permanently removed from your inventory system.
            </p>

            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setDeleteId(null)} className="btn btn-secondary text-sm">Cancel</button>
              <button onClick={handleDelete} className="btn btn-danger text-sm">Delete Category</button>
            </div>
          </div>
        </div>
      )}

      <CategoryModal
        isOpen={modalOpen}
        onClose={() => { setModalOpen(false); setSelectedCategory(null); }}
        onSave={handleSave}
        initialData={selectedCategory}
      />
    </div>
  );
}
