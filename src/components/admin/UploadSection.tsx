import { useRef, useState } from "react";
import { addStockImage } from "../../services/stockImages.service";
import type { Category, ToastState } from "./types";
import Icon from "../ui/Icon";

interface Props {
  categories: Category[];
  onUploaded: () => void;
  showToast: (msg: string, type?: ToastState["type"]) => void;
}

interface PreviewFile {
  file: File;
  previewUrl: string;
}

export default function UploadSection({ categories, onUploaded, showToast }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [label, setLabel]                       = useState<string>("");
  const [previews, setPreviews]                 = useState<PreviewFile[]>([]);
  const [uploading, setUploading]               = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  // Pick effective category (first available if none selected)
  const activeCategory = selectedCategory || categories[0]?.name || "";

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    const newPreviews: PreviewFile[] = files.map((f) => ({
      file: f,
      previewUrl: URL.createObjectURL(f),
    }));
    setPreviews((prev) => [...prev, ...newPreviews]);
    if (fileRef.current) fileRef.current.value = "";
  };

  const removePreview = (idx: number) => {
    setPreviews((prev) => {
      URL.revokeObjectURL(prev[idx].previewUrl);
      return prev.filter((_, i) => i !== idx);
    });
  };

  const clearAll = () => {
    previews.forEach((p) => URL.revokeObjectURL(p.previewUrl));
    setPreviews([]);
    setLabel("");
  };

  const handleUpload = async () => {
    if (!previews.length || !activeCategory) return;
    setUploading(true);
    let success = 0;
    let failed  = 0;

    for (const { file } of previews) {
      try {
        await addStockImage({
          file,
          category: activeCategory,
          label: label || file.name.replace(/\.[^.]+$/, "").replace(/[-_]/g, " "),
        });
        success++;
      } catch (err: unknown) {
        failed++;
        const msg = err instanceof Error ? err.message : "Upload failed";
        showToast(`Upload failed: ${msg}`, "error");
      }
    }

    setUploading(false);
    clearAll();
    if (success) {
      showToast(`✅ ${success} image${success > 1 ? "s" : ""} uploaded!`);
      onUploaded();
    }
    if (failed) showToast(`⚠️ ${failed} file(s) failed to upload.`, "error");
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-royal-gold/15 p-8">
      <h2 className="font-serif text-2xl font-bold text-royal-maroon mb-1 flex items-center gap-2">
        <Icon name="fa-cloud-arrow-up" className="text-royal-gold" />
        Upload Stock Images
      </h2>
      <p className="text-earthy-brown/40 text-xs uppercase tracking-widest mb-6">
        Add new images to your gallery
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {/* Category selector */}
        <div>
          <label className="text-xs font-bold uppercase tracking-widest text-earthy-brown/50 block mb-2">
            Category <span className="text-red-400">*</span>
          </label>
          {categories.length === 0 ? (
            <div className="border border-dashed border-royal-gold/30 rounded-xl px-4 py-3 text-xs text-earthy-brown/40 italic">
              Create a category first ↑
            </div>
          ) : (
            <select
              value={activeCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-royal-maroon
                outline-none focus:border-royal-gold transition bg-white"
            >
              {categories.map((c) => (
                <option key={c.id} value={c.name}>{c.name}</option>
              ))}
            </select>
          )}
        </div>

        {/* Label */}
        <div>
          <label className="text-xs font-bold uppercase tracking-widest text-earthy-brown/50 block mb-2">
            Label / Name <span className="text-earthy-brown/30">(optional)</span>
          </label>
          <input
            type="text"
            placeholder="e.g. Carved Wooden Chair"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-royal-maroon
              outline-none focus:border-royal-gold transition placeholder-earthy-brown/25"
          />
        </div>

        {/* File picker */}
        <div>
          <label className="text-xs font-bold uppercase tracking-widest text-earthy-brown/50 block mb-2">
            Select Images <span className="text-red-400">*</span>
          </label>
          <label
            className="flex items-center gap-2 w-full border border-dashed border-royal-gold/40
              rounded-xl px-4 py-3 text-sm text-earthy-brown/50 cursor-pointer
              hover:border-royal-gold hover:text-royal-maroon transition bg-parchment"
          >
            <Icon name="fa-paperclip" className="text-royal-gold" />
            <span>Browse or drop images</span>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileSelect}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Preview grid */}
      {previews.length > 0 && (
        <div className="mb-6">
          <p className="text-xs font-bold uppercase tracking-widest text-earthy-brown/50 mb-3">
            {previews.length} file{previews.length > 1 ? "s" : ""} selected — preview
          </p>
          <div className="flex gap-3 flex-wrap">
            {previews.map((p, i) => (
              <div key={i} className="relative group">
                <img
                  src={p.previewUrl}
                  alt={p.file.name}
                  className="w-24 h-24 object-cover rounded-xl border border-royal-gold/20 shadow-sm"
                />
                <button
                  type="button"
                  onClick={() => removePreview(i)}
                  className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full
                    text-[10px] flex items-center justify-center opacity-0 group-hover:opacity-100
                    transition shadow-md hover:bg-red-600"
                  title="Remove"
                >
                  ×
                </button>
                <p className="text-[9px] text-earthy-brown/40 text-center mt-1 max-w-[6rem] truncate">
                  {p.file.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action buttons */}
      <div className="flex items-center gap-3">
        <button
          onClick={handleUpload}
          disabled={uploading || !previews.length || !activeCategory}
          className="flex items-center gap-2 bg-royal-maroon text-white px-8 py-3.5 font-bold text-sm
            uppercase tracking-widest hover:bg-royal-gold hover:text-royal-maroon transition rounded-xl
            disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {uploading ? (
            <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Uploading…</>
          ) : (
            <><Icon name="fa-upload" /> Upload {previews.length > 0 ? `(${previews.length})` : ""}</>
          )}
        </button>

        {previews.length > 0 && (
          <button
            onClick={clearAll}
            className="px-5 py-3.5 border border-gray-200 text-earthy-brown/60 rounded-xl text-sm
              font-bold hover:border-red-300 hover:text-red-500 transition"
          >
            Clear All
          </button>
        )}
      </div>
    </div>
  );
}
