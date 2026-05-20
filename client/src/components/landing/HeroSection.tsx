import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAlexaConnection } from "../../hooks/useAlexaConnection";

const HERO_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCPxu3Vjg0prCu_3JZ3URfSigEn1JCdGpxkBa-9tm96CVs_mSFbMpeBOsGDKWNwf7S-4a_uv40BsenRYGzeknwnLDkM7Jy_RO8HAKRR_UEFdHGAYdHESvJv7XMZsScmcXtJfUyWDmiHUshFxAvZ65TTh3MtmwDiSxGZbaa2r-H-9Q2ortNOINYCjRL-NUhGPwiyT8-OrTTrvT-nO-lrh0Dvmv1SZY-uJ667M_xz5U9CwDBYBFKZwafxHS_eqY-yFEqHkzMrzOGYKNE";

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

  const handleConnect = async () => {
    if (!inputValue.trim()) return;
    setName(inputValue.trim());
    const token = await startCall(inputValue.trim());
    if (token) {
      navigate("/alexa", { state: { token, name: inputValue.trim() } });
    }
  };

  const openConnect = () => {
    setShowConnect(true);
    setTimeout(() => {
      document.getElementById("hero-name-input")?.focus();
    }, 100);
  };

  return (
    <section
      id="home"
      className="relative pt-32 pb-stack-xl md:pt-48 md:pb-stack-xl overflow-hidden"
    >
      <div className="hero-glow -top-20 -left-32 hidden md:block" />
      <div className="hero-glow top-1/3 -right-40 opacity-60 hidden lg:block" />

      <div className="max-w-container-max mx-auto px-6 md:px-margin-desktop flex flex-col md:grid md:grid-cols-12 gap-12 items-center relative">
        <div className="md:col-span-6 space-y-6 md:space-y-8 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="hero-divider justify-center md:justify-start w-full max-w-xs md:max-w-none">
              <span className="hero-eyebrow whitespace-nowrap">
                Serene Flow Yoga
              </span>
            </div>

            <h1 className="hero-title">
              <span className="block">Gentle online yoga</span>
              <span className="block mt-1 md:mt-2">
                for a{" "}
                <span className="hero-title-script">calmer</span>
              </span>
              <span className="hero-title-italic block mt-1 md:mt-2 text-[0.92em]">
                body and mind.
              </span>
            </h1>
          </div>

          <p className="hero-lead max-w-lg mx-auto md:mx-0">
            Join <strong>beginner-friendly</strong> 30-minute sessions from
            home — gentle movement, breathwork, mobility, and deep relaxation.
            Book anytime with <strong>Alexa</strong>, your serene 24/7 voice
            assistant.
          </p>

          <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center md:justify-start pt-1">
            {["30 min sessions", "All levels welcome", "Voice booking"].map(
              (tag) => (
                <span
                  key={tag}
                  className="font-body-md text-on-surface-variant text-sm flex items-center gap-1.5"
                >
                  <span className="text-primary text-xs">✦</span>
                  {tag}
                </span>
              ),
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-2 justify-center md:justify-start">
            <button
              type="button"
              onClick={openConnect}
              className="hero-btn-primary bg-primary text-on-primary px-10 py-4 rounded-full soft-ambient-shadow hover:-translate-y-0.5 transition-all"
            >
              Book Appointment
            </button>
            <button
              type="button"
              data-action="talk-with-alexa"
              onClick={openConnect}
              className="hero-btn-secondary bg-secondary-container text-on-secondary-container px-10 py-4 rounded-full hover:opacity-90 transition-all flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-lg">mic</span>
              Talk with Alexa
            </button>
          </div>

          {showConnect && (
            <div className="max-w-md mx-auto md:mx-0 pt-4 space-y-3">
              <label
                htmlFor="hero-name-input"
                className="block hero-badge text-on-surface-variant text-left normal-case tracking-[0.14em]"
              >
                Enter your name to begin
              </label>
              <input
                id="hero-name-input"
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Your name"
                className="w-full rounded-2xl border border-outline-variant/40 bg-surface-container-lowest px-4 py-3 font-body-md text-on-surface outline-none placeholder:text-on-surface-variant/70 focus:border-primary transition-colors"
                onKeyDown={(e) => e.key === "Enter" && handleConnect()}
              />
              <button
                type="button"
                onClick={handleConnect}
                disabled={isConnecting || !inputValue.trim()}
                className="hero-btn-primary w-full bg-primary text-on-primary px-8 py-3.5 rounded-full soft-ambient-shadow hover:opacity-90 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isConnecting ? "Connecting..." : "Start voice session"}
              </button>
              {error && (
                <p className="text-sm text-error text-center font-body-md">
                  {error}
                </p>
              )}
            </div>
          )}
        </div>

        <div className="md:col-span-6 relative">
          <div className="rounded-3xl overflow-hidden soft-ambient-shadow border border-outline-variant/30 ring-1 ring-primary-container/20">
            <img
              alt="A serene woman practicing child's pose in a sunlit minimalist yoga studio"
              className="w-full aspect-[4/5] object-cover"
              src={HERO_IMAGE}
            />
          </div>

          <div className="absolute -bottom-8 -left-4 md:-left-12 bg-surface-container-lowest/95 backdrop-blur-sm p-6 md:p-7 rounded-2xl soft-ambient-shadow border border-outline-variant/20 max-w-[300px]">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-2.5 h-2.5 rounded-full bg-primary-container pulse-dot shrink-0" />
              <span className="hero-badge">Available now</span>
            </div>
            <span className="hero-quote-mark block mb-1" aria-hidden>
              &ldquo;
            </span>
            <p className="hero-quote -mt-3">
              Alexa is available 24/7. Ask questions, check availability, and
              book your yoga session by voice.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
