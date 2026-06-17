import { FC, useState, useMemo } from "react";
import { BLOG_POSTS } from "../data/blog";
import type { BlogPost } from "../types";

const Blog: FC = () => {
  const [category, setCategory] = useState<string>("all");

  const filtered = useMemo<BlogPost[]>(() => {
    return category === "all"
      ? BLOG_POSTS
      : BLOG_POSTS.filter((p) => p.category === category);
  }, [category]);

  return (
    <div className="bg-ivory dark:bg-slate-900 min-h-screen py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="font-serif text-5xl font-bold text-royal-maroon dark:text-white mb-12 text-center">
          Stories & Insights
        </h1>

        {/* Category Filter */}
        <div className="flex gap-4 justify-center mb-12 flex-wrap">
          {["all", "design", "craftsmanship", "culture"].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-6 py-2 rounded-lg font-bold uppercase text-sm transition ${
                category === cat
                  ? "bg-royal-gold text-royal-maroon"
                  : "bg-gray-200 dark:bg-slate-700 dark:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {filtered.map((post) => (
            <article
              key={post.id}
              className="bg-white dark:bg-slate-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition group cursor-pointer"
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition duration-300"
              />
              <div className="p-6">
                <p className="text-royal-gold text-xs font-bold uppercase tracking-wider">
                  {post.category}
                </p>
                <h3 className="font-serif text-2xl font-bold text-royal-maroon dark:text-white mt-2 mb-3">
                  {post.title}
                </h3>
                <p className="text-earthy-brown/70 dark:text-gray-300 text-sm leading-relaxed mb-4">
                  {post.content.substring(0, 120)}...
                </p>
                <div className="flex justify-between items-center text-xs text-earthy-brown/50 dark:text-gray-400">
                  <span>{post.author}</span>
                  <span>{post.date}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;