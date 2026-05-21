import SectionContainer from "./shared/SectionContainer";

const steps = [
  {
    icon: "mic",
    title: "Speak your goal",
    description:
      "Tell Alexa what your body needs today—flexibility, peace, or strength.",
  },
  {
    icon: "calendar_today",
    title: "Choose your time",
    description:
      "Pick a slot that fits your schedule. Our instructors are available 24/7 globally.",
  },
  {
    icon: "videocam",
    title: "Join online",
    description:
      "Step onto your mat and connect with your personal guide in a high-def virtual studio.",
  },
];

export default function IntroSection() {
  return (
    <section className="py-stack-xl">
      <SectionContainer>
        <h2 className="font-display-lg mb-16 text-center text-headline-md">
          Yoga that listens to you
        </h2>
        <div className="grid grid-cols-1 gap-gutter md:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.title}
              className="yoga-card flex flex-col items-center rounded-xl bg-surface-container-low p-stack-lg text-center"
            >
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary-container">
                <span
                  className="material-symbols-outlined text-on-primary-container"
                  style={{ fontSize: 32 }}
                >
                  {step.icon}
                </span>
              </div>
              <h3 className="mb-4 font-headline-sm text-headline-sm">
                {step.title}
              </h3>
              <p className="text-on-surface-variant">{step.description}</p>
            </div>
          ))}
        </div>
      </SectionContainer>
    </section>
  );
}
