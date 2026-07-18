import { useState, useEffect } from "react";
import { isSupabaseConfigured } from "../lib/supabase";
import { listActiveServices } from "../services/services.service";
import { useSiteConfig } from "../hooks/useSiteConfig";
import Reveal from "./motion/Reveal";
import CursorGlow from "./motion/CursorGlow";
import Jali from "./motion/Jali";
import type { Service } from "./admin/types";
import Icon from "./ui/Icon";

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
    listActiveServices()
      .then((data) => {
        if (data.length > 0) setServices(data);
      })
      .catch((err) => console.error("[Services] failed to load services", err));
  }, []);

  const waNumber = get("whatsapp_number");

  return (
    <section
      id="services"
      className="bg-indigo-deep text-limewash py-32 md:py-40 scroll-mt-28 relative overflow-hidden"
    >
      <div className="absolute inset-0 text-brass-light pointer-events-none" aria-hidden="true">
        <Jali scale={120} opacity={0.07} />
      </div>
      <CursorGlow color="rgba(199,166,114,0.10)" size={560} />

      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
        <Reveal className="grid grid-cols-12 gap-6 mb-24">
          <div className="col-span-12 lg:col-span-3">
            <p className="caption text-brass-light">Commissions</p>
          </div>
          <div className="col-span-12 lg:col-span-8">
            <h2 className="font-serif text-heading-1 font-light">
              We furnish hotels, restaurants,
              <span className="italic text-brass-light"> and homes that expect more.</span>
            </h2>
          </div>
        </Reveal>

        {/* An indexed list, not a grid of boxes: each row is a full-width rule
            that opens on hover, the way an archive drawer slides out. */}
        <ul className="border-t border-limewash/12">
          {services.map((item, i) => (
            <Reveal key={item.id} delay={Math.min(i, 3) * 0.06} y={14}>
              <li className="group relative border-b border-limewash/12">
                <a
                  href={`https://wa.me/${waNumber}?text=${encodeURIComponent(`I am interested in ${item.title} services`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="grid grid-cols-12 gap-4 md:gap-6 items-baseline py-10 md:py-12 transition-colors duration-[var(--dur-base)] focus-visible:outline-none"
                >
                  {/* Warm wash that sweeps in from the left on hover */}
                  <span
                    className="absolute inset-y-0 left-0 w-0 bg-[linear-gradient(90deg,rgb(var(--brass)/0.14),transparent)] transition-all duration-[var(--dur-slow)] ease-craft group-hover:w-full group-focus-within:w-full"
                    aria-hidden="true"
                  />

                  <span className="relative col-span-2 md:col-span-1 caption text-brass-light/60 tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <span className="relative col-span-10 md:col-span-4">
                    <span className="flex items-center gap-4">
                      <Icon
                        name={item.icon}
                        className="text-brass-light/70 text-xl shrink-0 transition-transform duration-[var(--dur-base)] ease-craft group-hover:-translate-y-0.5"
                      />
                      <span className="font-serif text-2xl md:text-3xl font-light leading-tight">
                        {item.title}
                      </span>
                    </span>
                    <span className="caption text-limewash/30 mt-2 block md:hidden">{item.category}</span>
                  </span>

                  <span className="relative col-span-12 md:col-span-5 text-limewash/55 leading-relaxed font-light md:pr-8">
                    {item.description}
                  </span>

                  <span className="relative col-span-12 md:col-span-2 flex items-center justify-between md:justify-end gap-4">
                    <span className="caption text-limewash/30 hidden md:inline">{item.category}</span>
                    <span
                      className="caption text-brass-light opacity-0 -translate-x-2 transition-all duration-[var(--dur-base)] ease-craft group-hover:opacity-100 group-hover:translate-x-0 group-focus-within:opacity-100"
                      aria-hidden="true"
                    >
                      Enquire →
                    </span>
                  </span>
                </a>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
