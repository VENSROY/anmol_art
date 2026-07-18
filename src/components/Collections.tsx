import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { isSupabaseConfigured } from "../lib/supabase";
import { listCategories } from "../services/categories.service";
import { getCategoryStats } from "../services/stockImages.service";
import { useSiteConfig } from "../hooks/useSiteConfig";
import Reveal from "./motion/Reveal";
import Plinth from "./motion/Plinth";
import Jali from "./motion/Jali";
import type { Category } from "./admin/types";

// Static fallback images for categories (used until images are set in DB)
import craftImg     from "../assets/CRAFT.webp";
import decorImg     from "../assets/DECOR_SCULPTURES.webp";
import paintingImg  from "../assets/PAINTING_HAND_PAINTED_WOOD.webp";
import furnitureImg from "../assets/FURNITURE_ROYAL_WOOD_ART.webp";

const FALLBACK_CATEGORY_IMAGES: Record<string, string> = {
  wood:      craftImg,
  craft:     craftImg,
  decor:     decorImg,
  sculpture: decorImg,
  painting:  paintingImg,
  furniture: furnitureImg,
};

function getCategoryImage(name: string): string {
  const key = name.toLowerCase().split(/[\s_]+/)[0];
  return FALLBACK_CATEGORY_IMAGES[key] ?? craftImg;
}

interface CategoryWithMeta extends Category {
  /** Newest piece in this category, used as the card thumbnail. */
  thumbnail?: string;
  count?: number;
}

export default function Collections() {
  const navigate = useNavigate();
  const { get }  = useSiteConfig();
  const [categories, setCategories] = useState<CategoryWithMeta[]>([]);
  const [loading, setLoading]       = useState(true);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }
    const load = async () => {
      try {
        // Categories plus per-category counts and thumbnails
        const [cats, statMap] = await Promise.all([
          listCategories(),
          getCategoryStats(),
        ]);
        setCategories(
          cats.map((c) => ({
            ...c,
            count: statMap[c.name]?.count ?? 0,
            thumbnail: statMap[c.name]?.thumbnail,
          }))
        );
      } catch (err) {
        console.error("[Collections] failed to load categories", err instanceof Error ? err.message : err);
      }
      setLoading(false);
    };
    load();
  }, []);

  const quote      = get("collections_quote");
  const quoteDesc  = get("collections_quote_desc");

  return (
    <section id="collection" className="scroll-mt-28 py-32 md:py-40 bg-sandstone overflow-hidden relative">
      {/* Faint lattice wash — light through a screen onto a plastered wall */}
      <div className="absolute inset-0 text-ink pointer-events-none" aria-hidden="true">
        <Jali scale={140} opacity={0.035} />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 relative">
        {/* Editorial header: the label sits in the left column, the statement
            spans the centre, deliberately not centred. */}
        <Reveal className="grid grid-cols-12 gap-6 items-end mb-20">
          <div className="col-span-12 lg:col-span-3">
            <p className="caption text-brass">The Collections</p>
            <p className="caption text-ink/35 mt-2 tabular-nums">
              {categories.length > 0 ? String(categories.length).padStart(2, "0") : "04"} Disciplines
            </p>
          </div>
          <div className="col-span-12 lg:col-span-6">
            <h2 className="font-serif text-heading-1 text-ink font-light">
              Each piece leaves the
              <span className="italic text-brass"> workshop once.</span>
            </h2>
          </div>
          <div className="col-span-12 lg:col-span-3 lg:text-right">
            <button
              onClick={() => navigate("/collections")}
              className="tap-safe group inline-flex items-center gap-3 py-3.5 caption text-ink hover:text-brass transition-colors duration-[var(--dur-fast)]"
            >
              Full Catalogue
              <span className="h-px w-8 bg-current transition-all duration-[var(--dur-base)] ease-craft group-hover:w-14" aria-hidden="true" />
            </button>
          </div>
        </Reveal>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-2 border-royal-maroon border-t-transparent rounded-full animate-spin" />
          </div>
        ) : categories.length === 0 ? (
          // Fallback static display when no DB categories exist
          <StaticCollections />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-14">
            {categories.map((item, i) => (
              <Reveal key={item.id} delay={i * 0.08}>
                <CollectionPlinth
                  index={i}
                  name={item.name}
                  count={item.count}
                  image={item.thumbnail || getCategoryImage(item.name)}
                  to={`/collections/${item.name.toLowerCase()}`}
                />
              </Reveal>
            ))}
          </div>
        )}

        {/* Commission — an indigo inset, like stepping into a darker room */}
        <Reveal className="mt-32 relative overflow-hidden bg-indigo text-limewash">
          <div className="absolute inset-0 text-brass-light pointer-events-none" aria-hidden="true">
            <Jali scale={110} opacity={0.12} />
          </div>
          <div className="absolute inset-0 bg-[radial-gradient(90%_140%_at_88%_15%,rgb(var(--brass)/0.22)_0%,transparent_60%)]" aria-hidden="true" />

          <div className="relative grid grid-cols-12 gap-6 px-8 py-20 md:px-16 md:py-28">
            <div className="col-span-12 lg:col-span-2">
              <p className="caption text-brass-light/70">Bespoke</p>
            </div>
            <div className="col-span-12 lg:col-span-7">
              <h3 className="font-serif text-3xl md:text-5xl font-light leading-[1.1]">
                “{quote}”
              </h3>
              <p className="mt-8 text-limewash/65 text-lg leading-relaxed max-w-xl font-light">
                {quoteDesc}
              </p>
              <button
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                className="tap-safe group mt-12 inline-flex items-center gap-4 py-3.5 caption text-brass-light hover:text-limewash transition-colors duration-[var(--dur-fast)]"
              >
                Begin a Commission
                <span className="h-px w-10 bg-current transition-all duration-[var(--dur-base)] ease-craft group-hover:w-20" aria-hidden="true" />
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/**
 * A collection presented as an object on a museum plinth: the piece lifts on
 * hover above a contact shadow, and the label below is catalogue typography
 * rather than a card title — number, name, material count.
 */
