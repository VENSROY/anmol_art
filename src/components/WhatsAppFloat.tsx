import { useState, useEffect } from "react";

export default function WhatsAppFloat() {
  const [visible, setVisible] = useState(false);
  const [pulse, setPulse]     = useState(true);

  // Show after scrolling 200px
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 200);
    window.addEventListener("scroll", onScroll);
    onScroll(); // check on mount too
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Stop pulsing after 6 seconds
  useEffect(() => {
    const t = setTimeout(() => setPulse(false), 6000);
    return () => clearTimeout(t);
  }, []);

  return (
    <a
      href="https://wa.me/919828037575?text=Namaste ANMOL Art! Mujhe aapke products mein interest hai."
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with ANMOL Art on WhatsApp"
      className={`fixed bottom-6 right-6 z-[90] flex items-center gap-3 bg-[#25D366] text-white shadow-2xl transition-all duration-500 rounded-full group
        ${visible ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-4 pointer-events-none"}
      `}
      style={{ boxShadow: "0 8px 30px rgba(37,211,102,0.45)" }}
    >
      {/* Pulse ring */}
      {pulse && (
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-60 pointer-events-none" />
      )}

      {/* Icon */}
      <span className="relative w-14 h-14 flex items-center justify-center rounded-full shrink-0">
        <i className="fa-brands fa-whatsapp text-3xl" />
      </span>

      {/* Label – expands on hover */}
      <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-500 pr-0 group-hover:pr-5 text-sm font-bold tracking-wide">
        Chat with us!
      </span>

      <style>{`
        @keyframes ping {
          75%, 100% { transform: scale(1.6); opacity: 0; }
        }
        .animate-ping { animation: ping 1.2s cubic-bezier(0,0,0.2,1) infinite; }
      `}</style>
    </a>
  );
}