import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { isSupabaseConfigured } from "../lib/supabase";
import { listStockImagesPage } from "../services/stockImages.service";
import { queryKeys } from "../constants/queryKeys";
import Reveal from "./motion/Reveal";

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
      className="scroll-mt-28 py-32 md:py-40 bg-limewash relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 relative">
        <Reveal className="grid grid-cols-12 gap-6 items-end mb-16">
          <div className="col-span-12 lg:col-span-3">
            <p className="caption text-brass">From the Workshop</p>
          </div>
          <div className="col-span-12 lg:col-span-6">
            <h2 id="gallery-heading" className="font-serif text-heading-1 text-ink font-light leading-[1.05]">
              Most recently
              <span className="italic text-brass"> finished.</span>
            </h2>
          </div>
          <div className="col-span-12 lg:col-span-3 lg:text-right">
            <p className="text-ink/50 text-sm leading-relaxed font-light">
              Carved, joined and finished by hand in Jodhpur.
            </p>
          </div>
        </Reveal>

        {/* A showroom wall: pieces hang on a staggered rhythm rather than a
            uniform grid, so the eye travels instead of scanning. */}
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
            {Array.from({ length: PREVIEW_COUNT }).map((_, i) => (
              <div
                key={i}
                className={`bg-sandstone-deep/60 animate-pulse ${i % 3 === 1 ? "aspect-[3/4]" : "aspect-[4/5]"}`}
                aria-hidden="true"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10 md:gap-y-14">
            {images.map((img, i) => (
              <Reveal key={img.id} delay={Math.min(i, 4) * 0.06} y={18}>
                {/* Every third piece hangs slightly lower, like a curated wall */}
                <div className={i % 3 === 1 ? "md:mt-12" : ""}>
                  <Link
                    to="/collections"
                    aria-label={`${img.label} — view in the full gallery`}
                    className="group block focus-visible:outline-none"
                  >
                    <div className="relative aspect-[4/5] overflow-hidden bg-sandstone-deep">
                      <img
                        src={img.url}
                        alt={`${img.label} – handcrafted by ANMOL Art, Jodhpur`}
                        loading="lazy"
                        decoding="async"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-[var(--dur-slow)] ease-craft group-hover:scale-[1.05]"
                      />
                      <div
                        className="absolute inset-0 bg-[linear-gradient(165deg,transparent_45%,rgb(var(--ink)/0.45)_100%)] opacity-60 group-hover:opacity-30 transition-opacity duration-[var(--dur-base)]"
                        aria-hidden="true"
                      />
                      <span
                        className="absolute bottom-0 left-0 h-px w-0 bg-brass transition-all duration-[var(--dur-base)] ease-craft group-hover:w-full"
                        aria-hidden="true"
                      />
                    </div>
                    {/* Catalogue label, always visible — this is a collection,
                        not a hover-to-reveal mystery box. */}
                    <div className="mt-4 flex items-baseline justify-between gap-3">
                      <p className="font-serif text-ink text-base leading-snug line-clamp-1">{img.label}</p>
                      <p className="caption text-ink/30 whitespace-nowrap">{img.category}</p>
                    </div>
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        )}

        <Reveal className="mt-20 pt-10 border-t border-ink/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6" y={16}>
          {data?.total ? (
            <p className="caption text-ink/40 tabular-nums">
              {data.total} pieces currently in stock
            </p>
          ) : <span />}
          <Link
            to="/collections"
            className="tap-safe group inline-flex items-center gap-4 py-3.5 caption text-ink hover:text-brass transition-colors duration-[var(--dur-fast)]"
          >
            Walk the Full Gallery
            <span className="h-px w-10 bg-current transition-all duration-[var(--dur-base)] ease-craft group-hover:w-20" aria-hidden="true" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
