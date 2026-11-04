import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Tags,
  Package,
  Warehouse,
  Settings,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { name: "Categories", path: "/categories", icon: Tags },
  { name: "Products", path: "/products", icon: Package },
];

export default function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {/* Mobile backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-[rgba(5,8,22,0.6)] backdrop-blur-sm z-40 lg:hidden"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      {/* Sidebar panel */}
      <aside
        className={`
          fixed top-0 left-0 h-full z-50
          w-[var(--sidebar-width)] flex flex-col
          transition-transform duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]
          lg:static lg:translate-x-0 lg:z-auto
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
        style={{
          background: "rgba(8, 12, 30, 0.75)",
          backdropFilter: "blur(40px)",
          WebkitBackdropFilter: "blur(40px)",
          borderRight: "1px solid var(--glass-border)",
        }}
      >
        {/* Top shine */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />

        {/* Brand */}
        <div className="px-6 pt-7 pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3.5">
              {/* Spatial logo */}
              <div className="relative group">
                <div className="absolute inset-0 bg-[var(--accent)] rounded-2xl blur-xl opacity-25 group-hover:opacity-40 transition-opacity" />
                <div
                  className="relative w-11 h-11 rounded-2xl flex items-center justify-center"
                  style={{
                    background: "linear-gradient(135deg, var(--accent), #6c5ce7)",
                    boxShadow: "0 4px 16px rgba(79,142,255,0.25), inset 0 1px 0 rgba(255,255,255,0.15)",
                  }}
                >
                  <Warehouse size={20} strokeWidth={2} className="text-white" />
                </div>
              </div>

              <div>
                <h1 className="text-base font-bold leading-tight text-white">
                  Stock
                </h1>
                <h1 className="text-base font-bold leading-tight bg-gradient-to-r from-[var(--cyan)] to-[var(--accent)] bg-clip-text text-transparent">
                  Manager
                </h1>
              </div>
            </div>

            <button
              onClick={onClose}
              className="lg:hidden w-8 h-8 rounded-xl glass flex items-center justify-center text-[var(--text-muted)] hover:text-white transition"
            >
              <X size={16} />
            </button>
          </div>

          {/* Divider */}
          <div className="mt-6 h-px w-full bg-gradient-to-r from-[var(--accent)]/20 via-white/[0.05] to-transparent" />
        </div>

        {/* Navigation */}
        <div className="px-4 pt-6 flex-1">
          <p className="px-3 mb-4 text-[10px] font-bold tracking-[0.22em] text-[var(--text-muted)] uppercase">
            Workspace
          </p>

          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `group relative flex items-center gap-3.5 px-4 py-3 rounded-[var(--radius-md)] transition-all duration-300 ${
                      isActive
                        ? "text-white"
                        : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                    }`
                  }
                  style={({ isActive }) =>
                    isActive
                      ? {
                          background: "linear-gradient(135deg, rgba(79,142,255,0.18), rgba(108,92,231,0.12))",
                          border: "1px solid rgba(79,142,255,0.2)",
                          boxShadow: "0 4px 16px rgba(79,142,255,0.1), inset 0 1px 0 rgba(255,255,255,0.06)",
                        }
                      : {
                          background: "transparent",
                          border: "1px solid transparent",
                        }
                  }
                >
                  {({ isActive }) => (
                    <>
                      {/* Active glow indicator */}
                      {isActive && (
                        <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-[3px] h-6 rounded-full bg-[var(--accent)] shadow-[0_0_12px_var(--accent-glow)]" />
                      )}

                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 ${
                          isActive
                            ? ""
                            : "group-hover:bg-[var(--glass-bg)]"
                        }`}
                        style={
                          isActive
                            ? {
                                background: "rgba(79,142,255,0.15)",
                                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05)",
                              }
                            : {}
                        }
                      >
                        <Icon
                          size={17}
                          strokeWidth={2}
                          className={`transition-all duration-300 ${
                            isActive
                              ? "text-[var(--accent)]"
                              : "text-[var(--text-muted)] group-hover:text-[var(--cyan)]"
                          }`}
                        />
                      </div>

                      <span className="text-[13px] font-semibold tracking-[-0.01em]">
                        {item.name}
                      </span>
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Footer */}
        <div className="px-4 pb-6">
          <div className="h-px w-full bg-[var(--glass-border)] mb-3" />
          <div className="flex items-center gap-3 px-4 py-2.5 rounded-[var(--radius-md)] text-[var(--text-muted)] hover:text-[var(--text-secondary)] hover:bg-[var(--glass-bg)] transition-all cursor-pointer">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-[var(--glass-bg)]">
              <Settings size={14} />
            </div>
            <span className="text-xs font-medium">Settings</span>
          </div>
        </div>
      </aside>
    </>
  );
}
