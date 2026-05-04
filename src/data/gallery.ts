import type { GalleryImage } from "../types";

export const GALLERY_IMAGES: GalleryImage[] = [
  {
    id: 1,
    name: "Hand-Carved Chair",
    category: "furniture",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800",
    compressed: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=60",
    blur: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCBmaWxsPSIjZTVlN2ViIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIi8+PC9zdmc+",
    material: "Sheesham Wood",
    size: "36\" H × 24\" W",
    region: "Jodhpur",
    availability: "In Stock",
    tags: ["wood", "chair", "handmade"],
  },
  {
    id: 2,
    name: "Stone Sculpture",
    category: "decor",
    image: "https://images.unsplash.com/photo-1578500494198-246f612d03b3?w=800",
    compressed: "https://images.unsplash.com/photo-1578500494198-246f612d03b3?w=400&q=60",
    blur: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCBmaWxsPSIjZTVlN2ViIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIi8+PC9zdmc+",
    material: "Marble",
    size: "12\" H",
    region: "Jaipur",
    availability: "In Stock",
    tags: ["sculpture", "marble", "decor"],
  },
];