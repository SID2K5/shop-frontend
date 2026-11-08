import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, Sun, Moon, Search, Bell, ChevronRight } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useState } from "react";

const pageDetails = {
  "/dashboard": { title: "Dashboard", subtitle: "Overview & analytics", breadcrumb: ["Home", "Dashboard"] },
  "/categories": { title: "Categories", subtitle: "Product organization", breadcrumb: ["Home", "Categories"] },
  "/products": { title: "Products", subtitle: "Inventory & stock", breadcrumb: ["Home", "Products"] },
};

export default function Navbar({ onMenuClick }) {
  const location = useLocation();
  const { dark, toggle } = useTheme();
  const [searchFocused, setSearchFocused] = useState(false);
  const currentPage = pageDetails[location.pathname] || {
    title: "StockManager",
    subtitle: "Inventory platform",
    breadcrumb: ["Home"],
  };

  return (
    <header
      className="flex items-center px-4 sm:px-6 lg:px-8 gap-4"
      style={{
        background: "var(--bg-card)",
        borderBottom: "1px solid var(--border)",
        height: 64,
        minHeight: 64,
      }}
    >
      {/* Mobile menu button */}
      <button
        onClick={onMenuClick}
        className="lg:hidden w-9 h-9 rounded-lg flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] transition-colors"
      >
        <Menu size={18} />
      </button>

      {/* Page title + breadcrumb */}
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 4 }}
          transition={{ duration: 0.2 }}
          className="flex-1 min-w-0"
        >
          <div className="hidden sm:flex items-center gap-1.5 mb-0.5">
            {currentPage.breadcrumb.map((crumb, i) => (
              <span key={crumb} className="flex items-center gap-1.5">
                {i > 0 && <ChevronRight size={10} className="text-[var(--text-muted)]" style={{ opacity: 0.5 }} />}
                <span
                  className="text-[10px] font-medium"
                  style={{
                    color: i === currentPage.breadcrumb.length - 1
                      ? "var(--primary)"
                      : "var(--text-muted)",
                  }}
                >
                  {crumb}
                </span>
              </span>
            ))}
          </div>
          <h1 className="text-[15px] font-semibold text-[var(--text-primary)] tracking-[-0.01em] leading-tight">
            {currentPage.title}
          </h1>
        </motion.div>
      </AnimatePresence>

      {/* Search bar — desktop only */}
      <div className="hidden lg:block">
        <div
          className="relative flex items-center transition-all duration-300"
          style={{ width: searchFocused ? 280 : 220 }}
        >
          <Search
            size={14}
            className="absolute left-3 text-[var(--text-muted)] pointer-events-none"
          />
          <input
            type="text"
            placeholder="Search anything..."
            className="w-full py-2 text-[13px]"
            style={{
              paddingLeft: "2.25rem",
              paddingRight: "2.5rem",
              background: "var(--bg-secondary)",
              borderColor: searchFocused ? "var(--primary)" : "var(--border)",
              borderRadius: "var(--radius-pill)",
              fontSize: "12px",
            }}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
          />
          <kbd
            className="absolute right-2.5 hidden xl:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[9px] font-medium pointer-events-none"
            style={{
              background: "var(--bg-card)",
              color: "var(--text-muted)",
              border: "1px solid var(--border)",
            }}
          >
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-1">
        {/* Notification bell */}
        <button
          className="relative w-9 h-9 rounded-lg flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] transition-colors"
          aria-label="Notifications"
        >
          <Bell size={16} />
          <span
            className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full"
            style={{
              background: "var(--danger)",
              boxShadow: "0 0 0 2px var(--bg-card)",
            }}
          />
        </button>

        {/* Theme toggle */}
        <button
          onClick={toggle}
          className="w-9 h-9 rounded-lg flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] transition-colors"
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
              {dark ? <Moon size={16} /> : <Sun size={16} />}
            </motion.span>
          </AnimatePresence>
        </button>

        {/* Divider */}
        <div className="w-px h-6 mx-1.5" style={{ background: "var(--border)" }} />

        {/* User avatar section */}
        <div
          className="flex items-center gap-2.5 pl-1 pr-2.5 py-1.5 rounded-[var(--radius-md)] cursor-pointer hover:bg-[var(--bg-secondary)] transition-colors"
        >
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
            style={{
              background: "linear-gradient(135deg, var(--primary), var(--steel-blue))",
              boxShadow: "0 2px 8px rgba(73, 109, 131, 0.25)",
            }}
          >
            A
          </div>
          <div className="hidden sm:block">
            <p className="text-[12px] font-semibold text-[var(--text-primary)] leading-tight">Admin</p>
            <p className="text-[10px] text-[var(--text-muted)] leading-tight">Manager</p>
          </div>
        </div>
      </div>
    </header>
  );
}
