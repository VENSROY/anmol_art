import { useState, useEffect, useCallback, useRef } from "react";
import {
  motion, AnimatePresence, useScroll, useTransform,
  useMotionValue, useSpring, useReducedMotion,
} from "framer-motion";
import { isSupabaseConfigured } from "../lib/supabase";
import { listActiveHeroSlides } from "../services/heroSlides.service";
import { useSiteConfig } from "../hooks/useSiteConfig";
import Jali from "./motion/Jali";
import type { HeroSlide } from "./admin/types";

import showroomImg  from "../assets/showroom.jpg";

/**
 * Fallback frames used until the catalogue photography is available.
 *
 * Only the showroom interior is used here. The other three bundled assets
 * (CRAFT, DECOR_SCULPTURES, PAINTING_HAND_PAINTED_WOOD) are studio cut-outs on a
 * white backdrop — verified by sampling their pixels, the upper third is
 * rgb(253,254,253). Cropped into a tall arch they render as an empty panel, so
 * rotating through them makes the hero look broken rather than considered.
 *
 * Hero slides configured in the admin panel override this entirely, so adding
 * real photography needs no code change here.
 */
const FALLBACK_SLIDES = [
  { id: "f1", title: "Timeless Artistry", subtitle: "Heritage", tag: "Rajasthan Handicraft", image_url: showroomImg, display_order: 0, active: true, created_at: "" },
] satisfies HeroSlide[];

/**
 * Hero — an arched vitrine.
 *
 * Composition is a two-column editorial split rather than a full-bleed photo
 * behind text. That choice is deliberate:
 *   · The craft is the product, so the photograph gets its own bright, uncropped
 *     panel instead of being darkened to 25% behind a headline.
 *   · Type sits on flat sandstone, so contrast is guaranteed at every viewport
 *     instead of depending on whatever pixels fall behind it.
 *   · The arch is applied to a fixed-aspect panel, so it can never stretch.
 */
