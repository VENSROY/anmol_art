import aboutImg from "../assets/about.png";

export default function About() {
  const stats = [
    { label: "Designs", value: "5000+", icon: "fa-couch" },
    { label: "Experience", value: "20+ Yrs", icon: "fa-award" },
    { label: "Countries", value: "20+", icon: "fa-globe" },
    { label: "Artisans", value: "100+", icon: "fa-hands-holding-circle" }
  ];

  return (
    <section id="about" className="bg-[#FBF6E6] py-24 scroll-mt-28 relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid md:grid-cols-2 gap-16 items-center mb-28">
          <div className="relative group">
            <div className="absolute -top-6 -left-6 w-full h-full border-2 border-royal-gold/30 rounded-2xl group-hover:-top-4 group-hover:-left-4 transition-all duration-500"></div>
            <img
              src={aboutImg}
              alt="Artisan at Work"
              className="relative z-10 w-full h-[550px] object-cover rounded-2xl shadow-2xl grayscale hover:grayscale-0 transition duration-700"
            />
            <div className="absolute -bottom-10 -right-10 hidden lg:block bg-royal-maroon p-8 rounded-2xl shadow-xl z-20 border-b-4 border-royal-gold">
              <p className="text-royal-gold font-serif text-4xl font-bold">Est.</p>
              <p className="text-white text-2xl font-bold tracking-tighter">2006</p>
            </div>
          </div>

          <div>
            <span className="font-serif text-royal-gold text-xl tracking-[0.3em] uppercase block mb-4">Our Legacy</span>
            <h2 className="font-serif text-5xl md:text-6xl font-bold text-royal-maroon mb-8 leading-tight">
              Preserving a <br /> Dying Heritage
            </h2>
            <p className="text-earthy-brown text-lg leading-relaxed mb-6">
              Founded in the heart of Rajasthan, <strong>ANMOL Art</strong> began as a humble initiative to support local artisans whose skills have been passed down through centuries. We believe that true luxury lies in the imperfection of the handmade.
            </p>
            <p className="text-earthy-brown text-lg leading-relaxed mb-6">
              Each creation reflects patience, passion, and cultural pride — carefully crafted using traditional techniques that honor India’s rich artistic heritage. Our work is not driven by machines, but by human hands.
            </p>
            <p className="text-earthy-brown text-lg leading-relaxed mb-8">
              Through ANMOL Art, we aim to bridge the gap between traditional Indian craftsmanship and modern aesthetics, bringing soulful art into contemporary homes across the world.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 py-8 border-t border-royal-gold/20">
              {stats.map((stat, i) => (
                <div key={i} className="text-center">
                  <p className="text-royal-maroon text-2xl font-bold">{stat.value}</p>
                  <p className="text-earthy-brown text-xs uppercase tracking-widest font-bold mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          <div className="bg-white p-12 rounded-3xl shadow-sm border-b-4 border-transparent hover:border-royal-gold hover:shadow-2xl transition-all duration-500 group">
            <div className="w-16 h-16 bg-ivory rounded-full flex items-center justify-center text-3xl mb-8 group-hover:scale-110 transition">❤️</div>
            <h3 className="font-serif text-2xl font-bold text-royal-maroon mb-4">100% Handcrafted</h3>
            <p className="text-earthy-brown leading-relaxed text-sm">Every piece tells a story, crafted by master artisans with generations of skill and dedication.</p>
          </div>

          <div className="bg-white p-12 rounded-3xl shadow-sm border-b-4 border-transparent hover:border-royal-gold hover:shadow-2xl transition-all duration-500 group">
            <div className="w-16 h-16 bg-ivory rounded-full flex items-center justify-center text-3xl mb-8 group-hover:scale-110 transition">💎</div>
            <h3 className="font-serif text-2xl font-bold text-royal-maroon mb-4">Premium Materials</h3>
            <p className="text-earthy-brown leading-relaxed text-sm">Sourced from the finest teak wood, pure brass, and organic materials to ensure lasting beauty.</p>
          </div>

          <div className="bg-white p-12 rounded-3xl shadow-sm border-b-4 border-transparent hover:border-royal-gold hover:shadow-2xl transition-all duration-500 group">
            <div className="w-16 h-16 bg-ivory rounded-full flex items-center justify-center text-3xl mb-8 group-hover:scale-110 transition">🌍</div>
            <h3 className="font-serif text-2xl font-bold text-royal-maroon mb-4">Global Shipping</h3>
            <p className="text-earthy-brown leading-relaxed text-sm">Bringing the essence of Royal India to doorsteps worldwide with secure and trusted delivery.</p>
          </div>
        </div>
      </div>
    </section>
  );
}