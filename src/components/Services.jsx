export default function Services() {
  const services = [
    {
      icon: "✈️",
      title: "Export",
      desc:
        "Reliable international shipping and handling, ensuring your artifacts arrive safely anywhere in the world.",
      highlight: true,
    },
    {
      icon: "📦",
      title: "Wholesale",
      desc:
        "Bulk supply for boutiques, hotels, and resellers at competitive rates without compromising quality.",
    },
    {
      icon: "🎁",
      title: "Corporate Gifting",
      desc:
        "Elegant, cultural gifts for your clients and employees that leave a lasting impression.",
    },
    {
      icon: "✒️",
      title: "Custom Orders",
      desc:
        "Have a specific design in mind? Our artisans can create bespoke pieces tailored to your exact specifications.",
    },
  ];

  return (
    <section
      id="services"
      className="bg-royal-maroon py-28 text-ivory scroll-mt-28"
    >
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-20">
          <h2 className="font-serif text-5xl md:text-6xl font-bold text-royal-gold">
            Our Services
          </h2>

          <div className="flex items-center justify-center mt-6">
            <span className="h-px w-24 bg-royal-gold/40"></span>
            <span className="mx-4 w-10 h-10 flex items-center justify-center border border-royal-gold bg-ivory">
              <span className="w-4 h-4 bg-royal-gold rotate-45"></span>
            </span>
            <span className="h-px w-24 bg-royal-gold/40"></span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-16">
          {services.map((item, index) => (
            <div
              key={index}
              className={`group border p-12 transition duration-300 ${
                item.highlight
                  ? "bg-white border-royal-gold scale-105"
                  : "bg-[#5a1a2a] border-royal-gold/40 hover:bg-white"
              }`}
            >
              <div
                className={`text-5xl mb-8 transition ${
                  item.highlight
                    ? "text-royal-maroon"
                    : "text-royal-gold group-hover:text-royal-maroon"
                }`}
              >
                {item.icon}
              </div>

              <h3
                className={`font-serif text-3xl font-bold mb-6 transition ${
                  item.highlight
                    ? "text-royal-maroon"
                    : "group-hover:text-royal-maroon"
                }`}
              >
                {item.title}
              </h3>

              <p
                className={`text-lg leading-relaxed transition ${
                  item.highlight
                    ? "text-earthy-brown"
                    : "opacity-90 group-hover:text-earthy-brown"
                }`}
              >
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}