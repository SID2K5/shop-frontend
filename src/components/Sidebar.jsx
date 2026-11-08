import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Tags,
  Package,
  Warehouse,
  LogOut,
  X,
  ChevronRight,
  Activity,
  HelpCircle,
  Settings,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

const navItems = [
  { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard, description: "Overview & analytics" },
  { name: "Categories", path: "/categories", icon: Tags, description: "Organize products" },
  { name: "Products", path: "/products", icon: Package, description: "Inventory & stock" },
];

const bottomItems = [
  { name: "Settings", icon: Settings },
  { name: "Help & Support", icon: HelpCircle },
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
            ? "linear-gradient(180deg, #0A1218 0%, #0D161E 40%, var(--sidebar-bg) 100%)"
            : "linear-gradient(180deg, #1A2D3B 0%, #223847 40%, var(--sidebar-bg) 100%)",
          borderRight: `1px solid ${dark ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.06)"}`,
        }}
      >
        {/* Decorative background glow */}
        <div
          className="absolute inset-0 pointer-events-none overflow-hidden"
          style={{ borderRadius: "inherit" }}
        >
          <div
            className="absolute -top-20 -left-20 w-60 h-60 rounded-full"
            style={{
              background: dark
                ? "radial-gradient(circle, rgba(107, 167, 212, 0.06) 0%, transparent 70%)"
                : "radial-gradient(circle, rgba(200, 220, 233, 0.1) 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute bottom-20 -right-10 w-40 h-40 rounded-full"
            style={{
              background: dark
                ? "radial-gradient(circle, rgba(107, 167, 212, 0.03) 0%, transparent 70%)"
                : "radial-gradient(circle, rgba(200, 220, 233, 0.06) 0%, transparent 70%)",
            }}
          />
        </div>

        {/* Brand */}
        <div className="relative px-5 pt-5 pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, var(--primary), var(--steel-blue))",
                  boxShadow: dark
                    ? "0 4px 16px rgba(107, 167, 212, 0.25)"
                    : "0 4px 16px rgba(73, 109, 131, 0.4)",
                }}
              >
                <Warehouse size={20} strokeWidth={2} className="text-white" />
              </div>
              <div>
                <h1 className="text-[15px] font-bold leading-tight text-white tracking-[-0.01em]">
                  StockManager
                </h1>
                <p className="text-[10px] font-medium" style={{ color: "var(--steel-blue)" }}>
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

        {/* Divider */}
        <div className="relative px-5 py-3">
          <div className="h-px w-full" style={{ background: "rgba(255,255,255,0.06)" }} />
        </div>

        {/* Navigation label */}
        <div className="relative px-5 pb-2">
          <p className="text-[9px] font-bold tracking-[0.15em] uppercase" style={{ color: "rgba(120, 151, 171, 0.5)" }}>
            Main Menu
          </p>
        </div>

        {/* Navigation */}
        <div className="relative px-3 flex-1">
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className="group relative flex items-center gap-3 px-3 py-3 rounded-[var(--radius-md)] transition-all duration-200"
                  style={
                    isActive
                      ? {
                          background: dark
                            ? "linear-gradient(90deg, rgba(107, 167, 212, 0.12), rgba(107, 167, 212, 0.04))"
                            : "linear-gradient(90deg, rgba(200, 220, 233, 0.18), rgba(200, 220, 233, 0.06))",
                          boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
                        }
                      : {}
                  }
                >
                  {/* Active indicator bar */}
                  {isActive && (
                    <motion.div
                      layoutId="sidebar-active"
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] rounded-r-full"
                      style={{
                        height: 24,
                        background: "linear-gradient(180deg, var(--powder-blue), var(--steel-blue))",
                        boxShadow: dark
                          ? "0 0 8px rgba(107, 167, 212, 0.4)"
                          : "0 0 8px rgba(200, 220, 233, 0.6)",
                      }}
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}

                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200"
                    style={
                      isActive
                        ? {
                            background: dark
                              ? "rgba(107, 167, 212, 0.15)"
                              : "rgba(200, 220, 233, 0.2)",
                          }
                        : {
                            background: "rgba(255,255,255,0.03)",
                          }
                    }
                  >
                    <Icon
                      size={17}
                      strokeWidth={2}
                      style={{
                        color: isActive ? "var(--powder-blue)" : "var(--steel-blue)",
                        transition: "color 0.2s",
                      }}
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <span
                      className="text-[13px] font-semibold block leading-tight"
                      style={{
                        color: isActive ? "#fff" : "var(--steel-blue)",
                        transition: "color 0.2s",
                      }}
                    >
                      {item.name}
                    </span>
                    <span
                      className="text-[10px] block leading-tight mt-0.5"
                      style={{
                        color: isActive
                          ? "rgba(200, 220, 233, 0.6)"
                          : "rgba(120, 151, 171, 0.4)",
                        transition: "color 0.2s",
                      }}
                    >
                      {item.description}
                    </span>
                  </div>

                  {isActive && (
                    <ChevronRight
                      size={14}
                      style={{ color: "var(--steel-blue)", opacity: 0.5 }}
                    />
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Footer section */}
        <div className="relative px-3 pb-4">
          {/* System status */}
          <div
            className="mx-2 mb-3 p-3 rounded-[var(--radius-md)]"
            style={{
              background: dark
                ? "rgba(255,255,255,0.03)"
                : "rgba(255,255,255,0.05)",
              border: `1px solid ${dark ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.07)"}`,
            }}
          >
            <div className="flex items-center gap-2 mb-2.5">
              <Activity size={12} style={{ color: "var(--steel-blue)", opacity: 0.7 }} />
              <p className="text-[10px] font-semibold tracking-wide uppercase" style={{ color: "rgba(120, 151, 171, 0.5)" }}>
                System Status
              </p>
            </div>
            <div className="flex items-center gap-2.5">
              <span
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{
                  background: "#34D399",
                  boxShadow: "0 0 6px rgba(52, 211, 153, 0.5)",
                }}
              />
              <span className="text-[11px] font-medium" style={{ color: "var(--powder-blue)" }}>
                All systems operational
              </span>
            </div>
            <div className="mt-2 flex gap-3">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--steel-blue)", opacity: 0.4 }} />
                <span className="text-[9px]" style={{ color: "rgba(120, 151, 171, 0.45)" }}>API</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--steel-blue)", opacity: 0.4 }} />
                <span className="text-[9px]" style={{ color: "rgba(120, 151, 171, 0.45)" }}>Database</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--steel-blue)", opacity: 0.4 }} />
                <span className="text-[9px]" style={{ color: "rgba(120, 151, 171, 0.45)" }}>Storage</span>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px w-full mx-2 mb-2" style={{ background: "rgba(255,255,255,0.04)", maxWidth: "calc(100% - 1rem)" }} />

          {/* Bottom links */}
          {bottomItems.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.name}
                className="flex items-center gap-3 px-3 py-2 rounded-[var(--radius-md)] cursor-pointer transition-all duration-200"
                style={{ color: "var(--steel-blue)" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                  e.currentTarget.style.color = "var(--powder-blue)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "var(--steel-blue)";
                }}
              >
                <Icon size={15} />
                <span className="text-[12px] font-medium">{item.name}</span>
              </div>
            );
          })}

          {/* Logout */}
          <div
            className="flex items-center gap-3 px-3 py-2 mt-0.5 rounded-[var(--radius-md)] cursor-pointer transition-all duration-200"
            style={{ color: "var(--steel-blue)" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(220, 80, 80, 0.08)";
              e.currentTarget.style.color = "#fb7185";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "var(--steel-blue)";
            }}
          >
            <LogOut size={15} />
            <span className="text-[12px] font-medium">Log out</span>
          </div>
        </div>
      </aside>
    </>
  );
}
