import aboutImg from "../assets/about.png";

export default function About() {
  const stats = [
    { label: "Designs", value: "5,000+", icon: "fa-couch" },
    { label: "Experience", value: "20+ Yrs", icon: "fa-award" },
    { label: "Countries", value: "20+", icon: "fa-globe" },
    { label: "Artisans", value: "100+", icon: "fa-hands-holding-circle" },
  ];


  const pillars = [
    {
      emoji: "❤️",
      title: "100% Handcrafted",
      desc: "Every piece tells a story, crafted by master artisans with generations of skill and dedication. No machines, only human hands.",
    },
    {
      emoji: "💎",
      title: "Premium Materials",
      desc: "Sourced from the finest teak wood, pure brass, and organic materials to ensure lasting beauty and durability.",
    },
    {
      emoji: "🌍",
      title: "Global Shipping",
      desc: "Bringing the essence of Royal India to doorsteps worldwide with secure wooden crate packaging and trusted delivery.",
    },
  ];

  return (
    <section id="about" className="bg-[#FBF6E6] py-24 scroll-mt-28 relative overflow-hidden">
      {/* Subtle background ornament */}
      <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-royal-gold/5 blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl">
        {/* Main Grid */}
        <div className="grid md:grid-cols-2 gap-16 items-center mb-28">
          {/* Image Side */}
          <div className="relative group">
            <div className="absolute -top-6 -left-6 w-full h-full border-2 border-royal-gold/30 rounded-2xl group-hover:-top-4 group-hover:-left-4 transition-all duration-500 pointer-events-none" />
            <img
              src={aboutImg}
              alt="Master artisan handcrafting traditional Rajasthani wood furniture at ANMOL Art, Jodhpur"
              className="relative z-10 w-full h-[520px] object-cover rounded-2xl shadow-2xl grayscale hover:grayscale-0 transition duration-700"
            />
            <div className="absolute -bottom-10 -right-10 hidden lg:flex flex-col items-center justify-center bg-royal-maroon p-8 rounded-2xl shadow-xl z-20 border-b-4 border-royal-gold w-36 h-36">
              <p className="text-royal-gold font-serif text-3xl font-bold leading-none">Est.</p>
              <p className="text-white text-3xl font-bold leading-none mt-1">2006</p>
            </div>
          </div>

          {/* Text Side */}
          <div>
            <span className="font-serif text-royal-gold text-base tracking-[0.3em] uppercase block mb-4">
              Our Legacy
            </span>
            <h2 className="font-serif text-5xl md:text-6xl font-bold text-royal-maroon mb-8 leading-tight">
              Preserving a <br /> Dying Heritage
            </h2>
            <p className="text-earthy-brown text-lg leading-relaxed mb-5">
              Founded in the heart of Rajasthan, <strong>ANMOL Art</strong> began as a humble initiative to
              support local artisans whose skills have been passed down through centuries. We believe that
              true luxury lies in the imperfection of the handmade.
            </p>
            <p className="text-earthy-brown text-lg leading-relaxed mb-5">
              Each creation reflects patience, passion, and cultural pride — carefully crafted using
              traditional techniques that honour India's rich artistic heritage.
            </p>
            <p className="text-earthy-brown text-lg leading-relaxed mb-8">
              Through ANMOL Art, we bridge the gap between traditional Indian craftsmanship and modern
              aesthetics, bringing soulful art into contemporary homes across the world.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-8 border-t border-royal-gold/20">
              {stats.map((stat, i) => (
                <div key={i} className="text-center group">
                  <p className="text-royal-maroon text-3xl font-bold font-serif">{stat.value}</p>
                  <p className="text-earthy-brown text-[10px] uppercase tracking-[0.2em] font-bold mt-1">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pillars */}
        <div className="grid md:grid-cols-3 gap-8">
          {pillars.map((p, i) => (
            <div
              key={i}
              className="bg-white p-10 rounded-3xl shadow-sm border-b-4 border-transparent hover:border-royal-gold hover:shadow-xl transition-all duration-500 group"
            >
              <div className="w-14 h-14 bg-[#FBF6E6] rounded-full flex items-center justify-center text-2xl mb-7 group-hover:scale-110 transition">
                {p.emoji}
              </div>
              <h3 className="font-serif text-xl font-bold text-royal-maroon mb-3">{p.title}</h3>
              <p className="text-earthy-brown leading-relaxed text-sm">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}