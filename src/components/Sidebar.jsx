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
    <aside className="w-64 min-h-screen bg-[#080d18] border-r border-slate-800 flex flex-col">
      
      {/* BRAND */}
      <div className="px-6 py-7 border-b border-slate-800">
        <div className="flex items-center gap-3">
          
          {/* LOGO */}
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-900/30">
            <Boxes size={23} className="text-white" />
          </div>

          <div>
            <h1 className="text-lg font-bold text-white tracking-wide">
              Stock Manager
            </h1>

            <p className="text-xs text-slate-500 mt-0.5">
              Inventory System
            </p>
          </div>
        </div>
      </div>

      {/* NAVIGATION */}
      <div className="flex-1 px-4 py-6">
        
        <p className="px-3 mb-3 text-[11px] font-semibold tracking-widest text-slate-500 uppercase">
          Main Menu
        </p>

        <nav className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    isActive
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-900/30"
                      : "text-slate-400 hover:bg-slate-800 hover:text-white"
                  }`
                }
              >
                <Icon
                  size={20}
                  className="transition-transform duration-200 group-hover:scale-110"
                />

                <span className="font-medium">
                  {item.name}
                </span>

                {/* ACTIVE INDICATOR */}
                <span className="ml-auto text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                  →
                </span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* FOOTER */}
      <div className="p-4 border-t border-slate-800">
        <div className="rounded-xl bg-slate-900/70 border border-slate-800 p-3">
          <p className="text-xs font-medium text-slate-300">
            Inventory Management
          </p>

          <p className="text-[11px] text-slate-500 mt-1">
            Manage your stock efficiently
          </p>
        </div>
      </div>

    </aside>
  );
};

export default Sidebar;