import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaInstagram,
  FaFacebookF,
  FaWhatsapp,
} from "react-icons/fa";

export default function Contact() {
  return (
    <section
      id="contact"
      className="bg-ivory py-28 scroll-mt-28"
    >
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="relative bg-royal-maroon text-ivory rounded-2xl shadow-2xl overflow-hidden">

          {/* Decorative Background */}
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')]" />

          <div className="relative z-10 px-10 py-20">

            {/* Center Heading */}
            <div className="text-center mb-16">
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-royal-gold mb-4">
                Get In Touch
              </h2>

              <div className="mx-auto w-32 h-[2px] bg-royal-gold mb-6" />

              <p className="max-w-2xl mx-auto text-lg opacity-90 leading-relaxed">
                Have a query regarding our collection or a custom order?
                We would love to hear from you.
              </p>
            </div>

            {/* Contact Info Cards */}
            <div className="grid md:grid-cols-3 gap-10">

              {/* Visit Us */}
              <div className="bg-earthy-brown/40 border border-royal-gold/40 rounded-xl p-8 hover:bg-ivory hover:text-royal-maroon transition duration-500 group">
                <FaMapMarkerAlt className="text-royal-gold text-3xl mb-4 group-hover:text-royal-maroon" />
                <h4 className="font-serif text-xl font-bold mb-3">
                  Visit Us
                </h4>
                <p className="text-sm leading-relaxed opacity-90">
                  109, G.M. City, Behind Amrawati Nagar,
                  <br />
                  Sangriya, Salawas Road,
                  <br />
                  Jodhpur Raj (342013)
                </p>
              </div>

              {/* Call Us */}
              <div className="bg-earthy-brown/40 border border-royal-gold/40 rounded-xl p-8 hover:bg-ivory hover:text-royal-maroon transition duration-500 group">
                <FaPhoneAlt className="text-royal-gold text-3xl mb-4 group-hover:text-royal-maroon" />
                <h4 className="font-serif text-xl font-bold mb-3">
                  Call Us
                </h4>
                <p className="text-sm opacity-90">
                  9828037575
                </p>
                <p className="text-xs opacity-70 mt-1">
                  Mon – Sun, 10am – 7pm
                </p>
              </div>

              {/* Email */}
              <div className="bg-earthy-brown/40 border border-royal-gold/40 rounded-xl p-8 hover:bg-ivory hover:text-royal-maroon transition duration-500 group">
                <FaEnvelope className="text-royal-gold text-3xl mb-4 group-hover:text-royal-maroon" />
                <h4 className="font-serif text-xl font-bold mb-3">
                  Email
                </h4>
                <p className="text-sm opacity-90">
                  anmolart75@gmail.com
                </p>
              </div>

            </div>

            {/* Social Icons */}
            <div className="flex justify-center gap-8 mt-16">

              {/* Instagram */}
              <a
                href="https://www.instagram.com/anmolart_75?utm_source=qr&igsh=MWo2ZGxzYmZwZ2Yydw=="
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full border border-royal-gold flex items-center justify-center text-royal-gold hover:bg-royal-gold hover:text-royal-maroon transition duration-300"
              >
                <FaInstagram />
              </a>

              {/* Facebook */}
              <a
                href="https://www.facebook.com/share/187onm4iLL/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full border border-royal-gold flex items-center justify-center text-royal-gold hover:bg-royal-gold hover:text-royal-maroon transition duration-300"
              >
                <FaFacebookF />
              </a>

              {/* WhatsApp */}
              <a
                href="https://wa.me/919828037575"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full border border-royal-gold flex items-center justify-center text-royal-gold hover:bg-royal-gold hover:text-royal-maroon transition duration-300"
              >
                <FaWhatsapp />
              </a>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
}