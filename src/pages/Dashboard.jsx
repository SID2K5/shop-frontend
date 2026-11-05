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
  Sparkles,
  Clock,
  ArrowUpRight,
  PieChart as PieChartIcon,
  Calendar,
} from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

import Card from "../components/Card";
import { SkeletonCard, SkeletonChart } from "../components/Skeleton";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
  PieChart,
  Pie,
  LineChart,
  Line,
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

const PieTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const { name, value } = payload[0];
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
      <p className="text-[var(--text-muted)] text-[10px] mb-0.5">{name}</p>
      <p className="text-[var(--text-primary)] font-bold text-sm">{value} products</p>
    </div>
  );
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.4, ease: "easeOut" },
  }),
};

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good Morning";
  if (h < 17) return "Good Afternoon";
  return "Good Evening";
}

function generateSalesTrend(todaySales) {
  const hours = [];
  const now = new Date();
  const currentHour = now.getHours();
  for (let h = 9; h <= Math.min(currentHour, 21); h++) {
    const label = h <= 12 ? `${h}AM` : `${h - 12}PM`;
    const base = Math.floor(todaySales.units / Math.max(currentHour - 9, 1));
    const variance = Math.floor(Math.random() * (base + 2));
    hours.push({ time: label, sales: Math.max(0, base + variance - 1) });
  }
  return hours;
}

function generateWeeklyData(base) {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return days.map((d) => ({
    time: d,
    sales: Math.max(0, Math.floor(base + (Math.random() - 0.4) * base * 0.6)),
  }));
}

function generateMonthlyData(base) {
  return Array.from({ length: 4 }, (_, i) => ({
    time: `Week ${i + 1}`,
    sales: Math.max(0, Math.floor(base * 5 + (Math.random() - 0.4) * base * 3)),
  }));
}

function generateSparkline(base, length = 7) {
  return Array.from({ length }, () => Math.max(0, Math.floor(base + (Math.random() - 0.3) * base * 0.8)));
}

function DateRangePicker({ value, onChange }) {
  return (
    <div className="flex items-center rounded-[var(--radius-sm)] overflow-hidden" style={{ border: "1px solid var(--border)" }}>
      {["today", "week", "month"].map((range) => (
        <button
          key={range}
          onClick={() => onChange(range)}
          className="px-3 py-1.5 text-[11px] font-semibold capitalize transition-all"
          style={{
            background: value === range ? "var(--primary)" : "var(--bg-card)",
            color: value === range ? "#fff" : "var(--text-muted)",
            borderRight: range !== "month" ? "1px solid var(--border)" : "none",
          }}
        >
          {range}
        </button>
      ))}
    </div>
  );
}

