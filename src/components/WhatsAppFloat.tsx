import { useState, useEffect } from "react";
import { useSiteConfig } from "../hooks/useSiteConfig";
import Icon from "./ui/Icon";

export default function WhatsAppFloat() {
  const { get }            = useSiteConfig();
  const [visible, setVisible] = useState(false);
  const [pulse, setPulse]     = useState(true);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 200);
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setPulse(false), 6000);
    return () => clearTimeout(t);
  }, []);

  const waNumber = get("whatsapp_number");

  return (
    <a
      href={`https://wa.me/${waNumber}?text=Hello ANMOL Art! I'm interested in exploring your handcrafted furniture and luxury decor collection. Please share more details.`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with ANMOL Art on WhatsApp"
      className={`fixed bottom-6 right-6 z-[90] flex items-center gap-3 bg-[#25D366] text-white shadow-2xl transition-all duration-500 rounded-full group
        ${visible ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-4 pointer-events-none"}`}
      style={{ boxShadow: "0 8px 30px rgba(37,211,102,0.45)" }}
    >
      {pulse && (
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-60 pointer-events-none" aria-hidden="true" />
      )}
      <span className="relative w-14 h-14 flex items-center justify-center rounded-full shrink-0">
        <Icon name="fa-whatsapp" className="text-3xl" />
      </span>
      <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-500 pr-0 group-hover:pr-5 text-sm font-bold tracking-wide">
        Chat with us!
      </span>
    </a>
  );
}
