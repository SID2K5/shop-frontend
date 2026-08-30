import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Tags,
  Package,
  Warehouse,
  ChevronRight,
  TrendingUp,
  BarChart3,
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
    <aside
      className="
        relative
        w-[430px]
        min-h-screen
        overflow-hidden
        flex
        flex-col
        bg-[#071226]
        border-r
        border-indigo-500/30
        shadow-[20px_0_60px_rgba(0,0,0,0.35)]
      "
    >
      {/* ================= BACKGROUND EFFECTS ================= */}

      <div className="pointer-events-none absolute inset-0">
        {/* Cyan Glow */}
        <div className="absolute -top-40 -left-40 w-[400px] h-[400px] rounded-full bg-cyan-500/10 blur-[120px]" />

        {/* Purple Glow */}
        <div className="absolute bottom-0 -right-40 w-[400px] h-[400px] rounded-full bg-indigo-600/15 blur-[130px]" />

        {/* Subtle Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1830] via-[#071226] to-[#09142a]" />
      </div>

      {/* ================= CONTENT ================= */}

      <div className="relative z-10 flex flex-col min-h-screen">
        
        {/* ================= BRAND ================= */}

        <div className="px-9 pt-12">
          <div className="flex items-center gap-6">
            
            {/* Logo */}

            <div
              className="
                relative
                w-[82px]
                h-[82px]
                rounded-[22px]
                flex
                items-center
                justify-center
                bg-gradient-to-br
                from-cyan-400
                via-cyan-500
                to-indigo-600
                border
                border-cyan-300/30
                shadow-[0_15px_45px_rgba(34,211,238,0.25)]
              "
            >
              <div className="absolute inset-[1px] rounded-[21px] bg-white/[0.05]" />

              <Warehouse
                size={38}
                strokeWidth={1.8}
                className="relative text-white"
              />
            </div>

            {/* Brand Text */}

            <div>
              <h1 className="text-[34px] leading-[1.05] font-bold tracking-tight text-white">
                Stock
              </h1>

              <h1
                className="
                  mt-1
                  text-[34px]
                  leading-[1.05]
                  font-bold
                  tracking-tight
                  bg-gradient-to-r
                  from-cyan-300
                  to-cyan-500
                  bg-clip-text
                  text-transparent
                "
              >
                Manager
              </h1>
            </div>
          </div>

          {/* Subtitle */}

          <div className="flex items-center gap-4 mt-9">
            <div className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full rounded-full bg-cyan-400/40 animate-ping" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.8)]" />
            </div>

            <span className="text-[15px] font-medium tracking-[0.28em] text-slate-400 uppercase">
              Inventory System
            </span>
          </div>

          {/* Decorative line */}

          <div className="relative mt-12 h-px overflow-hidden bg-slate-700/60">
            <div className="absolute left-0 top-0 h-px w-[65%] bg-gradient-to-r from-cyan-400/50 via-indigo-500/30 to-transparent" />
          </div>
        </div>

        {/* ================= NAVIGATION ================= */}

        <div className="px-7 pt-12">
          <p className="mb-8 px-2 text-[15px] font-semibold tracking-[0.22em] text-indigo-300/80 uppercase">
            Workspace
          </p>

          <nav className="space-y-5">
            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `
                      group
                      relative
                      flex
                      items-center
                      gap-6
                      w-full
                      px-7
                      py-6
                      rounded-[22px]
                      border
                      transition-all
                      duration-300
                      ease-out
                      ${
                        isActive
                          ? `
                            bg-gradient-to-r
                            from-cyan-400
                            via-cyan-500
                            to-[#2588c8]
                            border-cyan-300/50
                            text-[#071426]
                            shadow-[0_12px_40px_rgba(34,211,238,0.25)]
                            scale-[1.01]
                          `
                          : `
                            bg-white/[0.025]
                            border-slate-600/40
                            text-slate-300
                            hover:bg-white/[0.055]
                            hover:border-indigo-400/40
                            hover:shadow-[0_10px_35px_rgba(0,0,0,0.2)]
                            hover:-translate-y-1
                          `
                      }
                    `
                  }
                >
                  {({ isActive }) => (
                    <>
                      {/* Active glow bar */}

                      {isActive && (
                        <span
                          className="
                            absolute
                            -left-4
                            top-1/2
                            -translate-y-1/2
                            w-[7px]
                            h-[72px]
                            rounded-full
                            bg-cyan-300
                            shadow-[0_0_25px_rgba(34,211,238,1)]
                          "
                        />
                      )}

                      {/* Icon Box */}

                      <div
                        className={`
                          flex
                          items-center
                          justify-center
                          w-[62px]
                          h-[62px]
                          rounded-[18px]
                          border
                          transition-all
                          duration-300
                          ${
                            isActive
                              ? `
                                bg-white/10
                                border-white/20
                                shadow-inner
                              `
                              : `
                                bg-indigo-500/[0.08]
                                border-indigo-400/25
                                group-hover:bg-indigo-500/[0.14]
                                group-hover:scale-105
                              `
                          }
                        `}
                      >
                        <Icon
                          size={30}
                          strokeWidth={1.8}
                          className={`
                            transition-all
                            duration-300
                            ${
                              isActive
                                ? "text-[#071426]"
                                : "text-indigo-300 group-hover:text-cyan-300"
                            }
                          `}
                        />
                      </div>

                      {/* Text */}

                      <span
                        className={`
                          text-[25px]
                          font-semibold
                          tracking-tight
                          ${
                            isActive
                              ? "text-[#071426]"
                              : "text-slate-200"
                          }
                        `}
                      >
                        {item.name}
                      </span>

                      {/* Arrow */}

                      <ChevronRight
                        size={32}
                        strokeWidth={2}
                        className={`
                          ml-auto
                          transition-all
                          duration-300
                          ${
                            isActive
                              ? "text-[#071426] translate-x-0"
                              : `
                                text-slate-400
                                group-hover:text-cyan-300
                                group-hover:translate-x-1
                              `
                          }
                        `}
                      />
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* ================= SPACER ================= */}

        <div className="flex-1" />

        {/* ================= SYSTEM STATUS ================= */}

        <div className="px-7 pb-10">
          <div
            className="
              relative
              overflow-hidden
              rounded-[24px]
              border
              border-indigo-400/40
              bg-gradient-to-br
              from-[#10253b]/90
              via-[#0d1b32]/90
              to-[#191638]/90
              p-8
              shadow-[0_20px_60px_rgba(0,0,0,0.3)]
              backdrop-blur-xl
            "
          >
            {/* Background glow */}

            <div className="pointer-events-none absolute -right-20 -top-20 w-48 h-48 rounded-full bg-purple-500/10 blur-[70px]" />

            {/* Top section */}

            <div className="relative flex items-center gap-6">
              
              {/* Status Icon */}

              <div
                className="
                  flex
                  items-center
                  justify-center
                  w-[78px]
                  h-[78px]
                  rounded-full
                  border
                  border-cyan-400/30
                  bg-cyan-500/[0.05]
                  shadow-[0_0_30px_rgba(34,211,238,0.08)]
                "
              >
                <TrendingUp
                  size={34}
                  strokeWidth={1.8}
                  className="text-cyan-300"
                />
              </div>

              {/* Text */}

              <div>
                <h3 className="text-[24px] font-semibold text-white">
                  System Ready
                </h3>

                <p className="mt-2 text-[17px] text-slate-400">
                  Manage inventory
                </p>
              </div>

              {/* Decorative dots */}

              <div className="ml-auto grid grid-cols-3 gap-3">
                {[...Array(9)].map((_, index) => (
                  <span
                    key={index}
                    className="w-1.5 h-1.5 rounded-full bg-indigo-400/70"
                  />
                ))}
              </div>
            </div>

            {/* Divider */}

            <div className="relative mt-8 h-px bg-slate-600/40">
              <div className="absolute left-0 top-0 h-px w-2/3 bg-gradient-to-r from-cyan-400/30 to-transparent" />
            </div>

            {/* Bottom Status */}

            <div className="relative flex items-center gap-5 mt-8">
              <div className="relative flex items-center justify-center">
                <span className="absolute w-8 h-8 rounded-full bg-emerald-400/20 animate-ping" />

                <span className="relative w-7 h-7 rounded-full bg-gradient-to-br from-emerald-300 to-cyan-400 shadow-[0_0_25px_rgba(45,212,191,0.45)]" />
              </div>

              <span className="text-[17px] font-medium text-slate-300">
                All systems operational
              </span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;