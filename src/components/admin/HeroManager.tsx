import { useState, useEffect, useCallback } from "react";
import { supabase } from "../../lib/supabase";
import type { HeroSlide, ToastState } from "./types";

interface Props {
  showToast: (msg: string, type?: ToastState["type"]) => void;
}

const EMPTY_SLIDE: Omit<HeroSlide, "id" | "created_at"> = {
  title: "",
  subtitle: "",
  tag: "",
  image_url: "",
  display_order: 0,
  active: true,
};

export default function HeroManager({ showToast }: Props) {
  const [slides, setSlides]     = useState<HeroSlide[]>([]);
  const [loading, setLoading]   = useState(true);
  const [editing, setEditing]   = useState<HeroSlide | null>(null);
  const [form, setForm]         = useState(EMPTY_SLIDE);
  const [saving, setSaving]     = useState(false);
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const fetch = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("hero_slides")
      .select("*")
      .order("display_order", { ascending: true });
    if (!error) setSlides(data || []);
    setLoading(false);
  }, []);

  useEffect(() => { fetch(); }, [fetch]);

  const openNew = () => {
    setEditing(null);
    setForm({ ...EMPTY_SLIDE, display_order: slides.length });
    setShowForm(true);
  };

  const openEdit = (slide: HeroSlide) => {
    setEditing(slide);
    setForm({
      title: slide.title,
      subtitle: slide.subtitle,
      tag: slide.tag,
      image_url: slide.image_url,
      display_order: slide.display_order,
      active: slide.active,
    });
    setShowForm(true);
  };

  const handleImageUpload = async (file: File) => {
    setUploading(true);
    const ext = file.name.split(".").pop();
    const path = `hero/${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from("stock-images").upload(path, file, { upsert: true });
    if (error) {
      showToast("Image upload failed: " + error.message, "error");
      setUploading(false);
      return;
    }
    const { data } = supabase.storage.from("stock-images").getPublicUrl(path);
    setForm((f) => ({ ...f, image_url: data.publicUrl }));
    setUploading(false);
    showToast("Image uploaded!");
  };

  const save = async () => {
    if (!form.title.trim() || !form.subtitle.trim()) {
      showToast("Title and subtitle are required.", "error");
      return;
    }
    setSaving(true);
    if (editing) {
      const { error } = await supabase.from("hero_slides").update(form).eq("id", editing.id);
      if (error) { showToast("Update failed: " + error.message, "error"); }
      else { showToast("Slide updated!"); setEditing(null); setShowForm(false); fetch(); }
    } else {
      const { error } = await supabase.from("hero_slides").insert(form);
      if (error) { showToast("Create failed: " + error.message, "error"); }
      else { showToast("Slide created!"); setShowForm(false); fetch(); }
    }
    setSaving(false);
  };

  const remove = async (id: string) => {
    const { error } = await supabase.from("hero_slides").delete().eq("id", id);
    if (error) { showToast("Delete failed: " + error.message, "error"); setConfirmId(null); }
    else { showToast("Slide deleted."); setConfirmId(null); fetch(); }
  };

  const toggleActive = async (slide: HeroSlide) => {
    await supabase.from("hero_slides").update({ active: !slide.active }).eq("id", slide.id);
    fetch();
  };

  const [showForm, setShowForm] = useState(false);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl shadow-sm border border-royal-gold/15 p-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="font-serif text-2xl font-bold text-royal-maroon flex items-center gap-2">
              <i className="fa-solid fa-images text-royal-gold" aria-hidden="true" /> Hero Slides
            </h2>
            <p className="text-earthy-brown/40 text-xs uppercase tracking-widest mt-0.5">
              Manage homepage hero carousel
            </p>
          </div>
          <button
            onClick={openNew}
            className="flex items-center gap-2 bg-royal-maroon text-white px-5 py-2.5 rounded-xl
              font-bold text-sm uppercase tracking-wider hover:bg-royal-gold hover:text-royal-maroon transition"
          >
            <i className="fa-solid fa-plus" aria-hidden="true" /> Add Slide
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-16">
            <div className="w-8 h-8 border-2 border-royal-maroon border-t-transparent rounded-full animate-spin" />
          </div>
        ) : slides.length === 0 ? (
          <div className="text-center py-16 text-earthy-brown/30">
            <i className="fa-solid fa-panorama text-5xl mb-3 block" aria-hidden="true" />
            <p className="text-sm uppercase tracking-widest">No slides yet — add one above</p>
          </div>
        ) : (
          <div className="space-y-3">
            {slides.map((slide) => (
              <div
                key={slide.id}
                className={`flex items-center gap-4 p-4 rounded-2xl border transition
                  ${slide.active ? "border-royal-gold/20 bg-[#FBF6E6]" : "border-gray-200 bg-gray-50 opacity-60"}`}
              >
                {slide.image_url ? (
                  <img
                    src={slide.image_url}
                    alt={slide.title}
                    className="w-20 h-14 object-cover rounded-xl flex-shrink-0 border border-royal-gold/10"
                  />
                ) : (
                  <div className="w-20 h-14 bg-royal-gold/10 rounded-xl flex-shrink-0 flex items-center justify-center">
                    <i className="fa-solid fa-image text-royal-gold/40 text-xl" aria-hidden="true" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-royal-maroon text-sm truncate">{slide.title} <span className="text-royal-gold italic font-normal">& {slide.subtitle}</span></p>
                  <p className="text-earthy-brown/40 text-xs mt-0.5 truncate">{slide.tag}</p>
                  <p className="text-earthy-brown/25 text-[10px] mt-0.5">Order: {slide.display_order}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => toggleActive(slide)}
                    title={slide.active ? "Deactivate" : "Activate"}
                    className={`w-8 h-8 rounded-full border flex items-center justify-center transition text-xs
                      ${slide.active ? "border-green-400 text-green-500 hover:bg-green-50" : "border-gray-300 text-gray-400 hover:bg-gray-100"}`}
                  >
                    <i className={`fa-solid ${slide.active ? "fa-eye" : "fa-eye-slash"}`} aria-hidden="true" />
                  </button>
                  <button
                    onClick={() => openEdit(slide)}
                    className="w-8 h-8 rounded-full border border-royal-gold/30 text-royal-maroon flex items-center justify-center hover:bg-royal-gold/10 transition text-xs"
                  >
                    <i className="fa-solid fa-pen" aria-hidden="true" />
                  </button>
                  {confirmId === slide.id ? (
                    <div className="flex items-center gap-1">
                      <button onClick={() => remove(slide.id)} className="text-red-600 text-xs font-bold hover:text-red-700">Yes</button>
                      <button onClick={() => setConfirmId(null)} className="text-gray-400 text-xs font-bold">No</button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setConfirmId(slide.id)}
                      className="w-8 h-8 rounded-full border border-red-200 text-red-400 flex items-center justify-center hover:bg-red-50 transition text-xs"
                    >
                      <i className="fa-solid fa-trash" aria-hidden="true" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Edit / Create form */}
      {showForm && (
        <div className="bg-white rounded-3xl shadow-sm border border-royal-gold/15 p-8">
          <h3 className="font-serif text-xl font-bold text-royal-maroon mb-6">
            {editing ? "Edit Slide" : "New Slide"}
          </h3>
          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <label className="block">
              <span className="label-text">Title *</span>
              <input type="text" value={form.title} onChange={(e) => setForm(f => ({ ...f, title: e.target.value }))}
                placeholder="e.g. Timeless Artistry" className="admin-input" />
            </label>
            <label className="block">
              <span className="label-text">Subtitle *</span>
              <input type="text" value={form.subtitle} onChange={(e) => setForm(f => ({ ...f, subtitle: e.target.value }))}
                placeholder="e.g. Heritage" className="admin-input" />
            </label>
            <label className="block">
              <span className="label-text">Tag Line</span>
              <input type="text" value={form.tag} onChange={(e) => setForm(f => ({ ...f, tag: e.target.value }))}
                placeholder="e.g. Rajasthan Handicraft" className="admin-input" />
            </label>
            <label className="block">
              <span className="label-text">Display Order</span>
              <input type="number" min={0} value={form.display_order}
                onChange={(e) => setForm(f => ({ ...f, display_order: parseInt(e.target.value) || 0 }))}
                className="admin-input" />
            </label>
          </div>

          <div className="mb-4">
            <span className="label-text block mb-2">Slide Image</span>
            {form.image_url && (
              <img src={form.image_url} alt="preview" className="w-full h-48 object-cover rounded-2xl mb-3 border border-royal-gold/10" />
            )}
            <div className="flex gap-3">
              <label className="flex items-center gap-2 bg-royal-gold/10 border border-royal-gold/30 text-royal-maroon
                px-4 py-2.5 rounded-xl text-sm font-bold cursor-pointer hover:bg-royal-gold/20 transition">
                <i className="fa-solid fa-cloud-arrow-up" aria-hidden="true" />
                {uploading ? "Uploading…" : "Upload Image"}
                <input type="file" accept="image/*" className="hidden"
                  onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0])} />
              </label>
              {form.image_url && (
                <button onClick={() => setForm(f => ({ ...f, image_url: "" }))}
                  className="text-red-400 text-sm hover:text-red-600 transition">Remove</button>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3 mb-6">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <div
                onClick={() => setForm(f => ({ ...f, active: !f.active }))}
                className={`w-11 h-6 rounded-full transition-colors ${form.active ? "bg-royal-maroon" : "bg-gray-200"} relative`}
              >
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${form.active ? "left-6" : "left-1"}`} />
              </div>
              <span className="text-sm text-earthy-brown font-medium">Active (visible on site)</span>
            </label>
          </div>

          <div className="flex gap-3">
            <button onClick={save} disabled={saving || uploading}
              className="flex-1 flex items-center justify-center gap-2 bg-royal-maroon text-white py-3 rounded-xl
                font-bold text-sm uppercase tracking-wider hover:bg-royal-gold hover:text-royal-maroon transition disabled:opacity-40">
              {saving
                ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                : <><i className="fa-solid fa-floppy-disk" aria-hidden="true" /> {editing ? "Save Changes" : "Create Slide"}</>
              }
            </button>
            <button
              onClick={() => { setEditing(null); setForm(EMPTY_SLIDE); setShowForm(false); }}
              className="px-5 py-3 border border-gray-200 text-earthy-brown/60 rounded-xl text-sm font-bold hover:border-royal-gold transition"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
