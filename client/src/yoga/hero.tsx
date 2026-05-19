type YogaHeroProps = {
  name: string;
  setName: (name: string) => void;
  onStart: () => void;
  isConnecting: boolean;
  error: string;
};

export default function YogaHero({
  name,
  setName,
  onStart,
  isConnecting,
  error,
}: YogaHeroProps) {
  return (
    <main className="min-h-screen overflow-hidden bg-neutral-950 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,197,94,0.18),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(20,184,166,0.12),transparent_35%)]" />

      <section className="relative mx-auto flex min-h-screen max-w-7xl items-center px-6 py-10">
        <div className="grid w-full items-center gap-12 lg:grid-cols-2">
          <div>
            <div className="mb-5 inline-flex rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-sm text-emerald-200">
              Live AI Yoga Tutor
            </div>

            <h1 className="max-w-3xl text-5xl font-semibold tracking-tight text-white md:text-7xl">
              Talk to Alexa, your calm yoga assistant.
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-neutral-300">
              Ask about yoga sessions, check available slots, and book a
              30-minute online workshop with a realtime voice agent.
            </p>

            <div className="mt-8 max-w-md rounded-3xl border border-white/10 bg-white/[0.04] p-4 shadow-2xl backdrop-blur">
              <label className="mb-2 block text-sm font-medium text-neutral-300">
                Your name
              </label>

              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full rounded-2xl border border-white/10 bg-neutral-900 px-4 py-3 text-white outline-none ring-0 placeholder:text-neutral-500 focus:border-emerald-400"
              />

              <button
                onClick={onStart}
                disabled={isConnecting || name.trim().length === 0}
                className="mt-4 w-full rounded-2xl bg-emerald-400 px-5 py-3 font-semibold text-neutral-950 transition hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isConnecting ? "Connecting..." : "Talk to AI"}
              </button>

              {error && <p className="mt-3 text-sm text-red-300">{error}</p>}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 rounded-[2.5rem] bg-emerald-400/10 blur-3xl" />

            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-neutral-900 shadow-2xl">
              <img
                src="/ai-voice.gif"
                alt="AI yoga assistant"
                className="h-[560px] w-full object-cover"
              />

              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-neutral-950/90 to-transparent p-6">
                <div className="flex items-center gap-3">
                  <span className="relative flex h-3 w-3">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-300" />
                  </span>
                  <p className="text-sm text-neutral-200">
                    Alexa is ready for a live yoga call
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
