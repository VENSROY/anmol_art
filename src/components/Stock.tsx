import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

interface StockImage {
  id: string;
  url: string;
  category: string;
  label: string;
  created_at: string;
}

interface Category {
  id: string;
  name: string;
}

export default function Stock() {
  const [images, setImages]         = useState<StockImage[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading]       = useState<boolean>(true);
  const [filter, setFilter]         = useState<string>("All");
  const [lightbox, setLightbox]     = useState<number | null>(null);

  useEffect(() => {
    const fetchAll = async () => {
      const [imgRes, catRes] = await Promise.all([
        supabase.from("stock_images").select("*").order("created_at", { ascending: false }),
        supabase.from("categories").select("*").order("created_at", { ascending: true }),
      ]);
      if (!imgRes.error) setImages(imgRes.data || []);
      if (!catRes.error) setCategories(catRes.data || []);
      setLoading(false);
    };
    fetchAll();
  }, []);

  const allFilters = ["All", ...categories.map((c) => c.name)];
  const filtered   = filter === "All" ? images : images.filter((i) => i.category === filter);
  const catCount   = (cat: string) => images.filter((i) => i.category === cat).length;

  const openLightbox  = (i) => { setLightbox(i); document.body.style.overflow = "hidden"; };
  const closeLightbox = ()  => { setLightbox(null); document.body.style.overflow = ""; };
  const prev = (e) => { e.stopPropagation(); setLightbox((lightbox - 1 + filtered.length) % filtered.length); };
  const next = (e) => { e.stopPropagation(); setLightbox((lightbox + 1) % filtered.length); };

  return (
    <div className="bg-ivory min-h-screen">

      {/* ── Header ── */}
      <div className="bg-royal-maroon py-20 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/az-subtle.png')]" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <span className="text-royal-gold font-serif italic text-base tracking-widest block mb-3">
            ANMOL Art, Jodhpur
          </span>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">
            Our Stock Gallery
          </h1>
          <p className="text-gray-300 text-base leading-relaxed mb-8">
            Browse our handcrafted collection. Kuch bhi pasand aaye to seedha contact karein.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href="tel:+919828037575"
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 px-6 py-3 text-sm font-bold tracking-wider transition">
              <i className="fa-solid fa-phone text-royal-gold" />+91 98280 37575
            </a>
            <a href="https://wa.me/919828037575?text=Namaste! Mujhe aapke stock se kuch pasand aaya hai."
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white px-6 py-3 text-sm font-bold tracking-wider transition">
              <i className="fa-brands fa-whatsapp text-lg" />WhatsApp
            </a>
            <a href="mailto:anmolart75@gmail.com"
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 px-6 py-3 text-sm font-bold tracking-wider transition">
              <i className="fa-solid fa-envelope text-royal-gold" />Email Us
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-14">

        {/* ── Category Filter ── */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          {allFilters.map((cat) => (
            <button key={cat} onClick={() => setFilter(cat)}
              className={`px-5 py-2 text-xs font-bold uppercase tracking-widest border transition ${
                filter === cat
                  ? "bg-royal-maroon text-white border-royal-maroon"
                  : "bg-white text-royal-maroon border-royal-gold/30 hover:border-royal-maroon"
              }`}>
              {cat}
              <span className="ml-1.5 opacity-50">
                ({cat === "All" ? images.length : catCount(cat)})
              </span>
            </button>
          ))}
        </div>

        {/* ── Loading ── */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-32 gap-4">
            <div className="w-10 h-10 border-2 border-royal-maroon border-t-transparent rounded-full animate-spin" />
            <p className="text-earthy-brown/40 text-sm uppercase tracking-widest">Loading gallery...</p>
          </div>
        )}

        {/* ── Empty ── */}
        {!loading && filtered.length === 0 && (
          <div className="text-center py-32 text-earthy-brown/30">
            <i className="fa-solid fa-image text-6xl mb-4 block" />
            <p className="text-sm uppercase tracking-widest">Is category mein abhi koi image nahi hai</p>
          </div>
        )}

        {/* ── Masonry Gallery ── */}
        {!loading && filtered.length > 0 && (
          <div className="columns-2 sm:columns-3 lg:columns-4 gap-3 space-y-3">
            {filtered.map((img, i) => (
              <div key={img.id} onClick={() => openLightbox(i)}
                className="break-inside-avoid cursor-zoom-in group relative overflow-hidden rounded-xl">
                <img
                  src={img.url}
                  alt={`${img.label} – ANMOL Art Jodhpur handcrafted furniture`}
                  loading="lazy"
                  className="w-full object-cover block group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-royal-maroon/0 group-hover:bg-royal-maroon/50 transition-all duration-300 flex flex-col items-start justify-end p-3">
                  <p className="text-white text-xs font-bold opacity-0 group-hover:opacity-100 transition">
                    {img.label}
                  </p>
                  <p className="text-royal-gold text-[10px] uppercase tracking-wider opacity-0 group-hover:opacity-100 transition">
                    {img.category}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── Bottom Contact ── */}
        {!loading && (
          <div className="mt-20 border border-royal-gold/20 rounded-2xl p-10 text-center bg-white shadow-sm">
            <p className="text-royal-maroon font-serif text-2xl md:text-3xl font-bold mb-3">
              Kuch pasand aaya?
            </p>
            <p className="text-earthy-brown mb-8 max-w-lg mx-auto leading-relaxed">
              Seedha humse contact karein — phone, WhatsApp, ya email par. Hum aapko price, availability aur delivery details denge.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="tel:+919828037575"
                className="flex items-center gap-2 bg-royal-maroon text-white px-8 py-3 font-bold text-sm uppercase tracking-widest hover:bg-royal-gold hover:text-royal-maroon transition">
                <i className="fa-solid fa-phone" />Call Now
              </a>
              <a href="https://wa.me/919828037575?text=Namaste! Mujhe aapke stock se kuch pasand aaya hai."
                target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 bg-green-600 text-white px-8 py-3 font-bold text-sm uppercase tracking-widest hover:bg-green-500 transition">
                <i className="fa-brands fa-whatsapp text-lg" />WhatsApp
              </a>
              <a href="mailto:anmolart75@gmail.com"
                className="flex items-center gap-2 border border-royal-maroon text-royal-maroon px-8 py-3 font-bold text-sm uppercase tracking-widest hover:bg-royal-maroon hover:text-white transition">
                <i className="fa-solid fa-envelope" />Email Us
              </a>
            </div>
          </div>
        )}
      </div>

      {/* ── Lightbox ── */}
      {lightbox !== null && (
        <div className="fixed inset-0 z-[100] bg-black/92 flex items-center justify-center p-4"
          onClick={closeLightbox}>
          <button onClick={closeLightbox}
            className="absolute top-5 right-5 text-white text-3xl w-10 h-10 flex items-center justify-center hover:text-royal-gold transition z-10">
            <i className="fa-solid fa-xmark" />
          </button>
          <button onClick={prev}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full border border-white/30 text-white flex items-center justify-center hover:bg-white hover:text-royal-maroon transition z-10">
            <i className="fa-solid fa-chevron-left" />
          </button>
          <div className="flex flex-col items-center max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={filtered[lightbox]?.url}
              alt={filtered[lightbox]?.label}
              className="max-h-[78vh] max-w-full object-contain rounded-xl shadow-2xl"
            />
            <div className="mt-4 text-center">
              <p className="text-white font-bold text-lg">{filtered[lightbox]?.label}</p>
              <p className="text-royal-gold text-xs uppercase tracking-widest mt-1">{filtered[lightbox]?.category}</p>
              <a
                href={`https://wa.me/919828037575?text=Namaste! Mujhe ye item pasand aaya: ${filtered[lightbox]?.label}. Please price batayein.`}
                target="_blank" rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 bg-green-600 text-white px-6 py-2.5 text-sm font-bold uppercase tracking-wider hover:bg-green-500 transition rounded-full"
                onClick={(e) => e.stopPropagation()}
              >
                <i className="fa-brands fa-whatsapp" /> Enquire on WhatsApp
              </a>
            </div>
          </div>
          <button onClick={next}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full border border-white/30 text-white flex items-center justify-center hover:bg-white hover:text-royal-maroon transition z-10">
            <i className="fa-solid fa-chevron-right" />
          </button>
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white/40 text-xs tracking-widest">
            {lightbox + 1} / {filtered.length}
          </div>
        </div>
      )}
    </div>
  );
}