import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

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

export default function Navbar() {
  const location = useLocation();

  const currentPage =
    pageDetails[location.pathname] || {
      title: "Inventory System",
      subtitle: "Manage your inventory efficiently",
    };

  return (
    <header className="relative h-[76px] bg-[#111827]/75 backdrop-blur-xl border-b border-white/[0.06] flex items-center px-8 overflow-hidden">
      
      {/* SUBTLE BACKGROUND GLOW */}
      <div className="absolute top-0 left-1/3 w-96 h-32 bg-cyan-500/5 blur-[90px] pointer-events-none" />

      {/* CONTENT */}
      <div className="relative z-10 flex items-center w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{
              opacity: 0,
              y: 8,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -8,
            }}
            transition={{
              duration: 0.25,
              ease: "easeOut",
            }}
          >
            {/* BREADCRUMB */}
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] uppercase tracking-[0.18em] font-semibold text-slate-500">
                Inventory System
              </span>

              <span className="text-slate-700 text-xs">/</span>

              <span className="text-[11px] uppercase tracking-[0.18em] font-semibold text-cyan-400">
                {currentPage.title}
              </span>
            </div>

            {/* PAGE TITLE */}
            <div className="flex items-baseline gap-3">
              <h1 className="text-xl font-bold tracking-tight text-white">
                {currentPage.title}
              </h1>

              <span className="hidden sm:inline-block text-sm text-slate-500">
                {currentPage.subtitle}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* BOTTOM CYAN ACCENT */}
      <motion.div
        className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
        initial={{ width: "20%", opacity: 0.4 }}
        animate={{
          width: ["20%", "45%", "20%"],
          opacity: [0.35, 0.8, 0.35],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* SUBTLE RIGHT GLOW */}
      <div className="absolute bottom-0 right-10 w-32 h-[2px] bg-cyan-400/30 blur-md" />
    </header>
  );
}