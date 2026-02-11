import { useState } from "react";

export default function FAQ() {
  const faqs = [
    {
      q: "Are all your products genuinely handmade?",
      a: "Yes, 100%. We work directly with artisans across India. Every piece is handcrafted, making each creation unique and authentic.",
    },
    {
      q: "Do you ship internationally?",
      a: "Absolutely. We ship worldwide including USA, UK, Canada, Europe, and the Middle East with secure packaging.",
    },
    {
      q: "How do I care for brass artifacts?",
      a: "Brass can be cleaned using a soft cloth with lemon and salt or a specialized brass polish to maintain its shine.",
    },
    {
      q: "Can I customize a furniture order?",
      a: "Yes. We specialize in custom woodwork. Contact us with your requirements and we’ll guide you through the process.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section
      id="faq"
      className="bg-[#FBF6E6] py-28 scroll-mt-28"
    >
      <div className="container mx-auto px-6 max-w-5xl">
        {/* Heading */}
        <h2 className="text-center font-serif text-5xl font-bold text-royal-maroon mb-20">
          Frequently Asked Questions
        </h2>

        {/* FAQ Items */}
        <div className="space-y-8">
          {faqs.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-sm overflow-hidden flex"
            >
              {/* Left maroon strip */}
              <div className="w-2 bg-royal-maroon"></div>

              {/* Content */}
              <div className="flex-1">
                <button
                  onClick={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                  className="w-full flex justify-between items-center px-8 py-6 text-left"
                >
                  <span className="text-xl font-semibold text-earthy-brown">
                    {item.q}
                  </span>

                  <span className="text-royal-gold text-3xl font-bold">
                    {openIndex === index ? "−" : "+"}
                  </span>
                </button>

                {openIndex === index && (
                  <div className="px-8 pb-6 text-earthy-brown leading-relaxed">
                    {item.a}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
