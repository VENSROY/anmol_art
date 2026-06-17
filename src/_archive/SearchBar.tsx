import { FC, useState } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import { useSearch } from "../hooks/useSearch";
import { GALLERY_IMAGES } from "../data/gallery";

const SearchBar: FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { query, setQuery, results } = useSearch(GALLERY_IMAGES);

  return (
    <div className="bg-ivory dark:bg-slate-800 py-6 px-4 sticky top-20 z-40 border-b border-royal-gold/20">
      <div className="max-w-4xl mx-auto">
        <div className="relative">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-royal-gold" />
          <input
            type="text"
            placeholder="Search by name, material, category..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            className="w-full pl-12 pr-4 py-3 border border-royal-gold/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-royal-gold dark:bg-slate-700 dark:text-white dark:border-royal-gold/50"
          />
          {query && (
            <button
              onClick={() => {
                setQuery("");
                setIsOpen(false);
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-royal-maroon dark:text-gray-300 hover:text-royal-gold transition"
            >
              <FaTimes />
            </button>
          )}
        </div>

        {/* Search Results Dropdown */}
        {isOpen && query && (
          <div className="absolute top-full left-0 right-0 bg-white dark:bg-slate-700 border border-royal-gold/20 rounded-lg mt-2 shadow-lg max-h-96 overflow-y-auto z-50">
            {results.length > 0 ? (
              <div className="divide-y divide-royal-gold/10">
                {results.slice(0, 8).map((product) => (
                  <div
                    key={product.id}
                    className="p-3 hover:bg-ivory/50 dark:hover:bg-slate-600 cursor-pointer transition"
                  >
                    <p className="font-bold text-royal-maroon dark:text-white text-sm">
                      {product.name}
                    </p>
                    <p className="text-xs text-earthy-brown/60 dark:text-gray-400">
                      {product.material} • {product.category}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 text-center text-earthy-brown/50 dark:text-gray-400 text-sm">
                No results found
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;