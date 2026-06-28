import { useState, useEffect, useCallback } from "react";
import { isSupabaseConfigured } from "../lib/supabase";
import { useAuth } from "../context/AuthContext";
import { listCategories } from "../services/categories.service";
import { listAllStockImages } from "../services/stockImages.service";
import { countUnreadSubmissions } from "../services/contactSubmissions.service";

import AdminLogin      from "./admin/AdminLogin";
import Toast           from "./admin/Toast";
import GalleryManager  from "./admin/GalleryManager";
import UploadSection   from "./admin/UploadSection";
import CategoryManager from "./admin/CategoryManager";
import HeroManager     from "./admin/HeroManager";
import ServicesManager from "./admin/ServicesManager";
import FAQManager      from "./admin/FAQManager";
import SiteSettingsManager from "./admin/SiteSettingsManager";
import InquiriesManager    from "./admin/InquiriesManager";
import type { StockImage, Category, ToastState } from "./admin/types";

type Tab = "gallery" | "upload" | "categories" | "hero" | "services" | "faq" | "settings" | "inquiries";

function StatCard({ icon, value, label }: { icon: string; value: number | string; label: string }) {
  return (
    <div className="bg-white rounded-2xl p-5 border border-royal-gold/10 shadow-sm text-center hover:shadow-md transition">
      <i className={`fa-solid ${icon} text-royal-gold text-lg mb-2 block`} aria-hidden="true" />
      <p className="text-3xl font-bold font-serif text-royal-maroon leading-none">{value}</p>
      <p className="text-[10px] uppercase tracking-widest text-earthy-brown/40 mt-1.5 leading-tight">{label}</p>
    </div>
  );
}

