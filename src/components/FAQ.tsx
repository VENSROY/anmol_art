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
    <section id="faq" className="bg-sandstone py-32 md:py-40 scroll-mt-28">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <Reveal className="grid grid-cols-12 gap-6 mb-16">
          <div className="col-span-12 lg:col-span-3">
            <p className="caption text-brass">Enquiries</p>
          </div>
          <div className="col-span-12 lg:col-span-7">
            <h2 className="font-serif text-heading-1 text-ink font-light">
              Questions we are
              <span className="italic text-brass"> asked most.</span>
            </h2>
          </div>
        </Reveal>

        {/* Quiet editorial list — hairline rules rather than floating cards */}
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-start-4 lg:col-span-8 border-t border-ink/12">
            {faqs.map((item, index) => {
              const isOpen = openIndex === index;
              return (
                <Reveal key={item.id} delay={Math.min(index, 4) * 0.05} y={12}>
                  <div className="border-b border-ink/12">
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-panel-${item.id}`}
                      id={`faq-trigger-${item.id}`}
                      className="w-full flex justify-between items-start gap-6 py-7 text-left group"
                    >
                      <span
                        className={`font-serif text-heading-3 font-light transition-colors duration-[var(--dur-fast)] ${
                          isOpen ? "text-brass" : "text-ink group-hover:text-brass"
                        }`}
                      >
                        {item.question}
                      </span>
                      {/* Rotating rule instead of a plus glyph */}
                      <span className="relative flex-shrink-0 w-4 h-4 mt-2" aria-hidden="true">
                        <span className="absolute inset-x-0 top-1/2 h-px bg-current -translate-y-1/2 text-ink/50" />
                        <span
                          className={`absolute inset-y-0 left-1/2 w-px bg-current -translate-x-1/2 transition-transform duration-[var(--dur-base)] ease-craft ${
                            isOpen ? "scale-y-0 text-brass" : "scale-y-100 text-ink/50"
                          }`}
                        />
                      </span>
                    </button>

                    {/* grid-template-rows animates to real content height, so long
                        answers are never clipped the way a fixed max-h clipped them. */}
                    <div
                      id={`faq-panel-${item.id}`}
                      role="region"
                      aria-labelledby={`faq-trigger-${item.id}`}
                      className="grid transition-all duration-[var(--dur-base)] ease-craft"
                      style={{ gridTemplateRows: isOpen ? "1fr" : "0fr", opacity: isOpen ? 1 : 0 }}
                    >
                      <div className="overflow-hidden">
                        <p className="pb-8 pr-10 text-ink/65 text-body-base font-light max-w-2xl">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
