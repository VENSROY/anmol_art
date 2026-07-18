import { useState } from "react";
import { isSupabaseConfigured } from "../lib/supabase";
import { createContactSubmission } from "../services/contactSubmissions.service";
import { useSiteConfig } from "../hooks/useSiteConfig";
import Icon from "./ui/Icon";

interface FormState {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const EMPTY_FORM: FormState = { name: "", email: "", phone: "", message: "" };

export default function Contact() {
  const { get } = useSiteConfig();
  const [form, setForm]       = useState<FormState>(EMPTY_FORM);
  const [status, setStatus]   = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errMsg, setErrMsg]   = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.message.trim()) return;
    setStatus("submitting");
    setErrMsg("");

    if (!isSupabaseConfigured) {
      // Fallback: open WhatsApp with message content
      const text = `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nMessage: ${form.message}`;
      window.open(`https://wa.me/${get("whatsapp_number")}?text=${encodeURIComponent(text)}`, "_blank");
      setStatus("success");
      setForm(EMPTY_FORM);
      return;
    }

    try {
      await createContactSubmission(form);
      setStatus("success");
      setForm(EMPTY_FORM);
    } catch {
      setStatus("error");
      setErrMsg("Submission failed. Please try WhatsApp or email directly.");
    }
  };

  const phone       = get("phone");
  const waNumber    = get("whatsapp_number");
  const email       = get("email");
  const address     = get("address");
  const hours       = get("business_hours");
  const instagram   = get("instagram_url");
  const facebook    = get("facebook_url");

  return (
    <section id="contact" className="bg-ivory py-32 scroll-mt-28">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="relative bg-royal-maroon text-ivory rounded-[3rem] shadow-2xl overflow-hidden">
          <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/az-subtle.png')]" aria-hidden="true" />

          <div className="relative z-10 px-8 py-24 md:px-20">
            <div className="text-center mb-20">
              <h2 className="font-serif text-5xl md:text-6xl font-bold text-white mb-6">
                Let's Build <span className="text-royal-gold">Together</span>
              </h2>
              <p className="max-w-2xl mx-auto text-lg text-gray-300 leading-relaxed font-light">
                Whether it's a single masterpiece for your home or a bulk order for a hotel project, our doors are always open for a conversation.
              </p>
            </div>

            {/* Contact cards */}
            <div className="grid lg:grid-cols-3 gap-8 mb-20">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-10 rounded-3xl hover:bg-white hover:text-royal-maroon transition-all duration-500 group">
                <div className="w-14 h-14 bg-royal-gold/20 rounded-full flex items-center justify-center mb-6 group-hover:bg-royal-maroon">
                  <Icon name="fa-location-dot" className="text-royal-gold text-2xl group-hover:text-white" />
                </div>
                <h4 className="font-serif text-2xl font-bold mb-4">Visit Showroom</h4>
                <p className="text-sm leading-relaxed opacity-80 group-hover:opacity-100">{address}</p>
                {hours && <p className="text-xs mt-3 opacity-60 group-hover:opacity-80">{hours}</p>}
              </div>

              <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-10 rounded-3xl hover:bg-white hover:text-royal-maroon transition-all duration-500 group">
                <div className="w-14 h-14 bg-royal-gold/20 rounded-full flex items-center justify-center mb-6 group-hover:bg-royal-maroon">
                  <Icon name="fa-phone" className="text-royal-gold text-2xl group-hover:text-white" />
                </div>
                <h4 className="font-serif text-2xl font-bold mb-4">Quick Connect</h4>
                <a href={`tel:${phone.replace(/\s/g, "")}`} className="text-xl font-bold block hover:text-royal-gold transition group-hover:text-royal-maroon">{phone}</a>
                <a
                  href={`https://wa.me/${waNumber}`}
                  target="_blank" rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-2 bg-green-500 text-white text-xs font-bold px-4 py-1.5 rounded-full hover:bg-green-600 transition"
                >
                  <Icon name="fa-whatsapp" /> WhatsApp
                </a>
              </div>

              <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-10 rounded-3xl hover:bg-white hover:text-royal-maroon transition-all duration-500 group">
                <div className="w-14 h-14 bg-royal-gold/20 rounded-full flex items-center justify-center mb-6 group-hover:bg-royal-maroon">
                  <Icon name="fa-envelope" className="text-royal-gold text-2xl group-hover:text-white" />
                </div>
                <h4 className="font-serif text-2xl font-bold mb-4">Email Inquiry</h4>
                <a href={`mailto:${email}`} className="text-base font-medium opacity-80 group-hover:opacity-100 hover:text-royal-gold transition break-all">{email}</a>
              </div>
            </div>

            {/* Inquiry Form */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-10 md:p-14">
              <h3 className="font-serif text-3xl font-bold text-white mb-2">Send an Enquiry</h3>
              <p className="text-gray-300 text-sm mb-8">We'll get back to you within 24 hours.</p>

              {status === "success" ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-green-500/20 border border-green-400/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="fa-check" className="text-green-400 text-2xl" />
                  </div>
                  <p className="text-white font-bold text-xl mb-2">Message Sent!</p>
                  <p className="text-gray-300 text-sm">We'll be in touch soon. You can also reach us directly on WhatsApp.</p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="mt-6 text-royal-gold text-sm hover:underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <div className="grid sm:grid-cols-2 gap-5 mb-5">
                    <div>
                      <label htmlFor="contact-name" className="block text-xs font-bold uppercase tracking-widest text-white/50 mb-2">
                        Name *
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Your full name"
                        required
                        className="w-full bg-white/10 border border-white/20 text-white placeholder-white/30
                          rounded-xl px-4 py-3 text-sm outline-none focus:border-royal-gold transition"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-email" className="block text-xs font-bold uppercase tracking-widest text-white/50 mb-2">
                        Email
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        className="w-full bg-white/10 border border-white/20 text-white placeholder-white/30
                          rounded-xl px-4 py-3 text-sm outline-none focus:border-royal-gold transition"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-phone" className="block text-xs font-bold uppercase tracking-widest text-white/50 mb-2">
                        Phone / WhatsApp
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+91 98XXX XXXXX"
                        className="w-full bg-white/10 border border-white/20 text-white placeholder-white/30
                          rounded-xl px-4 py-3 text-sm outline-none focus:border-royal-gold transition"
                      />
                    </div>
                    <div className="sm:row-span-2">
                      <label htmlFor="contact-message" className="block text-xs font-bold uppercase tracking-widest text-white/50 mb-2">
                        Message *
                      </label>
                      <textarea
                        id="contact-message"
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Tell us about your requirement…"
                        required
                        rows={5}
                        className="w-full h-full min-h-[120px] bg-white/10 border border-white/20 text-white placeholder-white/30
                          rounded-xl px-4 py-3 text-sm outline-none focus:border-royal-gold transition resize-none"
                      />
                    </div>
                  </div>

                  {status === "error" && (
                    <p role="alert" className="text-red-300 text-sm mb-4 flex items-center gap-2">
                      <Icon name="fa-triangle-exclamation" /> {errMsg}
                    </p>
                  )}

                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      type="submit"
                      disabled={status === "submitting" || !form.name.trim() || !form.message.trim()}
                      className="flex items-center justify-center gap-2 bg-royal-gold text-royal-maroon
                        px-10 py-4 font-bold uppercase tracking-widest text-sm
                        hover:bg-white transition disabled:opacity-50 disabled:cursor-not-allowed rounded-xl"
                    >
                      {status === "submitting" ? (
                        <><div className="w-4 h-4 border-2 border-royal-maroon border-t-transparent rounded-full animate-spin" /> Sending…</>
                      ) : (
                        <><Icon name="fa-paper-plane" /> Send Message</>
                      )}
                    </button>
                    <a
                      href={`https://wa.me/${waNumber}?text=Hello ANMOL Art! I have an enquiry.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 bg-green-600 text-white
                        px-10 py-4 font-bold uppercase tracking-widest text-sm
                        hover:bg-green-500 transition rounded-xl"
                    >
                      <Icon name="fa-whatsapp" className="text-lg" /> WhatsApp Instead
                    </a>
                  </div>
                </form>
              )}
            </div>

            {/* Social links */}
            <div className="mt-16 flex flex-col items-center">
              <p className="uppercase tracking-[0.3em] text-xs text-royal-gold font-bold mb-8">Follow Our Journey</p>
              <div className="flex gap-6">
                {[
                  { icon: <Icon name="fa-instagram" aria-hidden="true" />, link: instagram,  label: "Follow us on Instagram" },
                  { icon: <Icon name="fa-facebook-f" aria-hidden="true" />, link: facebook,   label: "Follow us on Facebook" },
                  { icon: <Icon name="fa-whatsapp"  aria-hidden="true" />, link: `https://wa.me/${waNumber}`, label: "Chat with us on WhatsApp" },
                ].map((social) => (
                  <a
                    key={social.link}
                    href={social.link}
                    aria-label={social.label}
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
