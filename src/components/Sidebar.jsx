import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Tags,
  Package,
  Boxes,
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
    <aside className="w-44 min-h-screen bg-[#222a3d] flex flex-col border-r border-[#30394d]">
      
      {/* ================= BRAND ================= */}
      <div className="flex flex-col items-center pt-7 pb-6">
        
        {/* Logo + Brand */}
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded bg-[#42c0d4] flex items-center justify-center shadow-lg shadow-cyan-500/20">
            <Boxes size={15} strokeWidth={2.2} className="text-[#183047]" />
          </div>

          <div>
            <h1 className="text-[17px] font-bold leading-5 text-[#d8e3ee]">
              Stock
              <br />
              Manager
            </h1>
          </div>
        </div>

        {/* Subtitle */}
        <p className="mt-2 text-[5px] tracking-wide uppercase text-[#8c9aac]">
          Inventory System
        </p>
      </div>

      {/* ================= NAVIGATION ================= */}
      <nav className="px-2 mt-1 space-y-1.5">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `group flex items-center gap-3 px-3 py-3 rounded-md transition-all duration-200 ${
                  isActive
                    ? "bg-[#3db5cb] text-[#173044] shadow-md shadow-cyan-900/20"
                    : "text-[#c0cad6] hover:bg-[#2d374c] hover:text-white"
                }`
              }
            >
              <Icon
                size={14}
                strokeWidth={2}
                className="flex-shrink-0"
              />

              <span className="text-[11px] font-medium">
                {item.name}
              </span>
            </NavLink>
          );
        })}
      </nav>

      {/* ================= BOTTOM SPACER ================= */}
      <div className="flex-1" />

      {/* ================= BOTTOM BORDER AREA ================= */}
      <div className="border-t border-[#30394d] h-4" />
    </aside>
  );
};

export default Sidebar;