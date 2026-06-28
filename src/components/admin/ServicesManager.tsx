import { useState, useEffect, useCallback } from "react";
import {
  listServices,
  createService,
  updateService,
  deleteService,
} from "../../services/services.service";
import type { Service, ToastState } from "./types";

interface Props {
  showToast: (msg: string, type?: ToastState["type"]) => void;
}

const ICONS = [
  "fa-ship", "fa-hotel", "fa-utensils", "fa-compass-drafting", "fa-store",
  "fa-truck", "fa-globe", "fa-building", "fa-house", "fa-star",
  "fa-paint-brush", "fa-hammer", "fa-gem", "fa-crown", "fa-leaf",
];

const EMPTY: Omit<Service, "id" | "created_at"> = {
  title: "", description: "", icon: "fa-star", category: "General", display_order: 0, active: true,
};

export default function ServicesManager({ showToast }: Props) {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading]   = useState(true);
  const [editing, setEditing]   = useState<Service | null>(null);
  const [form, setForm]         = useState(EMPTY);
  const [saving, setSaving]     = useState(false);
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  const fetch = useCallback(async () => {
    setLoading(true);
    try {
      setServices(await listServices());
    } catch (err) {
      console.error("[ServicesManager] failed to load services", err);
    }
    setLoading(false);
  }, []);

  useEffect(() => { fetch(); }, [fetch]);

  const openNew = () => {
    setEditing(null);
    setForm({ ...EMPTY, display_order: services.length });
    setShowForm(true);
  };

  const openEdit = (s: Service) => {
    setEditing(s);
    setForm({ title: s.title, description: s.description, icon: s.icon, category: s.category, display_order: s.display_order, active: s.active });
    setShowForm(true);
  };

  const cancel = () => { setShowForm(false); setEditing(null); setForm(EMPTY); };

  const save = async () => {
    if (!form.title.trim() || !form.description.trim()) {
      showToast("Title and description are required.", "error");
      return;
    }
    setSaving(true);
    try {
      if (editing) {
        await updateService(editing.id, form);
        showToast("Service updated!");
      } else {
        await createService(form);
        showToast("Service created!");
      }
      cancel();
      fetch();
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Save failed";
      showToast((editing ? "Update failed: " : "Create failed: ") + msg, "error");
    }
    setSaving(false);
  };

  const remove = async (id: string) => {
    try {
      await deleteService(id);
      showToast("Service deleted.");
      setConfirmId(null);
      fetch();
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Delete failed";
      showToast("Delete failed: " + msg, "error");
    }
  };

  const toggleActive = async (s: Service) => {
    await updateService(s.id, { active: !s.active });
    fetch();
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl shadow-sm border border-royal-gold/15 p-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="font-serif text-2xl font-bold text-royal-maroon flex items-center gap-2">
              <i className="fa-solid fa-briefcase text-royal-gold" aria-hidden="true" /> Services
            </h2>
            <p className="text-earthy-brown/40 text-xs uppercase tracking-widest mt-0.5">Manage commercial service offerings</p>
          </div>
          <button onClick={openNew}
            className="flex items-center gap-2 bg-royal-maroon text-white px-5 py-2.5 rounded-xl font-bold text-sm uppercase tracking-wider hover:bg-royal-gold hover:text-royal-maroon transition">
            <i className="fa-solid fa-plus" aria-hidden="true" /> Add Service
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-16"><div className="w-8 h-8 border-2 border-royal-maroon border-t-transparent rounded-full animate-spin" /></div>
        ) : services.length === 0 ? (
          <div className="text-center py-16 text-earthy-brown/30">
            <i className="fa-solid fa-briefcase-blank text-5xl mb-3 block" aria-hidden="true" />
            <p className="text-sm uppercase tracking-widest">No services yet</p>
          </div>
        ) : (
          <div className="space-y-3">
            {services.map((s) => (
              <div key={s.id}
                className={`flex items-center gap-4 p-4 rounded-2xl border transition
                  ${s.active ? "border-royal-gold/20 bg-[#FBF6E6]" : "border-gray-200 bg-gray-50 opacity-60"}`}>
                <div className="w-12 h-12 bg-royal-gold/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <i className={`fa-solid ${s.icon} text-royal-gold text-lg`} aria-hidden="true" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-royal-maroon text-sm">{s.title}</p>
                  <p className="text-earthy-brown/40 text-xs mt-0.5 truncate">{s.description}</p>
                  <p className="text-earthy-brown/25 text-[10px] mt-0.5">{s.category} · Order: {s.display_order}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button onClick={() => toggleActive(s)} title={s.active ? "Deactivate" : "Activate"}
                    className={`w-8 h-8 rounded-full border flex items-center justify-center transition text-xs
                      ${s.active ? "border-green-400 text-green-500 hover:bg-green-50" : "border-gray-300 text-gray-400 hover:bg-gray-100"}`}>
                    <i className={`fa-solid ${s.active ? "fa-eye" : "fa-eye-slash"}`} aria-hidden="true" />
                  </button>
                  <button onClick={() => openEdit(s)}
                    className="w-8 h-8 rounded-full border border-royal-gold/30 text-royal-maroon flex items-center justify-center hover:bg-royal-gold/10 transition text-xs">
                    <i className="fa-solid fa-pen" aria-hidden="true" />
                  </button>
                  {confirmId === s.id ? (
                    <div className="flex items-center gap-1">
                      <button onClick={() => remove(s.id)} className="text-red-600 text-xs font-bold hover:text-red-700">Yes</button>
                      <button onClick={() => setConfirmId(null)} className="text-gray-400 text-xs font-bold">No</button>
                    </div>
                  ) : (
                    <button onClick={() => setConfirmId(s.id)}
                      className="w-8 h-8 rounded-full border border-red-200 text-red-400 flex items-center justify-center hover:bg-red-50 transition text-xs">
                      <i className="fa-solid fa-trash" aria-hidden="true" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showForm && (
        <div className="bg-white rounded-3xl shadow-sm border border-royal-gold/15 p-8">
          <h3 className="font-serif text-xl font-bold text-royal-maroon mb-6">{editing ? "Edit Service" : "New Service"}</h3>
          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <label className="block sm:col-span-2">
              <span className="label-text">Title *</span>
              <input type="text" value={form.title} onChange={(e) => setForm(f => ({ ...f, title: e.target.value }))}
                placeholder="e.g. Wholesale & Export" className="admin-input" />
            </label>
            <label className="block sm:col-span-2">
              <span className="label-text">Description *</span>
              <textarea rows={3} value={form.description} onChange={(e) => setForm(f => ({ ...f, description: e.target.value }))}
                placeholder="Service description…" className="admin-input resize-none" />
            </label>
            <div>
              <span className="label-text block mb-2">Icon (FontAwesome)</span>
              <div className="flex flex-wrap gap-2">
                {ICONS.map((icon) => (
                  <button key={icon} type="button" onClick={() => setForm(f => ({ ...f, icon }))}
                    title={icon}
                    className={`w-10 h-10 rounded-xl border flex items-center justify-center transition text-sm
                      ${form.icon === icon ? "bg-royal-maroon text-white border-royal-maroon" : "border-gray-200 text-earthy-brown hover:border-royal-gold"}`}>
                    <i className={`fa-solid ${icon}`} aria-hidden="true" />
                  </button>
                ))}
              </div>
              <input type="text" value={form.icon} onChange={(e) => setForm(f => ({ ...f, icon: e.target.value }))}
                placeholder="or type custom icon class" className="admin-input mt-2" />
            </div>
            <div className="space-y-4">
              <label className="block">
                <span className="label-text">Category</span>
                <input type="text" value={form.category} onChange={(e) => setForm(f => ({ ...f, category: e.target.value }))}
                  placeholder="e.g. B2B, Global, Professional" className="admin-input" />
              </label>
              <label className="block">
                <span className="label-text">Display Order</span>
                <input type="number" min={0} value={form.display_order}
                  onChange={(e) => setForm(f => ({ ...f, display_order: parseInt(e.target.value) || 0 }))}
                  className="admin-input" />
              </label>
              <label className="flex items-center gap-2 cursor-pointer select-none mt-2">
                <div onClick={() => setForm(f => ({ ...f, active: !f.active }))}
                  className={`w-11 h-6 rounded-full transition-colors ${form.active ? "bg-royal-maroon" : "bg-gray-200"} relative`}>
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${form.active ? "left-6" : "left-1"}`} />
                </div>
                <span className="text-sm text-earthy-brown">Active</span>
              </label>
            </div>
          </div>
          <div className="flex gap-3">
            <button onClick={save} disabled={saving}
              className="flex-1 flex items-center justify-center gap-2 bg-royal-maroon text-white py-3 rounded-xl font-bold text-sm uppercase tracking-wider hover:bg-royal-gold hover:text-royal-maroon transition disabled:opacity-40">
              {saving ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <><i className="fa-solid fa-floppy-disk" aria-hidden="true" /> {editing ? "Save Changes" : "Create Service"}</>}
            </button>
            <button onClick={cancel} className="px-5 py-3 border border-gray-200 text-earthy-brown/60 rounded-xl text-sm font-bold hover:border-royal-gold transition">Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}
