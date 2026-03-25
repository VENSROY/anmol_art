import { Link } from "react-router-dom";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-earthy-brown text-ivory pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-2xl font-serif font-bold text-royal-gold flex items-center gap-2 mb-6">
            <i className="fa-solid fa-crown"></i>
            ANMOL Art
          </h3>
          <p className="text-sm opacity-80 leading-relaxed text-center md:text-left">
            Preserving the royal heritage of Jodhpur through timeless handcrafted furniture and artistic masterpieces since 2006.
          </p>
        </div>

        <div className="text-center md:text-left">
          <h4 className="font-bold tracking-widest text-sm mb-6 border-b border-royal-gold/30 pb-2 w-fit mx-auto md:mx-0 uppercase">Navigation</h4>
          <ul className="space-y-3 text-[15px] font-medium">
            <li><button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="hover:text-royal-gold transition">Home</button></li>
            <li><Link to="/collections" className="hover:text-royal-gold transition">Collections</Link></li>
            <li><button onClick={() => document.getElementById('antique')?.scrollIntoView({behavior:'smooth'})} className="hover:text-royal-gold transition">Antique</button></li>
            <li><button onClick={() => document.getElementById('services')?.scrollIntoView({behavior:'smooth'})} className="hover:text-royal-gold transition">Services</button></li>
          </ul>
        </div>

        <div className="text-center md:text-left">
          <h4 className="font-bold tracking-widest text-sm mb-6 border-b border-royal-gold/30 pb-2 w-fit mx-auto md:mx-0 uppercase">Contact Us</h4>
          <ul className="space-y-4 text-sm opacity-80">
            <li className="flex items-start gap-3 justify-center md:justify-start">
              <i className="fa-solid fa-location-dot text-royal-gold mt-1"></i>
              <span>109, G.M. City, Sangriya, <br /> Jodhpur, Raj (342013)</span>
            </li>
            <li className="flex items-center gap-3 justify-center md:justify-start">
              <i className="fa-solid fa-phone text-royal-gold"></i>
              <span>+91 98280 37575</span>
            </li>
          </ul>
        </div>

        <div className="text-center md:text-left">
          <h4 className="font-bold tracking-widest text-sm mb-6 border-b border-royal-gold/30 pb-2 w-fit mx-auto md:mx-0 uppercase">Connect</h4>
          <div className="flex justify-center md:justify-start gap-4">
            <a href="https://www.instagram.com/anmolart_75" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-royal-gold/30 flex items-center justify-center hover:bg-royal-gold hover:text-royal-maroon transition duration-300">
              <i className="fa-brands fa-instagram"></i>
            </a>
            <a href="https://wa.me/919828037575" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-royal-gold/30 flex items-center justify-center hover:bg-royal-gold hover:text-royal-maroon transition duration-300">
              <i className="fa-brands fa-whatsapp"></i>
            </a>
            <a href="https://www.facebook.com/share/187onm4iLL/" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-royal-gold/30 flex items-center justify-center hover:bg-royal-gold hover:text-royal-maroon transition duration-300">
              <i className="fa-brands fa-facebook-f"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 pt-8 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] tracking-[0.2em] opacity-50 uppercase">
          <p>Registered in India, Jodhpur 342013</p>
          <p>© {currentYear} ANMOL ART • ALL RIGHTS RESERVED</p>
        </div>
      </div>
    </footer>
  );
}