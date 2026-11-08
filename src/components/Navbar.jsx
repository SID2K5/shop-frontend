import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const pageDetails = {
  "/dashboard": { title: "Dashboard", subtitle: "Overview & analytics" },
  "/categories": { title: "Categories", subtitle: "Manage product categories" },
  "/products": { title: "Products", subtitle: "Inventory & stock management" },
};

export default function Navbar({ onMenuClick }) {
  const location = useLocation();
  const { dark, toggle } = useTheme();
  const currentPage = pageDetails[location.pathname] || {
    title: "StockManager",
    subtitle: "Inventory platform",
  };

  return (
    <header
      className="flex items-center px-5 sm:px-7 lg:px-8 gap-4"
      style={{
        background: "var(--bg-card)",
        borderBottom: "1px solid var(--border)",
        height: 72,
        minHeight: 72,
      }}
    >
      {/* Mobile menu button */}
      <button
        onClick={onMenuClick}
        className="lg:hidden w-10 h-10 rounded-[var(--radius-md)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] transition-colors"
      >
        <Menu size={20} />
      </button>

      {/* Page title + subtitle */}
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 4 }}
          transition={{ duration: 0.2 }}
          className="flex-1 min-w-0"
        >
          <h1 className="text-lg font-bold text-[var(--text-primary)] tracking-[-0.02em] leading-tight">
            {currentPage.title}
          </h1>
          <p className="text-[12px] text-[var(--text-muted)] mt-0.5 hidden sm:block">
            {currentPage.subtitle}
          </p>
        </motion.div>
      </AnimatePresence>

      {/* Right section */}
      <div className="flex items-center gap-2">
        {/* Theme toggle */}
        <button
          onClick={toggle}
          className="w-10 h-10 rounded-[var(--radius-md)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] transition-colors"
          style={{ border: "1px solid var(--border)" }}
          aria-label={dark ? "Light mode" : "Dark mode"}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={dark ? "moon" : "sun"}
              initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
              transition={{ duration: 0.15 }}
              className="flex items-center justify-center"
            >
              {dark ? <Moon size={17} /> : <Sun size={17} />}
            </motion.span>
          </AnimatePresence>
        </button>

        {/* Divider */}
        <div className="w-px h-8 mx-1" style={{ background: "var(--border)" }} />

        {/* User avatar */}
        <div className="flex items-center gap-3 pl-1">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-bold text-white flex-shrink-0"
            style={{
              background: "linear-gradient(135deg, var(--primary), var(--steel-blue))",
              boxShadow: "0 2px 10px rgba(73,109,131,0.3)",
            }}
          >
            A
          </div>
          <div className="hidden sm:block">
            <p className="text-[13px] font-semibold text-[var(--text-primary)] leading-tight">Admin</p>
            <p className="text-[11px] text-[var(--text-muted)] leading-tight">Manager</p>
          </div>
        </div>
      </div>
    </header>
  );
}
