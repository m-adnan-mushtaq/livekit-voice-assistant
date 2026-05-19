export default function BenefitsSection() {
  const benefits = [
    {
      icon: "support_agent",
      title: "24/7 booking assistant",
      description:
        "Available even when the studio is dark. Alexa never sleeps.",
    },
    {
      icon: "event_available",
      title: "Real-time availability",
      description:
        "Direct integration with your booking engine for live accuracy.",
    },
    {
      icon: "record_voice_over",
      title: "Natural voice",
      description:
        "Conversations that feel empathetic and grounded, just like a front-desk greeting.",
    },
    {
      icon: "self_improvement",
      title: "Beginner-friendly",
      description:
        "Intelligent guidance for those new to yoga, helping them find the right class.",
    },
    {
      icon: "bolt",
      title: "Faster booking flow",
      description:
        "Reduced cognitive load for your users. Just talk and confirm.",
    },
    {
      icon: "contact_support",
      title: "Fewer repetitive questions",
      description:
        "Alexa handles standard queries, freeing up your time for teaching.",
    },
  ];

  return (
    <section
      id="benefits"
      className="py-12 sm:py-16 lg:py-xl bg-surface-container-low"
    >
      <div className="max-w-container-max mx-auto px-4 sm:px-6 lg:px-gutter">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-4 sm:gap-6 mb-8 sm:mb-12 lg:mb-xl">
          <div className="max-w-2xl">
            <h2 className="font-headline text-2xl sm:text-3xl lg:text-headline-lg mb-2 sm:mb-3">
              Built for yoga studios that want fewer missed bookings.
            </h2>
            <p className="text-on-surface-variant text-sm sm:text-base">
              Streamline your operations with intelligence.
            </p>
          </div>
          <div className="glass-card p-3 sm:p-4 rounded-lg flex items-center gap-3 sm:gap-4 border-primary/20">
            <div className="text-primary font-bold text-2xl sm:text-headline-md">
              30s
            </div>
            <div className="text-xs sm:text-sm text-on-surface-variant">
              Avg. demo booking flow
              <br className="hidden sm:block" /> after slot selection
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-lg">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="glass-card p-4 sm:p-6 lg:p-lg rounded-xl lg:rounded-lg border-white/5 hover:bg-white/10 transition-all"
            >
              <span className="material-symbols-outlined text-tertiary text-2xl sm:text-3xl mb-2 sm:mb-3 block">
                {benefit.icon}
              </span>
              <h3 className="text-base sm:text-lg lg:text-headline-sm mb-1 sm:mb-2 font-medium">
                {benefit.title}
              </h3>
              <p className="text-on-surface-variant text-sm">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
