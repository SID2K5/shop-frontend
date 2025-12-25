import { useEffect, useState, useMemo } from "react";
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
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  /* ================= FETCH ================= */
  useEffect(() => {
    api.get("/products").then(res => setProducts(res.data));
    api.get("/categories").then(res => setCategories(res.data));
  }, []);

  /* ================= ACTIVE PRODUCTS ================= */
  const activeCategoryNames = useMemo(
    () => categories.filter(c => c.status === "Active").map(c => c.name),
    [categories]
  );

  const activeProducts = useMemo(
    () => products.filter(p => activeCategoryNames.includes(p.category)),
    [products, activeCategoryNames]
  );

  /* ================= INVENTORY VALUE ================= */
  const totalInventoryValue = useMemo(() => {
    return activeProducts.reduce(
      (sum, p) => sum + p.price * p.quantity,
      0
    );
  }, [activeProducts]);

  const inventoryByCategory = useMemo(() => {
    const map = {};
    activeProducts.forEach(p => {
      map[p.category] =
        (map[p.category] || 0) + p.price * p.quantity;
    });

    return Object.entries(map).map(([category, value]) => ({
      category,
      value,
    }));
  }, [activeProducts]);

  /* ================= DAILY SALES ================= */
  const today = new Date().toDateString();

  const dailySales = useMemo(() => {
    let units = 0;
    let revenue = 0;
    const productMap = {};

    activeProducts.forEach(p => {
      p.stockHistory?.forEach(h => {
        if (new Date(h.date).toDateString() === today) {
          if (h.newQty < h.previousQty) {
            const sold = h.previousQty - h.newQty;
            units += sold;
            revenue += sold * p.price;
            productMap[p.name] = (productMap[p.name] || 0) + sold;
          }
        }
      });
    });

    return {
      units,
      revenue,
      chartData: Object.entries(productMap).map(
        ([name, qty]) => ({ name, qty })
      ),
    };
  }, [activeProducts]);

  /* ================= TODAY'S ACTIVITY ================= */
  const recentActivities = useMemo(() => {
    const logs = [];

    activeProducts.forEach(p => {
      p.stockHistory?.forEach(h => {
        if (new Date(h.date).toDateString() !== today) return;

        let type = "Updated";
        let color = "bg-blue-500";

        if (h.newQty > h.previousQty) {
          type = "Stock Added";
          color = "bg-green-500";
        }

        if (h.newQty < h.previousQty) {
          type = "Sold";
          color = "bg-red-500";
        }

        if (h.newQty > 0 && h.newQty < LOW_STOCK_LIMIT) {
          type = "Low Stock";
          color = "bg-yellow-500";
        }

        logs.push({
          product: p.name,
          type,
          color,
          time: new Date(h.date),
        });
      });
    });

    return logs
      .sort((a, b) => b.time - a.time)
      .slice(0, 6)
      .map(l => ({
        ...l,
        time: l.time.toLocaleTimeString(),
      }));
  }, [activeProducts]);

  /* ================= STATS ================= */
  const totalProducts = activeProducts.length;
  const lowStock = activeProducts.filter(
    p => p.quantity > 0 && p.quantity < LOW_STOCK_LIMIT
  ).length;
  const outOfStock = activeProducts.filter(p => p.quantity === 0).length;

  return (
    <div className="p-6 space-y-8 text-gray-200 bg-gradient-to-br from-[#0f172a] to-[#020617] min-h-screen">

      <h1 className="text-2xl font-bold">Dashboard</h1>

      {/* SNAPSHOT */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
        <Card title="Total Products" value={totalProducts} />
        <Card title="Low Stock" value={lowStock} />
        <Card title="Out of Stock" value={outOfStock} />
        <Card
          title="Inventory Value"
          value={`₹${totalInventoryValue.toLocaleString()}`}
        />
      </div>

      {/* TODAY'S SALES */}
      <div className="bg-[#020617]/80 rounded-xl p-6 shadow border border-white/10">
        <h2 className="text-lg font-semibold mb-4">Today’s Sales</h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
          <Card title="Units Sold" value={dailySales.units} />
          <Card
            title="Revenue"
            value={`₹${dailySales.revenue.toLocaleString()}`}
          />
          <Card title="Top Products" value={dailySales.chartData.length} />
        </div>

        {dailySales.chartData.length === 0 ? (
          <p className="text-gray-400">No sales recorded today</p>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dailySales.chartData}>
              <XAxis dataKey="name" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip />
              <Bar dataKey="qty" fill="#22c55e" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* INVENTORY VALUE */}
      <div className="bg-[#020617]/80 rounded-xl p-6 shadow border border-white/10">
        <h2 className="text-lg font-semibold mb-4">
          Inventory Value by Category
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={inventoryByCategory}>
            <XAxis dataKey="category" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip formatter={v => `₹${v.toLocaleString()}`} />
            <Bar dataKey="value" fill="#3b82f6" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* TODAY'S ACTIVITY */}
      <div className="bg-[#020617]/80 rounded-xl p-6 shadow border border-white/10">
        <h2 className="text-lg font-semibold mb-4">Today’s Activity</h2>

        {recentActivities.length === 0 ? (
          <p className="text-gray-400">No activity today</p>
        ) : (
          <ul className="space-y-3">
            {recentActivities.map((a, i) => (
              <li
                key={i}
                className="flex justify-between items-center bg-white/5 p-3 rounded-lg"
              >
                <div>
                  <p className="font-medium">{a.product}</p>
                  <p className="text-sm text-gray-400">{a.time}</p>
                </div>

                <span
                  className={`px-3 py-1 text-xs rounded-full text-black font-semibold ${a.color}`}
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