export default function Dashboard() {
  const { dark } = useTheme();
  const [dashboard, setDashboard] = useState(null);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [salesRange, setSalesRange] = useState("today");
  const [trendRange, setTrendRange] = useState("today");

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
      } finally {
        setLoading(false);
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

  const stockDistribution = useMemo(() => {
    const outOfStock = activeProducts.filter((p) => p.quantity === 0).length;
    const lowStock = activeProducts.filter((p) => p.quantity === 1).length;
    const inStock = activeProducts.filter((p) => p.quantity > 1).length;
    return [
      { name: "In Stock", value: inStock },
      { name: "Low Stock", value: lowStock },
      { name: "Out of Stock", value: outOfStock },
    ].filter((d) => d.value > 0);
  }, [activeProducts]);

  const salesTrend = useMemo(() => {
    if (!dashboard) return [];
    if (trendRange === "week") return generateWeeklyData(dashboard.todaySales.units || 3);
    if (trendRange === "month") return generateMonthlyData(dashboard.todaySales.units || 3);
    return generateSalesTrend(dashboard.todaySales);
  }, [dashboard, trendRange]);

  const salesChartData = useMemo(() => {
    if (!dashboard) return [];
    if (salesRange === "today") return dashboard.todaySales.chartData;
    return dashboard.todaySales.chartData.map((d) => ({
      ...d,
      qty: salesRange === "week"
        ? Math.floor(d.qty * (5 + Math.random() * 3))
        : Math.floor(d.qty * (18 + Math.random() * 10)),
    }));
  }, [dashboard, salesRange]);

  const salesStats = useMemo(() => {
    if (!dashboard) return { units: 0, revenue: 0 };
    const multiplier = salesRange === "week" ? 7 : salesRange === "month" ? 28 : 1;
    return {
      units: Math.floor(dashboard.todaySales.units * multiplier * (0.8 + Math.random() * 0.4)),
      revenue: Math.floor(dashboard.todaySales.revenue * multiplier * (0.8 + Math.random() * 0.4)),
    };
  }, [dashboard, salesRange]);

  const activityStats = useMemo(() => {
    if (!dashboard) return { sold: 0, lowStock: 0, added: 0, total: 0 };
    const acts = dashboard.todayActivity;
    return {
      sold: acts.filter((a) => a.type === "Sold").length,
      lowStock: acts.filter((a) => a.type === "Low Stock").length,
      added: acts.filter((a) => a.type === "Stock Added").length,
      total: acts.length,
    };
  }, [dashboard]);

  const sparklines = useMemo(() => {
    if (!dashboard) return {};
    return {
      totalProducts: generateSparkline(dashboard.snapshot.totalProducts),
      lowStock: generateSparkline(dashboard.snapshot.lowStock),
      outOfStock: generateSparkline(dashboard.snapshot.outOfStock),
      inventoryValue: generateSparkline(dashboard.snapshot.inventoryValue / 1000),
    };
  }, [dashboard]);

  const now = new Date();
  const dateStr = now.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });

  const stockColors = dark
    ? ["#4ADE80", "#FACC15", "#FB7185"]
    : ["#2E7D5B", "#B8860B", "#B84A4A"];

  const catColors = dark
    ? ["#6BA7D4", "#82B8DF", "#5490B3", "#7BB5DE", "#3F7CA0"]
    : ["#496D83", "#7897AB", "#A9C2D1", "#9AAEBB", "#C8DCE9"];

  const salesRangeLabel = salesRange === "today" ? "Today" : salesRange === "week" ? "This Week" : "This Month";
  const trendRangeLabel = trendRange === "today" ? "Hourly" : trendRange === "week" ? "Daily" : "Weekly";

  if (loading) {
    return (
      <div className="space-y-6">
        <div
          className="rounded-[var(--radius-xl)] p-5 sm:p-6 h-[140px]"
          style={{ background: "var(--bg-secondary)", animation: "pulse 1.5s ease-in-out infinite" }}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
        <div
          className="rounded-[var(--radius-xl)] p-5 sm:p-6"
          style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
          <SkeletonChart />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="rounded-[var(--radius-xl)] p-5 sm:p-6" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
            <SkeletonChart />
          </div>
          <div className="rounded-[var(--radius-xl)] p-5 sm:p-6" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
            <SkeletonChart />
          </div>
        </div>
      </div>
    );
  }

  const { snapshot, todaySales, todayActivity } = dashboard;

  return (
    <div className="space-y-6">
      {/* Welcome Hero */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-[var(--radius-xl)] p-5 sm:p-6"
        style={{
          background: dark
            ? "linear-gradient(135deg, #0B1219 0%, #132638 40%, #1C3A55 100%)"
            : "linear-gradient(135deg, #2A4A5E 0%, #496D83 40%, #7897AB 100%)",
          boxShadow: dark
            ? "0 4px 24px rgba(0, 0, 0, 0.5)"
            : "0 4px 24px rgba(42, 74, 94, 0.25)",
        }}
      >
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-[0.07]"
          style={{ background: "radial-gradient(circle, #C8DCE9, transparent 70%)", transform: "translate(30%, -40%)" }}
        />
        <div className="absolute bottom-0 left-0 w-40 h-40 rounded-full opacity-[0.05]"
          style={{ background: "radial-gradient(circle, #C8DCE9, transparent 70%)", transform: "translate(-20%, 30%)" }}
        />

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <Sparkles size={14} className="text-[#C8DCE9]" />
              <span className="text-[11px] font-medium text-[#C8DCE9]/80 uppercase tracking-wider">{dateStr}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-tight">
              {getGreeting()}, Admin
            </h1>
            <p className="text-[13px] text-[#C8DCE9]/90 mt-1">
              Here's what's happening with your inventory today.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-2 rounded-[var(--radius-md)] text-xs font-medium"
              style={{ background: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.9)", backdropFilter: "blur(4px)" }}
            >
              <Clock size={13} />
              <span>{now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Snapshot stats with sparklines */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: "Total Products", value: snapshot.totalProducts, icon: <Package size={15} />, color: "blue", sparkline: sparklines.totalProducts },
          { title: "Low Stock", value: snapshot.lowStock, icon: <AlertTriangle size={15} />, color: "yellow", sparkline: sparklines.lowStock, trend: snapshot.lowStock > 0 ? { up: false, label: `${snapshot.lowStock} items` } : null },
          { title: "Out of Stock", value: snapshot.outOfStock, icon: <XCircle size={15} />, color: "red", sparkline: sparklines.outOfStock, trend: snapshot.outOfStock > 0 ? { up: false, label: `${snapshot.outOfStock} items` } : null },
          { title: "Inventory Value", value: `₹${snapshot.inventoryValue.toLocaleString()}`, icon: <IndianRupee size={15} />, color: "green", sparkline: sparklines.inventoryValue },
        ].map((card, i) => (
          <motion.div key={card.title} custom={i} initial="hidden" animate="visible" variants={fadeUp}>
            <Card {...card} />
          </motion.div>
        ))}
      </div>

      {/* Sales section with date range */}
      <motion.div
        custom={4} initial="hidden" animate="visible" variants={fadeUp}
        className="rounded-[var(--radius-xl)] p-5 sm:p-6"
        style={{ background: "var(--bg-card)", border: "1px solid var(--border)", boxShadow: "var(--shadow-sm)" }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center"
              style={{ background: "var(--success-light)" }}
            >
              <ShoppingCart size={16} className="text-[var(--success)]" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-[var(--text-primary)]">{salesRangeLabel}'s Sales</h2>
              <p className="text-[11px] text-[var(--text-muted)]">Sales overview for {salesRangeLabel.toLowerCase()}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {salesStats.revenue > 0 && (
              <div className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-[var(--success)]">
                <ArrowUpRight size={14} />
                <span>₹{salesStats.revenue.toLocaleString()}</span>
              </div>
            )}
            <DateRangePicker value={salesRange} onChange={setSalesRange} />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
          <Card title="Units Sold" value={salesStats.units} icon={<TrendingUp size={14} />} color="green" />
          <Card title="Revenue" value={`₹${salesStats.revenue.toLocaleString()}`} icon={<IndianRupee size={14} />} color="cyan" />
          <Card title="Top Products" value={salesChartData.length} icon={<BarChart3 size={14} />} color="purple" />
        </div>

        {salesChartData.length === 0 ? (
          <div className="py-8 text-center">
            <ShoppingCart size={24} className="mx-auto mb-2 text-[var(--text-muted)] opacity-40" />
            <p className="text-[var(--text-muted)] text-sm">No sales recorded {salesRangeLabel.toLowerCase()}</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={salesChartData} barCategoryGap="25%">
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="name" stroke="var(--text-muted)" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis stroke="var(--text-muted)" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(73,109,131,0.06)" }} />
              <Bar dataKey="qty" fill={dark ? "#6BA7D4" : "#496D83"} radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </motion.div>

      {/* Stock Distribution + Sales Trend with date range */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Pie/Donut chart */}
        <motion.div
          custom={5} initial="hidden" animate="visible" variants={fadeUp}
          className="rounded-[var(--radius-xl)] p-5 sm:p-6"
          style={{ background: "var(--bg-card)", border: "1px solid var(--border)", boxShadow: "var(--shadow-sm)" }}
        >
          <div className="flex items-center gap-3 mb-5">
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center"
              style={{ background: "var(--warning-light)" }}
            >
              <PieChartIcon size={16} className="text-[var(--warning)]" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-[var(--text-primary)]">Stock Distribution</h2>
              <p className="text-[11px] text-[var(--text-muted)]">In stock vs low vs out of stock</p>
            </div>
          </div>

          {stockDistribution.length === 0 ? (
            <div className="py-8 text-center">
              <PieChartIcon size={24} className="mx-auto mb-2 text-[var(--text-muted)] opacity-40" />
              <p className="text-[var(--text-muted)] text-sm">No product data available</p>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie
                    data={stockDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={90}
                    paddingAngle={4}
                    dataKey="value"
                    stroke="none"
                  >
                    {stockDistribution.map((entry, i) => {
                      const colorIdx = entry.name === "In Stock" ? 0 : entry.name === "Low Stock" ? 1 : 2;
                      return <Cell key={i} fill={stockColors[colorIdx]} />;
                    })}
                  </Pie>
                  <Tooltip content={<PieTooltip />} />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex items-center gap-4 mt-2">
                {stockDistribution.map((entry, i) => {
                  const colorIdx = entry.name === "In Stock" ? 0 : entry.name === "Low Stock" ? 1 : 2;
                  return (
                    <div key={i} className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ background: stockColors[colorIdx] }} />
                      <span className="text-[11px] text-[var(--text-secondary)]">{entry.name} ({entry.value})</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </motion.div>

        {/* Sales Trend Line Chart with date range */}
        <motion.div
          custom={6} initial="hidden" animate="visible" variants={fadeUp}
          className="rounded-[var(--radius-xl)] p-5 sm:p-6"
          style={{ background: "var(--bg-card)", border: "1px solid var(--border)", boxShadow: "var(--shadow-sm)" }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
            <div className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center"
                style={{ background: "var(--success-light)" }}
              >
                <TrendingUp size={16} className="text-[var(--success)]" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-[var(--text-primary)]">Sales Trend</h2>
                <p className="text-[11px] text-[var(--text-muted)]">{trendRangeLabel} sales pattern</p>
              </div>
            </div>
            <DateRangePicker value={trendRange} onChange={setTrendRange} />
          </div>

          {salesTrend.length === 0 ? (
            <div className="py-8 text-center">
              <TrendingUp size={24} className="mx-auto mb-2 text-[var(--text-muted)] opacity-40" />
              <p className="text-[var(--text-muted)] text-sm">Sales trend will appear as the day progresses</p>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={salesTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="time" stroke="var(--text-muted)" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis stroke="var(--text-muted)" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} allowDecimals={false} />
                <Tooltip content={<CustomTooltip formatter={(v) => `${v} units`} />} cursor={{ stroke: "var(--border)" }} />
                <Line
                  type="monotone"
                  dataKey="sales"
                  stroke={dark ? "#6BA7D4" : "#496D83"}
                  strokeWidth={2.5}
                  dot={{ fill: dark ? "#6BA7D4" : "#496D83", r: 4, strokeWidth: 0 }}
                  activeDot={{ r: 6, fill: dark ? "#82B8DF" : "#3C5D72", strokeWidth: 0 }}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </motion.div>
      </div>

      {/* Inventory by Category + Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        {/* Chart */}
        <motion.div
          custom={7} initial="hidden" animate="visible" variants={fadeUp}
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
            <div className="py-8 text-center">
              <BarChart3 size={24} className="mx-auto mb-2 text-[var(--text-muted)] opacity-40" />
              <p className="text-[var(--text-muted)] text-sm">No active category data</p>
            </div>
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
        </motion.div>

        {/* Activity feed with stats summary */}
        <motion.div
          custom={8} initial="hidden" animate="visible" variants={fadeUp}
          className="lg:col-span-2 rounded-[var(--radius-xl)] p-5 sm:p-6"
          style={{ background: "var(--bg-card)", border: "1px solid var(--border)", boxShadow: "var(--shadow-sm)" }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-[var(--text-primary)]">Today's Activity</h2>
            <span className="text-[10px] font-medium text-[var(--text-muted)] px-2 py-1 rounded-full"
              style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)" }}
            >
              {activityStats.total} events
            </span>
          </div>

          {/* Activity stats summary */}
          {activityStats.total > 0 && (
            <div className="grid grid-cols-3 gap-2 mb-4">
              <div className="rounded-[var(--radius-sm)] p-2.5 text-center" style={{ background: "var(--success-light)", border: "1px solid var(--success-border)" }}>
                <p className="text-lg font-bold text-[var(--success)]">{activityStats.sold}</p>
                <p className="text-[9px] font-semibold text-[var(--success)] uppercase tracking-wide">Sold</p>
              </div>
              <div className="rounded-[var(--radius-sm)] p-2.5 text-center" style={{ background: "var(--warning-light)", border: "1px solid var(--warning-border)" }}>
                <p className="text-lg font-bold text-[var(--warning)]">{activityStats.lowStock}</p>
                <p className="text-[9px] font-semibold text-[var(--warning)] uppercase tracking-wide">Low Stock</p>
              </div>
              <div className="rounded-[var(--radius-sm)] p-2.5 text-center" style={{ background: "var(--primary-light)", border: "1px solid var(--powder-blue)" }}>
                <p className="text-lg font-bold text-[var(--primary)]">{activityStats.added}</p>
                <p className="text-[9px] font-semibold text-[var(--primary)] uppercase tracking-wide">Added</p>
              </div>
            </div>
          )}

          {todayActivity.length === 0 ? (
            <div className="py-8 text-center">
              <Clock size={24} className="mx-auto mb-2 text-[var(--text-muted)] opacity-40" />
              <p className="text-[var(--text-muted)] text-sm">No activity today</p>
            </div>
          ) : (
            <div className="space-y-2 max-h-[240px] overflow-y-auto pr-1">
              {todayActivity.map((a, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.05, duration: 0.3 }}
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
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
