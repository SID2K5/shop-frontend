import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Tags,
  Package,
  Warehouse,
  ChevronRight,
} from "lucide-react";

const Sidebar = () => {
  const navItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Categories",
      path: "/categories",
      icon: Tags,
    },
    {
      name: "Products",
      path: "/products",
      icon: Package,
    },
  ];

  return (
    <aside className="relative w-[400px] min-h-screen bg-[#0b1728] flex flex-col overflow-hidden flex-shrink-0">
      {/* ================= BACKGROUND EFFECTS ================= */}

      <div className="absolute inset-0 bg-gradient-to-b from-[#132238] via-[#0b1728] to-[#081322] pointer-events-none" />

      <div className="absolute top-0 left-0 w-full h-[300px] bg-cyan-500/5 blur-[100px] pointer-events-none" />

      {/* ================= CONTENT ================= */}

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* ================= BRAND ================= */}

        <div className="px-10 pt-14">
          <div className="flex items-center gap-7">
            {/* LOGO */}

            <div className="relative group">
              <div className="absolute inset-0 bg-cyan-400/30 blur-2xl rounded-[28px] group-hover:bg-cyan-400/50 transition-all duration-500" />

              <div className="relative w-[80px] h-[80px] rounded-[25px] bg-gradient-to-br from-cyan-400 via-cyan-500 to-indigo-500 flex items-center justify-center shadow-2xl shadow-cyan-900/40 border border-white/10 transition-transform duration-300 group-hover:scale-105">
                <Warehouse
                  size={38}
                  strokeWidth={1.8}
                  className="text-white"
                />
              </div>
            </div>

            {/* BRAND NAME */}

            <div>
              <h1 className="text-[31px] font-bold leading-[1.05] tracking-tight text-white">
                Stock
              </h1>

              <h1 className="text-[31px] font-bold leading-[1.15] tracking-tight bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">
                Manager
              </h1>
            </div>
          </div>

          {/* SUBTITLE */}

          <div className="flex items-center gap-4 mt-11">
            <div className="relative">
              <div className="absolute inset-0 bg-cyan-400 blur-md opacity-60 rounded-full" />

              <div className="relative w-4 h-4 rounded-full bg-cyan-400" />
            </div>

            <p className="text-[14px] font-semibold tracking-[0.38em] text-slate-400 uppercase">
              Inventory System
            </p>
          </div>

          {/* DIVIDER */}

          <div className="mt-14 h-px w-full bg-gradient-to-r from-cyan-400/50 via-slate-600/40 to-transparent" />
        </div>

        {/* ================= NAVIGATION ================= */}

        <div className="px-8 pt-14">
          <p className="px-3 mb-9 text-[14px] font-bold tracking-[0.32em] text-indigo-300/80 uppercase">
            Workspace
          </p>

          <nav className="space-y-6">
            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `group relative flex items-center gap-7 min-h-[120px] px-8 rounded-[28px] transition-all duration-300 ease-out ${
                      isActive
                        ? "bg-gradient-to-r from-cyan-400 via-cyan-500 to-blue-500 text-[#061525] shadow-[0_15px_40px_rgba(34,211,238,0.18)] border border-cyan-300/40"
                        : "bg-slate-800/40 backdrop-blur-xl text-slate-300 border border-slate-600/50 hover:border-cyan-400/40 hover:bg-slate-800/70 hover:-translate-y-1 hover:shadow-[0_12px_35px_rgba(0,0,0,0.25)]"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {/* ACTIVE LEFT INDICATOR */}

                      {isActive && (
                        <>
                          <div className="absolute -left-5 w-2.5 h-20 rounded-full bg-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.9)]" />

                          <div className="absolute -left-8 w-10 h-28 bg-cyan-400/20 blur-xl" />
                        </>
                      )}

                      {/* ICON BOX */}

                      <div
                        className={`w-[62px] h-[62px] rounded-[19px] flex items-center justify-center transition-all duration-300 ${
                          isActive
                            ? "bg-white/10 border border-white/20 shadow-inner"
                            : "bg-indigo-500/10 border border-indigo-400/30 group-hover:bg-cyan-400/10 group-hover:border-cyan-400/30"
                        }`}
                      >
                        <Icon
                          size={28}
                          strokeWidth={1.9}
                          className={`transition-transform duration-300 group-hover:scale-110 ${
                            isActive
                              ? "text-[#082238]"
                              : "text-indigo-300 group-hover:text-cyan-300"
                          }`}
                        />
                      </div>

                      {/* TEXT */}

                      <span className="text-[22px] font-semibold tracking-tight">
                        {item.name}
                      </span>

                      {/* ARROW */}

                      <ChevronRight
                        size={32}
                        strokeWidth={2}
                        className={`ml-auto transition-all duration-300 group-hover:translate-x-2 ${
                          isActive ? "text-[#082238]" : "text-slate-400"
                        }`}
                      />
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Empty flexible space */}
        <div className="flex-1" />
      </div>

      {/* ================= PREMIUM RIGHT SIDE GLOW ================= */}

      {/* Thin bright core */}
      <div className="absolute top-0 right-0 h-full w-px bg-gradient-to-b from-transparent via-cyan-300/90 to-transparent z-30" />

      {/* Inner glow */}
      <div className="absolute top-0 right-0 h-full w-[3px] bg-cyan-400/30 blur-[3px] pointer-events-none z-20" />

      {/* Outer cyan glow */}
      <div className="absolute top-0 -right-2 h-full w-4 bg-cyan-400/20 blur-xl pointer-events-none z-10" />

      {/* Large soft blue glow */}
      <div className="absolute top-0 -right-8 h-full w-16 bg-blue-500/10 blur-3xl pointer-events-none z-0" />
    </aside>
  );
};

export default Sidebar;