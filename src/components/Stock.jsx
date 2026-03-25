import React from "react";
import craftImg from "../assets/CRAFT.png";
import decorImg from "../assets/DECOR_SCULPTURES.png";
import paintingImg from "../assets/PAINTING_HAND_PAINTED_WOOD.png";
import furnitureImg from "../assets/FURNITURE_ROYAL_WOOD_ART.png";

export default function Stock() {
  const products = [
    {
      name: "Wooden Chair",
      price: "₹12,000",
      image: craftImg,
      status: "In Stock",
    },
    {
      name: "Decor Sculpture",
      price: "₹8,500",
      image: decorImg,
      status: "Limited",
    },
    {
      name: "Hand Painted Art",
      price: "₹6,000",
      image: paintingImg,
      status: "In Stock",
    },
    {
      name: "Royal Wooden Table",
      price: "₹25,000",
      image: furnitureImg,
      status: "Out of Stock",
    },
  ];

  const antiqueFurniture = [
    {
      name: "Maharaja Royal Sofa Set",
      description: "18th Century inspired hand-carved teak wood with gold leafing work by master artisans.",
      image: furnitureImg,
      stockStatus: "Exclusive Piece",
    },
    {
      name: "Vintage Jodhpur Almirah",
      description: "Authentic reclaimed wood with traditional brass embossing and ethnic iron handles.",
      image: craftImg,
      stockStatus: "1 Unit Left",
    }
  ];

  return (
    <div className="py-24 bg-ivory min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-royal-maroon">
            Our Available Stock
          </h1>
          <p className="mt-4 text-earthy-brown max-w-2xl mx-auto">
            Explore our ready-to-ship collection of authentic Indian handicrafts and furniture.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((item, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-md overflow-hidden group border border-royal-gold/10">
              <div className="relative overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-[260px] object-cover group-hover:scale-110 transition duration-700"
                />
                <span
                  className={`absolute top-4 left-4 px-3 py-1 text-[10px] uppercase tracking-widest font-bold rounded-full ${
                    item.status === "In Stock"
                      ? "bg-green-600 text-white"
                      : item.status === "Limited"
                      ? "bg-amber-500 text-white"
                      : "bg-red-600 text-white"
                  }`}
                >
                  {item.status}
                </span>
              </div>

              <div className="p-6">
                <h3 className="font-serif text-lg font-bold text-royal-maroon mb-1">
                  {item.name}
                </h3>
                <p className="text-xl font-semibold text-royal-gold mb-4">
                  {item.price}
                </p>
                <a
                  href={`https://wa.me/919828037575?text=I'm interested in ${item.name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center bg-royal-maroon text-white py-3 text-sm font-bold uppercase tracking-wider hover:bg-royal-gold hover:text-royal-maroon transition duration-300"
                >
                  Get Quote
                </a>
              </div>
            </div>
          ))}
        </div>

        <section className="mt-32 bg-royal-maroon rounded-[2rem] overflow-hidden relative shadow-2xl">
          <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
          
          <div className="relative z-10 flex flex-col items-center py-16 px-8">
            <div className="text-center mb-12">
              <span className="text-royal-gold font-serif italic text-lg tracking-widest block mb-2">Signature Collection</span>
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-white">Antique Masterpieces</h2>
              <div className="w-20 h-0.5 bg-royal-gold mx-auto mt-6"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 w-full">
              {antiqueFurniture.map((item, index) => (
                <div key={index} className="flex flex-col md:flex-row bg-white/10 backdrop-blur-sm border border-royal-gold/20 rounded-xl overflow-hidden group hover:border-royal-gold transition duration-500">
                  <div className="md:w-2/5 relative overflow-hidden">
                    <img 
                      src={item.image} 
                      className="w-full h-full object-cover min-h-[250px] group-hover:scale-105 transition duration-700" 
                      alt={item.name} 
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-royal-gold/90 text-royal-maroon py-1 text-center text-[10px] font-bold uppercase">
                      {item.stockStatus}
                    </div>
                  </div>

                  <div className="md:w-3/5 p-8 flex flex-col justify-center">
                    <h3 className="text-royal-gold font-serif text-2xl font-bold mb-3">{item.name}</h3>
                    <p className="text-gray-300 text-sm leading-relaxed mb-6 italic">
                      {item.description}
                    </p>
                    <a 
                      href={`https://wa.me/919828037575?text=Inquiry about Antique: ${item.name}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block w-fit border-b-2 border-royal-gold text-royal-gold pb-1 font-bold uppercase text-xs hover:text-white hover:border-white transition tracking-widest"
                    >
                      Enquire Exclusively
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}