import { useEffect, useState, useMemo } from "react";
import {
  Tag,
  Plus,
  Pencil,
  Power,
  Trash2,
  AlertTriangle,
  X,
  Search,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import CategoryModal from "../components/CategoryModal";
import ActionMenu from "../components/ActionMenu";
import EmptyState from "../components/EmptyState";
import { SkeletonTableRow } from "../components/Skeleton";
import { showToast } from "../components/Toast";

import {
  fetchCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../services/categoryService";

const ITEMS_PER_PAGE = 8;

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const loadCategories = async () => {
    try {
      const data = await fetchCategories();
      setCategories(data);
    } catch {
      showToast("Failed to load categories", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const filtered = useMemo(() => {
    if (!search) return categories;
    return categories.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()));
  }, [categories, search]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginated = filtered.slice(start, start + ITEMS_PER_PAGE);

  const handleSave = async (data) => {
    try {
      if (selectedCategory) {
        await updateCategory(selectedCategory._id, data);
        showToast("Category updated successfully");
      } else {
        await createCategory(data);
        showToast("Category created successfully");
      }
      setModalOpen(false);
      setSelectedCategory(null);
      loadCategories();
    } catch {
      showToast("Failed to save category", "error");
    }
  };

  const toggleStatus = async (cat) => {
    try {
      const newStatus = cat.status === "Active" ? "Inactive" : "Active";
      await updateCategory(cat._id, { status: newStatus });
      showToast(`Category ${newStatus === "Active" ? "enabled" : "disabled"}`);
      loadCategories();
    } catch {
      showToast("Failed to update status", "error");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteCategory(deleteId);
      showToast("Category deleted successfully");
      setDeleteId(null);
      loadCategories();
    } catch {
      showToast("Failed to delete category", "error");
    }
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
        {/* Search bar */}
        <div className="p-4 border-b border-[var(--border)]">
          <div className="relative max-w-xs">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
            <input
              placeholder="Search categories..."
              className="w-full pr-3 py-2 text-sm"
              style={{ paddingLeft: "2.5rem" }}
              value={search}
              onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
            />
          </div>
        </div>

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
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => <SkeletonTableRow key={i} cols={3} />)
              ) : (
                paginated.map((c) => (
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
                      <div className="flex items-center justify-center">
                        <ActionMenu
                          actions={[
                            {
                              label: "Edit",
                              icon: <Pencil size={13} />,
                              className: "action-btn-blue",
                              color: "var(--primary)",
                              onClick: () => { setSelectedCategory(c); setModalOpen(true); },
                            },
                            {
                              label: c.status === "Active" ? "Disable" : "Enable",
                              icon: <Power size={13} />,
                              className: "action-btn-yellow",
                              color: "var(--warning)",
                              onClick: () => toggleStatus(c),
                            },
                            {
                              label: "Delete",
                              icon: <Trash2 size={13} />,
                              className: "action-btn-red",
                              color: "var(--danger)",
                              onClick: () => setDeleteId(c._id),
                            },
                          ]}
                        />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Empty state */}
        {!loading && paginated.length === 0 && (
          <EmptyState
            icon={Tag}
            title={search ? "No categories match your search" : "No categories yet"}
            description={search ? "Try a different search term." : "Create your first category to start organizing your products."}
            action={
              !search && (
                <button
                  onClick={() => { setSelectedCategory(null); setModalOpen(true); }}
                  className="btn btn-primary text-sm"
                >
                  <Plus size={14} />
                  Add Category
                </button>
              )
            }
          />
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-5 py-3 border-t border-[var(--border)] flex items-center justify-between">
            <span className="text-[11px] text-[var(--text-muted)]">
              Showing {start + 1}–{Math.min(start + ITEMS_PER_PAGE, filtered.length)} of {filtered.length}
            </span>
            <div className="flex items-center gap-1">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
                className="w-8 h-8 rounded-[var(--radius-sm)] flex items-center justify-center text-[var(--text-muted)] border border-[var(--border)] bg-[var(--bg-card)] disabled:opacity-30 hover:bg-[var(--bg-secondary)] transition"
              >
                <ChevronLeft size={14} />
              </button>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-8 h-8 rounded-[var(--radius-sm)] flex items-center justify-center text-xs font-semibold transition-all border ${
                    currentPage === i + 1
                      ? "bg-[var(--primary)] text-white border-[var(--primary)]"
                      : "bg-[var(--bg-card)] text-[var(--text-secondary)] border-[var(--border)] hover:bg-[var(--bg-secondary)]"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
                className="w-8 h-8 rounded-[var(--radius-sm)] flex items-center justify-center text-[var(--text-muted)] border border-[var(--border)] bg-[var(--bg-card)] disabled:opacity-30 hover:bg-[var(--bg-secondary)] transition"
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        )}

        {/* Footer count */}
        {!loading && filtered.length > 0 && totalPages <= 1 && (
          <div className="px-5 py-3 border-t border-[var(--border)]">
            <p className="text-[11px] text-[var(--text-muted)]">
              Total categories <span className="font-semibold text-[var(--text-primary)]">{filtered.length}</span>
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
