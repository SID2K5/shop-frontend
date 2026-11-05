import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Tags,
  Package,
  Warehouse,
  Settings,
  LogOut,
  X,
  ChevronRight,
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
            ? "linear-gradient(180deg, #0A1218 0%, var(--sidebar-bg) 100%)"
            : "linear-gradient(180deg, #1E2F3D 0%, var(--sidebar-bg) 100%)",
        }}
      >
        {/* Brand */}
        <div className="px-5 pt-6 pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, var(--primary), var(--steel-blue))",
                  boxShadow: "0 4px 12px rgba(73, 109, 131, 0.35)",
                }}
              >
                <Warehouse size={20} strokeWidth={2} className="text-white" />
              </div>
              <div>
                <h1 className="text-[15px] font-bold leading-tight text-white tracking-[-0.01em]">
                  StockManager
                </h1>
                <p className="text-[10px] text-[var(--steel-blue)] font-medium">Inventory Platform</p>
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

        {/* Navigation label */}
        <div className="px-5 pt-5 pb-2">
          <p className="text-[9px] font-bold tracking-[0.2em] text-[var(--steel-blue)]/60 uppercase">
            Main Menu
          </p>
        </div>

        {/* Navigation */}
        <div className="px-3 flex-1">
          <nav className="space-y-0.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `group relative flex items-center gap-3 px-3 py-2.5 rounded-[var(--radius-md)] transition-all duration-200 ${
                      isActive
                        ? "text-white"
                        : "text-[var(--steel-blue)] hover:text-[var(--powder-blue)] hover:bg-white/[0.05]"
                    }`
                  }
                  style={({ isActive }) =>
                    isActive
                      ? {
                          background: "linear-gradient(90deg, var(--sidebar-active), rgba(64, 93, 112, 0.5))",
                          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                        }
                      : {}
                  }
                >
                  {({ isActive }) => (
                    <>
                      {isActive && (
                        <div
                          className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full"
                          style={{ background: "var(--powder-blue)" }}
                        />
                      )}

                      <Icon
                        size={17}
                        strokeWidth={2}
                        className={`transition-colors ${
                          isActive
                            ? "text-[var(--powder-blue)]"
                            : "text-[var(--steel-blue)] group-hover:text-[var(--powder-blue)]"
                        }`}
                      />
                      <span className="text-[13px] font-medium flex-1">{item.name}</span>
                      {isActive && (
                        <ChevronRight size={14} className="text-[var(--steel-blue)] opacity-50" />
                      )}
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Footer */}
        <div className="px-3 pb-4">
          <div className="h-px w-full bg-white/[0.06] mb-3" />

          <div
            className="mx-2 mb-3 p-3 rounded-[var(--radius-md)]"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
          >
            <p className="text-[10px] text-[var(--steel-blue)] font-medium mb-2">System Status</p>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] text-[var(--powder-blue)]">All systems operational</span>
            </div>
          </div>

          <div className="flex items-center gap-3 px-3 py-2 rounded-[var(--radius-md)] text-[var(--steel-blue)] hover:text-[var(--powder-blue)] hover:bg-white/[0.05] transition-all cursor-pointer">
            <Settings size={15} />
            <span className="text-[12px] font-medium">Settings</span>
          </div>
          <div className="flex items-center gap-3 px-3 py-2 rounded-[var(--radius-md)] text-[var(--steel-blue)] hover:text-red-300 hover:bg-red-500/[0.06] transition-all cursor-pointer">
            <LogOut size={15} />
            <span className="text-[12px] font-medium">Log out</span>
          </div>
        </div>
      </aside>
    </>
  );
}
