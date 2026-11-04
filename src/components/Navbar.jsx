import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, Search, Bell } from "lucide-react";

const pageDetails = {
  "/dashboard": {
    title: "Dashboard",
    subtitle: "Overview of your inventory",
  },
  "/categories": {
    title: "Categories",
    subtitle: "Organize your product categories",
  },
  "/products": {
    title: "Products",
    subtitle: "Manage your inventory and stock",
  },
};

export default function Navbar({ onMenuClick }) {
  const location = useLocation();

  const currentPage =
    pageDetails[location.pathname] || {
      title: "Inventory System",
      subtitle: "Manage your inventory efficiently",
    };

  return (
    <header className="relative h-[60px] bg-[var(--bg-surface)]/75 backdrop-blur-xl border-b border-[var(--border-default)] flex items-center px-4 sm:px-6 lg:px-8 gap-4">
      {/* Hamburger (mobile/tablet) */}
      <button
        onClick={onMenuClick}
        className="lg:hidden w-9 h-9 rounded-lg flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-elevated)] transition"
      >
        <Menu size={20} />
      </button>

      {/* Page info */}
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="flex-1 min-w-0"
        >
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-[10px] uppercase tracking-[0.15em] font-semibold text-[var(--text-muted)]">
              Inventory System
            </span>
            <span className="text-[var(--text-muted)] text-[10px]">/</span>
            <span className="text-[10px] uppercase tracking-[0.15em] font-semibold text-[var(--accent)]">
              {currentPage.title}
            </span>
          </div>

          <div className="flex items-baseline gap-3">
            <h1 className="text-base font-bold tracking-tight text-white">
              {currentPage.title}
            </h1>
            <span className="hidden sm:inline-block text-xs text-[var(--text-muted)]">
              {currentPage.subtitle}
            </span>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Right side */}
      <div className="flex items-center gap-2">
        {/* Search */}
        <div className="hidden sm:flex items-center gap-2 bg-[var(--bg-elevated)] border border-[var(--border-default)] rounded-lg px-3 py-1.5 w-44 text-[var(--text-muted)] text-xs">
          <Search size={14} />
          <span>Search...</span>
        </div>

        {/* Notification bell */}
        <button className="relative w-9 h-9 rounded-lg flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-elevated)] transition">
          <Bell size={17} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[var(--danger)]" />
        </button>

        {/* Avatar */}
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-indigo-500 flex items-center justify-center text-[10px] font-bold text-white shadow-md">
          SM
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--accent)]/30 to-transparent" />
    </header>
  );
}
