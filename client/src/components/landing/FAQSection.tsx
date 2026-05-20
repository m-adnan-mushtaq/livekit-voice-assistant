import { useState } from "react";

type FAQItem = {
  question: string;
  answer: string;
};

const faqs: FAQItem[] = [
  {
    question: "Do I need any previous yoga experience?",
    answer:
      "Not at all! Our sessions are specifically designed for complete beginners and those looking for a very gentle re-introduction to movement. We explain everything from the ground up.",
  },
  {
    question: "How do I access the online sessions?",
    answer:
      "Once you book through our website or via Alexa, you'll receive a confirmation email with a personal link. Simply click the link at the scheduled time to join the live session from your computer, tablet, or phone.",
  },
  {
    question: "What equipment do I need at home?",
    answer:
      "All you need is a comfortable, quiet space and loose clothing. A yoga mat is helpful but not essential—a rug or even a towel can work for these gentle sessions. Occasionally we might suggest a pillow or blanket for extra comfort.",
  },
  {
    question: "Can I book a session with Alexa anytime?",
    answer:
      'Yes! Alexa is available 24/7 to answer your questions, check class availability, and process your bookings. It\'s as simple as asking her to "Open Serene Flow Yoga."',
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <section id="faq" className="py-stack-xl">
      <div className="max-w-3xl mx-auto px-6 md:px-margin-desktop">
        <h2 className="font-headline-md text-on-surface text-center mb-stack-lg">
          Common Questions
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.question}
                className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl overflow-hidden shadow-sm transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="flex justify-between items-center w-full p-6 cursor-pointer text-left"
                >
                  <span className="font-body-lg text-on-surface font-medium pr-4">
                    {faq.question}
                  </span>
                  <span
                    className={`material-symbols-outlined text-on-surface-variant transition-transform flex-shrink-0 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  >
                    expand_more
                  </span>
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 pt-2">
                    <p className="font-body-md text-on-surface-variant">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
