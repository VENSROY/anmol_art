import { Link } from "react-router-dom";
import { useSiteConfig } from "../hooks/useSiteConfig";
import Reveal from "./motion/Reveal";
import SectionDivider from "./motion/SectionDivider";
import Icon from "./ui/Icon";

export default function Footer() {
  const { get } = useSiteConfig();
  const currentYear  = new Date().getFullYear();
  const instagram    = get("instagram_url");
  const facebook     = get("facebook_url");
  const waNumber     = get("whatsapp_number");
  const phone        = get("phone");
  const address      = get("address");
  const footerDesc   = get("footer_description");

  return (
    <footer className="bg-earthy-brown text-ivory pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <Reveal className="flex flex-col items-center md:items-start" y={16}>
          <h3 className="text-2xl font-serif font-bold text-royal-gold flex items-center gap-2 mb-6">
            <Icon name="fa-crown" />
            ANMOL Art
          </h3>
          <p className="text-sm opacity-80 leading-relaxed text-center md:text-left">
            {footerDesc}
          </p>
        </Reveal>

        <Reveal className="text-center md:text-left" delay={0.08} y={16}>
          <h4 className="font-bold tracking-widest text-sm mb-6 border-b border-royal-gold/30 pb-2 w-fit mx-auto md:mx-0 uppercase">Navigation</h4>
          <ul className="space-y-3 text-[15px] font-medium">
            <li><button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="hover:text-royal-gold transition">Home</button></li>
            <li><Link to="/collections" className="hover:text-royal-gold transition">Collections</Link></li>
            <li><button onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })} className="hover:text-royal-gold transition">About</button></li>
            <li><button onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })} className="hover:text-royal-gold transition">Services</button></li>
            <li><button onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })} className="hover:text-royal-gold transition">Contact</button></li>
          </ul>
        </Reveal>

        <Reveal className="text-center md:text-left" delay={0.16} y={16}>
          <h4 className="font-bold tracking-widest text-sm mb-6 border-b border-royal-gold/30 pb-2 w-fit mx-auto md:mx-0 uppercase">Contact Us</h4>
          <ul className="space-y-4 text-sm opacity-80">
            {address && (
              <li className="flex items-start gap-3 justify-center md:justify-start">
                <Icon name="fa-location-dot" className="text-royal-gold mt-1 flex-shrink-0" />
                <span>{address}</span>
              </li>
            )}
            {phone && (
              <li className="flex items-center gap-3 justify-center md:justify-start">
                <Icon name="fa-phone" className="text-royal-gold flex-shrink-0" />
                <a href={`tel:${phone.replace(/\s/g, "")}`} className="hover:text-royal-gold transition">{phone}</a>
              </li>
            )}
          </ul>
        </Reveal>

        <Reveal className="text-center md:text-left" delay={0.24} y={16}>
          <h4 className="font-bold tracking-widest text-sm mb-6 border-b border-royal-gold/30 pb-2 w-fit mx-auto md:mx-0 uppercase">Connect</h4>
          <div className="flex justify-center md:justify-start gap-4">
            {instagram && (
              <a href={instagram} target="_blank" rel="noreferrer" aria-label="Follow ANMOL Art on Instagram"
                className="w-10 h-10 rounded-full border border-royal-gold/30 flex items-center justify-center hover:bg-royal-gold hover:text-royal-maroon transition duration-300">
                <Icon name="fa-instagram" />
              </a>
            )}
            {waNumber && (
              <a href={`https://wa.me/${waNumber}`} target="_blank" rel="noreferrer" aria-label="Chat with ANMOL Art on WhatsApp"
                className="w-10 h-10 rounded-full border border-royal-gold/30 flex items-center justify-center hover:bg-royal-gold hover:text-royal-maroon transition duration-300">
                <Icon name="fa-whatsapp" />
              </a>
            )}
            {facebook && (
              <a href={facebook} target="_blank" rel="noreferrer" aria-label="Follow ANMOL Art on Facebook"
                className="w-10 h-10 rounded-full border border-royal-gold/30 flex items-center justify-center hover:bg-royal-gold hover:text-royal-maroon transition duration-300">
                <Icon name="fa-facebook-f" />
              </a>
            )}
          </div>
        </Reveal>
      </div>

      <SectionDivider className="mb-8 opacity-70" />

      <div className="border-t border-white/10 pt-8 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] tracking-[0.2em] opacity-50 uppercase">
          <p>Registered in India, Jodhpur 342013</p>
          <p>© {currentYear} ANMOL ART • ALL RIGHTS RESERVED</p>
        </div>
      </div>
    </footer>
  );
}
