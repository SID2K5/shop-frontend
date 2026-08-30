export default function Navbar() {
  return (
    <header className="h-20 px-8 flex items-center bg-[#111827]/95 backdrop-blur-xl border-b border-slate-700/60 shadow-[0_4px_30px_rgba(0,0,0,0.18)]">
      <div className="relative">
        {/* Small accent line */}
        <div className="absolute -left-3 top-1/2 -translate-y-1/2 h-7 w-1 rounded-full bg-gradient-to-b from-cyan-400 to-blue-500 shadow-[0_0_12px_rgba(34,211,238,0.6)]" />

        <div>
          <h1 className="text-xl font-bold tracking-wide text-slate-100">
            Inventory System
          </h1>

          <p className="mt-0.5 text-xs font-medium tracking-wide text-slate-500">
            Manage your inventory efficiently
          </p>
        </div>
      </div>
    </header>
  );
}