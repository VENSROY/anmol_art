import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useSiteConfig } from "../hooks/useSiteConfig";
import Reveal from "./motion/Reveal";
import aboutImg from "../assets/about.webp";

export default function About() {
  const { get } = useSiteConfig();
  const reduceMotion = useReducedMotion();
  const imgWrapRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: imgWrapRef, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [-20, 20]);

  const stats = [
    { label: "Designs",    value: get("stat_designs"),    icon: "fa-couch" },
    { label: "Experience", value: get("stat_experience"), icon: "fa-award" },
    { label: "Countries",  value: get("stat_countries"),  icon: "fa-globe" },
    { label: "Artisans",   value: get("stat_artisans"),   icon: "fa-hands-holding-circle" },
  ];

  const pillars = [
    {
      emoji: "❤️",
      title: "100% Handcrafted",
      desc: "Every piece tells a story, crafted by master artisans with generations of skill and dedication. No machines, only human hands.",
    },
    {
      emoji: "💎",
      title: "Premium Materials",
      desc: "Sourced from the finest teak wood, pure brass, and organic materials to ensure lasting beauty and durability.",
    },
    {
      emoji: "🌍",
      title: "Global Shipping",
      desc: "Bringing the essence of Royal India to doorsteps worldwide with secure wooden crate packaging and trusted delivery.",
    },
  ];

  return (
    <section id="about" className="bg-parchment py-24 scroll-mt-28 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-brass/8 blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid md:grid-cols-2 gap-16 items-center mb-28">
          {/* Image */}
          <Reveal y={30}>
            <motion.div ref={imgWrapRef} style={{ y: reduceMotion ? 0 : imgY }} className="relative group">
              <div className="absolute -top-5 -left-5 w-full h-full border border-brass/40 group-hover:-top-3 group-hover:-left-3 transition-all duration-[var(--dur-slow)] ease-craft pointer-events-none" />
              <img
                src={aboutImg}
                alt="Master artisan handcrafting traditional Rajasthani wood furniture at ANMOL Art, Jodhpur"
                className="relative z-10 w-full h-[520px] object-cover shadow-plinth grayscale-[0.35] hover:grayscale-0 transition duration-[var(--dur-slow)]"
              />
              <div className="absolute -bottom-10 -right-10 hidden lg:flex flex-col items-center justify-center bg-indigo p-8 shadow-plinth z-20 border-b-2 border-brass w-36 h-36">
                <p className="text-brass-light font-serif text-3xl font-light leading-none">Est.</p>
                <p className="text-limewash text-3xl font-light leading-none mt-1">{get("established_year")}</p>
              </div>
            </motion.div>
          </Reveal>

          {/* Text */}
          <Reveal delay={0.15} y={30}>
            <div>
              <span className="caption text-brass block mb-5">
                Our Legacy
              </span>
              <h2 className="font-serif text-heading-1 text-ink font-light mb-8">
                {get("about_title")}
              </h2>
              <p className="text-ink/70 text-body-base font-light leading-relaxed mb-5">
                {get("about_body_1")}
              </p>
              <p className="text-ink/70 text-body-base font-light leading-relaxed mb-5">
                {get("about_body_2")}
              </p>
              <p className="text-ink/70 text-body-base font-light leading-relaxed mb-8">
                {get("about_body_3")}
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-8 border-t border-ink/15">
                {stats.map((stat, i) => (
                  <div key={i} className="text-center">
                    <p className="text-ink text-heading-2 font-serif font-light">{stat.value}</p>
                    <p className="caption text-ink/40 mt-2">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        {/* Pillars */}
        <div className="grid md:grid-cols-3 gap-8">
          {pillars.map((p, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="bg-limewash p-10 border-b border-ink/10 hover:border-brass transition-colors duration-[var(--dur-base)] group h-full">
                <div className="w-12 h-12 flex items-center justify-center text-2xl mb-7 transition-transform duration-[var(--dur-base)] ease-craft group-hover:-translate-y-1">
                  {p.emoji}
                </div>
                <h3 className="font-serif text-heading-3 text-ink font-light mb-3">{p.title}</h3>
                <p className="text-ink/60 text-body-base font-light">{p.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
