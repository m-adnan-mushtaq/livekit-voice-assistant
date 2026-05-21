import TalkToAlexaButton from "../ui/TalkToAlexaButton";
import SectionContainer from "./shared/SectionContainer";

export default function CTASection() {
  return (
    <section className="mb-stack-xl mt-stack-xl">
      <SectionContainer className="max-w-5xl">
        <div className="relative overflow-hidden rounded-xl bg-tertiary-container p-stack-lg text-center md:p-20">
          <div
            className="absolute -left-16 -top-16 h-32 w-32 rounded-full bg-primary/10 blur-3xl"
            aria-hidden
          />
          <div
            className="absolute -bottom-24 -right-24 h-48 w-48 rounded-full bg-primary/10 blur-3xl"
            aria-hidden
          />
          <h2 className="relative z-10 mb-6 font-display-lg text-headline-md text-on-tertiary-container md:text-display-lg">
            Ready to begin your yoga journey?
          </h2>
          <p className="relative z-10 mx-auto mb-10 max-w-2xl font-body-lg text-on-tertiary-container/80">
            Your personal sanctuary is just a voice command away. Enter the
            AI-enhanced studio and let Alexa guide your practice.
          </p>
          <TalkToAlexaButton
            variant="primary"
            label="Enter Alexa Room"
            className="relative z-10 shadow-xl hover:shadow-2xl"
          />
        </div>
      </SectionContainer>
    </section>
  );
}
