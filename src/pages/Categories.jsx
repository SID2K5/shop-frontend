import { useEffect, useState } from "react";
import {
  Tag,
  Plus,
  Pencil,
  Power,
  Trash2,
  AlertTriangle,
  X,
} from "lucide-react";

import CategoryModal from "../components/CategoryModal";

import {
  fetchCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../services/categoryService";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  /* ================= LOAD CATEGORIES ================= */

  const loadCategories = async () => {
    const data = await fetchCategories();
    setCategories(data);
  };

  useEffect(() => {
    loadCategories();
  }, []);

  /* ================= SAVE CATEGORY ================= */

  const handleSave = async (data) => {
    if (selectedCategory) {
      await updateCategory(selectedCategory._id, data);
    } else {
      await createCategory(data);
    }

    setModalOpen(false);
    setSelectedCategory(null);

    loadCategories();
  };

  /* ================= TOGGLE STATUS ================= */

  const toggleStatus = async (cat) => {
    await updateCategory(cat._id, {
      status: cat.status === "Active" ? "Inactive" : "Active",
    });

    loadCategories();
  };

  /* ================= DELETE ================= */

  const handleDelete = async () => {
    await deleteCategory(deleteId);

    setDeleteId(null);

    loadCategories();
  };

  return (
    <div className="relative min-h-full px-4 py-8 sm:px-8 lg:px-12 text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* ================= AMBIENT BACKGROUND GLOWS ================= */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden -z-10">
        <div className="absolute -top-40 left-1/4 w-[500px] h-[500px] rounded-full bg-cyan-500/[0.04] blur-[130px]" />
        <div className="absolute top-1/3 -right-20 w-[400px] h-[400px] rounded-full bg-indigo-500/[0.04] blur-[130px]" />
      </div>

      <div className="max-w-7xl mx-auto space-y-8">
        {/* ================= HEADER ================= */}

        <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between p-6 sm:p-8 rounded-3xl border border-white/[0.07] bg-slate-900/40 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.4)] overflow-hidden">
          {/* Specular Top Highlight */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <div className="absolute -top-24 -left-24 w-64 h-64 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />

          {/* TITLE */}
          <div className="relative flex items-center gap-5">
            {/* ICON */}
            <div className="relative group">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-cyan-500 via-blue-500 to-purple-600 opacity-30 blur-lg transition duration-500 group-hover:opacity-60" />
              <div className="relative w-14 h-14 rounded-2xl bg-slate-950/90 border border-white/10 flex items-center justify-center shadow-inner">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/20 via-transparent to-purple-500/20 opacity-80" />
                <Tag size={26} className="relative text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]" />
              </div>
            </div>

            {/* TEXT */}
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight bg-gradient-to-br from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
                  Categories
                </h1>
                <span className="hidden sm:inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
                  {categories.length}
                </span>
              </div>
              <p className="mt-1 text-sm text-slate-400 font-medium">
                Manage and organize all your product classifications
              </p>
            </div>
          </div>

          {/* ADD BUTTON */}
          <button
            onClick={() => {
              setSelectedCategory(null);
              setModalOpen(true);
            }}
            className="
              group
              relative
              inline-flex
              items-center
              justify-center
              gap-2.5
              px-6
              py-3.5
              rounded-2xl
              text-sm
              font-semibold
              text-white
              bg-gradient-to-r
              from-cyan-500
              via-blue-600
              to-indigo-600
              shadow-[0_0_25px_rgba(6,182,212,0.3),inset_0_1px_0_rgba(255,255,255,0.3)]
              border
              border-white/10
              transition-all
              duration-300
              hover:shadow-[0_0_35px_rgba(6,182,212,0.5),inset_0_1px_0_rgba(255,255,255,0.4)]
              hover:-translate-y-0.5
              active:translate-y-0
              active:scale-[0.98]
              overflow-hidden
            "
          >
            {/* Shimmer sweep */}
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent group-hover:translate-x-full transition-transform duration-700 ease-out" />

            <span className="relative flex items-center justify-center w-5 h-5 rounded-lg bg-white/15">
              <Plus
                size={15}
                 strokeWidth={2.5}
                className="transition-transform duration-300 group-hover:rotate-90"
              />
            </span>
            <span className="relative tracking-wide">Add Category</span>
          </button>
        </div>

        {/* ================= CATEGORY TABLE CARD ================= */}

        <div
          className="
            relative
            overflow-hidden
            rounded-3xl
            border
            border-white/[0.07]
            bg-slate-900/30
            backdrop-blur-2xl
            shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6)]
          "
        >
          {/* TOP SPECULAR GLOW */}
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />

          {/* TABLE */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[680px] border-collapse">
              {/* TABLE HEADER */}
              <thead>
                <tr className="border-b border-white/[0.06] bg-slate-950/40">
                  <th className="px-7 py-5 text-left">
                    <span className="text-[11px] font-bold tracking-[0.2em] text-slate-400/90 uppercase">
                      Category Name
                    </span>
                  </th>

                  <th className="px-7 py-5 text-left">
                    <span className="text-[11px] font-bold tracking-[0.2em] text-slate-400/90 uppercase">
                      Status
                    </span>
                  </th>

                  <th className="px-7 py-5 text-right">
                    <span className="text-[11px] font-bold tracking-[0.2em] text-slate-400/90 uppercase">
                      Actions
                    </span>
                  </th>
                </tr>
              </thead>

              {/* TABLE BODY */}
              <tbody className="divide-y divide-white/[0.04]">
                {categories.map((c) => (
                  <tr
                    key={c._id}
                    className="
                      group
                      relative
                      transition-all
                      duration-300
                      hover:bg-gradient-to-r
                      hover:from-cyan-500/[0.04]
                      hover:via-slate-800/[0.2]
                      hover:to-transparent
                    "
                  >
                    {/* NAME */}
                    <td className="px-7 py-4.5">
                      <div className="flex items-center gap-4">
                        {/* CATEGORY ICON */}
                        <div
                          className="
                            relative
                            w-11
                            h-11
                            rounded-2xl
                            flex
                            items-center
                            justify-center
                            bg-slate-900/90
                            border
                            border-white/[0.08]
                            shadow-inner
                            transition-all
                            duration-300
                            group-hover:border-cyan-400/40
                            group-hover:bg-cyan-950/30
                            group-hover:shadow-[0_0_20px_rgba(34,211,238,0.15)]
                            group-hover:scale-105
                          "
                        >
                          <Tag
                            size={18}
                            className="text-slate-400 transition-colors duration-300 group-hover:text-cyan-400"
                          />
                        </div>

                        {/* CATEGORY NAME */}
                        <div>
                          <span className="text-[15px] font-semibold text-slate-200 tracking-tight transition-colors duration-300 group-hover:text-white">
                            {c.name}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* STATUS */}
                    <td className="px-7 py-4.5">
                      <span
                        className={`
                          inline-flex
                          items-center
                          gap-2.5
                          px-3.5
                          py-1.5
                          rounded-full
                          text-xs
                          font-semibold
                          tracking-wide
                          border
                          backdrop-blur-md
                          transition-all
                          duration-300
                          ${
                            c.status === "Active"
                              ? "bg-emerald-500/[0.08] text-emerald-300 border-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.1)]"
                              : "bg-rose-500/[0.08] text-rose-300 border-rose-500/20 shadow-[0_0_20px_rgba(244,63,94,0.1)]"
                          }
                        `}
                      >
                        <span className="relative flex h-2 w-2">
                          {c.status === "Active" && (
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                          )}
                          <span
                            className={`
                              relative
                              inline-flex
                              rounded-full
                              h-2
                              w-2
                              ${
                                c.status === "Active"
                                  ? "bg-emerald-400 shadow-[0_0_8px_#34d399]"
                                  : "bg-rose-400 shadow-[0_0_8px_#fb7185]"
                              }
                            `}
                          />
                        </span>
                        {c.status}
                      </span>
                    </td>

                    {/* ACTIONS */}
                    <td className="px-7 py-4.5 text-right">
                      <div className="inline-flex items-center gap-1.5 p-1 rounded-2xl bg-slate-950/60 border border-white/[0.06] backdrop-blur-md">
                        {/* EDIT */}
                        <button
                          onClick={() => {
                            setSelectedCategory(c);
                            setModalOpen(true);
                          }}
                          title="Edit Category"
                          className="
                            w-9
                            h-9
                            rounded-xl
                            flex
                            items-center
                            justify-center
                            text-slate-400
                            transition-all
                            duration-200
                            hover:text-sky-400
                            hover:bg-sky-500/10
                            hover:shadow-[0_0_15px_rgba(56,189,248,0.15)]
                            active:scale-95
                          "
                        >
                          <Pencil size={16} />
                        </button>

                        {/* TOGGLE */}
                        <button
                          onClick={() => toggleStatus(c)}
                          title="Toggle Status"
                          className="
                            w-9
                            h-9
                            rounded-xl
                            flex
                            items-center
                            justify-center
                            text-slate-400
                            transition-all
                            duration-200
                            hover:text-amber-400
                            hover:bg-amber-500/10
                            hover:shadow-[0_0_15px_rgba(251,191,36,0.15)]
                            active:scale-95
                          "
                        >
                          <Power size={16} />
                        </button>

                        <div className="w-px h-4 bg-white/[0.06] mx-0.5" />

                        {/* DELETE */}
                        <button
                          onClick={() => setDeleteId(c._id)}
                          title="Delete Category"
                          className="
                            w-9
                            h-9
                            rounded-xl
                            flex
                            items-center
                            justify-center
                            text-slate-400
                            transition-all
                            duration-200
                            hover:text-rose-400
                            hover:bg-rose-500/10
                            hover:shadow-[0_0_15px_rgba(244,63,94,0.15)]
                            active:scale-95
                          "
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* EMPTY STATE */}
          {categories.length === 0 && (
            <div className="relative py-24 px-6 flex flex-col items-center justify-center text-center overflow-hidden">
              <div className="absolute w-64 h-64 rounded-full bg-cyan-500/5 blur-3xl pointer-events-none" />
              <div className="relative mb-5">
                <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-cyan-500/20 to-indigo-500/20 blur-xl" />
                <div className="relative w-16 h-16 rounded-2xl bg-slate-900/90 border border-white/10 flex items-center justify-center shadow-xl">
                  <Tag size={28} className="text-slate-400" />
                </div>
              </div>

              <h3 className="text-lg font-bold text-white tracking-tight">
                No categories found
              </h3>

              <p className="mt-1.5 max-w-sm text-sm text-slate-400 leading-relaxed">
                Create your first category to start organizing and structuring your product inventory.
              </p>
            </div>
          )}

          {/* FOOTER */}
          {categories.length > 0 && (
            <div className="px-7 py-4 border-t border-white/[0.06] bg-slate-950/40 flex items-center justify-between">
              <p className="text-xs font-medium text-slate-400">
                Showing all{" "}
                <span className="font-bold text-white px-1.5 py-0.5 rounded-md bg-white/[0.06] ml-1">
                  {categories.length}
                </span>{" "}
                categories
              </p>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/60" />
                <span>Live Sync</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ================= DELETE CONFIRM MODAL ================= */}

      {deleteId && (
        <div
          className="
            fixed
            inset-0
            z-50
            flex
            items-center
            justify-center
            bg-black/75
            backdrop-blur-md
            px-4
            animate-in
            fade-in
            duration-200
          "
        >
          <div
            className="
              relative
              w-full
              max-w-md
              overflow-hidden
              rounded-3xl
              border
              border-white/10
              bg-slate-900/95
              backdrop-blur-2xl
              shadow-[0_25px_70px_rgba(0,0,0,0.8)]
            "
          >
            {/* TOP GLOW */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-rose-500 to-transparent" />
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-56 h-56 rounded-full bg-rose-500/15 blur-3xl pointer-events-none" />

            {/* CLOSE */}
            <button
              onClick={() => setDeleteId(null)}
              className="
                absolute
                top-5
                right-5
                w-9
                h-9
                rounded-xl
                flex
                items-center
                justify-center
                text-slate-400
                bg-white/[0.03]
                border
                border-white/[0.06]
                hover:text-white
                hover:bg-white/[0.08]
                transition-all
              "
            >
              <X size={17} />
            </button>

            <div className="relative p-7 sm:p-8">
              {/* WARNING ICON */}
              <div className="relative w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-500/25 flex items-center justify-center mb-6 shadow-[0_0_25px_rgba(244,63,94,0.2)]">
                <AlertTriangle size={26} className="text-rose-400" />
              </div>

              <h2 className="text-xl font-bold text-white tracking-tight">
                Delete Category?
              </h2>

              <p className="mt-2.5 text-sm leading-relaxed text-slate-400">
                This action cannot be undone. The category will be permanently
                removed from your inventory system.
              </p>

              {/* BUTTONS */}
              <div className="flex items-center justify-end gap-3 mt-8">
                <button
                  onClick={() => setDeleteId(null)}
                  className="
                    px-5
                    py-2.5
                    rounded-xl
                    text-sm
                    font-semibold
                    text-slate-300
                    bg-white/[0.04]
                    border
                    border-white/[0.08]
                    hover:bg-white/[0.08]
                    hover:text-white
                    transition-all
                  "
                >
                  Cancel
                </button>

                <button
                  onClick={handleDelete}
                  className="
                    px-5
                    py-2.5
                    rounded-xl
                    text-sm
                    font-semibold
                    text-white
                    bg-gradient-to-r
                    from-rose-600
                    to-red-600
                    border
                    border-rose-400/20
                    shadow-[0_0_25px_rgba(225,29,72,0.4)]
                    hover:shadow-[0_0_35px_rgba(225,29,72,0.65)]
                    hover:brightness-110
                    transition-all
                    active:scale-95
                  "
                >
                  Delete Category
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= CATEGORY MODAL ================= */}

      <CategoryModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelectedCategory(null);
        }}
        onSave={handleSave}
        initialData={selectedCategory}
      />
    </div>
  );
}
