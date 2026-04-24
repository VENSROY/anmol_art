import React, { useState } from "react";
import craftImg from "../assets/CRAFT.png";
import decorImg from "../assets/DECOR_SCULPTURES.png";
import paintingImg from "../assets/PAINTING_HAND_PAINTED_WOOD.png";
import furnitureImg from "../assets/FURNITURE_ROYAL_WOOD_ART.png";

// ✏️ APNI SAARI STOCK IMAGES YAHAN ADD KARO
const stockImages = [
  { image: craftImg,      label: "Wood Craft"        },
  { image: decorImg,      label: "Decor & Sculpture"  },
  { image: paintingImg,   label: "Hand Painted Wood"  },
  { image: furnitureImg,  label: "Royal Wood Art"     },
  { image: craftImg,      label: "Wood Craft"        },
  { image: decorImg,      label: "Decor & Sculpture"  },
  { image: paintingImg,   label: "Hand Painted Wood"  },
  { image: furnitureImg,  label: "Royal Wood Art"     },
];

export default function Stock() {
  const [lightbox, setLightbox] = useState(null);

  const openLightbox  = (i) => { setLightbox(i); document.body.style.overflow = "hidden"; };
  const closeLightbox = ()  => { setLightbox(null); document.body.style.overflow = ""; };
  const prev = (e) => { e.stopPropagation(); setLightbox((lightbox - 1 + stockImages.length) % stockImages.length); };
  const next = (e) => { e.stopPropagation(); setLightbox((lightbox + 1) % stockImages.length); };

  return (
    <div className="bg-ivory min-h-screen">

      {/* Page Header */}
      <div className="bg-royal-maroon py-20 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/az-subtle.png')]" />
        <div className="relative z-10">
          <span className="text-royal-gold font-serif italic text-base tracking-widest block mb-3">
            ANMOL Art, Jodhpur
          </span>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">
            Our Stock Gallery
          </h1>
          <p className="text-gray-300 max-w-xl mx-auto text-base leading-relaxed">
            Browse our handcrafted collection. Kuch bhi pasand aaye to neeche diye numbers par seedha contact karein.
          </p>

          {/* Contact buttons */}
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href="tel:+919828037575"
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 px-6 py-3 text-sm font-bold tracking-wider transition"
            >
              <i className="fa-solid fa-phone text-royal-gold" />
              +91 98280 37575
            </a>
            <a
              href="https://wa.me/919828037575?text=Namaste! Mujhe aapke stock se kuch pasand aaya hai, please guide karein."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white px-6 py-3 text-sm font-bold tracking-wider transition"
            >
              <i className="fa-brands fa-whatsapp text-lg" />
              WhatsApp
            </a>
            <a
              href="mailto:anmolart75@gmail.com"
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 px-6 py-3 text-sm font-bold tracking-wider transition"
            >
              <i className="fa-solid fa-envelope text-royal-gold" />
              anmolart75@gmail.com
            </a>
          </div>
        </div>
      </div>

      {/* Photo Gallery – Masonry grid */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="columns-2 sm:columns-3 lg:columns-4 gap-3 space-y-3">
          {stockImages.map((item, i) => (
            <div
              key={i}
              onClick={() => openLightbox(i)}
              className="break-inside-avoid cursor-zoom-in group relative overflow-hidden rounded-xl"
            >
              <img
                src={item.image}
                alt={`${item.label} – ANMOL Art handcrafted furniture Jodhpur`}
                loading="lazy"
                className="w-full object-cover block group-hover:scale-105 transition duration-500"
              />
              <div className="absolute inset-0 bg-royal-maroon/0 group-hover:bg-royal-maroon/40 transition-all duration-300 flex items-center justify-center">
                <i className="fa-solid fa-magnifying-glass text-white text-2xl opacity-0 group-hover:opacity-100 transition duration-300 drop-shadow-lg" />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom contact */}
        <div className="mt-20 border border-royal-gold/20 rounded-2xl p-10 text-center bg-white shadow-sm">
          <p className="text-royal-maroon font-serif text-2xl md:text-3xl font-bold mb-3">
            Kuch pasand aaya?
          </p>
          <p className="text-earthy-brown mb-8 max-w-lg mx-auto leading-relaxed">
            Seedha humse contact karein — phone, WhatsApp, ya email par. Hum aapko price, availability aur delivery details denge.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="tel:+919828037575"
              className="flex items-center gap-2 bg-royal-maroon text-white px-8 py-3 font-bold text-sm uppercase tracking-widest hover:bg-royal-gold hover:text-royal-maroon transition duration-300"
            >
              <i className="fa-solid fa-phone" /> Call Now
            </a>
            <a
              href="https://wa.me/919828037575?text=Namaste! Mujhe aapke stock se kuch pasand aaya hai."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-green-600 text-white px-8 py-3 font-bold text-sm uppercase tracking-widest hover:bg-green-500 transition duration-300"
            >
              <i className="fa-brands fa-whatsapp text-lg" /> WhatsApp
            </a>
            <a
              href="mailto:anmolart75@gmail.com"
              className="flex items-center gap-2 border border-royal-maroon text-royal-maroon px-8 py-3 font-bold text-sm uppercase tracking-widest hover:bg-royal-maroon hover:text-white transition duration-300"
            >
              <i className="fa-solid fa-envelope" /> Email Us
            </a>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/92 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-5 right-5 text-white text-3xl w-10 h-10 flex items-center justify-center hover:text-royal-gold transition z-10"
          >
            <i className="fa-solid fa-xmark" />
          </button>
          <button
            onClick={prev}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full border border-white/30 text-white flex items-center justify-center hover:bg-white hover:text-royal-maroon transition z-10"
          >
            <i className="fa-solid fa-chevron-left" />
          </button>
          <img
            src={stockImages[lightbox].image}
            alt={stockImages[lightbox].label}
            className="max-h-[88vh] max-w-[90vw] object-contain rounded-xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            onClick={next}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full border border-white/30 text-white flex items-center justify-center hover:bg-white hover:text-royal-maroon transition z-10"
          >
            <i className="fa-solid fa-chevron-right" />
          </button>
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50 text-xs tracking-widest uppercase">
            {lightbox + 1} / {stockImages.length}
          </div>
        </div>
      )}
    </div>
  );
}