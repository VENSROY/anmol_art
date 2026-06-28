import { useState, useEffect, useCallback } from "react";
import {
  listContactSubmissions,
  setSubmissionRead,
  deleteSubmission,
} from "../../services/contactSubmissions.service";
import type { ContactSubmission, ToastState } from "./types";

interface Props {
  showToast: (msg: string, type?: ToastState["type"]) => void;
}

export default function InquiriesManager({ showToast }: Props) {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [loading, setLoading]         = useState(true);
  const [filter, setFilter]           = useState<"all" | "unread" | "read">("all");
  const [expanded, setExpanded]       = useState<string | null>(null);
  const [confirmId, setConfirmId]     = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    try {
      setSubmissions(await listContactSubmissions());
    } catch (err) {
      console.error("[InquiriesManager] failed to load submissions", err);
    }
    setLoading(false);
  }, []);

  useEffect(() => { fetch(); }, [fetch]);

  const markRead = async (id: string, read: boolean) => {
    await setSubmissionRead(id, read);
    setSubmissions((subs) => subs.map((s) => s.id === id ? { ...s, read } : s));
  };

  const remove = async (id: string) => {
    try {
      await deleteSubmission(id);
      showToast("Inquiry deleted.");
      setConfirmId(null);
      setSubmissions((subs) => subs.filter((s) => s.id !== id));
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Delete failed";
      showToast("Delete failed: " + msg, "error");
    }
  };

  const filtered = submissions.filter((s) => {
    if (filter === "unread") return !s.read;
    if (filter === "read") return s.read;
    return true;
  });

  const unreadCount = submissions.filter((s) => !s.read).length;

  const fmt = (iso: string) =>
    new Date(iso).toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-royal-gold/15 p-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h2 className="font-serif text-2xl font-bold text-royal-maroon flex items-center gap-2">
            <i className="fa-solid fa-inbox text-royal-gold" aria-hidden="true" /> Inquiries
            {unreadCount > 0 && (
              <span className="bg-royal-gold text-royal-maroon text-xs font-black px-2 py-0.5 rounded-full">
                {unreadCount} new
              </span>
            )}
          </h2>
          <p className="text-earthy-brown/40 text-xs uppercase tracking-widest mt-0.5">
            Contact form submissions from visitors
          </p>
        </div>

        <div className="flex gap-2">
          {(["all", "unread", "read"] as const).map((f) => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-full border transition
                ${filter === f ? "bg-royal-maroon text-white border-royal-maroon" : "border-gray-200 text-royal-maroon hover:border-royal-maroon"}`}>
              {f} {f === "unread" ? `(${unreadCount})` : f === "all" ? `(${submissions.length})` : `(${submissions.length - unreadCount})`}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-16">
          <div className="w-8 h-8 border-2 border-royal-maroon border-t-transparent rounded-full animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 text-earthy-brown/30">
          <i className="fa-solid fa-inbox text-5xl mb-3 block" aria-hidden="true" />
          <p className="text-sm uppercase tracking-widest">No {filter === "all" ? "" : filter} inquiries</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((s) => (
            <div key={s.id}
              className={`rounded-2xl border transition ${s.read ? "border-gray-200 bg-white" : "border-royal-gold/30 bg-[#FBF6E6]"}`}>
              <div
                className="flex items-center gap-4 p-4 cursor-pointer"
                onClick={() => {
                  setExpanded(expanded === s.id ? null : s.id);
                  if (!s.read) markRead(s.id, true);
                }}
              >
                {/* Unread dot */}
                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${s.read ? "bg-gray-300" : "bg-royal-gold"}`} />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-bold text-royal-maroon text-sm">{s.name}</p>
                    {s.email && <a href={`mailto:${s.email}`} onClick={(e) => e.stopPropagation()} className="text-xs text-royal-gold hover:underline">{s.email}</a>}
                    {s.phone && <a href={`tel:${s.phone}`} onClick={(e) => e.stopPropagation()} className="text-xs text-earthy-brown/50 hover:text-royal-maroon">{s.phone}</a>}
                  </div>
                  <p className={`text-xs mt-0.5 ${expanded === s.id ? "text-earthy-brown/60" : "text-earthy-brown/40 truncate"}`}>
                    {s.message}
                  </p>
                  <p className="text-earthy-brown/25 text-[10px] mt-1">{fmt(s.created_at)}</p>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <i className={`fa-solid fa-chevron-${expanded === s.id ? "up" : "down"} text-earthy-brown/30 text-xs`} aria-hidden="true" />
                </div>
              </div>

              {expanded === s.id && (
                <div className="border-t border-royal-gold/10 px-4 pb-4 pt-3">
                  <p className="text-earthy-brown text-sm leading-relaxed whitespace-pre-wrap mb-4">{s.message}</p>
                  <div className="flex flex-wrap gap-3">
                    {s.email && (
                      <a href={`mailto:${s.email}?subject=Re: Your enquiry to ANMOL Art`}
                        className="flex items-center gap-2 bg-royal-maroon text-white px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-royal-gold hover:text-royal-maroon transition">
                        <i className="fa-solid fa-envelope" aria-hidden="true" /> Reply by Email
                      </a>
                    )}
                    {s.phone && (
                      <a href={`https://wa.me/${s.phone.replace(/\D/g, "")}?text=Hello ${s.name}, Thank you for contacting ANMOL Art!`}
                        target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-green-500 transition">
                        <i className="fa-brands fa-whatsapp" aria-hidden="true" /> WhatsApp
                      </a>
                    )}
                    <button onClick={() => markRead(s.id, !s.read)}
                      className="flex items-center gap-2 border border-gray-200 text-earthy-brown/60 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider hover:border-royal-gold transition">
                      <i className={`fa-solid ${s.read ? "fa-envelope" : "fa-envelope-open"}`} aria-hidden="true" />
                      Mark as {s.read ? "Unread" : "Read"}
                    </button>
                    {confirmId === s.id ? (
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-red-500 font-bold">Delete?</span>
                        <button onClick={() => remove(s.id)} className="text-red-600 text-xs font-bold hover:text-red-700">Yes</button>
                        <button onClick={() => setConfirmId(null)} className="text-gray-400 text-xs font-bold">No</button>
                      </div>
                    ) : (
                      <button onClick={() => setConfirmId(s.id)}
                        className="flex items-center gap-2 border border-red-200 text-red-400 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-red-50 transition">
                        <i className="fa-solid fa-trash" aria-hidden="true" /> Delete
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
