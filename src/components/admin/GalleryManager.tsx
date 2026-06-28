import { useState } from "react";
import { deleteStockImage, updateStockImage } from "../../services/stockImages.service";
import { Category, StockImage, ToastState } from "./types";

interface Props {
  images: StockImage[];
  categories: Category[];
  loading: boolean;
  onRefresh: () => void;
  showToast: (msg: string, type?: ToastState["type"]) => void;
}

export default function GalleryManager({ images, categories, loading, onRefresh, showToast }: Props) {
  const [filterCat, setFilterCat]     = useState<string>("All");
  const [deletingId, setDeletingId]   = useState<string | null>(null);
  const [confirmId, setConfirmId]     = useState<string | null>(null);
  const [editingImg, setEditingImg]   = useState<StockImage | null>(null);
  const [editLabel, setEditLabel]     = useState("");
  const [editCat, setEditCat]         = useState("");
  const [saving, setSaving]           = useState(false);

  const allCats = ["All", ...categories.map((c) => c.name)];
  const filtered = filterCat === "All" ? images : images.filter((i) => i.category === filterCat);
  const catCount = (cat: string) => images.filter((i) => i.category === cat).length;

  // ── Delete ──────────────────────────────────────────────
  const handleDelete = async (img: StockImage) => {
    setDeletingId(img.id);
    try {
      await deleteStockImage(img);
      showToast("🗑️ Image deleted!");
      onRefresh();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Unknown error";
      showToast("Delete failed: " + msg, "error");
    }
    setDeletingId(null);
    setConfirmId(null);
  };

  // ── Edit ────────────────────────────────────────────────
  const openEdit = (img: StockImage) => {
    setEditingImg(img);
    setEditLabel(img.label);
    setEditCat(img.category);
  };

  const saveEdit = async () => {
    if (!editingImg) return;
    setSaving(true);
    try {
      await updateStockImage(editingImg.id, { label: editLabel, category: editCat });
      showToast("✅ Image updated!");
      setEditingImg(null);
      onRefresh();
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Update failed";
      showToast("Update failed: " + msg, "error");
    }
    setSaving(false);
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-royal-gold/15 p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h2 className="font-serif text-2xl font-bold text-royal-maroon flex items-center gap-2">
            <i className="fa-solid fa-images text-royal-gold" aria-hidden="true" />
            Manage Stock
            <span className="text-base font-normal text-earthy-brown/40 ml-1">({filtered.length})</span>
          </h2>
          <p className="text-earthy-brown/40 text-xs uppercase tracking-widest mt-0.5">
            Click an image to edit · Hover to delete
          </p>
        </div>

        {/* Filter pills */}
        <div className="flex flex-wrap gap-2">
          {allCats.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCat(cat)}
              className={`px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider border rounded-full transition ${
                filterCat === cat
                  ? "bg-royal-maroon text-white border-royal-maroon"
                  : "border-royal-gold/30 text-royal-maroon hover:border-royal-maroon"
              }`}
            >
              {cat === "All" ? `All (${images.length})` : `${cat} (${catCount(cat)})`}
            </button>
          ))}
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex justify-center py-20">
          <div className="w-10 h-10 border-2 border-royal-maroon border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* Empty */}
      {!loading && filtered.length === 0 && (
        <div className="text-center py-20 text-earthy-brown/30">
          <i className="fa-solid fa-image text-5xl mb-3 block" aria-hidden="true" />
          <p className="text-sm uppercase tracking-widest">No images in this category</p>
        </div>
      )}

      {/* Grid */}
      {!loading && filtered.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filtered.map((img) => (
            <div
              key={img.id}
              className="group relative bg-[#FBF6E6] rounded-2xl overflow-hidden border border-royal-gold/10 hover:shadow-lg transition cursor-pointer"
              onClick={() => openEdit(img)}
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={img.url}
                  alt={img.label}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
              </div>
              <div className="p-3">
                <p className="text-xs font-bold text-royal-maroon truncate">{img.label}</p>
                <p className="text-[10px] text-earthy-brown/40 uppercase tracking-wider mt-0.5 truncate">{img.category}</p>
                <p className="text-[9px] text-earthy-brown/25 mt-0.5">
                  {new Date(img.created_at).toLocaleDateString("en-IN")}
                </p>
              </div>

              {/* Edit hint overlay */}
              <div className="absolute inset-0 bg-royal-maroon/0 group-hover:bg-royal-maroon/20 transition-all duration-300 pointer-events-none rounded-2xl" />

              {/* Delete button */}
              {confirmId === img.id ? (
                <div className="absolute top-2 right-2 flex items-center gap-1 bg-white rounded-full px-2 py-1 shadow-lg">
                  <span className="text-[9px] text-red-500 font-bold">Delete?</span>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleDelete(img); }}
                    disabled={deletingId === img.id}
                    className="text-red-600 text-[10px] font-bold hover:text-red-700 transition"
                  >
                    {deletingId === img.id
                      ? <div className="w-3 h-3 border border-red-500 border-t-transparent rounded-full animate-spin" />
                      : "Yes"
                    }
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); setConfirmId(null); }}
                    className="text-earthy-brown/40 text-[10px] font-bold hover:text-earthy-brown transition"
                  >
                    No
                  </button>
                </div>
              ) : (
                <button
                  onClick={(e) => { e.stopPropagation(); setConfirmId(img.id); }}
                  disabled={deletingId === img.id}
                  className="absolute top-2 right-2 w-8 h-8 bg-red-600 text-white rounded-full
                    opacity-0 group-hover:opacity-100 transition flex items-center justify-center
                    hover:bg-red-700 disabled:opacity-50 shadow-lg z-10"
                  title="Delete image"
                >
                  <i className="fa-solid fa-trash text-xs" aria-hidden="true" />
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* ── Edit Modal ── */}
      {editingImg && (
        <div
          className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setEditingImg(null)}
        >
          <div
            className="bg-white rounded-3xl shadow-2xl border border-royal-gold/20 w-full max-w-md p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-6">
              <h3 className="font-serif text-xl font-bold text-royal-maroon">Edit Image</h3>
              <button
                onClick={() => setEditingImg(null)}
                className="text-earthy-brown/30 hover:text-royal-maroon transition text-xl"
              >
                <i className="fa-solid fa-xmark" aria-hidden="true" />
              </button>
            </div>

            <img
              src={editingImg.url}
              alt={editingImg.label}
              className="w-full h-48 object-cover rounded-2xl mb-6 border border-royal-gold/10"
            />

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-earthy-brown/50 block mb-2">
                  Label / Name
                </label>
                <input
                  type="text"
                  value={editLabel}
                  onChange={(e) => setEditLabel(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-royal-maroon
                    outline-none focus:border-royal-gold transition"
                />
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-earthy-brown/50 block mb-2">
                  Category
                </label>
                <select
                  value={editCat}
                  onChange={(e) => setEditCat(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-royal-maroon
                    outline-none focus:border-royal-gold transition bg-white"
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.name}>{c.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={saveEdit}
                disabled={saving}
                className="flex-1 flex items-center justify-center gap-2 bg-royal-maroon text-white
                  py-3 rounded-xl font-bold text-sm uppercase tracking-wider
                  hover:bg-royal-gold hover:text-royal-maroon transition disabled:opacity-40"
              >
                {saving
                  ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  : <><i className="fa-solid fa-floppy-disk" aria-hidden="true" /> Save Changes</>
                }
              </button>
              <button
                onClick={() => setEditingImg(null)}
                className="px-5 py-3 border border-gray-200 text-earthy-brown/60 rounded-xl
                  text-sm font-bold hover:border-royal-gold transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
