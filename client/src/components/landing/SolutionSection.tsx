export default function SolutionSection() {
  const steps = [
    {
      icon: "touch_app",
      title: "Click CTA",
      description: 'Visitor taps the "Talk with Alexa" button on your site.',
      isLast: false,
    },
    {
      icon: "forum",
      title: "Alexa answers",
      description:
        "Immediate voice response using your studio's unique knowledge.",
      isLast: false,
    },
    {
      icon: "calendar_month",
      title: "Checks availability",
      description:
        "Real-time sync with your calendar ensures no double bookings.",
      isLast: false,
    },
    {
      icon: "verified",
      title: "Visitor books",
      description: "Booking confirmed instantly. Link sent via SMS or email.",
      isLast: true,
    },
  ];

  return (
    <section id="solution" className="py-12 sm:py-16 lg:py-xl relative">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-gutter">
        <div className="text-center mb-8 sm:mb-12 lg:mb-xl">
          <h2 className="font-headline text-2xl sm:text-3xl lg:text-headline-lg mb-3 sm:mb-4">
            Alexa handles the conversation from first question to booked
            session.
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-md relative">
          <div className="hidden lg:block absolute top-8 left-[12%] right-[12%] h-px bg-white/10" />

          {steps.map((step) => (
            <div
              key={step.title}
              className="flex flex-col items-center text-center gap-3 sm:gap-4"
            >
              <div
                className={`w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full flex items-center justify-center transition-transform hover:scale-110 ${
                  step.isLast
                    ? "bg-primary text-on-primary"
                    : "bg-surface-container-high border border-white/10 text-primary"
                }`}
              >
                <span className="material-symbols-outlined text-xl sm:text-2xl lg:text-headline-md">
                  {step.icon}
                </span>
              </div>
              <h4 className="text-sm sm:text-base lg:text-headline-sm font-medium">
                {step.title}
              </h4>
              <p className="text-xs sm:text-sm text-on-surface-variant">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
