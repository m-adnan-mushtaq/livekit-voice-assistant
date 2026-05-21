import SectionContainer from "./shared/SectionContainer";

const matchSteps = [
  { number: 1, label: "Goal", detail: "Strength, flexibility, or calm" },
  { number: 2, label: "Experience", detail: "First-timer to advanced" },
  { number: 3, label: "Time", detail: "Your perfect time zone" },
  { number: 4, label: "Preference", detail: "Instructor style & energy" },
  { number: 5, label: "Availability", detail: "Real-time calendar sync" },
  { number: 6, label: "Session", detail: "Duration and intensity" },
];

export default function HowAlexaMatchesSection() {
  return (
    <section className="py-stack-xl">
      <SectionContainer>
        <div className="mb-16 text-center">
          <h2 className="font-display-lg mb-4 text-headline-md">
            How Alexa Finds the Right Session for You
          </h2>
          <p className="mx-auto max-w-2xl font-body-lg text-on-surface-variant">
            Alexa doesn&apos;t just book a random slot. It listens, understands,
            and helps create a better match.
          </p>
        </div>

        <div className="relative overflow-hidden rounded-xl bg-primary/5 p-8 md:p-12">
          <div
            className="absolute -right-32 -top-32 h-64 w-64 rounded-full bg-primary/5 blur-3xl"
            aria-hidden
          />
          <div className="relative z-10 grid grid-cols-2 gap-6 md:grid-cols-3 md:gap-8 lg:grid-cols-6">
            {matchSteps.map((step) => (
              <div key={step.label} className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary font-label-caps text-label-caps text-on-primary">
                  {step.number}
                </div>
                <h5 className="mb-2 font-label-caps text-label-caps">
                  {step.label}
                </h5>
                <p className="text-[12px] text-on-surface-variant">
                  {step.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}