export default function Hero() {
  const { get } = useSiteConfig();
  const [slides, setSlides]             = useState<HeroSlide[]>(FALLBACK_SLIDES);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded]             = useState(false);

  const sectionRef   = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  // Pointer parallax — one shared position so every layer moves as one volume.
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const px = useSpring(rawX, { stiffness: 55, damping: 22, mass: 0.9 });
  const py = useSpring(rawY, { stiffness: 55, damping: 22, mass: 0.9 });

  useEffect(() => {
    if (reduceMotion) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const el = sectionRef.current;
    if (!el) return;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      rawX.set((e.clientX - r.left) / r.width - 0.5);
      rawY.set((e.clientY - r.top) / r.height - 0.5);
    };
    el.addEventListener("pointermove", onMove);
    return () => el.removeEventListener("pointermove", onMove);
  }, [reduceMotion, rawX, rawY]);

  // The photograph drifts inside its arch; the frame itself stays put, which is
  // what sells the depth — the object moves, the window does not.
  const imgX = useTransform(px, [-0.5, 0.5], [-14, 14]);
  const imgY = useTransform(py, [-0.5, 0.5], [-10, 10]);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const panelY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 90]);
  const textY  = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 40]);

  useEffect(() => {
    if (!isSupabaseConfigured) return;
    listActiveHeroSlides()
      .then((data) => {
        const withImages = data.filter((s) => s.image_url);
        if (withImages.length > 0) setSlides(withImages);
      })
      .catch((err) => console.error("[Hero] failed to load slides", err instanceof Error ? err.message : err));
  }, []);

  const nextSlide = useCallback(
    () => setCurrentSlide((p) => (p === slides.length - 1 ? 0 : p + 1)),
    [slides.length]
  );

  useEffect(() => {
    setLoaded(true);
    const timer = setInterval(nextSlide, 7000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const current = slides[currentSlide] ?? slides[0];
  const ease = [0.22, 1, 0.36, 1] as const;

  return (
    <section
      ref={sectionRef}
      id="home"
      aria-label="ANMOL Art – Handcrafted Indian Furniture & Decor from Jodhpur, Rajasthan"
      className="relative bg-sandstone scroll-mt-24 overflow-hidden"
    >
      {/* Lattice wash on the plastered wall — texture, never pattern-noise */}
      <div className="absolute inset-0 text-ink pointer-events-none" aria-hidden="true">
        <Jali scale={104} opacity={0.018} />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-12 gap-y-14 lg:gap-x-12 items-center min-h-[86svh] pt-24 pb-20 lg:pt-28 lg:pb-24">

          {/* ── Type column ─────────────────────────────────────────────── */}
          <motion.div style={{ y: textY }} className="col-span-12 lg:col-span-6 xl:col-span-5 order-2 lg:order-1">
            <motion.p
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              animate={loaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease }}
              className="caption text-brass mb-8"
            >
              {get("hero_badge")}
            </motion.p>

            <AnimatePresence mode="wait">
              <motion.h1
                key={current.id}
                initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -12 }}
                transition={{ duration: 0.65, ease }}
                className="font-serif text-display text-ink font-light"
              >
                {current.title}
                <span className="block italic text-brass">{current.subtitle}</span>
              </motion.h1>
            </AnimatePresence>

            {/* The brand name means "priceless" — stated once, quietly, on a
                flat surface where it is actually legible. */}
            <motion.div
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={loaded ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-8 flex items-center gap-4"
            >
              <span className="devanagari text-brass/70 text-2xl leading-none select-none">अनमोल</span>
              <span className="h-px w-10 bg-brass/30" aria-hidden="true" />
              <span className="caption text-ink/40">Priceless</span>
            </motion.div>

            <motion.p
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={loaded ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-8 max-w-lg text-ink/65 text-lead font-light"
            >
              {get("hero_description")}
            </motion.p>

            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={loaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.5, ease }}
              className="mt-12 flex flex-col sm:flex-row gap-6 sm:items-center"
            >
              <button
                onClick={() => document.getElementById("collection")?.scrollIntoView({ behavior: "smooth" })}
                className="bg-royal-maroon text-limewash px-10 py-5 caption hover:bg-brass hover:text-indigo-deep transition-colors duration-[var(--dur-fast)]"
              >
                View the Collection
              </button>
              <button
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                className="tap-safe group inline-flex items-center gap-3 py-3.5 caption text-ink/70 hover:text-brass transition-colors duration-[var(--dur-fast)]"
              >
                <span className="h-px w-8 bg-current transition-all duration-[var(--dur-base)] ease-craft group-hover:w-14" aria-hidden="true" />
                Commission a Piece
              </button>
            </motion.div>
          </motion.div>

          {/* ── Arched vitrine ──────────────────────────────────────────── */}
          <motion.div
            style={{ y: panelY }}
            className="col-span-12 lg:col-span-6 xl:col-start-7 xl:col-span-6 order-1 lg:order-2"
          >
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 28 }}
              animate={loaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, ease }}
              className="relative mx-auto w-full max-w-[520px] lg:max-w-none"
            >
              {/* Offset outline — the second frame that gives the panel weight */}
              <div
                className="absolute -inset-4 md:-inset-5 border border-brass/30 pointer-events-none"
                style={{ borderRadius: "999px 999px 4px 4px" }}
                aria-hidden="true"
              />

              {/* The arch. A fixed aspect ratio plus a border-radius arch means
                  the silhouette is identical at 320px and 1920px — it cannot
                  stretch the way a full-bleed SVG mask did. */}
              <div
                className="relative aspect-[4/5] sm:aspect-[3/4] overflow-hidden bg-sandstone-deep shadow-plinth"
                style={{ borderRadius: "999px 999px 2px 2px" }}
              >
                {slides.map((slide, index) => {
                  const isCurrent = index === currentSlide;
                  const isNext    = index === (currentSlide + 1) % slides.length;
                  if (!isCurrent && !isNext) return null;
                  return (
                    <motion.div
                      key={slide.id}
                      style={{ x: imgX, y: imgY }}
                      className={`absolute -inset-[5%] transition-opacity duration-[1200ms] ease-craft ${
                        isCurrent ? "opacity-100" : "opacity-0"
                      }`}
                      aria-hidden={!isCurrent}
                    >
                      <img
                        src={slide.image_url}
                        alt={isCurrent ? `${slide.title} — ${slide.tag}, handcrafted by ANMOL Art` : ""}
                        fetchPriority={index === 0 ? "high" : "low"}
                        loading={index === 0 ? "eager" : "lazy"}
                        decoding={index === 0 ? "sync" : "async"}
                        className={`w-full h-full object-cover ${isCurrent ? "animate-kenburns" : ""}`}
                      />
                    </motion.div>
                  );
                })}

                {/* Several of the catalogue photographs are shot on a white studio
                    backdrop. Cropped into a tall arch, that backdrop reads as an
                    empty panel. A multiply pass tints those flat whites to
                    sandstone while leaving carved timber essentially untouched,
                    so studio shots and room shots sit together coherently. */}
                <div
                  className="absolute inset-0 bg-sandstone/35 mix-blend-multiply"
                  aria-hidden="true"
                />
                {/* Gallery lighting: a soft warm key from the upper left and just
                    enough foot shadow to seat the piece. Light, not a blackout —
                    the craft has to stay visible. */}
                <div
                  className="absolute inset-0 bg-[radial-gradient(85%_60%_at_25%_15%,rgb(var(--brass)/0.22)_0%,transparent_60%)]"
                  aria-hidden="true"
                />
                <div
                  className="absolute inset-x-0 bottom-0 h-1/3 bg-[linear-gradient(to_top,rgb(var(--ink)/0.45),transparent)]"
                  aria-hidden="true"
                />
              </div>

              {/* Catalogue label, seated on the plinth beneath the vitrine */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0, y: -6 }}
                  transition={{ duration: 0.5, ease }}
                  className="mt-8 flex items-baseline justify-between gap-4"
                >
                  <p className="caption text-ink/45 tabular-nums">
                    {String(currentSlide + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
                  </p>
                  <p className="caption text-brass">{current.tag}</p>
                </motion.div>
              </AnimatePresence>

              {/* Progress rail doubles as the slide selector */}
              <div className="mt-4 flex gap-2" role="tablist" aria-label="Featured pieces">
                {slides.map((s, i) => (
                  <button
                    key={s.id}
                    role="tab"
                    aria-selected={i === currentSlide}
                    aria-label={`View ${s.tag}`}
                    onClick={() => setCurrentSlide(i)}
                    className="group flex-1 py-4 -my-4"
                  >
                    <span
                      className={`block h-px transition-colors duration-[var(--dur-base)] ${
                        i === currentSlide ? "bg-brass" : "bg-ink/20 group-hover:bg-ink/40"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
