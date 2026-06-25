import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSiteConfig } from "../hooks/useSiteConfig";

export default function Navbar() {
  const [open, setOpen]       = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { get } = useSiteConfig();
  const navigate  = useNavigate();
  const location  = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [location.pathname]);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleNavigation = (id: string) => {
    setOpen(false);
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => scrollToSection(id), 150);
    } else {
      scrollToSection(id);
    }
  };

  const navLinks = [
    { label: "Home",        action: () => handleNavigation("home") },
    { label: "About",       action: () => handleNavigation("about") },
    { label: "Collections", link: "/collections" },
    { label: "Services",    action: () => handleNavigation("services") },
    { label: "Contact",     action: () => handleNavigation("contact") },
  ];

  const phone     = get("phone");
  const waNumber  = get("whatsapp_number");
  const instagram = get("instagram_url");

  return (
    <>
      {/* Top info bar */}
      <div className="hidden md:flex bg-royal-maroon text-white/70 text-[11px] tracking-widest uppercase justify-between items-center px-8 py-2">
        <span>📍 Jodhpur, Rajasthan – Est. {get("established_year")}</span>
        <div className="flex gap-6 items-center">
          {phone && <a href={`tel:${phone.replace(/\s/g, "")}`} className="hover:text-royal-gold transition">📞 {phone}</a>}
          {instagram && <a href={instagram} target="_blank" rel="noreferrer" className="hover:text-royal-gold transition">Instagram</a>}
          {waNumber && <a href={`https://wa.me/${waNumber}`} target="_blank" rel="noreferrer" className="hover:text-royal-gold transition">WhatsApp</a>}
        </div>
      </div>

      <nav className={`sticky top-0 w-full z-50 transition-all duration-300 bg-ivory/97 backdrop-blur-md border-b border-royal-gold/30 ${scrolled ? "shadow-md py-3" : "py-4"}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <button
            onClick={() => handleNavigation("home")}
            aria-label="ANMOL Art – Home"
            className="text-2xl md:text-3xl font-serif font-bold text-royal-maroon flex items-center gap-2 tracking-tight"
          >
            <i className="fa-solid fa-crown text-royal-gold text-xl" aria-hidden="true" /> ANMOL Art
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-7 font-bold text-[13px] tracking-wider text-royal-maroon uppercase">
            {navLinks.map((item) =>
              item.link ? (
                <Link key={item.label} to={item.link} className="hover:text-royal-gold transition">
                  {item.label}
                </Link>
              ) : (
                <button key={item.label} onClick={item.action} className="hover:text-royal-gold transition">
                  {item.label}
                </button>
              )
            )}
            {waNumber && (
              <a
                href={`https://wa.me/${waNumber}`}
                target="_blank"
                rel="noreferrer"
                aria-label="Chat with ANMOL Art on WhatsApp"
                className="bg-royal-maroon text-white px-5 py-2.5 text-[11px] font-bold uppercase tracking-widest hover:bg-royal-gold hover:text-royal-maroon transition-all"
              >
                WhatsApp
              </a>
            )}
          </div>

          {/* Hamburger */}
          <button
            className="md:hidden text-2xl text-royal-maroon"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            <i className={`fa-solid ${open ? "fa-xmark" : "fa-bars"}`} aria-hidden="true" />
          </button>
        </div>

        {/* Mobile nav */}
        <div className={`md:hidden bg-ivory border-t border-royal-gold/20 overflow-hidden transition-all duration-300 ${open ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}>
          <div className="flex flex-col p-6 space-y-4 text-center font-bold text-sm tracking-widest uppercase text-royal-maroon">
            {navLinks.map((item) =>
              item.link ? (
                <Link key={item.label} to={item.link} onClick={() => setOpen(false)} className="py-2 hover:text-royal-gold transition">
                  {item.label}
                </Link>
              ) : (
                <button key={item.label} onClick={item.action} className="py-2 hover:text-royal-gold transition">
                  {item.label}
                </button>
              )
            )}
            {waNumber && (
              <a href={`https://wa.me/${waNumber}`} target="_blank" rel="noreferrer"
                className="mt-2 py-3 bg-royal-maroon text-white flex items-center justify-center gap-2 hover:bg-royal-gold hover:text-royal-maroon transition">
                <i className="fa-brands fa-whatsapp" aria-hidden="true" /> WhatsApp
              </a>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
