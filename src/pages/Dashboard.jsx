import { useEffect, useState, useMemo } from "react";
import { fetchDashboardData } from "../services/dashboardService";
import api from "../api/axios";
import {
  Package,
  AlertTriangle,
  XCircle,
  IndianRupee,
  ShoppingCart,
  TrendingUp,
  BarChart3,
} from "lucide-react";

import Card from "../components/Card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from "recharts";

const LOW_STOCK_LIMIT = 5;

const CustomTooltip = ({ active, payload, label, formatter }) => {
  if (!active || !payload?.length) return null;
  const val = payload[0].value;
  const display = formatter ? formatter(val) : val;
  return (
    <div className="bg-[var(--bg-elevated)] border border-[var(--border-hover)] rounded-lg px-3 py-2 shadow-xl text-xs">
      <p className="text-[var(--text-muted)] mb-0.5">{label}</p>
      <p className="text-white font-bold">{display}</p>
    </div>
  );
};

export default function Dashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

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

  const activeCategoryIds = useMemo(
    () =>
      categories
        .filter((c) => c.status === "Active")
        .map((c) => c._id),
    [categories]
  );

  const activeProducts = useMemo(
    () =>
      products.filter(
        (p) => p.category && activeCategoryIds.includes(p.category._id)
      ),
    [products, activeCategoryIds]
  );

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

  const categoryColors = ["#3b82f6", "#8b5cf6", "#06b6d4", "#f59e0b", "#22c55e", "#ef4444"];

  return (
    <div className="space-y-6 text-[var(--text-primary)]">
      <h1 className="text-xl sm:text-2xl font-bold text-white">Dashboard</h1>

      {/* Snapshot stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card
          title="Total Products"
          value={snapshot.totalProducts}
          icon={<Package size={14} />}
          color="blue"
        />
        <Card
          title="Low Stock"
          value={snapshot.lowStock}
          icon={<AlertTriangle size={14} />}
          color="yellow"
        />
        <Card
          title="Out of Stock"
          value={snapshot.outOfStock}
          icon={<XCircle size={14} />}
          color="red"
        />
        <Card
          title="Inventory Value"
          value={`₹${snapshot.inventoryValue.toLocaleString()}`}
          icon={<IndianRupee size={14} />}
          color="green"
        />
      </div>

      {/* Today's sales section */}
      <div className="rounded-[var(--radius-lg)] bg-[var(--bg-elevated)]/50 border border-[var(--border-default)] p-4 sm:p-6">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-green-500/15 flex items-center justify-center">
              <ShoppingCart size={16} className="text-green-400" />
            </div>
            <h2 className="text-base font-semibold text-white">Today's Sales</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <Card
            title="Units Sold"
            value={todaySales.units}
            icon={<TrendingUp size={14} />}
            color="green"
          />
          <Card
            title="Revenue"
            value={`₹${todaySales.revenue.toLocaleString()}`}
            icon={<IndianRupee size={14} />}
            color="cyan"
          />
          <Card
            title="Top Products"
            value={todaySales.chartData.length}
            icon={<BarChart3 size={14} />}
            color="purple"
          />
        </div>

        {todaySales.chartData.length === 0 ? (
          <p className="text-[var(--text-muted)] text-sm">No sales recorded today</p>
        ) : (
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={todaySales.chartData} barCategoryGap="20%">
              <defs>
                <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#22c55e" stopOpacity={1} />
                  <stop offset="100%" stopColor="#22c55e" stopOpacity={0.3} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.04)"
                vertical={false}
              />
              <XAxis
                dataKey="name"
                stroke="var(--text-muted)"
                tick={{ fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                stroke="var(--text-muted)"
                tick={{ fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
              <Bar dataKey="qty" fill="url(#salesGradient)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Inventory by category + Activity side by side on desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Chart: 3 cols */}
        <div className="lg:col-span-3 rounded-[var(--radius-lg)] bg-[var(--bg-elevated)]/50 border border-[var(--border-default)] p-4 sm:p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-8 rounded-lg bg-blue-500/15 flex items-center justify-center">
              <BarChart3 size={16} className="text-blue-400" />
            </div>
            <h2 className="text-base font-semibold text-white">
              Inventory Value by Category
            </h2>
          </div>

          {inventoryByCategory.length === 0 ? (
            <p className="text-[var(--text-muted)] text-sm">No active category data</p>
          ) : (
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={inventoryByCategory} barCategoryGap="20%">
                <defs>
                  <linearGradient id="catGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity={1} />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.3} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(255,255,255,0.04)"
                  vertical={false}
                />
                <XAxis
                  dataKey="category"
                  stroke="var(--text-muted)"
                  tick={{ fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  stroke="var(--text-muted)"
                  tick={{ fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  content={<CustomTooltip formatter={(v) => `₹${v.toLocaleString()}`} />}
                  cursor={{ fill: "rgba(255,255,255,0.03)" }}
                />
                <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                  {inventoryByCategory.map((_, i) => (
                    <Cell key={i} fill={categoryColors[i % categoryColors.length]} fillOpacity={0.85} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Activity feed: 2 cols */}
        <div className="lg:col-span-2 rounded-[var(--radius-lg)] bg-[var(--bg-elevated)]/50 border border-[var(--border-default)] p-4 sm:p-6">
          <h2 className="text-base font-semibold text-white mb-4">
            Today's Activity
          </h2>

          {todayActivity.length === 0 ? (
            <p className="text-[var(--text-muted)] text-sm">No activity today</p>
          ) : (
            <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
              {todayActivity.map((a, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 bg-[var(--bg-surface)] border border-[var(--border-default)] p-3 rounded-[var(--radius-md)] hover:border-[var(--border-hover)] transition"
                >
                  <div
                    className={`w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-lg text-sm ${
                      a.type === "Sold"
                        ? "bg-green-500/12 text-green-400"
                        : a.type === "Low Stock"
                        ? "bg-yellow-500/12 text-yellow-400"
                        : "bg-blue-500/12 text-blue-400"
                    }`}
                  >
                    {a.type === "Sold" && <TrendingUp size={14} />}
                    {a.type === "Low Stock" && <AlertTriangle size={14} />}
                    {a.type === "Stock Added" && <Package size={14} />}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">
                      {a.product}
                    </p>
                    <p className="text-xs text-[var(--text-muted)]">{a.time}</p>
                  </div>

                  <span
                    className={`badge text-[10px] flex-shrink-0 ${
                      a.type === "Sold"
                        ? "badge-success"
                        : a.type === "Low Stock"
                        ? "badge-warning"
                        : "bg-blue-500/12 text-blue-400"
                    }`}
                  >
                    {a.type}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