export default function AdminPanel() {
  const { session, role, loading: authLoading, signOut } = useAuth();
  const [images, setImages]         = useState<StockImage[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingImgs, setLoadingImgs] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);
  const [activeTab, setActiveTab]   = useState<Tab>("gallery");
  const [toast, setToast]           = useState<ToastState>({ message: "", type: "success" });

  const showToast = useCallback((message: string, type: ToastState["type"] = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: "", type: "success" }), 3200);
  }, []);

  const fetchCategories = useCallback(async () => {
    if (!isSupabaseConfigured) return;
    try {
      setCategories(await listCategories());
    } catch (err) {
      console.error("[AdminPanel] failed to load categories", err);
    }
  }, []);

  const fetchImages = useCallback(async () => {
    if (!isSupabaseConfigured) { setLoadingImgs(false); return; }
    setLoadingImgs(true);
    try {
      setImages(await listAllStockImages());
    } catch (err) {
      console.error("[AdminPanel] failed to load images", err);
    }
    setLoadingImgs(false);
  }, []);

  const fetchUnread = useCallback(async () => {
    if (!isSupabaseConfigured) return;
    try {
      setUnreadCount(await countUnreadSubmissions());
    } catch (err) {
      console.error("[AdminPanel] failed to load unread count", err);
    }
  }, []);

  useEffect(() => {
    if (session) {
      fetchCategories();
      fetchImages();
      fetchUnread();
    }
  }, [session, fetchCategories, fetchImages, fetchUnread]);

  const handleLogout = async () => {
    await signOut();
  };

  // ── Loading auth state ──────────────────────────────────────────────────────
  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#1a0a12] flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-royal-gold border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // ── Not logged in ───────────────────────────────────────────────────────────
  if (!session) {
    return <AdminLogin onLogin={() => { /* session listener handles it */ }} />;
  }

  const tabs: { id: Tab; label: string; icon: string; badge?: number }[] = [
    { id: "gallery",    label: "Gallery",    icon: "fa-images" },
    { id: "upload",     label: "Upload",     icon: "fa-cloud-arrow-up" },
    { id: "categories", label: "Categories", icon: "fa-tags" },
    { id: "hero",       label: "Hero",       icon: "fa-panorama" },
    { id: "services",   label: "Services",   icon: "fa-briefcase" },
    { id: "faq",        label: "FAQ",        icon: "fa-circle-question" },
    { id: "inquiries",  label: "Inquiries",  icon: "fa-inbox", badge: unreadCount },
    { id: "settings",   label: "Settings",   icon: "fa-gear" },
  ];

  const catCount = (cat: string) => images.filter((i) => i.category === cat).length;

  return (
    <div className="min-h-screen bg-[#F5F0E8]">
      <Toast toast={toast} />

      {/* ── Top Navbar ── */}
      <nav className="bg-royal-maroon text-white px-6 py-4 flex justify-between items-center shadow-lg sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-royal-gold/20 rounded-full flex items-center justify-center flex-shrink-0">
            <i className="fa-solid fa-crown text-royal-gold text-base" aria-hidden="true" />
          </div>
          <div>
            <p className="font-serif text-lg font-bold text-white leading-none">ANMOL Art</p>
            <p className="text-white/40 text-[10px] uppercase tracking-widest leading-none mt-0.5">
              Admin Panel
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden sm:flex flex-col items-end leading-tight max-w-[200px]">
            <span className="text-white/40 text-xs truncate max-w-[200px]">{session.user.email}</span>
            {role && (
              <span className="text-royal-gold/70 text-[10px] uppercase tracking-widest">
                {role.replace("_", " ")}
              </span>
            )}
          </span>
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="hidden sm:flex items-center gap-1.5 text-white/50 hover:text-royal-gold text-xs
              uppercase tracking-widest transition border border-white/10 hover:border-royal-gold/40
              px-3 py-1.5 rounded-lg"
          >
            <i className="fa-solid fa-arrow-up-right-from-square text-[10px]" aria-hidden="true" /> View Site
          </a>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/10
              px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition text-white"
          >
            <i className="fa-solid fa-right-from-bracket" aria-hidden="true" /> Logout
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">

        {/* ── Supabase Warning ── */}
        {!isSupabaseConfigured && (
          <div className="bg-red-50 border border-red-200/60 text-red-800 rounded-2xl p-6 shadow-sm text-center">
            <i className="fa-solid fa-triangle-exclamation text-red-600 text-3xl mb-2 block" aria-hidden="true" />
            <p className="font-serif text-lg font-bold text-royal-maroon mb-1">Missing Supabase Configuration</p>
            <p className="text-xs text-earthy-brown/80 max-w-lg mx-auto font-light leading-relaxed">
              Set <code className="bg-white/60 px-1.5 py-0.5 rounded font-mono text-[10px]">VITE_SUPABASE_URL</code> and{" "}
              <code className="bg-white/60 px-1.5 py-0.5 rounded font-mono text-[10px]">VITE_SUPABASE_ANON_KEY</code> in your{" "}
              <code className="bg-white/60 px-1.5 py-0.5 rounded font-mono text-[10px]">.env</code> file.
            </p>
          </div>
        )}

        {/* ── Stats ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
          <StatCard icon="fa-images"   value={images.length}      label="Total Images" />
          <StatCard icon="fa-tags"     value={categories.length}  label="Categories" />
          <StatCard icon="fa-inbox"    value={unreadCount}        label="New Inquiries" />
          {categories.slice(0, 3).map((c) => (
            <StatCard key={c.id} icon="fa-layer-group" value={catCount(c.name)} label={c.name} />
          ))}
        </div>

        {/* ── Tab Bar (scrollable on mobile) ── */}
        <div className="bg-white rounded-2xl border border-royal-gold/15 shadow-sm p-1.5">
          <div className="flex gap-1 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex-shrink-0 flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl text-sm font-bold
                  uppercase tracking-wider transition whitespace-nowrap
                  ${activeTab === tab.id
                    ? "bg-royal-maroon text-white shadow-md"
                    : "text-earthy-brown/50 hover:text-royal-maroon hover:bg-[#FBF6E6]"
                  }`}
              >
                <i className={`fa-solid ${tab.icon}`} aria-hidden="true" />
                <span className="hidden sm:inline">{tab.label}</span>
                {tab.badge != null && tab.badge > 0 && (
                  <span className={`text-[9px] font-black px-1.5 py-0.5 rounded-full leading-none
                    ${activeTab === tab.id ? "bg-royal-gold text-royal-maroon" : "bg-royal-maroon text-white"}`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* ── Tab Content ── */}
        {activeTab === "gallery" && (
          <GalleryManager
            images={images}
            categories={categories}
            loading={loadingImgs}
            onRefresh={fetchImages}
            showToast={showToast}
          />
        )}
        {activeTab === "upload" && (
          <UploadSection
            categories={categories}
            onUploaded={fetchImages}
            showToast={showToast}
          />
        )}
        {activeTab === "categories" && (
          <CategoryManager
            categories={categories}
            onCategoriesChange={() => { fetchCategories(); fetchImages(); }}
            showToast={showToast}
          />
        )}
        {activeTab === "hero" && (
          <HeroManager showToast={showToast} />
        )}
        {activeTab === "services" && (
          <ServicesManager showToast={showToast} />
        )}
        {activeTab === "faq" && (
          <FAQManager showToast={showToast} />
        )}
        {activeTab === "inquiries" && (
          <InquiriesManager showToast={showToast} />
        )}
        {activeTab === "settings" && (
          <SiteSettingsManager showToast={showToast} />
        )}

      </div>
    </div>
  );
}
