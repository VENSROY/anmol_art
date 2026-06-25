import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase, isSupabaseConfigured } from "../lib/supabase";
import { useSiteConfig } from "../hooks/useSiteConfig";
import type { Category } from "./admin/types";

// Static fallback images for categories (used until images are set in DB)
import craftImg     from "../assets/CRAFT.png";
import decorImg     from "../assets/DECOR_SCULPTURES.png";
import paintingImg  from "../assets/PAINTING_HAND_PAINTED_WOOD.png";
import furnitureImg from "../assets/FURNITURE_ROYAL_WOOD_ART.png";

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
  image_url?: string;
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
      // Fetch categories and image counts together
      const [catRes, imgRes] = await Promise.all([
        supabase.from("categories").select("*").order("created_at", { ascending: true }),
        supabase.from("stock_images").select("category"),
      ]);

      const cats: Category[] = catRes.data || [];
      const imgs = imgRes.data || [];

      const countMap: Record<string, number> = {};
      imgs.forEach((img: { category: string }) => {
        countMap[img.category] = (countMap[img.category] || 0) + 1;
      });

      setCategories(cats.map((c) => ({ ...c, count: countMap[c.name] || 0 })));
      setLoading(false);
    };
    load();
  }, []);

  const quote      = get("collections_quote");
  const quoteDesc  = get("collections_quote_desc");

  return (
    <section id="collection" className="scroll-mt-28 py-32 bg-ivory overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
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
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-2 border-royal-maroon border-t-transparent rounded-full animate-spin" />
          </div>
        ) : categories.length === 0 ? (
          // Fallback static display when no DB categories exist
          <StaticCollections navigate={navigate} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((item) => (
              <div
                key={item.id}
                onClick={() => navigate(`/collections/${item.name.toLowerCase()}`)}
                className="group relative bg-white p-4 rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer border border-royal-gold/5"
              >
                <div className="relative h-[300px] overflow-hidden rounded-2xl mb-6">
                  <img
                    src={getCategoryImage(item.name)}
                    alt={item.name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 group-hover:rotate-1"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                </div>
                <div className="px-2 pb-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-royal-maroon font-serif text-xl font-bold leading-snug max-w-[150px]">
                      {item.name}
                    </h3>
                    {item.count != null && item.count > 0 && (
                      <span className="text-royal-gold font-bold text-sm tracking-tighter">
                        {item.count}+ Designs
                      </span>
                    )}
                  </div>
                  <div className="w-0 group-hover:w-full h-0.5 bg-royal-gold transition-all duration-500" />
                  <p className="mt-4 text-[10px] uppercase tracking-[0.2em] font-bold text-earthy-brown/50 group-hover:text-royal-maroon transition-colors">
                    Explore Collection →
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Quote Banner */}
        <div className="mt-24 p-12 bg-royal-maroon rounded-[3rem] text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" aria-hidden="true" />
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
        </div>
      </div>
    </section>
  );
}

// Static fallback when DB has no categories
function StaticCollections({ navigate }: { navigate: (path: string) => void }) {
  const items = [
    { title: "Wood Craft",        count: "480+", image: craftImg,     path: "/collections/wood" },
    { title: "Decor & Sculptures",count: "250+", image: decorImg,     path: "/collections/decor" },
    { title: "Hand Painted Wood", count: "340+", image: paintingImg,  path: "/collections/painting" },
    { title: "Royal Wood Art",    count: "800+", image: furnitureImg, path: "/collections/furniture" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {items.map((item) => (
        <div
          key={item.path}
          onClick={() => navigate(item.path)}
          className="group relative bg-white p-4 rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer border border-royal-gold/5"
        >
          <div className="relative h-[300px] overflow-hidden rounded-2xl mb-6">
            <img
              src={item.image}
              alt={item.title}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 group-hover:rotate-1"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
          </div>
          <div className="px-2 pb-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-royal-maroon font-serif text-xl font-bold leading-snug max-w-[150px]">{item.title}</h3>
              <span className="text-royal-gold font-bold text-sm tracking-tighter">{item.count} Designs</span>
            </div>
            <div className="w-0 group-hover:w-full h-0.5 bg-royal-gold transition-all duration-500" />
            <p className="mt-4 text-[10px] uppercase tracking-[0.2em] font-bold text-earthy-brown/50 group-hover:text-royal-maroon transition-colors">
              Explore Collection →
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
