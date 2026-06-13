import { useState } from "react";
import { supabase } from "../../lib/supabase";
import { Category, ToastState } from "./types";

interface Props {
  categories: Category[];
  onCategoriesChange: () => void;
  showToast: (msg: string, type?: ToastState["type"]) => void;
}

export default function CategoryManager({ categories, onCategoriesChange, showToast }: Props) {
  const [newName, setNewName]     = useState("");
  const [creating, setCreating]   = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmId, setConfirmId] = useState<string | null>(null);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = newName.trim();
    if (!trimmed) return;
    if (categories.some((c) => c.name.toLowerCase() === trimmed.toLowerCase())) {
      showToast("Category already exists!", "error");
      return;
    }
    setCreating(true);
    const { error } = await supabase.from("categories").insert({ name: trimmed });
    setCreating(false);
    if (error) {
      showToast("Failed to create category: " + error.message, "error");
    } else {
      showToast(`✅ Category "${trimmed}" created!`);
      setNewName("");
      onCategoriesChange();
    }
  };

  const handleDelete = async (cat: Category) => {
    setDeletingId(cat.id);
    // Check if images exist in this category
    const { count } = await supabase
      .from("stock_images")
      .select("id", { count: "exact", head: true })
      .eq("category", cat.name);

    if ((count ?? 0) > 0) {
      showToast(`Cannot delete — ${count} image(s) use this category.`, "error");
      setDeletingId(null);
      setConfirmId(null);
      return;
    }

    const { error } = await supabase.from("categories").delete().eq("id", cat.id);
    setDeletingId(null);
    setConfirmId(null);
    if (error) {
      showToast("Failed to delete: " + error.message, "error");
    } else {
      showToast(`🗑️ Category "${cat.name}" deleted.`);
      onCategoriesChange();
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-royal-gold/15 p-8">
      <h2 className="font-serif text-2xl font-bold text-royal-maroon mb-1 flex items-center gap-2">
        <i className="fa-solid fa-tags text-royal-gold" />
        Manage Categories
      </h2>
      <p className="text-earthy-brown/40 text-xs uppercase tracking-widest mb-6">
        Create custom categories for your stock gallery
      </p>

      {/* Create form */}
      <form onSubmit={handleCreate} className="flex gap-3 mb-8">
        <input
          type="text"
          placeholder="e.g. Antique Mirrors, Stone Sculptures…"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          maxLength={40}
          className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-sm text-royal-maroon
            outline-none focus:border-royal-gold transition placeholder-earthy-brown/30"
        />
        <button
          type="submit"
          disabled={creating || !newName.trim()}
          className="flex items-center gap-2 bg-royal-maroon text-white px-6 py-3 rounded-xl
            font-bold text-sm uppercase tracking-wider hover:bg-royal-gold hover:text-royal-maroon
            transition disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap"
        >
          {creating ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <i className="fa-solid fa-plus" />
          )}
          Add Category
        </button>
      </form>

      {/* Category list */}
      {categories.length === 0 ? (
        <div className="text-center py-10 text-earthy-brown/30">
          <i className="fa-solid fa-folder-open text-4xl mb-3 block" />
          <p className="text-sm uppercase tracking-widest">No categories yet — create one above</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="flex items-center justify-between bg-[#FBF6E6] rounded-xl px-4 py-3
                border border-royal-gold/15 hover:border-royal-gold/30 transition group"
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className="w-2.5 h-2.5 rounded-full bg-royal-gold flex-shrink-0" />
                <span className="text-sm font-bold text-royal-maroon truncate">{cat.name}</span>
              </div>

              {confirmId === cat.id ? (
                <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                  <span className="text-[10px] text-red-500 font-bold uppercase tracking-wider">Sure?</span>
                  <button
                    onClick={() => handleDelete(cat)}
                    disabled={deletingId === cat.id}
                    className="text-red-600 hover:text-red-700 text-xs font-bold transition"
                  >
                    {deletingId === cat.id
                      ? <div className="w-3 h-3 border border-red-500 border-t-transparent rounded-full animate-spin" />
                      : "Yes"
                    }
                  </button>
                  <button
                    onClick={() => setConfirmId(null)}
                    className="text-earthy-brown/40 hover:text-earthy-brown text-xs font-bold transition"
                  >
                    No
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setConfirmId(cat.id)}
                  className="opacity-0 group-hover:opacity-100 transition text-earthy-brown/30
                    hover:text-red-500 flex-shrink-0 ml-2"
                  title={`Delete "${cat.name}"`}
                >
                  <i className="fa-solid fa-trash text-xs" />
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
