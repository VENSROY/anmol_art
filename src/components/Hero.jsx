import { useTypewriter, Cursor } from "react-simple-typewriter";
import showroomImg from "../assets/showroom.jpg";

export default function Hero() {
  const [text] = useTypewriter({
    words: ["Timeless Craftsmanship"],
    loop: false,
    typeSpeed: 90,
    deleteSpeed: 50,
    delaySpeed: 1000,
  });

  return (
    <section
      id="home"
      className="scroll-mt-24 min-h-screen flex items-center justify-center relative"
    >
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.45), rgba(93,0,30,0.35)), url(${showroomImg})`,
        }}
      ></div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-5xl px-6">
        <h1 className="font-serif text-white text-5xl md:text-7xl lg:text-8xl font-bold leading-tight drop-shadow-lg">
          {text}
          <Cursor cursorStyle="|" />
        </h1>

        <p className="mt-6 text-gray-200 text-lg md:text-xl max-w-3xl mx-auto">
          Discover the elegance of authentic Indian handicraft, curated for the
          modern royal home.
        </p>

        <div className="mt-12 flex flex-col md:flex-row gap-6 justify-center">
          <a
            href="#collection"
            className="bg-royal-gold text-royal-maroon px-10 py-4 font-bold uppercase tracking-widest border-2 border-royal-gold hover:bg-transparent hover:text-royal-gold transition duration-300"
          >
            Explore Collection
          </a>

          <a
            href="#contact"
            className="px-10 py-4 font-bold uppercase tracking-widest border-2 border-white text-white hover:bg-white hover:text-royal-maroon transition duration-300"
          >
            Contact Us
          </a>
        </div>
      </div>
    </section>
  );
}
