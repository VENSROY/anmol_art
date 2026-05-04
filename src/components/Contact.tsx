import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaInstagram, FaFacebookF, FaWhatsapp } from "react-icons/fa";

export default function Contact() {
  return (
    <section id="contact" className="bg-ivory py-32 scroll-mt-28">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="relative bg-royal-maroon text-ivory rounded-[3rem] shadow-2xl overflow-hidden">
          
          <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/az-subtle.png')]" />
          
          <div className="relative z-10 px-8 py-24 md:px-20">
            <div className="text-center mb-20">
              <h2 className="font-serif text-5xl md:text-6xl font-bold text-white mb-6">
                Let's Build <span className="text-royal-gold">Together</span>
              </h2>
              <p className="max-w-2xl mx-auto text-lg text-gray-300 leading-relaxed font-light">
                Whether it's a single masterpiece for your home or a bulk order for a hotel project, our doors are always open for a conversation.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-10 rounded-3xl hover:bg-white hover:text-royal-maroon transition-all duration-500 group">
                <div className="w-14 h-14 bg-royal-gold/20 rounded-full flex items-center justify-center mb-6 group-hover:bg-royal-maroon">
                   <FaMapMarkerAlt className="text-royal-gold text-2xl group-hover:text-white" />
                </div>
                <h4 className="font-serif text-2xl font-bold mb-4">Visit Showroom</h4>
                <p className="text-sm leading-relaxed opacity-80 group-hover:opacity-100">
                  109, G.M. City, Near Amrawati Nagar, Sangriya, Salawas Road, Jodhpur (342013)
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-10 rounded-3xl hover:bg-white hover:text-royal-maroon transition-all duration-500 group">
                <div className="w-14 h-14 bg-royal-gold/20 rounded-full flex items-center justify-center mb-6 group-hover:bg-royal-maroon">
                   <FaPhoneAlt className="text-royal-gold text-2xl group-hover:text-white" />
                </div>
                <h4 className="font-serif text-2xl font-bold mb-4">Quick Connect</h4>
                <p className="text-xl font-bold mb-1">+91 98280 37575</p>
                <p className="text-sm opacity-60 group-hover:text-royal-maroon/60">Mon – Sun, 10:00 AM – 7:00 PM</p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-10 rounded-3xl hover:bg-white hover:text-royal-maroon transition-all duration-500 group">
                <div className="w-14 h-14 bg-royal-gold/20 rounded-full flex items-center justify-center mb-6 group-hover:bg-royal-maroon">
                   <FaEnvelope className="text-royal-gold text-2xl group-hover:text-white" />
                </div>
                <h4 className="font-serif text-2xl font-bold mb-4">Email Inquiry</h4>
                <p className="text-lg font-medium opacity-80 group-hover:opacity-100">anmolart75@gmail.com</p>
              </div>
            </div>

            <div className="mt-20 flex flex-col items-center">
              <p className="uppercase tracking-[0.3em] text-xs text-royal-gold font-bold mb-8">Follow Our Journey</p>
              <div className="flex gap-6">
                {[
                  { icon: <FaInstagram />, link: "https://www.instagram.com/anmolart_75" },
                  { icon: <FaFacebookF />, link: "https://www.facebook.com/share/187onm4iLL/" },
                  { icon: <FaWhatsapp />, link: "https://wa.me/919828037575" }
                ].map((social, i) => (
                  <a
                    key={i}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center text-xl hover:bg-royal-gold hover:text-royal-maroon hover:border-royal-gold transition-all duration-300"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}