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

  return (
    <div className="py-24 bg-ivory min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-royal-maroon text-center mb-16">
          Our Available Stock
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {products.map((item, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden group">
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-[260px] object-cover group-hover:scale-105 transition duration-500"
                />

                <span
                  className={`absolute top-3 left-3 px-3 py-1 text-xs font-bold rounded-full ${
                    item.status === "In Stock"
                      ? "bg-green-600 text-white"
                      : item.status === "Limited"
                      ? "bg-yellow-500 text-black"
                      : "bg-red-600 text-white"
                  }`}
                >
                  {item.status}
                </span>
              </div>

              <div className="p-6">
                <h3 className="font-serif text-xl font-bold text-royal-maroon mb-2">
                  {item.name}
                </h3>

                <p className="text-lg text-earthy-brown mb-4">
                  {item.price}
                </p>

                <a
                  href="https://wa.me/919828037575"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center bg-royal-gold text-royal-maroon py-2 font-bold uppercase border-2 border-royal-gold hover:bg-transparent hover:text-royal-gold transition"
                >
                  Get Quote
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}