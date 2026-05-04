import { useNavigate } from "react-router-dom";
import craftImg from "../assets/CRAFT.png";
import decorImg from "../assets/DECOR_SCULPTURES.png";
import paintingImg from "../assets/PAINTING_HAND_PAINTED_WOOD.png";
import furnitureImg from "../assets/FURNITURE_ROYAL_WOOD_ART.png";

export default function Collections() {
  const navigate = useNavigate();

  const categories = [
    {
      title: "Wood Craft",
      count: "480+ Designs",
      image: craftImg,
      path: "/collections/wood",
      color: "bg-[#DEE9EF]"
    },
    {
      title: "Decor & Sculptures",
      count: "250+ Designs",
      image: decorImg,
      path: "/collections/decor",
      color: "bg-[#EEE5DB]"
    },
    {
      title: "Hand Painted Wood",
      count: "340+ Designs",
      image: paintingImg,
      path: "/collections/painting",
      color: "#F3F0D0"
    },
    {
      title: "Royal Wood Art",
      count: "800+ Designs",
      image: furnitureImg,
      path: "/collections/furniture",
      color: "bg-[#DEE9EF]"
    }
  ];

  return (
    <section id="collection" className="scroll-mt-28 py-32 bg-ivory overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-royal-gold font-serif italic text-xl block mb-2">Our Catalog</span>
            <h2 className="font-serif text-5xl md:text-6xl font-bold text-royal-maroon leading-tight">
              Curated Masterpieces
            </h2>
            <p className="mt-6 text-earthy-brown text-lg opacity-80">
              Handcrafted treasures inspired by royal Indian heritage, carved with passion and timeless knowledge passed down through generations.
            </p>
          </div>
          
          <div className="flex gap-4">
            <button
              onClick={() => navigate("/stock")}
              className="bg-royal-maroon text-white px-8 py-4 font-bold uppercase text-xs tracking-widest hover:bg-royal-gold hover:text-royal-maroon transition-all duration-300 shadow-lg"
            >
              View Full Stock
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((item, index) => (
            <div
              key={index}
              onClick={() => navigate(item.path)}
              className="group relative bg-white p-4 rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer border border-royal-gold/5"
            >
              <div className="relative h-[300px] overflow-hidden rounded-2xl mb-6">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 group-hover:rotate-1"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500"></div>
              </div>

              <div className="px-2 pb-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-royal-maroon font-serif text-xl font-bold leading-snug max-w-[150px]">
                    {item.title}
                  </h3>
                  <span className="text-royal-gold font-bold text-sm tracking-tighter">
                    {item.count}
                  </span>
                </div>
                <div className="w-0 group-hover:w-full h-0.5 bg-royal-gold transition-all duration-500"></div>
                <p className="mt-4 text-[10px] uppercase tracking-[0.2em] font-bold text-earthy-brown/50 group-hover:text-royal-maroon transition-colors">
                  Explore Collection →
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-24 p-12 bg-royal-maroon rounded-[3rem] text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
          <div className="relative z-10">
            <h3 className="text-royal-gold font-serif text-3xl md:text-4xl font-bold mb-6 italic">
              "Your Imagination, Our Creation"
            </h3>
            <p className="text-white/80 max-w-2xl mx-auto mb-10 text-lg">
              Can't find exactly what you're looking for? Our master artisans specialize in bespoke designs tailored to your specific space and style.
            </p>
            <button 
              onClick={() => document.getElementById('contact').scrollIntoView({behavior:'smooth'})}
              className="bg-royal-gold text-royal-maroon px-10 py-4 font-bold uppercase tracking-widest hover:bg-white transition-colors"
            >
              Start Custom Order
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}