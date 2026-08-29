import { useEffect, useState, useMemo } from "react";
import { fetchDashboardData } from "../services/dashboardService";
import api from "../api/axios";

import Card from "../components/Card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const LOW_STOCK_LIMIT = 5;

export default function Dashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  /* ================= FETCH ================= */
  useEffect(() => {
    const load = async () => {
      try {
        const dash = await fetchDashboardData();
        const [pRes, cRes] = await Promise.all([
          api.get("/products"),
          api.get("/categories"),
        ]);

        setDashboard(dash);
        setProducts(pRes.data || []);
        setCategories(cRes.data || []);
      } catch (err) {
        console.error("Dashboard load failed", err);
      }
    };

    load();
  }, []);

  /* ================= ACTIVE CATEGORY IDS ================= */
  const activeCategoryIds = useMemo(
    () =>
      categories
        .filter((c) => c.status === "Active")
        .map((c) => c._id),
    [categories]
  );

  /* ================= ACTIVE PRODUCTS ================= */
  const activeProducts = useMemo(
    () =>
      products.filter(
        (p) => p.category && activeCategoryIds.includes(p.category._id)
      ),
    [products, activeCategoryIds]
  );

  /* ================= INVENTORY VALUE BY CATEGORY ================= */
  const inventoryByCategory = useMemo(() => {
    const map = {};

    activeProducts.forEach((p) => {
      const name = p.category?.name || "Unknown";
      map[name] = (map[name] || 0) + p.price * p.quantity;
    });

    return Object.entries(map).map(([category, value]) => ({
      category,
      value,
    }));
  }, [activeProducts]);

  if (!dashboard) return null;

  const { snapshot, todaySales, todayActivity } = dashboard;

  return (
    <div className="p-6 space-y-8 text-gray-200 bg-gradient-to-br from-[#0f172a] to-[#020617] min-h-screen">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      {/* SNAPSHOT */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
        <Card title="Total Products" value={snapshot.totalProducts} />
        <Card title="Low Stock" value={snapshot.lowStock} />
        <Card title="Out of Stock" value={snapshot.outOfStock} />
        <Card
          title="Inventory Value"
          value={`₹${snapshot.inventoryValue.toLocaleString()}`}
        />
      </div>

      {/* TODAY SALES */}
      <div className="bg-[#020617]/80 rounded-xl p-6 border border-white/10">
        <h2 className="text-lg font-semibold mb-4">Today’s Sales</h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
          <Card title="Units Sold" value={todaySales.units} />
          <Card
            title="Revenue"
            value={`₹${todaySales.revenue.toLocaleString()}`}
          />
          <Card title="Top Products" value={todaySales.chartData.length} />
        </div>

        {todaySales.chartData.length === 0 ? (
          <p className="text-gray-400">No sales recorded today</p>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={todaySales.chartData}>
              <XAxis dataKey="name" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip />
              <Bar dataKey="qty" fill="#22c55e" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* INVENTORY VALUE BY CATEGORY ✅ FIXED */}
      <div className="bg-[#020617]/80 rounded-xl p-6 border border-white/10">
        <h2 className="text-lg font-semibold mb-4">
          Inventory Value by Category
        </h2>

        {inventoryByCategory.length === 0 ? (
          <p className="text-gray-400">No active category data</p>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={inventoryByCategory}>
              <XAxis dataKey="category" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip formatter={(v) => `₹${v.toLocaleString()}`} />
              <Bar dataKey="value" fill="#3b82f6" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* TODAY ACTIVITY */}
      
      <div className="bg-[#020617]/80 rounded-xl p-6 border border-white/10">
          <h2 className="text-lg font-semibold mb-4">Today’s Activity</h2>

          {todayActivity.length === 0 ? (
            <p className="text-gray-400">No activity today</p>
                ) : (
            <ul className="space-y-3">
            {todayActivity.map((a, i) => (
                <li
  key={i}
  className="flex items-center gap-4
             bg-[#0f172a]
             border border-white/10
             p-4 rounded-lg"
>
  {/* ICON (LEFT) */}
  <div
    className={`w-10 h-10 flex items-center justify-center rounded-full text-lg
      ${
        a.type === "Sold"
          ? "bg-green-500/20 text-green-400"
          : a.type === "Low Stock"
          ? "bg-yellow-500/20 text-yellow-400"
          : "bg-blue-500/20 text-blue-400"
      }`}
  >
    {a.type === "Sold" && "🟢"}
    {a.type === "Low Stock" && "⚠️"}
    {a.type === "Stock Added" && "➕"}
  </div>

  {/* CONTENT (CENTER) */}
  <div className="flex-1">
    <p className="font-semibold text-white">{a.product}</p>
    <p className="text-sm text-gray-400">{a.time}</p>
  </div>

  {/* BADGE (RIGHT) */}
  <span
    className={`px-3 py-1 text-xs rounded-full font-semibold
      ${
        a.type === "Sold"
          ? "bg-green-500/20 text-green-400"
          : a.type === "Low Stock"
          ? "bg-yellow-500/20 text-yellow-400"
          : "bg-blue-500/20 text-blue-400"
      }`}
  >
    {a.type}
  </span>
</li>


        ))}
       </ul>
      )}
     </div>

    </div>
  );
}
