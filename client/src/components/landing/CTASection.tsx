import TalkToAlexaButton from "../ui/TalkToAlexaButton";

export default function CTASection() {
  return (
    <section className="py-12 sm:py-16 lg:py-xl">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-gutter">
        <div className="relative bg-primary-container rounded-xl sm:rounded-2xl overflow-hidden p-6 sm:p-10 lg:p-xl text-on-primary-container">
          <div className="absolute -right-20 -top-20 w-60 sm:w-80 h-60 sm:h-80 bg-white/20 blur-[80px] rounded-full" />

          <div className="relative z-10 text-center max-w-3xl mx-auto space-y-4 sm:space-y-6">
            <h2 className="font-headline text-2xl sm:text-4xl lg:text-headline-xl">
              Let Alexa book your next yoga session.
            </h2>
            <p className="text-base sm:text-lg opacity-90">
              Ask a question, choose a time, and confirm your 30-minute online
              yoga class in one simple call.
            </p>
            <div className="pt-2 sm:pt-4">
              <TalkToAlexaButton variant="cta" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
