import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const pageDetails = {
  "/dashboard": { title: "Dashboard", subtitle: "Overview & analytics" },
  "/categories": { title: "Categories", subtitle: "Product organization" },
  "/products": { title: "Products", subtitle: "Inventory & stock" },
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
      className="flex items-center px-4 sm:px-6 gap-3"
      style={{
        background: "var(--bg-card)",
        borderBottom: "1px solid var(--border)",
        height: 56,
      }}
    >
      <button
        onClick={onMenuClick}
        className="lg:hidden w-8 h-8 rounded-lg flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] transition-colors"
      >
        <Menu size={17} />
      </button>

      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 4 }}
          transition={{ duration: 0.2 }}
          className="flex-1 min-w-0"
        >
          <h1 className="text-sm font-semibold text-[var(--text-primary)] tracking-[-0.01em]">
            {currentPage.title}
          </h1>
          <p className="text-[10px] text-[var(--text-muted)] hidden sm:block">
            {currentPage.subtitle}
          </p>
        </motion.div>
      </AnimatePresence>

      <div className="flex items-center gap-1.5">
        <button
          onClick={toggle}
          className="w-8 h-8 rounded-lg flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] transition-colors"
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
              {dark ? <Moon size={15} /> : <Sun size={15} />}
            </motion.span>
          </AnimatePresence>
        </button>

        <div className="w-px h-5 mx-1" style={{ background: "var(--border)" }} />

        <div className="flex items-center gap-2 pl-0.5">
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center text-[9px] font-bold text-white"
            style={{ background: "linear-gradient(135deg, var(--primary), var(--steel-blue))" }}
          >
            A
          </div>
          <span className="hidden sm:block text-[11px] font-medium text-[var(--text-secondary)]">
            Admin
          </span>
        </div>
      </div>
    </header>
  );
}
