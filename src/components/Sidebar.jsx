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
        style={{ background: "var(--sidebar-bg)" }}
      >
        {/* Brand */}
        <div className="px-5 pt-6 pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: "var(--sidebar-active)" }}
              >
                <Warehouse size={20} strokeWidth={2} className="text-[var(--powder-blue)]" />
              </div>
              <div>
                <h1 className="text-sm font-bold leading-tight text-white">Stock</h1>
                <h1 className="text-sm font-bold leading-tight text-[var(--powder-blue)]">Manager</h1>
              </div>
            </div>

            <button
              onClick={onClose}
              className="lg:hidden w-8 h-8 rounded-lg flex items-center justify-center text-[var(--steel-blue)] hover:text-white hover:bg-[var(--sidebar-hover)] transition"
            >
              <X size={16} />
            </button>
          </div>

          <div className="mt-5 h-px w-full bg-white/10" />
        </div>

        {/* Navigation */}
        <div className="px-3 pt-5 flex-1">
          <p className="px-3 mb-3 text-[10px] font-semibold tracking-[0.15em] text-[var(--steel-blue)] uppercase">
            Workspace
          </p>

          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `group flex items-center gap-3 px-3 py-2.5 rounded-[var(--radius-md)] transition-all duration-200 ${
                      isActive
                        ? "text-white"
                        : "text-[var(--steel-blue)] hover:text-[var(--powder-blue)] hover:bg-[var(--sidebar-hover)]"
                    }`
                  }
                  style={({ isActive }) =>
                    isActive ? { background: "var(--sidebar-active)" } : {}
                  }
                >
                  {({ isActive }) => (
                    <>
                      <Icon
                        size={18}
                        strokeWidth={2}
                        className={isActive ? "text-[var(--powder-blue)]" : "text-[var(--steel-blue)] group-hover:text-[var(--powder-blue)]"}
                      />
                      <span className="text-[13px] font-medium">{item.name}</span>
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Footer */}
        <div className="px-3 pb-5">
          <div className="h-px w-full bg-white/10 mb-3" />
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-[var(--radius-md)] text-[var(--steel-blue)] hover:text-[var(--powder-blue)] hover:bg-[var(--sidebar-hover)] transition-all cursor-pointer">
            <Settings size={16} />
            <span className="text-[13px] font-medium">Settings</span>
          </div>
        </div>
      </aside>
    </>
  );
}
