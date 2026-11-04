import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, Search, Bell } from "lucide-react";

const pageDetails = {
  "/dashboard": { title: "Dashboard", subtitle: "Overview of your inventory" },
  "/categories": { title: "Categories", subtitle: "Organize your product categories" },
  "/products": { title: "Products", subtitle: "Manage your inventory and stock" },
};

export default function Navbar({ onMenuClick }) {
  const location = useLocation();
  const currentPage = pageDetails[location.pathname] || {
    title: "Inventory System",
    subtitle: "Manage your inventory efficiently",
  };

  return (
    <header className="relative z-20">
      <div
        className="mx-3 mt-3 sm:mx-4 sm:mt-4 rounded-[var(--radius-lg)] flex items-center px-4 sm:px-6 h-[56px] gap-4"
        style={{
          background: "rgba(10, 14, 35, 0.55)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: "1px solid var(--glass-border)",
          boxShadow: "var(--shadow-float), inset 0 1px 0 rgba(255,255,255,0.04)",
        }}
      >
        {/* Hamburger */}
        <button
          onClick={onMenuClick}
          className="lg:hidden w-9 h-9 rounded-xl flex items-center justify-center text-[var(--text-muted)] hover:text-white hover:bg-[var(--glass-bg)] transition-all"
        >
          <Menu size={18} />
        </button>

        {/* Page info */}
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
            className="flex-1 min-w-0"
          >
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-[9px] uppercase tracking-[0.18em] font-bold text-[var(--text-muted)]">
                Inventory
              </span>
              <span className="text-[var(--text-muted)] text-[8px] opacity-40">/</span>
              <span className="text-[9px] uppercase tracking-[0.18em] font-bold text-[var(--accent)]">
                {currentPage.title}
              </span>
            </div>
            <div className="flex items-baseline gap-3">
              <h1 className="text-sm font-bold tracking-tight text-white">
                {currentPage.title}
              </h1>
              <span className="hidden sm:inline-block text-[11px] text-[var(--text-muted)]">
                {currentPage.subtitle}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {/* Search pill */}
          <div
            className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 w-44 text-[var(--text-muted)] text-xs rounded-[var(--radius-pill)] cursor-pointer hover:border-[var(--glass-border-hover)] transition-all"
            style={{
              background: "var(--glass-bg)",
              border: "1px solid var(--glass-border)",
            }}
          >
            <Search size={13} />
            <span>Search...</span>
          </div>

          {/* Bell */}
          <button
            className="relative w-9 h-9 rounded-xl flex items-center justify-center text-[var(--text-muted)] hover:text-white hover:bg-[var(--glass-bg)] transition-all"
          >
            <Bell size={16} />
            <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-[var(--danger)] shadow-[0_0_6px_var(--danger-glow)]" />
          </button>

          {/* Avatar */}
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center text-[10px] font-bold text-white cursor-pointer"
            style={{
              background: "linear-gradient(135deg, var(--accent), #6c5ce7)",
              boxShadow: "0 2px 8px rgba(79,142,255,0.2), inset 0 1px 0 rgba(255,255,255,0.12)",
            }}
          >
            SM
          </div>
        </div>
      </div>
    </header>
  );
}
