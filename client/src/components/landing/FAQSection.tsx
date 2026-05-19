import { useState } from "react";

type FAQItem = {
  question: string;
  answer: string;
};

const faqs: FAQItem[] = [
  {
    question: "Who is Alexa?",
    answer:
      "Alexa is our proprietary AI assistant designed specifically for Serene Flow Yoga. She's trained on our schedules, styles, and philosophy to provide you with the most accurate and natural booking experience possible.",
  },
  {
    question: "Can beginners join?",
    answer:
      'Absolutely! Most of our classes are designed with modifications for all levels. Alexa can help you find the perfect "Gentle Start" session based on your current comfort level.',
  },
  {
    question: "What do I need for a 30-minute session?",
    answer:
      "Just a quiet space, a mat (or even a carpet), and a stable internet connection. Alexa will send you the specific link and details right after your call.",
  },
  {
    question: "Is the call free?",
    answer:
      "Yes, talking with Alexa is completely free. You only pay for the yoga sessions you choose to book through her.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-12 sm:py-16 lg:py-xl bg-surface-container-lowest">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-gutter">
        <h2 className="font-headline text-2xl sm:text-3xl lg:text-headline-lg text-center mb-8 sm:mb-12 lg:mb-xl">
          Frequently Asked Questions
        </h2>

        <div className="space-y-3 sm:space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-white/5 pb-3 sm:pb-4">
              <button
                onClick={() => toggleFAQ(index)}
                className="flex justify-between items-center w-full text-left text-base sm:text-lg lg:text-headline-sm py-2 sm:py-3 group"
              >
                <span className="pr-4">{faq.question}</span>
                <span
                  className={`material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-all duration-300 flex-shrink-0 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                >
                  expand_more
                </span>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-on-surface-variant text-sm sm:text-base mt-2 sm:mt-3">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
