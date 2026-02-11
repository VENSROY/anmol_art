import aboutImg from "../assets/about.png";

export default function About() {
  return (
    <section
      id="about"
      className="bg-[#FBF6E6] py-24 scroll-mt-28 relative"
    >
      <div className="container mx-auto px-6 max-w-7xl">

        {/* Top Section */}
        <div className="grid md:grid-cols-2 gap-16 items-center mb-28">

          {/* LEFT IMAGE */}
          <div className="relative">
            {/* Gold Frame */}
            <div className="absolute -top-4 -left-4 w-full h-full border-2 border-royal-gold rounded-xl"></div>

            <img
              src={aboutImg}
              alt="Artisan at Work"
              className="relative z-10 w-full h-[520px] object-cover rounded-xl shadow-xl grayscale hover:grayscale-0 transition duration-500"
            />
          </div>

          {/* RIGHT CONTENT */}
          <div>
            <p className="font-script text-royal-gold text-4xl mb-4">
              Our Story
            </p>

            <h2 className="font-serif text-5xl md:text-6xl font-bold text-royal-maroon mb-8 leading-tight">
              Preserving a Dying <br /> Legacy
            </h2>

            <p className="text-earthy-brown text-lg leading-relaxed mb-6">
              Founded in the heart of Rajasthan,{" "}
              <strong>ANMOL Art</strong> began as a humble initiative to
              support local artisans whose skills have been passed down
              through centuries. We believe that true luxury lies in the
              imperfection of the handmade.
            </p>

            <p className="text-earthy-brown text-lg leading-relaxed mb-6">
              Each creation reflects patience, passion, and cultural pride —
              carefully crafted using traditional techniques that honor
              India’s rich artistic heritage. Our work is not driven by
              machines, but by human hands and timeless knowledge.
            </p>

            <p className="text-earthy-brown text-lg leading-relaxed">
              Through ANMOL Art, we aim to bridge the gap between
              traditional Indian craftsmanship and modern aesthetics,
              bringing soulful, meaningful art pieces into contemporary
              homes across the world.
            </p>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-10 text-center">

          <div className="bg-white p-10 rounded-2xl shadow-sm border border-royal-gold/20 hover:shadow-lg transition">
            <div className="text-royal-maroon text-5xl mb-6">❤️</div>
            <h3 className="font-serif text-2xl font-bold mb-4">
              100% Handcrafted
            </h3>
            <p className="text-earthy-brown leading-relaxed">
              Every piece tells a story, crafted by master artisans with
              generations of skill and dedication.
            </p>
          </div>

          <div className="bg-white p-10 rounded-2xl shadow-sm border border-royal-gold/20 hover:shadow-lg transition">
            <div className="text-royal-maroon text-5xl mb-6">💎</div>
            <h3 className="font-serif text-2xl font-bold mb-4">
              Premium Materials
            </h3>
            <p className="text-earthy-brown leading-relaxed">
              Sourced from the finest teak wood, pure brass, and organic
              materials to ensure lasting beauty and heritage.
            </p>
          </div>

          <div className="bg-white p-10 rounded-2xl shadow-sm border border-royal-gold/20 hover:shadow-lg transition">
            <div className="text-royal-maroon text-5xl mb-6">🌍</div>
            <h3 className="font-serif text-2xl font-bold mb-4">
              Global Shipping
            </h3>
            <p className="text-earthy-brown leading-relaxed">
              Bringing the essence of Royal India to doorsteps worldwide
              with secure packaging and trusted delivery.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
