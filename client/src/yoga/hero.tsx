type YogaHeroProps = {
  name: string;
  setName: (name: string) => void;
  onStart: () => void;
  isConnecting: boolean;
  error: string;
};

const HERO_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCPxu3Vjg0prCu_3JZ3URfSigEn1JCdGpxkBa-9tm96CVs_mSFbMpeBOsGDKWNwf7S-4a_uv40BsenRYGzeknwnLDkM7Jy_RO8HAKRR_UEFdHGAYdHESvJv7XMZsScmcXtJfUyWDmiHUshFxAvZ65TTh3MtmwDiSxGZbaa2r-H-9Q2ortNOINYCjRL-NUhGPwiyT8-OrTTrvT-nO-lrh0Dvmv1SZY-uJ667M_xz5U9CwDBYBFKZwafxHS_eqY-yFEqHkzMrzOGYKNE";

export default function YogaHero({
  name,
  setName,
  onStart,
  isConnecting,
  error,
}: YogaHeroProps) {
  return (
    <main className="min-h-screen overflow-hidden bg-background text-on-background">
      <section className="relative mx-auto flex min-h-screen max-w-container-max items-center px-6 py-10 md:px-margin-desktop">
        <div className="grid w-full items-center gap-12 lg:grid-cols-2">
          <div>
            <div className="mb-5 inline-flex rounded-full border border-primary-container/40 bg-primary-container/20 px-4 py-2 font-label-sm text-primary">
              Live AI Yoga Assistant
            </div>

            <h1 className="max-w-3xl font-display-lg-mobile md:font-display-lg text-on-surface">
              Talk to Alexa, your calm yoga assistant.
            </h1>

            <p className="mt-6 max-w-xl font-body-lg text-secondary">
              Ask about yoga sessions, check available slots, and book a
              30-minute online workshop with a realtime voice agent.
            </p>

            <div className="mt-8 max-w-md rounded-3xl border border-outline-variant/30 bg-surface-container-lowest p-4 soft-ambient-shadow">
              <label className="mb-2 block font-label-md text-on-surface-variant">
                Your name
              </label>

              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full rounded-2xl border border-outline-variant/40 bg-surface-container-low px-4 py-3 text-on-surface outline-none placeholder:text-on-surface-variant focus:border-primary"
              />

              <button
                type="button"
                onClick={onStart}
                disabled={isConnecting || name.trim().length === 0}
                className="mt-4 w-full rounded-full bg-primary px-5 py-3 font-label-md text-on-primary transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isConnecting ? "Connecting..." : "Talk with Alexa"}
              </button>

              {error && <p className="mt-3 text-sm text-error">{error}</p>}
            </div>
          </div>

          <div className="relative">
            <div className="relative overflow-hidden rounded-3xl border border-outline-variant/30 soft-ambient-shadow">
              <img
                src={HERO_IMAGE}
                alt="AI yoga assistant"
                className="h-[560px] w-full object-cover"
              />

              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/90 to-transparent p-6">
                <div className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-primary-container pulse-dot" />
                  <p className="font-body-md text-on-surface">
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
