import { useState, useEffect } from "react";
import { isSupabaseConfigured } from "../lib/supabase";
import { listActiveFaqs } from "../services/faqs.service";
import Reveal from "./motion/Reveal";
import type { FAQ as FAQItem } from "./admin/types";

const FALLBACK_FAQS: FAQItem[] = [
  {
    id: "1", question: "Are all your products genuinely handmade?",
    answer: "Yes, 100%. We work directly with master artisans in Rajasthan. Every piece is handcrafted using traditional tools, making each creation a unique masterpiece with no two items exactly alike.",
    display_order: 0, active: true, created_at: "",
  },
  {
    id: "2", question: "Do you ship internationally?",
    answer: "Absolutely. We have a robust export network and ship to the USA, UK, Europe, and the Middle East. We use specialized wooden crate packaging to ensure safety during transit.",
    display_order: 1, active: true, created_at: "",
  },
  {
    id: "3", question: "How do I care for antique wood and brass?",
    answer: "For wood, use a dry micro-fiber cloth. For brass, a mix of lemon and baking soda or professional polish works best. Avoid direct sunlight to preserve the natural luster.",
    display_order: 2, active: true, created_at: "",
  },
  {
    id: "4", question: "Can I request a custom architectural design?",
    answer: "Yes. We collaborate with architects and interior designers for bespoke projects. You can share your sketches or CAD designs, and our team will bring them to life.",
    display_order: 3, active: true, created_at: "",
  },
];

export default function FAQ() {
  const [faqs, setFaqs]         = useState<FAQItem[]>(FALLBACK_FAQS);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!isSupabaseConfigured) return;
    listActiveFaqs()
      .then((data) => {
        if (data.length > 0) setFaqs(data);
      })
      .catch((err) => console.error("[FAQ] failed to load faqs", err));
  }, []);

  return (
    <section id="faq" className="bg-[#FBF6E6] py-32 scroll-mt-28">
      <div className="container mx-auto px-6 max-w-4xl">
        <Reveal className="text-center mb-20">
          <span className="text-royal-gold font-serif italic text-lg block mb-2">Help & Support</span>
          <h2 className="font-serif text-5xl font-bold text-royal-maroon">Common Queries</h2>
          <div className="w-16 h-1 bg-royal-gold mx-auto mt-4" />
        </Reveal>

        <div className="space-y-4">
          {faqs.map((item, index) => (
            <Reveal key={item.id} delay={index * 0.06} y={16}>
              <div className="bg-white rounded-xl shadow-sm border border-royal-gold/10 overflow-hidden transition-all duration-300">
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  aria-expanded={openIndex === index}
                  className="w-full flex justify-between items-center px-8 py-6 text-left group"
                >
                  <span className={`text-lg font-bold transition-colors ${openIndex === index ? "text-royal-gold" : "text-earthy-brown group-hover:text-royal-maroon"}`}>
                    {item.question}
                  </span>
                  <span className={`text-2xl transition-transform duration-300 flex-shrink-0 ml-4 ${openIndex === index ? "rotate-45 text-royal-gold" : "text-royal-maroon"}`}>
                    +
                  </span>
                </button>

                <div className={`overflow-hidden transition-all duration-500 ${openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
                  <div className="px-8 pb-8 text-earthy-brown leading-relaxed border-t border-gray-50 pt-4">
                    {item.answer}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
