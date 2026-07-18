import { Link } from "react-router-dom";
import { useSiteConfig } from "../hooks/useSiteConfig";
import Reveal from "./motion/Reveal";
import Jali from "./motion/Jali";
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
    <footer className="bg-indigo-deep text-limewash pt-24 pb-10 relative overflow-hidden">
      {/* The lattice returns at the close, so the site ends where it began */}
      <div className="absolute inset-0 text-brass-light pointer-events-none" aria-hidden="true">
        <Jali scale={130} opacity={0.06} />
      </div>

      {/* अनमोल — "priceless" — set large and quiet as a closing watermark */}
      <p
        className="devanagari pointer-events-none select-none absolute -bottom-6 right-4 text-[22vw] md:text-[13vw] leading-none text-limewash/[0.035]"
        aria-hidden="true"
      >
        अनमोल
      </p>

      <div className="max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-1 md:grid-cols-4 gap-12 mb-20 relative">
        <Reveal className="flex flex-col items-center md:items-start" y={16}>
          <h3 className="flex items-baseline gap-2 mb-6">
            <span className="font-serif text-2xl text-limewash">ANMOL</span>
            <span className="font-serif text-2xl italic font-light text-brass-light">Art</span>
          </h3>
          <p className="text-sm text-limewash/55 leading-relaxed text-center md:text-left font-light">
            {footerDesc}
          </p>
        </Reveal>

        <Reveal className="text-center md:text-left" delay={0.08} y={16}>
          <h4 className="caption mb-6 border-b border-brass/25 pb-2 w-fit mx-auto md:mx-0 uppercase">Navigation</h4>
          <ul className="space-y-1 text-[15px] font-medium">
            <li><button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="inline-flex items-center min-h-[44px] py-2 hover:text-brass-light transition-colors">Home</button></li>
            <li><Link to="/collections" className="inline-flex items-center min-h-[44px] py-2 hover:text-brass-light transition-colors">Collections</Link></li>
            <li><button onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })} className="inline-flex items-center min-h-[44px] py-2 hover:text-brass-light transition-colors">About</button></li>
            <li><button onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })} className="inline-flex items-center min-h-[44px] py-2 hover:text-brass-light transition-colors">Services</button></li>
            <li><button onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })} className="inline-flex items-center min-h-[44px] py-2 hover:text-brass-light transition-colors">Contact</button></li>
          </ul>
        </Reveal>

        <Reveal className="text-center md:text-left" delay={0.16} y={16}>
          <h4 className="caption mb-6 border-b border-brass/25 pb-2 w-fit mx-auto md:mx-0 uppercase">Contact Us</h4>
          <ul className="space-y-4 text-sm text-limewash/55 font-light">
            {address && (
              <li className="flex items-start gap-3 justify-center md:justify-start">
                <Icon name="fa-location-dot" className="text-brass-light mt-1 flex-shrink-0" />
                <span>{address}</span>
              </li>
            )}
            {phone && (
              <li className="flex items-center gap-3 justify-center md:justify-start">
                <Icon name="fa-phone" className="text-brass-light flex-shrink-0" />
                <a href={`tel:${phone.replace(/\s/g, "")}`} className="inline-flex items-center min-h-[44px] py-2 hover:text-brass-light transition-colors">{phone}</a>
              </li>
            )}
          </ul>
        </Reveal>

        <Reveal className="text-center md:text-left" delay={0.24} y={16}>
          <h4 className="caption mb-6 border-b border-brass/25 pb-2 w-fit mx-auto md:mx-0 uppercase">Connect</h4>
          <div className="flex justify-center md:justify-start gap-4">
            {instagram && (
              <a href={instagram} target="_blank" rel="noreferrer" aria-label="Follow ANMOL Art on Instagram"
                className="w-11 h-11 rounded-full border border-brass/30 flex items-center justify-center hover:bg-brass hover:text-indigo-deep transition duration-300">
                <Icon name="fa-instagram" />
              </a>
            )}
            {waNumber && (
              <a href={`https://wa.me/${waNumber}`} target="_blank" rel="noreferrer" aria-label="Chat with ANMOL Art on WhatsApp"
                className="w-11 h-11 rounded-full border border-brass/30 flex items-center justify-center hover:bg-brass hover:text-indigo-deep transition duration-300">
                <Icon name="fa-whatsapp" />
              </a>
            )}
            {facebook && (
              <a href={facebook} target="_blank" rel="noreferrer" aria-label="Follow ANMOL Art on Facebook"
                className="w-11 h-11 rounded-full border border-brass/30 flex items-center justify-center hover:bg-brass hover:text-indigo-deep transition duration-300">
                <Icon name="fa-facebook-f" />
              </a>
            )}
          </div>
        </Reveal>
      </div>


      <div className="border-t border-limewash/10 pt-8 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] tracking-[0.2em] text-limewash/35 uppercase">
          <p>Registered in India, Jodhpur 342013</p>
          <p>© {currentYear} ANMOL ART • ALL RIGHTS RESERVED</p>
        </div>
      </div>
    </footer>
  );
}
