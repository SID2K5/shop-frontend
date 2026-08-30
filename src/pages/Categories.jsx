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
    <div className="min-h-full px-5 py-7 sm:px-7 lg:px-10 text-gray-100">
      {/* ================= HEADER ================= */}

      <div className="flex flex-col gap-6 mb-8 sm:flex-row sm:items-center sm:justify-between">
        {/* TITLE */}

        <div className="flex items-center gap-4">
          {/* ICON */}

          <div className="relative">
            <div className="absolute inset-0 rounded-2xl bg-cyan-400/20 blur-xl" />

            <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/20 via-blue-500/20 to-purple-600/30 border border-cyan-400/20 flex items-center justify-center shadow-lg shadow-cyan-950/40">
              <Tag size={27} className="text-cyan-400" />
            </div>
          </div>

          {/* TEXT */}

          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white">
              Categories
            </h1>

            <p className="mt-1 text-sm text-slate-400">
              Manage all your product categories
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
            overflow-hidden
            flex
            items-center
            justify-center
            gap-2
            px-5
            py-3
            rounded-xl
            font-semibold
            text-white
            bg-gradient-to-r
            from-cyan-500
            via-blue-500
            to-purple-600
            shadow-lg
            shadow-blue-900/40
            transition-all
            duration-300
            hover:-translate-y-0.5
            hover:shadow-cyan-500/20
            active:translate-y-0
          "
        >
          {/* BUTTON GLOW */}

          <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <Plus
            size={19}
            className="relative transition-transform duration-300 group-hover:rotate-90"
          />

          <span className="relative">Add Category</span>
        </button>
      </div>

      {/* ================= CATEGORY TABLE ================= */}

      <div
        className="
          relative
          overflow-hidden
          rounded-2xl
          border
          border-cyan-400/20
          bg-slate-950/50
          backdrop-blur-xl
          shadow-2xl
          shadow-black/30
        "
      >
        {/* TOP GLOW */}

        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400/70 to-transparent" />

        {/* TABLE */}

        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            {/* TABLE HEADER */}

            <thead>
              <tr className="border-b border-slate-700/70 bg-slate-900/60">
                <th className="px-6 py-5 text-left">
                  <span className="text-xs font-bold tracking-[0.18em] text-slate-400 uppercase">
                    Name
                  </span>
                </th>

                <th className="px-6 py-5 text-left">
                  <span className="text-xs font-bold tracking-[0.18em] text-slate-400 uppercase">
                    Status
                  </span>
                </th>

                <th className="px-6 py-5 text-center">
                  <span className="text-xs font-bold tracking-[0.18em] text-slate-400 uppercase">
                    Actions
                  </span>
                </th>
              </tr>
            </thead>

            {/* TABLE BODY */}

            <tbody>
              {categories.map((c) => (
                <tr
                  key={c._id}
                  className="
                    group
                    border-b
                    border-slate-800/80
                    transition-all
                    duration-300
                    hover:bg-cyan-400/[0.035]
                  "
                >
                  {/* NAME */}

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      {/* CATEGORY ICON */}

                      <div
                        className="
                          relative
                          w-11
                          h-11
                          rounded-xl
                          flex
                          items-center
                          justify-center
                          bg-gradient-to-br
                          from-slate-800
                          to-slate-900
                          border
                          border-cyan-400/20
                          shadow-lg
                          shadow-black/20
                          transition-all
                          duration-300
                          group-hover:border-cyan-400/50
                          group-hover:shadow-cyan-500/10
                          group-hover:-translate-y-0.5
                        "
                      >
                        <Tag
                          size={20}
                          className="text-cyan-400 transition-transform duration-300 group-hover:scale-110"
                        />
                      </div>

                      {/* CATEGORY NAME */}

                      <span className="font-medium text-slate-200 transition-colors duration-300 group-hover:text-white">
                        {c.name}
                      </span>
                    </div>
                  </td>

                  {/* STATUS */}

                  <td className="px-6 py-4">
                    <span
                      className={`
                        inline-flex
                        items-center
                        gap-2
                        px-3
                        py-2
                        rounded-lg
                        text-sm
                        font-medium
                        border
                        ${
                          c.status === "Active"
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/10"
                            : "bg-red-500/10 text-red-400 border-red-500/10"
                        }
                      `}
                    >
                      <span
                        className={`
                          w-2
                          h-2
                          rounded-full
                          ${
                            c.status === "Active"
                              ? "bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]"
                              : "bg-red-400 shadow-[0_0_10px_rgba(248,113,113,0.8)]"
                          }
                        `}
                      />

                      {c.status}
                    </span>
                  </td>

                  {/* ACTIONS */}

                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-3">
                      {/* EDIT */}

                      <button
                        onClick={() => {
                          setSelectedCategory(c);
                          setModalOpen(true);
                        }}
                        title="Edit Category"
                        className="
                          w-10
                          h-10
                          rounded-xl
                          flex
                          items-center
                          justify-center
                          text-blue-400
                          bg-blue-500/5
                          border
                          border-blue-400/20
                          transition-all
                          duration-300
                          hover:bg-blue-500/15
                          hover:border-blue-400/50
                          hover:-translate-y-0.5
                          hover:shadow-lg
                          hover:shadow-blue-500/10
                        "
                      >
                        <Pencil size={18} />
                      </button>

                      {/* TOGGLE */}

                      <button
                        onClick={() => toggleStatus(c)}
                        title="Toggle Status"
                        className="
                          w-10
                          h-10
                          rounded-xl
                          flex
                          items-center
                          justify-center
                          text-yellow-400
                          bg-yellow-500/5
                          border
                          border-yellow-400/20
                          transition-all
                          duration-300
                          hover:bg-yellow-500/15
                          hover:border-yellow-400/50
                          hover:-translate-y-0.5
                          hover:shadow-lg
                          hover:shadow-yellow-500/10
                        "
                      >
                        <Power size={18} />
                      </button>

                      {/* DELETE */}

                      <button
                        onClick={() => setDeleteId(c._id)}
                        title="Delete Category"
                        className="
                          w-10
                          h-10
                          rounded-xl
                          flex
                          items-center
                          justify-center
                          text-red-400
                          bg-red-500/5
                          border
                          border-red-400/20
                          transition-all
                          duration-300
                          hover:bg-red-500/15
                          hover:border-red-400/50
                          hover:-translate-y-0.5
                          hover:shadow-lg
                          hover:shadow-red-500/10
                        "
                      >
                        <Trash2 size={18} />
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
          <div className="py-20 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-700 flex items-center justify-center mb-4">
              <Tag size={28} className="text-slate-500" />
            </div>

            <h3 className="text-lg font-semibold text-slate-300">
              No categories yet
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Create your first category to start organizing your products.
            </p>
          </div>
        )}

        {/* FOOTER */}

        {categories.length > 0 && (
          <div className="px-6 py-4 border-t border-slate-800/80 bg-slate-900/30">
            <p className="text-sm text-slate-500">
              Total categories{" "}
              <span className="font-semibold text-slate-300">
                {categories.length}
              </span>
            </p>
          </div>
        )}
      </div>

      {/* ================= DELETE CONFIRM ================= */}

      {deleteId && (
        <div
          className="
            fixed
            inset-0
            z-50
            flex
            items-center
            justify-center
            bg-black/70
            backdrop-blur-sm
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
              rounded-2xl
              border
              border-slate-700
              bg-slate-950
              shadow-2xl
              shadow-black/70
            "
          >
            {/* TOP GLOW */}

            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-400/70 to-transparent" />

            {/* CLOSE */}

            <button
              onClick={() => setDeleteId(null)}
              className="
                absolute
                top-4
                right-4
                w-9
                h-9
                rounded-lg
                flex
                items-center
                justify-center
                text-slate-400
                hover:text-white
                hover:bg-slate-800
                transition
              "
            >
              <X size={18} />
            </button>

            <div className="p-7">
              {/* WARNING ICON */}

              <div className="w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-5">
                <AlertTriangle size={26} className="text-red-400" />
              </div>

              <h2 className="text-xl font-bold text-white">
                Delete Category?
              </h2>

              <p className="mt-3 text-sm leading-relaxed text-slate-400">
                This action cannot be undone. The category will be permanently
                removed from your inventory system.
              </p>

              {/* BUTTONS */}

              <div className="flex justify-end gap-3 mt-7">
                <button
                  onClick={() => setDeleteId(null)}
                  className="
                    px-5
                    py-2.5
                    rounded-xl
                    text-sm
                    font-medium
                    text-slate-300
                    bg-slate-800
                    border
                    border-slate-700
                    hover:bg-slate-700
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
                    bg-red-600
                    hover:bg-red-500
                    shadow-lg
                    shadow-red-900/30
                    transition-all
                    hover:-translate-y-0.5
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