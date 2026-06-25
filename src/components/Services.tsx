import { useState, useEffect } from "react";
import { supabase, isSupabaseConfigured } from "../lib/supabase";
import { useSiteConfig } from "../hooks/useSiteConfig";
import type { Service } from "./admin/types";

const FALLBACK_SERVICES: Service[] = [
  { id: "1", title: "Wholesale & Export",   description: "Reliable bulk supply and international handling for boutiques and resellers worldwide with secure packaging.",                                   icon: "fa-ship",             category: "Global",       display_order: 0, active: true, created_at: "" },
  { id: "2", title: "Hotels & Resorts",     description: "Customized royal furniture for guest rooms and lobbies that ensure your visitors feel the heritage of Rajasthan.",                              icon: "fa-hotel",            category: "B2B",          display_order: 1, active: true, created_at: "" },
  { id: "3", title: "Restaurants & Cafes",  description: "Transform your dining space into an artwork with our authentic handcrafted tables, chairs, and theme-based decor.",                            icon: "fa-utensils",         category: "B2B",          display_order: 2, active: true, created_at: "" },
  { id: "4", title: "Interior Designers",   description: "We collaborate with architects to turn unique design concepts into reality with precision and premium materials.",                              icon: "fa-compass-drafting", category: "Professional", display_order: 3, active: true, created_at: "" },
];

export default function Services() {
  const { get } = useSiteConfig();
  const [services, setServices] = useState<Service[]>(FALLBACK_SERVICES);

  useEffect(() => {
    if (!isSupabaseConfigured) return;
    supabase
      .from("services")
      .select("*")
      .eq("active", true)
      .order("display_order", { ascending: true })
      .then(({ data }) => {
        if (data && data.length > 0) setServices(data);
      });
  }, []);

  const waNumber = get("whatsapp_number");

  return (
    <section id="services" className="bg-royal-maroon py-32 text-ivory scroll-mt-28 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-royal-gold/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" aria-hidden="true" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="text-center mb-24">
          <span className="text-royal-gold font-serif italic text-xl tracking-widest block mb-4">Commercial Solutions</span>
          <h2 className="font-serif text-5xl md:text-7xl font-bold text-white">Our Expertise</h2>
          <div className="flex items-center justify-center mt-8">
            <span className="h-[1px] w-20 bg-royal-gold/30" />
            <div className="mx-4 w-12 h-12 flex items-center justify-center border border-royal-gold/50 rotate-45">
              <div className="w-6 h-6 bg-royal-gold shadow-[0_0_15px_rgba(212,175,55,0.5)]" />
            </div>
            <span className="h-[1px] w-20 bg-royal-gold/30" />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {services.map((item) => (
            <div
              key={item.id}
              className="group relative bg-[#4a0e1e] border border-royal-gold/20 p-10 md:p-14 transition-all duration-500 hover:bg-white overflow-hidden rounded-br-[4rem]"
            >
              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-100 transition-opacity">
                <span className="text-royal-gold font-bold text-xs tracking-tighter uppercase border border-royal-gold px-3 py-1">
                  {item.category}
                </span>
              </div>

              <div className="text-5xl mb-10 text-royal-gold group-hover:text-royal-maroon transition-transform duration-500 group-hover:-translate-y-2">
                <i className={`fa-solid ${item.icon}`} aria-hidden="true" />
              </div>

              <h3 className="font-serif text-3xl font-bold mb-6 text-white group-hover:text-royal-maroon transition-colors">
                {item.title}
              </h3>

              <p className="text-lg leading-relaxed text-gray-300 group-hover:text-earthy-brown transition-colors">
                {item.description}
              </p>

              <div className="mt-10 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                <a
                  href={`https://wa.me/${waNumber}?text=I am interested in ${encodeURIComponent(item.title)} services`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-royal-maroon font-bold uppercase text-sm border-b-2 border-royal-maroon pb-1 hover:text-royal-gold hover:border-royal-gold transition"
                >
                  Discuss Project
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
