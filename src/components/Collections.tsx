import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { isSupabaseConfigured } from "../lib/supabase";
import { listCategories } from "../services/categories.service";
import { getCategoryStats } from "../services/stockImages.service";
import { useSiteConfig } from "../hooks/useSiteConfig";
import Reveal from "./motion/Reveal";
import TiltCard from "./motion/TiltCard";
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
    <section id="collection" className="scroll-mt-28 py-32 bg-ivory overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-royal-gold font-serif italic text-xl block mb-2">Our Catalog</span>
            <h2 className="font-serif text-5xl md:text-6xl font-bold text-royal-maroon leading-tight">
              Curated Masterpieces
            </h2>
            <p className="mt-6 text-earthy-brown text-lg opacity-80">
              Handcrafted treasures inspired by royal Indian heritage, carved with passion and timeless knowledge passed down through generations.
            </p>
          </div>
          <div>
            <button
              onClick={() => navigate("/collections")}
              className="bg-royal-maroon text-white px-8 py-4 font-bold uppercase text-xs tracking-widest hover:bg-royal-gold hover:text-royal-maroon transition-all duration-300 shadow-lg"
            >
              View Full Stock
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((item, i) => (
              <Reveal key={item.id} delay={i * 0.08}>
                <TiltCard className="h-full">
                  <Link
                    to={`/collections/${item.name.toLowerCase()}`}
                    className="group relative flex flex-col bg-white p-4 rounded-3xl shadow-sm hover:shadow-2xl transition-shadow duration-500 border border-royal-gold/5 h-full focus-visible:ring-2 focus-visible:ring-royal-gold focus-visible:ring-offset-2"
                  >
                    <div className="relative aspect-[4/5] overflow-hidden rounded-2xl mb-6">
                      <img
                        src={item.thumbnail || getCategoryImage(item.name)}
                        alt={item.name}
                        loading="lazy"
                        decoding="async"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.07]"
                      />
                      <div className="absolute inset-0 bg-royal-maroon/15 group-hover:bg-royal-maroon/0 transition-colors duration-500" aria-hidden="true" />
                    </div>
                    <div className="px-2 pb-4 mt-auto">
                      <div className="flex justify-between items-baseline gap-3 mb-2">
                        <h3 className="text-royal-maroon font-serif text-xl font-bold leading-snug">
                          {item.name}
                        </h3>
                        {item.count != null && item.count > 0 && (
                          <span className="text-royal-gold font-bold text-xs tracking-tight whitespace-nowrap">
                            {item.count} {item.count === 1 ? "Piece" : "Pieces"}
                          </span>
                        )}
                      </div>
                      <div className="w-0 group-hover:w-full h-0.5 bg-royal-gold transition-all duration-500" aria-hidden="true" />
                      <p className="mt-4 text-[10px] uppercase tracking-[0.2em] font-bold text-earthy-brown/50 group-hover:text-royal-maroon transition-colors">
                        Explore Collection →
                      </p>
                    </div>
                  </Link>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        )}

        {/* Quote Banner */}
        <Reveal className="mt-24 p-12 bg-royal-maroon rounded-[3rem] text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" aria-hidden="true" />
          <div className="absolute -top-10 -right-10 w-56 h-56 bg-royal-gold/10 rounded-full blur-3xl animate-float-slow" aria-hidden="true" />
          <div className="relative z-10">
            <h3 className="text-royal-gold font-serif text-3xl md:text-4xl font-bold mb-6 italic">
              "{quote}"
            </h3>
            <p className="text-white/80 max-w-2xl mx-auto mb-10 text-lg">
              {quoteDesc}
            </p>
            <button
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="bg-royal-gold text-royal-maroon px-10 py-4 font-bold uppercase tracking-widest hover:bg-white transition-colors"
            >
              Start Custom Order
            </button>
          </div>
        </Reveal>
      </div>
    </section>
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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {items.map((item, i) => (
        <Reveal key={item.path} delay={i * 0.08}>
          <TiltCard className="h-full">
            <Link
              to={item.path}
              className="group relative flex flex-col bg-white p-4 rounded-3xl shadow-sm hover:shadow-2xl transition-shadow duration-500 border border-royal-gold/5 h-full focus-visible:ring-2 focus-visible:ring-royal-gold focus-visible:ring-offset-2"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl mb-6">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.07]"
                />
                <div className="absolute inset-0 bg-royal-maroon/15 group-hover:bg-royal-maroon/0 transition-colors duration-500" aria-hidden="true" />
              </div>
              <div className="px-2 pb-4 mt-auto">
                <div className="flex justify-between items-baseline gap-3 mb-2">
                  <h3 className="text-royal-maroon font-serif text-xl font-bold leading-snug">{item.title}</h3>
                  <span className="text-royal-gold font-bold text-xs tracking-tight whitespace-nowrap">{item.count} Designs</span>
                </div>
                <div className="w-0 group-hover:w-full h-0.5 bg-royal-gold transition-all duration-500" aria-hidden="true" />
                <p className="mt-4 text-[10px] uppercase tracking-[0.2em] font-bold text-earthy-brown/50 group-hover:text-royal-maroon transition-colors">
                  Explore Collection →
                </p>
              </div>
            </Link>
          </TiltCard>
        </Reveal>
      ))}
    </div>
  );
}
