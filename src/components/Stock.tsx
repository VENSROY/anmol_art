import { FC, useState, useMemo } from "react";
import { useSearch } from "../hooks/useSearch";
import { trackEvent } from "../hooks/useAnalytics";
import { GALLERY_IMAGES } from "../data/gallery";
import type { Product } from "../types";

interface FilterState {
  category: string;
  material: string;
  sort: "name" | "newest" | "popular";
}

const Stock: FC = () => {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [filters, setFilters] = useState<FilterState>({
    category: "all",
    material: "all",
    sort: "popular",
  });

  const { query, setQuery, results } = useSearch(GALLERY_IMAGES);

  // Apply filters
  const filtered = useMemo<Product[]>(() => {
    let items = results;

    if (filters.category !== "all") {
      items = items.filter((p) => p.category === filters.category);
    }

    if (filters.material !== "all") {
      items = items.filter((p) => p.material.toLowerCase().includes(filters.material.toLowerCase()));
    }

    // Sort
    if (filters.sort === "name") items.sort((a, b) => a.name.localeCompare(b.name));

    return items;
  }, [results, filters]);

  const openLightbox = (i: number) => {
    setLightbox(i);
    trackEvent({
      category: "Gallery",
      action: "Image Opened",
      label: filtered[i]?.name,
    });
  };

  const closeLightbox = () => setLightbox(null);

  return (
    <div className="bg-ivory dark:bg-slate-900 min-h-screen">
      {/* Header */}
      <div className="bg-royal-maroon dark:bg-slate-800 py-16 px-6 text-center">
        <h1 className="font-serif text-5xl font-bold text-white mb-4">Gallery</h1>
        <p className="text-gray-300 max-w-xl mx-auto">Explore our handcrafted collection</p>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <input
            type="text"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="px-4 py-2 border border-royal-gold/30 rounded-lg dark:bg-slate-800 dark:text-white"
          />

          <select
            value={filters.category}
            onChange={(e) => setFilters({ ...filters, category: e.target.value })}
            className="px-4 py-2 border border-royal-gold/30 rounded-lg dark:bg-slate-800 dark:text-white"
          >
            <option value="all">All Categories</option>
            <option value="wood">Wood Craft</option>
            <option value="decor">Decor</option>
            <option value="painting">Painting</option>
            <option value="furniture">Furniture</option>
          </select>

          <select
            value={filters.material}
            onChange={(e) => setFilters({ ...filters, material: e.target.value })}
            className="px-4 py-2 border border-royal-gold/30 rounded-lg dark:bg-slate-800 dark:text-white"
          >
            <option value="all">All Materials</option>
            <option value="wood">Wood</option>
            <option value="marble">Marble</option>
            <option value="stone">Stone</option>
          </select>

          <select
            value={filters.sort}
            onChange={(e) => setFilters({ ...filters, sort: e.target.value as any })}
            className="px-4 py-2 border border-royal-gold/30 rounded-lg dark:bg-slate-800 dark:text-white"
          >
            <option value="popular">Popular</option>
            <option value="newest">Newest</option>
            <option value="name">Name (A-Z)</option>
          </select>
        </div>

        {/* Gallery Grid */}
        <div className="columns-2 sm:columns-3 lg:columns-4 gap-4 space-y-4">
          {filtered.map((item, i) => (
            <div
              key={item.id}
              onClick={() => openLightbox(i)}
              className="break-inside-avoid cursor-pointer group relative overflow-hidden rounded-lg"
            >
              <img
                src={item.compressed}
                alt={item.name}
                loading="lazy"
                className="w-full object-cover group-hover:scale-110 transition duration-500"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col justify-end p-3">
                <p className="text-white font-bold text-sm">{item.name}</p>
                <p className="text-white/70 text-xs">{item.material}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white text-3xl hover:text-royal-gold transition"
          >
            ✕
          </button>

          <div className="relative max-h-[90vh] max-w-[90vw]">
            <img
              src={filtered[lightbox]?.image}
              alt={filtered[lightbox]?.name}
              className="max-h-[88vh] max-w-[85vw] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white px-4 py-2 rounded text-sm">
              {lightbox + 1} / {filtered.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Stock;