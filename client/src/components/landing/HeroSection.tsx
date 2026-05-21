import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAlexaConnection } from "../../hooks/useAlexaConnection";
import AlexaVoiceCard from "./shared/AlexaVoiceCard";
import { ASSETS } from "./shared/constants";
import VideoBackground from "./shared/VideoBackground";

export default function HeroSection() {
  const navigate = useNavigate();
  const { name, setName, startCall, isConnecting, error } =
    useAlexaConnection();
  const [inputValue, setInputValue] = useState(name);
  const [showConnect, setShowConnect] = useState(false);

  useEffect(() => {
    const openConnect = () => setShowConnect(true);
    window.addEventListener("open-alexa-connect", openConnect);
    return () => window.removeEventListener("open-alexa-connect", openConnect);
  }, []);

  const openConnect = () => {
    setShowConnect(true);
    setTimeout(() => document.getElementById("hero-name-input")?.focus(), 100);
  };

  const handleConnect = async () => {
    if (!inputValue.trim()) return;
    setName(inputValue.trim());
    const token = await startCall(inputValue.trim());
    if (token) {
      navigate("/alexa", { state: { token, name: inputValue.trim() } });
    }
  };

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
          <button
            type="button"
            onClick={openConnect}
            className="w-full rounded-full bg-primary px-10 py-4 font-label-caps text-label-caps text-on-primary transition-all hover:-translate-y-0.5 hover:shadow-lg sm:w-auto"
          >
            Book with Alexa
          </button>
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

        {showConnect && (
          <div className="mx-auto mt-8 max-w-md space-y-3 text-left">
            <label
              htmlFor="hero-name-input"
              className="block font-label-caps text-label-caps text-on-surface-variant"
            >
              Enter your name to begin
            </label>
            <input
              id="hero-name-input"
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Your name"
              className="w-full rounded-2xl border border-outline-variant/40 bg-surface-container-lowest px-4 py-3 font-body-md text-on-surface outline-none placeholder:text-on-surface-variant/70 focus:border-primary"
              onKeyDown={(e) => e.key === "Enter" && handleConnect()}
            />
            <button
              type="button"
              onClick={handleConnect}
              disabled={isConnecting || !inputValue.trim()}
              className="w-full rounded-full bg-primary px-8 py-3.5 font-label-caps text-label-caps text-on-primary transition-all hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isConnecting ? "Connecting..." : "Start voice session"}
            </button>
            {error && (
              <p className="text-center font-body-sm text-error">{error}</p>
            )}
          </div>
        )}

        <AlexaVoiceCard />
      </div>
    </section>
  );
}
