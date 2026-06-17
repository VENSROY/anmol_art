import { useState, useMemo } from "react";
import Fuse from "fuse.js";
import type { Product } from "../types";

interface UseSearchReturn {
  query: string;
  setQuery: (query: string) => void;
  results: Product[];
  isSearching: boolean;
}

export function useSearch(products: Product[]): UseSearchReturn {
  const [query, setQuery] = useState<string>("");

  const fuse = useMemo(() => {
    return new Fuse(products, {
      keys: ["name", "material", "category", "tags"],
      threshold: 0.3,
      minMatchCharLength: 2,
    });
  }, [products]);

  const results = useMemo(() => {
    if (!query) return products;
    return fuse.search(query).map((res) => res.item);
  }, [query, fuse]);

  return {
    query,
    setQuery,
    results,
    isSearching: query.length > 0,
  };
}