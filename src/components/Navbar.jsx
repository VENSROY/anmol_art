import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavigation = (id) => {
    setOpen(false);
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        scrollToSection(id);
      }, 100);
    } else {
      scrollToSection(id);
    }
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 bg-ivory/95 backdrop-blur-md border-b-2 border-royal-gold ${
        scrolled ? "shadow-lg py-3" : "py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <button
          onClick={() => handleNavigation("home")}
          className="text-2xl md:text-3xl font-serif font-bold text-royal-maroon flex items-center gap-2 tracking-tight"
        >
          <i className="fa-solid fa-crown text-royal-gold"></i>
          ANMOL Art
        </button>

        <div className="hidden md:flex items-center space-x-7 font-bold text-[15px] tracking-wide text-royal-maroon">
          <button onClick={() => handleNavigation("home")} className="hover:text-royal-gold transition">Home</button>
          <button onClick={() => handleNavigation("about")} className="hover:text-royal-gold transition">About</button>
          <Link to="/collections" className="hover:text-royal-gold transition">Collections</Link>
          <button onClick={() => handleNavigation("antique")} className="hover:text-royal-gold transition">Antique</button>
          <button onClick={() => handleNavigation("services")} className="hover:text-royal-gold transition">Services</button>
          <button onClick={() => handleNavigation("contact")} className="hover:text-royal-gold transition">Contact</button>
        </div>

        <button
          className="md:hidden text-2xl text-royal-maroon"
          onClick={() => setOpen(!open)}
        >
          <i className={`fa-solid ${open ? 'fa-xmark' : 'fa-bars'}`}></i>
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-ivory border-t border-royal-gold shadow-xl">
          <div className="flex flex-col p-6 space-y-5 text-center font-bold text-base tracking-wide text-royal-maroon">
            <button onClick={() => handleNavigation("home")}>Home</button>
            <button onClick={() => handleNavigation("about")}>About</button>
            <Link to="/collections" onClick={() => setOpen(false)}>Collections</Link>
            <button onClick={() => handleNavigation("antique")}>Antique</button>
            <button onClick={() => handleNavigation("services")}>Services</button>
            <button onClick={() => handleNavigation("contact")}>Contact</button>
          </div>
        </div>
      )}
    </nav>
  );
}