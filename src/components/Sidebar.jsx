import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Tags,
  Package,
  Warehouse,
  LogOut,
  X,
  Sun,
  Moon,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

const navItems = [
  { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard, desc: "Overview & analytics" },
  { name: "Categories", path: "/categories", icon: Tags, desc: "Organize products" },
  { name: "Products", path: "/products", icon: Package, desc: "Inventory & stock" },
];

export default function Sidebar({ isOpen, onClose }) {
  const { dark, toggle } = useTheme();
  const location = useLocation();

  return (
    <>
      {/* Mobile backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 lg:hidden"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full z-50
          w-[var(--sidebar-width)] flex flex-col
          transition-transform duration-300 ease-out
          lg:static lg:translate-x-0 lg:z-auto
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
        style={{
          background: dark
            ? "linear-gradient(180deg, #080E15 0%, #0C1620 50%, #0F1A26 100%)"
            : "linear-gradient(180deg, #1B2F3E 0%, #223848 50%, var(--sidebar-bg) 100%)",
          borderRight: `1px solid ${dark ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.05)"}`,
        }}
      >
        {/* Decorative glows */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute -top-20 -left-20 w-64 h-64 rounded-full"
            style={{
              background: dark
                ? "radial-gradient(circle, rgba(107,167,212,0.06) 0%, transparent 70%)"
                : "radial-gradient(circle, rgba(200,220,233,0.1) 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute bottom-32 -right-16 w-48 h-48 rounded-full"
            style={{
              background: dark
                ? "radial-gradient(circle, rgba(107,167,212,0.03) 0%, transparent 70%)"
                : "radial-gradient(circle, rgba(200,220,233,0.05) 0%, transparent 70%)",
            }}
          />
        </div>

        {/* ── Brand ── */}
        <div className="relative px-7 pt-8 pb-7">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{
                  background: "linear-gradient(135deg, var(--primary), var(--steel-blue))",
                  boxShadow: dark
                    ? "0 4px 24px rgba(107,167,212,0.3)"
                    : "0 4px 24px rgba(73,109,131,0.45)",
                }}
              >
                <Warehouse size={28} strokeWidth={1.8} className="text-white" />
              </div>
              <div>
                <h1 className="text-[19px] font-bold text-white tracking-[-0.02em] leading-tight">
                  StockManager
                </h1>
                <p className="text-[12px] font-medium mt-1.5" style={{ color: "var(--steel-blue)" }}>
                  Inventory Platform
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="lg:hidden w-8 h-8 rounded-lg flex items-center justify-center text-[var(--steel-blue)] hover:text-white hover:bg-[var(--sidebar-hover)] transition"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* ── Divider ── */}
        <div className="relative mx-6 mb-7">
          <div
            className="h-px w-full"
            style={{
              background: dark
                ? "linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)"
                : "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)",
            }}
          />
        </div>

        {/* ── Navigation label ── */}
        <div className="relative px-7 pb-5">
          <p
            className="text-[10px] font-bold tracking-[0.14em] uppercase"
            style={{ color: dark ? "rgba(138,157,178,0.35)" : "rgba(120,151,171,0.45)" }}
          >
            Navigation
          </p>
        </div>

        {/* ── Navigation ── */}
        <div className="relative px-5 flex-1">
          <nav className="space-y-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className="group relative flex items-center gap-4 px-5 py-5 rounded-[var(--radius-lg)] transition-all duration-200"
                  style={
                    isActive
                      ? {
                          background: dark
                            ? "linear-gradient(90deg, rgba(107,167,212,0.14), rgba(107,167,212,0.03))"
                            : "linear-gradient(90deg, rgba(200,220,233,0.22), rgba(200,220,233,0.05))",
                        }
                      : {}
                  }
                  onMouseEnter={(e) => {
                    if (!isActive) e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) e.currentTarget.style.background = "transparent";
                  }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="sidebar-active"
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] rounded-r-full"
                      style={{
                        height: 36,
                        background: "linear-gradient(180deg, var(--powder-blue), var(--steel-blue))",
                        boxShadow: dark
                          ? "0 0 12px rgba(107,167,212,0.5)"
                          : "0 0 12px rgba(200,220,233,0.7)",
                      }}
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}

                  <div
                    className="w-12 h-12 rounded-[var(--radius-md)] flex items-center justify-center flex-shrink-0 transition-all duration-200"
                    style={
                      isActive
                        ? {
                            background: dark
                              ? "rgba(107,167,212,0.15)"
                              : "rgba(200,220,233,0.22)",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                          }
                        : { background: "rgba(255,255,255,0.03)" }
                    }
                  >
                    <Icon
                      size={22}
                      strokeWidth={isActive ? 2.2 : 1.8}
                      style={{
                        color: isActive
                          ? (dark ? "#6BA7D4" : "#C8DCE9")
                          : "var(--steel-blue)",
                        transition: "color 0.2s",
                      }}
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <span
                      className="text-[15px] font-semibold block leading-tight tracking-[-0.01em]"
                      style={{
                        color: isActive ? "#fff" : "var(--steel-blue)",
                        transition: "color 0.2s",
                      }}
                    >
                      {item.name}
                    </span>
                    <span
                      className="text-[12px] block mt-1"
                      style={{
                        color: isActive
                          ? (dark ? "rgba(200,220,233,0.5)" : "rgba(200,220,233,0.55)")
                          : (dark ? "rgba(138,157,178,0.35)" : "rgba(120,151,171,0.4)"),
                        transition: "color 0.2s",
                      }}
                    >
                      {item.desc}
                    </span>
                  </div>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* ── Footer ── */}
        <div className="relative px-5 pb-6">
          {/* System status */}
          <div
            className="mx-1 mb-5 px-5 py-5 rounded-[var(--radius-lg)]"
            style={{
              background: dark ? "rgba(255,255,255,0.02)" : "rgba(255,255,255,0.04)",
              border: `1px solid ${dark ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.06)"}`,
            }}
          >
            <div className="flex items-center gap-3">
              <span
                className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                style={{
                  background: "#34D399",
                  boxShadow: "0 0 8px rgba(52,211,153,0.5)",
                }}
              />
              <span className="text-[13px] font-medium" style={{ color: dark ? "#C8DCE9" : "var(--powder-blue)" }}>
                All systems operational
              </span>
            </div>
          </div>

          {/* Divider */}
          <div
            className="mx-2 mb-5 h-px"
            style={{
              background: dark
                ? "linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent)"
                : "linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)",
            }}
          />

          {/* Theme toggle */}
          <div className="mx-1 mb-4 flex items-center justify-between px-5 py-3.5 rounded-[var(--radius-md)]">
            <span className="text-[13px] font-medium" style={{ color: "var(--steel-blue)" }}>
              {dark ? "Dark Mode" : "Light Mode"}
            </span>
            <button
              onClick={toggle}
              className="w-10 h-10 rounded-lg flex items-center justify-center transition-colors"
              style={{
                background: dark ? "rgba(107,167,212,0.1)" : "rgba(200,220,233,0.15)",
                color: dark ? "#6BA7D4" : "#C8DCE9",
              }}
              aria-label={dark ? "Light mode" : "Dark mode"}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={dark ? "moon" : "sun"}
                  initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
                  transition={{ duration: 0.15 }}
                  className="flex items-center justify-center"
                >
                  {dark ? <Moon size={18} /> : <Sun size={18} />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>

          {/* Divider */}
          <div
            className="mx-2 mb-4 h-px"
            style={{
              background: dark
                ? "linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent)"
                : "linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)",
            }}
          />

          {/* User profile + logout */}
          <div className="mx-1 flex items-center gap-4 px-5 py-4.5 rounded-[var(--radius-lg)]"
            style={{
              background: dark ? "rgba(255,255,255,0.02)" : "rgba(255,255,255,0.04)",
              border: `1px solid ${dark ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.06)"}`,
            }}
          >
            <div
              className="w-11 h-11 rounded-full flex items-center justify-center text-[13px] font-bold text-white flex-shrink-0"
              style={{
                background: "linear-gradient(135deg, var(--primary), var(--steel-blue))",
                boxShadow: dark
                  ? "0 2px 12px rgba(107,167,212,0.25)"
                  : "0 2px 12px rgba(73,109,131,0.35)",
              }}
            >
              A
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[14px] font-semibold text-white leading-tight">Admin</p>
              <p className="text-[12px] leading-tight mt-1" style={{ color: "var(--steel-blue)" }}>Manager</p>
            </div>
            <button
              className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors flex-shrink-0"
              style={{ color: "var(--steel-blue)" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(220,80,80,0.12)";
                e.currentTarget.style.color = "#fb7185";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "var(--steel-blue)";
              }}
              title="Log out"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
