import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-black/60 backdrop-blur border-r border-white/10 p-6">
      <h1 className="text-xl font-bold mb-6">Stock Manager</h1>

      <nav className="space-y-3">
        <NavLink to="/dashboard" className="block hover:text-cyan-400">
          Dashboard
        </NavLink>
        <NavLink to="/categories" className="block hover:text-cyan-400">
          Categories
        </NavLink>
        <NavLink to="/products" className="block hover:text-cyan-400">
          Products
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
