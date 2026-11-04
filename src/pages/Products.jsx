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

const ITEMS_PER_PAGE = 5;
const LOW_STOCK_LIMIT = 1;

export default function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

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
    const data = await fetchProducts();
    setProducts(data);
  };

  const loadCategories = async () => {
    const data = await fetchCategories();
    setCategories(data);
  };

  useEffect(() => {
    loadProducts();
    loadCategories();
  }, []);

  const handleSave = async (product) => {
    const payload = {
      name: product.name,
      price: Number(product.price),
      quantity: Number(product.quantity),
      category: product.category,
    };

    if (editingProduct) {
      await editProduct(editingProduct._id, payload);
    } else {
      await addProduct(payload);
    }

    setIsModalOpen(false);
    setEditingProduct(null);
    loadProducts();
  };

  const handleDelete = async () => {
    await removeProduct(productToDelete._id);
    setIsDeleteOpen(false);
    setProductToDelete(null);
    loadProducts();
  };

  const processedProducts = useMemo(() => {
    let data = [...products];

    if (search) {
      data = data.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (categoryFilter !== "All") {
      data = data.filter((p) => p.category?.name === categoryFilter);
    }

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
  const paginatedProducts = processedProducts.slice(
    start,
    start + ITEMS_PER_PAGE
  );

  const total = processedProducts.length;
  const outStock = processedProducts.filter((p) => p.quantity === 0).length;
  const lowStock = processedProducts.filter(
    (p) => p.quantity === LOW_STOCK_LIMIT
  ).length;
  const inStock = processedProducts.filter(
    (p) => p.quantity > LOW_STOCK_LIMIT
  ).length;

  return (
    <div className="text-[var(--text-primary)]">
      {/* Header */}
      <div className="flex flex-col gap-4 mb-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500/20 via-cyan-500/20 to-purple-600/20 border border-blue-400/20 flex items-center justify-center shadow-lg shadow-blue-950/30">
            <Package size={22} className="text-blue-400" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              Products
            </h1>
            <p className="text-xs text-[var(--text-muted)]">
              Manage your inventory and stock
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            setIsModalOpen(true);
            setEditingProduct(null);
          }}
          className="btn btn-primary gap-2 px-5 py-2.5 text-sm"
        >
          <Plus size={16} />
          Add Product
        </button>
      </div>

      {/* Low stock alert */}
      {lowStock > 0 && (
        <div className="mb-5 bg-[var(--warning-muted)] border border-yellow-500/20 text-yellow-300 px-4 py-3 rounded-[var(--radius-md)] flex items-center gap-2 text-sm">
          <AlertTriangle size={16} />
          <strong>{lowStock}</strong> product(s) running low on stock
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <Card title="Total Products" value={total} icon={<Package size={14} />} color="blue" />
        <Card title="In Stock" value={inStock} icon={<CheckCircle2 size={14} />} color="green" />
        <Card title="Low Stock" value={lowStock} icon={<AlertTriangle size={14} />} color="yellow" />
        <Card title="Out of Stock" value={outStock} icon={<XCircle size={14} />} color="red" />
      </div>

      {/* Table container */}
      <div className="rounded-[var(--radius-lg)] border border-[var(--border-default)] bg-[var(--bg-elevated)]/50 overflow-hidden">
        {/* Filters */}
        <div className="p-4 flex flex-wrap gap-3 border-b border-[var(--border-default)]">
          <div className="relative flex-1 min-w-[180px] max-w-xs">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
            />
            <input
              placeholder="Search product..."
              className="w-full pl-8 pr-3 py-2 text-sm"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          <select
            className="text-sm py-2"
            value={categoryFilter}
            onChange={(e) => {
              setCategoryFilter(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="All">All Categories</option>
            {categories
              .filter((c) => c.status === "Active")
              .map((c) => (
                <option key={c._id} value={c.name}>
                  {c.name}
                </option>
              ))}
          </select>

          <select
            className="text-sm py-2"
            value={stockFilter}
            onChange={(e) => {
              setStockFilter(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="All">All Stock</option>
            <option value="In">In Stock</option>
            <option value="Out">Out of Stock</option>
          </select>

          <select
            className="text-sm py-2"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
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
                {["Product", "Category", "Price", "Qty", "Status", "Actions"].map(
                  (h) => (
                    <th
                      key={h}
                      className={`px-4 py-3 ${
                        h === "Actions" ? "text-center" : ""
                      }`}
                    >
                      {h}
                    </th>
                  )
                )}
              </tr>
            </thead>

            <tbody>
              {paginatedProducts.map((p) => (
                <tr key={p._id}>
                  <td className="px-4 py-3 font-medium text-white">
                    {p.name}
                  </td>
                  <td className="px-4 py-3 text-[var(--text-secondary)]">
                    {p.category?.name}
                  </td>
                  <td
                    className="px-4 py-3 text-[var(--text-secondary)]"
                    style={{ fontVariantNumeric: "tabular-nums" }}
                  >
                    ₹{p.price.toLocaleString()}
                  </td>
                  <td
                    className="px-4 py-3 text-[var(--text-secondary)]"
                    style={{ fontVariantNumeric: "tabular-nums" }}
                  >
                    {p.quantity}
                  </td>
                  <td className="px-4 py-3">
                    {p.quantity === 0 ? (
                      <span className="badge badge-danger">Out of Stock</span>
                    ) : p.quantity === LOW_STOCK_LIMIT ? (
                      <span className="badge badge-warning">Low Stock</span>
                    ) : (
                      <span className="badge badge-success">In Stock</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => {
                          setEditingProduct({
                            ...p,
                            category: p.category?._id,
                          });
                          setIsModalOpen(true);
                        }}
                        className="px-2.5 py-1 rounded-lg text-xs font-medium text-blue-400 bg-blue-500/5 border border-blue-400/20 hover:bg-blue-500/15 hover:border-blue-400/40 transition"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => {
                          setHistoryProduct(p);
                          setIsHistoryOpen(true);
                        }}
                        className="px-2.5 py-1 rounded-lg text-xs font-medium text-purple-400 bg-purple-500/5 border border-purple-400/20 hover:bg-purple-500/15 hover:border-purple-400/40 transition"
                      >
                        History
                      </button>

                      <button
                        onClick={() => {
                          setProductToDelete(p);
                          setIsDeleteOpen(true);
                        }}
                        className="px-2.5 py-1 rounded-lg text-xs font-medium text-red-400 bg-red-500/5 border border-red-400/20 hover:bg-red-500/15 hover:border-red-400/40 transition"
                      >
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
        {paginatedProducts.length === 0 && (
          <div className="py-16 flex flex-col items-center justify-center text-center">
            <div className="w-14 h-14 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-default)] flex items-center justify-center mb-4">
              <Package size={24} className="text-[var(--text-muted)]" />
            </div>
            <h3 className="text-base font-semibold text-slate-300">
              No products found
            </h3>
            <p className="mt-1 text-sm text-[var(--text-muted)]">
              Try adjusting your filters or add a new product.
            </p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-4 py-3 border-t border-[var(--border-default)] flex items-center justify-between">
            <span className="text-xs text-[var(--text-muted)]">
              Showing {start + 1}-{Math.min(start + ITEMS_PER_PAGE, processedProducts.length)} of{" "}
              {processedProducts.length} products
            </span>

            <div className="flex items-center gap-1">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
                className="w-8 h-8 rounded-lg flex items-center justify-center bg-[var(--bg-surface)] border border-[var(--border-default)] text-[var(--text-muted)] disabled:opacity-30 hover:border-[var(--border-hover)] transition"
              >
                <ChevronLeft size={14} />
              </button>

              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-semibold transition ${
                    currentPage === i + 1
                      ? "bg-[var(--accent-muted)] text-[var(--accent-hover)] border border-[var(--border-accent)]"
                      : "bg-[var(--bg-surface)] border border-[var(--border-default)] text-[var(--text-secondary)] hover:border-[var(--border-hover)]"
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
                className="w-8 h-8 rounded-lg flex items-center justify-center bg-[var(--bg-surface)] border border-[var(--border-default)] text-[var(--text-muted)] disabled:opacity-30 hover:border-[var(--border-hover)] transition"
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        )}
      </div>

      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        initialData={editingProduct}
      />

      <DeleteConfirmModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDelete}
      />

      <StockHistoryModal
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        product={historyProduct}
      />
    </div>
  );
}
