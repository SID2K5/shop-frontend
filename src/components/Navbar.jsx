import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, Search, Bell, ChevronRight, Sun, HelpCircle } from "lucide-react";

const pageDetails = {
  "/dashboard": { title: "Dashboard", subtitle: "Overview of your inventory", breadcrumb: "Home" },
  "/categories": { title: "Categories", subtitle: "Organize your product categories", breadcrumb: "Inventory" },
  "/products": { title: "Products", subtitle: "Manage your inventory and stock", breadcrumb: "Inventory" },
};

export default function Navbar({ onMenuClick }) {
  const location = useLocation();
  const currentPage = pageDetails[location.pathname] || {
    title: "Inventory System",
    subtitle: "Manage your inventory efficiently",
    breadcrumb: "Home",
  };

  return (
    <header
      className="flex items-center px-4 sm:px-6 gap-4 border-b relative"
      style={{
        background: "var(--bg-card)",
        borderColor: "var(--border)",
        height: 64,
      }}
    >
      {/* Subtle top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{ background: "linear-gradient(90deg, var(--primary), var(--steel-blue), var(--powder-blue), transparent)" }}
      />

      {/* Hamburger */}
      <button
        onClick={onMenuClick}
        className="lg:hidden w-9 h-9 rounded-lg flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] transition"
      >
        <Menu size={18} />
      </button>

      {/* Page info with breadcrumb */}
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 8 }}
          transition={{ duration: 0.2 }}
          className="flex-1 min-w-0"
        >
          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5 mb-0.5">
            <span className="text-[10px] font-medium text-[var(--text-muted)]">
              {currentPage.breadcrumb}
            </span>
            <ChevronRight size={10} className="text-[var(--text-muted)] opacity-50" />
            <span className="text-[10px] font-semibold text-[var(--primary)]">
              {currentPage.title}
            </span>
          </div>
          <div className="flex items-baseline gap-3">
            <h1 className="text-[15px] font-bold text-[var(--text-primary)] tracking-[-0.01em]">
              {currentPage.title}
            </h1>
            <span className="hidden md:inline-block text-[11px] text-[var(--text-muted)]">
              {currentPage.subtitle}
            </span>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Right side actions */}
      <div className="flex items-center gap-1.5">
        {/* Search bar */}
        <div
          className="hidden sm:flex items-center gap-2.5 px-3 py-[7px] w-52 text-[var(--text-muted)] text-xs rounded-[var(--radius-md)] cursor-pointer group transition-all hover:shadow-sm"
          style={{
            background: "var(--bg-main)",
            border: "1px solid var(--border)",
          }}
        >
          <Search size={14} className="opacity-50 group-hover:opacity-80 transition-opacity" />
          <span className="flex-1">Search...</span>
          <kbd
            className="hidden lg:inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-medium"
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
              color: "var(--text-muted)",
              boxShadow: "0 1px 0 var(--border)",
            }}
          >
            ⌘K
          </kbd>
        </div>

        {/* Divider */}
        <div className="hidden sm:block w-px h-6 mx-1" style={{ background: "var(--border)" }} />

        {/* Theme toggle */}
        <button
          className="w-8 h-8 rounded-lg flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] transition"
          title="Toggle theme"
        >
          <Sun size={15} />
        </button>

        {/* Help */}
        <button
          className="hidden sm:flex w-8 h-8 rounded-lg items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] transition"
          title="Help"
        >
          <HelpCircle size={15} />
        </button>

        {/* Notifications */}
        <button className="relative w-8 h-8 rounded-lg flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] transition">
          <Bell size={15} />
          <span
            className="absolute top-1 right-1 w-[7px] h-[7px] rounded-full ring-2 ring-white"
            style={{ background: "var(--danger)" }}
          />
        </button>

        {/* Divider */}
        <div className="w-px h-6 mx-1" style={{ background: "var(--border)" }} />

        {/* User profile */}
        <div className="flex items-center gap-2.5 pl-1 cursor-pointer group">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold text-white transition-shadow group-hover:shadow-md"
            style={{
              background: "linear-gradient(135deg, var(--primary), var(--steel-blue))",
            }}
          >
            SM
          </div>
          <div className="hidden md:block">
            <p className="text-[12px] font-semibold text-[var(--text-primary)] leading-tight">Stock Manager</p>
            <p className="text-[10px] text-[var(--text-muted)] leading-tight">Admin</p>
          </div>
        </div>
      </div>
    </header>
  );
}
