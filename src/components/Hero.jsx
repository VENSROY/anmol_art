import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import showroomImg from "../assets/showroom.jpg";
import craftImg from "../assets/CRAFT.png";
import decorImg from "../assets/DECOR_SCULPTURES.png";
import furnitureImg from "../assets/FURNITURE_ROYAL_WOOD_ART.png";

export default function Hero() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    { image: showroomImg, title: "Timeless Artistry", subtitle: "Heritage" },
    { image: furnitureImg, title: "Royal Furniture", subtitle: "Crafted" },
    { image: craftImg, title: "Authentic Wood", subtitle: "Tradition" },
    { image: decorImg, title: "Divine Decor", subtitle: "Sculptures" },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 7000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section id="home" className="scroll-mt-24 min-h-screen flex items-center justify-center relative overflow-hidden group">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1500 cubic-bezier(0.16, 1, 0.3, 1) ${
            index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <div
            className={`absolute inset-0 bg-cover bg-center ${
              index === currentSlide ? "animate-[kenburns_10s_infinite_alternate]" : ""
            }`}
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(93,0,30,0.5)), url(${slide.image})`,
            }}
          ></div>
        </div>
      ))}

      <div className="relative z-20 text-center max-w-5xl px-6 pt-24 pb-48 md:pb-40">
        <div className="animate-fade-in-up">
          <span className="text-royal-gold font-serif italic text-xl md:text-2xl mb-4 block tracking-[0.3em] uppercase opacity-90">
            Est. 2006
          </span>
          
          <h1 className="font-serif text-white text-5xl md:text-8xl font-bold leading-[1.1] drop-shadow-2xl mb-8">
            {slides[currentSlide].title} <br />
            <span className="text-royal-gold italic">& {slides[currentSlide].subtitle}</span>
          </h1>

          <div className="w-24 h-1 bg-royal-gold mx-auto mb-10"></div>

          <p className="mt-6 text-gray-200 text-lg md:text-2xl max-w-2xl mx-auto font-light leading-relaxed opacity-95">
            Discover the elegance of authentic Indian handicraft, curated for the modern royal home.
          </p>

          <div className="mt-14 flex flex-col md:flex-row gap-6 md:gap-8 justify-center items-center w-full max-w-xs md:max-w-none mx-auto">
            <button
              onClick={() => document.getElementById('collection').scrollIntoView({ behavior: 'smooth' })}
              className="w-full md:w-auto px-12 py-4 bg-royal-gold text-royal-maroon font-bold uppercase tracking-[0.2em] transition-all duration-300 hover:bg-white active:scale-95 shadow-2xl"
            >
              Explore Stock
            </button>
            <button
              onClick={() => document.getElementById('antique').scrollIntoView({ behavior: 'smooth' })}
              className="w-full md:w-auto px-12 py-4 border-2 border-white text-white font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-royal-maroon transition-all duration-500 active:scale-95 shadow-2xl"
            >
              Antique Gems
            </button>
          </div>
        </div>
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-6 md:left-10 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full border border-white/30 text-white flex items-center justify-center transition-all duration-300 hover:bg-white hover:text-royal-maroon group-hover:left-10 md:group-hover:left-16"
      >
        <i className="fa-solid fa-chevron-left text-xl"></i>
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-6 md:right-10 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full border border-white/30 text-white flex items-center justify-center transition-all duration-300 hover:bg-white hover:text-royal-maroon group-hover:right-10 md:group-hover:right-16"
      >
        <i className="fa-solid fa-chevron-right text-xl"></i>
      </button>

      <div className="absolute bottom-28 md:bottom-24 flex gap-4 z-30">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              i === currentSlide ? "bg-royal-gold w-10" : "bg-white/40"
            }`}
          ></button>
        ))}
      </div>
      
      <div className="absolute bottom-10 md:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-30">
        <span className="text-royal-gold text-[12px] md:text-[14px] uppercase tracking-[0.5em] font-bold animate-pulse-light">
          Scroll
        </span>
        <div className="w-[1.5px] h-16 bg-gradient-to-b from-royal-gold via-royal-gold/50 to-transparent animate-bounce"></div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes kenburns {
          from { transform: scale(1.1); }
          to { transform: scale(1.25); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulseLight {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 0.3; }
        }
        .animate-fade-in-up {
          animation: fadeInUp 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-pulse-light {
          animation: pulseLight 2s infinite ease-in-out;
        }
      `}} />
    </section>
  );
}