import { useEffect, useState, useMemo } from "react";
import {
  Package,
  Plus,
  Search,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  ChevronLeft,
  ChevronRight,
  Download,
  Pencil,
  History,
  Trash2,
} from "lucide-react";
import {
  fetchProducts,
  addProduct,
  editProduct,
  removeProduct,
} from "../services/productService";
import { fetchCategories } from "../services/categoryService";

import Card from "../components/Card";
import ProductModal from "../components/ProductModal";
import DeleteConfirmModal from "../components/DeleteConfirmModal";
import StockHistoryModal from "../components/StockHistoryModal";
import ActionMenu from "../components/ActionMenu";
import EmptyState from "../components/EmptyState";
import ProductRowTooltip from "../components/ProductRowTooltip";
import { SkeletonCard, SkeletonTableRow } from "../components/Skeleton";
import { showToast } from "../components/Toast";
import { exportToCsv } from "../utils/exportCsv";

const ITEMS_PER_PAGE = 5;
const LOW_STOCK_LIMIT = 1;

export default function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [stockFilter, setStockFilter] = useState("All");
  const [sortBy, setSortBy] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [historyProduct, setHistoryProduct] = useState(null);

  const loadProducts = async () => {
    try {
      const data = await fetchProducts();
      setProducts(data);
    } catch {
      showToast("Failed to load products", "error");
    } finally {
      setLoading(false);
    }
  };
  const loadCategories = async () => {
    try {
      setCategories(await fetchCategories());
    } catch {}
  };

  useEffect(() => {
    loadProducts();
    loadCategories();
  }, []);

  const handleSave = async (product) => {
    try {
      const payload = {
        name: product.name,
        price: Number(product.price),
        quantity: Number(product.quantity),
        category: product.category,
      };
      if (editingProduct) {
        await editProduct(editingProduct._id, payload);
        showToast("Product updated successfully");
      } else {
        await addProduct(payload);
        showToast("Product added successfully");
      }
      setIsModalOpen(false);
      setEditingProduct(null);
      loadProducts();
    } catch {
      showToast("Failed to save product", "error");
    }
  };

  const handleDelete = async () => {
    try {
      await removeProduct(productToDelete._id);
      showToast("Product deleted successfully");
      setIsDeleteOpen(false);
      setProductToDelete(null);
      loadProducts();
    } catch {
      showToast("Failed to delete product", "error");
    }
  };

  const handleExport = () => {
    if (processedProducts.length === 0) {
      showToast("No products to export", "warning");
      return;
    }
    exportToCsv("products.csv", processedProducts, [
      { label: "Name", accessor: (p) => p.name },
      { label: "Category", accessor: (p) => p.category?.name || "" },
      { label: "Price", accessor: (p) => p.price },
      { label: "Quantity", accessor: (p) => p.quantity },
      { label: "Status", accessor: (p) => p.quantity === 0 ? "Out of Stock" : p.quantity <= LOW_STOCK_LIMIT ? "Low Stock" : "In Stock" },
    ]);
    showToast(`Exported ${processedProducts.length} products to CSV`);
  };

  const processedProducts = useMemo(() => {
    let data = [...products];
    if (search) data = data.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));
    if (categoryFilter !== "All") data = data.filter((p) => p.category?.name === categoryFilter);
    if (stockFilter === "In") data = data.filter((p) => p.quantity > 0);
    if (stockFilter === "Out") data = data.filter((p) => p.quantity === 0);
    if (sortBy === "price-asc") data.sort((a, b) => a.price - b.price);
    if (sortBy === "price-desc") data.sort((a, b) => b.price - a.price);
    if (sortBy === "qty-asc") data.sort((a, b) => a.quantity - b.quantity);
    if (sortBy === "qty-desc") data.sort((a, b) => b.quantity - a.quantity);
    return data;
  }, [products, search, categoryFilter, stockFilter, sortBy]);

  const totalPages = Math.ceil(processedProducts.length / ITEMS_PER_PAGE);
  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = processedProducts.slice(start, start + ITEMS_PER_PAGE);
  const total = processedProducts.length;
  const outStock = processedProducts.filter((p) => p.quantity === 0).length;
  const lowStock = processedProducts.filter((p) => p.quantity === LOW_STOCK_LIMIT).length;
  const inStock = processedProducts.filter((p) => p.quantity > LOW_STOCK_LIMIT).length;

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col gap-4 mb-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: "var(--primary-light)" }}
          >
            <Package size={20} className="text-[var(--primary)]" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--text-primary)]">Products</h1>
            <p className="text-[11px] text-[var(--text-muted)]">Manage your inventory and stock</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button onClick={handleExport} className="btn btn-secondary">
            <Download size={15} />
            <span className="hidden sm:inline">Export CSV</span>
          </button>
          <button
            onClick={() => { setIsModalOpen(true); setEditingProduct(null); }}
            className="btn btn-primary"
          >
            <Plus size={16} />
            Add Product
          </button>
        </div>
      </div>

      {/* Low stock alert */}
      {!loading && lowStock > 0 && (
        <div
          className="mb-5 px-4 py-3 rounded-[var(--radius-md)] flex items-center gap-2.5 text-sm"
          style={{
            background: "var(--warning-light)",
            color: "var(--warning)",
            border: "1px solid var(--warning-border)",
          }}
        >
          <AlertTriangle size={16} />
          <span><strong>{lowStock}</strong> product(s) running low on stock</span>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {loading ? (
          <>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </>
        ) : (
          <>
            <Card title="Total Products" value={total} icon={<Package size={14} />} color="blue" />
            <Card title="In Stock" value={inStock} icon={<CheckCircle2 size={14} />} color="green" />
            <Card title="Low Stock" value={lowStock} icon={<AlertTriangle size={14} />} color="yellow" />
            <Card title="Out of Stock" value={outStock} icon={<XCircle size={14} />} color="red" />
          </>
        )}
      </div>

      {/* Table container */}
      <div
        className="rounded-[var(--radius-xl)] overflow-hidden"
        style={{ background: "var(--bg-card)", border: "1px solid var(--border)", boxShadow: "var(--shadow-sm)" }}
      >
        {/* Filters */}
        <div className="p-4 flex flex-wrap gap-3 border-b border-[var(--border)]">
          <div className="relative flex-1 min-w-[180px] max-w-xs">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
            <input
              placeholder="Search product..."
              className="w-full pr-3 py-2 text-sm"
              style={{ paddingLeft: "2.5rem" }}
              value={search}
              onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
            />
          </div>
          <select className="text-sm" value={categoryFilter} onChange={(e) => { setCategoryFilter(e.target.value); setCurrentPage(1); }}>
            <option value="All">All Categories</option>
            {categories.filter((c) => c.status === "Active").map((c) => (
              <option key={c._id} value={c.name}>{c.name}</option>
            ))}
          </select>
          <select className="text-sm" value={stockFilter} onChange={(e) => { setStockFilter(e.target.value); setCurrentPage(1); }}>
            <option value="All">All Stock</option>
            <option value="In">In Stock</option>
            <option value="Out">Out of Stock</option>
          </select>
          <select className="text-sm" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="">Sort By</option>
            <option value="price-asc">Price ↑</option>
            <option value="price-desc">Price ↓</option>
            <option value="qty-asc">Qty ↑</option>
            <option value="qty-desc">Qty ↓</option>
          </select>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px]">
            <thead>
              <tr>
                {["Product", "Category", "Price", "Qty", "Status", "Actions"].map((h) => (
                  <th key={h} className={`px-5 py-3 ${h === "Actions" ? "text-center" : ""}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => <SkeletonTableRow key={i} cols={6} />)
              ) : (
                paginatedProducts.map((p) => (
                  <ProductRowTooltip key={p._id} product={p}>
                  <tr className="group">
                    <td className="px-5 py-3 font-medium text-[var(--text-primary)]">{p.name}</td>
                    <td className="px-5 py-3 text-[var(--text-secondary)]">{p.category?.name}</td>
                    <td className="px-5 py-3 text-[var(--text-secondary)]" style={{ fontVariantNumeric: "tabular-nums" }}>
                      ₹{p.price.toLocaleString()}
                    </td>
                    <td className="px-5 py-3 text-[var(--text-secondary)]" style={{ fontVariantNumeric: "tabular-nums" }}>
                      {p.quantity}
                    </td>
                    <td className="px-5 py-3">
                      {p.quantity === 0 ? (
                        <span className="badge badge-danger">Out of Stock</span>
                      ) : p.quantity === LOW_STOCK_LIMIT ? (
                        <span className="badge badge-warning">Low Stock</span>
                      ) : (
                        <span className="badge badge-success">In Stock</span>
                      )}
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
                              onClick: () => { setEditingProduct({ ...p, category: p.category?._id }); setIsModalOpen(true); },
                            },
                            {
                              label: "History",
                              icon: <History size={13} />,
                              className: "action-btn-purple",
                              color: "var(--steel-blue)",
                              onClick: () => { setHistoryProduct(p); setIsHistoryOpen(true); },
                            },
                            {
                              label: "Delete",
                              icon: <Trash2 size={13} />,
                              className: "action-btn-red",
                              color: "var(--danger)",
                              onClick: () => { setProductToDelete(p); setIsDeleteOpen(true); },
                            },
                          ]}
                        />
                      </div>
                    </td>
                  </tr>
                  </ProductRowTooltip>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Empty state */}
        {!loading && paginatedProducts.length === 0 && (
          <EmptyState
            icon={Package}
            title="No products found"
            description="Try adjusting your filters or add a new product to get started."
            action={
              <button
                onClick={() => { setIsModalOpen(true); setEditingProduct(null); }}
                className="btn btn-primary text-sm"
              >
                <Plus size={14} />
                Add Product
              </button>
            }
          />
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-5 py-3 border-t border-[var(--border)] flex items-center justify-between">
            <span className="text-[11px] text-[var(--text-muted)]">
              Showing {start + 1}–{Math.min(start + ITEMS_PER_PAGE, processedProducts.length)} of {processedProducts.length}
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
      </div>

      <ProductModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleSave} initialData={editingProduct} />
      <DeleteConfirmModal isOpen={isDeleteOpen} onClose={() => setIsDeleteOpen(false)} onConfirm={handleDelete} />
      <StockHistoryModal isOpen={isHistoryOpen} onClose={() => setIsHistoryOpen(false)} product={historyProduct} />
    </div>
  );
}