function CollectionPlinth({
  index, name, count, image, to,
}: {
  index: number;
  name: string;
  count?: number;
  image: string;
  to: string;
}) {
  return (
    <Plinth>
      <Link
        to={to}
        className="group block focus-visible:outline-none"
        aria-label={`${name} collection${count ? `, ${count} pieces` : ""}`}
      >
        {/* The object. Hard-edged — a plinth, not a rounded card. */}
        <div className="relative aspect-[4/5] overflow-hidden bg-sandstone-deep">
          <img
            src={image}
            alt={name}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-[var(--dur-slow)] ease-craft group-hover:scale-[1.05]"
          />
          {/* Gallery lighting: a soft top-left key light that strengthens on hover */}
          <div
            className="absolute inset-0 bg-[linear-gradient(160deg,transparent_35%,rgb(var(--ink)/0.5)_100%)] opacity-70 group-hover:opacity-45 transition-opacity duration-[var(--dur-base)]"
            aria-hidden="true"
          />
          {/* Brass reveal line drawn along the base on hover */}
          <span
            className="absolute bottom-0 left-0 h-px w-0 bg-brass-light transition-all duration-[var(--dur-base)] ease-craft group-hover:w-full"
            aria-hidden="true"
          />
        </div>

        {/* Museum label */}
        <div className="mt-5 flex items-baseline justify-between gap-4">
          <div>
            <p className="caption text-brass tabular-nums">
              No. {String(index + 1).padStart(2, "0")}
            </p>
            <h3 className="font-serif text-2xl text-ink font-light mt-1.5 leading-tight">
              {name}
            </h3>
          </div>
          {count != null && count > 0 && (
            <p className="caption text-ink/35 tabular-nums whitespace-nowrap">
              {count} {count === 1 ? "Piece" : "Pieces"}
            </p>
          )}
        </div>
      </Link>
    </Plinth>
  );
}

// Static fallback when DB has no categories
function StaticCollections() {
  const items = [
    { title: "Wood Craft",        count: "480+", image: craftImg,     path: "/collections/wood" },
    { title: "Decor & Sculptures",count: "250+", image: decorImg,     path: "/collections/decor" },
    { title: "Hand Painted Wood", count: "340+", image: paintingImg,  path: "/collections/painting" },
    { title: "Royal Wood Art",    count: "800+", image: furnitureImg, path: "/collections/furniture" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-14">
      {items.map((item, i) => (
        <Reveal key={item.path} delay={i * 0.08}>
          <CollectionPlinth
            index={i}
            name={item.title}
            image={item.image}
            to={item.path}
          />
        </Reveal>
      ))}
    </div>
  );
}
