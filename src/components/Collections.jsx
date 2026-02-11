import craftImg from "../assets/CRAFT.png";
import decorImg from "../assets/DECOR_SCULPTURES.png";
import paintingImg from "../assets/PAINTING_HAND_PAINTED_WOOD.png";
import furnitureImg from "../assets/FURNITURE_ROYAL_WOOD_ART.png";

export default function Collections() {
  const collections = [
    {
      title: "Wood Craft",
      image: craftImg,
    },
    {
      title: "Decor & Sculptures",
      image: decorImg,
    },
    {
      title: "Painting & Hand Painted Wood",
      image: paintingImg,
    },
    {
      title: "Furniture / Royal Wood Art",
      image: furnitureImg,
    },
  ];

  return (
    <section
      id="collection"
      className="scroll-mt-28 py-24 bg-ivory"
    >
      {/* Heading */}
      <div className="text-center mb-20">
        <h2 className="font-serif text-4xl md:text-5xl font-bold text-royal-maroon">
          Curated Wooden Collections
        </h2>
        <p className="mt-4 text-earthy-brown max-w-2xl mx-auto">
          Handcrafted wooden masterpieces inspired by royal Indian heritage,
          carved with passion and timeless artistry.
        </p>
      </div>

      {/* Collection Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto px-6">
        {collections.map((item, index) => (
          <div
            key={index}
            className="group relative overflow-hidden rounded-2xl shadow-xl cursor-pointer"
          >
            {/* Image */}
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-[360px] object-cover transition-transform duration-700 group-hover:scale-110"
            />

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-royal-maroon/90 via-royal-maroon/40 to-transparent opacity-0 group-hover:opacity-100 transition duration-500 flex items-end justify-center">
              <h3 className="text-royal-gold font-serif text-2xl mb-8 tracking-wide text-center px-4">
                {item.title}
              </h3>
            </div>

            {/* Gold Border */}
            <div className="absolute inset-0 border-2 border-royal-gold opacity-0 group-hover:opacity-100 transition duration-500 rounded-2xl"></div>
          </div>
        ))}
      </div>
    </section>
  );
}
