export default function ProblemSection() {
  const problems = [
    {
      icon: "phone_missed",
      title: "Missed calls",
      description:
        "Don't let your busiest hours be the reason you lose a potential practitioner.",
    },
    {
      icon: "timer_off",
      title: "Slow booking flow",
      description:
        "Multi-page forms and email confirmations kill the spontaneous urge for wellness.",
    },
    {
      icon: "quiz",
      title: "Repeated FAQs",
      description:
        'Answering "what do I bring?" 50 times a day takes your focus away from the mat.',
    },
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-xl bg-surface-container-lowest">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-gutter">
        <div className="text-center mb-8 sm:mb-12 lg:mb-xl">
          <h2 className="font-headline text-2xl sm:text-3xl lg:text-headline-lg mb-3 sm:mb-4">
            Your visitors should not wait to book a calm moment.
          </h2>
          <p className="text-on-surface-variant text-sm sm:text-base max-w-2xl mx-auto">
            Traditional booking flows create friction when people are seeking
            peace.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-lg">
          {problems.map((problem) => (
            <div
              key={problem.title}
              className="glass-card p-4 sm:p-6 lg:p-lg rounded-xl lg:rounded-lg group hover:border-primary/30 transition-colors"
            >
              <span className="material-symbols-outlined text-secondary text-3xl sm:text-4xl lg:text-headline-lg mb-3 sm:mb-4 block">
                {problem.icon}
              </span>
              <h3 className="text-lg sm:text-xl lg:text-headline-sm mb-2 sm:mb-3">
                {problem.title}
              </h3>
              <p className="text-on-surface-variant text-sm sm:text-base">
                {problem.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
