import { useNavigate } from "react-router-dom";
import craftImg from "../assets/CRAFT.png";
import decorImg from "../assets/DECOR_SCULPTURES.png";
import paintingImg from "../assets/PAINTING_HAND_PAINTED_WOOD.png";
import furnitureImg from "../assets/FURNITURE_ROYAL_WOOD_ART.png";

export default function Collections() {
  const navigate = useNavigate();

  const collections = [
    {
      title: "Wood Craft",
      image: craftImg,
      path: "/collections/wood",
    },
    {
      title: "Decor & Sculptures",
      image: decorImg,
      path: "/collections/decor",
    },
    {
      title: "Painting & Hand Painted Wood",
      image: paintingImg,
      path: "/collections/painting",
    },
    {
      title: "Furniture / Royal Wood Art",
      image: furnitureImg,
      path: "/collections/furniture",
    },
  ];

  return (
    <section id="collection" className="scroll-mt-28 py-24 bg-ivory">
      <div className="text-center mb-20">
        <h2 className="font-serif text-4xl md:text-5xl font-bold text-royal-maroon">
          Curated Wooden Collections
        </h2>
        <p className="mt-4 text-earthy-brown max-w-2xl mx-auto">
          Handcrafted wooden masterpieces inspired by royal Indian heritage,
          carved with passion and timeless artistry.
        </p>

        <div className="mt-8 flex gap-4 justify-center">
          <button
            onClick={() => navigate("/collections")}
            className="bg-royal-gold text-royal-maroon px-8 py-3 font-bold uppercase border-2 border-royal-gold hover:bg-transparent hover:text-royal-gold transition"
          >
            Explore Designs
          </button>

          <button
            onClick={() => navigate("/stock")}
            className="px-8 py-3 font-bold uppercase border-2 border-royal-maroon text-royal-maroon hover:bg-royal-maroon hover:text-white transition"
          >
            View Stock
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto px-6">
        {collections.map((item, index) => (
          <div
            key={index}
            onClick={() => navigate(item.path)}
            className="group relative overflow-hidden rounded-2xl shadow-xl cursor-pointer"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-[360px] object-cover transition-transform duration-700 group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-royal-maroon/90 via-royal-maroon/40 to-transparent opacity-0 group-hover:opacity-100 transition duration-500 flex items-end justify-center">
              <h3 className="text-royal-gold font-serif text-2xl mb-8 tracking-wide text-center px-4">
                {item.title}
              </h3>
            </div>

            <div className="absolute inset-0 border-2 border-royal-gold opacity-0 group-hover:opacity-100 transition duration-500 rounded-2xl"></div>
          </div>
        ))}
      </div>
    </section>
  );
}