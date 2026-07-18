import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSiteConfig } from "../hooks/useSiteConfig";
import Icon from "./ui/Icon";

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
      {/* Top info bar — quiet, architectural, always reachable */}
      <div className="hidden md:flex bg-indigo-deep text-limewash/55 caption justify-between items-center px-8 py-2.5">
        <span>Jodhpur, Rajasthan · Est. {get("established_year")}</span>
        <div className="flex gap-8 items-center">
          {phone && <a href={`tel:${phone.replace(/\s/g, "")}`} className="inline-flex items-center min-h-[44px] px-1 hover:text-brass-light transition-colors">{phone}</a>}
          {instagram && <a href={instagram} target="_blank" rel="noreferrer" className="inline-flex items-center min-h-[44px] px-1 hover:text-brass-light transition-colors">Instagram</a>}
          {waNumber && <a href={`https://wa.me/${waNumber}`} target="_blank" rel="noreferrer" className="inline-flex items-center min-h-[44px] px-1 hover:text-brass-light transition-colors">WhatsApp</a>}
        </div>
      </div>

      <nav className={`sticky top-0 w-full z-50 transition-all duration-[var(--dur-base)] ease-craft bg-sandstone/95 backdrop-blur-md border-b border-ink/10 ${scrolled ? "py-3" : "py-5"}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex justify-between items-center gap-6">
          <button
            onClick={() => handleNavigation("home")}
            aria-label="ANMOL Art – Home"
            className="group flex items-baseline gap-2.5 shrink-0 py-2.5"
          >
            <span className="font-serif text-2xl md:text-[1.7rem] font-normal text-ink tracking-tight leading-none">
              ANMOL
            </span>
            <span className="font-serif text-2xl md:text-[1.7rem] italic font-light text-brass leading-none">
              Art
            </span>
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-9 caption text-ink/70">
            {navLinks.map((item) =>
              item.link ? (
                <Link key={item.label} to={item.link} className="relative group/nav hover:text-ink transition-colors py-1">
                  {item.label}
                  <span className="absolute left-0 -bottom-0.5 w-0 group-hover/nav:w-full h-px bg-brass transition-all duration-[var(--dur-base)] ease-craft" />
                </Link>
              ) : (
                <button key={item.label} onClick={item.action} className="relative group/nav hover:text-ink transition-colors py-1">
                  {item.label}
                  <span className="absolute left-0 -bottom-0.5 w-0 group-hover/nav:w-full h-px bg-brass transition-all duration-[var(--dur-base)] ease-craft" />
                </button>
              )
            )}
            {waNumber && (
              <a
                href={`https://wa.me/${waNumber}`}
                target="_blank"
                rel="noreferrer"
                aria-label="Chat with ANMOL Art on WhatsApp"
                className="bg-royal-maroon text-limewash px-6 py-3 caption hover:bg-brass hover:text-indigo-deep transition-colors duration-[var(--dur-fast)]"
              >
                Enquire
              </a>
            )}
          </div>

          {/* Mobile: tap-to-call sits in the bar itself — on a phone, calling
              the workshop is the most likely action, so it should not be
              buried behind a menu. */}
          <div className="flex items-center gap-1 md:hidden">
            {phone && (
              <a
                href={`tel:${phone.replace(/\s/g, "")}`}
                aria-label={`Call ANMOL Art on ${phone}`}
                className="p-3.5 text-ink hover:text-brass transition-colors"
              >
                <Icon name="fa-phone" className="text-lg" />
              </a>
            )}
            <button
              className="p-3 text-xl text-ink"
              onClick={() => setOpen(!open)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
            >
              <Icon name={open ? "fa-xmark" : "fa-bars"} />
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        <div
          id="mobile-menu"
          className={`md:hidden bg-sandstone border-t border-ink/10 overflow-hidden transition-all duration-[var(--dur-base)] ease-craft ${
            open ? "max-h-[560px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="flex flex-col px-6 py-4">
            {navLinks.map((item, i) =>
              item.link ? (
                <Link
                  key={item.label}
                  to={item.link}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline gap-4 py-4 border-b border-ink/8 text-ink hover:text-brass transition-colors"
                >
                  <span className="caption text-brass/50 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                  <span className="font-serif text-2xl font-light">{item.label}</span>
                </Link>
              ) : (
                <button
                  key={item.label}
                  onClick={item.action}
                  className="flex items-baseline gap-4 py-4 border-b border-ink/8 text-ink hover:text-brass transition-colors text-left"
                >
                  <span className="caption text-brass/50 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                  <span className="font-serif text-2xl font-light">{item.label}</span>
                </button>
              )
            )}
            {waNumber && (
              <a
                href={`https://wa.me/${waNumber}`}
                target="_blank"
                rel="noreferrer"
                className="mt-6 mb-2 py-4 bg-royal-maroon text-limewash flex items-center justify-center gap-3 caption hover:bg-brass hover:text-indigo-deep transition-colors"
              >
                <Icon name="fa-whatsapp" className="text-base" /> Enquire on WhatsApp
              </a>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
