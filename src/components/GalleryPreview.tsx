import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { isSupabaseConfigured } from "../lib/supabase";
import { listStockImagesPage } from "../services/stockImages.service";
import { queryKeys } from "../constants/queryKeys";
import Reveal from "./motion/Reveal";
import SectionDivider from "./motion/SectionDivider";

/** How many pieces the homepage teases before sending visitors to the full gallery. */
const PREVIEW_COUNT = 8;

/**
 * Curated glimpse of the stock gallery for the homepage.
 *
 * Deliberately *not* the full <Stock /> page: no second <h1>, no duplicate
 * contact CTA, and only PREVIEW_COUNT images fetched. The complete, filterable
 * gallery lives at /collections.
 */
export default function GalleryPreview() {
  const { data, isLoading } = useQuery({
    queryKey: queryKeys.stockPreview(PREVIEW_COUNT),
    queryFn: () => listStockImagesPage(0, "All", PREVIEW_COUNT),
    enabled: isSupabaseConfigured,
  });

  const images = data?.images ?? [];

  // Nothing to show (no DB, or an empty gallery) — omit the section entirely
  // rather than rendering an empty shell.
  if (!isLoading && images.length === 0) return null;

  return (
    <section
      id="gallery"
      aria-labelledby="gallery-heading"
      className="scroll-mt-28 py-28 md:py-32 bg-[#FBF6E6] relative overflow-hidden"
    >
      <div className="absolute -left-24 top-1/3 w-72 h-72 bg-royal-gold/5 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-6 relative">
        <Reveal className="text-center mb-14">
          <span className="text-royal-gold font-serif italic text-lg md:text-xl block mb-3">
            From the Workshop
          </span>
          <h2 id="gallery-heading" className="font-serif text-4xl md:text-5xl font-bold text-royal-maroon leading-tight">
            Latest Creations
          </h2>
          <p className="mt-5 text-earthy-brown/80 max-w-xl mx-auto leading-relaxed">
            A glimpse of the pieces most recently finished by our artisans in Jodhpur.
          </p>
          <SectionDivider className="mt-8 scale-75 origin-center" />
        </Reveal>

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
            {Array.from({ length: PREVIEW_COUNT }).map((_, i) => (
              <div
                key={i}
                className="aspect-[4/5] rounded-2xl bg-royal-maroon/5 animate-pulse"
                aria-hidden="true"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
            {images.map((img, i) => (
              <Reveal key={img.id} delay={Math.min(i, 4) * 0.06} y={18}>
                <Link
                  to="/collections"
                  aria-label={`${img.label} — view in the full gallery`}
                  className="group block relative aspect-[4/5] overflow-hidden rounded-2xl bg-royal-maroon/5 shadow-sm hover:shadow-2xl transition-shadow duration-500 focus-visible:ring-2 focus-visible:ring-royal-gold focus-visible:ring-offset-2"
                >
                  <img
                    src={img.url}
                    alt={`${img.label} – handcrafted by ANMOL Art, Jodhpur`}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.07]"
                  />
                  {/* Caption veil — only on hover/focus, so the craft stays the hero */}
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-royal-maroon/85 via-royal-maroon/10 to-transparent opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-500"
                    aria-hidden="true"
                  />
                  <div
                    className="absolute inset-x-0 bottom-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 transition-all duration-500"
                    aria-hidden="true"
                  >
                    <p className="text-white text-sm font-bold leading-snug line-clamp-2">{img.label}</p>
                    <p className="text-royal-gold text-[10px] uppercase tracking-[0.2em] font-bold mt-1">
                      {img.category}
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        )}

        <Reveal className="mt-14 text-center" y={16}>
          <Link
            to="/collections"
            className="group inline-flex items-center gap-3 bg-royal-maroon text-white px-10 py-4 font-bold uppercase tracking-[0.2em] text-xs hover:bg-royal-gold hover:text-royal-maroon transition-colors duration-300 shadow-lg"
          >
            View Full Gallery
            <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">→</span>
          </Link>
          {data?.total ? (
            <p className="mt-4 text-earthy-brown/50 text-xs uppercase tracking-[0.25em] font-bold">
              {data.total}+ pieces in stock
            </p>
          ) : null}
        </Reveal>
      </div>
    </section>
  );
}
