// Product type
export interface Product {
  id: number;
  name: string;
  category: "wood" | "decor" | "painting" | "furniture";
  image: string;
  material: string;
  size: string;
  region: string;
  availability: "In Stock" | "Out of Stock";
  tags: string[];
}

// Gallery image type
export interface GalleryImage extends Product {
  blur: string; // blur placeholder
  compressed: string; // CDN optimized version
}

// Contact form type
export interface ContactForm {
  name: string;
  email: string;
  phone: string;
  message: string;
}

// Blog post type
export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  content: string;
  date: string;
  author: string;
  image: string;
  category: string;
}

// Review type
export interface Review {
  id: number;
  name: string;
  rating: number;
  text: string;
  date: string;
  verified: boolean;
}

// Analytics event type
export interface AnalyticsEvent {
  category: string;
  action: string;
  label?: string;
  value?: number;
}