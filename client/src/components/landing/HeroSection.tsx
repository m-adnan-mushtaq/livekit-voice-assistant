import { useState } from "react";
import { useNavigate } from "react-router";
import { useAlexaConnection } from "../../hooks/useAlexaConnection";

export default function HeroSection() {
  const navigate = useNavigate();
  const { name, setName, startCall, isConnecting, error } =
    useAlexaConnection();
  const [inputValue, setInputValue] = useState(name);

  const handleConnect = async () => {
    if (!inputValue.trim()) return;
    setName(inputValue.trim());
    const token = await startCall(inputValue.trim());
    if (token) {
      navigate("/alexa", { state: { token, name: inputValue.trim() } });
    }
  };

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          className="w-full h-full object-cover grayscale opacity-40"
          alt="Yoga pose in dark studio"
          src="/images/hero-bg.jpeg"
        />
        <div className="absolute inset-0 hero-gradient" />
        <div className="absolute top-1/4 -right-20 w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-gutter grid grid-cols-1 lg:grid-cols-3">
        <div className="lg:col-span-2 flex flex-col justify-center gap-4 lg:gap-lg">
          <span className="inline-flex items-center gap-2 text-primary text-label-md tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            AI Personal Assistant
          </span>

          <h1 className="font-headline text-4xl sm:text-5xl lg:text-headline-xl text-on-surface leading-tight">
            Ready for your yoga calls, 24/7.
          </h1>

          <p className="text-base sm:text-lg text-on-surface-variant max-w-2xl">
            Alexa helps your visitors ask questions, check real-time
            availability, and book a 30-minute yoga session in under a minute —
            all through a natural voice call.
          </p>

          <div className="mt-4 lg:mt-lg pt-4 lg:pt-lg border-t border-white/5">
            <p className="text-lg sm:text-headline-sm mb-4 text-primary">
              Turn visitors into booked yoga sessions without forms, delays, or
              missed calls.
            </p>
            <div className="grid grid-cols-3 gap-4 sm:gap-md">
              <div>
                <div className="text-primary font-bold text-xl sm:text-headline-sm">
                  30s
                </div>
                <div className="text-on-surface-variant text-xs sm:text-sm">
                  Booking time reduced
                </div>
              </div>
              <div>
                <div className="text-primary font-bold text-xl sm:text-headline-sm">
                  24/7
                </div>
                <div className="text-on-surface-variant text-xs sm:text-sm">
                  Availability
                </div>
              </div>
              <div>
                <div className="text-primary font-bold text-xl sm:text-headline-sm">
                  68%
                </div>
                <div className="text-on-surface-variant text-xs sm:text-sm">
                  Less missed opportunities
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center lg:justify-end">
          <div className="glass-card rounded-xl w-full relative emerald-glow overflow-hidden">
            <div className="relative">
              <img
                src="https://i.pinimg.com/originals/42/78/76/42787621ed6d40f0c30f0ae423fc572c.gif"
                alt="AI Voice Assistant"
                className="w-full h-56 sm:h-72 object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-container via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-primary animate-pulse" />
                <span className="text-sm text-on-surface">Alexa is ready</span>
              </div>
            </div>

            <div className="p-4 sm:p-6">
              <label className="block text-sm font-medium text-on-surface-variant mb-2">
                Enter your name to start
              </label>
              <input
                id="hero-name-input"
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Your name"
                className="w-full rounded-xl border border-white/10 bg-surface-container-high px-4 py-3 text-on-surface outline-none placeholder:text-on-surface-variant focus:border-primary transition-colors"
                onKeyDown={(e) => e.key === "Enter" && handleConnect()}
              />

              <button
                onClick={handleConnect}
                disabled={isConnecting || !inputValue.trim()}
                className="mt-4 w-full primary-gradient text-on-primary px-6 py-3 rounded-xl text-label-md font-semibold hover:scale-[1.02] active:scale-[0.98] transition-transform disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isConnecting ? "Connecting..." : "Talk with Alexa"}
              </button>

              {error && (
                <p className="mt-3 text-sm text-error text-center">{error}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
