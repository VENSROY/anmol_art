import { useState, useEffect } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 bg-ivory/95 backdrop-blur-md border-b-2 border-royal-gold ${
        scrolled ? "shadow-lg py-2" : "py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a
          href="#home"
          className="text-3xl font-serif font-bold text-royal-maroon flex items-center gap-2"
        >
          <i className="fa-solid fa-crown text-royal-gold"></i>
          ANMOL Art
        </a>

        {/* Desktop */}
        <div className="hidden md:flex space-x-8 font-semibold uppercase text-sm">
          {["home", "about", "collection", "services", "contact"].map((id) => (
            <a
              key={id}
              href={`#${id}`}
              className="hover:text-royal-gold transition"
            >
              {id}
            </a>
          ))}
        </div>

        {/* Mobile */}
        <button
          className="md:hidden text-2xl text-royal-maroon"
          onClick={() => setOpen(!open)}
        >
          <i className="fa-solid fa-bars"></i>
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-ivory border-t border-royal-gold">
          <div className="flex flex-col p-6 space-y-4 text-center font-semibold">
            {["home", "about", "collection", "services", "contact"].map((id) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={() => setOpen(false)}
                className="hover:text-royal-gold"
              >
                {id}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
