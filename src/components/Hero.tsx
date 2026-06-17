import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import showroomImg from "../assets/showroom.jpg";
import craftImg from "../assets/CRAFT.png";
import decorImg from "../assets/DECOR_SCULPTURES.png";
import furnitureImg from "../assets/FURNITURE_ROYAL_WOOD_ART.png";

export default function Hero() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const slides = [
    { image: showroomImg, title: "Timeless Artistry", subtitle: "Heritage", tag: "Rajasthan Handicraft" },
    { image: furnitureImg, title: "Royal Furniture", subtitle: "Crafted", tag: "Handmade Wood Furniture" },
    { image: craftImg, title: "Authentic Wood", subtitle: "Tradition", tag: "Traditional Wood Craft" },
    { image: decorImg, title: "Divine Decor", subtitle: "Sculptures", tag: "Handcrafted Sculptures" },
  ];

  const nextSlide = useCallback(() => setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1)), [slides.length]);
  const prevSlide = useCallback(() => setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1)), [slides.length]);

  useEffect(() => {
    setLoaded(true);
    const timer = setInterval(nextSlide, 7000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <section
      id="home"
      aria-label="ANMOL Art – Handcrafted Indian Furniture & Decor from Jodhpur, Rajasthan"
      className="scroll-mt-24 min-h-screen flex items-center justify-center relative overflow-hidden group"
    >
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <div
            className={`absolute inset-0 bg-cover bg-center ${index === currentSlide ? "animate-kenburns" : ""}`}
            style={{
              backgroundImage: `linear-gradient(160deg, rgba(0,0,0,0.72) 0%, rgba(93,0,30,0.55) 100%), url(${slide.image})`,
            }}
          />
        </div>
      ))}

      {/* Decorative border overlay */}
      <div className="absolute inset-6 md:inset-10 border border-white/10 z-20 pointer-events-none rounded-sm hidden md:block" />

      {/* Content */}
      <div className={`relative z-20 text-center max-w-5xl px-6 pt-24 pb-48 md:pb-40 transition-all duration-1000 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
        
        <span className="inline-block bg-royal-gold/20 border border-royal-gold/40 text-royal-gold font-serif italic text-sm md:text-base px-6 py-2 rounded-full tracking-[0.25em] uppercase mb-6">
          Est. 2006 · Jodhpur, Rajasthan
        </span>

        <h1 className="font-serif text-white text-5xl md:text-8xl font-bold leading-[1.05] drop-shadow-2xl mb-6">
          {slides[currentSlide].title}
          <br />
          <span className="text-royal-gold italic">& {slides[currentSlide].subtitle}</span>
        </h1>

        <div className="flex items-center justify-center gap-4 mb-8">
          <span className="h-px w-16 bg-royal-gold/50" />
          <span className="text-royal-gold text-xs tracking-[0.4em] uppercase font-bold opacity-80">
            {slides[currentSlide].tag}
          </span>
          <span className="h-px w-16 bg-royal-gold/50" />
        </div>

        <p className="text-gray-200 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
          Discover the elegance of authentic Indian handicraft — curated for the modern royal home. 
          Shipped worldwide from the heart of Rajasthan.
        </p>

        <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={() => document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' })}
            className="w-full sm:w-auto px-10 py-4 bg-royal-gold text-royal-maroon font-bold uppercase tracking-[0.2em] text-sm hover:bg-white transition-all duration-300 active:scale-95 shadow-2xl"
          >
            Explore Collections
          </button>
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="w-full sm:w-auto px-10 py-4 border border-white/50 text-white font-bold uppercase tracking-[0.2em] text-sm hover:bg-white hover:text-royal-maroon transition-all duration-300 active:scale-95"
          >
            Get Quote on WhatsApp
          </button>
        </div>

        {/* Trust badges */}
        <div className="mt-12 flex flex-wrap gap-6 justify-center">
          {["5000+ Designs", "20+ Countries", "Est. 2006", "100% Handmade"].map((badge) => (
            <div key={badge} className="flex items-center gap-2 text-white/60 text-xs uppercase tracking-widest font-bold">
              <span className="w-1 h-1 bg-royal-gold rounded-full" />
              {badge}
            </div>
          ))}
        </div>
      </div>

      {/* Prev/Next */}
      <button
        onClick={prevSlide}
        aria-label="Previous slide"
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full border border-white/30 text-white flex items-center justify-center hover:bg-white hover:text-royal-maroon transition-all duration-300 focus-visible:ring-2 focus-visible:ring-royal-gold"
      >
        <i className="fa-solid fa-chevron-left" aria-hidden="true" />
      </button>
      <button
        onClick={nextSlide}
        aria-label="Next slide"
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full border border-white/30 text-white flex items-center justify-center hover:bg-white hover:text-royal-maroon transition-all duration-300 focus-visible:ring-2 focus-visible:ring-royal-gold"
      >
        <i className="fa-solid fa-chevron-right" aria-hidden="true" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-28 md:bottom-20 flex gap-3 z-30">
        {slides.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => setCurrentSlide(i)}
            className={`h-[3px] rounded-full transition-all duration-500 ${
              i === currentSlide ? "bg-royal-gold w-10" : "bg-white/30 w-4"
            }`}
          />
        ))}
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-30">
        <span className="text-royal-gold text-[10px] uppercase tracking-[0.5em] font-bold">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-royal-gold to-transparent animate-bounce" />
      </div>

      {/* kenburns animation defined globally in index.css */}
    </section>
  );
}