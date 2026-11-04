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

const CustomTooltip = ({ active, payload, label, formatter }) => {
  if (!active || !payload?.length) return null;
  const val = payload[0].value;
  const display = formatter ? formatter(val) : val;
  return (
    <div
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius-sm)",
        padding: "8px 14px",
        boxShadow: "var(--shadow-lg)",
      }}
    >
      <p className="text-[var(--text-muted)] text-[10px] mb-0.5">{label}</p>
      <p className="text-[var(--text-primary)] font-bold text-sm">{display}</p>
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
    () => categories.filter((c) => c.status === "Active").map((c) => c._id),
    [categories]
  );

  const activeProducts = useMemo(
    () => products.filter((p) => p.category && activeCategoryIds.includes(p.category._id)),
    [products, activeCategoryIds]
  );

  const inventoryByCategory = useMemo(() => {
    const map = {};
    activeProducts.forEach((p) => {
      const name = p.category?.name || "Unknown";
      map[name] = (map[name] || 0) + p.price * p.quantity;
    });
    return Object.entries(map).map(([category, value]) => ({ category, value }));
  }, [activeProducts]);

  if (!dashboard) return null;

  const { snapshot, todaySales, todayActivity } = dashboard;
  const catColors = ["#496D83", "#7897AB", "#A9C2D1", "#9AAEBB", "#C8DCE9"];

  return (
    <div className="space-y-6">
      <h1 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] tracking-tight">
        Dashboard
      </h1>

      {/* Snapshot stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card title="Total Products" value={snapshot.totalProducts} icon={<Package size={15} />} color="blue" />
        <Card title="Low Stock" value={snapshot.lowStock} icon={<AlertTriangle size={15} />} color="yellow" />
        <Card title="Out of Stock" value={snapshot.outOfStock} icon={<XCircle size={15} />} color="red" />
        <Card title="Inventory Value" value={`₹${snapshot.inventoryValue.toLocaleString()}`} icon={<IndianRupee size={15} />} color="green" />
      </div>

      {/* Today's Sales */}
      <div
        className="rounded-[var(--radius-xl)] p-5 sm:p-6"
        style={{ background: "var(--bg-card)", border: "1px solid var(--border)", boxShadow: "var(--shadow-sm)" }}
      >
        <div className="flex items-center gap-3 mb-5">
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center"
            style={{ background: "var(--success-light)" }}
          >
            <ShoppingCart size={16} className="text-[var(--success)]" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-[var(--text-primary)]">Today's Sales</h2>
            <p className="text-[11px] text-[var(--text-muted)]">Real-time sales overview</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
          <Card title="Units Sold" value={todaySales.units} icon={<TrendingUp size={14} />} color="green" />
          <Card title="Revenue" value={`₹${todaySales.revenue.toLocaleString()}`} icon={<IndianRupee size={14} />} color="cyan" />
          <Card title="Top Products" value={todaySales.chartData.length} icon={<BarChart3 size={14} />} color="purple" />
        </div>

        {todaySales.chartData.length === 0 ? (
          <p className="text-[var(--text-muted)] text-sm">No sales recorded today</p>
        ) : (
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={todaySales.chartData} barCategoryGap="25%">
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="name" stroke="var(--text-muted)" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis stroke="var(--text-muted)" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(73,109,131,0.06)" }} />
              <Bar dataKey="qty" fill="#496D83" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Inventory + Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        {/* Chart */}
        <div
          className="lg:col-span-3 rounded-[var(--radius-xl)] p-5 sm:p-6"
          style={{ background: "var(--bg-card)", border: "1px solid var(--border)", boxShadow: "var(--shadow-sm)" }}
        >
          <div className="flex items-center gap-3 mb-5">
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center"
              style={{ background: "var(--primary-light)" }}
            >
              <BarChart3 size={16} className="text-[var(--primary)]" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-[var(--text-primary)]">Inventory by Category</h2>
              <p className="text-[11px] text-[var(--text-muted)]">Value distribution across categories</p>
            </div>
          </div>

          {inventoryByCategory.length === 0 ? (
            <p className="text-[var(--text-muted)] text-sm">No active category data</p>
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={inventoryByCategory} barCategoryGap="25%">
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="category" stroke="var(--text-muted)" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis stroke="var(--text-muted)" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip formatter={(v) => `₹${v.toLocaleString()}`} />} cursor={{ fill: "rgba(73,109,131,0.06)" }} />
                <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                  {inventoryByCategory.map((_, i) => (
                    <Cell key={i} fill={catColors[i % catColors.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Activity feed */}
        <div
          className="lg:col-span-2 rounded-[var(--radius-xl)] p-5 sm:p-6"
          style={{ background: "var(--bg-card)", border: "1px solid var(--border)", boxShadow: "var(--shadow-sm)" }}
        >
          <h2 className="text-sm font-bold text-[var(--text-primary)] mb-4">Today's Activity</h2>

          {todayActivity.length === 0 ? (
            <p className="text-[var(--text-muted)] text-sm">No activity today</p>
          ) : (
            <div className="space-y-2 max-h-[320px] overflow-y-auto pr-1">
              {todayActivity.map((a, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-3 rounded-[var(--radius-md)] transition-colors hover:bg-[var(--bg-secondary)]"
                  style={{ border: "1px solid var(--border)" }}
                >
                  <div
                    className="w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-lg"
                    style={{
                      background:
                        a.type === "Sold" ? "var(--success-light)"
                        : a.type === "Low Stock" ? "var(--warning-light)"
                        : "var(--primary-light)",
                    }}
                  >
                    {a.type === "Sold" && <TrendingUp size={14} className="text-[var(--success)]" />}
                    {a.type === "Low Stock" && <AlertTriangle size={14} className="text-[var(--warning)]" />}
                    {a.type === "Stock Added" && <Package size={14} className="text-[var(--primary)]" />}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[var(--text-primary)] truncate">{a.product}</p>
                    <p className="text-[10px] text-[var(--text-muted)]">{a.time}</p>
                  </div>

                  <span
                    className={`badge text-[9px] flex-shrink-0 ${
                      a.type === "Sold" ? "badge-success"
                      : a.type === "Low Stock" ? "badge-warning"
                      : "badge-success"
                    }`}
                    style={
                      a.type === "Stock Added"
                        ? { background: "var(--primary-light)", color: "var(--primary)", borderColor: "var(--powder-blue)" }
                        : {}
                    }
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
