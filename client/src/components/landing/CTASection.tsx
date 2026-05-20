import TalkToAlexaButton from "../ui/TalkToAlexaButton";

export default function CTASection() {
  return (
    <section className="py-stack-xl">
      <div className="max-w-container-max mx-auto px-6 md:px-margin-desktop">
        <div className="bg-primary-container/20 rounded-[48px] p-12 md:p-20 text-center relative overflow-hidden">
          <div className="absolute inset-0 wave-bg scale-150 rotate-12 opacity-5" />
          <div className="relative z-10">
            <h2 className="font-display-lg-mobile md:font-display-lg text-on-surface mb-6">
              Ready for a calmer start?
            </h2>
            <p className="font-body-lg text-secondary max-w-xl mx-auto mb-10 leading-relaxed">
              Take the first step towards a more mindful daily routine. Our
              community is waiting to welcome you with open arms.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <TalkToAlexaButton
                variant="primary"
                label="Book Your First Session"
              />
              <TalkToAlexaButton
                variant="secondary"
                label="Learn More About Alexa"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
