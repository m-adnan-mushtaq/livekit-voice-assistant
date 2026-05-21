import TalkToAlexaButton from "../ui/TalkToAlexaButton";
import AlexaVoiceCard from "./shared/AlexaVoiceCard";
import { ASSETS } from "./shared/constants";
import VideoBackground from "./shared/VideoBackground";

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative flex min-h-[90vh] items-center justify-center overflow-hidden pt-20"
    >
      <VideoBackground
        src={ASSETS.videoBg}
        poster={ASSETS.heroImage}
        className="z-0"
      />
      <div className="hero-gradient absolute inset-0 z-[1]" aria-hidden />

      <div className="relative z-10 max-w-4xl px-container-padding-mobile text-center">
        <h1 className="hero-title mb-6">
          Breathe, Stretch, and Book Your{" "}
          <span className="hero-title-accent">Yoga Session</span> with Ease
        </h1>
        <p className="hero-lead mx-auto mb-10 max-w-2xl">
          Talk to Alexa, share your yoga goals, and book a private 1:1 online
          yoga session with a real instructor.
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <TalkToAlexaButton variant="primary" label="Talk with Alexa" />
          <button
            type="button"
            onClick={() =>
              document
                .getElementById("sessions")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="w-full rounded-full border border-primary px-10 py-4 font-label-caps text-label-caps text-primary transition-all hover:bg-primary/5 sm:w-auto"
          >
            Explore Sessions
          </button>
        </div>

        <AlexaVoiceCard />
      </div>
    </section>
  );
}
