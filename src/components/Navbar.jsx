import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleHomeScroll = (id) => {
    navigate("/");
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 100);
    setOpen(false);
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 bg-ivory/95 backdrop-blur-md border-b-2 border-royal-gold ${
        scrolled ? "shadow-lg py-2" : "py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <button
          onClick={() => handleHomeScroll("home")}
          className="text-3xl font-serif font-bold text-royal-maroon flex items-center gap-2"
        >
          <i className="fa-solid fa-crown text-royal-gold"></i>
          ANMOL Art
        </button>

        <div className="hidden md:flex space-x-8 font-semibold uppercase text-sm">
          <button onClick={() => handleHomeScroll("home")} className="hover:text-royal-gold transition">home</button>
          <button onClick={() => handleHomeScroll("about")} className="hover:text-royal-gold transition">about</button>
          <Link to="/collections" className="hover:text-royal-gold transition">collections</Link>
          <button onClick={() => handleHomeScroll("services")} className="hover:text-royal-gold transition">services</button>
          <button onClick={() => handleHomeScroll("contact")} className="hover:text-royal-gold transition">contact</button>
        </div>

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
            <button onClick={() => handleHomeScroll("home")} className="hover:text-royal-gold">home</button>
            <button onClick={() => handleHomeScroll("about")} className="hover:text-royal-gold">about</button>
            <Link to="/collections" onClick={() => setOpen(false)} className="hover:text-royal-gold">collections</Link>
            <button onClick={() => handleHomeScroll("services")} className="hover:text-royal-gold">services</button>
            <button onClick={() => handleHomeScroll("contact")} className="hover:text-royal-gold">contact</button>
          </div>
        </div>
      )}
    </nav>
  );
}