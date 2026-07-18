import { useState, useEffect, useCallback } from "react";
import {
  listFaqs,
  createFaq,
  updateFaq,
  deleteFaq,
} from "../../services/faqs.service";
import type { FAQ, ToastState } from "./types";
import Icon from "../ui/Icon";

interface Props {
  showToast: (msg: string, type?: ToastState["type"]) => void;
}

const EMPTY: Omit<FAQ, "id" | "created_at"> = {
  question: "", answer: "", display_order: 0, active: true,
};

export default function FAQManager({ showToast }: Props) {
  const [faqs, setFaqs]       = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<FAQ | null>(null);
  const [form, setForm]       = useState(EMPTY);
  const [saving, setSaving]   = useState(false);
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [showForm, setShowForm]   = useState(false);

  const fetch = useCallback(async () => {
    setLoading(true);
    try {
      setFaqs(await listFaqs());
    } catch (err) {
      console.error("[FAQManager] failed to load faqs", err);
    }
    setLoading(false);
  }, []);

  useEffect(() => { fetch(); }, [fetch]);

  const openNew = () => {
    setEditing(null);
    setForm({ ...EMPTY, display_order: faqs.length });
    setShowForm(true);
  };

  const openEdit = (f: FAQ) => {
    setEditing(f);
    setForm({ question: f.question, answer: f.answer, display_order: f.display_order, active: f.active });
    setShowForm(true);
  };

  const cancel = () => { setShowForm(false); setEditing(null); setForm(EMPTY); };

  const save = async () => {
    if (!form.question.trim() || !form.answer.trim()) {
      showToast("Question and answer are required.", "error");
      return;
    }
    setSaving(true);
    try {
      if (editing) {
        await updateFaq(editing.id, form);
        showToast("FAQ updated!");
      } else {
        await createFaq(form);
        showToast("FAQ created!");
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
      await deleteFaq(id);
      showToast("FAQ deleted.");
      setConfirmId(null);
      fetch();
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Delete failed";
      showToast("Delete failed: " + msg, "error");
    }
  };

  const toggleActive = async (f: FAQ) => {
    await updateFaq(f.id, { active: !f.active });
    fetch();
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl shadow-sm border border-royal-gold/15 p-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="font-serif text-2xl font-bold text-royal-maroon flex items-center gap-2">
              <Icon name="fa-circle-question" className="text-royal-gold" /> FAQ
            </h2>
            <p className="text-earthy-brown/40 text-xs uppercase tracking-widest mt-0.5">Manage frequently asked questions</p>
          </div>
          <button onClick={openNew}
            className="flex items-center gap-2 bg-royal-maroon text-white px-5 py-2.5 rounded-xl font-bold text-sm uppercase tracking-wider hover:bg-royal-gold hover:text-royal-maroon transition">
            <Icon name="fa-plus" /> Add FAQ
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-16"><div className="w-8 h-8 border-2 border-royal-maroon border-t-transparent rounded-full animate-spin" /></div>
        ) : faqs.length === 0 ? (
          <div className="text-center py-16 text-earthy-brown/30">
            <Icon name="fa-circle-question" className="text-5xl mb-3 block" />
            <p className="text-sm uppercase tracking-widest">No FAQs yet</p>
          </div>
        ) : (
          <div className="space-y-3">
            {faqs.map((f) => (
              <div key={f.id}
                className={`p-4 rounded-2xl border transition ${f.active ? "border-royal-gold/20 bg-parchment" : "border-gray-200 bg-gray-50 opacity-60"}`}>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-royal-maroon text-sm">{f.question}</p>
                    <p className="text-earthy-brown/50 text-xs mt-1 line-clamp-2">{f.answer}</p>
                    <p className="text-earthy-brown/25 text-[10px] mt-1">Order: {f.display_order}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button onClick={() => toggleActive(f)} title={f.active ? "Deactivate" : "Activate"}
                      className={`w-8 h-8 rounded-full border flex items-center justify-center transition text-xs
                        ${f.active ? "border-green-400 text-green-500 hover:bg-green-50" : "border-gray-300 text-gray-400 hover:bg-gray-100"}`}>
                      <Icon name={f.active ? "fa-eye" : "fa-eye-slash"} />
                    </button>
                    <button onClick={() => openEdit(f)}
                      className="w-8 h-8 rounded-full border border-royal-gold/30 text-royal-maroon flex items-center justify-center hover:bg-royal-gold/10 transition text-xs">
                      <Icon name="fa-pen" />
                    </button>
                    {confirmId === f.id ? (
                      <div className="flex items-center gap-1">
                        <button onClick={() => remove(f.id)} className="text-red-600 text-xs font-bold hover:text-red-700">Yes</button>
                        <button onClick={() => setConfirmId(null)} className="text-gray-400 text-xs font-bold">No</button>
                      </div>
                    ) : (
                      <button onClick={() => setConfirmId(f.id)}
                        className="w-8 h-8 rounded-full border border-red-200 text-red-400 flex items-center justify-center hover:bg-red-50 transition text-xs">
                        <Icon name="fa-trash" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showForm && (
        <div className="bg-white rounded-3xl shadow-sm border border-royal-gold/15 p-8">
          <h3 className="font-serif text-xl font-bold text-royal-maroon mb-6">{editing ? "Edit FAQ" : "New FAQ"}</h3>
          <div className="space-y-4 mb-4">
            <label className="block">
              <span className="label-text">Question *</span>
              <input type="text" value={form.question} onChange={(e) => setForm(f => ({ ...f, question: e.target.value }))}
                placeholder="e.g. Do you ship internationally?" className="admin-input" />
            </label>
            <label className="block">
              <span className="label-text">Answer *</span>
              <textarea rows={4} value={form.answer} onChange={(e) => setForm(f => ({ ...f, answer: e.target.value }))}
                placeholder="Detailed answer…" className="admin-input resize-none" />
            </label>
            <div className="flex items-center gap-6">
              <label className="block">
                <span className="label-text">Display Order</span>
                <input type="number" min={0} value={form.display_order}
                  onChange={(e) => setForm(f => ({ ...f, display_order: parseInt(e.target.value) || 0 }))}
                  className="admin-input w-24" />
              </label>
              <label className="flex items-center gap-2 cursor-pointer select-none mt-5">
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
              {saving ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <><Icon name="fa-floppy-disk" /> {editing ? "Save Changes" : "Create FAQ"}</>}
            </button>
            <button onClick={cancel} className="px-5 py-3 border border-gray-200 text-earthy-brown/60 rounded-xl text-sm font-bold hover:border-royal-gold transition">Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}
