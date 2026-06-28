import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { isSupabaseConfigured } from "../lib/supabase";
import { listCategories } from "../services/categories.service";
import { listStockImagesPage } from "../services/stockImages.service";
import { useSiteConfig } from "../hooks/useSiteConfig";
import type { StockImage, Category } from "./admin/types";

export default function Stock() {
  const { category: urlCategory } = useParams<{ category?: string }>();
  const { get } = useSiteConfig();

  const [images, setImages]         = useState<StockImage[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading]       = useState(true);
  const [filter, setFilter]         = useState<string>("All");
  const [lightbox, setLightbox]     = useState<number | null>(null);
  const [page, setPage]             = useState(0);
  const [hasMore, setHasMore]       = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  const phone    = get("phone");
  const waNumber = get("whatsapp_number");
  const email    = get("email");

  // Sync URL param → filter
  useEffect(() => {
    if (urlCategory) {
      const formatted = urlCategory.charAt(0).toUpperCase() + urlCategory.slice(1);
      setFilter(formatted);
    } else {
      setFilter("All");
    }
    setPage(0);
    setImages([]);
  }, [urlCategory]);

  // Fetch categories once
  useEffect(() => {
    if (!isSupabaseConfigured) return;
    listCategories()
      .then(setCategories)
      .catch((err) => console.error("[Stock] failed to load categories", err));
  }, []);

  // Fetch images (with pagination)
  const fetchImages = useCallback(async (currentPage: number, currentFilter: string, append: boolean) => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }
    if (currentPage === 0) setLoading(true);
    else setLoadingMore(true);

    try {
      const { images: pageImages, hasMore: more } = await listStockImagesPage(currentPage, currentFilter);
      setImages((prev) => append ? [...prev, ...pageImages] : pageImages);
      setHasMore(more);
    } catch (err) {
      console.error("[Stock] failed to load images", err);
    }

    if (currentPage === 0) setLoading(false);
    else setLoadingMore(false);
  }, []);

  useEffect(() => {
    fetchImages(0, filter, false);
  }, [filter, fetchImages]);

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchImages(nextPage, filter, true);
  };

  const allFilters = ["All", ...categories.map((c) => c.name)];
  const catCount   = (cat: string) => cat === "All" ? images.length : images.filter((i) => i.category === cat).length;

  const openLightbox  = useCallback((i: number) => {
    setLightbox(i);
    document.body.style.overflow = "hidden";
  }, []);

  const closeLightbox = useCallback(() => {
    setLightbox(null);
    document.body.style.overflow = "";
  }, []);

  const prevImg = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setLightbox((cur) => cur === null ? 0 : (cur - 1 + images.length) % images.length);
  }, [images.length]);

  const nextImg = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setLightbox((cur) => cur === null ? 0 : (cur + 1) % images.length);
  }, [images.length]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (lightbox === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") setLightbox((cur) => cur === null ? 0 : (cur - 1 + images.length) % images.length);
      if (e.key === "ArrowRight") setLightbox((cur) => cur === null ? 0 : (cur + 1) % images.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, closeLightbox, images.length]);

  // Check if url category exists in DB
  const urlCategoryNotFound = urlCategory
    && !loading
    && categories.length > 0
    && !categories.some((c) => c.name.toLowerCase() === urlCategory.toLowerCase());

  return (
    <div className="bg-ivory min-h-screen">

      {/* ── Header ── */}
      <div className="bg-royal-maroon py-20 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/az-subtle.png')]" aria-hidden="true" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <span className="text-royal-gold font-serif italic text-base tracking-widest block mb-3">ANMOL Art, Jodhpur</span>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">
            {urlCategory ? `${urlCategory.charAt(0).toUpperCase() + urlCategory.slice(1)} Collection` : "Our Stock Gallery"}
          </h1>
          <p className="text-gray-300 text-base leading-relaxed mb-8">
            Browse our handcrafted collection. Contact us directly for pricing and availability.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {phone && (
              <a href={`tel:${phone.replace(/\s/g, "")}`} aria-label="Call ANMOL Art"
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 px-6 py-3 text-sm font-bold tracking-wider transition">
                <i className="fa-solid fa-phone text-royal-gold" aria-hidden="true" /> {phone}
              </a>
            )}
            {waNumber && (
              <a href={`https://wa.me/${waNumber}?text=Namaste! I would like to enquire about your stock.`}
                target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp"
                className="flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white px-6 py-3 text-sm font-bold tracking-wider transition">
                <i className="fa-brands fa-whatsapp text-lg" aria-hidden="true" /> WhatsApp
              </a>
            )}
            {email && (
              <a href={`mailto:${email}`} aria-label="Email ANMOL Art"
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 px-6 py-3 text-sm font-bold tracking-wider transition">
                <i className="fa-solid fa-envelope text-royal-gold" aria-hidden="true" /> Email Us
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-14">

        {/* ── Category Not Found ── */}
        {urlCategoryNotFound && (
          <div className="max-w-lg mx-auto text-center py-20">
            <i className="fa-solid fa-folder-open text-royal-gold text-5xl mb-4 block" aria-hidden="true" />
            <p className="font-serif text-2xl font-bold text-royal-maroon mb-3">Category Not Found</p>
            <p className="text-earthy-brown/60 mb-6">
              The category <strong>"{urlCategory}"</strong> doesn't exist. Browse all available categories below.
            </p>
            <button onClick={() => setFilter("All")}
              className="bg-royal-maroon text-white px-8 py-3 font-bold text-sm uppercase tracking-widest hover:bg-royal-gold hover:text-royal-maroon transition">
              View All Stock
            </button>
          </div>
        )}

        {/* ── Category Filter ── */}
        {!urlCategoryNotFound && (
          <>
            <div className="flex flex-wrap gap-3 justify-center mb-12" role="group" aria-label="Filter by category">
              {allFilters.map((cat) => (
                <button key={cat} onClick={() => setFilter(cat)} aria-pressed={filter === cat}
                  className={`px-5 py-2 text-xs font-bold uppercase tracking-widest border transition ${
                    filter === cat
                      ? "bg-royal-maroon text-white border-royal-maroon"
                      : "bg-white text-royal-maroon border-royal-gold/30 hover:border-royal-maroon"
                  }`}>
                  {cat}
                  <span className="ml-1.5 opacity-50">({catCount(cat)})</span>
                </button>
              ))}
            </div>

            {/* ── Loading ── */}
            {loading && (
              <div className="flex flex-col items-center justify-center py-32 gap-4" role="status" aria-label="Loading gallery">
                <div className="w-10 h-10 border-2 border-royal-maroon border-t-transparent rounded-full animate-spin" aria-hidden="true" />
                <p className="text-earthy-brown/40 text-sm uppercase tracking-widest">Loading gallery…</p>
              </div>
            )}

            {/* ── No Supabase config ── */}
            {!loading && !isSupabaseConfigured && (
              <div className="max-w-2xl mx-auto border border-royal-gold/30 rounded-2xl p-8 text-center bg-white shadow-sm my-16">
                <i className="fa-solid fa-circle-exclamation text-royal-gold text-4xl mb-4 block" aria-hidden="true" />
                <p className="text-royal-maroon font-serif text-xl font-bold mb-2">Stock Gallery Offline</p>
                <p className="text-earthy-brown/70 text-sm leading-relaxed font-light">
                  Configure Supabase credentials in <code className="bg-ivory px-2 py-1 rounded text-xs font-mono">.env</code> to enable the gallery.
                </p>
              </div>
            )}

            {/* ── Empty state ── */}
            {!loading && isSupabaseConfigured && images.length === 0 && (
              <div className="text-center py-32 text-earthy-brown/30">
                <i className="fa-solid fa-image text-6xl mb-4 block" aria-hidden="true" />
                <p className="text-sm uppercase tracking-widest">No images in this category yet</p>
              </div>
            )}

            {/* ── Masonry Gallery ── */}
            {!loading && images.length > 0 && (
              <>
                <div className="columns-2 sm:columns-3 lg:columns-4 gap-3 space-y-3">
                  {images.map((img, i) => (
                    <div
                      key={img.id}
                      onClick={() => openLightbox(i)}
                      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openLightbox(i); } }}
                      role="button"
                      tabIndex={0}
                      aria-label={`View ${img.label} in full screen`}
                      className="break-inside-avoid cursor-zoom-in group relative overflow-hidden rounded-xl focus-visible:ring-2 focus-visible:ring-royal-gold"
                    >
                      <img
                        src={img.url}
                        alt={`${img.label} – ANMOL Art Jodhpur handcrafted furniture`}
                        loading="lazy"
                        decoding="async"
                        className="w-full object-cover block group-hover:scale-105 transition duration-500"
                      />
                      <div className="absolute inset-0 bg-royal-maroon/0 group-hover:bg-royal-maroon/50 transition-all duration-300 flex flex-col items-start justify-end p-3" aria-hidden="true">
                        <p className="text-white text-xs font-bold opacity-0 group-hover:opacity-100 transition">{img.label}</p>
                        <p className="text-royal-gold text-[10px] uppercase tracking-wider opacity-0 group-hover:opacity-100 transition">{img.category}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {hasMore && (
                  <div className="mt-12 text-center">
                    <button
                      onClick={loadMore}
                      disabled={loadingMore}
                      className="flex items-center gap-2 mx-auto bg-royal-maroon text-white px-10 py-4 font-bold uppercase tracking-widest text-sm hover:bg-royal-gold hover:text-royal-maroon transition disabled:opacity-50"
                    >
                      {loadingMore
                        ? <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Loading…</>
                        : <><i className="fa-solid fa-chevron-down" aria-hidden="true" /> Load More</>
                      }
                    </button>
                  </div>
                )}
              </>
            )}
          </>
        )}

        {/* ── Bottom Contact ── */}
        {!loading && (
          <div className="mt-20 border border-royal-gold/20 rounded-2xl p-10 text-center bg-white shadow-sm">
            <p className="text-royal-maroon font-serif text-2xl md:text-3xl font-bold mb-3">Something catch your eye?</p>
            <p className="text-earthy-brown mb-8 max-w-lg mx-auto leading-relaxed">
              Contact us directly for price, availability, and delivery details.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              {phone && (
                <a href={`tel:${phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-2 bg-royal-maroon text-white px-8 py-3 font-bold text-sm uppercase tracking-widest hover:bg-royal-gold hover:text-royal-maroon transition">
                  <i className="fa-solid fa-phone" aria-hidden="true" /> Call Now
                </a>
              )}
              {waNumber && (
                <a href={`https://wa.me/${waNumber}?text=Namaste! I found something I like in your stock gallery. Please share more details.`}
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-green-600 text-white px-8 py-3 font-bold text-sm uppercase tracking-widest hover:bg-green-500 transition">
                  <i className="fa-brands fa-whatsapp text-lg" aria-hidden="true" /> WhatsApp
                </a>
              )}
              {email && (
                <a href={`mailto:${email}`}
                  className="flex items-center gap-2 border border-royal-maroon text-royal-maroon px-8 py-3 font-bold text-sm uppercase tracking-widest hover:bg-royal-maroon hover:text-white transition">
                  <i className="fa-solid fa-envelope" aria-hidden="true" /> Email Us
                </a>
              )}
            </div>
          </div>
        )}
      </div>

      {/* ── Lightbox ── */}
      {lightbox !== null && images[lightbox] && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Image: ${images[lightbox].label}`}
          className="fixed inset-0 z-[100] bg-black/92 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button onClick={closeLightbox} aria-label="Close image viewer"
            className="absolute top-5 right-5 text-white text-3xl w-10 h-10 flex items-center justify-center hover:text-royal-gold transition z-10">
            <i className="fa-solid fa-xmark" aria-hidden="true" />
          </button>
          <button onClick={prevImg} aria-label="Previous image"
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full border border-white/30 text-white flex items-center justify-center hover:bg-white hover:text-royal-maroon transition z-10">
            <i className="fa-solid fa-chevron-left" aria-hidden="true" />
          </button>

          <div className="flex flex-col items-center max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={images[lightbox].url}
              alt={images[lightbox].label}
              className="max-h-[78vh] max-w-full object-contain rounded-xl shadow-2xl"
            />
            <div className="mt-4 text-center">
              <p className="text-white font-bold text-lg">{images[lightbox].label}</p>
              <p className="text-royal-gold text-xs uppercase tracking-widest mt-1">{images[lightbox].category}</p>
              {waNumber && (
                <a
                  href={`https://wa.me/${waNumber}?text=Namaste! I'm interested in: ${encodeURIComponent(images[lightbox].label ?? "")}. Please share price and details.`}
                  target="_blank" rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 bg-green-600 text-white px-6 py-2.5 text-sm font-bold uppercase tracking-wider hover:bg-green-500 transition rounded-full"
                  onClick={(e) => e.stopPropagation()}
                >
                  <i className="fa-brands fa-whatsapp" aria-hidden="true" /> Enquire on WhatsApp
                </a>
              )}
            </div>
          </div>

          <button onClick={nextImg} aria-label="Next image"
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full border border-white/30 text-white flex items-center justify-center hover:bg-white hover:text-royal-maroon transition z-10">
            <i className="fa-solid fa-chevron-right" aria-hidden="true" />
          </button>
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white/40 text-xs tracking-widest" aria-live="polite">
            {lightbox + 1} / {images.length}
          </div>
        </div>
      )}
    </div>
  );
}
