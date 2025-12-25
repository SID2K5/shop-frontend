import { useEffect, useState, useMemo } from "react";
import axios from "../api/axios";

import Card from "../components/Card";
import ProductModal from "../components/ProductModal";
import DeleteConfirmModal from "../components/DeleteConfirmModal";
import { io } from "socket.io-client";

const API_URL = "http://localhost:5000/api/products";
const CATEGORY_URL = "http://localhost:5000/api/categories";

const ITEMS_PER_PAGE = 5;
const LOW_STOCK_LIMIT = 5;

const socket = io("http://localhost:5000");

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

  const [historyProduct, setHistoryProduct] = useState(null);

  /* ================= FETCH ================= */
  const fetchProducts = async () => {
    const res = await axios.get("/products");
    setProducts(res.data);
  };


  const fetchCategories = async () => {
    const res = await axios.get(CATEGORY_URL);
    setCategories(res.data);
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  /* ================= REALTIME ================= */
  useEffect(() => {
    socket.on("productsUpdated", fetchProducts);
    return () => socket.off("productsUpdated");
  }, []);

  /* ================= SAVE ================= */
  const handleSave = async (product) => {
    if (editingProduct) {
      await axios.put(`${API_URL}/${editingProduct._id}`, product);
    } else {
      await axios.post(API_URL, product);
    }
    setIsModalOpen(false);
    setEditingProduct(null);
    fetchProducts();
  };

  /* ================= DELETE ================= */
  const handleDelete = async () => {
    await axios.delete(`${API_URL}/${productToDelete._id}`);
    setIsDeleteOpen(false);
    setProductToDelete(null);
    fetchProducts();
  };

  /* ================= ACTIVE CATEGORIES ================= */
  const activeCategoryNames = useMemo(
    () => categories.filter(c => c.status === "Active").map(c => c.name),
    [categories]
  );

  /* ================= FILTER + SORT ================= */
  const processedProducts = useMemo(() => {
    let data = [...products];

    data = data.filter(
      p => activeCategoryNames.includes(p.category) || activeCategoryNames.length === 0
    );

    data = data.filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );

    if (categoryFilter !== "All") {
      data = data.filter(p => p.category === categoryFilter);
    }

    if (stockFilter === "In") data = data.filter(p => p.quantity > 0);
    if (stockFilter === "Out") data = data.filter(p => p.quantity === 0);

    if (sortBy === "price-asc") data.sort((a, b) => a.price - b.price);
    if (sortBy === "price-desc") data.sort((a, b) => b.price - a.price);
    if (sortBy === "qty-asc") data.sort((a, b) => a.quantity - b.quantity);
    if (sortBy === "qty-desc") data.sort((a, b) => b.quantity - a.quantity);

    return data;
  }, [products, search, categoryFilter, stockFilter, sortBy, activeCategoryNames]);

   /* ================= PAGINATION ================= */
  const totalPages = Math.ceil(processedProducts.length / ITEMS_PER_PAGE);
  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = processedProducts.slice(start, start + ITEMS_PER_PAGE);

  /* ================= STATS ================= */
  const total = processedProducts.length;
  const inStock = processedProducts.filter(p => p.quantity >= LOW_STOCK_LIMIT).length;
  const lowStock = processedProducts.filter(p => p.quantity > 0 && p.quantity < LOW_STOCK_LIMIT).length;
  const outStock = processedProducts.filter(p => p.quantity === 0).length;

  return (
    <div className="p-6 text-gray-200">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Products</h1>

        <button
          onClick={() => {
            setIsModalOpen(true);
            setEditingProduct(null);
          }}
          className="bg-blue-600 hover:bg-blue-700 transition text-white px-4 py-2 rounded-lg"
        >
          + Add Product
        </button>
      </div>

      {/* LOW STOCK ALERT */}
      {lowStock > 0 && (
        <div className="mb-6 bg-yellow-900/40 border border-yellow-700 text-yellow-300 px-4 py-3 rounded-lg">
          ⚠️ <strong>{lowStock}</strong> product(s) running low
        </div>
      )}

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-6">
        <Card title="Total Products" value={total} />
        <Card title="In Stock" value={inStock} />
        <Card title="Low Stock" value={lowStock} />
        <Card title="Out of Stock" value={outStock} />
      </div>

      {/* FILTERS */}
      <div className="bg-slate-800 p-4 rounded-xl mb-6 flex flex-wrap gap-4">
        <input
          placeholder="🔍 Search product..."
          className="bg-slate-700 px-3 py-2 rounded-lg w-full sm:w-56 outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select className="bg-slate-700 px-3 py-2 rounded-lg" value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
          <option value="All">All Categories</option>
          {categories.filter(c => c.status === "Active").map(c => (
            <option key={c._id}>{c.name}</option>
          ))}
        </select>

        <select className="bg-slate-700 px-3 py-2 rounded-lg" value={stockFilter} onChange={(e) => setStockFilter(e.target.value)}>
          <option value="All">All Stock</option>
          <option value="In">In Stock</option>
          <option value="Out">Out of Stock</option>
        </select>

        <select className="bg-slate-700 px-3 py-2 rounded-lg" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="">Sort By</option>
          <option value="price-asc">Price ↑</option>
          <option value="price-desc">Price ↓</option>
          <option value="qty-asc">Qty ↑</option>
          <option value="qty-desc">Qty ↓</option>
        </select>
      </div>

      {/* TABLE */}
      <div className="bg-slate-900 rounded-xl overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-800">
            <tr>
              {["Name", "Category", "Price", "Qty", "Status", "Actions"].map(h => (
                <th key={h} className="p-3 text-left">{h}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {paginatedProducts.map(p => (
              <tr
                key={p._id}
                className="border-t border-slate-700 hover:bg-slate-800 transition"
              >
                <td className="p-3">{p.name}</td>
                <td className="p-3">{p.category}</td>
                <td className="p-3">₹{p.price}</td>
                <td className="p-3">{p.quantity}</td>

                <td className="p-3">
                  {p.quantity === 0 ? "❌ Out" : p.quantity < LOW_STOCK_LIMIT ? "⚠️ Low" : "✅ In"}
                </td>

                <td className="p-3 space-x-3">
                  <button
                    className="text-blue-400 hover:text-blue-300 transition hover:underline"
                    onClick={() => {
                      setEditingProduct(p);
                      setIsModalOpen(true);
                    }}
                  >
                    Edit
                  </button>

                  <button
                    className="text-purple-400 hover:text-purple-300 transition hover:underline"
                    onClick={() => setHistoryProduct(p)}
                  >
                    History
                  </button>

                  <button
                    className="text-red-400 hover:text-red-300 transition hover:underline"
                    onClick={() => {
                      setProductToDelete(p);
                      setIsDeleteOpen(true);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* HISTORY MODAL */}
      {historyProduct && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center">
          <div className="bg-slate-900 w-full max-w-lg rounded-lg p-6">
            <h2 className="text-lg font-bold mb-4">
              Stock History — {historyProduct.name}
            </h2>

            <div className="max-h-80 overflow-y-auto">
              {historyProduct.stockHistory?.length ? (
                historyProduct.stockHistory.slice().reverse().map((h, i) => (
                  <div key={i} className="border-b border-slate-700 py-2 flex justify-between text-sm">
                    <span>{h.previousQty} → {h.newQty}</span>
                    <span className="text-gray-400">
                      {new Date(h.date).toLocaleString()}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-gray-400">No history available</p>
              )}
            </div>

            <button
              onClick={() => setHistoryProduct(null)}
              className="mt-4 px-4 py-2 bg-slate-700 rounded hover:bg-slate-600 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
       {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-6">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(p => p - 1)}
            className="px-3 py-1 rounded bg-slate-700 disabled:opacity-40"
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === i + 1 ? "bg-blue-600" : "bg-slate-700"
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(p => p + 1)}
            className="px-3 py-1 rounded bg-slate-700 disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}
      <ProductModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingProduct(null);
        }}
        onSave={handleSave}
        initialData={editingProduct}
        categories={categories.filter(c => c.status === "Active")}
      />

      <DeleteConfirmModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
