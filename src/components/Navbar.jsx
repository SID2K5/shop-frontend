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
    <header
      className="h-[56px] flex items-center px-4 sm:px-6 gap-4 border-b"
      style={{
        background: "var(--bg-card)",
        borderColor: "var(--border)",
      }}
    >
      {/* Hamburger */}
      <button
        onClick={onMenuClick}
        className="lg:hidden w-9 h-9 rounded-lg flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] transition"
      >
        <Menu size={18} />
      </button>

      {/* Page info */}
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.15 }}
          className="flex-1 min-w-0"
        >
          <h1 className="text-sm font-semibold text-[var(--text-primary)]">
            {currentPage.title}
          </h1>
          <p className="hidden sm:block text-[11px] text-[var(--text-muted)]">
            {currentPage.subtitle}
          </p>
        </motion.div>
      </AnimatePresence>

      {/* Right side */}
      <div className="flex items-center gap-2">
        {/* Search */}
        <div
          className="hidden sm:flex items-center gap-2 px-3 py-1.5 w-44 text-[var(--text-muted)] text-xs rounded-[var(--radius-sm)] cursor-pointer hover:border-[var(--border-hover)] transition"
          style={{
            background: "var(--bg-secondary)",
            border: "1px solid var(--border)",
          }}
        >
          <Search size={13} />
          <span>Search...</span>
        </div>

        {/* Notifications */}
        <button className="relative w-9 h-9 rounded-lg flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] transition">
          <Bell size={16} />
          <span
            className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full"
            style={{ background: "var(--danger)" }}
          />
        </button>

        {/* Avatar */}
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-bold text-white cursor-pointer"
          style={{ background: "var(--primary)" }}
        >
          SM
        </div>
      </div>
    </header>
  );
}
