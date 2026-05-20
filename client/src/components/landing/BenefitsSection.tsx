const BENTO_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBRIg8oqx9L1BRiYsh3xNjWx9lqsGNYB1CA0MevfxEhwuEL1G8bgFts2VorayqoUCT46LhNvJK5pR3KtXHCNNnVHGd0fqggIVhhFxCjs98l8KH1pmnVg4BEAx3jneb9ZAZVrm3rPckfxbBHeTTw8MXjPmBexwtzPq2n7qN6xNh9qM6P8JtuD_wEqCl_h7884mIrHpVVdDgqYti4HrrjIs9zagkOG63v10aafCjDQErxpGAPSEsbNtyyWoLO0ap7910N4el4yO7HwU0";

const STUDIO_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCITERPOLTufCfmYr9omMpUUvpMMEv5m3tyeOBA-Bbgn2_rzjdQ3z98EiG302gfn844gJ7E5_x5IWKfO5RJScZo-QiUoeyRjz5Uz6zPHlD_Tf8C05sPGCR1543X30dLORtFnbPiZP4zfLvoc0SaRO77CPy9LnWQo7UxWEIzXOprRBEB15WDxfYnOOQ3nR0pcf4OiBdYuNeDCQXqkZq7pVDv-SF_kny_qDxFbFA8GMCw45zymffrm_KDJYT9diUDb0lk5x_ywtWgOmU";

export default function BenefitsSection() {
  return (
    <section className="py-stack-xl bg-surface-container-low">
      <div className="max-w-container-max mx-auto px-6 md:px-margin-desktop">
        <h2 className="font-headline-md text-on-surface text-center mb-stack-lg">
          Designed for your well-being.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 bg-white rounded-3xl border border-outline-variant/10 flex min-h-[280px] relative overflow-hidden group">
            <div className="relative z-10 p-8 flex flex-col justify-end h-full">
              <span className="material-symbols-outlined text-primary-container text-4xl mb-4">
                accessibility_new
              </span>
              <h3 className="font-headline-sm text-on-surface mb-2">
                Truly Beginner-Friendly
              </h3>
              <p className="font-body-md text-on-surface-variant">
                We break down every movement with clear instructions. No
                previous experience required.
              </p>
            </div>
            <div className="absolute inset-0 z-0">
              <img
                alt="A woman practicing a gentle lunge pose"
                className="w-full h-full object-cover opacity-20 group-hover:opacity-30 transition-opacity"
                src={BENTO_IMAGE}
              />
            </div>
          </div>

          <div className="bg-surface-container-highest rounded-3xl overflow-hidden flex flex-col h-full soft-ambient-shadow">
            <img
              alt="Serene studio corner"
              className="w-full h-48 object-cover"
              src={STUDIO_IMAGE}
            />
            <div className="p-8 flex-grow flex flex-col items-center text-center justify-center">
              <span className="material-symbols-outlined text-secondary text-4xl mb-4">
                bedtime
              </span>
              <h3 className="font-headline-sm text-on-surface mb-2">
                Calm Setting
              </h3>
              <p className="font-body-md text-on-surface-variant">
                Focused on creating a digital sanctuary.
              </p>
            </div>
          </div>

          <div className="bg-primary-container/20 p-8 rounded-3xl flex flex-col items-center text-center justify-center">
            <span className="material-symbols-outlined text-primary text-4xl mb-4">
              slow_motion_video
            </span>
            <h3 className="font-headline-sm text-on-surface mb-2">
              Gentle Pace
            </h3>
            <p className="font-body-md text-on-surface-variant">
              Never rushed, always mindful.
            </p>
          </div>

          <div className="md:col-span-2 bg-white rounded-3xl border border-outline-variant/10 flex min-h-[280px] relative overflow-hidden group">
            <div className="relative z-10 p-8 flex flex-col justify-end h-full">
              <span className="material-symbols-outlined text-tertiary text-4xl mb-4">
                voice_selection
              </span>
              <h3 className="font-headline-sm text-on-surface mb-2">
                Voice Booking with Alexa
              </h3>
              <p className="font-body-md text-on-surface-variant">
                Check availability and confirm your session in under a minute —
                all through a natural voice call.
              </p>
            </div>
            <div className="absolute inset-0 z-0 bg-gradient-to-r from-surface-container-low to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
