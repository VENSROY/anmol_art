import { useState } from "react";

export default function FAQ() {
  const faqs = [
    {
      q: "Are all your products genuinely handmade?",
      a: "Yes, 100%. We work directly with master artisans in Rajasthan. Every piece is handcrafted using traditional tools, making each creation a unique masterpiece with no two items exactly alike.",
    },
    {
      q: "Do you ship internationally?",
      a: "Absolutely. We have a robust export network and ship to the USA, UK, Europe, and the Middle East. We use specialized wooden crate packaging to ensure safety during transit.",
    },
    {
      q: "How do I care for antique wood and brass?",
      a: "For wood, use a dry micro-fiber cloth. For brass, a mix of lemon and baking soda or professional polish works best. Avoid direct sunlight to preserve the natural luster.",
    },
    {
      q: "Can I request a custom architectural design?",
      a: "Yes. We collaborate with architects and interior designers for bespoke projects. You can share your sketches or CAD designs, and our team will bring them to life.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section id="faq" className="bg-[#FBF6E6] py-32 scroll-mt-28">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-20">
          <span className="text-royal-gold font-serif italic text-lg block mb-2">Help & Support</span>
          <h2 className="font-serif text-5xl font-bold text-royal-maroon">Common Queries</h2>
          <div className="w-16 h-1 bg-royal-gold mx-auto mt-4"></div>
        </div>

        <div className="space-y-4">
          {faqs.map((item, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-royal-gold/10 overflow-hidden transition-all duration-300">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex justify-between items-center px-8 py-6 text-left group"
              >
                <span className={`text-lg font-bold transition-colors ${openIndex === index ? "text-royal-gold" : "text-earthy-brown group-hover:text-royal-maroon"}`}>
                  {item.q}
                </span>
                <span className={`text-2xl transition-transform duration-300 ${openIndex === index ? "rotate-45 text-royal-gold" : "text-royal-maroon"}`}>
                  +
                </span>
              </button>

              <div className={`overflow-hidden transition-all duration-500 ${openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
                <div className="px-8 pb-8 text-earthy-brown leading-relaxed border-t border-gray-50 pt-4">
                  {item.a}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}