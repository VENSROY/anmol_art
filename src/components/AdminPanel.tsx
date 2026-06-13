import { useState, useEffect, useCallback } from "react";
import { supabase } from "../lib/supabase";

import AdminLogin    from "./admin/AdminLogin";
import Toast         from "./admin/Toast";
import CategoryManager from "./admin/CategoryManager";
import UploadSection from "./admin/UploadSection";
import GalleryManager from "./admin/GalleryManager";
import { StockImage, Category, ToastState } from "./admin/types";

type Tab = "gallery" | "upload" | "categories";

// ─── Stats Card ───────────────────────────────────────────────────────────────
function StatCard({ icon, value, label }: { icon: string; value: number; label: string }) {
  return (
    <div className="bg-white rounded-2xl p-5 border border-royal-gold/10 shadow-sm text-center hover:shadow-md transition">
      <i className={`fa-solid ${icon} text-royal-gold text-lg mb-2 block`} />
      <p className="text-3xl font-bold font-serif text-royal-maroon leading-none">{value}</p>
      <p className="text-[10px] uppercase tracking-widest text-earthy-brown/40 mt-1.5 leading-tight">{label}</p>
    </div>
  );
}

// ─── Main AdminPanel ──────────────────────────────────────────────────────────
export default function AdminPanel() {
  const [authed, setAuthed]         = useState(!!sessionStorage.getItem("anmol_admin"));
  const [images, setImages]         = useState<StockImage[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingImgs, setLoadingImgs] = useState(true);
  const [activeTab, setActiveTab]   = useState<Tab>("gallery");
  const [toast, setToast]           = useState<ToastState>({ message: "", type: "success" });

  const showToast = useCallback((message: string, type: ToastState["type"] = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: "", type: "success" }), 3200);
  }, []);

  // ── Fetch categories from DB ────────────────────────────────────────────────
  const fetchCategories = useCallback(async () => {
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .order("created_at", { ascending: true });
    if (!error) setCategories(data || []);
  }, []);

  // ── Fetch images ────────────────────────────────────────────────────────────
  const fetchImages = useCallback(async () => {
    setLoadingImgs(true);
    const { data, error } = await supabase
      .from("stock_images")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error) setImages(data || []);
    setLoadingImgs(false);
  }, []);

  useEffect(() => {
    if (authed) {
      fetchCategories();
      fetchImages();
    }
  }, [authed, fetchCategories, fetchImages]);

  const handleLogout = () => {
    sessionStorage.removeItem("anmol_admin");
    setAuthed(false);
  };

  if (!authed) return <AdminLogin onLogin={() => setAuthed(true)} />;

  const tabs: { id: Tab; label: string; icon: string }[] = [
    { id: "gallery",    label: "Gallery",    icon: "fa-images" },
    { id: "upload",     label: "Upload",     icon: "fa-cloud-arrow-up" },
    { id: "categories", label: "Categories", icon: "fa-tags" },
  ];

  const catCount = (cat: string) => images.filter((i) => i.category === cat).length;

  return (
    <div className="min-h-screen bg-[#F5F0E8]">
      <Toast toast={toast} />

      {/* ── Top Navbar ── */}
      <nav className="bg-royal-maroon text-white px-6 py-4 flex justify-between items-center shadow-lg sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-royal-gold/20 rounded-full flex items-center justify-center flex-shrink-0">
            <i className="fa-solid fa-crown text-royal-gold text-base" />
          </div>
          <div>
            <p className="font-serif text-lg font-bold text-white leading-none">ANMOL Art</p>
            <p className="text-white/40 text-[10px] uppercase tracking-widest leading-none mt-0.5">
              Admin Panel · {images.length} images
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="hidden sm:flex items-center gap-1.5 text-white/50 hover:text-royal-gold text-xs
              uppercase tracking-widest transition border border-white/10 hover:border-royal-gold/40
              px-3 py-1.5 rounded-lg"
          >
            <i className="fa-solid fa-arrow-up-right-from-square text-[10px]" /> View Site
          </a>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/10
              px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition text-white"
          >
            <i className="fa-solid fa-right-from-bracket" /> Logout
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">

        {/* ── Stats Row ── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          <StatCard icon="fa-images"      value={images.length}      label="Total Images" />
          <StatCard icon="fa-tags"        value={categories.length}  label="Categories" />
          {categories.slice(0, 3).map((c) => (
            <StatCard key={c.id} icon="fa-layer-group" value={catCount(c.name)} label={c.name} />
          ))}
        </div>

        {/* ── Tab Bar ── */}
        <div className="bg-white rounded-2xl border border-royal-gold/15 shadow-sm p-1.5 flex gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold
                uppercase tracking-wider transition
                ${activeTab === tab.id
                  ? "bg-royal-maroon text-white shadow-md"
                  : "text-earthy-brown/50 hover:text-royal-maroon hover:bg-[#FBF6E6]"
                }`}
            >
              <i className={`fa-solid ${tab.icon}`} />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
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

      </div>
    </div>
  );
}