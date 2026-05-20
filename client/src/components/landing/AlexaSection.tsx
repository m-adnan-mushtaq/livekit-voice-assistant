const steps = [
  {
    number: "1",
    title: "Click",
    description: "Tap the 'Talk with Alexa' button on any page.",
  },
  {
    number: "2",
    title: "Speak",
    description: "Ask Alexa about upcoming yoga sessions or availability.",
  },
  {
    number: "3",
    title: "Choose",
    description: "Listen to the options and pick the time that fits you best.",
  },
  {
    number: "4",
    title: "Confirm",
    description:
      "Confirm your session and receive your session link instantly.",
  },
];

export default function AlexaSection() {
  return (
    <section className="py-stack-xl">
      <div className="max-w-container-max mx-auto px-6 md:px-margin-desktop">
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="font-headline-md text-on-surface mb-6">
            Book easily with Alexa.
          </h2>
          <p className="font-body-lg text-secondary max-w-xl">
            Alexa is your friendly voice assistant, making wellness accessible
            with just a few simple words. No apps to navigate, just speak
            naturally.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
          <div className="hidden md:block absolute top-12 left-[12.5%] right-[12.5%] h-px bg-outline-variant/30 z-0" />
          {steps.map((step) => (
            <div
              key={step.number}
              className="relative z-10 flex flex-col items-center text-center p-4"
            >
              <div className="w-16 h-16 rounded-full bg-white border border-outline-variant/20 flex items-center justify-center text-primary mb-6 soft-ambient-shadow">
                <span className="font-headline-sm">{step.number}</span>
              </div>
              <h4 className="font-label-md mb-2">{step.title}</h4>
              <p className="font-body-md text-on-surface-variant">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
