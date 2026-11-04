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
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full z-50 w-[240px]
          bg-[var(--sidebar-bg)] flex flex-col
          border-r border-[rgba(6,182,212,0.12)]
          transition-transform duration-300 ease-out
          lg:static lg:translate-x-0 lg:z-auto
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Brand */}
        <div className="px-5 pt-6 pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-[10px] bg-gradient-to-br from-cyan-400 via-cyan-500 to-indigo-500 flex items-center justify-center shadow-lg shadow-cyan-900/30">
                <Warehouse size={18} strokeWidth={2} className="text-white" />
              </div>
              <div>
                <h1 className="text-[15px] font-bold leading-tight text-white">
                  Stock
                </h1>
                <h1 className="text-[15px] font-bold leading-tight bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">
                  Manager
                </h1>
              </div>
            </div>

            {/* Close button (mobile) */}
            <button
              onClick={onClose}
              className="lg:hidden w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 transition"
            >
              <X size={18} />
            </button>
          </div>

          {/* Divider */}
          <div className="mt-5 h-px w-full bg-gradient-to-r from-cyan-400/40 via-slate-600/30 to-transparent" />
        </div>

        {/* Navigation */}
        <div className="px-3 pt-5 flex-1">
          <p className="px-3 mb-3 text-[10px] font-bold tracking-[0.2em] text-indigo-300/70 uppercase">
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
                    `group relative flex items-center gap-3 px-3 py-2.5 rounded-[var(--radius-md)] transition-all duration-200 ${
                      isActive
                        ? "bg-gradient-to-r from-cyan-400 via-cyan-500 to-blue-500 text-[#061525] shadow-md shadow-cyan-900/20"
                        : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {isActive && (
                        <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-full bg-cyan-300 shadow-[0_0_8px_rgba(34,211,238,0.6)]" />
                      )}

                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                          isActive
                            ? "bg-white/10"
                            : "bg-indigo-500/10 group-hover:bg-cyan-400/10"
                        }`}
                      >
                        <Icon
                          size={16}
                          strokeWidth={2}
                          className={
                            isActive
                              ? "text-[#082238]"
                              : "text-indigo-300 group-hover:text-cyan-300"
                          }
                        />
                      </div>

                      <span className="text-[13px] font-semibold">
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
        <div className="px-3 pb-5">
          <div className="h-px w-full bg-[var(--border-default)] mb-3" />
          <div className="flex items-center gap-3 px-3 py-2 rounded-[var(--radius-md)] text-slate-500 hover:text-slate-300 hover:bg-slate-800/50 transition cursor-pointer">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-slate-800/50">
              <Settings size={15} className="text-slate-500" />
            </div>
            <span className="text-[12px] font-medium">Settings</span>
          </div>
        </div>
      </aside>
    </>
  );
}
