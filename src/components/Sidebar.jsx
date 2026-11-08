import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Tags,
  Package,
  Warehouse,
  LogOut,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

const navItems = [
  { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { name: "Categories", path: "/categories", icon: Tags },
  { name: "Products", path: "/products", icon: Package },
];

export default function Sidebar({ isOpen, onClose }) {
  const { dark } = useTheme();
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
        {/* Subtle decorative glow */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute -top-16 -left-16 w-56 h-56 rounded-full"
            style={{
              background: dark
                ? "radial-gradient(circle, rgba(107,167,212,0.05) 0%, transparent 70%)"
                : "radial-gradient(circle, rgba(200,220,233,0.08) 0%, transparent 70%)",
            }}
          />
        </div>

        {/* ── Brand ── */}
        <div className="relative px-6 pt-6 pb-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3.5">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{
                  background: "linear-gradient(135deg, var(--primary), var(--steel-blue))",
                  boxShadow: dark
                    ? "0 4px 20px rgba(107,167,212,0.3)"
                    : "0 4px 20px rgba(73,109,131,0.45)",
                }}
              >
                <Warehouse size={22} strokeWidth={1.8} className="text-white" />
              </div>
              <div>
                <h1 className="text-base font-bold text-white tracking-[-0.02em] leading-tight">
                  StockManager
                </h1>
                <p className="text-[11px] font-medium mt-0.5" style={{ color: "var(--steel-blue)" }}>
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
        <div className="relative mx-5 mb-5">
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
        <div className="relative px-6 pb-3">
          <p
            className="text-[10px] font-semibold tracking-[0.12em] uppercase"
            style={{ color: dark ? "rgba(138,157,178,0.4)" : "rgba(120,151,171,0.5)" }}
          >
            Menu
          </p>
        </div>

        {/* ── Navigation ── */}
        <div className="relative px-4 flex-1">
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className="group relative flex items-center gap-3.5 px-4 py-3.5 rounded-[var(--radius-lg)] transition-all duration-200"
                  style={
                    isActive
                      ? {
                          background: dark
                            ? "linear-gradient(90deg, rgba(107,167,212,0.14), rgba(107,167,212,0.04))"
                            : "linear-gradient(90deg, rgba(200,220,233,0.2), rgba(200,220,233,0.06))",
                        }
                      : {}
                  }
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = "transparent";
                    }
                  }}
                >
                  {/* Active indicator bar */}
                  {isActive && (
                    <motion.div
                      layoutId="sidebar-active"
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] rounded-r-full"
                      style={{
                        height: 28,
                        background: "linear-gradient(180deg, var(--powder-blue), var(--steel-blue))",
                        boxShadow: dark
                          ? "0 0 10px rgba(107,167,212,0.5)"
                          : "0 0 10px rgba(200,220,233,0.7)",
                      }}
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}

                  <div
                    className="w-10 h-10 rounded-[var(--radius-md)] flex items-center justify-center flex-shrink-0 transition-all duration-200"
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
                      size={19}
                      strokeWidth={isActive ? 2.2 : 1.8}
                      style={{
                        color: isActive
                          ? (dark ? "#6BA7D4" : "#C8DCE9")
                          : "var(--steel-blue)",
                        transition: "color 0.2s",
                      }}
                    />
                  </div>

                  <span
                    className="text-[14px] font-semibold tracking-[-0.01em]"
                    style={{
                      color: isActive ? "#fff" : "var(--steel-blue)",
                      transition: "color 0.2s",
                    }}
                  >
                    {item.name}
                  </span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* ── Footer ── */}
        <div className="relative px-4 pb-5">
          {/* System status */}
          <div
            className="mx-1 mb-4 px-4 py-3.5 rounded-[var(--radius-md)]"
            style={{
              background: dark ? "rgba(255,255,255,0.02)" : "rgba(255,255,255,0.04)",
              border: `1px solid ${dark ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.06)"}`,
            }}
          >
            <div className="flex items-center gap-2.5">
              <span
                className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                style={{
                  background: "#34D399",
                  boxShadow: "0 0 8px rgba(52,211,153,0.5)",
                }}
              />
              <span className="text-[12px] font-medium" style={{ color: dark ? "#C8DCE9" : "var(--powder-blue)" }}>
                All systems operational
              </span>
            </div>
          </div>

          {/* Divider */}
          <div
            className="mx-2 mb-3 h-px"
            style={{
              background: dark
                ? "linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent)"
                : "linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)",
            }}
          />

          {/* Logout */}
          <div
            className="flex items-center gap-3.5 px-4 py-3 rounded-[var(--radius-md)] cursor-pointer transition-all duration-200"
            style={{ color: "var(--steel-blue)" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(220,80,80,0.08)";
              e.currentTarget.style.color = "#fb7185";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "var(--steel-blue)";
            }}
          >
            <LogOut size={18} />
            <span className="text-[13px] font-semibold">Log out</span>
          </div>
        </div>
      </aside>
    </>
  );
}
