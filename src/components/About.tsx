import { useSiteConfig } from "../hooks/useSiteConfig";
import aboutImg from "../assets/about.png";

export default function About() {
  const { get } = useSiteConfig();

  const stats = [
    { label: "Designs",    value: get("stat_designs"),    icon: "fa-couch" },
    { label: "Experience", value: get("stat_experience"), icon: "fa-award" },
    { label: "Countries",  value: get("stat_countries"),  icon: "fa-globe" },
    { label: "Artisans",   value: get("stat_artisans"),   icon: "fa-hands-holding-circle" },
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
      <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-royal-gold/5 blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid md:grid-cols-2 gap-16 items-center mb-28">
          {/* Image */}
          <div className="relative group">
            <div className="absolute -top-6 -left-6 w-full h-full border-2 border-royal-gold/30 rounded-2xl group-hover:-top-4 group-hover:-left-4 transition-all duration-500 pointer-events-none" />
            <img
              src={aboutImg}
              alt="Master artisan handcrafting traditional Rajasthani wood furniture at ANMOL Art, Jodhpur"
              className="relative z-10 w-full h-[520px] object-cover rounded-2xl shadow-2xl grayscale hover:grayscale-0 transition duration-700"
            />
            <div className="absolute -bottom-10 -right-10 hidden lg:flex flex-col items-center justify-center bg-royal-maroon p-8 rounded-2xl shadow-xl z-20 border-b-4 border-royal-gold w-36 h-36">
              <p className="text-royal-gold font-serif text-3xl font-bold leading-none">Est.</p>
              <p className="text-white text-3xl font-bold leading-none mt-1">{get("established_year")}</p>
            </div>
          </div>

          {/* Text */}
          <div>
            <span className="font-serif text-royal-gold text-base tracking-[0.3em] uppercase block mb-4">
              Our Legacy
            </span>
            <h2 className="font-serif text-5xl md:text-6xl font-bold text-royal-maroon mb-8 leading-tight">
              {get("about_title")}
            </h2>
            <p className="text-earthy-brown text-lg leading-relaxed mb-5">
              {get("about_body_1")}
            </p>
            <p className="text-earthy-brown text-lg leading-relaxed mb-5">
              {get("about_body_2")}
            </p>
            <p className="text-earthy-brown text-lg leading-relaxed mb-8">
              {get("about_body_3")}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-8 border-t border-royal-gold/20">
              {stats.map((stat, i) => (
                <div key={i} className="text-center">
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
